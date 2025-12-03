const PrivacyProtection = () => {
    const [privacyResult, setPrivacyResult] = React.useState(null);
    const [biasResult, setBiasResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const testPrivacy = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/education/privacy/protect', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ data_type: 'educational_records' }) });
            setPrivacyResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    const testBias = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/education/bias/detect', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({}) });
            setBiasResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-2"><i className="fas fa-shield-alt mr-3 text-green-400"></i>보안 및 공정성 시스템</h2><p className="text-gray-400">HLPP(270) 고수준 프라이버시 보호 | RBC(280) 실시간 편향 탐지</p></div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-900 rounded-xl p-6 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-4"><span className="text-xs bg-green-600 px-2 py-1 rounded">270</span><h3 className="font-bold text-green-400">고수준 프라이버시 보호</h3></div>
                        <p className="text-gray-400 text-sm mb-4">k-익명성 + 차분 프라이버시 적용 | 재식별 저항률 100%</p>
                        <button onClick={testPrivacy} disabled={loading} className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium mb-4">{loading ? '처리 중...' : '🛡️ 프라이버시 보호 테스트'}</button>
                        {privacyResult?.protection && (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">k-익명성</div><div className="font-bold text-green-400">k={privacyResult.protection.k_anonymity_applied}</div></div>
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">ε (epsilon)</div><div className="font-bold text-green-400">{privacyResult.protection.differential_privacy_epsilon}</div></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">재식별 저항</div><div className="font-bold text-green-400">{privacyResult.protection.reidentification_resistance}%</div></div>
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">데이터 유용성</div><div className="font-bold text-blue-400">{privacyResult.protection.data_utility_preserved}%</div></div>
                                </div>
                                <div className="flex gap-2 justify-center"><span className="px-2 py-1 bg-blue-600/30 rounded text-xs">GDPR ✓</span><span className="px-2 py-1 bg-blue-600/30 rounded text-xs">ISO27001 ✓</span></div>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 border border-pink-500/30">
                        <div className="flex items-center gap-3 mb-4"><span className="text-xs bg-pink-600 px-2 py-1 rounded">280</span><h3 className="font-bold text-pink-400">실시간 편향 탐지</h3></div>
                        <p className="text-gray-400 text-sm mb-4">4차원 편향 실시간 탐지 | 95.2% 정확도 | 즉시 보정</p>
                        <button onClick={testBias} disabled={loading} className="w-full py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 rounded-lg font-medium mb-4">{loading ? '처리 중...' : '⚖️ 편향 탐지 테스트'}</button>
                        {biasResult?.bias_analysis && (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">{Object.entries(biasResult.bias_analysis.bias_scores).map(([dim, score]) => (<div key={dim} className="bg-gray-800 p-2 rounded text-center"><div className="text-xs text-gray-500">{dim}</div><div className="font-bold text-pink-400">{score}</div></div>))}</div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">공정성 점수</div><div className="font-bold text-green-400">{biasResult.bias_analysis.overall_fairness}</div></div>
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">보정 적용</div><div className="font-bold text-green-400">{biasResult.bias_analysis.correction_applied ? '✓' : '✗'}</div></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
