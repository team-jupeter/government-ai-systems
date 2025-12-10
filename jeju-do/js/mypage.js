// My Page 관리 시스템

let currentFilter = 'all';
let allEvents = [];

// My Page 초기화
function initMyPage() {
    const user = window.authManager.getCurrentUser();
    
    if (!user) {
        showEmptyTimeline();
        return;
    }
    
    // 사용자 정보 표시
    displayUserInfo(user);
    
    // 타임라인 이벤트 로드
    loadTimelineEvents(user);
}

// 사용자 정보 표시
function displayUserInfo(user) {
    const avatar = document.getElementById('mypage-avatar');
    const userName = document.getElementById('mypage-user-name');
    const userType = document.getElementById('mypage-user-type');
    const userPdvId = document.getElementById('mypage-user-pdvid');
    
    if (avatar) avatar.textContent = user.name.charAt(0);
    if (userName) userName.textContent = user.name;
    if (userType) userType.textContent = user.type === 'citizen' ? '도민' : '단체';
    if (userPdvId) userPdvId.textContent = user.pdvId;
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
    
    // 1. PDV 생성 이벤트
    allEvents.push({
        id: 'pdv-created',
        type: 'created',
        title: 'PDV 생성',
        icon: '🎉',
        timestamp: pdv.createdAt,
        details: {
            'PDV ID': pdv.pdvId,
            '생성일시': formatDateTime(pdv.createdAt),
            '사용자': user.name
        }
    });
    
    // 2. 문서 생성 이벤트
    if (pdv.documents) {
        Object.values(pdv.documents).forEach(doc => {
            allEvents.push({
                id: `doc-${doc.type}`,
                type: 'created',
                title: `문서 생성: ${doc.type}`,
                icon: '📄',
                timestamp: doc.generatedAt,
                details: {
                    '문서 종류': doc.type,
                    '생성일시': formatDateTime(doc.generatedAt),
                    '발급기관': doc.issuer || '제주시장'
                }
            });
        });
    }
    
    // 3. 전송 이벤트 (송신)
    if (pdv.transferLogs && pdv.transferLogs.sent) {
        pdv.transferLogs.sent.forEach(transfer => {
            if (transfer.status === 'DELETED') return;
            
            allEvents.push({
                id: transfer.transferId,
                type: 'sent',
                title: `문서 전송: ${transfer.document.type}`,
                icon: '📤',
                timestamp: transfer.timestamp.sent,
                details: {
                    '문서': transfer.document.type,
                    '받은 곳': `${transfer.receiver.name}${transfer.receiver.department ? ` (${transfer.receiver.department})` : ''}`,
                    '전송일시': formatDateTime(transfer.timestamp.sent),
                    '목적': transfer.purpose.description,
                    '상태': getStatusText(transfer.status)
                }
            });
            
            // 수신 확인 이벤트
            if (transfer.timestamp.acknowledged) {
                allEvents.push({
                    id: `${transfer.transferId}-ack`,
                    type: 'acknowledged',
                    title: `수신 확인됨: ${transfer.document.type}`,
                    icon: '✅',
                    timestamp: transfer.timestamp.acknowledged,
                    details: {
                        '문서': transfer.document.type,
                        '확인자': transfer.receiverResponse.acknowledgedBy,
                        '확인일시': formatDateTime(transfer.timestamp.acknowledged),
                        '메모': transfer.receiverResponse.notes || '-'
                    }
                });
            }
        });
    }
    
    // 4. 전송 이벤트 (수신)
    
    // 5. AI 상담 이벤트
    if (pdv.consultations && pdv.consultations.length > 0) {
        pdv.consultations.forEach(consultation => {
            allEvents.push({
                id: consultation.consultationId,
                type: 'consultation',
                title: `AI 상담: ${consultation.department}`,
                icon: '💬',
                timestamp: consultation.timestamp,
                details: {
                    '부서': consultation.department,
                    '기관': consultation.organization,
                    '상담일시': formatDateTime(consultation.timestamp),
                    '대화 수': `${consultation.messages.length}개 메시지`,
                    '요약': consultation.summary
                }
            });
        });
    }
    if (pdv.transferLogs && pdv.transferLogs.received) {
        pdv.transferLogs.received.forEach(transfer => {
            if (transfer.status === 'DELETED') return;
            
            allEvents.push({
                id: transfer.transferId,
                type: 'received',
                title: `문서 수신: ${transfer.document.type}`,
                icon: '📥',
                timestamp: transfer.timestamp.received,
                details: {
                    '문서': transfer.document.type,
                    '보낸 곳': `${transfer.sender.name}${transfer.sender.department ? ` (${transfer.sender.department})` : ''}`,
                    '수신일시': formatDateTime(transfer.timestamp.received),
                    '목적': transfer.purpose.description,
                    '상태': getStatusText(transfer.status)
                }
            });
            
            // 열람 이벤트 (audit trail에서)
            if (transfer.auditTrail) {
                transfer.auditTrail.filter(audit => audit.action === 'VIEWED').forEach(audit => {
                    allEvents.push({
                        id: `${transfer.transferId}-view-${audit.timestamp}`,
                        type: 'viewed',
                        title: `문서 열람: ${transfer.document.type}`,
                        icon: '👁️',
                        timestamp: audit.timestamp,
                        details: {
                            '문서': transfer.document.type,
                            '열람일시': formatDateTime(audit.timestamp),
                            '열람자': audit.actor,
                            '비고': audit.details
                        }
                    });
                });
            }
        });
    }
    
    // 시간순 정렬 (최신순)
    allEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // 타임라인 렌더링
    renderTimeline();
}

