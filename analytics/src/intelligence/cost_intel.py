from src.core.neo4j_client import neo4j_client

class CostIntelligence:
    def get_cost_trends(self):
        # Query total costs over time (simulated via active trips)
        query = "MATCH (t:Trip {status: 'completed'}) RETURN sum(t.cost) as total_cost, count(t) as trips"
        res = neo4j_client.execute_read(query)
        total = res[0]["total_cost"] if res and res[0]["total_cost"] else 0
        trips = res[0]["trips"] if res and res[0]["trips"] else 0
        return {"total_cost": total, "average_per_trip": (total/trips if trips else 0)}

cost_intelligence = CostIntelligence()
