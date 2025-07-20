from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Certificate, Project, RoadmapItem, Technology


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ("id", "human_readable_name", "description", "name")


class RoadmapItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapItem
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class ProjectSerializer(serializers.ModelSerializer):
    # technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class ProjectListSerializer(serializers.ModelSerializer):
    # technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            "id",
            "title",
            "status",
            "type",
            "created_at",
        )
        read_only_fields = ("created_at", "updated_at")


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "last_login",
            "date_joined",
            "is_staff",
            "is_active",
            "is_superuser",
        )
        read_only_fields = ("id", "email", "last_login", "date_joined", "is_staff", "is_active", "is_superuser")


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "date_joined",
            "is_staff",
            "is_active",
        )
        read_only_fields = (
            "id",
            "email",
        )
