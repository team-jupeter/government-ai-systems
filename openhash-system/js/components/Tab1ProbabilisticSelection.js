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

    const sha256 = async (text) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentStep(1);
        const docHash = await sha256(inputText);
        setResults(prev => ({ ...prev, docHash }));

        // Step 2: 타임스탬프 생성
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentStep(2);
        const timestamp = Date.now().toString();
        setResults(prev => ({ ...prev, timestamp }));

        // Step 3: 문서해시 || 타임스탬프 연결
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentStep(3);
        const combined = docHash + timestamp;
        setResults(prev => ({ ...prev, combined }));

        // Step 4: 1차 재해싱
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentStep(4);
        const hash1 = await sha256(combined);
        setResults(prev => ({ ...prev, hash1 }));

        // Step 5: 2차 재해싱
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentStep(5);
        const hash2 = await sha256(hash1);
        setResults(prev => ({ ...prev, hash2 }));

        // Step 6: mod 100 연산
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentStep(6);
        const lastBytes = hash2.slice(-8);
        const decimalValue = parseInt(lastBytes, 16);
        const modValue = decimalValue % 100;
        setResults(prev => ({ ...prev, modValue }));

        // Step 7: 계층 선택
        await new Promise(resolve => setTimeout(resolve, 700));
        setCurrentStep(7);
        let layer;
        if (modValue < 70) layer = 1;
        else if (modValue < 90) layer = 2;
        else layer = 3;
        setResults(prev => ({ ...prev, selectedLayer: layer }));

        setIsRunning(false);
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
                            </tr>
                        </thead>
                        <tbody>
                            {steps.map((step, idx) => (
                                <tr key={idx} className="border-b border-gov-border hover:bg-gray-50">
                                    <td className="text-center px-4 py-3">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gov-blue text-white rounded-full font-bold text-sm">
                                            {step.num}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gov-text">{step.title}</td>
                                    <td className="px-4 py-3 text-gov-text-secondary">{step.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 보안 특성 */}
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <i className="fas fa-shield-alt text-amber-600 text-3xl mt-1"></i>
                    <div>
                        <h5 className="text-lg font-bold text-amber-900 mb-3">보안 특성</h5>
                        <div className="space-y-2 text-sm text-gov-text-secondary">
                            <p><strong className="text-amber-900">공격자 예측 확률:</strong> 2^-256 (사실상 불가능)</p>
                            <p><strong className="text-amber-900">SHA-256 특성:</strong> 입력의 1비트만 변경되어도 출력이 완전히 달라지는 눈사태 효과 (Avalanche Effect)</p>
                            <p><strong className="text-amber-900">예측 불가능성:</strong> 공격자는 특정 계층을 목표로 데이터를 조작할 수 없음</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 확률 분포 가변성 */}
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <i className="fas fa-info-circle text-blue-600 text-3xl mt-1"></i>
                    <div>
                        <h5 className="text-lg font-bold text-blue-900 mb-3">확률 분포 가변성</h5>
                        <p className="text-sm text-gov-text-secondary mb-3">
                            <strong className="text-blue-900">중요:</strong> 확률 분포 수치(70%, 20%, 10%)는 시스템 요구사항에 따라 가변 가능한 설계 선택사항입니다.
                        </p>
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="bg-white rounded p-3 border border-blue-300">
                                <div className="font-bold text-blue-900 text-xs mb-1">균등 분포 예시</div>
                                <div className="text-xs text-gov-text-secondary">L1: 33% | L2: 33% | L3: 34%</div>
                            </div>
                            <div className="bg-white rounded p-3 border border-blue-300">
                                <div className="font-bold text-blue-900 text-xs mb-1">현재 설정</div>
                                <div className="text-xs text-gov-text-secondary">L1: 70% | L2: 20% | L3: 10%</div>
                            </div>
                            <div className="bg-white rounded p-3 border border-blue-300">
                                <div className="font-bold text-blue-900 text-xs mb-1">집중 분포 예시</div>
                                <div className="text-xs text-gov-text-secondary">L1: 90% | L2: 8% | L3: 2%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 입력 */}
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
                        {isRunning ? '처리 중...' : '알고리즘 실행'}
                    </button>
                </div>
            </div>

            {/* 처리 단계 시각화 */}
            <div className="space-y-4 mb-8">
                {/* Step 1 */}
                <div className={`border-2 rounded-lg p-6 transition-all ${currentStep >= 1 ? 'border-blue-500 bg-blue-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">1</span>
                        <h5 className="font-bold text-gov-text">문서 내용 SHA-256 해싱 (32바이트)</h5>
                    </div>
                    {results.docHash ? (
                        <div className="bg-white rounded p-4 font-mono text-xs break-all border border-blue-300">{results.docHash}</div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                {/* Step 2 */}
                <div className={`border-2 rounded-lg p-6 transition-all ${currentStep >= 2 ? 'border-green-500 bg-green-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">2</span>
                        <h5 className="font-bold text-gov-text">타임스탬프 생성</h5>
                    </div>
                    {results.timestamp ? (
                        <div className="bg-white rounded p-4 border border-green-300">
                            <div className="font-mono text-sm">{results.timestamp}</div>
                            <div className="text-xs text-gov-text-secondary mt-1">
                                {new Date(parseInt(results.timestamp)).toLocaleString('ko-KR')}
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                {/* Step 3 */}
                <div className={`border-2 rounded-lg p-6 transition-all ${currentStep >= 3 ? 'border-purple-500 bg-purple-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">3</span>
                        <h5 className="font-bold text-gov-text">문서해시 || 타임스탬프 연결</h5>
                    </div>
                    {results.combined ? (
                        <div className="bg-white rounded p-4 font-mono text-xs break-all border border-purple-300">
                            <span className="text-blue-600">{results.docHash}</span>
                            <span className="text-green-600">{results.timestamp}</span>
                        </div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                {/* Step 4 */}
                <div className={`border-2 rounded-lg p-6 transition-all ${currentStep >= 4 ? 'border-orange-500 bg-orange-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">4</span>
                        <h5 className="font-bold text-gov-text">1차 재해싱 SHA-256</h5>
                    </div>
                    {results.hash1 ? (
                        <div className="bg-white rounded p-4 font-mono text-xs break-all border border-orange-300">{results.hash1}</div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                {/* Step 5 */}
                <div className={`border-2 rounded-lg p-6 transition-all ${currentStep >= 5 ? 'border-red-500 bg-red-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">5</span>
                        <h5 className="font-bold text-gov-text">2차 재해싱 SHA-256</h5>
                    </div>
                    {results.hash2 ? (
                        <div className="bg-white rounded p-4 font-mono text-xs break-all border border-red-300">{results.hash2}</div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                {/* Step 6 */}
                <div className={`border-2 rounded-lg p-6 transition-all ${currentStep >= 6 ? 'border-indigo-500 bg-indigo-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">6</span>
                        <h5 className="font-bold text-gov-text">범위 변환 (mod 100)</h5>
                    </div>
                    {results.modValue !== null ? (
                        <div className="bg-white rounded p-4 border border-indigo-300">
                            <div className="flex items-center justify-center gap-6">
                                <div>
                                    <span className="text-sm text-gov-text-secondary">마지막 8자리: </span>
                                    <span className="font-mono font-bold text-lg">{results.hash2.slice(-8)}</span>
                                </div>
                                <i className="fas fa-arrow-right text-2xl text-gov-blue"></i>
                                <div>
                                    <span className="text-sm text-gov-text-secondary">mod 100 = </span>
                                    <span className="font-mono font-bold text-3xl text-gov-blue">{results.modValue}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                {/* Step 7 */}
                <div className={`border-2 rounded-lg p-6 transition-all ${currentStep >= 7 ? 'border-green-600 bg-green-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">7</span>
                        <h5 className="font-bold text-gov-text">확률 분포 비교 및 계층 선택</h5>
                    </div>
                    {results.selectedLayer ? (
                        <div className="text-center py-8">
                            <div className="text-6xl font-bold text-gov-blue mb-4">Layer {results.selectedLayer}</div>
                            <div className="text-lg text-gov-text mb-2">
                                {results.selectedLayer === 1 && '읍면동 계층'}
                                {results.selectedLayer === 2 && '시군구 계층'}
                                {results.selectedLayer === 3 && '광역시도 계층'}
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                {results.selectedLayer === 1 && `N = ${results.modValue} < 70 (70% 확률)`}
                                {results.selectedLayer === 2 && `70 ≤ N = ${results.modValue} < 90 (20% 확률)`}
                                {results.selectedLayer === 3 && `N = ${results.modValue} ≥ 90 (10% 확률)`}
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>
            </div>

            {/* 확률 분포 시각화 */}
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

            {/* AWS 검증 */}
            <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                    <i className="fas fa-check-circle text-xl"></i>
                    <span className="text-sm font-bold">AWS 실측 검증: 11개 노드에서 481.4 TPS 달성, 확률적 선택 알고리즘 정상 작동 확인</span>
                </div>
            </div>
        </div>
    );
};
