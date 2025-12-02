function Compliance() {
    const stats = [
        {
            icon: 'fa-balance-scale',
            title: '일일 규제 검사',
            value: '125,000',
            unit: '건',
            trend: 8,
            description: '자동 컴플라이언스 체크',
            color: 'sec-blue'
        },
        {
            icon: 'fa-flag',
            title: '이상 거래 탐지',
            value: '342',
            unit: '건',
            trend: -22,
            description: '의심 거래 차단',
            color: 'sec-green'
        },
        {
            icon: 'fa-file-alt',
            title: '규제 보고서',
            value: '1,850',
            unit: '건/월',
            trend: 5,
            description: '자동 생성 및 제출',
            color: 'sec-gold'
        },
        {
            icon: 'fa-shield-alt',
            title: 'AML 검증',
            value: '99.9',
            unit: '%',
            trend: 0,
            description: '자금세탁 방지율',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-check-double',
            title: '자동 규제 검사',
            description: '실시간 거래 규제 준수 자동 검증',
            details: [
                '자본시장법 위반 여부 실시간 검사',
                '투자 한도 및 제한 사항 자동 확인',
                '적합성 원칙 및 적정성 원칙 검증',
                '이해관계자 거래 자동 차단',
                '정보 교류 차단(Chinese Wall) 시스템',
                '거래 전 자동 승인 시스템 (Pre-trade Check)'
            ],
            benefits: [
                '위반 사항 제로',
                '실시간 차단',
                '자동 알림',
                '규제 100% 준수'
            ],
            technologies: ['Rule Engine', 'Pre-trade Check', 'Suitability Check', 'Chinese Wall', 'Alert System']
        },
        {
            icon: 'fa-search',
            title: '이상 거래 탐지',
            description: 'AI 기반 시장 조작 및 불공정 거래 감지',
            details: [
                '시세 조종 패턴 자동 탐지 (Pump & Dump 등)',
                '허수 호가 및 가장 매매 감지',
                '미공개 정보 이용 거래 탐지',
                '통정 매매 및 시장 질서 교란 행위',
                '이상 체결 패턴 분석 (급등락, 대량 거래)',
                '머신러닝 기반 이상 거래 스코어링'
            ],
            benefits: [
                '탐지율 95%',
                '오탐률 2%',
                '실시간 대응',
                '시장 질서 보호'
            ],
            technologies: ['Anomaly Detection', 'Pattern Recognition', 'Machine Learning', 'Time Series Analysis', 'Graph Analysis']
        },
        {
            icon: 'fa-money-bill-wave',
            title: '자금세탁 방지 (AML)',
            description: '의심 거래 자동 모니터링 및 보고',
            details: [
                '고액 현금 거래 자동 모니터링',
                '구조화 거래(Structuring) 탐지',
                '수익자 실명 확인 (Know Your Customer)',
                '고위험 국가 거래 자동 플래그',
                '의심 거래 보고(STR) 자동 생성',
                '자금 흐름 추적 및 분석'
            ],
            benefits: [
                'STR 정확도 98%',
                '실명 확인 100%',
                '자금세탁 차단',
                '국제 기준 준수'
            ],
            technologies: ['Transaction Monitoring', 'KYC', 'Sanction Screening', 'Beneficial Owner', 'STR Automation']
        },
        {
            icon: 'fa-user-secret',
            title: '내부자 거래 감시',
            description: '미공개 정보 이용 거래 방지',
            details: [
                '임직원 거래 사전 신고 시스템',
                '미공개 정보 접근 기록 관리',
                '특정 증권 거래 제한 자동 적용',
                '단기 매매 차익 반환 자동 계산',
                '주요 주주 지분 변동 모니터링',
                '공시 의무 위반 자동 감지'
            ],
            benefits: [
                '내부자 거래 제로',
                '투명성 확보',
                '신뢰도 향상',
                '법적 리스크 제거'
            ],
            technologies: ['Insider Trading Detection', 'Access Control', 'Trade Restriction', 'Disclosure Monitoring']
        },
        {
            icon: 'fa-chart-bar',
            title: '투자 한도 모니터링',
            description: '고객별 투자 한도 실시간 관리',
            details: [
                '투자 성향별 한도 자동 적용',
                '신용 거래 증거금 실시간 계산',
                '레버리지 비율 자동 관리',
                '집중 투자 한도 초과 차단',
                '계좌별 위험 등급 분류',
                '한도 초과 시 자동 알림 및 제한'
            ],
            benefits: [
                '고객 보호',
                '분쟁 예방',
                '규제 준수',
                '리스크 통제'
            ],
            technologies: ['Limit Management', 'Margin Calculation', 'Risk Classification', 'Real-time Monitoring']
        },
        {
            icon: 'fa-file-invoice',
            title: '규제 보고서 자동 생성',
            description: '각종 법정 보고서 자동 작성 및 제출',
            details: [
                '금융감독원 정기 보고서 자동 생성',
                '거래소 제출 보고서 자동화',
                '이상 거래 보고서(STR, SAR) 작성',
                '대량 보유 보고서 자동 제출',
                '공시 자료 자동 생성 및 검증',
                '보고서 제출 이력 관리'
            ],
            benefits: [
                '작성 시간 90% 단축',
                '오류율 제로',
                '제출 기한 100% 준수',
                '감사 대응 용이'
            ],
            technologies: ['Report Generation', 'Template Engine', 'Data Validation', 'Submission Automation', 'Audit Trail']
        }
    ];

    const complianceData = [
        { name: '1월', value: 98.5 },
        { name: '2월', value: 99.1 },
        { name: '3월', value: 99.3 },
        { name: '4월', value: 99.6 },
        { name: '5월', value: 99.8 },
        { name: '6월', value: 99.9 }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    컴플라이언스 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    AI 기반 규제 준수 및 불공정 거래 방지
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <ComparisonChart 
                type="line"
                data={complianceData}
                title="규제 준수율 추이"
                description="월별 컴플라이언스 준수율 변화 (%)"
            />

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-balance-scale text-sec-blue"></i>
                    컴플라이언스 핵심 기능
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
