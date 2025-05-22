from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer
from apps.users.permissions import IsInstructorOrAdmin

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsInstructorOrAdmin()]
        return super().get_permissions()

    @action(detail=True, methods=['post'])
    def submit_answers(self, request, pk=None):
        quiz = self.get_object()
        answers = request.data.get('answers', [])
        score = 0
        total_points = 0

        for answer in answers:
            question = Question.objects.get(id=answer['question_id'])
            total_points += question.points
            if Answer.objects.filter(id=answer['answer_id'], is_correct=True).exists():
                score += question.points

        passed = (score / total_points * 100) >= quiz.passing_score

        # Créer une tentative de quiz
        attempt = QuizAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            score=score,
            passed=passed
        )

        return Response({
            'score': score,
            'total_points': total_points,
            'passed': passed,
            'attempt_id': attempt.id
        }) 