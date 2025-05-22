from rest_framework import serializers
from .models import Lesson
from apps.courses.serializers import CourseSerializer

class LessonSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    
    class Meta:
        model = Lesson
        fields = '__all__' 