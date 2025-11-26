"""
노드 네트워크 시뮬레이션
특허 핵심: 4계층 물리적 인프라 활용
"""

import time
import random
import hashlib
from typing import List, Dict, Optional, Set
from dataclasses import dataclass, field
from enum import Enum
from collections import defaultdict
import threading
import queue

class NodeLayer(Enum):
    """노드 계층"""
    EDGE_DEVICE = 1      # Layer 1: IoT, 모바일
    EDGE_SERVER = 2      # Layer 2: 지역 서버
    CORE_ENGINE = 3      # Layer 3: 코어 엔진
    CLOUD_ARCHIVE = 4    # Layer 4: 클라우드

@dataclass
class NetworkMessage:
    """네트워크 메시지"""
    msg_id: str
    msg_type: str
    sender: str
    receiver: str
    payload: dict
    timestamp: float = field(default_factory=time.time)
    hop_count: int = 0

@dataclass
class NodeMetrics:
    """노드 메트릭"""
    messages_sent: int = 0
    messages_received: int = 0
    bytes_sent: int = 0
    bytes_received: int = 0
    avg_latency_ms: float = 0
    uptime_seconds: float = 0

class NetworkNode:
    """네트워크 노드"""
    
    # 계층별 기본 사양
    LAYER_SPECS = {
        NodeLayer.EDGE_DEVICE: {"memory_mb": 16, "bandwidth_mbps": 10, "tps": 50},
        NodeLayer.EDGE_SERVER: {"memory_mb": 256, "bandwidth_mbps": 100, "tps": 100},
        NodeLayer.CORE_ENGINE: {"memory_mb": 1024, "bandwidth_mbps": 1000, "tps": 200},
        NodeLayer.CLOUD_ARCHIVE: {"memory_mb": 4096, "bandwidth_mbps": 10000, "tps": 500},
    }
    
    def __init__(self, node_id: str, layer: NodeLayer, region: str = "default"):
        self.node_id = node_id
        self.layer = layer
        self.region = region
        self.is_active = True
        self.start_time = time.time()
        
        # 연결
        self.connections: Set[str] = set()
        self.parent_nodes: Set[str] = set()  # 상위 계층
        self.child_nodes: Set[str] = set()   # 하위 계층
        
        # 메트릭
        self.metrics = NodeMetrics()
        
        # 메시지 큐
        self.message_queue: queue.Queue = queue.Queue()
        
        # 키
        self.private_key = hashlib.sha256(f"{node_id}:{time.time()}".encode()).hexdigest()
        self.public_key = hashlib.sha256(self.private_key.encode()).hexdigest()
        
        # 사양
        specs = self.LAYER_SPECS[layer]
        self.memory_mb = specs["memory_mb"]
        self.bandwidth_mbps = specs["bandwidth_mbps"]
        self.max_tps = specs["tps"]
    
    def connect_to(self, other_node_id: str, direction: str = "peer"):
        """노드 연결"""
        self.connections.add(other_node_id)
        if direction == "parent":
            self.parent_nodes.add(other_node_id)
        elif direction == "child":
            self.child_nodes.add(other_node_id)
    
    def disconnect_from(self, other_node_id: str):
        """노드 연결 해제"""
        self.connections.discard(other_node_id)
        self.parent_nodes.discard(other_node_id)
        self.child_nodes.discard(other_node_id)
    
    def send_message(self, msg: NetworkMessage) -> bool:
        """메시지 전송"""
        if not self.is_active:
            return False
        
        msg.hop_count += 1
        self.metrics.messages_sent += 1
        self.metrics.bytes_sent += len(str(msg.payload))
        return True
    
    def receive_message(self, msg: NetworkMessage) -> bool:
        """메시지 수신"""
        if not self.is_active:
            return False
        
        self.message_queue.put(msg)
        self.metrics.messages_received += 1
        self.metrics.bytes_received += len(str(msg.payload))
        return True
    
    def get_status(self) -> dict:
        """상태 반환"""
        return {
            "node_id": self.node_id,
            "layer": self.layer.name,
            "region": self.region,
            "is_active": self.is_active,
            "connections": len(self.connections),
            "parent_nodes": len(self.parent_nodes),
            "child_nodes": len(self.child_nodes),
            "uptime_seconds": round(time.time() - self.start_time, 2),
            "metrics": {
                "messages_sent": self.metrics.messages_sent,
                "messages_received": self.metrics.messages_received,
                "bytes_sent": self.metrics.bytes_sent,
                "bytes_received": self.metrics.bytes_received
            }
        }


