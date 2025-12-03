function PortfolioMgmt() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-chart-pie',
            title: '자산 배분 최적화',
            description: 'MPT 기반 포트폴리오 구성',
            details: [
                { subtitle: 'Markowitz 모델', content: '효율적 투자선 상의 최적 포트폴리오 산출' },
                { subtitle: '위험 허용도', content: '투자자의 리스크 성향에 맞춘 자산 배분' },
                { subtitle: '분산 투자', content: '주식, 채권, 대체투자 등 자산군 간 분산' }
            ]
        },
        {
            icon: 'fa-sync',
            title: '자동 리밸런싱',
            description: '목표 비중 유지 자동화',
            details: [
                { subtitle: '주기적 리밸런싱', content: '매월 목표 비중 대비 편차 확인 및 조정' },
                { subtitle: '임계치 리밸런싱', content: '비중이 5% 이상 벗어나면 즉시 조정' },
                { subtitle: '세금 고려', content: '양도소득세를 최소화하는 리밸런싱 전략' }
            ]
        },
        {
            icon: 'fa-shield-halved',
            title: '리스크 관리',
            description: 'VaR, CVaR 기반 리스크 통제',
            details: [
                { subtitle: 'VaR 모니터링', content: '99% 신뢰수준의 최대 손실액 일일 계산' },
                { subtitle: 'CVaR 분석', content: 'VaR 초과 시 평균 손실액 계산' },
                { subtitle: '시나리오 분석', content: '금리 급등, 환율 급변 등 극단 상황 시뮬레이션' }
            ]
        },
        {
            icon: 'fa-trophy',
            title: '성과 평가',
            description: 'Sharpe Ratio 기반 수익성 평가',
            details: [
                { subtitle: 'Sharpe Ratio', content: '위험 대비 초과 수익률 계산' },
                { subtitle: '벤치마크 비교', content: 'KOSPI, KOSDAQ 대비 성과 비교' },
                { subtitle: '기여도 분석', content: '종목별 포트폴리오 수익 기여도 분석' }
            ]
        },
        {
            icon: 'fa-money-bill-trend-up',
            title: '배당 최적화',
            description: '배당 수익 극대화 전략',
            details: [
                { subtitle: '배당 캘린더', content: '배당 지급일 기준 최적 매수·매도 시점 제안' },
                { subtitle: '배당수익률 분석', content: '연 배당수익률 3% 이상 종목 자동 선별' },
                { subtitle: '재투자 전략', content: '받은 배당금을 자동으로 재투자' }
            ]
        },
        {
            icon: 'fa-chart-area',
            title: '목표 기반 투자',
            description: '생애 목표별 포트폴리오',
            details: [
                { subtitle: '은퇴 자금', content: '은퇴 시점까지 필요 자금 역산하여 포트폴리오 구성' },
                { subtitle: '주택 구입', content: '목표 시점과 금액에 맞춘 안전 자산 중심 배분' },
                { subtitle: '자녀 교육', content: '교육비 지출 시점을 고려한 단계별 전략' }
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

window.PortfolioMgmt = PortfolioMgmt;
