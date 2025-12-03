const AttendanceLog = () => {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [attendanceData, setAttendanceData] = React.useState({
        checkedIn: 24850000,
        remoteWork: 4520000,
        flexTime: 8200000,
        onLeave: 980000
    });

    const RechartsLib = window.Recharts || {};
    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } = RechartsLib;

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            setAttendanceData(prev => ({
                checkedIn: prev.checkedIn + Math.floor(Math.random() * 1000 - 500),
                remoteWork: prev.remoteWork + Math.floor(Math.random() * 500 - 250),
                flexTime: prev.flexTime + Math.floor(Math.random() * 300 - 150),
                onLeave: prev.onLeave + Math.floor(Math.random() * 100 - 50)
            }));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const hourlyPattern = [];
    for (let i = 0; i < 24; i++) {
        let checkIn = 0, checkOut = 0;
        if (i >= 7 && i <= 9) checkIn = 3000000 + Math.random() * 2000000;
        else if (i >= 17 && i <= 19) checkOut = 3500000 + Math.random() * 2000000;
        else {
            checkIn = 100000 + Math.random() * 200000;
            checkOut = 100000 + Math.random() * 200000;
        }
        hourlyPattern.push({ hour: i + '시', checkIn: Math.floor(checkIn), checkOut: Math.floor(checkOut) });
    }

    const weeklyPattern = [
        { day: '월', attendance: 96.2, remote: 18.5 },
        { day: '화', attendance: 97.1, remote: 17.2 },
        { day: '수', attendance: 96.8, remote: 19.1 },
        { day: '목', attendance: 95.9, remote: 20.3 },
        { day: '금', attendance: 94.2, remote: 22.8 }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    return (
        <div className="space-y-6">
            {/* 현재 시간 및 상태 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-slate-400 text-sm">현재 시간</p>
                        <p className="text-4xl font-bold text-white mt-1">
                            {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                            {currentTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-400 font-medium">근무 시간</span>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">09:00 - 18:00 (표준)</p>
                    </div>
                </div>
            </div>

            {/* 실시간 출근 현황 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">현재 출근자</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">{formatNumber(attendanceData.checkedIn)}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-user-check text-xl text-green-400"></i>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        실시간 집계
                    </div>
                </div>

                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">재택근무</p>
                            <p className="text-2xl font-bold text-blue-400 mt-1">{formatNumber(attendanceData.remoteWork)}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-house-laptop text-xl text-blue-400"></i>
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">전체의 15.1%</p>
                </div>

                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">탄력근무</p>
                            <p className="text-2xl font-bold text-purple-400 mt-1">{formatNumber(attendanceData.flexTime)}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-clock text-xl text-purple-400"></i>
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">시차출퇴근제</p>
                </div>

                <div className="bg-slate-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">휴가/휴직</p>
                            <p className="text-2xl font-bold text-yellow-400 mt-1">{formatNumber(attendanceData.onLeave)}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-umbrella-beach text-xl text-yellow-400"></i>
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">연가, 병가 포함</p>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 시간대별 출퇴근 패턴 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">시간대별 출퇴근 패턴</h3>
                    {AreaChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={hourlyPattern}>
                                <defs>
                                    <linearGradient id="checkInGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                                    </linearGradient>
                                    <linearGradient id="checkOutGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value, name) => [formatNumber(value) + '명', name === 'checkIn' ? '출근' : '퇴근']}
                                />
                                <Area type="monotone" dataKey="checkIn" stroke="#22c55e" fill="url(#checkInGrad)" name="checkIn" />
                                <Area type="monotone" dataKey="checkOut" stroke="#ef4444" fill="url(#checkOutGrad)" name="checkOut" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                    <div className="flex justify-center gap-6 mt-2">
                        <span className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 bg-green-500 rounded"></span>
                            <span className="text-slate-400">출근</span>
                        </span>
                        <span className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 bg-red-500 rounded"></span>
                            <span className="text-slate-400">퇴근</span>
                        </span>
                    </div>
                </div>

                {/* 요일별 출근율 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">요일별 출근율 및 재택비율</h3>
                    {BarChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={weeklyPattern}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value, name) => [value + '%', name === 'attendance' ? '출근율' : '재택비율']}
                                />
                                <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} name="attendance" />
                                <Bar dataKey="remote" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="remote" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>
            </div>

            {/* OpenHash 출퇴근 기록 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-shield-halved text-green-400"></i>
                    <h3 className="text-lg font-bold text-white">OpenHash 기반 출퇴근 기록</h3>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">검증됨</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                    모든 출퇴근 기록은 OpenHash 기술로 위변조가 불가능하게 보호됩니다. 
                    원본 데이터는 개인 정보 금고(PDV)에만 저장되며, 시스템은 익명화된 통계만 처리합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-green-400">99.97%</p>
                        <p className="text-sm text-slate-400">데이터 검증률</p>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-400">4계층</p>
                        <p className="text-sm text-slate-400">해시체인 분배</p>
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-400">0.8ms</p>
                        <p className="text-sm text-slate-400">평균 검증 시간</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
