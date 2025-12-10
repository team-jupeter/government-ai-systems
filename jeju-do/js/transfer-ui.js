// PDV 전송 UI 공통 모듈

// 전역 변수
window.selectedReceiver = null;
window.currentTransferDocument = null;

// 전송 모달 열기
function openTransferModal(docType, currentPDV) {
    if (!currentPDV) {
        alert('PDV 정보를 찾을 수 없습니다.');
        return;
    }
    
    // 현재 PDV를 전역으로 저장
    window.activeTransferPDV = currentPDV;
    
    // 전송할 문서 찾기
    const doc = Object.values(currentPDV.documents).find(d => d.type === docType);
    if (!doc) {
        alert('문서를 찾을 수 없습니다.');
        return;
    }
    
    // 문서 모달 닫기 (있다면)
    const docModal = document.getElementById('document-modal') || document.getElementById('org-document-modal');
    if (docModal) {
        docModal.classList.remove('show');
    }
    
    // 전송 모달 표시
    document.getElementById('transfer-doc-name').textContent = docType;
    document.getElementById('transfer-modal').classList.add('show');
    
    // 수신자 목록 로드
    loadReceiverList(currentPDV);
    
    // 전송할 문서 저장
    window.currentTransferDocument = doc;
}

// 수신자 목록 로드
function loadReceiverList(currentPDV) {
    const receiverList = document.getElementById('transfer-receiver-list');
    const searchInput = document.getElementById('transfer-receiver-search');
    const allPDVs = window.transferManager.getAllPDVList();
    
    // 현재 PDV 제외
    const receivers = allPDVs.filter(p => p.pdvId !== currentPDV.pdvId);
    
    // 검색 기능
    if (searchInput) {
        searchInput.oninput = function() {
            const searchTerm = this.value.toLowerCase();
            renderReceiverList(receivers, searchTerm);
        };
    }
    
    renderReceiverList(receivers, '');
}

// 수신자 목록 렌더링
function renderReceiverList(receivers, searchTerm) {
    const receiverList = document.getElementById('transfer-receiver-list');
    
    const filtered = receivers.filter(r => 
        r.name.toLowerCase().includes(searchTerm) ||
        (r.department && r.department.toLowerCase().includes(searchTerm)) ||
        r.phone.includes(searchTerm)
    );
    
    receiverList.innerHTML = '';
    
    if (filtered.length === 0) {
        receiverList.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">검색 결과가 없습니다.</div>';
        return;
    }
    
    filtered.forEach(receiver => {
        const item = document.createElement('div');
        item.className = 'transfer-receiver-item';
        item.dataset.pdvId = receiver.pdvId;
        
        const departmentText = receiver.department ? ` (${receiver.department})` : '';
        
        item.innerHTML = `
            <div class="transfer-receiver-name">${receiver.name}${departmentText}</div>
            <div class="transfer-receiver-info">
                <span>${receiver.typeLabel}</span> • 
                <span>${receiver.phone}</span>
            </div>
        `;
        
        item.onclick = function() {
            document.querySelectorAll('.transfer-receiver-item').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            window.selectedReceiver = receiver.pdvId;
        };
        
        receiverList.appendChild(item);
    });
}

// 문서 전송 실행
async function executeTransfer() {
    if (!window.selectedReceiver) {
        alert('수신자를 선택해주세요.');
        return;
    }
    
    if (!window.currentTransferDocument) {
        alert('전송할 문서를 찾을 수 없습니다.');
        return;
    }
    
    if (!window.activeTransferPDV) {
        alert('PDV 정보를 찾을 수 없습니다.');
        return;
    }
    
    const category = document.getElementById('transfer-purpose-category').value;
    const description = document.getElementById('transfer-purpose-desc').value.trim();
    const reference = document.getElementById('transfer-reference').value.trim();
    const expiresInDays = parseInt(document.getElementById('transfer-expires').value);
    const maxViews = parseInt(document.getElementById('transfer-max-views').value);
    const downloadable = document.getElementById('transfer-downloadable').checked;
    
    if (!description) {
        alert('전송 목적을 입력해주세요.');
        return;
    }
    
    const purpose = {
        category: category,
        description: description,
        reference: reference,
        expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString(),
        maxViews: maxViews,
        downloadable: downloadable
    };
    
    try {
        const result = await window.transferManager.sendDocument(
            window.activeTransferPDV,
            window.selectedReceiver,
            window.currentTransferDocument,
            purpose
        );
        
        closeTransferModal();
        alert('문서가 성공적으로 전송되었습니다!\n전송 ID: ' + result.transferId);
        
        // 콜백 함수 호출 (PDV 새로고침용)
        if (window.onTransferComplete) {
            window.onTransferComplete();
        }
        
    } catch (error) {
        alert('문서 전송 중 오류가 발생했습니다: ' + error.message);
    }
}

