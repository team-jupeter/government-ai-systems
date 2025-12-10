// My Page - PDV 활동 타임라인

let allEvents = [];
let filteredEvents = [];
let currentFilter = 'all';

// My Page 초기화
function initMyPage() {
    const user = window.authManager?.getCurrentUser();
    
    if (!user) {
        showEmptyTimeline();
        return;
    }
    
    loadTimelineEvents(user);
}

// 타임라인 이벤트 로드
function loadTimelineEvents(user) {
    allEvents = [];
    
    // PDV 가져오기
    let pdv = null;
    if (user.type === 'citizen') {
        pdv = window.pdvManager.loadPDV(user.phoneNumber, user.uniqueId);
    } else {
        pdv = window.organizationManager.loadOrgPDV(user.phoneNumber, user.uniqueId, user.department);
    }
    
    if (!pdv) {
        showEmptyTimeline();
        return;
    }
    
    // PDV 생성 이벤트
    allEvents.push({
        type: 'created',
        timestamp: pdv.createdAt,
        title: 'PDV 생성',
        subject: user.name,
        content: `프라이빗 데이터 금고가 생성되었습니다.`,
        details: {
            'PDV ID': pdv.pdvId,
            '생성 시각': new Date(pdv.createdAt).toLocaleString('ko-KR')
        }
    });
    
    // 문서 전송 이벤트
    if (pdv.documents) {
        pdv.documents.forEach(doc => {
            if (doc.sentTo) {
                allEvents.push({
                    type: 'sent',
                    timestamp: doc.sentAt || pdv.createdAt,
                    title: '문서 전송',
                    subject: user.name,
                    counterparty: doc.sentTo,
                    content: `${doc.type}을(를) ${doc.sentTo}에게 전송했습니다.`,
                    details: {
                        '문서 유형': doc.type,
                        '수신자': doc.sentTo,
                        '전송 시각': new Date(doc.sentAt || pdv.createdAt).toLocaleString('ko-KR'),
                        'OpenHash': doc.openHash || 'N/A'
                    }
                });
            }
        });
    }
    
    // AI 상담 이벤트
    if (pdv.consultations) {
        pdv.consultations.forEach(consultation => {
            allEvents.push({
                type: 'consultation',
                timestamp: consultation.timestamp || new Date().toISOString(),
                title: 'AI 상담',
                subject: user.name,
                counterparty: consultation.department,
                content: consultation.summary || `${consultation.department}과 AI 상담을 진행했습니다.`,
                details: {
                    '부서': consultation.department,
                    '기관': consultation.organization,
                    '메시지 수': consultation.messages?.length || 0,
                    '상담 시각': new Date(consultation.timestamp || new Date()).toLocaleString('ko-KR')
                }
            });
        });
    }
    
    // 시간순 정렬 및 일련번호 부여
    allEvents.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    allEvents.forEach((event, index) => {
        event.serialNumber = index + 1;
    });
    
    filteredEvents = [...allEvents];
    renderTimeline();
    
    // OpenHash 그룹 생성 버튼 표시
    if (allEvents.length >= 5) {
        showOpenHashButton();
    }
}

// OpenHash 생성 버튼 표시
function showOpenHashButton() {
    const container = document.querySelector('.mypage-timeline');
    const existingBtn = document.getElementById('create-openhash-btn');
    
    if (existingBtn) return;
    
    const button = document.createElement('button');
    button.id = 'create-openhash-btn';
    button.className = 'btn-primary';
    button.style.cssText = 'margin: 20px 0; width: 100%;';
    button.textContent = `🔗 OpenHash 생성 (${allEvents.length}개 활동)`;
    button.onclick = createOpenHashGroups;
    
    container.insertBefore(button, container.firstChild);
}

// OpenHash 그룹 생성
async function createOpenHashGroups() {
    const user = window.authManager?.getCurrentUser();
    if (!user) return;
    
    const button = document.getElementById('create-openhash-btn');
    button.disabled = true;
    button.textContent = '⏳ OpenHash 생성 중...';
    
    try {
        const groups = await window.openHashManager.createHashGroups(allEvents);
        
        // 각 그룹 저장
        groups.forEach(group => {
            window.openHashManager.saveHashRecord(group, user.pdvId);
        });
        
        alert(`✅ ${groups.length}개의 OpenHash 그룹이 생성되었습니다.\n\n오픈해시 탭에서 확인하실 수 있습니다.`);
        
        button.textContent = '✓ OpenHash 생성 완료';
        
        // 오픈해시 탭으로 이동 제안
        if (confirm('오픈해시 탭으로 이동하시겠습니까?')) {
            document.querySelector('[data-tab="openhash"]')?.click();
        }
        
    } catch (error) {
        console.error('OpenHash 생성 오류:', error);
        alert('OpenHash 생성 중 오류가 발생했습니다.');
        button.disabled = false;
        button.textContent = '🔗 OpenHash 생성';
    }
}

