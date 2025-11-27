// 식약처 AI 에이전트 시뮬레이션 엔진
class AgentSimulation {
    constructor() {
        this.currentAgent = null;
        this.isRunning = false;
        this.currentStep = 0;
        this.modal = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
        <div id="simulationModal" class="sim-modal">
            <div class="sim-modal-content">
                <div class="sim-modal-header">
                    <div class="sim-agent-info">
                        <span class="sim-agent-icon" id="simAgentIcon"></span>
                        <div>
                            <h2 id="simAgentName"></h2>
                            <p id="simAgentDesc"></p>
                        </div>
                    </div>
                    <button class="sim-close-btn" onclick="simulation.close()">&times;</button>
                </div>
                
                <div class="sim-modal-body">
                    <div class="sim-status" id="simStatus">
                        <div class="sim-status-icon">🚀</div>
                        <div class="sim-status-text">시뮬레이션 준비 중...</div>
                    </div>
                    
                    <div class="sim-progress-container">
                        <div class="sim-progress-bar">
                            <div class="sim-progress-fill" id="simProgressFill"></div>
                        </div>
                        <div class="sim-progress-text">
                            <span id="simProgressPercent">0%</span>
                            <span id="simProgressStep">단계 0/0</span>
                        </div>
                    </div>
                    
                    <div class="sim-current-task" id="simCurrentTask">
                        <div class="sim-task-message" id="simTaskMessage">대기 중...</div>
                        <div class="sim-task-detail" id="simTaskDetail"></div>
                    </div>
                    
                    <div class="sim-log" id="simLog">
                        <div class="sim-log-title">📋 처리 로그</div>
                        <div class="sim-log-content" id="simLogContent"></div>
                    </div>
                    
                    <div class="sim-result" id="simResult" style="display: none;">
                        <div class="sim-result-header">
                            <span class="sim-result-icon">✅</span>
                            <h3 id="simResultTitle">처리 완료</h3>
                        </div>
                        <div class="sim-result-items" id="simResultItems"></div>
                        <div class="sim-result-hash">
                            <div class="sim-hash-label">OpenHash 기록</div>
                            <div class="sim-hash-value" id="simHashValue"></div>
                        </div>
                    </div>
                </div>
                
                <div class="sim-modal-footer">
                    <button class="sim-btn sim-btn-secondary" onclick="simulation.close()">닫기</button>
                    <button class="sim-btn sim-btn-primary" id="simStartBtn" onclick="simulation.start()">
                        <span>▶</span> 시뮬레이션 시작
                    </button>
                </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('simulationModal');
    }