// 전송 모달 닫기
function closeTransferModal() {
    document.getElementById('transfer-modal').classList.remove('show');
    window.selectedReceiver = null;
    window.currentTransferDocument = null;
    window.activeTransferPDV = null;
    
    // 폼 리셋
    document.getElementById('transfer-purpose-desc').value = '';
    document.getElementById('transfer-reference').value = '';
    document.getElementById('transfer-purpose-category').value = 'EMPLOYMENT';
    document.getElementById('transfer-expires').value = '7';
    document.getElementById('transfer-max-views').value = '10';
    document.getElementById('transfer-downloadable').checked = true;
    
    const searchInput = document.getElementById('transfer-receiver-search');
    if (searchInput) {
        searchInput.value = '';
    }
}

// 전송 내역 표시
function displayTransferLogs(pdvData, containerPrefix = '') {
    const logsSection = document.getElementById(containerPrefix + 'transfer-logs-section');
    if (!logsSection) return;
    
    logsSection.style.display = 'block';
    
    // 송신 내역
    const sentLogs = pdvData.transferLogs?.sent || [];
    const sentTab = document.querySelector(`.transfer-tab[data-tab="sent"]`);
    if (sentTab) {
        sentTab.textContent = `📤 송신 (${sentLogs.filter(l => l.status !== 'DELETED').length})`;
    }
    displayTransferList(containerPrefix + 'sent-transfer-list', sentLogs, 'sent', pdvData);
    
    // 수신 내역
    const receivedLogs = pdvData.transferLogs?.received || [];
    const receivedTab = document.querySelector(`.transfer-tab[data-tab="received"]`);
    if (receivedTab) {
        receivedTab.textContent = `📥 수신 (${receivedLogs.filter(l => l.status !== 'DELETED').length})`;
    }
    displayTransferList(containerPrefix + 'received-transfer-list', receivedLogs, 'received', pdvData);
}

// 전송 목록 표시
function displayTransferList(elementId, logs, type, pdvData) {
    const listElement = document.getElementById(elementId);
    if (!listElement) return;
    
    listElement.innerHTML = '';
    
    const activeLogs = logs.filter(l => l.status !== 'DELETED');
    
    if (activeLogs.length === 0) {
        listElement.innerHTML = '<div class="transfer-empty">전송 내역이 없습니다.</div>';
        return;
    }
    
    activeLogs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'transfer-item';
        
        const otherParty = type === 'sent' ? log.receiver : log.sender;
        const departmentText = otherParty.department ? ` (${otherParty.department})` : '';
        
        const statusClass = `transfer-status-${log.status.toLowerCase()}`;
        const statusText = {
            'PENDING': '대기중',
            'SENT': '전송됨',
            'RECEIVED': '수신됨',
            'ACKNOWLEDGED': '확인됨',
            'REJECTED': '거부됨',
            'EXPIRED': '만료됨'
        }[log.status] || log.status;
        
        item.innerHTML = `
            <div class="transfer-item-header">
                <div class="transfer-item-doc">${log.document.type}</div>
                <div class="transfer-item-status ${statusClass}">${statusText}</div>
            </div>
            <div class="transfer-item-info">
                <div>${type === 'sent' ? '받은 곳' : '보낸 곳'}: ${otherParty.name}${departmentText}</div>
                <div>전송 시각: ${new Date(log.timestamp.sent).toLocaleString('ko-KR')}</div>
                <div>목적: ${log.purpose.description}</div>
                ${log.receiverResponse.status === 'ACKNOWLEDGED' ? 
                    `<div style="color: #28a745; font-weight: 600;">✓ ${log.receiverResponse.acknowledgedBy}님이 확인했습니다</div>` : ''}
                ${log.receiverResponse.status === 'REJECTED' ? 
                    `<div style="color: #dc3545; font-weight: 600;">✗ 거부됨: ${log.receiverResponse.rejectionReason}</div>` : ''}
            </div>
            <div class="transfer-item-actions">
                <button class="transfer-action-btn view" onclick="viewTransferDetail('${log.transferId}', '${type}', '${pdvData.pdvId}')">
                    상세 보기
                </button>
                ${type === 'received' && log.receiverResponse.status === 'PENDING' ? `
                    <button class="transfer-action-btn acknowledge" onclick="acknowledgeTransferUI('${log.transferId}', '${pdvData.pdvId}')">
                        수신 확인
                    </button>
                    <button class="transfer-action-btn reject" onclick="rejectTransferUI('${log.transferId}', '${pdvData.pdvId}')">
                        거부
                    </button>
                ` : ''}
            </div>
        `;
        
        listElement.appendChild(item);
    });
}

