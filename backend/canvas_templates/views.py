from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import CanvasTemplate, PublicCanvasTemplate
from .serializers import CanvasTemplateSerializer, CanvasTemplateListSerializer, PublicCanvasTemplateSerializer, PublicCanvasTemplateListSerializer
from .permissions import IsAdminOrReadOnly


class CanvasTemplateList(ListAPIView):
    serializer_class = CanvasTemplateListSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        owner_id = self.request.query_params.get('owner_id', None)
        return CanvasTemplate.objects.filter(owner_id=owner_id)

class CanvasTemplateCreate(CreateAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer
    permission_classes = [permissions.IsAuthenticated,]

class CanvasTemplateDetail(RetrieveUpdateDestroyAPIView):
    queryset = CanvasTemplate.objects.all()
    serializer_class = CanvasTemplateSerializer
    permission_classes = [permissions.IsAuthenticated,]

class PublicCanvasTemplateList(ListAPIView):
    queryset = PublicCanvasTemplate.objects.all()
    serializer_class = PublicCanvasTemplateListSerializer
    permission_classes = [permissions.AllowAny,]

class PublicCanvasTemplateDetail(RetrieveUpdateDestroyAPIView):
    queryset = PublicCanvasTemplate.objects.all()
    serializer_class = PublicCanvasTemplateSerializer
    permission_classes = [IsAdminOrReadOnly,]

class PublicCanvasTemplateCreate(CreateAPIView):
    queryset = PublicCanvasTemplate.objects.all()
    serializer_class = PublicCanvasTemplateSerializer
    permission_classes = [permissions.IsAdminUser,]
