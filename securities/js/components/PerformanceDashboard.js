function PerformanceDashboard() {
    const stats = [
        {
            icon: 'fa-chart-line',
            title: '일일 거래액',
            value: '2.8',
            unit: '조원',
            trend: 12,
            description: '전체 거래 규모',
            color: 'sec-blue'
        },
        {
            icon: 'fa-coins',
            title: '당일 수익',
            value: '125',
            unit: '억원',
            trend: 8,
            description: '순이익',
            color: 'sec-green'
        },
        {
            icon: 'fa-robot',
            title: 'AI 자동화율',
            value: '85',
            unit: '%',
            trend: 15,
            description: '업무 자동화',
            color: 'sec-gold'
        },
        {
            icon: 'fa-server',
            title: '시스템 가동률',
            value: '99.99',
            unit: '%',
            trend: 0,
            description: '무중단 서비스',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-chart-pie',
            title: '실시간 거래량/수익',
            description: '부서별 실시간 성과 모니터링',
            details: [
                '거래량, 수익, 비용 실시간 대시보드',
                '부서별/팀별/개인별 성과 추적',
                '목표 대비 달성률 시각화',
                '시간대별 거래 패턴 분석',
                '고객 세그먼트별 수익 기여도',
                '실시간 알림 및 리포팅'
            ],
            benefits: [
                '실시간 의사결정',
                '투명한 성과 평가',
                '동기부여 강화',
                '목표 관리'
            ],
            technologies: ['Real-time Dashboard', 'WebSocket', 'Grafana', 'Time Series DB', 'Alert System']
        },
        {
            icon: 'fa-users',
            title: '부서별 성과',
            description: '프론트/미들/백오피스 성과 분석',
            details: [
                '프론트오피스: 수익 창출 성과',
                '미들오피스: 리스크 관리 효과',
                '백오피스: 운영 효율성 지표',
                '부서 간 협업 효과 측정',
                '인당 생산성(Per Capita) 분석',
                '벤치마크 비교 분석'
            ],
            benefits: [
                '공정한 평가',
                '강점/약점 파악',
                '자원 최적 배분',
                '경쟁력 강화'
            ],
            technologies: ['Performance Analytics', 'Benchmarking', 'KPI Dashboard', 'Balanced Scorecard']
        },
        {
            icon: 'fa-robot',
            title: 'AI 자동화율',
            description: '업무별 자동화 진행 상황',
            details: [
                '업무별 자동화 비율 추적',
                '자동화 ROI 계산',
                'AI 처리 건수 및 정확도',
                '인간 개입률(Human-in-the-loop)',
                '자동화 효과 측정',
                '개선 영역 식별'
            ],
            benefits: [
                '목표 관리',
                'ROI 측정',
                '지속적 개선',
                '투자 근거'
            ],
            technologies: ['Automation Metrics', 'ROI Calculator', 'Process Mining', 'Efficiency Analysis']
        },
        {
            icon: 'fa-piggy-bank',
            title: '비용 절감 효과',
            description: '자동화를 통한 비용 절감 분석',
            details: [
                '인건비 절감 효과 측정',
                '처리 시간 단축 금액 환산',
                '오류 감소로 인한 손실 회피',
                '규제 준수 비용 절감',
                'TCO(총소유비용) 분석',
                '월별/분기별 누적 효과'
            ],
            benefits: [
                '연 42% 비용 절감',
                '투명한 효과 측정',
                '경영진 보고',
                '투자 정당화'
            ],
            technologies: ['Cost Analysis', 'TCO Model', 'Savings Calculator', 'Financial Reporting']
        },
        {
            icon: 'fa-smile',
            title: '고객 만족도',
            description: 'NPS 기반 고객 경험 관리',
            details: [
                'NPS(Net Promoter Score) 실시간 측정',
                'CSAT(Customer Satisfaction) 추적',
                '고객 여정별 만족도 분석',
                '불만 사항 자동 수집 및 분류',
                '개선 조치 효과 측정',
                '경쟁사 대비 비교'
            ],
            benefits: [
                '만족도 4.8/5.0',
                '이탈률 45% 감소',
                '추천율 증가',
                '브랜드 가치'
            ],
            technologies: ['NPS', 'CSAT', 'Customer Journey', 'Sentiment Analysis', 'Survey Automation']
        },
        {
            icon: 'fa-server',
            title: '시스템 가동률',
            description: 'IT 인프라 안정성 모니터링',
            details: [
                '서버 가동률 99.99% 유지',
                'API 응답 시간 모니터링',
                '에러율 및 장애 빈도 추적',
                '트래픽 패턴 분석',
                '리소스 사용률 최적화',
                '자동 장애 복구 시스템'
            ],
            benefits: [
                '다운타임 최소화',
                '안정적 서비스',
                '고객 신뢰',
                '비즈니스 연속성'
            ],
            technologies: ['Uptime Monitoring', 'APM', 'Log Analytics', 'Alerting', 'Auto-recovery']
        }
    ];

    const revenueData = [
        { name: '1월', value: 98 },
        { name: '2월', value: 102 },
        { name: '3월', value: 115 },
        { name: '4월', value: 108 },
        { name: '5월', value: 122 },
        { name: '6월', value: 125 }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    성과 대시보드
                </h2>
                <p className="text-lg text-gray-600">
                    실시간 KPI 모니터링 및 성과 분석
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <ComparisonChart 
                type="line"
                data={revenueData}
                title="월별 수익 추이"
                description="최근 6개월 순이익 변화 (단위: 억원)"
            />

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-chart-pie text-sec-blue"></i>
                    성과 관리 핵심 지표
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
