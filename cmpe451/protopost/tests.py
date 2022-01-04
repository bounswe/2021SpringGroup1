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
    
    def test_get_community_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/communities/1/get_community_data")
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["Community"]["id"], 1)

    def test_search_communities(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/search_communities?text=com")

        self.assertEqual(response.status_code, 200)

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
        response=self.client.get("/api/v1/protopost/communities/2/list_post_templates")
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
        response=self.client.get("/api/v1/protopost/communities/2/list_community_posts")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict[0]["title"],"JackPost")

    def test_get_post_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.get("/api/v1/protopost/communities/get_post_data?post_id=1")
        self.assertEqual(1,response.data["Post"]["id"])

    def test_user_delete_post(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.post("/api/v1/protopost/communities/delete_post?post_id=1")
        self.assertEqual(response.status_code, 200)

    def test_search_posts_in_community(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.jack_token)
        response=self.client.get("/api/v1/protopost/communities/1/search_posts_in_community?community_id=1&text=a")
        self.assertEqual(response.status_code, 200)

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
        response=self.client.get("/api/v1/protopost/communities/2/filter_posts?post_template_id=3&JackText_startsWith=str")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"JackPost")
        response=self.client.get("/api/v1/protopost/communities/2/filter_posts?post_template_id=3&JackText_contains=tra")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"JackPost")
    def test_filter_by_number(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/communities/1/filter_posts?post_template_id=2&num1_lt=6")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"Below number")
        response=self.client.get("/api/v1/protopost/communities/1/filter_posts?post_template_id=2&num1_eq=6")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"Equal number")
        response=self.client.get("/api/v1/protopost/communities/1/filter_posts?post_template_id=2&num1_gt=6")
        response_dict = json.loads(json.dumps(response.data))
        self.assertEqual(response_dict["Posts"][0]["title"],"Above number")
        
class UserTestCase(TestCase):
    fixtures = ['test_db.json']
    def setUp(self):
        self.client=APIClient()    
        self.john_token=json.loads(self.client.post("/api/v1/protopost/login",
        { "username": "John", "password": "123abc" }).content)["Token"]

    def test_get_Home_Feed(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/get_user_home_feed") 

        self.assertEqual(response.status_code, 200)

    def test_get_user_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/get_user_profile?user_id=1") 

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["User"]["username"], "John")

    def test_get_user_created_posts(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/get_user_created_posts") 
        post_owners=[c["poster_name"] for c in response.data]
        
        self.assertEqual(response.status_code, 200)
        self.assertListEqual(["John","John","John","John"], post_owners)

    def test_get_user_subscription(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.john_token)
        response=self.client.get("/api/v1/protopost/communities/1/user_subscription") 
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["Success"], True)