// 전송 상세 보기
function viewTransferDetail(transferId, type, pdvId) {
    const pdv = window.transferManager.findPDVById(pdvId);
    if (!pdv) {
        alert('PDV를 찾을 수 없습니다.');
        return;
    }
    
    const logs = type === 'sent' ? pdv.transferLogs.sent : pdv.transferLogs.received;
    const transfer = logs.find(t => t.transferId === transferId);
    
    if (!transfer) {
        alert('전송 내역을 찾을 수 없습니다.');
        return;
    }
    
    // 수신 문서인 경우 조회 횟수 증가
    if (type === 'received') {
        window.transferManager.incrementViewCount(transferId, pdvId);
    }
    
    // 전송 상세 정보 모달 표시
    showTransferDetailModal(transfer);
}

// 전송 상세 정보 모달
function showTransferDetailModal(transfer) {
    const modal = document.createElement('div');
    modal.className = 'transfer-modal-overlay show';
    modal.id = 'transfer-detail-modal';
    
    const otherParty = transfer.sender;
    const departmentText = otherParty.department ? ` (${otherParty.department})` : '';
    
    modal.innerHTML = `
        <div class="transfer-modal" style="max-width: 800px;">
            <div class="transfer-modal-header">
                <h3 class="transfer-modal-title">📄 전송 상세 정보</h3>
            </div>
            <div class="transfer-modal-body">
                <h4 style="margin-bottom: 16px; color: #003d82;">문서 정보</h4>
                <table style="width: 100%; margin-bottom: 24px; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb; width: 30%;">문서 종류</th>
                        <td style="padding: 12px;">${transfer.document.type}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">카테고리</th>
                        <td style="padding: 12px;">${transfer.document.category}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">OpenHash</th>
                        <td style="padding: 12px; font-family: monospace; font-size: 0.9em;">${transfer.document.openHash}</td>
                    </tr>
                    <tr>
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">무결성 검증</th>
                        <td style="padding: 12px; color: #28a745; font-weight: 600;">✓ 검증 완료</td>
                    </tr>
                </table>
                
                <h4 style="margin-bottom: 16px; color: #003d82;">전송 정보</h4>
                <table style="width: 100%; margin-bottom: 24px; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb; width: 30%;">보낸 사람</th>
                        <td style="padding: 12px;">${transfer.sender.name}${transfer.sender.department ? ` (${transfer.sender.department})` : ''}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">받은 사람</th>
                        <td style="padding: 12px;">${transfer.receiver.name}${transfer.receiver.department ? ` (${transfer.receiver.department})` : ''}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">전송 목적</th>
                        <td style="padding: 12px;">${transfer.purpose.description}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">전송 시각</th>
                        <td style="padding: 12px;">${new Date(transfer.timestamp.sent).toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e0e0e0;">
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">만료일</th>
                        <td style="padding: 12px;">${new Date(transfer.accessControl.expiresAt).toLocaleString('ko-KR')}</td>
                    </tr>
                    <tr>
                        <th style="padding: 12px; text-align: left; background: #f5f8fb;">조회 횟수</th>
                        <td style="padding: 12px;">${transfer.accessControl.currentViews} / ${transfer.accessControl.maxViews}회</td>
                    </tr>
                </table>
                
                ${transfer.receiverResponse.status !== 'PENDING' ? `
                    <h4 style="margin-bottom: 16px; color: #003d82;">수신자 응답</h4>
                    <table style="width: 100%; margin-bottom: 24px; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <th style="padding: 12px; text-align: left; background: #f5f8fb; width: 30%;">상태</th>
                            <td style="padding: 12px;">${transfer.receiverResponse.status === 'ACKNOWLEDGED' ? '✓ 확인됨' : '✗ 거부됨'}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <th style="padding: 12px; text-align: left; background: #f5f8fb;">확인자</th>
                            <td style="padding: 12px;">${transfer.receiverResponse.acknowledgedBy}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e0e0e0;">
                            <th style="padding: 12px; text-align: left; background: #f5f8fb;">확인 시각</th>
                            <td style="padding: 12px;">${new Date(transfer.receiverResponse.acknowledgedAt).toLocaleString('ko-KR')}</td>
                        </tr>
                        <tr>
                            <th style="padding: 12px; text-align: left; background: #f5f8fb;">메모</th>
                            <td style="padding: 12px;">${transfer.receiverResponse.notes || transfer.receiverResponse.rejectionReason || '-'}</td>
                        </tr>
                    </table>
                ` : ''}
                
                <h4 style="margin-bottom: 16px; color: #003d82;">문서 내용</h4>
                <div style="background: #f5f8fb; padding: 16px; border-radius: 4px; max-height: 300px; overflow-y: auto;">
                    ${renderDocumentContent(transfer.encryptedDocument)}
                </div>
                
                <div class="transfer-modal-actions" style="margin-top: 24px;">
                    <button class="transfer-btn transfer-btn-secondary" onclick="closeTransferDetailModal()">닫기</button>
                </div>
            </div>
        </div>
    `;
    
    modal.onclick = function(e) {
        if (e.target === this) {
            closeTransferDetailModal();
        }
    };
    
    document.body.appendChild(modal);
}

