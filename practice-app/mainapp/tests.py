from django.test import TestCase
from mainapp.models import *
from mainapp.views import *
from rest_framework.test import APIRequestFactory
# Create your tests here.
import json
class PostTestCase(TestCase):
    def setUp(self):
        self.moderator = Person.objects.create(
            id=1,
            title="Mr",
            firstname="John",
            lastname="Doe",
            location="Istanbul",
            email="john.doe@gmail.com",
            age=30,
            phone="01234567890",
            imageUrl="www.xxx.yyy.zzz",
            createdDate=models.DateTimeField(auto_now_add=True))
        self.community= Community.objects.create(
            id=1,
            name="BUDDY",
            description="Bogazici Un. student community!",
            numUsers=1,
            numPosts=0,
            moderator=self.moderator,
            isPrivate=False,
        )
        self.questionPostTemplate=PostTemplate.objects.create(
            id=1,
            name="Question",
            description="Use this to ask questions.",
            community=self.community,
        )
        self.discussionPostTemplate=PostTemplate.objects.create(
            id=2,
            name="Question",
            description="Use this to start discussion.",
            community=self.community,
        )
        self.questionTempField1=DataFieldTemp.objects.create(
            id=1,
            name="Question",
            type="text",
            form_content=json.loads("{}"),
            postTemplate=self.questionPostTemplate,
            )
        self.discussionTempField1=DataFieldTemp.objects.create(
            id=2,
            name="Discussion",
            type="text",
            form_content=json.loads("{}"),
            postTemplate=self.discussionPostTemplate,
        )
        self.discussionTempField2=DataFieldTemp.objects.create(
            id=3,
            name="Image",
            type="image",
            form_content=json.loads("{}"),
            postTemplate=self.discussionPostTemplate,
        )
        self.post1=Post.objects.create(
            id=1,
            title="First Question",
            description="My first question.",
            posterid=self.moderator.id,
            community=self.community,
            postTemplate=self.questionPostTemplate,
            createdDate=models.DateTimeField(auto_now_add=True),
        )
        self.post2=Post.objects.create(
            id=2,
            title="First Discussion",
            description="My first discussion.",
            posterid=self.moderator.id,
            community=self.community,
            postTemplate=self.questionPostTemplate,
            createdDate=models.DateTimeField(auto_now_add=True),
        )
        self.questionDataField=DataField.objects.create(
            id=1,
            name="Question",
            type="text",
            content=json.loads('{ "text" : "Is this working" }'),
            post=self.post1,
            
            )
        self.discussionDataField1=DataField.objects.create(
            id=2,
            name="Discussion",
            type="text",
            content=json.loads('{ "text" : "I think it is working" }'),
            post=self.post2,
            
            )
        self.discussionDataField2=DataField.objects.create(
            id=3,
            name="Image",
            type="image",
            content=json.loads('{ "url" : "https://www.montclareschool.org/wp-content/uploads/2017/01/yes-1.jpg" }'),
            post=self.post2,
            
            )
    def test_community_has_right_templates(self):
        community=self.community
        postTemplates=community.post_templates.all()
        self.assertTrue((self.discussionPostTemplate in postTemplates) and (self.questionPostTemplate in postTemplates))
    
    def test_templates_has_right_fields(self):
        discussionTempFields=self.discussionPostTemplate.dataFieldTemplates.all()
        questionTempFields=self.questionPostTemplate.dataFieldTemplates.all()
        self.assertTrue((self.discussionTempField1 in discussionTempFields) and (self.discussionTempField2 in discussionTempFields))
        self.assertTrue(self.questionTempField1 in questionTempFields)
    
    def test_community_has_right_posts(self):
        community=self.community
        posts=community.posts.all()
        self.assertTrue((self.post1 in posts) and (self.post2 in posts))

    def test_posts_have_right_fields(self):
        discussionFields=self.post2.dataFields.all()
        questionFields=self.post1.dataFields.all()
        self.assertTrue((self.discussionDataField1 in discussionFields) and (self.discussionDataField2 in discussionFields))
        self.assertTrue(self.questionDataField in questionFields)

