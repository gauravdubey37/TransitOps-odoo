from src.nlp.pipeline import nlp_pipeline

def test_nlp_intent_detection():
    intent = nlp_pipeline.detect_intent("Which driver has the highest fatigue?")
    assert intent == "Rank"
    
    intent = nlp_pipeline.detect_intent("Recommend a vehicle for route 5")
    assert intent == "Recommend"
