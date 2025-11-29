const LocalKitchen = () => {
    const [regions, setRegions] = React.useState([]);
    const [kitchens, setKitchens] = React.useState([]);
    const [selectedRegion, setSelectedRegion] = React.useState('seoul');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        fetch('/api/meal/regions')
            .then(res => res.json())
            .then(data => setRegions(data.regions || []));
    }, []);

    React.useEffect(() => {
        setLoading(true);
        fetch(`/api/meal/region/${selectedRegion}/kitchens`)
            .then(res => res.json())
            .then(data => {
                setKitchens(data.kitchens || []);
                setLoading(false);
            });
        
        const interval = setInterval(() => {
            fetch(`/api/meal/region/${selectedRegion}/kitchens`)
                .then(res => res.json())
                .then(data => setKitchens(data.kitchens || []));
        }, 5000);
        return () => clearInterval(interval);
    }, [selectedRegion]);

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold">
                            <i className="fas fa-utensils text-purple-400 mr-2"></i>
                            Layer 1: 읍면동 조리 시설
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            1,700대 로봇셰프가 5성급 호텔 수준의 도시락을 조리합니다
                        </p>
                    </div>
                    <select 
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
                    >
                        {regions.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <i className="fas fa-spinner fa-spin text-4xl text-purple-400"></i>
                        <p className="text-gray-400 mt-4">조리 시설 정보 로딩중...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {kitchens.map(kitchen => (
                            <div 
                                key={kitchen.id}
                                className="bg-gray-700/50 rounded-xl p-4 border border-gray-600"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl cooking">🤖</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        kitchen.status === '운영중' 
                                            ? 'bg-green-500/20 text-green-400' 
                                            : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                        {kitchen.status}
                                    </span>
                                </div>
                                <h4 className="font-bold text-sm mb-2 truncate">{kitchen.name}</h4>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">로봇셰프</span>
                                        <span className="text-purple-400">{kitchen.robot_chefs}대</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">가동률</span>
                                        <span className="text-cyan-400">{kitchen.current_load}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">오늘 조리</span>
                                        <span className="text-green-400">{kitchen.meals_today.toLocaleString()}식</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">다음 식사</span>
                                        <span className="text-yellow-400">{kitchen.next_meal_time}</span>
                                    </div>
                                </div>
                                {/* 가동률 바 */}
                                <div className="mt-3">
                                    <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"
                                            style={{ width: `${kitchen.current_load}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 로봇셰프 스펙 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">
                    <i className="fas fa-robot text-cyan-400 mr-2"></i>
                    로봇셰프 사양 (특허 기술)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-cyan-400 font-bold">6축 로봇팔</div>
                        <div className="text-sm text-gray-400">정밀도 ±0.1mm</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-green-400 font-bold">온도 제어</div>
                        <div className="text-sm text-gray-400">±1℃ 정밀 제어</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-yellow-400 font-bold">중량 제어</div>
                        <div className="text-sm text-gray-400">±3g 정밀 제어</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                        <div className="text-purple-400 font-bold">충돌 방지</div>
                        <div className="text-sm text-gray-400">100% 방지율</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
