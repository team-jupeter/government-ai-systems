"""
Merkle Tree 구현
특허 핵심: 데이터 무결성 검증 및 효율적 동기화
"""

import hashlib
from typing import List, Tuple, Optional
from dataclasses import dataclass
import json

@dataclass
class MerkleNode:
    """Merkle 노드"""
    hash: str
    left: Optional['MerkleNode'] = None
    right: Optional['MerkleNode'] = None
    data: Optional[str] = None
    index: Optional[int] = None

@dataclass  
class MerkleProof:
    """Merkle Proof"""
    leaf_hash: str
    leaf_index: int
    proof_hashes: List[Tuple[str, str]]  # (hash, direction)
    root_hash: str

class MerkleTree:
    """
    Merkle Tree 구현
    
    특허 활용:
    - 트랜잭션 배치의 무결성 검증
    - 계층 간 효율적 데이터 동기화
    - Merkle Root만 전송하여 대역폭 90% 절감
    """
    
    def __init__(self, data_list: List[str] = None):
        self.leaves: List[MerkleNode] = []
        self.root: Optional[MerkleNode] = None
        self.height = 0
        
        if data_list:
            self.build(data_list)
    
    def _hash(self, data: str) -> str:
        """SHA-256 해싱"""
        return hashlib.sha256(data.encode('utf-8')).hexdigest()
    
    def _hash_pair(self, left: str, right: str) -> str:
        """두 해시 결합"""
        return self._hash(left + right)
    
    def build(self, data_list: List[str]) -> str:
        """트리 구축"""
        if not data_list:
            self.root = MerkleNode(hash=self._hash(""))
            return self.root.hash
        
        # 리프 노드 생성
        self.leaves = []
        for i, data in enumerate(data_list):
            leaf_hash = self._hash(data)
            node = MerkleNode(hash=leaf_hash, data=data, index=i)
            self.leaves.append(node)
        
        # 트리 구축
        current_level = self.leaves.copy()
        self.height = 1
        
        while len(current_level) > 1:
            next_level = []
            
            # 홀수 개면 마지막 복제
            if len(current_level) % 2 == 1:
                current_level.append(current_level[-1])
            
            for i in range(0, len(current_level), 2):
                left = current_level[i]
                right = current_level[i + 1]
                parent_hash = self._hash_pair(left.hash, right.hash)
                parent = MerkleNode(hash=parent_hash, left=left, right=right)
                next_level.append(parent)
            
            current_level = next_level
            self.height += 1
        
        self.root = current_level[0]
        return self.root.hash
    
    def get_root(self) -> str:
        """루트 해시 반환"""
        return self.root.hash if self.root else ""
    
    def get_proof(self, index: int) -> Optional[MerkleProof]:
        """특정 인덱스의 Merkle Proof 생성"""
        if index >= len(self.leaves):
            return None
        
        proof_hashes = []
        current_index = index
        current_level = self.leaves.copy()
        
        while len(current_level) > 1:
            if len(current_level) % 2 == 1:
                current_level.append(current_level[-1])
            
            if current_index % 2 == 0:
                sibling_index = current_index + 1
                direction = "right"
            else:
                sibling_index = current_index - 1
                direction = "left"
            
            if sibling_index < len(current_level):
                proof_hashes.append((current_level[sibling_index].hash, direction))
            
            # 다음 레벨 구축
            next_level = []
            for i in range(0, len(current_level), 2):
                left = current_level[i]
                right = current_level[i + 1]
                parent_hash = self._hash_pair(left.hash, right.hash)
                next_level.append(MerkleNode(hash=parent_hash))
            
            current_level = next_level
            current_index //= 2
        
        return MerkleProof(
            leaf_hash=self.leaves[index].hash,
            leaf_index=index,
            proof_hashes=proof_hashes,
            root_hash=self.root.hash
        )
    
    def verify_proof(self, proof: MerkleProof) -> bool:
        """Merkle Proof 검증"""
        current_hash = proof.leaf_hash
        
        for sibling_hash, direction in proof.proof_hashes:
            if direction == "left":
                current_hash = self._hash_pair(sibling_hash, current_hash)
            else:
                current_hash = self._hash_pair(current_hash, sibling_hash)
        
        return current_hash == proof.root_hash
    
    @staticmethod
    def verify_proof_static(leaf_data: str, proof: MerkleProof) -> bool:
        """정적 Proof 검증"""
        leaf_hash = hashlib.sha256(leaf_data.encode('utf-8')).hexdigest()
        
        if leaf_hash != proof.leaf_hash:
            return False
        
        current_hash = leaf_hash
        
        for sibling_hash, direction in proof.proof_hashes:
            combined = sibling_hash + current_hash if direction == "left" else current_hash + sibling_hash
            current_hash = hashlib.sha256(combined.encode('utf-8')).hexdigest()
        
        return current_hash == proof.root_hash
    
    def get_statistics(self) -> dict:
        """트리 통계"""
        return {
            "leaf_count": len(self.leaves),
            "height": self.height,
            "root_hash": self.root.hash[:16] + "..." if self.root else None,
            "proof_size_bytes": self.height * 32,  # 각 레벨당 32바이트 해시
            "original_data_bytes": sum(len(leaf.data) for leaf in self.leaves if leaf.data)
        }


