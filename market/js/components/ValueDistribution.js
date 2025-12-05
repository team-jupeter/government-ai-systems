// ============================================
// 가치 분배 컴포넌트
// 메트칼프 법칙 기반 공정 분배 모델
// ============================================

function ValueDistribution() {
    return (
        <div>
            {/* 가치 분배 개요 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-balance-scale"></i>
                    <h2>메트칼프 법칙 기반 가치 분배</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #00A870 0%, #008C5C 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-network-wired"></i> 네트워크 효과 기반 공정 분배
                    </h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.8', opacity: 0.95, marginBottom: '12px' }}>
                        메트칼프 법칙에 따르면 네트워크 가치는 참여자 수의 제곱에 비례합니다 (V = n²). 
                        본 시스템은 이 네트워크 효과로 발생한 가치를 공정하게 분배합니다.
                    </p>
                    <div style={{ 
                        padding: '12px', 
                        background: 'rgba(255,255,255,0.2)', 
                        borderRadius: '6px',
                        fontSize: '18px',
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>
                        V = k × n² (k: 상수, n: 참여자 수)
                    </div>
                </div>

                <div className="grid grid-4">
                    <div className="stat-card success">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            소비자 분배
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--success-50)' }}>
                            40
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            판매자 분배
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            35
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card warning">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            플랫폼 운영
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning-50)' }}>
                            15
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>

                    <div className="stat-card primary">
                        <div style={{ fontSize: '14px', color: 'var(--gray-70)', marginBottom: '8px' }}>
                            개발자/기여자
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary-50)' }}>
                            10
                            <span style={{ fontSize: '16px', marginLeft: '4px' }}>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 분배 모델 상세 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-chart-pie"></i>
                    <h2>가치 분배 모델 상세</h2>
                </div>

                <div className="grid grid-2">
                    {[
                        {
                            group: '소비자 (40%)',
                            icon: '👥',
                            color: 'var(--success-50)',
                            rationale: '네트워크 효과의 가장 큰 기여자',
                            distribution: [
                                { method: '거래 리워드', percent: '20%', desc: '거래 시마다 캐시백' },
                                { method: '추천 보상', percent: '10%', desc: '신규 회원 추천 시' },
                                { method: '리뷰 보상', percent: '5%', desc: '유용한 리뷰 작성 시' },
                                { method: '충성도 보상', percent: '5%', desc: '장기 이용자 혜택' }
                            ]
                        },
                        {
                            group: '판매자 (35%)',
                            icon: '🏪',
                            color: 'var(--primary-50)',
                            rationale: '상품 및 서비스 제공자',
                            distribution: [
                                { method: '판매 수익', percent: '25%', desc: '기본 판매 마진' },
                                { method: '품질 보너스', percent: '5%', desc: '높은 평점 유지 시' },
                                { method: '배송 보상', percent: '3%', desc: '빠른 배송 인센티브' },
                                { method: '신상품 보조', percent: '2%', desc: '신제품 출시 지원' }
                            ]
                        },
                        {
                            group: '플랫폼 운영 (15%)',
                            icon: '⚙️',
                            color: 'var(--warning-50)',
                            rationale: '인프라 및 시스템 운영',
                            distribution: [
                                { method: 'FPGA 인프라', percent: '6%', desc: '하드웨어 운영 비용' },
                                { method: 'AI 모델 운영', percent: '4%', desc: '7개 에이전트 운영' },
                                { method: '보안 시스템', percent: '3%', desc: '양자내성 보안 유지' },
                                { method: '고객 지원', percent: '2%', desc: 'CS 및 분쟁 해결' }
                            ]
                        },
                        {
                            group: '개발자/기여자 (10%)',
                            icon: '👨‍💻',
                            color: 'var(--primary-50)',
                            rationale: '오픈소스 기여 및 개선',
                            distribution: [
                                { method: '코드 기여', percent: '5%', desc: '오픈소스 개발 참여' },
                                { method: '버그 제보', percent: '2%', desc: '버그 발견 및 수정' },
                                { method: 'AI 모델 개선', percent: '2%', desc: '알고리즘 최적화' },
                                { method: '문서화', percent: '1%', desc: '기술 문서 작성' }
                            ]
                        }
                    ].map((model, idx) => (
                        <div key={idx} className="card">
                            <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>{model.icon}</div>
                            <h3 style={{ 
                                fontSize: '20px', 
                                fontWeight: '700', 
                                marginBottom: '8px',
                                color: model.color,
                                textAlign: 'center'
                            }}>
                                {model.group}
                            </h3>
                            <p style={{ 
                                fontSize: '14px', 
                                color: 'var(--gray-70)', 
                                marginBottom: '16px',
                                textAlign: 'center',
                                fontStyle: 'italic'
                            }}>
                                {model.rationale}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {model.distribution.map((item, didx) => (
                                    <div key={didx} style={{
                                        padding: '12px',
                                        background: 'var(--gray-5)',
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${model.color}`
                                    }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '6px'
                                        }}>
                                            <strong style={{ fontSize: '14px', color: 'var(--gray-90)' }}>
                                                {item.method}
                                            </strong>
                                            <span style={{
                                                padding: '4px 10px',
                                                background: model.color,
                                                color: 'white',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '700'
                                            }}>
                                                {item.percent}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--gray-70)' }}>
                                            {item.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 수익 비례 비용 분담 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-hand-holding-usd"></i>
                    <h2>수익 비례 비용 분담 모델</h2>
                </div>

                <div style={{
                    padding: '24px',
                    background: 'white',
                    border: '2px solid var(--success-50)',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--success-50)', marginBottom: '20px' }}>
                        <i className="fas fa-equals"></i> 참여자 수익 기반 공정 비용 분배
                    </h3>
                    
                    <p style={{ fontSize: '14px', color: 'var(--gray-70)', lineHeight: '1.8', marginBottom: '20px' }}>
                        플랫폼 운영 비용을 참여자가 얻은 수익에 비례하여 분담합니다. 
                        수익이 많은 참여자가 더 많은 비용을 부담하며, 소규모 판매자는 부담을 최소화합니다.
                    </p>

                    <div style={{
                        background: 'var(--gray-5)',
                        padding: '20px',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                            비용 분담 공식
                        </h4>
                        <div style={{
                            padding: '16px',
                            background: 'white',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontFamily: 'monospace',
                            textAlign: 'center',
                            fontWeight: '600'
                        }}>
                            개인 비용 부담 = 총 운영 비용 × (개인 수익 / 전체 수익)
                        </div>
                    </div>

                    <div className="grid grid-3" style={{ gap: '16px' }}>
                        {[
                            {
                                tier: '소규모 판매자',
                                revenue: '월 100만원',
                                share: '0.01%',
                                cost: '1,500원'
                            },
                            {
                                tier: '중규모 판매자',
                                revenue: '월 5,000만원',
                                share: '0.5%',
                                cost: '75,000원'
                            },
                            {
                                tier: '대규모 판매자',
                                revenue: '월 10억원',
                                share: '10%',
                                cost: '150만원'
                            }
                        ].map((example, idx) => (
                            <div key={idx} style={{
                                padding: '16px',
                                background: 'white',
                                border: '1px solid var(--gray-20)',
                                borderRadius: '8px'
                            }}>
                                <h5 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px', color: 'var(--primary-50)' }}>
                                    {example.tier}
                                </h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                                    <div>
                                        <strong>월 수익:</strong> {example.revenue}
                                    </div>
                                    <div>
                                        <strong>수익 비중:</strong> {example.share}
                                    </div>
                                    <div style={{
                                        padding: '8px',
                                        background: 'var(--success-50)',
                                        color: 'white',
                                        borderRadius: '4px',
                                        textAlign: 'center',
                                        fontWeight: '600'
                                    }}>
                                        비용 부담: {example.cost}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.ValueDistribution = ValueDistribution;
