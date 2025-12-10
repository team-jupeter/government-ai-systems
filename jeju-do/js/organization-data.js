// Organization Data (단체 PDV) 탭 관리 스크립트

let currentOrgPDV = null;
let selectedOrgType = null;

function initOrganizationTab() {
    // 로그인 상태 확인
    const user = window.authManager?.getCurrentUser();
    
    if (user && user.type === 'organization') {
        // 로그인된 단체 사용자 - 자동으로 PDV 로드
        const pdv = window.organizationManager.loadOrgPDV(user.phoneNumber, user.uniqueId, user.department);
        if (pdv) {
            loadExistingOrgPDV(pdv);
            return;
        }
    }
    
    // 로그인 안 된 경우 - 폼 초기화
    const form = document.getElementById('org-registration-form');
    if (!form) return;
    if (form.dataset.initialized === 'true') return;
    
    form.dataset.initialized = 'true';
    
    initOrgTypeSelect();
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const phoneNumber = document.getElementById('org-phone-number').value.trim();
        const uniqueId = document.getElementById('org-unique-id').value.trim();
        const orgType = document.getElementById('org-type-value').value;
        const department = document.getElementById('org-department').value.trim();
        
        if (!phoneNumber && !uniqueId) {
            alert('대표 전화번호 또는 고유 아이디를 입력해주세요.');
            return;
        }
        if (!orgType) {
            alert('단체 종류를 선택해주세요.');
            return;
        }
        
        const existingOrgPDV = window.organizationManager.loadOrgPDV(phoneNumber, uniqueId, department);
        
        if (existingOrgPDV) {
            loadExistingOrgPDV(existingOrgPDV);
        } else {
            await createNewOrgPDV(phoneNumber, uniqueId, orgType, department);
        }
    });
    
    form.addEventListener('reset', function() {
        document.getElementById('org-type-value').value = '';
        document.getElementById('org-type-select').value = '';
        document.getElementById('org-department').value = '';
        selectedOrgType = null;
    });
    
    // 전송 완료 콜백 설정
    window.onTransferComplete = function() {
        refreshCurrentOrgPDV();
    };
}

function initOrgTypeSelect() {
    const selectInput = document.getElementById('org-type-select');
    const dropdown = document.getElementById('org-type-dropdown');

    if (!selectInput || !dropdown) return;

    renderOrgTypeDropdown('');

    selectInput.addEventListener('click', function() {
        dropdown.classList.add('show');
    });

    selectInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        renderOrgTypeDropdown(searchTerm);
        dropdown.classList.add('show');
    });

    document.addEventListener('click', function(e) {
        if (!selectInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function renderOrgTypeDropdown(searchTerm) {
    const dropdown = document.getElementById('org-type-dropdown');
    const orgTypes = window.organizationManager.organizationTypes;

    const filteredTypes = orgTypes.filter(type => 
        type.label.toLowerCase().includes(searchTerm) ||
        type.category.toLowerCase().includes(searchTerm)
    );

    const grouped = {};
    filteredTypes.forEach(type => {
        if (!grouped[type.category]) {
            grouped[type.category] = [];
        }
        grouped[type.category].push(type);
    });

    let html = '';
    for (const [category, types] of Object.entries(grouped)) {
        html += `<div class="org-select-category">${category}</div>`;
        types.forEach(type => {
            const selectedClass = selectedOrgType === type.value ? 'selected' : '';
            html += `
                <div class="org-select-option ${selectedClass}" data-value="${type.value}" data-label="${type.label}">
                    ${type.label}
                </div>
            `;
        });
    }

    dropdown.innerHTML = html;

    dropdown.querySelectorAll('.org-select-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.dataset.value;
            const label = this.dataset.label;
            
            document.getElementById('org-type-select').value = label;
            document.getElementById('org-type-value').value = value;
            selectedOrgType = value;
            
            dropdown.classList.remove('show');
        });
    });
}

