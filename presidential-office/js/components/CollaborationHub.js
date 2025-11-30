const CollaborationHub = () => {
    const [agencies, setAgencies] = React.useState({});
    const [agents, setAgents] = React.useState([]);
    const [selectedAgent, setSelectedAgent] = React.useState('ai_future.national_ai');
    const [selectedAgencies, setSelectedAgencies] = React.useState(['msit', 'motie']);
    const [task, setTask] = React.useState('');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        Promise.all([
            fetch('/api/presidential-office/agencies').then(r => r.json()),
            fetch('/api/presidential-office/agents').then(r => r.json())
        ]).then(([agencyData, agentData]) => {
            if (agencyData.success) setAgencies(agencyData.agencies);
            if (agentData.success) setAgents(agentData.agents);
        }).catch(() => {});
    }, []);

    const toggleAgency = (key) => {
        setSelectedAgencies(prev =>
            prev.includes(key) ? prev.filter(a => a !== key) : [...prev, key]
        );
    };

    const handleCollaboration = async () => {
        if (!task.trim() || selectedAgencies.length === 0) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/presidential-office/collaboration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requesting_agent: selectedAgent,
                    target_agencies: selectedAgencies,
                    task
                })
            });
            setResult(await res.json());
        } catch (error) {
            setResult({ success: false, error: error.message });
        }
        setLoading(false);
    };

    const agencyIcons = {
        moef: 'fa-coins', mofa: 'fa-globe', mnd: 'fa-fighter-jet', mois: 'fa-building-shield',
        moe: 'fa-graduation-cap', mohw: 'fa-heart-pulse', moel: 'fa-briefcase', mcst: 'fa-palette',
        mafra: 'fa-wheat-awn', motie: 'fa-industry', molit: 'fa-road', mof: 'fa-ship',
        mss: 'fa-store', me: 'fa-leaf', msit: 'fa-microchip', mogef: 'fa-people-group',
        mpva: 'fa-medal', mou: 'fa-handshake-angle'
    };

    return (
        <section className="py-12 px-4 bg-gray-800/50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2">
                    <i className="fas fa-network-wired mr-3 text-green-500"></i>
                    부처간 AI 협업 허브
                </h2>
                <p className="text-gray-400 text-center mb-8">대통령실 AI 에이전트와 정부부처 AI간 자동 협업</p>

                <div className="grid grid-cols-2 gap-6">
                    {/* 협업 설정 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-yellow-400">
                            <i className="fas fa-cogs mr-2"></i>협업 설정
                        </h3>

                        {/* 요청 에이전트 선택 */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">요청 에이전트</label>
                            <select
                                value={selectedAgent}
                                onChange={e => setSelectedAgent(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                            >
                                {agents.map(agent => (
                                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* 협업 부처 선택 */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">협업 대상 부처 (다중 선택)</label>
                            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                {Object.entries(agencies).map(([key, agency]) => (
                                    <div
                                        key={key}
                                        onClick={() => toggleAgency(key)}
                                        className={`p-2 rounded-lg cursor-pointer text-center text-xs transition-colors ${selectedAgencies.includes(key) ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                                    >
                                        <i className={`fas ${agencyIcons[key] || 'fa-building'} text-lg mb-1`}></i>
                                        <p className="truncate">{agency.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 협업 과제 */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-400 mb-2">협업 과제</label>
                            <textarea
                                value={task}
                                onChange={e => setTask(e.target.value)}
                                placeholder="협업이 필요한 과제를 입력하세요..."
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500"
                                rows={3}
                            />
                        </div>

                        <button
                            onClick={handleCollaboration}
                            disabled={loading || !task.trim() || selectedAgencies.length === 0}
                            className="w-full bg-gradient-to-r from-green-600 to-teal-600 py-3 rounded-lg font-bold hover:from-green-700 hover:to-teal-700 disabled:opacity-50 transition-all"
                        >
                            {loading ? (
                                <><i className="fas fa-spinner fa-spin mr-2"></i>협업 구성 중...</>
                            ) : (
                                <><i className="fas fa-share-nodes mr-2"></i>협업 시작</>
                            )}
                        </button>
                    </div>

                    {/* 협업 결과 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-yellow-400">
                            <i className="fas fa-project-diagram mr-2"></i>협업 네트워크
                        </h3>

                        {result ? (
                            result.success ? (
                                <div className="space-y-4">
                                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                                        <p className="text-green-400 font-semibold mb-2">
                                            <i className="fas fa-check-circle mr-2"></i>협업 구성 완료
                                        </p>
                                        <p className="text-sm text-gray-300">ID: {result.collaboration_id}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400 mb-2">연결된 부처</p>
                                        <div className="space-y-2">
                                            {result.connected_agencies.map(agency => (
                                                <div key={agency.key} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <i className={`fas ${agencyIcons[agency.key]} text-blue-400`}></i>
                                                        <span>{agency.name}</span>
                                                    </div>
                                                    <span className="text-green-400 text-xs">
                                                        <i className="fas fa-link mr-1"></i>{agency.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-700/50 rounded-lg p-3">
                                        <p className="text-xs text-gray-500 mb-1">OpenHash 검증</p>
                                        <p className="text-xs text-gray-400 font-mono break-all">
                                            {result.verification?.hash}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                                    <p className="text-red-400">{result.error}</p>
                                </div>
                            )
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <i className="fas fa-diagram-project text-4xl mb-4"></i>
                                <p>협업을 구성하면 네트워크가 표시됩니다</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
