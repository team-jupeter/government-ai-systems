const Tab2DeviceLayerIntegration = () => {
    // 스마트폰-Layer 연동 State
    const [currentStep1, setCurrentStep1] = React.useState(0);
    const [isRunning1, setIsRunning1] = React.useState(false);
    const [inputData1, setInputData1] = React.useState('제주특별자치도 행정문서');
    const [selectedLayer1, setSelectedLayer1] = React.useState(null);
    const [chainData1, setChainData1] = React.useState({
        deviceChain: 'origin',
        nodeChain: 'origin',
        initialHash: '',
        sentHash: '',
        nodeNewHash: '',
        nodeResponseHash: '',
        deviceNewHash: ''
    });

    // Layer-Layer 연동 State
    const [currentStep2, setCurrentStep2] = React.useState(0);
    const [isRunning2, setIsRunning2] = React.useState(false);
    const [inputData2, setInputData2] = React.useState('광역시도 행정문서');
    const [sourceLayer, setSourceLayer] = React.useState(1);
    const [targetLayer, setTargetLayer] = React.useState(2);
    const [chainData2, setChainData2] = React.useState({
        sourceChain: 'origin',
        targetChain: 'origin',
        initialHash: '',
        sentHash: '',
        targetNewHash: '',
        targetResponseHash: '',
        sourceNewHash: ''
    });

    const sha256 = (text) => {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        const hexHash = Math.abs(hash).toString(16).padStart(16, '0');
        return hexHash.repeat(4);
    };

    // 스마트폰-Layer 시뮬레이션
    const runIntegrationSimulation1 = async () => {
        if (!inputData1.trim()) {
            alert('입력 데이터를 입력하세요.');
            return;
        }

        setIsRunning1(true);
        setCurrentStep1(0);
        
        const initialHash = sha256(inputData1);
        const modValue = parseInt(initialHash.slice(-8), 16) % 100;
        const layer = modValue < 70 ? 1 : modValue < 90 ? 2 : 3;
        setSelectedLayer1(layer);

        setChainData1({
            deviceChain: 'origin',
            nodeChain: 'origin',
            initialHash: initialHash,
            sentHash: '',
            nodeNewHash: '',
            nodeResponseHash: '',
            deviceNewHash: ''
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(1);

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(2);
        setChainData1(prev => ({ ...prev, sentHash: initialHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(3);
        const nodeNewHash = sha256('origin' + initialHash);
        setChainData1(prev => ({ ...prev, nodeNewHash, nodeChain: nodeNewHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(4);
        setChainData1(prev => ({ ...prev, nodeResponseHash: nodeNewHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(5);
        const deviceNewHash = sha256('origin' + nodeNewHash);
        setChainData1(prev => ({ ...prev, deviceNewHash, deviceChain: deviceNewHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep1(6);

        setIsRunning1(false);
    };

    // Layer-Layer 시뮬레이션
    const runIntegrationSimulation2 = async () => {
        if (!inputData2.trim()) {
            alert('입력 데이터를 입력하세요.');
            return;
        }

        setIsRunning2(true);
        setCurrentStep2(0);
        
        const initialHash = sha256(inputData2);

        setChainData2({
            sourceChain: 'origin',
            targetChain: 'origin',
            initialHash: initialHash,
            sentHash: '',
            targetNewHash: '',
            targetResponseHash: '',
            sourceNewHash: ''
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(1);

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(2);
        setChainData2(prev => ({ ...prev, sentHash: initialHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(3);
        const targetNewHash = sha256('origin' + initialHash);
        setChainData2(prev => ({ ...prev, targetNewHash, targetChain: targetNewHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(4);
        setChainData2(prev => ({ ...prev, targetResponseHash: targetNewHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(5);
        const sourceNewHash = sha256('origin' + targetNewHash);
        setChainData2(prev => ({ ...prev, sourceNewHash, sourceChain: sourceNewHash }));

        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep2(6);

        setIsRunning2(false);
    };

    const handleSourceLayerChange = (layer) => {
        setSourceLayer(layer);
        setTargetLayer(layer + 1);
    };

    const getSimulationValue1 = (stepNum) => {
        if (currentStep1 < stepNum) return '-';
        switch(stepNum) {
            case 1: return '디바이스: origin | 노드: origin';
            case 2: return chainData1.sentHash || '-';
            case 3: return chainData1.nodeNewHash || '-';
            case 4: return chainData1.nodeResponseHash || '-';
            case 5: return chainData1.deviceNewHash || '-';
            case 6: return '✓ 연동 완료';
            default: return '-';
        }
    };

    const getSimulationValue2 = (stepNum) => {
        if (currentStep2 < stepNum) return '-';
        switch(stepNum) {
            case 1: return `Layer ${sourceLayer}: origin | Layer ${targetLayer}: origin`;
            case 2: return chainData2.sentHash || '-';
            case 3: return chainData2.targetNewHash || '-';
            case 4: return chainData2.targetResponseHash || '-';
            case 5: return chainData2.sourceNewHash || '-';
            case 6: return '✓ 연동 완료';
            default: return '-';
        }
    };

    const steps1 = [
        { num: 1, title: '초기 상태', desc: '디바이스와 노드 모두 Hash Chain이 "origin"으로 초기화됨' },
        { num: 2, title: '디바이스 → 노드 전송', desc: '입력 데이터의 Hash를 확률적으로 선택된 Layer 노드로 전송' },
        { num: 3, title: '노드 Hash Chain 갱신', desc: '노드: SHA-256(origin + 받은 Hash) → 새 Hash Chain 생성' },
        { num: 4, title: '노드 → 디바이스 전송', desc: '노드의 갱신된 Hash Chain을 디바이스로 전송' },
        { num: 5, title: '디바이스 Hash Chain 갱신', desc: '디바이스: SHA-256(origin + 받은 Hash) → 새 Hash Chain 생성' },
        { num: 6, title: '상호 연동 완료', desc: '디바이스와 노드의 Hash Chain이 서로 연동되어 데이터 무결성 확보' }
    ];

    const steps2 = [
        { num: 1, title: '초기 상태', desc: '상위 Layer와 하위 Layer 모두 Hash Chain이 "origin"으로 초기화됨' },
        { num: 2, title: '상위 Layer → 하위 Layer 전송', desc: '상위 Layer의 Hash를 하위 Layer로 전송' },
        { num: 3, title: '하위 Layer Hash Chain 갱신', desc: '하위 Layer: SHA-256(origin + 받은 Hash) → 새 Hash Chain 생성' },
        { num: 4, title: '하위 Layer → 상위 Layer 전송', desc: '하위 Layer의 갱신된 Hash Chain을 상위 Layer로 전송' },
        { num: 5, title: '상위 Layer Hash Chain 갱신', desc: '상위 Layer: SHA-256(origin + 받은 Hash) → 새 Hash Chain 생성' },
        { num: 6, title: '계층 간 연동 완료', desc: '상위/하위 Layer의 Hash Chain이 서로 연동되어 계층 간 무결성 확보' }
    ];

    return (
        <div>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .pulse-animation {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>

            {/* 섹션 1: 스마트폰-Layer 연동 */}
            <div className="mb-12">
                <div className="mb-8">
                    <h4 className="text-2xl font-bold text-gov-text mb-3">
                        스마트폰과 확률적으로 선택된 Layer의 어느 한 노드 간 Hash Chain 연동
                    </h4>
                    <p className="text-gov-text-secondary leading-relaxed">
                        단말기(스마트폰)와 선택된 계층 노드가 각자의 Hash Chain을 보유하며, 
                        상호 검증을 통해 데이터 무결성을 확보합니다.
                    </p>
                </div>

                <div className="bg-gov-gray rounded-lg p-6 mb-6">
                    <label className="block text-sm font-bold text-gov-text mb-2">입력 데이터</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputData1}
                            onChange={(e) => setInputData1(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gov-border rounded focus:outline-none focus:ring-2 focus:ring-gov-blue"
                            placeholder="데이터를 입력하세요"
                        />
                        <button
                            onClick={runIntegrationSimulation1}
                            disabled={isRunning1 || !inputData1.trim()}
                            className="px-6 py-3 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 disabled:opacity-50"
                        >
                            {isRunning1 ? '처리 중...' : '연동 시뮬레이션 실행'}
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border-2 border-purple-300 p-6 mb-6">
                    <div className="flex justify-between items-start gap-6">
                        <div className={'flex-1 bg-blue-50 border-2 border-blue-400 rounded-lg p-6 ' + (currentStep1 === 2 || currentStep1 === 5 ? 'pulse-animation' : '')}>
                            <div className="text-center mb-4">
                                <i className="fas fa-mobile-alt text-6xl text-blue-600"></i>
                            </div>
                            <div className="text-lg font-bold text-center mb-3 text-blue-900">스마트폰</div>
                            <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                                <div className="text-xs font-bold text-gray-600 mb-2">Hash Chain:</div>
                                <div className="text-xs font-mono bg-gray-50 p-3 rounded border break-all min-h-[60px]">
                                    {chainData1.deviceChain}
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-col items-center justify-center py-12">
                            <i className="fas fa-exchange-alt text-5xl text-purple-600 mb-4"></i>
                            {selectedLayer1 && (
                                <div className="bg-purple-100 border-2 border-purple-600 rounded-lg px-4 py-2">
                                    <div className="text-sm font-bold text-purple-900">선택된 계층</div>
                                    <div className="text-2xl font-bold text-purple-600 text-center">Layer {selectedLayer1}</div>
                                </div>
                            )}
                        </div>

                        <div className={'flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-6 ' + (currentStep1 === 3 || currentStep1 === 4 ? 'pulse-animation' : '')}>
                            <div className="text-center mb-4">
                                <i className="fas fa-server text-6xl text-green-600"></i>
                            </div>
                            <div className="text-lg font-bold text-center mb-3 text-green-900">Layer {selectedLayer1 || '?'} 노드</div>
                            <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                                <div className="text-xs font-bold text-gray-600 mb-2">Hash Chain:</div>
                                <div className="text-xs font-mono bg-gray-50 p-3 rounded border break-all min-h-[60px]">
                                    {chainData1.nodeChain}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                    <div className="bg-purple-600 text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-link mr-3"></i>Hash Chain 연동 프로세스
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-center px-4 py-3 font-bold text-gov-text" style={{width: '80px'}}>단계</th>
                                    <th className="text-left px-4 py-3 font-bold text-gov-text">작업</th>
                                    <th className="text-left px-4 py-3 font-bold text-gov-text">설명</th>
                                    <th className="text-left px-4 py-3 font-bold text-gov-text" style={{width: '400px'}}>시뮬레이션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {steps1.map((step, idx) => (
                                    <tr key={idx} className={'border-b border-gov-border hover:bg-gray-50 ' + (currentStep1 >= step.num ? 'bg-purple-50' : '')}>
                                        <td className="text-center px-4 py-3">
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full font-bold text-sm">{step.num}</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gov-text">{step.title}</td>
                                        <td className="px-4 py-3 text-gov-text-secondary">{step.desc}</td>
                                        <td className="text-left px-4 py-3">
                                            {currentStep1 >= step.num ? (
                                                <div className="flex items-center justify-start gap-2">
                                                    <i className="fas fa-check-circle text-green-600"></i>
                                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded break-all">
                                                        {getSimulationValue1(step.num)}
                                                    </span>
                                                </div>
                                            ) : currentStep1 === step.num - 1 && isRunning1 ? (
                                                <i className="fas fa-spinner fa-spin text-purple-600 text-xl"></i>
                                            ) : (
                                                <i className="fas fa-circle text-gray-300 text-xl"></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {currentStep1 >= 6 && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                        <i className="fas fa-check-circle text-6xl text-green-600 mb-4"></i>
                        <div className="text-2xl font-bold text-green-900 mb-2">Hash Chain 연동 완료!</div>
                        <div className="text-sm text-green-700">
                            디바이스와 Layer {selectedLayer1} 노드의 Hash Chain이 성공적으로 연동되었습니다.
                        </div>
                    </div>
                )}
            </div>

            {/* 구분선 */}
            <div className="border-t-4 border-gray-300 my-12"></div>

            {/* 섹션 2: Layer-Layer 연동 */}
            <div className="mb-12">
                <div className="mb-8">
                    <h4 className="text-2xl font-bold text-gov-text mb-3">
                        계층 간 Hash Chain 연동 (Layer {sourceLayer} ↔ Layer {targetLayer})
                    </h4>
                    <p className="text-gov-text-secondary leading-relaxed">
                        상위 계층과 하위 계층이 각자의 Hash Chain을 보유하며, 
                        계층 간 상호 검증을 통해 시스템 전체의 데이터 무결성을 확보합니다.
                    </p>
                </div>

                <div className="bg-gov-gray rounded-lg p-6 mb-6">
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gov-text mb-2">상위 Layer 선택</label>
                        <div className="flex gap-3">
                            {[1, 2, 3].map(layer => (
                                <button
                                    key={layer}
                                    onClick={() => handleSourceLayerChange(layer)}
                                    className={`px-6 py-2 rounded font-bold ${
                                        sourceLayer === layer
                                            ? 'bg-orange-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    Layer {layer}
                                </button>
                            ))}
                        </div>
                        <div className="mt-2 text-sm text-gov-text-secondary">
                            → 자동으로 Layer {targetLayer}와 연동됩니다
                        </div>
                    </div>
                    <label className="block text-sm font-bold text-gov-text mb-2">입력 데이터</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputData2}
                            onChange={(e) => setInputData2(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gov-border rounded focus:outline-none focus:ring-2 focus:ring-gov-blue"
                            placeholder="데이터를 입력하세요"
                        />
                        <button
                            onClick={runIntegrationSimulation2}
                            disabled={isRunning2 || !inputData2.trim()}
                            className="px-6 py-3 bg-orange-600 text-white rounded font-bold hover:bg-orange-700 disabled:opacity-50"
                        >
                            {isRunning2 ? '처리 중...' : '계층 간 연동 실행'}
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border-2 border-orange-300 p-6 mb-6">
                    <div className="flex justify-between items-start gap-6">
                        <div className={'flex-1 bg-orange-50 border-2 border-orange-400 rounded-lg p-6 ' + (currentStep2 === 2 || currentStep2 === 5 ? 'pulse-animation' : '')}>
                            <div className="text-center mb-4">
                                <i className="fas fa-layer-group text-6xl text-orange-600"></i>
                            </div>
                            <div className="text-lg font-bold text-center mb-3 text-orange-900">Layer {sourceLayer}</div>
                            <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                                <div className="text-xs font-bold text-gray-600 mb-2">Hash Chain:</div>
                                <div className="text-xs font-mono bg-gray-50 p-3 rounded border break-all min-h-[60px]">
                                    {chainData2.sourceChain}
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-col items-center justify-center py-12">
                            <i className="fas fa-arrows-alt-h text-5xl text-orange-600"></i>
                        </div>

                        <div className={'flex-1 bg-teal-50 border-2 border-teal-400 rounded-lg p-6 ' + (currentStep2 === 3 || currentStep2 === 4 ? 'pulse-animation' : '')}>
                            <div className="text-center mb-4">
                                <i className="fas fa-layer-group text-6xl text-teal-600"></i>
                            </div>
                            <div className="text-lg font-bold text-center mb-3 text-teal-900">Layer {targetLayer}</div>
                            <div className="bg-white rounded-lg p-4 border-2 border-teal-300">
                                <div className="text-xs font-bold text-gray-600 mb-2">Hash Chain:</div>
                                <div className="text-xs font-mono bg-gray-50 p-3 rounded border break-all min-h-[60px]">
                                    {chainData2.targetChain}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                    <div className="bg-orange-600 text-white px-6 py-4">
                        <h4 className="text-lg font-bold flex items-center">
                            <i className="fas fa-link mr-3"></i>계층 간 Hash Chain 연동 프로세스
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-center px-4 py-3 font-bold text-gov-text" style={{width: '80px'}}>단계</th>
                                    <th className="text-left px-4 py-3 font-bold text-gov-text">작업</th>
                                    <th className="text-left px-4 py-3 font-bold text-gov-text">설명</th>
                                    <th className="text-left px-4 py-3 font-bold text-gov-text" style={{width: '400px'}}>시뮬레이션</th>
                                </tr>
                            </thead>
                            <tbody>
                                {steps2.map((step, idx) => (
                                    <tr key={idx} className={'border-b border-gov-border hover:bg-gray-50 ' + (currentStep2 >= step.num ? 'bg-orange-50' : '')}>
                                        <td className="text-center px-4 py-3">
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full font-bold text-sm">{step.num}</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gov-text">{step.title}</td>
                                        <td className="px-4 py-3 text-gov-text-secondary">{step.desc}</td>
                                        <td className="text-left px-4 py-3">
                                            {currentStep2 >= step.num ? (
                                                <div className="flex items-center justify-start gap-2">
                                                    <i className="fas fa-check-circle text-green-600"></i>
                                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded break-all">
                                                        {getSimulationValue2(step.num)}
                                                    </span>
                                                </div>
                                            ) : currentStep2 === step.num - 1 && isRunning2 ? (
                                                <i className="fas fa-spinner fa-spin text-orange-600 text-xl"></i>
                                            ) : (
                                                <i className="fas fa-circle text-gray-300 text-xl"></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {currentStep2 >= 6 && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                        <i className="fas fa-check-circle text-6xl text-green-600 mb-4"></i>
                        <div className="text-2xl font-bold text-green-900 mb-2">계층 간 Hash Chain 연동 완료!</div>
                        <div className="text-sm text-green-700">
                            Layer {sourceLayer}과 Layer {targetLayer}의 Hash Chain이 성공적으로 연동되었습니다.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
