function Overview() {
    const [expandedCard, setExpandedCard] = React.useState(null);

    const features = [
        {
            icon: 'fa-database',
            title: '프라이빗 데이터 금고 (PDV) 기반 시스템',
            description: '모든 금융 거래는 개인과 사업자의 PDV에 보관',
            details: [
                { 
                    subtitle: '위변조 불가능한 재무제표', 
                    content: '오픈해시는 모든 국민과 사업자에게 위변조 불가능하고 허위나 분식이 불가능한 재무제표를 제공합니다. 개인과 단체의 모든 금융 거래는 각자의 프라이빗 데이터 금고에 보관되며, 그 해시를 오픈해시 네트워크에 저장함으로써 데이터의 진실성을 증명합니다.' 
                },
                { 
                    subtitle: '5천만 인구와 1천만 사업자', 
                    content: '오픈해시의 PDV 시스템은 5천만 인구와 1천만 사업자의 재무제표를 생성 및 갱신합니다. PDV에 저장되는 대표적인 데이터가 재무제표이며, 증권사 시스템은 이 PDV를 기반으로 동작합니다.' 
                },
                { 
                    subtitle: '해시 기반 무결성 보장', 
                    content: '모든 거래 데이터의 해시를 오픈해시 네트워크에 저장하여, 향후 자신이 보관한 데이터의 진실성을 언제든지 증명할 수 있습니다.' 
                }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: '재무제표 기반 신용등급 평가',
            description: '위변조 불가능한 재무제표만으로 정확한 신용등급 산출',
            details: [
                { 
                    subtitle: '정확한 신용등급 판단', 
                    content: '모든 사업자는 위변조 불가능한 재무제표를 보유하며, 따라서 재무제표만으로 해당 사업자의 신용등급을 정확히 판단할 수 있습니다.' 
                },
                { 
                    subtitle: '증권 가격 결정', 
                    content: '사업자 각각의 신용등급은 그가 발행하는 채권과 주식 가격을 결정합니다. 신용등급에 따라 개인 혹은 단체가 발행한 증권의 가치를 추산합니다.' 
                },
                { 
                    subtitle: 'AI 기반 자동 평가', 
                    content: '오직 재무제표만을 근거로 개인과 사업자 각각의 신용등급을 자동으로 결정합니다.' 
                }
            ]
        },
        {
            icon: 'fa-sync',
            title: '실시간 신용등급 갱신',
            description: '중요 이벤트 발생 시 즉시 신용등급 조정',
            details: [
                { 
                    subtitle: '이벤트 기반 갱신', 
                    content: '신용등급은 중요한 이벤트가 발생하는 매 순간 갱신됩니다. 중요한 이벤트는 해당 사업자의 사적인 이벤트일 수 있고, 해당 사업자의 매출에 영향을 미칠 산업이나 사회 혹은 국가나 글로벌 변동일 수도 있습니다.' 
                },
                { 
                    subtitle: '다층적 영향도 분석', 
                    content: '개인, 사업자, 사회, 국가 또는 글로벌 단위에서 중요한 이벤트가 발생할 경우, 그에 영향받는 개인과 사업자 등의 신용등급을 실시간으로 조정합니다.' 
                },
                { 
                    subtitle: '증권 시장 가격 조정', 
                    content: '신용등급 변동에 따라 해당 개인이나 사업자가 발행한 각종 증권의 시장 가격도 실시간으로 조정됩니다.' 
                }
            ]
        },
        {
            icon: 'fa-shield-halved',
            title: '분식회계 원천 차단',
            description: '거래 기반 자동 재무제표 생성',
            details: [
                { 
                    subtitle: '거래 즉시 기록', 
                    content: '모든 매출·비용 거래가 발생하는 순간 PDV에 자동 기록되어 분식회계가 원천적으로 불가능합니다.' 
                },
                { 
                    subtitle: '교차 검증', 
                    content: '거래 상대방의 재무제표와 자동으로 교차 확인하여 허위 매출이나 가공 거래를 즉시 적발합니다.' 
                },
                { 
                    subtitle: '실시간 재무제표', 
                    content: '거래가 발생할 때마다 재무제표가 자동으로 갱신되어 항상 최신 상태를 유지합니다.' 
                }
            ]
        },
        {
            icon: 'fa-building',
            title: '전체 시장 투명성 확보',
            description: '모든 참여자의 정확한 신용도 파악',
            details: [
                { 
                    subtitle: '완전한 시장 정보', 
                    content: '모든 사업자와 개인의 신용등급이 정확하게 산출되어 시장 참여자들이 완전한 정보를 바탕으로 투자 결정을 내릴 수 있습니다.' 
                },
                { 
                    subtitle: '정보 비대칭 해소', 
                    content: '내부자만 알 수 있었던 재무 정보가 정확하게 공개되어 정보 비대칭이 해소됩니다.' 
                },
                { 
                    subtitle: '공정한 가격 발견', 
                    content: '정확한 신용등급을 바탕으로 증권의 공정한 가격이 시장에서 자동으로 발견됩니다.' 
                }
            ]
        },
        {
            icon: 'fa-robot',
            title: 'DeepSeek R1 AI 통합',
            description: '금융 도메인 특화 AI 분석',
            details: [
                { 
                    subtitle: '복잡한 패턴 인식', 
                    content: 'DeepSeek R1 AI가 수백만 개의 재무제표와 이벤트 데이터를 학습하여 복잡한 영향 관계를 파악합니다.' 
                },
                { 
                    subtitle: '예측 모델', 
                    content: '과거 데이터를 기반으로 이벤트 발생 시 신용등급 변동 방향과 규모를 예측합니다.' 
                },
                { 
                    subtitle: '자동화된 의사결정', 
                    content: 'AI가 24/7 모든 데이터를 모니터링하고 자동으로 신용등급과 증권 가격을 조정합니다.' 
                }
            ]
        }
    ];

    return (
        <div className="space-y-8">
            {/* 핵심 개념 설명 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <i className="fas fa-lightbulb text-blue-600"></i>
                    오픈해시 증권 시스템 핵심 개념
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                        <strong className="text-blue-900">오픈해시는 모든 국민과 사업자가 위변조 불가능하고, 허위나 분식이 불가능한 재무제표를 제공합니다.</strong> 
                        개인과 단체의 모든 금융 거래는 그의 프라이빗 데이터 금고(PDV)에 보관되며, 그 해시를 오픈해시 네트워크에 저장함으로써, 
                        향후 자신이 보관한 데이터의 진실성을 증명하게 됩니다.
                    </p>
                    <p>
                        <strong className="text-blue-900">증권사 시스템은 오픈해시의 PDV를 기반으로 동작합니다.</strong> 
                        모든 사업자는 위변조 불가능한 재무제표를 보유하며, 따라서 재무제표만으로 해당 사업자의 신용등급을 정확히 판단할 수 있습니다. 
                        사업자 각각의 신용등급은 그가 발행하는 채권과 주식 가격을 결정하며, 신용등급은 중요한 이벤트가 발생하는 매 순간 갱신됩니다.
                    </p>
                    <p>
                        <strong className="text-blue-900">중요한 이벤트는 다층적입니다.</strong> 
                        해당 사업자의 사적인 이벤트일 수 있고, 해당 사업자의 매출에 영향을 미칠 산업이나 사회 혹은 국가나 글로벌 변동일 수도 있습니다.
                    </p>
                </div>
            </div>

            {/* 시스템 작동 원리 */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="fas fa-cogs text-indigo-600"></i>
                    시스템 작동 원리
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-database text-white text-2xl"></i>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">1. PDV 데이터 수집</h4>
                        <p className="text-sm text-gray-600">5천만 인구와 1천만 사업자의 재무제표 생성 및 갱신</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">2. 신용등급 산출</h4>
                        <p className="text-sm text-gray-600">재무제표만으로 개인과 사업자의 정확한 신용등급 결정</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fas fa-coins text-white text-2xl"></i>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">3. 증권 가격 결정</h4>
                        <p className="text-sm text-gray-600">신용등급에 따라 증권 가치 추산 및 실시간 조정</p>
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
        </div>
    );
}

window.Overview = Overview;
