from fastapi import APIRouter
import time

router = APIRouter(prefix="/health", tags=["Health"])

START_TIME = time.time()

@router.get("/")
def get_health():
    uptime = int(time.time() - START_TIME)
    return {
        "status": "online",
        "uptime": uptime
    }

@router.get("/status")
def get_status():
    """Endpoint specifically mapped to the Backend's getEngineStatus call"""
    uptime = int(time.time() - START_TIME)
    return {
        "status": "online",
        "uptime": uptime
    }
