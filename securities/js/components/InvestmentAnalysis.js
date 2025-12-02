function InvestmentAnalysis() {
    const stats = [
        {
            icon: 'fa-file-alt',
            title: '일일 리포트 생성',
            value: '3,200',
            unit: '건',
            trend: 42,
            description: 'AI 자동 분석 리포트',
            color: 'sec-blue'
        },
        {
            icon: 'fa-bullseye',
            title: '예측 정확도',
            value: '87.3',
            unit: '%',
            trend: 6,
            description: '가격 방향 예측',
            color: 'sec-green'
        },
        {
            icon: 'fa-clock',
            title: '분석 시간',
            value: '3.5',
            unit: '분',
            trend: -78,
            description: '종목 당 분석 시간',
            color: 'sec-gold'
        },
        {
            icon: 'fa-chart-pie',
            title: '커버리지',
            value: '2,500',
            unit: '종목',
            trend: 25,
            description: '실시간 모니터링',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-calculator',
            title: '기본적 분석 (Fundamental)',
            description: '재무제표 기반 기업 가치 자동 평가',
            details: [
                '재무제표 자동 수집 및 분석 (손익계산서, 재무상태표, 현금흐름표)',
                '주요 재무비율 자동 계산 (PER, PBR, ROE, ROA, 부채비율)',
                '산업 내 동종업계 비교 분석 (Peer Comparison)',
                'DCF, DDM, EV/EBITDA 등 기업 가치 평가 모델',
                'ESG 평가 및 지속가능성 분석',
                '경영진 평가 및 지배구조 분석'
            ],
            benefits: [
                '분석 시간 95% 단축',
                '객관적 평가',
                '일관성 유지',
                '실수 제로'
            ],
            technologies: ['Financial Statement Analysis', 'DCF Model', 'Peer Analysis', 'ESG Rating', 'NLP']
        },
        {
            icon: 'fa-chart-line',
            title: '기술적 분석 (Technical)',
            description: 'AI 기반 차트 패턴 인식 및 예측',
            details: [
                '100+ 차트 패턴 자동 인식 (Head & Shoulders, Cup & Handle 등)',
                '이동평균선, 볼린저밴드, MACD 등 보조지표 자동 계산',
                '지지선/저항선 자동 식별 및 업데이트',
                '캔들 패턴 분석 (Doji, Hammer, Engulfing 등)',
                '단기/중기/장기 추세 자동 판단',
                '매매 시그널 자동 생성 및 알림'
            ],
            benefits: [
                '패턴 인식 99% 정확도',
                '실시간 신호',
                '24/7 모니터링',
                '감정 배제'
            ],
            technologies: ['Computer Vision', 'Pattern Recognition', 'CNN', 'Technical Indicators', 'Signal Processing']
        },
        {
            icon: 'fa-flask',
            title: '정량적 분석 (Quantitative)',
            description: '통계 모델 기반 가격 예측 및 전략',
            details: [
                '시계열 분석을 통한 가격 예측 (ARIMA, GARCH)',
                '머신러닝 기반 수익률 예측 (Random Forest, XGBoost)',
                '팩터 모델을 활용한 리스크 분석 (Fama-French)',
                '페어 트레이딩 및 통계적 차익거래',
                '포트폴리오 최적화 (Mean-Variance, Black-Litterman)',
                '백테스팅 및 성과 평가 자동화'
            ],
            benefits: [
                '예측 정확도 87%',
                '리스크 조정 수익',
                '전략 검증',
                'Sharpe 2.1 달성'
            ],
            technologies: ['Time Series', 'ARIMA', 'GARCH', 'Random Forest', 'Factor Models', 'Monte Carlo']
        },
        {
            icon: 'fa-building',
            title: '산업 분석',
            description: '섹터별 동향 및 경쟁 구도 분석',
            details: [
                '11개 GICS 섹터별 실시간 모니터링',
                '산업 생애주기 단계 자동 분류',
                '경쟁사 비교 분석 및 시장 점유율',
                '공급망 분석 및 리스크 평가',
                '규제 변화 영향 분석',
                '기술 트렌드 및 혁신 추적'
            ],
            benefits: [
                '섹터 로테이션 전략',
                '선제적 대응',
                '리스크 회피',
                '알파 창출'
            ],
            technologies: ['Industry Analysis', 'Porter Five Forces', 'SWOT', 'Supply Chain Analysis', 'Technology Trend']
        },
        {
            icon: 'fa-newspaper',
            title: '뉴스/감성 분석',
            description: 'AI 기반 뉴스 및 소셜 미디어 감성 분석',
            details: [
                '국내외 주요 뉴스 실시간 수집 및 분류',
                '자연어 처리를 통한 감성 점수 산출 (-1 ~ +1)',
                '뉴스 중요도 자동 평가 및 우선순위 부여',
                '소셜 미디어 감성 지표 생성 (트위터, 레딧 등)',
                '이벤트 기반 시장 반응 예측',
                '루머 및 가짜 뉴스 필터링'
            ],
            benefits: [
                '시장 반응 선제 예측',
                '리스크 조기 경보',
                '투자 타이밍 최적화',
                '정보 우위'
            ],
            technologies: ['NLP', 'Sentiment Analysis', 'BERT', 'Topic Modeling', 'Event Study', 'Fake News Detection']
        },
        {
            icon: 'fa-file-pdf',
            title: 'AI 리포트 자동 생성',
            description: '전문가 수준의 투자 리포트 자동 작성',
            details: [
                'Investment Summary 자동 생성',
                '재무 분석 및 밸류에이션 자동 작성',
                '차트 및 표 자동 삽입',
                'SWOT 분석 자동 생성',
                '투자 의견 (Buy/Hold/Sell) 및 목표가 제시',
                'PDF/PPT 형식 자동 변환'
            ],
            benefits: [
                '작성 시간 90% 단축',
                '일관된 품질',
                '실시간 업데이트',
                '다국어 지원'
            ],
            technologies: ['GPT-4', 'Document Generation', 'Template Engine', 'Data Visualization', 'LaTeX', 'Markdown']
        }
    ];

    const accuracyData = [
        { name: '기본적', value: 82 },
        { name: '기술적', value: 85 },
        { name: '정량적', value: 87 },
        { name: '감성', value: 79 },
        { name: '통합', value: 91 }
    ];

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    AI 투자 분석 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    다각도 분석으로 최적의 투자 인사이트 제공
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            {/* Accuracy Chart */}
            <ComparisonChart 
                type="bar"
                data={accuracyData}
                title="분석 방법별 예측 정확도"
                description="각 분석 기법의 가격 방향 예측 정확도 비교 (%)"
            />

            {/* Features Grid */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-magnifying-glass-chart text-sec-blue"></i>
                    투자 분석 핵심 기능
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
