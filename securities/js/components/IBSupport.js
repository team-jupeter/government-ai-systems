function IBSupport() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-rocket',
            title: 'IPO 주관',
            description: '기업공개 전 과정 지원',
            details: [
                { subtitle: '기업 실사', content: 'AI가 재무제표, 사업모델, 경쟁력을 자동 분석' },
                { subtitle: '공모가 산정', content: 'DCF, 유사 기업 비교로 적정 공모가 제시' },
                { subtitle: '수요 예측', content: '기관 투자자 수요를 사전 조사하여 공모 성공률 제고' }
            ]
        },
        {
            icon: 'fa-briefcase',
            title: 'M&A 자문',
            description: '인수·합병 전략 수립 및 실행',
            details: [
                { subtitle: '타겟 발굴', content: 'AI가 업종별 인수 후보 기업을 자동 탐색' },
                { subtitle: '기업 가치 평가', content: 'DCF, EV/EBITDA 등 다양한 방법으로 적정 가격 산출' },
                { subtitle: '협상 지원', content: '과거 M&A 사례를 학습하여 협상 전략 제안' }
            ]
        },
        {
            icon: 'fa-coins',
            title: '회사채 발행',
            description: '기업 자금 조달 지원',
            details: [
                { subtitle: '신용 평가', content: '재무제표, 현금흐름을 분석하여 적정 신용등급 예측' },
                { subtitle: '금리 제안', content: '시장 금리와 신용등급을 고려한 발행 금리 산정' },
                { subtitle: '투자자 배정', content: '은행, 보험사 등 기관 투자자에게 배정' }
            ]
        },
        {
            icon: 'fa-building-columns',
            title: '기업 재무 자문',
            description: '자본 구조 최적화 컨설팅',
            details: [
                { subtitle: '부채 비율 최적화', content: '기업의 적정 부채 비율을 제안' },
                { subtitle: '배당 정책', content: '잉여 현금흐름을 고려한 배당 정책 수립' },
                { subtitle: '자사주 매입', content: '주가 부양을 위한 자사주 매입 시기 제안' }
            ]
        },
        {
            icon: 'fa-chart-pie',
            title: '구조화 금융',
            description: 'ABS, MBS 등 구조화 상품 설계',
            details: [
                { subtitle: '자산 유동화', content: '대출 채권을 묶어 증권으로 발행' },
                { subtitle: '리스크 분산', content: '선순위·후순위 트랜치로 리스크 분산' },
                { subtitle: '신용 보강', content: '보증, 담보로 신용등급 상향' }
            ]
        },
        {
            icon: 'fa-lightbulb',
            title: '기업 밸류업 자문',
            description: '기업 가치 제고 전략',
            details: [
                { subtitle: 'ESG 경영', content: '환경·사회·지배구조 개선으로 기업 가치 제고' },
                { subtitle: 'IR 전략', content: '투자자 대상 효과적인 IR 전략 수립' },
                { subtitle: '주주 환원', content: '배당, 자사주 매입 등 주주 친화 정책 제안' }
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

window.IBSupport = IBSupport;
