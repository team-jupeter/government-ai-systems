function PortfolioMgmt() {
    const stats = [
        {
            icon: 'fa-wallet',
            title: '운용 자산',
            value: '48.5',
            unit: '조원',
            trend: 12,
            description: '전체 고객 자산',
            color: 'sec-blue'
        },
        {
            icon: 'fa-chart-line',
            title: '평균 수익률',
            value: '14.2',
            unit: '%',
            trend: 3,
            description: '연평균 수익률',
            color: 'sec-green'
        },
        {
            icon: 'fa-users',
            title: '관리 고객',
            value: '125,000',
            unit: '명',
            trend: 18,
            description: '랩어카운트 고객',
            color: 'sec-gold'
        },
        {
            icon: 'fa-sync-alt',
            title: '리밸런싱',
            value: '8,500',
            unit: '건/월',
            trend: 22,
            description: '자동 리밸런싱',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-chart-pie',
            title: '자산 배분 최적화',
            description: 'AI 기반 최적 포트폴리오 구성',
            details: [
                'Mean-Variance 최적화 (Markowitz)',
                'Black-Litterman 모델 적용',
                '리스크 패리티 전략',
                '목표 기반 자산 배분 (Goal-Based)',
                '동적 자산 배분 (Tactical Asset Allocation)',
                '제약 조건 최적화 (투자 한도, 섹터 제한 등)'
            ],
            benefits: [
                'Sharpe Ratio 1.8 달성',
                '변동성 30% 감소',
                '목표 수익률 달성',
                '리스크 최소화'
            ],
            technologies: ['Modern Portfolio Theory', 'Quadratic Programming', 'Monte Carlo', 'Optimization', 'Convex']
        },
        {
            icon: 'fa-balance-scale',
            title: '자동 리밸런싱',
            description: '목표 비중 유지 자동 매매',
            details: [
                '임계값 기반 리밸런싱 (Threshold Rebalancing)',
                '주기적 리밸런싱 (월/분기/년)',
                '세금 최적화 리밸런싱 (Tax-Loss Harvesting)',
                '거래 비용 최소화 알고리즘',
                '시장 충격 고려 점진적 실행',
                '리밸런싱 필요성 자동 감지 및 알림'
            ],
            benefits: [
                '관리 비용 70% 절감',
                '세금 효율 25% 향상',
                '일관된 리스크',
                '완전 자동화'
            ],
            technologies: ['Rebalancing Algorithm', 'Tax Optimization', 'Transaction Cost Analysis', 'Drift Monitoring']
        },
        {
            icon: 'fa-crown',
            title: '랩어카운트 관리',
            description: '일임형 종합자산관리 서비스',
            details: [
                '고객별 투자 전략 자동 수립',
                '투자 성향 기반 맞춤 포트폴리오',
                '실시간 성과 모니터링 및 리포팅',
                '세금 및 수수료 최적화',
                '정기 상담 자동 스케줄링',
                '규제 준수 자동 검사'
            ],
            benefits: [
                'AUM 45% 증가',
                '고객 만족도 4.8/5.0',
                '이탈률 60% 감소',
                '운용 효율 3배'
            ],
            technologies: ['Wrap Account System', 'Client Portal', 'Performance Attribution', 'Compliance Check']
        },
        {
            icon: 'fa-coins',
            title: '펀드 운용 지원',
            description: '뮤추얼펀드 및 ETF 운용 자동화',
            details: [
                '펀드 운용 전략 자동 실행',
                '유니버스 관리 및 종목 선정',
                '포트폴리오 구성 최적화',
                '매매 체결 및 정산 자동화',
                '성과 귀속 분석 (Performance Attribution)',
                '규제 보고서 자동 생성'
            ],
            benefits: [
                '운용 시간 80% 단축',
                '추적 오차 최소화',
                '규제 완벽 준수',
                '투명성 확보'
            ],
            technologies: ['Fund Management', 'Universe Management', 'Order Management', 'NAV Calculation']
        },
        {
            icon: 'fa-layer-group',
            title: '성과 귀속 분석',
            description: '수익률 분해 및 기여도 분석',
            details: [
                'Brinson 모델 기반 성과 귀속',
                '자산 배분 효과 vs 종목 선택 효과',
                '섹터별/종목별 기여도 분석',
                '벤치마크 대비 초과 수익 분석',
                '리스크 조정 성과 측정 (Sharpe, Sortino)',
                '시각화 리포트 자동 생성'
            ],
            benefits: [
                '운용 전략 개선',
                '투명한 성과 평가',
                '고객 신뢰 강화',
                '데이터 기반 의사결정'
            ],
            technologies: ['Brinson Model', 'Performance Attribution', 'Risk-Adjusted Return', 'Benchmark Analysis']
        },
        {
            icon: 'fa-bullseye',
            title: '투자 목표 추적',
            description: '고객 목표 달성률 실시간 모니터링',
            details: [
                '목표 수익률 설정 및 추적',
                '목표 달성 확률 Monte Carlo 시뮬레이션',
                '중간 목표 달성 진행률 시각화',
                '목표 미달 시 전략 조정 제안',
                '라이프 이벤트 연동 (은퇴, 주택 구매 등)',
                '정기 점검 및 피드백 자동화'
            ],
            benefits: [
                '목표 달성률 85%',
                '고객 만족도 향상',
                '장기 투자 유도',
                '충성도 강화'
            ],
            technologies: ['Goal-Based Investing', 'Monte Carlo Simulation', 'Life Cycle Planning', 'Financial Planning']
        }
    ];

    const allocationData = [
        { name: '국내주식', value: 35 },
        { name: '해외주식', value: 25 },
        { name: '채권', value: 20 },
        { name: '대체투자', value: 15 },
        { name: '현금', value: 5 }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    포트폴리오 관리 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    AI 기반 최적 자산 배분 및 자동 리밸런싱
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <ComparisonChart 
                type="pie"
                data={allocationData}
                title="표준 자산 배분"
                description="모델 포트폴리오 자산 배분 비중"
            />

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-briefcase text-sec-blue"></i>
                    포트폴리오 관리 핵심 기능
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                        <FeatureCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
