// PDV 디버깅 도구

window.PDVDebug = {
    // 모든 PDV 데이터 확인
    checkAll: function() {
        console.log('=== PDV 저장 상태 확인 ===');
        
        // 도민 PDV
        const citizenData = localStorage.getItem('jeju_pdv_data');
        if (citizenData) {
            const parsed = JSON.parse(citizenData);
            console.log('도민 PDV:', Object.keys(parsed).length, '개');
            console.log(parsed);
        } else {
            console.log('도민 PDV: 저장된 데이터 없음');
        }
        
        // 단체 PDV
        const orgData = localStorage.getItem('jeju_org_pdv_data');
        if (orgData) {
            const parsed = JSON.parse(orgData);
            console.log('단체 PDV:', Object.keys(parsed).length, '개');
            console.log(parsed);
        } else {
            console.log('단체 PDV: 저장된 데이터 없음');
        }
        
        console.log('=== 확인 완료 ===');
    },
    
    // 특정 PDV 조회
    getCitizen: function(phoneOrId) {
        const data = localStorage.getItem('jeju_pdv_data');
        if (!data) return null;
        
        const parsed = JSON.parse(data);
        const pdvId = phoneOrId.includes('-') ? `PDV-${phoneOrId.replace(/-/g, '')}` : phoneOrId;
        return parsed[pdvId];
    },
    
    getOrg: function(phoneOrId, department) {
        const data = localStorage.getItem('jeju_org_pdv_data');
        if (!data) return null;
        
        const parsed = JSON.parse(data);
        let pdvId;
        if (phoneOrId.includes('-')) {
            const phoneClean = phoneOrId.replace(/-/g, '');
            pdvId = department ? `ORG-PDV-${phoneClean}-${department}` : `ORG-PDV-${phoneClean}`;
        } else {
            pdvId = department ? `ORG-PDV-${phoneOrId}-${department}` : `ORG-PDV-${phoneOrId}`;
        }
        return parsed[pdvId];
    },
    
    // 모든 데이터 삭제 (테스트용)
    clearAll: function() {
        if (confirm('모든 PDV 데이터를 삭제하시겠습니까?')) {
            localStorage.removeItem('jeju_pdv_data');
            localStorage.removeItem('jeju_org_pdv_data');
            console.log('모든 PDV 데이터가 삭제되었습니다.');
            alert('모든 PDV 데이터가 삭제되었습니다.');
        }
    },
    
    // LocalStorage 용량 확인
    checkSize: function() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        console.log('LocalStorage 사용량:', (total / 1024).toFixed(2), 'KB');
        console.log('최대 용량: 약 5-10MB (브라우저마다 다름)');
    }
};

// 페이지 로드 시 자동 확인
console.log('PDV 디버깅 도구 로드됨. 사용법:');
console.log('- PDVDebug.checkAll() : 모든 PDV 확인');
console.log('- PDVDebug.getCitizen("010-1234-5678") : 도민 PDV 조회');
console.log('- PDVDebug.getOrg("064-123-4567", "기획부") : 단체 PDV 조회');
console.log('- PDVDebug.clearAll() : 모든 데이터 삭제');
console.log('- PDVDebug.checkSize() : 용량 확인');
