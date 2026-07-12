from src.core.neo4j_client import neo4j_client

class CarbonIntelligence:
    def get_carbon_reduction_opportunity(self):
        query = "MATCH (v:Vehicle {status: 'idle'}) RETURN count(v) as idle_count"
        res = neo4j_client.execute_read(query)
        idle = res[0]["idle_count"] if res and res[0]["idle_count"] else 0
        return {"potential_reduction_kg": idle * 12.5, "reason": f"Shutting down {idle} idle vehicles"}

carbon_intelligence = CarbonIntelligence()
