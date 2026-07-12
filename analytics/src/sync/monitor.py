import logging
import time

logger = logging.getLogger(__name__)

class SyncMonitor:
    def __init__(self):
        self.metrics = {
            "last_sync_time": None,
            "total_nodes_synced": 0,
            "total_relationships_synced": 0,
            "errors": 0,
            "latency_ms": 0
        }

    def start_sync(self):
        self._start_time = time.time()
        logger.info("Sync started...")

    def end_sync(self, nodes_count: int, relationships_count: int, error_count: int = 0):
        self.metrics["last_sync_time"] = time.time()
        self.metrics["total_nodes_synced"] += nodes_count
        self.metrics["total_relationships_synced"] += relationships_count
        self.metrics["errors"] += error_count
        self.metrics["latency_ms"] = (self.metrics["last_sync_time"] - self._start_time) * 1000
        logger.info(f"Sync completed in {self.metrics['latency_ms']:.2f} ms")

    def get_metrics(self):
        return self.metrics

sync_monitor = SyncMonitor()
