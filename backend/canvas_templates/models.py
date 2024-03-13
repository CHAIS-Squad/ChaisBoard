from django.db import models
from django.contrib.auth import get_user_model
from django.urls import reverse


class CanvasTemplate(models.Model):
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=256)
    konva_object = models.JSONField(default=list, null=True)
    owner = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, null=True, blank=True
    )

    def get_absolute_url(self):
        return reverse('canvas_template_detail', args=[str(self.id)])
