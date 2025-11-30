const OrganizationChart = () => {
    const [structure, setStructure] = React.useState(null);
    const [selectedDept, setSelectedDept] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/presidential-office/structure')
            .then(res => res.json())
            .then(data => data.success && setStructure(data.structure))
            .catch(() => {});
    }, []);

    const deptColors = {
        chief_of_staff: 'from-red-600 to-red-800',
        policy_chief: 'from-purple-600 to-purple-800',
        economic_growth: 'from-green-600 to-green-800',
        social_affairs: 'from-blue-600 to-blue-800',
        ai_future: 'from-cyan-600 to-cyan-800',
        national_security: 'from-gray-600 to-gray-800',
        civil_affairs: 'from-orange-600 to-orange-800',
        personnel: 'from-pink-600 to-pink-800',
        political_affairs: 'from-indigo-600 to-indigo-800',
        public_relations: 'from-teal-600 to-teal-800',
        listening_integration: 'from-amber-600 to-amber-800'
    };

    const deptIcons = {
        chief_of_staff: 'fa-user-tie',
        policy_chief: 'fa-clipboard-list',
        economic_growth: 'fa-chart-line',
        social_affairs: 'fa-users',
        ai_future: 'fa-robot',
        national_security: 'fa-shield-alt',
        civil_affairs: 'fa-balance-scale',
        personnel: 'fa-id-card',
        political_affairs: 'fa-handshake',
        public_relations: 'fa-bullhorn',
        listening_integration: 'fa-comments'
    };

    if (!structure) return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-400"></i>
                <p className="mt-4 text-gray-400">조직 구조 로딩 중...</p>
            </div>
        </section>
    );

    return (
        <section className="py-12 px-4 bg-gray-800/50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2">
                    <i className="fas fa-sitemap mr-3 text-yellow-500"></i>
                    대통령실 AI 에이전트 조직도
                </h2>
                <p className="text-gray-400 text-center mb-8">각 비서관실 클릭 시 상세 정보 확인</p>

                {/* 대통령 */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-xl p-4 px-8 text-center pulse-gold">
                        <i className="fas fa-landmark text-3xl mb-2"></i>
                        <p className="font-bold text-lg">대통령</p>
                    </div>
                </div>

                {/* 비서실장/정책실장/안보실장 */}
                <div className="flex justify-center gap-6 mb-8">
                    {['chief_of_staff', 'policy_chief', 'national_security'].map(key => {
                        const dept = structure[key];
                        if (!dept) return null;
                        return (
                            <div
                                key={key}
                                onClick={() => setSelectedDept(selectedDept === key ? null : key)}
                                className={`bg-gradient-to-r ${deptColors[key]} rounded-xl p-4 cursor-pointer agent-node ${selectedDept === key ? 'ring-2 ring-yellow-400' : ''}`}
                            >
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${deptIcons[key]} text-2xl`}></i>
                                    <div>
                                        <p className="font-bold">{dept.name}</p>
                                        <p className="text-xs text-white/70">{Object.keys(dept.agents).length} AI Agent</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 수석비서관 */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {Object.entries(structure)
                        .filter(([key]) => !['chief_of_staff', 'policy_chief', 'national_security'].includes(key))
                        .map(([key, dept]) => (
                            <div
                                key={key}
                                onClick={() => setSelectedDept(selectedDept === key ? null : key)}
                                className={`bg-gradient-to-r ${deptColors[key] || 'from-gray-600 to-gray-800'} rounded-xl p-4 cursor-pointer agent-node ${selectedDept === key ? 'ring-2 ring-yellow-400' : ''}`}
                            >
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${deptIcons[key] || 'fa-building'} text-xl`}></i>
                                    <div>
                                        <p className="font-bold text-sm">{dept.name}</p>
                                        <p className="text-xs text-white/70">{Object.keys(dept.agents).length} Agent</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* 선택된 부서의 에이전트 */}
                {selectedDept && structure[selectedDept] && (
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <i className={`fas ${deptIcons[selectedDept]} mr-3 text-yellow-500`}></i>
                            {structure[selectedDept].name} AI 에이전트
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {Object.entries(structure[selectedDept].agents).map(([agentKey, agent]) => (
                                <div key={agentKey} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-blue-300">{agent.name}</p>
                                            <p className="text-gray-400 text-sm mt-1">{agent.role}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs ${agent.priority === 1 ? 'bg-red-600' : agent.priority === 2 ? 'bg-yellow-600' : 'bg-gray-600'}`}>
                                            P{agent.priority}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center text-xs text-green-400">
                                        <i className="fas fa-circle text-xs mr-2 animate-pulse"></i>
                                        활성 상태
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
