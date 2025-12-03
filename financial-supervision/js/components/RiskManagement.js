// ============================================
// 리스크 관리 컴포넌트
// 시스템 리스크 조기 경보
// ============================================

function RiskManagement() {
    return (
        <div>
            {/* 리스크 현황 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-exclamation-triangle"></i>
                    <h2>금융 시스템 리스크 현황</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            종합 리스크 지수
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            안정
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            43 / 100
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            신용 리스크
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            주의
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            58 / 100
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            시장 리스크
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            안정
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            35 / 100
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            유동성 리스크
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            안정
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            28 / 100
                        </div>
                    </div>
                </div>
            </div>

            {/* 리스크 유형별 관리 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-shield-alt"></i>
                    <h2>리스크 유형별 관리</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            type: '신용 리스크',
                            icon: '💳',
                            color: 'var(--warning-50)',
                            description: '대출자의 채무 불이행 가능성',
                            methods: [
                                { name: '신용등급 모델', desc: 'ML 기반 부도 확률 예측 (정확도 96.5%)' },
                                { name: '포트폴리오 분석', desc: '업종/지역별 신용 집중도 모니터링' },
                                { name: '조기 경보', desc: '연체 징후 사전 탐지 (평균 45일 전)' }
                            ]
                        },
                        {
                            type: '시장 리스크',
                            icon: '📊',
                            color: 'var(--primary-50)',
                            description: '금리, 환율, 주가 변동으로 인한 손실',
                            methods: [
                                { name: 'VaR 계산', desc: '99% 신뢰수준 최대 손실액 실시간 산출' },
                                { name: '스트레스 테스트', desc: '극단 시나리오에서 손실 시뮬레이션' },
                                { name: '민감도 분석', desc: '금리 1% 변동 시 영향 자동 계산' }
                            ]
                        },
                        {
                            type: '유동성 리스크',
                            icon: '💧',
                            color: 'var(--success-50)',
                            description: '자금 조달 어려움 및 자산 매각 손실',
                            methods: [
                                { name: '현금흐름 예측', desc: 'LSTM으로 향후 30일 현금흐름 예측' },
                                { name: 'LCR/NSFR', desc: '유동성 커버리지 비율 실시간 계산' },
                                { name: '자금 갭 분석', desc: '만기별 자산/부채 갭 모니터링' }
                            ]
                        },
                        {
                            type: '운영 리스크',
                            icon: '⚙️',
                            color: 'var(--error-50)',
                            description: '시스템 장애, 사기, 법규 위반',
                            methods: [
                                { name: '시스템 모니터링', desc: '실시간 장애 탐지 및 자동 복구' },
                                { name: '사기 탐지', desc: 'AI 기반 이상 거래 패턴 인식' },
                                { name: '컴플라이언스', desc: 'LLM 기반 법규 준수 자동 검증' }
                            ]
                        }
                    ].map((risk, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{risk.icon}</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: risk.color }}>
                                {risk.type}
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '16px', lineHeight: '1.5' }}>
                                {risk.description}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {risk.methods.map((method, midx) => (
                                    <div key={midx} style={{
                                        padding: '12px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${risk.color}`
                                    }}>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '4px' }}>
                                            {method.name}
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--gray-70)', lineHeight: '1.4' }}>
                                            {method.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 조기 경보 시스템 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-bell"></i>
                    <h2>AI 기반 조기 경보 시스템</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #FFF5F0 0%, #FFE6E0 100%)',
                    borderRadius: '12px',
                    border: '2px solid var(--warning-50)'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--warning-50)', marginBottom: '20px' }}>
                        <i className="fas fa-chart-line"></i> 다단계 경보 시스템
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            {
                                level: 'Level 1: 정상',
                                color: 'var(--success-50)',
                                criteria: '모든 지표가 정상 범위 (리스크 지수 < 40)',
                                action: '일일 정기 모니터링 지속'
                            },
                            {
                                level: 'Level 2: 주의',
                                color: 'var(--primary-50)',
                                criteria: '일부 지표 주의 필요 (리스크 지수 40-60)',
                                action: '관련 부서에 알림 발송, 모니터링 강화'
                            },
                            {
                                level: 'Level 3: 경고',
                                color: 'var(--warning-50)',
                                criteria: '주요 지표 위험 수준 (리스크 지수 60-80)',
                                action: '감독 회의 소집, 금융기관에 시정 요구'
                            },
                            {
                                level: 'Level 4: 위기',
                                color: 'var(--error-50)',
                                criteria: '시스템 위기 임박 (리스크 지수 > 80)',
                                action: '비상대책반 가동, 긴급 유동성 지원 검토'
                            }
                        ].map((alert, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'white',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${alert.color}`,
                                display: 'flex',
                                gap: '16px',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: alert.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    flexShrink: 0
                                }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: alert.color, marginBottom: '6px' }}>
                                        {alert.level}
                                    </h4>
                                    <p style={{ fontSize: '13px', color: 'var(--gray-70)', marginBottom: '4px' }}>
                                        <strong>조건:</strong> {alert.criteria}
                                    </p>
                                    <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                        <strong>조치:</strong> {alert.action}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.RiskManagement = RiskManagement;
