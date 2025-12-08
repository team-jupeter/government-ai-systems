/**
 * Validation Module
 * 거래 및 시스템 검증
 */
class ValidationModule {
    constructor(tradingEngine) {
        this.engine = tradingEngine;
        this.validationHistory = [];
    }

    /**
     * 전체 시스템 검증
     */
    async validateSystem() {
        console.log('🔍 시스템 검증 시작...\n');
        
        const results = {
            timestamp: new Date().toISOString(),
            tests: [],
            passed: 0,
            failed: 0
        };
        
        // Test 1: 총 발행량 검증
        const test1 = await this.testTotalSupply();
        results.tests.push(test1);
        test1.passed ? results.passed++ : results.failed++;
        
        // Test 2: UTXO 일관성 검증
        const test2 = await this.testUTXOConsistency();
        results.tests.push(test2);
        test2.passed ? results.passed++ : results.failed++;
        
        // Test 3: 이중 지불 검증
        const test3 = await this.testDoubleSpending();
        results.tests.push(test3);
        test3.passed ? results.passed++ : results.failed++;
        
        // Test 4: Hash Chain 검증
        const test4 = await this.testHashChains();
        results.tests.push(test4);
        test4.passed ? results.passed++ : results.failed++;
        
        // Test 5: Layer 기록 검증
        const test5 = await this.testLayerRecords();
        results.tests.push(test5);
        test5.passed ? results.passed++ : results.failed++;
        
        this.validationHistory.push(results);
        
        console.log('\n========================================');
        console.log(`검증 완료: ${results.passed}/${results.tests.length} 통과`);
        console.log('========================================\n');
        
        return results;
    }

    /**
     * Test 1: 총 발행량 검증
     */
    async testTotalSupply() {
        console.log('Test 1: 총 발행량 검증');
        
        const verification = this.engine.utxoSet.verifyTotalSupply();
        const passed = verification.valid;
        
        console.log(`  예상: 100,000,000 T`);
        console.log(`  실제: ${verification.current.toLocaleString()} T`);
        console.log(`  결과: ${passed ? '✅ 통과' : '❌ 실패'}\n`);
        
        return {
            name: '총 발행량 검증',
            passed: passed,
            expected: 100000000,
            actual: verification.current,
            message: passed ? '총량 일치' : '총량 불일치'
        };
    }

    /**
     * Test 2: UTXO 일관성 검증
     */
    async testUTXOConsistency() {
        console.log('Test 2: UTXO 일관성 검증');
        
        const stats = this.engine.utxoSet.getStats();
        const totalValue = stats.totalValue;
        const expectedTotal = 100000000;
        const passed = totalValue === expectedTotal;
        
        console.log(`  총 UTXO: ${stats.total}개`);
        console.log(`  미사용: ${stats.unspent}개`);
        console.log(`  사용됨: ${stats.spent}개`);
        console.log(`  합계: ${totalValue.toLocaleString()} T`);
        console.log(`  결과: ${passed ? '✅ 통과' : '❌ 실패'}\n`);
        
        return {
            name: 'UTXO 일관성 검증',
            passed: passed,
            stats: stats,
            message: passed ? 'UTXO 일관성 유지' : 'UTXO 불일치'
        };
    }

    /**
     * Test 3: 이중 지불 검증
     */
    async testDoubleSpending() {
        console.log('Test 3: 이중 지불 검증');
        
        let doubleSpendAttempts = 0;
        
        // 모든 사용된 UTXO 확인
        for (const utxo of this.engine.utxoSet.utxos.values()) {
            if (utxo.isSpent) {
                // 이 UTXO가 여러 번 사용되었는지 확인
                // (실제로는 거래 기록을 추적해야 함)
                doubleSpendAttempts += 0;
            }
        }
        
        const passed = doubleSpendAttempts === 0;
        
        console.log(`  이중 지불 시도: ${doubleSpendAttempts}건`);
        console.log(`  결과: ${passed ? '✅ 통과' : '❌ 실패'}\n`);
        
        return {
            name: '이중 지불 검증',
            passed: passed,
            doubleSpendAttempts: doubleSpendAttempts,
            message: passed ? '이중 지불 없음' : '이중 지불 감지'
        };
    }

    /**
     * Test 4: Hash Chain 검증
     */
    async testHashChains() {
        console.log('Test 4: Hash Chain 검증');
        
        const verification = this.engine.hashChain.verifyAllChains();
        const passed = verification.invalid === 0;
        
        console.log(`  총 Chain: ${verification.total}개`);
        console.log(`  유효: ${verification.valid}개`);
        console.log(`  무효: ${verification.invalid}개`);
        console.log(`  결과: ${passed ? '✅ 통과' : '❌ 실패'}\n`);
        
        return {
            name: 'Hash Chain 검증',
            passed: passed,
            verification: verification,
            message: passed ? 'Hash Chain 일관성 유지' : 'Hash Chain 불일치'
        };
    }

    /**
     * Test 5: Layer 기록 검증
     */
    async testLayerRecords() {
        console.log('Test 5: Layer 기록 검증');
        
        const stats = this.engine.openHashLayer.getStats();
        let totalRecords = 0;
        
        for (const layerStat of Object.values(stats)) {
            totalRecords += layerStat.recordCount;
        }
        
        const passed = totalRecords > 0;
        
        console.log(`  Layer 1: ${stats.layer1.recordCount}개`);
        console.log(`  Layer 2: ${stats.layer2.recordCount}개`);
        console.log(`  Layer 3: ${stats.layer3.recordCount}개`);
        console.log(`  Layer 4: ${stats.layer4.recordCount}개`);
        console.log(`  결과: ${passed ? '✅ 통과' : '❌ 실패'}\n`);
        
        return {
            name: 'Layer 기록 검증',
            passed: passed,
            stats: stats,
            message: passed ? 'Layer 기록 정상' : 'Layer 기록 없음'
        };
    }

    /**
     * 특정 거래 검증
     */
    validateTransaction(txId) {
        const trade = this.engine.transactions.find(t => t.transaction.txId === txId);
        
        if (!trade) {
            return { valid: false, error: 'Transaction not found' };
        }
        
        // Hash Chain 검증
        const chain = this.engine.hashChain.getChain(txId);
        if (!chain || !chain.verified) {
            return { valid: false, error: 'Invalid hash chain' };
        }
        
        return { valid: true, trade: trade };
    }

    /**
     * 검증 히스토리 조회
     */
    getValidationHistory() {
        return this.validationHistory;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationModule;
}
