function MarketData() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-database', title: '초당 데이터 생성', value: '2.5', unit: 'GB', color: 'blue' },
        { icon: 'fa-signal', title: '시세 갱신 주기', value: '0.1', unit: '초', color: 'green' },
        { icon: 'fa-users', title: '데이터 구독자', value: '8,450', unit: '개사', color: 'purple' },
        { icon: 'fa-clock', title: '지연시간', value: '1', unit: 'ms', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-chart-line',
            title: '실시간 시세 정보',
            description: '전 종목 호가·체결 정보를 0.1초 주기로 배포',
            details: [
                { subtitle: '10단 호가창', content: '매수·매도 각각 10단계 호가와 잔량을 실시간 제공' },
                { subtitle: '체결 내역', content: '체결 시각, 가격, 수량을 밀리초 단위로 기록하고 스트리밍 전송' },
                { subtitle: '누적 거래량', content: '장 시작부터 현재까지 누적 거래량과 거래대금 실시간 집계' }
            ]
        },
        {
            icon: 'fa-server',
            title: 'WebSocket 스트리밍',
            description: '양방향 실시간 통신으로 1ms 지연시간',
            details: [
                { subtitle: '지속 연결', content: 'HTTP 폴링 대신 WebSocket으로 지속적인 연결 유지' },
                { subtitle: '선택적 구독', content: '관심 종목만 선택하여 데이터를 받아 불필요한 트래픽 감소' },
                { subtitle: '압축 전송', content: 'gzip 압축으로 데이터 크기를 70% 감소' }
            ]
        },
        {
            icon: 'fa-chart-area',
            title: '시장 지수 계산',
            description: 'KOSPI, KOSDAQ 지수 실시간 계산',
            details: [
                { subtitle: '가중 평균', content: '시가총액 가중 방식으로 각 종목의 시세 변동을 반영하여 지수 계산' },
                { subtitle: '섹터별 지수', content: 'IT, 금융, 바이오 등 업종별 지수도 산출' },
                { subtitle: '테마 지수', content: '2차전지, AI, 메타버스 등 테마별 지수 제공' }
            ]
        },
        {
            icon: 'fa-code',
            title: 'API 데이터 제공',
            description: 'RESTful API와 FIX 프로토콜 지원',
            details: [
                { subtitle: 'RESTful API', content: 'HTTP GET 요청으로 과거 데이터 조회' },
                { subtitle: 'FIX 프로토콜', content: 'Financial Information eXchange 표준으로 HFT 업체에 초고속 데이터 전송' },
                { subtitle: 'SDK 제공', content: 'Python, Java, C++ SDK를 제공하여 데이터 활용 프로그램 쉽게 개발' }
            ]
        },
        {
            icon: 'fa-history',
            title: '과거 데이터 아카이브',
            description: '20년치 시세 데이터를 블록체인에 보관',
            details: [
                { subtitle: '일별 데이터', content: '시가, 고가, 저가, 종가, 거래량을 일별로 저장' },
                { subtitle: '틱 데이터', content: '모든 체결 건의 원시 데이터를 압축 저장' },
                { subtitle: '무결성 검증', content: '과거 데이터의 해시를 블록체인에 기록하여 데이터 조작 차단' }
            ]
        },
        {
            icon: 'fa-money-bill-trend-up',
            title: '파생상품 시세',
            description: '선물·옵션 가격과 내재변동성 제공',
            details: [
                { subtitle: '이론가 계산', content: 'Black-Scholes 모델로 옵션의 이론적 가격 계산' },
                { subtitle: '내재변동성', content: '시장 가격에서 역산한 내재변동성 제공' },
                { subtitle: '그릭스 제공', content: 'Delta, Gamma, Vega, Theta 등 옵션 민감도 지표를 실시간 계산' }
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

window.MarketData = MarketData;
