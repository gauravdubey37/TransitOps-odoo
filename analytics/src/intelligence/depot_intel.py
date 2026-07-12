from src.core.neo4j_client import neo4j_client

class DepotIntelligence:
    """
    Graph-based analytical intelligence for Depots.
    """
    
    @staticmethod
    def get_depot_utilization(depot_id: str):
        """
        Determines the utilization of a depot based on connected vehicles and trips.
        """
        query = """
        MATCH (d:Depot {depot_id: $depot_id})<-[:ASSIGNED_TO]-(v:Vehicle)<-[:USED]-(t:Trip)
        WITH count(distinct v) as active_vehicles, count(t) as total_trips
        RETURN active_vehicles, total_trips
        """
        results = neo4j_client.execute_read(query, depot_id=depot_id)
        
        if not results:
            return {"active_vehicles": 0, "total_trips": 0, "status": "Idle"}
            
        active_vehicles = results[0]['active_vehicles']
        
        if active_vehicles > 50:
            status = "Over-utilized"
        elif active_vehicles > 20:
            status = "Optimal"
        else:
            status = "Under-utilized"
            
        return {
            "active_vehicles": active_vehicles,
            "total_trips": results[0]['total_trips'],
            "status": status
        }

depot_intel = DepotIntelligence()
