from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from .models import CanvasTemplate
from .serializers import CanvasTemplateSerializer, CanvasTemplateListSerializer


class CanvasTemplateList(ListAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CanvasTemplateCreate(CreateAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer

class CanvasTemplateDetail(RetrieveUpdateDestroyAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
