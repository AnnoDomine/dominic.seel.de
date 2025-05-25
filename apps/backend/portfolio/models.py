from django.db import models


# Abstrakte Basisklasse für gemeinsame Felder
class BaseModel(models.Model):
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)
    # Füge optional einen ForeignKey zum User hinzu, wenn jeder Eintrag einem User gehört
    # owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        abstract = True  # Bedeutet, Django erstellt keine Tabelle für diese Klasse


class RoadmapItem(BaseModel):
    STATUS_CHOICES = [
        ("planned", "Planned"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("on_hold", "On Hold"),
    ]

    title: models.CharField = models.CharField(max_length=200)
    description: models.TextField = models.TextField(blank=True, null=True)
    target_date: models.DateField = models.DateField(blank=True, null=True)
    status: models.CharField = models.CharField(max_length=20, choices=STATUS_CHOICES, default="planned")
    order: models.IntegerField = models.IntegerField(default=0, help_text="Order in which items appear")

    class Meta:
        ordering = ["order", "target_date", "created_at"]  # Sortierung nach Reihenfolge

    def __str__(self):
        return self.title


class Project(BaseModel):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("archived", "Archived"),
        ("concept", "Concept"),
    ]

    title: models.CharField = models.CharField(max_length=250)
    description: models.TextField = models.TextField()
    technologies: models.JSONField = models.JSONField(
        default=list, blank=True, help_text="List of technologies used (e.g., ['Django', 'React'])"
    )
    project_url: models.URLField = models.URLField(max_length=500, blank=True, null=True)
    github_url: models.URLField = models.URLField(max_length=500, blank=True, null=True)
    image: models.ImageField = models.ImageField(upload_to="projects/", blank=True, null=True)  # Benötigt Pillow
    status: models.CharField = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    is_featured: models.BooleanField = models.BooleanField(default=False, help_text="Display on homepage?")

    class Meta:
        ordering = ["-created_at"]  # Neueste Projekte zuerst
        verbose_name_plural = "Projects"  # Für bessere Anzeige im Admin

    def __str__(self):
        return self.title


class Certificate(BaseModel):
    name: models.CharField = models.CharField(max_length=250)
    issuing_authority: models.CharField = models.CharField(max_length=250)
    issue_date: models.DateField = models.DateField()
    expiration_date: models.DateField = models.DateField(blank=True, null=True)
    credential_id: models.CharField = models.CharField(max_length=100, blank=True, null=True)
    credential_url: models.URLField = models.URLField(max_length=500, blank=True, null=True)
    image: models.ImageField = models.ImageField(
        upload_to="certificates/", blank=True, null=True
    )  # Optional: Bild des Zertifikats

    class Meta:
        ordering = ["-issue_date"]  # Neueste Zertifikate zuerst
        verbose_name_plural = "Certificates"

    def __str__(self):
        return self.name
