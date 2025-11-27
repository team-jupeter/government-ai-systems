const AgentSystem = () => {
    const [evolution, setEvolution] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const loadEvolution = async () => {
        setLoading(true);
        try { const res = await fetch('/api/food-drug-safety/agent/evolution'); setEvolution(await res.json()); } catch (e) { console.error(e); }
        setLoading(false);
    };
    React.useEffect(() => { loadEvolution(); }, []);
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-dna mr-3 text-purple-400"></i>진화론적 Agent 시스템</h2><p className="text-gray-400">DeepSeek R1 기반 | 250개 개체군 | 업무별 최적화 진화</p></div>
                {evolution && (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                            {Object.entries(evolution.evolution.fitness_weights).map(([key, val]) => (
                                <div key={key} className="bg-gray-900 p-3 rounded-lg text-center"><div className="text-xs text-gray-500">{key}</div><div className="text-lg font-bold text-purple-400">{(val * 100).toFixed(0)}%</div></div>
                            ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {evolution.evolution.agents.map((agent, i) => (
                                <div key={i} className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl">🤖</div>
                                    <div className="flex-1">
                                        <div className="font-bold text-purple-400">{agent.agent_name}</div>
                                        <div className="text-xs text-gray-400">{agent.task}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-green-400">{(agent.fitness_score * 100).toFixed(1)}%</div>
                                        <div className="text-xs text-gray-500">Gen {agent.generation}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center"><button onClick={loadEvolution} disabled={loading} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg"><i className="fas fa-sync-alt mr-2"></i>{loading ? '갱신 중...' : '진화 상태 갱신'}</button></div>
                    </div>
                )}
            </div>
        </section>
    );
};
