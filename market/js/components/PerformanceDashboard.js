// ============================================
// 성과 대시보드 컴포넌트
// 실시간 성능 지표 및 비용 절감 효과
// ============================================

function PerformanceDashboard() {
    return (
        <div>
            {/* 핵심 성과 지표 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-trophy"></i>
                    <h2>핵심 성과 지표 (KPI)</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            처리 성능
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            7.3M
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>TPS</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            <i className="fas fa-arrow-up" style={{ color: 'var(--success-50)' }}></i>
                            {' '}기존 대비 146배
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            비용 절감
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            99
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            <i className="fas fa-arrow-down" style={{ color: 'var(--success-50)' }}></i>
                            {' '}블록체인 대비
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
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            <i className="fas fa-leaf" style={{ color: 'var(--success-50)' }}></i>
                            {' '}탄소 배출 감소
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            사용자 만족도
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            94.3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            <i className="fas fa-arrow-up" style={{ color: 'var(--success-50)' }}></i>
                            {' '}4.7/5.0 평점
                        </div>
                    </div>
                </div>
            </div>

            {/* 시장 규모 및 목표 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-line"></i>
                    <h2>시장 규모 및 성장 목표</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            category: 'TAM (총 시장)',
                            value: '$11조',
                            desc: '전자상거래 + 핀테크',
                            breakdown: '$6.3조 (이커머스) + $4.7조 (핀테크)',
                            color: 'var(--primary-50)',
                            icon: '🌍'
                        },
                        {
                            category: 'SAM (가용 시장)',
                            value: '$3.5조',
                            desc: 'OpenHash 적용 가능 영역',
                            breakdown: '2025년 기준, 연평균 18% 성장',
                            color: 'var(--success-50)',
                            icon: '🎯'
                        },
                        {
                            category: 'SOM (목표 시장)',
                            value: '$280억',
                            desc: '2029년 목표 (0.8% 점유율)',
                            breakdown: '5년 계획, 연평균 120% 성장',
                            color: 'var(--warning-50)',
                            icon: '🚀'
                        }
                    ].map((market, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${market.color}`,
                            borderRadius: '12px'
                        }}>
                            <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
                                {market.icon}
                            </div>
                            <h3 style={{ 
                                fontSize: '16px', 
                                fontWeight: '600', 
                                color: market.color,
                                textAlign: 'center',
                                marginBottom: '8px'
                            }}>
                                {market.category}
                            </h3>
                            <div style={{ 
                                fontSize: '36px', 
                                fontWeight: '700', 
                                color: market.color,
                                textAlign: 'center',
                                marginBottom: '12px'
                            }}>
                                {market.value}
                            </div>
                            <p style={{ 
                                fontSize: '14px', 
                                fontWeight: '600',
                                color: 'var(--gray-90)',
                                textAlign: 'center',
                                marginBottom: '12px'
                            }}>
                                {market.desc}
                            </p>
                            <div style={{
                                padding: '10px',
                                background: 'var(--gray-5)',
                                borderRadius: '6px',
                                fontSize: '12px',
                                color: 'var(--gray-70)',
                                textAlign: 'center',
                                lineHeight: '1.5'
                            }}>
                                {market.breakdown}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 기술 가치 평가 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-dollar-sign"></i>
                    <h2>기술 가치 평가</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #00A870 0%, #008C5C 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>
                            공정 시장 가치 (Fair Market Value)
                        </div>
                        <div style={{ fontSize: '52px', fontWeight: '700' }}>
                            $13.5억
                        </div>
                        <div style={{ fontSize: '16px', opacity: 0.9, marginTop: '8px' }}>
                            약 1조 8천억 원 (환율 1,350원 기준)
                        </div>
                    </div>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            method: '특허 포트폴리오',
                            value: '$12.5억',
                            basis: '20개 이상 핵심 특허',
                            details: '독창적 기술 및 방법론',
                            color: 'var(--primary-50)'
                        },
                        {
                            method: '수익 접근법',
                            value: '$14.8억',
                            basis: '향후 5년 현금흐름',
                            details: 'DCF 할인율 15% 적용',
                            color: 'var(--success-50)'
                        },
                        {
                            method: '시장 비교법',
                            value: '$15.3억',
                            basis: '유사 기업 밸류에이션',
                            details: 'P/S ratio 8-12배 적용',
                            color: 'var(--warning-50)'
                        }
                    ].map((valuation, idx) => (
                        <div key={idx} style={{
                            padding: '20px',
                            background: 'white',
                            border: `2px solid ${valuation.color}`,
                            borderRadius: '12px'
                        }}>
                            <h3 style={{ 
                                fontSize: '16px', 
                                fontWeight: '600', 
                                color: valuation.color,
                                marginBottom: '12px'
                            }}>
                                {valuation.method}
                            </h3>
                            <div style={{ 
                                fontSize: '32px', 
                                fontWeight: '700', 
                                color: valuation.color,
                                marginBottom: '12px'
                            }}>
                                {valuation.value}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.6' }}>
                                <div style={{ marginBottom: '6px' }}>
                                    <strong>근거:</strong> {valuation.basis}
                                </div>
                                <div>
                                    <strong>상세:</strong> {valuation.details}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 비교 우위 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-crown"></i>
                    <h2>경쟁사 대비 우위</h2>
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
                                    항목
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    본 시스템
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    아마존
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    알리바바
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    이베이
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { 
                                    metric: '처리 성능', 
                                    ours: '7.3M TPS', 
                                    amazon: '~100K TPS', 
                                    alibaba: '~500K TPS',
                                    ebay: '~50K TPS'
                                },
                                { 
                                    metric: '프라이버시', 
                                    ours: '소비자 데이터 무수집', 
                                    amazon: '전면 수집 및 분석', 
                                    alibaba: '전면 수집 및 분석',
                                    ebay: '제한적 수집'
                                },
                                { 
                                    metric: '수수료', 
                                    ours: '15% (플랫폼)', 
                                    amazon: '15-45%', 
                                    alibaba: '5-8%',
                                    ebay: '10-15%'
                                },
                                { 
                                    metric: '탄소 배출', 
                                    ours: '88.6% 절감', 
                                    amazon: '높음', 
                                    alibaba: '매우 높음',
                                    ebay: '중간'
                                },
                                { 
                                    metric: 'AI 자동화', 
                                    ours: '100% 완전 자동', 
                                    amazon: '부분 자동화', 
                                    alibaba: '부분 자동화',
                                    ebay: '제한적'
                                }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ 
                                    borderBottom: '1px solid var(--gray-20)',
                                    background: idx % 2 === 0 ? 'white' : 'var(--gray-5)'
                                }}>
                                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600' }}>
                                        {row.metric}
                                    </td>
                                    <td style={{ 
                                        padding: '16px', 
                                        textAlign: 'center', 
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: 'var(--success-50)'
                                    }}>
                                        {row.ours}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                                        {row.amazon}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                                        {row.alibaba}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px' }}>
                                        {row.ebay}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 투자 유치 현황 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-pie"></i>
                    <h2>투자 및 사업화 계획</h2>
                </div>

                <div className="grid grid-2">
                    <div style={{
                        padding: '24px',
                        background: 'white',
                        border: '2px solid var(--primary-50)',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '16px' }}>
                            <i className="fas fa-rocket"></i> 초기 투자 규모
                        </h3>
                        <div style={{ fontSize: '42px', fontWeight: '700', color: 'var(--primary-50)', marginBottom: '20px', textAlign: 'center' }}>
                            $10억
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { phase: 'R&D (3년)', amount: '$3억', percent: '30%' },
                                { phase: '인프라 구축', amount: '$2.5억', percent: '25%' },
                                { phase: '마케팅', amount: '$2억', percent: '20%' },
                                { phase: '인력 채용', amount: '$1.5억', percent: '15%' },
                                { phase: '운영 자금', amount: '$1억', percent: '10%' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: '12px',
                                    background: 'var(--gray-5)',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.phase}</span>
                                    <div>
                                        <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-50)' }}>
                                            {item.amount}
                                        </span>
                                        <span style={{ fontSize: '12px', color: 'var(--gray-70)', marginLeft: '8px' }}>
                                            ({item.percent})
                                        </span>
                                    </div>
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
                            <i className="fas fa-calendar-alt"></i> 5개년 매출 목표
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { year: '2025', revenue: '$50M', growth: '-', users: '100K' },
                                { year: '2026', revenue: '$200M', growth: '300%', users: '1M' },
                                { year: '2027', revenue: '$800M', growth: '300%', users: '10M' },
                                { year: '2028', revenue: '$3.2B', growth: '300%', users: '50M' },
                                { year: '2029', revenue: '$28B', growth: '775%', users: '500M' }
                            ].map((forecast, idx) => (
                                <div key={idx} style={{
                                    padding: '14px',
                                    background: idx === 4 ? 'var(--success-50)' : 'var(--gray-5)',
                                    color: idx === 4 ? 'white' : 'inherit',
                                    borderRadius: '6px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <strong style={{ fontSize: '16px' }}>{forecast.year}년</strong>
                                        <span style={{ fontSize: '18px', fontWeight: '700' }}>{forecast.revenue}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.8 }}>
                                        <span>성장률: {forecast.growth}</span>
                                        <span>사용자: {forecast.users}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.PerformanceDashboard = PerformanceDashboard;
