from src.kpi.driver_kpi import driver_kpi_engine

def test_driver_fatigue_level(mocker):
    # Mocking the postgres client for unit tests
    mocker.patch('src.core.postgres_client.postgres_client.fetch_all', return_value=[{'total_driving_hours_today': 8.5}])
    
    fatigue = driver_kpi_engine.get_driver_fatigue_level("D123")
    assert fatigue == 85.0
