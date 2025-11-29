const PassengerPDV = () => {
    const [isUnlocked, setIsUnlocked] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState('overview');
    const [authStep, setAuthStep] = React.useState(0);

    const [userData, setUserData] = React.useState({
        id: 'PDV-2024-KR-00001',
        name: '김*수',
        verified: true,
        lastAccess: '2025-11-29 12:30:45'
    });

    const [travelHistory, setTravelHistory] = React.useState([
        { id: 1, date: '2025-11-29', from: '서울 강남역', to: '서울 홍대입구', distance: '12.4km', duration: '23분', cost: 4200, vehicle: 'AV-SEL-00142' },
        { id: 2, date: '2025-11-29', from: '서울 홍대입구', to: '서울 여의도', distance: '8.2km', duration: '18분', cost: 3100, vehicle: 'AV-SEL-00891' },
        { id: 3, date: '2025-11-28', from: '인천공항 T2', to: '서울 강남', distance: '58.3km', duration: '45분', cost: 15800, vehicle: 'AV-ICN-12893' },
        { id: 4, date: '2025-11-28', from: '서울 강남', to: '인천공항 T2', distance: '58.3km', duration: '42분', cost: 15800, vehicle: 'AV-SEL-05234' },
        { id: 5, date: '2025-11-27', from: '서울 삼성역', to: '서울 강남역', distance: '2.1km', duration: '8분', cost: 1500, vehicle: 'AV-SEL-00456' }
    ]);

    const [monthlyStats, setMonthlyStats] = React.useState({
        totalTrips: 47,
        totalDistance: 423.5,
        totalCost: 89400,
        avgTripDistance: 9.0,
        carbonSaved: 84.7,
        favoriteRoute: '강남역 ↔ 홍대입구'
    });

    const [privacySettings, setPrivacySettings] = React.useState({
        shareWithGovernment: false,
        shareWithInsurance: false,
        shareWithResearch: true,
        locationHistory: true,
        anonymizedStats: true
    });

    const handleAuth = () => {
        if (authStep < 2) {
            setAuthStep(authStep + 1);
        } else {
            setIsUnlocked(true);
        }
    };

    const tabs = [
        { id: 'overview', name: '개요', icon: 'fa-home' },
        { id: 'history', name: '이동 기록', icon: 'fa-history' },
        { id: 'stats', name: '통계', icon: 'fa-chart-bar' },
        { id: 'privacy', name: '개인정보 설정', icon: 'fa-shield-alt' },
        { id: 'sharing', name: '데이터 공유', icon: 'fa-share-alt' }
    ];

    if (!isUnlocked) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center border border-indigo-500/30">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-lock text-3xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">개인 이동 정보 금고</h2>
                    <p className="text-gray-400 mb-6">본인 확인이 필요합니다</p>
                    
                    <div className="space-y-4 mb-6">
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${authStep >= 1 ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-700/50'}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${authStep >= 1 ? 'bg-green-500' : 'bg-gray-600'}`}>
                                {authStep >= 1 ? '✓' : '1'}
                            </span>
                            <span>생체 인증 (얼굴/지문)</span>
                        </div>
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${authStep >= 2 ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-700/50'}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${authStep >= 2 ? 'bg-green-500' : 'bg-gray-600'}`}>
                                {authStep >= 2 ? '✓' : '2'}
                            </span>
                            <span>개인 PIN 번호</span>
                        </div>
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${authStep >= 3 ? 'bg-green-900/30 border border-green-500/30' : 'bg-gray-700/50'}`}>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${authStep >= 3 ? 'bg-green-500' : 'bg-gray-600'}`}>
                                {authStep >= 3 ? '✓' : '3'}
                            </span>
                            <span>OpenHash 분산 검증</span>
                        </div>
                    </div>

                    <button
                        onClick={handleAuth}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition"
                    >
                        {authStep === 0 ? '🔐 생체 인증 시작' : authStep === 1 ? '🔢 PIN 입력' : '🔗 OpenHash 검증'}
                    </button>

                    <p className="text-xs text-gray-500 mt-4">
                        <i className="fas fa-shield-alt text-indigo-400 mr-1"></i>
                        모든 인증 과정은 OpenHash로 암호화됩니다
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 사용자 정보 헤더 */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                            <i className="fas fa-user text-2xl"></i>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{userData.name}</div>
                            <div className="text-sm text-gray-400 font-mono">{userData.id}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-green-400">
                            <i className="fas fa-shield-alt"></i>
                            <span>OpenHash 검증됨</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">최근 접근: {userData.lastAccess}</div>
                    </div>
                </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                            selectedTab === tab.id
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            {selectedTab === 'overview' && (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="text-gray-400 text-sm mb-2">이번 달 이동</div>
                        <div className="text-3xl font-bold text-indigo-400">{monthlyStats.totalTrips}회</div>
                        <div className="text-sm text-gray-500 mt-1">총 {monthlyStats.totalDistance}km</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="text-gray-400 text-sm mb-2">이번 달 비용</div>
                        <div className="text-3xl font-bold text-green-400">₩{monthlyStats.totalCost.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 mt-1">평균 ₩{Math.floor(monthlyStats.totalCost / monthlyStats.totalTrips).toLocaleString()}/회</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="text-gray-400 text-sm mb-2">탄소 절감</div>
                        <div className="text-3xl font-bold text-cyan-400">{monthlyStats.carbonSaved}kg</div>
                        <div className="text-sm text-gray-500 mt-1">🌱 나무 8그루 효과</div>
                    </div>
                </div>
            )}

            {selectedTab === 'history' && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">최근 이동 기록</h3>
                    <div className="space-y-3">
                        {travelHistory.map(trip => (
                            <div key={trip.id} className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">{trip.date}</span>
                                    <span className="text-xs font-mono text-gray-500">{trip.vehicle}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-white">{trip.from}</span>
                                    <span className="text-indigo-400">→</span>
                                    <span className="text-white">{trip.to}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>{trip.distance} / {trip.duration}</span>
                                    <span className="text-green-400">₩{trip.cost.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'stats' && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">이동 통계</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm">자주 이용하는 경로</div>
                            <div className="text-lg font-bold mt-1">{monthlyStats.favoriteRoute}</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm">평균 이동 거리</div>
                            <div className="text-lg font-bold mt-1">{monthlyStats.avgTripDistance}km</div>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'privacy' && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">개인정보 설정</h3>
                    <div className="space-y-4">
                        {Object.entries(privacySettings).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                <span>{key === 'shareWithGovernment' ? '정부 기관 공유' :
                                       key === 'shareWithInsurance' ? '보험사 공유' :
                                       key === 'shareWithResearch' ? '연구 목적 공유 (익명화)' :
                                       key === 'locationHistory' ? '위치 기록 저장' : '익명 통계 제공'}</span>
                                <button
                                    onClick={() => setPrivacySettings(prev => ({ ...prev, [key]: !value }))}
                                    className={`w-12 h-6 rounded-full transition ${value ? 'bg-indigo-600' : 'bg-gray-600'}`}
                                >
                                    <span className={`block w-5 h-5 bg-white rounded-full transition transform ${value ? 'translate-x-6' : 'translate-x-0.5'}`}></span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'sharing' && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">데이터 공유 현황</h3>
                    <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4">
                        <p className="text-gray-400">
                            <i className="fas fa-info-circle text-indigo-400 mr-2"></i>
                            모든 데이터 공유는 OpenHash로 기록되며, 언제든지 공유를 철회할 수 있습니다.
                        </p>
                    </div>
                </div>
            )}

            {/* 잠금 버튼 */}
            <div className="text-center">
                <button
                    onClick={() => { setIsUnlocked(false); setAuthStep(0); }}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition"
                >
                    <i className="fas fa-lock mr-2"></i>금고 잠금
                </button>
            </div>
        </div>
    );
};
