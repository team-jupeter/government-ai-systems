const SafetyAlert = () => {
    const [safetyStats, setSafetyStats] = React.useState({
        totalAlerts: 847,
        criticalAlerts: 0,
        warningAlerts: 12,
        resolved: 835,
        avgResponseTime: 0.8,
        accidentsToday: 0
    });

    const [activeAlerts, setActiveAlerts] = React.useState([
        { id: 1, level: 'warning', type: '기상 악화', region: '강원도', message: '폭설 예보 - 속도 제한 40km/h', time: '12:30:45', affected: 45000 },
        { id: 2, level: 'warning', type: '도로 공사', region: '서울 강남', message: '테헤란로 1차선 통제', time: '11:15:23', affected: 12000 },
        { id: 3, level: 'info', type: '행사 교통', region: '부산 해운대', message: '해수욕장 행사로 우회 권고', time: '10:45:12', affected: 8500 },
        { id: 4, level: 'warning', type: '차량 고장', region: '경기 수원', message: 'AV-GYG-12345 긴급 정차', time: '12:28:34', affected: 230 }
    ]);

    const [recentIncidents, setRecentIncidents] = React.useState([
        { id: 1, time: '12:25:00', type: '급정거 감지', vehicle: 'AV-SEL-00891', result: '자동 회피 성공', status: 'resolved' },
        { id: 2, time: '12:18:34', type: '보행자 감지', vehicle: 'AV-BSN-04521', result: '안전 정차', status: 'resolved' },
        { id: 3, time: '12:10:12', type: '신호 위반 차량', vehicle: 'AV-DGU-07823', result: '긴급 회피', status: 'resolved' },
        { id: 4, time: '12:02:45', type: '낙하물 감지', vehicle: 'AV-ICN-03421', result: '경로 변경', status: 'resolved' }
    ]);

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setSafetyStats(prev => ({
                ...prev,
                totalAlerts: prev.totalAlerts + Math.floor(Math.random() * 3),
                resolved: prev.resolved + Math.floor(Math.random() * 3),
                avgResponseTime: 0.5 + Math.random() * 0.8
            }));

            // 새 인시던트 추가
            if (Math.random() > 0.7) {
                const types = ['급정거 감지', '보행자 감지', '장애물 감지', '차선 이탈 방지'];
                const regions = ['SEL', 'GYG', 'BSN', 'DGU', 'ICN'];
                setRecentIncidents(prev => [{
                    id: Date.now(),
                    time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
                    type: types[Math.floor(Math.random() * types.length)],
                    vehicle: `AV-${regions[Math.floor(Math.random() * regions.length)]}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
                    result: '자동 회피 성공',
                    status: 'resolved'
                }, ...prev.slice(0, 9)]);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            {/* 안전 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="text-green-200 text-sm">오늘 사고</div>
                    <div className="text-4xl font-bold">{safetyStats.accidentsToday}</div>
                    <div className="text-green-300 text-xs mt-1">🎯 목표: 0건 유지</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <div className="text-yellow-200 text-sm">활성 경고</div>
                    <div className="text-2xl font-bold">{safetyStats.warningAlerts}</div>
                    <div className="text-yellow-300 text-xs mt-1">주의 필요</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="text-blue-200 text-sm">처리 완료</div>
                    <div className="text-2xl font-bold">{safetyStats.resolved}</div>
                    <div className="text-blue-300 text-xs mt-1">오늘 누적</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="text-purple-200 text-sm">평균 대응시간</div>
                    <div className="text-2xl font-bold">{safetyStats.avgResponseTime.toFixed(1)}초</div>
                    <div className="text-purple-300 text-xs mt-1">AI 자동 대응</div>
                </div>
            </div>

            {/* 무사고 강조 */}
            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">🛡️</div>
                <h3 className="text-3xl font-bold text-green-400 mb-2">무사고 운행 중</h3>
                <p className="text-gray-400">사회적 자율주행 시스템은 중앙 관제를 통해 충돌 불가능한 경로만 배정합니다</p>
                <div className="mt-4 flex justify-center gap-8">
                    <div>
                        <div className="text-2xl font-bold text-green-400">365일</div>
                        <div className="text-sm text-gray-500">연속 무사고</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-cyan-400">847</div>
                        <div className="text-sm text-gray-500">사고 예방 건수</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-purple-400">100%</div>
                        <div className="text-sm text-gray-500">위험 회피율</div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* 활성 경고 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <i className="fas fa-exclamation-triangle text-yellow-400 mr-2"></i>
                        활성 경고
                        <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                            {activeAlerts.length}건
                        </span>
                    </h3>
                    <div className="space-y-3">
                        {activeAlerts.map(alert => (
                            <div key={alert.id} className={`p-4 rounded-lg border ${
                                alert.level === 'critical' ? 'bg-red-900/30 border-red-500/50' :
                                alert.level === 'warning' ? 'bg-yellow-900/30 border-yellow-500/50' :
                                'bg-blue-900/30 border-blue-500/50'
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        alert.level === 'critical' ? 'bg-red-500/20 text-red-400' :
                                        alert.level === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-blue-500/20 text-blue-400'
                                    }`}>
                                        {alert.level === 'critical' ? '🚨 긴급' : alert.level === 'warning' ? '⚠️ 주의' : 'ℹ️ 정보'}
                                    </span>
                                    <span className="text-xs text-gray-500">{alert.time}</span>
                                </div>
                                <div className="font-medium mb-1">{alert.type} - {alert.region}</div>
                                <div className="text-sm text-gray-400">{alert.message}</div>
                                <div className="text-xs text-gray-500 mt-2">영향: {alert.affected.toLocaleString()}대</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 최근 인시던트 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                        <i className="fas fa-shield-alt text-green-400 mr-2"></i>
                        자동 위험 회피 로그
                        <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LIVE</span>
                    </h3>
                    <div className="space-y-2">
                        {recentIncidents.map((inc, idx) => (
                            <div key={inc.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                                idx === 0 ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-700/30'
                            }`}>
                                <span className="text-green-400">✓</span>
                                <span className="text-xs text-gray-500 font-mono w-20">{inc.time}</span>
                                <span className="text-xs bg-gray-600 px-2 py-1 rounded">{inc.type}</span>
                                <span className="text-xs text-gray-400 font-mono">{inc.vehicle}</span>
                                <span className="text-xs text-green-400 ml-auto">{inc.result}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* OpenHash 안전 보장 */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-shield-alt text-2xl text-red-400"></i>
                    <div>
                        <h3 className="text-lg font-bold text-red-400">OpenHash 안전 데이터 무결성</h3>
                        <p className="text-sm text-gray-400">허위 센서 데이터는 사고를 유발합니다. 모든 안전 데이터는 OpenHash로 검증됩니다.</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-400">100%</div>
                        <div className="text-xs text-gray-400">센서 데이터 검증</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-cyan-400">0건</div>
                        <div className="text-xs text-gray-400">허위 데이터 차단</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-purple-400">실시간</div>
                        <div className="text-xs text-gray-400">이상 감지</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-yellow-400">영구</div>
                        <div className="text-xs text-gray-400">사고 기록 보존</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
