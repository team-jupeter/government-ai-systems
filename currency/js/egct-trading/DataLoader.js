/**
 * Data Loader - 실제 데이터와 공개 데이터 자동 선택
 */
class DataLoader {
    constructor() {
        this.isProduction = window.location.hostname !== 'localhost';
        this.hasRealData = false;
    }

    /**
     * UTXO Set 로드 (실제 데이터 우선)
     */
    async loadUTXOSet() {
        // 1. 실제 데이터 시도
        try {
            const response = await fetch('data/utxo_set.json');
            if (response.ok) {
                const data = await response.json();
                this.hasRealData = true;
                console.log('✓ 실제 UTXO 데이터 로드 (서버 운영 모드)');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ 실제 데이터 없음, 공개 데이터 사용');
        }

        // 2. 공개 데이터 사용 (폴백)
        const response = await fetch('data/utxo_set.public.json');
        const data = await response.json();
        console.log('📂 공개 UTXO 데이터 사용 (데모 모드)');
        return data;
    }

    /**
     * Holders 정보 로드
     */
    async loadHolders() {
        try {
            const response = await fetch('data/holders.json');
            if (response.ok) {
                const data = await response.json();
                this.hasRealData = true;
                return data;
            }
        } catch (error) {
            console.warn('⚠️ 실제 보유자 데이터 없음');
        }

        // 공개 데이터
        const response = await fetch('data/holders.public.json');
        return await response.json();
    }

    /**
     * 환경 정보
     */
    getEnvironment() {
        return {
            mode: this.hasRealData ? 'PRODUCTION' : 'DEMO',
            hasRealData: this.hasRealData,
            hostname: window.location.hostname
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataLoader;
}
