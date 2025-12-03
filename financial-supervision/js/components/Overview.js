// ============================================
// Overview 컴포넌트 - 개요 탭
// 금융감독기구 시스템 소개 및 주요 통계
// ============================================

function Overview() {
    // 공통 컴포넌트 로드 확인
    React.useEffect(() => {
        const loadCommonComponents = () => {
            if (!window.StatCard || !window.ServiceCard) {
                const script1 = document.createElement('script');
                script1.src = 'js/common/StatCard.js';
                script1.type = 'text/babel';
                document.body.appendChild(script1);
                
                const script2 = document.createElement('script');
                script2.src = 'js/common/ServiceCard.js';
                script2.type = 'text/babel';
                document.body.appendChild(script2);
            }
        };
        loadCommonComponents();
    }, []);

    const StatCard = window.StatCard || (() => null);
    const ServiceCard = window.ServiceCard || (() => null);

    return (
        <div>
            {/* 시스템 소개 섹션 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-info-circle"></i>
                    <h2>금융감독기구 AI 자동화 시스템</h2>
                </div>
                
                <div style={{ 
                    padding: '24px',
                    background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '24px'
                }}>
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: '700',
                        marginBottom: '16px'
                    }}>
                        OpenHash 기반 실시간 금융감독
                    </h3>
                    <p style={{ 
                        fontSize: '16px', 
                        lineHeight: '1.8',
                        opacity: 0.95
                    }}>
                        한국의 모든 금융거래를 OpenHash 분산원장에 기록하고, AI 멀티에이전트 시스템으로
                        <strong style={{ fontWeight: '700' }}> 실시간 이상거래 탐지, 건전성 검사, 규제 준수 모니터링</strong>을 
                        완전 자동화합니다. 금융위원회, 금융감독원, 한국은행, 예금보험공사가 통합 운영합니다.
                    </p>
                </div>

                {/* 주요 통계 */}
                <div className="grid grid-4" style={{ marginBottom: '24px' }}>
                    <StatCard
                        title="일일 거래 감시"
                        value="2,847"
                        unit="만 건"
                        icon="fas fa-eye"
                        trend="up"
                        trendValue="+12.5%"
                        type="primary"
                    />
                    <StatCard
                        title="이상거래 탐지"
                        value="347"
                        unit="건"
                        icon="fas fa-exclamation-triangle"
                        trend="down"
                        trendValue="-8.3%"
                        type="warning"
                    />
                    <StatCard
                        title="자동 조치 완료"
                        value="98.7"
                        unit="%"
                        icon="fas fa-check-circle"
                        trend="up"
                        trendValue="+2.1%"
                        type="success"
                    />
                    <StatCard
                        title="처리 시간"
                        value="0.3"
                        unit="초"
                        icon="fas fa-clock"
                        trend="down"
                        trendValue="-45%"
                        type="primary"
                    />
                </div>

                <div style={{
                    padding: '20px',
                    background: 'var(--gray-5)',
                    borderRadius: '8px',
                    borderLeft: '4px solid var(--success-50)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <i className="fas fa-shield-alt" style={{ 
                            fontSize: '24px', 
                            color: 'var(--success-50)' 
                        }}></i>
                        <div>
                            <strong style={{ fontSize: '16px', color: 'var(--gray-90)' }}>
                                OpenHash 무결성 보장
                            </strong>
                            <p style={{ 
                                fontSize: '14px', 
                                color: 'var(--gray-70)',
                                marginTop: '4px'
                            }}>
                                모든 금융거래 데이터는 위변조 불가능한 OpenHash에 기록되어 
                                감독기구가 실시간으로 수집·분석합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 기능 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-cogs"></i>
                    <h2>핵심 감독 기능</h2>
                </div>

                <div className="grid grid-3">
                    <ServiceCard
                        icon="📊"
                        title="실시간 거래 감독"
                        description="은행, 증권, 보험의 모든 거래를 실시간으로 수집하고 분석합니다."
                        badge="24/7"
                        items={[
                            { title: '거래 수집', desc: 'OpenHash에서 초당 10만 건 수집' },
                            { title: '패턴 분석', desc: 'AI가 정상/비정상 패턴 자동 분류' },
                            { title: '즉시 알림', desc: '의심거래 0.1초 내 알림' }
                        ]}
                    />
                    <ServiceCard
                        icon="🔍"
                        title="이상거래 탐지"
                        description="딥러닝 모델로 자금세탁, 불공정거래, 사기를 자동 탐지합니다."
                        badge="AI 기반"
                        items={[
                            { title: 'Isolation Forest', desc: '이상치 탐지 (정확도 99.2%)' },
                            { title: 'Graph Neural Network', desc: '자금 흐름 네트워크 분석' },
                            { title: 'LSTM', desc: '시계열 패턴 예측' }
                        ]}
                    />
                    <ServiceCard
                        icon="✅"
                        title="건전성 검사"
                        description="금융기관의 재무건전성을 실시간으로 평가하고 리스크를 조기 경보합니다."
                        badge="자동화"
                        items={[
                            { title: 'BIS 자기자본비율', desc: '실시간 계산 및 모니터링' },
                            { title: 'NPL 비율', desc: '부실채권 추이 분석' },
                            { title: '유동성 비율', desc: 'LCR/NSFR 자동 검사' }
                        ]}
                    />
                    <ServiceCard
                        icon="⚖️"
                        title="규제 준수"
                        description="금융 관련 법률 준수 여부를 LLM이 자동으로 검증합니다."
                        badge="LLM"
                        items={[
                            { title: '자본시장법', desc: '불공정거래 행위 자동 탐지' },
                            { title: '은행법', desc: '대출 규제 준수 여부 검사' },
                            { title: '보험업법', desc: '보험 상품 규제 적합성 검증' }
                        ]}
                    />
                    <ServiceCard
                        icon="⚠️"
                        title="리스크 관리"
                        description="시스템 리스크를 조기에 감지하고 자동으로 대응합니다."
                        badge="실시간"
                        items={[
                            { title: '신용 리스크', desc: '부도 확률 예측 모델' },
                            { title: '시장 리스크', desc: 'VaR 실시간 계산' },
                            { title: '유동성 리스크', desc: '현금흐름 시뮬레이션' }
                        ]}
                    />
                    <ServiceCard
                        icon="📝"
                        title="보고서 자동 생성"
                        description="감독 결과를 자동으로 분석하고 보고서를 작성합니다."
                        badge="AI 작성"
                        items={[
                            { title: '일일 감독 보고서', desc: '매일 자동 생성 및 배포' },
                            { title: '월간 통계 보고서', desc: '트렌드 분석 포함' },
                            { title: '특별 검사 보고서', desc: '이슈 발생 시 즉시 생성' }
                        ]}
                    />
                </div>
            </div>

            {/* 기술 우위 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-trophy"></i>
                    <h2>OpenHash 기술 우위</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px'
                }}>
                    {[
                        { 
                            title: '에너지 효율', 
                            value: '98.5%', 
                            desc: '블록체인 대비 에너지 절감',
                            icon: 'fa-leaf',
                            color: 'var(--success-50)'
                        },
                        { 
                            title: '처리 속도', 
                            value: '500K', 
                            desc: 'TPS (초당 거래 처리)',
                            icon: 'fa-bolt',
                            color: 'var(--primary-50)'
                        },
                        { 
                            title: '비용 절감', 
                            value: '99%', 
                            desc: '통신 비용 절감',
                            icon: 'fa-won-sign',
                            color: 'var(--warning-50)'
                        },
                        { 
                            title: '격리 속도', 
                            value: '5ms', 
                            desc: '오염 노드 즉시 격리',
                            icon: 'fa-shield-alt',
                            color: 'var(--error-50)'
                        }
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: '20px',
                            background: 'white',
                            border: '1px solid var(--gray-20)',
                            borderRadius: '8px',
                            borderLeft: `4px solid ${item.color}`,
                            textAlign: 'center'
                        }}>
                            <i className={`fas ${item.icon}`} style={{
                                fontSize: '32px',
                                color: item.color,
                                marginBottom: '12px'
                            }}></i>
                            <div style={{
                                fontSize: '36px',
                                fontWeight: '700',
                                color: item.color,
                                marginBottom: '8px'
                            }}>
                                {item.value}
                            </div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                color: 'var(--gray-90)',
                                marginBottom: '4px'
                            }}>
                                {item.title}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: 'var(--gray-70)'
                            }}>
                                {item.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.Overview = Overview;
