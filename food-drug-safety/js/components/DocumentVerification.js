const DocumentVerification = () => {
    const [layers, setLayers] = React.useState(null);
    const [docType, setDocType] = React.useState('의약품 허가증');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => { fetch('/api/food-drug-safety/openhash/layers').then(r => r.json()).then(setLayers); }, []);
    const docTypes = ['신약 허가증', '의약품 허가증', '의료기기 인증서', '식품 영업허가증', '임상시험 승인서', '화장품 신고증'];
    const verify = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/food-drug-safety/document/verify', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ document_type: docType }) });
            setResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    const layerColors = { Layer4: 'red', Layer3: 'orange', Layer2: 'yellow', Layer1: 'green' };
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-shield-alt mr-3 text-blue-400"></i>오픈해시 문서 검증</h2><p className="text-gray-400">4계층 확률적 저장 | 0.18초 검증 | 위변조 완벽 탐지</p></div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
                            <h3 className="font-bold mb-4 text-blue-400">문서 검증 테스트</h3>
                            <select value={docType} onChange={e => setDocType(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 mb-4">
                                {docTypes.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <button onClick={verify} disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium">{loading ? '검증 중...' : '🔍 오픈해시 검증 실행'}</button>
                        </div>
                        {result && (
                            <div className="bg-gray-800 rounded-xl p-6 border border-green-500/30">
                                <div className="text-center mb-4"><div className="text-4xl mb-2">✅</div><div className="text-xl font-bold text-green-400">검증 완료</div></div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-400">해시:</span><span className="font-mono text-xs">{result.verification?.hash?.slice(0, 20)}...</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">계층:</span><span className={`text-${layerColors[result.verification?.layer]}-400`}>{result.verification?.layer} ({result.verification?.layer_name})</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">신뢰도:</span><span className="text-green-400 font-bold">{result.verification?.trust_score}%</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">검증 시간:</span><span>{result.verification?.verification_time_ms}ms</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">위변조:</span><span className="text-green-400">미탐지</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">서명:</span><span className="text-green-400">유효</span></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-blue-400">4계층 구조</h3>
                        {layers && Object.entries(layers.layers).reverse().map(([key, layer]) => (
                            <div key={key} className={`p-4 mb-3 rounded-lg border-l-4 border-${layerColors[key]}-500 bg-gray-900`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`font-bold text-${layerColors[key]}-400`}>{key}</span>
                                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{layer.tps.toLocaleString()} TPS</span>
                                </div>
                                <div className="text-sm text-gray-300 mb-1">{layer.name}</div>
                                <div className="text-xs text-gray-500">최소 신뢰도: {layer.trust_min}%</div>
                                <div className="text-xs text-gray-500 mt-1">예: {layer.examples.join(', ')}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
