const NationalFleet = () => {
    const [fleetData, setFleetData] = React.useState({
        total: 3000000,
        active: 2847523,
        idle: 98234,
        charging: 45123,
        maintenance: 9120,
        byType: {
            sedan: { total: 1200000, active: 1142000 },
            suv: { total: 800000, active: 762000 },
            van: { total: 500000, active: 478000 },
            bus: { total: 300000, active: 287000 },
            truck: { total: 200000, active: 178523 }
        }
    });

    const [regionStats, setRegionStats] = React.useState([
        { id: 'seoul', name: '서울', vehicles: 520000, active: 495200, avgSpeed: 42 },
        { id: 'gyeonggi', name: '경기', vehicles: 680000, active: 651000, avgSpeed: 58 },
        { id: 'busan', name: '부산', vehicles: 280000, active: 267400, avgSpeed: 51 },
        { id: 'daegu', name: '대구', vehicles: 195000, active: 186500, avgSpeed: 54 },
        { id: 'incheon', name: '인천', vehicles: 230000, active: 219800, avgSpeed: 48 },
        { id: 'gwangju', name: '광주', vehicles: 125000, active: 119500, avgSpeed: 52 },
        { id: 'daejeon', name: '대전', vehicles: 130000, active: 124300, avgSpeed: 55 },
        { id: 'ulsan', name: '울산', vehicles: 98000, active: 93700, avgSpeed: 57 },
        { id: 'sejong', name: '세종', vehicles: 45000, active: 43200, avgSpeed: 62 },
        { id: 'gangwon', name: '강원', vehicles: 125000, active: 118750, avgSpeed: 68 },
        { id: 'chungbuk', name: '충북', vehicles: 132000, active: 126000, avgSpeed: 64 },
        { id: 'chungnam', name: '충남', vehicles: 175000, active: 167300, avgSpeed: 61 },
        { id: 'jeonbuk', name: '전북', vehicles: 148000, active: 141500, avgSpeed: 59 },
        { id: 'jeonnam', name: '전남', vehicles: 152000, active: 145400, avgSpeed: 63 },
        { id: 'gyeongbuk', name: '경북', vehicles: 218000, active: 208200, avgSpeed: 65 },
        { id: 'gyeongnam', name: '경남', vehicles: 275000, active: 262900, avgSpeed: 58 },
        { id: 'jeju', name: '제주', vehicles: 72000, active: 68850, avgSpeed: 55 }
    ]);

    // 5초마다 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setFleetData(prev => ({
                ...prev,
                active: 2800000 + Math.floor(Math.random() * 100000),
                idle: 90000 + Math.floor(Math.random() * 20000),
                charging: 40000 + Math.floor(Math.random() * 10000)
            }));
            
            setRegionStats(prev => prev.map(r => ({
                ...r,
                active: Math.floor(r.vehicles * (0.93 + Math.random() * 0.05)),
                avgSpeed: 40 + Math.floor(Math.random() * 30)
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const vehicleTypes = [
        { type: 'sedan', name: '승용차', icon: '🚗', color: 'indigo' },
        { type: 'suv', name: 'SUV', icon: '🚙', color: 'blue' },
        { type: 'van', name: '승합차', icon: '🚐', color: 'green' },
        { type: 'bus', name: '버스', icon: '🚌', color: 'yellow' },
        { type: 'truck', name: '화물차', icon: '🚛', color: 'orange' }
    ];

    return (
        <div className="space-y-6">
            {/* 상단 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-5">
                    <div className="text-indigo-200 text-sm">전체 등록</div>
                    <div className="text-2xl font-bold">{(fleetData.total / 1000000).toFixed(1)}백만</div>
                    <div className="text-indigo-300 text-xs mt-1">기존 3천만 → 1/10 감축</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="text-green-200 text-sm">운행 중</div>
                    <div className="text-2xl font-bold">{fleetData.active.toLocaleString()}</div>
                    <div className="flex items-center text-green-300 text-xs mt-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1 pulse-dot"></span>LIVE
                    </div>
                </div>
                <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl p-5">
                    <div className="text-gray-200 text-sm">대기 중</div>
                    <div className="text-2xl font-bold">{fleetData.idle.toLocaleString()}</div>
                    <div className="text-gray-300 text-xs mt-1">수요 대기</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <div className="text-yellow-200 text-sm">충전 중</div>
                    <div className="text-2xl font-bold">{fleetData.charging.toLocaleString()}</div>
                    <div className="text-yellow-300 text-xs mt-1">전기차 충전</div>
                </div>
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-5">
                    <div className="text-red-200 text-sm">정비 중</div>
                    <div className="text-2xl font-bold">{fleetData.maintenance.toLocaleString()}</div>
                    <div className="text-red-300 text-xs mt-1">예방 정비</div>
                </div>
            </div>

            {/* 차종별 현황 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <i className="fas fa-car-side text-indigo-400 mr-2"></i>
                    차종별 현황
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {vehicleTypes.map(v => (
                        <div key={v.type} className="bg-gray-700/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">{v.icon}</span>
                                <span className={`text-${v.color}-400 text-sm`}>{v.name}</span>
                            </div>
                            <div className="text-xl font-bold">{(fleetData.byType[v.type].total / 10000).toFixed(0)}만</div>
                            <div className="text-gray-400 text-xs">운행: {(fleetData.byType[v.type].active / 10000).toFixed(0)}만</div>
                            <div className="mt-2 bg-gray-600 rounded-full h-2">
                                <div 
                                    className={`bg-${v.color}-500 h-2 rounded-full`}
                                    style={{ width: `${(fleetData.byType[v.type].active / fleetData.byType[v.type].total * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 지역별 현황 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <i className="fas fa-map-marked-alt text-green-400 mr-2"></i>
                    17개 시도별 차량 현황
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 pulse-dot"></span>
                        실시간
                    </span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {regionStats.map(r => (
                        <div key={r.id} className="bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{r.name}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded ${
                                    r.avgSpeed >= 60 ? 'bg-green-500/20 text-green-400' :
                                    r.avgSpeed >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    {r.avgSpeed}km/h
                                </span>
                            </div>
                            <div className="text-lg font-bold">{(r.active / 1000).toFixed(0)}K</div>
                            <div className="text-gray-400 text-xs">/ {(r.vehicles / 1000).toFixed(0)}K</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 차량 감축 효과 */}
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">
                    <i className="fas fa-leaf mr-2"></i>
                    차량 1/10 감축 효과
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">3,000만 → 300만</div>
                        <div className="text-gray-400 text-sm">차량 수 90% 감소</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">87%</div>
                        <div className="text-gray-400 text-sm">교통 체증 감소</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">92%</div>
                        <div className="text-gray-400 text-sm">탄소 배출 감소</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">0건</div>
                        <div className="text-gray-400 text-sm">교통 사고 (목표)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
