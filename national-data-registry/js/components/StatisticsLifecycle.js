const StatisticsLifecycle = () => {
    const [activeStage, setActiveStage] = React.useState(-1);
    const [isRunning, setIsRunning] = React.useState(false);
    
    const stages = [
        { num: 1, name: '조사 계획', layer: 0, icon: '📋', desc: 'Layer 0에서 조사 계획 수립' },
        { num: 2, name: '응답 수집', layer: 1, icon: '📱', desc: 'Edge Storage에 원본 저장' },
        { num: 3, name: '집계', layer: '2→3', icon: '📊', desc: '광역시도 집계 → PBFT 합의' },
        { num: 4, name: '검증', layer: 0, icon: '✅', desc: '통계 품질 검증' },
        { num: 5, name: '승인', layer: 0, icon: '🏛️', desc: '처장 최종 승인' }
    ];
    
    const runLifecycle = () => {
        setIsRunning(true); setActiveStage(0);
        let stage = 0;
        const interval = setInterval(() => {
            if (stage < stages.length) { setActiveStage(stage); stage++; }
            else { setIsRunning(false); clearInterval(interval); }
        }, 2000);
    };
    
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4"><i className="fas fa-chart-line mr-3 text-green-400"></i>통계 생명주기 블록체인</h2>
                    <p className="text-gray-400">기존 8개월 → 7일 (99.1% 단축) | 모든 단계 불변 기록</p>
                </div>
                <div className="mb-6 text-center">
                    <button onClick={runLifecycle} disabled={isRunning} className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-bold">
                        {isRunning ? <span><i className="fas fa-spinner fa-spin mr-2"></i>시뮬레이션 중...</span> : <span><i className="fas fa-play mr-2"></i>인구주택총조사 시뮬레이션</span>}</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {stages.map((stage, i) => (
                        <div key={i} className="text-center">
                            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all ${i < activeStage ? 'bg-green-600' : i === activeStage ? 'bg-blue-600 animate-pulse' : 'bg-gray-700'}`}>
                                <span className="text-3xl">{stage.icon}</span></div>
                            <div className={`bg-gray-900 rounded-xl p-4 border-2 ${i === activeStage ? 'border-blue-500' : i < activeStage ? 'border-green-500/50' : 'border-gray-700'}`}>
                                <span className="px-2 py-0.5 rounded text-xs bg-blue-600/30 text-blue-400">Layer {stage.layer}</span>
                                <h3 className="font-bold mt-2">{stage.name}</h3>
                                <p className="text-xs text-gray-400 mt-1">{stage.desc}</p>
                                {i < activeStage && <div className="mt-2 text-xs text-green-400"><i className="fas fa-link mr-1"></i>블록 #{i+1}</div>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
                    <h3 className="font-bold text-blue-400 mb-4"><i className="fas fa-shield-alt mr-2"></i>통계 작성 독립성 보장</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-gray-900 p-4 rounded-lg"><div className="text-2xl mb-2">🔐</div><h4 className="font-bold">수정 요청 기록</h4><p className="text-gray-400">모든 수정 요청을 블록체인에 투명하게 기록</p></div>
                        <div className="bg-gray-900 p-4 rounded-lg"><div className="text-2xl mb-2">👁️</div><h4 className="font-bold">국민 감시</h4><p className="text-gray-400">누구나 통계 작성 과정 조회 가능</p></div>
                        <div className="bg-gray-900 p-4 rounded-lg"><div className="text-2xl mb-2">⚖️</div><h4 className="font-bold">정치적 압력 차단</h4><p className="text-gray-400">불변 기록으로 독립성 기술적 보장</p></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
