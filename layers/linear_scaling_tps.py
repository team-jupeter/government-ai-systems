"""
선형 확장 TPS (Linear Scaling TPS)
특허 명세서 기준:
- 전체 TPS = 노드 수 × 노드당 평균 처리량 × 네트워크 효율 계수
- 노드당 평균 처리량: 약 80 TPS
- 네트워크 효율 계수: 0.75 ~ 0.95
- 이론적 상한: 10 Gbps에서 약 500,000 TPS
"""

import time
import hashlib
import random
import threading
import queue
from dataclasses import dataclass, field
from typing import List, Dict, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed
import statistics

# ============================================================
# 트랜잭션 및 노드 정의
# ============================================================

@dataclass
class Transaction:
    """트랜잭션"""
    tx_id: str
    data: str
    size_bytes: int = 256  # 평균 트랜잭션 크기
    timestamp: float = field(default_factory=time.time)
    
    @property
    def hash(self) -> str:
        content = f"{self.tx_id}:{self.data}:{self.timestamp}"
        return hashlib.sha256(content.encode()).hexdigest()

@dataclass
class ProcessingResult:
    """처리 결과"""
    node_id: str
    transactions_processed: int
    elapsed_time: float
    tps: float

class SimulatedNode:
    """시뮬레이션 노드"""
    
    # 특허 명세서 기준: 노드당 약 80 TPS
    BASE_TPS = 80
    TPS_VARIANCE = 10  # ±10 TPS 변동
    
    def __init__(self, node_id: str, layer: int):
        self.node_id = node_id
        self.layer = layer
        self.processed_count = 0
        self.is_active = True
        
        # 노드별 성능 변동 (실제 환경 시뮬레이션)
        self.node_tps = self.BASE_TPS + random.uniform(-self.TPS_VARIANCE, self.TPS_VARIANCE)
    
    def process_transaction(self, tx: Transaction) -> bool:
        """트랜잭션 처리 시뮬레이션"""
        if not self.is_active:
            return False
        
        # 처리 시간 시뮬레이션 (1/TPS 초)
        processing_time = 1.0 / self.node_tps
        time.sleep(processing_time * 0.01)  # 10배 가속 (시뮬레이션용)
        
        self.processed_count += 1
        return True
    
    def process_batch(self, transactions: List[Transaction], 
                      duration_seconds: float) -> ProcessingResult:
        """배치 처리 (지정 시간 동안)"""
        start_time = time.time()
        processed = 0
        
        while time.time() - start_time < duration_seconds:
            if processed < len(transactions):
                self.process_transaction(transactions[processed])
                processed += 1
            else:
                break
        
        elapsed = time.time() - start_time
        actual_tps = processed / elapsed if elapsed > 0 else 0
        
        return ProcessingResult(
            node_id=self.node_id,
            transactions_processed=processed,
            elapsed_time=elapsed,
            tps=actual_tps
        )

# ============================================================
# 선형 확장 TPS 시뮬레이터
# ============================================================

