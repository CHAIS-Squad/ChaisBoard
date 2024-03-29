from django.urls import path
from .views import CanvasTemplateList, CanvasTemplateCreate, CanvasTemplateDetail, PublicCanvasTemplateList, PublicCanvasTemplateCreate, PublicCanvasTemplateDetail


urlpatterns = [
    # user
    path('list/', CanvasTemplateList.as_view(), name='canvas_template_list'),
    path('<int:pk>/', CanvasTemplateDetail.as_view(), name='canvas_template_detail'),
    path('create/', CanvasTemplateCreate.as_view(), name='canvas_template_create'),
    # public
    path('public/list/', PublicCanvasTemplateList.as_view(), name='public_canvas_template_list'),
    path('public/<int:pk>/', PublicCanvasTemplateDetail.as_view(), name='public_canvas_template_detail'),
    path('public/create/', PublicCanvasTemplateCreate.as_view(), name='public_canvas_template_create'),
]
