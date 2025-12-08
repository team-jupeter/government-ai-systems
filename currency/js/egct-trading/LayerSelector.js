/**
 * OpenHash Layer Selector
 * 확률적 계층 선택 알고리즘
 */
class LayerSelector {
    constructor() {
        // OpenHash 확률 분포
        this.probabilities = {
            layer1: 0.70,  // 70% - 빠른 기록 (1,000+ 노드)
            layer2: 0.20,  // 20% - 중간 집계 (100 노드)
            layer3: 0.08,  // 8%  - 상위 검증 (10 노드)
            layer4: 0.02   // 2%  - 최종 확정 (1 노드)
        };
        
        this.layerConfig = {
            1: { nodeCount: 1000, speed: '0.032ms', accuracy: '99.4%' },
            2: { nodeCount: 100, speed: '1min', bandwidth: '0.1%' },
            3: { nodeCount: 10, speed: '10min', bandwidth: '0.01%' },
            4: { nodeCount: 1, speed: '1hour', finality: true }
        };
    }

    /**
     * 확률적 Layer 선택
     */
    selectLayer() {
        const random = Math.random();
        
        if (random < this.probabilities.layer1) {
            return this.getLayerInfo(1);
        } else if (random < this.probabilities.layer1 + this.probabilities.layer2) {
            return this.getLayerInfo(2);
        } else if (random < 1 - this.probabilities.layer4) {
            return this.getLayerInfo(3);
        } else {
            return this.getLayerInfo(4);
        }
    }

    /**
     * 거래 금액에 따른 Layer 선택
     */
    selectByAmount(amount) {
        if (amount >= 10000000) {
            return this.getLayerInfo(4);  // 1000만 T 이상 → Layer 4
        } else if (amount >= 1000000) {
            return this.getLayerInfo(3);  // 100만 T 이상 → Layer 3
        } else if (amount >= 100000) {
            return this.getLayerInfo(2);  // 10만 T 이상 → Layer 2
        } else {
            return this.getLayerInfo(1);  // 그 외 → Layer 1
        }
    }

    /**
     * 거래 중요도에 따른 Layer 선택 (하이브리드)
     */
    selectByImportance(transaction) {
        const amount = transaction.totalOutput;
        
        // 고액 거래는 무조건 상위 Layer
        if (amount >= 1000000) {
            return this.selectByAmount(amount);
        }
        
        // 소액 거래는 확률적 선택
        return this.selectLayer();
    }

    /**
     * Layer 정보 조회
     */
    getLayerInfo(layerNumber) {
        return {
            layer: layerNumber,
            ...this.layerConfig[layerNumber],
            selectedAt: Date.now()
        };
    }

    /**
     * 랜덤 노드 선택
     */
    selectRandomNode(layerNumber) {
        const config = this.layerConfig[layerNumber];
        return Math.floor(Math.random() * config.nodeCount) + 1;
    }

    /**
     * Layer 통계
     */
    getStats() {
        return {
            probabilities: this.probabilities,
            layers: this.layerConfig
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LayerSelector;
}
