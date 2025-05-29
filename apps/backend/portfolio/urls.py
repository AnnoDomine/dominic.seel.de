from rest_framework.routers import DefaultRouter

from .views import CertificateViewSet, ProjectViewSet, RoadmapItemViewSet, TechnologyViewSet

router = DefaultRouter()
router.register(r"roadmap", RoadmapItemViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"certificates", CertificateViewSet)
router.register(r"technologies", TechnologyViewSet)

urlpatterns = router.urls
