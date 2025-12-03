// ============================================
// 성과 대시보드 컴포넌트
// 금융감독 성과 시각화
// ============================================

function PerformanceDashboard() {
    return (
        <div>
            {/* 종합 성과 지표 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-trophy"></i>
                    <h2>금융감독 자동화 성과</h2>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            처리 시간 단축
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            95
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            인력 절감
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            87
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            비용 절감
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            92
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            정확도 향상
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            99.3
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기존 vs AI 자동화 비교 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-balance-scale-right"></i>
                    <h2>기존 방식 vs AI 자동화 비교</h2>
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
                                    업무 항목
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    기존 방식
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    AI 자동화
                                </th>
                                <th style={{ padding: '16px', textAlign: 'center', fontSize: '15px', fontWeight: '600' }}>
                                    개선율
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { 
                                    task: '일일 거래 모니터링', 
                                    before: '50명 · 8시간', 
                                    after: 'AI 자동 · 실시간', 
                                    improvement: '95% ↓',
                                    color: 'var(--success-50)'
                                },
                                { 
                                    task: '이상거래 탐지', 
                                    before: '20명 · 4시간', 
                                    after: 'AI 0.3초', 
                                    improvement: '99.9% ↓',
                                    color: 'var(--success-50)'
                                },
                                { 
                                    task: '건전성 검사', 
                                    before: '분기 1회 · 30명', 
                                    after: '실시간 자동', 
                                    improvement: '97% ↓',
                                    color: 'var(--success-50)'
                                },
                                { 
                                    task: '법규 위반 검사', 
                                    before: '10명 · 2시간', 
                                    after: 'LLM 0.8초', 
                                    improvement: '99.8% ↓',
                                    color: 'var(--success-50)'
                                },
                                { 
                                    task: '보고서 작성', 
                                    before: '5명 · 4시간', 
                                    after: 'AI 2.3분', 
                                    improvement: '98% ↓',
                                    color: 'var(--success-50)'
                                },
                                { 
                                    task: '리스크 예측', 
                                    before: '15명 · 1주일', 
                                    after: 'AI 5분', 
                                    improvement: '99.5% ↓',
                                    color: 'var(--success-50)'
                                }
                            ].map((row, idx) => (
                                <tr key={idx} style={{ 
                                    borderBottom: '1px solid var(--gray-20)',
                                    background: idx % 2 === 0 ? 'white' : 'var(--gray-5)'
                                }}>
                                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--gray-90)' }}>
                                        {row.task}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--gray-70)' }}>
                                        {row.before}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', color: 'var(--primary-50)', fontWeight: '600' }}>
                                        {row.after}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            background: 'var(--success-50)',
                                            color: 'white',
                                            borderRadius: '20px',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}>
                                            {row.improvement}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 연간 비용 절감 효과 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-won-sign"></i>
                    <h2>연간 비용 절감 효과</h2>
                </div>

                <div className="grid grid-2">
                    <div style={{
                        padding: '24px',
                        background: 'white',
                        border: '2px solid var(--primary-50)',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary-50)', marginBottom: '20px' }}>
                            <i className="fas fa-calculator"></i> 기존 방식 연간 비용
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { item: '감독 인력 (150명)', cost: '180억 원' },
                                { item: '검사 인력 (80명)', cost: '96억 원' },
                                { item: '분석 인력 (50명)', cost: '60억 원' },
                                { item: '시스템 운영', cost: '45억 원' },
                                { item: '교육 및 기타', cost: '19억 원' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: 'var(--gray-5)',
                                    borderRadius: '6px'
                                }}>
                                    <span style={{ fontSize: '14px', color: 'var(--gray-70)' }}>{item.item}</span>
                                    <strong style={{ fontSize: '14px', color: 'var(--gray-90)' }}>{item.cost}</strong>
                                </div>
                            ))}
                            <div style={{
                                marginTop: '12px',
                                padding: '16px',
                                background: 'var(--error-50)',
                                color: 'white',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>총 연간 비용</div>
                                <div style={{ fontSize: '36px', fontWeight: '700' }}>400억 원</div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        padding: '24px',
                        background: 'white',
                        border: '2px solid var(--success-50)',
                        borderRadius: '12px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '20px' }}>
                            <i className="fas fa-robot"></i> AI 자동화 연간 비용
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { item: '최소 감독 인력 (20명)', cost: '24억 원' },
                                { item: 'AI 모델 운영', cost: '8억 원' },
                                { item: 'OpenHash 인프라', cost: '5억 원' },
                                { item: 'AWS 클라우드', cost: '3억 원' },
                                { item: '유지보수', cost: '2억 원' }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    background: 'var(--gray-5)',
                                    borderRadius: '6px'
                                }}>
                                    <span style={{ fontSize: '14px', color: 'var(--gray-70)' }}>{item.item}</span>
                                    <strong style={{ fontSize: '14px', color: 'var(--gray-90)' }}>{item.cost}</strong>
                                </div>
                            ))}
                            <div style={{
                                marginTop: '12px',
                                padding: '16px',
                                background: 'var(--success-50)',
                                color: 'white',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>총 연간 비용</div>
                                <div style={{ fontSize: '36px', fontWeight: '700' }}>32억 원</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: '24px',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #00A870 0%, #008C5C 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                        <i className="fas fa-piggy-bank"></i> 연간 순절감액
                    </div>
                    <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>
                        368억 원
                    </div>
                    <div style={{ fontSize: '16px', opacity: 0.95' }}>
                        (절감률 <strong>92%</strong>)
                    </div>
                </div>
            </div>

            {/* 사회적 가치 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-heart"></i>
                    <h2>사회적 가치 창출</h2>
                </div>

                <div className="grid grid-3">
                    {[
                        {
                            title: '금융 안정성 강화',
                            icon: '🛡️',
                            value: '99.7%',
                            desc: '실시간 감독으로 금융사고 사전 예방',
                            impact: '국민 금융 자산 보호'
                        },
                        {
                            title: '공정한 시장 질서',
                            icon: '⚖️',
                            value: '347건',
                            desc: '금일 불공정거래 적발 및 조치',
                            impact: '투자자 신뢰 제고'
                        },
                        {
                            title: '투명한 금융 행정',
                            icon: '📊',
                            value: '100%',
                            desc: 'OpenHash 기반 모든 거래 추적 가능',
                            impact: '정부 신뢰도 향상'
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>
                                {item.icon}
                            </div>
                            <h3 style={{ 
                                fontSize: '18px', 
                                fontWeight: '600', 
                                marginBottom: '16px',
                                color: 'var(--primary-50)',
                                textAlign: 'center'
                            }}>
                                {item.title}
                            </h3>
                            <div style={{
                                fontSize: '36px',
                                fontWeight: '700',
                                color: 'var(--success-50)',
                                textAlign: 'center',
                                marginBottom: '12px'
                            }}>
                                {item.value}
                            </div>
                            <p style={{ 
                                fontSize: '14px', 
                                color: 'var(--gray-70)', 
                                textAlign: 'center',
                                marginBottom: '16px',
                                lineHeight: '1.6'
                            }}>
                                {item.desc}
                            </p>
                            <div style={{
                                padding: '12px',
                                background: 'var(--success-50)',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '600',
                                textAlign: 'center'
                            }}>
                                🎯 {item.impact}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.PerformanceDashboard = PerformanceDashboard;
