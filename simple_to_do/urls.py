
from django.contrib import admin
from django.urls import path, include
from frontend.views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tasks/', include('task.urls')),
    path('api/auth/', include('user_management.urls')),
    path('', FrontendAppView.as_view()),  # Catch-all pattern for React
]
