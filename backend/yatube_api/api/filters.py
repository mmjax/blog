from django_filters import AllValuesMultipleFilter, FilterSet

from posts.models import Post


class PostFilter(FilterSet):
    group = AllValuesMultipleFilter(
        field_name='group__slug',
        conjoined=True
    )
    author = AllValuesMultipleFilter(
        field_name='author__username',
    )

    class Meta:
        model = Post
        fields = ('group', 'author')