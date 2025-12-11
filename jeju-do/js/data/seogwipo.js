// seogwipo 부서 데이터
// JSON 데이터 로더 래퍼

let seogwipoData = {};

// 즉시 로드
(async () => {
    try {
        seogwipoData = await window.dataLoader.loadDepartment('seogwipo');
        console.log('seogwipoData 로드 완료');
    } catch (error) {
        console.error('seogwipoData 로드 실패:', error);
        seogwipoData = {};
    }
})();
