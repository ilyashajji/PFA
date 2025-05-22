from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseProgressViewSet, LessonProgressViewSet, QuizAttemptViewSet

router = DefaultRouter()
router.register('courses', CourseProgressViewSet, basename='course-progress')
router.register('lessons', LessonProgressViewSet, basename='lesson-progress')
router.register('quizzes', QuizAttemptViewSet, basename='quiz-attempt')

urlpatterns = [
    path('', include(router.urls)),
] 