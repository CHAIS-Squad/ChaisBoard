from django.urls import path
from .views import CanvasTemplateList, CanvasTemplateCreate, CanvasTemplateDetail


urlpatterns = [
    path('list/', CanvasTemplateList.as_view(), name='canvas_template_list'),
    path('<int:pk>/', CanvasTemplateDetail.as_view(), name='canvas_template_detail'),
    path('create/', CanvasTemplateCreate.as_view(), name='canvas_template_create'),
]
