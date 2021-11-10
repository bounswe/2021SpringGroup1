from django.test import TestCase,Client, client
from protopost.models import *
from protopost.home import *
from protopost.register import *


# Create your tests here.
import json
class PostCreationTestCase(TestCase):
    def setUp(self):
        self.client=Client()
        self.user_john=User.objects.create_user(username="John",email="john@gmail.com",password="123abc")
        self.user_jack=User.objects.create_user(username="Jack",email="jack@gmail.com",password="123abc")
        
        self.john_community=Community.objects.create(
            name="John's Community",
            description="Some description.",
            moderator=self.user_john,
        )
        self.jack_community=Community.objects.create(
            name="Jack's Community",
            description="Some description.",
            moderator=self.user_jack,
        )
        if self.user_john:
            self.user_john.joined_communities.add(self.john_community)
        if self.user_jack:
            self.user_jack.joined_communities.add(self.jack_community)
        
        self.john_post_template=PostTemplate.objects.create(
            name="JohnTemplate",
            description="Some description.",
            community=self.john_community
        )
        self.john_field_temp=DataFieldTemp.objects.create(
            name="JohnText",
            type="text",
            form_content=json.loads("{}"),
            post_template=self.john_post_template,
        )
        self.jack_post_template=PostTemplate.objects.create(
            name="JackTemplate",
            description="Some description.",
            community=self.jack_community
        )
        self.jack_field_temp=DataFieldTemp.objects.create(
            name="JackText",
            type="text",
            form_content=json.loads("{}"),
            post_template=self.jack_post_template,
        )
        self.john_post=Post.objects.create(
            title="John's Post",
            poster=self.user_john,
            post_template=self.john_post_template,
            community=self.john_community
        )
        self.john_field=DataField.objects.create(
            name="JohnText",
            type="text",
            post=self.john_post,
            content=json.loads('{"value":"Some text written by John"}')
        )
        self.jack_post=Post.objects.create(
            title="John's Post",
            poster=self.user_jack,
            post_template=self.jack_post_template,
            community=self.jack_community
        )
        self.jack_field=DataField.objects.create(
            name="JackText",
            type="text",
            post=self.jack_post,
            content=json.loads('{"value":"Some text written by Jack"}')
        )

    
    def test_post_creation_in_community(self):
        self.client.login(username="John",email="john@gmail.com",password="123abc")
        response = self.client.post("/communities/%s/try_create_post" % (str(self.john_community.id)),
            {"title":"JohnPost2",
            "template_id":self.john_post_template.id,
            "data_fields": json.dumps('{"%s_content": "Some new text"}' % (str(self.john_field_temp.id)))
            })
        self.assertEqual(response.json()["Success"],True)
    
    def test_post_creation_out_community(self):
        self.client.login(username="Jack",email="jack@gmail.com",password="123abc")
        response = self.client.post("/communities/%s/try_create_post" % (str(self.john_community.id)),
            {"title":"JohnPost2",
            "template_id":self.john_post_template.id,
            "data_fields": json.dumps('{"%s_content": "Some new text"}' % (str(self.john_field_temp.id)))
            })
        self.assertEqual(response.json()["Success"],False)
    
    
    def test_post_creation_without_login(self):
        response = self.client.post("/communities/%s/try_create_post" % (str(self.john_community.id)),
            {"title":"JohnPost2",
            "template_id":self.john_post_template.id,
            "data_fields": json.dumps('{"%s_content": "Some new text"}' % (str(self.john_field_temp.id)))
            })
        self.assertEqual(response.json()["Success"],False)
    
    def test_post_creation_wrong_template(self):
        self.client.login(username="John",email="john@gmail.com",password="123abc")
        response = self.client.post("/communities/%s/try_create_post" % (str(self.john_community.id)),
            {"title":"JohnPost2",
            "template_id":self.jack_post_template.id,
            "data_fields": json.dumps('{"%s_content": "Some new text"}' % (str(self.john_field_temp.id)))
            })
        self.assertEqual(response.json()["Success"],False)

class PostTemplateCreationTestCase(TestCase):
    def setUp(self):
        self.client=Client()
        self.user_john=User.objects.create_user(username="John",email="john@gmail.com",password="123abc")
        self.user_jack=User.objects.create_user(username="Jack",email="jack@gmail.com",password="123abc")
        
        self.john_community=Community.objects.create(
            name="John's Community",
            description="Some description.",
            moderator=self.user_john,
        )
        self.jack_community=Community.objects.create(
            name="Jack's Community",
            description="Some description.",
            moderator=self.user_jack,
        )
        if self.user_john:
            self.user_john.joined_communities.add(self.john_community)
        if self.user_jack:
            self.user_jack.joined_communities.add(self.jack_community)
        
        self.john_post_template=PostTemplate.objects.create(
            name="JohnTemplate",
            description="Some description.",
            community=self.john_community
        )
        self.john_field_temp=DataFieldTemp.objects.create(
            name="JohnText",
            type="text",
            form_content=json.loads("{}"),
            post_template=self.john_post_template,
        )
        self.jack_post_template=PostTemplate.objects.create(
            name="JackTemplate",
            description="Some description.",
            community=self.jack_community
        )
        self.jack_field_temp=DataFieldTemp.objects.create(
            name="JackText",
            type="text",
            form_content=json.loads("{}"),
            post_template=self.jack_post_template,
        )
        self.john_post=Post.objects.create(
            title="John's Post",
            poster=self.user_john,
            post_template=self.john_post_template,
            community=self.john_community
        )
        self.john_field=DataField.objects.create(
            name="JohnText",
            type="text",
            post=self.john_post,
            content=json.loads('{"value":"Some text written by John"}')
        )
        self.jack_post=Post.objects.create(
            title="John's Post",
            poster=self.user_jack,
            post_template=self.jack_post_template,
            community=self.jack_community
        )
        self.jack_field=DataField.objects.create(
            name="JackText",
            type="text",
            post=self.jack_post,
            content=json.loads('{"value":"Some text written by Jack"}')
        )




    def test_post_template_creation_in_community(self):
        self.client.login(username="John",email="john@gmail.com",password="123abc")
        response = self.client.post("/communities/%s/try_create_post_template" % (str(self.john_community.id)),
            {"title":"JohnTemplate2",
            "description":"Some description.",
            "data_field_temps": json.dumps([{"name": "JohnText","type":"text"}])
            })
        self.assertEqual(response.json()["Success"],True)

    def test_post_template_creation_out_community(self):
        self.client.login(username="Jack",email="jack@gmail.com",password="123abc")
        response = self.client.post("/communities/%s/try_create_post_template" % (str(self.john_community.id)),
            {"title":"JohnTemplate2",
            "description":"Some description.",
            "data_field_temps": json.dumps([{"name": "JohnText","type":"text"}])
            })
        self.assertEqual(response.json()["Success"],False)
    
    def test_post_template_creation_without_login(self):
        response = self.client.post("/communities/%s/try_create_post_template" % (str(self.john_community.id)),
            {"title":"JohnTemplate2",
            "description":"Some description.",
            "data_field_temps": json.dumps([{"name": "JohnText","type":"text"}])
            })
        self.assertEqual(response.json()["Success"],False)