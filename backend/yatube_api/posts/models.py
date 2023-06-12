from django.db import models
from users.models import CustomUser


class Group(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()

    def __str__(self):
        return self.title


class Post(models.Model):
    text = models.TextField()
    pub_date = models.DateTimeField(
        'Дата публикации',
        auto_now_add=True
    )
    author = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    image = models.ImageField(
        upload_to='posts/images',
        null=True,
        blank=True
    )
    group = models.ForeignKey(
        Group,
        on_delete=models.SET_NULL,
        related_name="posts",
        blank=True,
        null=True
    )
    like_count = models.IntegerField(
        verbose_name="Лайки у постов",
        default=0
    )

    def __str__(self):
        return self.text[:15]

    class Meta:
        ordering = ('pub_date',)


class Comment(models.Model):
    author = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    text = models.TextField()
    created = models.DateTimeField(
        'Дата добавления',
        auto_now_add=True,
        db_index=True
    )

    class Meta:
        ordering = ('-created',)


class Like(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='like',
        verbose_name='Пользователь'
    )
    liked_post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='liked_post',
        verbose_name='Пост'
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=('user', 'liked_post'),
                name='unique like'
            )
        ]

    def __str__(self):
        return (
            f'user: {self.user.email}, '
            f'favourite: {self.liked_post.id}'
        )
