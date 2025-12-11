// 제주도청 부서 데이터 - 안전한 로더
let dochungData = {};

function waitForDataLoader(callback, maxRetries = 50) {
    let retries = 0;
    const check = () => {
        if (window.dataLoader) callback();
        else if (++retries < maxRetries) setTimeout(check, 100);
        else { console.error('DataLoader 타임아웃'); callback(); }
    };
    check();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        waitForDataLoader(async () => {
            try {
                dochungData = await window.dataLoader.loadDepartment('dochung');
                console.log('✅ dochungData 로드 완료 (DataLoader)');
            } catch (error) {
                console.log('dochungData 로드 실패, 빈 객체 사용');
                dochungData = {};
            }
        });
    });
} else {
    waitForDataLoader(async () => {
        try {
            dochungData = await window.dataLoader.loadDepartment('dochung');
            console.log('✅ dochungData 로드 완료 (DataLoader)');
        } catch (error) {
            dochungData = {};
        }
    });
}
