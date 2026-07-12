from src.core.neo4j_client import neo4j_client
import logging

logger = logging.getLogger(__name__)

class GraphValidator:
    @staticmethod
    def check_orphan_nodes():
        query = """
        MATCH (n)
        WHERE NOT (n)--()
        RETURN labels(n) as node_type, count(n) as count
        """
        results = neo4j_client.execute_read(query)
        return results

    @staticmethod
    def check_duplicate_drivers():
        query = """
        MATCH (d:Driver)
        WITH d.driver_id as driver_id, collect(d) as nodes
        WHERE size(nodes) > 1
        RETURN driver_id, size(nodes) as duplicate_count
        """
        results = neo4j_client.execute_read(query)
        return results

    @staticmethod
    def validate_graph_health():
        logger.info("Starting Graph Validation...")
        orphans = GraphValidator.check_orphan_nodes()
        duplicates = GraphValidator.check_duplicate_drivers()
        
        health_status = {
            "status": "healthy",
            "orphans": orphans,
            "duplicate_drivers": duplicates
        }
        
        if orphans or duplicates:
            health_status["status"] = "issues_detected"
            logger.warning(f"Graph health issues detected: {health_status}")
            
        return health_status

graph_validator = GraphValidator()
