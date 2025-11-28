const Appointment = ({ patientId }) => {
    const [selectedFacility, setSelectedFacility] = React.useState(null);
    const [selectedDept, setSelectedDept] = React.useState(null);
    const [viewMode, setViewMode] = React.useState('overview');
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 의료시설 데이터
    const facilities = [
        {
            id: 'jeju-univ',
            name: '제주대학교병원',
            type: '상급종합병원',
            color: 'blue',
            departments: [
                { id: 'int', name: '내과', doctors: 28, todayTotal: 156, todayCompleted: 89, waiting: 12, avgWait: 25 },
                { id: 'sur', name: '외과', doctors: 18, todayTotal: 78, todayCompleted: 52, waiting: 8, avgWait: 20 },
                { id: 'ped', name: '소아청소년과', doctors: 12, todayTotal: 92, todayCompleted: 61, waiting: 15, avgWait: 30 },
                { id: 'obgy', name: '산부인과', doctors: 10, todayTotal: 64, todayCompleted: 45, waiting: 6, avgWait: 18 },
                { id: 'ortho', name: '정형외과', doctors: 14, todayTotal: 112, todayCompleted: 78, waiting: 18, avgWait: 35 },
                { id: 'neuro', name: '신경외과', doctors: 8, todayTotal: 45, todayCompleted: 32, waiting: 5, avgWait: 22 },
                { id: 'card', name: '심장내과', doctors: 10, todayTotal: 68, todayCompleted: 48, waiting: 9, avgWait: 28 },
                { id: 'uro', name: '비뇨의학과', doctors: 6, todayTotal: 52, todayCompleted: 38, waiting: 7, avgWait: 20 },
                { id: 'derm', name: '피부과', doctors: 5, todayTotal: 86, todayCompleted: 62, waiting: 14, avgWait: 32 },
                { id: 'ent', name: '이비인후과', doctors: 6, todayTotal: 74, todayCompleted: 51, waiting: 11, avgWait: 25 },
                { id: 'oph', name: '안과', doctors: 7, todayTotal: 95, todayCompleted: 68, waiting: 13, avgWait: 28 },
                { id: 'psy', name: '정신건강의학과', doctors: 5, todayTotal: 42, todayCompleted: 30, waiting: 4, avgWait: 15 },
                { id: 'rehab', name: '재활의학과', doctors: 4, todayTotal: 38, todayCompleted: 28, waiting: 6, avgWait: 22 },
                { id: 'em', name: '응급의학과', doctors: 12, todayTotal: 67, todayCompleted: 45, waiting: 22, avgWait: 45 }
            ]
        },
        {
            id: 'jeju-med',
            name: '제주의료원',
            type: '종합병원',
            color: 'green',
            departments: [
                { id: 'int', name: '내과', doctors: 15, todayTotal: 98, todayCompleted: 67, waiting: 8, avgWait: 20 },
                { id: 'sur', name: '외과', doctors: 10, todayTotal: 52, todayCompleted: 38, waiting: 5, avgWait: 18 },
                { id: 'ped', name: '소아청소년과', doctors: 6, todayTotal: 64, todayCompleted: 48, waiting: 10, avgWait: 25 },
                { id: 'obgy', name: '산부인과', doctors: 5, todayTotal: 42, todayCompleted: 32, waiting: 4, avgWait: 15 },
                { id: 'ortho', name: '정형외과', doctors: 8, todayTotal: 76, todayCompleted: 58, waiting: 12, avgWait: 28 },
                { id: 'card', name: '심장내과', doctors: 4, todayTotal: 36, todayCompleted: 28, waiting: 3, avgWait: 18 },
                { id: 'ent', name: '이비인후과', doctors: 3, todayTotal: 48, todayCompleted: 35, waiting: 8, avgWait: 22 },
                { id: 'em', name: '응급의학과', doctors: 6, todayTotal: 45, todayCompleted: 32, waiting: 13, avgWait: 35 }
            ]
        },
        {
            id: 'seogwipo',
            name: '서귀포의료원',
            type: '종합병원',
            color: 'purple',
            departments: [
                { id: 'int', name: '내과', doctors: 10, todayTotal: 72, todayCompleted: 52, waiting: 6, avgWait: 18 },
                { id: 'sur', name: '외과', doctors: 6, todayTotal: 38, todayCompleted: 28, waiting: 4, avgWait: 15 },
                { id: 'ped', name: '소아청소년과', doctors: 4, todayTotal: 45, todayCompleted: 35, waiting: 8, avgWait: 22 },
                { id: 'obgy', name: '산부인과', doctors: 4, todayTotal: 32, todayCompleted: 25, waiting: 3, avgWait: 12 },
                { id: 'ortho', name: '정형외과', doctors: 5, todayTotal: 54, todayCompleted: 42, waiting: 7, avgWait: 20 },
                { id: 'em', name: '응급의학과', doctors: 4, todayTotal: 28, todayCompleted: 20, waiting: 8, avgWait: 30 }
            ]
        },
        {
            id: 'halla',
            name: '한라병원',
            type: '종합병원',
            color: 'orange',
            departments: [
                { id: 'int', name: '내과', doctors: 8, todayTotal: 65, todayCompleted: 48, waiting: 5, avgWait: 15 },
                { id: 'sur', name: '외과', doctors: 5, todayTotal: 32, todayCompleted: 25, waiting: 3, avgWait: 12 },
                { id: 'ortho', name: '정형외과', doctors: 6, todayTotal: 58, todayCompleted: 45, waiting: 8, avgWait: 22 },
                { id: 'neuro', name: '신경과', doctors: 3, todayTotal: 28, todayCompleted: 22, waiting: 4, avgWait: 18 },
                { id: 'rehab', name: '재활의학과', doctors: 4, todayTotal: 42, todayCompleted: 35, waiting: 5, avgWait: 15 }
            ]
        },
        {
            id: 'dental1',
            name: '제주미소치과',
            type: '치과',
            color: 'cyan',
            departments: [
                { id: 'gen', name: '일반진료', doctors: 3, todayTotal: 28, todayCompleted: 20, waiting: 4, avgWait: 15 },
                { id: 'ortho', name: '교정과', doctors: 2, todayTotal: 18, todayCompleted: 14, waiting: 2, avgWait: 10 },
                { id: 'impl', name: '임플란트', doctors: 2, todayTotal: 12, todayCompleted: 9, waiting: 2, avgWait: 12 },
                { id: 'ped', name: '소아치과', doctors: 1, todayTotal: 15, todayCompleted: 12, waiting: 3, avgWait: 18 }
            ]
        },
        {
            id: 'health1',
            name: '제주시보건소',
            type: '보건소',
            color: 'teal',
            departments: [
                { id: 'check', name: '건강검진', doctors: 3, todayTotal: 45, todayCompleted: 32, waiting: 8, avgWait: 25 },
                { id: 'vacc', name: '예방접종', doctors: 2, todayTotal: 62, todayCompleted: 48, waiting: 10, avgWait: 15 },
                { id: 'chronic', name: '만성질환관리', doctors: 2, todayTotal: 28, todayCompleted: 22, waiting: 4, avgWait: 12 },
                { id: 'mental', name: '정신건강', doctors: 1, todayTotal: 12, todayCompleted: 10, waiting: 2, avgWait: 10 }
            ]
        }
    ];

    // 실시간 예약 현황 (시뮬레이션)
    const [liveAppointments, setLiveAppointments] = React.useState([
        { id: 1, time: '09:30', patient: '김*희', facility: '제주대학교병원', dept: '내과', doctor: '김내과', status: 'completed', type: '재진' },
        { id: 2, time: '09:45', patient: '박*수', facility: '제주대학교병원', dept: '정형외과', doctor: '이정형', status: 'in-progress', type: '초진' },
        { id: 3, time: '10:00', patient: '이*정', facility: '제주의료원', dept: '소아청소년과', doctor: '박소아', status: 'waiting', type: '예방접종' },
        { id: 4, time: '10:15', patient: '최*호', facility: '제주대학교병원', dept: '심장내과', doctor: '정심장', status: 'waiting', type: '재진' },
        { id: 5, time: '10:30', patient: '강*민', facility: '서귀포의료원', dept: '내과', doctor: '최내과', status: 'waiting', type: '초진' },
        { id: 6, time: '10:45', patient: '윤*서', facility: '제주미소치과', dept: '일반진료', doctor: '김치과', status: 'waiting', type: '충치치료' },
        { id: 7, time: '11:00', patient: '장*우', facility: '제주시보건소', dept: '건강검진', doctor: '이보건', status: 'waiting', type: '종합검진' },
        { id: 8, time: '11:15', patient: '한*아', facility: '제주대학교병원', dept: '피부과', doctor: '박피부', status: 'waiting', type: '재진' }
    ]);

    // 실시간 업데이트
    React.useEffect(() => {
        const interval = setInterval(() => {
            // 대기 인원 변동
            facilities.forEach(f => {
                f.departments.forEach(d => {
                    d.waiting = Math.max(0, d.waiting + Math.floor((Math.random() - 0.5) * 3));
                    d.todayCompleted = Math.min(d.todayTotal, d.todayCompleted + (Math.random() > 0.7 ? 1 : 0));
                    d.avgWait = Math.max(5, d.avgWait + Math.floor((Math.random() - 0.5) * 5));
                });
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // 통계 계산
    const totalStats = {
        facilities: facilities.length,
        departments: facilities.reduce((acc, f) => acc + f.departments.length, 0),
        todayTotal: facilities.reduce((acc, f) => acc + f.departments.reduce((a, d) => a + d.todayTotal, 0), 0),
        todayCompleted: facilities.reduce((acc, f) => acc + f.departments.reduce((a, d) => a + d.todayCompleted, 0), 0),
        waiting: facilities.reduce((acc, f) => acc + f.departments.reduce((a, d) => a + d.waiting, 0), 0)
    };

    const getWaitColor = (wait) => {
        if (wait <= 15) return 'green';
        if (wait <= 30) return 'yellow';
        return 'red';
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <i className="fas fa-calendar-check text-green-400 mr-3"></i>진료 예약 현황
                    </h1>
                    <p className="text-gray-400 mt-1">제주 권역 의료시설 실시간 예약 및 진료 현황</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-400">
                        <i className="fas fa-clock mr-2"></i>{currentTime.toLocaleString('ko-KR')}
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full animate-pulse">
                        <i className="fas fa-sync-alt mr-1"></i>실시간
                    </span>
                </div>
            </div>

            {/* 통계 요약 */}
            <div className="grid grid-cols-5 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-hospital text-blue-400"></i>
                        <span className="text-2xl font-bold">{totalStats.facilities}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">연결 의료시설</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-stethoscope text-purple-400"></i>
                        <span className="text-2xl font-bold">{totalStats.departments}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">진료과</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-calendar-day text-cyan-400"></i>
                        <span className="text-2xl font-bold">{totalStats.todayTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">오늘 예약</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-check-circle text-green-400"></i>
                        <span className="text-2xl font-bold text-green-400">{totalStats.todayCompleted.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">진료 완료</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-yellow-500/30">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-hourglass-half text-yellow-400"></i>
                        <span className="text-2xl font-bold text-yellow-400">{totalStats.waiting}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">현재 대기</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 의료시설별 현황 */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold flex items-center">
                        <i className="fas fa-hospital-alt text-blue-400 mr-2"></i>의료시설별 진료과 현황
                    </h3>
                    
                    {facilities.map(facility => (
                        <div key={facility.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            {/* 시설 헤더 */}
                            <div 
                                className={`p-4 bg-${facility.color}-500/10 border-b border-gray-700 cursor-pointer hover:bg-${facility.color}-500/20`}
                                onClick={() => setSelectedFacility(selectedFacility === facility.id ? null : facility.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-lg bg-${facility.color}-500/20 flex items-center justify-center`}>
                                            <i className={`fas fa-hospital text-${facility.color}-400`}></i>
                                        </div>
                                        <div>
                                            <p className="font-bold">{facility.name}</p>
                                            <p className="text-xs text-gray-400">{facility.type} · {facility.departments.length}개 진료과</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm">
                                                <span className="text-green-400">{facility.departments.reduce((a, d) => a + d.todayCompleted, 0)}</span>
                                                <span className="text-gray-500"> / {facility.departments.reduce((a, d) => a + d.todayTotal, 0)}</span>
                                            </p>
                                            <p className="text-xs text-gray-500">완료/예약</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-yellow-400">{facility.departments.reduce((a, d) => a + d.waiting, 0)}</p>
                                            <p className="text-xs text-gray-500">대기</p>
                                        </div>
                                        <i className={`fas fa-chevron-${selectedFacility === facility.id ? 'up' : 'down'} text-gray-400`}></i>
                                    </div>
                                </div>
                            </div>

                            {/* 진료과 상세 */}
                            {selectedFacility === facility.id && (
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {facility.departments.map(dept => (
                                            <div key={dept.id} className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium">{dept.name}</span>
                                                    <span className="text-xs text-gray-400">{dept.doctors}명</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <div>
                                                        <span className="text-green-400">{dept.todayCompleted}</span>
                                                        <span className="text-gray-500">/{dept.todayTotal}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className={`px-2 py-0.5 rounded text-xs bg-${getWaitColor(dept.avgWait)}-500/20 text-${getWaitColor(dept.avgWait)}-400`}>
                                                            대기 {dept.avgWait}분
                                                        </span>
                                                        <span className="text-yellow-400 font-bold">{dept.waiting}명</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500 rounded-full" style={{width: `${(dept.todayCompleted / dept.todayTotal) * 100}%`}}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 실시간 예약 피드 */}
                <div className="space-y-4">
                    <h3 className="font-semibold flex items-center">
                        <i className="fas fa-stream text-cyan-400 mr-2"></i>실시간 예약 현황
                    </h3>
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 h-[600px] overflow-y-auto">
                        <div className="space-y-3">
                            {liveAppointments.map(apt => (
                                <div key={apt.id} className={`p-3 rounded-lg border-l-4 ${
                                    apt.status === 'completed' ? 'bg-green-500/10 border-green-500' :
                                    apt.status === 'in-progress' ? 'bg-blue-500/10 border-blue-500' :
                                    'bg-gray-700/50 border-yellow-500'
                                }`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold">{apt.time}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded ${
                                            apt.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                            apt.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {apt.status === 'completed' ? '완료' : apt.status === 'in-progress' ? '진료중' : '대기'}
                                        </span>
                                    </div>
                                    <p className="text-sm">{apt.patient} · {apt.type}</p>
                                    <p className="text-xs text-gray-400">{apt.facility} {apt.dept}</p>
                                    <p className="text-xs text-gray-500">{apt.doctor} 전문의</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 예약 버튼 */}
                    <button className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl font-bold flex items-center justify-center space-x-2">
                        <i className="fas fa-plus-circle"></i>
                        <span>새 예약 등록</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
