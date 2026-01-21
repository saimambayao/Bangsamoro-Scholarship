from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
from apps.core.views import BaseTenantMixin
from .models import User, ScholarProfile
from .serializers import UserSerializer, ScholarProfileSerializer, RegisterSerializer, LoginSerializer


class LoginView(APIView):
    """API endpoint for user login with email or username."""
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        request=LoginSerializer,
        responses={200: UserSerializer},
        description="Login with email or username and password. Returns auth token and user data."
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        result = serializer.save()

        user_serializer = UserSerializer(result['user'])
        return Response({
            'token': result['token'],
            'user': user_serializer.data
        })

class UserViewSet(BaseTenantMixin, viewsets.ModelViewSet):
    """
    ViewSet for managing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get', 'put', 'patch'], url_path='me')
    def me(self, request):
        """
        Endpoint to get or update the current user's profile.
        """
        user = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ScholarProfileViewSet(BaseTenantMixin, viewsets.ModelViewSet):
    """
    ViewSet for managing scholar profiles.
    """
    queryset = ScholarProfile.objects.all()
    serializer_class = ScholarProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Additional filtering: Users only see their own profile, admins see tenant profiles
        queryset = super().get_queryset()
        if self.request.user.role == 'applicant':
            return queryset.filter(user=self.request.user)
        return queryset
