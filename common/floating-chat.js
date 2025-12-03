(function() {
    'use strict';
    
    // 페이지 정보 자동 감지
    function getPageInfo() {
        const title = document.title || '정부 기관';
        const url = window.location.pathname;
        const metaDescription = document.querySelector('meta[name="description"]');
        const h1 = document.querySelector('h1');
        
        let pageContext = {
            title: title,
            url: url,
            department: h1 ? h1.innerText : title,
            description: metaDescription ? metaDescription.content : ''
        };
        
        // URL 기반 기관 식별
        if (url.includes('presidential-office')) {
            pageContext.type = '대통령실';
            pageContext.agency = '대통령실';
        } else if (url.includes('government.html')) {
            pageContext.type = '행정부';
            pageContext.agency = '행정부';
        } else if (url.includes('education')) {
            pageContext.type = '교육부';
            pageContext.agency = '교육부';
        } else if (url.includes('healthcare')) {
            pageContext.type = '보건복지부';
            pageContext.agency = '보건복지부';
        } else {
            pageContext.type = '정부 기관';
            pageContext.agency = '정부';
        }
        
        return pageContext;
    }
    
    // Floating Button HTML 삽입
    function injectFloatingButton() {
        const pageInfo = getPageInfo();
        
        const html = `
            <button class="gov-floating-button" id="govFloatingBtn" onclick="window.GovChat.toggle()">
                <i class="fas fa-question"></i>
            </button>
            
            <div class="gov-floating-menu" id="govFloatingMenu">
                <div class="gov-menu-header">
                    <h3>💡 ${pageInfo.department}</h3>
                    <button class="gov-close-btn" onclick="window.GovChat.toggle()">×</button>
                </div>
                <div class="gov-menu-content">
                    <div class="gov-page-info">
                        <h4>📍 현재 위치</h4>
                        <p><strong>${pageInfo.type}</strong> &gt; ${pageInfo.department}</p>
                    </div>
                    
                    <div class="gov-features">
                        <p style="margin-bottom: 0.75rem;"><strong>🔐 OpenHash 기반 시스템</strong></p>
                        <p style="margin: 0;">• AI 자동화 업무 처리<br>
                        • 국가데이터처 실시간 연동<br>
                        • 98.5% 에너지 절감<br>
                        • 최고 수준 보안 (10⁻¹⁷⁵ᴹ)</p>
                        <p style="margin-top: 0.75rem;">
                            <a href="http://100.30.14.224/openhash.html" target="_blank" 
                               style="color: #0046FF; text-decoration: none; font-weight: 600; border-bottom: 2px solid #0046FF; padding-bottom: 2px;">
                               📘 오픈해시란?
                            </a>
                        </p>
                    </div>
                    
                    <div class="gov-ai-chat">
                        <div class="gov-chat-header">🤖 AI 업무 지원</div>
                        <div class="gov-chat-messages" id="govChatMessages">
                            <div class="gov-chat-message assistant">
                                안녕하세요! ${pageInfo.department}의 AI 업무 지원 시스템입니다.<br><br>
                                <strong>제공 서비스:</strong><br>
                                • 문서 작성 및 편집<br>
                                • 정보 검색 및 분석<br>
                                • 데이터 요약 및 보고서 생성<br>
                                • 정책 관련 질의응답<br><br>
                                무엇을 도와드릴까요?
                            </div>
                        </div>
                        <div class="gov-chat-input-box">
                            <input type="text" id="govChatInput" placeholder="예: '누구세요?', '보고서 작성해줘'" 
                                onkeypress="if(event.key==='Enter') window.GovChat.sendMessage()">
                            <button id="govSendBtn" onclick="window.GovChat.sendMessage()">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div style="background: #fff9e6; border-left: 4px solid #fbbf24; padding: 1rem; margin-top: 1.5rem; border-radius: 8px;">
                        <p style="font-size: 0.9rem; color: #78350f; line-height: 1.7; margin: 0;">
                            <strong style="display: block; margin-bottom: 0.5rem;">🔐 OpenHash 3-Layer 기록:</strong>
                            Layer 1: 공무원 → 부서<br>
                            Layer 2: 부서 → 기관<br>
                            Layer 3: 기관 → 국가데이터처<br><br>
                            <span style="font-size: 0.85rem;">모든 대화와 문서는 위변조 불가능하게 기록됩니다.</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
    }
    
    // 전역 GovChat 객체
    window.GovChat = {
        pageInfo: getPageInfo(),
        conversationHistory: [],
        
        toggle: function() {
            const menu = document.getElementById('govFloatingMenu');
            menu.classList.toggle('show');
        },
        
        sendMessage: async function() {
            const input = document.getElementById('govChatInput');
            const sendBtn = document.getElementById('govSendBtn');
            const message = input.value.trim();
            if (!message) return;
            
            const messagesDiv = document.getElementById('govChatMessages');
            
            // 사용자 메시지 표시
            messagesDiv.innerHTML += `<div class="gov-chat-message user">${this.escapeHtml(message)}</div>`;
            this.conversationHistory.push({ role: 'user', content: message });
            input.value = '';
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            sendBtn.disabled = true;
            
            // 로딩 표시
            const loadingId = 'loading-' + Date.now();
            messagesDiv.innerHTML += `<div id="${loadingId}" class="gov-chat-message assistant"><em>답변 생성 중...</em></div>`;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            
            try {
                // 백엔드 API 호출
                const response = await fetch('http://100.30.14.224:3000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: message,
                        department: this.pageInfo.department,
                        pageUrl: window.location.href,
                        userInfo: {
                            name: '공무원',
                            position: '담당관',
                            rank: '5급'
                        }
                    })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    this.conversationHistory.push({ role: 'assistant', content: data.reply });
                    
                    // 로딩 제거 및 응답 표시
                    document.getElementById(loadingId).remove();
                    messagesDiv.innerHTML += `<div class="gov-chat-message assistant">${this.escapeHtml(data.reply).replace(/\n/g, '<br>')}</div>`;
                    
                    // OpenHash 기록 표시
                    messagesDiv.innerHTML += `
                        <div style="background: #f0fdf4; padding: 0.6rem; border-radius: 6px; margin-bottom: 0.75rem; font-size: 0.8rem; color: #166534; line-height: 1.5;">
                            ✓ OpenHash 기록 | Hash: ${data.hash.substring(0, 16)}... | ${new Date(data.timestamp).toLocaleString('ko-KR')}
                        </div>
                    `;
                    
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                } else {
                    throw new Error(data.error || '응답 실패');
                }
                
            } catch (error) {
                console.error('Chat error:', error);
                document.getElementById(loadingId).remove();
                messagesDiv.innerHTML += `<div class="gov-chat-message assistant" style="background: #fee2e2; border-color: #dc2626;">오류: ${error.message}<br><br>API 서버가 실행 중인지 확인하세요.</div>`;
            } finally {
                sendBtn.disabled = false;
            }
        },
        
        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    };
    
    // DOM 로드 완료 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectFloatingButton);
    } else {
        injectFloatingButton();
    }
})();
