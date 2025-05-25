from rest_framework import serializers

from .models import Certificate, Project, RoadmapItem


class RoadmapItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapItem
        fields = "__all__"  # Zeigt alle Felder des Modells
        read_only_fields = ("created_at", "updated_at")  # Diese Felder sind nur lesbar


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")
