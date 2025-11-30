const GlobalComparison = () => {
    const [caseType, setCaseType] = React.useState('civil');
    const [comparison, setComparison] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    const caseTypes = [
        {id: 'civil', name: '민사소송'},
        {id: 'labor', name: '노동소송'},
        {id: 'ip', name: '지식재산'},
        {id: 'criminal', name: '형사소송'}
    ];
    
    const fetchComparison = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/judicial/global-comparison', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({case_type: caseType})
            });
            setComparison(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    
    React.useEffect(() => { fetchComparison(); }, [caseType]);
    
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <i className="fas fa-globe mr-3 text-purple-400"></i>글로벌 판례 비교 시스템
                    </h2>
                    <p className="text-gray-500">OECD 8개국 2,480만 건 판례를 실시간 비교 분석합니다</p>
                </div>
                
                <div className="flex justify-center gap-2 mb-8">
                    {caseTypes.map(ct => (
                        <button key={ct.id} onClick={() => setCaseType(ct.id)}
                            className={`px-4 py-2 rounded-lg transition-all ${caseType === ct.id ? 'bg-purple-600 text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-600'}`}>
                            {ct.name}
                        </button>
                    ))}
                </div>
                
                {loading ? (
                    <div className="text-center py-12"><i className="fas fa-spinner fa-spin text-3xl text-purple-400"></i></div>
                ) : comparison?.comparisons ? (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {comparison.comparisons.map((c, i) => (
                                <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 card-hover transition-all">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-2xl">{c.flag}</span>
                                        <span className="font-bold">{c.country}</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">유사 판례</span>
                                            <span>{c.similar_cases}건</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">평균 배상</span>
                                            <span className="text-green-400">{(c.avg_compensation/10000).toFixed(0)}만원</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">승소율</span>
                                            <span className="text-blue-600">{c.win_rate}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">평균 기간</span>
                                            <span>{c.avg_duration_months}개월</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-purple-900/30 rounded-xl p-6 border border-purple-500/30">
                            <h3 className="font-bold text-purple-400 mb-4"><i className="fas fa-chart-bar mr-2"></i>분석 결과</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-center">
                                <div className="bg-white rounded-lg p-4">
                                    <div className="text-3xl font-bold text-cyan-400">{(comparison.total_cases_analyzed/10000).toFixed(0)}만</div>
                                    <div className="text-sm text-gray-500">총 분석 판례</div>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <div className="text-3xl font-bold text-blue-600">8개국</div>
                                    <div className="text-sm text-gray-500">비교 대상국</div>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <div className="text-3xl font-bold text-green-400">92.4%</div>
                                    <div className="text-sm text-gray-500">AI 정확도</div>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30 text-sm">
                                <i className="fas fa-exclamation-triangle text-blue-600 mr-2"></i>
                                {comparison.recommendation}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
};
