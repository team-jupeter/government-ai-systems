const SmartphoneVital = ({ patientId, onClose }) => {
    const [currentScreen, setCurrentScreen] = React.useState('main');
    const [vitalData, setVitalData] = React.useState({
        temperature: 36.5,
        heartRate: 72,
        respiration: 16,
        bloodSugar: 95,
        steps: 4523,
        calories: 187,
        bloodPressure: { systolic: 118, diastolic: 76 },
        spo2: 98,
        stress: 32,
        sleep: 7.2
    });
    const [isEmergency, setIsEmergency] = React.useState(false);
    const [emergencyCountdown, setEmergencyCountdown] = React.useState(10);
    const [callStatus, setCallStatus] = React.useState(null);
    const [alertHistory, setAlertHistory] = React.useState([]);
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setVitalData(prev => ({
                ...prev,
                temperature: Math.round((prev.temperature + (Math.random() - 0.5) * 0.1) * 10) / 10,
                heartRate: Math.floor(prev.heartRate + (Math.random() - 0.5) * 4),
                respiration: Math.floor(prev.respiration + (Math.random() - 0.5) * 2),
                bloodSugar: Math.floor(prev.bloodSugar + (Math.random() - 0.5) * 3),
                steps: prev.steps + Math.floor(Math.random() * 5),
                calories: prev.calories + Math.floor(Math.random() * 2),
                spo2: Math.min(100, Math.max(95, prev.spo2 + Math.floor((Math.random() - 0.5) * 2))),
                stress: Math.min(100, Math.max(0, prev.stress + Math.floor((Math.random() - 0.5) * 5)))
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if (isEmergency && emergencyCountdown > 0) {
            const timer = setTimeout(() => setEmergencyCountdown(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (isEmergency && emergencyCountdown === 0) {
            setCallStatus('dispatching');
            setAlertHistory(prev => [{ time: new Date().toLocaleTimeString(), type: 'emergency', message: '119 긴급 출동 요청됨' }, ...prev]);
        }
    }, [isEmergency, emergencyCountdown]);

    const startEmergency = () => { setIsEmergency(true); setEmergencyCountdown(10); setCurrentScreen('emergency'); };
    const cancelEmergency = () => { setIsEmergency(false); setEmergencyCountdown(10); setCallStatus(null); setCurrentScreen('main'); };
    const callMedicalStaff = () => {
        setCallStatus('calling'); setCurrentScreen('calling');
        setAlertHistory(prev => [{ time: new Date().toLocaleTimeString(), type: 'call', message: '담당 의료진 호출' }, ...prev]);
        setTimeout(() => setCallStatus('connected'), 3000);
    };

    const getVitalStatus = (type, value) => {
        const ranges = { temperature: { low: 36.0, high: 37.5, critical: 38.5 }, heartRate: { low: 60, high: 100, critical: 120 }, respiration: { low: 12, high: 20, critical: 25 }, bloodSugar: { low: 70, high: 140, critical: 200 }, spo2: { low: 95, critical: 90 }, stress: { high: 70, critical: 85 } };
        const r = ranges[type]; if (!r) return 'normal';
        if (type === 'spo2') { if (value < r.critical) return 'critical'; if (value < r.low) return 'warning'; return 'normal'; }
        if (value < r.low || value > r.critical) return 'critical'; if (value > r.high) return 'warning'; return 'normal';
    };
    const statusColor = (s) => s === 'critical' ? 'text-red-400' : s === 'warning' ? 'text-yellow-400' : 'text-green-400';
    const statusBg = (s) => s === 'critical' ? 'bg-red-500/20 border-red-500/50' : s === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-gray-800/80 border-gray-700';

    const MainScreen = () => (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 text-xs">
                <span>{time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex items-center space-x-2">
                    <i className="fas fa-signal text-green-400"></i>
                    <i className="fas fa-wifi text-green-400"></i>
                    <div className="w-6 h-3 border border-white rounded-sm relative"><div className="absolute inset-0.5 bg-green-400 rounded-sm" style={{width: '80%'}}></div></div>
                </div>
            </div>
            <div className="text-center py-3 border-b border-gray-700/50">
                <p className="text-2xl font-light">{time.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}</p>
                <p className="text-xs text-gray-400 mt-1"><i className="fas fa-user-circle mr-1"></i>{patientId}</p>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
                <div className={`rounded-2xl p-4 border ${statusBg(getVitalStatus('heartRate', vitalData.heartRate))}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center"><i className="fas fa-heartbeat text-2xl text-red-400 animate-pulse"></i></div>
                            <div><p className="text-xs text-gray-400">심박수</p><p className={`text-3xl font-bold ${statusColor(getVitalStatus('heartRate', vitalData.heartRate))}`}>{vitalData.heartRate}<span className="text-sm font-normal text-gray-400 ml-1">BPM</span></p></div>
                        </div>
                        <div className="text-right"><p className="text-xs text-gray-500">정상 범위</p><p className="text-xs text-gray-400">60-100</p></div>
                    </div>
                    <div className="mt-3 h-8 flex items-center overflow-hidden">
                        <svg viewBox="0 0 200 30" className="w-full h-full"><path d="M0,15 L20,15 L25,15 L30,5 L35,25 L40,10 L45,20 L50,15 L70,15 L75,15 L80,5 L85,25 L90,10 L95,20 L100,15 L120,15 L125,15 L130,5 L135,25 L140,10 L145,20 L150,15 L170,15 L175,15 L180,5 L185,25 L190,10 L195,20 L200,15" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse"/></svg>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className={`rounded-xl p-3 border ${statusBg(getVitalStatus('temperature', vitalData.temperature))}`}><div className="flex items-center space-x-2 mb-1"><i className="fas fa-thermometer-half text-orange-400"></i><span className="text-xs text-gray-400">체온</span></div><p className={`text-2xl font-bold ${statusColor(getVitalStatus('temperature', vitalData.temperature))}`}>{vitalData.temperature}°C</p></div>
                    <div className="rounded-xl p-3 border bg-gray-800/80 border-gray-700"><div className="flex items-center space-x-2 mb-1"><i className="fas fa-tint text-blue-400"></i><span className="text-xs text-gray-400">혈압</span></div><p className="text-2xl font-bold text-blue-400">{vitalData.bloodPressure.systolic}<span className="text-lg text-gray-500">/</span>{vitalData.bloodPressure.diastolic}</p></div>
                    <div className={`rounded-xl p-3 border ${statusBg(getVitalStatus('spo2', vitalData.spo2))}`}><div className="flex items-center space-x-2 mb-1"><i className="fas fa-lungs text-cyan-400"></i><span className="text-xs text-gray-400">SpO2</span></div><p className={`text-2xl font-bold ${statusColor(getVitalStatus('spo2', vitalData.spo2))}`}>{vitalData.spo2}%</p></div>
                    <div className={`rounded-xl p-3 border ${statusBg(getVitalStatus('respiration', vitalData.respiration))}`}><div className="flex items-center space-x-2 mb-1"><i className="fas fa-wind text-teal-400"></i><span className="text-xs text-gray-400">호흡</span></div><p className={`text-2xl font-bold ${statusColor(getVitalStatus('respiration', vitalData.respiration))}`}>{vitalData.respiration}<span className="text-sm text-gray-400">/분</span></p></div>
                </div>
                <div className={`rounded-xl p-3 border ${statusBg(getVitalStatus('bloodSugar', vitalData.bloodSugar))}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center"><i className="fas fa-tint text-purple-400"></i></div><div><p className="text-xs text-gray-400">혈당</p><p className={`text-2xl font-bold ${statusColor(getVitalStatus('bloodSugar', vitalData.bloodSugar))}`}>{vitalData.bloodSugar} <span className="text-sm text-gray-400">mg/dL</span></p></div></div>
                        <div className="text-xs text-gray-500"><p>공복: 70-100</p><p>식후: 70-140</p></div>
                    </div>
                </div>
                <div className="rounded-xl p-3 border bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
                    <div className="flex items-center justify-between mb-2"><span className="text-xs text-gray-400"><i className="fas fa-walking mr-1"></i>오늘의 활동</span><span className="text-xs text-green-400">{Math.floor((vitalData.steps / 10000) * 100)}% 달성</span></div>
                    <div className="flex justify-between items-end"><div><p className="text-2xl font-bold text-white">{vitalData.steps.toLocaleString()}</p><p className="text-xs text-gray-500">걸음</p></div><div className="text-center"><p className="text-lg font-bold text-orange-400">{vitalData.calories}</p><p className="text-xs text-gray-500">kcal</p></div><div className="text-right"><p className="text-lg font-bold text-blue-400">{(vitalData.steps * 0.0007).toFixed(1)}</p><p className="text-xs text-gray-500">km</p></div></div>
                    <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all" style={{width: `${Math.min(100, (vitalData.steps / 10000) * 100)}%`}}></div></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className={`rounded-xl p-3 border ${statusBg(getVitalStatus('stress', vitalData.stress))}`}><div className="flex items-center space-x-2 mb-1"><i className="fas fa-brain text-pink-400"></i><span className="text-xs text-gray-400">스트레스</span></div><p className={`text-xl font-bold ${statusColor(getVitalStatus('stress', vitalData.stress))}`}>{vitalData.stress}<span className="text-xs text-gray-400 ml-1">/ 100</span></p><p className="text-xs text-gray-500 mt-1">{vitalData.stress < 30 ? '낮음' : vitalData.stress < 60 ? '보통' : vitalData.stress < 80 ? '높음' : '매우 높음'}</p></div>
                    <div className="rounded-xl p-3 border bg-gray-800/80 border-gray-700"><div className="flex items-center space-x-2 mb-1"><i className="fas fa-moon text-indigo-400"></i><span className="text-xs text-gray-400">수면</span></div><p className="text-xl font-bold text-indigo-400">{vitalData.sleep}<span className="text-xs text-gray-400 ml-1">시간</span></p><p className="text-xs text-gray-500 mt-1">어제 수면</p></div>
                </div>
            </div>
            <div className="p-3 border-t border-gray-700/50 grid grid-cols-2 gap-2">
                <button onClick={startEmergency} className="py-3 rounded-xl bg-red-600 hover:bg-red-700 font-bold flex items-center justify-center space-x-2"><i className="fas fa-ambulance"></i><span>긴급 출동</span></button>
                <button onClick={callMedicalStaff} className="py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold flex items-center justify-center space-x-2"><i className="fas fa-user-md"></i><span>의료진 호출</span></button>
            </div>
        </div>
    );

    const EmergencyScreen = () => (
        <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-red-900/50 to-gray-900">
            {callStatus === 'dispatching' ? (
                <React.Fragment>
                    <div className="w-32 h-32 bg-red-500/30 rounded-full flex items-center justify-center mb-6 animate-pulse"><i className="fas fa-ambulance text-5xl text-red-400"></i></div>
                    <h2 className="text-2xl font-bold text-red-400 mb-2">긴급 출동 요청됨</h2>
                    <p className="text-gray-400 text-center mb-6">119 구급대가 출동 중입니다</p>
                    <div className="w-full bg-gray-800 rounded-xl p-4 space-y-3 mb-6">
                        <div className="flex justify-between"><span className="text-gray-400">위치</span><span className="text-white">제주시 연동 123-45</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">예상 도착</span><span className="text-green-400 font-bold">약 8분</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">바이탈 전송</span><span className="text-blue-400"><i className="fas fa-check-circle mr-1"></i>완료</span></div>
                    </div>
                    <button onClick={cancelEmergency} className="w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600">취소</button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="relative mb-8"><div className="w-40 h-40 rounded-full border-8 border-red-500 flex items-center justify-center"><span className="text-6xl font-bold text-red-400">{emergencyCountdown}</span></div><svg className="absolute inset-0 w-40 h-40 -rotate-90"><circle cx="80" cy="80" r="72" fill="none" stroke="#991b1b" strokeWidth="8" strokeDasharray="452" strokeDashoffset={452 - (452 * (10 - emergencyCountdown) / 10)} className="transition-all duration-1000"/></svg></div>
                    <h2 className="text-2xl font-bold text-red-400 mb-2">긴급 출동 요청 중</h2>
                    <p className="text-gray-400 text-center mb-8">{emergencyCountdown}초 후 119에<br/>자동으로 출동 요청됩니다</p>
                    <button onClick={cancelEmergency} className="w-full py-4 rounded-xl bg-gray-700 hover:bg-gray-600 font-bold"><i className="fas fa-times mr-2"></i>취소</button>
                </React.Fragment>
            )}
        </div>
    );

    const CallingScreen = () => (
        <div className="h-full flex flex-col items-center justify-center p-6">
            {callStatus === 'connected' ? (
                <React.Fragment>
                    <div className="w-24 h-24 bg-green-500/30 rounded-full flex items-center justify-center mb-4"><i className="fas fa-phone-alt text-4xl text-green-400"></i></div>
                    <h2 className="text-xl font-bold text-green-400 mb-1">통화 연결됨</h2><p className="text-gray-400 mb-6">00:15</p>
                    <div className="w-full bg-gray-800 rounded-xl p-4 mb-6 text-center"><div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-3"><i className="fas fa-user-md text-3xl text-blue-400"></i></div><p className="font-bold">김민수 전문의</p><p className="text-sm text-gray-400">제주대학교병원 내과</p></div>
                    <div className="grid grid-cols-3 gap-4 w-full mb-6"><button className="py-3 rounded-xl bg-gray-700"><i className="fas fa-microphone-slash text-xl"></i></button><button className="py-3 rounded-xl bg-gray-700"><i className="fas fa-video text-xl"></i></button><button className="py-3 rounded-xl bg-gray-700"><i className="fas fa-volume-up text-xl"></i></button></div>
                    <button onClick={() => { setCallStatus(null); setCurrentScreen('main'); }} className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 font-bold"><i className="fas fa-phone-slash mr-2"></i>통화 종료</button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="w-24 h-24 bg-blue-500/30 rounded-full flex items-center justify-center mb-4 animate-pulse"><i className="fas fa-phone-alt text-4xl text-blue-400 animate-bounce"></i></div>
                    <h2 className="text-xl font-bold mb-2">의료진 호출 중...</h2><p className="text-gray-400 mb-8">담당 의료진에게 연결하고 있습니다</p>
                    <div className="flex space-x-2 mb-8"><div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div><div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div><div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div></div>
                    <button onClick={() => { setCallStatus(null); setCurrentScreen('main'); }} className="w-full py-4 rounded-xl bg-gray-700 hover:bg-gray-600 font-bold"><i className="fas fa-times mr-2"></i>취소</button>
                </React.Fragment>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className="relative">
                <button onClick={onClose} className="absolute -top-12 right-0 text-gray-400 hover:text-white flex items-center space-x-2"><span className="text-sm">닫기</span><i className="fas fa-times"></i></button>
                <div className="relative bg-gray-950 rounded-[3rem] p-3 shadow-2xl" style={{ width: '320px', height: '680px' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-950 rounded-b-3xl z-10 flex items-center justify-center"><div className="w-16 h-4 bg-gray-900 rounded-full flex items-center justify-center space-x-2"><div className="w-2 h-2 bg-gray-700 rounded-full"></div><div className="w-1 h-1 bg-gray-700 rounded-full"></div></div></div>
                    <div className="relative w-full h-full bg-gray-900 rounded-[2.3rem] overflow-hidden">
                        {currentScreen === 'main' && <MainScreen />}
                        {currentScreen === 'emergency' && <EmergencyScreen />}
                        {currentScreen === 'calling' && <CallingScreen />}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="absolute -left-1 top-28 w-1 h-8 bg-gray-700 rounded-l"></div>
                    <div className="absolute -left-1 top-44 w-1 h-16 bg-gray-700 rounded-l"></div>
                    <div className="absolute -right-1 top-36 w-1 h-12 bg-gray-700 rounded-r"></div>
                </div>
                <div className="absolute -left-48 top-1/2 -translate-y-1/2 text-right space-y-4">
                    <div className="flex items-center justify-end space-x-2"><div><p className="text-sm font-medium text-cyan-400">생체변화감지장치</p><p className="text-xs text-gray-500">24시간 실시간 모니터링</p></div><div className="w-2 h-2 bg-cyan-400 rounded-full"></div></div>
                    <div className="flex items-center justify-end space-x-2"><div><p className="text-sm font-medium text-green-400">OpenHash 연동</p><p className="text-xs text-gray-500">데이터 무결성 보장</p></div><div className="w-2 h-2 bg-green-400 rounded-full"></div></div>
                    <div className="flex items-center justify-end space-x-2"><div><p className="text-sm font-medium text-purple-400">PDV 동기화</p><p className="text-xs text-gray-500">개인정보금고 저장</p></div><div className="w-2 h-2 bg-purple-400 rounded-full"></div></div>
                </div>
                <div className="absolute -right-52 top-1/2 -translate-y-1/2 space-y-4">
                    <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-red-400 rounded-full"></div><div><p className="text-sm font-medium text-red-400">긴급 출동</p><p className="text-xs text-gray-500">119 자동 연결</p></div></div>
                    <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div><div><p className="text-sm font-medium text-blue-400">의료진 호출</p><p className="text-xs text-gray-500">담당의 즉시 연결</p></div></div>
                    <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div><div><p className="text-sm font-medium text-yellow-400">이상 감지 알림</p><p className="text-xs text-gray-500">AI 자동 분석</p></div></div>
                </div>
            </div>
        </div>
    );
};
