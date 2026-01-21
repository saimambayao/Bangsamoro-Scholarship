from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from drf_spectacular.utils import extend_schema_field
from .models import User, ScholarProfile


class LoginSerializer(serializers.Serializer):
    """Serializer for user login with email or username."""
    username = serializers.CharField(help_text="Email or username")
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(
                request=self.context.get('request'),
                username=username,
                password=password
            )
            if not user:
                raise serializers.ValidationError(
                    'Invalid credentials. Please check your email/username and password.',
                    code='authorization'
                )
            if not user.is_active:
                raise serializers.ValidationError(
                    'This account has been deactivated.',
                    code='authorization'
                )
        else:
            raise serializers.ValidationError(
                'Must include "username" and "password".',
                code='authorization'
            )

        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        user = validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return {
            'token': token.key,
            'user': user
        }

class ScholarProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScholarProfile
        fields = [
            'id', 'current_school', 'course', 'year_level', 'gwa',
            'bio', 'skills', 'achievements', 'portfolio_url', 
            'linkedin_url', 'github_url', 'metadata'
        ]

class UserSerializer(serializers.ModelSerializer):
    profile = ScholarProfileSerializer(read_only=True)
    is_platform_admin = serializers.SerializerMethodField()
    is_entity_staff = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'role', 
            'tenant', 'phone_number', 'date_of_birth', 'profile',
            'is_platform_admin', 'is_entity_staff'
        ]
        read_only_fields = ['id', 'is_platform_admin', 'is_entity_staff']

    @extend_schema_field(serializers.BooleanField())
    def get_is_platform_admin(self, obj):
        return obj.is_platform_admin

    @extend_schema_field(serializers.BooleanField())
    def get_is_entity_staff(self, obj):
        return obj.is_entity_staff

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'role', 'tenant']
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
