
let currentDept = null;
let chatMessages = [];
let isLoading = false;
let cardOrigin = null;
let generalChatMessages = [];

const tabLoadStatus = {
    overview: false,
    'citizen-data': false,
    openhash: false,
    dochung: false,
    jejusi: false,
    seogwipo: false
};

document.addEventListener('DOMContentLoaded', function() {
    loadTabContent('dochung');

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            loadTabContent(tabId);
        });
    });

    createChatModal();

    // 일반 AI 상담 플로팅 버튼
    const floatingBtn = document.getElementById('floating-help-btn');
    const generalPanel = document.getElementById('general-chat-panel');
    const generalClose = document.getElementById('general-chat-close');
    const generalInput = document.getElementById('general-chat-input');
    const generalSend = document.getElementById('general-chat-send');

    floatingBtn.addEventListener('click', () => {
        generalPanel.classList.toggle('active');
    });

    generalClose.addEventListener('click', () => {
        generalPanel.classList.remove('active');
    });

    generalSend.addEventListener('click', sendGeneralChat);
    generalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendGeneralChat();
    });
});

async function loadTabContent(tabId) {
    if (tabLoadStatus[tabId]) {
        if (tabId === 'dochung') {
            const list = document.getElementById('dochung-list');
            if (list && !list.dataset.rendered) {
                renderDochung(list);
                list.dataset.rendered = 'true';
            }
        } else if (tabId === 'jejusi') {
            const list = document.getElementById('jejusi-list');
            if (list && !list.dataset.rendered) {
                renderDeptList(list, jejusiData, '제주시청');
                list.dataset.rendered = 'true';
            }
        } else if (tabId === 'seogwipo') {
            const list = document.getElementById('seogwipo-list');
            if (list && !list.dataset.rendered) {
                renderDeptList(list, seogwipoData, '서귀포시청');
                list.dataset.rendered = 'true';
            }
        }
        return;
    }

    const container = document.getElementById(tabId);
    if (!container) return;

    container.innerHTML = '<div style="text-align: center; padding: 40px; color: #6c757d;">로딩 중...</div>';

    try {
        const response = await fetch(`tabs/${tabId}.html`);
        if (!response.ok) throw new Error('Failed to load tab content');
        
        const html = await response.text();
        container.innerHTML = html;
        tabLoadStatus[tabId] = true;

        if (tabId === 'dochung') {
            const list = document.getElementById('dochung-list');
            if (list) {
                renderDochung(list);
                list.dataset.rendered = 'true';
            }
        } else if (tabId === 'jejusi') {
            const list = document.getElementById('jejusi-list');
            if (list) {
                renderDeptList(list, jejusiData, '제주시청');
                list.dataset.rendered = 'true';
            }
        } else if (tabId === 'seogwipo') {
            const list = document.getElementById('seogwipo-list');
            if (list) {
                renderDeptList(list, seogwipoData, '서귀포시청');
                list.dataset.rendered = 'true';
            }
        }
    } catch (error) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc3545;">탭 내용을 불러오는데 실패했습니다.</div>';
        console.error('Tab load error:', error);
    }
}

