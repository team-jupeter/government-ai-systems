function TradingSystem() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-bolt', title: '평균 체결속도', value: '0.015', unit: 'ms', color: 'blue' },
        { icon: 'fa-chart-line', title: '일일 처리량', value: '8.5', unit: '억건', color: 'green' },
        { icon: 'fa-microchip', title: 'FPGA 동작주파수', value: '412.3', unit: 'MHz', color: 'purple' },
        { icon: 'fa-gauge-high', title: 'HFT 지원', value: '마이크로초', unit: '단위', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-microchip',
            title: 'FPGA 병렬 체결 엔진',
            description: 'BN254 타원곡선 기반 64개 DSP 슬라이스 병렬 처리',
            details: [
                { subtitle: 'Miller 알고리즘 페어링 연산', content: '64개 DSP 슬라이스를 활용한 암호학적 연산 가속' },
                { subtitle: '412.3MHz 고속 동작', content: 'Setup Time 2.31ns 달성으로 실시간 대량 주문 처리' },
                { subtitle: 'HFT 지원', content: '초단타 알고리즘 트레이딩을 위한 마이크로초 단위 호가 매칭' }
            ]
        },
        {
            icon: 'fa-chart-candlestick',
            title: '주식 매매 체결',
            description: '코스피·코스닥 전 종목 실시간 호가 매칭',
            details: [
                { subtitle: '가격 우선·시간 우선 원칙', content: '공정한 거래를 위한 호가 매칭' },
                { subtitle: '시장가·지정가 동시 처리', content: '시장가 즉시 체결, 지정가 호가창 등록' },
                { subtitle: '부분 체결 지원', content: '대량 주문 단계적 체결' }
            ]
        },
        {
            icon: 'fa-landmark',
            title: '채권 매매 체결',
            description: '국채·회사채·특수채 거래',
            details: [
                { subtitle: '수익률 자동 계산', content: 'YTM(만기수익률) 실시간 계산' },
                { subtitle: '신용등급 연동', content: '신용평가사 API 연동' },
                { subtitle: '장외 거래 지원', content: '대량 블록딜 지원' }
            ]
        },
        {
            icon: 'fa-chart-area',
            title: '파생상품 체결',
            description: '선물·옵션 거래',
            details: [
                { subtitle: 'KOSPI200 선물·옵션', content: '주가지수 선물과 옵션 실시간 체결' },
                { subtitle: '증거금 실시간 계산', content: 'VaR 모델 기반 증거금 계산' },
                { subtitle: '자동 청산 시스템', content: '증거금 미달 시 자동 청산' }
            ]
        },
        {
            icon: 'fa-layer-group',
            title: '호가 매칭 알고리즘',
            description: 'AI 기반 최적 호가 매칭',
            details: [
                { subtitle: 'Order Book 실시간 관리', content: 'Red-Black Tree 자료구조 활용' },
                { subtitle: 'AI 가격 예측', content: 'LSTM 신경망 기반 가격 흐름 예측' },
                { subtitle: '스프레드 최적화', content: '매수·매도 호가 간 스프레드 분석' }
            ]
        },
        {
            icon: 'fa-rocket',
            title: 'HFT 초단타 거래 지원',
            description: '마이크로초 단위 알고리즘 트레이딩',
            details: [
                { subtitle: 'Co-location 서비스', content: 'HFT 업체 서버 co-location 제공' },
                { subtitle: 'FIX 프로토콜 지원', content: 'Financial Information eXchange 표준 지원' },
                { subtitle: '마켓 메이킹 API', content: 'RESTful API와 WebSocket 제공' }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

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

window.TradingSystem = TradingSystem;
