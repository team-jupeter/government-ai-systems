const CityWorkforce = () => {
    const [cities, setCities] = React.useState([]);
    const [selectedRegion, setSelectedRegion] = React.useState('서울');

    React.useEffect(() => {
        const cityData = {
            '서울': [
                { name: '강남구', workforce: 285000, companies: 42000, efficiency: 96.5 },
                { name: '서초구', workforce: 215000, companies: 28000, efficiency: 95.8 },
                { name: '송파구', workforce: 195000, companies: 18500, efficiency: 94.2 },
                { name: '영등포구', workforce: 178000, companies: 22000, efficiency: 93.5 },
                { name: '마포구', workforce: 165000, companies: 15800, efficiency: 94.8 },
                { name: '중구', workforce: 142000, companies: 35000, efficiency: 92.1 },
                { name: '종로구', workforce: 125000, companies: 28000, efficiency: 91.5 }
            ],
            '경기': [
                { name: '수원시', workforce: 580000, companies: 48000, efficiency: 93.2 },
                { name: '성남시', workforce: 520000, companies: 52000, efficiency: 95.5 },
                { name: '용인시', workforce: 485000, companies: 38000, efficiency: 92.8 },
                { name: '고양시', workforce: 425000, companies: 32000, efficiency: 91.5 },
                { name: '화성시', workforce: 395000, companies: 28000, efficiency: 94.1 },
                { name: '부천시', workforce: 365000, companies: 26000, efficiency: 90.8 }
            ]
        };
        setCities(cityData[selectedRegion] || []);
    }, [selectedRegion]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    return (
        <div className="space-y-6">
            {/* 상단 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <p className="text-green-200 text-sm">총 시군구</p>
                    <p className="text-3xl font-bold text-white mt-1">226개</p>
                    <p className="text-green-200 text-xs mt-1">전국 기초자치단체</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <p className="text-blue-200 text-sm">평균 노동인구</p>
                    <p className="text-3xl font-bold text-white mt-1">133K</p>
                    <p className="text-blue-200 text-xs mt-1">시군구당 평균</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <p className="text-purple-200 text-sm">데이터 동기화</p>
                    <p className="text-3xl font-bold text-white mt-1">실시간</p>
                    <p className="text-purple-200 text-xs mt-1">5초 간격 업데이트</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <p className="text-yellow-200 text-sm">OpenHash 검증</p>
                    <p className="text-3xl font-bold text-white mt-1">99.98%</p>
                    <p className="text-yellow-200 text-xs mt-1">데이터 무결성</p>
                </div>
            </div>

            {/* 지역 선택 */}
            <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-400 text-sm">광역시/도 선택:</span>
                    {['서울', '경기', '부산', '인천', '대구', '대전', '광주'].map((region) => (
                        <button
                            key={region}
                            onClick={() => setSelectedRegion(region)}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                selectedRegion === region
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            {/* 시군구 목록 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">{selectedRegion} 시군구별 노동인구</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cities.map((city, index) => (
                        <div key={city.name} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-white">{city.name}</p>
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                    city.efficiency >= 95 ? 'bg-green-500/20 text-green-400' :
                                    city.efficiency >= 92 ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                    {city.efficiency}%
                                </span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">노동인구</span>
                                    <span className="text-white">{formatNumber(city.workforce)}명</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">기업 수</span>
                                    <span className="text-white">{formatNumber(city.companies)}개</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* L2 계층 설명 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-green-400 font-bold">L2</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">시군구 계층 (Level 2)</h3>
                </div>
                <p className="text-slate-300 text-sm">
                    226개 기초자치단체(시/군/구) 단위의 세부 인력 관리 계층입니다.
                    지역 특화 산업, 통근 패턴, 지역 경제 동향을 반영한 맞춤형 인력 정책을 실행합니다.
                </p>
            </div>
        </div>
    );
};
