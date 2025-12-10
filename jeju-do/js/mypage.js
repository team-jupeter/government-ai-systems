// My Page 관리

function loadMyPageData() {
    console.log('My Page 데이터 로드 시작');
    
    if (!window.authManager || !window.authManager.getCurrentUser()) {
        console.error('로그인되지 않음');
        document.getElementById('pdv-info-container').innerHTML = '<p style="color: red;">로그인이 필요합니다.</p>';
        return;
    }
    
    const user = window.authManager.getCurrentUser();
    console.log('현재 사용자:', user);
    
    // PDV 정보 표시
    displayPDVInfo(user);
    
    // 필요 서류 표시
    displayRequiredDocuments(user);
    
    // 활동 타임라인 표시
    displayActivities(user);
}

function displayPDVInfo(user) {
    const container = document.getElementById('pdv-info-container');
    if (!container) {
        console.error('pdv-info-container를 찾을 수 없음');
        return;
    }
    
    let html = '<div class="pdv-info-grid">';
    
    if (user.type === 'citizen') {
        // 개인 정보
        const person = user.personData || {};
        html += `
            <div class="info-item">
                <span class="info-label">👤 이름</span>
                <span class="info-value">${person.name || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">📍 주소</span>
                <span class="info-value">${person.address || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">📞 전화번호</span>
                <span class="info-value">${user.phoneNumber || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">✉️ 이메일</span>
                <span class="info-value">${person.email || '미입력'}</span>
            </div>
        `;
    } else if (user.type === 'organization') {
        // 단체 정보
        const org = user.orgData || {};
        html += `
            <div class="info-item">
                <span class="info-label">🏢 단체명</span>
                <span class="info-value">${org.name || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">📋 단체 종류</span>
                <span class="info-value">${org.type || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">📍 주소</span>
                <span class="info-value">${org.address || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">📞 전화번호</span>
                <span class="info-value">${user.phoneNumber || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">👤 대표자</span>
                <span class="info-value">${org.representative || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">🏢 사업자등록번호</span>
                <span class="info-value">${org.businessNumber || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">⚖️ 법인등록번호</span>
                <span class="info-value">${org.corporateNumber || '미입력'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">✉️ 이메일</span>
                <span class="info-value">${org.email || '미입력'}</span>
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    console.log('PDV 정보 표시 완료');
}

function displayRequiredDocuments(user) {
    const container = document.getElementById('required-docs-container');
    if (!container) {
        console.error('required-docs-container를 찾을 수 없음');
        return;
    }
    
    let documents = [];
    
    if (user.type === 'citizen') {
        documents = [
            '주민등록증',
            '주민등록등본',
            '주민등록초본',
            '인감증명서',
            '본인서명사실확인서',
            '가족관계증명서',
            '건강보험자격득실확인서',
            '소득금액증명원',
            '재산세납세증명서'
        ];
    } else if (user.type === 'organization') {
        const orgType = user.orgData?.type || '';
        
        // 단체 종류별 필요 서류
        if (window.organizationTypes && window.organizationTypes[orgType]) {
            documents = window.organizationTypes[orgType].requiredDocuments || [];
        } else {
            // 기본 서류
            documents = [
                '법인등기부등본',
                '사업자등록증',
                '정관',
                '법인인감증명서',
                '재무제표',
                '임대차계약서'
            ];
        }
    }
    
    let html = '<div class="docs-grid">';
    documents.forEach(doc => {
        const hasDoc = user.documents && user.documents.some(d => d.name === doc);
        html += `
            <button class="doc-card ${hasDoc ? 'has-doc' : 'no-doc'}">
                <span class="doc-icon">${hasDoc ? '✅' : '📄'}</span>
                <span class="doc-name">${doc}</span>
                ${hasDoc ? '<span class="doc-status">보유</span>' : '<span class="doc-status">미보유</span>'}
            </button>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
    console.log('필요 서류 표시 완료');
}

function displayActivities(user) {
    const container = document.getElementById('activities-list');
    if (!container) {
        console.error('activities-list를 찾을 수 없음');
        return;
    }
    
    const activities = user.activities || [];
    
    if (activities.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">아직 활동 내역이 없습니다.</p>';
        return;
    }
    
    let html = '';
    activities.forEach((activity, index) => {
        const date = new Date(activity.timestamp).toLocaleString('ko-KR');
        html += `
            <div class="activity-item">
                <div class="activity-number">#${activity.serialNumber || index + 1}</div>
                <div class="activity-content">
                    <div class="activity-type">${activity.type || '활동'}</div>
                    <div class="activity-desc">${activity.description || ''}</div>
                    <div class="activity-time">${date}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // OpenHash 생성 버튼 표시 여부
    const createHashBtn = document.getElementById('create-openhash-btn');
    if (createHashBtn) {
        if (activities.length >= 5) {
            createHashBtn.style.display = 'block';
        } else {
            createHashBtn.style.display = 'none';
        }
    }
    
    console.log('활동 타임라인 표시 완료');
}

// My Page 탭이 열릴 때 자동 로드
function showMyPage() {
    console.log('showMyPage 호출됨');
    switchTab('mypage');
    
    // 잠시 후 데이터 로드 (DOM이 준비될 시간 확보)
    setTimeout(() => {
        loadMyPageData();
    }, 100);
}

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('My Page 스크립트 로드됨');
    });
} else {
    console.log('My Page 스크립트 로드됨');
}
