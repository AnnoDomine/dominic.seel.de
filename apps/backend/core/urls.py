from typing import cast

from django.conf import settings  # Für MEDIA_URL/ROOT
from django.conf.urls.static import static  # Für MEDIA_URL/ROOT
from django.contrib import admin
from django.urls import URLResolver, include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("portfolio.urls")),  # <-- HIER HINZUFÜGEN: Alle APIs unter /api/
    # Weitere API-Pfade könnten hier folgen
]

# Wichtig: URLs für Mediendateien nur im Debug-Modus hinzufügen
if settings.DEBUG:
    urlpatterns += cast(list[URLResolver], static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))
