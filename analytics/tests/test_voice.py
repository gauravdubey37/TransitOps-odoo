from src.voice.intent_parser import voice_intent_parser

def test_voice_start_trip():
    res = voice_intent_parser.parse_voice_command("hey I want to start trip 123")
    assert res["intent"] == "Start Trip"
    assert res["requires_confirmation"] is False

def test_voice_complete_trip():
    res = voice_intent_parser.parse_voice_command("complete trip 123")
    assert res["intent"] == "Complete Trip"
    assert res["requires_confirmation"] is True
