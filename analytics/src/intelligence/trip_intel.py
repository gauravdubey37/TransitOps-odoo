from src.core.neo4j_client import neo4j_client

class TripIntelligence:
    def get_trip_risk(self, trip_id: str):
        query = "MATCH (t:Trip {trip_id: $trip_id})-[:ASSIGNED_TO]->(d:Driver) RETURN d.fatigue_level as fatigue"
        res = neo4j_client.execute_read(query, trip_id=trip_id)
        return (res[0]["fatigue"] if res and res[0]["fatigue"] else 0) * 1.5

    def get_delay_probability(self, trip_id: str):
        query = "MATCH (t:Trip {trip_id: $trip_id})-[:FOLLOWED]->(r:Route) RETURN r.average_delay as delay"
        res = neo4j_client.execute_read(query, trip_id=trip_id)
        delay = res[0]["delay"] if res and res[0]["delay"] else 0
        return min(delay / 60.0, 1.0)
        
trip_intelligence = TripIntelligence()
