const KitchenFacility = () => {
    const [selectedRegion, setSelectedRegion] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('');
    const [selectedTown, setSelectedTown] = React.useState('');
    const [facilityData, setFacilityData] = React.useState(null);
    const [cookingAnimation, setCookingAnimation] = React.useState(0);
    const [activeStation, setActiveStation] = React.useState(null);

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = RechartsLib;
    const chartsAvailable = BarChart && ResponsiveContainer;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCookingAnimation(prev => (prev + 1) % 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);

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

    const getTowns = (city) => {
        const baseTowns = [];
        const count = Math.floor(Math.random() * 6 + 6);
        for (let i = 1; i <= count; i++) {
            baseTowns.push(city.replace(/시|구|군/g, '') + i + '동');
        }
        return baseTowns;
    };

    const [towns, setTowns] = React.useState([]);

    React.useEffect(() => {
        setSelectedCity('');
        setSelectedTown('');
        setFacilityData(null);
    }, [selectedRegion]);

    React.useEffect(() => {
        if (selectedCity) {
            setTowns(getTowns(selectedCity));
        }
        setSelectedTown('');
        setFacilityData(null);
    }, [selectedCity]);

    React.useEffect(() => {
        if (selectedTown) {
            generateFacilityData();
        }
    }, [selectedTown]);

    const generateFacilityData = () => {
        const servicePopulation = Math.floor(Math.random() * 25000 + 8000);
        const robotCount = Math.floor(servicePopulation / 800);
        const humanStaffCount = Math.floor(robotCount * 0.4 + 5);
        
        const robots = [];
        const robotTypes = [
            { type: '밥솥 로봇', icon: '🍚', task: '밥 짓기', capacity: '500인분/회' },
            { type: '국/찌개 로봇', icon: '🍲', task: '국물 요리', capacity: '300인분/회' },
            { type: '볶음 로봇', icon: '🥘', task: '볶음 요리', capacity: '200인분/회' },
            { type: '튀김 로봇', icon: '🍤', task: '튀김 요리', capacity: '250인분/회' },
            { type: '절단 로봇', icon: '🔪', task: '식재료 절단', capacity: '100kg/시간' },
            { type: '배식 로봇', icon: '🤖', task: '도시락 포장', capacity: '400개/시간' },
            { type: '세척 로봇', icon: '🧽', task: '용기 세척', capacity: '1000개/시간' },
            { type: '운반 로봇', icon: '🚚', task: '식재료 운반', capacity: '500kg/회' }
        ];
        
        for (let i = 0; i < robotCount; i++) {
            const typeInfo = robotTypes[i % robotTypes.length];
            robots.push({
                id: 'ROBOT-' + String(i + 1).padStart(3, '0'),
                type: typeInfo.type,
                icon: typeInfo.icon,
                task: typeInfo.task,
                capacity: typeInfo.capacity,
                status: Math.random() > 0.1 ? '가동중' : (Math.random() > 0.5 ? '대기중' : '점검중'),
                efficiency: Math.floor(Math.random() * 15 + 85),
                todayOutput: Math.floor(Math.random() * 2000 + 1000),
                lastMaintenance: Math.floor(Math.random() * 7 + 1) + '일 전'
            });
        }

        const staffRoles = [
            { role: '조리장', icon: '👨‍🍳', count: 1, responsibility: '총괄 관리, 품질 검수' },
            { role: '부조리장', icon: '👩‍🍳', count: 2, responsibility: '로봇 모니터링, 조리 지원' },
            { role: '위생관리사', icon: '🧑‍⚕️', count: 2, responsibility: 'HACCP 관리, 위생 점검' },
            { role: '영양사', icon: '📋', count: 1, responsibility: '영양 설계, 식단 관리' },
            { role: '식재료 관리사', icon: '📦', count: 2, responsibility: '입고 검수, 재고 관리' },
            { role: '로봇 엔지니어', icon: '🔧', count: 2, responsibility: '로봇 유지보수, 긴급수리' },
            { role: '배송 관리자', icon: '🚗', count: 2, responsibility: '배송 스케줄, 차량 관리' },
            { role: '고객 상담원', icon: '📞', count: 1, responsibility: '민원 처리, 알레르기 관리' }
        ];

        const staff = [];
        const names = ['김철수', '이영희', '박민수', '최지영', '정대호', '강수진', '조현우', '윤미래', '한지민', '오세훈', '신동엽', '유재석', '이효리', '송중기'];
        let nameIdx = 0;
        
        staffRoles.forEach(roleInfo => {
            for (let i = 0; i < roleInfo.count; i++) {
                staff.push({
                    id: 'STAFF-' + String(staff.length + 1).padStart(3, '0'),
                    name: names[nameIdx % names.length],
                    role: roleInfo.role,
                    icon: roleInfo.icon,
                    responsibility: roleInfo.responsibility,
                    status: Math.random() > 0.05 ? '근무중' : '휴식',
                    workingHours: Math.floor(Math.random() * 3 + 6) + ':00 - ' + Math.floor(Math.random() * 3 + 17) + ':00',
                    experience: Math.floor(Math.random() * 10 + 1) + '년'
                });
                nameIdx++;
            }
        });

        const stations = [
            { id: 1, name: '전처리실', icon: '🥬', status: '가동중', progress: Math.floor(Math.random() * 30 + 70), task: '오늘의 채소 절단 작업', robots: 3, temp: '18°C' },
            { id: 2, name: '밥 조리실', icon: '🍚', status: '가동중', progress: Math.floor(Math.random() * 20 + 80), task: '점심 밥 취사 중', robots: 4, temp: '22°C' },
            { id: 3, name: '국물 조리실', icon: '🍲', status: '가동중', progress: Math.floor(Math.random() * 25 + 75), task: '된장찌개 조리 중', robots: 3, temp: '85°C' },
            { id: 4, name: '볶음/구이실', icon: '🥘', status: '가동중', progress: Math.floor(Math.random() * 30 + 70), task: '제육볶음 조리 중', robots: 4, temp: '180°C' },
            { id: 5, name: '튀김실', icon: '🍤', status: '대기중', progress: 0, task: '점심 후 가동 예정', robots: 2, temp: '25°C' },
            { id: 6, name: '포장실', icon: '📦', status: '가동중', progress: Math.floor(Math.random() * 20 + 80), task: '도시락 포장 중', robots: 5, temp: '15°C' },
            { id: 7, name: '세척실', icon: '🧽', status: '대기중', progress: 15, task: '아침 용기 세척 완료', robots: 2, temp: '60°C' },
            { id: 8, name: '냉장/냉동고', icon: '❄️', status: '정상', progress: 100, task: '식재료 보관 중', robots: 1, temp: '-18°C' }
        ];

        const mealProgress = {
            breakfast: { target: Math.floor(servicePopulation * 0.7), completed: Math.floor(servicePopulation * 0.7), status: '완료' },
            lunch: { target: Math.floor(servicePopulation * 0.95), completed: Math.floor(servicePopulation * 0.95 * (0.6 + Math.random() * 0.3)), status: '진행중' },
            dinner: { target: Math.floor(servicePopulation * 0.85), completed: 0, status: '준비중' }
        };

        const hourlyProduction = [];
        for (let h = 5; h <= 20; h++) {
            let prod = 0;
            if (h < 7) prod = Math.floor(Math.random() * 500 + 200);
            else if (h < 9) prod = Math.floor(Math.random() * 2000 + 3000);
            else if (h < 11) prod = Math.floor(Math.random() * 1000 + 500);
            else if (h < 14) prod = Math.floor(Math.random() * 3000 + 4000);
            else if (h < 17) prod = Math.floor(Math.random() * 800 + 300);
            else prod = Math.floor(Math.random() * 2500 + 2500);
            hourlyProduction.push({ hour: h + '시', 생산량: prod });
        }

        setFacilityData({
            facilityId: 'KIT-' + selectedRegion.toUpperCase() + '-' + String(Math.floor(Math.random() * 9000 + 1000)),
            region: regions.find(r => r.id === selectedRegion)?.name,
            city: selectedCity,
            town: selectedTown,
            servicePopulation: servicePopulation,
            robotCount: robotCount,
            humanStaffCount: humanStaffCount,
            robots: robots,
            staff: staff,
            stations: stations,
            mealProgress: mealProgress,
            hourlyProduction: hourlyProduction,
            facilitySize: Math.floor(servicePopulation * 0.15 + 500),
            dailyCapacity: Math.floor(servicePopulation * 3.2),
            operatingHours: '05:00 - 21:00',
            establishedYear: 2020 + Math.floor(Math.random() * 5),
            certifications: ['HACCP', 'ISO 22000', 'OpenHash 인증']
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">
                    <i className="fas fa-kitchen-set text-yellow-400 mr-2"></i>
                    조리 시설 현황
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    읍면동 단위 조리 시설의 인력, 로봇, 실시간 조리 상황을 확인합니다.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">광역시도</label>
                        <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none">
                            <option value="">선택하세요</option>
                            {regions.map(r => (<option key={r.id} value={r.id}>{r.name}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">시군구</label>
                        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedRegion}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none disabled:opacity-50">
                            <option value="">선택하세요</option>
                            {selectedRegion && citiesByRegion[selectedRegion]?.map(city => (<option key={city} value={city}>{city}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">읍면동</label>
                        <select value={selectedTown} onChange={(e) => setSelectedTown(e.target.value)} disabled={!selectedCity}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none disabled:opacity-50">
                            <option value="">선택하세요</option>
                            {towns.map(town => (<option key={town} value={town}>{town}</option>))}
                        </select>
                    </div>
                </div>
            </div>

            {facilityData && (
                <React.Fragment>
                    <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <div className="text-sm text-yellow-400 font-mono mb-1">{facilityData.facilityId}</div>
                                <h4 className="text-2xl font-bold">🏭 {facilityData.region} {facilityData.city} {facilityData.town} 급식센터</h4>
                                <p className="text-gray-400 mt-1">Layer 1 조리 시설 | {facilityData.facilitySize}㎡ | {facilityData.establishedYear}년 설립</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {facilityData.certifications.map((cert, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                        <i className="fas fa-check-circle mr-1"></i>{cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">👥</div>
                            <div className="text-3xl font-bold text-cyan-400">{facilityData.servicePopulation.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">취사 인구</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">🤖</div>
                            <div className="text-3xl font-bold text-yellow-400">{facilityData.robotCount}</div>
                            <div className="text-sm text-gray-400">조리 로봇</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">👨‍🍳</div>
                            <div className="text-3xl font-bold text-green-400">{facilityData.humanStaffCount}</div>
                            <div className="text-sm text-gray-400">조리 인원</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">🍱</div>
                            <div className="text-3xl font-bold text-purple-400">{facilityData.dailyCapacity.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">일일 생산 능력</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-3xl mb-2">⏰</div>
                            <div className="text-xl font-bold text-orange-400">{facilityData.operatingHours}</div>
                            <div className="text-sm text-gray-400">운영 시간</div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4"><i className="fas fa-fire text-red-400 mr-2 animate-pulse"></i>실시간 조리 현황</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(facilityData.mealProgress).map(([meal, data]) => {
                                const mealNames = { breakfast: '아침', lunch: '점심', dinner: '저녁' };
                                const mealIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };
                                const progress = (data.completed / data.target * 100).toFixed(1);
                                return (
                                    <div key={meal} className={'rounded-xl p-4 border ' + (data.status === '완료' ? 'bg-green-500/10 border-green-500/30' : data.status === '진행중' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-gray-700/50 border-gray-600')}>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl">{mealIcons[meal]}</span>
                                            <span className={'px-2 py-1 rounded-full text-xs ' + (data.status === '완료' ? 'bg-green-500/20 text-green-400' : data.status === '진행중' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400')}>{data.status}</span>
                                        </div>
                                        <div className="font-bold text-lg mb-1">{mealNames[meal]} 식사</div>
                                        <div className="text-sm text-gray-400 mb-2">{data.completed.toLocaleString()} / {data.target.toLocaleString()} 식</div>
                                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div className={'h-full transition-all duration-500 ' + (data.status === '완료' ? 'bg-green-500' : data.status === '진행중' ? 'bg-yellow-500' : 'bg-gray-600')} style={{ width: progress + '%' }}></div>
                                        </div>
                                        <div className="text-right text-xs text-gray-500 mt-1">{progress}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4"><i className="fas fa-grip text-purple-400 mr-2"></i>조리 스테이션 현황</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {facilityData.stations.map(station => (
                                <div key={station.id} onClick={() => setActiveStation(activeStation === station.id ? null : station.id)}
                                    className={'rounded-xl p-4 cursor-pointer transition-all border ' + (station.status === '가동중' ? 'bg-green-500/10 border-green-500/30 hover:border-green-500' : station.status === '대기중' ? 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500' : 'bg-gray-700/50 border-gray-600 hover:border-gray-500') + (activeStation === station.id ? ' ring-2 ring-cyan-500' : '')}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={'text-3xl ' + (station.status === '가동중' ? 'cooking' : '')}>{station.icon}</span>
                                        <span className="text-xs text-gray-400">{station.temp}</span>
                                    </div>
                                    <div className="font-bold text-sm mb-1">{station.name}</div>
                                    <div className="text-xs text-gray-400 mb-2 truncate">{station.task}</div>
                                    {station.progress > 0 && (
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className={'h-full ' + (station.status === '가동중' ? 'bg-green-500' : 'bg-yellow-500')} style={{ width: station.progress + '%' }}></div>
                                        </div>
                                    )}
                                    <div className="flex justify-between mt-2 text-xs">
                                        <span className="text-gray-500">로봇 {station.robots}대</span>
                                        <span className={station.status === '가동중' ? 'text-green-400' : 'text-yellow-400'}>{station.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4"><i className="fas fa-chart-bar text-cyan-400 mr-2"></i>시간대별 생산량</h4>
                        {chartsAvailable ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={facilityData.hourlyProduction}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={12} />
                                        <YAxis stroke="#9CA3AF" fontSize={12} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                        <Bar dataKey="생산량" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (<div className="h-64 flex items-center justify-center bg-gray-700/50 rounded-lg"><p className="text-gray-400">차트 로딩 중...</p></div>)}
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4"><i className="fas fa-robot text-yellow-400 mr-2"></i>조리 로봇 현황 ({facilityData.robots.length}대)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {facilityData.robots.slice(0, 8).map(robot => (
                                <div key={robot.id} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={'text-3xl ' + (robot.status === '가동중' ? 'cooking' : '')}>{robot.icon}</span>
                                        <span className={'px-2 py-1 rounded-full text-xs ' + (robot.status === '가동중' ? 'bg-green-500/20 text-green-400' : robot.status === '대기중' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400')}>{robot.status}</span>
                                    </div>
                                    <div className="font-bold text-sm">{robot.type}</div>
                                    <div className="text-xs text-gray-400 mb-2">{robot.id}</div>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex justify-between"><span className="text-gray-500">효율</span><span className="text-green-400">{robot.efficiency}%</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">오늘 생산</span><span className="text-cyan-400">{robot.todayOutput.toLocaleString()}식</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">마지막 점검</span><span className="text-gray-400">{robot.lastMaintenance}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {facilityData.robots.length > 8 && (<div className="text-center mt-4 text-gray-400 text-sm">+{facilityData.robots.length - 8}대 더 있음</div>)}
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6">
                        <h4 className="font-bold mb-4"><i className="fas fa-users text-green-400 mr-2"></i>조리 인원 현황 ({facilityData.staff.length}명)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-400 border-b border-gray-700">
                                        <th className="pb-3 px-2"></th>
                                        <th className="pb-3 px-2">이름</th>
                                        <th className="pb-3 px-2">직책</th>
                                        <th className="pb-3 px-2">담당 업무</th>
                                        <th className="pb-3 px-2">근무 시간</th>
                                        <th className="pb-3 px-2">경력</th>
                                        <th className="pb-3 px-2">상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facilityData.staff.map(person => (
                                        <tr key={person.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                            <td className="py-3 px-2 text-2xl">{person.icon}</td>
                                            <td className="py-3 px-2 font-medium">{person.name}</td>
                                            <td className="py-3 px-2">{person.role}</td>
                                            <td className="py-3 px-2 text-gray-400 text-xs">{person.responsibility}</td>
                                            <td className="py-3 px-2 text-xs">{person.workingHours}</td>
                                            <td className="py-3 px-2 text-cyan-400">{person.experience}</td>
                                            <td className="py-3 px-2">
                                                <span className={'px-2 py-1 rounded-full text-xs ' + (person.status === '근무중' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400')}>{person.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                        <div className="flex items-center">
                            <i className="fas fa-link text-cyan-400 text-xl mr-3"></i>
                            <div>
                                <div className="font-bold text-cyan-400">OpenHash 실시간 검증</div>
                                <div className="text-sm text-gray-400">모든 조리 데이터가 실시간으로 OpenHash에 기록됩니다. <span className="ml-2 text-cyan-400">마지막 검증: {Math.floor(cookingAnimation / 10)}초 전</span></div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}

            {!facilityData && (
                <div className="bg-gray-800 rounded-xl p-12 text-center">
                    <i className="fas fa-kitchen-set text-6xl text-gray-600 mb-4"></i>
                    <h4 className="text-xl font-bold text-gray-400 mb-2">조리 시설을 선택해주세요</h4>
                    <p className="text-gray-500">광역시도 → 시군구 → 읍면동 순서로 선택하면<br/>해당 지역 조리 시설의 상세 현황을 확인할 수 있습니다.</p>
                </div>
            )}
        </div>
    );
};
