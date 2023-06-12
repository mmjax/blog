from django_filters import AllValuesMultipleFilter, FilterSet

from posts.models import Post


class PostFilter(FilterSet):
    group = AllValuesMultipleFilter(
        field_name='group__slug',
        conjoined=True
    )

    class Meta:
        model = Post
        fields = ('group',)