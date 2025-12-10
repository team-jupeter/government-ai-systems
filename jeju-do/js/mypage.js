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
    
    // 사용자가 보유한 서류 추가
    const userDocNames = user.documents ? user.documents.map(d => d.name) : [];
    
    // 중복 제거
    const allDocs = [...new Set([...documents, ...userDocNames])];
    
    let html = `<div style="margin-bottom: 20px;">
        <button onclick="showAddDocumentModal()" style="
            padding: 10px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
        " onmouseover="this.style.transform='translateY(-2px)';
            this.style.boxShadow='0 4px 12px rgba(102,126,234,0.4)'" 
            onmouseout="this.style.transform='translateY(0)';
            this.style.boxShadow='none'">
            ➕ 서류 추가
        </button>
    </div>
    <div class="docs-grid">`;
    
    allDocs.forEach(doc => {
        const hasDoc = userDocNames.includes(doc);
        html += `
            <button class="doc-card ${hasDoc ? 'has-doc' : 'no-doc'}" 
                    onclick="${hasDoc ? `removeDocumentFromPDV('${doc}')` : ''}">
                <span class="doc-icon">${hasDoc ? '✅' : '📄'}</span>
                <span class="doc-name">${doc}</span>
                ${hasDoc ? '<span class="doc-status">보유</span>' : '<span class="doc-status">미보유</span>'}
                ${hasDoc ? '<span class="doc-delete">🗑️</span>' : ''}
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

// 서류 추가 기능
function showAddDocumentModal() {
    const modal = document.getElementById('add-document-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // 서류 목록 datalist 생성 (사용자 유형별 필터링)
        populateDocumentDatalist();
    }
}

function closeAddDocumentModal() {
    const modal = document.getElementById('add-document-modal');
    if (modal) {
        modal.style.display = 'none';
        // 입력 필드 초기화
        document.getElementById('document-name-input').value = '';
    }
}

function populateDocumentDatalist() {
    const datalist = document.getElementById('document-list');
    if (!datalist) {
        console.error('document-list datalist를 찾을 수 없음');
        return;
    }
    
    const user = window.authManager?.getCurrentUser();
    if (!user) {
        console.error('현재 사용자 정보 없음');
        return;
    }
    
    // datalist 초기화
    datalist.innerHTML = '';
    
    let availableDocuments = [];
    
    if (user.type === 'citizen') {
        // 개인: 시민용 서류 전체
        if (window.citizenDocuments) {
            availableDocuments = Object.keys(window.citizenDocuments).sort();
        }
    } else if (user.type === 'organization') {
        // 단체: 단체 유형별 서류
        const orgType = user.orgData?.type || '';
        
        if (window.organizationTypes && window.organizationTypes[orgType]) {
            const orgTypeData = window.organizationTypes[orgType];
            availableDocuments = orgTypeData.requiredDocuments || [];
            
            console.log(`단체 유형: ${orgType}, 필요 서류 수: ${availableDocuments.length}`);
        } else {
            console.warn(`단체 유형 "${orgType}"의 데이터를 찾을 수 없음`);
            // 기본 단체 서류
            availableDocuments = [
                '법인등기부등본',
                '사업자등록증',
                '정관',
                '법인인감증명서',
                '재무제표',
                '손익계산서',
                '재무상태표',
                '임대차계약서',
                '사업자등록증명원',
                '법인세신고서'
            ];
        }
        
        // 정렬
        availableDocuments.sort();
    }
    
    console.log(`드롭다운에 표시할 서류 수: ${availableDocuments.length}`);
    
    // datalist에 옵션 추가
    availableDocuments.forEach(docName => {
        const option = document.createElement('option');
        option.value = docName;
        
        // 개인인 경우 카테고리 정보 추가
        if (user.type === 'citizen' && window.citizenDocuments && window.citizenDocuments[docName]) {
            const doc = window.citizenDocuments[docName];
            option.textContent = `${docName} (${doc.category})`;
        } else {
            option.textContent = docName;
        }
        
        datalist.appendChild(option);
    });
}

function addDocumentToPDV() {
    if (!window.authManager || !window.authManager.getCurrentUser()) {
        alert('로그인이 필요합니다.');
        return;
    }
    
    const docNameInput = document.getElementById('document-name-input');
    const docName = docNameInput.value.trim();
    
    if (!docName) {
        alert('서류 이름을 입력해주세요.');
        return;
    }
    
    // 현재 사용자 PDV 가져오기
    const user = window.authManager.getCurrentUser();
    
    // 이미 보유한 서류인지 확인
    if (user.documents && user.documents.some(d => d.name === docName)) {
        alert('이미 보유한 서류입니다.');
        return;
    }
    
    // 서류 추가
    if (!user.documents) {
        user.documents = [];
    }
    
    const newDocument = {
        name: docName,
        addedAt: new Date().toISOString(),
        status: '보유'
    };
    
    // 서류 정보가 데이터베이스에 있으면 추가
    if (window.citizenDocuments && window.citizenDocuments[docName]) {
        const docInfo = window.citizenDocuments[docName];
        newDocument.category = docInfo.category;
        newDocument.description = docInfo.description;
        newDocument.issuer = docInfo.issuer;
    }
    
    user.documents.push(newDocument);
    
    // PDV 업데이트
    if (window.pdvManager) {
        window.pdvManager.updatePDV(user);
        
        // 현재 사용자 정보도 업데이트
        window.authManager.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    // 모달 닫기
    closeAddDocumentModal();
    
    // UI 새로고침
    loadMyPageData();
    
    alert(`"${docName}" 서류가 추가되었습니다.`);
}

// 서류 삭제 기능
function removeDocumentFromPDV(docName) {
    if (!window.authManager || !window.authManager.getCurrentUser()) {
        alert('로그인이 필요합니다.');
        return;
    }
    
    if (!confirm(`"${docName}" 서류를 삭제하시겠습니까?`)) {
        return;
    }
    
    const user = window.authManager.getCurrentUser();
    
    if (!user.documents) {
        return;
    }
    
    // 서류 제거
    user.documents = user.documents.filter(d => d.name !== docName);
    
    // PDV 업데이트
    if (window.pdvManager) {
        window.pdvManager.updatePDV(user);
        
        // 현재 사용자 정보도 업데이트
        window.authManager.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    // UI 새로고침
    loadMyPageData();
    
    alert(`"${docName}" 서류가 삭제되었습니다.`);
}

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('My Page 스크립트 로드됨');
    });
} else {
    console.log('My Page 스크립트 로드됨');
}
