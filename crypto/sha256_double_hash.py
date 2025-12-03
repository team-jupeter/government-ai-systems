"""
SHA-256 이중 해싱 모듈
특허 핵심: 문서 해시 + 타임스탬프 → SHA-256 × 2 → N값 계산
"""

import hashlib
import struct
import time
from typing import Tuple, Optional
from dataclasses import dataclass

@dataclass
class HashResult:
    """해싱 결과"""
    input_data: str
    first_hash: str
    second_hash: str
    n_value: int
    timestamp: float
    processing_time_us: float

class SHA256DoubleHasher:
    """SHA-256 이중 해싱 엔진"""
    
    def __init__(self, modulo: int = 100):
        self.modulo = modulo
        self.hash_count = 0
        self.total_time_us = 0
    
    def hash_once(self, data: bytes) -> bytes:
        """단일 SHA-256 해싱"""
        return hashlib.sha256(data).digest()
    
    def hash_twice(self, data: bytes) -> bytes:
        """이중 SHA-256 해싱"""
        first = self.hash_once(data)
        second = self.hash_once(first)
        return second
    
    def compute_n_value(self, document_hash: str, timestamp: float = None) -> HashResult:
        """
        N값 계산 (특허 핵심 알고리즘)
        
        N = SHA256(SHA256(document_hash || timestamp)) mod 100
        """
        start = time.perf_counter()
        
        if timestamp is None:
            timestamp = time.time()
        
        # 문서 해시 + 타임스탬프 연결
        combined = f"{document_hash}:{timestamp}".encode('utf-8')
        
        # 1차 해싱
        first_hash = self.hash_once(combined)
        first_hex = first_hash.hex()
        
        # 2차 해싱
        second_hash = self.hash_once(first_hash)
        second_hex = second_hash.hex()
        
        # N값 계산 (첫 8바이트를 정수로 변환 후 modulo)
        hash_int = struct.unpack('>Q', second_hash[:8])[0]
        n_value = hash_int % self.modulo
        
        elapsed_us = (time.perf_counter() - start) * 1_000_000
        
        self.hash_count += 1
        self.total_time_us += elapsed_us
        
        return HashResult(
            input_data=f"{document_hash}:{timestamp}",
            first_hash=first_hex,
            second_hash=second_hex,
            n_value=n_value,
            timestamp=timestamp,
            processing_time_us=round(elapsed_us, 3)
        )
    
    def batch_compute(self, document_hashes: list, base_timestamp: float = None) -> list:
        """배치 N값 계산"""
        if base_timestamp is None:
            base_timestamp = time.time()
        
        results = []
        for i, doc_hash in enumerate(document_hashes):
            ts = base_timestamp + i * 0.001  # 1ms 간격
            result = self.compute_n_value(doc_hash, ts)
            results.append(result)
        
        return results
    
    def get_statistics(self) -> dict:
        """통계 반환"""
        avg_time = self.total_time_us / self.hash_count if self.hash_count > 0 else 0
        return {
            "total_hashes": self.hash_count,
            "total_time_us": round(self.total_time_us, 2),
            "avg_time_us": round(avg_time, 3),
            "throughput_per_sec": round(1_000_000 / avg_time, 0) if avg_time > 0 else 0
        }


class DocumentHasher:
    """문서 해싱 유틸리티"""
    
    @staticmethod
    def hash_content(content: str) -> str:
        """문서 내용 해싱"""
        return hashlib.sha256(content.encode('utf-8')).hexdigest()
    
    @staticmethod
    def hash_file(filepath: str) -> str:
        """파일 해싱"""
        sha256 = hashlib.sha256()
        with open(filepath, 'rb') as f:
            for chunk in iter(lambda: f.read(8192), b''):
                sha256.update(chunk)
        return sha256.hexdigest()
    
    @staticmethod
    def hash_with_metadata(content: str, metadata: dict) -> str:
        """메타데이터 포함 해싱"""
        combined = f"{content}|{str(sorted(metadata.items()))}"
        return hashlib.sha256(combined.encode('utf-8')).hexdigest()


# 테스트
if __name__ == "__main__":
    print("=" * 60)
    print("SHA-256 이중 해싱 모듈 테스트")
    print("=" * 60)
    
    hasher = SHA256DoubleHasher()
    
    # 단일 테스트
    doc_hash = DocumentHasher.hash_content("테스트 문서 내용")
    result = hasher.compute_n_value(doc_hash)
    
    print(f"\n[단일 해싱 테스트]")
    print(f"  입력: {result.input_data[:50]}...")
    print(f"  1차 해시: {result.first_hash[:32]}...")
    print(f"  2차 해시: {result.second_hash[:32]}...")
    print(f"  N값: {result.n_value}")
    print(f"  처리 시간: {result.processing_time_us} μs")
    
    # 배치 테스트
    docs = [DocumentHasher.hash_content(f"문서_{i}") for i in range(1000)]
    batch_results = hasher.batch_compute(docs)
    
    stats = hasher.get_statistics()
    print(f"\n[배치 테스트 (1,000건)]")
    print(f"  총 해싱: {stats['total_hashes']}")
    print(f"  평균 시간: {stats['avg_time_us']} μs")
    print(f"  처리량: {stats['throughput_per_sec']:,.0f}/초")
    
    # N값 분포 확인
    distribution = {}
    for r in batch_results:
        layer = "L1" if r.n_value < 70 else "L2" if r.n_value < 90 else "L3"
        distribution[layer] = distribution.get(layer, 0) + 1
    
    print(f"\n[N값 분포]")
    for layer, count in sorted(distribution.items()):
        print(f"  {layer}: {count} ({count/10:.1f}%)")
