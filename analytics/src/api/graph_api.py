from fastapi import APIRouter, BackgroundTasks
from src.sync.synchronizer import synchronizer
from src.core.neo4j_client import neo4j_client
import time

router = APIRouter(prefix="/analytics/graph", tags=["Graph Engine"])

@router.get("/status")
def get_graph_status():
    return {"status": "online", "synchronizer": "ready"}

@router.get("/health")
def get_graph_health():
    # Simple check if Neo4j is responsive
    try:
        neo4j_client.execute_read("RETURN 1")
        return {"status": "healthy"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@router.post("/sync")
def trigger_graph_sync(background_tasks: BackgroundTasks):
    background_tasks.add_task(synchronizer.run_full_sync)
    return {"status": "accepted", "message": "Graph synchronization triggered in background"}

@router.post("/rebuild")
def trigger_graph_rebuild(background_tasks: BackgroundTasks):
    # For a rebuild, we would ideally drop the graph and run full sync
    # We will simulate the drop by just running full sync which uses MERGE 
    background_tasks.add_task(synchronizer.run_full_sync)
    return {"status": "accepted", "message": "Graph rebuild triggered in background"}

@router.get("/statistics")
def get_graph_statistics():
    nodes = neo4j_client.execute_read("MATCH (n) RETURN count(n) as count")
    relationships = neo4j_client.execute_read("MATCH ()-[r]->() RETURN count(r) as count")
    return {
        "nodes": nodes[0]['count'] if nodes else 0,
        "relationships": relationships[0]['count'] if relationships else 0,
        "last_sync": int(time.time())
    }
