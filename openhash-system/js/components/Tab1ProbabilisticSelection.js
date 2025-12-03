const Tab1ProbabilisticSelection = () => {
    const [inputText, setInputText] = React.useState('제주특별자치도 행정문서');
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

        await new Promise(resolve => setTimeout(resolve, 500));
        const firstHash = await sha256(inputText);
        setHash1(firstHash);

        await new Promise(resolve => setTimeout(resolve, 500));
        const secondHash = await sha256(firstHash);
        setHash2(secondHash);

        await new Promise(resolve => setTimeout(resolve, 500));
        const lastTwoBytes = secondHash.slice(-2);
        const value = parseInt(lastTwoBytes, 16);
        setLayerValue(value);

        await new Promise(resolve => setTimeout(resolve, 500));
        let layer;
        if (value <= 178) layer = 1;
        else if (value <= 229) layer = 2;
        else layer = 3;
        setSelectedLayer(layer);

        setIsRunning(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">확률적 계층 선택 알고리즘 (도면 300)</h4>
                <p className="text-gov-text-secondary leading-relaxed">
                    SHA-256 재해싱 기반으로 문서 해시값(400)을 Layer 1(70%), Layer 2(20%), Layer 3(10%)로 자동 분배합니다.
                    작업증명이나 지분증명 없이 확률적으로 계층을 결정하여 에너지 효율성을 극대화합니다.
                </p>
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

            {/* 처리 단계 */}
            <div className="space-y-4">
                <div className={`border-2 rounded-lg p-6 ${hash1 ? 'border-blue-500 bg-blue-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">1</span>
                        <h5 className="font-bold text-gov-text">1차 해싱: SHA-256(문서) → 문서 해시값(400)</h5>
                    </div>
                    {hash1 ? (
                        <div className="bg-white rounded p-4 font-mono text-xs break-all border border-blue-300">{hash1}</div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                <div className={`border-2 rounded-lg p-6 ${hash2 ? 'border-green-500 bg-green-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">2</span>
                        <h5 className="font-bold text-gov-text">재해싱: SHA-256(해시값) → 계층 선택용 해시</h5>
                    </div>
                    {hash2 ? (
                        <div className="bg-white rounded p-4 font-mono text-xs break-all border border-green-300">{hash2}</div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                <div className={`border-2 rounded-lg p-6 ${layerValue !== null ? 'border-purple-500 bg-purple-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">3</span>
                        <h5 className="font-bold text-gov-text">마지막 2바이트 추출 및 10진수 변환</h5>
                    </div>
                    {layerValue !== null ? (
                        <div className="bg-white rounded p-4 border border-purple-300">
                            <div className="flex items-center justify-center gap-6">
                                <div>
                                    <span className="text-sm text-gov-text-secondary">16진수: </span>
                                    <span className="font-mono font-bold text-lg">{hash2.slice(-2)}</span>
                                </div>
                                <i className="fas fa-arrow-right text-2xl text-gov-blue"></i>
                                <div>
                                    <span className="text-sm text-gov-text-secondary">10진수: </span>
                                    <span className="font-mono font-bold text-2xl text-gov-blue">{layerValue}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>

                <div className={`border-2 rounded-lg p-6 ${selectedLayer ? 'border-green-600 bg-green-50' : 'border-gov-border'}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center justify-center w-10 h-10 bg-gov-blue text-white rounded-full font-bold">4</span>
                        <h5 className="font-bold text-gov-text">계층 결정 (확률 기반)</h5>
                    </div>
                    {selectedLayer ? (
                        <div className="text-center py-8">
                            <div className="text-6xl font-bold text-gov-blue mb-4">Layer {selectedLayer}</div>
                            <div className="text-lg text-gov-text mb-2">
                                {selectedLayer === 1 && '읍면동 계층'}
                                {selectedLayer === 2 && '시군구 계층'}
                                {selectedLayer === 3 && '광역시도 계층'}
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                {selectedLayer === 1 && '값 범위: 0-178 (70% 확률)'}
                                {selectedLayer === 2 && '값 범위: 179-229 (20% 확률)'}
                                {selectedLayer === 3 && '값 범위: 230-255 (10% 확률)'}
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gov-text-secondary">대기 중...</div>
                    )}
                </div>
            </div>

            {/* 확률 분포 시각화 */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-yellow-100 border-2 border-yellow-600 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-yellow-800 mb-2">70%</div>
                    <div className="text-sm font-bold text-yellow-700 mb-1">Layer 1 (읍면동)</div>
                    <div className="text-xs text-yellow-600">0 ≤ 값 ≤ 178</div>
                </div>
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-green-800 mb-2">20%</div>
                    <div className="text-sm font-bold text-green-700 mb-1">Layer 2 (시군구)</div>
                    <div className="text-xs text-green-600">179 ≤ 값 ≤ 229</div>
                </div>
                <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-6 text-center">
                    <div className="text-4xl font-bold text-blue-800 mb-2">10%</div>
                    <div className="text-sm font-bold text-blue-700 mb-1">Layer 3 (광역시도)</div>
                    <div className="text-xs text-blue-600">230 ≤ 값 ≤ 255</div>
                </div>
            </div>
        </div>
    );
};
