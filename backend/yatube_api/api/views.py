import djoser
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import filters
from rest_framework import mixins, status
from rest_framework import permissions
from djoser.views import UserViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination

from .serializers import (
    CustomUserCreateSerializer, CustomUserSerializer, PostSerializer, CommentSerializer,
    FollowSerializer, GroupSerializer, LikePostSerializer
)
from .permissions import IsAuthorOrReadOnly
from posts.models import Post, Group, Like


class GetAndPostViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
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


class FollowViewSet(GetAndPostViewSet):
    serializer_class = FollowSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('following__username',)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.follower.all()


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class FavoriteBaseViewSet(viewsets.GenericViewSet):
    permission_classes = (djoser.permissions.CurrentUserOrAdmin,)
    serializer_class = LikePostSerializer

    def get_queryset(self):
        return self.request.user.favorite.all().order_by('id')


class FavoriteCreateDestroyViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    FavoriteBaseViewSet
):

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['post_id'] = self.kwargs.get('post_id')
        return context

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            liked_post=get_object_or_404(
                Post, id=self.kwargs.get('post_id')
            ))

    @action(methods=['delete'], detail=True)
    def delete(self, request, post_id):
        get_object_or_404(
            Like,
            user=request.user,
            liked_post=post_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
