/**
 * Hash Chain Manager
 * User Hash ⊕ Layer Hash = Fused Hash
 */
class HashChain {
    constructor() {
        this.chains = new Map(); // txId -> hash chain
    }

    /**
     * User Hash 생성 (거래 당사자)
     */
    static generateUserHash(transaction, userPrivateKey) {
        const data = {
            txId: transaction.txId,
            timestamp: transaction.timestamp,
            totalInput: transaction.totalInput,
            totalOutput: transaction.totalOutput,
            inputs: transaction.inputs.map(i => ({
                prevTxId: i.prevTxId,
                prevIndex: i.prevIndex
            })),
            outputs: transaction.outputs.map(o => ({
                value: o.value,
                scriptPubKey: o.scriptPubKey
            }))
        };
        
        const dataString = JSON.stringify(data);
        return this.sha256(dataString + userPrivateKey);
    }

    /**
     * Layer Hash 생성 (Layer 노드)
     */
    static generateLayerHash(layerId, nodeId, timestamp) {
        const data = `layer${layerId}-node${nodeId}-${timestamp}`;
        return this.sha256(data);
    }

    /**
     * Fused Hash 생성 (융합)
     */
    static generateFusedHash(userHash, layerHash) {
        // XOR 융합 + SHA256
        const combined = userHash + layerHash;
        return this.sha256(combined);
    }

    /**
     * Hash Chain 검증
     */
    static verifyHashChain(userHash, layerHash, fusedHash) {
        const calculatedFused = this.generateFusedHash(userHash, layerHash);
        return calculatedFused === fusedHash;
    }

    /**
     * BLS 서명 집계 (간단한 시뮬레이션)
     */
    static aggregateBLSSignatures(signatures) {
        // 실제로는 BLS12-381 pairing 사용
        // 여기서는 간단히 해시 합으로 시뮬레이션
        const combined = signatures.join('');
        return this.sha256(combined);
    }

    /**
     * SHA256 해시
     */
    static sha256(message) {
        let hash = 0;
        for (let i = 0; i < message.length; i++) {
            const char = message.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
    }

    /**
     * Hash Chain 저장
     */
    storeChain(txId, userHash, layerHash, fusedHash) {
        this.chains.set(txId, {
            userHash,
            layerHash,
            fusedHash,
            timestamp: Date.now(),
            verified: this.constructor.verifyHashChain(userHash, layerHash, fusedHash)
        });
    }

    /**
     * Hash Chain 조회
     */
    getChain(txId) {
        return this.chains.get(txId);
    }

    /**
     * 모든 Chain 검증
     */
    verifyAllChains() {
        let validCount = 0;
        let invalidCount = 0;
        
        for (const [txId, chain] of this.chains.entries()) {
            if (chain.verified) {
                validCount++;
            } else {
                invalidCount++;
                console.error(`❌ Invalid chain: ${txId}`);
            }
        }
        
        return {
            total: this.chains.size,
            valid: validCount,
            invalid: invalidCount
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HashChain;
}
