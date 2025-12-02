function BackOffice() {
    const stats = [
        {
            icon: 'fa-file-invoice',
            title: '일일 정산 건수',
            value: '245,000',
            unit: '건',
            trend: 15,
            description: '자동 거래 정산',
            color: 'sec-blue'
        },
        {
            icon: 'fa-clock',
            title: '정산 처리 시간',
            value: '8',
            unit: '분',
            trend: -85,
            description: '평균 정산 완료',
            color: 'sec-green'
        },
        {
            icon: 'fa-check-circle',
            title: '정산 정확도',
            value: '99.99',
            unit: '%',
            trend: 0,
            description: '오류율 0.01%',
            color: 'sec-gold'
        },
        {
            icon: 'fa-file-alt',
            title: '보고서 생성',
            value: '3,200',
            unit: '건/월',
            trend: 22,
            description: '자동 리포트',
            color: 'sec-blue'
        }
    ];

    const features = [
        {
            icon: 'fa-calculator',
            title: '거래 후 정산',
            description: 'T+2 자동 정산 및 결제',
            details: [
                '거래 내역 자동 매칭 및 검증',
                '수수료 자동 계산 및 배분',
                '세금 자동 계산 (거래세, 양도세)',
                '증거금 및 대용금 자동 정산',
                '결제 지시서 자동 생성 및 전송',
                '오류 거래 자동 식별 및 재정산'
            ],
            benefits: [
                '정산 시간 95% 단축',
                '오류율 99.9% 감소',
                '인건비 70% 절감',
                '실시간 처리'
            ],
            technologies: ['Settlement Engine', 'Matching Algorithm', 'Fee Calculator', 'Tax Engine', 'Error Detection']
        },
        {
            icon: 'fa-credit-card',
            title: '결제/청산 자동화',
            description: 'DVP/RVP 결제 시스템',
            details: [
                'DVP(Delivery versus Payment) 동시 결제',
                '한국예탁결제원 자동 연동',
                '실시간 총액 결제(RTGS) 처리',
                '결제 실패 시 자동 재시도',
                '당일 결제(Same-day Settlement) 지원',
                '외화 결제 자동 처리'
            ],
            benefits: [
                '결제 실패율 0.1%',
                '리스크 제로',
                '유동성 최적화',
                '24/7 처리'
            ],
            technologies: ['DVP', 'RTGS', 'KSD Interface', 'Payment Gateway', 'FX Settlement']
        },
        {
            icon: 'fa-file-pdf',
            title: '보고서 자동 생성',
            description: '규제 및 내부 관리 보고서',
            details: [
                '일일 거래 내역 보고서',
                '월간 운용 성과 보고서',
                '고객 투자 보고서 (계좌별)',
                '리스크 관리 보고서',
                '규제 제출용 보고서 (금감원, 거래소)',
                'PDF/Excel 자동 생성 및 배포'
            ],
            benefits: [
                '작성 시간 90% 단축',
                '일관된 품질',
                '오류 제로',
                '즉시 생성'
            ],
            technologies: ['Report Generator', 'Template Engine', 'PDF Library', 'Excel Automation', 'Email Scheduler']
        },
        {
            icon: 'fa-database',
            title: '데이터 검증',
            description: '데이터 품질 관리 및 정합성 검사',
            details: [
                '거래 데이터 무결성 검증',
                '계좌 잔고 일치 검사',
                '중복 거래 자동 제거',
                '데이터 표준화 및 정제',
                '이상 데이터 자동 탐지',
                '데이터 레이크 품질 모니터링'
            ],
            benefits: [
                '데이터 품질 99.9%',
                '정합성 100%',
                '자동 교정',
                '실시간 검증'
            ],
            technologies: ['Data Validation', 'Data Quality', 'ETL', 'Data Cleansing', 'Anomaly Detection']
        },
        {
            icon: 'fa-file-image',
            title: '문서 처리 (OCR)',
            description: 'AI 기반 문서 자동 처리',
            details: [
                '신분증, 계약서 자동 스캔 및 인식',
                '문서 자동 분류 및 태깅',
                '핵심 정보 추출 및 구조화',
                '문서 검색 및 관리 시스템',
                '전자 서명 및 암호화',
                '블록체인 기반 원본 증명'
            ],
            benefits: [
                '처리 시간 80% 단축',
                '정확도 99.8%',
                '종이 문서 제로',
                '즉시 검색'
            ],
            technologies: ['OCR', 'Document Classification', 'NLP', 'Information Extraction', 'Digital Signature']
        },
        {
            icon: 'fa-project-diagram',
            title: '워크플로우 관리',
            description: '업무 프로세스 자동화',
            details: [
                '업무 프로세스 자동화 엔진',
                '승인 워크플로우 자동 라우팅',
                '예외 상황 자동 에스컬레이션',
                'SLA(Service Level Agreement) 자동 관리',
                '업무 진행 상황 실시간 추적',
                '병목 구간 자동 식별 및 최적화'
            ],
            benefits: [
                '처리 시간 60% 단축',
                '투명성 확보',
                '병목 제거',
                '효율성 극대화'
            ],
            technologies: ['Workflow Engine', 'BPMN', 'Rule Engine', 'SLA Monitoring', 'Process Mining']
        }
    ];

    const processingData = [
        { name: '수동', value: 240 },
        { name: '반자동', value: 120 },
        { name: '완전자동', value: 8 }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    백오피스 자동화 시스템
                </h2>
                <p className="text-lg text-gray-600">
                    정산부터 보고서까지 완전 자동화된 후선 업무
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <ComparisonChart 
                type="bar"
                data={processingData}
                title="정산 처리 시간 비교"
                description="처리 방식별 평균 소요 시간 (단위: 분)"
            />

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fas fa-gears text-sec-blue"></i>
                    백오피스 핵심 기능
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
