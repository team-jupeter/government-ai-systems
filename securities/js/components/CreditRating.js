function CreditRating() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    // 신용등급 분포 시뮬레이션 데이터
    const creditDistribution = [
        { grade: 'AAA', count: 450000, percentage: 0.75, color: '#10b981' },
        { grade: 'AA', count: 1200000, percentage: 2.0, color: '#3b82f6' },
        { grade: 'A', count: 4800000, percentage: 8.0, color: '#6366f1' },
        { grade: 'BBB', count: 18000000, percentage: 30.0, color: '#8b5cf6' },
        { grade: 'BB', count: 21000000, percentage: 35.0, color: '#ec4899' },
        { grade: 'B', count: 10800000, percentage: 18.0, color: '#f59e0b' },
        { grade: 'CCC 이하', count: 3750000, percentage: 6.25, color: '#ef4444' }
    ];

    // 신용등급별 채권 금리 시뮬레이션
    const bondRates = [
        { grade: 'AAA', rate: 3.2, description: '최우량 등급' },
        { grade: 'AA', rate: 3.8, description: '우량 등급' },
        { grade: 'A', rate: 4.5, description: '양호 등급' },
        { grade: 'BBB', rate: 5.8, description: '적정 투자등급 하한' },
        { grade: 'BB', rate: 7.5, description: '투기등급 상한' },
        { grade: 'B', rate: 10.2, description: '투기등급' },
        { grade: 'CCC 이하', rate: 15.5, description: '고위험 등급' }
    ];

    const features = [
        {
            icon: 'fa-database',
            title: 'PDV 기반 재무제표 자동 생성',
            description: '6천만 개체의 실시간 재무제표',
            details: [
                { 
                    subtitle: '5천만 인구 재무제표', 
                    content: '모든 국민의 소득, 지출, 자산, 부채를 실시간으로 추적하여 개인 재무제표를 자동 생성합니다. 모든 금융 거래가 PDV에 기록되며 위변조가 불가능합니다.' 
                },
                { 
                    subtitle: '1천만 사업자 재무제표', 
                    content: '모든 사업자의 매출, 비용, 자산, 부채를 실시간으로 집계하여 재무상태표, 손익계산서, 현금흐름표를 자동 생성합니다. 분식회계가 원천적으로 차단됩니다.' 
                },
                { 
                    subtitle: '재무분석 보고서 생성', 
                    content: '각 개체의 재무제표를 분석하여 유동성, 수익성, 안정성, 성장성 지표를 자동 산출합니다. 업종별, 규모별 비교 분석도 포함됩니다.' 
                }
            ]
        },
        {
            icon: 'fa-star',
            title: 'AI 기반 신용등급 자동 부여',
            description: '완전 자동화된 신용평가 시스템',
            details: [
                { 
                    subtitle: '국제 표준 등급 체계', 
                    content: 'AAA, AA, A, BBB, BB, B, CCC, CC, C, D의 10단계 신용등급을 부여합니다. S&P, Moody\'s, Fitch의 평가 기준을 준용합니다.' 
                },
                { 
                    subtitle: '사람 개입 없는 완전 자동화', 
                    content: 'DeepSeek R1 AI가 재무분석 보고서를 분석하여 신용등급을 자동으로 부여합니다. 인간의 주관이나 편향이 개입하지 않습니다.' 
                },
                { 
                    subtitle: '실시간 등급 갱신', 
                    content: '중요 이벤트 발생 시 즉시 재무제표가 갱신되고 신용등급도 자동으로 재평가됩니다. 평가 지연이 없습니다.' 
                }
            ]
        },
        {
            icon: 'fa-chart-bar',
            title: '신용등급 분포 시각화',
            description: '6천만 개체의 등급 분포 실시간 모니터링',
            details: [
                { 
                    subtitle: '등급별 분포 차트', 
                    content: 'AAA부터 D까지 각 등급에 속하는 인구 및 사업자 수를 실시간 차트로 표시합니다. 정규분포에 가까운 건전한 분포를 유지합니다.' 
                },
                { 
                    subtitle: '시계열 변화 추적', 
                    content: '신용등급 분포가 시간에 따라 어떻게 변화하는지 추적합니다. 경제 위기 시 하향 이동, 호황 시 상향 이동을 시각화합니다.' 
                },
                { 
                    subtitle: '업종별, 지역별 분석', 
                    content: 'IT, 제조, 금융 등 업종별 신용등급 분포와 서울, 경기, 지방 등 지역별 신용등급 분포를 비교 분석합니다.' 
                }
            ]
        },
        {
            icon: 'fa-percent',
            title: '신용등급별 채권 금리 시뮬레이션',
            description: '등급에 따른 자동 금리 산정',
            details: [
                { 
                    subtitle: 'AAA 등급: 3.2%', 
                    content: '최우량 등급으로 국채 수준의 낮은 금리를 적용받습니다. 대기업 및 고소득 개인이 해당됩니다.' 
                },
                { 
                    subtitle: 'BBB 등급: 5.8%', 
                    content: '투자적격 등급의 하한으로 중견기업 및 중산층 개인이 해당됩니다. 대부분의 기관투자자가 투자 가능한 등급입니다.' 
                },
                { 
                    subtitle: 'B 이하 등급: 10.2%+', 
                    content: '투기등급으로 높은 위험 프리미엄이 부과됩니다. 신용회복 중인 개인 및 재무구조가 취약한 중소기업이 해당됩니다.' 
                }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: '신용등급별 주가 시뮬레이션',
            description: '등급 변동 시 주가 즉시 반영',
            details: [
                { 
                    subtitle: '신용등급 상향 → 주가 상승', 
                    content: '사업자의 신용등급이 BBB에서 A로 상향되면 자본비용이 하락하여 기업가치가 상승합니다. 시뮬레이션에서 평균 8-12% 주가 상승을 예측합니다.' 
                },
                { 
                    subtitle: '신용등급 하향 → 주가 하락', 
                    content: '신용등급이 A에서 BBB로 하향되면 자본비용이 상승하여 기업가치가 하락합니다. 시뮬레이션에서 평균 10-15% 주가 하락을 예측합니다.' 
                },
                { 
                    subtitle: '투자등급 이탈 충격', 
                    content: 'BBB에서 BB로 하향되어 투자적격 등급을 상실하면 기관투자자들의 강제 매도가 발생합니다. 시뮬레이션에서 20-30% 급락을 예측합니다.' 
                }
            ]
        },
        {
            icon: 'fa-code',
            title: 'AI 신용평가 알고리즘 완전 공개',
            description: '투명한 평가 기준으로 신뢰 확보',
            details: [
                { 
                    subtitle: '평가 지표 공개', 
                    content: '부채비율, 이자보상배율, 유동비율, 매출액증가율 등 평가에 사용되는 모든 재무지표와 가중치를 공개합니다.' 
                },
                { 
                    subtitle: '등급 부여 로직 공개', 
                    content: 'AAA는 부채비율 30% 이하, 이자보상배율 10배 이상 등 구체적인 등급 부여 기준을 명시합니다. AI 블랙박스가 아닙니다.' 
                },
                { 
                    subtitle: 'GitHub 오픈소스', 
                    content: '신용평가 알고리즘 전체를 GitHub에 오픈소스로 공개하여 누구나 검증하고 개선안을 제안할 수 있습니다.' 
                }
            ]
        }
    ];

    const totalEntities = 60000000;
    const maxCount = Math.max(...creditDistribution.map(d => d.count));

    return (
        <div className="space-y-8">
            {/* 핵심 개념 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <i className="fas fa-star text-blue-600"></i>
                    AI 기반 신용평가 시스템
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p>
                        <strong className="text-blue-900">PDV가 생성 및 갱신하는 5천만 인구와 1천만 사업자 각각의 재무제표를 실시간으로 분석합니다.</strong> 
                        각자의 재무제표는 재무분석보고서를 포함하며, 6천만 개체의 신용등급을 AI가 자동으로 부여합니다.
                        <strong className="text-blue-900"> 이 모든 과정은 사람의 개입 없이 AI에 의해 완전 자동으로 수행됩니다.</strong>
                    </p>
                    <p className="mt-3">
                        <strong className="text-blue-900">AI의 신용등급 부여 알고리즘은 완전히 투명하게 공개됩니다.</strong> 
                        평가에 사용되는 모든 지표, 가중치, 등급 부여 기준을 명시하며 GitHub에 오픈소스로 공개하여 누구나 검증할 수 있습니다.
                    </p>
                </div>
            </div>

            {/* 신용등급 분포 */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="fas fa-chart-bar text-blue-600"></i>
                    신용등급 분포 (6천만 개체)
                </h3>
                <div className="space-y-4">
                    {creditDistribution.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold" style={{ color: item.color }}>
                                        {item.grade}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {item.count.toLocaleString()}명/개사 ({item.percentage}%)
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-gray-700">
                                    {item.percentage}%
                                </span>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
                                <div 
                                    className="absolute h-full rounded-lg transition-all duration-1000"
                                    style={{ 
                                        width: `${(item.count / maxCount) * 100}%`,
                                        backgroundColor: item.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-900">
                        <strong>총 6천만 개체:</strong> 5천만 인구 + 1천만 사업자
                    </div>
                </div>
            </div>

            {/* 신용등급별 채권 금리 */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="fas fa-percent text-green-600"></i>
                    신용등급별 채권 발행 금리
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {bondRates.map((item, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900 mb-1">{item.grade}</div>
                                <div className="text-3xl font-bold text-green-600 mb-2">{item.rate}%</div>
                                <div className="text-xs text-gray-600">{item.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-900">
                        <i className="fas fa-robot mr-2"></i>
                        <strong>AI 자동 산정:</strong> 신용등급에 따라 채권 금리가 자동으로 결정됩니다. 
                        등급이 높을수록 낮은 금리로 자금을 조달할 수 있습니다.
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

            {/* AI 투명성 강조 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
                <div className="flex items-start gap-4">
                    <div className="p-4 bg-purple-100 rounded-lg">
                        <i className="fas fa-shield-halved text-4xl text-purple-600"></i>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-purple-900 mb-3">
                            완전 자동화 & 완전 투명화
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <i className="fas fa-check-circle text-purple-600 mt-1"></i>
                                <span><strong>사람 개입 제로:</strong> 6천만 개체의 신용등급이 AI에 의해 완전 자동으로 부여됩니다.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-check-circle text-purple-600 mt-1"></i>
                                <span><strong>알고리즘 완전 공개:</strong> 평가 지표, 가중치, 등급 기준을 모두 공개하여 누구나 검증할 수 있습니다.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-check-circle text-purple-600 mt-1"></i>
                                <span><strong>GitHub 오픈소스:</strong> 신용평가 알고리즘 전체를 오픈소스로 공개합니다.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-check-circle text-purple-600 mt-1"></i>
                                <span><strong>편향 제거:</strong> 인간의 주관, 편견, 이해관계가 개입하지 않습니다.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.CreditRating = CreditRating;
