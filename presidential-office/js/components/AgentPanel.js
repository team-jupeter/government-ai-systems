const AgentPanel = () => {
    const [agents, setAgents] = React.useState([]);
    const [selectedAgent, setSelectedAgent] = React.useState(null);
    const [query, setQuery] = React.useState('');
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        fetch('/api/presidential-office/agents')
            .then(res => res.json())
            .then(data => data.success && setAgents(data.agents))
            .catch(() => {});
    }, []);

    const handleQuery = async () => {
        if (!selectedAgent || !query.trim()) return;
        setLoading(true);
        setResponse(null);

        try {
            const res = await fetch('/api/presidential-office/agent/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agent_id: selectedAgent.id, query })
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setResponse({ success: false, error: error.message });
        }
        setLoading(false);
    };

    const priorityGroups = {
        1: agents.filter(a => a.priority === 1),
        2: agents.filter(a => a.priority === 2),
        3: agents.filter(a => a.priority === 3)
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2">
                    <i className="fas fa-robot mr-3 text-cyan-500"></i>
                    AI 에이전트 직접 질의
                </h2>
                <p className="text-gray-400 text-center mb-8">각 비서관실 AI 에이전트에게 직접 질문하세요</p>

                <div className="grid grid-cols-3 gap-6">
                    {/* 에이전트 선택 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-yellow-400">
                            <i className="fas fa-list mr-2"></i>에이전트 선택
                        </h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {Object.entries(priorityGroups).map(([priority, group]) => (
                                group.length > 0 && (
                                    <div key={priority}>
                                        <p className="text-xs text-gray-500 mb-2">
                                            우선순위 {priority} ({group.length}개)
                                        </p>
                                        {group.map(agent => (
                                            <div
                                                key={agent.id}
                                                onClick={() => setSelectedAgent(agent)}
                                                className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${selectedAgent?.id === agent.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                                            >
                                                <p className="font-semibold text-sm">{agent.name}</p>
                                                <p className="text-xs text-gray-400">{agent.department}</p>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* 질의 입력 */}
                    <div className="col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
                        {selectedAgent ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-blue-400">{selectedAgent.name}</h3>
                                        <p className="text-sm text-gray-400">{selectedAgent.role}</p>
                                    </div>
                                    <span className="bg-green-600 text-xs px-3 py-1 rounded-full">
                                        <i className="fas fa-circle text-xs mr-1"></i>활성
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <textarea
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="질문을 입력하세요..."
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                                        rows={4}
                                    />
                                </div>

                                <button
                                    onClick={handleQuery}
                                    disabled={loading || !query.trim()}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {loading ? (
                                        <><i className="fas fa-spinner fa-spin mr-2"></i>처리 중...</>
                                    ) : (
                                        <><i className="fas fa-paper-plane mr-2"></i>질의 전송</>
                                    )}
                                </button>

                                {response && (
                                    <div className={`mt-4 p-4 rounded-lg ${response.success ? 'bg-gray-700' : 'bg-red-900/50'}`}>
                                        {response.success ? (
                                            <>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-green-400 text-sm">
                                                        <i className="fas fa-check-circle mr-1"></i>응답 완료
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Hash: {response.verification?.hash?.substring(0, 16)}...
                                                    </span>
                                                </div>
                                                <div className="text-gray-200 text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                                                    {response.response}
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-red-400">{response.error}</p>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <i className="fas fa-arrow-left text-4xl mb-4"></i>
                                <p>좌측에서 에이전트를 선택하세요</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
