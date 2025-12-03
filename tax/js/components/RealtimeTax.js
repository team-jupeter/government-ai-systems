const RealtimeTax = () => {
    const [taxStream, setTaxStream] = React.useState([]);
    const [totalToday, setTotalToday] = React.useState(124730000000);
    const [tps, setTps] = React.useState(374.76);
    const [regionStats, setRegionStats] = React.useState([
        { name: '서울', amount: 55200000000, ratio: 44.2 },
        { name: '경기', amount: 21100000000, ratio: 16.9 },
        { name: '부산', amount: 20200000000, ratio: 16.2 },
        { name: '인천', amount: 8900000000, ratio: 7.1 },
        { name: '대전', amount: 8900000000, ratio: 7.1 },
        { name: '광주', amount: 6200000000, ratio: 5.0 },
        { name: '대구', amount: 4230000000, ratio: 3.5 }
    ]);

    const taxTypes = [
        { type: '종합소득세', icon: 'fa-user', color: 'cyan' },
        { type: '법인세', icon: 'fa-building', color: 'purple' },
        { type: '부가가치세', icon: 'fa-shopping-cart', color: 'green' },
        { type: '원천세', icon: 'fa-hand-holding-usd', color: 'yellow' },
        { type: '양도소득세', icon: 'fa-home', color: 'orange' },
        { type: '상속세', icon: 'fa-gift', color: 'pink' }
    ];

    const regions = ['서울', '경기', '부산', '인천', '대전', '광주', '대구', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

    React.useEffect(() => {
        const interval = setInterval(() => {
            // 새 세금 징수 이벤트 생성
            const taxType = taxTypes[Math.floor(Math.random() * taxTypes.length)];
            const region = regions[Math.floor(Math.random() * regions.length)];
            const amount = Math.floor(Math.random() * 500000000) + 1000000;
            const layer = Math.random() < 0.65 ? 1 : Math.random() < 0.9 ? 2 : Math.random() < 0.98 ? 3 : 4;
            
            const newEvent = {
                id: `TAX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: taxType.type,
                icon: taxType.icon,
                color: taxType.color,
                region: region,
                layer: layer,
                amount: amount,
                taxpayerId: `${Math.random() < 0.7 ? '개인' : '법인'}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                timestamp: new Date().toISOString(),
                hashChain: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
                verified: true
            };
            
            setTaxStream(prev => [newEvent, ...prev.slice(0, 49)]);
            setTotalToday(prev => prev + amount);
            setTps(350 + Math.random() * 50);
        }, 2000);
        
        return () => clearInterval(interval);
    }, []);

    const formatKRW = (num) => {
        if (num >= 1000000000000) return `₩${(num / 1000000000000).toFixed(2)}조`;
        if (num >= 100000000) return `₩${(num / 100000000).toFixed(2)}억`;
        if (num >= 10000) return `₩${(num / 10000).toFixed(0)}만`;
        return `₩${num.toLocaleString()}`;
    };

    const getLayerColor = (layer) => {
        const colors = ['blue', 'green', 'purple', 'cyan'];
        return colors[layer - 1] || 'gray';
    };

    const getLayerName = (layer) => {
        const names = ['읍면동', '시군구', '광역시도', '국가'];
        return names[layer - 1] || '';
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 상단 실시간 지표 */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-6 border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">오늘 총 징수액</span>
                        <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full animate-pulse">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            LIVE
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-white number-ticker">{formatKRW(totalToday)}</div>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-2xl p-6 border border-cyan-500/30">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">처리 속도</span>
                        <span className="text-xs text-cyan-400">FPGA 가속</span>
                    </div>
                    <div className="text-3xl font-bold text-cyan-400 number-ticker">{tps.toFixed(2)} TPS</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">오늘 건수</span>
                        <span className="text-xs text-purple-400">자동 처리</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-400 number-ticker">{taxStream.length.toLocaleString()}건</div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-2xl p-6 border border-yellow-500/30">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">탈세 탐지율</span>
                        <span className="text-xs text-yellow-400">AI 분석</span>
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">99.2%</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* 실시간 스트림 */}
                <div className="col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <i className="fas fa-stream text-cyan-400"></i>
                            실시간 세금 징수 스트림
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm text-green-400">연결됨</span>
                        </div>
                    </div>
                    
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {taxStream.map((event, idx) => (
                            <div 
                                key={event.id}
                                className={`p-4 rounded-xl border transition-all ${
                                    idx === 0 
                                        ? 'bg-cyan-500/10 border-cyan-500/30 scale-[1.02]' 
                                        : 'bg-gray-700/50 border-gray-600'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${event.color}-500/20`}>
                                            <i className={`fas ${event.icon} text-${event.color}-400`}></i>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white">{event.type}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full bg-${getLayerColor(event.layer)}-500/20 text-${getLayerColor(event.layer)}-400`}>
                                                    L{event.layer} {getLayerName(event.layer)}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                                                <span><i className="fas fa-map-marker-alt mr-1"></i>{event.region}</span>
                                                <span><i className="fas fa-user mr-1"></i>{event.taxpayerId}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-white">{formatKRW(event.amount)}</div>
                                        <div className="text-xs text-gray-400">
                                            {new Date(event.timestamp).toLocaleTimeString('ko-KR')}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-xs">
                                    <div className="text-gray-500 font-mono truncate max-w-[300px]">
                                        Hash: {event.hashChain.substring(0, 20)}...
                                    </div>
                                    <span className="flex items-center gap-1 text-green-400">
                                        <i className="fas fa-check-circle"></i>
                                        OpenHash 검증됨
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 지역별 현황 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <i className="fas fa-map text-purple-400"></i>
                        지역별 징수 현황
                    </h3>
                    <div className="space-y-4">
                        {regionStats.map((region, idx) => (
                            <div key={region.name}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-gray-300">{region.name}</span>
                                    <span className="text-white font-medium">{formatKRW(region.amount)}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            idx === 0 ? 'bg-cyan-500' :
                                            idx === 1 ? 'bg-blue-500' :
                                            idx === 2 ? 'bg-purple-500' :
                                            'bg-green-500'
                                        }`}
                                        style={{ width: `${region.ratio * 2}%` }}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-400 text-right mt-1">{region.ratio}%</div>
                            </div>
                        ))}
                    </div>

                    {/* Layer별 분포 */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <h4 className="text-lg font-bold mb-4">Layer별 처리 분포</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                                <div className="text-xs text-blue-400">Layer 1 (읍면동)</div>
                                <div className="text-xl font-bold text-white">65%</div>
                            </div>
                            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                                <div className="text-xs text-green-400">Layer 2 (시군구)</div>
                                <div className="text-xl font-bold text-white">25%</div>
                            </div>
                            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
                                <div className="text-xs text-purple-400">Layer 3 (광역시도)</div>
                                <div className="text-xl font-bold text-white">9%</div>
                            </div>
                            <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/30">
                                <div className="text-xs text-cyan-400">Layer 4 (국가)</div>
                                <div className="text-xl font-bold text-white">1%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
