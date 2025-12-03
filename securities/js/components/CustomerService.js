function CustomerService() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-robot',
            title: 'AI 자동 상담',
            description: '24/7 무중단 고객 지원',
            details: [
                { subtitle: 'DeepSeek R1 언어 모델', content: '자연어 이해 및 맥락 기반 응답 생성' },
                { subtitle: '50턴 대화 유지', content: '장시간 상담 내역을 기억하고 일관된 응답 제공' },
                { subtitle: '감정 분석', content: '고객 감정 상태를 파악하여 적응적 응답' }
            ]
        },
        {
            icon: 'fa-language',
            title: '다국어 지원',
            description: '한/영/중/일 4개 언어 실시간 번역',
            details: [
                { subtitle: '실시간 번역', content: '고객 질문을 즉시 번역하여 AI가 이해' },
                { subtitle: '금융 용어 특화', content: '금융 전문 용어를 정확하게 번역' },
                { subtitle: '문화적 맥락', content: '각 국가의 금융 관습과 문화를 고려한 응답' }
            ]
        },
        {
            icon: 'fa-headset',
            title: '인간 상담원 연결',
            description: '복잡한 문의는 전문 상담원 즉시 연결',
            details: [
                { subtitle: '자동 분류', content: 'AI가 문의 복잡도를 판단하여 자동 분류' },
                { subtitle: '우선순위 배정', content: '긴급도에 따라 상담원에게 우선 배정' },
                { subtitle: '대화 이력 공유', content: 'AI와의 대화 내역을 상담원에게 자동 전달' }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: '상담 품질 분석',
            description: 'AI 기반 상담 품질 실시간 모니터링',
            details: [
                { subtitle: '감성 분석', content: '고객의 만족도를 실시간으로 측정' },
                { subtitle: '응답 품질 평가', content: 'AI 응답의 정확성과 유용성을 자동 평가' },
                { subtitle: '개선 제안', content: '낮은 평가를 받은 응답 패턴 분석 및 개선안 제시' }
            ]
        },
        {
            icon: 'fa-book',
            title: '지식 베이스 자동 업데이트',
            description: '최신 금융 정보 자동 학습',
            details: [
                { subtitle: '실시간 뉴스 크롤링', content: '금융 뉴스를 실시간으로 수집하여 학습' },
                { subtitle: '규제 변경 감지', content: '금융 규제 변경 사항을 자동으로 반영' },
                { subtitle: '상품 정보 동기화', content: '신규 금융 상품 정보를 즉시 학습' }
            ]
        },
        {
            icon: 'fa-mobile',
            title: '멀티 채널 지원',
            description: '웹, 모바일, 전화, 카카오톡 통합',
            details: [
                { subtitle: '채널 통합', content: '모든 채널의 상담 이력을 하나로 통합 관리' },
                { subtitle: '채널 간 연속성', content: '웹에서 시작한 상담을 모바일에서 이어서 진행' },
                { subtitle: '선호 채널 학습', content: '고객의 선호 채널을 학습하여 맞춤 안내' }
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

window.CustomerService = CustomerService;
