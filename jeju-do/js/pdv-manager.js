// PDV 관리 시스템

class PDVManager {
    constructor() {
        this.storageKey = 'pdv_data';
    }

    // PDV ID 생성
    generatePDVId() {
        return 'PDV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // PDV 저장
    savePDV(pdv) {
        const allPDVs = this.getAllPDVs();
        
        // 기존 PDV 확인 (전화번호 중복 체크)
        const existingIndex = allPDVs.findIndex(p => p.phoneNumber === pdv.phoneNumber);
        
        if (existingIndex >= 0) {
            // 기존 PDV 업데이트
            allPDVs[existingIndex] = pdv;
        } else {
            // 새 PDV 추가
            allPDVs.push(pdv);
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(allPDVs));
        console.log('PDV 저장 완료:', pdv.pdvId);
        return pdv;
    }

    // 전체 PDV 조회 (배열 반환 보장)
    getAllPDVs() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data) {
                console.log('저장된 PDV 없음, 빈 배열 반환');
                return [];
            }
            
            const parsed = JSON.parse(data);
            
            // 배열인지 확인
            if (Array.isArray(parsed)) {
                console.log('PDV 목록 로드:', parsed.length, '개');
                return parsed;
            } else {
                console.warn('저장된 데이터가 배열이 아님:', typeof parsed);
                return [];
            }
        } catch (error) {
            console.error('PDV 로드 오류:', error);
            return [];
        }
    }

    // PDV ID로 조회
    getPDVById(pdvId) {
        const allPDVs = this.getAllPDVs();
        return allPDVs.find(pdv => pdv.pdvId === pdvId);
    }

    // 전화번호로 조회
    getPDVByPhone(phoneNumber) {
        const allPDVs = this.getAllPDVs();
        return allPDVs.find(pdv => pdv.phoneNumber === phoneNumber);
    }

    // PDV 삭제
    deletePDV(pdvId) {
        const allPDVs = this.getAllPDVs();
        const filtered = allPDVs.filter(pdv => pdv.pdvId !== pdvId);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
        console.log('PDV 삭제:', pdvId);
    }

    // 활동 추가
    addActivity(pdvId, activity) {
        const pdv = this.getPDVById(pdvId);
        if (!pdv) {
            console.error('PDV를 찾을 수 없음:', pdvId);
            return false;
        }

        if (!pdv.activities) {
            pdv.activities = [];
        }

        activity.timestamp = activity.timestamp || new Date().toISOString();
        pdv.activities.push(activity);

        this.savePDV(pdv);
        console.log('활동 추가:', activity.type);
        return true;
    }

    // 문서 추가
    addDocument(pdvId, document) {
        const pdv = this.getPDVById(pdvId);
        if (!pdv) {
            console.error('PDV를 찾을 수 없음:', pdvId);
            return false;
        }

        if (!pdv.documents) {
            pdv.documents = [];
        }

        document.uploadedAt = document.uploadedAt || new Date().toISOString();
        pdv.documents.push(document);

        this.savePDV(pdv);
        console.log('문서 추가:', document.name);
        return true;
    }

    // PDV 업데이트 (pdvId 기준)
    updatePDV(pdv) {
        const allPDVs = this.getAllPDVs();
        const index = allPDVs.findIndex(p => p.pdvId === pdv.pdvId);
        
        if (index !== -1) {
            allPDVs[index] = pdv;
            localStorage.setItem(this.storageKey, JSON.stringify(allPDVs));
            console.log("PDV 업데이트 완료:", pdv.pdvId);
            return true;
        } else {
            console.warn("PDV를 찾을 수 없어 새로 저장:", pdv.pdvId);
            return this.savePDV(pdv);
        }
    }


    // 전체 초기화 (개발용)
    clearAll() {
        localStorage.removeItem(this.storageKey);
        console.log('모든 PDV 데이터 삭제');
    }
}

// 전역 인스턴스 생성
console.log('PDVManager 초기화');
window.pdvManager = new PDVManager();
