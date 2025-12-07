// RecordMechanism.js - OpenHash 기록 메커니즘 (Alice→Bob 실시예)
const RecordMechanism = () => {
    const [simulationStep, setSimulationStep] = React.useState(0);
    const [selectedLayer, setSelectedLayer] = React.useState(null);
    const [hashValues, setHashValues] = React.useState({
        documentHash: '',
        timestamp: '',
        firstRehash: '',
        secondRehash: '',
        modValue: '',
        userHash: '',
        layerHash: '',
        fusedHash: ''
    });

    // SHA-256 시뮬레이션
    const generateHash = (input) => {
        const str = typeof input === 'object' ? JSON.stringify(input) : String(input);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64);
    };

    const runLayerSelection = async () => {
        setSimulationStep(0);
        setSelectedLayer(null);
        
        // Alice→Bob 거래 데이터
        const aliceToBobTx = {
            from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8', // Alice
            to: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',   // Bob
            amount: 1000,
            utxoInputs: [
                { txid: 'charlie_to_alice_3000T', vout: 0, amount: 3000 },
                { txid: 'david_to_alice_2000T', vout: 1, amount: 2000 }
            ],
            utxoOutputs: [
                { address: 'Bob', amount: 1000 },
                { address: 'Alice', amount: 4000 }
            ]
        };
        
        // Step 1: 문서 해싱
        await new Promise(resolve => setTimeout(resolve, 1000));
        const documentHash = generateHash(aliceToBobTx);
        setHashValues(prev => ({ ...prev, documentHash }));
        setSimulationStep(1);
        
        // Step 2: 타임스탬프 생성
        await new Promise(resolve => setTimeout(resolve, 800));
        const timestamp = Date.now();
        setHashValues(prev => ({ ...prev, timestamp: timestamp.toString() }));
        setSimulationStep(2);
        
        // Step 3: 1차 재해싱
        await new Promise(resolve => setTimeout(resolve, 1000));
        const firstRehash = generateHash(documentHash + timestamp);
        setHashValues(prev => ({ ...prev, firstRehash }));
        setSimulationStep(3);
        
        // Step 4: 2차 재해싱
        await new Promise(resolve => setTimeout(resolve, 1000));
        const secondRehash = generateHash(firstRehash);
        setHashValues(prev => ({ ...prev, secondRehash }));
        setSimulationStep(4);
        
        // Step 5: 범위 변환
        await new Promise(resolve => setTimeout(resolve, 1000));
        const modValue = parseInt(secondRehash.substring(0, 8), 16) % 100;
        setHashValues(prev => ({ ...prev, modValue: modValue.toString() }));
        setSimulationStep(5);
        
        // Step 6: 확률 비교 및 계층 선택
        await new Promise(resolve => setTimeout(resolve, 1200));
        let layer;
        if (modValue < 70) layer = 1;
        else if (modValue < 90) layer = 2;
        else layer = 3;
        setSelectedLayer(layer);
        setSimulationStep(6);
        
        // Step 7: User Hash & Layer Hash 생성
        await new Promise(resolve => setTimeout(resolve, 1000));
        const userHash = generateHash('Alice' + timestamp + JSON.stringify(aliceToBobTx));
        const layerHash = generateHash('Layer' + layer + '_Node_' + Math.floor(Math.random() * 100) + timestamp);
        const fusedHash = generateHash(userHash + layerHash);
        
        setHashValues(prev => ({ 
            ...prev, 
            userHash,
            layerHash,
            fusedHash
        }));
        setSimulationStep(7);
    };

    return (
        <div className="space-y-6">
            {/* 페이지 제목 */}
            <div className="border-l-4 border-gov-blue pl-4 py-2">
                <h2 className="text-2xl font-bold text-gov-text">OpenHash 기록 메커니즘</h2>
                <p className="text-sm text-gray-600 mt-1">블록체인 대체 분산원장 기술 - 98.5% 에너지 절감</p>
            </div>

            {/* 기술 개요 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">기술 개요</h3>
                </div>
                <div className="p-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                            OpenHash는 2계층부터 N계층까지 다양한 깊이로 구성 가능한 계층형 분산원장 시스템입니다. 
                            확률적 계층 선택 알고리즘을 통해 작업증명(PoW) 없이도 분산 합의를 달성하며, 
                            Layer 간 통신에는 BLS 서명 집계 방식을 사용합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 4계층 아키텍처 (한국 실시예) */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">계층형 아키텍처 (한국 행정구역 실시예)</h3>
                </div>
                <div className="p-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                        <p className="text-sm text-gray-700">
                            <strong>주의:</strong> 아래 구조는 한국 행정구역을 기반으로 한 실시예입니다. 
                            실제 구현 시 2계층부터 N계층까지 다양하게 설계 가능하며, 확률 분포(70%, 20%, 10%)도 
                            시스템 요구사항에 따라 조정 가능합니다. 단, 확률 분포의 합계는 반드시 100%여야 합니다.
                        </p>
                    </div>

                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">계층</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">노드 수</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">역할 (한국 실시예)</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">선택 확률</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { layer: 'Layer 4', nodes: '2개', role: '국가급 Representative - 전체 네트워크 합의 주도', prob: '-' },
                                { layer: 'Layer 3', nodes: '17개', role: '광역시도급 - 상위 검증 및 보안', prob: '10%' },
                                { layer: 'Layer 2', nodes: '226개', role: '시군구급 - 중간 검증 및 중계', prob: '20%' },
                                { layer: 'Layer 1', nodes: '3,500개', role: '읍면동급 - 기초 처리 및 빠른 응답', prob: '70%' }
                            ].map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border border-gray-300 px-4 py-2 font-bold">{item.layer}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center font-bold text-gov-blue">{item.nodes}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">{item.role}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{item.prob}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 bg-gray-50 border border-gray-300 p-4">
                        <p className="text-sm text-gray-700">
                            <strong className="text-gov-text">설계 특징:</strong> 하위 계층은 빠른 처리를, 상위 계층은 높은 보안을 제공합니다. 
                            Layer 4는 Representative 노드로서 전체 네트워크의 합의를 주도하며, Layer 1-3은 확률적으로 분배되어 부하를 분산합니다.
                        </p>
                    </div>

                    <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700">
                            <strong>확장성:</strong> 국가별, 지역별 특성에 따라 계층 깊이(2~N)와 확률 분포를 자유롭게 조정할 수 있습니다. 
                            예: 소규모 국가는 3계층, 대규모 국가는 5계층 이상 구성 가능.
                        </p>
                    </div>
                </div>
            </div>

            {/* 확률적 계층 선택 알고리즘 (Alice→Bob 실시예) */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">확률적 계층 선택 알고리즘 (Alice→Bob 거래 실시예)</h3>
                </div>
                <div className="p-6 space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700">
                            SHA-256 재해싱 기반 확률적 알고리즘으로 Layer 1(70%), Layer 2(20%), Layer 3(10%)에 자동 분배합니다. 
                            공격자가 특정 계층을 예측할 확률은 2<sup>-256</sup>으로 사실상 불가능합니다.
                            <strong className="text-yellow-700"> (확률 분포는 실시예이며, 합계 100% 범위 내에서 조정 가능)</strong>
                        </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-300 p-4">
                        <p className="text-sm text-gray-700">
                            <strong>거래 예시:</strong> "발행과 유통" 탭에서 다룬 Alice가 Bob에게 1,000 T를 전송하는 거래를 
                            OpenHash에 기록하는 과정을 7단계로 보여드립니다.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gov-text mb-3">7단계 프로세스 (실제 Hash 값 포함)</h4>
                        <table className="w-full border border-gray-300 text-xs">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-2 py-2 text-center w-16">단계</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left w-32">작업</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">설명</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">Hash 값 / 결과</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={simulationStep >= 1 ? 'bg-green-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-2 py-2 text-center font-bold">1</td>
                                    <td className="border border-gray-300 px-3 py-2 font-medium">문서 해싱</td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        Alice→Bob 거래 데이터를 SHA-256 해싱
                                        <div className="text-xs text-gray-600 mt-1">
                                            from: Alice, to: Bob, amount: 1000T
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 font-mono break-all">
                                        {simulationStep >= 1 ? hashValues.documentHash : '(대기 중)'}
                                    </td>
                                </tr>
                                <tr className={simulationStep >= 2 ? 'bg-green-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-2 py-2 text-center font-bold">2</td>
                                    <td className="border border-gray-300 px-3 py-2 font-medium">타임스탬프</td>
                                    <td className="border border-gray-300 px-3 py-2">밀리초 단위 현재 시각 기록</td>
                                    <td className="border border-gray-300 px-3 py-2 font-mono">
                                        {simulationStep >= 2 ? hashValues.timestamp : '(대기 중)'}
                                    </td>
                                </tr>
                                <tr className={simulationStep >= 3 ? 'bg-green-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-2 py-2 text-center font-bold">3</td>
                                    <td className="border border-gray-300 px-3 py-2 font-medium">1차 재해싱</td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        SHA-256(문서해시 || 타임스탬프)
                                        <div className="text-xs text-gray-600 mt-1">
                                            두 값을 연결하여 재해싱
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 font-mono break-all">
                                        {simulationStep >= 3 ? hashValues.firstRehash : '(대기 중)'}
                                    </td>
                                </tr>
                                <tr className={simulationStep >= 4 ? 'bg-green-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-2 py-2 text-center font-bold">4</td>
                                    <td className="border border-gray-300 px-3 py-2 font-medium">2차 재해싱</td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        SHA-256(1차 결과)
                                        <div className="text-xs text-gray-600 mt-1">
                                            공격자의 예측 가능성 제거
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 font-mono break-all">
                                        {simulationStep >= 4 ? hashValues.secondRehash : '(대기 중)'}
                                    </td>
                                </tr>
                                <tr className={simulationStep >= 5 ? 'bg-green-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-2 py-2 text-center font-bold">5</td>
                                    <td className="border border-gray-300 px-3 py-2 font-medium">범위 변환</td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        N = 2차 결과 mod 100
                                        <div className="text-xs text-gray-600 mt-1">
                                            0~99 범위로 변환
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 font-mono">
                                        {simulationStep >= 5 ? `N = ${hashValues.modValue}` : '(대기 중)'}
                                    </td>
                                </tr>
                                <tr className={simulationStep >= 6 ? 'bg-green-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-2 py-2 text-center font-bold">6</td>
                                    <td className="border border-gray-300 px-3 py-2 font-medium">확률 비교</td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        N&lt;70→L1, 70≤N&lt;90→L2, N≥90→L3
                                        <div className="text-xs text-yellow-700 mt-1">
                                            (실시예: 조정 가능)
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 font-bold text-green-700">
                                        {simulationStep >= 6 ? `Layer ${selectedLayer} 선택` : '(대기 중)'}
                                    </td>
                                </tr>
                                <tr className={simulationStep >= 7 ? 'bg-green-50' : 'bg-white'}>
                                    <td className="border border-gray-300 px-2 py-2 text-center font-bold">7</td>
                                    <td className="border border-gray-300 px-3 py-2 font-medium">계층 전송</td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        선택된 계층으로 데이터 전송 및 기록
                                        <div className="text-xs text-gray-600 mt-1">
                                            Layer 간 BLS 서명 사용
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-bold">
                                        {simulationStep >= 7 ? '✓ 전송 완료' : '(대기 중)'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 시뮬레이션 */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gov-text">계층 선택 시뮬레이션 (Alice→Bob 거래)</h4>
                            <button
                                onClick={runLayerSelection}
                                disabled={simulationStep > 0 && simulationStep < 7}
                                className="px-4 py-2 bg-gov-blue text-white font-medium hover:bg-gov-blue-light disabled:opacity-50 transition-colors"
                            >
                                {simulationStep > 0 && simulationStep < 7 ? '처리 중...' : '시뮬레이션 시작'}
                            </button>
                        </div>

                        {selectedLayer && (
                            <div className="bg-green-600 text-white px-4 py-3 text-center font-bold">
                                ✓ Alice→Bob 거래가 Layer {selectedLayer}에 기록 완료! 
                                {selectedLayer === 1 && ' (70% 확률 구간)'}
                                {selectedLayer === 2 && ' (20% 확률 구간)'}
                                {selectedLayer === 3 && ' (10% 확률 구간)'}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 border border-gray-300 p-4">
                        <p className="text-sm text-gray-700">
                            <strong className="text-gov-text">보안 특성:</strong> 확률 분포 수치(70%, 20%, 10%)는 시스템 요구사항에 따라 
                            가변 가능한 설계 선택사항입니다. 단, 합계는 반드시 100%여야 합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Hash Chain 융합 (Alice→Bob 실시예) */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">Hash Chain 융합 메커니즘 (Alice→Bob 실시예)</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700">
                            Alice→Bob 거래의 User Hash와 저장 계층의 Layer Hash를 융합하여 불변의 Fused Hash를 생성합니다. 
                            양측이 상호 검증 가능한 분산 신뢰를 구축합니다.
                        </p>
                    </div>

                    {simulationStep >= 7 && (
                        <div className="bg-yellow-50 border border-yellow-300 p-4">
                            <p className="text-sm font-bold text-gray-700 mb-2">
                                현재 시뮬레이션된 Alice→Bob 거래의 Hash Chain 융합 과정:
                            </p>
                        </div>
                    )}

                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left w-40">단계</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">입력 데이터</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Hash 값</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-cyan-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">User Hash 생성</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">
                                    <div className="space-y-1">
                                        <div><strong>UserID:</strong> Alice</div>
                                        <div><strong>Timestamp:</strong> {simulationStep >= 7 ? hashValues.timestamp : '(시뮬레이션 실행 필요)'}</div>
                                        <div><strong>TxData:</strong> Alice→Bob 1,000T</div>
                                        <div className="text-xs text-gray-600">UTXO 입력: 3,000T + 2,000T</div>
                                        <div className="text-xs text-gray-600">UTXO 출력: Bob(1,000T) + Alice잔돈(4,000T)</div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-mono text-cyan-700 break-all">
                                    {simulationStep >= 7 ? hashValues.userHash : '(시뮬레이션 실행 필요)'}
                                </td>
                            </tr>
                            <tr className="bg-purple-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">Layer Hash 생성</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">
                                    <div className="space-y-1">
                                        <div><strong>LayerID:</strong> {simulationStep >= 7 ? `Layer ${selectedLayer}` : '(선택 대기)'}</div>
                                        <div><strong>NodeID:</strong> {simulationStep >= 7 ? `Node_${Math.floor(Math.random() * 100)}` : '(선택 대기)'}</div>
                                        <div><strong>Timestamp:</strong> {simulationStep >= 7 ? hashValues.timestamp : '(시뮬레이션 실행 필요)'}</div>
                                        <div className="text-xs text-gray-600">
                                            {selectedLayer === 1 && '읍면동급 노드 (3,500개 중 하나)'}
                                            {selectedLayer === 2 && '시군구급 노드 (226개 중 하나)'}
                                            {selectedLayer === 3 && '광역시도급 노드 (17개 중 하나)'}
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-mono text-purple-700 break-all">
                                    {simulationStep >= 7 ? hashValues.layerHash : '(시뮬레이션 실행 필요)'}
                                </td>
                            </tr>
                            <tr className="bg-green-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">Fused Hash 계산</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">
                                    <div className="space-y-2">
                                        <div><strong>알고리즘:</strong> SHA-256(UserHash + LayerHash)</div>
                                        <div className="text-xs text-gray-600">
                                            {simulationStep >= 7 && (
                                                <>
                                                    <div>UserHash: {hashValues.userHash.substring(0, 16)}...</div>
                                                    <div>LayerHash: {hashValues.layerHash.substring(0, 16)}...</div>
                                                    <div>연결 후 재해싱 →</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm font-mono text-green-700 break-all font-bold">
                                    {simulationStep >= 7 ? hashValues.fusedHash : '(시뮬레이션 실행 필요)'}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {simulationStep >= 7 && (
                        <div className="bg-green-100 border-l-4 border-green-500 p-4">
                            <h4 className="font-bold text-green-800 mb-2">✓ Fused Hash 검증 과정</h4>
                            <div className="text-sm text-gray-700 space-y-1">
                                <div><strong>1. Alice 측 검증:</strong></div>
                                <div className="ml-4 text-xs">
                                    • Alice는 자신의 User Hash와 Layer로부터 받은 Layer Hash를 가지고 있음<br/>
                                    • SHA-256(User Hash + Layer Hash) 계산<br/>
                                    • 계산 결과: <span className="font-mono">{hashValues.fusedHash.substring(0, 32)}...</span>
                                </div>
                                <div className="mt-2"><strong>2. Layer {selectedLayer} 측 검증:</strong></div>
                                <div className="ml-4 text-xs">
                                    • Layer {selectedLayer}는 Alice로부터 받은 User Hash와 자신의 Layer Hash를 가지고 있음<br/>
                                    • SHA-256(User Hash + Layer Hash) 계산<br/>
                                    • 계산 결과: <span className="font-mono">{hashValues.fusedHash.substring(0, 32)}...</span>
                                </div>
                                <div className="mt-2 bg-white border border-green-300 p-2">
                                    <strong className="text-green-700">✓ 양측의 Fused Hash가 일치 → 검증 성공!</strong>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-50 border border-gray-300 p-4">
                        <p className="text-sm text-gray-700">
                            <strong className="text-gov-text">검증 원리:</strong> 양측이 독립적으로 계산한 Fused Hash가 일치하면 검증 성공. 
                            어느 한쪽이라도 변조되면 전체 Hash Chain이 무효화되어 위변조가 즉시 탐지됩니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Merkle Tree */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">Merkle Tree 기반 무결성 검증</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-gray-700">
                            대량의 거래를 Merkle Tree로 집약하여 32바이트의 Root Hash만으로 전체 데이터의 무결성을 보장합니다. 
                            개별 검증 시에도 형제 노드의 Hash만 전송하여 대역폭을 90% 이상 절감합니다.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gov-text mb-3">효율성 비교</h4>
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">항목</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">전통적 방식</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">OpenHash 방식</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-medium">10,000개 거래 전송</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">2.5 MB (전체 데이터)</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">32 bytes (Merkle Root만)</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 font-medium">개별 검증</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">전체 블록 다운로드</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">121 bytes (Merkle Path)</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-medium">절감율</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                                    <td className="border border-gray-300 px-4 py-2 text-sm font-bold text-green-700">99.995%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 양방향 검증 시스템 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">양방향 검증 시스템</h3>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { 
                                title: '하향식 검증 (310)', 
                                items: [
                                    'Layer 4 → Layer 3: Merkle Root 전달 및 BLS 서명 검증',
                                    'Layer 3 → Layer 2: 지역별 데이터 무결성 확인',
                                    'Layer 2 → Layer 1: 트랜잭션 패킷 단위 검증 (121B)'
                                ]
                            },
                            { 
                                title: '상향식 감시 (320)', 
                                items: [
                                    'Layer 1 → Layer 2: 하위가 상위 노드 검증 및 이상 탐지',
                                    'Layer 2 → Layer 3: 비정상 패턴 탐지 및 보고',
                                    'Layer 3 → Layer 4: 전국 단위 이상 징후 모니터링'
                                ]
                            }
                        ].map((section, idx) => (
                            <div key={idx} className="border border-gray-300">
                                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                                    <h4 className="font-bold text-gov-text">{section.title}</h4>
                                </div>
                                <div className="p-4">
                                    <ul className="space-y-2">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                <span className="text-gov-blue font-bold mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 bg-gray-50 border border-gray-300 p-4">
                        <p className="text-sm text-gray-700">
                            <strong className="text-gov-text">이중 보안 체계:</strong> 상위 계층이 하위를 검증하는 동시에, 
                            하위 계층도 상위를 감시하여 어느 계층에서든 이상 노드가 발생하면 5ms 내에 자동 격리됩니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 성능 지표 */}
            <div className="bg-white border border-gray-300">
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <h3 className="text-lg font-bold text-gov-text">성능 지표 (AWS 실측)</h3>
                </div>
                <div className="p-6">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">지표</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">측정값</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium">처리 속도</td>
                                <td className="border border-gray-300 px-4 py-2 font-bold text-green-700">481 TPS</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">11노드 AWS 실측</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">확장 시 TPS</td>
                                <td className="border border-gray-300 px-4 py-2 font-bold text-green-700">424만</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">100,000노드 이론치</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 font-medium">에너지 절감</td>
                                <td className="border border-gray-300 px-4 py-2 font-bold text-green-700">98.5%</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">블록체인 대비 (121 TWh → 1.8 TWh)</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">표준 패킷 크기</td>
                                <td className="border border-gray-300 px-4 py-2 font-bold text-green-700">121 bytes</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm">트랜잭션 기본 크기</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
