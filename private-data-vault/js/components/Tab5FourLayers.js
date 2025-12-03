const { useState } = React;

function Tab5FourLayers() {
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [hashValue, setHashValue] = useState('');
    const [stats, setStats] = useState({
        layer1: 0,
        layer2: 0,
        layer3: 0,
        layer4: 0,
        total: 0
    });

    const layers = [
        {
            id: 1,
            name: 'Layer 1 - Edge Device',
            number: '131',
            probability: '70%',
            range: '0-69',
            description: '사용자 단말기 계층',
            color: 'blue',
            icon: 'fa-mobile-alt'
        },
        {
            id: 2,
            name: 'Layer 2 - Edge Server',
            number: '132',
            probability: '20%',
            range: '70-89',
            description: '지역 서버 계층',
            color: 'green',
            icon: 'fa-server'
        },
        {
            id: 3,
            name: 'Layer 3 - Core Engine',
            number: '133',
            probability: '9%',
            range: '90-98',
            description: '핵심 엔진 계층',
            color: 'purple',
            icon: 'fa-database'
        },
        {
            id: 4,
            name: 'Layer 4 - Cloud Archive',
            number: '134',
            probability: '1%',
            range: '99',
            description: '영구 보존 계층',
            color: 'orange',
            icon: 'fa-cloud'
        }
    ];

    const simulateLayerSelection = async () => {
        setSimulationRunning(true);
        const newStats = { layer1: 0, layer2: 0, layer3: 0, layer4: 0, total: 0 };
        
        for (let i = 0; i < 1000; i++) {
            const randomValue = Math.floor(Math.random() * 100);
            
            if (randomValue < 70) newStats.layer1++;
            else if (randomValue < 90) newStats.layer2++;
            else if (randomValue < 99) newStats.layer3++;
            else newStats.layer4++;
            
            newStats.total++;
            
            if (i % 100 === 0) {
                setStats({...newStats});
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
        
        setStats(newStats);
        setSimulationRunning(false);
    };

    const selectLayerForHash = async (inputHash) => {
        // SHA-256 재해싱 시뮬레이션
        const encoder = new TextEncoder();
        const data = encoder.encode(inputHash + Date.now());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const finalHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        // 0-99 범위로 변환
        const layerValue = parseInt(finalHash.substring(0, 2), 16) % 100;
        
        let layer;
        if (layerValue < 70) layer = 1;
        else if (layerValue < 90) layer = 2;
        else if (layerValue < 99) layer = 3;
        else layer = 4;
        
        setSelectedLayer({ layer, value: layerValue, hash: finalHash });
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-layer-group mr-2"></i>
                    오픈해시 4계층 구조 & 확률적 계층 선택
                </h3>
                <p className="text-gov-text mb-4">
                    오픈해시 시스템(130)은 <span className="font-bold text-gov-blue">4계층 구조</span>를 가지며, 
                    <span className="font-bold text-gov-blue"> SHA-256 재해싱 기반 확률적 알고리즘(230)</span>을 통해 
                    각 데이터가 저장될 계층을 결정합니다.
                </p>
                <div className="bg-white rounded p-4">
                    <div className="font-semibold text-gov-blue mb-2">📋 도면 3: 4계층 구조 및 확률적 선택</div>
                    <div className="text-sm space-y-1 text-gov-text-secondary">
                        <div>1. 재해싱부(220): SHA-256 재해싱 2회 수행</div>
                        <div>2. 범위 변환부(240): 해시값을 0~99 범위로 변환</div>
                        <div>3. 계층 결정부(250): 확률 분포에 따라 계층 선택</div>
                        <div>4. 비대칭 확률: Layer 1 (70%) > Layer 2 (20%) > Layer 3 (9%) > Layer 4 (1%)</div>
                    </div>
                </div>
            </div>

            {/* 4계층 구조 다이어그램 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">4계층 구조 (도면 3)</h4>
                <div className="space-y-4">
                    {layers.map((layer) => (
                        <div key={layer.id} className={`bg-${layer.color}-50 border-4 border-${layer.color}-500 rounded-lg p-6`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`text-4xl text-${layer.color}-600`}>
                                        <i className={`fas ${layer.icon}`}></i>
                                    </div>
                                    <div>
                                        <h5 className={`text-base font-bold text-${layer.color}-700`}>
                                            {layer.name}
                                        </h5>
                                        <p className="text-sm text-gray-600">{layer.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">계층 번호: {layer.number}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-3xl font-bold text-${layer.color}-600`}>
                                        {layer.probability}
                                    </div>
                                    <div className="text-sm text-gray-600">선택 확률</div>
                                    <div className="text-xs text-gray-500 mt-1">범위: {layer.range}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 확률적 계층 선택 시뮬레이션 */}
            <div>
                <h4 className="text-base font-bold text-gov-text mb-4">확률적 계층 선택 시뮬레이션</h4>
                
                <div className="bg-white border-2 border-gov-border rounded-lg p-6 mb-6">
                    <button
                        onClick={simulateLayerSelection}
                        disabled={simulationRunning}
                        className={`w-full py-3 rounded-lg font-bold transition-colors ${
                            simulationRunning 
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-gov-blue text-white hover:bg-gov-blue-light'
                        }`}
                    >
                        {simulationRunning ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                시뮬레이션 실행 중...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-play mr-2"></i>
                                1,000회 계층 선택 시뮬레이션 실행
                            </>
                        )}
                    </button>
                </div>

                {stats.total > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-600">
                                {((stats.layer1 / stats.total) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Layer 1</div>
                            <div className="text-xs text-gray-500">{stats.layer1}회 선택</div>
                        </div>
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-600">
                                {((stats.layer2 / stats.total) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Layer 2</div>
                            <div className="text-xs text-gray-500">{stats.layer2}회 선택</div>
                        </div>
                        <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-purple-600">
                                {((stats.layer3 / stats.total) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Layer 3</div>
                            <div className="text-xs text-gray-500">{stats.layer3}회 선택</div>
                        </div>
                        <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-orange-600">
                                {((stats.layer4 / stats.total) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Layer 4</div>
                            <div className="text-xs text-gray-500">{stats.layer4}회 선택</div>
                        </div>
                    </div>
                )}

                {/* 단일 해시 계층 선택 */}
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
                    <h5 className="font-bold text-gov-text mb-4">단일 해시값으로 계층 선택 테스트</h5>
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={hashValue}
                            onChange={(e) => setHashValue(e.target.value)}
                            placeholder="데이터 입력 (예: 홍길동 급여 2025-01-15)"
                            className="flex-1 px-4 py-2 border-2 border-gov-border rounded focus:border-gov-blue"
                        />
                        <button
                            onClick={() => selectLayerForHash(hashValue)}
                            className="bg-gov-blue text-white px-6 py-2 rounded font-bold hover:bg-gov-blue-light"
                        >
                            계층 선택
                        </button>
                    </div>

                    {selectedLayer && (
                        <div className="mt-4 bg-white p-4 rounded-lg">
                            <div className="font-semibold mb-2">선택 결과:</div>
                            <div className="space-y-2 text-sm">
                                <div className="font-mono text-xs break-all text-gray-600">
                                    SHA-256 해시: {selectedLayer.hash}
                                </div>
                                <div>
                                    변환값: <span className="font-bold">{selectedLayer.value}</span> (0-99 범위)
                                </div>
                                <div className={`text-base font-bold text-${layers[selectedLayer.layer - 1].color}-600`}>
                                    선택된 계층: {layers[selectedLayer.layer - 1].name}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* AWS 실증 실험 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-yellow-700 mb-4">
                    <i className="fas fa-flask mr-2"></i>
                    AWS 실증 실험 결과 (1,000개 레코드)
                </h4>
                <div className="bg-white p-4 rounded">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                            <div className="text-base font-bold text-blue-600">70.20%</div>
                            <div className="text-sm text-gray-600">Layer 1</div>
                            <div className="text-xs text-gray-500">(목표: 70%)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-base font-bold text-green-600">20.90%</div>
                            <div className="text-sm text-gray-600">Layer 2</div>
                            <div className="text-xs text-gray-500">(목표: 20%)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-base font-bold text-purple-600">8.90%</div>
                            <div className="text-sm text-gray-600">Layer 3</div>
                            <div className="text-xs text-gray-500">(목표: 10%)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-base font-bold text-orange-600">-</div>
                            <div className="text-sm text-gray-600">Layer 4</div>
                            <div className="text-xs text-gray-500">(목표: ~0%)</div>
                        </div>
                    </div>
                    <div className="pt-4 border-t-2">
                        <div className="font-semibold text-green-600 mb-2">
                            정확도: 98.9% (설계 목표 대비 최대 오차 1.10%)
                        </div>
                        <div className="text-sm text-gray-700">
                            ✅ 확률 분포 정확성 검증 완료<br/>
                            ✅ 처리 속도: 25,907 records/sec<br/>
                            ✅ 에너지 효율: 98.5% 절감
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 개념 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-green-700 mb-4">
                    <i className="fas fa-lightbulb mr-2"></i>
                    4계층 구조의 핵심 장점
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ <span className="font-bold">확률적 분산</span>: 부하 자동 분산, 단일 장애점 없음</li>
                    <li>✅ <span className="font-bold">선형 확장</span>: 노드 증가에 비례한 TPS 증가</li>
                    <li>✅ <span className="font-bold">에너지 효율</span>: 작업증명/지분증명 불필요</li>
                    <li>✅ <span className="font-bold">계층 간 검증</span>: 상향식 + 하향식 이중 검증</li>
                    <li>✅ <span className="font-bold">비대칭 확률</span>: 하위 계층 우선으로 응답 속도 향상</li>
                </ul>
            </div>
        </div>
    );
}
