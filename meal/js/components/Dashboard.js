const Dashboard = ({ setCurrentPage }) => {
    const [overview, setOverview] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/meal/national/overview');
                const data = await res.json();
                setOverview(data);
            } catch (err) {
                console.error('Failed to fetch overview:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-cyan-400 text-xl">
                    <i className="fas fa-spinner fa-spin mr-2"></i>데이터 로딩중...
                </div>
            </div>
        );
    }

    const menuCards = [
        { id: 'national', icon: '🇰🇷', title: '국가 현황', desc: '5천만 국민 급식 통계', badge: 'LIVE', color: 'cyan' },
        { id: 'regional', icon: '🏢', title: '광역 공급 (L3)', desc: '17개 광역시도 대형 공급시설', color: 'blue' },
        { id: 'city', icon: '🏙️', title: '시군구 배급 (L2)', desc: '226개 시군구 배급 센터', color: 'indigo' },
        { id: 'local', icon: '🍳', title: '읍면동 조리 (L1)', desc: '3,500개+ 조리 시설', badge: 'LIVE', color: 'purple' },
        { id: 'tracker', icon: '⌚', title: '위치 추적', desc: '스마트워치 기반 실시간 위치', badge: 'NEW', color: 'green' },
        { id: 'delivery', icon: '🚗', title: '배송 차량', desc: '자율주행 배식 차량 현황', badge: 'LIVE', color: 'yellow' },
        { id: 'nutrition', icon: '🔒', title: '개인 영양분석', desc: 'PDV 기반 5차원 영양분석', color: 'pink' },
        { id: 'ingredient', icon: '🌾', title: '식재료 조달', desc: '주간 조달 계획', color: 'orange' },
        { id: 'openhash', icon: '🔗', title: 'OpenHash', desc: '기술 설명 페이지', badge: '검증됨', color: 'cyan' }
    ];

    return (
        <div className="space-y-8">
            {/* 실시간 통계 헤더 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-xl p-6">
                    <div className="text-cyan-200 text-sm mb-1">오늘 배식 목표</div>
                    <div className="text-3xl font-bold">{overview?.meals?.target_today?.toLocaleString() || '-'}식</div>
                    <div className="text-cyan-300 text-sm mt-1">
                        <i className="fas fa-arrow-up mr-1"></i>일 3식 × 5천만명
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6">
                    <div className="text-green-200 text-sm mb-1">배송 완료</div>
                    <div className="text-3xl font-bold">{overview?.meals?.delivered?.toLocaleString() || '-'}식</div>
                    <div className="text-green-300 text-sm mt-1">
                        <i className="fas fa-check-circle mr-1"></i>{overview?.meals?.delivery_rate}% 완료
                    </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-6">
                    <div className="text-yellow-200 text-sm mb-1">조리 중</div>
                    <div className="text-3xl font-bold">{overview?.meals?.preparing?.toLocaleString() || '-'}식</div>
                    <div className="text-yellow-300 text-sm mt-1">
                        <i className="fas fa-fire mr-1"></i>1,700대 로봇셰프 가동
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6">
                    <div className="text-purple-200 text-sm mb-1">만족도</div>
                    <div className="text-3xl font-bold">{overview?.quality?.satisfaction_rate || '-'}%</div>
                    <div className="text-purple-300 text-sm mt-1">
                        <i className="fas fa-star mr-1"></i>5성급 호텔 품질
                    </div>
                </div>
            </div>

            {/* 메뉴 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menuCards.map(card => (
                    <div
                        key={card.id}
                        onClick={() => setCurrentPage(card.id)}
                        className={`bg-gray-800 rounded-xl p-6 cursor-pointer card-hover border border-gray-700 hover:border-${card.color}-500/50`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-4xl">{card.icon}</span>
                            {card.badge && (
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    card.badge === 'LIVE' ? 'bg-green-500/20 text-green-400' :
                                    card.badge === 'NEW' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-cyan-500/20 text-cyan-400'
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

            {/* 인프라 요약 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">
                    <i className="fas fa-layer-group text-cyan-400 mr-2"></i>
                    계층적 급식 인프라
                </h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                        <div className="text-3xl font-bold text-cyan-400">1</div>
                        <div className="text-sm text-gray-400">Layer 4: 국가</div>
                        <div className="text-xs text-gray-500">통합 관제</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-400">{overview?.infrastructure?.layer3_supply || 17}</div>
                        <div className="text-sm text-gray-400">Layer 3: 광역</div>
                        <div className="text-xs text-gray-500">대형 공급시설</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-400">{overview?.infrastructure?.layer2_distribution || 226}</div>
                        <div className="text-sm text-gray-400">Layer 2: 시군구</div>
                        <div className="text-xs text-gray-500">배급 센터</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                        <div className="text-3xl font-bold text-green-400">{overview?.infrastructure?.layer1_kitchens?.toLocaleString() || '3,500+'}</div>
                        <div className="text-sm text-gray-400">Layer 1: 읍면동</div>
                        <div className="text-xs text-gray-500">조리 시설</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
