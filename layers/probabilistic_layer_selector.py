"""
확률적 계층 선택 알고리즘 (Probabilistic Layer Selection Algorithm)
특허 명세서 기준: SHA-256 이중 해싱 → 확률 분포 기반 계층 결정
"""

import hashlib
import time
import json
from dataclasses import dataclass
from typing import Tuple, List, Dict
from datetime import datetime

@dataclass
class LayerConfig:
    """계층 설정 - 특허 명세서 [중요] 참조: 계층 수/확률은 가변적"""
    name: str
    probability: float  # 확률 (0.0 ~ 1.0)
    range_start: int    # 범위 시작
    range_end: int      # 범위 끝 (미포함)

class ProbabilisticLayerSelector:
    """
    확률적 계층 선택기
    - 문서 해시 + 타임스탬프 → SHA-256 이중 해싱
    - 결과를 0-99 범위로 변환하여 계층 결정
    """
    
    def __init__(self, layer_configs: List[LayerConfig] = None):
        """
        Args:
            layer_configs: 계층 설정 리스트. None이면 기본값(3계층, 70/20/10%) 사용
        """
        if layer_configs is None:
            # 기본 설정: 특허 명세서 일 실시예 (3계층)
            self.layers = [
                LayerConfig("Layer1", 0.70, 0, 70),
                LayerConfig("Layer2", 0.20, 70, 90),
                LayerConfig("Layer3", 0.10, 90, 100),
            ]
        else:
            self.layers = layer_configs
        
        self.range_max = 100  # 0-99 범위
        self._validate_config()
    
    def _validate_config(self):
        """설정 유효성 검증"""
        total_prob = sum(l.probability for l in self.layers)
        if abs(total_prob - 1.0) > 0.001:
            raise ValueError(f"확률 합계가 1.0이 아님: {total_prob}")
        
        # 범위 연속성 검증
        expected_start = 0
        for layer in self.layers:
            if layer.range_start != expected_start:
                raise ValueError(f"범위 불연속: {layer.name}")
            expected_start = layer.range_end
    
    def _double_sha256(self, data: str) -> bytes:
        """SHA-256 이중 해싱 (특허 핵심 알고리즘)"""
        first_hash = hashlib.sha256(data.encode('utf-8')).digest()
        second_hash = hashlib.sha256(first_hash).digest()
        return second_hash
    
    def _hash_to_range(self, hash_bytes: bytes) -> int:
        """해시값을 0-99 범위로 변환"""
        # 해시의 첫 8바이트를 정수로 변환 후 100으로 나눈 나머지
        hash_int = int.from_bytes(hash_bytes[:8], byteorder='big')
        return hash_int % self.range_max
    
    def select_layer(self, document_hash: str, timestamp: float = None) -> Tuple[str, int, Dict]:
        """
        계층 선택 수행
        
        Args:
            document_hash: 원본 문서의 SHA-256 해시
            timestamp: Unix 타임스탬프 (None이면 현재 시간)
        
        Returns:
            (선택된 계층명, N값, 상세 정보 딕셔너리)
        """
        if timestamp is None:
            timestamp = time.time()
        
        # 문서 해시 + 타임스탬프 연결
        combined = f"{document_hash}:{timestamp}"
        
        # SHA-256 이중 해싱
        double_hash = self._double_sha256(combined)
        double_hash_hex = double_hash.hex()
        
        # 범위 값 계산 (N값)
        n_value = self._hash_to_range(double_hash)
        
        # 계층 선택
        selected_layer = None
        for layer in self.layers:
            if layer.range_start <= n_value < layer.range_end:
                selected_layer = layer.name
                break
        
        details = {
            "document_hash": document_hash,
            "timestamp": timestamp,
            "timestamp_readable": datetime.fromtimestamp(timestamp).isoformat(),
            "combined_input": combined,
            "double_hash": double_hash_hex,
            "n_value": n_value,
            "selected_layer": selected_layer,
            "layer_range": f"{layer.range_start}-{layer.range_end-1}",
            "layer_probability": f"{layer.probability*100:.0f}%"
        }
        
        return selected_layer, n_value, details
    
    def simulate_distribution(self, num_documents: int = 10000) -> Dict:
        """
        대량 문서에 대한 계층 분포 시뮬레이션
        
        Args:
            num_documents: 시뮬레이션할 문서 수
        
        Returns:
            계층별 분포 통계
        """
        distribution = {layer.name: 0 for layer in self.layers}
        base_time = time.time()
        
        for i in range(num_documents):
            # 가상 문서 해시 생성
            doc_content = f"document_{i}_{base_time}"
            doc_hash = hashlib.sha256(doc_content.encode()).hexdigest()
            
            # 시간 분산 (1초 간격)
            timestamp = base_time + i
            
            layer, _, _ = self.select_layer(doc_hash, timestamp)
            distribution[layer] += 1
        
        # 통계 계산
        results = {
            "total_documents": num_documents,
            "distribution": {},
            "theoretical_vs_actual": []
        }
        
        for layer in self.layers:
            count = distribution[layer.name]
            actual_pct = (count / num_documents) * 100
            theoretical_pct = layer.probability * 100
            deviation = actual_pct - theoretical_pct
            
            results["distribution"][layer.name] = {
                "count": count,
                "actual_percentage": round(actual_pct, 2),
                "theoretical_percentage": theoretical_pct,
                "deviation": round(deviation, 2)
            }
            
            results["theoretical_vs_actual"].append({
                "layer": layer.name,
                "theoretical": f"{theoretical_pct:.0f}%",
                "actual": f"{actual_pct:.2f}%",
                "deviation": f"{deviation:+.2f}%"
            })
        
        return results