class NetworkTopology:
    """네트워크 토폴로지"""
    
    def __init__(self):
        self.nodes: Dict[str, NetworkNode] = {}
        self.layers: Dict[NodeLayer, List[str]] = defaultdict(list)
        self.regions: Dict[str, List[str]] = defaultdict(list)
        self.message_log: List[NetworkMessage] = []
    
    def add_node(self, node_id: str, layer: NodeLayer, region: str = "default") -> NetworkNode:
        """노드 추가"""
        node = NetworkNode(node_id, layer, region)
        self.nodes[node_id] = node
        self.layers[layer].append(node_id)
        self.regions[region].append(node_id)
        return node
    
    def remove_node(self, node_id: str):
        """노드 제거"""
        if node_id not in self.nodes:
            return
        
        node = self.nodes[node_id]
        node.is_active = False
        
        # 연결 해제
        for conn_id in list(node.connections):
            if conn_id in self.nodes:
                self.nodes[conn_id].disconnect_from(node_id)
        
        # 목록에서 제거
        self.layers[node.layer].remove(node_id)
        self.regions[node.region].remove(node_id)
        del self.nodes[node_id]
    
    def connect_layers(self):
        """계층 간 연결 설정"""
        # Layer 1 → Layer 2
        l1_nodes = self.layers[NodeLayer.EDGE_DEVICE]
        l2_nodes = self.layers[NodeLayer.EDGE_SERVER]
        
        for l1_id in l1_nodes:
            if l2_nodes:
                # 같은 리전 우선
                l1_region = self.nodes[l1_id].region
                same_region_l2 = [n for n in l2_nodes if self.nodes[n].region == l1_region]
                target = random.choice(same_region_l2) if same_region_l2 else random.choice(l2_nodes)
                
                self.nodes[l1_id].connect_to(target, "parent")
                self.nodes[target].connect_to(l1_id, "child")
        
        # Layer 2 → Layer 3
        l3_nodes = self.layers[NodeLayer.CORE_ENGINE]
        
        for l2_id in l2_nodes:
            if l3_nodes:
                targets = random.sample(l3_nodes, min(2, len(l3_nodes)))
                for target in targets:
                    self.nodes[l2_id].connect_to(target, "parent")
                    self.nodes[target].connect_to(l2_id, "child")
        
        # Layer 3 → Layer 4
        l4_nodes = self.layers[NodeLayer.CLOUD_ARCHIVE]
        
        for l3_id in l3_nodes:
            if l4_nodes:
                for l4_id in l4_nodes:
                    self.nodes[l3_id].connect_to(l4_id, "parent")
                    self.nodes[l4_id].connect_to(l3_id, "child")
    
    def simulate_message_propagation(self, source_id: str, msg_type: str, payload: dict) -> dict:
        """메시지 전파 시뮬레이션"""
        if source_id not in self.nodes:
            return {"error": "Source node not found"}
        
        start_time = time.time()
        
        msg = NetworkMessage(
            msg_id=hashlib.sha256(f"{source_id}:{time.time()}".encode()).hexdigest()[:16],
            msg_type=msg_type,
            sender=source_id,
            receiver="broadcast",
            payload=payload
        )
        
        visited = set()
        to_visit = [source_id]
        propagation_path = []
        
        while to_visit:
            current_id = to_visit.pop(0)
            if current_id in visited:
                continue
            
            visited.add(current_id)
            current_node = self.nodes.get(current_id)
            
            if not current_node or not current_node.is_active:
                continue
            
            current_node.send_message(msg)
            propagation_path.append({
                "node": current_id,
                "layer": current_node.layer.name,
                "hop": msg.hop_count
            })
            
            # 다음 노드
            for next_id in current_node.connections:
                if next_id not in visited and next_id in self.nodes:
                    to_visit.append(next_id)
                    msg.hop_count += 1
        
        elapsed_ms = (time.time() - start_time) * 1000
        
        return {
            "message_id": msg.msg_id,
            "source": source_id,
            "nodes_reached": len(visited),
            "total_nodes": len(self.nodes),
            "propagation_path": propagation_path[:10],  # 처음 10개만
            "elapsed_ms": round(elapsed_ms, 3)
        }
    
    def get_topology_stats(self) -> dict:
        """토폴로지 통계"""
        layer_stats = {}
        for layer, node_ids in self.layers.items():
            active_count = sum(1 for nid in node_ids if self.nodes[nid].is_active)
            layer_stats[layer.name] = {
                "total": len(node_ids),
                "active": active_count
            }
        
        region_stats = {region: len(nodes) for region, nodes in self.regions.items()}
        
        total_connections = sum(len(n.connections) for n in self.nodes.values())
        
        return {
            "total_nodes": len(self.nodes),
            "active_nodes": sum(1 for n in self.nodes.values() if n.is_active),
            "layers": layer_stats,
            "regions": region_stats,
            "total_connections": total_connections,
            "avg_connections_per_node": round(total_connections / len(self.nodes), 2) if self.nodes else 0
        }


