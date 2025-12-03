const LiveRouting = () => {
    const [routingStats, setRoutingStats] = React.useState({
        activeRoutes: 2847523,
        pendingRequests: 15234,
        routeRecalculations: 0,
        avgRouteTime: 23.4,
        totalDistanceKm: 45678901,
        efficiency: 94.7
    });

    const [demandQueue, setDemandQueue] = React.useState([
        { id: 1, type: 'passenger', from: '서울 강남구', to: '서울 종로구', priority: 'normal', status: 'matching', waitTime: 12 },
        { id: 2, type: 'cargo', from: '인천 물류센터', to: '대전 유통단지', priority: 'high', status: 'routing', waitTime: 5 },
        { id: 3, type: 'passenger', from: '부산 해운대', to: '부산역', priority: 'normal', status: 'matching', waitTime: 18 },
        { id: 4, type: 'emergency', from: '대구 수성구', to: '경북대병원', priority: 'critical', status: 'dispatched', waitTime: 0 },
        { id: 5, type: 'passenger', from: '광주 서구', to: '광주공항', priority: 'normal', status: 'matching', waitTime: 8 }
    ]);

    const [routeUpdates, setRouteUpdates] = React.useState([]);
    const [selectedSimulation, setSelectedSimulation] = React.useState(null);

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setRoutingStats(prev => ({
                ...prev,
                activeRoutes: 2800000 + Math.floor(Math.random() * 100000),
                pendingRequests: 10000 + Math.floor(Math.random() * 10000),
                routeRecalculations: prev.routeRecalculations + Math.floor(Math.random() * 500),
                avgRouteTime: 20 + Math.random() * 10,
                efficiency: 92 + Math.random() * 6
            }));

            // 새 수요 추가
            const types = ['passenger', 'cargo', 'passenger', 'passenger', 'cargo'];
            const cities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종'];
            const districts = ['중구', '동구', '서구', '남구', '북구', '강남구', '해운대구'];
            
            setDemandQueue(prev => {
                const updated = prev.map(d => ({
                    ...d,
                    waitTime: d.status === 'dispatched' ? 0 : d.waitTime + 1,
                    status: d.waitTime > 15 ? 'routing' : d.waitTime > 25 ? 'dispatched' : d.status
                }));
                
                if (Math.random() > 0.5 && updated.length < 10) {
                    const fromCity = cities[Math.floor(Math.random() * cities.length)];
                    const toCity = cities[Math.floor(Math.random() * cities.length)];
                    updated.push({
                        id: Date.now(),
                        type: types[Math.floor(Math.random() * types.length)],
                        from: `${fromCity} ${districts[Math.floor(Math.random() * districts.length)]}`,
                        to: `${toCity} ${districts[Math.floor(Math.random() * districts.length)]}`,
                        priority: Math.random() > 0.9 ? 'high' : 'normal',
                        status: 'matching',
                        waitTime: 0
                    });
                }
                
                return updated.slice(-10);
            });

            // 경로 업데이트 로그
            setRouteUpdates(prev => {
                const regions = ['서울', '경기', '부산', '대구', '인천'];
                const newUpdate = {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
                    affectedVehicles: Math.floor(Math.random() * 500) + 100,
                    region: regions[Math.floor(Math.random() * regions.length)],
                    reason: ['새 수요 발생', '정체 감지', '사고 우회', '효율 최적화'][Math.floor(Math.random() * 4)]
                };
                return [newUpdate, ...prev.slice(0, 4)];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const runSimulation = (scenario) => {
        setSelectedSimulation(scenario);
        // 시뮬레이션 효과
        setRoutingStats(prev => ({
            ...prev,
            routeRecalculations: prev.routeRecalculations + 5000
        }));
    };

    return (
        <div className="space-y-6">
            {/* 핵심 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="text-blue-200 text-sm">활성 경로</div>
                    <div className="text-2xl font-bold">{routingStats.activeRoutes.toLocaleString()}</div>
                    <div className="text-blue-300 text-xs mt-1">실시간 관리 중</div>
                </div>
                <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-5">
                    <div className="text-orange-200 text-sm">대기 요청</div>
                    <div className="text-2xl font-bold">{routingStats.pendingRequests.toLocaleString()}</div>
                    <div className="text-orange-300 text-xs mt-1">배정 대기 중</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="text-purple-200 text-sm">경로 재계산</div>
                    <div className="text-2xl font-bold">{routingStats.routeRecalculations.toLocaleString()}</div>
                    <div className="text-purple-300 text-xs mt-1">오늘 누적</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="text-green-200 text-sm">경로 효율</div>
                    <div className="text-2xl font-bold">{routingStats.efficiency.toFixed(1)}%</div>
                    <div className="text-green-300 text-xs mt-1">최적화 달성률</div>
                </div>
            </div>

            {/* 핵심 메커니즘 설명 */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-400 mb-4">
                    <i className="fas fa-route mr-2"></i>
                    실시간 경로 재계산 메커니즘
                </h3>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-3xl mb-2">1️⃣</div>
                        <div className="font-medium text-blue-300">수요 발생</div>
                        <div className="text-xs text-gray-400 mt-1">승객/화물 요청 접수</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-3xl mb-2">2️⃣</div>
                        <div className="font-medium text-yellow-300">최적 차량 선택</div>
                        <div className="text-xs text-gray-400 mt-1">위치/용량/상태 고려</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-3xl mb-2">3️⃣</div>
                        <div className="font-medium text-purple-300">전체 경로 재계산</div>
                        <div className="text-xs text-gray-400 mt-1">영향받는 모든 차량</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-3xl mb-2">4️⃣</div>
                        <div className="font-medium text-green-300">동시 업데이트</div>
                        <div className="text-xs text-gray-400 mt-1">0.003ms 내 적용</div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* 수요 대기열 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <i className="fas fa-list-alt text-orange-400 mr-2"></i>
                        수요 대기열
                        <span className="ml-auto text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                            {demandQueue.length}건
                        </span>
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {demandQueue.map(d => (
                            <div key={d.id} className={`p-3 rounded-lg border ${
                                d.priority === 'critical' ? 'bg-red-900/30 border-red-500/50' :
                                d.priority === 'high' ? 'bg-yellow-900/30 border-yellow-500/50' :
                                'bg-gray-700/50 border-gray-600'
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        d.type === 'passenger' ? 'bg-blue-500/20 text-blue-400' :
                                        d.type === 'cargo' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                        {d.type === 'passenger' ? '👤 승객' : d.type === 'cargo' ? '📦 화물' : '🚨 긴급'}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${
                                        d.status === 'dispatched' ? 'bg-green-500/20 text-green-400' :
                                        d.status === 'routing' ? 'bg-purple-500/20 text-purple-400' :
                                        'bg-gray-500/20 text-gray-400'
                                    }`}>
                                        {d.status === 'dispatched' ? '배차완료' : d.status === 'routing' ? '경로계산' : '매칭중'}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-400">{d.from}</span>
                                    <span className="mx-2 text-indigo-400">→</span>
                                    <span className="text-white">{d.to}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">대기: {d.waitTime}초</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 경로 업데이트 로그 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <i className="fas fa-sync text-purple-400 mr-2"></i>
                        경로 재계산 로그
                        <span className="ml-2 text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">LIVE</span>
                    </h3>
                    <div className="space-y-3">
                        {routeUpdates.map((u, idx) => (
                            <div key={u.id} className={`p-4 rounded-lg ${idx === 0 ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-gray-700/30'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">{u.region} 권역</span>
                                    <span className="text-xs text-gray-500">{u.time}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">{u.reason}</span>
                                    <span className="text-sm text-indigo-400">{u.affectedVehicles}대 영향</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 시뮬레이션 버튼 */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <div className="text-sm text-gray-400 mb-3">시나리오 시뮬레이션</div>
                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                onClick={() => runSimulation('rush')}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm transition"
                            >
                                🚗 출퇴근 러시
                            </button>
                            <button 
                                onClick={() => runSimulation('accident')}
                                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm transition"
                            >
                                🚨 사고 발생
                            </button>
                            <button 
                                onClick={() => runSimulation('event')}
                                className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm transition"
                            >
                                🎉 대규모 행사
                            </button>
                            <button 
                                onClick={() => runSimulation('weather')}
                                className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm transition"
                            >
                                🌧️ 기상 악화
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* OpenHash 데이터 무결성 */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-shield-alt text-2xl text-red-400"></i>
                    <div>
                        <h3 className="text-lg font-bold text-red-400">OpenHash 경로 데이터 검증</h3>
                        <p className="text-sm text-gray-400">모든 경로 결정은 OpenHash로 암호학적 무결성 보장</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">100%</div>
                        <div className="text-sm text-gray-400">검증된 경로 명령</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-cyan-400">0건</div>
                        <div className="text-sm text-gray-400">허위 데이터 차단</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">영구</div>
                        <div className="text-sm text-gray-400">감사 추적 보존</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
