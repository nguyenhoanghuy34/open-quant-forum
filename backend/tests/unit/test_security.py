from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)


def test_password_hash_is_not_plaintext():

    password = "password123"

    hashed = hash_password(password)

    assert hashed != password


def test_password_hash_can_be_verified():

    password = "password123"

    hashed = hash_password(password)

    assert verify_password(
        password,
        hashed,
    )


def test_wrong_password_fails():

    password = "password123"

    hashed = hash_password(password)

    assert not verify_password(
        "wrong-password",
        hashed,
    )


def test_access_token_is_created():

    token = create_access_token(
        subject="1"
    )

    assert isinstance(token, str)

    assert len(token) > 0