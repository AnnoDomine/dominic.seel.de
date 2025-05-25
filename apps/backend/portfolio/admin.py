from django.contrib import admin

from .models import Certificate, Project, RoadmapItem


@admin.register(RoadmapItem)
class RoadmapItemAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "target_date", "order", "created_at")
    list_filter = ("status",)
    search_fields = ("title", "description")
    list_editable = ("status", "order")  # Ermöglicht Bearbeitung direkt in der Liste


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "is_featured", "created_at")
    list_filter = ("status", "is_featured")
    search_fields = ("title", "description", "technologies")
    list_editable = ("status", "is_featured")


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("name", "issuing_authority", "issue_date", "expiration_date", "created_at")
    list_filter = ("issuing_authority",)
    search_fields = ("name", "issuing_authority")
