from fastapi import APIRouter
from src.voice.intent_parser import voice_intent_parser
from pydantic import BaseModel
from typing import Dict, Any
from src.core.neo4j_client import neo4j_client

router = APIRouter(prefix="/voice", tags=["Voice"])

class VoiceIntentRequest(BaseModel):
    payload: str

class VoiceConfirmRequest(BaseModel):
    intent: str
    data: Dict[str, Any]

@router.post("/intent")
def parse_voice_intent(req: VoiceIntentRequest):
    intent_data = voice_intent_parser.parse_voice_command(req.payload)
    
    return {
        "intent": intent_data.get("intent", "unknown"),
        "confidence": intent_data.get("confidence", 0.85),
        "entities": intent_data.get("entities", {}),
        "raw_text": req.payload
    }

@router.post("/confirm")
def confirm_voice_action(req: VoiceConfirmRequest):
    # Process confirmation logic here
    return True

@router.get("/tasks")
def get_voice_tasks():
    # Fetch pending actionable trips as tasks for voice interface
    records = neo4j_client.execute_read("MATCH (t:Trip {status: 'pending'}) RETURN t.trip_id as id")
    tasks = [{"task_id": r["id"], "type": "trip_assignment"} for r in records] if records else []
    return tasks
