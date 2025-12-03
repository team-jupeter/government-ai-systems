// ============================================
// AI 에이전트 컴포넌트
// 멀티 에이전트 협업 시스템
// ============================================

function AIAgents() {
    return (
        <div>
            {/* AI 에이전트 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-users"></i>
                    <h2>AI 멀티에이전트 시스템</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-network-wired"></i> 협업형 AI 에이전트 아키텍처
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.8', opacity: 0.95' }}>
                        금융감독 업무는 복잡하고 다양하여 단일 AI로는 처리할 수 없습니다. 
                        본 시스템은 <strong>특화된 7개 AI 에이전트</strong>가 각자의 전문 영역을 담당하고, 
                        필요 시 서로 협업하여 종합적인 판단을 내립니다.
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
                            금일 처리 건수
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            847
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>만건</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            평균 응답 시간
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            0.8
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>초</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            협업 정확도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            99.3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 에이전트 목록 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-robot"></i>
                    <h2>특화 AI 에이전트</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            name: '이상거래 탐지 에이전트',
                            icon: '🔍',
                            model: 'Isolation Forest + GNN',
                            specialty: '비정상 거래 패턴 실시간 탐지',
                            tasks: [
                                '초당 10만 건의 거래 분석',
                                '자금세탁, 시세조종, 내부자거래 탐지',
                                '정확도 99.2%, 오탐률 0.3%'
                            ],
                            color: 'var(--error-50)'
                        },
                        {
                            name: '법률 준수 에이전트',
                            icon: '⚖️',
                            model: 'DeepSeek-R1 (70B)',
                            specialty: '금융법규 위반 여부 자동 판정',
                            tasks: [
                                '27개 금융 관련 법률 전문가 수준',
                                '판례 10만 건 학습',
                                '판정 정확도 98.7%, 설명 가능성 100%'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '건전성 평가 에이전트',
                            icon: '📊',
                            model: 'XGBoost + Time Series',
                            specialty: '금융기관 재무건전성 실시간 평가',
                            tasks: [
                                'BIS, NPL, LCR 등 47개 지표 자동 계산',
                                '부도 확률 예측 (정확도 96.5%)',
                                '조기 경보 발령 (평균 45일 전)'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '리스크 예측 에이전트',
                            icon: '⚠️',
                            model: 'LSTM + Monte Carlo',
                            specialty: '시스템 리스크 예측 및 시뮬레이션',
                            tasks: [
                                'VaR 실시간 계산 및 스트레스 테스트',
                                '30일 현금흐름 예측 (정확도 97.8%)',
                                '극단 시나리오 10,000회 시뮬레이션'
                            ],
                            color: 'var(--warning-50)'
                        },
                        {
                            name: '보고서 작성 에이전트',
                            icon: '📝',
                            model: 'DeepSeek-R1 (70B)',
                            specialty: '감독 보고서 자동 작성',
                            tasks: [
                                '30페이지 보고서 1.8분 만에 작성',
                                '통계 데이터를 자연어로 해석',
                                '전문적인 보고서 형식 자동 생성'
                            ],
                            color: 'var(--primary-50)'
                        },
                        {
                            name: '데이터 신뢰도 에이전트',
                            icon: '🔐',
                            model: 'Blockchain Verifier',
                            specialty: 'OpenHash 데이터 무결성 검증',
                            tasks: [
                                'Merkle Proof 자동 검증',
                                'BLS 서명 일괄 검증',
                                '위변조 시도 즉시 탐지 (5ms 이내)'
                            ],
                            color: 'var(--success-50)'
                        },
                        {
                            name: '설명 가능성 에이전트',
                            icon: '💡',
                            model: 'SHAP + LIME',
                            specialty: 'AI 판단 근거 설명',
                            tasks: [
                                '다른 에이전트의 판단 근거 분석',
                                '변수별 기여도 백분율 제시',
                                '인간이 이해 가능한 설명 생성'
                            ],
                            color: 'var(--primary-50)'
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

            {/* 협업 시나리오 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-project-diagram"></i>
                    <h2>멀티에이전트 협업 시나리오</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-sitemap"></i> 사례: 대규모 자금세탁 의심 거래 탐지
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            {
                                agent: '이상거래 탐지 에이전트',
                                action: 'A계좌 → B계좌 → C계좌로 1억 원이 30분 내 연속 이체됨을 탐지',
                                result: '자금세탁 의심 (신뢰도 87%)',
                                icon: 'fa-search-plus',
                                color: 'var(--error-50)'
                            },
                            {
                                agent: '데이터 신뢰도 에이전트',
                                action: 'OpenHash에서 3건의 이체 거래 해시 검증',
                                result: '모든 거래 무결성 확인 (위변조 없음)',
                                icon: 'fa-shield-alt',
                                color: 'var(--success-50)'
                            },
                            {
                                agent: '법률 준수 에이전트',
                                action: '자본시장법 제176조, 특정금융정보법 제4조 검토',
                                result: '자금세탁 방지법 위반 가능성 95%',
                                icon: 'fa-gavel',
                                color: 'var(--primary-50)'
                            },
                            {
                                agent: '설명 가능성 에이전트',
                                action: '왜 자금세탁 의심인지 근거 분석',
                                result: '단기간(30분) 60%, 연속이체(3단계) 30%, 금액(1억) 10%',
                                icon: 'fa-lightbulb',
                                color: 'var(--warning-50)'
                            },
                            {
                                agent: '보고서 작성 에이전트',
                                action: '종합 분석 보고서 자동 작성',
                                result: '"A→B→C 자금세탁 의심 거래 분석 보고서" 2.3분 만에 완성',
                                icon: 'fa-file-alt',
                                color: 'var(--primary-50)'
                            }
                        ].map((step, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'var(--gray-5)',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${step.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: step.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <i className={`fas ${step.icon}`} style={{ fontSize: '20px' }}></i>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: step.color, marginBottom: '6px' }}>
                                        {step.agent}
                                    </h4>
                                    <p style={{ fontSize: '13px', color: 'var(--gray-70)', marginBottom: '4px' }}>
                                        {step.action}
                                    </p>
                                    <div style={{
                                        padding: '6px 10px',
                                        background: 'white',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: step.color,
                                        display: 'inline-block'
                                    }}>
                                        ✓ {step.result}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '20px',
                        padding: '16px',
                        background: 'var(--success-50)',
                        color: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <i className="fas fa-trophy" style={{ fontSize: '24px' }}></i>
                        <div>
                            <strong style={{ fontSize: '15px' }}>최종 결과</strong>
                            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.95 }}>
                                5개 에이전트 협업으로 <strong>탐지부터 보고서 작성까지 3.2분</strong> 만에 완료.
                                담당자에게 즉시 알림 발송하여 신속한 조치 가능.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.AIAgents = AIAgents;
