function InvestmentAnalysis() {
    const [expandedCard, setExpandedCard] = React.useState(null);


    const features = [
        {
            icon: 'fa-calculator',
            title: '재무제표 자동 분석',
            description: 'AI 기반 기업 가치 평가',
            details: [
                { subtitle: 'PER·PBR 분석', content: '동종 업계 평균 대비 저평가·고평가 판단' },
                { subtitle: 'ROE·ROA 추세', content: '수익성 지표의 시계열 변화 분석' },
                { subtitle: 'DCF 모델', content: '미래 현금흐름을 할인하여 적정 주가 산출' }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: '기술적 분석',
            description: '차트 패턴 인식 및 지표 분석',
            details: [
                { subtitle: '이동평균선', content: '골든크로스, 데드크로스 자동 탐지' },
                { subtitle: 'RSI·MACD', content: '과매수·과매도 구간 식별' },
                { subtitle: '캔들 패턴', content: '상승·하락 반전 신호 패턴 인식' }
            ]
        },
        {
            icon: 'fa-newspaper',
            title: '뉴스 영향도 분석',
            description: '실적 발표, 공시의 주가 영향 예측',
            details: [
                { subtitle: 'NLP 감성 분석', content: '뉴스 제목과 본문의 긍정·부정 톤 파악' },
                { subtitle: '과거 사례 학습', content: '유사 뉴스 발표 후 주가 변동 패턴 학습' },
                { subtitle: '영향도 점수화', content: '뉴스의 주가 영향을 0~100점으로 수치화' }
            ]
        },
        {
            icon: 'fa-industry',
            title: '업종 비교 분석',
            description: '동종 업계 경쟁사 비교',
            details: [
                { subtitle: '시장 점유율', content: '업계 내 매출 순위 및 점유율 비교' },
                { subtitle: '수익성 비교', content: '영업이익률, 순이익률 동종 업계 평균 대비' },
                { subtitle: '성장성 평가', content: '매출·이익 증가율 경쟁사 대비 우위 분석' }
            ]
        },
        {
            icon: 'fa-globe',
            title: '글로벌 시장 연관성',
            description: '해외 시장 영향도 분석',
            details: [
                { subtitle: '상관계수 분석', content: 'S&P500, 나스닥과의 상관관계 계산' },
                { subtitle: '환율 영향', content: '수출 기업의 환율 변동 민감도 분석' },
                { subtitle: '원자재 가격', content: '유가, 구리 등 원자재 가격 영향 평가' }
            ]
        },
        {
            icon: 'fa-lightbulb',
            title: 'AI 투자 아이디어',
            description: '맞춤형 종목 추천',
            details: [
                { subtitle: '투자 성향 분석', content: '과거 거래 이력으로 리스크 선호도 파악' },
                { subtitle: '유사 투자자 협업 필터링', content: '비슷한 성향 투자자의 수익 종목 추천' },
                { subtitle: '테마 투자', content: 'AI, 2차전지, 바이오 등 유망 테마 종목 제시' }
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

window.InvestmentAnalysis = InvestmentAnalysis;