class MerkleForest:
    """
    Merkle Forest (다중 트리 관리)
    대용량 데이터 처리를 위한 분할 관리
    """
    
    def __init__(self, max_leaves_per_tree: int = 1000):
        self.trees: List[MerkleTree] = []
        self.max_leaves = max_leaves_per_tree
        self.super_root: Optional[str] = None
    
    def add_batch(self, data_list: List[str]) -> str:
        """배치 데이터 추가"""
        tree = MerkleTree(data_list)
        self.trees.append(tree)
        self._update_super_root()
        return tree.get_root()
    
    def _update_super_root(self):
        """슈퍼 루트 업데이트"""
        if not self.trees:
            self.super_root = None
            return
        
        roots = [tree.get_root() for tree in self.trees]
        super_tree = MerkleTree(roots)
        self.super_root = super_tree.get_root()
    
    def get_super_root(self) -> str:
        """슈퍼 루트 반환"""
        return self.super_root or ""


# 테스트
if __name__ == "__main__":
    print("=" * 60)
    print("Merkle Tree 모듈 테스트")
    print("=" * 60)
    
    # 기본 테스트
    transactions = [
        "tx_001:transfer:100:A->B",
        "tx_002:transfer:200:B->C",
        "tx_003:transfer:150:C->D",
        "tx_004:transfer:300:D->E",
        "tx_005:transfer:250:E->F",
    ]
    
    tree = MerkleTree(transactions)
    stats = tree.get_statistics()
    
    print(f"\n[트리 구축]")
    print(f"  트랜잭션 수: {stats['leaf_count']}")
    print(f"  트리 높이: {stats['height']}")
    print(f"  루트 해시: {stats['root_hash']}")
    print(f"  Proof 크기: {stats['proof_size_bytes']} bytes")
    
    # Proof 생성 및 검증
    print(f"\n[Proof 검증]")
    for i in range(len(transactions)):
        proof = tree.get_proof(i)
        is_valid = tree.verify_proof(proof)
        print(f"  tx_{i+1:03d}: {'✅ Valid' if is_valid else '❌ Invalid'}")
    
    # 대역폭 절감 계산
    original_size = sum(len(tx) for tx in transactions)
    root_size = 32  # SHA-256 = 32 bytes
    savings = (1 - root_size / original_size) * 100
    
    print(f"\n[대역폭 절감]")
    print(f"  원본 크기: {original_size} bytes")
    print(f"  루트만 전송: {root_size} bytes")
    print(f"  절감률: {savings:.1f}%")
