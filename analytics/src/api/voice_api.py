from fastapi import APIRouter
from src.voice.intent_parser import voice_intent_parser
from pydantic import BaseModel
from typing import Dict, Any

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
        "intent": intent_data["intent"],
        "confidence": 0.95,  # Mocking confidence for now
        "entities": {},      # Mocking entities for now
        "raw_text": req.payload
    }

@router.post("/confirm")
def confirm_voice_action(req: VoiceConfirmRequest):
    # Process confirmation logic here
    return True

@router.get("/tasks")
def get_voice_tasks():
    # Return mock tasks to align with backend expectations
    return []
