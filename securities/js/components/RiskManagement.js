function RiskManagement() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-calculator',
            title: 'VaR 실시간 계산',
            description: 'Value at Risk 기반 손실 한도 관리',
            details: [
                { subtitle: 'Historical VaR', content: '과거 수익률 분포를 기반으로 VaR 계산' },
                { subtitle: 'Monte Carlo VaR', content: '시뮬레이션을 통한 미래 손실 예측' },
                { subtitle: 'CVaR 분석', content: 'VaR 초과 시 평균 손실액 계산' }
            ]
        },
        {
            icon: 'fa-chart-area',
            title: '시나리오 분석',
            description: '극단 상황 시뮬레이션',
            details: [
                { subtitle: '금리 충격', content: '금리 1% 급등 시 포트폴리오 영향 분석' },
                { subtitle: '환율 급변', content: '원/달러 10% 변동 시 손익 계산' },
                { subtitle: '주가 폭락', content: 'KOSPI 10% 하락 시 손실액 추정' }
            ]
        },
        {
            icon: 'fa-gauge-high',
            title: '스트레스 테스트',
            description: '역사적 위기 상황 재현',
            details: [
                { subtitle: '2008 금융위기', content: '2008년 서브프라임 위기 시나리오 적용' },
                { subtitle: '2020 코로나', content: '코로나19 팬데믹 충격 재현' },
                { subtitle: '2011 유럽 재정위기', content: '유럽 재정위기 수준 충격 시뮬레이션' }
            ]
        },
        {
            icon: 'fa-balance-scale',
            title: '한도 관리',
            description: '종목별, 섹터별 투자 한도 설정',
            details: [
                { subtitle: '종목별 한도', content: '단일 종목 투자 비중을 전체 자산의 10% 이내로 제한' },
                { subtitle: '섹터별 한도', content: 'IT, 금융 등 특정 업종 집중을 30% 이내로 제한' },
                { subtitle: '자동 경고', content: '한도 초과 시 즉시 알림 및 매수 차단' }
            ]
        },
        {
            icon: 'fa-users',
            title: '거래상대방 리스크',
            description: 'Counterparty Risk 관리',
            details: [
                { subtitle: '신용등급 모니터링', content: '거래 상대방의 신용등급 변동 실시간 추적' },
                { subtitle: '익스포저 한도', content: '단일 거래상대방 노출 한도 설정' },
                { subtitle: '담보 관리', content: '담보 가치 하락 시 추가 담보 요청 자동화' }
            ]
        },
        {
            icon: 'fa-bell',
            title: '조기 경보 시스템',
            description: 'AI 기반 위험 징후 탐지',
            details: [
                { subtitle: '변동성 급증', content: '일일 변동성이 30일 평균 대비 2배 초과 시 경고' },
                { subtitle: '유동성 위기', content: '매도 호가 부족 등 유동성 저하 징후 탐지' },
                { subtitle: '상관관계 변화', content: '포트폴리오 내 자산 간 상관관계 급변 시 알림' }
            ]
        }
    ];

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 gap-6">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        {...feature}
                        expanded={expandedCard === index}
                        onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
                    />
                ))}
            </div>
        </div>
    );
}

window.RiskManagement = RiskManagement;
