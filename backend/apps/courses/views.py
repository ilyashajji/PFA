from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Course
from .serializers import CategorySerializer, CourseSerializer
from apps.users.permissions import IsInstructorOrAdmin

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsInstructorOrAdmin]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'level', 'is_published']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'price', 'duration']

    def get_queryset(self):
        queryset = Course.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_published=True)
        return queryset

    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        course = self.get_object()
        # Logique d'inscription au cours
        return Response({'status': 'enrolled'}) 