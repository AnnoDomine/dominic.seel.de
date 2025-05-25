from rest_framework.routers import DefaultRouter

from .views import CertificateViewSet, ProjectViewSet, RoadmapItemViewSet

router = DefaultRouter()
router.register(r"roadmap", RoadmapItemViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"certificates", CertificateViewSet)

urlpatterns = router.urls
