// ============================================
// 건전성 검사 컴포넌트
// 금융기관 재무건전성 평가
// ============================================

function SoundnessInspection() {
    return (
        <div>
            {/* 건전성 지표 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-heartbeat"></i>
                    <h2>금융기관 건전성 지표</h2>
                </div>

                <div className="grid grid-3">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            평균 BIS 자기자본비율
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            15.3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            규제 최소 8% 대비 양호
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            평균 NPL 비율
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            2.1
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            전월 대비 0.2%p 증가
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            평균 LCR
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            132
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--gray-50)', marginTop: '8px' }}>
                            규제 최소 100% 대비 양호
                        </div>
                    </div>
                </div>
            </div>

            {/* 자동 검사 항목 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-clipboard-check"></i>
                    <h2>자동 건전성 검사 항목</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            category: '자본 건전성',
                            icon: '💰',
                            items: [
                                { name: 'BIS 자기자본비율', standard: '≥ 8%', method: 'OpenHash에서 자산/부채 실시간 수집' },
                                { name: '기본자본비율', standard: '≥ 6%', method: 'Tier 1 자본 자동 계산' },
                                { name: '레버리지비율', standard: '≥ 3%', method: '총자산 대비 자기자본 산출' }
                            ]
                        },
                        {
                            category: '자산 건전성',
                            icon: '📊',
                            items: [
                                { name: 'NPL 비율', standard: '< 3%', method: '부실채권/총대출 자동 집계' },
                                { name: '대손충당금 적립률', standard: '≥ 100%', method: 'NPL 대비 충당금 비율 확인' },
                                { name: '고정이하여신비율', standard: '< 2%', method: '연체 대출 실시간 추적' }
                            ]
                        },
                        {
                            category: '유동성',
                            icon: '💧',
                            items: [
                                { name: 'LCR', standard: '≥ 100%', method: '30일 유동성 커버리지 계산' },
                                { name: 'NSFR', standard: '≥ 100%', method: '1년 안정적 자금 조달 비율' },
                                { name: '예대율', standard: '< 100%', method: '대출/예금 비율 모니터링' }
                            ]
                        },
                        {
                            category: '수익성',
                            icon: '📈',
                            items: [
                                { name: 'ROA', standard: '> 0.5%', method: '순이익/총자산 자동 계산' },
                                { name: 'ROE', standard: '> 5%', method: '순이익/자기자본 산출' },
                                { name: 'NIM', standard: '> 1.5%', method: '순이자마진 실시간 계산' }
                            ]
                        }
                    ].map((category, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{category.icon}</div>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                marginBottom: '16px',
                                color: 'var(--primary-50)'
                            }}>
                                {category.category}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {category.items.map((item, iidx) => (
                                    <div key={iidx} style={{
                                        padding: '12px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '8px',
                                        border: '1px solid var(--gray-20)'
                                    }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '8px'
                                        }}>
                                            <strong style={{ fontSize: '14px', color: 'var(--gray-90)' }}>
                                                {item.name}
                                            </strong>
                                            <span style={{
                                                padding: '4px 8px',
                                                background: 'white',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: 'var(--primary-50)',
                                                border: '1px solid var(--primary-50)'
                                            }}>
                                                {item.standard}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--gray-70)', lineHeight: '1.5' }}>
                                            {item.method}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* OpenHash 기반 실시간 계산 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-calculator"></i>
                    <h2>OpenHash 기반 실시간 재무제표 생성</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #F0F7FF 0%, #E6F3FF 100%)',
                    borderRadius: '12px',
                    border: '2px solid var(--primary-50)'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '16px' }}>
                        <i className="fas fa-sync-alt"></i> 자동 재무제표 생성 프로세스
                    </h3>
                    
                    <div className="grid grid-3" style={{ gap: '16px', marginBottom: '20px' }}>
                        {[
                            { 
                                step: '1', 
                                title: '거래 수집', 
                                desc: 'OpenHash에서 은행의 모든 거래를 실시간 수집'
                            },
                            { 
                                step: '2', 
                                title: '자동 분류', 
                                desc: '자산, 부채, 자본, 수익, 비용으로 자동 분류'
                            },
                            { 
                                step: '3', 
                                title: '재무제표 생성', 
                                desc: '대차대조표, 손익계산서 실시간 작성'
                            }
                        ].map((step, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'white',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'var(--primary-50)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    margin: '0 auto 12px'
                                }}>
                                    {step.step}
                                </div>
                                <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>
                                    {step.title}
                                </h4>
                                <p style={{ fontSize: '13px', color: 'var(--gray-70)', lineHeight: '1.4' }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        padding: '16px',
                        background: 'white',
                        borderRadius: '8px',
                        border: '1px solid var(--success-50)',
                        borderLeft: '4px solid var(--success-50)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <i className="fas fa-check-circle" style={{ fontSize: '24px', color: 'var(--success-50)' }}></i>
                            <div>
                                <strong style={{ fontSize: '15px', color: 'var(--gray-90)' }}>
                                    기존 방식 대비 장점
                                </strong>
                                <p style={{ fontSize: '13px', color: 'var(--gray-70)', marginTop: '4px' }}>
                                    금융기관이 분기별로 제출하던 재무제표를 기다릴 필요 없이, 
                                    감독기구가 <strong>실시간으로 직접 생성</strong>하여 
                                    분식회계가 원천적으로 불가능합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.SoundnessInspection = SoundnessInspection;
