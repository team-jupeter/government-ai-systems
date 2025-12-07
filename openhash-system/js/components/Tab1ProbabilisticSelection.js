const Tab1ProbabilisticSelection = () => {
    const [inputText, setInputText] = React.useState('제주특별자치도 행정문서');
    const [currentStep, setCurrentStep] = React.useState(0);
    const [results, setResults] = React.useState({
        docHash: '',
        timestamp: '',
        combined: '',
        hash1: '',
        hash2: '',
        modValue: null,
        selectedLayer: null
    });
    const [isRunning, setIsRunning] = React.useState(false);

    // 간단한 SHA-256 시뮬레이션 (데모용)
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

    const runSimulation = async () => {
        if (!inputText.trim()) return;
        
        setIsRunning(true);
        setCurrentStep(0);
        setResults({
            docHash: '',
            timestamp: '',
            combined: '',
            hash1: '',
            hash2: '',
            modValue: null,
            selectedLayer: null
        });

        // Step 1: 문서 해싱
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(1);
        const docHash = sha256(inputText);
        setResults(prev => ({ ...prev, docHash }));

        // Step 2: 타임스탬프 생성
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(2);
        const timestamp = Date.now().toString();
        setResults(prev => ({ ...prev, timestamp }));

        // Step 3: 문서해시 || 타임스탬프 연결
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(3);
        const combined = docHash + timestamp;
        setResults(prev => ({ ...prev, combined }));

        // Step 4: 1차 재해싱
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(4);
        const hash1 = sha256(combined);
        setResults(prev => ({ ...prev, hash1 }));

        // Step 5: 2차 재해싱
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(5);
        const hash2 = sha256(hash1);
        setResults(prev => ({ ...prev, hash2 }));

        // Step 6: mod 100 연산
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(6);
        const lastBytes = hash2.slice(-8);
        const decimalValue = parseInt(lastBytes, 16);
        const modValue = decimalValue % 100;
        setResults(prev => ({ ...prev, modValue }));

        // Step 7: 계층 선택
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentStep(7);
        let layer;
        if (modValue < 70) layer = 1;
        else if (modValue < 90) layer = 2;
        else layer = 3;
        setResults(prev => ({ ...prev, selectedLayer: layer }));

        setIsRunning(false);
    };

    const getSimulationValue = (stepNum) => {
        if (currentStep < stepNum) return '-';
        
        switch(stepNum) {
            case 1:
                return results.docHash || '-';
            case 2:
                return results.timestamp || '-';
            case 3:
                return results.combined || '-';
            case 4:
                return results.hash1 || '-';
            case 5:
                return results.hash2 || '-';
            case 6:
                return results.modValue !== null ? results.modValue.toString() : '-';
            case 7:
                return results.selectedLayer ? 'Layer ' + results.selectedLayer : '-';
            default:
                return '-';
        }
    };

    const steps = [
        { num: 1, title: '문서 내용 SHA-256 해싱', desc: '입력 데이터를 32바이트 해시값으로 변환' },
        { num: 2, title: '타임스탬프 생성', desc: 'Unix timestamp (밀리초 단위)' },
        { num: 3, title: '문서해시 || 타임스탬프 연결', desc: '두 값을 결합하여 고유성 보장' },
        { num: 4, title: '1차 재해싱', desc: '연결된 값을 SHA-256으로 재해싱' },
        { num: 5, title: '2차 재해싱', desc: '결과를 다시 SHA-256으로 재해싱' },
        { num: 6, title: '범위 변환 (mod 100)', desc: '0~99 범위로 정규화' },
        { num: 7, title: '확률 분포 비교 및 계층 선택', desc: 'N<70→L1, 70≤N<90→L2, N≥90→L3' }
    ];

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">확률적 계층 선택 알고리즘</h4>
                <p className="text-gov-text-secondary leading-relaxed">
                    SHA-256 재해싱 기반으로 문서 해시값을 Layer 1(70%), Layer 2(20%), Layer 3(10%)로 자동 분배합니다.
                    작업증명이나 지분증명 없이 확률적으로 계층을 결정하여 에너지 효율성을 극대화합니다.
                </p>
            </div>

            {/* 입력 필드 */}
            <div className="bg-gov-gray rounded-lg p-6 mb-6">
                <label className="block text-sm font-bold text-gov-text mb-2">입력 데이터 (문서 내용)</label>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gov-border rounded focus:outline-none focus:ring-2 focus:ring-gov-blue"
                        placeholder="데이터를 입력하세요"
                    />
                    <button
                        onClick={runSimulation}
                        disabled={isRunning || !inputText.trim()}
                        className="px-6 py-3 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRunning ? '처리 중...' : '시뮬레이션 실행'}
                    </button>
                </div>
            </div>

            {/* 7단계 프로세스 테이블 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-gov-blue text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-list-ol mr-3"></i>
                        7단계 확률적 선택 프로세스
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gov-border bg-gray-50">
                                <th className="text-center px-4 py-3 font-bold text-gov-text" style={{width: '80px'}}>단계</th>
                                <th className="text-left px-4 py-3 font-bold text-gov-text">작업</th>
                                <th className="text-left px-4 py-3 font-bold text-gov-text">설명</th>
                                <th className="text-center px-4 py-3 font-bold text-gov-text" style={{width: '400px'}}>시뮬레이션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {steps.map((step, idx) => (
                                <tr key={idx} className={'border-b border-gov-border hover:bg-gray-50 ' + (currentStep >= step.num ? 'bg-blue-50' : '')}>
                                    <td className="text-left px-4 py-3">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gov-blue text-white rounded-full font-bold text-sm">
                                            {step.num}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gov-text">{step.title}</td>
                                    <td className="px-4 py-3 text-gov-text-secondary">{step.desc}</td>
                                    <td className="text-left px-4 py-3">
                                        {currentStep >= step.num ? (
                                            <div className="flex items-center justify-start gap-2">
                                                <i className="fas fa-check-circle text-green-600"></i>
                                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                                                    {getSimulationValue(step.num)}
                                                </span>
                                            </div>
                                        ) : currentStep === step.num - 1 && isRunning ? (
                                            <i className="fas fa-spinner fa-spin text-blue-600 text-xl"></i>
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

            {/* 처리 결과 */}
            {results.selectedLayer && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
                    <div className="text-6xl font-bold text-gov-blue mb-4">Layer {results.selectedLayer}</div>
                    <div className="text-lg text-gov-text mb-2">
                        {results.selectedLayer === 1 && '읍면동 계층'}
                        {results.selectedLayer === 2 && '시군구 계층'}
                        {results.selectedLayer === 3 && '광역시도 계층'}
                    </div>
                    <div className="text-sm text-gov-text-secondary">
                        mod 100 = {results.modValue}
                    </div>
                </div>
            )}

            {/* 확률 분포 */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-yellow-100 border-2 border-yellow-600 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-yellow-800 mb-2">70%</div>
                    <div className="text-sm font-bold text-yellow-700 mb-1">Layer 1 (읍면동)</div>
                    <div className="text-xs text-yellow-600">0 ≤ N &lt; 70</div>
                </div>
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-green-800 mb-2">20%</div>
                    <div className="text-sm font-bold text-green-700 mb-1">Layer 2 (시군구)</div>
                    <div className="text-xs text-green-600">70 ≤ N &lt; 90</div>
                </div>
                <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-blue-800 mb-2">10%</div>
                    <div className="text-sm font-bold text-blue-700 mb-1">Layer 3 (광역시도)</div>
                    <div className="text-xs text-blue-600">90 ≤ N &lt; 100</div>
                </div>
            </div>
        </div>
    );
};
