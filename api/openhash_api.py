"""
오픈해시 API 서버
REST API 인터페이스 제공
"""

import json
import hashlib
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import sys
import os

# 모듈 경로 추가
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from layers.probabilistic_layer_selector import ProbabilisticLayerSelector
from layers.lpbft_consensus import LPBFTConsensus, Transaction

class OpenHashAPI:
    """오픈해시 API"""
    
    def __init__(self):
        self.layer_selector = ProbabilisticLayerSelector()
        self.consensus = LPBFTConsensus(num_nodes=4)
        self.transactions = {}
        self.start_time = time.time()
    
    def health_check(self) -> dict:
        """헬스 체크"""
        return {
            "status": "healthy",
            "uptime_seconds": round(time.time() - self.start_time, 2),
            "version": "1.0.0"
        }
    
    def get_system_info(self) -> dict:
        """시스템 정보"""
        return {
            "name": "OpenHash Patent Simulation",
            "patent_title": "확률적 계층 분산 기반 데이터 무결성 검증 시스템",
            "components": {
                "layer_selector": "Probabilistic Layer Selection (SHA-256 Double Hash)",
                "consensus": "LPBFT (Lightweight PBFT)",
                "verification": "Inter-Layer Mutual Verification"
            },
            "performance": {
                "theoretical_tps_per_node": 80,
                "energy_savings_vs_bitcoin": "98.5%"
            }
        }
    
    def select_layer(self, document_hash: str, timestamp: float = None) -> dict:
        """계층 선택 API"""
        layer, n_value, details = self.layer_selector.select_layer(document_hash, timestamp)
        return {
            "document_hash": document_hash,
            "selected_layer": layer,
            "n_value": n_value,
            "details": details
        }
    
    def submit_transaction(self, tx_id: str, data: str) -> dict:
        """트랜잭션 제출"""
        tx = Transaction(tx_id, data)
        result = self.consensus.run_consensus(tx)
        
        self.transactions[tx_id] = {
            "tx_id": tx_id,
            "data": data,
            "digest": tx.digest[:32],
            "status": result["result"],
            "timestamp": time.time()
        }
        
        return {
            "tx_id": tx_id,
            "status": result["result"],
            "consensus_time_ms": result["total_time_ms"]
        }
    
    def get_transaction(self, tx_id: str) -> dict:
        """트랜잭션 조회"""
        if tx_id in self.transactions:
            return self.transactions[tx_id]
        return {"error": "Transaction not found"}
    
    def simulate_distribution(self, count: int = 1000) -> dict:
        """분포 시뮬레이션"""
        results = self.layer_selector.simulate_distribution(count)
        return results


# API 핸들러
api = OpenHashAPI()

class APIHandler(BaseHTTPRequestHandler):
    """HTTP 요청 핸들러"""
    
    def _send_response(self, data: dict, status: int = 200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))
    
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)
        
        try:
            if path == '/health':
                self._send_response(api.health_check())
            
            elif path == '/info':
                self._send_response(api.get_system_info())
            
            elif path == '/layer/select':
                doc_hash = query.get('hash', [hashlib.sha256(str(time.time()).encode()).hexdigest()])[0]
                self._send_response(api.select_layer(doc_hash))
            
            elif path == '/layer/simulate':
                count = int(query.get('count', [1000])[0])
                self._send_response(api.simulate_distribution(count))
            
            elif path.startswith('/transaction/'):
                tx_id = path.split('/')[-1]
                self._send_response(api.get_transaction(tx_id))
            
            else:
                self._send_response({
                    "error": "Not Found",
                    "endpoints": [
                        "GET /health",
                        "GET /info",
                        "GET /layer/select?hash=<document_hash>",
                        "GET /layer/simulate?count=<number>",
                        "POST /transaction",
                        "GET /transaction/<tx_id>"
                    ]
                }, 404)
        
        except Exception as e:
            self._send_response({"error": str(e)}, 500)
    
    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(body) if body else {}
            
            if path == '/transaction':
                tx_id = data.get('tx_id', f"TX-{int(time.time()*1000)}")
                tx_data = data.get('data', '')
                self._send_response(api.submit_transaction(tx_id, tx_data))
            
            else:
                self._send_response({"error": "Not Found"}, 404)
        
        except Exception as e:
            self._send_response({"error": str(e)}, 500)
    
    def log_message(self, format, *args):
        print(f"[API] {args[0]}")


def run_server(port: int = 8080):
    """API 서버 실행"""
    server = HTTPServer(('0.0.0.0', port), APIHandler)
    print(f"=" * 50)
    print(f"OpenHash API Server")
    print(f"=" * 50)
    print(f"Server running on http://0.0.0.0:{port}")
    print(f"\nEndpoints:")
    print(f"  GET  /health              - Health check")
    print(f"  GET  /info                - System info")
    print(f"  GET  /layer/select        - Select layer for document")
    print(f"  GET  /layer/simulate      - Simulate distribution")
    print(f"  POST /transaction         - Submit transaction")
    print(f"  GET  /transaction/<id>    - Get transaction")
    print(f"\nPress Ctrl+C to stop")
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8080)
    args = parser.parse_args()
    
    run_server(args.port)
