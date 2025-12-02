function RiskManagement() {
    const stats = [
        {
            icon: 'fa-shield-halved',
            title: '평균 VaR',
            value: '2.3',
            unit: '%',
            trend: -15,
            description: '일일 최대 손실 예상',
            color: 'sec-blue'
        },
        {
            icon: 'fa-exclamation-triangle',
            title: '리스크 알림',
            value: '145',
            unit: '건/일',
            trend: -28,
            description: '실시간 리스크 경보',
            color: 'sec-green'
        },
        {
            icon: 'fa-check-circle',
            title: '한도 준수율',
            value: '99.8',
            unit: '%',
            trend: 1,
            description: '투자 한도 준수',
            color: 'sec-gold'
        },
        {
            icon: 'fa-chart-area',
            title: '스트레스 테스트',
            value: '24',
            unit: '시나리오',
            trend: 12,
            description: '월간 스트레스 테스트',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-chart-line',
            title: '시장 리스크 (VaR)',
            description: 'Value at Risk 실시간 계산 및 모니터링',
            details: [
                'Historical VaR, Parametric VaR, Monte Carlo VaR',
                '99%, 95% 신뢰 수준 동시 계산',
                '1일, 10일, 30일 보유 기간별 VaR',
                '종목별, 포트폴리오별, 계좌별 VaR',
                '델타, 감마, 베가 등 Greeks 실시간 계산',
                'VaR 백테스팅 및 검증'
            ],
            benefits: [
                '예측 정확도 95%',
                '실시간 모니터링',
                '조기 경보',
                '규제 완벽 준수'
            ],
            technologies: ['Monte Carlo', 'Historical Simulation', 'GARCH', 'Copula', 'Greeks']
        },
        {
            icon: 'fa-user-shield',
            title: '신용 리스크',
            description: '거래 상대방 신용 위험 관리',
            details: [
                '고객 신용등급 실시간 모니터링',
                '익스포저 한도 자동 관리',
                '담보 가치 평가 및 마진콜',
                '신용 이벤트 조기 경보 시스템',
                '부도 확률(PD) 예측 모델',
                '신용 스프레드 실시간 추적'
            ],
            benefits: [
                '부실채권 70% 감소',
                '조기 경보',
                '손실 최소화',
                '자동 대응'
            ],
            technologies: ['Credit Scoring', 'PD Model', 'LGD Model', 'EAD Model', 'Credit VaR']
        },
        {
            icon: 'fa-cogs',
            title: '운영 리스크',
            description: '시스템 장애 및 운영 오류 관리',
            details: [
                '시스템 가동률 실시간 모니터링',
                '거래 오류 자동 탐지 및 교정',
                '백업 시스템 자동 전환',
                '재해 복구 훈련 자동화',
                '사이버 공격 탐지 및 대응',
                '내부 통제 자동 검증'
            ],
            benefits: [
                '가동률 99.99%',
                '오류율 0.01%',
                '복구 시간 3분',
                '무손실 운영'
            ],
            technologies: ['Anomaly Detection', 'Failover', 'DR System', 'SIEM', 'Intrusion Detection']
        },
        {
            icon: 'fa-water',
            title: '유동성 리스크',
            description: '시장 유동성 및 자금 유동성 관리',
            details: [
                '일중 유동성 포지션 실시간 추적',
                'Bid-Ask 스프레드 모니터링',
                '거래량 대비 포지션 크기 분석',
                '유동성 위기 시나리오 시뮬레이션',
                '긴급 자금 조달 계획 수립',
                '유동성 커버리지 비율(LCR) 관리'
            ],
            benefits: [
                '유동성 위기 제로',
                '자금 효율 25% 향상',
                '조달 비용 절감',
                '규제 준수'
            ],
            technologies: ['Liquidity Gap Analysis', 'Cash Flow Forecasting', 'LCR', 'NSFR', 'Stress Testing']
        },
        {
            icon: 'fa-bolt',
            title: '스트레스 테스트',
            description: '극단적 시장 시나리오 영향 분석',
            details: [
                '역사적 위기 시나리오 재현 (2008, 2020 등)',
                '가상 시나리오 설계 (금리 급등, 폭락 등)',
                '역 스트레스 테스트 (포트폴리오 붕괴 시나리오)',
                '복합 시나리오 분석 (시장+신용 동시 발생)',
                '월간 정기 스트레스 테스트',
                '규제 요구 시나리오 자동 실행'
            ],
            benefits: [
                '위기 대응력 강화',
                '자본 적정성 확보',
                '규제 완벽 준수',
                '투자자 신뢰'
            ],
            technologies: ['Scenario Analysis', 'Reverse Stress Test', 'Historical Simulation', 'Extreme Value Theory']
        },
        {
            icon: 'fa-sliders-h',
            title: '리스크 한도 관리',
            description: '투자 한도 실시간 모니터링 및 통제',
            details: [
                '종목별, 섹터별, 국가별 투자 한도',
                '신용등급별 익스포저 한도',
                '레버리지 비율 자동 관리',
                '집중 리스크 한도 (Top 10 등)',
                '한도 초과 시 자동 알림 및 매도',
                '사전 체크 시스템 (Pre-trade Check)'
            ],
            benefits: [
                '한도 위반 제로',
                '분산 투자 강제',
                '리스크 통제',
                '규제 준수'
            ],
            technologies: ['Limit Management', 'Pre-trade Check', 'Concentration Risk', 'Leverage Monitoring']
        }
    ];

    const riskData = [
        { name: '시장', value: 45 },
        { name: '신용', value: 25 },
        { name: '운영', value: 15 },
        { name: '유동성', value: 10 },
        { name: '기타', value: 5 }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    리스크 관리 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    실시간 위험 감지 및 선제적 대응 체계
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <ComparisonChart 
                type="pie"
                data={riskData}
                title="리스크 유형별 분포"
                description="전체 리스크 포트폴리오 구성 비중"
            />

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-shield-halved text-sec-blue"></i>
                    리스크 관리 핵심 기능
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