def run_demo():
    """데모 실행"""
    print("=" * 70)
    print("확률적 계층 선택 알고리즘 (Probabilistic Layer Selection)")
    print("특허: 오픈해시 기반 적응형 계층 구조 시스템")
    print("=" * 70)
    
    selector = ProbabilisticLayerSelector()
    
    # 1. 단일 문서 계층 선택 데모
    print("\n[1] 단일 문서 계층 선택 테스트")
    print("-" * 50)
    
    test_documents = [
        "계약서_2024_001.pdf",
        "진료기록_환자A_20241126.xml",
        "금융거래_TX_12345678.json"
    ]
    
    for doc in test_documents:
        doc_hash = hashlib.sha256(doc.encode()).hexdigest()
        layer, n_val, details = selector.select_layer(doc_hash)
        print(f"\n문서: {doc}")
        print(f"  해시: {doc_hash[:16]}...")
        print(f"  N값: {n_val} → {layer} (범위: {details['layer_range']})")
    
    # 2. 대량 시뮬레이션
    print("\n\n[2] 대량 문서 분포 시뮬레이션 (10,000건)")
    print("-" * 50)
    
    results = selector.simulate_distribution(10000)
    
    print(f"\n{'계층':<10} {'이론값':<12} {'실측값':<12} {'편차':<10}")
    print("-" * 44)
    for item in results["theoretical_vs_actual"]:
        print(f"{item['layer']:<10} {item['theoretical']:<12} {item['actual']:<12} {item['deviation']:<10}")
    
    # 3. 4계층 커스텀 설정 테스트
    print("\n\n[3] 4계층 커스텀 설정 테스트 (50/30/15/5%)")
    print("-" * 50)
    
    custom_layers = [
        LayerConfig("Layer1", 0.50, 0, 50),
        LayerConfig("Layer2", 0.30, 50, 80),
        LayerConfig("Layer3", 0.15, 80, 95),
        LayerConfig("Layer4", 0.05, 95, 100),
    ]
    
    custom_selector = ProbabilisticLayerSelector(custom_layers)
    custom_results = custom_selector.simulate_distribution(10000)
    
    print(f"\n{'계층':<10} {'이론값':<12} {'실측값':<12} {'편차':<10}")
    print("-" * 44)
    for item in custom_results["theoretical_vs_actual"]:
        print(f"{item['layer']:<10} {item['theoretical']:<12} {item['actual']:<12} {item['deviation']:<10}")
    
    print("\n" + "=" * 70)
    print("✅ 확률적 계층 선택 알고리즘 검증 완료")
    print("=" * 70)
    
    return results, custom_results


if __name__ == "__main__":
    run_demo()
