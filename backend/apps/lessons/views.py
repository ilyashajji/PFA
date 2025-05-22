from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from .models import Lesson
from .serializers import LessonSerializer
from apps.users.permissions import IsInstructorOrAdmin

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['order', 'created_at']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsInstructorOrAdmin()]
        return super().get_permissions() 