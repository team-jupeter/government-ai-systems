const SmartWatchMonitor = () => {
    const [time, setTime] = React.useState(new Date());
    const [selectedWatch, setSelectedWatch] = React.useState(null);
    
    // 5명의 환자 데이터
    const [patients, setPatients] = React.useState([
        { id: 'PT-2025-001', name: '김영희', age: 67, gender: '여', condition: '고혈압', status: 'normal', avatar: '👵' },
        { id: 'PT-2025-002', name: '박철수', age: 72, gender: '남', condition: '당뇨', status: 'warning', avatar: '👴' },
        { id: 'PT-2025-003', name: '이민정', age: 45, gender: '여', condition: '심부전', status: 'normal', avatar: '👩' },
        { id: 'PT-2025-004', name: '정대호', age: 58, gender: '남', condition: '부정맥', status: 'critical', avatar: '👨' },
        { id: 'PT-2025-005', name: '최수진', age: 34, gender: '여', condition: '임산부', status: 'normal', avatar: '🤰' }
    ]);

    const [vitals, setVitals] = React.useState([
        { heartRate: 72, bp: { sys: 128, dia: 82 }, temp: 36.5, spo2: 98, resp: 16, glucose: 95, steps: 3421, calories: 156, stress: 28, battery: 85 },
        { heartRate: 88, bp: { sys: 145, dia: 92 }, temp: 36.8, spo2: 96, resp: 18, glucose: 165, steps: 1234, calories: 67, stress: 52, battery: 62 },
        { heartRate: 68, bp: { sys: 118, dia: 76 }, temp: 36.4, spo2: 99, resp: 14, glucose: 88, steps: 5678, calories: 234, stress: 22, battery: 91 },
        { heartRate: 112, bp: { sys: 152, dia: 98 }, temp: 37.2, spo2: 94, resp: 22, glucose: 102, steps: 876, calories: 45, stress: 78, battery: 34 },
        { heartRate: 76, bp: { sys: 112, dia: 72 }, temp: 36.6, spo2: 98, resp: 15, glucose: 82, steps: 4532, calories: 189, stress: 35, battery: 78 }
    ]);

    const [alerts, setAlerts] = React.useState([
        null,
        { type: 'warning', message: '혈당 높음' },
        null,
        { type: 'critical', message: '심박수 이상' },
        null
    ]);

    const [watchScreens, setWatchScreens] = React.useState([0, 0, 0, 0, 0]); // 각 워치의 현재 화면

    // 시간 업데이트
    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 바이탈 실시간 업데이트
    React.useEffect(() => {
        const interval = setInterval(() => {
            setVitals(prev => prev.map((v, i) => ({
                ...v,
                heartRate: Math.max(60, Math.min(130, v.heartRate + Math.floor((Math.random() - 0.5) * 6))),
                bp: {
                    sys: Math.max(100, Math.min(160, v.bp.sys + Math.floor((Math.random() - 0.5) * 4))),
                    dia: Math.max(60, Math.min(100, v.bp.dia + Math.floor((Math.random() - 0.5) * 3)))
                },
                temp: Math.round((v.temp + (Math.random() - 0.5) * 0.1) * 10) / 10,
                spo2: Math.max(92, Math.min(100, v.spo2 + Math.floor((Math.random() - 0.5) * 2))),
                resp: Math.max(12, Math.min(24, v.resp + Math.floor((Math.random() - 0.5) * 2))),
                glucose: Math.max(70, Math.min(180, v.glucose + Math.floor((Math.random() - 0.5) * 5))),
                steps: v.steps + Math.floor(Math.random() * 3),
                stress: Math.max(10, Math.min(90, v.stress + Math.floor((Math.random() - 0.5) * 5)))
            })));

            // 알림 상태 업데이트
            setAlerts(prev => prev.map((a, i) => {
                if (i === 3 && Math.random() > 0.7) return { type: 'critical', message: '심박수 이상' };
                if (i === 1 && Math.random() > 0.8) return { type: 'warning', message: '혈당 높음' };
                return a;
            }));

            // 환자 상태 업데이트
            setPatients(prev => prev.map((p, i) => {
                if (i === 3) return { ...p, status: Math.random() > 0.3 ? 'critical' : 'warning' };
                if (i === 1) return { ...p, status: Math.random() > 0.5 ? 'warning' : 'normal' };
                return p;
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 워치 화면 자동 전환
    React.useEffect(() => {
        const interval = setInterval(() => {
            setWatchScreens(prev => prev.map(s => (s + 1) % 4));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'critical': return { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', glow: 'shadow-red-500/50' };
            case 'warning': return { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-400', glow: 'shadow-yellow-500/50' };
            default: return { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', glow: '' };
        }
    };

    const handleEmergencyCall = (patientIndex) => {
        setAlerts(prev => {
            const newAlerts = [...prev];
            newAlerts[patientIndex] = { type: 'emergency', message: '119 호출됨' };
            return newAlerts;
        });
        setTimeout(() => {
            setAlerts(prev => {
                const newAlerts = [...prev];
                newAlerts[patientIndex] = { type: 'dispatched', message: '구급대 출동중' };
                return newAlerts;
            });
        }, 3000);
    };

    const handleMedicalCall = (patientIndex) => {
        setAlerts(prev => {
            const newAlerts = [...prev];
            newAlerts[patientIndex] = { type: 'calling', message: '의료진 호출중' };
            return newAlerts;
        });
        setTimeout(() => {
            setAlerts(prev => {
                const newAlerts = [...prev];
                newAlerts[patientIndex] = { type: 'connected', message: '의료진 연결됨' };
                return newAlerts;
            });
        }, 2000);
    };

    // 스마트워치 컴포넌트
    const SmartWatch = ({ patient, vital, alert, screenIndex, index, onEmergency, onMedical }) => {
        const status = getStatusColor(patient.status);
        const screens = ['vitals', 'activity', 'health', 'alerts'];
        const currentScreen = screens[screenIndex];

        return (
            <div className="flex flex-col items-center">
                {/* 환자 정보 */}
                <div className={`mb-3 px-4 py-2 rounded-full ${status.bg} border ${status.border} flex items-center space-x-2`}>
                    <span className="text-xl">{patient.avatar}</span>
                    <div>
                        <p className="text-sm font-medium">{patient.name}</p>
                        <p className="text-xs text-gray-400">{patient.age}세 · {patient.condition}</p>
                    </div>
                    {patient.status === 'critical' && (
                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">위험</span>
                    )}
                </div>

                {/* 스마트워치 본체 */}
                <div className={`relative ${status.glow} shadow-lg`}>
                    {/* 워치 프레임 */}
                    <div className="relative bg-gray-900 rounded-[2.5rem] p-2" style={{ width: '200px', height: '240px' }}>
                        {/* 상단 버튼 */}
                        <div className="absolute -right-1.5 top-12 w-2 h-8 bg-gray-700 rounded-r-lg"></div>
                        <div className="absolute -right-1.5 top-24 w-2 h-6 bg-gray-700 rounded-r-lg"></div>
                        
                        {/* 워치 스크린 */}
                        <div className={`w-full h-full bg-black rounded-[2rem] overflow-hidden border-4 ${status.border}`}>
                            {/* 상태바 */}
                            <div className="flex justify-between items-center px-3 py-1.5 bg-gray-900/80 text-xs">
                                <span>{time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                                <div className="flex items-center space-x-1">
                                    {patient.status === 'critical' && <i className="fas fa-exclamation-triangle text-red-400 animate-pulse"></i>}
                                    <i className="fas fa-bluetooth text-blue-400"></i>
                                    <div className="flex items-center">
                                        <div className={`w-5 h-2.5 border rounded-sm ${vital.battery < 30 ? 'border-red-400' : 'border-white'}`}>
                                            <div className={`h-full ${vital.battery < 30 ? 'bg-red-400' : 'bg-green-400'} rounded-sm`} style={{width: `${vital.battery}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 메인 컨텐츠 */}
                            <div className="h-[calc(100%-28px)] p-2">
                                {alert?.type === 'emergency' || alert?.type === 'dispatched' ? (
                                    <div className="h-full flex flex-col items-center justify-center bg-red-900/50 rounded-xl">
                                        <i className={`fas fa-ambulance text-3xl text-red-400 ${alert.type === 'dispatched' ? 'animate-pulse' : ''}`}></i>
                                        <p className="text-sm font-bold text-red-400 mt-2">{alert.message}</p>
                                        {alert.type === 'dispatched' && <p className="text-xs text-gray-400 mt-1">도착 예정: 8분</p>}
                                    </div>
                                ) : alert?.type === 'calling' || alert?.type === 'connected' ? (
                                    <div className="h-full flex flex-col items-center justify-center bg-blue-900/50 rounded-xl">
                                        <i className={`fas fa-user-md text-3xl text-blue-400 ${alert.type === 'calling' ? 'animate-bounce' : ''}`}></i>
                                        <p className="text-sm font-bold text-blue-400 mt-2">{alert.message}</p>
                                        {alert.type === 'connected' && <p className="text-xs text-green-400 mt-1">김민수 전문의</p>}
                                    </div>
                                ) : currentScreen === 'vitals' ? (
                                    <div className="h-full flex flex-col">
                                        {/* 심박수 메인 */}
                                        <div className="flex-1 flex flex-col items-center justify-center">
                                            <i className="fas fa-heartbeat text-red-400 text-2xl animate-pulse"></i>
                                            <p className={`text-4xl font-bold mt-1 ${vital.heartRate > 100 ? 'text-red-400' : 'text-white'}`}>{vital.heartRate}</p>
                                            <p className="text-xs text-gray-400">BPM</p>
                                        </div>
                                        {/* 하단 바이탈 */}
                                        <div className="grid grid-cols-3 gap-1 text-center pb-1">
                                            <div className="bg-gray-800/80 rounded-lg p-1">
                                                <p className="text-xs text-gray-400">혈압</p>
                                                <p className={`text-sm font-bold ${vital.bp.sys > 140 ? 'text-red-400' : 'text-blue-400'}`}>{vital.bp.sys}/{vital.bp.dia}</p>
                                            </div>
                                            <div className="bg-gray-800/80 rounded-lg p-1">
                                                <p className="text-xs text-gray-400">체온</p>
                                                <p className={`text-sm font-bold ${vital.temp > 37.5 ? 'text-orange-400' : 'text-green-400'}`}>{vital.temp}°</p>
                                            </div>
                                            <div className="bg-gray-800/80 rounded-lg p-1">
                                                <p className="text-xs text-gray-400">산소</p>
                                                <p className={`text-sm font-bold ${vital.spo2 < 95 ? 'text-red-400' : 'text-cyan-400'}`}>{vital.spo2}%</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : currentScreen === 'activity' ? (
                                    <div className="h-full flex flex-col items-center justify-center">
                                        <div className="relative w-24 h-24">
                                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="8"/>
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" 
                                                        strokeDasharray="251" strokeDashoffset={251 - (251 * Math.min(vital.steps / 10000, 1))}/>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <i className="fas fa-walking text-green-400"></i>
                                                <p className="text-lg font-bold">{vital.steps.toLocaleString()}</p>
                                                <p className="text-xs text-gray-400">걸음</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-around w-full mt-2">
                                            <div className="text-center">
                                                <p className="text-orange-400 font-bold">{vital.calories}</p>
                                                <p className="text-xs text-gray-400">kcal</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-blue-400 font-bold">{(vital.steps * 0.0007).toFixed(1)}</p>
                                                <p className="text-xs text-gray-400">km</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : currentScreen === 'health' ? (
                                    <div className="h-full flex flex-col justify-center space-y-2">
                                        <div className="flex items-center justify-between bg-gray-800/80 rounded-lg p-2">
                                            <div className="flex items-center space-x-2">
                                                <i className="fas fa-tint text-purple-400"></i>
                                                <span className="text-xs">혈당</span>
                                            </div>
                                            <span className={`font-bold ${vital.glucose > 140 ? 'text-yellow-400' : 'text-white'}`}>{vital.glucose}</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-gray-800/80 rounded-lg p-2">
                                            <div className="flex items-center space-x-2">
                                                <i className="fas fa-wind text-teal-400"></i>
                                                <span className="text-xs">호흡</span>
                                            </div>
                                            <span className={`font-bold ${vital.resp > 20 ? 'text-yellow-400' : 'text-white'}`}>{vital.resp}/분</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-gray-800/80 rounded-lg p-2">
                                            <div className="flex items-center space-x-2">
                                                <i className="fas fa-brain text-pink-400"></i>
                                                <span className="text-xs">스트레스</span>
                                            </div>
                                            <span className={`font-bold ${vital.stress > 60 ? 'text-red-400' : vital.stress > 40 ? 'text-yellow-400' : 'text-green-400'}`}>{vital.stress}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col">
                                        {alert ? (
                                            <div className={`flex-1 flex flex-col items-center justify-center rounded-xl ${alert.type === 'critical' ? 'bg-red-900/50' : 'bg-yellow-900/50'}`}>
                                                <i className={`fas fa-exclamation-triangle text-3xl ${alert.type === 'critical' ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}></i>
                                                <p className={`text-sm font-bold mt-2 ${alert.type === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>{alert.message}</p>
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center">
                                                <i className="fas fa-check-circle text-4xl text-green-400"></i>
                                                <p className="text-sm text-green-400 mt-2">정상 상태</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 워치 밴드 */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-gray-800 rounded-t-lg"></div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 bg-gray-800 rounded-b-lg"></div>
                </div>

                {/* 액션 버튼 */}
                <div className="mt-6 flex space-x-2">
                    <button 
                        onClick={() => onEmergency(index)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-medium flex items-center space-x-1"
                    >
                        <i className="fas fa-ambulance"></i>
                        <span>긴급호출</span>
                    </button>
                    <button 
                        onClick={() => onMedical(index)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-medium flex items-center space-x-1"
                    >
                        <i className="fas fa-user-md"></i>
                        <span>의료진</span>
                    </button>
                </div>

                {/* 화면 인디케이터 */}
                <div className="flex space-x-1 mt-3">
                    {[0,1,2,3].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full ${screenIndex === i ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center">
                        <i className="fas fa-watch text-cyan-400 mr-3"></i>생체감지 스마트워치
                    </h1>
                    <p className="text-gray-400 mt-1">환자별 실시간 생체신호 모니터링</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>정상</span>
                        <span className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>주의</span>
                        <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1 animate-pulse"></span>위험</span>
                    </div>
                    <div className="text-sm text-gray-400">
                        <i className="fas fa-sync-alt animate-spin text-green-400 mr-2"></i>
                        실시간
                    </div>
                </div>
            </div>

            {/* 통계 요약 */}
            <div className="grid grid-cols-5 gap-4">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-users text-blue-400"></i>
                        <span className="text-2xl font-bold">5</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">모니터링 중</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-check-circle text-green-400"></i>
                        <span className="text-2xl font-bold text-green-400">{patients.filter(p => p.status === 'normal').length}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">정상</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-yellow-500/30">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-exclamation-triangle text-yellow-400"></i>
                        <span className="text-2xl font-bold text-yellow-400">{patients.filter(p => p.status === 'warning').length}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">주의</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-red-500/30">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-heartbeat text-red-400 animate-pulse"></i>
                        <span className="text-2xl font-bold text-red-400">{patients.filter(p => p.status === 'critical').length}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">위험</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <i className="fas fa-bell text-purple-400"></i>
                        <span className="text-2xl font-bold text-purple-400">{alerts.filter(a => a).length}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">활성 알림</p>
                </div>
            </div>

            {/* 스마트워치 그리드 */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
                <div className="flex justify-center space-x-8 overflow-x-auto pb-4">
                    {patients.map((patient, index) => (
                        <SmartWatch
                            key={patient.id}
                            patient={patient}
                            vital={vitals[index]}
                            alert={alerts[index]}
                            screenIndex={watchScreens[index]}
                            index={index}
                            onEmergency={handleEmergencyCall}
                            onMedical={handleMedicalCall}
                        />
                    ))}
                </div>
            </div>

            {/* 하단 범례 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                    <i className="fas fa-info-circle text-blue-400 mr-2"></i>화면 설명
                </h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-heartbeat text-red-400"></i>
                        </div>
                        <div>
                            <p className="text-sm font-medium">바이탈 화면</p>
                            <p className="text-xs text-gray-400">심박수, 혈압, 체온, 산소포화도</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-walking text-green-400"></i>
                        </div>
                        <div>
                            <p className="text-sm font-medium">활동 화면</p>
                            <p className="text-xs text-gray-400">걸음수, 칼로리, 이동거리</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-tint text-purple-400"></i>
                        </div>
                        <div>
                            <p className="text-sm font-medium">건강 화면</p>
                            <p className="text-xs text-gray-400">혈당, 호흡수, 스트레스</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                        <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-bell text-yellow-400"></i>
                        </div>
                        <div>
                            <p className="text-sm font-medium">알림 화면</p>
                            <p className="text-xs text-gray-400">이상 징후 감지 알림</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 시스템 기능 설명 */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-900/30 to-gray-800 rounded-xl p-4 border border-red-500/30">
                    <div className="flex items-center space-x-3 mb-2">
                        <i className="fas fa-ambulance text-red-400 text-xl"></i>
                        <span className="font-medium">긴급 출동</span>
                    </div>
                    <p className="text-sm text-gray-400">위급 상황 시 119 자동 호출 및 GPS 위치, 바이탈 데이터 자동 전송</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-gray-800 rounded-xl p-4 border border-blue-500/30">
                    <div className="flex items-center space-x-3 mb-2">
                        <i className="fas fa-user-md text-blue-400 text-xl"></i>
                        <span className="font-medium">의료진 호출</span>
                    </div>
                    <p className="text-sm text-gray-400">담당 의료진 즉시 연결, 화상 상담 및 원격 진료 지원</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-900/30 to-gray-800 rounded-xl p-4 border border-cyan-500/30">
                    <div className="flex items-center space-x-3 mb-2">
                        <i className="fas fa-shield-alt text-cyan-400 text-xl"></i>
                        <span className="font-medium">AI 자동 감지</span>
                    </div>
                    <p className="text-sm text-gray-400">이상 징후 AI 자동 분석 및 담당 의료기관 자동 알림</p>
                </div>
            </div>
        </div>
    );
};
