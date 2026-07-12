import concurrent.futures

class ParallelExecution:
    """
    Utility for executing independent queries/tasks concurrently.
    """
    
    @staticmethod
    def execute_tasks(tasks: list):
        """
        Executes a list of callables in parallel using a ThreadPoolExecutor.
        """
        results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            future_to_task = {executor.submit(task): task for task in tasks}
            for future in concurrent.futures.as_completed(future_to_task):
                try:
                    data = future.result()
                    results.append(data)
                except Exception as exc:
                    results.append(exc)
        return results

parallel_execution = ParallelExecution()
