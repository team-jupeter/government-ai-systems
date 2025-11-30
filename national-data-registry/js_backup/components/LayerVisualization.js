const LayerVisualization = () => {
    const [activeLayer, setActiveLayer] = React.useState(null);
    const [simulationRunning, setSimulationRunning] = React.useState(false);
    
    const layers = [
        { num: 1, name: '읍면동 + 현장', nodes: '5,200만+', tps: '416만', color: 'cyan', icon: '📱',
          components: ['읍면동 주민센터 3,503개', '학교 24,000개', '병원 3,500개', '금융기관 19,000개', '개인 단말기 5,000만+'],
          role: '데이터 최초 생성, Edge Storage, SHA-256 해시 전송', probability: '60%' },
        { num: 2, name: '시군구', nodes: '828', tps: '66,240', color: 'blue', icon: '🏢',
          components: ['시청·군청·구청 226개', '기초의회 226개', '지방법원·지청 58개', '지방검찰청 60개', '경찰서 258개'],
          role: 'Merkle Tree 집약, 1차 검증, LPBFT 합의', probability: '25%' },
        { num: 3, name: '광역시도', nodes: '96', tps: '13,344', color: 'purple', icon: '🌐',
          components: ['17개 광역시도청', '17개 광역시도의회', '17개 시도교육청', '고등법원 6개', '이동통신 3사×5권역'],
          role: '광역 단위 검증, Representative 노드 후보 관리', probability: '10%' },
        { num: 4, name: '입법부·행정부·사법부', nodes: '54', tps: '7,668', color: 'green', icon: '🏛️',
          components: ['입법부 8개 (국회, 감사원 등)', '행정부 37개 (대통령실, 18부, 17청)', '사법부 9개 (대법원, 헌재 등)'],
          role: 'PBFT 합의 (36-of-54), BLS 다중 서명, 국가 차원 검증', probability: '4%' },
        { num: 5, name: '국가데이터처', nodes: '3', tps: '1,500', color: 'yellow', icon: '🔍',
          components: ['대전 본청 (Primary)', '서울 분소 (Replica)', '부산 분소 (Replica)'],
          role: '전체 해시 인덱스 (데이터의 구글), 국가통계 최종 승인, Archive', probability: '1%' }
    ];
    
    const runSimulation = () => {
        setSimulationRunning(true);
        let step = 0;
        const interval = setInterval(() => {
            if (step <= 4) { setActiveLayer(step + 1); step++; }
            else { setSimulationRunning(false); clearInterval(interval); setTimeout(() => setActiveLayer(null), 2000); }
        }, 1500);
    };
    
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4"><i className="fas fa-layer-group mr-3 text-blue-400"></i>대한민국 정부 오픈해시 5계층 구조</h2>
                    <p className="text-gray-400">읍면동 → 시군구 → 광역시도 → 입법·행정·사법부 → 국가데이터처</p>
                    <p className="text-cyan-400 text-sm mt-2">국가데이터처 = 정부 데이터의 구글 (전체 해시 인덱스 관리)</p>
                </div>
                <div className="mb-6 text-center">
                    <button onClick={runSimulation} disabled={simulationRunning} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-bold">
                        {simulationRunning ? <span><i className="fas fa-spinner fa-spin mr-2"></i>데이터 흐름 시뮬레이션 중...</span> : <span><i className="fas fa-play mr-2"></i>데이터 흐름 시뮬레이션</span>}
                    </button>
                </div>
                <div className="space-y-4">
                    {layers.map((layer, i) => (
                        <div key={i} onClick={() => setActiveLayer(activeLayer === layer.num ? null : layer.num)}
                            className={`bg-gray-900 rounded-xl p-6 border-2 cursor-pointer transition-all ${activeLayer === layer.num ? 'border-blue-500 shadow-lg shadow-blue-500/30' : 'border-gray-700 hover:border-gray-600'}`}>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0"><span className="text-3xl">{layer.icon}</span></div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-1 bg-blue-600/30 text-blue-400 rounded text-sm font-bold">Layer {layer.num}</span>
                                        <h3 className="text-lg font-bold">{layer.name}</h3>
                                        <span className="px-2 py-1 bg-yellow-600/30 text-yellow-400 rounded text-xs">{layer.probability}</span>
                                    </div>
                                    <p className="text-sm text-gray-400">{layer.role}</p>
                                </div>
                                <div className="flex gap-6 text-center">
                                    <div><div className="text-xl font-bold text-cyan-400">{layer.nodes}</div><div className="text-xs text-gray-500">노드</div></div>
                                    <div><div className="text-xl font-bold text-green-400">{layer.tps}</div><div className="text-xs text-gray-500">TPS</div></div>
                                </div>
                            </div>
                            {activeLayer === layer.num && (
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <h4 className="text-sm font-bold text-gray-400 mb-2">🔧 구성 요소</h4>
                                    <div className="flex flex-wrap gap-2">{layer.components.map((comp, j) => (
                                        <span key={j} className="px-3 py-1 bg-gray-800 rounded text-sm">{comp}</span>))}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-900/30 rounded-xl p-4 text-center border border-blue-500/30"><div className="text-2xl font-bold text-blue-400">424만+</div><div className="text-sm text-gray-400">총 TPS</div></div>
                    <div className="bg-green-900/30 rounded-xl p-4 text-center border border-green-500/30"><div className="text-2xl font-bold text-green-400">5,200만+</div><div className="text-sm text-gray-400">총 노드</div></div>
                    <div className="bg-purple-900/30 rounded-xl p-4 text-center border border-purple-500/30"><div className="text-2xl font-bold text-purple-400">99.97%</div><div className="text-sm text-gray-400">누적 신뢰도</div></div>
                    <div className="bg-yellow-900/30 rounded-xl p-4 text-center border border-yellow-500/30"><div className="text-2xl font-bold text-yellow-400">98.5%</div><div className="text-sm text-gray-400">에너지 절감</div></div>
                </div>
                <div className="mt-8 bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
                    <h3 className="font-bold text-cyan-400 mb-4"><i className="fas fa-search mr-2"></i>국가데이터처 = 정부 데이터의 구글</h3>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                        <div className="text-gray-400 mb-2">// 검색 API 예시</div>
                        <div className="text-green-400">GET https://api.ndr.go.kr/search?hash=a1b2c3d4e5f6...</div>
                        <div className="text-gray-400 mt-2">// 응답</div>
                        <div className="text-yellow-400">{"{"}"type": "운전면허증", "location": "도로교통공단", "layer": 1, "verified": true{"}"}</div>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">모든 정부 기관이 생산한 데이터의 해시값을 인덱싱하여, 어떤 데이터가 어디에 저장되어 있는지 즉시 검색 가능</p>
                </div>
            </div>
        </section>
    );
};
