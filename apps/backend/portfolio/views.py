from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly  # Für Berechtigungen

from .models import Certificate, Project, RoadmapItem, Technology
from .pagination import StandardResultsSetPagination
from .serializers import CertificateSerializer, ProjectSerializer, RoadmapItemSerializer, TechnologySerializer


class TechnologyViewSet(viewsets.ModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RoadmapItemViewSet(viewsets.ModelViewSet):
    queryset = RoadmapItem.objects.all()
    serializer_class = RoadmapItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ["title", "description", "technologies__name"]
    ordering_fields = ["created_at", "title", "status", "type", "role"]
    ordering = ["-created_at"]


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ["name", "issuing_authority"]
    ordering_fields = ["created_at", "name", "issuing_authority", "issue_date", "expiration_date"]
    ordering = ["-created_at"]
