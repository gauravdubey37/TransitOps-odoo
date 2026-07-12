from cachetools import TTLCache
from src.config.settings import get_settings

class AnalyticsCache:
    """
    In-memory caching layer for analytics data with TTL.
    """
    
    def __init__(self):
        settings = get_settings()
        ttl = settings.cache_ttl_seconds
        
        # 5 minute TTL for KPIs and Recommendations as per documentation
        self.kpi_cache = TTLCache(maxsize=1000, ttl=300)
        self.recommendation_cache = TTLCache(maxsize=500, ttl=300)
        
        # 2 minute TTL for NLP Results
        self.nlp_cache = TTLCache(maxsize=1000, ttl=120)

    def get_kpi(self, key: str):
        return self.kpi_cache.get(key)
        
    def set_kpi(self, key: str, value: any):
        self.kpi_cache[key] = value

    def get_recommendation(self, key: str):
        return self.recommendation_cache.get(key)
        
    def set_recommendation(self, key: str, value: any):
        self.recommendation_cache[key] = value

    def clear_all(self):
        self.kpi_cache.clear()
        self.recommendation_cache.clear()
        self.nlp_cache.clear()

analytics_cache = AnalyticsCache()
