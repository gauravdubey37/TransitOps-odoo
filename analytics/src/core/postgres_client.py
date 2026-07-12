import psycopg2
from psycopg2.extras import RealDictCursor
from src.config.settings import get_settings
import logging

logger = logging.getLogger(__name__)

class PostgresClient:
    def __init__(self):
        settings = get_settings()
        self.uri = settings.postgres_uri
        self._connection = None

    def connect(self):
        try:
            self._connection = psycopg2.connect(self.uri, cursor_factory=RealDictCursor)
            # Analytics engine is read-only
            self._connection.set_session(readonly=True)
            return True
        except Exception as e:
            logger.error(f"Failed to connect to PostgreSQL: {e}")
            return False

    def close(self):
        if self._connection is not None:
            self._connection.close()

    def fetch_all(self, query: str, params: tuple = None):
        if not self._connection or self._connection.closed:
            self.connect()
        try:
            with self._connection.cursor() as cursor:
                cursor.execute(query, params)
                return cursor.fetchall()
        except Exception as e:
            logger.error(f"Error executing query: {e}")
            return []

    def fetch_chunks(self, query: str, parameters: tuple = None, chunk_size: int = 1000):
        """
        Memory optimization: fetches large datasets in chunks.
        """
        if not self._connection or self._connection.closed:
            self.connect()
        with self._connection.cursor() as cursor:
            cursor.execute(query, parameters)
            columns = [desc[0] for desc in cursor.description]
            while True:
                rows = cursor.fetchmany(chunk_size)
                if not rows:
                    break
                yield [dict(zip(columns, row)) for row in rows]

postgres_client = PostgresClient()
