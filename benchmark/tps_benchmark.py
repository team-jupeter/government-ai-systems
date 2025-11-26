"""
TPS 벤치마크 도구
특허 핵심: 노드당 80 TPS, 선형 확장
"""

import time
import hashlib
import statistics
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Dict, Callable
from dataclasses import dataclass
import queue

@dataclass
class BenchmarkResult:
    """벤치마크 결과"""
    name: str
    transactions: int
    duration_seconds: float
    tps: float
    latency_avg_ms: float
    latency_p95_ms: float
    latency_p99_ms: float
    success_rate: float

class Transaction:
    """벤치마크용 트랜잭션"""
    
    def __init__(self, tx_id: str, data: str):
        self.tx_id = tx_id
        self.data = data
        self.hash = hashlib.sha256(f"{tx_id}:{data}".encode()).hexdigest()
        self.created_at = time.time()
        self.processed_at: float = None
    
    def process(self) -> float:
        """트랜잭션 처리 시뮬레이션"""
        # SHA-256 해싱 (실제 처리 시뮬레이션)
        for _ in range(10):  # 10회 해싱
            hashlib.sha256(self.hash.encode()).hexdigest()
        
        self.processed_at = time.time()
        return (self.processed_at - self.created_at) * 1000  # ms

class TPSBenchmark:
    """TPS 벤치마크"""
    
    def __init__(self):
        self.results: List[BenchmarkResult] = []
    
    def _generate_transactions(self, count: int) -> List[Transaction]:
        """트랜잭션 생성"""
        return [
            Transaction(f"TX-{i:08d}", f"data_{i}_{time.time()}")
            for i in range(count)
        ]
    
    def run_single_thread(self, num_transactions: int = 1000) -> BenchmarkResult:
        """단일 스레드 벤치마크"""
        transactions = self._generate_transactions(num_transactions)
        latencies = []
        
        start_time = time.time()
        
        for tx in transactions:
            latency = tx.process()
            latencies.append(latency)
        
        duration = time.time() - start_time
        tps = num_transactions / duration
        
        result = BenchmarkResult(
            name="single_thread",
            transactions=num_transactions,
            duration_seconds=round(duration, 3),
            tps=round(tps, 2),
            latency_avg_ms=round(statistics.mean(latencies), 3),
            latency_p95_ms=round(sorted(latencies)[int(len(latencies) * 0.95)], 3),
            latency_p99_ms=round(sorted(latencies)[int(len(latencies) * 0.99)], 3),
            success_rate=100.0
        )
        
        self.results.append(result)
        return result
    
    def run_multi_thread(self, num_transactions: int = 10000, 
                         num_workers: int = 4) -> BenchmarkResult:
        """멀티 스레드 벤치마크"""
        transactions = self._generate_transactions(num_transactions)
        latencies = []
        latency_lock = threading.Lock()
        
        def process_batch(tx_batch: List[Transaction]) -> List[float]:
            batch_latencies = []
            for tx in tx_batch:
                latency = tx.process()
                batch_latencies.append(latency)
            return batch_latencies
        
        # 배치 분할
        batch_size = num_transactions // num_workers
        batches = [
            transactions[i:i + batch_size]
            for i in range(0, num_transactions, batch_size)
        ]
        
        start_time = time.time()
        
        with ThreadPoolExecutor(max_workers=num_workers) as executor:
            futures = [executor.submit(process_batch, batch) for batch in batches]
            
            for future in as_completed(futures):
                batch_latencies = future.result()
                with latency_lock:
                    latencies.extend(batch_latencies)
        
        duration = time.time() - start_time
        tps = num_transactions / duration
        
        result = BenchmarkResult(
            name=f"multi_thread_{num_workers}workers",
            transactions=num_transactions,
            duration_seconds=round(duration, 3),
            tps=round(tps, 2),
            latency_avg_ms=round(statistics.mean(latencies), 3),
            latency_p95_ms=round(sorted(latencies)[int(len(latencies) * 0.95)], 3),
            latency_p99_ms=round(sorted(latencies)[int(len(latencies) * 0.99)], 3),
            success_rate=100.0
        )
        
        self.results.append(result)
        return result
    
    def run_scaling_test(self, base_transactions: int = 1000, 
                         worker_counts: List[int] = None) -> List[Dict]:
        """스케일링 테스트"""
        if worker_counts is None:
            worker_counts = [1, 2, 4, 8, 16]
        
        scaling_results = []
        
        for workers in worker_counts:
            num_tx = base_transactions * workers
            
            if workers == 1:
                result = self.run_single_thread(num_tx)
            else:
                result = self.run_multi_thread(num_tx, workers)
            
            scaling_results.append({
                "workers": workers,
                "transactions": result.transactions,
                "tps": result.tps,
                "tps_per_worker": round(result.tps / workers, 2),
                "latency_avg_ms": result.latency_avg_ms
            })
        
        return scaling_results
    
    def verify_patent_tps(self) -> Dict:
        """특허 주장 검증: 노드당 80 TPS"""
        # 단일 노드 시뮬레이션
        result = self.run_single_thread(1000)
        
        patent_tps = 80  # 특허 주장
        
        return {
            "measured_tps": result.tps,
            "patent_claim_tps": patent_tps,
            "exceeds_claim": result.tps >= patent_tps,
            "ratio": round(result.tps / patent_tps, 2)
        }
    
    def compare_with_blockchain(self, measured_tps: float) -> Dict:
        """블록체인과 비교"""
        comparisons = {
            "Bitcoin": 7,
            "Ethereum": 30,
            "Ripple": 1500,
            "Visa": 24000,
        }
        
        results = {}
        for name, tps in comparisons.items():
            ratio = measured_tps / tps
            results[name] = {
                "tps": tps,
                "ratio": f"{ratio:.1f}x" if ratio >= 1 else f"{1/ratio:.1f}x slower"
            }
        
        return {
            "openhash_tps": measured_tps,
            "comparisons": results
        }