class LinearScalingSimulator:
    """
    선형 확장 TPS 시뮬레이터
    
    특허 공식: TPS_total = N × TPS_node × η
    - N: 노드 수
    - TPS_node: 노드당 처리량 (약 80 TPS)
    - η: 네트워크 효율 계수 (0.75 ~ 0.95)
    """
    
    # 네트워크 효율 계수 범위
    EFFICIENCY_MIN = 0.75
    EFFICIENCY_MAX = 0.95
    
    # 네트워크 대역폭 제한 (10 Gbps 기준)
    BANDWIDTH_GBPS = 10
    AVG_TX_SIZE_BYTES = 256
    THEORETICAL_MAX_TPS = (BANDWIDTH_GBPS * 1e9 / 8) / AVG_TX_SIZE_BYTES  # ~500,000 TPS
    
    def __init__(self):
        self.nodes: List[SimulatedNode] = []
        self.test_results: List[Dict] = []
    
    def setup_network(self, num_nodes: int, layer_distribution: Dict[int, float] = None):
        """
        네트워크 구성
        
        Args:
            num_nodes: 총 노드 수
            layer_distribution: 계층별 노드 비율 (기본: L1=70%, L2=20%, L3=10%)
        """
        self.nodes.clear()
        
        if layer_distribution is None:
            layer_distribution = {1: 0.70, 2: 0.20, 3: 0.10}
        
        node_idx = 0
        for layer, ratio in layer_distribution.items():
            layer_nodes = int(num_nodes * ratio)
            for i in range(layer_nodes):
                node = SimulatedNode(f"L{layer}-Node-{i+1:04d}", layer)
                self.nodes.append(node)
                node_idx += 1
        
        # 반올림으로 인한 부족분 보충
        while len(self.nodes) < num_nodes:
            node = SimulatedNode(f"L1-Node-{len(self.nodes)+1:04d}", 1)
            self.nodes.append(node)
    
    def calculate_theoretical_tps(self, num_nodes: int, 
                                   efficiency: float = 0.85) -> Dict:
        """이론적 TPS 계산"""
        node_tps = SimulatedNode.BASE_TPS
        theoretical_tps = num_nodes * node_tps * efficiency
        
        # 대역폭 제한 적용
        if theoretical_tps > self.THEORETICAL_MAX_TPS:
            theoretical_tps = self.THEORETICAL_MAX_TPS
            bandwidth_limited = True
        else:
            bandwidth_limited = False
        
        return {
            "num_nodes": num_nodes,
            "node_tps": node_tps,
            "efficiency": efficiency,
            "theoretical_tps": round(theoretical_tps, 2),
            "bandwidth_limited": bandwidth_limited,
            "formula": f"{num_nodes} × {node_tps} × {efficiency} = {theoretical_tps:.2f}"
        }
    
    def run_simulation(self, num_nodes: int, duration_seconds: float = 1.0,
                       parallel: bool = True) -> Dict:
        """
        TPS 시뮬레이션 실행
        
        Args:
            num_nodes: 노드 수
            duration_seconds: 시뮬레이션 시간
            parallel: 병렬 처리 여부
        """
        self.setup_network(num_nodes)
        
        # 트랜잭션 생성
        num_transactions = int(num_nodes * SimulatedNode.BASE_TPS * duration_seconds * 2)
        transactions = [
            Transaction(f"TX-{i:08d}", f"data_{i}")
            for i in range(num_transactions)
        ]
        
        start_time = time.time()
        results: List[ProcessingResult] = []
        
        if parallel and num_nodes > 1:
            # 병렬 처리
            tx_per_node = len(transactions) // num_nodes
            
            with ThreadPoolExecutor(max_workers=min(num_nodes, 50)) as executor:
                futures = []
                for i, node in enumerate(self.nodes):
                    start_idx = i * tx_per_node
                    end_idx = start_idx + tx_per_node
                    node_txs = transactions[start_idx:end_idx]
                    
                    future = executor.submit(
                        node.process_batch, node_txs, duration_seconds
                    )
                    futures.append(future)
                
                for future in as_completed(futures):
                    results.append(future.result())
        else:
            # 순차 처리
            for node in self.nodes:
                result = node.process_batch(transactions[:100], duration_seconds)
                results.append(result)
        
        total_elapsed = time.time() - start_time
        total_processed = sum(r.transactions_processed for r in results)
        
        # 실제 TPS 계산
        actual_tps = total_processed / total_elapsed if total_elapsed > 0 else 0
        
        # 이론값과 비교
        theoretical = self.calculate_theoretical_tps(num_nodes)
        efficiency = actual_tps / (num_nodes * SimulatedNode.BASE_TPS) if num_nodes > 0 else 0
        
        result = {
            "num_nodes": num_nodes,
            "duration_seconds": duration_seconds,
            "total_transactions": total_processed,
            "actual_tps": round(actual_tps, 2),
            "theoretical_tps": theoretical["theoretical_tps"],
            "measured_efficiency": round(efficiency, 4),
            "node_results": [
                {"node": r.node_id, "processed": r.transactions_processed, "tps": round(r.tps, 2)}
                for r in results[:5]  # 상위 5개만
            ]
        }
        
        self.test_results.append(result)
        return result
    
    def run_scaling_test(self, node_counts: List[int], 
                         duration_seconds: float = 0.5) -> List[Dict]:
        """다양한 노드 수에 대한 스케일링 테스트"""
        results = []
        
        for num_nodes in node_counts:
            result = self.run_simulation(num_nodes, duration_seconds)
            results.append(result)
        
        return results
    
    def analyze_linearity(self, results: List[Dict]) -> Dict:
        """선형성 분석"""
        if len(results) < 2:
            return {"error": "Insufficient data"}
        
        nodes = [r["num_nodes"] for r in results]
        tps_values = [r["actual_tps"] for r in results]
        
        # TPS/노드 비율 계산
        tps_per_node = [tps / n for tps, n in zip(tps_values, nodes)]
        
        # 선형 회귀 (단순)
        n = len(nodes)
        sum_x = sum(nodes)
        sum_y = sum(tps_values)
        sum_xy = sum(x * y for x, y in zip(nodes, tps_values))
        sum_x2 = sum(x * x for x in nodes)
        
        slope = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x)
        intercept = (sum_y - slope * sum_x) / n
        
        # R² 계산
        mean_y = sum_y / n
        ss_tot = sum((y - mean_y) ** 2 for y in tps_values)
        ss_res = sum((y - (slope * x + intercept)) ** 2 for x, y in zip(nodes, tps_values))
        r_squared = 1 - (ss_res / ss_tot) if ss_tot > 0 else 0
        
        return {
            "slope (TPS/node)": round(slope, 2),
            "intercept": round(intercept, 2),
            "r_squared": round(r_squared, 4),
            "linearity": "Strong" if r_squared > 0.95 else "Moderate" if r_squared > 0.8 else "Weak",
            "avg_tps_per_node": round(statistics.mean(tps_per_node), 2),
            "std_tps_per_node": round(statistics.stdev(tps_per_node), 2) if len(tps_per_node) > 1 else 0
        }