function createChatModal() {
    const overlay = document.createElement('div');
    overlay.className = 'chat-modal-overlay';
    overlay.onclick = closeChatModal;
    document.body.appendChild(overlay);
    
    const modal = document.createElement('div');
    modal.className = 'chat-modal';
    modal.id = 'chatModal';
    modal.innerHTML = `
        <div class="chat-modal-header">
            <div class="chat-modal-title">
                <div class="chat-modal-icon" id="modalIcon">🏛️</div>
                <div class="chat-modal-info">
                    <div class="chat-modal-dept-name" id="modalDeptName">부서명</div>
                    <div class="chat-modal-dept-org" id="modalDeptOrg">소속기관</div>
                </div>
            </div>
            <button class="chat-modal-close" onclick="closeChatModal()">×</button>
        </div>
        <div class="chat-modal-body">
            <div class="chat-modal-messages" id="modalMessages">
                <div class="chat-modal-empty">무엇이든 물어보세요</div>
            </div>
            <div class="chat-modal-input-area">
                <input type="text" class="chat-modal-input" id="modalInput" placeholder="질문을 입력하세요..." onkeypress="handleModalKeypress(event)">
                <button class="chat-modal-send" id="modalSend" onclick="sendModalChat()">전송</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function openChatModal(dept, orgName, cardElement) {
    currentDept = { ...dept, org: orgName };
    chatMessages = [];
    isLoading = false;

    const rect = cardElement.getBoundingClientRect();
    cardOrigin = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
    };

    document.getElementById('modalIcon').textContent = dept.icon || '🏛️';
    document.getElementById('modalDeptName').textContent = dept.name;
    document.getElementById('modalDeptOrg').textContent = orgName;
    document.getElementById('modalMessages').innerHTML = '<div class="chat-modal-empty">무엇이든 물어보세요</div>';
    document.getElementById('modalInput').value = '';

    const modal = document.getElementById('chatModal');
    const overlay = document.querySelector('.chat-modal-overlay');

    modal.style.left = cardOrigin.left + 'px';
    modal.style.top = cardOrigin.top + 'px';
    modal.style.width = cardOrigin.width + 'px';
    modal.style.height = cardOrigin.height + 'px';
    modal.style.transform = 'scale(1)';

    overlay.classList.add('active');

    setTimeout(() => {
        modal.classList.add('active');
        
        const finalWidth = Math.min(700, window.innerWidth - 40);
        const finalHeight = Math.min(600, window.innerHeight - 40);
        const finalLeft = (window.innerWidth - finalWidth) / 2;
        const finalTop = (window.innerHeight - finalHeight) / 2;

        modal.style.left = finalLeft + 'px';
        modal.style.top = finalTop + 'px';
        modal.style.width = finalWidth + 'px';
        modal.style.height = finalHeight + 'px';
    }, 10);
}

function closeChatModal() {
    if (!cardOrigin) return;

    const modal = document.getElementById('chatModal');
    const overlay = document.querySelector('.chat-modal-overlay');

    modal.style.left = cardOrigin.left + 'px';
    modal.style.top = cardOrigin.top + 'px';
    modal.style.width = cardOrigin.width + 'px';
    modal.style.height = cardOrigin.height + 'px';

    setTimeout(() => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        currentDept = null;
        cardOrigin = null;
    }, 400);
}

function handleModalKeypress(e) {
    if (e.key === 'Enter') sendModalChat();
}

async function sendModalChat() {
    const input = document.getElementById('modalInput');
    const message = input.value.trim();
    if (!message || !currentDept || isLoading) return;
    
    input.value = '';
    chatMessages.push({ role: 'user', content: message });
    isLoading = true;
    
    // AI 상담 내역을 PDV에 저장
    const user = window.authManager?.getCurrentUser();
    if (user && chatMessages.length > 0) {
        const consultation = {
            department: currentDept.name,
            organization: currentDept.org,
            messages: chatMessages,
            summary: `${currentDept.name}과의 상담`
        };
        
        try {
            if (user.type === 'citizen') {
                window.pdvManager.saveConsultation(user.phoneNumber, user.uniqueId, consultation);
            } else if (user.type === 'organization') {
                window.organizationManager.saveConsultation(user.phoneNumber, user.uniqueId, user.department, consultation);
            }
            console.log('AI 상담 내역이 PDV에 저장되었습니다.');
        } catch (error) {
            console.error('상담 내역 저장 실패:', error);
        }
    }
    renderModalMessages();
    
    document.getElementById('modalSend').disabled = true;
    
    const systemPrompt = '당신은 제주특별자치도 ' + currentDept.org + ' 소속 ' + currentDept.name + '의 AI 담당자입니다. ' +
        '주요 업무는 ' + currentDept.tasks + '입니다. ' +
        '민원인의 질문에 친절하고 정확하게 한국어로 답변하세요. ' +
        '다른 부서 업무는 해당 부서로 안내하세요.';
    
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                system: systemPrompt,
                messages: chatMessages.map(m => ({ role: m.role, content: m.content }))
            })
        });
        
        const data = await response.json();
        const assistantMessage = data.content?.[0]?.text || '응답을 받지 못했습니다.';
        chatMessages.push({ role: 'assistant', content: assistantMessage });
    } catch (err) {
        chatMessages.push({ role: 'assistant', content: '연결 오류가 발생했습니다. 다시 시도해주세요.' });
    }
    
    isLoading = false;
    document.getElementById('modalSend').disabled = false;
    
    // AI 상담 내역을 PDV에 저장
    let currentUser = window.authManager?.getCurrentUser();
    if (currentUser && chatMessages.length > 0) {
        const consultation = {
            department: currentDept.name,
            organization: currentDept.org,
            messages: chatMessages,
            summary: `${currentDept.name}과의 상담`
        };
        
        try {
            if (user.type === 'citizen') {
                window.pdvManager.saveConsultation(currentUser.phoneNumber, currentUser.uniqueId, consultation);
            } else if (user.type === 'organization') {
                window.organizationManager.saveConsultation(user.phoneNumber, user.uniqueId, user.department, consultation);
            }
            console.log('AI 상담 내역이 PDV에 저장되었습니다.');
        } catch (error) {
            console.error('상담 내역 저장 실패:', error);
        }
    }
    renderModalMessages();
}

function renderModalMessages() {
    const container = document.getElementById('modalMessages');
    if (chatMessages.length === 0 && !isLoading) {
        container.innerHTML = '<div class="chat-modal-empty">무엇이든 물어보세요</div>';
        return;
    }
    
    let html = '';
    chatMessages.forEach(msg => {
        html += '<div class="chat-modal-message ' + msg.role + '">';
        html += '<div class="chat-modal-bubble">' + escapeHtml(msg.content) + '</div>';
        html += '</div>';
    });
    
    if (isLoading) {
        html += '<div class="chat-modal-message assistant">';
        html += '<div class="chat-modal-loading"><span></span><span></span><span></span></div>';
        html += '</div>';
    }
    
    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

async function sendGeneralChat() {
    const input = document.getElementById('general-chat-input');
    const container = document.getElementById('general-chat-messages');
    const message = input.value.trim();
    if (!message) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'general-chat-message user';
    userMsg.innerHTML = '<div class="general-chat-bubble">' + escapeHtml(message) + '</div>';
    container.appendChild(userMsg);
    
    input.value = '';
    container.scrollTop = container.scrollHeight;

    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'general-chat-message assistant';
    loadingMsg.innerHTML = '<div class="chat-modal-loading"><span></span><span></span><span></span></div>';
    container.appendChild(loadingMsg);
    container.scrollTop = container.scrollHeight;

    generalChatMessages.push({ role: 'user', content: message });

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                system: '당신은 제주특별자치도 AI 상담 서비스입니다. 도민의 질문에 친절하고 정확하게 한국어로 답변하세요.',
                messages: generalChatMessages
            })
        });

        const data = await response.json();
        const assistantMessage = data.content?.[0]?.text || '응답을 받지 못했습니다.';
        generalChatMessages.push({ role: 'assistant', content: assistantMessage });
        
        loadingMsg.innerHTML = '<div class="general-chat-bubble">' + assistantMessage + '</div>';
    } catch (error) {
        loadingMsg.innerHTML = '<div class="general-chat-bubble">네트워크 오류가 발생했습니다.</div>';
    }
    container.scrollTop = container.scrollHeight;
}

function renderDochung(container) {
    const categories = ['직속기관', '실', '국', '본부'];
    let html = '';
    
    categories.forEach(cat => {
        if (dochungData[cat] && dochungData[cat].length > 0) {
            html += '<div class="dept-category">';
            html += '<div class="dept-category-title">' + cat + '</div>';
            html += '<div class="dept-grid">';
            dochungData[cat].forEach(dept => { html += createDeptCard(dept, '제주특별자치도청 ' + cat); });
            html += '</div></div>';
        }
    });
    
    container.innerHTML = html;
    attachDeptCardEvents(container);
}

function renderDeptList(container, data, orgName) {
    let html = '<div class="dept-grid">';
    data.forEach(dept => { html += createDeptCard(dept, orgName); });
    html += '</div>';
    container.innerHTML = html;
    attachDeptCardEvents(container);
}

function createDeptCard(dept, orgName) {
    return '<div class="dept-card" data-dept=\'' + JSON.stringify(dept).replace(/'/g, "&#39;") + '\' data-org="' + orgName + '">' +
        '<div class="dept-card-header">' +
        '<span class="dept-card-icon">' + dept.icon + '</span>' +
        '<span class="dept-card-name">' + dept.name + '</span>' +
        '</div>' +
        '<div class="dept-card-tasks">' + dept.tasks + '</div>' +
        '</div>';
}

function attachDeptCardEvents(container) {
    container.querySelectorAll('.dept-card').forEach(card => {
        card.addEventListener('click', function() {
            const dept = JSON.parse(this.getAttribute('data-dept').replace(/&#39;/g, "'"));
            const orgName = this.getAttribute('data-org');
            openChatModal(dept, orgName, this);
        });
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Citizen Data 탭 초기화 함수를 탭 로드 시 호출
const originalLoadTabContent = loadTabContent;
loadTabContent = async function(tabId) {
    await originalLoadTabContent(tabId);
    
    // citizen-data 탭이 로드되면 초기화
    if (tabId === 'citizen-data' && typeof window.initCitizenDataTab === 'function') {
        window.initCitizenDataTab();
    }
};

// Organization 탭 초기화
const originalLoadTabContent2 = loadTabContent;
loadTabContent = async function(tabId) {
    await originalLoadTabContent2(tabId);
    
    if (tabId === 'organization' && typeof window.initOrganizationTab === 'function') {
        window.initOrganizationTab();
    }
};

// MyPage 탭 초기화
const originalLoadTabContent3 = loadTabContent;
loadTabContent = async function(tabId) {
    await originalLoadTabContent3(tabId);
    
    if (tabId === 'mypage' && typeof window.initMyPage === 'function') {
    } else if (tabId === "openhash" && typeof window.initOpenHashTab === "function") {
        window.initOpenHashTab();
        window.initMyPage();
    }
};

// My Page로 이동하는 함수
function showMyPage() {
    // 모든 탭 버튼 비활성화
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // 모든 탭 콘텐츠 비활성화
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // mypage 탭 활성화
    const mypageContent = document.getElementById('mypage');
    if (mypageContent) {
        mypageContent.classList.add('active');
        loadTabContent('mypage');
    }
}
