from django.contrib.auth.models import User
from django.urls import reverse
from portfolio.models import Project
from rest_framework import status
from rest_framework.test import APITestCase


class ProjectViewSetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_superuser(username="admin", password="password")
        self.project = Project.objects.create(
            title="Test Project",
            description="Test Description",
            status="active",
            type="work",
            role="backend",
        )
        self.list_url = reverse("project-list")

    def test_list_projects(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

    def test_create_project_authenticated(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "title": "New Project",
            "description": "New Description",
            "status": "concept",
            "type": "private",
            "role": "frontend",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)

    def test_create_project_unauthenticated(self):
        data = {
            "title": "New Project",
            "description": "New Description",
            "status": "concept",
            "type": "private",
            "role": "frontend",
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
