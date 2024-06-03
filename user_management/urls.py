from django.urls import path, include
from .api import UserApi, LoginApi, RegisterApi
from knox import views as knox_views

urlpatterns = [
    path('', include('knox.urls')),
    path('login', LoginApi.as_view()),
    path('register/', RegisterApi.as_view(), name='register'),
    path('user', UserApi.as_view()),
    path('logout', knox_views.LogoutView.as_view(),
         name='knox_logout'),
]
