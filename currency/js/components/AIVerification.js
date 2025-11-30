const AIVerification = () => {
    const aiFeatures = [
        { 
            icon: '🔍', 
            title: '이상거래 탐지', 
            value: '99.8%',
            desc: 'AI 기반 실시간 모니터링'
        },
        { 
            icon: '🛡️', 
            title: '자금세탁 방지', 
            value: '100%',
            desc: 'KYC/AML 자동 검증'
        },
        { 
            icon: '📊', 
            title: '거래 패턴 분석', 
            value: '실시간',
            desc: '의심거래 즉시 차단'
        },
        { 
            icon: '🤖', 
            title: 'AI 규제 준수', 
            value: '자동화',
            desc: '금융규제 자동 적용'
        }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-shield-alt text-blue-600 mr-3"></i>
                        AI 기반 보안 검증
                    </h2>
                    <p className="text-lg text-gray-600">실시간 거래 모니터링과 자동 규제 준수</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {aiFeatures.map((feature, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200 text-center">
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">{feature.value}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-robot text-blue-600 mr-2"></i>
                        멀티에이전트 협력 시스템
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-3">🕵️</div>
                            <div className="font-semibold text-gray-900 mb-2">감시 에이전트</div>
                            <p className="text-sm text-gray-600">24/7 거래 모니터링</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-3">⚖️</div>
                            <div className="font-semibold text-gray-900 mb-2">규제 에이전트</div>
                            <p className="text-sm text-gray-600">자동 컴플라이언스</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-3">🚨</div>
                            <div className="font-semibold text-gray-900 mb-2">대응 에이전트</div>
                            <p className="text-sm text-gray-600">의심거래 즉시 차단</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
