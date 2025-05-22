# apps/users/urls.py
from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='custom_login'),
    path('register/', RegisterView.as_view(), name='custom_register'),
]
