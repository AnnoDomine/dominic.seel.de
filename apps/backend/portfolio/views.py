from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly  # Für Berechtigungen

from .models import Certificate, Project, RoadmapItem
from .serializers import CertificateSerializer, ProjectSerializer, RoadmapItemSerializer


class RoadmapItemViewSet(viewsets.ModelViewSet):
    queryset = RoadmapItem.objects.all()
    serializer_class = RoadmapItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Initial, wird später für SSO angepasst
    pagination_class = None  # Keine Paginierung für Roadmap-Items


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None  # Keine Paginierung für Projekte
    filterset_fields = ["status", "type"]  # Filtermöglichkeiten für Status und Typ


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None  # Keine Paginierung für Zertifikate
