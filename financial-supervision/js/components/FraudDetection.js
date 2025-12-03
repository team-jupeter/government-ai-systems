// ============================================
// 이상거래 탐지 컴포넌트
// AI 기반 불법거래 탐지 시스템
// ============================================

function FraudDetection() {
    const [detectionStats, setDetectionStats] = React.useState({
        todayDetections: 347,
        moneyLaundering: 89,
        insiderTrading: 47,
        marketManipulation: 125,
        fraud: 86
    });

    return (
        <div>
            {/* 탐지 현황 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-shield-alt"></i>
                    <h2>이상거래 탐지 현황</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card error">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            금일 탐지 건수
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--error-50)' }}>
                            {detectionStats.todayDetections}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            자금세탁 의심
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            {detectionStats.moneyLaundering}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card error">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            내부자거래
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--error-50)' }}>
                            {detectionStats.insiderTrading}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            시세조종 의심
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            {detectionStats.marketManipulation}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 탐지 알고리즘 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-robot"></i>
                    <h2>AI 탐지 알고리즘</h2>
                </div>

                <div className="grid grid-2">
                    <div className="card">
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--primary-50)' }}>
                            <i className="fas fa-chart-line"></i> Isolation Forest
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6', marginBottom: '16px' }}>
                            거래 패턴의 통계적 이상치를 탐지하는 비지도 학습 알고리즘입니다.
                            정상 거래와 확연히 다른 패턴을 보이는 거래를 자동으로 식별합니다.
                        </p>
                        <div style={{ 
                            padding: '16px', 
                            background: 'var(--gray-5)', 
                            borderRadius: '8px',
                            fontSize: '13px',
                            lineHeight: '1.6'
                        }}>
                            <strong>작동 원리:</strong><br/>
                            1. 정상 거래 데이터로 랜덤 포레스트 구축<br/>
                            2. 새로운 거래의 isolation score 계산<br/>
                            3. 임계값(0.6) 초과 시 이상거래로 분류<br/>
                            4. 정확도: <strong style={{ color: 'var(--success-50)' }}>99.2%</strong>
                        </div>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--primary-50)' }}>
                            <i className="fas fa-project-diagram"></i> Graph Neural Network
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6', marginBottom: '16px' }}>
                            자금 흐름을 그래프 구조로 분석하여 복잡한 자금세탁 네트워크를 탐지합니다.
                            여러 계좌를 경유하는 우회 거래도 추적 가능합니다.
                        </p>
                        <div style={{ 
                            padding: '16px', 
                            background: 'var(--gray-5)', 
                            borderRadius: '8px',
                            fontSize: '13px',
                            lineHeight: '1.6'
                        }}>
                            <strong>작동 원리:</strong><br/>
                            1. 계좌를 노드, 거래를 엣지로 표현<br/>
                            2. GNN으로 자금 흐름 패턴 학습<br/>
                            3. 순환 구조, 분산/집중 패턴 탐지<br/>
                            4. 추적 깊이: <strong style={{ color: 'var(--success-50)' }}>최대 20단계</strong>
                        </div>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--primary-50)' }}>
                            <i className="fas fa-wave-square"></i> LSTM 시계열 분석
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6', marginBottom: '16px' }}>
                            거래 시간대, 금액, 빈도의 시계열 패턴을 분석하여 이상 행위를 예측합니다.
                            정상적이지 않은 거래 타이밍을 사전에 포착합니다.
                        </p>
                        <div style={{ 
                            padding: '16px', 
                            background: 'var(--gray-5)', 
                            borderRadius: '8px',
                            fontSize: '13px',
                            lineHeight: '1.6'
                        }}>
                            <strong>작동 원리:</strong><br/>
                            1. 과거 30일간 거래 패턴 학습<br/>
                            2. LSTM으로 다음 거래 패턴 예측<br/>
                            3. 실제 패턴과 예측의 편차 계산<br/>
                            4. 예측 정확도: <strong style={{ color: 'var(--success-50)' }}>97.8%</strong>
                        </div>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--primary-50)' }}>
                            <i className="fas fa-balance-scale"></i> Rule-Based Engine
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6', marginBottom: '16px' }}>
                            금융법규 및 감독 규정을 코드화한 규칙 기반 엔진으로 명확한 위반 사항을 즉시 탐지합니다.
                            AI와 함께 보완적으로 작동합니다.
                        </p>
                        <div style={{ 
                            padding: '16px', 
                            background: 'var(--gray-5)', 
                            borderRadius: '8px',
                            fontSize: '13px',
                            lineHeight: '1.6'
                        }}>
                            <strong>주요 규칙:</strong><br/>
                            • 단일 계좌 일일 1억 원 이상 입출금<br/>
                            • 동일인 다수 계좌 분산 거래<br/>
                            • 새벽 시간대 대량 거래<br/>
                            • 규칙 수: <strong style={{ color: 'var(--success-50)' }}>2,847개</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* 탐지 프로세스 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-clipboard-list"></i>
                    <h2>자동 대응 프로세스</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--primary-50)',
                    borderRadius: '12px'
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {[
                            { step: '1', title: '탐지', desc: 'AI가 0.3초 내 이상거래 탐지', icon: 'fa-search', color: 'var(--primary-50)' },
                            { step: '2', title: '분석', desc: '거래 상세 내역 자동 분석', icon: 'fa-chart-pie', color: 'var(--warning-50)' },
                            { step: '3', title: '등급 분류', desc: '위험도에 따라 등급 부여', icon: 'fa-layer-group', color: 'var(--error-50)' },
                            { step: '4', title: '자동 조치', desc: '등급별 자동 대응 실행', icon: 'fa-bolt', color: 'var(--success-50)' },
                            { step: '5', title: '보고', desc: '담당자에게 즉시 알림 발송', icon: 'fa-bell', color: 'var(--primary-50)' }
                        ].map((process, idx) => (
                            <div key={idx} style={{
                                flex: '1 1 180px',
                                padding: '20px',
                                background: 'var(--gray-5)',
                                borderRadius: '8px',
                                border: `2px solid ${process.color}`,
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: process.color,
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    margin: '0 auto 12px'
                                }}>
                                    {process.step}
                                </div>
                                <i className={`fas ${process.icon}`} style={{
                                    fontSize: '28px',
                                    color: process.color,
                                    marginBottom: '12px',
                                    display: 'block'
                                }}></i>
                                <h4 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '8px',
                                    color: 'var(--gray-90)'
                                }}>
                                    {process.title}
                                </h4>
                                <p style={{
                                    fontSize: '13px',
                                    color: 'var(--gray-70)',
                                    lineHeight: '1.4'
                                }}>
                                    {process.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.FraudDetection = FraudDetection;
