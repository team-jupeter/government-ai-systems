const SmartWatchTracker = () => {
    const [citizens, setCitizens] = React.useState([]);
    const [selectedCitizen, setSelectedCitizen] = React.useState(null);
    const [screenIndex, setScreenIndex] = React.useState(0);

    const screens = ['vitals', 'activity', 'nutrition', 'location'];

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/meal/citizens/sample');
                const data = await res.json();
                setCitizens(data.citizens || []);
            } catch (err) {
                console.error('Failed to fetch citizens:', err);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setScreenIndex(prev => (prev + 1) % screens.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const regionNames = {
        seoul: '서울', busan: '부산', daegu: '대구', incheon: '인천',
        gwangju: '광주', daejeon: '대전', ulsan: '울산', sejong: '세종',
        gyeonggi: '경기', gangwon: '강원', chungbuk: '충북', chungnam: '충남',
        jeonbuk: '전북', jeonnam: '전남', gyeongbuk: '경북', gyeongnam: '경남', jeju: '제주'
    };

    const renderWatchScreen = (citizen) => {
        const currentScreen = screens[screenIndex];
        switch(currentScreen) {
            case 'vitals':
                return (
                    <div className="text-center">
                        <div className="text-red-400 text-3xl font-bold">{citizen.vital_signs?.heart_rate || 72}</div>
                        <div className="text-xs text-gray-400">BPM</div>
                        <div className="text-sm mt-2">{citizen.vital_signs?.blood_pressure || '120/80'}</div>
                    </div>
                );
            case 'activity':
                return (
                    <div className="text-center">
                        <div className="text-green-400 text-3xl font-bold">{citizen.vital_signs?.steps_today?.toLocaleString() || '8,432'}</div>
                        <div className="text-xs text-gray-400">걸음</div>
                        <div className="text-sm mt-2">{citizen.vital_signs?.calories_burned || 1800} kcal</div>
                    </div>
                );
            case 'nutrition':
                return (
                    <div className="text-center">
                        <div className="text-yellow-400 text-2xl font-bold">🍱</div>
                        <div className="text-sm mt-1">다음 식사</div>
                        <div className="text-xs text-gray-400">12:30 점심</div>
                    </div>
                );
            case 'location':
                return (
                    <div className="text-center">
                        <div className="text-cyan-400 text-2xl">📍</div>
                        <div className="text-lg font-bold">{regionNames[citizen.current_region]}</div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">
                    <i className="fas fa-watch text-green-400 mr-2"></i>
                    생체감지 스마트워치 추적
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                    5천만 국민의 실시간 위치와 건강 데이터를 추적하여 최적의 급식을 제공합니다.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {citizens.map(citizen => (
                        <div key={citizen.id} onClick={() => setSelectedCitizen(citizen)} className="cursor-pointer">
                            <div className="bg-gray-900 rounded-3xl p-1 border-4 border-gray-700 shadow-xl">
                                <div className="bg-black rounded-2xl p-3 aspect-square flex flex-col">
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span>{new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span>🔋</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center">
                                        {renderWatchScreen(citizen)}
                                    </div>
                                    <div className="text-center text-xs text-gray-400 mt-2">{citizen.name}</div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-2 space-x-1">
                                {screens.map((_, idx) => (
                                    <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === screenIndex ? 'bg-cyan-400' : 'bg-gray-600'}`}></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedCitizen && (
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">
                        <i className="fas fa-user text-cyan-400 mr-2"></i>{selectedCitizen.name} 상세 정보
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm">나이/성별</div>
                            <div className="text-lg font-bold">{selectedCitizen.age}세 {selectedCitizen.gender}</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm">BMI</div>
                            <div className="text-lg font-bold">{selectedCitizen.bmi}</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm">현재 위치</div>
                            <div className="text-lg font-bold text-cyan-400">{regionNames[selectedCitizen.current_region]}</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm">건강 점수</div>
                            <div className={`text-lg font-bold ${selectedCitizen.health_score >= 80 ? 'text-green-400' : selectedCitizen.health_score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                {selectedCitizen.health_score}점
                            </div>
                        </div>
                    </div>
                    {selectedCitizen.allergies?.length > 0 && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <span className="text-red-400 font-bold">⚠️ 알레르기: </span>
                            <span className="text-red-300">{selectedCitizen.allergies.join(', ')}</span>
                        </div>
                    )}
                    {selectedCitizen.home_region !== selectedCitizen.current_region && (
                        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <span className="text-yellow-400 font-bold">📍 이동 감지: </span>
                            <span className="text-yellow-300">
                                거주지({regionNames[selectedCitizen.home_region]})에서 현재({regionNames[selectedCitizen.current_region]})로 이동
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
