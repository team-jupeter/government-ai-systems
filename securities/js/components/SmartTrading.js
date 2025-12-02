function SmartTrading() {
    const stats = [
        {
            icon: 'fa-rocket',
            title: '일일 거래량',
            value: '2.4',
            unit: '조원',
            trend: 18,
            description: 'AI 자동 매매 처리',
            color: 'sec-blue'
        },
        {
            icon: 'fa-clock',
            title: '체결 속도',
            value: '0.8',
            unit: 'ms',
            trend: -67,
            description: '평균 주문 체결 시간',
            color: 'sec-green'
        },
        {
            icon: 'fa-chart-line',
            title: '알고리즘 정확도',
            value: '94.5',
            unit: '%',
            trend: 5,
            description: '가격 예측 정확도',
            color: 'sec-gold'
        },
        {
            icon: 'fa-coins',
            title: '거래 비용 절감',
            value: '58',
            unit: '%',
            trend: 12,
            description: '수수료 및 슬리피지',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-brain',
            title: '알고리즘 트레이딩',
            description: 'AI 기반 자동 매매 전략 실행',
            details: [
                'VWAP, TWAP, POV 등 다양한 실행 알고리즘',
                '강화학습 기반 최적 실행 전략',
                '시장 충격 최소화 스마트 주문 분할',
                '다중 거래소 동시 체결 최적화',
                '실시간 시장 미세구조 분석',
                '슬리피지 예측 및 최소화'
            ],
            benefits: [
                '체결 속도 90% 향상',
                '거래 비용 58% 절감',
                '시장 충격 75% 감소',
                '실행 품질 95% 이상'
            ],
            technologies: ['Reinforcement Learning', 'Deep Q-Network', 'LSTM', 'Market Microstructure', 'Order Book Analysis']
        },
        {
            icon: 'fa-route',
            title: '주문 라우팅 최적화',
            description: '최적 거래소 선택 및 스마트 주문 분배',
            details: [
                '실시간 거래소별 유동성 분석',
                '최저 체결 비용 자동 계산',
                '스마트 오더 라우팅 (SOR) 엔진',
                '다크풀 활용 대량 주문 처리',
                'Hidden/Iceberg 주문 자동 생성',
                '거래소 장애 시 자동 우회'
            ],
            benefits: [
                '체결가 0.3% 개선',
                '수수료 40% 절감',
                '체결 성공률 99.8%',
                '익명성 보장'
            ],
            technologies: ['Smart Order Routing', 'Market Data Feed', 'FIX Protocol', 'WebSocket', 'Low Latency']
        },
        {
            icon: 'fa-robot',
            title: '시장 조성 자동화',
            description: 'AI 마켓 메이커 시스템',
            details: [
                '양방향 호가 자동 제출 및 관리',
                '스프레드 최적화 알고리즘',
                '인벤토리 리스크 자동 관리',
                '이상 체결 탐지 및 대응',
                '유동성 제공 수익 최적화',
                '시장 변동성 실시간 조정'
            ],
            benefits: [
                '스프레드 수익 35% 증가',
                '포지션 리스크 60% 감소',
                '유동성 공급 안정화',
                '24/7 자동 운영'
            ],
            technologies: ['Market Making', 'Inventory Management', 'Spread Optimization', 'Adverse Selection', 'Greeks']
        },
        {
            icon: 'fa-balance-scale',
            title: '차익거래 감지',
            description: '크로스 마켓 아비트라지 자동 실행',
            details: [
                '거래소 간 가격 차이 실시간 모니터링',
                '삼각 차익거래 기회 자동 탐지',
                'ETF vs 현물 차익거래',
                '선물-현물 베이시스 트레이딩',
                '0.5ms 이내 기회 포착 및 실행',
                '거래 비용 자동 계산 및 수익성 판단'
            ],
            benefits: [
                '무위험 수익 창출',
                '연 8% 안정적 수익',
                '시장 효율성 기여',
                '완전 자동 실행'
            ],
            technologies: ['Arbitrage Detection', 'Cross-Exchange', 'Statistical Arbitrage', 'Cointegration', 'Pairs Trading']
        },
        {
            icon: 'fa-tachometer-alt',
            title: '고빈도 거래 (HFT)',
            description: '초단타 자동 매매 시스템',
            details: [
                'FPGA 기반 초저지연 주문 처리',
                '마이크로초 단위 가격 예측',
                '틱 데이터 실시간 분석',
                '주문 플로우 독립 예측',
                '레이턴시 아비트라지 실행',
                '코로케이션 서버 최적화'
            ],
            benefits: [
                '0.3ms 주문 지연',
                '일 5,000만건 처리',
                '99.99% 정확도',
                '초단기 수익 극대화'
            ],
            technologies: ['FPGA', 'C++ Low Latency', 'Colocation', 'Direct Market Access', 'Tick Data']
        },
        {
            icon: 'fa-chart-area',
            title: '실시간 체결 모니터링',
            description: '전체 주문 생애주기 추적 및 분석',
            details: [
                '주문-체결-정산 전 과정 실시간 추적',
                '체결 품질 자동 평가 (VWAP 대비)',
                '미체결 주문 자동 관리 및 수정',
                '이상 체결 즉시 탐지 및 알림',
                '트레이딩 데스크 통합 대시보드',
                '실시간 성과 분석 및 리포팅'
            ],
            benefits: [
                '오류 탐지 시간 95% 단축',
                '체결 품질 투명성',
                '실시간 리스크 관리',
                '규제 준수 강화'
            ],
            technologies: ['Real-time Analytics', 'WebSocket', 'Event Processing', 'Grafana', 'Prometheus']
        }
    ];

    const tradingVolumeData = [
        { name: '00시', value: 120 },
        { name: '03시', value: 80 },
        { name: '06시', value: 150 },
        { name: '09시', value: 850 },
        { name: '12시', value: 920 },
        { name: '15시', value: 780 },
        { name: '18시', value: 340 },
        { name: '21시', value: 180 }
    ];

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    스마트 트레이딩 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    AI 알고리즘으로 구현하는 초고속 자동 매매 플랫폼
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            {/* Trading Volume Chart */}
            <ComparisonChart 
                type="line"
                data={tradingVolumeData}
                title="시간대별 거래량"
                description="일일 거래량 분포 (단위: 억원)"
            />

            {/* Features Grid */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-chart-line text-sec-blue"></i>
                    스마트 트레이딩 핵심 기능
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
