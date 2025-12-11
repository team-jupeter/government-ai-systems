// dochung 부서 데이터
// JSON 데이터 로더 래퍼

let dochungData = {};

// 즉시 로드
(async () => {
    try {
        dochungData = await window.dataLoader.loadDepartment('dochung');
        console.log('dochungData 로드 완료');
    } catch (error) {
        console.error('dochungData 로드 실패:', error);
        dochungData = {};
    }
})();
