import time
from src.utils.parallel import parallel_execution

def mock_query():
    time.sleep(0.1) # Simulate 100ms latency for a query
    return "success"

def test_parallel_execution_performance():
    start_time = time.time()
    
    tasks = [mock_query for _ in range(5)]
    results = parallel_execution.execute_tasks(tasks)
    
    end_time = time.time()
    duration = end_time - start_time
    
    # 5 tasks of 100ms each in parallel should take ~100ms, definitely less than 500ms
    assert duration < 0.5
    assert all(r == "success" for r in results)
