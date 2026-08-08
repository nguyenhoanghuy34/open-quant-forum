from uuid import uuid4


def create_user_data():

    unique_id = uuid4().hex[:8]

    return {
        "username": f"user_{unique_id}",
        "email": f"{unique_id}@example.com",
        "password": "password123",
    }


def test_register_success(client):

    data = create_user_data()

    response = client.post(
        "/api/auth/register",
        json=data,
    )

    assert response.status_code == 201

    body = response.json()

    assert body["username"] == data["username"]

    assert body["email"] == data["email"]

    assert "password" not in body

    assert "password_hash" not in body

    assert body["is_active"] is True


def test_duplicate_email_is_rejected(client):

    data = create_user_data()

    first_response = client.post(
        "/api/auth/register",
        json=data,
    )

    assert first_response.status_code == 201

    duplicate = {
        **data,
        "username": f"another_{uuid4().hex[:8]}",
    }

    response = client.post(
        "/api/auth/register",
        json=duplicate,
    )

    assert response.status_code == 409

    assert response.json()["detail"] == (
        "Email already registered"
    )


def test_duplicate_username_is_rejected(client):

    data = create_user_data()

    first_response = client.post(
        "/api/auth/register",
        json=data,
    )

    assert first_response.status_code == 201

    duplicate = {
        **data,
        "email": f"{uuid4().hex}@example.com",
    }

    response = client.post(
        "/api/auth/register",
        json=duplicate,
    )

    assert response.status_code == 409

    assert response.json()["detail"] == (
        "Username already registered"
    )


def test_login_success(client):

    data = create_user_data()

    client.post(
        "/api/auth/register",
        json=data,
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": data["email"],
            "password": data["password"],
        },
    )

    assert response.status_code == 200

    body = response.json()

    assert "access_token" in body

    assert body["token_type"] == "bearer"

    assert len(body["access_token"]) > 0


def test_login_wrong_password(client):

    data = create_user_data()

    client.post(
        "/api/auth/register",
        json=data,
    )

    response = client.post(
        "/api/auth/login",
        json={
            "email": data["email"],
            "password": "wrong-password",
        },
    )

    assert response.status_code == 401

    assert response.json()["detail"] == (
        "Invalid email or password"
    )


def test_login_unknown_email(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "unknown@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 401


def test_get_current_user(client):

    data = create_user_data()

    client.post(
        "/api/auth/register",
        json=data,
    )

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": data["email"],
            "password": data["password"],
        },
    )

    token = login_response.json()["access_token"]

    response = client.get(
        "/api/users/me",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200

    body = response.json()

    assert body["username"] == data["username"]

    assert body["email"] == data["email"]


def test_get_current_user_without_token(client):

    response = client.get(
        "/api/users/me"
    )

    assert response.status_code == 401


def test_get_current_user_with_invalid_token(client):

    response = client.get(
        "/api/users/me",
        headers={
            "Authorization": "Bearer invalid-token",
        },
    )

    assert response.status_code == 401