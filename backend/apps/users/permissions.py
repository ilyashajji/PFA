from rest_framework import permissions

class IsInstructorOrAdmin(permissions.BasePermission):
    """
    Permission personnalisée pour n'autoriser que les instructeurs et les administrateurs
    """
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est authentifié
        if not request.user or not request.user.is_authenticated:
            return False
        
        # Autorise les administrateurs et les instructeurs
        return request.user.role in ['admin', 'instructor']

class IsOwnerOrInstructor(permissions.BasePermission):
    """
    Permission personnalisée pour n'autoriser que le propriétaire de la ressource
    ou un instructeur
    """
    def has_object_permission(self, request, view, obj):
        # Les administrateurs et instructeurs ont toujours accès
        if request.user.role in ['admin', 'instructor']:
            return True
        
        # Vérifie si l'utilisateur est le propriétaire de la ressource
        return obj == request.user
