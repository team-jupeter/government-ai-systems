// My Page 관리

let currentDocumentName = null; // 현재 선택된 서류

function loadMyPageData() {
    console.log('My Page 데이터 로드 시작');
    
    if (!window.authManager || !window.authManager.getCurrentUser()) {
        console.error('로그인되지 않음');
        return;
    }
    
    const user = window.authManager.getCurrentUser();
    console.log('현재 사용자:', user);
    
    // 이중 리스트박스 표시
    displayDualListBox(user);
    
    // 활동 타임라인 표시
    displayActivities(user);
}

function displayDualListBox(user) {
    const container = document.getElementById('required-docs-container');
    if (!container) {
        console.error('required-docs-container를 찾을 수 없음');
        return;
    }
    
    // 사용 가능한 모든 서류 목록
    let allDocuments = [];
    
    if (user.type === 'citizen') {
        if (window.citizenDocuments) {
            allDocuments = Object.keys(window.citizenDocuments).sort();
        }
    } else if (user.type === 'organization') {
        const orgType = user.orgData?.type || '';
        
        if (window.organizationTypes && window.organizationTypes[orgType]) {
            allDocuments = window.organizationTypes[orgType].requiredDocuments || [];
        } else {
            allDocuments = [
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
        allDocuments.sort();
    }
    
    // 사용자가 보유한 서류
    const ownedDocuments = user.documents ? user.documents.map(d => d.name) : [];
    
    // 미보유 서류 (왼쪽 박스)
    const availableDocuments = allDocuments.filter(doc => !ownedDocuments.includes(doc));
    
    container.innerHTML = `
        <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 30px;">
            <!-- 왼쪽: 미보유 서류 -->
            <div style="flex: 1;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #666;">
                    📋 미보유 서류 (${availableDocuments.length}개)
                </label>
                <select id="available-docs" 
                        multiple 
                        size="10"
                        style="
                            width: 100%;
                            padding: 8px;
                            border: 2px solid #d5d5d5;
                            border-radius: 8px;
                            font-size: 14px;
                            background: #f9f9f9;
                        ">
                    ${availableDocuments.map(doc => `<option value="${doc}">${doc}</option>`).join('')}
                </select>
            </div>
            
            <!-- 중간: 이동 버튼 -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button onclick="addSelectedDocuments()" 
                        title="선택한 서류 추가"
                        style="
                            padding: 12px 16px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 18px;
                            font-weight: bold;
                            transition: transform 0.2s;
                        "
                        onmouseover="this.style.transform='scale(1.1)'"
                        onmouseout="this.style.transform='scale(1)'">
                    →
                </button>
                
                <button onclick="removeSelectedDocuments()" 
                        title="선택한 서류 제거"
                        style="
                            padding: 12px 16px;
                            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 18px;
                            font-weight: bold;
                            transition: transform 0.2s;
                        "
                        onmouseover="this.style.transform='scale(1.1)'"
                        onmouseout="this.style.transform='scale(1)'">
                    ←
                </button>
            </div>
            
            <!-- 오른쪽: 보유 서류 -->
            <div style="flex: 1;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2e7d32;">
                    ✅ 보유 서류 (${ownedDocuments.length}개)
                </label>
                <select id="owned-docs" 
                        multiple 
                        size="10"
                        onchange="handleOwnedDocSelection()"
                        style="
                            width: 100%;
                            padding: 8px;
                            border: 2px solid #2e7d32;
                            border-radius: 8px;
                            font-size: 14px;
                            background: #e8f5e9;
                        ">
                    ${ownedDocuments.map(doc => `<option value="${doc}">${doc}</option>`).join('')}
                </select>
            </div>
        </div>
        
        <!-- 서류 액션 버튼 (보유 서류 선택 시 표시) -->
        <div id="document-actions" style="display: none; padding: 24px; background: #f8f9fa; border-radius: 8px; border: 2px solid #003d82;">
            <h3 style="margin: 0 0 16px 0; font-size: 1.1em; color: #003d82;">
                📄 <span id="selected-doc-name"></span>
            </h3>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <button onclick="handleDocumentView()" style="
                    flex: 1;
                    min-width: 100px;
                    padding: 12px 20px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.2s;
                "
                onmouseover="this.style.background='#5568d3'"
                onmouseout="this.style.background='#667eea'">
                    👁️ 열람
                </button>
                
                <button onclick="showRecipientSelector()" style="
                    flex: 1;
                    min-width: 100px;
                    padding: 12px 20px;
                    background: #0072ff;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.2s;
                "
                onmouseover="this.style.background='#0060d9'"
                onmouseout="this.style.background='#0072ff'">
                    📤 전송
                </button>
                
                <button onclick="handleDocumentRenew()" style="
                    flex: 1;
                    min-width: 100px;
                    padding: 12px 20px;
                    background: #f5576c;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.2s;
                "
                onmouseover="this.style.background='#e0495d'"
                onmouseout="this.style.background='#f5576c'">
                    🔄 갱신
                </button>
            </div>
        </div>
    `;
    
    console.log('이중 리스트박스 표시 완료');
}

// 선택한 서류를 보유 목록으로 추가
function addSelectedDocuments() {
    const availableSelect = document.getElementById('available-docs');
    const selectedOptions = Array.from(availableSelect.selectedOptions);
    
    if (selectedOptions.length === 0) {
        alert('추가할 서류를 선택해주세요.');
        return;
    }
    
    const user = window.authManager?.getCurrentUser();
    if (!user) return;
    
    if (!user.documents) {
        user.documents = [];
    }
    
    selectedOptions.forEach(option => {
        const docName = option.value;
        
        // 중복 확인
        if (!user.documents.some(d => d.name === docName)) {
            const newDocument = {
                name: docName,
                addedAt: new Date().toISOString(),
                status: '보유'
            };
            
            if (window.citizenDocuments && window.citizenDocuments[docName]) {
                const docInfo = window.citizenDocuments[docName];
                newDocument.category = docInfo.category;
                newDocument.description = docInfo.description;
                newDocument.issuer = docInfo.issuer;
            }
            
            user.documents.push(newDocument);
        }
    });
    
    // PDV 업데이트
    if (window.pdvManager) {
        window.pdvManager.updatePDV(user);
        window.authManager.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    // UI 새로고침
    loadMyPageData();
    
    alert(`${selectedOptions.length}개 서류가 추가되었습니다.`);
}

// 선택한 서류를 보유 목록에서 제거
function removeSelectedDocuments() {
    const ownedSelect = document.getElementById('owned-docs');
    const selectedOptions = Array.from(ownedSelect.selectedOptions);
    
    if (selectedOptions.length === 0) {
        alert('제거할 서류를 선택해주세요.');
        return;
    }
    
    if (!confirm(`선택한 ${selectedOptions.length}개 서류를 제거하시겠습니까?`)) {
        return;
    }
    
    const user = window.authManager?.getCurrentUser();
    if (!user || !user.documents) return;
    
    const docNamesToRemove = selectedOptions.map(opt => opt.value);
    
    user.documents = user.documents.filter(d => !docNamesToRemove.includes(d.name));
    
    // PDV 업데이트
    if (window.pdvManager) {
        window.pdvManager.updatePDV(user);
        window.authManager.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    // UI 새로고침
    loadMyPageData();
    
    alert(`${selectedOptions.length}개 서류가 제거되었습니다.`);
}

// 보유 서류 선택 시 액션 버튼 표시
function handleOwnedDocSelection() {
    const ownedSelect = document.getElementById('owned-docs');
    const actionsDiv = document.getElementById('document-actions');
    const selectedDocName = document.getElementById('selected-doc-name');
    
    if (ownedSelect.selectedOptions.length === 1) {
        currentDocumentName = ownedSelect.selectedOptions[0].value;
        selectedDocName.textContent = currentDocumentName;
        actionsDiv.style.display = 'block';
    } else {
        actionsDiv.style.display = 'none';
        currentDocumentName = null;
    }
}

function displayActivities(user) {
    const container = document.getElementById('activities-list');
    if (!container) {
        console.error('activities-list를 찾을 수 없음');
        return;
    }
    
    const activities = user.activities || [];
    
    if (activities.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">아직 활동 내역이 없습니다.</p>';
        return;
    }
    
    let html = '';
    activities.forEach((activity, index) => {
        const date = new Date(activity.timestamp).toLocaleString('ko-KR');
        html += `
            <div class="activity-item">
                <div class="activity-number">#${activity.serialNumber || index + 1}</div>
                <div class="activity-content">
                    <div style="font-weight: 600; margin-bottom: 4px;">${activity.type || '활동'}</div>
                    <div style="color: #666; font-size: 0.9em; margin-bottom: 4px;">${activity.description || ''}</div>
                    <div style="color: #999; font-size: 0.85em;">${date}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // OpenHash 생성 버튼
    const createHashBtn = document.getElementById('create-hash-btn-container');
    if (createHashBtn) {
        if (activities.length >= 5) {
            createHashBtn.innerHTML = `
                <button onclick="createOpenHashGroups()" style="
                    padding: 14px 24px;
                    background: #2e7d32;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 20px;
                    transition: background 0.2s;
                "
                onmouseover="this.style.background='#1b5e20'"
                onmouseout="this.style.background='#2e7d32'">
                    🔗 OpenHash 생성 (${activities.length}개 활동)
                </button>
            `;
        } else {
            createHashBtn.innerHTML = '';
        }
    }
    
    console.log('활동 타임라인 표시 완료');
}

// My Page 탭이 열릴 때 자동 로드
function showMyPage() {
    console.log("showMyPage 호출됨");
    switchTab("mypage");
    
    // 즉시 실행 + 지연 실행 (이중 보장)
    loadMyPageData();
    
    setTimeout(() => {
        console.log("setTimeout에서 loadMyPageData 재실행");
        loadMyPageData();
    }, 100);
    
    setTimeout(() => {
        console.log("500ms 후 loadMyPageData 재실행");
        loadMyPageData();
    }, 500);
}

// 서류 액션 함수들
function handleDocumentView() {
    if (!currentDocumentName) return;
    alert(`"${currentDocumentName}" 열람 기능은 준비 중입니다.`);
}

function handleDocumentRenew() {
    if (!currentDocumentName) return;
    alert(`"${currentDocumentName}" 갱신 기능은 준비 중입니다.`);
}

// 수신자 선택 모달
function showRecipientSelector() {
    if (!currentDocumentName) return;
    
    const modal = document.getElementById('recipient-selector-modal');
    if (modal) {
        modal.style.display = 'flex';
        loadRecipientList();
        
        const searchInput = document.getElementById('recipient-search-input');
        if (searchInput) {
            searchInput.oninput = () => filterRecipients(searchInput.value);
        }
    }
}

function closeRecipientSelectorModal() {
    const modal = document.getElementById('recipient-selector-modal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('recipient-search-input').value = '';
    }
}

function loadRecipientList() {
    const container = document.getElementById('recipient-list');
    if (!container) return;
    
    const allPDVs = window.pdvManager?.getAllPDVs() || [];
    const currentUser = window.authManager?.getCurrentUser();
    
    const recipients = allPDVs.filter(pdv => pdv.pdvId !== currentUser?.pdvId);
    
    if (recipients.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">등록된 수신자가 없습니다.</p>';
        return;
    }
    
    displayRecipients(recipients);
}

function displayRecipients(recipients) {
    const container = document.getElementById('recipient-list');
    if (!container) return;
    
    let html = '';
    
    recipients.forEach(recipient => {
        let name = '';
        let type = '';
        
        if (recipient.type === 'citizen') {
            name = recipient.personData?.name || '이름 없음';
            type = '개인';
        } else {
            name = recipient.orgData?.name || '단체명 없음';
            type = recipient.orgData?.type || '단체';
        }
        
        html += `
            <div class="recipient-item" onclick="selectRecipient('${recipient.pdvId}', '${name}')">
                <div class="recipient-name">${name}</div>
                <div class="recipient-info">
                    ${type} | ${recipient.phoneNumber || '전화번호 없음'}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function filterRecipients(searchTerm) {
    const allPDVs = window.pdvManager?.getAllPDVs() || [];
    const currentUser = window.authManager?.getCurrentUser();
    
    const recipients = allPDVs.filter(pdv => {
        if (pdv.pdvId === currentUser?.pdvId) return false;
        
        const term = searchTerm.toLowerCase();
        const name = pdv.type === 'citizen' 
            ? (pdv.personData?.name || '') 
            : (pdv.orgData?.name || '');
        const phone = pdv.phoneNumber || '';
        
        return name.toLowerCase().includes(term) || phone.includes(term);
    });
    
    displayRecipients(recipients);
}

function selectRecipient(recipientId, recipientName) {
    if (!currentDocumentName) return;
    
    if (confirm(`"${currentDocumentName}" 서류를 "${recipientName}"에게 전송하시겠습니까?`)) {
        sendDocument(recipientId, recipientName);
    }
}

function sendDocument(recipientId, recipientName) {
    const user = window.authManager?.getCurrentUser();
    if (!user) return;
    
    if (!user.activities) {
        user.activities = [];
    }
    
    const activity = {
        serialNumber: user.activities.length + 1,
        type: '서류 전송',
        description: `"${currentDocumentName}" 서류를 "${recipientName}"에게 전송`,
        timestamp: new Date().toISOString(),
        documentName: currentDocumentName,
        recipientId: recipientId,
        recipientName: recipientName
    };
    
    user.activities.push(activity);
    
    if (window.pdvManager) {
        window.pdvManager.updatePDV(user);
        window.authManager.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    closeRecipientSelectorModal();
    loadMyPageData();
    
    alert(`✅ "${currentDocumentName}" 서류가 "${recipientName}"에게 전송되었습니다.`);
    currentDocumentName = null;
}

// OpenHash 생성
async function createOpenHashGroups() {
    const user = window.authManager?.getCurrentUser();
    if (!user || !user.activities) return;
    
    const activities = user.activities;
    
    if (activities.length < 5) {
        alert('OpenHash를 생성하려면 최소 5개의 활동이 필요합니다.');
        return;
    }
    
    try {
        const groups = await window.openHashManager.createHashGroups(activities);
        
        groups.forEach(group => {
            window.openHashManager.saveHashRecord(group, user.pdvId);
        });
        
        alert(`✅ ${groups.length}개의 OpenHash 그룹이 생성되었습니다!`);
        
        if (confirm('OpenHash 탭에서 확인하시겠습니까?')) {
            if (typeof switchTab === 'function') {
                switchTab('openhash');
            }
        }
    } catch (error) {
        console.error('OpenHash 생성 오류:', error);
        alert('OpenHash 생성 중 오류가 발생했습니다.');
    }
}

// 초기화
console.log('My Page 스크립트 로드됨');
console.log('citizenDocuments 로드 확인:', typeof window.citizenDocuments);
console.log('organizationTypes 로드 확인:', typeof window.organizationTypes);
