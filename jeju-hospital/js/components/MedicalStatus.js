const MedicalStatus = () => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [lastUpdate, setLastUpdate] = React.useState(new Date());
    
    // 실시간 데이터 시뮬레이션
    const [stats, setStats] = React.useState({
        hospitals: { total: 47, general: 3, specialized: 12, clinics: 32 },
        beds: { total: 2847, available: 423, icu: 89, icuAvailable: 12 },
        doctors: { total: 1247, onDuty: 342, specialists: 623, residents: 198 },
        nurses: { total: 3421, onDuty: 1205 },
        ambulances: { total: 45, available: 38, dispatched: 7 },
        emergencyRooms: { total: 5, accepting: 4, full: 1 }
    });

    // 진료과별 의료진 현황
    const [specialists, setSpecialists] = React.useState([
        { dept: '내과', doctors: 187, onDuty: 52, icon: 'fa-stethoscope', color: 'blue' },
        { dept: '외과', doctors: 134, onDuty: 38, icon: 'fa-scalpel', color: 'red' },
        { dept: '소아청소년과', doctors: 89, onDuty: 24, icon: 'fa-baby', color: 'pink' },
        { dept: '산부인과', doctors: 67, onDuty: 19, icon: 'fa-venus', color: 'purple' },
        { dept: '정형외과', doctors: 78, onDuty: 21, icon: 'fa-bone', color: 'orange' },
        { dept: '신경외과', doctors: 45, onDuty: 12, icon: 'fa-brain', color: 'cyan' },
        { dept: '흉부외과', doctors: 23, onDuty: 6, icon: 'fa-lungs', color: 'teal' },
        { dept: '심장내과', doctors: 34, onDuty: 9, icon: 'fa-heartbeat', color: 'red' },
        { dept: '신경과', doctors: 56, onDuty: 15, icon: 'fa-head-side-brain', color: 'indigo' },
        { dept: '피부과', doctors: 42, onDuty: 11, icon: 'fa-hand-sparkles', color: 'yellow' },
        { dept: '안과', doctors: 38, onDuty: 10, icon: 'fa-eye', color: 'green' },
        { dept: '이비인후과', doctors: 35, onDuty: 9, icon: 'fa-ear-listen', color: 'amber' },
        { dept: '비뇨의학과', doctors: 29, onDuty: 8, icon: 'fa-kidneys', color: 'orange' },
        { dept: '재활의학과', doctors: 31, onDuty: 8, icon: 'fa-wheelchair', color: 'lime' },
        { dept: '마취통증의학과', doctors: 27, onDuty: 12, icon: 'fa-syringe', color: 'gray' },
        { dept: '영상의학과', doctors: 24, onDuty: 7, icon: 'fa-x-ray', color: 'sky' },
        { dept: '응급의학과', doctors: 32, onDuty: 18, icon: 'fa-ambulance', color: 'red' },
        { dept: '가정의학과', doctors: 48, onDuty: 13, icon: 'fa-house-medical', color: 'green' },
        { dept: '정신건강의학과', doctors: 28, onDuty: 7, icon: 'fa-brain', color: 'violet' }
    ]);

    // 의료 장비 현황
    const [equipment, setEquipment] = React.useState({
        imaging: [
            { name: 'MRI (3.0T)', total: 8, operational: 7, inUse: 4, icon: 'fa-magnet' },
            { name: 'MRI (1.5T)', total: 12, operational: 11, inUse: 6, icon: 'fa-magnet' },
            { name: 'CT (128채널 이상)', total: 15, operational: 14, inUse: 8, icon: 'fa-circle-radiation' },
            { name: 'CT (64채널)', total: 22, operational: 21, inUse: 12, icon: 'fa-circle-radiation' },
            { name: 'X-Ray', total: 156, operational: 149, inUse: 67, icon: 'fa-x-ray' },
            { name: 'PET-CT', total: 3, operational: 3, inUse: 2, icon: 'fa-atom' },
            { name: '초음파', total: 234, operational: 228, inUse: 89, icon: 'fa-wave-square' },
            { name: '유방촬영기', total: 28, operational: 27, inUse: 11, icon: 'fa-person-dress' },
            { name: '골밀도측정기', total: 19, operational: 18, inUse: 7, icon: 'fa-bone' },
            { name: '혈관조영기', total: 6, operational: 6, inUse: 3, icon: 'fa-heart-pulse' }
        ],
        surgical: [
            { name: '수술실', total: 67, operational: 64, inUse: 23, icon: 'fa-hospital' },
            { name: '로봇수술기 (다빈치)', total: 2, operational: 2, inUse: 1, icon: 'fa-robot' },
            { name: '내시경수술장비', total: 45, operational: 43, inUse: 18, icon: 'fa-microscope' },
            { name: '레이저수술기', total: 34, operational: 32, inUse: 12, icon: 'fa-radiation' },
            { name: '무영등', total: 134, operational: 130, inUse: 46, icon: 'fa-lightbulb' },
            { name: '마취기', total: 89, operational: 86, inUse: 31, icon: 'fa-mask-ventilator' },
            { name: '인공심폐기', total: 4, operational: 4, inUse: 1, icon: 'fa-heart' },
            { name: '제세동기', total: 178, operational: 172, inUse: 0, icon: 'fa-bolt' }
        ],
        icu: [
            { name: 'ICU 병상', total: 89, operational: 85, inUse: 73, icon: 'fa-bed-pulse' },
            { name: '인공호흡기', total: 134, operational: 128, inUse: 67, icon: 'fa-lungs-virus' },
            { name: 'ECMO', total: 8, operational: 8, inUse: 3, icon: 'fa-droplet' },
            { name: '투석기', total: 67, operational: 64, inUse: 52, icon: 'fa-filter' },
            { name: '환자모니터', total: 456, operational: 448, inUse: 312, icon: 'fa-desktop' },
            { name: '주사펌프', total: 567, operational: 554, inUse: 398, icon: 'fa-syringe' },
            { name: '체온조절장치', total: 34, operational: 32, inUse: 18, icon: 'fa-temperature-half' }
        ]
    });

    // 검사실 현황
    const [labStats, setLabStats] = React.useState({
        bloodTest: {
            facilities: 23,
            operational: 22,
            dailyCapacity: 12000,
            todayProcessed: 4523,
            pending: 234,
            avgWaitTime: 45,
            equipment: [
                { name: '자동혈구분석기', total: 34, operational: 33, icon: 'fa-vial' },
                { name: '생화학분석기', total: 28, operational: 27, icon: 'fa-flask' },
                { name: '혈액응고분석기', total: 19, operational: 18, icon: 'fa-droplet' },
                { name: '면역분석기', total: 21, operational: 20, icon: 'fa-shield-virus' },
                { name: '혈액가스분석기', total: 45, operational: 43, icon: 'fa-wind' },
                { name: '전해질분석기', total: 38, operational: 37, icon: 'fa-bolt' }
            ]
        },
        urineTest: {
            facilities: 19,
            operational: 18,
            dailyCapacity: 5000,
            todayProcessed: 1876,
            pending: 89,
            avgWaitTime: 25,
            equipment: [
                { name: '요자동분석기', total: 24, operational: 23, icon: 'fa-vial-circle-check' },
                { name: '요침사분석기', total: 18, operational: 17, icon: 'fa-microscope' },
                { name: '요화학분석기', total: 22, operational: 21, icon: 'fa-flask-vial' }
            ]
        },
        stoolTest: {
            facilities: 15,
            operational: 14,
            dailyCapacity: 2000,
            todayProcessed: 654,
            pending: 43,
            avgWaitTime: 35,
            equipment: [
                { name: '분변잠혈검사기', total: 18, operational: 17, icon: 'fa-vial' },
                { name: '기생충검사장비', total: 12, operational: 11, icon: 'fa-bug' }
            ]
        },
        pathology: {
            facilities: 8,
            operational: 8,
            dailyCapacity: 800,
            todayProcessed: 312,
            pending: 67,
            avgWaitTime: 180,
            equipment: [
                { name: '조직처리기', total: 12, operational: 12, icon: 'fa-microscope' },
                { name: '마이크로톰', total: 15, operational: 14, icon: 'fa-scissors' },
                { name: '자동염색기', total: 10, operational: 10, icon: 'fa-palette' },
                { name: '동결절편기', total: 6, operational: 6, icon: 'fa-snowflake' }
            ]
        },
        microbiology: {
            facilities: 6,
            operational: 6,
            dailyCapacity: 1500,
            todayProcessed: 567,
            pending: 123,
            avgWaitTime: 120,
            equipment: [
                { name: '자동배양기', total: 14, operational: 13, icon: 'fa-bacteria' },
                { name: '질량분석기', total: 4, operational: 4, icon: 'fa-atom' },
                { name: '항생제감수성검사기', total: 8, operational: 8, icon: 'fa-pills' },
                { name: 'PCR 장비', total: 18, operational: 17, icon: 'fa-dna' }
            ]
        }
    });

    // 병원별 현황
    const [hospitalList, setHospitalList] = React.useState([
        { name: '제주대학교병원', type: '상급종합', beds: 750, available: 67, doctors: 423, er: true, erStatus: 'accepting', trauma: true },
        { name: '제주의료원', type: '종합병원', beds: 450, available: 52, doctors: 187, er: true, erStatus: 'accepting', trauma: false },
        { name: '서귀포의료원', type: '종합병원', beds: 300, available: 38, doctors: 134, er: true, erStatus: 'accepting', trauma: false },
        { name: '한라병원', type: '종합병원', beds: 280, available: 31, doctors: 112, er: true, erStatus: 'full', trauma: false },
        { name: '제주한라병원', type: '종합병원', beds: 250, available: 28, doctors: 98, er: true, erStatus: 'accepting', trauma: false },
        { name: '제주중앙병원', type: '병원', beds: 180, available: 24, doctors: 67, er: false, erStatus: null, trauma: false },
        { name: '삼성여성병원', type: '전문병원', beds: 120, available: 18, doctors: 34, er: false, erStatus: null, trauma: false },
        { name: '제주정형외과', type: '전문병원', beds: 80, available: 12, doctors: 28, er: false, erStatus: null, trauma: false }
    ]);

    // 실시간 업데이트 시뮬레이션
    React.useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdate(new Date());
            
            // 통계 변동
            setStats(prev => ({
                ...prev,
                beds: {
                    ...prev.beds,
                    available: Math.max(300, Math.min(500, prev.beds.available + Math.floor((Math.random() - 0.5) * 10))),
                    icuAvailable: Math.max(5, Math.min(20, prev.beds.icuAvailable + Math.floor((Math.random() - 0.5) * 3)))
                },
                doctors: { ...prev.doctors, onDuty: Math.max(300, Math.min(400, prev.doctors.onDuty + Math.floor((Math.random() - 0.5) * 8))) },
                ambulances: {
                    ...prev.ambulances,
                    available: Math.max(30, Math.min(42, prev.ambulances.available + Math.floor((Math.random() - 0.5) * 3))),
                    dispatched: Math.max(3, Math.min(12, prev.ambulances.dispatched + Math.floor((Math.random() - 0.5) * 2)))
                }
            }));

            // 검사 현황 변동
            setLabStats(prev => ({
                ...prev,
                bloodTest: {
                    ...prev.bloodTest,
                    todayProcessed: prev.bloodTest.todayProcessed + Math.floor(Math.random() * 15),
                    pending: Math.max(100, Math.min(400, prev.bloodTest.pending + Math.floor((Math.random() - 0.5) * 20)))
                },
                urineTest: {
                    ...prev.urineTest,
                    todayProcessed: prev.urineTest.todayProcessed + Math.floor(Math.random() * 8),
                    pending: Math.max(50, Math.min(150, prev.urineTest.pending + Math.floor((Math.random() - 0.5) * 10)))
                }
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (available, total) => {
        const ratio = available / total;
        if (ratio > 0.3) return 'green';
        if (ratio > 0.1) return 'yellow';
        return 'red';
    };

    // 탭 컨텐츠 렌더링
    const renderTabContent = () => {
        switch(activeTab) {
            case 'overview': return <OverviewTab stats={stats} hospitalList={hospitalList} />;
            case 'staff': return <StaffTab specialists={specialists} stats={stats} />;
            case 'equipment': return <EquipmentTab equipment={equipment} />;
            case 'lab': return <LabTab labStats={labStats} />;
            case 'hospitals': return <HospitalsTab hospitalList={hospitalList} />;
            default: return <OverviewTab stats={stats} hospitalList={hospitalList} />;
        }
    };

    // 개요 탭
    const OverviewTab = ({ stats, hospitalList }) => (
        <div className="space-y-6">
            {/* 핵심 지표 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-hospital text-blue-400"></i>
                        <span className="text-xs text-gray-500">의료기관</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.hospitals.total}</p>
                    <p className="text-xs text-gray-400">종합 {stats.hospitals.general} / 전문 {stats.hospitals.specialized}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-bed text-cyan-400"></i>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-${getStatusColor(stats.beds.available, stats.beds.total)}-500/20 text-${getStatusColor(stats.beds.available, stats.beds.total)}-400`}>
                            {Math.round(stats.beds.available / stats.beds.total * 100)}%
                        </span>
                    </div>
                    <p className="text-2xl font-bold">{stats.beds.available}<span className="text-sm text-gray-500">/{stats.beds.total}</span></p>
                    <p className="text-xs text-gray-400">가용 병상</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-bed-pulse text-red-400"></i>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-${getStatusColor(stats.beds.icuAvailable, stats.beds.icu)}-500/20 text-${getStatusColor(stats.beds.icuAvailable, stats.beds.icu)}-400`}>
                            {Math.round(stats.beds.icuAvailable / stats.beds.icu * 100)}%
                        </span>
                    </div>
                    <p className="text-2xl font-bold">{stats.beds.icuAvailable}<span className="text-sm text-gray-500">/{stats.beds.icu}</span></p>
                    <p className="text-xs text-gray-400">가용 중환자실</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-user-md text-green-400"></i>
                        <span className="text-xs text-gray-500">의료진</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.doctors.onDuty}<span className="text-sm text-gray-500">/{stats.doctors.total}</span></p>
                    <p className="text-xs text-gray-400">현재 근무</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-user-nurse text-pink-400"></i>
                        <span className="text-xs text-gray-500">간호사</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.nurses.onDuty.toLocaleString()}<span className="text-sm text-gray-500">/{stats.nurses.total.toLocaleString()}</span></p>
                    <p className="text-xs text-gray-400">현재 근무</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                        <i className="fas fa-ambulance text-orange-400"></i>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400`}>{stats.ambulances.available}대 대기</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.ambulances.dispatched}<span className="text-sm text-gray-500">/{stats.ambulances.total}</span></p>
                    <p className="text-xs text-gray-400">출동 중</p>
                </div>
            </div>

            {/* 응급실 현황 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="font-semibold mb-4 flex items-center">
                    <i className="fas fa-kit-medical text-red-400 mr-2"></i>응급실 현황
                    <span className="ml-auto text-xs text-gray-500">실시간</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {hospitalList.filter(h => h.er).map((hospital, i) => (
                        <div key={i} className={`rounded-lg p-4 border ${hospital.erStatus === 'accepting' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{hospital.name}</span>
                                {hospital.trauma && <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">외상</span>}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={`text-sm ${hospital.erStatus === 'accepting' ? 'text-green-400' : 'text-red-400'}`}>
                                    <i className={`fas fa-circle text-xs mr-1 ${hospital.erStatus === 'accepting' ? 'animate-pulse' : ''}`}></i>
                                    {hospital.erStatus === 'accepting' ? '수용 가능' : '수용 불가'}
                                </span>
                                <span className="text-xs text-gray-400">가용 {hospital.available}병상</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 지역별 분포 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-map-marker-alt text-blue-400 mr-2"></i>권역별 의료기관</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <span>제주시 동부</span>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-400">12개</span>
                                <div className="w-24 h-2 bg-gray-600 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{width: '65%'}}></div></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <span>제주시 서부</span>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-400">18개</span>
                                <div className="w-24 h-2 bg-gray-600 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{width: '85%'}}></div></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <span>서귀포시</span>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-400">10개</span>
                                <div className="w-24 h-2 bg-gray-600 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{width: '50%'}}></div></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <span>기타 읍면</span>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-400">7개</span>
                                <div className="w-24 h-2 bg-gray-600 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{width: '35%'}}></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-chart-pie text-green-400 mr-2"></i>의료기관 유형</h3>
                    <div className="flex items-center justify-center h-48">
                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="20"/>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="251" strokeDashoffset="235"/>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="251" strokeDashoffset="190"/>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="251" strokeDashoffset="80"/>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <p className="text-2xl font-bold">{stats.hospitals.total}</p>
                                <p className="text-xs text-gray-400">전체</p>
                            </div>
                        </div>
                        <div className="ml-6 space-y-2">
                            <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span className="text-sm">상급종합 {stats.hospitals.general}</span></div>
                            <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-green-500 rounded"></div><span className="text-sm">종합병원 {stats.hospitals.specialized}</span></div>
                            <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-amber-500 rounded"></div><span className="text-sm">병의원 {stats.hospitals.clinics}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 의료진 탭
    const StaffTab = ({ specialists, stats }) => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-4 border border-blue-500/30">
                    <p className="text-sm text-blue-300">전체 의사</p>
                    <p className="text-3xl font-bold text-blue-400">{stats.doctors.total.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-4 border border-green-500/30">
                    <p className="text-sm text-green-300">전문의</p>
                    <p className="text-3xl font-bold text-green-400">{stats.doctors.specialists}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-sm text-purple-300">전공의</p>
                    <p className="text-3xl font-bold text-purple-400">{stats.doctors.residents}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 rounded-xl p-4 border border-pink-500/30">
                    <p className="text-sm text-pink-300">간호사</p>
                    <p className="text-3xl font-bold text-pink-400">{stats.nurses.total.toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="font-semibold mb-4">진료과별 의료진 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {specialists.map((spec, i) => (
                        <div key={i} className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-all">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className={`w-8 h-8 rounded-lg bg-${spec.color}-500/20 flex items-center justify-center`}>
                                    <i className={`fas ${spec.icon} text-${spec.color}-400 text-sm`}></i>
                                </div>
                                <span className="font-medium text-sm">{spec.dept}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">전체 {spec.doctors}명</span>
                                <span className="text-green-400"><i className="fas fa-circle text-xs mr-1 animate-pulse"></i>{spec.onDuty}명 근무</span>
                            </div>
                            <div className="mt-2 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                                <div className={`h-full bg-${spec.color}-500 rounded-full`} style={{width: `${(spec.onDuty / spec.doctors) * 100}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 장비 탭
    const EquipmentTab = ({ equipment }) => (
        <div className="space-y-6">
            {/* 영상진단 장비 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-x-ray text-cyan-400 mr-2"></i>영상진단 장비</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                    {equipment.imaging.map((eq, i) => (
                        <div key={i} className="bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <i className={`fas ${eq.icon} text-cyan-400`}></i>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${eq.operational === eq.total ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {eq.operational}/{eq.total}
                                </span>
                            </div>
                            <p className="text-sm font-medium mb-1">{eq.name}</p>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">가동</span>
                                <span className="text-blue-400">{eq.inUse}대 사용중</span>
                            </div>
                            <div className="mt-2 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500 rounded-full" style={{width: `${(eq.inUse / eq.operational) * 100}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 수술/시술 장비 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-syringe text-red-400 mr-2"></i>수술/시술 장비</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {equipment.surgical.map((eq, i) => (
                        <div key={i} className="bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <i className={`fas ${eq.icon} text-red-400`}></i>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${eq.operational === eq.total ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {eq.operational}/{eq.total}
                                </span>
                            </div>
                            <p className="text-sm font-medium mb-1">{eq.name}</p>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">가동</span>
                                <span className="text-orange-400">{eq.inUse}대 사용중</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 중환자실 장비 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-bed-pulse text-purple-400 mr-2"></i>중환자실/생명유지 장비</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {equipment.icu.map((eq, i) => (
                        <div key={i} className="bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <i className={`fas ${eq.icon} text-purple-400`}></i>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${(eq.inUse / eq.operational) < 0.8 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {Math.round((eq.inUse / eq.operational) * 100)}%
                                </span>
                            </div>
                            <p className="text-sm font-medium mb-1">{eq.name}</p>
                            <p className="text-xs text-gray-400">{eq.inUse}/{eq.operational} 사용중</p>
                            <div className="mt-2 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${(eq.inUse / eq.operational) < 0.8 ? 'bg-purple-500' : 'bg-red-500'}`} style={{width: `${(eq.inUse / eq.operational) * 100}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // 검사실 탭
    const LabTab = ({ labStats }) => (
        <div className="space-y-6">
            {/* 검사 현황 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                    { key: 'bloodTest', name: '혈액검사', icon: 'fa-vial', color: 'red' },
                    { key: 'urineTest', name: '소변검사', icon: 'fa-flask', color: 'yellow' },
                    { key: 'stoolTest', name: '대변검사', icon: 'fa-vial-circle-check', color: 'amber' },
                    { key: 'pathology', name: '병리검사', icon: 'fa-microscope', color: 'purple' },
                    { key: 'microbiology', name: '미생물검사', icon: 'fa-bacteria', color: 'green' }
                ].map((lab, i) => (
                    <div key={i} className={`bg-gradient-to-br from-${lab.color}-900/30 to-gray-800 rounded-xl p-4 border border-${lab.color}-500/30`}>
                        <div className="flex items-center space-x-2 mb-3">
                            <i className={`fas ${lab.icon} text-${lab.color}-400`}></i>
                            <span className="font-medium text-sm">{lab.name}</span>
                        </div>
                        <p className="text-2xl font-bold">{labStats[lab.key].todayProcessed.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">오늘 처리 / 대기 {labStats[lab.key].pending}건</p>
                        <div className="mt-2 flex items-center text-xs">
                            <i className="fas fa-clock text-gray-500 mr-1"></i>
                            <span className="text-gray-400">평균 {labStats[lab.key].avgWaitTime}분</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 혈액검사 상세 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="font-semibold mb-4 flex items-center">
                    <i className="fas fa-tint text-red-400 mr-2"></i>혈액검사 시설 및 장비
                    <span className="ml-auto text-sm text-gray-400">{labStats.bloodTest.facilities}개 시설</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {labStats.bloodTest.equipment.map((eq, i) => (
                        <div key={i} className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                    <i className={`fas ${eq.icon} text-red-400`}></i>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{eq.name}</p>
                                    <p className="text-xs text-gray-400">가동 {eq.operational}/{eq.total}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${eq.operational === eq.total ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {Math.round((eq.operational / eq.total) * 100)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 소변/대변 검사 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center">
                        <i className="fas fa-flask text-yellow-400 mr-2"></i>소변검사 장비
                    </h3>
                    <div className="space-y-3">
                        {labStats.urineTest.equipment.map((eq, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${eq.icon} text-yellow-400`}></i>
                                    <span className="text-sm">{eq.name}</span>
                                </div>
                                <span className="text-sm text-gray-400">{eq.operational}/{eq.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center">
                        <i className="fas fa-vial-circle-check text-amber-400 mr-2"></i>대변검사 장비
                    </h3>
                    <div className="space-y-3">
                        {labStats.stoolTest.equipment.map((eq, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${eq.icon} text-amber-400`}></i>
                                    <span className="text-sm">{eq.name}</span>
                                </div>
                                <span className="text-sm text-gray-400">{eq.operational}/{eq.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 병리/미생물 검사 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center">
                        <i className="fas fa-microscope text-purple-400 mr-2"></i>병리검사 장비
                    </h3>
                    <div className="space-y-3">
                        {labStats.pathology.equipment.map((eq, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${eq.icon} text-purple-400`}></i>
                                    <span className="text-sm">{eq.name}</span>
                                </div>
                                <span className="text-sm text-gray-400">{eq.operational}/{eq.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                    <h3 className="font-semibold mb-4 flex items-center">
                        <i className="fas fa-bacteria text-green-400 mr-2"></i>미생물검사 장비
                    </h3>
                    <div className="space-y-3">
                        {labStats.microbiology.equipment.map((eq, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${eq.icon} text-green-400`}></i>
                                    <span className="text-sm">{eq.name}</span>
                                </div>
                                <span className="text-sm text-gray-400">{eq.operational}/{eq.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // 병원 목록 탭
    const HospitalsTab = ({ hospitalList }) => (
        <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">병원명</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">유형</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">병상</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">가용</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">의료진</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">응급실</th>
                            <th className="px-4 py-3 text-center text-sm font-medium">외상센터</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {hospitalList.map((h, i) => (
                            <tr key={i} className="hover:bg-gray-700/30">
                                <td className="px-4 py-3 font-medium">{h.name}</td>
                                <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${h.type === '상급종합' ? 'bg-blue-500/20 text-blue-400' : h.type === '종합병원' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{h.type}</span></td>
                                <td className="px-4 py-3 text-center">{h.beds}</td>
                                <td className="px-4 py-3 text-center"><span className={getStatusColor(h.available, h.beds) === 'green' ? 'text-green-400' : getStatusColor(h.available, h.beds) === 'yellow' ? 'text-yellow-400' : 'text-red-400'}>{h.available}</span></td>
                                <td className="px-4 py-3 text-center">{h.doctors}</td>
                                <td className="px-4 py-3 text-center">{h.er ? <span className={`${h.erStatus === 'accepting' ? 'text-green-400' : 'text-red-400'}`}><i className="fas fa-circle text-xs"></i></span> : <span className="text-gray-500">-</span>}</td>
                                <td className="px-4 py-3 text-center">{h.trauma ? <i className="fas fa-check text-purple-400"></i> : <span className="text-gray-500">-</span>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <i className="fas fa-chart-line text-blue-400 mr-3"></i>제주 의료 현황
                    </h1>
                    <p className="text-gray-400 mt-1">제주도 전체 의료 인프라 실시간 모니터링</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <i className="fas fa-sync-alt animate-spin text-green-400"></i>
                    <span>마지막 업데이트: {lastUpdate.toLocaleTimeString()}</span>
                </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex space-x-2 border-b border-gray-700 pb-2">
                {[
                    { id: 'overview', label: '개요', icon: 'fa-home' },
                    { id: 'staff', label: '의료진', icon: 'fa-user-md' },
                    { id: 'equipment', label: '의료장비', icon: 'fa-x-ray' },
                    { id: 'lab', label: '검사시설', icon: 'fa-flask' },
                    { id: 'hospitals', label: '병원목록', icon: 'fa-hospital' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-t-lg flex items-center space-x-2 transition-all ${activeTab === tab.id ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            {renderTabContent()}
        </div>
    );
};
