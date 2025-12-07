const Tab2DeviceLayerIntegration = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [inputData, setInputData] = React.useState('제주특별자치도 행정문서');
    const [selectedLayer, setSelectedLayer] = React.useState(null);
    const [chainData, setChainData] = React.useState({
        deviceChain: 'origin',
        nodeChain: 'origin',
        initialHash: '',
        sentHash: '',
        nodeNewHash: '',
        nodeResponseHash: '',
        deviceNewHash: ''
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

    const runIntegrationSimulation = async () => {
        if (!inputData.trim()) {
            alert('입력 데이터를 입력하세요.');
            return;
        }

        setIsRunning(true);
        setCurrentStep(0);
        
        // 초기 Hash 생성 및 Layer 선택
        const initialHash = sha256(inputData);
        const modValue = parseInt(initialHash.slice(-8), 16) % 100;
        const layer = modValue < 70 ? 1 : modValue < 90 ? 2 : 3;
        setSelectedLayer(layer);

        setChainData({
            deviceChain: 'origin',
            nodeChain: 'origin',
            initialHash: initialHash,
            sentHash: '',
            nodeNewHash: '',
            nodeResponseHash: '',
            deviceNewHash: ''
        });

        // 1단계: 초기 상태
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(1);

        // 2단계: 스마트폰 → 노드 전송
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(2);
        setChainData(prev => ({ ...prev, sentHash: initialHash }));

        // 3단계: 노드 Hash Chain 갱신
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(3);
        const nodeNewHash = sha256('origin' + initialHash);
        setChainData(prev => ({ ...prev, nodeNewHash, nodeChain: nodeNewHash }));

        // 4단계: 노드 → 스마트폰 전송
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(4);
        setChainData(prev => ({ ...prev, nodeResponseHash: nodeNewHash }));

        // 5단계: 스마트폰 Hash Chain 갱신
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(5);
        const deviceNewHash = sha256('origin' + nodeNewHash);
        setChainData(prev => ({ ...prev, deviceNewHash, deviceChain: deviceNewHash }));

        // 6단계: 최종 연동 완료
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(6);

        setIsRunning(false);
    };

    const getSimulationValue = (stepNum) => {
        if (currentStep < stepNum) return '-';
        
        switch(stepNum) {
            case 1:
                return '디바이스: origin | 노드: origin';
            case 2:
                return chainData.sentHash || '-';
            case 3:
                return chainData.nodeNewHash || '-';
            case 4:
                return chainData.nodeResponseHash || '-';
            case 5:
                return chainData.deviceNewHash || '-';
            case 6:
                return '✓ 연동 완료';
            default:
                return '-';
        }
    };

    const steps = [
        { num: 1, title: '초기 상태', desc: '디바이스와 노드 모두 Hash Chain이 "origin"으로 초기화됨' },
        { num: 2, title: '디바이스 → 노드 전송', desc: '입력 데이터의 Hash를 확률적으로 선택된 Layer 노드로 전송' },
        { num: 3, title: '노드 Hash Chain 갱신', desc: '노드: SHA-256(origin + 받은 Hash) → 새 Hash Chain 생성' },
        { num: 4, title: '노드 → 디바이스 전송', desc: '노드의 갱신된 Hash Chain을 디바이스로 전송' },
        { num: 5, title: '디바이스 Hash Chain 갱신', desc: '디바이스: SHA-256(origin + 받은 Hash) → 새 Hash Chain 생성' },
        { num: 6, title: '상호 연동 완료', desc: '디바이스와 노드의 Hash Chain이 서로 연동되어 데이터 무결성 확보' }
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

            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">
                    스마트폰과 확률적으로 선택된 Layer의 어느 한 노드 간 Hash Chain 연동
                </h4>
                <p className="text-gov-text-secondary leading-relaxed">
                    단말기(스마트폰)와 선택된 계층 노드가 각자의 Hash Chain을 보유하며, 
                    상호 검증을 통해 데이터 무결성을 확보합니다. 
                    각 엔티티는 상대방의 Hash를 자신의 체인에 포함시켜 연동 상태를 유지합니다.
                </p>
            </div>

            {/* 입력 필드 */}
            <div className="bg-gov-gray rounded-lg p-6 mb-6">
                <label className="block text-sm font-bold text-gov-text mb-2">입력 데이터</label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gov-border rounded focus:outline-none focus:ring-2 focus:ring-gov-blue"
                        placeholder="데이터를 입력하세요"
                    />
                    <button
                        onClick={runIntegrationSimulation}
                        disabled={isRunning || !inputData.trim()}
                        className="px-6 py-3 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRunning ? '처리 중...' : '연동 시뮬레이션 실행'}
                    </button>
                </div>
            </div>

            {/* 디바이스와 노드 시각화 */}
            <div className="bg-white rounded-lg border-2 border-purple-300 p-6 mb-6">
                <div className="flex justify-between items-start gap-6">
                    {/* 스마트폰 */}
                    <div className={'flex-1 bg-blue-50 border-2 border-blue-400 rounded-lg p-6 transition-all ' + (currentStep === 2 || currentStep === 5 ? 'pulse-animation' : '')}>
                        <div className="text-center mb-4">
                            <i className="fas fa-mobile-alt text-6xl text-blue-600"></i>
                        </div>
                        <div className="text-lg font-bold text-center mb-3 text-blue-900">스마트폰</div>
                        <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                            <div className="text-xs font-bold text-gray-600 mb-2">Hash Chain:</div>
                            <div className="text-xs font-mono bg-gray-50 p-3 rounded border break-all min-h-[60px]">
                                {chainData.deviceChain}
                            </div>
                        </div>
                    </div>

                    {/* 화살표 */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center py-12">
                        <div className="text-center mb-4">
                            <i className="fas fa-exchange-alt text-5xl text-purple-600"></i>
                        </div>
                        {selectedLayer && (
                            <div className="bg-purple-100 border-2 border-purple-600 rounded-lg px-4 py-2">
                                <div className="text-sm font-bold text-purple-900">
                                    선택된 계층
                                </div>
                                <div className="text-2xl font-bold text-purple-600 text-center">
                                    Layer {selectedLayer}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Layer 노드 */}
                    <div className={'flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-6 transition-all ' + (currentStep === 3 || currentStep === 4 ? 'pulse-animation' : '')}>
                        <div className="text-center mb-4">
                            <i className="fas fa-server text-6xl text-green-600"></i>
                        </div>
                        <div className="text-lg font-bold text-center mb-3 text-green-900">
                            Layer {selectedLayer || '?'} 노드
                        </div>
                        <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                            <div className="text-xs font-bold text-gray-600 mb-2">Hash Chain:</div>
                            <div className="text-xs font-mono bg-gray-50 p-3 rounded border break-all min-h-[60px]">
                                {chainData.nodeChain}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6단계 프로세스 테이블 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-link mr-3"></i>
                        Hash Chain 연동 프로세스
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
                            {steps.map((step, idx) => (
                                <tr key={idx} className={'border-b border-gov-border hover:bg-gray-50 ' + (currentStep >= step.num ? 'bg-purple-50' : '')}>
                                    <td className="text-center px-4 py-3">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full font-bold text-sm">
                                            {step.num}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gov-text">{step.title}</td>
                                    <td className="px-4 py-3 text-gov-text-secondary">{step.desc}</td>
                                    <td className="text-left px-4 py-3">
                                        {currentStep >= step.num ? (
                                            <div className="flex items-center justify-start gap-2">
                                                <i className="fas fa-check-circle text-green-600"></i>
                                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded break-all">
                                                    {getSimulationValue(step.num)}
                                                </span>
                                            </div>
                                        ) : currentStep === step.num - 1 && isRunning ? (
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

            {/* 연동 완료 메시지 */}
            {currentStep >= 6 && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                    <i className="fas fa-check-circle text-6xl text-green-600 mb-4"></i>
                    <div className="text-2xl font-bold text-green-900 mb-2">Hash Chain 연동 완료!</div>
                    <div className="text-sm text-green-700">
                        디바이스와 Layer {selectedLayer} 노드의 Hash Chain이 성공적으로 연동되었습니다.
                    </div>
                </div>
            )}
        </div>
    );
};
