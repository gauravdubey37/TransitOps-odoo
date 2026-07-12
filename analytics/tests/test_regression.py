from src.kpi.fleet_kpi import fleet_kpi_engine

def test_fleet_kpi_regression(mocker):
    """
    Ensure KPI outputs do not drift when logic changes. Baseline tests.
    """
    mocker.patch('src.core.postgres_client.postgres_client.fetch_all', return_value=[{'util_rate': 75.5}])
    
    rate = fleet_kpi_engine.get_fleet_utilization_rate()
    assert rate == 75.5, f"Regression detected in Fleet Utilization Rate. Expected 75.5, got {rate}"
