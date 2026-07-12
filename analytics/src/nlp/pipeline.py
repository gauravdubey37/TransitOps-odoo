import logging

logger = logging.getLogger(__name__)

try:
    import spacy
    from sentence_transformers import SentenceTransformer
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    logger.warning("spaCy or sentence_transformers not installed. Falling back to rule-based NLP.")

class NLPPipeline:
    """
    Converts Natural Language Queries into Structured Analytics Queries.
    Uses SentenceTransformers for Intent Detection and spaCy for NER.
    """
    
    def __init__(self):
        self.intents = [
            "Query", "Compare", "Rank", "Summarize", "Recommend", "Explain"
        ]
        
        if ML_AVAILABLE:
            try:
                # Load models lazily or in init
                self.nlp = spacy.load("en_core_web_sm")
                self.encoder = SentenceTransformer('all-MiniLM-L6-v2')
                self.intent_embeddings = self.encoder.encode(self.intents)
            except Exception as e:
                logger.error(f"Failed to load ML models: {e}")
                self.nlp = None
                self.encoder = None
        else:
            self.nlp = None
            self.encoder = None
        
    def detect_intent(self, text: str):
        if self.encoder is not None:
            query_embedding = self.encoder.encode([text])
            similarities = cosine_similarity(query_embedding, self.intent_embeddings)[0]
            best_match_idx = np.argmax(similarities)
            return self.intents[best_match_idx]
            
        # Fallback rule-based logic
        text_lower = text.lower()
        if "compare" in text_lower:
            return "Compare"
        elif "recommend" in text_lower:
            return "Recommend"
        elif "explain" in text_lower:
            return "Explain"
        elif "best" in text_lower or "worst" in text_lower or "highest" in text_lower or "lowest" in text_lower:
            return "Rank"
        return "Query"

    def extract_entities(self, text: str):
        entities = {}
        if self.nlp is not None:
            doc = self.nlp(text)
            for ent in doc.ents:
                entities[ent.label_] = ent.text
                
        # Rule-based fallback/enrichment
        text_lower = text.lower()
        if "driver" in text_lower:
            entities["type"] = "Driver"
        elif "vehicle" in text_lower:
            entities["type"] = "Vehicle"
        elif "route" in text_lower:
            entities["type"] = "Route"
            
        return entities

    def process_query(self, query: str):
        intent = self.detect_intent(query)
        entities = self.extract_entities(query)
        
        return {
            "original_query": query,
            "intent": intent,
            "entities": entities,
            "structured_request": f"Fetch data for {entities.get('type', 'Unknown')} with intent {intent}"
        }

nlp_pipeline = NLPPipeline()
