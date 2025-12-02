const Simulator = () => {
    const [inputText, setInputText] = React.useState('정부 공문서 데이터');
    const [hash1, setHash1] = React.useState('');
    const [hash2, setHash2] = React.useState('');
    const [layerValue, setLayerValue] = React.useState(null);
    const [selectedLayer, setSelectedLayer] = React.useState(null);
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
        setHash1('');
        setHash2('');
        setLayerValue(null);
        setSelectedLayer(null);

        // 1단계: 첫 번째 해싱
        await new Promise(resolve => setTimeout(resolve, 500));
        const firstHash = await sha256(inputText);
        setHash1(firstHash);

        // 2단계: 재해싱
        await new Promise(resolve => setTimeout(resolve, 500));
        const secondHash = await sha256(firstHash);
        setHash2(secondHash);

        // 3단계: 마지막 2바이트 추출 및 계층 결정
        await new Promise(resolve => setTimeout(resolve, 500));
        const lastTwoBytes = secondHash.slice(-2);
        const value = parseInt(lastTwoBytes, 16);
        setLayerValue(value);

        // 4단계: 계층 선택
        await new Promise(resolve => setTimeout(resolve, 500));
        let layer;
        if (value <= 178) layer = 1;
        else if (value <= 229) layer = 2;
        else layer = 3;
        setSelectedLayer(layer);

        setIsRunning(false);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gov-text mb-4">확률적 계층 선택 시뮬레이터</h3>
                    <p className="text-gov-text-secondary">SHA-256 재해싱 알고리즘을 실시간으로 체험해보세요</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* 입력 영역 */}
                    <div className="bg-gov-gray rounded-lg p-6 mb-6">
                        <label className="block text-sm font-bold text-gov-text mb-2">입력 데이터</label>
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
                                className="px-6 py-3 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isRunning ? '실행 중...' : '시뮬레이션 실행'}
                            </button>
                        </div>
                    </div>

                    {/* 처리 단계 */}
                    <div className="space-y-4">
                        {/* 1단계 */}
                        <div className={`bg-white border-2 border-gov-border rounded-lg p-6 transition-all ${hash1 ? 'border-blue-500' : ''}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gov-blue text-white rounded-full font-bold text-sm">1</span>
                                <h4 className="font-bold text-gov-text">1차 해싱 (SHA-256)</h4>
                            </div>
                            {hash1 ? (
                                <div className="bg-gray-100 rounded p-3 font-mono text-xs break-all">{hash1}</div>
                            ) : (
                                <div className="text-sm text-gov-text-secondary">대기 중...</div>
                            )}
                        </div>

                        {/* 2단계 */}
                        <div className={`bg-white border-2 border-gov-border rounded-lg p-6 transition-all ${hash2 ? 'border-green-500' : ''}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gov-blue text-white rounded-full font-bold text-sm">2</span>
                                <h4 className="font-bold text-gov-text">재해싱 (SHA-256)</h4>
                            </div>
                            {hash2 ? (
                                <div className="bg-gray-100 rounded p-3 font-mono text-xs break-all">{hash2}</div>
                            ) : (
                                <div className="text-sm text-gov-text-secondary">대기 중...</div>
                            )}
                        </div>

                        {/* 3단계 */}
                        <div className={`bg-white border-2 border-gov-border rounded-lg p-6 transition-all ${layerValue !== null ? 'border-purple-500' : ''}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gov-blue text-white rounded-full font-bold text-sm">3</span>
                                <h4 className="font-bold text-gov-text">마지막 2바이트 추출</h4>
                            </div>
                            {layerValue !== null ? (
                                <div className="space-y-2">
                                    <div className="bg-gray-100 rounded p-3">
                                        <span className="text-sm text-gov-text-secondary">16진수: </span>
                                        <span className="font-mono font-bold">{hash2.slice(-2)}</span>
                                        <span className="text-sm text-gov-text-secondary ml-4">→ 10진수: </span>
                                        <span className="font-mono font-bold text-lg text-gov-blue">{layerValue}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-gov-text-secondary">대기 중...</div>
                            )}
                        </div>

                        {/* 4단계 */}
                        <div className={`bg-white border-2 border-gov-border rounded-lg p-6 transition-all ${selectedLayer ? 'border-green-600 bg-green-50' : ''}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gov-blue text-white rounded-full font-bold text-sm">4</span>
                                <h4 className="font-bold text-gov-text">계층 결정</h4>
                            </div>
                            {selectedLayer ? (
                                <div className="text-center py-6">
                                    <div className="text-5xl font-bold text-gov-blue mb-3">Layer {selectedLayer}</div>
                                    <div className="text-sm text-gov-text-secondary">
                                        {selectedLayer === 1 && '0-178 범위 (70% 확률)'}
                                        {selectedLayer === 2 && '179-229 범위 (20% 확률)'}
                                        {selectedLayer === 3 && '230-255 범위 (10% 확률)'}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-gov-text-secondary">대기 중...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
