from fastapi import APIRouter
from src.graph.validator import graph_validator
from src.sync.monitor import sync_monitor
from src.core.neo4j_client import neo4j_client
from src.core.postgres_client import postgres_client

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("/")
def get_health():
    neo4j_status = neo4j_client.verify_connectivity()
    postgres_status = postgres_client.connect()
    
    return {
        "status": "up" if neo4j_status and postgres_status else "down",
        "neo4j_connected": neo4j_status,
        "postgres_connected": postgres_status
    }

@router.get("/graph")
def get_graph_health():
    return graph_validator.validate_graph_health()

@router.get("/sync")
def get_sync_status():
    return sync_monitor.get_metrics()