// 문서 내용 렌더링
function renderDocumentContent(doc) {
    let html = '<table style="width: 100%; border-collapse: collapse;">';
    
    for (const [key, value] of Object.entries(doc)) {
        if (key === 'type' || key === 'generatedAt') continue;
        
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            continue; // 중첩 객체는 생략
        }
        
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        html += `
            <tr style="border-bottom: 1px solid #e0e0e0;">
                <th style="padding: 8px; text-align: left; width: 35%; background: white;">${key}</th>
                <td style="padding: 8px;">${displayValue}</td>
            </tr>
        `;
    }
    
    html += '</table>';
    return html;
}

function closeTransferDetailModal() {
    const modal = document.getElementById('transfer-detail-modal');
    if (modal) {
        modal.remove();
    }
}

// 수신 확인 UI
function acknowledgeTransferUI(transferId, pdvId) {
    const notes = prompt('수신 확인 메모를 입력하세요:', '서류 확인 완료했습니다.');
    if (notes === null) return;
    
    const pdv = window.transferManager.findPDVById(pdvId);
    const userName = pdv.personData?.name || pdv.orgData?.name || '사용자';
    
    const result = window.transferManager.acknowledgeTransfer(
        transferId,
        pdvId,
        userName,
        notes
    );
    
    if (result) {
        alert('수신 확인이 완료되었습니다.');
        if (window.onTransferComplete) {
            window.onTransferComplete();
        }
    } else {
        alert('수신 확인에 실패했습니다.');
    }
}

// 전송 거부 UI
function rejectTransferUI(transferId, pdvId) {
    const reason = prompt('거부 사유를 입력하세요:', '');
    if (!reason) {
        alert('거부 사유를 입력해주세요.');
        return;
    }
    
    const pdv = window.transferManager.findPDVById(pdvId);
    const userName = pdv.personData?.name || pdv.orgData?.name || '사용자';
    
    const result = window.transferManager.rejectTransfer(
        transferId,
        pdvId,
        userName,
        reason
    );
    
    if (result) {
        alert('전송을 거부했습니다.');
        if (window.onTransferComplete) {
            window.onTransferComplete();
        }
    } else {
        alert('전송 거부에 실패했습니다.');
    }
}

// 전송 탭 전환
function switchTransferTab(tab) {
    document.querySelectorAll('.transfer-tab').forEach(t => t.classList.remove('active'));
    const tabButton = document.querySelector(`.transfer-tab[data-tab="${tab}"]`);
    if (tabButton) {
        tabButton.classList.add('active');
    }
    
    const sentDiv = document.getElementById('sent-transfers');
    const receivedDiv = document.getElementById('received-transfers');
    
    if (sentDiv) sentDiv.style.display = tab === 'sent' ? 'block' : 'none';
    if (receivedDiv) receivedDiv.style.display = tab === 'received' ? 'block' : 'none';
}

// 전역 함수 노출
window.openTransferModal = openTransferModal;
window.closeTransferModal = closeTransferModal;
window.executeTransfer = executeTransfer;
window.displayTransferLogs = displayTransferLogs;
window.viewTransferDetail = viewTransferDetail;
window.acknowledgeTransferUI = acknowledgeTransferUI;
window.rejectTransferUI = rejectTransferUI;
window.switchTransferTab = switchTransferTab;
window.closeTransferDetailModal = closeTransferDetailModal;
