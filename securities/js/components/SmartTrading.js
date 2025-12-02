function SmartTrading() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    // 매매 실적 시뮬레이션
    const tradingPerformance = [
        { period: '1개월', trades: 12500, profit: 3.2, accuracy: 67.5 },
        { period: '3개월', trades: 37500, profit: 8.7, accuracy: 71.2 },
        { period: '6개월', trades: 75000, profit: 15.3, accuracy: 73.8 },
        { period: '1년', trades: 150000, profit: 28.5, accuracy: 75.1 }
    ];

    // AI 개선 이력
    const improvementHistory = [
        { version: 'v1.0', date: '2024-01', accuracy: 62.3, description: '초기 모델' },
        { version: 'v1.5', date: '2024-04', accuracy: 68.7, description: '부채비율 가중치 조정' },
        { version: 'v2.0', date: '2024-07', accuracy: 72.5, description: '산업별 특성 반영' },
        { version: 'v2.5', date: '2024-10', accuracy: 75.1, description: '글로벌 이벤트 통합' }
    ];

    const features = [
        {
            icon: 'fa-balance-scale',
            title: '신용등급 기반 증권 가치 평가',
            description: 'PDV 재무제표 → 신용등급 → 본질 가치 산출',
            details: [
                { 
                    subtitle: '6천만 개체 신용등급 산출', 
                    content: '5천만 인구와 1천만 사업자의 PDV 재무제표를 실시간 분석하여 AAA~D 등급을 부여합니다. 이 신용등급이 모든 증권 가치 평가의 기초가 됩니다.' 
                },
                { 
                    subtitle: '증권 본질 가치 계산', 
                    content: '신용등급을 기초로 채권의 적정 금리와 주식의 적정 PER를 산출합니다. AAA 등급 기업은 낮은 할인율로, B 등급 기업은 높은 할인율로 평가됩니다.' 
                },
                { 
                    subtitle: 'DCF 모델 자동 적용', 
                    content: '미래 현금흐름을 예측하고 신용등급에 따른 할인율을 적용하여 주식의 본질 가치를 계산합니다. 채권은 신용등급별 적정 금리로 현재가치를 산출합니다.' 
                }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: '저평가·고평가 자동 탐지',
            description: '본질 가치 vs 시장 가격 실시간 비교',
            details: [
                { 
                    subtitle: '평가 가치 > 시장 가격 → 구매', 
                    content: 'AI가 계산한 본질 가치가 현재 시장 가격보다 20% 이상 높으면 저평가로 판단하여 자동 매수합니다. 예: 본질 가치 12만원, 시장 가격 10만원 → 매수' 
                },
                { 
                    subtitle: '평가 가치 < 시장 가격 → 판매', 
                    content: '본질 가치가 시장 가격보다 20% 이상 낮으면 고평가로 판단하여 보유 주식을 매도합니다. 예: 본질 가치 10만원, 시장 가격 12만원 → 매도' 
                },
                { 
                    subtitle: '안전마진 20% 적용', 
                    content: '가치 평가의 불확실성을 고려하여 20% 안전마진을 두고 매매합니다. 본질 가치가 명확히 높거나 낮을 때만 거래하여 리스크를 줄입니다.' 
                }
            ]
        },
        {
            icon: 'fa-robot',
            title: '기존 증권사와의 근본적 차이',
            description: '기술적 분석이 아닌 본질 가치 투자',
            details: [
                { 
                    subtitle: '기존 증권사: 차트·호가 분석', 
                    content: '기존 증권사의 스마트 트레이딩은 이동평균선, RSI, MACD 등 기술적 지표와 호가창 분석에 의존합니다. 과거 가격 패턴으로 미래를 예측하는 방식입니다.' 
                },
                { 
                    subtitle: '본 시스템: 재무제표 기반 본질 가치', 
                    content: '우리 시스템은 위변조 불가능한 PDV 재무제표를 분석하여 기업의 본질 가치를 계산합니다. 차트가 아닌 재무 건전성과 수익성으로 투자 판단합니다.' 
                },
                { 
                    subtitle: 'Warren Buffett 가치투자 방식', 
                    content: '단기 차익이 아닌 장기 가치에 투자합니다. 좋은 기업을 저평가 시점에 매수하여 본질 가치가 실현될 때까지 보유하는 전략입니다.' 
                }
            ]
        },
        {
            icon: 'fa-chart-bar',
            title: '매매 손익 실시간 추적',
            description: '모든 거래의 수익과 손실 기록',
            details: [
                { 
                    subtitle: '거래별 손익 계산', 
                    content: '매수 시점의 가격과 매도 시점의 가격을 비교하여 실현 손익을 계산합니다. 수수료와 세금을 차감한 순수익을 기록합니다.' 
                },
                { 
                    subtitle: '성공률 집계', 
                    content: '전체 거래 중 수익을 낸 거래의 비율을 계산합니다. 현재 성공률은 약 75%로, 4건 중 3건은 수익, 1건은 손실입니다.' 
                },
                { 
                    subtitle: '수익률 분석', 
                    content: '월별, 분기별, 연간 누적 수익률을 추적합니다. 현재 연간 수익률은 28.5%로 시장 평균을 크게 상회합니다.' 
                }
            ]
        },
        {
            icon: 'fa-brain',
            title: 'AI 자기학습 및 모델 개선',
            description: '손익 원인 분석으로 지속적 성능 향상',
            details: [
                { 
                    subtitle: '손실 거래 원인 분석', 
                    content: '수익을 낸 거래와 손실을 본 거래를 비교 분석합니다. 어떤 업종, 어떤 신용등급, 어떤 재무 지표에서 예측이 빗나갔는지 파악합니다.' 
                },
                { 
                    subtitle: '평가 모델 자동 보정', 
                    content: '손실 원인을 바탕으로 신용평가 가중치와 가치평가 모델을 자동으로 조정합니다. 예: 부채비율 가중치를 30%→35%로 상향' 
                },
                { 
                    subtitle: '버전 업그레이드 이력', 
                    content: 'v1.0(정확도 62.3%) → v1.5(68.7%) → v2.0(72.5%) → v2.5(75.1%)로 지속적으로 성능이 향상되고 있습니다.' 
                }
            ]
        },
        {
            icon: 'fa-cogs',
            title: '신용평가 개선 피드백 루프',
            description: '매매 결과가 신용평가 알고리즘 개선으로 직결',
            details: [
                { 
                    subtitle: '매매 → 평가 모델 개선', 
                    content: '매매 결과를 신용평가 단계로 피드백하여 평가 알고리즘을 개선합니다. 매매 성공률이 높아지면 신용평가도 정교해집니다.' 
                },
                { 
                    subtitle: '업종별 특성 학습', 
                    content: 'IT 기업은 부채비율보다 성장성이 중요하고, 제조업은 자산건전성이 중요한 등 업종별 특성을 학습합니다.' 
                },
                { 
                    subtitle: '이벤트 영향도 학습', 
                    content: '금리 인상, 환율 급등 등 외부 이벤트가 각 기업의 신용등급에 미치는 영향을 학습하여 평가 모델에 반영합니다.' 
                }
            ]
        },
        {
            icon: 'fa-shield-halved',
            title: '리스크 관리 자동화',
            description: '포트폴리오 분산 및 손절 자동화',
            details: [
                { 
                    subtitle: '업종별 한도 설정', 
                    content: '특정 업종에 과도하게 집중 투자하지 않도록 업종별 투자 한도를 설정합니다. IT 30%, 제조 25%, 금융 20% 등으로 분산합니다.' 
                },
                { 
                    subtitle: '신용등급별 한도', 
                    content: '투기등급(BB 이하)에는 전체 자산의 10% 이내로만 투자하여 리스크를 제한합니다. 우량등급(A 이상)에 70% 이상을 배분합니다.' 
                },
                { 
                    subtitle: '자동 손절', 
                    content: '매수 후 15% 이상 하락하면 자동으로 손절하여 추가 손실을 방지합니다. 본질 가치 판단이 잘못되었음을 인정하고 빠르게 청산합니다.' 
                }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            {/* 핵심 개념 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <i className="fas fa-lightbulb text-purple-600"></i>
                    본질 가치 기반 스마트 트레이딩
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                        <strong className="text-purple-900">증권사 시스템은 모든 개인과 기관, 단체, 기업의 신용등급을 평가하며, 그 기초는 각 경제 단위에게 할당된 오픈해시 기반의 재무제표입니다.</strong>
                    </p>
                    <p>
                        신용등급을 기초로 이들이 발행한 증권의 <strong className="text-purple-900">본질 가치</strong>를 평가합니다. 
                        만약 <strong className="text-green-700">시장 가치 &lt; 평가 가치</strong>이면 저평가로 판단하여 <strong className="text-green-700">구매</strong>하고, 
                        <strong className="text-red-700">시장 가치 &gt; 평가 가치</strong>이면 고평가로 판단하여 <strong className="text-red-700">판매</strong>합니다.
                    </p>
                    <p>
                        <strong className="text-purple-900">이것이 기존 증권사의 스마트 트레이딩과 근본적으로 다른 점입니다.</strong> 
                        기존 시스템은 차트 패턴과 호가창을 분석하지만, 우리 시스템은 위변조 불가능한 재무제표로 본질 가치를 계산합니다.
                    </p>
                    <p>
                        시간이 지나면서 스마트 트레이딩은 <strong className="text-blue-900">이익을 보기도 손해를 보기도 합니다.</strong> 
                        AI 모듈은 그 원인을 분석하여 <strong className="text-blue-900">신용평가 및 증권 가치평가 기능을 지속적으로 개선합니다.</strong>
                        이것이 본 시스템의 핵심입니다.
                    </p>
                </div>
            </div>

            {/* 매매 실적 */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="fas fa-chart-line text-green-600"></i>
                    매매 실적 추이
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {tradingPerformance.map((item, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 mb-2">{item.period}</div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-xs text-gray-600">거래 건수</div>
                                        <div className="text-xl font-bold text-blue-600">{item.trades.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-600">수익률</div>
                                        <div className="text-xl font-bold text-green-600">+{item.profit}%</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-600">성공률</div>
                                        <div className="text-xl font-bold text-purple-600">{item.accuracy}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-900">
                        <i className="fas fa-trending-up mr-2"></i>
                        <strong>지속적 성능 향상:</strong> AI 자기학습을 통해 매매 성공률이 62.3% → 75.1%로 향상되었습니다.
                    </div>
                </div>
            </div>

            {/* AI 개선 이력 */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="fas fa-brain text-blue-600"></i>
                    AI 모델 개선 이력
                </h3>
                <div className="space-y-3">
                    {improvementHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-4">
                                <div className="text-2xl font-bold text-blue-600">{item.version}</div>
                                <div>
                                    <div className="text-sm text-gray-600">{item.date}</div>
                                    <div className="text-sm font-medium text-gray-900">{item.description}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-600">예측 정확도</div>
                                <div className="text-2xl font-bold text-purple-600">{item.accuracy}%</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-900">
                        <i className="fas fa-sync mr-2"></i>
                        <strong>자동 개선:</strong> 매매 손익을 분석하여 평가 모델의 가중치를 자동으로 조정합니다.
                    </div>
                </div>
            </div>

            {/* 상세 기능 */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">상세 기능</h3>
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

            {/* 핵심 강조 */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border-2 border-yellow-200">
                <div className="flex items-start gap-4">
                    <div className="p-4 bg-yellow-100 rounded-lg">
                        <i className="fas fa-star text-4xl text-yellow-600"></i>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-yellow-900 mb-3">
                            시스템의 핵심: AI 자기학습 사이클
                        </h3>
                        <div className="space-y-2 text-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                <span><strong>PDV 재무제표</strong> 분석 → 신용등급 부여</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                <span>신용등급 기반 <strong>증권 본질 가치</strong> 계산</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                <span>본질 가치 vs 시장 가격 비교 → <strong>저평가 매수, 고평가 매도</strong></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                                <span><strong>매매 손익 분석</strong> → 성공/실패 원인 파악</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                                <span>원인 분석 결과로 <strong>신용평가 및 가치평가 모델 개선</strong></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                                <span>개선된 모델로 다시 1번부터 반복 → <strong>지속적 성능 향상</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.SmartTrading = SmartTrading;
