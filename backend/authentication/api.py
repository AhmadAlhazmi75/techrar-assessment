from ninja import Router, Schema
from ninja.errors import HttpError
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Token
from .auth import AuthBearer
import secrets
from django.db import IntegrityError


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

class UserOutput(Schema):
    id: int
    username: str
    email: str
    is_admin: bool # to add some custom pages or permissions

@router.post("/register", response=RegisterOutput)
def register(request, data: RegisterInput):
    """
    Register a new user.

    Args:
        request: The HTTP request object.
        data (RegisterInput): The input schema containing username, email, and password.

    Returns:
        RegisterOutput: The output schema containing the generated token.
    """
    try:
        user = User.objects.create_user(username=data.username, email=data.email, password=data.password)
        token = Token.objects.create(user=user, key=secrets.token_hex(20))
        return {"token": token.key}
    except IntegrityError as e:
        if 'username' in str(e):
            raise HttpError(400, "Username already exists")
        elif 'email' in str(e):
            raise HttpError(400, "Email already exists")
        else:
            raise HttpError(400, "Username or email already exists")


@router.post("/login", response=LoginOutput)
def login(request, data: LoginInput):
    """
    Log in an existing user.

    Args:
        request: The HTTP request object.
        data (LoginInput): The input schema containing username and password.

    Returns:
        LoginOutput: The output schema containing the generated token.
    """
    user = authenticate(username=data.username, password=data.password)
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        if not token.key:
            token.key = secrets.token_hex(20)
            token.save()
        return {"token": token.key}
    raise HttpError(401, "Invalid credentials")

@router.post("/logout", auth=auth)
def logout(request):
    """
    Log out the current user.

    Args:
        request: The HTTP request object.

    Returns:
        dict: A dictionary containing a success message.
    """
    Token.objects.filter(user=request.auth).delete()
    return {"detail": "Logged out successfully"}

@router.get("/me", response=UserOutput, auth=auth)
def me(request):
    """
    Retrieve the current user's information.

    Args:
        request: The HTTP request object.

    Returns:
        UserOutput: The output schema containing the user's information.
    """
    user = request.auth
    return UserOutput(
        id=user.id,
        username=user.username,
        email=user.email,
        is_admin=user.is_superuser
    )
