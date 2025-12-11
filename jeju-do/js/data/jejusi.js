// jejusi 부서 데이터
// JSON 데이터 로더 래퍼

let jejusiData = {};

// 즉시 로드
(async () => {
    try {
        jejusiData = await window.dataLoader.loadDepartment('jejusi');
        console.log('jejusiData 로드 완료');
    } catch (error) {
        console.error('jejusiData 로드 실패:', error);
        jejusiData = {};
    }
})();
