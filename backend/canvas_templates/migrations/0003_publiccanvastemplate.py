# Generated by Django 4.2.11 on 2024-03-14 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('canvas_templates', '0002_rename_konvaobject_canvastemplate_konva_objects'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublicCanvasTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('description', models.CharField(max_length=256)),
                ('konva_objects', models.JSONField(default=list, null=True)),
            ],
        ),
    ]
