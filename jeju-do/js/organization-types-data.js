// 조직 타입 데이터 - 안전한 로더
let organizationTypes = {};

function waitForDataLoader(callback, maxRetries = 50, interval = 100) {
    let retries = 0;
    const check = () => {
        if (window.dataLoader && typeof window.dataLoader.loadOrganizationTypes === 'function') {
            callback();
        } else {
            retries++;
            if (retries < maxRetries) {
                setTimeout(check, interval);
            } else {
                console.error('DataLoader 로드 타임아웃 - 원본 데이터 사용');
                loadOriginalData();
            }
        }
    };
    check();
}

function loadOriginalData() {
    organizationTypes = {
        '제주특별자치도청': { type: 'government', level: 'province', icon: '🏛️', hasPhoneVerification: false, departments: ['dochung'] },
        '제주시청': { type: 'government', level: 'city', icon: '🏢', hasPhoneVerification: false, departments: ['jejusi'] },
        '서귀포시청': { type: 'government', level: 'city', icon: '🏢', hasPhoneVerification: false, departments: ['seogwipo'] },
        '제주교육청': { type: 'education', level: 'province', icon: '🎓', hasPhoneVerification: false },
        '제주지방경찰청': { type: 'police', level: 'province', icon: '👮', hasPhoneVerification: false },
        '제주지방검찰청': { type: 'prosecution', level: 'province', icon: '⚖️', hasPhoneVerification: false },
        '제주지방법원': { type: 'court', level: 'province', icon: '🏛️', hasPhoneVerification: false },
        '제주세관': { type: 'customs', level: 'province', icon: '📦', hasPhoneVerification: false },
        '제주지방국세청': { type: 'tax', level: 'province', icon: '💼', hasPhoneVerification: false },
        '제주지방병무청': { type: 'military', level: 'province', icon: '🎖️', hasPhoneVerification: false },
        '제주상공회의소': { type: 'business', level: 'province', icon: '🏪', hasPhoneVerification: true },
        '제주은행': { type: 'financial', level: 'province', icon: '🏦', hasPhoneVerification: true },
        '제주관광공사': { type: 'public', level: 'province', icon: '✈️', hasPhoneVerification: true },
        '제주테크노파크': { type: 'research', level: 'province', icon: '🔬', hasPhoneVerification: true },
        '제주대학교': { type: 'education', level: 'university', icon: '🎓', hasPhoneVerification: true },
        '제주한라대학교': { type: 'education', level: 'college', icon: '📚', hasPhoneVerification: true },
        '제주국제대학교': { type: 'education', level: 'university', icon: '🌏', hasPhoneVerification: true }
    };
    console.log('✅ 원본 데이터 폴백 로드 완료:', Object.keys(organizationTypes).length, '종류');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        waitForDataLoader(async () => {
            try {
                organizationTypes = await window.dataLoader.loadOrganizationTypes();
                console.log('✅ organizationTypes 로드 완료 (DataLoader):', Object.keys(organizationTypes).length, '종류');
            } catch (error) {
                console.error('organizationTypes 로드 실패, 폴백:', error);
                loadOriginalData();
            }
        });
    });
} else {
    waitForDataLoader(async () => {
        try {
            organizationTypes = await window.dataLoader.loadOrganizationTypes();
            console.log('✅ organizationTypes 로드 완료 (DataLoader):', Object.keys(organizationTypes).length, '종류');
        } catch (error) {
            console.error('organizationTypes 로드 실패, 폴백:', error);
            loadOriginalData();
        }
    });
}
