/**
 * Trading Engine
 * UTXO + Transaction + OpenHash Layer 통합 거래 엔진
 */
class TradingEngine {
    constructor() {
        this.utxoSet = new UTXOSet();
        this.layerSelector = new LayerSelector();
        this.openHashLayer = new OpenHashLayer();
        this.hashChain = new HashChain();
        this.transactions = [];
        this.isInitialized = false;
    }

    /**
     * 초기화
     */
    async initialize() {
        console.log('🔧 Trading Engine 초기화 중...');
        
        const loaded = await this.utxoSet.loadFromGenesis();
        if (!loaded) {
            throw new Error('UTXO Set 로드 실패');
        }
        
        // 총량 검증
        const verification = this.utxoSet.verifyTotalSupply();
        if (!verification.valid) {
            throw new Error('총 발행량 불일치');
        }
        
        console.log('✅ Trading Engine 초기화 완료');
        console.log(`   UTXO: ${this.utxoSet.utxos.size}개`);
        console.log(`   총량: ${verification.current.toLocaleString()} T`);
        
        this.isInitialized = true;
        return true;
    }

    /**
     * 거래 실행 (전체 프로세스)
     */
    async executeTrade(sender, receiver, amount) {
        if (!this.isInitialized) {
            throw new Error('Trading Engine이 초기화되지 않았습니다');
        }
        
        console.log(`\n💰 거래 실행: ${sender.name} → ${receiver.name} (${amount} T)`);
        
        try {
            // === Step 1: 거래 생성 ===
            console.log('Step 1: 거래 생성 중...');
            const transaction = Transaction.create(sender, receiver, amount, this.utxoSet);
            console.log(`✓ TxID: ${transaction.txId.substring(0, 20)}...`);
            
            // === Step 2: 거래 검증 ===
            console.log('Step 2: 거래 검증 중...');
            const validation = Transaction.validate(transaction, this.utxoSet);
            if (!validation.valid) {
                throw new Error(`거래 검증 실패: ${validation.error}`);
            }
            console.log('✓ 거래 검증 통과');
            
            // === Step 3: Layer 선택 ===
            console.log('Step 3: OpenHash Layer 선택 중...');
            const layerInfo = this.layerSelector.selectByImportance(transaction);
            console.log(`✓ Layer ${layerInfo.layer} 선택 (${layerInfo.nodeCount}개 노드)`);
            
            // === Step 4: User Hash 생성 ===
            console.log('Step 4: User Hash 생성 중...');
            const userHash = HashChain.generateUserHash(transaction, sender.privateKey);
            console.log(`✓ User Hash: ${userHash.substring(0, 20)}...`);
            
            // === Step 5: Layer 1 기록 ===
            console.log('Step 5: Layer 1 기록 중...');
            const layer1Record = await this.openHashLayer.recordToLayer1(
                transaction, 
                userHash, 
                layerInfo
            );
            console.log(`✓ Layer 1 기록 완료 (Block #${layer1Record.blockHeight})`);
            console.log(`  - Fused Hash: ${layer1Record.fusedHash.substring(0, 20)}...`);
            console.log(`  - FPGA 검증: ${layer1Record.fpgaValidation.valid ? '✓' : '✗'}`);
            
            // === Step 6: Hash Chain 저장 ===
            this.hashChain.storeChain(
                transaction.txId,
                userHash,
                layer1Record.layerHash,
                layer1Record.fusedHash
            );
            
            // === Step 7: UTXO 업데이트 ===
            console.log('Step 6: UTXO 업데이트 중...');
            
            // 입력 UTXO 사용 처리
            transaction.inputs.forEach(input => {
                this.utxoSet.spendUTXO(input.prevTxId, input.prevIndex);
            });
            
            // 새 UTXO 추가
            transaction.outputs.forEach((output, index) => {
                this.utxoSet.addUTXO(transaction.txId, index, {
                    ...output,
                    blockHeight: layer1Record.blockHeight
                });
            });
            
            console.log('✓ UTXO 업데이트 완료');
            
            // === Step 8: 총량 검증 ===
            console.log('Step 7: 총 발행량 검증 중...');
            const totalVerification = this.utxoSet.verifyTotalSupply();
            if (!totalVerification.valid) {
                throw new Error('총 발행량 불일치 - 거래 롤백 필요');
            }
            console.log(`✓ 총량 검증 완료: ${totalVerification.current.toLocaleString()} T`);
            
            // === Step 9: 거래 기록 ===
            const tradeRecord = {
                transaction: transaction.toJSON(),
                layer1Record: layer1Record,
                layerInfo: layerInfo,
                executedAt: Date.now(),
                status: 'COMPLETED'
            };
            
            this.transactions.push(tradeRecord);
            
            console.log('✅ 거래 완료!');
            console.log(`   발신: ${sender.name} (잔액: ${this.utxoSet.getBalance(sender.publicKeyHash).toLocaleString()} T)`);
            console.log(`   수신: ${receiver.name} (잔액: ${this.utxoSet.getBalance(receiver.publicKeyHash).toLocaleString()} T)`);
            
            return tradeRecord;
            
        } catch (error) {
            console.error('❌ 거래 실패:', error.message);
            throw error;
        }
    }

    /**
     * 잔액 조회
     */
    getBalance(publicKeyHash) {
        return this.utxoSet.getBalance(publicKeyHash);
    }

    /**
     * 거래 내역 조회
     */
    getTransactionHistory(publicKeyHash = null) {
        if (!publicKeyHash) {
            return this.transactions;
        }
        
        return this.transactions.filter(trade => {
            const tx = trade.transaction;
            return tx.inputs.some(i => i.publicKey === publicKeyHash) ||
                   tx.outputs.some(o => o.scriptPubKey === publicKeyHash);
        });
    }

    /**
     * 시스템 통계
     */
    getSystemStats() {
        return {
            utxo: this.utxoSet.getStats(),
            layer: this.openHashLayer.getStats(),
            transactions: {
                total: this.transactions.length,
                completed: this.transactions.filter(t => t.status === 'COMPLETED').length
            },
            totalSupply: this.utxoSet.getTotalSupply()
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TradingEngine;
}