class CommunityTestCase(TestCase):
    def setUp(self):
        self.moderator = Person.objects.create(id=1,
                                               title="Mr",
                                               firstname="John",
                                               lastname="Doe",
                                               location="Istanbul",
                                               email="john.doe@gmail.com",
                                               age=30,
                                               phone="01234567890",
                                               imageUrl="www.xxx.yyy.zzz",
                                               createdDate=models.DateTimeField(auto_now_add=True))

        Community.objects.create(
            id=1,
            name="BUDDY",
            description="Boun ogrencileri burada!",
            numUsers=1,
            numPosts=0,
            moderator=self.moderator,
            isPrivate=False,
        )

    def test_community_has_id(self):
        """Community id is checked."""
        community = Community.objects.get(id=1)
        self.assertEqual(community.id, 1)

    def test_community_has_name(self):
        """Community name is checked."""
        community = Community.objects.get(id=1)
        self.assertEqual(community.name, "BUDDY")

    def test_community_has_description(self):
        """Community description is checked."""
        community = Community.objects.get(id=1)
        self.assertEqual(community.description, "Boun ogrencileri burada!")

    def test_community_has_moderator(self):
        """Community moderator is checked."""
        community = Community.objects.get(id=1)
        self.assertEqual(community.moderator, self.moderator)

    def test_num_users(self):
        """Number of users in the community is checked."""
        community = Community.objects.get(id=1)
        self.assertEqual(community.numUsers, 1)

    def test_num_posts(self):
        """Number of posts in the community is checked."""
        community = Community.objects.get(id=1)
        self.assertEqual(community.numPosts, 0)

    def test_privacy(self):
        """Community privacy is checked."""
        community = Community.objects.get(id=1)
        self.assertEqual(community.isPrivate, False)

    def test_created_date(self):
        """Number of users in the community is checked."""
        community = Community.objects.get(id=1)
        self.assertIsNotNone(community.createdDate)
    
    def test_external_api_getAll_works_one_community(self):
        """Restful API is checked."""
        community = Community.objects.get(id=1)
        factory = APIRequestFactory()
        request = factory.get('/external/getAllCommunities')
        response = external_api_getAllCommunities(request)
        json_response = json.loads(response.content)
        expected_response = community.__str__()
        self.assertDictEqual(json_response["1"], expected_response)

    def test_external_api_getAll_works_multiple_communities(self):
        """Restful API is checked."""
        #Create two extra communities.
        for i in range(2,4):
            Community.objects.create(
            id=i,
            name="Community " + str(i),
            description="Description " + str(i),
            numUsers=1,
            numPosts=0,
            moderator=self.moderator,
            isPrivate=True,
            )
        factory = APIRequestFactory()
        request = factory.get('/external/getAllCommunities')
        response = external_api_getAllCommunities(request)
        json_response = json.loads(response.content)
        for i in range(1,4):
            community = Community.objects.get(id=i)
            expected_response = community.__str__()
            self.assertDictEqual(json_response[str(i)], expected_response)

    def test_external_api_create_community(self):
        """Restful API is checked."""
        factory = APIRequestFactory()
        request = factory.post('/external/createCommunity', {'name': 'Bogazici Housing', 'isPrivate' : 'false', 'id' : self.moderator.id})
        response = external_api_createCommunity(request)
        json_response = json.loads(response.content)
        self.assertEqual(json_response['name'], 'Bogazici Housing')
        self.assertEqual(json_response['isPrivate'], False)
        self.assertEqual(json_response['moderator_name'], self.moderator.firstname)
    
    def test_external_api_delete_community(self):
        """Restful API is checked."""
        Community.objects.create(
            id=2,
            name="Bogazici Housing",
            description="Boun ogrencileri housing",
            numUsers=1,
            numPosts=0,
            moderator=self.moderator,
            isPrivate=True,
        )
        factory = APIRequestFactory()
        request = factory.post('/external/deleteCommunity', {'name': 'Bogazici Housing'})
        response = external_api_deleteCommunity(request)
        json_response = json.loads(response.content)
        self.assertNotEqual(json_response, {})

        
        




# @yunus-topal Person creation testing.


class PersonTestCase(TestCase):
    def setUp(self):
        self.moderator = Person.objects.create(id=2,
                                               title="Sir",
                                               firstname="ArthurCanon",
                                               lastname="Doyle",
                                               location="BakerStreet",
                                               email="sherlock.holmes@gmail.com",
                                               age=45,
                                               phone="01234567890",
                                               imageUrl="sherlock.watson",
                                               createdDate=models.DateTimeField(auto_now_add=True))

    def test_person_id(self):
        """Person id is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.id, 2)

    def test_person_title(self):
        """Person title is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.title, "Sir")

    def test_person_firstname(self):
        """Person firstname is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.firstname, "ArthurCanon")

    def test_person_lastname(self):
        """Person lastname is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.lastname, "Doyle")

    def test_person_location(self):
        """Person location is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.location, "BakerStreet")

    def test_person_email(self):
        """Person email is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.email, "sherlock.holmes@gmail.com")

    def test_person_age(self):
        """Person age is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.age, 45)

    def test_person_phone(self):
        """Person phone is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.phone, "01234567890")

    def test_person_image(self):
        """Person imageUrl is checked."""
        person = Person.objects.get(id=2)
        self.assertEqual(person.imageUrl, "sherlock.watson")

    def test_person_date(self):
        """Person create date is checked."""
        person = Person.objects.get(id=2)
        self.assertIsNotNone(person.createdDate)


# @gktpmuhammed Join and leave community testing.

class JoinAndLeaveTestCase(TestCase):
    def setUp(self):
        self.moderator = Person.objects.create(id=3,
                                               title="Mr",
                                               firstname="John",
                                               lastname="Smith",
                                               location="USA",
                                               email="mr_smith@gmail.com",
                                               age=40,
                                               phone="01234567890",
                                               imageUrl="mr.smith",
                                               createdDate=models.DateTimeField(auto_now_add=True))

        self.moderator2 = Person.objects.create(id=4,
                                               title="Mrs",
                                               firstname="Jane",
                                               lastname="Smith",
                                               location="USA",
                                               email="mrs_smith@gmail.com",
                                               age=40,
                                               phone="01234567890",
                                               imageUrl="mrs.smith",
                                               createdDate=models.DateTimeField(auto_now_add=True))
    
        Community.objects.create(
            id=2,
            name="Dummy",
            description="Dummy Community for test!",
            numUsers=1,
            numPosts=0,
            moderator=self.moderator,
            isPrivate=False,
        )
        
        
    def test_join_community(self):
        person = Person.objects.get(id=3)
        person2 = Person.objects.get(id=4)
        currentCommunity = Community.objects.get(id=2)
        person2.joinedCommunities.add(currentCommunity)
        self.assertIn(person2, currentCommunity.joinedUsers.all())
        
    def test_leave_community(self):
        person = Person.objects.get(id=3)
        person2 = Person.objects.get(id=4)
        currentCommunity = Community.objects.get(id=2)
        person2.joinedCommunities.add(currentCommunity)
        self.assertIn(person2, currentCommunity.joinedUsers.all())
        person2.joinedCommunities.remove(currentCommunity)
        self.assertNotIn(person2, currentCommunity.joinedUsers.all())