const FPGASection = () => {
    const fpgaFeatures = [
        { 
            icon: '⚡', 
            title: 'FPGA 하드웨어 가속', 
            desc: 'OpenHash 검증 전용 칩',
            specs: ['424만 TPS', '0.3초 완결', '병렬 처리']
        },
        { 
            icon: '🔐', 
            title: '양자내성 암호', 
            desc: 'CRYSTALS-Kyber/Dilithium',
            specs: ['NIST 표준', '양자컴퓨터 대응', '256bit 보안']
        },
        { 
            icon: '🌐', 
            title: '크로스체인 브릿지', 
            desc: '이더리움·비트코인 연결',
            specs: ['실시간 교환', '수수료 0.1%', '즉시 정산']
        },
        { 
            icon: '💎', 
            title: 'OpenHash 원장', 
            desc: '블록체인보다 98.5% 절감',
            specs: ['5계층 구조', '무한 확장', '탈중앙화']
        }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-microchip text-blue-600 mr-3"></i>
                        핵심 기술 아키텍처
                    </h2>
                    <p className="text-lg text-gray-600">차세대 디지털 화폐를 위한 혁신 기술</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {fpgaFeatures.map((feature, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 card-hover shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-3xl shadow-md">
                                    {feature.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 mb-3">{feature.desc}</p>
                                    <div className="space-y-1">
                                        {feature.specs.map((spec, j) => (
                                            <div key={j} className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-1">
                                                • {spec}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <i className="fas fa-info-circle text-3xl text-blue-600 flex-shrink-0"></i>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">통합 플랫폼의 장점</h4>
                            <p className="text-gray-700">CBDC, 가상자산, 전자화폐가 단일 플랫폼에서 운영되어 거래 비용이 90% 절감되고, 실시간 크로스체인 교환이 가능합니다. FPGA 하드웨어 가속으로 초당 424만 건의 거래를 0.3초 만에 처리합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
