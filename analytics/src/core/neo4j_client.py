from neo4j import GraphDatabase, Driver
from src.config.settings import get_settings
import logging

logger = logging.getLogger(__name__)

class Neo4jClient:
    def __init__(self):
        settings = get_settings()
        self._driver: Driver = GraphDatabase.driver(
            settings.neo4j_uri,
            auth=(settings.neo4j_user, settings.neo4j_password)
        )

    def close(self):
        if self._driver is not None:
            self._driver.close()

    def verify_connectivity(self) -> bool:
        try:
            self._driver.verify_connectivity()
            return True
        except Exception as e:
            logger.error(f"Failed to connect to Neo4j: {e}")
            return False

    def execute_read(self, query: str, **kwargs):
        with self._driver.session() as session:
            result = session.read_transaction(lambda tx: tx.run(query, **kwargs).data())
            return result

    def execute_write(self, query, **parameters):
        with self._driver.session() as session:
            result = session.run(query, parameters)
            return result.data()

    def initialize_indexes(self):
        indexes = [
            "CREATE INDEX IF NOT EXISTS FOR (d:Driver) ON (d.driver_id)",
            "CREATE INDEX IF NOT EXISTS FOR (v:Vehicle) ON (v.vehicle_id)",
            "CREATE INDEX IF NOT EXISTS FOR (t:Trip) ON (t.trip_id)",
            "CREATE INDEX IF NOT EXISTS FOR (r:Route) ON (r.route_id)",
            "CREATE INDEX IF NOT EXISTS FOR (d:Depot) ON (d.depot_id)"
        ]
        for idx in indexes:
            try:
                self.execute_write(idx)
            except Exception as e:
                logger.error(f"Error creating index: {e}")

neo4j_client = Neo4jClient()
