"""
오픈해시 기본 설정
"""

# 계층 설정
LAYER_CONFIG = {
    "layers": [
        {"name": "Layer1", "probability": 0.70, "range": (0, 70)},
        {"name": "Layer2", "probability": 0.20, "range": (70, 90)},
        {"name": "Layer3", "probability": 0.10, "range": (90, 100)},
    ],
    "modulo": 100
}

# LPBFT 설정
LPBFT_CONFIG = {
    "default_nodes": 4,
    "representative_nodes": 10,
    "pbft_threshold": 0.7,  # 70% 합의 필요
}

# 네트워크 설정
NETWORK_CONFIG = {
    "node_tps": 80,
    "network_efficiency": {
        "min": 0.75,
        "max": 0.95,
        "default": 0.85
    },
    "bandwidth_gbps": 10,
}

# 에너지 설정
ENERGY_CONFIG = {
    "bitcoin_annual_twh": 121,
    "openhash_annual_twh": 1.8,
    "target_savings": 0.985,  # 98.5%
}

# AWS 인스턴스 설정
AWS_INSTANCES = {
    "layer1": {"type": "t3.micro", "power_watts": 2.5},
    "layer2": {"type": "t3.small", "power_watts": 5.0},
    "layer3": {"type": "t3.small", "power_watts": 5.0},
    "layer4": {"type": "c7i-flex.large", "power_watts": 6.0},
}
