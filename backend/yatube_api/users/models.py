from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.CharField(
        blank=True,
        null=True,
        max_length=254,
        verbose_name='Почта'
    )
    photo = models.ImageField(
        blank=True,
        null=True,
        upload_to='users/images/',
        verbose_name='Фото'
    )

    class Meta(AbstractUser.Meta):
        ordering = ('username',)


class Follow(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='follower',
    )
    following = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='following',
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'following'],
                name='uniq_followers'
            )
        ]
