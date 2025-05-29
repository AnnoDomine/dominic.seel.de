from rest_framework import serializers

from .models import Certificate, Project, RoadmapItem, Technology


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


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


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
