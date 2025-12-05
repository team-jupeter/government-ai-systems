// ============================================
// 프라이버시 보호 컴포넌트
// 차분 프라이버시 및 판매자 이력 전용 아키텍처
// ============================================

function PrivacyProtection() {
    return (
        <div>
            {/* 프라이버시 보호 현황 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-shield-alt"></i>
                    <h2>프라이버시 보호 아키텍처</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            소비자 데이터 수집
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            0
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>건</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            차분 프라이버시 (ε)
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            ≤0.1
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            GDPR 준수율
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            100
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            데이터 주권 보장
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            100
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 판매자 이력 전용 아키텍처 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-user-shield"></i>
                    <h2>판매자 이력 전용 아키텍처</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--success-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '20px' }}>
                        <i className="fas fa-check-circle"></i> 소비자 데이터 무수집 원칙
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            {
                                principle: '수집 데이터',
                                desc: '판매자의 거래 이력만 수집 (상품명, 가격, 판매량, 시간)',
                                benefit: '소비자 개인정보 원천 배제',
                                icon: 'fa-database',
                                color: 'var(--primary-50)'
                            },
                            {
                                principle: '수요 예측',
                                desc: '판매자 이력 패턴 분석으로 수요 예측 (소비자 데이터 불필요)',
                                benefit: 'GDPR 등 글로벌 규제 완벽 준수',
                                icon: 'fa-chart-line',
                                color: 'var(--success-50)'
                            },
                            {
                                principle: '개인화 추천',
                                desc: '판매 패턴 기반 추천 (소비자 행동 추적 불필요)',
                                benefit: '프라이버시 침해 없는 추천',
                                icon: 'fa-bullseye',
                                color: 'var(--warning-50)'
                            },
                            {
                                principle: '데이터 저장',
                                desc: '중앙 서버에 해시값만 저장, 실제 데이터는 개인 단말',
                                benefit: '물리적 데이터 주권 구현',
                                icon: 'fa-shield-alt',
                                color: 'var(--success-50)'
                            }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'var(--gray-5)',
                                borderRadius: '8px',
                                borderLeft: `4px solid ${item.color}`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <i className={`fas ${item.icon}`} style={{ fontSize: '24px', color: item.color }}></i>
                                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-90)' }}>
                                        {item.principle}
                                    </h4>
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px', lineHeight: '1.6' }}>
                                    {item.desc}
                                </p>
                                <div style={{
                                    padding: '8px 12px',
                                    background: item.color,
                                    color: 'white',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    display: 'inline-block'
                                }}>
                                    ✓ {item.benefit}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 차분 프라이버시 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-lock"></i>
                    <h2>차분 프라이버시 적용</h2>
                </div>

                <div className="grid grid-2">
                    <div style={{
                        padding: '24px',
                        background: 'white',
                        border: '2px solid var(--primary-50)',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '16px' }}>
                            <i className="fas fa-calculator"></i> 차분 프라이버시 (ε≤0.1)
                        </h3>
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.8', marginBottom: '16px' }}>
                            집계 데이터 공개 시 노이즈를 추가하여 개별 데이터를 역추적 불가능하게 만듭니다.
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: '프라이버시 파라미터', value: 'ε ≤ 0.1' },
                                { label: '노이즈 분포', value: 'Laplace 분포' },
                                { label: '역추적 확률', value: '< 0.001%' },
                                { label: '데이터 유용성', value: '98.7% 유지' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: 'var(--gray-5)',
                                    borderRadius: '6px'
                                }}>
                                    <span style={{ fontSize: '14px', color: 'var(--gray-70)' }}>{item.label}</span>
                                    <strong style={{ fontSize: '14px', color: 'var(--primary-50)' }}>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        padding: '24px',
                        background: 'white',
                        border: '2px solid var(--success-50)',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '16px' }}>
                            <i className="fas fa-globe"></i> 글로벌 규제 준수
                        </h3>
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.8', marginBottom: '16px' }}>
                            주요 프라이버시 규제를 모두 준수하는 설계입니다.
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { regulation: 'GDPR (EU)', status: '완벽 준수' },
                                { regulation: '개인정보보호법 (한국)', status: '완벽 준수' },
                                { regulation: 'CCPA (캘리포니아)', status: '완벽 준수' },
                                { regulation: 'PIPEDA (캐나다)', status: '완벽 준수' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px',
                                    background: 'var(--success-50)',
                                    color: 'white',
                                    borderRadius: '6px'
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.regulation}</span>
                                    <span style={{ 
                                        padding: '4px 12px',
                                        background: 'white',
                                        color: 'var(--success-50)',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        ✓ {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.PrivacyProtection = PrivacyProtection;