# 테스트
if __name__ == "__main__":
    print("=" * 60)
    print("노드 네트워크 시뮬레이션")
    print("=" * 60)
    
    topology = NetworkTopology()
    
    # 노드 생성
    regions = ["KR", "JP", "SG"]
    
    for region in regions:
        # Layer 1: 각 리전 10개
        for i in range(10):
            topology.add_node(f"{region}-L1-{i:03d}", NodeLayer.EDGE_DEVICE, region)
        
        # Layer 2: 각 리전 3개
        for i in range(3):
            topology.add_node(f"{region}-L2-{i:02d}", NodeLayer.EDGE_SERVER, region)
        
        # Layer 3: 각 리전 1개
        topology.add_node(f"{region}-L3-01", NodeLayer.CORE_ENGINE, region)
    
    # Layer 4: 글로벌 2개
    topology.add_node("GLOBAL-L4-01", NodeLayer.CLOUD_ARCHIVE, "GLOBAL")
    topology.add_node("GLOBAL-L4-02", NodeLayer.CLOUD_ARCHIVE, "GLOBAL")
    
    # 연결 설정
    topology.connect_layers()
    
    stats = topology.get_topology_stats()
    print(f"\n[토폴로지 구성]")
    print(f"  총 노드: {stats['total_nodes']}")
    print(f"  활성 노드: {stats['active_nodes']}")
    print(f"  총 연결: {stats['total_connections']}")
    print(f"  노드당 평균 연결: {stats['avg_connections_per_node']}")
    
    print(f"\n[계층별 분포]")
    for layer, info in stats['layers'].items():
        print(f"  {layer}: {info['total']}개 (활성: {info['active']})")
    
    print(f"\n[리전별 분포]")
    for region, count in stats['regions'].items():
        print(f"  {region}: {count}개")
    
    # 메시지 전파 테스트
    result = topology.simulate_message_propagation(
        "KR-L1-000",
        "DATA_SYNC",
        {"block_hash": "abc123", "transactions": 100}
    )
    
    print(f"\n[메시지 전파 테스트]")
    print(f"  소스: {result['source']}")
    print(f"  도달 노드: {result['nodes_reached']}/{result['total_nodes']}")
    print(f"  소요 시간: {result['elapsed_ms']} ms")
