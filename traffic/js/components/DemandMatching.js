const DemandMatching = () => {
    const [matchingStats, setMatchingStats] = React.useState({
        totalRequests: 199960,
        passengerRequests: 156742,
        cargoRequests: 43218,
        matchedToday: 187234,
        avgMatchTime: 8.3,
        matchRate: 98.7
    });

    const [liveMatches, setLiveMatches] = React.useState([]);
    const [passengerQueue, setPassengerQueue] = React.useState([
        { id: 'P-001', name: '김*수', from: '서울 강남역', to: '서울 홍대입구', persons: 1, status: 'matching', wait: 5 },
        { id: 'P-002', name: '이*영', from: '부산 서면', to: '부산 해운대', persons: 2, status: 'matched', wait: 12 },
        { id: 'P-003', name: '박*호', from: '대구 동성로', to: '대구공항', persons: 1, status: 'pickup', wait: 0 },
        { id: 'P-004', name: '최*희', from: '인천 부평', to: '인천공항 T1', persons: 3, status: 'matching', wait: 8 },
        { id: 'P-005', name: '정*민', from: '광주 상무지구', to: '광주송정역', persons: 1, status: 'matching', wait: 3 }
    ]);

    const [cargoQueue, setCargoQueue] = React.useState([
        { id: 'C-001', sender: '쿠*', from: '인천 물류센터', to: '서울 전역', items: 1250, weight: '2.5t', status: 'loading' },
        { id: 'C-002', sender: '마*컬리', from: '경기 김포', to: '서울 강남', items: 340, weight: '800kg', status: 'transit' },
        { id: 'C-003', sender: '롯*', from: '부산항', to: '대구 물류단지', items: 520, weight: '5t', status: 'matching' },
        { id: 'C-004', sender: 'CJ*송', from: '대전 허브', to: '충남 전역', items: 890, weight: '1.8t', status: 'loading' }
    ]);

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setMatchingStats(prev => ({
                ...prev,
                passengerRequests: 150000 + Math.floor(Math.random() * 15000),
                cargoRequests: 40000 + Math.floor(Math.random() * 8000),
                matchedToday: prev.matchedToday + Math.floor(Math.random() * 50),
                avgMatchTime: 5 + Math.random() * 8,
                matchRate: 97 + Math.random() * 2.5
            }));

            // 새 매칭 이벤트
            const regions = ['서울', '부산', '대구', '인천', '광주', '대전'];
            const vehicles = ['AV-SEL', 'AV-BSN', 'AV-DGU', 'AV-ICN', 'AV-GWJ', 'AV-DJN'];
            setLiveMatches(prev => {
                const newMatch = {
                    id: Date.now(),
                    time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
                    type: Math.random() > 0.7 ? 'cargo' : 'passenger',
                    vehicle: `${vehicles[Math.floor(Math.random() * vehicles.length)]}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
                    region: regions[Math.floor(Math.random() * regions.length)],
                    matchTime: (2 + Math.random() * 10).toFixed(1)
                };
                return [newMatch, ...prev.slice(0, 7)];
            });

            // 승객 큐 업데이트
            setPassengerQueue(prev => prev.map(p => ({
                ...p,
                wait: p.status === 'pickup' ? 0 : p.wait + 1,
                status: p.wait > 10 && p.status === 'matching' ? 'matched' : 
                        p.wait > 15 && p.status === 'matched' ? 'pickup' : p.status
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            {/* 핵심 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="text-blue-200 text-sm">승객 요청</div>
                    <div className="text-2xl font-bold">{matchingStats.passengerRequests.toLocaleString()}</div>
                    <div className="flex items-center text-blue-300 text-xs mt-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-1 pulse-dot"></span>실시간
                    </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <div className="text-yellow-200 text-sm">화물 요청</div>
                    <div className="text-2xl font-bold">{matchingStats.cargoRequests.toLocaleString()}</div>
                    <div className="text-yellow-300 text-xs mt-1">배송 대기 중</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="text-green-200 text-sm">평균 매칭 시간</div>
                    <div className="text-2xl font-bold">{matchingStats.avgMatchTime.toFixed(1)}초</div>
                    <div className="text-green-300 text-xs mt-1">요청 → 배차</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="text-purple-200 text-sm">매칭 성공률</div>
                    <div className="text-2xl font-bold">{matchingStats.matchRate.toFixed(1)}%</div>
                    <div className="text-purple-300 text-xs mt-1">목표: 99.5%</div>
                </div>
            </div>

            {/* 매칭 알고리즘 설명 */}
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">
                    <i className="fas fa-brain mr-2"></i>
                    AI 수요-차량 매칭 알고리즘
                </h3>
                <div className="grid md:grid-cols-5 gap-3 text-center text-sm">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-2xl mb-1">📍</div>
                        <div className="text-green-300">거리 최적화</div>
                        <div className="text-xs text-gray-400">가장 가까운 차량</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-2xl mb-1">⏱️</div>
                        <div className="text-blue-300">도착 시간</div>
                        <div className="text-xs text-gray-400">예상 시간 계산</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-2xl mb-1">🚗</div>
                        <div className="text-yellow-300">차량 상태</div>
                        <div className="text-xs text-gray-400">배터리/용량</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-2xl mb-1">🔄</div>
                        <div className="text-purple-300">경로 통합</div>
                        <div className="text-xs text-gray-400">합승/혼적 최적화</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-2xl mb-1">⚡</div>
                        <div className="text-cyan-300">실시간 배정</div>
                        <div className="text-xs text-gray-400">0.003ms 결정</div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* 승객 대기열 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <i className="fas fa-users text-blue-400 mr-2"></i>
                        승객 대기열
                        <span className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                            {passengerQueue.length}명
                        </span>
                    </h3>
                    <div className="space-y-3">
                        {passengerQueue.map(p => (
                            <div key={p.id} className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">👤</span>
                                        <span className="font-medium">{p.name}</span>
                                        <span className="text-xs text-gray-400">({p.persons}명)</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        p.status === 'pickup' ? 'bg-green-500/20 text-green-400' :
                                        p.status === 'matched' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-gray-500/20 text-gray-400'
                                    }`}>
                                        {p.status === 'pickup' ? '🚗 픽업중' : p.status === 'matched' ? '✓ 배차완료' : '⏳ 매칭중'}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-400">{p.from}</span>
                                    <span className="mx-2 text-indigo-400">→</span>
                                    <span className="text-white">{p.to}</span>
                                </div>
                                {p.status !== 'pickup' && (
                                    <div className="text-xs text-gray-500 mt-2">대기: {p.wait}초</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 화물 대기열 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <i className="fas fa-box text-yellow-400 mr-2"></i>
                        화물 대기열
                        <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                            {cargoQueue.length}건
                        </span>
                    </h3>
                    <div className="space-y-3">
                        {cargoQueue.map(c => (
                            <div key={c.id} className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">📦</span>
                                        <span className="font-medium">{c.sender}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        c.status === 'transit' ? 'bg-green-500/20 text-green-400' :
                                        c.status === 'loading' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-gray-500/20 text-gray-400'
                                    }`}>
                                        {c.status === 'transit' ? '🚛 배송중' : c.status === 'loading' ? '📥 상차중' : '⏳ 매칭중'}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-400">{c.from}</span>
                                    <span className="mx-2 text-yellow-400">→</span>
                                    <span className="text-white">{c.to}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                    <span>📦 {c.items}개</span>
                                    <span>⚖️ {c.weight}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 실시간 매칭 로그 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <i className="fas fa-handshake text-green-400 mr-2"></i>
                    실시간 매칭 로그
                    <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LIVE</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {liveMatches.map((m, idx) => (
                        <div key={m.id} className={`p-3 rounded-lg ${idx === 0 ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-700/30'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                    m.type === 'passenger' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                    {m.type === 'passenger' ? '👤 승객' : '📦 화물'}
                                </span>
                                <span className="text-xs text-gray-500">{m.time}</span>
                            </div>
                            <div className="text-xs font-mono text-gray-400">{m.vehicle}</div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">{m.region}</span>
                                <span className="text-xs text-green-400">{m.matchTime}초</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
