from django.urls import path
from .views import CanvasTemplateList, CanvasTemplateRetrieve, CanvasTemplateCreate, CanvasTemplateUpdate, CanvasTemplateDestroy


urlpatterns = [
    path('list/', CanvasTemplateList.as_view(), name='canvas_template_list'),
    path('<int:pk>/', CanvasTemplateRetrieve.as_view(), name='canvas_template_detail'),
]
