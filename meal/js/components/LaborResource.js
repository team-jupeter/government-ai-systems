const LaborResource = () => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedFacility, setSelectedFacility] = React.useState(null);
    const [selectedWorker, setSelectedWorker] = React.useState(null);
    const [animationTick, setAnimationTick] = React.useState(0);

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } = RechartsLib;
    const chartsAvailable = BarChart && ResponsiveContainer;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setAnimationTick(prev => (prev + 1) % 100);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // 업종별 시설 및 노동자 데이터
    const facilityCategories = [
        {
            id: 'cooking',
            name: '조리 시설',
            icon: '🍳',
            color: 'cyan',
            totalFacilities: 3521,
            totalWorkers: 45280,
            avgWorkers: 12.9,
            facilities: [
                { id: 'KIT-001', name: '서울 강남구 역삼1동 급식센터', region: '서울', workers: 15, capacity: 18, productivity: 96, quality: 98 },
                { id: 'KIT-002', name: '서울 송파구 잠실3동 급식센터', region: '서울', workers: 14, capacity: 16, productivity: 92, quality: 94 },
                { id: 'KIT-003', name: '경기 성남시 분당1동 급식센터', region: '경기', workers: 12, capacity: 14, productivity: 88, quality: 90 },
                { id: 'KIT-004', name: '부산 해운대구 우동 급식센터', region: '부산', workers: 11, capacity: 15, productivity: 78, quality: 82 },
                { id: 'KIT-005', name: '대구 수성구 범어동 급식센터', region: '대구', workers: 10, capacity: 14, productivity: 72, quality: 75 }
            ]
        },
        {
            id: 'storage',
            name: '저장 시설',
            icon: '🏭',
            color: 'purple',
            totalFacilities: 892,
            totalWorkers: 12450,
            avgWorkers: 14.0,
            facilities: [
                { id: 'STR-001', name: '경기 화성 냉동물류센터', region: '경기', workers: 28, capacity: 32, productivity: 95, quality: 97 },
                { id: 'STR-002', name: '충남 천안 곡물저장창고', region: '충남', workers: 18, capacity: 20, productivity: 90, quality: 92 },
                { id: 'STR-003', name: '전남 나주 농산물집하장', region: '전남', workers: 15, capacity: 18, productivity: 85, quality: 88 },
                { id: 'STR-004', name: '경북 안동 축산물냉동고', region: '경북', workers: 12, capacity: 15, productivity: 78, quality: 80 }
            ]
        },
        {
            id: 'agriculture',
            name: '농업 시설',
            icon: '🌾',
            color: 'green',
            totalFacilities: 28450,
            totalWorkers: 385200,
            avgWorkers: 13.5,
            facilities: [
                { id: 'AGR-001', name: '전남 해남 스마트팜', region: '전남', workers: 45, capacity: 50, productivity: 98, quality: 96 },
                { id: 'AGR-002', name: '강원 평창 배추농장', region: '강원', workers: 38, capacity: 42, productivity: 92, quality: 94 },
                { id: 'AGR-003', name: '전북 김제 미곡종합센터', region: '전북', workers: 52, capacity: 55, productivity: 88, quality: 90 },
                { id: 'AGR-004', name: '경남 함안 양파재배단지', region: '경남', workers: 32, capacity: 38, productivity: 85, quality: 88 }
            ]
        },
        {
            id: 'fishery',
            name: '수산업 시설',
            icon: '🐟',
            color: 'blue',
            totalFacilities: 4820,
            totalWorkers: 89500,
            avgWorkers: 18.6,
            facilities: [
                { id: 'FSH-001', name: '완도 김양식장', region: '전남', workers: 85, capacity: 90, productivity: 96, quality: 98 },
                { id: 'FSH-002', name: '통영 굴양식장', region: '경남', workers: 72, capacity: 80, productivity: 92, quality: 95 },
                { id: 'FSH-003', name: '제주 광어양식장', region: '제주', workers: 45, capacity: 50, productivity: 88, quality: 90 },
                { id: 'FSH-004', name: '부산 기장 멸치어장', region: '부산', workers: 38, capacity: 45, productivity: 82, quality: 85 }
            ]
        },
        {
            id: 'livestock',
            name: '축산업 시설',
            icon: '🐄',
            color: 'yellow',
            totalFacilities: 18920,
            totalWorkers: 156800,
            avgWorkers: 8.3,
            facilities: [
                { id: 'LVS-001', name: '경북 안동 한우농장', region: '경북', workers: 25, capacity: 28, productivity: 94, quality: 97 },
                { id: 'LVS-002', name: '충남 홍성 양돈농장', region: '충남', workers: 32, capacity: 35, productivity: 90, quality: 92 },
                { id: 'LVS-003', name: '경기 이천 양계농장', region: '경기', workers: 18, capacity: 20, productivity: 95, quality: 93 },
                { id: 'LVS-004', name: '제주 목장 낙농시설', region: '제주', workers: 22, capacity: 25, productivity: 88, quality: 90 }
            ]
        }
    ];

    // 노동자 상세 데이터 생성
    const generateWorkers = (facility) => {
        const roles = {
            cooking: ['조리장', '부조리장', '조리원', '위생관리사', '영양사', '식재료관리사', '배송담당', '세척담당'],
            storage: ['창고관리자', '물류담당', '입출고담당', '재고관리사', '온도관리사', '포장담당', '운반기사', '품질검사원'],
            agriculture: ['농장장', '재배관리사', '수확담당', '선별담당', '포장담당', '관개담당', '비료관리사', '병충해관리사'],
            fishery: ['양식장장', '사육관리사', '먹이담당', '수질관리사', '수확담당', '선별담당', '포장담당', '출하담당'],
            livestock: ['농장장', '사육관리사', '사료담당', '위생관리사', '번식관리사', '출하담당', '수의보조', '시설관리사']
        };
        
        const names = ['김영호', '이미경', '박준혁', '최수연', '정민우', '한지원', '강서준', '윤하늘', '조민서', '신예진', 
                       '오승우', '장다은', '임현우', '권소희', '홍길동', '백승현', '류지아', '송민재', '나윤서', '문정훈',
                       '안서연', '황도윤', '전지호', '고은비', '서준영', '배하린', '노시우', '하예원', '추성민', '진수아'];
        
        const categoryRoles = roles[facility.id.split('-')[0].toLowerCase()] || roles.cooking;
        const workers = [];
        
        for (let i = 0; i < facility.workers; i++) {
            const performance = Math.floor(Math.random() * 35 + 65);
            const attendance = Math.floor(Math.random() * 15 + 85);
            const skill = Math.floor(Math.random() * 30 + 70);
            const teamwork = Math.floor(Math.random() * 25 + 75);
            const totalScore = ((performance + attendance + skill + teamwork) / 4).toFixed(1);
            
            workers.push({
                id: 'WKR-' + String(Math.floor(Math.random() * 90000 + 10000)),
                name: names[i % names.length],
                role: categoryRoles[i % categoryRoles.length],
                age: Math.floor(Math.random() * 35 + 25),
                tenure: Math.floor(Math.random() * 15 + 1) + '년',
                scores: {
                    performance: performance,
                    attendance: attendance,
                    skill: skill,
                    teamwork: teamwork
                },
                totalScore: parseFloat(totalScore),
                grade: totalScore >= 90 ? 'S' : totalScore >= 80 ? 'A' : totalScore >= 70 ? 'B' : totalScore >= 60 ? 'C' : 'D',
                status: Math.random() > 0.1 ? '근무중' : (Math.random() > 0.5 ? '휴가' : '교육'),
                checkIn: '0' + Math.floor(Math.random() * 3 + 6) + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
                checkOut: String(Math.floor(Math.random() * 3 + 17)) + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
                todayTasks: Math.floor(Math.random() * 5 + 8),
                completedTasks: Math.floor(Math.random() * 5 + 5),
                warnings: Math.floor(Math.random() * 3),
                bonus: Math.floor(Math.random() * 50) * 10000
            });
        }
        
        return workers.sort((a, b) => b.totalScore - a.totalScore);
    };

    const getGradeStyle = (grade) => {
        const styles = {
            'S': 'text-purple-400 bg-purple-500/20 border-purple-500/50',
            'A': 'text-green-400 bg-green-500/20 border-green-500/50',
            'B': 'text-cyan-400 bg-cyan-500/20 border-cyan-500/50',
            'C': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50',
            'D': 'text-red-400 bg-red-500/20 border-red-500/50'
        };
        return styles[grade] || styles['C'];
    };

    // 총 통계
    const totalStats = {
        totalFacilities: facilityCategories.reduce((sum, cat) => sum + cat.totalFacilities, 0),
        totalWorkers: facilityCategories.reduce((sum, cat) => sum + cat.totalWorkers, 0),
        avgProductivity: 89.2,
        avgQuality: 91.5
    };

    // 지역별 노동력 분포
    const regionalDistribution = [
        { region: '경기도', workers: 152000, color: '#22d3ee' },
        { region: '전라남도', workers: 98500, color: '#10b981' },
        { region: '경상북도', workers: 87200, color: '#f59e0b' },
        { region: '충청남도', workers: 76800, color: '#8b5cf6' },
        { region: '경상남도', workers: 72400, color: '#ec4899' },
        { region: '전라북도', workers: 65200, color: '#ef4444' },
        { region: '강원도', workers: 48500, color: '#06b6d4' },
        { region: '기타', workers: 88630, color: '#6b7280' }
    ];

    const COLORS = ['#22d3ee', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444', '#06b6d4', '#6b7280'];

    return (
        <div className="space-y-6">
            {/* 노동자 상세 모달 */}
            {selectedWorker && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 rounded-2xl max-w-2xl w-full border border-cyan-500/30 max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                        👤
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedWorker.name}</h3>
                                        <p className="text-cyan-100">{selectedWorker.role} | {selectedWorker.id}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedWorker(null)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* 기본 정보 */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-800 rounded-xl p-4 text-center">
                                    <div className="text-gray-400 text-sm">나이</div>
                                    <div className="text-xl font-bold">{selectedWorker.age}세</div>
                                </div>
                                <div className="bg-gray-800 rounded-xl p-4 text-center">
                                    <div className="text-gray-400 text-sm">근속</div>
                                    <div className="text-xl font-bold text-cyan-400">{selectedWorker.tenure}</div>
                                </div>
                                <div className="bg-gray-800 rounded-xl p-4 text-center">
                                    <div className="text-gray-400 text-sm">출근</div>
                                    <div className="text-xl font-bold text-green-400">{selectedWorker.checkIn}</div>
                                </div>
                                <div className="bg-gray-800 rounded-xl p-4 text-center">
                                    <div className="text-gray-400 text-sm">퇴근</div>
                                    <div className="text-xl font-bold text-yellow-400">{selectedWorker.checkOut}</div>
                                </div>
                            </div>

                            {/* 종합 평점 */}
                            <div className="bg-gray-800 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold">인사 고과 평점</h4>
                                    <div className={'px-4 py-2 rounded-xl text-2xl font-bold border ' + getGradeStyle(selectedWorker.grade)}>
                                        {selectedWorker.grade}등급 ({selectedWorker.totalScore}점)
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(selectedWorker.scores).map(([key, value]) => {
                                        const labels = { performance: '업무성과', attendance: '출근율', skill: '숙련도', teamwork: '협동심' };
                                        return (
                                            <div key={key}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-400">{labels[key]}</span>
                                                    <span className={value >= 85 ? 'text-green-400' : value >= 70 ? 'text-yellow-400' : 'text-red-400'}>{value}점</span>
                                                </div>
                                                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                                    <div className={'h-full ' + (value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-yellow-500' : 'bg-red-500')} style={{ width: value + '%' }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 오늘 업무 */}
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h4 className="font-bold mb-4">오늘 업무 현황</h4>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-cyan-400">{selectedWorker.todayTasks}</div>
                                        <div className="text-sm text-gray-400">배정 업무</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-green-400">{selectedWorker.completedTasks}</div>
                                        <div className="text-sm text-gray-400">완료</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-yellow-400">{selectedWorker.todayTasks - selectedWorker.completedTasks}</div>
                                        <div className="text-sm text-gray-400">진행중</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500" style={{ width: (selectedWorker.completedTasks / selectedWorker.todayTasks * 100) + '%' }}></div>
                                    </div>
                                    <div className="text-right text-sm text-gray-400 mt-1">
                                        {(selectedWorker.completedTasks / selectedWorker.todayTasks * 100).toFixed(0)}% 완료
                                    </div>
                                </div>
                            </div>

                            {/* 추가 정보 */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                                    <div className="text-yellow-400 font-bold mb-1">경고 횟수</div>
                                    <div className="text-2xl font-bold">{selectedWorker.warnings}회</div>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                                    <div className="text-green-400 font-bold mb-1">이번달 성과급</div>
                                    <div className="text-2xl font-bold">{selectedWorker.bonus.toLocaleString()}원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold">
                            <i className="fas fa-users-cog text-blue-400 mr-2"></i>
                            노동 자원 배정
                        </h3>
                        <p className="text-gray-400 mt-1">시설별 인력 배치 및 개인별 업무 성과 관리</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-green-400 text-sm">실시간 근태 모니터링</span>
                    </div>
                </div>
            </div>

            {/* 전체 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🏭</div>
                    <div className="text-2xl font-bold text-cyan-400">{totalStats.totalFacilities.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">총 시설 수</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <div className="text-2xl font-bold text-green-400">{totalStats.totalWorkers.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">총 노동 인력</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="text-2xl font-bold text-purple-400">{totalStats.avgProductivity}%</div>
                    <div className="text-sm text-gray-400">평균 생산성</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-yellow-400">{totalStats.avgQuality}%</div>
                    <div className="text-sm text-gray-400">평균 품질</div>
                </div>
            </div>

            {/* 업종별 노동력 현황 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-chart-pie text-purple-400 mr-2"></i>
                    업종별 노동력 분포
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 차트 */}
                    <div>
                        {chartsAvailable ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={facilityCategories.map(cat => ({ name: cat.name, value: cat.totalWorkers }))}
                                            cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                                            {facilityCategories.map((entry, index) => (
                                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                            formatter={(value) => [value.toLocaleString() + '명', '인원']} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-64 flex items-center justify-center bg-gray-700/50 rounded-lg">
                                <p className="text-gray-400">차트 로딩 중...</p>
                            </div>
                        )}
                    </div>
                    {/* 범례 */}
                    <div className="space-y-3">
                        {facilityCategories.map((cat, idx) => (
                            <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
                                onClick={() => setActiveTab(cat.id)}>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{cat.icon}</span>
                                    <div>
                                        <div className="font-medium">{cat.name}</div>
                                        <div className="text-xs text-gray-400">{cat.totalFacilities.toLocaleString()}개 시설</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold" style={{ color: COLORS[idx] }}>{cat.totalWorkers.toLocaleString()}</div>
                                    <div className="text-xs text-gray-400">평균 {cat.avgWorkers}명/시설</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 지역별 노동력 분포 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-map-marked-alt text-green-400 mr-2"></i>
                    지역별 노동력 분포
                </h4>
                {chartsAvailable ? (
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={regionalDistribution} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" stroke="#9CA3AF" tickFormatter={(v) => (v / 1000) + 'k'} />
                                <YAxis dataKey="region" type="category" stroke="#9CA3AF" width={80} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [value.toLocaleString() + '명', '인원']} />
                                <Bar dataKey="workers" radius={[0, 4, 4, 0]}>
                                    {regionalDistribution.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center bg-gray-700/50 rounded-lg">
                        <p className="text-gray-400">차트 로딩 중...</p>
                    </div>
                )}
            </div>

            {/* 업종별 탭 */}
            <div className="flex flex-wrap gap-2 bg-gray-800 rounded-xl p-2">
                {facilityCategories.map(cat => (
                    <button key={cat.id} onClick={() => { setActiveTab(cat.id); setSelectedFacility(null); }}
                        className={'flex-1 min-w-[100px] py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 ' + 
                            (activeTab === cat.id ? 'bg-' + cat.color + '-500 text-white' : 'text-gray-400 hover:bg-gray-700')}>
                        <span className="text-xl">{cat.icon}</span>
                        <span className="font-medium text-sm hidden md:inline">{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* 선택된 업종의 시설 목록 */}
            {facilityCategories.filter(cat => cat.id === activeTab).map(category => (
                <div key={category.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-bold text-lg">
                            <span className="text-2xl mr-2">{category.icon}</span>
                            {category.name} 시설 현황
                        </h4>
                        <div className="text-sm text-gray-400">
                            총 {category.totalFacilities.toLocaleString()}개 시설 | {category.totalWorkers.toLocaleString()}명 근무
                        </div>
                    </div>

                    {/* 시설 카드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.facilities.map(facility => (
                            <div key={facility.id} 
                                className={'bg-gray-800 rounded-xl p-4 border cursor-pointer transition-all ' + 
                                    (selectedFacility?.id === facility.id ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-gray-700 hover:border-gray-600')}
                                onClick={() => setSelectedFacility(selectedFacility?.id === facility.id ? null : facility)}>
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <div className="text-xs text-gray-400 font-mono">{facility.id}</div>
                                        <div className="font-bold">{facility.name}</div>
                                    </div>
                                    <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">{facility.region}</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    <div>
                                        <div className="text-xl font-bold text-cyan-400">{facility.workers}</div>
                                        <div className="text-xs text-gray-400">현원</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-gray-400">{facility.capacity}</div>
                                        <div className="text-xs text-gray-400">정원</div>
                                    </div>
                                    <div>
                                        <div className={'text-xl font-bold ' + (facility.productivity >= 90 ? 'text-green-400' : facility.productivity >= 80 ? 'text-yellow-400' : 'text-red-400')}>
                                            {facility.productivity}%
                                        </div>
                                        <div className="text-xs text-gray-400">생산성</div>
                                    </div>
                                    <div>
                                        <div className={'text-xl font-bold ' + (facility.quality >= 90 ? 'text-green-400' : facility.quality >= 80 ? 'text-yellow-400' : 'text-red-400')}>
                                            {facility.quality}%
                                        </div>
                                        <div className="text-xs text-gray-400">품질</div>
                                    </div>
                                </div>
                                {/* 충원율 바 */}
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">충원율</span>
                                        <span className={(facility.workers / facility.capacity >= 0.9) ? 'text-green-400' : 'text-yellow-400'}>
                                            {(facility.workers / facility.capacity * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div className={(facility.workers / facility.capacity >= 0.9) ? 'h-full bg-green-500' : 'h-full bg-yellow-500'}
                                            style={{ width: (facility.workers / facility.capacity * 100) + '%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 선택된 시설의 노동자 목록 */}
                    {selectedFacility && (
                        <div className="bg-gray-800 rounded-xl p-6 border border-cyan-500/30">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="font-bold">
                                    <i className="fas fa-users text-cyan-400 mr-2"></i>
                                    {selectedFacility.name} 근무자 ({selectedFacility.workers}명)
                                </h5>
                                <button onClick={() => setSelectedFacility(null)} className="text-gray-400 hover:text-white">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-gray-400 border-b border-gray-700">
                                            <th className="pb-3 px-2">ID</th>
                                            <th className="pb-3 px-2">이름</th>
                                            <th className="pb-3 px-2">직무</th>
                                            <th className="pb-3 px-2">출근</th>
                                            <th className="pb-3 px-2">성과</th>
                                            <th className="pb-3 px-2">출근율</th>
                                            <th className="pb-3 px-2">숙련도</th>
                                            <th className="pb-3 px-2">협동</th>
                                            <th className="pb-3 px-2">종합</th>
                                            <th className="pb-3 px-2">등급</th>
                                            <th className="pb-3 px-2">상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generateWorkers(selectedFacility).map(worker => (
                                            <tr key={worker.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 cursor-pointer"
                                                onClick={() => setSelectedWorker(worker)}>
                                                <td className="py-3 px-2 font-mono text-xs text-gray-400">{worker.id}</td>
                                                <td className="py-3 px-2 font-medium">{worker.name}</td>
                                                <td className="py-3 px-2 text-gray-400">{worker.role}</td>
                                                <td className="py-3 px-2 text-green-400">{worker.checkIn}</td>
                                                <td className="py-3 px-2">
                                                    <span className={worker.scores.performance >= 85 ? 'text-green-400' : worker.scores.performance >= 70 ? 'text-yellow-400' : 'text-red-400'}>
                                                        {worker.scores.performance}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={worker.scores.attendance >= 95 ? 'text-green-400' : worker.scores.attendance >= 85 ? 'text-yellow-400' : 'text-red-400'}>
                                                        {worker.scores.attendance}%
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={worker.scores.skill >= 85 ? 'text-green-400' : worker.scores.skill >= 70 ? 'text-yellow-400' : 'text-red-400'}>
                                                        {worker.scores.skill}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={worker.scores.teamwork >= 85 ? 'text-green-400' : worker.scores.teamwork >= 70 ? 'text-yellow-400' : 'text-red-400'}>
                                                        {worker.scores.teamwork}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 font-bold">{worker.totalScore}</td>
                                                <td className="py-3 px-2">
                                                    <span className={'px-2 py-1 rounded text-xs font-bold ' + getGradeStyle(worker.grade)}>{worker.grade}</span>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <span className={'px-2 py-1 rounded-full text-xs ' + 
                                                        (worker.status === '근무중' ? 'bg-green-500/20 text-green-400' : 
                                                         worker.status === '휴가' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400')}>
                                                        {worker.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* 인사 고과 기준 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-clipboard-list text-yellow-400 mr-2"></i>
                    인사 고과 평가 기준
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                        <div className="text-cyan-400 font-bold mb-2">📊 업무 성과 (25%)</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• 일일 생산량 달성률</li>
                            <li>• 품질 검사 합격률</li>
                            <li>• 목표 대비 실적</li>
                        </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <div className="text-green-400 font-bold mb-2">⏰ 출근율 (25%)</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• 정시 출근 횟수</li>
                            <li>• 결근/조퇴 횟수</li>
                            <li>• 초과근무 기여도</li>
                        </ul>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                        <div className="text-purple-400 font-bold mb-2">🎯 숙련도 (25%)</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• 업무 처리 속도</li>
                            <li>• 오류/실수 발생률</li>
                            <li>• 자격증/교육 이수</li>
                        </ul>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                        <div className="text-yellow-400 font-bold mb-2">🤝 협동심 (25%)</div>
                        <ul className="text-xs text-gray-400 space-y-1">
                            <li>• 팀 프로젝트 기여도</li>
                            <li>• 동료 평가 점수</li>
                            <li>• 갈등 해결 능력</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-lg text-sm bg-purple-500/20 text-purple-400 border border-purple-500/50">S등급: 90점+ (최우수)</span>
                    <span className="px-3 py-1 rounded-lg text-sm bg-green-500/20 text-green-400 border border-green-500/50">A등급: 80-89점 (우수)</span>
                    <span className="px-3 py-1 rounded-lg text-sm bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">B등급: 70-79점 (양호)</span>
                    <span className="px-3 py-1 rounded-lg text-sm bg-yellow-500/20 text-yellow-400 border border-yellow-500/50">C등급: 60-69점 (보통)</span>
                    <span className="px-3 py-1 rounded-lg text-sm bg-red-500/20 text-red-400 border border-red-500/50">D등급: 60점 미만 (개선필요)</span>
                </div>
            </div>

            {/* OpenHash 검증 */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <i className="fas fa-link text-cyan-400 text-xl mr-3"></i>
                        <div>
                            <div className="font-bold text-cyan-400">OpenHash 근태 기록</div>
                            <div className="text-sm text-gray-400">모든 출퇴근 및 업무 기록이 위변조 불가능하게 저장됩니다</div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        마지막 동기화: {animationTick % 10}초 전
                    </div>
                </div>
            </div>
        </div>
    );
};
