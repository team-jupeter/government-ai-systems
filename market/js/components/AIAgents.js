// ============================================
// AI 에이전트 컴포넌트
// 7개 특화 AI 에이전트 시스템
// ============================================

function AIAgents() {
    return (
        <div>
            {/* AI 에이전트 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-robot"></i>
                    <h2>7개 특화 AI 에이전트</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-network-wired"></i> 완전 자율 운영 시스템
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.8', opacity: 0.95 }}>
                        인간 개입 없이 시장 기능을 자체 운영하는 7개 특화 AI 에이전트가 
                        상품 검색부터 사기 탐지까지 전 과정을 자동화합니다.
                    </p>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            운영 에이전트
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            7
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>개</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            처리 정확도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            99.2
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            응답 시간
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            50
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>ms</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            자동화율
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            100
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 에이전트 목록 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-users-cog"></i>
                    <h2>특화 AI 에이전트</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            name: '상품 검색 에이전트',
                            icon: '🔍',
                            model: 'Transformer + BERT',
                            specialty: '100개 언어 자동 번역 및 글로벌 상품 분류',
                            tasks: [
                                '다국어 자연어 검색 처리',
                                '글로벌 단일 상품 분류 체계',
                                '규격 및 단위 자동 통합',
                                '검색 정확도 97.8%'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '추천 시스템 에이전트',
                            icon: '🎯',
                            model: 'Collaborative Filtering + Deep Learning',
                            specialty: '판매자 이력 기반 개인화 추천',
                            tasks: [
                                '소비자 데이터 무수집 추천',
                                '판매 패턴 분석 및 예측',
                                '실시간 추천 업데이트',
                                '추천 정확도 94.3%'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '수요 예측 에이전트',
                            icon: '📈',
                            model: 'LSTM + Prophet',
                            specialty: '시계열 분석 기반 실시간 수요 예측',
                            tasks: [
                                '판매자 이력 기반 수요 예측',
                                '계절성 및 트렌드 자동 분석',
                                '7-30일 선행 예측',
                                '예측 정확도 89.7%'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            name: '가격 최적화 에이전트',
                            icon: '💰',
                            model: 'Reinforcement Learning',
                            specialty: '동적 가격 책정 및 최적화',
                            tasks: [
                                '실시간 수요-공급 분석',
                                '경쟁사 가격 자동 추적',
                                '수익 최적화 가격 제시',
                                '수익률 평균 12.3% 향상'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '재고 관리 에이전트',
                            icon: '📦',
                            model: 'Optimization Algorithms',
                            specialty: 'AI 기반 자동 재고 최적화',
                            tasks: [
                                '수요 예측 기반 재고 조절',
                                '자동 발주 시스템',
                                '재고 비용 최소화',
                                '재고 회전율 34% 개선'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '품질 검증 에이전트',
                            icon: '✅',
                            model: 'CNN + Vision Transformer',
                            specialty: '이미지 기반 상품 품질 자동 검증',
                            tasks: [
                                '상품 이미지 자동 검증',
                                '위조품 탐지 (정확도 98.1%)',
                                '품질 등급 자동 분류',
                                '설명 불일치 자동 탐지'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            name: '사기 탐지 에이전트',
                            icon: '🛡️',
                            model: 'Anomaly Detection + GNN',
                            specialty: '이상 거래 실시간 탐지',
                            tasks: [
                                '실시간 거래 패턴 분석',
                                '사기 거래 자동 차단',
                                '신용평가 다차원 분석 (500ms)',
                                '탐지 정확도 99.2%'
                            ],
                            color: 'var(--error-50)'
                        }
                    ].map((agent, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{agent.icon}</div>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                marginBottom: '8px',
                                color: agent.color
                            }}>
                                {agent.name}
                            </h3>
                            
                            <div style={{
                                padding: '8px 12px',
                                background: 'var(--gray-5)',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: 'var(--gray-70)',
                                marginBottom: '12px',
                                textAlign: 'center'
                            }}>
                                🤖 {agent.model}
                            </div>

                            <p style={{ 
                                fontSize: '14px', 
                                color: 'var(--gray-90)',
                                fontWeight: '600',
                                marginBottom: '12px',
                                padding: '8px',
                                background: 'var(--primary-5)',
                                borderRadius: '6px'
                            }}>
                                {agent.specialty}
                            </p>

                            <div style={{ 
                                fontSize: '13px', 
                                color: 'var(--gray-70)', 
                                lineHeight: '1.8'
                            }}>
                                {agent.tasks.map((task, tidx) => (
                                    <div key={tidx} style={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start', 
                                        gap: '8px',
                                        marginBottom: '8px'
                                    }}>
                                        <i className="fas fa-check-circle" style={{ 
                                            color: agent.color, 
                                            marginTop: '2px',
                                            fontSize: '14px'
                                        }}></i>
                                        <span>{task}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.AIAgents = AIAgents;
