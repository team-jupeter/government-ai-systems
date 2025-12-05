// ============================================
// Overview 컴포넌트 - 개요 탭
// FPGA 가속 자율 시장 시스템 소개
// ============================================

function Overview() {
    const StatCard = window.StatCard || (() => null);
    const ServiceCard = window.ServiceCard || (() => null);

    return (
        <div>
            {/* 시스템 소개 */}
            <div className="section">
                <div style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                        <i className="fas fa-microchip"></i> FPGA 가속 자율 시장 시스템
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.95 }}>
                        OpenHash 기반의 차세대 전자상거래 플랫폼으로, 
                        <strong> FPGA 하드웨어 가속</strong>을 통해 초당 730만 건의 거래를 처리하며, 
                        소비자 데이터를 수집하지 않는 <strong>프라이버시 보호형 아키텍처</strong>로 
                        GDPR 등 글로벌 규제를 완벽하게 준수합니다.
                    </p>
                </div>

                {/* 주요 통계 */}
                <div className="grid grid-4">
                    <StatCard
                        title="초당 거래 처리"
                        value="7.3M"
                        unit="TPS"
                        icon="fa-bolt"
                        type="primary"
                        trend="up"
                        trendValue="기존 대비 29-146배"
                    />
                    <StatCard
                        title="전력 절감"
                        value="88.6"
                        unit="%"
                        icon="fa-leaf"
                        type="success"
                        trend="up"
                        trendValue="블록체인 대비"
                    />
                    <StatCard
                        title="지연 시간"
                        value="<100"
                        unit="ms"
                        icon="fa-clock"
                        type="warning"
                        trend="down"
                        trendValue="실시간 처리"
                    />
                    <StatCard
                        title="프라이버시 보호"
                        value="100"
                        unit="%"
                        icon="fa-shield-alt"
                        type="success"
                        trend="up"
                        trendValue="소비자 데이터 무수집"
                    />
                </div>
            </div>

            {/* 핵심 기술 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-cogs"></i>
                    <h2>핵심 기술</h2>
                </div>

                <div className="grid grid-2">
                    <ServiceCard
                        icon="⚡"
                        title="FPGA 하드웨어 가속"
                        description="소프트웨어/GPU 기반 시스템과 차별화된 병렬 처리 성능"
                        badge="7.3M TPS"
                        items={[
                            '초당 730만 건 거래 처리 (기존 대비 29-146배)',
                            '100ms 이하 초저지연 실시간 처리',
                            '88.6% 전력 절감 (블록체인 대비)',
                            'AWS EC2 환경에서 실증 완료'
                        ]}
                    />
                    <ServiceCard
                        icon="🛡️"
                        title="판매자 이력 전용 아키텍처"
                        description="소비자 데이터를 수집하지 않는 프라이버시 보호형 설계"
                        badge="GDPR 준수"
                        items={[
                            '소비자 개인정보 무수집 (GDPR 완벽 준수)',
                            '판매자 거래 이력만으로 수요 예측',
                            '차분 프라이버시 적용 (ε≤0.1)',
                            '개인정보보호 규제 원천 대응'
                        ]}
                    />
                    <ServiceCard
                        icon="🌍"
                        title="7계층 글로벌 분산 신뢰"
                        description="읍면동부터 글로벌까지 확장 가능한 물리적 분산 구조"
                        badge="확장성"
                        items={[
                            '읍면동 → 시군구 → 광역시도 → 국가 → 대륙 → 글로벌',
                            '확률적 계층 선택 알고리즘 (카이제곱 검정)',
                            '물리적 데이터 주권 구현',
                            '5단계 재해복구 시스템 (98% 성공률)'
                        ]}
                    />
                    <ServiceCard
                        icon="🤖"
                        title="AI 자율 운영 시스템"
                        description="인간 개입 없이 시장 기능 자체 운영"
                        badge="완전 자동화"
                        items={[
                            'CNN + LSTM + Vision Transformer 다중 검증',
                            '실시간 다차원 신용평가 (500ms)',
                            '100개 언어 자동번역 및 규격 통합',
                            '7개 특화 AI 에이전트 협업'
                        ]}
                    />
                </div>
            </div>

            {/* OpenHash 기술 우위 */}
            <div className="section">
                <div className="section-header">
                    <i className="fas fa-crown"></i>
                    <h2>OpenHash 기술 우위</h2>
                </div>

                <div className="grid grid-4">
                    {[
                        {
                            metric: '처리 성능',
                            value: '7.3M TPS',
                            desc: '블록체인 대비 146배',
                            icon: '⚡',
                            color: 'var(--primary-50)'
                        },
                        {
                            metric: '에너지 효율',
                            value: '88.6%',
                            desc: '전력 절감',
                            icon: '🌱',
                            color: 'var(--success-50)'
                        },
                        {
                            metric: '비용 절감',
                            value: '99%',
                            desc: '블록체인 대비',
                            icon: '💰',
                            color: 'var(--warning-50)'
                        },
                        {
                            metric: '프라이버시',
                            value: '100%',
                            desc: '소비자 데이터 무수집',
                            icon: '🔒',
                            color: 'var(--success-50)'
                        }
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: '24px',
                            background: 'white',
                            border: `2px solid ${item.color}`,
                            borderRadius: '12px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gray-90)', marginBottom: '8px' }}>
                                {item.metric}
                            </h3>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: item.color, marginBottom: '8px' }}>
                                {item.value}
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--gray-70)' }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

window.Overview = Overview;
