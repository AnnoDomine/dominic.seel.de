from django.test import TestCase
from portfolio.models import Project, Technology


class TechnologyModelTest(TestCase):
    def test_create_technology(self):
        tech = Technology.objects.create(name="Python", description="Programming Language")
        self.assertEqual(tech.name, "Python")
        self.assertEqual(str(tech), "Python")


class ProjectModelTest(TestCase):
    def setUp(self):
        self.tech = Technology.objects.create(name="Django")

    def test_create_project(self):
        project = Project.objects.create(
            title="My Portfolio",
            description="A cool portfolio",
            status="active",
            type="private",
            role="full_stack",
        )
        project.technologies.add(self.tech)
        self.assertEqual(project.title, "My Portfolio")
        self.assertEqual(project.technologies.count(), 1)
        self.assertEqual(str(project), "My Portfolio")
