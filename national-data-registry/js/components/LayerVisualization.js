const LayerVisualization = () => {
    const layers = [
        { 
            name: '개인 데이터 계층', 
            icon: '👤', 
            color: 'from-blue-500 to-blue-600',
            items: ['개인정보', '건강기록', '금융정보', '교육이력'],
            description: '개인이 통제하는 프라이빗 데이터'
        },
        { 
            name: '민간 데이터 계층', 
            icon: '🏢', 
            color: 'from-cyan-500 to-cyan-600',
            items: ['기업데이터', '거래정보', '서비스기록', '고객관리'],
            description: '기업과 조직의 비즈니스 데이터'
        },
        { 
            name: '공공 데이터 계층', 
            icon: '🏛️', 
            color: 'from-green-500 to-green-600',
            items: ['행정정보', '통계자료', '공시정보', '정책문서'],
            description: '정부와 공공기관의 오픈 데이터'
        },
        { 
            name: '연계 허브 계층', 
            icon: '🔗', 
            color: 'from-purple-500 to-purple-600',
            items: ['데이터연계', '권한관리', 'API게이트웨이', '로그관리'],
            description: '계층 간 안전한 데이터 연계'
        },
        { 
            name: '검증 계층', 
            icon: '✓', 
            color: 'from-amber-500 to-amber-600',
            items: ['무결성검증', '암호화', '감사추적', '합의알고리즘'],
            description: 'OpenHash 기반 무결성 보장'
        }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-layer-group text-blue-600 mr-3"></i>
                        5계층 데이터 아키텍처
                    </h2>
                    <p className="text-lg text-gray-600">공공·민간·개인 데이터를 안전하게 연결하는 통합 네트워크</p>
                </div>
                
                <div className="space-y-4">
                    {layers.map((layer, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 card-hover shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${layer.color} rounded-xl flex items-center justify-center text-3xl shadow-md`}>
                                    {layer.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{layer.name}</h3>
                                    <p className="text-gray-600 mb-3">{layer.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {layer.items.map((item, j) => (
                                            <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-blue-600">
                                    {i + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <i className="fas fa-info-circle text-3xl text-blue-600 flex-shrink-0"></i>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">OpenHash 기반 검증</h4>
                            <p className="text-gray-700">각 계층의 데이터는 OpenHash 분산원장에 해시값이 기록되어 무결성이 보장됩니다. 블록체인 대비 98.5% 에너지 절감하면서도 동일한 수준의 보안성을 제공합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
