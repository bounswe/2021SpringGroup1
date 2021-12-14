from django.test import TestCase,Client, client
from rest_framework import response
from protopost.models import *
from protopost.serializers import *
from protopost.home import *
from protopost.register import *
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.test import TransactionTestCase
from collections import OrderedDict

# Create your tests here.
import json

class CommunityTestCase(TestCase):
    def setUp(self):
        self.client=APIClient()
        self.client.post("/api/v1/protopost/register",
        {
        "username": "John",
        "email": "john@gmail.com",
        "password": "123abc"
        }
        )
        self.client.post("/api/v1/protopost/register",
        {
        "username": "Jack",
        "email": "jack@gmail.com",
        "password": "123abc"
        }
        )
        self.john_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "John",
        "password": "123abc"
        }
        ).content)["Token"]
        self.jack_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "Jack",
        "password": "123abc"
        }
        ).content)["Token"]

    def test_create_community_success(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.post("/api/v1/protopost/create_community",
        {
        "name": "John's Community",
        "description": "Some description.",
        "community_image_url": "string"
        }
        )
        
        self.john_community_id=response.data["Community"]["id"]
        self.john_moderator_id = response.data["Community"]["moderator"]

        self.assertEqual(response.data,
        {
        "Success": True,
        "Community": {
            "@context": "http://schema.org/",
            "@type": "Organization",
            "id": self.john_community_id,
            "name": "John's Community",
            "description": "Some description.",
            "community_image_url": "string",
            "moderator": self.john_moderator_id,
            "isJoined": False
        }
        })

    def test_create_community_same_name(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.post("/api/v1/protopost/create_community",
        {
        "name": "John's Community",
        "description": "Some description.",
        "community_image_url": "string"
        }
        )
        response=self.client.post("/api/v1/protopost/create_community",
        {
        "name": "John's Community",
        "description": "Some description.",
        "community_image_url": "string"
        }
        )
        self.assertFalse(response.data["Success"])

    def test_list_communities(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.post("/api/v1/protopost/create_community",
        {
        "name": "John's Community",
        "description": "Some description.",
        "community_image_url": "string"
        }
        )
        self.john_community_id, self.john_moderator_id = response.data["Community"]["id"], response.data["Community"]["moderator"]

        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.post("/api/v1/protopost/create_community",
        {
        "name": "Jack's Community",
        "description": "Some description.",
        "community_image_url": "string"
        }
        )
        self.jack_community_id, self.jack_moderator_id = response.data["Community"]["id"], response.data["Community"]["moderator"]

        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.get("/api/v1/protopost/list_communities?from=all")
        

        self.assertEqual(response.data,
        {
        "Communities": [
            {
            "@context": "http://schema.org/",
            "@type": "Organization",
            "id": self.john_community_id,
            "name": "John's Community",
            "description": "Some description.",
            "community_image_url": "string",
            "moderator": self.john_moderator_id,
            "isJoined": False
            },
            {
            "@context": "http://schema.org/",
            "@type": "Organization",
            "id": self.jack_community_id,
            "name": "Jack's Community",
            "description": "Some description.",
            "community_image_url": "string",
            "moderator": self.jack_moderator_id,
            "isJoined": True
            }
        ]
        }
        )
    
class PostTemplateTestCase(TestCase):
    def setUp(self):
        self.client=APIClient()
        self.client.post("/api/v1/protopost/register",
        {
        "username": "John",
        "email": "john@gmail.com",
        "password": "123abc"
        }
        )
        self.client.post("/api/v1/protopost/register",
        {
        "username": "Jack",
        "email": "jack@gmail.com",
        "password": "123abc"
        }
        )
        self.john_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "John",
        "password": "123abc"
        }
        ).content)["Token"]
        self.jack_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "Jack",
        "password": "123abc"
        }
        ).content)["Token"]
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.post("/api/v1/protopost/create_community",
        {
        "name": "John's Community",
        "description": "Some description.",
        "community_image_url": "string"
        }
        )
        self.john_community_id=response.data["Community"]["id"]

        self.client.credentials()
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.post("/api/v1/protopost/create_community",
        {
        "name": "Jack's Community",
        "description": "Some description.",
        "community_image_url": "string"
        }
        )
        self.jack_community_id=response.data["Community"]["id"]

    def test_create_post_template_in_community(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        request_body=json.dumps({
            "name": "JackTemplate",
            "data_field_templates": [{"name": "JackText","type": "text"}]})
        response=self.client.post("/api/v1/protopost/communities/2/create_post_template",data=request_body,content_type='application/json')
        self.jack_post_temp_id = response.data["PostTemplate"]["id"]

        self.assertEqual(response.data,
        {
        "Success": True,
        "PostTemplate": {
            "id": self.jack_post_temp_id,
            "community": self.jack_community_id,
            "name": "JackTemplate",
            "data_field_templates": [
            {
                "name": "JackText",
                "type": "text"
            }
            ]
        }
        } 
        )

    def test_create_post_template_out_community(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        request_body=json.dumps({
            "name": "JackTemplate",
            "data_field_templates": [{"name": "JackText","type": "text"}
            ]})
        response=self.client.post("/api/v1/protopost/communities/1/create_post_template",data=request_body,content_type='application/json')
        self.assertEqual(response.data,
            {
            "Success": False,
            "Error": "User is not subscribed to this community."
            }
        )

    def test_list_post_templates(self):
            self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
            request_body=json.dumps({
            "name": "JackTemplate",
            "data_field_templates": [{"name": "JackText","type": "text"}
            ]})
            response=self.client.post(f"/api/v1/protopost/communities/{self.jack_community_id}/create_post_template",data=request_body,content_type='application/json')

            response=self.client.get(f"/api/v1/protopost/communities/{self.jack_community_id}/list_post_templates")
            response_dic = json.loads(json.dumps(response.data))
            pos_template_id = response_dic["Post_templates"][0]["id"]
            
            self.assertEqual(response_dic,
            {
            "Success": True,
            "Post_templates": [
                {
                "id": pos_template_id,
                "community": self.jack_community_id,
                "name": "JackTemplate",
                "data_field_templates": [
                    {
                    "name": "JackText",
                    "type": "text"
                    }
                ]
                }
            ]
            }
            )

class GetUserHomeFeed(TestCase):
    def setUp(self):
        self.client=APIClient()
        self.client.post("/api/v1/protopost/register",
        {"username": "John", "email": "john@gmail.com", "password": "123abc"})
        
        self.john_token=json.loads(self.client.post("/api/v1/protopost/login",
        {"username": "John", "password": "123abc"}).content)["Token"]
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)

        response=self.client.post("/api/v1/protopost/create_community",
        {"name": "John's Community", "description": "Some description.","community_image_url": "string"})
        self.john_comm=response.data["Community"]["id"]
        

        request_body=json.dumps({
            "name": "JohnTemplate",
            "data_field_templates": [{"name": "JohnText","type": "text"}]})
        response = self.client.post(f"/api/v1/protopost/communities/{self.john_comm}/create_post_template",data=request_body,content_type='application/json')
        self.john_post_template_id = response.data["PostTemplate"]["id"]

        counter = 1
        request_body=json.dumps({
                "title": f"John's Post {counter}",
                "post_template": self.john_post_template_id,
                "data_fields": [
                    {
                    "name": "JohnText",
                    "type": "text",
                    "content": {
                        "additionalProp1": "Hello Protopost !",
                        "additionalProp2": "I am a new member of this app.",
                    }
                    }
                ]
                })
        response = self.client.post(f"/api/v1/protopost/communities/{self.john_comm}/create_post", data=request_body,content_type='application/json')

        counter += 1
        response = self.client.post(f"/api/v1/protopost/communities/{self.john_comm}/create_post", data=request_body,content_type='application/json') 

    def test_Get_Home_Feed(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/get_user_home_feed") 
     
        response_dic = json.loads(json.dumps(response.data))
        for element in response_dic:
            del element["created_date"]

        actual_result = [
                            {
                                "poster_name" : "John",
                                "id": 2,
                                "poster": 1,
                                "community": 1,
                                "title": "John's Post 1",
                                "post_template": 1,
                                "data_fields": [
                                    {
                                        "name": "JohnText",
                                        "type": "text",
                                        "content": {
                                            "additionalProp1": "Hello Protopost !",
                                            "additionalProp2": "I am a new member of this app."
                                        }
                                    }
                                ]
                            },
                            {
                                "poster_name" : "John",
                                "id": 1,
                                "poster": 1,
                                "community": 1,
                                "title": "John's Post 1",
                                "post_template": 1,
                                "data_fields": [
                                    {
                                        "name": "JohnText",
                                        "type": "text",
                                        "content": {
                                            "additionalProp1": "Hello Protopost !",
                                            "additionalProp2": "I am a new member of this app."
                                        }
                                    }
                                ]
                            }
                        ]

        self.assertEqual(actual_result, response_dic)





#class PostTestCase(TestCase):

# # class CommunityTestCase(TestCase):
# #     def setUp(self) :
# #         self.client=Client()
    
# #     def test_community_creation(self):
# #         response = self.client.post("/create_community",
# #             {"name":"test_grubu",
# #             "description":"Test grub description.",
# #             "is_private":False
# #             })
# #         self.assertEqual(response.json()["Success"],True)

# #     def test_search_community(self):
# #         community_test_number = 2
# #         for i in range(1,community_test_number+1):
# #             self.client.post("/create_community", {"name":f"test_grubu_{i}","description":f"Test grub {i} description.","is_private":False})
        
# #         response = self.client.get("/search_communities", {"name":"test_grubu"})
# #         self.assertEqual(response.json()["Success"],True)
# #         self.assertEqual(len(response.json()["Communities"]), community_test_number)

# #     def test_getting_community_data(self):
# #         self.client.post("/create_community", {"name":"test_grubu_1","description":"Test grub 1 description.","is_private":False})
# #         response = self.client.get("/communities/get_community_data", {"group_name":"test_grubu_1"})

# #         self.assertEqual(response.json()["Success"],True)
# #         self.assertEqual(response.json()["Community"][0]["name"], "test_grubu_1")
# #         self.assertEqual(response.json()["Community"][0]["description"], "Test grub 1 description.")
# #         self.assertEqual(response.json()["Community"][0]["is_private"], False)
