import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base
from app.main import app
from app.api.deps import get_database


from sqlalchemy import create_engine
from sqlalchemy.engine import URL


TEST_DATABASE_URL = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="Hoanghuy@04",
    host="localhost",
    port=5432,
    database="open_quant_forum_test",
)

engine = create_engine(
    TEST_DATABASE_URL,
    pool_pre_ping=True,
)

TestingSessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


@pytest.fixture(scope="session", autouse=True)
def setup_database():

    Base.metadata.create_all(
        bind=engine
    )

    yield

    Base.metadata.drop_all(
        bind=engine
    )


@pytest.fixture
def db():

    session = TestingSessionLocal()

    try:

        yield session

    finally:

        session.rollback()
        session.close()


@pytest.fixture
def client(db):

    def override_get_database():

        yield db

    app.dependency_overrides[
        get_database
    ] = override_get_database

    with TestClient(app) as test_client:

        yield test_client

    app.dependency_overrides.clear()