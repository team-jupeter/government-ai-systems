const CityDistribution = () => {
    const [regions, setRegions] = React.useState([]);
    const [selectedRegionId, setSelectedRegionId] = React.useState('seoul');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/meal/regions');
                const data = await res.json();
                setRegions(data.regions || []);
            } catch (err) {
                console.error('Failed to fetch:', err);
            }
        };
        fetchData();
    }, []);

    // 시군구 시뮬레이션 데이터
    const cityData = {
        seoul: ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
        busan: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
        gyeonggi: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '하남시', '오산시', '이천시']
    };

    const selectedCities = cityData[selectedRegionId] || cityData.seoul;

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">
                    <i className="fas fa-city text-indigo-400 mr-2"></i>
                    Layer 2: 시군구 배급 센터
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    전국 226개 시군구에 위치한 배급 센터입니다. 
                    Layer 3(광역)에서 식재료를 받아 Layer 1(읍면동)에 배급합니다.
                </p>

                {/* 지역 선택 */}
                <div className="mb-6">
                    <label className="text-sm text-gray-400 mb-2 block">광역시도 선택</label>
                    <select 
                        value={selectedRegionId}
                        onChange={(e) => setSelectedRegionId(e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    >
                        {regions.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>

                {/* 시군구 목록 */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {selectedCities.map((city, idx) => (
                        <div 
                            key={idx}
                            className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 hover:border-indigo-500/50 transition-all"
                        >
                            <div className="font-medium text-sm mb-2">{city}</div>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>
                                    <i className="fas fa-box mr-1"></i>
                                    {Math.floor(Math.random() * 50 + 50)}톤
                                </span>
                                <span className={`px-1.5 py-0.5 rounded ${
                                    Math.random() > 0.1 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                    {Math.random() > 0.1 ? '정상' : '주의'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-indigo-400">226</div>
                    <div className="text-sm text-gray-400">전국 시군구</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400">98.7%</div>
                    <div className="text-sm text-gray-400">정상 운영률</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-400">12,500</div>
                    <div className="text-sm text-gray-400">일일 배급 차량</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-cyan-400">4.2시간</div>
                    <div className="text-sm text-gray-400">평균 배급 시간</div>
                </div>
            </div>
        </div>
    );
};
