const VehicleMonitor = () => {
    const [searchId, setSearchId] = React.useState('');
    const [selectedVehicle, setSelectedVehicle] = React.useState(null);
    const [recentVehicles, setRecentVehicles] = React.useState([
        { id: 'AV-SEL-00142', type: 'sedan', status: 'active', speed: 62, battery: 78, passengers: 2, route: '강남 → 홍대' },
        { id: 'AV-GYG-08234', type: 'suv', status: 'active', speed: 71, battery: 45, passengers: 4, route: '수원 → 판교' },
        { id: 'AV-BSN-03421', type: 'van', status: 'idle', speed: 0, battery: 92, passengers: 0, route: '대기중' },
        { id: 'AV-ICN-12893', type: 'bus', status: 'active', speed: 48, battery: 61, passengers: 23, route: '인천공항 순환' },
        { id: 'AV-DGU-05672', type: 'truck', status: 'active', speed: 55, battery: 33, passengers: 0, route: '대구 → 경주' }
    ]);

    const [vehicleDetail, setVehicleDetail] = React.useState({
        id: 'AV-SEL-00142',
        type: '승용차 (Model S)',
        status: 'active',
        speed: 62,
        battery: 78,
        location: { lat: 37.5012, lng: 127.0396, address: '서울 강남구 테헤란로 152' },
        passengers: [
            { id: 'P-2341', name: '김*수', from: '강남역', to: '홍대입구', boarding: '12:23:45' }
        ],
        route: {
            from: '서울 강남역',
            to: '서울 홍대입구',
            distance: '12.4km',
            eta: '18분',
            progress: 45
        },
        history: [
            { time: '12:23:45', event: '승객 탑승', location: '강남역 3번출구' },
            { time: '12:25:12', event: '출발', location: '테헤란로 진입' },
            { time: '12:28:34', event: '경로 변경', location: '정체 우회 - 언주로' },
            { time: '12:32:01', event: '속도 조정', location: '72 → 58 km/h' }
        ],
        openHashVerified: true,
        lastVerified: '12:34:56.789'
    });

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setVehicleDetail(prev => ({
                ...prev,
                speed: Math.max(0, Math.min(80, prev.speed + (Math.random() - 0.5) * 10)),
                battery: Math.max(0, prev.battery - 0.1),
                route: {
                    ...prev.route,
                    progress: Math.min(100, prev.route.progress + Math.random() * 2)
                },
                lastVerified: new Date().toLocaleTimeString('ko-KR', { hour12: false }) + '.' + String(Math.floor(Math.random() * 1000)).padStart(3, '0')
            }));

            setRecentVehicles(prev => prev.map(v => ({
                ...v,
                speed: v.status === 'active' ? Math.max(30, Math.min(80, v.speed + (Math.random() - 0.5) * 10)) : 0,
                battery: Math.max(10, v.battery - Math.random() * 0.5)
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = () => {
        if (searchId) {
            setSelectedVehicle(searchId);
        }
    };

    const typeIcons = {
        sedan: '🚗', suv: '🚙', van: '🚐', bus: '🚌', truck: '🚛'
    };

    return (
        <div className="space-y-6">
            {/* 검색 바 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">
                    <i className="fas fa-search text-cyan-400 mr-2"></i>
                    차량 검색
                </h3>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="차량 ID 입력 (예: AV-SEL-00142)"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-medium transition"
                    >
                        <i className="fas fa-search mr-2"></i>검색
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* 최근 조회 차량 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">
                        <i className="fas fa-history text-gray-400 mr-2"></i>
                        최근 조회
                    </h3>
                    <div className="space-y-2">
                        {recentVehicles.map(v => (
                            <div 
                                key={v.id}
                                onClick={() => setSelectedVehicle(v.id)}
                                className="bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span>{typeIcons[v.type]}</span>
                                        <span className="font-mono text-sm">{v.id}</span>
                                    </div>
                                    <span className={`w-2 h-2 rounded-full ${v.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>{v.speed}km/h</span>
                                    <span>🔋 {v.battery.toFixed(0)}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 차량 상세 정보 */}
                <div className="md:col-span-2 space-y-4">
                    {/* 기본 정보 */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">
                                <i className="fas fa-car text-indigo-400 mr-2"></i>
                                {vehicleDetail.id}
                            </h3>
                            <div className="flex items-center gap-2">
                                {vehicleDetail.openHashVerified && (
                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs flex items-center">
                                        <i className="fas fa-shield-alt mr-1"></i>OpenHash 검증됨
                                    </span>
                                )}
                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 pulse-dot"></span>
                                    운행중
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-cyan-400">{vehicleDetail.speed.toFixed(0)}</div>
                                <div className="text-xs text-gray-400">km/h</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-yellow-400">{vehicleDetail.battery.toFixed(0)}%</div>
                                <div className="text-xs text-gray-400">배터리</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-blue-400">{vehicleDetail.passengers.length}</div>
                                <div className="text-xs text-gray-400">탑승객</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-green-400">{vehicleDetail.route.eta}</div>
                                <div className="text-xs text-gray-400">도착예정</div>
                            </div>
                        </div>

                        {/* 경로 진행 */}
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm">{vehicleDetail.route.from}</span>
                                <span className="text-sm">{vehicleDetail.route.to}</span>
                            </div>
                            <div className="relative">
                                <div className="bg-gray-600 rounded-full h-3">
                                    <div 
                                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${vehicleDetail.route.progress}%` }}
                                    ></div>
                                </div>
                                <div 
                                    className="absolute top-1/2 -translate-y-1/2 text-lg transition-all duration-500"
                                    style={{ left: `${vehicleDetail.route.progress}%`, transform: 'translate(-50%, -50%)' }}
                                >
                                    🚗
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                                <span>{vehicleDetail.route.distance}</span>
                                <span>{vehicleDetail.route.progress.toFixed(0)}% 완료</span>
                            </div>
                        </div>
                    </div>

                    {/* 이벤트 히스토리 */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4">
                            <i className="fas fa-list text-purple-400 mr-2"></i>
                            운행 이벤트
                        </h3>
                        <div className="space-y-2">
                            {vehicleDetail.history.map((h, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-700/30 rounded-lg">
                                    <span className="text-xs text-gray-500 font-mono w-20">{h.time}</span>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        h.event.includes('탑승') ? 'bg-blue-500/20 text-blue-400' :
                                        h.event.includes('출발') ? 'bg-green-500/20 text-green-400' :
                                        h.event.includes('경로') ? 'bg-purple-500/20 text-purple-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                    }`}>{h.event}</span>
                                    <span className="text-sm text-gray-400">{h.location}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
                            <i className="fas fa-shield-alt text-green-400 mr-1"></i>
                            마지막 OpenHash 검증: {vehicleDetail.lastVerified}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
