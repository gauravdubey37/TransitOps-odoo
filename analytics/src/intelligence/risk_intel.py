from src.core.neo4j_client import neo4j_client

class RiskIntelligence:
    def get_fleet_risk(self):
        query = "MATCH (d:Driver) RETURN max(d.fatigue_level) as max_risk"
        res = neo4j_client.execute_read(query)
        max_risk = res[0]["max_risk"] if res and res[0]["max_risk"] else 0
        
        severity = "High" if max_risk > 80 else "Medium" if max_risk > 50 else "Low"
        return {"fleet_risk_level": severity, "max_fatigue": max_risk}

risk_intelligence = RiskIntelligence()
