const HashChainIntegration = ({ simulationHash, selectedLayer }) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [chainData, setChainData] = React.useState({
        deviceChain: 'origin',
        nodeChain: 'origin',
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

    const runChainSimulation = async () => {
        if (!simulationHash || !selectedLayer) {
            alert('먼저 위의 시뮬레이션을 실행하여 Hash를 생성하고 Layer를 선택하세요.');
            return;
        }

        setIsRunning(true);
        setCurrentStep(0);
        setChainData({
            deviceChain: 'origin',
            nodeChain: 'origin',
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
        setChainData(prev => ({ ...prev, sentHash: simulationHash }));

        // 3단계: 노드 Hash Chain 갱신
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(3);
        const nodeNewHash = sha256('origin' + simulationHash);
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
                return '연동 완료';
            default:
                return '-';
        }
    };

    const steps = [
        { num: 1, title: '초기 상태', desc: '디바이스와 노드 모두 Hash Chain이 "origin"으로 초기화됨' },
        { num: 2, title: '디바이스 → 노드 전송', desc: '시뮬레이션에서 생성된 Hash를 Layer 노드로 전송' },
        { num: 3, title: '노드 Hash Chain 갱신', desc: '노드: origin + 받은 Hash → SHA-256 → 새 Hash 생성' },
        { num: 4, title: '노드 → 디바이스 전송', desc: '노드의 최종 Hash를 디바이스로 전송' },
        { num: 5, title: '디바이스 Hash Chain 갱신', desc: '디바이스: origin + 받은 Hash → SHA-256 → 새 Hash 생성' },
        { num: 6, title: '상호 연동 완료', desc: '디바이스와 노드의 Hash Chain이 서로 연동됨' }
    ];

    return (
        <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-link mr-3"></i>
                        Hash Chain 연동
                    </h4>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex-1 bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                            <div className="text-center mb-2">
                                <i className="fas fa-mobile-alt text-4xl text-gray-600"></i>
                            </div>
                            <div className="text-sm font-bold text-center mb-2">스마트폰</div>
                            <div className="text-xs text-center text-gray-600 mb-2">Hash Chain:</div>
                            <div className="text-xs font-mono bg-white p-2 rounded border break-all">
                                {chainData.deviceChain}
                            </div>
                        </div>

                        <div className="flex-shrink-0 px-4 flex items-center">
                            <i className="fas fa-exchange-alt text-3xl text-purple-600"></i>
                        </div>

                        <div className="flex-1 bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
                            <div className="text-center mb-2">
                                <i className="fas fa-server text-4xl text-gray-600"></i>
                            </div>
                            <div className="text-sm font-bold text-center mb-2">
                                Layer {selectedLayer || '?'} 노드
                            </div>
                            <div className="text-xs text-center text-gray-600 mb-2">Hash Chain:</div>
                            <div className="text-xs font-mono bg-white p-2 rounded border break-all">
                                {chainData.nodeChain}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <button
                            onClick={runChainSimulation}
                            disabled={isRunning || !simulationHash || !selectedLayer}
                            className="px-6 py-3 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRunning ? '처리 중...' : 'Hash Chain 연동 시뮬레이션 실행'}
                        </button>
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
            </div>
        </div>
    );
};
