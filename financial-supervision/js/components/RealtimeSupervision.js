// ============================================
// 실시간 감독 컴포넌트
// 금융거래 실시간 모니터링
// ============================================

function RealtimeSupervision() {
    const [liveData, setLiveData] = React.useState({
        totalTransactions: 28470000,
        bankTransactions: 15230000,
        securitiesTransactions: 8940000,
        insuranceTransactions: 4300000,
        avgProcessingTime: 0.3,
        suspiciousCount: 347
    });

    // 실시간 데이터 시뮬레이션
    React.useEffect(() => {
        const interval = setInterval(() => {
            setLiveData(prev => ({
                ...prev,
                totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 1000),
                suspiciousCount: prev.suspiciousCount + Math.floor(Math.random() * 3)
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* 실시간 현황판 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-tachometer-alt"></i>
                    <h2>실시간 거래 감독 현황</h2>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            background: 'var(--success-50)',
                            borderRadius: '50%',
                            animation: 'pulse 2s infinite'
                        }}></span>
                        <span style={{ fontSize: '14px', color: 'var(--success-50)', fontWeight: '600' }}>
                            실시간 모니터링 중
                        </span>
                    </div>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            금일 총 거래
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            {(liveData.totalTransactions / 10000).toFixed(0)}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>만 건</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            은행 거래
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            {(liveData.bankTransactions / 10000).toFixed(0)}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>만 건</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            증권 거래
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            {(liveData.securitiesTransactions / 10000).toFixed(0)}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>만 건</span>
                        </div>
                    </div>

                    <div className="stat-card error">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            의심 거래
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--error-50)' }}>
                            {liveData.suspiciousCount}
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* OpenHash 데이터 수집 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-database"></i>
                    <h2>OpenHash 거래 데이터 수집</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #F0F7FF 0%, #E6F3FF 100%)',
                    borderRadius: '12px',
                    border: '2px solid var(--primary-50)',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '16px' }}>
                        <i className="fas fa-sync-alt"></i> 실시간 데이터 수집 메커니즘
                    </h3>
                    <div className="grid grid-2" style={{ gap: '16px' }}>
                        <div style={{ padding: '16px', background: 'white', borderRadius: '8px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                1️⃣ 은행 거래 수집
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.6' }}>
                                모든 은행의 입출금, 송금, 대출 거래가 발생하면 즉시 OpenHash에 기록됩니다.
                                감독기구는 초당 10만 건의 거래를 수집하여 분석합니다.
                            </p>
                        </div>
                        <div style={{ padding: '16px', background: 'white', borderRadius: '8px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                2️⃣ 증권 거래 수집
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.6' }}>
                                주식, 채권, 파생상품 거래가 체결되면 거래소의 OpenHash 노드가 즉시 기록하고,
                                감독기구가 0.1초 내에 수집합니다.
                            </p>
                        </div>
                        <div style={{ padding: '16px', background: 'white', borderRadius: '8px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                3️⃣ 보험 거래 수집
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.6' }}>
                                보험 가입, 해지, 보험금 지급 등 모든 보험 거래가 OpenHash에 기록되며,
                                감독기구는 이를 실시간으로 모니터링합니다.
                            </p>
                        </div>
                        <div style={{ padding: '16px', background: 'white', borderRadius: '8px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                4️⃣ 위변조 방지
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.6' }}>
                                OpenHash의 확률적 계층 선택과 Merkle Tree 구조로 모든 거래 데이터의
                                무결성이 보장되어 금융기관도 임의로 수정할 수 없습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 실시간 분석 엔진 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-brain"></i>
                    <h2>실시간 AI 분석 엔진</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            title: '스트리밍 데이터 처리',
                            icon: '⚡',
                            desc: 'Apache Kafka로 초당 50만 건의 거래 데이터를 실시간 스트리밍 처리',
                            metrics: [
                                { label: '처리 지연', value: '< 100ms' },
                                { label: '처리량', value: '500K TPS' },
                                { label: '가용성', value: '99.99%' }
                            ]
                        },
                        {
                            title: '패턴 인식',
                            icon: '🔍',
                            desc: 'CNN 기반 거래 패턴 인식으로 정상/비정상 거래를 0.3초 내 분류',
                            metrics: [
                                { label: '정확도', value: '99.2%' },
                                { label: '재현율', value: '98.7%' },
                                { label: 'F1 Score', value: '0.989' }
                            ]
                        },
                        {
                            title: '이상 징후 탐지',
                            icon: '🚨',
                            desc: 'Isolation Forest 알고리즘으로 통계적 이상치를 즉시 탐지',
                            metrics: [
                                { label: '탐지 속도', value: '0.05초' },
                                { label: '오탐률', value: '< 0.1%' },
                                { label: '민감도', value: '99.5%' }
                            ]
                        }
                    ].map((engine, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{engine.icon}</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                                {engine.title}
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.6', marginBottom: '16px' }}>
                                {engine.desc}
                            </p>
                            <div style={{ 
                                padding: '16px', 
                                background: 'var(--gray-5)', 
                                borderRadius: '8px',
                                border: '1px solid var(--gray-20)'
                            }}>
                                {engine.metrics.map((metric, midx) => (
                                    <div key={midx} style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        marginBottom: midx < engine.metrics.length - 1 ? '8px' : '0'
                                    }}>
                                        <span style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                            {metric.label}
                                        </span>
                                        <strong style={{ fontSize: '13px', color: 'var(--primary-50)' }}>
                                            {metric.value}
                                        </strong>
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

window.RealtimeSupervision = RealtimeSupervision;
