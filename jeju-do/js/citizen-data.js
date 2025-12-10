// 도민 PDV 관리
let currentPDV = null;

// 탭 초기화
function initCitizenDataTab() {
    // 로그인 상태 확인
    const user = window.authManager?.getCurrentUser();
    
    if (user && user.type === 'citizen') {
        // 로그인된 도민 사용자 - 자동으로 PDV 로드
        const pdv = window.pdvManager.loadPDV(user.phoneNumber, user.uniqueId);
        if (pdv) {
            loadExistingPDV(pdv);
            return;
        }
    }
    
    // 로그인 안 된 경우 - 폼 초기화
    const form = document.getElementById('pdv-registration-form');
    if (!form) return;
    if (form.dataset.initialized === 'true') return;
    
    form.dataset.initialized = 'true';
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const phoneNumber = document.getElementById('phone-number').value.trim();
        const uniqueId = document.getElementById('unique-id').value.trim();
        
        if (!phoneNumber && !uniqueId) {
            alert('휴대폰 번호 또는 고유 아이디를 입력해주세요.');
            return;
        }
        
        const existingPDV = window.pdvManager.loadPDV(phoneNumber, uniqueId);
        
        if (existingPDV) {
            loadExistingPDV(existingPDV);
        } else {
            await createNewPDV(phoneNumber, uniqueId);
        }
    });
}

async function createNewPDV(phoneNumber, uniqueId) {
    const progressBox = document.getElementById('pdv-progress');
    const progressMessage = document.getElementById('progress-message');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const submitBtn = document.getElementById('pdv-submit-btn');
    
    submitBtn.disabled = true;
    progressBox.classList.add('show');
    
    const steps = [
        { message: 'PDV 생성 중...', progress: 20 },
        { message: '개인정보 암호화 중...', progress: 40 },
        { message: '문서 자동 생성 중...', progress: 60 },
        { message: '블록체인 등록 중...', progress: 80 },
        { message: '완료!', progress: 100 }
    ];
    
    for (const step of steps) {
        progressMessage.textContent = step.message;
        progressBarFill.style.width = step.progress + '%';
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    const pdvData = await window.pdvManager.createPDV(phoneNumber, uniqueId);
    currentPDV = pdvData;
    window.currentPDV = pdvData;
    
    setTimeout(() => {
        progressBox.classList.remove('show');
        document.getElementById('success-message').classList.add('show');
        
        setTimeout(() => {
            document.getElementById('success-message').classList.remove('show');
            loadExistingPDV(pdvData);
        }, 2000);
        
        submitBtn.disabled = false;
    }, 500);
}

function loadExistingPDV(pdvData) {
    currentPDV = pdvData;
    window.currentPDV = pdvData;
    
    document.getElementById('pdv-form').style.display = 'none';
    document.getElementById('pdv-progress').classList.remove('show');
    document.getElementById('success-message').classList.remove('show');
    
    displayPDV(pdvData);
}

function displayPDV(pdvData) {
    currentPDV = pdvData;
    window.currentPDV = pdvData;
    
    document.getElementById('display-name').textContent = pdvData.personData.name;
    document.getElementById('display-birth').textContent = pdvData.personData.birthDate;
    document.getElementById('display-address').textContent = pdvData.personData.address;
    document.getElementById('display-pdv-id').textContent = pdvData.pdvId;
    
    const docsList = document.getElementById('documents-list');
    docsList.innerHTML = '';
    
    Object.entries(pdvData.documents).forEach(([key, doc]) => {
        const card = document.createElement('div');
        card.className = 'pdv-document-card';
        card.innerHTML = `
            <div class="pdv-document-icon">📄</div>
            <div class="pdv-document-title">${doc.type}</div>
            <div class="pdv-document-date">${new Date(doc.generatedAt).toLocaleDateString('ko-KR')}</div>
        `;
        card.onclick = () => showDocumentDetail(doc);
        docsList.appendChild(card);
    });
    
    document.getElementById('pdv-dashboard').classList.add('show');
    
    if (window.displayTransferLogs) {
        window.displayTransferLogs(pdvData);
    }
}

function refreshCurrentPDV() {
    if (!currentPDV) return;
    
    const refreshedPDV = window.pdvManager.loadPDV(currentPDV.phoneNumber, currentPDV.uniqueId);
    if (refreshedPDV) {
        displayPDV(refreshedPDV);
    }
}

function showDocumentDetail(doc) {
    const modal = document.getElementById('document-modal');
    const title = document.getElementById('modal-doc-title');
    const body = document.getElementById('modal-doc-body');
    
    title.textContent = doc.type;
    
    let html = '<table>';
    
    function renderValue(value) {
        if (Array.isArray(value)) {
            return value.map(item => {
                if (typeof item === 'object' && item !== null) {
                    return Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ');
                }
                return item;
            }).join(' | ');
        } else if (typeof value === 'object' && value !== null) {
            return Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ');
        }
        return value;
    }
    
    for (const [key, value] of Object.entries(doc)) {
        if (key === 'type' || key === 'generatedAt' || key === 'issuer') continue;
        const displayValue = renderValue(value);
        html += `<tr><th>${key}</th><td>${displayValue}</td></tr>`;
    }
    
    html += `<tr><th>발급일</th><td>${new Date(doc.generatedAt).toLocaleString('ko-KR')}</td></tr>`;
    html += `<tr><th>발급기관</th><td>${doc.issuer}</td></tr>`;
    
    html += '</table>';
    
    html += `
        <div style="margin-top: 20px; text-align: center;">
            <button class="transfer-button" onclick="window.openTransferModal('${doc.type}', window.currentPDV)" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1em; font-weight: 600;">
                📤 이 문서 전송하기
            </button>
        </div>
    `;
    
    body.innerHTML = html;
    modal.classList.add('show');
}

function closeDocumentModal() {
    document.getElementById('document-modal').classList.remove('show');
}

window.onTransferComplete = refreshCurrentPDV;
window.initCitizenDataTab = initCitizenDataTab;
window.showDocumentDetail = showDocumentDetail;
window.closeDocumentModal = closeDocumentModal;
window.refreshCurrentPDV = refreshCurrentPDV;
