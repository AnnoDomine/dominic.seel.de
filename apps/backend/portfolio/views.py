from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly  # Für Berechtigungen

from .models import Certificate, Project, RoadmapItem
from .serializers import CertificateSerializer, ProjectSerializer, RoadmapItemSerializer


class RoadmapItemViewSet(viewsets.ModelViewSet):
    queryset = RoadmapItem.objects.all()
    serializer_class = RoadmapItemSerializer
    # Berechtigungen: Authentifizierte Benutzer können bearbeiten, andere nur lesen
    permission_classes = [IsAuthenticatedOrReadOnly]  # Initial, wird später für SSO angepasst


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
