from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    app_name: str = "TransitOps Analytics Engine"
    env: str = "development"
    debug: bool = True
    
    # Neo4j Settings
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str = "password"
    
    # PostgreSQL Settings (Read Only)
    postgres_uri: str = "postgresql://user:password@localhost:5432/transitops"
    
    # Cache Settings
    cache_ttl_seconds: int = 300
    
    # Analytics Settings
    confidence_threshold: float = 75.0

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
