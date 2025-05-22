from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, CourseViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 