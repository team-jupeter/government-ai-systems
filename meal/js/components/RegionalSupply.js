const RegionalSupply = () => {
    const [regions, setRegions] = React.useState([]);
    const [selectedRegion, setSelectedRegion] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/meal/regions');
                const data = await res.json();
                setRegions(data.regions || []);
            } catch (err) {
                console.error('Failed to fetch regions:', err);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">
                    <i className="fas fa-warehouse text-blue-400 mr-2"></i>
                    Layer 3: 광역시도 대형 공급 시설
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    17개 광역시도에 위치한 대형 식재료 공급 시설입니다. 
                    Layer 2(시군구)에 일주일 단위로 식재료를 공급합니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {regions.map(region => (
                        <div 
                            key={region.id}
                            onClick={() => setSelectedRegion(region)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedRegion?.id === region.id 
                                    ? 'border-blue-500 bg-blue-500/10' 
                                    : 'border-gray-700 bg-gray-700/30 hover:border-blue-500/50'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold">{region.name}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    region.stock_level >= 100 ? 'bg-green-500/20 text-green-400' :
                                    region.stock_level >= 90 ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    재고 {region.stock_level}%
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-gray-400">
                                    <i className="fas fa-users mr-1"></i>
                                    {(region.population / 1000000).toFixed(1)}M명
                                </div>
                                <div className="text-gray-400">
                                    <i className="fas fa-store mr-1"></i>
                                    공급센터 {region.supply_centers}개
                                </div>
                                <div className="text-gray-400">
                                    <i className="fas fa-utensils mr-1"></i>
                                    조리시설 {region.kitchens}개
                                </div>
                                <div className="text-gray-400">
                                    <i className="fas fa-truck mr-1"></i>
                                    배송률 {region.delivery_rate}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedRegion && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">
                        <i className="fas fa-info-circle text-blue-400 mr-2"></i>
                        {selectedRegion.name} 상세 정보
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-cyan-400">
                                {(selectedRegion.daily_meals / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-sm text-gray-400">일일 급식량</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-400">
                                {selectedRegion.supply_centers}
                            </div>
                            <div className="text-sm text-gray-400">대형 공급센터</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-purple-400">
                                {selectedRegion.kitchens}
                            </div>
                            <div className="text-sm text-gray-400">조리 시설</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-yellow-400">
                                {selectedRegion.delivery_rate}%
                            </div>
                            <div className="text-sm text-gray-400">배송 완료율</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
