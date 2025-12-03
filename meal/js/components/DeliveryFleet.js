const DeliveryFleet = () => {
    const [vehicles, setVehicles] = React.useState([]);
    const [stats, setStats] = React.useState(null);

    const regionNames = {
        seoul: '서울', busan: '부산', daegu: '대구', incheon: '인천',
        gwangju: '광주', daejeon: '대전', ulsan: '울산', sejong: '세종',
        gyeonggi: '경기', gangwon: '강원', chungbuk: '충북', chungnam: '충남',
        jeonbuk: '전북', jeonnam: '전남', gyeongbuk: '경북', gyeongnam: '경남', jeju: '제주'
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/meal/vehicles');
                const data = await res.json();
                setVehicles(data.vehicles || []);
                setStats(data.stats || null);
            } catch (err) {
                console.error('Failed to fetch vehicles:', err);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-cyan-400">15,000</div>
                    <div className="text-sm text-gray-400">전체 차량</div>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400">{stats?.delivering || '-'}</div>
                    <div className="text-sm text-gray-400">배송중</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-400">{stats?.waiting || '-'}</div>
                    <div className="text-sm text-gray-400">대기중</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">{stats?.charging || '-'}</div>
                    <div className="text-sm text-gray-400">충전중</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400">{stats?.avg_battery || '-'}%</div>
                    <div className="text-sm text-gray-400">평균 배터리</div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">
                    <i className="fas fa-truck text-yellow-400 mr-2"></i>
                    자율주행 배식 차량 현황
                    <span className="text-sm font-normal text-gray-400 ml-2">(실시간)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {vehicles.slice(0, 20).map(vehicle => (
                        <div key={vehicle.id} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-2xl ${vehicle.status === '배송중' ? 'driving' : ''}`}>
                                    {vehicle.type === '소형' ? '🛵' : vehicle.type === '중형' ? '🚐' : '🚚'}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    vehicle.status === '배송중' ? 'bg-green-500/20 text-green-400' :
                                    vehicle.status === '대기중' ? 'bg-yellow-500/20 text-yellow-400' :
                                    vehicle.status === '충전중' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-gray-500/20 text-gray-400'
                                }`}>{vehicle.status}</span>
                            </div>
                            <div className="text-sm font-mono text-gray-400 mb-2">{vehicle.id}</div>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">지역</span>
                                    <span>{regionNames[vehicle.region]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">적재량</span>
                                    <span>{vehicle.current_load}/{vehicle.capacity}식</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">오늘 배송</span>
                                    <span className="text-green-400">{vehicle.deliveries_today}건</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">배터리</span>
                                    <span className={vehicle.battery > 50 ? 'text-green-400' : vehicle.battery > 20 ? 'text-yellow-400' : 'text-red-400'}>
                                        {vehicle.battery}%
                                    </span>
                                </div>
                            </div>
                            <div className="mt-3 h-2 bg-gray-600 rounded-full overflow-hidden">
                                <div className={`h-full transition-all ${vehicle.battery > 50 ? 'bg-green-500' : vehicle.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${vehicle.battery}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">
                    <i className="fas fa-route text-cyan-400 mr-2"></i>배송 네트워크 기술
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-cyan-400 font-bold mb-2">🚗 지상 자율주행 (85%)</div>
                        <div className="text-sm text-gray-400">AI 경로 최적화로 배송거리 23% 단축</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-green-400 font-bold mb-2">🚁 드론 배송 (10%)</div>
                        <div className="text-sm text-gray-400">도서산간 지역 신속 배송</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-purple-400 font-bold mb-2">🚇 지하터널 (5%)</div>
                        <div className="text-sm text-gray-400">대도시 혼잡 구간 우회</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
