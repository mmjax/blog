# Generated by Django 2.2.16 on 2023-06-01 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20230601_2323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.CharField(blank=True, max_length=254, null=True, unique=True, verbose_name='Почта'),
        ),
    ]