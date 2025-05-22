import os
import django
from django.utils import timezone
from django.contrib.auth import get_user_model
from apps.courses.models import Category, Course
from apps.lessons.models import Lesson
from apps.quizzes.models import Quiz, Question, Answer

# Configuration de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'elearning.settings')
django.setup()

User = get_user_model()

def create_test_data():
    # Créer des utilisateurs
    instructor = User.objects.create_user(
        username='instructor',
        email='instructor@example.com',
        password='password123',
        role='instructor',
        is_staff=True
    )

    student = User.objects.create_user(
        username='student',
        email='student@example.com',
        password='password123',
        role='student'
    )

    # Créer des catégories
    categories = [
        Category.objects.create(
            name="Développement Web",
            description="Cours de développement web full stack"
        ),
        Category.objects.create(
            name="Data Science",
            description="Cours de science des données et intelligence artificielle"
        ),
        Category.objects.create(
            name="Marketing Digital",
            description="Cours de marketing digital et réseaux sociaux"
        )
    ]

    # Créer des cours
    courses = [
        Course.objects.create(
            title="Développement Web Full Stack",
            description="Apprenez à développer des applications web complètes",
            instructor=instructor,
            category=categories[0],
            price=49.99,
            duration=120,
            level="beginner",
            is_published=True
        ),
        Course.objects.create(
            title="Introduction à la Data Science",
            description="Découvrez les bases de la science des données",
            instructor=instructor,
            category=categories[1],
            price=59.99,
            duration=90,
            level="intermediate",
            is_published=True
        ),
        Course.objects.create(
            title="Marketing Digital Avancé",
            description="Maîtrisez les techniques de marketing digital",
            instructor=instructor,
            category=categories[2],
            price=39.99,
            duration=60,
            level="advanced",
            is_published=True
        )
    ]

    # Créer des leçons pour chaque cours
    for course in courses:
        for i in range(1, 4):
            lesson = Lesson.objects.create(
                course=course,
                title=f"Leçon {i} de {course.title}",
                content=f"Contenu de la leçon {i}",
                duration=30,
                order=i
            )

            # Créer un quiz pour chaque leçon
            quiz = Quiz.objects.create(
                course=course,
                lesson=lesson,
                title=f"Quiz de la leçon {i}",
                description=f"Testez vos connaissances de la leçon {i}",
                passing_score=70
            )

            # Créer des questions pour chaque quiz
            for j in range(1, 4):
                question = Question.objects.create(
                    quiz=quiz,
                    text=f"Question {j} du quiz",
                    points=1,
                    order=j
                )

                # Créer des réponses pour chaque question
                for k in range(1, 4):
                    Answer.objects.create(
                        question=question,
                        text=f"Réponse {k}",
                        is_correct=(k == 1)
                    )

if __name__ == '__main__':
    print("Création des données de test...")
    create_test_data()
    print("Données de test créées avec succès!") 