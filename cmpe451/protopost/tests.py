from django.test import TestCase
from protopost.models import *
from protopost.serializers import *
from protopost.register import *
from rest_framework.test import APIClient
import json

class CommunityTestCase(TestCase):
    fixtures = ['test_db.json']
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
        response_dict = json.loads(json.dumps(response.data))
        self.assertTrue(response_dict["Success"])


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

        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.get("/api/v1/protopost/list_communities?from=all")
        response_dict = json.loads(json.dumps(response.data))
        community_names=[c["name"] for c in response_dict["Communities"]]
        self.assertListEqual(["JohnCom","JackCom"],community_names)
    
class PostTemplateTestCase(TestCase):
    fixtures = ['test_db.json']
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
        response_dict = json.loads(json.dumps(response.data))
        self.assertTrue(response_dict["Success"])
        self.assertEqual(response_dict["PostTemplate"]["name"],"JackTemplate")

    def test_create_post_template_out_community(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        request_body=json.dumps({
            "name": "JackTemplate",
            "data_field_templates": [{"name": "JackText","type": "text"}
            ]})
        response=self.client.post("/api/v1/protopost/communities/1/create_post_template",data=request_body,content_type='application/json')
        response_dict = json.loads(json.dumps(response.data))
        self.assertFalse(response_dict["Success"])

    def test_list_post_templates(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        request_body=json.dumps({
        "name": "JackTemplate",
        "data_field_templates": [{"name": "JackText","type": "text"}
        ]})
        response=self.client.get(f"/api/v1/protopost/communities/2/list_post_templates")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Post_templates"][0]["name"],"JackTemp")

class PostTestCase(TestCase):
    fixtures = ['test_db.json']
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
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        request_body=json.dumps({
        "title": "JohnPost",
        "post_template": 1,
        "data_fields": [
            {
            "name": "JohnText",
            "type": "text",
            "content": {"value":"string"}
            }
        ]
        })
        response=self.client.post("/api/v1/protopost/communities/1/create_post",data=request_body,content_type='application/json')
        response_dict = json.loads(json.dumps(response.data))
        self.assertTrue(response_dict["Success"])
        self.assertEqual(response_dict["Post"]["title"],"JohnPost")
    def test_create_post_invalid_field(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        request_body=json.dumps({
        "title": "JohnPost",
        "post_template": 1,
        "data_fields": [
            {
            "name": "JohnText2",
            "type": "text",
            "content": {"value":"string"}
            }
        ]
        })
        response=self.client.post("/api/v1/protopost/communities/1/create_post",data=request_body,content_type='application/json')
        response_dict = json.loads(json.dumps(response.data))
        self.assertFalse(response_dict["Success"])
    
    def test_list_community_posts(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.get(f"/api/v1/protopost/communities/2/list_community_posts")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict[0]["title"],"JackPost")

class FilterTestCase(TestCase):
    fixtures = ['test_db.json']
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
        response=self.client.get(f"/api/v1/protopost/communities/2/filter_posts?post_template_id=3&JackText_startsWith=str")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"JackPost")
        response=self.client.get(f"/api/v1/protopost/communities/2/filter_posts?post_template_id=3&JackText_contains=tra")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"JackPost")
    def test_filter_by_number(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get(f"/api/v1/protopost/communities/1/filter_posts?post_template_id=2&num1_lt=6")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"Below number")
        response=self.client.get(f"/api/v1/protopost/communities/1/filter_posts?post_template_id=2&num1_eq=6")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"Equal number")
        response=self.client.get(f"/api/v1/protopost/communities/1/filter_posts?post_template_id=2&num1_gt=6")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"Above number")
        
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
