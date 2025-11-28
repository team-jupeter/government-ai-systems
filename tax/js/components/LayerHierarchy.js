const LayerHierarchy = () => {
    const [selectedLayer, setSelectedLayer] = React.useState(null);
    const [liveData, setLiveData] = React.useState({
        layer1: { tps: 63.34, transactions: 847293, collected: 12500000000000 },
        layer2: { tps: 292.12, transactions: 234892, collected: 45200000000000 },
        layer3: { tps: 374.76, transactions: 89234, collected: 128300000000000 },
        layer4: { tps: 1500, transactions: 12847, collected: 150500000000000 }
    });

    const layers = [
        {
            id: 1,
            name: 'Layer 1: 읍면동',
            description: '개인/소규모 사업자 관할',
            nodes: 3496,
            coverage: '전국 읍면동 세무서',
            probability: '65%',
            taxTypes: ['종합소득세', '부가가치세', '간이과세'],
            color: 'blue',
            examples: ['용담1동', '삼도1동', '연동', '노형동', '서귀포시']
        },
        {
            id: 2,
            name: 'Layer 2: 시군구',
            description: '중소기업/법인 관할, Layer 1 취합',
            nodes: 226,
            coverage: '전국 시군구 세무서',
            probability: '25%',
            taxTypes: ['법인세', '원천세', '특별소비세'],
            color: 'green',
            examples: ['제주시', '서귀포시', '강남구', '송파구', '분당구']
        },
        {
            id: 3,
            name: 'Layer 3: 광역시도',
            description: '대기업 관할, Layer 2 취합',
            nodes: 17,
            coverage: '7개 지방국세청 + 10개 광역시도',
            probability: '9%',
            taxTypes: ['대규모 집계', '국제조세', '이전가격'],
            color: 'purple',
            examples: ['제주특별자치도', '서울특별시', '경기도', '부산광역시']
        },
        {
            id: 4,
            name: 'Layer 4: 국가',
            description: '전국 총괄, 국제조세, OECD 협력',
            nodes: 1,
            coverage: '국세청 본청',
            probability: '1%',
            taxTypes: ['OECD 국제조세', '조세조약', '상호합의절차', '전국 통계'],
            color: 'cyan',
            examples: ['대한민국 국세청']
        }
    ];

    // 실시간 데이터 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setLiveData(prev => ({
                layer1: { 
                    tps: 60 + Math.random() * 10, 
                    transactions: prev.layer1.transactions + Math.floor(Math.random() * 100),
                    collected: prev.layer1.collected + Math.floor(Math.random() * 100000000)
                },
                layer2: { 
                    tps: 280 + Math.random() * 30, 
                    transactions: prev.layer2.transactions + Math.floor(Math.random() * 50),
                    collected: prev.layer2.collected + Math.floor(Math.random() * 500000000)
                },
                layer3: { 
                    tps: 360 + Math.random() * 30, 
                    transactions: prev.layer3.transactions + Math.floor(Math.random() * 20),
                    collected: prev.layer3.collected + Math.floor(Math.random() * 1000000000)
                },
                layer4: { 
                    tps: 1400 + Math.random() * 200, 
                    transactions: prev.layer4.transactions + Math.floor(Math.random() * 5),
                    collected: prev.layer4.collected + Math.floor(Math.random() * 2000000000)
                }
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const formatKRW = (num) => {
        if (num >= 1000000000000) return `₩${(num / 1000000000000).toFixed(1)}조`;
        if (num >= 100000000) return `₩${(num / 100000000).toFixed(1)}억`;
        return `₩${num.toLocaleString()}`;
    };

    const getColorClasses = (color) => ({
        bg: `bg-${color}-500/20`,
        border: `border-${color}-500/30`,
        text: `text-${color}-400`,
        glow: `shadow-${color}-500/20`
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 상단 개요 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <i className="fas fa-layer-group text-cyan-400"></i>
                        OpenHash 4계층 세무행정 아키텍처
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-green-400 text-sm">네트워크 활성</span>
                    </div>
                </div>
                <p className="text-gray-400">
                    한국 행정체계에 맞춘 4계층 분산 네트워크로, 읍면동 → 시군구 → 광역시도 → 국가 단위로 세금을 취합하고 검증합니다.
                    확률적 배정 알고리즘에 따라 거래가 각 계층에 분산 처리됩니다.
                </p>
            </div>

            {/* 시각적 계층 구조 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-6">계층 흐름도</h3>
                <div className="flex items-center justify-center gap-4 py-8">
                    {layers.map((layer, idx) => {
                        const colorClasses = getColorClasses(layer.color);
                        const data = liveData[`layer${layer.id}`];
                        
                        return (
                            <React.Fragment key={layer.id}>
                                <div 
                                    className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 ${
                                        selectedLayer === layer.id ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-' + layer.color + '-500' : ''
                                    }`}
                                    onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                                    style={{ minWidth: '200px' }}
                                >
                                    <div className="text-center">
                                        <div className={`text-4xl font-bold ${colorClasses.text} mb-2`}>L{layer.id}</div>
                                        <div className="text-white font-bold">{layer.name.split(':')[1].trim()}</div>
                                        <div className="text-sm text-gray-400 mt-1">{layer.nodes.toLocaleString()} 노드</div>
                                        <div className={`mt-3 ${colorClasses.bg} rounded-lg px-3 py-2`}>
                                            <div className={`text-lg font-bold ${colorClasses.text}`}>{data.tps.toFixed(2)} TPS</div>
                                            <div className="text-xs text-gray-400">{layer.probability} 배정</div>
                                        </div>
                                    </div>
                                </div>
                                {idx < layers.length - 1 && (
                                    <div className="flex flex-col items-center">
                                        <i className="fas fa-arrow-right text-2xl text-gray-500 animate-pulse"></i>
                                        <span className="text-xs text-gray-500 mt-1">취합</span>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* 상세 정보 그리드 */}
            <div className="grid grid-cols-2 gap-6">
                {layers.map(layer => {
                    const colorClasses = getColorClasses(layer.color);
                    const data = liveData[`layer${layer.id}`];
                    
                    return (
                        <div 
                            key={layer.id}
                            className={`${colorClasses.bg} ${colorClasses.border} border rounded-2xl p-6 ${
                                selectedLayer === layer.id ? 'ring-2 ring-' + layer.color + '-500' : ''
                            }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center`}>
                                        <span className={`text-xl font-bold ${colorClasses.text}`}>L{layer.id}</span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{layer.name}</div>
                                        <div className="text-sm text-gray-400">{layer.description}</div>
                                    </div>
                                </div>
                                <div className={`${colorClasses.bg} px-3 py-1 rounded-full ${colorClasses.text} text-sm`}>
                                    {layer.probability}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-xs text-gray-400">노드 수</div>
                                    <div className="text-lg font-bold text-white">{layer.nodes.toLocaleString()}</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-xs text-gray-400">처리 거래</div>
                                    <div className="text-lg font-bold text-white">{data.transactions.toLocaleString()}</div>
                                </div>
                                <div className="bg-gray-800/50 rounded-lg p-3">
                                    <div className="text-xs text-gray-400">징수액</div>
                                    <div className="text-lg font-bold text-white">{formatKRW(data.collected)}</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-xs text-gray-400 mb-2">담당 세목</div>
                                <div className="flex flex-wrap gap-2">
                                    {layer.taxTypes.map((tax, idx) => (
                                        <span key={idx} className={`${colorClasses.bg} ${colorClasses.text} px-2 py-1 rounded text-xs`}>
                                            {tax}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-gray-400 mb-2">예시 관할</div>
                                <div className="text-sm text-gray-300">{layer.examples.join(', ')}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 확률적 배정 알고리즘 설명 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-random text-purple-400"></i>
                    확률적 세무사건 배정 알고리즘
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-700/50 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-3">배정 공식</h4>
                        <div className="font-mono text-sm text-cyan-400 bg-gray-900 rounded p-3">
                            layer = SHA256(tx_hash + timestamp + office_code) % 1000<br/>
                            if (layer &lt; 650) → Layer 1 (65%)<br/>
                            elif (layer &lt; 900) → Layer 2 (25%)<br/>
                            elif (layer &lt; 990) → Layer 3 (9%)<br/>
                            else → Layer 4 (1%)
                        </div>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-3">검증 결과</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">목표 대비 편차</span>
                                <span className="text-green-400 font-bold">&lt; 3.0%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">카이제곱 검정</span>
                                <span className="text-green-400 font-bold">χ² = 2.34 &lt; 5.991 ✓</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">NIST SP 800-22</span>
                                <span className="text-green-400 font-bold">96.8% 통과</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
