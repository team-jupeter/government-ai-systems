const TaxAutomation = () => {
    const taxFeatures = [
        { icon: '🧾', title: '자동 세금 계산', desc: '거래 시 실시간 계산', rate: '즉시' },
        { icon: '💳', title: '자동 원천징수', desc: 'AI 기반 세율 적용', rate: '0.1초' },
        { icon: '📝', title: '전자신고', desc: '국세청 직접 전송', rate: '자동' },
        { icon: '🔍', title: '투명한 추적', desc: '모든 거래 감사 가능', rate: '100%' }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-calculator text-blue-600 mr-3"></i>
                        세무 자동화 시스템
                    </h2>
                    <p className="text-lg text-gray-600">거래부터 신고까지 완전 자동화</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {taxFeatures.map((feature, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200">
                            <div className="text-5xl mb-4 text-center">{feature.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{feature.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 text-center">{feature.desc}</p>
                            <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
                                <div className="text-sm font-semibold text-blue-700">{feature.rate}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-building text-blue-600 mr-2"></i>
                        국세청 연계 시스템
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-3">💼</div>
                            <div className="font-semibold text-gray-900 mb-2">법인세 자동계산</div>
                            <p className="text-sm text-gray-600">손익에 따라 실시간 세액 산출</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-3">💰</div>
                            <div className="font-semibold text-gray-900 mb-2">부가세 자동신고</div>
                            <p className="text-sm text-gray-600">매출·매입 자동 집계 및 신고</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-3">📊</div>
                            <div className="font-semibold text-gray-900 mb-2">종합소득세 지원</div>
                            <p className="text-sm text-gray-600">개인 거래 내역 자동 정리</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
