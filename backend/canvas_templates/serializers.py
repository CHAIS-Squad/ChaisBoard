from rest_framework import serializers
from .models import CanvasTemplate, PublicCanvasTemplate


class CanvasTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CanvasTemplate
        fields = "__all__"

class CanvasTemplateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CanvasTemplate
        fields = 'name', 'id', 'description', 'owner_id'

class PublicCanvasTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicCanvasTemplate
        fields = "__all__"

class PublicCanvasTemplateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicCanvasTemplate
        fields = 'name', 'id', 'description'
