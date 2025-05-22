from rest_framework import serializers
from .models import CourseProgress, LessonProgress, QuizAttempt
from apps.courses.serializers import CourseSerializer
from apps.lessons.serializers import LessonSerializer
from apps.quizzes.serializers import QuizSerializer

class CourseProgressSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    
    class Meta:
        model = CourseProgress
        fields = '__all__'

class LessonProgressSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)
    
    class Meta:
        model = LessonProgress
        fields = '__all__'

class QuizAttemptSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True)
    
    class Meta:
        model = QuizAttempt
        fields = '__all__' 