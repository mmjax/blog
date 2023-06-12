from django.urls import path
from django.urls import path, include
from rest_framework import routers
from api.views import (
    PostViewSet, CommentViewSet, FollowViewSet, CustomUserViewSet,
    GroupViewSet, LikeCreateDestroyViewSet
)


router_v1 = routers.DefaultRouter()

router_v1.register(r'posts', PostViewSet, basename='posts')
router_v1.register(r'groups', GroupViewSet, basename='groups')
router_v1.register(r'follow', FollowViewSet, basename='follow')
router_v1.register(
    r'posts/(?P<post_id>\d+)/comments',
    CommentViewSet,
    basename='comments'
)
router_v1.register(
    r'users',
    CustomUserViewSet,
    basename='users'
)
router_v1.register(
    r'posts/(?P<post_id>\d+)/like',
    LikeCreateDestroyViewSet,
    basename='like'
)



urlpatterns = [
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router_v1.urls)),
    path('', include('djoser.urls.base')),
]
