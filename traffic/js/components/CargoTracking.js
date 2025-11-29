const CargoTracking = () => {
    const [cargoStats, setCargoStats] = React.useState({
        totalShipments: 43218,
        inTransit: 28934,
        delivered: 12847,
        pending: 1437,
        avgDeliveryTime: 2.4,
        onTimeRate: 98.2
    });

    const [shipments, setShipments] = React.useState([
        { id: 'CRG-2025-00001', sender: '삼성전자', from: '수원 물류센터', to: '서울 전역', items: 2500, status: 'transit', progress: 67, vehicle: 'AV-GYG-T0012', eta: '14:30' },
        { id: 'CRG-2025-00002', sender: '쿠팡', from: '인천 풀필먼트', to: '경기 남부', items: 8900, status: 'transit', progress: 34, vehicle: 'AV-ICN-T0089', eta: '15:45' },
        { id: 'CRG-2025-00003', sender: 'CJ대한통운', from: '대전 허브', to: '충남 전역', items: 3200, status: 'loading', progress: 0, vehicle: 'AV-DJN-T0045', eta: '16:20' },
        { id: 'CRG-2025-00004', sender: '롯데택배', from: '부산항', to: '대구 물류단지', items: 5600, status: 'transit', progress: 89, vehicle: 'AV-BSN-T0023', eta: '13:15' },
        { id: 'CRG-2025-00005', sender: '한진택배', from: '인천공항', to: '서울 강남', items: 450, status: 'delivered', progress: 100, vehicle: 'AV-ICN-T0156', eta: '완료' }
    ]);

    const [trackingDetail, setTrackingDetail] = React.useState(null);

    // 실시간 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCargoStats(prev => ({
                ...prev,
                inTransit: 28000 + Math.floor(Math.random() * 2000),
                delivered: prev.delivered + Math.floor(Math.random() * 10),
                onTimeRate: 97 + Math.random() * 2.5
            }));

            setShipments(prev => prev.map(s => ({
                ...s,
                progress: s.status === 'transit' ? Math.min(100, s.progress + Math.random() * 3) : s.progress,
                status: s.progress >= 100 ? 'delivered' : s.status
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            {/* 핵심 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <div className="text-yellow-200 text-sm">총 화물</div>
                    <div className="text-2xl font-bold">{cargoStats.totalShipments.toLocaleString()}</div>
                    <div className="text-yellow-300 text-xs mt-1">오늘 처리</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <div className="text-blue-200 text-sm">배송 중</div>
                    <div className="text-2xl font-bold">{cargoStats.inTransit.toLocaleString()}</div>
                    <div className="flex items-center text-blue-300 text-xs mt-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-1 pulse-dot"></span>실시간
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <div className="text-green-200 text-sm">배송 완료</div>
                    <div className="text-2xl font-bold">{cargoStats.delivered.toLocaleString()}</div>
                    <div className="text-green-300 text-xs mt-1">✓ 정상 도착</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <div className="text-purple-200 text-sm">정시 배송률</div>
                    <div className="text-2xl font-bold">{cargoStats.onTimeRate.toFixed(1)}%</div>
                    <div className="text-purple-300 text-xs mt-1">목표: 99%</div>
                </div>
            </div>

            {/* 화물 목록 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                    <i className="fas fa-boxes text-yellow-400 mr-2"></i>
                    실시간 화물 추적
                    <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">LIVE</span>
                </h3>
                <div className="space-y-4">
                    {shipments.map(s => (
                        <div key={s.id} className="bg-gray-700/50 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📦</span>
                                    <div>
                                        <div className="font-bold">{s.sender}</div>
                                        <div className="text-xs text-gray-400 font-mono">{s.id}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs ${
                                        s.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                                        s.status === 'transit' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-gray-500/20 text-gray-400'
                                    }`}>
                                        {s.status === 'delivered' ? '✓ 배송완료' : s.status === 'transit' ? '🚛 배송중' : '📥 상차중'}
                                    </span>
                                    <div className="text-xs text-gray-500 mt-1">ETA: {s.eta}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-2 text-sm">
                                <span className="text-gray-400">{s.from}</span>
                                <span className="text-gray-400">{s.to}</span>
                            </div>

                            <div className="relative mb-3">
                                <div className="bg-gray-600 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full transition-all duration-500 ${
                                            s.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                                        }`}
                                        style={{ width: `${s.progress}%` }}
                                    ></div>
                                </div>
                                {s.status === 'transit' && (
                                    <div 
                                        className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
                                        style={{ left: `${s.progress}%`, transform: 'translate(-50%, -50%)' }}
                                    >
                                        🚛
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>📦 {s.items.toLocaleString()}개</span>
                                <span>🚛 {s.vehicle}</span>
                                <span>{s.progress.toFixed(0)}% 완료</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* OpenHash 화물 무결성 */}
            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-indigo-400 mb-4">
                    <i className="fas fa-shield-alt mr-2"></i>
                    OpenHash 화물 무결성 보장
                </h3>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400">100%</div>
                        <div className="text-sm text-gray-400">위치 데이터 검증</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-cyan-400">실시간</div>
                        <div className="text-sm text-gray-400">배송 상태 추적</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-400">영구</div>
                        <div className="text-sm text-gray-400">배송 기록 보존</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-yellow-400">0건</div>
                        <div className="text-sm text-gray-400">분실/도난</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
