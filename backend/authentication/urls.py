from django.urls import path
from .api import auth_api

urlpatterns = [
    path('', auth_api.urls),
]
