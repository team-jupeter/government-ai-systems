const SevenStageProcess = () => {
    const [stages, setStages] = React.useState(null);
    const [selectedStage, setSelectedStage] = React.useState(null);
    React.useEffect(() => { fetch('/api/education/stages').then(r => r.json()).then(setStages); }, []);
    const stageList = [{id: 110, icon: '🔍', color: 'blue'}, {id: 120, icon: '⚖️', color: 'green'}, {id: 130, icon: '💬', color: 'yellow'}, {id: 140, icon: '🎯', color: 'purple'}, {id: 150, icon: '📚', color: 'pink'}, {id: 160, icon: '🔄', color: 'cyan'}, {id: 170, icon: '⚡', color: 'orange'}];
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-list-ol mr-3 text-purple-400"></i>7단계 통합 프로세스 (100)</h2><p className="text-gray-400">개인-사회 통합 효용 최적화를 위한 체계적 프로세스</p></div>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {stages && stageList.map((s, i) => {
                        const stage = stages.stages[s.id];
                        return (<button key={s.id} onClick={() => setSelectedStage(s.id)} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedStage === s.id ? 'bg-purple-600 scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}><span className="text-xl mr-2">{s.icon}</span>{i+1}단계</button>);
                    })}
                </div>
                {stages && selectedStage && stages.stages[selectedStage] && (
                    <div className="bg-gray-800 rounded-xl p-6 border border-purple-500/30">
                        <div className="flex items-center gap-4 mb-4"><span className="text-4xl">{stageList.find(s => s.id === selectedStage)?.icon}</span><div><h3 className="text-xl font-bold text-purple-400">{stages.stages[selectedStage].name}</h3><span className="text-sm text-gray-500">코드: {stages.stages[selectedStage].code} | ID: {selectedStage}</span></div></div>
                        <p className="text-gray-300 mb-4">{stages.stages[selectedStage].desc}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(stages.stages[selectedStage].metrics).map(([key, val]) => (<div key={key} className="bg-gray-900 p-3 rounded-lg text-center"><div className="text-xs text-gray-500">{key.replace(/_/g, ' ')}</div><div className="text-lg font-bold text-purple-400">{typeof val === 'number' && val < 10 ? val.toFixed(3) : val}{typeof val === 'number' && val > 10 && val < 100 ? '%' : ''}</div></div>))}
                        </div>
                    </div>
                )}
                {stages && !selectedStage && (
                    <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700"><i className="fas fa-hand-pointer text-4xl text-purple-400 mb-4"></i><p className="text-gray-400">위에서 단계를 선택하면 상세 정보가 표시됩니다</p><p className="text-sm text-gray-500 mt-2">통합 효용: <span className="text-purple-400 font-bold">{stages.integrated_utility}</span> | 대상 학습자: <span className="text-purple-400 font-bold">{stages.target_learners?.toLocaleString()}명</span></p></div>
                )}
            </div>
        </section>
    );
};
