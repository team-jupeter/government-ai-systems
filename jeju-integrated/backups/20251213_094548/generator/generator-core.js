// AI 사이트 생성기 핵심 로직
window.GeneratorCore = {
    siteData: {},
    conversationHistory: [],
    
    // 초기화
    init: function() {
        this.siteData = {};
        this.conversationHistory = [];
        this.addMessage('안녕하세요! 😊<br><br>저는 정부 표준 웹사이트 생성을 도와드리는 AI입니다.<br><br>어떤 업종이신가요? (음식점, 관공서, 의료, 소매, 서비스 등)', 'ai');
    },
    
    // 메시지 추가
    addMessage: function(text, sender) {
        const container = document.getElementById('genChatMessages');
        const div = document.createElement('div');
        div.className = `gen-message ${sender}`;
        
        // JSON_DATA 제거
        let displayText = window.GeneratorJSONParser.removeJSON(text);
        
        // 줄바꿈 처리
        displayText = displayText.replace(/\n/g, '<br>');
        
        div.innerHTML = `<div class="gen-bubble ${sender}">${displayText}</div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        
        return div;
    },
    
    // Thinking 메시지
    addThinking: function() {
        const id = 'thinking-' + Date.now();
        const container = document.getElementById('genChatMessages');
        const div = document.createElement('div');
        div.className = 'gen-message ai';
        div.id = id;
        div.innerHTML = '<div class="gen-bubble thinking">🤔 생각하는 중...</div>';
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        return id;
    },
    
    // 메시지 제거
    removeMessage: function(id) {
        const element = document.getElementById(id);
        if (element) element.remove();
    },
    
    // 메시지 전송
    sendMessage: async function() {
        const input = document.getElementById('genChatInput');
        const message = input.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        this.conversationHistory.push({
            role: 'user',
            content: message
        });
        
        const thinkingId = this.addThinking();
        
        try {
            const aiMessage = await this.getAIResponse();
            this.removeMessage(thinkingId);
            
            this.addMessage(aiMessage, 'ai');
            
            this.conversationHistory.push({
                role: 'assistant',
                content: aiMessage
            });
            
            // JSON 추출 및 파싱
            const extracted = window.GeneratorJSONParser.extractAndParse(aiMessage, this.siteData);
            
            if (extracted) {
                this.showCollectedInfo();
            }
            
            // 완료 확인
            if (this.checkCompletion()) {
                setTimeout(() => this.completeSite(), 1000);
            }
            
        } catch (error) {
            console.error('AI 오류:', error);
            this.removeMessage(thinkingId);
            this.addMessage('죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.', 'ai');
        }
    },
    
    // AI 응답 가져오기
    getAIResponse: async function() {
        const response = await fetch('http://100.30.14.224:3001', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: window.GeneratorPrompts.getSystemPrompt(this.siteData)
                    },
                    ...this.conversationHistory
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });
        
        if (!response.ok) {
            throw new Error('API 호출 실패');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    },
    
    // 완료 체크
    checkCompletion: function() {
        const required = ['businessType', 'businessName', 'phone', 'email', 'address', 'industry', 'description'];
        return required.every(field => this.siteData[field]);
    },
    
    // 수집된 정보 표시
    showCollectedInfo: function() {
        const info = [];
        if (this.siteData.businessName) info.push(`상호: ${this.siteData.businessName}`);
        if (this.siteData.phone) info.push(`전화: ${this.siteData.phone}`);
        if (this.siteData.address) info.push(`주소: ${this.siteData.address}`);
        
        if (info.length > 0) {
            const existing = document.querySelector('.info-collected');
            if (existing) existing.remove();
            
            const div = document.createElement('div');
            div.className = 'info-collected';
            div.innerHTML = '<strong>📝 수집된 정보:</strong><br>' + info.join(' | ');
            
            const container = document.getElementById('genChatMessages');
            container.appendChild(div);
            container.scrollTop = container.scrollHeight;
        }
    },
    
    // 사이트 생성 완료
    completeSite: function() {
        const finalData = {
            ...this.siteData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            gallery: window.GeneratorFileUpload.uploadedFiles
        };
        
        const sites = JSON.parse(localStorage.getItem('aiSites') || '[]');
        sites.push(finalData);
        localStorage.setItem('aiSites', JSON.stringify(sites));
        
        this.addMessage(
            `🎉 완료!<br><br><strong>${this.siteData.businessName}</strong> 사이트가 생성되었습니다!<br>잠시 후 새 탭에서 프리뷰를 보여드립니다...`,
            'ai'
        );
        
        setTimeout(() => {
            const previewUrl = `/jeju-integrated/site-preview-standalone.html?siteId=${finalData.id}`;
            window.open(previewUrl, '_blank');
            
            if (window.loadSitePreview) {
                window.loadSitePreview(finalData);
                document.getElementById('previewModule').scrollIntoView({ behavior: 'smooth' });
            }
        }, 1500);
    }
};

// Enter 키 처리
window.handleGenKeypress = function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        window.GeneratorCore.sendMessage();
    }
};

// 메시지 전송 함수
window.sendGenMessage = function() {
    window.GeneratorCore.sendMessage();
};
