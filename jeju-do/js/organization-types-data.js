// 한국의 단체 종류 및 필요 서류 데이터
// JSON 데이터 로더 래퍼

let organizationTypes = {};

// 즉시 로드
(async () => {
    try {
        organizationTypes = await window.dataLoader.loadOrganizationTypes();
        console.log('organizationTypes 로드 완료:', Object.keys(organizationTypes).length, '종류');
    } catch (error) {
        console.error('organizationTypes 로드 실패:', error);
        organizationTypes = {};
    }
})();
