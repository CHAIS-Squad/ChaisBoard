from rest_framework import serializers
from .models import CanvasTemplate


class CanvasTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CanvasTemplate
        fields = "__all__"

class CanvasTemplateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CanvasTemplate
        fields = 'name', 'id', 'description'
