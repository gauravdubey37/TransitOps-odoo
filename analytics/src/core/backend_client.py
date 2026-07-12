import httpx
import logging
from src.config.settings import get_settings

logger = logging.getLogger(__name__)

class BackendClient:
    """
    HTTP Client to fetch read-only operational data from the Backend API.
    Replaces direct PostgreSQL reads to decouple the analytics engine.
    """
    def __init__(self):
        settings = get_settings()
        # Defaulting to localhost:3000 where the backend runs, or env variable if defined
        self.base_url = getattr(settings, 'backend_api_url', 'http://localhost:3000/api/v1/analytics')
        self.client = httpx.Client(timeout=30.0)

    def fetch_data(self, endpoint: str):
        try:
            response = self.client.get(f"{self.base_url}/{endpoint}")
            response.raise_for_status()
            data = response.json()
            # Assuming backend returns { success: true, data: [...] }
            if data.get("success"):
                return data.get("data", [])
            return []
        except Exception as e:
            logger.error(f"Failed to fetch {endpoint} from backend: {e}")
            return []

    def get_drivers(self):
        return self.fetch_data("drivers")

    def get_vehicles(self):
        return self.fetch_data("vehicles")

    def get_trips(self):
        return self.fetch_data("trips")

    def get_routes(self):
        return self.fetch_data("routes")

    def get_depots(self):
        return self.fetch_data("depots")

backend_client = BackendClient()
