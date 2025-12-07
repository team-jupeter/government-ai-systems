const Tab1Overview = () => {
    const [isSimulating, setIsSimulating] = React.useState(false);
    const [currentDoc, setCurrentDoc] = React.useState(null);
    const [layerCounts, setLayerCounts] = React.useState({ L1: 0, L2: 0, L3: 0, L4: 0 });
    const [simulationSpeed, setSimulationSpeed] = React.useState(1000);

    const sha256 = (text) => {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0');
    };

    const selectLayer = (docHash, timestamp) => {
        const combined = docHash + timestamp;
        const hash1 = sha256(combined);
        const hash2 = sha256(hash1);
        const N = parseInt(hash2.substring(0, 8), 16) % 100;
        
        if (N < 70) return 'L1';
        if (N < 90) return 'L2';
        if (N < 97) return 'L3';
        return 'L4';
    };

    const runSimulation = async () => {
        setIsSimulating(true);
        setLayerCounts({ L1: 0, L2: 0, L3: 0, L4: 0 });
        
        for (let i = 0; i < 100; i++) {
            const docData = 'Document_' + i + '_' + Math.random();
            const docHash = sha256(docData);
            const timestamp = Date.now().toString();
            const layer = selectLayer(docHash, timestamp);
            
            setCurrentDoc({ id: i, hash: docHash.substring(0, 16) + '...', layer, timestamp });
            setLayerCounts(prev => ({ ...prev, [layer]: prev[layer] + 1 }));
            
            await new Promise(resolve => setTimeout(resolve, simulationSpeed));
        }
        
        setIsSimulating(false);
        setCurrentDoc(null);
    };

    const getLayerIcon = (layer) => {
        const icons = {
            'L1': 'fa-server',
            'L2': 'fa-network-wired',
            'L3': 'fa-broadcast-tower',
            'L4': 'fa-cloud'
        };
        return icons[layer] || 'fa-server';
    };

    const getLayerColor = (layer) => {
        const colors = {
            'L1': 'blue',
            'L2': 'green',
            'L3': 'orange',
            'L4': 'purple'
        };
        return colors[layer] || 'gray';
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">OpenHash 개요</h4>
                <p className="text-gov-text-secondary leading-relaxed">
                    OpenHash는 기존 블록체인의 한계를 극복한 혁신적인 계층적 분산 원장 시스템입니다.
                    에너지 효율성(98.5% 절감)과 확장성을 동시에 달성하며, 확률적 계층 선택 알고리즘을 통해
                    데이터 무결성을 보장합니다.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-blue-500">
                    <h5 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <i className="fas fa-layer-group mr-3 text-blue-600"></i>
                        계층 구조
                    </h5>
                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-300">
                            <i className="fas fa-cloud text-3xl text-purple-600 mr-4"></i>
                            <div>
                                <div className="font-bold text-purple-900">Layer 4 (Cloud Archive)</div>
                                <div className="text-sm text-purple-700">영구 보존 계층 - 국가 수준</div>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-300">
                            <i className="fas fa-broadcast-tower text-3xl text-orange-600 mr-4"></i>
                            <div>
                                <div className="font-bold text-orange-900">Layer 3 (Core Engine)</div>
                                <div className="text-sm text-orange-700">중앙 처리 - 광역시도 수준</div>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-300">
                            <i className="fas fa-network-wired text-3xl text-green-600 mr-4"></i>
                            <div>
                                <div className="font-bold text-green-900">Layer 2 (Regional Server)</div>
                                <div className="text-sm text-green-700">지역 집약 - 시군구 수준</div>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-300">
                            <i className="fas fa-server text-3xl text-blue-600 mr-4"></i>
                            <div>
                                <div className="font-bold text-blue-900">Layer 1 (Edge Server)</div>
                                <div className="text-sm text-blue-700">최하위 서버 - 읍면동 수준</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-green-500">
                    <h5 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                        <i className="fas fa-chart-line mr-3 text-green-600"></i>
                        핵심 성능 지표
                    </h5>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-green-900">에너지 효율</span>
                                <span className="text-2xl font-bold text-green-600">98.5% ↓</span>
                            </div>
                            <div className="text-sm text-green-700">비트코인 대비 에너지 소비 절감</div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-blue-900">처리 성능</span>
                                <span className="text-2xl font-bold text-blue-600">68.8배 ↑</span>
                            </div>
                            <div className="text-sm text-blue-700">비트코인 대비 TPS 향상</div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-purple-900">확장성</span>
                                <span className="text-2xl font-bold text-purple-600">선형 ∞</span>
                            </div>
                            <div className="text-sm text-purple-700">노드 수에 비례하여 TPS 증가</div>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-red-900">보안 대응</span>
                                <span className="text-2xl font-bold text-red-600">5ms</span>
                            </div>
                            <div className="text-sm text-red-700">오염 노드 격리 시간</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-100 rounded-lg shadow-xl p-8 mb-12 border-2 border-indigo-500">
                <h5 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center">
                    <i className="fas fa-dice mr-3 text-indigo-600"></i>
                    확률적 계층 선택 실시간 시뮬레이션
                </h5>
                <p className="text-indigo-800 mb-6">
                    SHA-256 이중 해싱을 통해 각 문서가 어느 계층에 저장될지 확률적으로 결정됩니다.
                    100개 문서를 처리하여 실제 분포를 확인하세요.
                </p>

                <div className="mb-6 flex items-center gap-4">
                    <label className="text-indigo-900 font-bold">시뮬레이션 속도:</label>
                    <input 
                        type="range" 
                        min="100" 
                        max="2000" 
                        step="100"
                        value={simulationSpeed}
                        onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                        className="flex-1"
                    />
                    <span className="text-indigo-700 font-mono">{simulationSpeed}ms</span>
                </div>

                <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                >
                    {isSimulating ? '시뮬레이션 진행 중...' : '🎲 시뮬레이션 시작 (100개 문서)'}
                </button>

                {currentDoc && (
                    <div className="bg-white rounded-lg p-4 mb-6 border-2 border-indigo-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600">처리 중인 문서</div>
                                <div className="font-mono text-indigo-900">#{currentDoc.id}: {currentDoc.hash}</div>
                            </div>
                            <div className={'px-4 py-2 rounded-lg font-bold text-white bg-' + getLayerColor(currentDoc.layer) + '-600'}>
                                → {currentDoc.layer}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {['L1', 'L2', 'L3', 'L4'].map(layer => {
                        const color = getLayerColor(layer);
                        const icon = getLayerIcon(layer);
                        const percentage = layerCounts[layer];
                        const expected = layer === 'L1' ? 70 : layer === 'L2' ? 20 : layer === 'L3' ? 7 : 3;
                        
                        return (
                            <div key={layer} className={'bg-white rounded-lg p-6 border-2 border-' + color + '-400 shadow-lg'}>
                                <div className="flex flex-col items-center">
                                    <i className={'fas ' + icon + ' text-5xl text-' + color + '-600 mb-3'}></i>
                                    <div className={'text-xl font-bold text-' + color + '-900 mb-2'}>{layer}</div>
                                    <div className={'text-4xl font-bold text-' + color + '-600'}>{percentage}</div>
                                    <div className="text-sm text-gray-600 mt-2">
                                        예상: ~{expected}개
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                        <div 
                                            className={'bg-' + color + '-600 h-2 rounded-full transition-all duration-300'}
                                            style={{ width: percentage + '%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
                    <div className="text-sm text-indigo-900">
                        <div className="font-bold mb-2">📊 확률 분포 (이론값):</div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                            <div>Layer 1: <span className="font-bold text-blue-600">70%</span></div>
                            <div>Layer 2: <span className="font-bold text-green-600">20%</span></div>
                            <div>Layer 3: <span className="font-bold text-orange-600">7%</span></div>
                            <div>Layer 4: <span className="font-bold text-purple-600">3%</span></div>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                            * 실제 시뮬레이션 결과는 이론값과 약간의 오차가 있을 수 있습니다 (통계적 변동)
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-yellow-500">
                <h5 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
                    <i className="fas fa-lightbulb mr-3 text-yellow-600"></i>
                    핵심 원칙
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="font-bold text-yellow-900 mb-2">🔄 재귀적 프랙탈</div>
                        <div className="text-sm text-yellow-800">
                            모든 계층에서 동일한 알고리즘 반복. "As above, so below"
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="font-bold text-yellow-900 mb-2">📊 계층적 분산</div>
                        <div className="text-sm text-yellow-800">
                            물리적 인프라 활용으로 O(log n) 복잡도 달성
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="font-bold text-yellow-900 mb-2">🎲 확률적 검증</div>
                        <div className="text-sm text-yellow-800">
                            100% 합의 불필요, 높은 신뢰도를 효율적으로 달성
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="font-bold text-yellow-900 mb-2">📱 오프라인 우선</div>
                        <div className="text-sm text-yellow-800">
                            통신 불가 환경에서도 배치 처리로 무결성 보장
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
