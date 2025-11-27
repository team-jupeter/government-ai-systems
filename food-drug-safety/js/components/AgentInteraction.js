const AgentInteraction = () => {
    const [externalAgent, setExternalAgent] = React.useState('제약회사 허가신청 Agent');
    const [requestType, setRequestType] = React.useState('신약 허가 신청');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const agents = ['제약회사 허가신청 Agent', '식품업체 규제대응 Agent', '병원 임상시험 Agent', '의료기기 인증신청 Agent', '화장품업체 신고 Agent'];
    const requests = ['신약 허가 신청', '임상시험 계획 승인', '식품 영업허가 신청', '수입식품 검사 요청', '의료기기 품목허가', '부작용 보고 제출'];
    const interact = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/food-drug-safety/agent/interact', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ external_agent: externalAgent, request_type: requestType }) });
            setResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-exchange-alt mr-3 text-cyan-400"></i>Agent 간 상호작용 (A2A)</h2><p className="text-gray-400">외부 기관 Agent와 식약처 Agent 간 직접 통신 프로토콜</p></div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-900 rounded-xl p-6 border border-cyan-500/30">
                        <h3 className="font-bold mb-4 text-cyan-400">A2A 통신 시뮬레이션</h3>
                        <div className="mb-4"><label className="text-sm text-gray-400 block mb-2">외부 Agent</label><select value={externalAgent} onChange={e => setExternalAgent(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3">{agents.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                        <div className="mb-4"><label className="text-sm text-gray-400 block mb-2">요청 유형</label><select value={requestType} onChange={e => setRequestType(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3">{requests.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                        <button onClick={interact} disabled={loading} className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg font-bold text-lg">{loading ? '통신 중...' : '🔗 A2A 통신 실행'}</button>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-green-400">통신 결과</h3>
                        {result ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-4 p-4 bg-gray-800 rounded-lg">
                                    <div className="text-center"><div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-1">🏢</div><div className="text-xs">{result.interaction?.external_agent?.split(' ')[0]}</div></div>
                                    <div className="flex-1 border-t-2 border-dashed border-cyan-500 relative"><span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 px-2 text-xs text-cyan-400">A2A</span></div>
                                    <div className="text-center"><div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-1">🏥</div><div className="text-xs">{result.interaction?.mfds_agent?.slice(0, 10)}</div></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div className="bg-gray-800 p-3 rounded"><span className="text-gray-400">프로토콜: </span><span className="text-cyan-400">{result.interaction?.protocol}</span></div>
                                    <div className="bg-gray-800 p-3 rounded"><span className="text-gray-400">응답시간: </span><span className="text-green-400">{result.interaction?.response_time_ms}ms</span></div>
                                    <div className="bg-gray-800 p-3 rounded"><span className="text-gray-400">인증: </span><span className="text-green-400">✓</span></div>
                                    <div className="bg-gray-800 p-3 rounded"><span className="text-gray-400">암호화: </span><span className="text-green-400">{result.interaction?.encryption?.slice(0, 7)}</span></div>
                                </div>
                                <div className="bg-gray-800 p-3 rounded"><div className="text-xs text-gray-400 mb-2">다음 단계:</div><div className="flex flex-wrap gap-2">{result.interaction?.next_steps?.map((s, i) => <span key={i} className="px-2 py-1 bg-cyan-600/30 rounded text-xs">{s}</span>)}</div></div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-12"><i className="fas fa-plug text-4xl mb-4"></i><p>A2A 통신 실행 시 결과가 표시됩니다</p></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
