const IngredientPlan = () => {
    const [selectedRegion, setSelectedRegion] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('');
    const [selectedTown, setSelectedTown] = React.useState('');
    const [townData, setTownData] = React.useState(null);

    // Recharts 라이브러리
    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } = RechartsLib;
    const chartsAvailable = BarChart && ResponsiveContainer;

    // 광역시도 데이터
    const regions = [
        { id: 'seoul', name: '서울특별시' },
        { id: 'busan', name: '부산광역시' },
        { id: 'daegu', name: '대구광역시' },
        { id: 'incheon', name: '인천광역시' },
        { id: 'gwangju', name: '광주광역시' },
        { id: 'daejeon', name: '대전광역시' },
        { id: 'ulsan', name: '울산광역시' },
        { id: 'sejong', name: '세종특별자치시' },
        { id: 'gyeonggi', name: '경기도' },
        { id: 'gangwon', name: '강원특별자치도' },
        { id: 'chungbuk', name: '충청북도' },
        { id: 'chungnam', name: '충청남도' },
        { id: 'jeonbuk', name: '전북특별자치도' },
        { id: 'jeonnam', name: '전라남도' },
        { id: 'gyeongbuk', name: '경상북도' },
        { id: 'gyeongnam', name: '경상남도' },
        { id: 'jeju', name: '제주특별자치도' }
    ];

    // 시군구 데이터 (지역별)
    const citiesByRegion = {
        seoul: ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
        busan: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
        daegu: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
        incheon: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
        gwangju: ['동구', '서구', '남구', '북구', '광산구'],
        daejeon: ['동구', '중구', '서구', '유성구', '대덕구'],
        ulsan: ['중구', '남구', '동구', '북구', '울주군'],
        sejong: ['세종시'],
        gyeonggi: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '하남시', '오산시', '이천시'],
        gangwon: ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
        chungbuk: ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
        chungnam: ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
        jeonbuk: ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
        jeonnam: ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
        gyeongbuk: ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
        gyeongnam: ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
        jeju: ['제주시', '서귀포시']
    };

    // 읍면동 데이터 생성 (시군구별)
    const getTowns = (city) => {
        const townSuffixes = ['1동', '2동', '3동', '본동', '중앙동', '동부동', '서부동', '남부동', '북부동'];
        const baseTowns = [];
        for (let i = 1; i <= Math.floor(Math.random() * 5 + 8); i++) {
            baseTowns.push(`${city.replace(/시|구|군/g, '')}${i}동`);
        }
        return baseTowns;
    };

    const [towns, setTowns] = React.useState([]);

    // 지역 선택 시 시군구 목록 업데이트
    React.useEffect(() => {
        setSelectedCity('');
        setSelectedTown('');
        setTownData(null);
    }, [selectedRegion]);

    // 시군구 선택 시 읍면동 목록 업데이트
    React.useEffect(() => {
        if (selectedCity) {
            setTowns(getTowns(selectedCity));
        }
        setSelectedTown('');
        setTownData(null);
    }, [selectedCity]);

    // 읍면동 선택 시 데이터 생성
    React.useEffect(() => {
        if (selectedTown) {
            generateTownData();
        }
    }, [selectedTown]);

    const generateTownData = () => {
        // 인구 데이터 생성
        const population = Math.floor(Math.random() * 30000 + 10000);
        const ageDistribution = [
            { name: '0-9세', value: Math.floor(population * 0.08), color: '#ff6b6b' },
            { name: '10-19세', value: Math.floor(population * 0.10), color: '#feca57' },
            { name: '20-29세', value: Math.floor(population * 0.14), color: '#48dbfb' },
            { name: '30-39세', value: Math.floor(population * 0.15), color: '#1dd1a1' },
            { name: '40-49세', value: Math.floor(population * 0.16), color: '#5f27cd' },
            { name: '50-59세', value: Math.floor(population * 0.15), color: '#ff9ff3' },
            { name: '60-69세', value: Math.floor(population * 0.12), color: '#54a0ff' },
            { name: '70세+', value: Math.floor(population * 0.10), color: '#c8d6e5' }
        ];

        // 주간 식재료 소비량 (인구 기반)
        const weeklyIngredients = [
            { name: '쌀', unit: 'kg', perPerson: 2.1, icon: '🍚' },
            { name: '배추/김치', unit: 'kg', perPerson: 1.5, icon: '🥬' },
            { name: '돼지고기', unit: 'kg', perPerson: 0.8, icon: '🥓' },
            { name: '닭고기', unit: 'kg', perPerson: 0.6, icon: '🍗' },
            { name: '소고기', unit: 'kg', perPerson: 0.4, icon: '🥩' },
            { name: '생선류', unit: 'kg', perPerson: 0.5, icon: '🐟' },
            { name: '채소류', unit: 'kg', perPerson: 1.8, icon: '🥗' },
            { name: '두부', unit: 'kg', perPerson: 0.3, icon: '🧈' },
            { name: '계란', unit: '개', perPerson: 21, icon: '🥚' },
            { name: '우유', unit: 'L', perPerson: 1.5, icon: '🥛' },
            { name: '과일류', unit: 'kg', perPerson: 1.2, icon: '🍎' },
            { name: '면류', unit: 'kg', perPerson: 0.4, icon: '🍜' }
        ].map(item => ({
            ...item,
            weeklyTotal: Math.floor(population * item.perPerson),
            dailyAvg: Math.floor(population * item.perPerson / 7)
        }));

        // 일별 소비 추이 (7일)
        const dailyConsumption = [];
        const days = ['월', '화', '수', '목', '금', '토', '일'];
        for (let i = 0; i < 7; i++) {
            dailyConsumption.push({
                day: days[i],
                쌀: Math.floor(population * 2.1 / 7 * (0.9 + Math.random() * 0.2)),
                육류: Math.floor(population * 1.8 / 7 * (0.9 + Math.random() * 0.2)),
                채소: Math.floor(population * 1.8 / 7 * (0.9 + Math.random() * 0.2))
            });
        }

        // 세대 구성
        const households = {
            single: Math.floor(population * 0.32 / 1),
            couple: Math.floor(population * 0.22 / 2),
            family: Math.floor(population * 0.35 / 3.5),
            extended: Math.floor(population * 0.11 / 4.5)
        };

        setTownData({
            population,
            ageDistribution,
            weeklyIngredients,
            dailyConsumption,
            households,
            region: regions.find(r => r.id === selectedRegion)?.name,
            city: selectedCity,
            town: selectedTown
        });
    };

    const COLORS = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd', '#ff9ff3', '#54a0ff', '#c8d6e5'];

    return (
        <div className="space-y-6">
            {/* 지역 선택 헤더 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">
                    <i className="fas fa-map-marker-alt text-orange-400 mr-2"></i>
                    읍면동 단위 식재료 조달 계획
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    특정 읍면동을 선택하면 해당 지역의 인구 구성과 주간 식재료 소비량을 확인할 수 있습니다.
                </p>

                {/* 드롭다운 선택 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 광역시도 */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">광역시도</label>
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                        >
                            <option value="">선택하세요</option>
                            {regions.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 시군구 */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">시군구</label>
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedRegion}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                        >
                            <option value="">선택하세요</option>
                            {selectedRegion && citiesByRegion[selectedRegion]?.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* 읍면동 */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">읍면동</label>
                        <select
                            value={selectedTown}
                            onChange={(e) => setSelectedTown(e.target.value)}
                            disabled={!selectedCity}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none disabled:opacity-50"
                        >
                            <option value="">선택하세요</option>
                            {towns.map(town => (
                                <option key={town} value={town}>{town}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* 선택된 지역 데이터 표시 */}
            {townData && (
                <>
                    {/* 지역 정보 헤더 */}
                    <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border border-orange-500/30 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-2xl font-bold">
                                    📍 {townData.region} {townData.city} {townData.town}
                                </h4>
                                <p className="text-gray-400 mt-1">Layer 1 급식센터 관할 지역</p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-orange-400">{townData.population.toLocaleString()}</div>
                                <div className="text-gray-400">총 인구</div>
                            </div>
                        </div>
                    </div>

                    {/* 인구 통계 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 연령대별 분포 차트 */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h4 className="font-bold mb-4">
                                <i className="fas fa-users text-cyan-400 mr-2"></i>
                                연령대별 인구 분포
                            </h4>
                            {chartsAvailable ? (
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={townData.ageDistribution}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {townData.ageDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                                formatter={(value) => [`${value.toLocaleString()}명`, '인구']}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <div className="h-64 flex items-center justify-center bg-gray-700/50 rounded-lg">
                                    <p className="text-gray-400">차트 로딩 중...</p>
                                </div>
                            )}
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {townData.ageDistribution.map((item, idx) => (
                                    <div key={idx} className="text-center text-xs">
                                        <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }}></div>
                                        <div className="text-gray-400">{item.name}</div>
                                        <div className="font-bold">{item.value.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 세대 구성 */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h4 className="font-bold mb-4">
                                <i className="fas fa-home text-green-400 mr-2"></i>
                                세대 구성
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { name: '1인 가구', value: townData.households.single, icon: '👤', color: 'cyan' },
                                    { name: '2인 가구', value: townData.households.couple, icon: '👥', color: 'green' },
                                    { name: '3-4인 가구', value: townData.households.family, icon: '👨‍👩‍👧', color: 'yellow' },
                                    { name: '5인+ 가구', value: townData.households.extended, icon: '👨‍👩‍👧‍👦', color: 'purple' }
                                ].map((item, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between mb-1">
                                            <span><span className="mr-2">{item.icon}</span>{item.name}</span>
                                            <span className={`text-${item.color}-400 font-bold`}>{item.value.toLocaleString()}세대</span>
                                        </div>
                                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-${item.color}-500 transition-all duration-500`}
                                                style={{ width: `${(item.value / (townData.population / 2.5)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg text-center">
                                <div className="text-2xl font-bold text-cyan-400">
                                    {Object.values(townData.households).reduce((a, b) => a + b, 0).toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-400">총 세대수</div>
                            </div>
                        </div>
                    </div>

                    {/* 일별 소비 추이 */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4">
                            <i className="fas fa-chart-line text-purple-400 mr-2"></i>
                            주간 식재료 소비 추이 (kg)
                        </h4>
                        {chartsAvailable ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={townData.dailyConsumption}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="day" stroke="#9CA3AF" />
                                        <YAxis stroke="#9CA3AF" />
                                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                        <Area type="monotone" dataKey="쌀" stackId="1" stroke="#feca57" fill="#feca57" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="육류" stackId="1" stroke="#ff6b6b" fill="#ff6b6b" fillOpacity={0.6} />
                                        <Area type="monotone" dataKey="채소" stackId="1" stroke="#1dd1a1" fill="#1dd1a1" fillOpacity={0.6} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-64 flex items-center justify-center bg-gray-700/50 rounded-lg">
                                <p className="text-gray-400">차트 로딩 중...</p>
                            </div>
                        )}
                    </div>

                    {/* 주간 식재료 소비량 */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4">
                            <i className="fas fa-shopping-basket text-yellow-400 mr-2"></i>
                            주간 식재료 조달 필요량
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {townData.weeklyIngredients.map((item, idx) => (
                                <div key={idx} className="bg-gray-700/50 rounded-xl p-4 text-center hover:bg-gray-700 transition-all">
                                    <div className="text-3xl mb-2">{item.icon}</div>
                                    <div className="font-bold text-sm mb-1">{item.name}</div>
                                    <div className="text-2xl font-bold text-cyan-400">
                                        {item.weeklyTotal >= 1000 
                                            ? `${(item.weeklyTotal / 1000).toFixed(1)}t`
                                            : item.weeklyTotal.toLocaleString()
                                        }
                                    </div>
                                    <div className="text-xs text-gray-400">{item.unit}/주</div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        일 평균: {item.dailyAvg.toLocaleString()}{item.unit}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 조달 경로 */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4">
                            <i className="fas fa-truck text-blue-400 mr-2"></i>
                            식재료 조달 경로
                        </h4>
                        <div className="flex items-center justify-between overflow-x-auto pb-4">
                            {[
                                { name: 'Layer 3\n광역 공급센터', icon: '🏭', desc: regions.find(r => r.id === selectedRegion)?.name },
                                { name: 'Layer 2\n시군구 배급센터', icon: '🏢', desc: townData.city },
                                { name: 'Layer 1\n읍면동 조리시설', icon: '🍳', desc: townData.town },
                                { name: '최종 배송', icon: '🚗', desc: `${townData.population.toLocaleString()}명` }
                            ].map((step, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="flex-shrink-0 text-center px-4">
                                        <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                                            {step.icon}
                                        </div>
                                        <div className="text-sm font-medium whitespace-pre-line">{step.name}</div>
                                        <div className="text-xs text-cyan-400">{step.desc}</div>
                                    </div>
                                    {idx < 3 && (
                                        <div className="flex-shrink-0 text-cyan-500">
                                            <i className="fas fa-arrow-right text-2xl"></i>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* 지역 미선택 시 안내 */}
            {!townData && (
                <div className="bg-gray-800 rounded-xl p-12 text-center">
                    <i className="fas fa-map-marked-alt text-6xl text-gray-600 mb-4"></i>
                    <h4 className="text-xl font-bold text-gray-400 mb-2">지역을 선택해주세요</h4>
                    <p className="text-gray-500">광역시도 → 시군구 → 읍면동 순서로 선택하면<br/>해당 지역의 식재료 조달 계획을 확인할 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};
