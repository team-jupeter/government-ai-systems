const IntegratedFinance = () => {
    const services = [
        { 
            icon: '🏦', 
            title: '통합 지갑', 
            desc: 'CBDC·가상자산·전자화폐 한곳에',
            features: ['다중 화폐 지원', '실시간 환전', '원터치 송금']
        },
        { 
            icon: '💳', 
            title: '스마트 결제', 
            desc: '오프라인 매장에서 즉시 결제',
            features: ['QR 결제', 'NFC 지원', '포인트 적립']
        },
        { 
            icon: '📊', 
            title: 'DeFi 통합', 
            desc: '예금·대출·투자 자동화',
            features: ['자동 수익 최적화', 'AI 포트폴리오', '스테이킹']
        }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-wallet text-blue-600 mr-3"></i>
                        통합 금융 서비스
                    </h2>
                    <p className="text-lg text-gray-600">하나의 플랫폼에서 모든 금융 활동</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {services.map((service, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200">
                            <div className="text-5xl mb-4 text-center">{service.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{service.title}</h3>
                            <p className="text-gray-600 mb-4 text-center">{service.desc}</p>
                            <div className="space-y-2">
                                {service.features.map((feature, j) => (
                                    <div key={j} className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                                        • {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            <i className="fas fa-mobile-alt text-blue-600 mr-2"></i>
                            모바일 앱으로 간편하게
                        </h3>
                        <p className="text-gray-600">iOS·Android 지원 | 생체인증 보안</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-2">💰</div>
                            <div className="text-sm font-semibold text-gray-900">잔액 조회</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="text-sm font-semibold text-gray-900">즉시 송금</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-sm font-semibold text-gray-900">자산 분석</div>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                            <div className="text-3xl mb-2">🔔</div>
                            <div className="text-sm font-semibold text-gray-900">알림 설정</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
