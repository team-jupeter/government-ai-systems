function MarketMaking() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const stats = [
        { icon: 'fa-water', title: '유동성 공급량', value: '12.5', unit: '조원', color: 'blue' },
        { icon: 'fa-percent', title: '평균 스프레드', value: '0.05', unit: '%', color: 'green' },
        { icon: 'fa-users', title: '시장조성자', value: '47', unit: '개사', color: 'purple' },
        { icon: 'fa-clock', title: '호가 갱신주기', value: '0.1', unit: '초', color: 'yellow' }
    ];

    const features = [
        {
            icon: 'fa-robot',
            title: 'AI 자동 유동성 공급',
            description: '머신러닝 기반 최적 호가 제시',
            details: [
                { subtitle: 'LSTM 수요 예측', content: '향후 10분간 매수·매도 수요 예측' },
                { subtitle: '동적 스프레드 조정', content: '변동성에 따른 스프레드 자동 조정' },
                { subtitle: '재고 최적화', content: '보유 포지션 중립 유지' }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: '호가 스프레드 최적화',
            description: '매수·매도 호가 차이 최소화',
            details: [
                { subtitle: '실시간 변동성 분석', content: 'GARCH 모델 기반 변동성 추정' },
                { subtitle: '경쟁 호가 모니터링', content: '다른 시장조성자 호가 실시간 추적' },
                { subtitle: '슬리피지 최소화', content: '대량 주문 시 가격 충격 최소화' }
            ]
        },
        {
            icon: 'fa-balance-scale',
            title: '포지션 리스크 관리',
            description: '시장조성자 재고 리스크 자동 관리',
            details: [
                { subtitle: 'Delta-Neutral 전략', content: '주식 포지션과 선물 조합' },
                { subtitle: '손절 자동화', content: '임계치 초과 시 즉시 청산' },
                { subtitle: 'VaR 실시간 계산', content: '99% 신뢰수준 최대 손실액 계산' }
            ]
        },
        {
            icon: 'fa-gauge-high',
            title: '인센티브 프로그램',
            description: '우수 시장조성자 수수료 감면',
            details: [
                { subtitle: '유동성 공급 점수', content: '호가 제공 시간, 스프레드, 거래량 종합 평가' },
                { subtitle: '거래 수수료 할인', content: '높은 등급 최대 80% 감면' },
                { subtitle: '리베이트 지급', content: '시장 안정화 기여 시 리베이트 지급' }
            ]
        },
        {
            icon: 'fa-shield-halved',
            title: '조작 방지 감시',
            description: '허위 호가, 스푸핑 실시간 탐지',
            details: [
                { subtitle: '스푸핑 탐지', content: '대량 호가 체결 직전 취소 패턴 감지' },
                { subtitle: '레이어링 차단', content: '여러 가격대 허위 호가 식별' },
                { subtitle: '자격 정지', content: '반복 위반 시 시장조성자 자격 정지' }
            ]
        },
        {
            icon: 'fa-handshake',
            title: '다중 시장조성자 경쟁',
            description: '여러 업체 경쟁을 통한 최적 유동성 제공',
            details: [
                { subtitle: '종목별 전담 조성자', content: '종목마다 2~5개 업체 지정' },
                { subtitle: '성과 기반 순위', content: '매월 성과 평가 및 순위 공개' },
                { subtitle: '신규 진입 지원', content: '교육 및 시뮬레이션 환경 제공' }
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

window.MarketMaking = MarketMaking;
