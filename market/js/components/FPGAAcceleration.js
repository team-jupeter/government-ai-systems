// ============================================
// FPGA 가속 컴포넌트
// 하드웨어 가속 성능 및 아키텍처
// ============================================

function FPGAAcceleration() {
    return (
        <div>
            {/* FPGA 성능 지표 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-microchip"></i>
                    <h2>FPGA 하드웨어 가속 성능</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            초당 거래 처리
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            7.3M
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>TPS</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            성능 향상
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            29-146
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>배</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            지연 시간
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            &lt;100
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>ms</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            전력 절감
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            88.6
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기존 시스템 대비 비교 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-bar"></i>
                    <h2>기존 시스템 대비 성능 비교</h2>
                </div>

                <div style={{
                    background: 'white',
                    border: '1px solid var(--gray-20)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--primary-50)', color: 'white' }}>
                                <th style={{ padding: '16px', textAlign: 'left', fontSize: '15px', fontWeight: '600' }}>
                                    시스템 유형
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    TPS
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    지연시간
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    전력소비
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    비용
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { 
                                    type: 'FPGA 가속 (본 시스템)', 
                                    tps: '7.3M', 
                                    latency: '<100ms', 
                                    power: '낮음',
                                    cost: '낮음',
                                    color: 'var(--success-50)'
                                },
                                { 
                                    type: '블록체인 (Bitcoin)', 
                                    tps: '7', 
                                    latency: '10분', 
                                    power: '매우 높음',
                                    cost: '매우 높음',
                                    color: 'var(--error-50)'
                                },
                                { 
                                    type: '블록체인 (Ethereum)', 
                                    tps: '15-30', 
                                    latency: '15초', 
                                    power: '높음',
                                    cost: '높음',
                                    color: 'var(--error-50)'
                                },
                                { 
                                    type: 'GPU 기반 시스템', 
                                    tps: '50K', 
                                    latency: '200ms', 
                                    power: '중간',
                                    cost: '중간',
                                    color: 'var(--warning-50)'
                                },
                                { 
                                    type: 'CPU 기반 시스템', 
                                    tps: '250K', 
                                    latency: '150ms', 
                                    power: '중간',
                                    cost: '중간',
                                    color: 'var(--warning-50)'
                                }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ 
                                    borderBottom: '1px solid var(--gray-20)',
                                    background: idx % 2 === 0 ? 'white' : 'var(--gray-5)'
                                }}>
                                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: row.color }}>
                                        {row.type}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                                        {row.tps}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                                        {row.latency}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                                        {row.power}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                                        {row.cost}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FPGA 아키텍처 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-sitemap"></i>
                    <h2>FPGA 병렬 처리 아키텍처</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #F0F7FF 0%, #E6F3FF 100%)',
                    borderRadius: '12px',
                    border: '2px solid var(--primary-50)'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                        <i className="fas fa-project-diagram"></i> 4단계 병렬 처리 파이프라인
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            {
                                stage: '1단계: 데이터 수집',
                                desc: 'OpenHash에서 판매자 거래 이력 실시간 수집',
                                performance: '초당 730만 건 처리',
                                color: 'var(--primary-50)'
                            },
                            {
                                stage: '2단계: 병렬 검증',
                                desc: 'Merkle Proof 기반 무결성 검증 (병렬 처리)',
                                performance: '100ms 이하 지연',
                                color: 'var(--success-50)'
                            },
                            {
                                stage: '3단계: AI 분석',
                                desc: 'CNN + LSTM 기반 패턴 분석 및 수요 예측',
                                performance: '실시간 추론 (50ms)',
                                color: 'var(--warning-50)'
                            },
                            {
                                stage: '4단계: 결과 출력',
                                desc: '최적화된 상품 추천 및 가격 책정',
                                performance: '초저지연 응답',
                                color: 'var(--primary-50)'
                            }
                        ].map((step, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'white',
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
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    flexShrink: 0
                                }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '6px' }}>
                                        {step.stage}
                                    </h4>
                                    <p style={{ fontSize: '13px', color: 'var(--gray-70)', marginBottom: '4px' }}>
                                        {step.desc}
                                    </p>
                                    <div style={{
                                        padding: '6px 10px',
                                        background: 'var(--success-50)',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        display: 'inline-block'
                                    }}>
                                        ⚡ {step.performance}
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
                        <i className="fas fa-check-circle" style={{ fontSize: '24px' }}></i>
                        <div>
                            <strong style={{ fontSize: '15px' }}>AWS EC2 환경 실증 완료</strong>
                            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.95 }}>
                                FPGA 인스턴스(F1)에서 7.3M TPS, 88.6% 전력 절감 검증
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.FPGAAcceleration = FPGAAcceleration;
