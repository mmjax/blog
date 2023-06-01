from djoser.serializers import UserCreatePasswordRetypeSerializer, UserSerializer
from rest_framework import serializers
from rest_framework.relations import SlugRelatedField
from rest_framework.validators import UniqueTogetherValidator


from posts.models import Comment, Post, Group, Like
from users.models import CustomUser, Follow


class CustomUserCreateSerializer(UserCreatePasswordRetypeSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'username',
            'email',
            'password',
            'photo'
        )
        required_fields = (
            'username',
            'email',
            'password'
        )


class CustomUserSerializer(UserSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'username',
            'photo'
        )


class PostSerializer(serializers.ModelSerializer):
    author = SlugRelatedField(slug_field='username', read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        fields = ['author', 'text', 'pub_date', 'author', 'image', 'group', 'like_count', 'is_liked']
        model = Post

    def get_is_liked(self, obj):
        try:
            return Like.objects.filter(
                user=self.context['request'].user,
                liked_post=obj.id
            ).exists()
        except TypeError:
            return False


class CommentSerializer(serializers.ModelSerializer):
    author = SlugRelatedField(
        read_only=True, slug_field='username'
    )

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('post',)


class FollowSerializer(serializers.ModelSerializer):
    user = SlugRelatedField(
        slug_field='username',
        queryset=CustomUser.objects.all(),
        default=serializers.CurrentUserDefault()
    )
    following = SlugRelatedField(
        slug_field='username',
        queryset=CustomUser.objects.all()
    )

    def validate_following(self, value):
        if value == self.context['request'].user:
            raise serializers.ValidationError(
                'Вы не можете подписаться на самого себя'
            )
        return value

    class Meta:
        fields = ['user', 'following']
        validators = [
            UniqueTogetherValidator(
                queryset=Follow.objects.all(),
                fields=['user', 'following'],
                message="На этого автора вы уже подписаны"
            )
        ]
        model = Follow


class LikePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

