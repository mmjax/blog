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
            'password'
        )


class CustomUserSerializer(UserSerializer):
    is_following = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'username',
            'photo',
            'is_following'
        )


    def get_is_following(self, obj):
        try:
            return Follow.objects.filter(
                user=self.context['request'].user,
                following=obj.id
            ).exists()
        except TypeError:
            return False

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    group = SlugRelatedField(
        slug_field='slug',
        queryset=Group.objects.all()
    )

    class Meta:
        fields = [
            'id',
            'author', 'text', 'pub_date',
            'author', 'image', 'group',
            'like_count', 'is_liked'
        ]
        read_only_fields = ('like_count',)
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
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('post',)


class FollowPostDeleteSerializer(serializers.ModelSerializer):
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


class FollowSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    following = CustomUserSerializer(read_only=True)

    class Meta:
        fields = ['user', 'following']
        model = Follow


class LikePostSerializer(serializers.ModelSerializer):
    liked_post = PostSerializer(read_only=True)

    class Meta:
        model = Like
        fields = ('id', 'liked_post',)

    def validate(self, attrs):
        if Like.objects.filter(
            user=CustomUser.objects.get(
                id=self.context['request'].user.id
            ),
            liked_post=Post.objects.get(
                id=self.context['post_id']
            )
        ).exists():
            raise serializers.ValidationError(
                'Этот товар уже есть у вас в избранном!')
        return attrs



