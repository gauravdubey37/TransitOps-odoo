class VoiceIntentParser:
    """
    Parses voice-to-text transcripts into actionable intents.
    Supports offline-first requirements by focusing on standard commands.
    """
    
    def __init__(self):
        self.commands = [
            "start trip", "pause trip", "complete trip",
            "show dashboard", "show maintenance"
        ]

    def parse_voice_command(self, text: str):
        text = text.lower()
        
        # Simple rule-based intent parsing for safety-critical voice actions
        if "start trip" in text:
            return {"intent": "Start Trip", "requires_confirmation": False}
        elif "complete trip" in text:
            return {"intent": "Complete Trip", "requires_confirmation": True}
        elif "maintenance" in text:
            return {"intent": "Show Maintenance", "requires_confirmation": False}
            
        return {"intent": "Unknown", "requires_confirmation": False}

    def generate_voice_response(self, intent: str, data: dict):
        if intent == "Show Maintenance":
            count = data.get('overdue_count', 0)
            return f"There are {count} overdue maintenance tasks."
        return "I have processed your command."

voice_intent_parser = VoiceIntentParser()