// 타임라인 렌더링
function renderTimeline() {
    const container = document.getElementById('timeline-list');
    
    if (filteredEvents.length === 0) {
        showEmptyTimeline();
        return;
    }
    
    let html = '';
    filteredEvents.forEach(event => {
        const icon = getEventIcon(event.type);
        const badge = getEventBadge(event.type);
        
        html += `
            <div class="timeline-item" onclick="toggleTimelineItem(this)">
                <div class="timeline-item-header">
                    <div>
                        <div class="timeline-item-title">
                            <span class="timeline-item-icon">${icon}</span>
                            <span>#${event.serialNumber} - ${event.title}</span>
                            ${badge}
                        </div>
                        <div class="timeline-item-meta">${event.content}</div>
                    </div>
                    <div class="timeline-item-time">${formatTimestamp(event.timestamp)}</div>
                </div>
                <div class="timeline-item-body">
                    <div class="timeline-item-content">
                        ${renderEventDetails(event)}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// 이벤트 아이콘
function getEventIcon(type) {
    const icons = {
        'created': '🎉',
        'sent': '📤',
        'received': '📥',
        'viewed': '👁️',
        'acknowledged': '✓',
        'consultation': '💬',
        'rejected': '✗'
    };
    return icons[type] || '📌';
}

// 이벤트 뱃지
function getEventBadge(type) {
    return `<span class="event-badge ${type}">${getEventTypeText(type)}</span>`;
}

// 이벤트 타입 텍스트
function getEventTypeText(type) {
    const texts = {
        'created': '생성',
        'sent': '송신',
        'received': '수신',
        'viewed': '열람',
        'acknowledged': '확인',
        'consultation': '상담',
        'rejected': '거부'
    };
    return texts[type] || type;
}

// 이벤트 상세 정보 렌더링
function renderEventDetails(event) {
    if (!event.details) return '';
    
    let html = '';
    for (const [key, value] of Object.entries(event.details)) {
        html += `
            <div class="timeline-item-detail">
                <span class="timeline-item-detail-label">${key}:</span>
                <span class="timeline-item-detail-value">${value}</span>
            </div>
        `;
    }
    return html;
}

// 타임스탬프 포맷
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 타임라인 아이템 토글
function toggleTimelineItem(element) {
    element.classList.toggle('expanded');
}

// 타입별 필터
function filterByType(type) {
    currentFilter = type;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (type === 'all') {
        filteredEvents = [...allEvents];
    } else {
        filteredEvents = allEvents.filter(e => e.type === type);
    }
    
    renderTimeline();
}

// 검색 필터
function filterTimeline() {
    const searchTerm = document.getElementById('timeline-search')?.value.toLowerCase() || '';
    
    if (!searchTerm) {
        filteredEvents = currentFilter === 'all' 
            ? [...allEvents] 
            : allEvents.filter(e => e.type === currentFilter);
    } else {
        const baseEvents = currentFilter === 'all' 
            ? allEvents 
            : allEvents.filter(e => e.type === currentFilter);
            
        filteredEvents = baseEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.content.toLowerCase().includes(searchTerm) ||
            formatTimestamp(event.timestamp).toLowerCase().includes(searchTerm)
        );
    }
    
    renderTimeline();
}

// 빈 타임라인 표시
function showEmptyTimeline() {
    const container = document.getElementById('timeline-list');
    if (container) {
        container.innerHTML = `
            <div class="timeline-empty">
                <div class="timeline-empty-icon">📭</div>
                <p>로그인하면 PDV 활동 내역을 확인할 수 있습니다.</p>
            </div>
        `;
    }
}

// 페이지 로드 시 초기화
if (typeof window.initMyPage === 'undefined') {
    window.initMyPage = initMyPage;
}
