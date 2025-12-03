const CityTerminal = () => {
    const [selectedRegion, setSelectedRegion] = React.useState('seoul');
    const [terminals, setTerminals] = React.useState({
        seoul: [
            { id: 'gangnam', name: '강남구', vehicles: 32000, stations: 45, avgWait: 2.3 },
            { id: 'seocho', name: '서초구', vehicles: 28000, stations: 38, avgWait: 2.5 },
            { id: 'songpa', name: '송파구', vehicles: 31000, stations: 42, avgWait: 2.1 },
            { id: 'gangdong', name: '강동구', vehicles: 19000, stations: 28, avgWait: 2.8 },
            { id: 'mapo', name: '마포구', vehicles: 22000, stations: 32, avgWait: 2.4 },
            { id: 'yongsan', name: '용산구', vehicles: 15000, stations: 22, avgWait: 2.6 },
            { id: 'jongno', name: '종로구', vehicles: 12000, stations: 18, avgWait: 3.1 },
            { id: 'jung', name: '중구', vehicles: 14000, stations: 20, avgWait: 2.9 }
        ],
        gyeonggi: [
            { id: 'suwon', name: '수원시', vehicles: 58000, stations: 72, avgWait: 2.2 },
            { id: 'seongnam', name: '성남시', vehicles: 52000, stations: 65, avgWait: 2.4 },
            { id: 'goyang', name: '고양시', vehicles: 48000, stations: 58, avgWait: 2.5 },
            { id: 'yongin', name: '용인시', vehicles: 55000, stations: 68, avgWait: 2.3 },
            { id: 'bucheon', name: '부천시', vehicles: 38000, stations: 45, avgWait: 2.6 }
        ],
        busan: [
            { id: 'haeundae', name: '해운대구', vehicles: 28000, stations: 35, avgWait: 2.4 },
            { id: 'busanjin', name: '부산진구', vehicles: 24000, stations: 30, avgWait: 2.6 },
            { id: 'dong', name: '동구', vehicles: 15000, stations: 18, avgWait: 2.8 },
            { id: 'nam', name: '남구', vehicles: 18000, stations: 22, avgWait: 2.5 }
        ]
    });

    const [terminalStats, setTerminalStats] = React.useState({
        total: 226,
        active: 226,
        totalStations: 4520,
        avgWaitTime: 2.5
    });

    const regions = [
        { id: 'seoul', name: '서울' },
        { id: 'gyeonggi', name: '경기' },
        { id: 'busan', name: '부산' }
    ];

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTerminals(prev => {
                const updated = { ...prev };
                Object.keys(updated).forEach(region => {
                    updated[region] = updated[region].map(t => ({
                        ...t,
                        vehicles: Math.floor(t.vehicles * (0.95 + Math.random() * 0.1)),
                        avgWait: Math.max(1, t.avgWait + (Math.random() - 0.5) * 0.5)
                    }));
                });
                return updated;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentTerminals = terminals[selectedRegion] || [];

    return (
        <div className="space-y-6">
            {/* 전체 현황 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="text-blue-200 text-sm">시군구 터미널</div>
                    <div className="text-2xl font-bold">{terminalStats.total}개</div>
                    <div className="text-blue-300 text-xs mt-1">전국 시군구</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="text-green-200 text-sm">정상 운영</div>
                    <div className="text-2xl font-bold">{terminalStats.active}개</div>
                    <div className="flex items-center text-green-300 text-xs mt-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>100%
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="text-purple-200 text-sm">승하차 스테이션</div>
                    <div className="text-2xl font-bold">{terminalStats.totalStations.toLocaleString()}</div>
                    <div className="text-purple-300 text-xs mt-1">전국 배치</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl p-5">
                    <div className="text-cyan-200 text-sm">평균 대기시간</div>
                    <div className="text-2xl font-bold">{terminalStats.avgWaitTime}분</div>
                    <div className="text-cyan-300 text-xs mt-1">목표: 3분 이내</div>
                </div>
            </div>

            {/* 지역 선택 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">
                    <i className="fas fa-city text-blue-400 mr-2"></i>
                    시군구 터미널 현황
                </h3>
                <div className="flex gap-2 mb-6">
                    {regions.map(r => (
                        <button
                            key={r.id}
                            onClick={() => setSelectedRegion(r.id)}
                            className={`px-4 py-2 rounded-lg transition ${
                                selectedRegion === r.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                        >
                            {r.name}
                        </button>
                    ))}
                    <span className="ml-auto text-sm text-gray-500">
                        * 데모: 일부 지역만 표시
                    </span>
                </div>

                {/* 터미널 목록 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentTerminals.map(t => (
                        <div key={t.id} className="bg-gray-700/50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-bold">{t.name}</span>
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">차량</span>
                                    <span className="font-medium">{(t.vehicles / 1000).toFixed(1)}K</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">스테이션</span>
                                    <span className="font-medium">{t.stations}개</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">평균 대기</span>
                                    <span className={`font-medium ${
                                        t.avgWait <= 2.5 ? 'text-green-400' :
                                        t.avgWait <= 3.5 ? 'text-yellow-400' :
                                        'text-red-400'
                                    }`}>{t.avgWait.toFixed(1)}분</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 터미널 기능 설명 */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-400 mb-4">
                    <i className="fas fa-tasks mr-2"></i>
                    L2 터미널 핵심 기능
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">📍</div>
                        <div className="font-medium text-blue-300">지역 배차</div>
                        <div className="text-xs text-gray-400 mt-1">관할 구역 내 최적 배차</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="font-medium text-green-300">경로 최적화</div>
                        <div className="text-xs text-gray-400 mt-1">지역 도로 상황 반영</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="font-medium text-yellow-300">충전 관리</div>
                        <div className="text-xs text-gray-400 mt-1">충전소 배정 및 스케줄</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="font-medium text-purple-300">수요 예측</div>
                        <div className="text-xs text-gray-400 mt-1">지역별 수요 패턴 분석</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
