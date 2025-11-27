const HumanUniqueTask = () => {
    const [occupation, setOccupation] = React.useState('');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const occupations = ['소프트웨어 개발자', '의사', '교사', '변호사', '디자이너', '마케터', '회계사', '간호사', '상담사', '연구원'];
    const analyze = async () => {
        if (!occupation) return;
        setLoading(true);
        try {
            const res = await fetch('/api/education/human-tasks/analyze', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ occupation }) });
            setResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">HUTSI - 110</span><h2 className="text-3xl font-bold mt-4 mb-2"><i className="fas fa-user-cog mr-3 text-blue-400"></i>인간 고유 업무 체계적 식별</h2><p className="text-gray-400">AI가 대체할 수 없는 인간 고유 업무 분석 | 32.2% 대체불가, 48.9% 협업필요</p></div>
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4">직업 선택</h3>
                        <div className="flex flex-wrap gap-2 mb-4">{occupations.map(o => (<button key={o} onClick={() => setOccupation(o)} className={`px-3 py-2 rounded-lg text-sm ${occupation === o ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>{o}</button>))}</div>
                        <input type="text" value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="또는 직접 입력..." className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 mb-4" />
                        <button onClick={analyze} disabled={loading || !occupation} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium">{loading ? '분석 중...' : '🔍 AI 대체 가능성 분석'}</button>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-blue-400">분석 결과</h3>
                        {result?.analysis ? (
                            <div className="space-y-4">
                                <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500"><div className="text-xl font-bold">{result.analysis.occupation}</div><div className="text-sm text-gray-400">분석 시간: {result.analysis.analysis_time_ms}ms</div></div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">AI 대체율</div><div className="text-xl font-bold text-red-400">{result.analysis.ai_replaceability}%</div></div>
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">협업 가능</div><div className="text-xl font-bold text-yellow-400">{result.analysis.collaboration_potential}%</div></div>
                                    <div className="bg-gray-800 p-3 rounded text-center"><div className="text-xs text-gray-500">인간 고유</div><div className="text-xl font-bold text-green-400">{result.analysis.human_unique_ratio}%</div></div>
                                </div>
                                <div className="bg-gray-800 p-3 rounded"><div className="text-xs text-gray-500 mb-2">추천 역량 개발</div><div className="flex flex-wrap gap-2">{result.analysis.recommended_skills.map(s => (<span key={s} className="px-2 py-1 bg-purple-600/30 rounded text-sm">{s}</span>))}</div></div>
                                <div className="text-center"><span className="text-gray-400">미래 전망: </span><span className={`font-bold ${result.analysis.future_outlook === '확장' ? 'text-green-400' : result.analysis.future_outlook === '유지' ? 'text-yellow-400' : 'text-red-400'}`}>{result.analysis.future_outlook}</span></div>
                            </div>
                        ) : (<div className="text-center text-gray-500 py-12"><i className="fas fa-search text-4xl mb-4"></i><p>직업을 선택하고 분석 버튼을 누르세요</p></div>)}
                    </div>
                </div>
            </div>
        </section>
    );
};
