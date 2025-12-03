const CareerOptimization = () => {
    const [mode, setMode] = React.useState('optimize');
    const [optResult, setOptResult] = React.useState(null);
    const [modResult, setModResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [currentCareer, setCurrentCareer] = React.useState('');
    const [desiredCareer, setDesiredCareer] = React.useState('');
    const optimize = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/education/career/optimize', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ preferences: ['창의성', '안정성'], skills: ['분석력', '소통능력'] }) });
            setOptResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    const modify = async () => {
        if (!currentCareer || !desiredCareer) return;
        setLoading(true);
        try {
            const res = await fetch('/api/education/career/realtime-modify', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ current_career: currentCareer, desired_career: desiredCareer }) });
            setModResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-2"><i className="fas fa-route mr-3 text-purple-400"></i>진로 최적화 시스템</h2><p className="text-gray-400">ISIO(140) 개인-사회 통합 효용 최적화 | RCM(170) 실시간 진로 수정</p></div>
                <div className="flex justify-center gap-4 mb-8">
                    <button onClick={() => setMode('optimize')} className={`px-6 py-3 rounded-lg font-bold ${mode === 'optimize' ? 'bg-purple-600' : 'bg-gray-700'}`}>🎯 진로 최적화 (140)</button>
                    <button onClick={() => setMode('modify')} className={`px-6 py-3 rounded-lg font-bold ${mode === 'modify' ? 'bg-orange-600' : 'bg-gray-700'}`}>⚡ 실시간 수정 (170)</button>
                </div>
                {mode === 'optimize' ? (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/30">
                            <h3 className="font-bold mb-4 text-purple-400">개인-사회 통합 효용 최적화</h3>
                            <p className="text-gray-400 text-sm mb-4">개인 효용과 사회 효용의 최적 균형점을 찾아 진로를 추천합니다.</p>
                            <button onClick={optimize} disabled={loading} className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg font-bold text-lg">{loading ? '최적화 중...' : '🎯 균형점 도출 실행'}</button>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            {optResult?.optimization ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-purple-900/30 p-3 rounded text-center border border-purple-500"><div className="text-xs text-gray-400">개인 효용</div><div className="text-2xl font-bold text-purple-400">{optResult.optimization.individual_utility}</div></div>
                                        <div className="bg-green-900/30 p-3 rounded text-center border border-green-500"><div className="text-xs text-gray-400">사회 효용</div><div className="text-2xl font-bold text-green-400">{optResult.optimization.social_utility}</div></div>
                                        <div className="bg-yellow-900/30 p-3 rounded text-center border border-yellow-500"><div className="text-xs text-gray-400">통합 효용</div><div className="text-2xl font-bold text-yellow-400">{optResult.optimization.integrated_utility}</div></div>
                                    </div>
                                    <div className="space-y-2">{optResult.optimization.career_options.map((c, i) => (<div key={i} className="bg-gray-900 p-3 rounded flex justify-between items-center"><span>{c.career}</span><span className="text-purple-400 font-bold">{c.match_score}%</span></div>))}</div>
                                    <div className="text-center text-sm text-gray-400">추천 교육: {optResult.optimization.recommended_education_path}</div>
                                </div>
                            ) : (<div className="text-center text-gray-500 py-12"><i className="fas fa-balance-scale text-4xl mb-4"></i><p>최적화 실행 시 균형점 결과가 표시됩니다</p></div>)}
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-xl p-6 border border-orange-500/30">
                            <h3 className="font-bold mb-4 text-orange-400">실시간 진로 수정 (RCM)</h3>
                            <p className="text-gray-400 text-sm mb-4">평균 2.3분 내 처리 | 사회 효용 저하 없이 즉시 진로 변경</p>
                            <input type="text" value={currentCareer} onChange={e => setCurrentCareer(e.target.value)} placeholder="현재 진로..." className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 mb-3" />
                            <input type="text" value={desiredCareer} onChange={e => setDesiredCareer(e.target.value)} placeholder="희망 진로..." className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 mb-4" />
                            <button onClick={modify} disabled={loading || !currentCareer || !desiredCareer} className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 rounded-lg font-bold text-lg">{loading ? '처리 중...' : '⚡ 실시간 진로 수정 요청'}</button>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            {modResult?.modification ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-green-900/30 rounded-lg border border-green-500 text-center"><div className="text-2xl mb-2">✅</div><div className="text-xl font-bold text-green-400">{modResult.modification.status}</div><div className="text-sm text-gray-400">처리 시간: {modResult.modification.processing_time_minutes}분</div></div>
                                    <div className="bg-gray-900 p-3 rounded"><div className="text-sm text-gray-400">진로 변경</div><div className="font-bold">{modResult.modification.from} → {modResult.modification.to}</div></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-900 p-3 rounded text-center"><div className="text-xs text-gray-500">전환 기간</div><div className="font-bold">{modResult.modification.transition_plan.duration_months}개월</div></div>
                                        <div className="bg-gray-900 p-3 rounded text-center"><div className="text-xs text-gray-500">성공 예상률</div><div className="font-bold text-green-400">{modResult.modification.transition_plan.estimated_success_rate}%</div></div>
                                    </div>
                                </div>
                            ) : (<div className="text-center text-gray-500 py-12"><i className="fas fa-exchange-alt text-4xl mb-4"></i><p>현재/희망 진로 입력 후 수정 요청하세요</p></div>)}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
