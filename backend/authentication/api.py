from ninja import Router, Schema
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Token
from .auth import AuthBearer
import secrets
from ninja.errors import HttpError

auth = AuthBearer()
router = Router()

class RegisterInput(Schema):
    username: str
    email: str
    password: str

class RegisterOutput(Schema):
    token: str

class LoginInput(Schema):
    username: str
    password: str

class LoginOutput(Schema):
    token: str

@router.post("/register", response=RegisterOutput)
def register(request, data: RegisterInput):
    try:
        validate_password(data.password)
    except ValidationError as e:
        return {"error": e.messages}

    if User.objects.filter(username=data.username).exists():
        return {"error": "Username already exists"}

    if User.objects.filter(email=data.email).exists():
        return {"error": "Email already exists"}

    user = User.objects.create_user(
        username=data.username,
        email=data.email,
        password=data.password
    )
    token = Token.objects.create(user=user, key=secrets.token_hex(20))
    return {"token": token.key}

@router.post("/login")
def login(request, data: LoginInput):
    user = authenticate(username=data.username, password=data.password)
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        if not token.key:
            token.key = secrets.token_hex(20)
            token.save()
        return {"token": token.key}
    return {"error": "Invalid credentials"}

@router.post("/logout", auth=auth)
def logout(request):
    Token.objects.filter(user=request.auth).delete()
    return {"message": "Logged out successfully"}

@router.get("/me", auth=auth)
def me(request):
    return {"id": request.auth.id, "username": request.auth.username, "email": request.auth.email}
