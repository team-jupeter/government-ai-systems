function CustomerService() {
    const stats = [
        {
            icon: 'fa-comments',
            title: '일일 상담 처리',
            value: '12,500',
            unit: '건',
            trend: 28,
            description: '24/7 자동 상담 처리',
            color: 'sec-blue'
        },
        {
            icon: 'fa-smile',
            title: '고객 만족도',
            value: '4.7',
            unit: '/5.0',
            trend: 12,
            description: 'NPS 기반 실시간 측정',
            color: 'sec-green'
        },
        {
            icon: 'fa-bolt',
            title: '평균 응답 시간',
            value: '1.8',
            unit: '초',
            trend: -45,
            description: '실시간 AI 응답',
            color: 'sec-gold'
        },
        {
            icon: 'fa-check-circle',
            title: '상담 성공률',
            value: '92',
            unit: '%',
            trend: 8,
            description: '1차 해결률',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-robot',
            title: '지능형 챗봇 상담',
            description: 'DeepSeek R1 기반 24/7 자동 고객 상담',
            details: [
                '50턴 대화 컨텍스트 유지로 복잡한 상담 처리',
                '고객 의도 분석 및 자동 분류 (26개 카테고리)',
                '감정 상태 인식 및 적응적 응답 생성',
                '금융 용어 자동 정규화 및 해석',
                '다국어 지원 (한국어, 영어, 중국어, 일본어)',
                '상담 내용 자동 요약 및 후속 조치 제안'
            ],
            benefits: [
                '응답 시간 95% 단축',
                '24/7 무중단 서비스',
                '인건비 60% 절감',
                '고객 대기 제로'
            ],
            technologies: ['DeepSeek R1', 'NLP', 'Sentiment Analysis', 'Multi-turn Dialog', 'WebSocket']
        },
        {
            icon: 'fa-user-plus',
            title: '신규 고객 온보딩',
            description: '자동화된 계좌 개설 및 KYC 프로세스',
            details: [
                'OCR 기반 신분증 자동 인식 (99.8% 정확도)',
                'OpenHash 기반 신원 확인 및 중복 검증',
                '자동 KYC/AML 검증 시스템',
                '투자 성향 자동 분석 (7단계 프로파일링)',
                '맞춤형 상품 추천 알고리즘',
                '계좌 개설 시간: 5분 → 30초'
            ],
            benefits: [
                '처리 시간 90% 단축',
                '인적 오류 제로',
                '규제 100% 준수',
                '고객 편의성 극대화'
            ],
            technologies: ['OCR', 'OpenHash', 'Face Recognition', 'AML Engine', 'Risk Profiling']
        },
        {
            icon: 'fa-chart-line',
            title: '투자 성향 분석',
            description: 'AI 기반 고객 투자 프로파일링',
            details: [
                '거래 패턴 분석을 통한 위험 선호도 측정',
                '7단계 투자 성향 자동 분류',
                '생애주기별 금융 니즈 예측',
                '시장 변동성에 따른 리스크 허용도 재평가',
                '행동 금융학 기반 편향 분석',
                '목표 수익률 달성 가능성 시뮬레이션'
            ],
            benefits: [
                '투자 성과 25% 향상',
                '고객 이탈률 40% 감소',
                '적합성 100% 준수',
                '분쟁 발생 70% 감소'
            ],
            technologies: ['Machine Learning', 'Behavioral Finance', 'Monte Carlo', 'Clustering', 'Time Series']
        },
        {
            icon: 'fa-gift',
            title: '맞춤형 상품 추천',
            description: '개인화된 금융 상품 추천 시스템',
            details: [
                '협업 필터링 기반 상품 추천',
                '고객별 관심 종목 자동 모니터링',
                '투자 목표 기반 포트폴리오 제안',
                '라이프 이벤트 감지 및 금융 조언',
                '시장 상황별 최적 상품 알림',
                '수익률 시뮬레이션 및 리스크 분석'
            ],
            benefits: [
                '상품 가입률 35% 증가',
                '크로스셀 50% 향상',
                'AUM 28% 증가',
                '고객 로열티 강화'
            ],
            technologies: ['Collaborative Filtering', 'Content-Based Filtering', 'A/B Testing', 'Reinforcement Learning']
        },
        {
            icon: 'fa-bell',
            title: '고객 이탈 방지',
            description: 'AI 기반 이탈 예측 및 선제적 대응',
            details: [
                '이탈 가능성 실시간 스코어링',
                '거래 빈도, 잔고 변화 패턴 분석',
                '고객 행동 변화 조기 감지',
                '맞춤형 리텐션 전략 자동 생성',
                '고가치 고객 우선 관리',
                '자동 혜택 제공 및 상담 연결'
            ],
            benefits: [
                '이탈률 45% 감소',
                'LTV 32% 증가',
                '재활성화율 60%',
                'ROI 8배 향상'
            ],
            technologies: ['Churn Prediction', 'Survival Analysis', 'Random Forest', 'XGBoost', 'LSTM']
        },
        {
            icon: 'fa-chart-bar',
            title: '상담 품질 모니터링',
            description: '실시간 상담 품질 관리 및 개선',
            details: [
                '상담 내용 실시간 품질 평가',
                '고객 만족도 자동 수집 및 분석',
                '상담원 개입 시점 자동 판단',
                'FAQ 자동 업데이트 및 최적화',
                '상담 스크립트 AI 개선 제안',
                '월간 품질 리포트 자동 생성'
            ],
            benefits: [
                '품질 점수 15% 향상',
                '불만 처리 시간 50% 단축',
                '재상담율 35% 감소',
                '직원 교육 비용 40% 절감'
            ],
            technologies: ['Quality Assurance', 'Text Analytics', 'Speech-to-Text', 'Sentiment Analysis', 'KPI Dashboard']
        }
    ];

    const satisfactionData = [
        { name: '1월', value: 4.2 },
        { name: '2월', value: 4.3 },
        { name: '3월', value: 4.4 },
        { name: '4월', value: 4.5 },
        { name: '5월', value: 4.6 },
        { name: '6월', value: 4.7 }
    ];

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    AI 고객 상담 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    24/7 무중단 지능형 고객 서비스로 고객 만족도 극대화
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            {/* Satisfaction Trend */}
            <ComparisonChart 
                type="line"
                data={satisfactionData}
                title="고객 만족도 추이"
                description="최근 6개월 NPS 기반 고객 만족도 변화"
            />

            {/* Features Grid */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-headset text-sec-blue"></i>
                    AI 고객 상담 핵심 기능
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
