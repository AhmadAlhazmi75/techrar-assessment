from ninja.security import HttpBearer
from .models import Token

class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        try:
            return Token.objects.get(key=token).user
        except Token.DoesNotExist:
            return None
