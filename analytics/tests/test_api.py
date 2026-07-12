from fastapi.testclient import TestClient
from src.main import app
import pytest

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to TransitOps Analytics API"}

def test_health_check(mocker):
    # Mock Neo4j and Postgres connections for tests
    mocker.patch('src.core.neo4j_client.neo4j_client.verify_connectivity', return_value=True)
    mocker.patch('src.core.postgres_client.postgres_client.connect', return_value=True)
    
    response = client.get("/health/")
    assert response.status_code == 200
    assert response.json()["status"] == "up"

def test_nlp_api(mocker):
    mocker.patch('src.nlp.pipeline.nlp_pipeline.process_query', return_value={"intent": "Query", "entities": {}})
    response = client.post("/nlp/query", json={"query": "test query"})
    assert response.status_code == 200
    assert response.json()["intent"] == "Query"

def test_voice_api(mocker):
    mocker.patch('src.voice.intent_parser.voice_intent_parser.parse_voice_command', return_value={"intent": "Start Trip", "requires_confirmation": False})
    response = client.post("/voice/process", json={"transcript": "start trip", "context_data": {}})
    assert response.status_code == 200
    assert response.json()["intent"] == "Start Trip"
