from .models import User
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# Fonction pour générer les tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Sérialiseur pour l'enregistrement de l'utilisateur
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Cet email est déjà utilisé.")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Le mot de passe doit comporter au moins 8 caractères.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                "message": "Utilisateur créé avec succès",
                "tokens": tokens,
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            }, status=status.HTTP_201_CREATED)
        return Response({
            "message": "Erreur de validation",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        

class LoginView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        user = User.objects.get(id=2) 
        return Response({
            "message": "Utilisateur connecté",
            "user": {
                "username": user.username,
             
            }
        }, status=200)

    def post(self, request):
        identifier = request.data.get('email')  # ou username
        password = request.data.get('password')

        if not identifier or not password:
            return Response({"message": "Email/Username et mot de passe sont requis."}, status=status.HTTP_400_BAD_REQUEST)

        # Essayer avec email
        user = User.objects.filter(email=identifier, is_active=True).first()
        if not user:
            # Sinon essayer avec username
            user = User.objects.filter(username=identifier, is_active=True).first()

        if not user :
            return Response({"message": "Identifiants invalides."}, status=status.HTTP_400_BAD_REQUEST)

        tokens = get_tokens_for_user(user)
        return Response({
            "message": "Connexion réussie",
            "tokens": tokens,
            "user": {
                "username": user.username,
                "email": user.email,
            }
        }, status=status.HTTP_200_OK)