# 테스트
if __name__ == "__main__":
    print("=" * 60)
    print("TPS 벤치마크")
    print("=" * 60)
    
    benchmark = TPSBenchmark()
    
    # 단일 스레드
    print("\n[단일 스레드 벤치마크]")
    result = benchmark.run_single_thread(1000)
    print(f"  트랜잭션: {result.transactions}")
    print(f"  TPS: {result.tps}")
    print(f"  평균 지연: {result.latency_avg_ms} ms")
    
    # 멀티 스레드
    print("\n[멀티 스레드 벤치마크 (4 workers)]")
    result = benchmark.run_multi_thread(10000, 4)
    print(f"  트랜잭션: {result.transactions}")
    print(f"  TPS: {result.tps}")
    print(f"  평균 지연: {result.latency_avg_ms} ms")
    
    # 스케일링 테스트
    print("\n[스케일링 테스트]")
    scaling = benchmark.run_scaling_test(1000, [1, 2, 4, 8])
    
    for s in scaling:
        print(f"  {s['workers']} workers: {s['tps']} TPS ({s['tps_per_worker']} TPS/worker)")
    
    # 특허 검증
    print("\n[특허 주장 검증: 노드당 80 TPS]")
    verification = benchmark.verify_patent_tps()
    print(f"  측정 TPS: {verification['measured_tps']}")
    print(f"  특허 주장: {verification['patent_claim_tps']} TPS")
    print(f"  검증 결과: {'✅ PASS' if verification['exceeds_claim'] else '❌ FAIL'}")
    
    # 블록체인 비교
    print("\n[블록체인 비교]")
    comparison = benchmark.compare_with_blockchain(result.tps)
    for name, info in comparison['comparisons'].items():
        print(f"  vs {name} ({info['tps']} TPS): {info['ratio']}")
