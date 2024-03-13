from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from .models import CanvasTemplate
from .serializers import CanvasTemplateSerializer, CanvasTemplateListSerializer


class CanvasTemplateList(ListAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateListSerializer

class CanvasTemplateCreate(CreateAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer

class CanvasTemplateDetail(RetrieveUpdateDestroyAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer
