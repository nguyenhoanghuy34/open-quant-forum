from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import (
    get_user_by_email,
)


def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User | None:

    user = get_user_by_email(
        db,
        email,
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash,
    ):
        return None

    if not user.is_active:
        return None

    return user


def login_user(
    db: Session,
    email: str,
    password: str,
) -> str | None:

    user = authenticate_user(
        db=db,
        email=email,
        password=password,
    )

    if not user:
        return None

    return create_access_token(
        subject=str(user.id)
    )
