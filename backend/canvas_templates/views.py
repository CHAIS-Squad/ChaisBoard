from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from .models import CanvasTemplate
from .serializers import CanvasTemplateSerializer, CanvasTemplateListSerializer


class CanvasTemplateList(ListAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateListSerializer

class CanvasTemplateRetrieve(RetrieveAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer

class CanvasTemplateCreate(CreateAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer

class CanvasTemplateUpdate(UpdateAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer

class CanvasTemplateDestroy(DestroyAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer
