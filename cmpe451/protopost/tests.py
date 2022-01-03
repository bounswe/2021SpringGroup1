from django.test import TestCase
from protopost.models import *
from protopost.serializers import *
from protopost.register import *
from rest_framework.test import APIClient
import json

class CommunityTestCase(TestCase):
    def setUp(self):
        self.client=APIClient()
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
        
    
class PostTemplateTestCase(TestCase):
    def setUp(self):
        self.client=APIClient()
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

    def test_create_post_template_in_community(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        request_body=json.dumps({
            "name": "JackTemplate",
            "data_field_templates": [{"name": "JackText","type": "text"}]})
        response=self.client.post("/api/v1/protopost/communities/2/create_post_template",data=request_body,content_type='application/json')
        self.jack_post_temp_id = response.data["PostTemplate"]["id"]

    def test_create_post_template_out_community(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        request_body=json.dumps({
            "name": "JackTemplate",
            "data_field_templates": [{"name": "JackText","type": "text"}
            ]})
        response=self.client.post("/api/v1/protopost/communities/1/create_post_template",data=request_body,content_type='application/json')

    def test_list_post_templates(self):
            self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
            request_body=json.dumps({
            "name": "JackTemplate",
            "data_field_templates": [{"name": "JackText","type": "text"}
            ]})
            response=self.client.get(f"/api/v1/protopost/communities/{self.jack_community_id}/list_post_templates")
            response_dict = json.loads(json.dumps(response.data))

class PostTestCase(TestCase):
    def setUp(self):
        self.client=APIClient()    
        self.john_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "John",
        "password": "123abc"
        }).content)["Token"]
        self.jack_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "Jack",
        "password": "123abc"
        }).content)["Token"]

    def test_create_post_valid(self):
        pass
    def test_create_post_invalid_field(self):
        pass
    def test_search_posts_in_community(self):
        pass

class FilterTestCase(TestCase):
    def setUp(self):
        self.client=APIClient()    
        self.john_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "John",
        "password": "123abc"
        }).content)["Token"]
        self.jack_token=json.loads(self.client.post("/api/v1/protopost/login",
        {
        "username": "Jack",
        "password": "123abc"
        }).content)["Token"]
    def test_filter_by_text(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
    def test_filter_by_number(self):
        pass

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
