from apscheduler.schedulers.background import BackgroundScheduler
from src.sync.synchronizer import synchronizer
from src.cache.analytics_cache import analytics_cache
import logging

logger = logging.getLogger(__name__)

class JobScheduler:
    def __init__(self):
        self.scheduler = BackgroundScheduler()

    def start(self):
        # Schedule full graph sync every hour
        self.scheduler.add_job(
            synchronizer.run_full_sync,
            'interval',
            minutes=60,
            id='full_graph_sync',
            replace_existing=True
        )

        # Schedule cache clear every 12 hours as a failsafe
        self.scheduler.add_job(
            analytics_cache.clear_all,
            'interval',
            hours=12,
            id='cache_cleanup',
            replace_existing=True
        )

        self.scheduler.start()
        logger.info("Background Job Scheduler Started.")

    def stop(self):
        self.scheduler.shutdown()
        logger.info("Background Job Scheduler Stopped.")

job_scheduler = JobScheduler()