async function createNewOrgPDV(phoneNumber, uniqueId, orgType, department) {
    document.getElementById('org-form').style.display = 'none';
    document.getElementById('org-progress').classList.add('show');
    document.getElementById('org-submit-btn').disabled = true;
    
    let progress = 0;
    const progressBar = document.getElementById('org-progress-bar-fill');
    
    const progressCallback = (message) => {
        document.getElementById('org-progress-message').textContent = message;
        progress += 12;
        progressBar.style.width = Math.min(progress, 100) + '%';
    };
    
    try {
        currentOrgPDV = await window.organizationManager.createOrgPDV(phoneNumber, uniqueId, orgType, department, progressCallback);
        window.currentOrgPDV = currentOrgPDV; // ✅ 전역 노출
        
        document.getElementById('org-progress').classList.remove('show');
        
        const successMsg = department 
            ? `<h4>${department} 부서 PDV가 성공적으로 생성되었습니다</h4><p>부서의 개인정보 금고가 활성화되었습니다.</p>`
            : `<h4>단체 PDV가 성공적으로 생성되었습니다</h4><p>단체의 개인정보 금고가 활성화되었습니다.</p>`;
        
        document.getElementById('org-success-message').innerHTML = successMsg;
        document.getElementById('org-success-message').classList.add('show');
        
        setTimeout(() => {
            displayOrgPDV(currentOrgPDV);
        }, 1000);
        
    } catch (error) {
        alert('단체 PDV 생성 중 오류가 발생했습니다: ' + error.message);
        document.getElementById('org-progress').classList.remove('show');
        document.getElementById('org-form').style.display = 'block';
        document.getElementById('org-submit-btn').disabled = false;
    }
}

function loadExistingOrgPDV(pdvData) {
    currentOrgPDV = pdvData;
    window.currentOrgPDV = currentOrgPDV; // ✅ 전역 노출
    
    document.getElementById('org-form').style.display = 'none';
    
    const successMsg = pdvData.department
        ? `<h4>기존 ${pdvData.department} 부서 PDV에 접속했습니다</h4><p>저장된 정보를 불러왔습니다.</p>`
        : `<h4>기존 단체 PDV에 접속했습니다</h4><p>저장된 정보를 불러왔습니다.</p>`;
    
    document.getElementById('org-success-message').innerHTML = successMsg;
    document.getElementById('org-success-message').classList.add('show');
    
    setTimeout(() => {
        displayOrgPDV(currentOrgPDV);
    }, 800);
}

function displayOrgPDV(pdvData) {
    currentOrgPDV = pdvData;
    window.currentOrgPDV = currentOrgPDV; // ✅ 전역 노출
    
    const orgTypeObj = window.organizationManager.organizationTypes.find(t => t.value === pdvData.orgType);
    const orgTypeLabel = orgTypeObj ? orgTypeObj.label : pdvData.orgType;

    document.getElementById('org-display-name').textContent = pdvData.orgData.name;
    document.getElementById('org-display-department').textContent = pdvData.department || '본사(대표)';
    document.getElementById('org-display-type').textContent = orgTypeLabel;
    document.getElementById('org-display-business-number').textContent = pdvData.orgData.businessNumber;
    document.getElementById('org-display-representative').textContent = pdvData.orgData.representative;
    document.getElementById('org-display-industry').textContent = pdvData.orgData.industry;
    document.getElementById('org-display-phone').textContent = pdvData.orgData.phone;
    document.getElementById('org-display-email').textContent = pdvData.orgData.email;
    document.getElementById('org-display-fax').textContent = pdvData.orgData.fax;
    document.getElementById('org-display-address').textContent = pdvData.orgData.address;
    
    const documentsList = document.getElementById('org-documents-list');
    documentsList.innerHTML = '';
    
    const docIcons = {
        '법인등기부등본': '📜',
        '사업자등록증': '📋',
        '재무제표': '💰',
        '정관': '📄',
        '설립허가증': '🔖',
        '사업계획서': '📊',
        '협동조합 설립신고증': '🤝',
        '조합원 명부': '👥',
        '설립근거법': '⚖️',
        '조직도': '🏢',
        '예산서': '💵',
        '사업자신고증명': '📝',
        '연락처 정보': '📞',
        '의료법인 허가증': '🏥',
        '의료기관 개설허가증': '⚕️'
    };
    
    Object.values(pdvData.documents).forEach(doc => {
        const card = document.createElement('div');
        card.className = 'org-document-card';
        card.innerHTML = `
            <div class="org-document-icon">${docIcons[doc.type] || '📄'}</div>
            <div class="org-document-title">${doc.type}</div>
            <div class="org-document-date">${doc.issueDate || doc.permitDate || doc.generatedAt.split('T')[0]}</div>
        `;
        card.onclick = () => showOrgDocumentDetail(doc);
        documentsList.appendChild(card);
    });
    
    document.getElementById('org-dashboard').classList.add('show');
    
    // 전송 내역 표시 (공통 모듈 사용)
    if (typeof window.displayTransferLogs === 'function') {
        window.displayTransferLogs(pdvData, 'org-');
    }
}

