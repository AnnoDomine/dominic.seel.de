from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend  # type: ignore
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from .filtersets import UserFilterSet
from .models import Certificate, Project, RoadmapItem, Technology
from .pagination import StandardResultsSetPagination
from .serializers import (
    CertificateSerializer,
    ProjectListSerializer,
    ProjectSerializer,
    RoadmapItemSerializer,
    TechnologySerializer,
    UserListSerializer,
    UserSerializer,
)


class TechnologyViewSet(viewsets.ModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RoadmapItemViewSet(viewsets.ModelViewSet):
    queryset = RoadmapItem.objects.all()
    serializer_class = RoadmapItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [OrderingFilter, SearchFilter, DjangoFilterBackend]
    filterset_fields = ["status"]
    search_fields = ["title", "description"]
    ordering_fields = ["target_date", "order", "status", "created_at"]
    ordering = ["order", "target_date"]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ["title", "description", "technologies__name"]
    ordering_fields = ["created_at", "title", "status", "type", "role"]
    ordering = ["-created_at"]

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectListSerializer
        return super().get_serializer_class()


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [OrderingFilter, SearchFilter]
    search_fields = ["name", "issuing_authority"]
    ordering_fields = ["created_at", "name", "issuing_authority", "issue_date", "expiration_date"]
    ordering = ["-created_at"]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [OrderingFilter, SearchFilter, DjangoFilterBackend]
    filterset_class = UserFilterSet
    search_fields = ["username", "first_name", "last_name", "email"]
    ordering_fields = ["id", "username", "first_name", "last_name", "email", "date_joined"]
    ordering = ["id"]
    read_only_fields = ("id", "email", "last_login", "date_joined", "is_staff", "is_active", "is_superuser")

    def get_serializer_class(self):
        if self.action == "list":
            return UserListSerializer
        return super().get_serializer_class()

    def get_requested_value(self, key: str) -> bool:
        # User objects are not dicts, use getattr.
        # Safe allow-list to prevent probing for arbitrary user attributes.
        ALLOWED_ATTRIBUTES = ["is_superuser", "is_staff", "is_active"]

        PERMISSION_MAP = {
            "superuser": "is_superuser",
            "staff": "is_staff",
            "active": "is_active",
        }

        attr_name = PERMISSION_MAP.get(key, key)

        if attr_name not in ALLOWED_ATTRIBUTES:
            return False

        return getattr(self.request.user, attr_name, False)

    @action(detail=False, methods=["get"], url_path="permission", permission_classes=[IsAuthenticated])
    def check_user_permission(self, request):
        """
        Check if the currently authenticated user has a specific permission/attribute.
        Default is 'superuser'.
        """
        request_type: str = request.query_params.get("type", "superuser")
        has_permission = self.get_requested_value(request_type)
        return Response({"has_permission": has_permission})