    bindEvents() {
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
        
        // 모달 외부 클릭으로 닫기
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open(agentId) {
        if (!AGENTS_DATA[agentId]) {
            console.error('Agent not found:', agentId);
            return;
        }
        
        this.currentAgent = AGENTS_DATA[agentId];
        this.currentStep = 0;
        this.isRunning = false;
        
        // UI 초기화
        document.getElementById('simAgentIcon').textContent = this.currentAgent.icon;
        document.getElementById('simAgentName').textContent = this.currentAgent.name;
        document.getElementById('simAgentDesc').textContent = this.currentAgent.description;
        document.getElementById('simProgressFill').style.width = '0%';
        document.getElementById('simProgressPercent').textContent = '0%';
        document.getElementById('simProgressStep').textContent = `단계 0/${this.currentAgent.steps.length}`;
        document.getElementById('simTaskMessage').textContent = '시작 버튼을 눌러주세요';
        document.getElementById('simTaskDetail').textContent = '';
        document.getElementById('simLogContent').innerHTML = '';
        document.getElementById('simResult').style.display = 'none';
        document.getElementById('simStartBtn').disabled = false;
        document.getElementById('simStartBtn').innerHTML = '<span>▶</span> 시뮬레이션 시작';
        
        document.getElementById('simStatus').innerHTML = `
            <div class="sim-status-icon">🚀</div>
            <div class="sim-status-text">시뮬레이션 준비 완료</div>
        `;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isRunning = false;
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    async start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.currentStep = 0;
        
        const startBtn = document.getElementById('simStartBtn');
        startBtn.disabled = true;
        startBtn.innerHTML = '<span class="sim-spinner"></span> 처리 중...';
        
        document.getElementById('simStatus').innerHTML = `
            <div class="sim-status-icon sim-pulse">⚡</div>
            <div class="sim-status-text">AI 에이전트 처리 중...</div>
        `;
        
        document.getElementById('simResult').style.display = 'none';
        document.getElementById('simLogContent').innerHTML = '';
        
        this.addLog('🚀 시뮬레이션 시작', 'info');
        this.addLog(`📋 ${this.currentAgent.name} 에이전트 활성화`, 'info');
        
        for (let i = 0; i < this.currentAgent.steps.length; i++) {
            if (!this.isRunning) break;
            
            const step = this.currentAgent.steps[i];
            this.currentStep = i + 1;
            
            await this.processStep(step, i);
        }
        
        if (this.isRunning) {
            this.showResult();
        }
    }

    async processStep(step, index) {
        return new Promise((resolve) => {
            // 진행률 업데이트
            document.getElementById('simProgressFill').style.width = `${step.progress}%`;
            document.getElementById('simProgressPercent').textContent = `${step.progress}%`;
            document.getElementById('simProgressStep').textContent = 
                `단계 ${index + 1}/${this.currentAgent.steps.length}`;
            
            // 현재 작업 표시
            document.getElementById('simTaskMessage').textContent = step.message;
            document.getElementById('simTaskDetail').textContent = step.detail;
            
            // 로그 추가
            this.addLog(step.message, 'process');
            
            // 랜덤 딜레이 (실제 처리 시뮬레이션)
            const delay = 400 + Math.random() * 600;
            setTimeout(resolve, delay);
        });
    }

    addLog(message, type = 'info') {
        const logContent = document.getElementById('simLogContent');
        const timestamp = new Date().toLocaleTimeString('ko-KR');
        
        const logItem = document.createElement('div');
        logItem.className = `sim-log-item sim-log-${type}`;
        logItem.innerHTML = `
            <span class="sim-log-time">[${timestamp}]</span>
            <span class="sim-log-message">${message}</span>
        `;
        
        logContent.appendChild(logItem);
        logContent.scrollTop = logContent.scrollHeight;
    }

    showResult() {
        const result = this.currentAgent.result;
        
        document.getElementById('simStatus').innerHTML = `
            <div class="sim-status-icon">✅</div>
            <div class="sim-status-text">처리 완료</div>
        `;
        
        document.getElementById('simResultTitle').textContent = result.title;
        
        const itemsHTML = result.items.map(item => 
            `<div class="sim-result-item">✓ ${item}</div>`
        ).join('');
        document.getElementById('simResultItems').innerHTML = itemsHTML;
        
        // 가상 해시 생성
        const hash = this.generateHash();
        document.getElementById('simHashValue').textContent = hash;
        
        document.getElementById('simResult').style.display = 'block';
        
        const startBtn = document.getElementById('simStartBtn');
        startBtn.disabled = false;
        startBtn.innerHTML = '<span>🔄</span> 다시 실행';
        
        this.addLog('✅ 모든 처리 단계 완료', 'success');
        this.addLog(`🔗 OpenHash 기록 완료: ${hash.substring(0, 16)}...`, 'success');
    }

    generateHash() {
        const chars = '0123456789abcdef';
        let hash = '0x';
        for (let i = 0; i < 64; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    }
}

// 전역 인스턴스 생성
let simulation;
document.addEventListener('DOMContentLoaded', () => {
    simulation = new AgentSimulation();
});

// 에이전트 선택 함수
function selectAgent(agentId) {
    if (simulation) {
        simulation.open(agentId);
    }
}
