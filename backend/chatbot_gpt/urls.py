from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from crewai_api.api import router as crewai_router
from authentication.api import router as auth_router
from ticketing.api import router as ticketing_router

api = NinjaAPI()
api.add_router("/crewai/", crewai_router)
api.add_router("/auth/", auth_router)
api.add_router("/tickets/", ticketing_router)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),
]
