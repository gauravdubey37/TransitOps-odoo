from fastapi import APIRouter
from src.voice.intent_parser import voice_intent_parser
from pydantic import BaseModel

router = APIRouter(prefix="/voice", tags=["Voice"])

class VoiceCommandRequest(BaseModel):
    transcript: str
    context_data: dict = {}

@router.post("/process")
def process_voice_command(req: VoiceCommandRequest):
    intent_data = voice_intent_parser.parse_voice_command(req.transcript)
    
    # Generate the text response
    response_text = voice_intent_parser.generate_voice_response(intent_data["intent"], req.context_data)
    
    return {
        "intent": intent_data["intent"],
        "requires_confirmation": intent_data["requires_confirmation"],
        "response_text": response_text
    }
