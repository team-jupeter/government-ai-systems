const CentralControl = () => {
    const [controlStats, setControlStats] = React.useState({
        decisionsPerSecond: 847293,
        avgLatency: 0.003,
        routeUpdates: 156742,
        speedAdjustments: 234891,
        emergencyOverrides: 12,
        systemLoad: 67.3
    });

    const [recentDecisions, setRecentDecisions] = React.useState([
        { id: 1, time: '12:34:56.123', vehicle: 'AV-SEL-00142', type: '경로 변경', from: '강남대로', to: '테헤란로', reason: '정체 회피' },
        { id: 2, time: '12:34:56.089', vehicle: 'AV-GYG-08234', type: '속도 조정', speed: '72→58', reason: '선행 차량 감속' },
        { id: 3, time: '12:34:56.045', vehicle: 'AV-BSN-03421', type: '차선 변경', lane: '2→3', reason: '합류 지점 최적화' },
        { id: 4, time: '12:34:55.998', vehicle: 'AV-ICN-12893', type: '정차 명령', location: '인천공항 T2', reason: '승객 하차' },
        { id: 5, time: '12:34:55.956', vehicle: 'AV-DGU-05672', type: '경로 변경', from: '동대구로', to: '신천대로', reason: '사고 우회' }
    ]);

    const [aiAgents, setAiAgents] = React.useState([
        { id: 'route', name: '경로 에이전트', status: 'active', load: 72, decisions: 423891 },
        { id: 'speed', name: '속도 에이전트', status: 'active', load: 68, decisions: 567234 },
        { id: 'safety', name: '안전 에이전트', status: 'active', load: 45, decisions: 89234 },
        { id: 'demand', name: '수요 에이전트', status: 'active', load: 81, decisions: 234567 },
        { id: 'energy', name: '에너지 에이전트', status: 'active', load: 53, decisions: 145678 },
        { id: 'coord', name: '조율 에이전트', status: 'active', load: 77, decisions: 312456 }
    ]);

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setControlStats(prev => ({
                ...prev,
                decisionsPerSecond: 800000 + Math.floor(Math.random() * 100000),
                avgLatency: 0.001 + Math.random() * 0.005,
                routeUpdates: prev.routeUpdates + Math.floor(Math.random() * 100),
                speedAdjustments: prev.speedAdjustments + Math.floor(Math.random() * 200),
                systemLoad: 60 + Math.random() * 20
            }));

            setRecentDecisions(prev => {
                const types = ['경로 변경', '속도 조정', '차선 변경', '정차 명령', '출발 명령'];
                const regions = ['SEL', 'GYG', 'BSN', 'DGU', 'ICN', 'GWJ', 'DJN'];
                const newDecision = {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString('ko-KR', { hour12: false }) + '.' + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
                    vehicle: `AV-${regions[Math.floor(Math.random() * regions.length)]}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
                    type: types[Math.floor(Math.random() * types.length)],
                    reason: ['정체 회피', '수요 배정', '안전 확보', '효율 최적화', '긴급 대응'][Math.floor(Math.random() * 5)]
                };
                return [newDecision, ...prev.slice(0, 9)];
            });

            setAiAgents(prev => prev.map(a => ({
                ...a,
                load: Math.max(20, Math.min(95, a.load + (Math.random() - 0.5) * 10)),
                decisions: a.decisions + Math.floor(Math.random() * 100)
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            {/* 핵심 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6">
                    <div className="text-purple-200 text-sm mb-1">초당 결정 수</div>
                    <div className="text-3xl font-bold">{controlStats.decisionsPerSecond.toLocaleString()}</div>
                    <div className="text-purple-300 text-sm mt-1">
                        <i className="fas fa-brain mr-1"></i>AI 실시간 처리
                    </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl p-6">
                    <div className="text-cyan-200 text-sm mb-1">평균 지연시간</div>
                    <div className="text-3xl font-bold">{controlStats.avgLatency.toFixed(3)}ms</div>
                    <div className="text-cyan-300 text-sm mt-1">
                        <i className="fas fa-bolt mr-1"></i>초저지연 제어
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6">
                    <div className="text-green-200 text-sm mb-1">시스템 부하</div>
                    <div className="text-3xl font-bold">{controlStats.systemLoad.toFixed(1)}%</div>
                    <div className="mt-2 bg-green-900 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: `${controlStats.systemLoad}%` }}></div>
                    </div>
                </div>
            </div>

            {/* 사회적 자율주행 핵심 원리 */}
            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-indigo-400 mb-4">
                    <i className="fas fa-network-wired mr-2"></i>
                    중앙 집중식 제어 원리
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-4xl mb-2">🎯</div>
                        <div className="font-medium text-indigo-300">전역 최적화</div>
                        <div className="text-sm text-gray-400 mt-1">개별 차량이 아닌 전체 교통 흐름 최적화</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-4xl mb-2">⚡</div>
                        <div className="font-medium text-yellow-300">실시간 조율</div>
                        <div className="text-sm text-gray-400 mt-1">300만대 동시 속도/경로 조정</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-4xl mb-2">🛡️</div>
                        <div className="font-medium text-green-300">무사고 보장</div>
                        <div className="text-sm text-gray-400 mt-1">충돌 불가능한 경로만 배정</div>
                    </div>
                </div>
            </div>

            {/* AI 에이전트 상태 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <i className="fas fa-robot text-purple-400 mr-2"></i>
                    6개 AI 에이전트 협업 현황
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 pulse-dot"></span>
                        모두 정상
                    </span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {aiAgents.map(agent => (
                        <div key={agent.id} className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{agent.name}</span>
                                <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot"></span>
                            </div>
                            <div className="text-sm text-gray-400 mb-2">
                                결정: {agent.decisions.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-600 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            agent.load > 80 ? 'bg-red-500' :
                                            agent.load > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${agent.load}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-400">{agent.load.toFixed(0)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 실시간 결정 로그 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <i className="fas fa-stream text-cyan-400 mr-2"></i>
                    실시간 제어 결정 로그
                    <span className="ml-2 text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">LIVE</span>
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                    {recentDecisions.map((d, idx) => (
                        <div key={d.id} className={`flex items-center gap-4 p-3 rounded-lg ${idx === 0 ? 'bg-indigo-900/30 border border-indigo-500/30' : 'bg-gray-700/30'}`}>
                            <span className="text-xs text-gray-500 font-mono w-28">{d.time}</span>
                            <span className="text-xs bg-gray-600 px-2 py-1 rounded font-mono">{d.vehicle}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                                d.type === '경로 변경' ? 'bg-blue-500/20 text-blue-400' :
                                d.type === '속도 조정' ? 'bg-yellow-500/20 text-yellow-400' :
                                d.type === '차선 변경' ? 'bg-purple-500/20 text-purple-400' :
                                d.type === '정차 명령' ? 'bg-red-500/20 text-red-400' :
                                'bg-green-500/20 text-green-400'
                            }`}>{d.type}</span>
                            <span className="text-sm text-gray-400 flex-1">{d.reason}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