// 타임라인 렌더링
function renderTimeline() {
    const timelineList = document.getElementById('timeline-list');
    
    if (!timelineList) return;
    
    const searchTerm = document.getElementById('timeline-search')?.value.toLowerCase() || '';
    
    // 필터링
    let filteredEvents = allEvents.filter(event => {
        // 타입 필터
        if (currentFilter !== 'all' && event.type !== currentFilter) {
            return false;
        }
        
        // 검색 필터
        if (searchTerm) {
            const searchableText = (
                event.title + ' ' +
                JSON.stringify(event.details)
            ).toLowerCase();
            
            if (!searchableText.includes(searchTerm)) {
                return false;
            }
        }
        
        return true;
    });
    
    if (filteredEvents.length === 0) {
        timelineList.innerHTML = `
            <div class="timeline-empty">
                <div class="timeline-empty-icon">🔍</div>
                <p>검색 결과가 없습니다.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    filteredEvents.forEach(event => {
        html += `
            <div class="timeline-item" data-event-id="${event.id}" onclick="toggleEventDetail('${event.id}')">
                <div class="timeline-item-header">
                    <div>
                        <div class="timeline-item-title">
                            <span class="timeline-item-icon">${event.icon}</span>
                            ${event.title}
                            <span class="event-badge ${event.type}">${getTypeBadge(event.type)}</span>
                        </div>
                        <div class="timeline-item-meta">
                            ${formatRelativeTime(event.timestamp)}
                        </div>
                    </div>
                    <div class="timeline-item-time">
                        ${formatDateTime(event.timestamp)}
                    </div>
                </div>
                <div class="timeline-item-body">
                    <div class="timeline-item-content">
                        ${renderEventDetails(event.details)}
                    </div>
                </div>
            </div>
        `;
    });
    
    timelineList.innerHTML = html;
}

// 이벤트 상세 토글
function toggleEventDetail(eventId) {
    const item = document.querySelector(`[data-event-id="${eventId}"]`);
    if (item) {
        item.classList.toggle('expanded');
    }
}

// 이벤트 상세 렌더링
function renderEventDetails(details) {
    let html = '';
    for (const [key, value] of Object.entries(details)) {
        html += `
            <div class="timeline-item-detail">
                <div class="timeline-item-detail-label">${key}:</div>
                <div class="timeline-item-detail-value">${value}</div>
            </div>
        `;
    }
    return html;
}

// 타입별 필터링
function filterByType(type) {
    currentFilter = type;
    
    // 버튼 활성화 상태 변경
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${type}"]`).classList.add('active');
    
    renderTimeline();
}

// 검색 필터링
function filterTimeline() {
    renderTimeline();
}

// 빈 타임라인 표시
function showEmptyTimeline() {
    const timelineList = document.getElementById('timeline-list');
    if (timelineList) {
        timelineList.innerHTML = `
            <div class="timeline-empty">
                <div class="timeline-empty-icon">📭</div>
                <p>로그인하면 PDV 활동 내역을 확인할 수 있습니다.</p>
            </div>
        `;
    }
}

// 유틸리티 함수들
function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function formatRelativeTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
}

function getStatusText(status) {
    const statusMap = {
        'PENDING': '대기중',
        'SENT': '전송됨',
        'RECEIVED': '수신됨',
        'ACKNOWLEDGED': '확인됨',
        'REJECTED': '거부됨',
        'EXPIRED': '만료됨'
    };
    return statusMap[status] || status;
}

function getTypeBadge(type) {
    const badgeMap = {
        'created': '생성',
        'sent': '송신',
        'received': '수신',
        'viewed': '열람',
        'acknowledged': '확인',
        'rejected': '거부'
        ,'consultation': '상담'
    };
    return badgeMap[type] || type;
}

// 전역 함수 노출
window.initMyPage = initMyPage;
window.toggleEventDetail = toggleEventDetail;
window.filterByType = filterByType;
window.filterTimeline = filterTimeline;
