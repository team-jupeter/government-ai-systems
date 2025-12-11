// 시민용 서류 종류 데이터베이스
// JSON 데이터 로더 래퍼

let citizenDocuments = {};

// 즉시 로드
(async () => {
    try {
        citizenDocuments = await window.dataLoader.loadCitizenDocuments();
        console.log('citizenDocuments 로드 완료:', Object.keys(citizenDocuments).length, '개');
    } catch (error) {
        console.error('citizenDocuments 로드 실패:', error);
        // 폴백: 빈 객체
        citizenDocuments = {};
    }
})();

// 동기식 접근을 위한 Proxy (선택사항)
// 이미 로드된 데이터만 반환
if (typeof Proxy !== 'undefined') {
    citizenDocuments = new Proxy(citizenDocuments, {
        get(target, prop) {
            if (Object.keys(target).length === 0) {
                console.warn('citizenDocuments가 아직 로드되지 않았습니다');
            }
            return target[prop];
        }
    });
}
