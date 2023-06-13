import djoser
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import filters
from rest_framework import mixins, status
from rest_framework import permissions
from djoser.views import UserViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination

from .serializers import (
    CustomUserCreateSerializer, CustomUserSerializer, PostSerializer, CommentSerializer,
    FollowSerializer, GroupSerializer, LikePostSerializer, FollowPostDeleteSerializer
)
from .permissions import IsAuthorOrReadOnly
from posts.models import Post, Group, Like
from users.models import Follow, CustomUser
from .filters import PostFilter


class GetDestroyPostViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                        mixins.DestroyModelMixin,
                        viewsets.GenericViewSet):
    pass


class CustomUserViewSet(UserViewSet):

    def get_serializer_class(self):
        if self.action == 'create':
            return CustomUserCreateSerializer
        return CustomUserSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrReadOnly]
    filterset_class = PostFilter
    filter_backends = (DjangoFilterBackend,)
    pagination_class = LimitOffsetPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def get_post(self):
        return get_object_or_404(Post, id=self.kwargs.get('post_id'))

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, post=self.get_post())

    def get_queryset(self):
        return self.get_post().comments.all()


class FollowViewSet(GetDestroyPostViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('following__username',)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FollowSerializer
        return FollowPostDeleteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.follower.all()

    @action(methods=['delete'], detail=True)
    def delete(self, request):
        following = CustomUser.objects.get(username=self.request.data['following'])
        get_object_or_404(
            Follow,
            user=request.user,
            following=following).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class LikeBaseViewSet(viewsets.GenericViewSet):
    permission_classes = (djoser.permissions.CurrentUserOrAdmin,)
    serializer_class = LikePostSerializer

    def get_queryset(self):
        return self.request.user.favorite.all().order_by('id')


class LikeCreateDestroyViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    LikeBaseViewSet
):

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['post_id'] = self.kwargs.get('post_id')
        return context

    def perform_create(self, serializer):
        post = Post.objects.get(id=self.kwargs.get('post_id'))
        post.like_count = post.like_count + 1
        post.save()
        serializer.save(
            user=self.request.user,
            liked_post=get_object_or_404(
                Post, id=self.kwargs.get('post_id')
            ))

    @action(methods=['delete'], detail=True)
    def delete(self, request, post_id):
        post = Post.objects.get(id=post_id)
        post.like_count = post.like_count - 1
        post.save()
        get_object_or_404(
            Like,
            user=request.user,
            liked_post=post_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
