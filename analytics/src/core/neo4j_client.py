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

    def execute_write(self, query: str, **kwargs):
        with self._driver.session() as session:
            result = session.write_transaction(lambda tx: tx.run(query, **kwargs).data())
            return result

neo4j_client = Neo4jClient()
