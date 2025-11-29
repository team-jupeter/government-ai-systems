const RegionalHub = () => {
    const [hubs, setHubs] = React.useState([
        { id: 'seoul', name: '서울', vehicles: 520000, capacity: 600000, throughput: 89234, status: 'normal' },
        { id: 'gyeonggi', name: '경기', vehicles: 680000, capacity: 750000, throughput: 112456, status: 'normal' },
        { id: 'busan', name: '부산', vehicles: 280000, capacity: 320000, throughput: 45678, status: 'normal' },
        { id: 'daegu', name: '대구', vehicles: 195000, capacity: 220000, throughput: 31234, status: 'normal' },
        { id: 'incheon', name: '인천', vehicles: 230000, capacity: 280000, throughput: 38912, status: 'busy' },
        { id: 'gwangju', name: '광주', vehicles: 125000, capacity: 150000, throughput: 19823, status: 'normal' },
        { id: 'daejeon', name: '대전', vehicles: 130000, capacity: 160000, throughput: 21456, status: 'normal' },
        { id: 'ulsan', name: '울산', vehicles: 98000, capacity: 120000, throughput: 15234, status: 'normal' },
        { id: 'sejong', name: '세종', vehicles: 45000, capacity: 60000, throughput: 7823, status: 'normal' },
        { id: 'gangwon', name: '강원', vehicles: 125000, capacity: 180000, throughput: 18234, status: 'normal' },
        { id: 'chungbuk', name: '충북', vehicles: 132000, capacity: 160000, throughput: 20123, status: 'normal' },
        { id: 'chungnam', name: '충남', vehicles: 175000, capacity: 200000, throughput: 27845, status: 'normal' },
        { id: 'jeonbuk', name: '전북', vehicles: 148000, capacity: 180000, throughput: 22345, status: 'normal' },
        { id: 'jeonnam', name: '전남', vehicles: 152000, capacity: 190000, throughput: 23456, status: 'normal' },
        { id: 'gyeongbuk', name: '경북', vehicles: 218000, capacity: 260000, throughput: 34567, status: 'normal' },
        { id: 'gyeongnam', name: '경남', vehicles: 275000, capacity: 320000, throughput: 43210, status: 'busy' },
        { id: 'jeju', name: '제주', vehicles: 72000, capacity: 100000, throughput: 11234, status: 'normal' }
    ]);

    const [selectedHub, setSelectedHub] = React.useState(null);
    const [totalStats, setTotalStats] = React.useState({
        totalVehicles: 3000000,
        totalCapacity: 3650000,
        totalThroughput: 592860,
        avgUtilization: 82.2
    });

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setHubs(prev => prev.map(h => ({
                ...h,
                vehicles: Math.floor(h.capacity * (0.75 + Math.random() * 0.2)),
                throughput: Math.floor(h.throughput * (0.95 + Math.random() * 0.1)),
                status: Math.random() > 0.9 ? 'busy' : 'normal'
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getUtilization = (vehicles, capacity) => ((vehicles / capacity) * 100).toFixed(1);
    
    const getStatusColor = (status, utilization) => {
        if (status === 'busy' || utilization > 90) return 'red';
        if (utilization > 75) return 'yellow';
        return 'green';
    };

    return (
        <div className="space-y-6">
            {/* 전체 현황 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-5">
                    <div className="text-indigo-200 text-sm">광역 허브</div>
                    <div className="text-2xl font-bold">17개</div>
                    <div className="text-indigo-300 text-xs mt-1">전국 시도</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="text-blue-200 text-sm">총 차량</div>
                    <div className="text-2xl font-bold">{(totalStats.totalVehicles / 1000000).toFixed(1)}백만</div>
                    <div className="text-blue-300 text-xs mt-1">관리 중</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="text-green-200 text-sm">시간당 처리량</div>
                    <div className="text-2xl font-bold">{(totalStats.totalThroughput / 1000).toFixed(0)}K</div>
                    <div className="text-green-300 text-xs mt-1">배차/경로 결정</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="text-purple-200 text-sm">평균 가동률</div>
                    <div className="text-2xl font-bold">{totalStats.avgUtilization}%</div>
                    <div className="text-purple-300 text-xs mt-1">목표: 85%</div>
                </div>
            </div>

            {/* 계층 구조 설명 */}
            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-indigo-400 mb-4">
                    <i className="fas fa-layer-group mr-2"></i>
                    3계층 교통 관제 구조
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 border-2 border-indigo-500">
                        <div className="text-center mb-2">
                            <span className="text-3xl">🏛️</span>
                            <div className="font-bold text-indigo-400 mt-1">L3 - 광역 허브</div>
                        </div>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• 17개 시도별 중앙 관제</li>
                            <li>• 광역 간 차량 배분</li>
                            <li>• 대규모 수요 예측</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-blue-500/50">
                        <div className="text-center mb-2">
                            <span className="text-3xl">🏢</span>
                            <div className="font-bold text-blue-400 mt-1">L2 - 시군구 터미널</div>
                        </div>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• 226개 시군구</li>
                            <li>• 지역 내 경로 최적화</li>
                            <li>• 수요-공급 매칭</li>
                        </ul>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/50">
                        <div className="text-center mb-2">
                            <span className="text-3xl">🚗</span>
                            <div className="font-bold text-green-400 mt-1">L1 - 개별 차량</div>
                        </div>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• 300만대 자율주행</li>
                            <li>• 실시간 속도/경로 수신</li>
                            <li>• 센서 데이터 송신</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 17개 광역 허브 현황 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <i className="fas fa-warehouse text-indigo-400 mr-2"></i>
                    17개 광역 허브 현황
                    <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 pulse-dot"></span>LIVE
                    </span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {hubs.map(hub => {
                        const utilization = getUtilization(hub.vehicles, hub.capacity);
                        const statusColor = getStatusColor(hub.status, utilization);
                        return (
                            <div 
                                key={hub.id}
                                onClick={() => setSelectedHub(hub)}
                                className={`bg-gray-700/50 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition border ${
                                    statusColor === 'red' ? 'border-red-500/50' :
                                    statusColor === 'yellow' ? 'border-yellow-500/50' :
                                    'border-gray-600'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg">{hub.name}</span>
                                    <span className={`w-3 h-3 rounded-full ${
                                        statusColor === 'red' ? 'bg-red-400' :
                                        statusColor === 'yellow' ? 'bg-yellow-400' :
                                        'bg-green-400'
                                    } ${hub.status === 'busy' ? 'pulse-dot' : ''}`}></span>
                                </div>
                                <div className="text-2xl font-bold mb-1">
                                    {(hub.vehicles / 1000).toFixed(0)}K
                                </div>
                                <div className="text-xs text-gray-400 mb-2">
                                    / {(hub.capacity / 1000).toFixed(0)}K 용량
                                </div>
                                <div className="bg-gray-600 rounded-full h-2 mb-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            statusColor === 'red' ? 'bg-red-500' :
                                            statusColor === 'yellow' ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}
                                        style={{ width: `${utilization}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">가동률</span>
                                    <span className={`${
                                        statusColor === 'red' ? 'text-red-400' :
                                        statusColor === 'yellow' ? 'text-yellow-400' :
                                        'text-green-400'
                                    }`}>{utilization}%</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    처리: {(hub.throughput / 1000).toFixed(1)}K/h
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* OpenHash 분산 검증 */}
            <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">
                    <i className="fas fa-network-wired mr-2"></i>
                    OpenHash 분산 검증 네트워크
                </h3>
                <p className="text-gray-400 mb-4">
                    각 광역 허브는 OpenHash 검증 노드를 운영하여 모든 차량 데이터의 무결성을 분산 검증합니다.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-cyan-400">17</div>
                        <div className="text-sm text-gray-400">검증 노드</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">99.99%</div>
                        <div className="text-sm text-gray-400">가용성</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">0.001ms</div>
                        <div className="text-sm text-gray-400">검증 지연</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
