from django.test import TestCase
from mainapp.models import *
# Create your tests here.


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
