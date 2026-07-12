class ExplainabilityLayer:
    """
    Ensures every insight or recommendation exposes observations, evidence, and reasoning.
    """
    
    @staticmethod
    def explain_recommendation(recommendation: dict, observation: str, evidence: list, kpis: dict):
        """
        Takes a raw recommendation and attaches full explainability context.
        """
        return {
            "recommendation": recommendation.get("text"),
            "confidence": recommendation.get("score"),
            "explainability": {
                "observation": observation,
                "evidence": evidence,
                "supporting_kpis": kpis,
                "expected_impact": recommendation.get("expected_impact", "Unknown")
            }
        }

explainer = ExplainabilityLayer()
