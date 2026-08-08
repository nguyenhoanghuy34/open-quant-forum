def test_register_invalid_email(client):

    response = client.post(
        "/api/auth/register",
        json={
            "username": "testuser",
            "email": "invalid-email",
            "password": "password123",
        },
    )

    assert response.status_code == 422


def test_register_short_username(client):

    response = client.post(
        "/api/auth/register",
        json={
            "username": "ab",
            "email": "test@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 422


def test_register_short_password(client):

    response = client.post(
        "/api/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "1234567",
        },
    )

    assert response.status_code == 422


def test_register_long_username(client):

    response = client.post(
        "/api/auth/register",
        json={
            "username": "a" * 51,
            "email": "test@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 422


def test_register_long_password(client):

    response = client.post(
        "/api/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "a" * 129,
        },
    )

    assert response.status_code == 422


def test_register_missing_username(client):

    response = client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 422


def test_register_missing_email(client):

    response = client.post(
        "/api/auth/register",
        json={
            "username": "testuser",
            "password": "password123",
        },
    )

    assert response.status_code == 422


def test_register_missing_password(client):

    response = client.post(
        "/api/auth/register",
        json={
            "username": "testuser",
            "email": "test@example.com",
        },
    )

    assert response.status_code == 422


def test_login_invalid_email(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "invalid-email",
            "password": "password123",
        },
    )

    assert response.status_code == 422


def test_login_short_password(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "test@example.com",
            "password": "1234567",
        },
    )

    assert response.status_code == 422


def test_login_missing_email(client):

    response = client.post(
        "/api/auth/login",
        json={
            "password": "password123",
        },
    )

    assert response.status_code == 422


def test_login_missing_password(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "test@example.com",
        },
    )

    assert response.status_code == 422