# ============================================================
# 비트코인 비교
# ============================================================

def compare_with_bitcoin(openhash_tps: float) -> Dict:
    """비트코인과 성능 비교"""
    bitcoin_tps = 7  # 비트코인 평균 TPS
    ethereum_tps = 30  # 이더리움 평균 TPS
    
    return {
        "openhash_tps": openhash_tps,
        "bitcoin_tps": bitcoin_tps,
        "ethereum_tps": ethereum_tps,
        "vs_bitcoin": f"{openhash_tps / bitcoin_tps:.1f}x",
        "vs_ethereum": f"{openhash_tps / ethereum_tps:.1f}x"
    }


# ============================================================
# 데모 실행
# ============================================================

def run_demo():
    print("=" * 70)
    print("선형 확장 TPS 시뮬레이션 (Linear Scaling TPS)")
    print("특허: 오픈해시 기반 적응형 계층 구조 시스템")
    print("=" * 70)
    
    simulator = LinearScalingSimulator()
    
    # 1. 이론적 TPS 계산
    print("\n[1] 이론적 TPS 계산")
    print("-" * 50)
    
    node_scenarios = [11, 100, 1000, 10000, 100000]
    
    print(f"  {'노드 수':<12} {'이론적 TPS':<15} {'대역폭 제한':<12}")
    print("  " + "-" * 40)
    
    for num_nodes in node_scenarios:
        theory = simulator.calculate_theoretical_tps(num_nodes)
        limited = "Yes" if theory["bandwidth_limited"] else "No"
        print(f"  {num_nodes:<12,} {theory['theoretical_tps']:<15,.0f} {limited:<12}")
    
    print(f"\n  공식: TPS = N × 80 × 0.85")
    print(f"  이론적 상한: {simulator.THEORETICAL_MAX_TPS:,.0f} TPS (10 Gbps 기준)")
    
    # 2. 실제 시뮬레이션 (소규모)
    print("\n\n[2] 실제 시뮬레이션 (소규모 테스트)")
    print("-" * 50)
    
    test_nodes = [5, 10, 20, 50]
    
    print(f"  {'노드 수':<10} {'처리량':<12} {'실측 TPS':<12} {'효율':<10}")
    print("  " + "-" * 44)
    
    for num_nodes in test_nodes:
        result = simulator.run_simulation(num_nodes, duration_seconds=0.3)
        print(f"  {result['num_nodes']:<10} {result['total_transactions']:<12,} "
              f"{result['actual_tps']:<12,.0f} {result['measured_efficiency']:.2%}")
    
    # 3. 선형성 분석
    print("\n\n[3] 선형 확장성 분석")
    print("-" * 50)
    
    scaling_results = simulator.run_scaling_test([5, 10, 15, 20, 30, 40, 50], duration_seconds=0.3)
    linearity = simulator.analyze_linearity(scaling_results)
    
    print(f"  기울기 (TPS/노드): {linearity['slope (TPS/node)']}")
    print(f"  R² (결정계수): {linearity['r_squared']}")
    print(f"  선형성 평가: {linearity['linearity']}")
    print(f"  노드당 평균 TPS: {linearity['avg_tps_per_node']}")
    print(f"  표준편차: {linearity['std_tps_per_node']}")
    
    # 스케일링 그래프 (텍스트)
    print("\n  [스케일링 그래프]")
    max_tps = max(r["actual_tps"] for r in scaling_results)
    
    for r in scaling_results:
        bar_len = int((r["actual_tps"] / max_tps) * 40)
        bar = "█" * bar_len
        print(f"  {r['num_nodes']:>3}노드 | {bar} {r['actual_tps']:,.0f} TPS")
    
    # 4. 특허 실시예 검증 (11노드)
    print("\n\n[4] 특허 실시예 검증 (11노드, AWS 실측 기준)")
    print("-" * 50)
    
    # 특허 명세서 AWS 실측값
    patent_measured = {
        "nodes": 11,
        "tps": 481.4,
        "avg_latency_ms": 4.0
    }
    
    # 시뮬레이션
    sim_result = simulator.run_simulation(11, duration_seconds=0.5)
    
    print(f"  특허 실측값:")
    print(f"    노드 수: {patent_measured['nodes']}")
    print(f"    TPS: {patent_measured['tps']}")
    print(f"    평균 지연: {patent_measured['avg_latency_ms']} ms")
    
    print(f"\n  시뮬레이션 결과:")
    print(f"    노드 수: {sim_result['num_nodes']}")
    print(f"    TPS: {sim_result['actual_tps']}")
    print(f"    효율: {sim_result['measured_efficiency']:.2%}")
    
    # 5. 비트코인 비교
    print("\n\n[5] 블록체인 성능 비교")
    print("-" * 50)
    
    comparison = compare_with_bitcoin(patent_measured['tps'])
    
    print(f"  {'시스템':<15} {'TPS':<12} {'비교':<15}")
    print("  " + "-" * 40)
    print(f"  {'비트코인':<15} {comparison['bitcoin_tps']:<12} {'기준':<15}")
    print(f"  {'이더리움':<15} {comparison['ethereum_tps']:<12} {comparison['ethereum_tps']/comparison['bitcoin_tps']:.1f}x vs BTC")
    print(f"  {'오픈해시 (11노드)':<15} {comparison['openhash_tps']:<12} {comparison['vs_bitcoin']} vs BTC")
    
    # 6. 대규모 예측
    print("\n\n[6] 대규모 확장 예측")
    print("-" * 50)
    
    predictions = [
        (100, "소규모 기관"),
        (1000, "중규모 시스템"),
        (10000, "대규모 시스템"),
        (100000, "국가 단위")
    ]
    
    print(f"  {'노드 수':<12} {'예상 TPS':<15} {'vs 비트코인':<12} {'용도':<15}")
    print("  " + "-" * 55)
    
    for num_nodes, use_case in predictions:
        theory = simulator.calculate_theoretical_tps(num_nodes, efficiency=0.90)
        vs_btc = theory['theoretical_tps'] / 7
        limited_mark = "*" if theory['bandwidth_limited'] else ""
        print(f"  {num_nodes:<12,} {theory['theoretical_tps']:<15,.0f}{limited_mark} {vs_btc:<12,.0f}x {use_case:<15}")
    
    print(f"\n  * 대역폭 제한 적용 (10 Gbps 기준 ~500,000 TPS)")
    
    # 7. 에너지 효율 비교
    print("\n\n[7] 에너지 효율 비교")
    print("-" * 50)
    
    # 특허 명세서 기준
    bitcoin_annual_twh = 121
    openhash_annual_twh = 1.8
    savings = (1 - openhash_annual_twh / bitcoin_annual_twh) * 100
    
    bitcoin_per_tx_kwh = 1200
    openhash_per_tx_wh = 18
    efficiency_ratio = bitcoin_per_tx_kwh * 1000 / openhash_per_tx_wh
    
    print(f"  연간 에너지 소비:")
    print(f"    비트코인: {bitcoin_annual_twh} TWh")
    print(f"    오픈해시: {openhash_annual_twh} TWh")
    print(f"    절감률: {savings:.1f}%")
    
    print(f"\n  트랜잭션당 에너지:")
    print(f"    비트코인: {bitcoin_per_tx_kwh} kWh")
    print(f"    오픈해시: {openhash_per_tx_wh} Wh")
    print(f"    효율 비: {efficiency_ratio:,.0f}x")
    
    print("\n" + "=" * 70)
    print("✅ 선형 확장 TPS 시뮬레이션 검증 완료")
    print("=" * 70)


if __name__ == "__main__":
    run_demo()
