from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user_repository import (
    create_user,
    get_user_by_email,
    get_user_by_username,
)


def register_user(
    db: Session,
    username: str,
    email: str,
    password: str,
) -> User:

    existing_email = get_user_by_email(
        db,
        email,
    )

    if existing_email:
        raise ValueError("Email already registered")

    existing_username = get_user_by_username(
        db,
        username,
    )

    if existing_username:
        raise ValueError("Username already registered")

    password_hash = hash_password(password)

    return create_user(
        db=db,
        username=username,
        email=email,
        password_hash=password_hash,
    )
