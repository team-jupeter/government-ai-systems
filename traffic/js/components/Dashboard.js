const Dashboard = ({ setCurrentPage }) => {
    const [stats, setStats] = React.useState({
        totalVehicles: 3000000,
        activeVehicles: 2847523,
        passengerRequests: 156742,
        cargoRequests: 43218,
        avgSpeed: 62.4,
        routeOptimizations: 1847293,
        accidents: 0,
        dataIntegrity: 100
    });

    // 5초마다 실시간 데이터 갱신
    React.useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                activeVehicles: 2800000 + Math.floor(Math.random() * 100000),
                passengerRequests: 150000 + Math.floor(Math.random() * 20000),
                cargoRequests: 40000 + Math.floor(Math.random() * 10000),
                avgSpeed: 58 + Math.random() * 10,
                routeOptimizations: prev.routeOptimizations + Math.floor(Math.random() * 1000)
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const menuCards = [
        { id: 'national', icon: '🚗', title: '국가 차량 현황', desc: '300만대 실시간 상태 모니터링', badge: 'LIVE', color: 'indigo' },
        { id: 'control', icon: '🖥️', title: '중앙 관제 센터', desc: '전국 차량 속도/경로 중앙 결정', badge: 'LIVE', color: 'purple' },
        { id: 'routing', icon: '🗺️', title: '실시간 경로 배정', desc: '수요 발생 시 경로 즉시 재계산', badge: 'NEW', color: 'blue' },
        { id: 'demand', icon: '🤝', title: '수요-차량 매칭', desc: '승객/화물 요청 최적 배정', badge: 'LIVE', color: 'green' },
        { id: 'vehicle', icon: '📍', title: '개별 차량 모니터링', desc: '특정 차량 상세 추적', color: 'cyan' },
        { id: 'cargo', icon: '📦', title: '화물 추적', desc: '실시간 화물 위치 및 상태', badge: 'LIVE', color: 'yellow' },
        { id: 'safety', icon: '⚠️', title: '안전 경고', desc: '긴급 상황 및 사고 감지', badge: '⚠️', color: 'red' },
        { id: 'ai', icon: '🤖', title: 'AI 교통 상담', desc: 'Claude API 연동 실시간 상담', color: 'pink' },
        { id: 'openhash', icon: '🔗', title: 'OpenHash', desc: '데이터 진실성 기술 설명', badge: '검증됨', color: 'indigo' }
    ];

    return (
        <div className="space-y-8">
            {/* 핵심 지표 헤더 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6">
                    <div className="text-indigo-200 text-sm mb-1">운행 차량</div>
                    <div className="text-3xl font-bold">{stats.activeVehicles.toLocaleString()}대</div>
                    <div className="text-indigo-300 text-sm mt-1">
                        <i className="fas fa-car mr-1"></i>총 300만대 중
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6">
                    <div className="text-green-200 text-sm mb-1">승객 요청</div>
                    <div className="text-3xl font-bold">{stats.passengerRequests.toLocaleString()}건</div>
                    <div className="text-green-300 text-sm mt-1">
                        <i className="fas fa-user mr-1"></i>실시간 배정 중
                    </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-6">
                    <div className="text-yellow-200 text-sm mb-1">화물 요청</div>
                    <div className="text-3xl font-bold">{stats.cargoRequests.toLocaleString()}건</div>
                    <div className="text-yellow-300 text-sm mt-1">
                        <i className="fas fa-box mr-1"></i>배송 진행 중
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6">
                    <div className="text-purple-200 text-sm mb-1">데이터 무결성</div>
                    <div className="text-3xl font-bold">{stats.dataIntegrity}%</div>
                    <div className="text-purple-300 text-sm mt-1">
                        <i className="fas fa-shield-alt mr-1"></i>OpenHash 검증
                    </div>
                </div>
            </div>

            {/* 사회적 자율주행 핵심 개념 */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-indigo-400 mb-4">
                    <i className="fas fa-brain mr-2"></i>사회적 자율주행이란?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-red-400 mt-1">❌</span>
                            <div>
                                <div className="font-medium text-red-400">기존 자율주행</div>
                                <div className="text-sm text-gray-400">각 차량이 독립적으로 경로 결정 → 비효율, 충돌 위험</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-green-400 mt-1">✅</span>
                            <div>
                                <div className="font-medium text-green-400">사회적 자율주행</div>
                                <div className="text-sm text-gray-400">중앙 서버가 모든 차량의 속도/경로/배정 결정 → 최적화, 무사고</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-2">실시간 경로 최적화 횟수</div>
                        <div className="text-3xl font-bold text-indigo-400">{stats.routeOptimizations.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">오늘 하루 동안</div>
                    </div>
                </div>
            </div>

            {/* 메뉴 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuCards.map(card => (
                    <div
                        key={card.id}
                        onClick={() => setCurrentPage(card.id)}
                        className="bg-gray-800 rounded-xl p-6 cursor-pointer card-hover border border-gray-700 hover:border-indigo-500/50"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-4xl">{card.icon}</span>
                            {card.badge && (
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    card.badge === 'LIVE' ? 'bg-green-500/20 text-green-400' :
                                    card.badge === 'NEW' ? 'bg-blue-500/20 text-blue-400' :
                                    card.badge === '⚠️' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-indigo-500/20 text-indigo-400'
                                }`}>
                                    {card.badge === 'LIVE' && <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 pulse-dot"></span>}
                                    {card.badge}
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-gray-400 text-sm">{card.desc}</p>
                    </div>
                ))}
            </div>

            {/* OpenHash 핵심 가치 */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-exclamation-triangle text-2xl text-red-400"></i>
                    <h3 className="text-xl font-bold text-red-400">데이터 진실성이 생명입니다</h3>
                </div>
                <p className="text-gray-400">
                    차량의 속도, 경로, 위치 데이터에 허위 정보가 입력되면 <strong className="text-red-400">치명적인 사고</strong>가 발생합니다.
                    OpenHash는 모든 차량 데이터의 진실성을 암호학적으로 보장하여 무사고 교통 시스템을 실현합니다.
                </p>
            </div>
        </div>
    );
};
