const Architecture = () => {
    const layers = [
        {
            layer: 'Layer 4',
            number: 130,
            name: '국가 (National Level)',
            nodes: 'Cloud Archive - 영구 보존 계층',
            role: '전국 단위 데이터 통합, 장기 아카이빙, 최종 감사 추적',
            examples: '중앙정부 데이터센터, 국가 백본 네트워크',
            color: 'border-l-purple-600 bg-purple-50',
            icon: 'fa-flag'
        },
        {
            layer: 'Layer 3',
            number: 120,
            name: '광역시도 (Metropolitan/Provincial Level)',
            nodes: 'Core Engine - 중앙 처리 계층, Representative 노드',
            role: 'PBFT 합의 수행, 광역 단위 데이터 검증 및 집약',
            examples: '서울시, 경기도, 제주특별자치도 등 17개 광역자치단체',
            color: 'border-l-blue-600 bg-blue-50',
            icon: 'fa-city'
        },
        {
            layer: 'Layer 2',
            number: 110,
            name: '시군구 (City/County/District Level)',
            nodes: 'Edge Server - 지역 집약 계층',
            role: 'Merkle Tree 집약, 기초자치단체 단위 중간 검증',
            examples: '서울 강남구, 제주시, 부산 해운대구 등 226개 기초자치단체',
            color: 'border-l-green-600 bg-green-50',
            icon: 'fa-building'
        },
        {
            layer: 'Layer 1',
            number: 100,
            name: '읍면동 (Town/Township/Neighborhood Level)',
            nodes: 'Edge Device - 최하위 계층',
            role: '최일선 행정 단위, 1차 데이터 수집 및 검증',
            examples: '행정동 3,488개, 법정동 포함 시 더 세분화',
            color: 'border-l-yellow-600 bg-yellow-50',
            icon: 'fa-home'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">4계층 아키텍처</h3>
                    <p className="text-gov-text-secondary">대한민국 행정 구역 체계를 활용한 계층적 분산 구조</p>
                </div>

                {/* Edge Device 설명 */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <i className="fas fa-mobile-alt text-3xl text-gray-600"></i>
                            <div>
                                <h4 className="text-lg font-bold text-gov-text">Edge Device (사용자 단말)</h4>
                                <p className="text-sm text-gov-text-secondary">계층 구조 외부의 데이터 생성/소비 장치</p>
                            </div>
                        </div>
                        <div className="text-sm text-gov-text-secondary ml-12">
                            <p className="mb-2"><span className="font-medium text-gov-text">역할:</span> 스마트폰, 태블릿, IoT 센서 등 최종 사용자 디바이스에서 데이터 생성 및 Layer 1로 전송</p>
                            <p><span className="font-medium text-gov-text">예시:</span> 민원인 스마트폰, 공무원 업무용 단말, 정부24 앱, 각종 IoT 센서</p>
                        </div>
                    </div>
                </div>

                {/* 4계층 구조 */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {layers.map((layer, idx) => (
                        <div key={idx} className={`border-l-4 ${layer.color} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-gov-blue bg-opacity-10 rounded-full flex-shrink-0">
                                    <i className={`fas ${layer.icon} text-gov-blue text-xl`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="inline-block px-3 py-1 bg-gov-blue text-white text-sm font-bold rounded">
                                            {layer.layer}
                                        </span>
                                        <h4 className="text-lg font-bold text-gov-text">{layer.name}</h4>
                                        <span className="text-xs text-gov-text-secondary">도면 부호: {layer.number}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gov-text-secondary">
                                            <span className="font-medium text-gov-text">노드 구성:</span> {layer.nodes}
                                        </p>
                                        <p className="text-sm text-gov-text-secondary">
                                            <span className="font-medium text-gov-text">주요 역할:</span> {layer.role}
                                        </p>
                                        <p className="text-sm text-gov-text-secondary">
                                            <span className="font-medium text-gov-text">실제 사례:</span> {layer.examples}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 데이터 흐름 다이어그램 */}
                <div className="mt-12 max-w-4xl mx-auto bg-gov-gray rounded-lg p-8 border-2 border-gov-blue">
                    <h4 className="text-xl font-bold text-gov-text mb-6 text-center">데이터 흐름 구조</h4>
                    <div className="space-y-3">
                        {['Edge Device (스마트폰 등)', 'Layer 1 (읍면동)', 'Layer 2 (시군구)', 'Layer 3 (광역시도)', 'Layer 4 (국가)'].map((item, idx) => (
                            <React.Fragment key={idx}>
                                <div className="bg-white rounded-lg p-4 text-center font-medium text-gov-text border border-gov-border">
                                    {item}
                                </div>
                                {idx < 4 && (
                                    <div className="flex justify-center">
                                        <i className="fas fa-arrow-down text-2xl text-gov-blue"></i>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <p className="text-sm text-gov-text-secondary text-center mt-6">
                        각 계층은 SHA-256 재해싱 기반 확률적 알고리즘으로 자동 결정됩니다
                    </p>
                </div>
            </div>
        </section>
    );
};
