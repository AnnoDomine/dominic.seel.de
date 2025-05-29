from django.contrib import admin

from .models import Certificate, Project, RoadmapItem, Technology


@admin.register(RoadmapItem)
class RoadmapItemAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "target_date", "order", "created_at")
    list_filter = ("status",)
    search_fields = ("title", "description")
    list_editable = ("status", "order")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "type", "role", "is_featured", "created_at")
    list_filter = ("status", "type", "role", "is_featured")
    search_fields = ("title", "description", "technologies")
    filter_horizontal = ("technologies",)


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("name", "issuing_authority", "issue_date", "expiration_date", "created_at")
    list_filter = ("issuing_authority",)
    search_fields = ("name", "issuing_authority")


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ("name", "human_readable_name", "created_at")
    search_fields = ("name", "human_readable_name", "description")