function showOrgDocumentDetail(doc) {
    document.getElementById('org-modal-doc-title').textContent = doc.type;
    
    let html = '<table>';
    
    for (const [key, value] of Object.entries(doc)) {
        if (key === 'type' || key === 'generatedAt') continue;
        
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                // ✅ 배열 안의 객체 처리 개선
                const displayValue = value.map(item => {
                    if (typeof item === 'object' && item !== null) {
                        return Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ');
                    }
                    return item;
                }).join(' | ');
                html += `<tr><th>${formatKey(key)}</th><td>${displayValue}</td></tr>`;
            } else {
                html += `<tr><th colspan="2" style="background: #e8f4f8;">${formatKey(key)}</th></tr>`;
                for (const [subKey, subValue] of Object.entries(value)) {
                    html += `<tr><th style="padding-left: 24px;">${formatKey(subKey)}</th><td>${formatValue(subValue)}</td></tr>`;
                }
            }
        } else {
            html += `<tr><th>${formatKey(key)}</th><td>${formatValue(value)}</td></tr>`;
        }
    }
    
    html += '</table>';
    
    // 전송 버튼 추가
    html += `<div style="margin-top: 20px; text-align: center;">
        <button class="transfer-button" onclick="window.openTransferModal('${doc.type}', window.currentOrgPDV)">
            📤 이 문서 전송하기
        </button>
    </div>`;
    
    document.getElementById('org-modal-doc-body').innerHTML = html;
    document.getElementById('org-document-modal').classList.add('show');
}

function formatKey(key) {
    const keyMap = {
        'corporateName': '법인명',
        'department': '부서',
        'businessNumber': '사업자번호',
        'representative': '대표자',
        'establishDate': '설립일',
        'address': '주소',
        'capital': '자본금',
        'purpose': '목적',
        'issuer': '발급기관',
        'businessType': '업종',
        'issueDate': '발급일',
        'fiscalYear': '회계연도',
        'revenue': '매출액',
        'operatingProfit': '영업이익',
        'netIncome': '순이익',
        'totalAssets': '총자산',
        'totalLiabilities': '총부채',
        'totalEquity': '총자본',
        'totalChapters': '총 장',
        'totalArticles': '총 조',
        'lastAmended': '최종개정일',
        'mainPurpose': '주요목적',
        'permitNumber': '허가번호',
        'permitDate': '허가일',
        'authority': '허가기관',
        'mainProjects': '주요사업',
        'totalBudget': '총예산',
        'coopName': '조합명',
        'reportNumber': '신고번호',
        'totalMembers': '총조합원수',
        'regularMembers': '정조합원',
        'associateMembers': '준조합원',
        'agencyName': '기관명',
        'legalBasis': '법적근거',
        'departments': '부서',
        'totalStaff': '총직원수',
        'personnelExpenses': '인건비',
        'operatingExpenses': '운영비',
        'projectExpenses': '사업비',
        'businessName': '상호',
        'taxType': '과세유형',
        'reportDate': '신고일',
        'taxOffice': '관할세무서',
        'expenses': '비용',
        'phone': '전화번호',
        'fax': '팩스',
        'email': '이메일',
        'hospitalName': '병원명',
        'medicalDepartments': '진료과목',
        'bedCount': '병상수'
    };
    return keyMap[key] || key;
}

function formatValue(value) {
    if (typeof value === 'number' && value > 1000) {
        return value.toLocaleString() + (value > 1000000 ? '원' : '');
    }
    return value;
}

function closeOrgDocumentModal() {
    document.getElementById('org-document-modal').classList.remove('show');
}

function refreshCurrentOrgPDV() {
    if (!currentOrgPDV) return;
    
    currentOrgPDV = window.organizationManager.loadOrgPDV(
        currentOrgPDV.phoneNumber, 
        currentOrgPDV.uniqueId, 
        currentOrgPDV.department
    );
    window.currentOrgPDV = currentOrgPDV; // ✅ 전역 노출
    
    if (currentOrgPDV && typeof window.displayTransferLogs === 'function') {
        window.displayTransferLogs(currentOrgPDV, 'org-');
    }
}

// 이벤트 리스너
if (document.getElementById('org-document-modal')) {
    document.getElementById('org-document-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeOrgDocumentModal();
        }
    });
}

// 전역 노출
window.closeOrgDocumentModal = closeOrgDocumentModal;
window.initOrganizationTab = initOrganizationTab;
