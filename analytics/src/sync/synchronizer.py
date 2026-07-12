import logging
from src.core.backend_client import backend_client
from src.core.neo4j_client import neo4j_client
from src.graph.nodes import node_manager
from src.graph.relationships import relationship_manager

logger = logging.getLogger(__name__)

class GraphSynchronizer:
    """
    Synchronizes transactional data from Backend APIs to analytical Neo4j Graph.
    This handles Initial Sync and Incremental Sync.
    """
    
    def __init__(self):
        self.backend = backend_client
        self.neo4j = neo4j_client

    def run_full_sync(self):
        logger.info("Starting Full Graph Synchronization")
        
        # 1. Sync Drivers
        self._sync_drivers()
        # 2. Sync Vehicles
        self._sync_vehicles()
        # 3. Sync Regions and Depots
        self._sync_infrastructure()
        # 4. Sync Routes
        self._sync_routes()
        # 5. Sync Trips
        self._sync_trips()
        # 6. Sync Operations (Fuel, Expenses, Maintenance)
        self._sync_operations()
        # 7. Create Relationships
        self._create_relationships()
        
        logger.info("Full Graph Synchronization Completed")

    def _sync_drivers(self):
        logger.info("Syncing Drivers...")
        drivers = self.backend.fetch_data("drivers")
        for driver in drivers:
            node_manager.merge_driver(driver)

    def _sync_vehicles(self):
        logger.info("Syncing Vehicles...")
        vehicles = self.backend.fetch_data("vehicles")
        for vehicle in vehicles:
            node_manager.merge_vehicle(vehicle)

    def _sync_infrastructure(self):
        logger.info("Syncing Infrastructure...")
        depots = self.backend.fetch_data("depots")
        for depot in depots:
            node_manager.merge_depot(depot)
        # Note: Regions omitted from MVP backend fetch, handled in future scaling

    def _sync_routes(self):
        logger.info("Syncing Routes...")
        routes = self.backend.fetch_data("routes")
        for route in routes:
            node_manager.merge_route(route)

    def _sync_trips(self):
        logger.info("Syncing Trips...")
        trips = self.backend.fetch_data("trips")
        for trip in trips:
            node_manager.merge_trip(trip)

    def _sync_operations(self):
        logger.info("Syncing Operations...")
        fuels = self.backend.fetch_data("fuel")
        for f in fuels:
            node_manager.merge_fuel_log(f)
            
        expenses = self.backend.fetch_data("expenses")
        for e in expenses:
            node_manager.merge_expense(e)

    def _create_relationships(self):
        logger.info("Creating Relationships...")
        # Relationships are inherently built from the connected operational data.
        # This will be refined as backend returns nested IDs.
        # Examples:
        trips = self.backend.fetch_data("trips")
        for trip in trips:
            if "driver_id" in trip:
                relationship_manager.create_driver_trip_completion(trip["driver_id"], trip["trip_id"])
            if "vehicle_id" in trip:
                relationship_manager.create_trip_vehicle_usage(trip["trip_id"], trip["vehicle_id"])

synchronizer = GraphSynchronizer()
