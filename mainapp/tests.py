from django.test import TestCase
from mainapp.models import *
# Create your tests here.

class CommunityTestCase(TestCase):
    def setUp(self):
        self.moderator = Person.objects.create(id=1,
        title="Mr",
        firstname="John",
        lastname="Doe",
        location = "Istanbul",
        email = "john.doe@gmail.com",
        age=30,
        phone="01234567890",
        imageUrl="www.xxx.yyy.zzz",
        createdDate = models.DateTimeField(auto_now_add=True))

        Community.objects.create(
        id=1,
        name="BUDDY",
        description = "Boun ogrencileri burada!",
        numUsers=1,
        numPosts=0,
        moderator = self.moderator,
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
        """Number of users in the community is checked."""
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

    
    
    
    
    
    
