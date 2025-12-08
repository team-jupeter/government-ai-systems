/**
 * UTXO Set Manager
 * Unspent Transaction Output 관리
 */
class UTXOSet {
    constructor() {
        this.utxos = new Map(); // key: "txId:index" -> UTXO object
        this.totalSupply = 100000000; // 1억 T
    }

    /**
     * 초기 UTXO 로드 (Genesis)
     */
    async loadFromGenesis() {
        try {
            const response = await fetch('data/utxo_set.json');
            const data = await response.json();
            
            Object.entries(data.utxos).forEach(([key, utxo]) => {
                this.utxos.set(key, utxo);
            });
            
            console.log(`✓ UTXO Set 로드 완료: ${this.utxos.size}개`);
            return true;
        } catch (error) {
            console.error('UTXO Set 로드 실패:', error);
            return false;
        }
    }

    /**
     * UTXO 추가
     */
    addUTXO(txId, index, output) {
        const key = `${txId}:${index}`;
        this.utxos.set(key, {
            txId,
            index,
            value: output.value,
            scriptPubKey: output.scriptPubKey,
            owner: output.owner,
            isSpent: false,
            timestamp: Date.now(),
            blockHeight: output.blockHeight || 0
        });
    }

    /**
     * UTXO 사용 처리
     */
    spendUTXO(txId, index) {
        const key = `${txId}:${index}`;
        const utxo = this.utxos.get(key);
        
        if (!utxo) {
            throw new Error(`UTXO not found: ${key}`);
        }
        
        if (utxo.isSpent) {
            throw new Error(`UTXO already spent: ${key}`);
        }
        
        utxo.isSpent = true;
        return utxo;
    }

    /**
     * UTXO 조회
     */
    getUTXO(txId, index) {
        const key = `${txId}:${index}`;
        return this.utxos.get(key);
    }

    /**
     * 특정 주소의 미사용 UTXO 조회
     */
    getUTXOsByAddress(publicKeyHash) {
        const userUTXOs = [];
        
        for (const utxo of this.utxos.values()) {
            if (!utxo.isSpent && utxo.scriptPubKey === publicKeyHash) {
                userUTXOs.push(utxo);
            }
        }
        
        return userUTXOs;
    }

    /**
     * 잔액 계산
     */
    getBalance(publicKeyHash) {
        return this.getUTXOsByAddress(publicKeyHash)
            .reduce((sum, utxo) => sum + utxo.value, 0);
    }

    /**
     * 총 발행량 검증
     */
    getTotalSupply() {
        let total = 0;
        
        for (const utxo of this.utxos.values()) {
            if (!utxo.isSpent) {
                total += utxo.value;
            }
        }
        
        return total;
    }

    /**
     * 총량 검증
     */
    verifyTotalSupply() {
        const current = this.getTotalSupply();
        const isValid = current === this.totalSupply;
        
        if (!isValid) {
            console.error(`❌ 총량 불일치: ${current} T (기대값: ${this.totalSupply} T)`);
        }
        
        return {
            valid: isValid,
            current: current,
            expected: this.totalSupply
        };
    }

    /**
     * UTXO 통계
     */
    getStats() {
        let spentCount = 0;
        let unspentCount = 0;
        let totalValue = 0;
        
        for (const utxo of this.utxos.values()) {
            if (utxo.isSpent) {
                spentCount++;
            } else {
                unspentCount++;
                totalValue += utxo.value;
            }
        }
        
        return {
            total: this.utxos.size,
            spent: spentCount,
            unspent: unspentCount,
            totalValue: totalValue
        };
    }

    /**
     * UTXO Set 저장
     */
    toJSON() {
        const utxos = {};
        
        for (const [key, utxo] of this.utxos.entries()) {
            utxos[key] = utxo;
        }
        
        return {
            totalSupply: this.totalSupply,
            utxoCount: this.utxos.size,
            lastUpdated: new Date().toISOString(),
            utxos: utxos
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UTXOSet;
}
