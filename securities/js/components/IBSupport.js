function IBSupport() {
    const stats = [
        {
            icon: 'fa-briefcase',
            title: '진행 중 딜',
            value: '48',
            unit: '건',
            trend: 15,
            description: 'IB 프로젝트',
            color: 'sec-blue'
        },
        {
            icon: 'fa-won-sign',
            title: '딜 규모',
            value: '12.8',
            unit: '조원',
            trend: 22,
            description: '총 거래 금액',
            color: 'sec-green'
        },
        {
            icon: 'fa-clock',
            title: 'DD 처리 시간',
            value: '3',
            unit: '일',
            trend: -75,
            description: 'Due Diligence',
            color: 'sec-gold'
        },
        {
            icon: 'fa-percent',
            title: '성공률',
            value: '87',
            unit: '%',
            trend: 8,
            description: '딜 성사율',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-calculator',
            title: '기업 가치 평가',
            description: 'AI 기반 자동 밸류에이션',
            details: [
                'DCF(Discounted Cash Flow) 자동 모델링',
                '유사 기업 비교 분석(Comparable Company)',
                '선행 거래 분석(Precedent Transaction)',
                'LBO(Leveraged Buyout) 분석',
                '민감도 분석 및 시나리오 테스트',
                '자동 밸류에이션 리포트 생성'
            ],
            benefits: [
                '분석 시간 85% 단축',
                '객관적 평가',
                '다양한 시나리오',
                '즉시 업데이트'
            ],
            technologies: ['DCF Model', 'Comparable Analysis', 'Monte Carlo', 'Sensitivity Analysis', 'Excel Automation']
        },
        {
            icon: 'fa-handshake',
            title: 'M&A 딜 분석',
            description: '인수합병 자동 분석 및 자문',
            details: [
                '잠재적 시너지 효과 정량화',
                '통합 비용 및 일정 예측',
                'Pro-forma 재무제표 자동 생성',
                '희석 효과(Dilution) 분석',
                '자금 조달 구조 최적화',
                '규제 승인 리스크 평가'
            ],
            benefits: [
                '시너지 95% 실현',
                '통합 시간 50% 단축',
                '리스크 조기 발견',
                '성공률 향상'
            ],
            technologies: ['Synergy Analysis', 'Integration Planning', 'Pro-forma Modeling', 'Deal Structuring']
        },
        {
            icon: 'fa-rocket',
            title: 'IPO 지원',
            description: '기업공개 프로세스 자동화',
            details: [
                '적정 공모가 산정 모델',
                '수요 예측 및 북빌딩 지원',
                '투자설명서 자동 생성',
                '로드쇼 자료 자동 작성',
                '주관사 실사(Due Diligence) 자동화',
                'IPO 이후 주가 예측'
            ],
            benefits: [
                '공모가 적중률 92%',
                '준비 기간 40% 단축',
                '오버행 최소화',
                '성공적 상장'
            ],
            technologies: ['Pricing Model', 'Demand Forecasting', 'Prospectus Generation', 'Due Diligence Automation']
        },
        {
            icon: 'fa-chart-line',
            title: '자금조달 자문',
            description: '최적 자본 구조 설계',
            details: [
                '부채/자본 최적 비율 계산',
                '자금 조달 비용(WACC) 최소화',
                '신용 등급 영향 분석',
                '다양한 조달 방법 비교(채권, 대출, 증자)',
                '재무 약정(Financial Covenants) 설계',
                '자금 조달 타이밍 최적화'
            ],
            benefits: [
                'WACC 1.2%p 절감',
                '신용등급 유지',
                '재무 유연성',
                '조달 비용 최소화'
            ],
            technologies: ['Capital Structure', 'WACC Optimization', 'Credit Analysis', 'Debt Structuring']
        },
        {
            icon: 'fa-building',
            title: '구조화금융',
            description: '복잡한 금융 상품 설계',
            details: [
                'ABS/MBS 구조화 설계',
                '프로젝트 파이낸싱 구조 설계',
                'SPV/SPC 최적 구조 제안',
                '신용 보강 기법 적용',
                '현금흐름 워터폴 모델링',
                '투자자 수익률 시뮬레이션'
            ],
            benefits: [
                '자금 조달 성공률 95%',
                '구조화 시간 70% 단축',
                '리스크 분산',
                '수익률 최적화'
            ],
            technologies: ['Structured Finance', 'Securitization', 'Waterfall Modeling', 'Credit Enhancement']
        },
        {
            icon: 'fa-file-contract',
            title: '딜 문서 자동화',
            description: 'IB 계약서 및 문서 자동 생성',
            details: [
                'Term Sheet 자동 생성',
                'LOI(Letter of Intent) 작성',
                'SPA(Stock Purchase Agreement) 초안',
                'Due Diligence 체크리스트',
                'Fairness Opinion 리포트',
                '계약서 조항 법률 검토'
            ],
            benefits: [
                '작성 시간 90% 단축',
                '법적 리스크 감소',
                '표준화된 품질',
                '버전 관리'
            ],
            technologies: ['Document Generation', 'Contract Automation', 'Legal AI', 'Template Engine', 'Version Control']
        }
    ];

    const dealData = [
        { name: 'M&A', value: 35 },
        { name: 'IPO', value: 25 },
        { name: '자금조달', value: 20 },
        { name: '구조화', value: 15 },
        { name: '기타', value: 5 }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    IB 지원 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    기업금융 업무의 AI 자동화 및 의사결정 지원
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <ComparisonChart 
                type="pie"
                data={dealData}
                title="IB 딜 유형별 분포"
                description="진행 중인 프로젝트 유형별 비중"
            />

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-handshake text-sec-blue"></i>
                    IB 지원 핵심 기능
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
