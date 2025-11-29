const PDVNutrition = () => {
    const [isUnlocked, setIsUnlocked] = React.useState(false);
    const [citizens, setCitizens] = React.useState([]);
    const [selectedCitizen, setSelectedCitizen] = React.useState(null);
    const [nutritionData, setNutritionData] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('overview');

    React.useEffect(() => {
        fetch('/api/meal/citizens/sample')
            .then(res => res.json())
            .then(data => setCitizens(data.citizens || []));
    }, []);

    const handleUnlock = () => {
        setTimeout(() => setIsUnlocked(true), 1500);
    };

    const loadNutrition = async (citizen) => {
        setSelectedCitizen(citizen);
        try {
            const res = await fetch(`/api/meal/citizen/${citizen.id}/nutrition`);
            const data = await res.json();
            setNutritionData(data);
        } catch (err) {
            console.error('Failed to load nutrition:', err);
        }
    };

    const tabs = [
        { id: 'overview', name: '개요', icon: 'fa-chart-pie' },
        { id: 'biometric', name: '생체지표', icon: 'fa-heartbeat' },
        { id: 'activity', name: '활동수준', icon: 'fa-running' },
        { id: 'disease', name: '질병관리', icon: 'fa-notes-medical' },
        { id: 'preference', name: '기호/문화', icon: 'fa-utensils' },
        { id: 'menu', name: '추천메뉴', icon: 'fa-clipboard-list' }
    ];

    if (!isUnlocked) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="bg-gray-800 rounded-2xl p-8 text-center max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-2xl font-bold mb-2">개인정보금고 (PDV)</h3>
                    <p className="text-gray-400 mb-6">
                        AES-256 암호화된 개인 영양 데이터에 접근하려면 생체 인증이 필요합니다.
                    </p>
                    <button
                        onClick={handleUnlock}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                    >
                        <i className="fas fa-fingerprint mr-2"></i>생체 인증
                    </button>
                    <div className="mt-6 text-xs text-gray-500">
                        <i className="fas fa-shield-alt mr-1"></i>
                        OpenHash 기반 데이터 무결성 검증
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <i className="fas fa-unlock text-green-400 text-2xl mr-3"></i>
                    <div>
                        <div className="font-bold text-green-400">PDV 잠금 해제됨</div>
                        <div className="text-sm text-gray-400">5차원 개인맞춤 영양분석 시스템</div>
                    </div>
                </div>
                <button onClick={() => setIsUnlocked(false)} className="text-gray-400 hover:text-white">
                    <i className="fas fa-lock"></i> 잠금
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-xl p-4">
                    <h4 className="font-bold mb-4">시민 선택</h4>
                    <div className="space-y-2">
                        {citizens.map(citizen => (
                            <div
                                key={citizen.id}
                                onClick={() => loadNutrition(citizen)}
                                className={`p-3 rounded-lg cursor-pointer transition-all ${
                                    selectedCitizen?.id === citizen.id
                                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                                        : 'bg-gray-700/50 hover:bg-gray-700'
                                }`}
                            >
                                <div className="font-medium">{citizen.name}</div>
                                <div className="text-xs text-gray-400">{citizen.age}세 {citizen.gender}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-3">
                    {nutritionData ? (
                        <div className="bg-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">{nutritionData.name} 영양분석</h3>
                                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                                    <i className="fas fa-link mr-1"></i>OpenHash 검증됨
                                </span>
                            </div>

                            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-cyan-500 text-white'
                                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                    >
                                        <i className={`fas ${tab.icon} mr-2`}></i>{tab.name}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'overview' && (
                                <div className="grid grid-cols-5 gap-4">
                                    {Object.entries(nutritionData.analysis || {}).map(([key, value]) => (
                                        <div key={key} className="bg-gray-700/50 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold text-cyan-400">{value.score}</div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                {key === 'biometric' ? '생체지표' :
                                                 key === 'activity' ? '활동수준' :
                                                 key === 'disease_management' ? '질병관리' :
                                                 key === 'preference_culture' ? '기호/문화' : '경제형평'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'menu' && nutritionData.recommended_menu && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {Object.entries(nutritionData.recommended_menu).map(([meal, data]) => (
                                        <div key={meal} className="bg-gray-700/50 rounded-lg p-4">
                                            <div className="font-bold text-lg mb-2 capitalize">
                                                {meal === 'breakfast' ? '🌅 아침' : meal === 'lunch' ? '☀️ 점심' : '🌙 저녁'}
                                            </div>
                                            <div className="text-cyan-400 font-medium">{data.main}</div>
                                            <div className="text-sm text-gray-400 mt-2">
                                                {data.side?.join(', ')}
                                            </div>
                                            <div className="text-xs text-yellow-400 mt-2">
                                                <i className="fas fa-fire mr-1"></i>{data.calories} kcal
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab !== 'overview' && activeTab !== 'menu' && (
                                <div className="bg-gray-700/50 rounded-lg p-6 text-center text-gray-400">
                                    <i className="fas fa-chart-line text-4xl mb-4"></i>
                                    <p>{tabs.find(t => t.id === activeTab)?.name} 상세 분석 데이터</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-xl p-12 text-center">
                            <i className="fas fa-user-circle text-6xl text-gray-600 mb-4"></i>
                            <p className="text-gray-400">왼쪽에서 시민을 선택하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
