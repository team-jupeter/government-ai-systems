const FoodProduction = () => {
    const [activeTab, setActiveTab] = React.useState('agriculture');
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [selectedRegion, setSelectedRegion] = React.useState('all');
    const [animationTick, setAnimationTick] = React.useState(0);
    const [showAlert, setShowAlert] = React.useState(null);

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } = RechartsLib;
    const chartsAvailable = BarChart && ResponsiveContainer;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setAnimationTick(prev => (prev + 1) % 1000);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const regions = ['경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도'];

    // 농업 데이터
    const agricultureData = [
        {
            id: 'rice', name: '쌀', icon: '🍚', unit: '만톤', annualTarget: 386, currentProduction: 352,
            byRegion: [
                { region: '경기도', production: 52, facilities: 1240, status: '정상' },
                { region: '충청남도', production: 68, facilities: 1580, status: '정상' },
                { region: '전라북도', production: 72, facilities: 1820, status: '우수' },
                { region: '전라남도', production: 65, facilities: 1650, status: '정상' },
                { region: '경상북도', production: 48, facilities: 1120, status: '주의' },
                { region: '경상남도', production: 47, facilities: 1080, status: '정상' }
            ],
            pricePerKg: 2800, trend: 'stable'
        },
        {
            id: 'cabbage', name: '배추', icon: '🥬', unit: '만톤', annualTarget: 252, currentProduction: 238,
            byRegion: [
                { region: '강원도', production: 85, facilities: 2340, status: '우수' },
                { region: '전라남도', production: 52, facilities: 1420, status: '정상' },
                { region: '경상북도', production: 48, facilities: 1280, status: '정상' },
                { region: '충청남도', production: 35, facilities: 980, status: '주의' },
                { region: '제주도', production: 18, facilities: 520, status: '정상' }
            ],
            pricePerKg: 850, trend: 'up'
        },
        {
            id: 'onion', name: '양파', icon: '🧅', unit: '만톤', annualTarget: 128, currentProduction: 135,
            byRegion: [
                { region: '전라남도', production: 58, facilities: 1850, status: '우수' },
                { region: '경상남도', production: 42, facilities: 1320, status: '우수' },
                { region: '경상북도', production: 22, facilities: 680, status: '정상' },
                { region: '제주도', production: 13, facilities: 420, status: '정상' }
            ],
            pricePerKg: 1200, trend: 'down'
        },
        {
            id: 'potato', name: '감자', icon: '🥔', unit: '만톤', annualTarget: 58, currentProduction: 52,
            byRegion: [
                { region: '강원도', production: 28, facilities: 1120, status: '정상' },
                { region: '경기도', production: 12, facilities: 480, status: '정상' },
                { region: '제주도', production: 8, facilities: 320, status: '주의' },
                { region: '경상북도', production: 4, facilities: 180, status: '정상' }
            ],
            pricePerKg: 1500, trend: 'stable'
        },
        {
            id: 'apple', name: '사과', icon: '🍎', unit: '만톤', annualTarget: 46, currentProduction: 43,
            byRegion: [
                { region: '경상북도', production: 25, facilities: 3200, status: '정상' },
                { region: '충청북도', production: 10, facilities: 1280, status: '정상' },
                { region: '강원도', production: 5, facilities: 640, status: '주의' },
                { region: '경상남도', production: 3, facilities: 380, status: '정상' }
            ],
            pricePerKg: 3500, trend: 'up'
        },
        {
            id: 'garlic', name: '마늘', icon: '🧄', unit: '만톤', annualTarget: 35, currentProduction: 32,
            byRegion: [
                { region: '전라남도', production: 15, facilities: 1850, status: '정상' },
                { region: '경상남도', production: 10, facilities: 1240, status: '정상' },
                { region: '제주도', production: 4, facilities: 520, status: '우수' },
                { region: '충청남도', production: 3, facilities: 380, status: '주의' }
            ],
            pricePerKg: 6800, trend: 'stable'
        }
    ];

    // 수산업 데이터
    const fisheryData = [
        {
            id: 'mackerel', name: '고등어', icon: '🐟', unit: '만톤', annualTarget: 18, currentProduction: 16.5,
            vessels: [
                { name: '제85동원호', tonnage: 2850, location: { lat: 35.2, lng: 129.8 }, area: '동해 근해', method: '선망', status: '조업중', catch: 85, target: 100, coop: '부산수협' },
                { name: '제32한성호', tonnage: 3200, location: { lat: 33.5, lng: 127.2 }, area: '남해 근해', method: '선망', status: '조업중', catch: 92, target: 100, coop: '통영수협' },
                { name: '제18대양호', tonnage: 4500, location: { lat: -28.5, lng: -43.2 }, area: '남대서양', method: '선망', status: '조업중', catch: 78, target: 100, coop: '원양산업' },
                { name: '제7명진호', tonnage: 2100, location: { lat: 36.8, lng: 130.5 }, area: '동해 원해', method: '유자망', status: '귀항중', catch: 95, target: 100, coop: '포항수협' },
                { name: '제51해양호', tonnage: 3800, location: { lat: -35.2, lng: 18.5 }, area: '남아공 근해', method: '선망', status: '조업중', catch: 62, target: 100, coop: '원양산업' }
            ],
            byRegion: [
                { region: '부산', production: 5.2, coops: ['부산수협', '기장수협'], status: '정상' },
                { region: '통영', production: 3.8, coops: ['통영수협'], status: '정상' },
                { region: '포항', production: 2.5, coops: ['포항수협'], status: '주의' },
                { region: '원양', production: 5.0, coops: ['원양산업', '동원산업'], status: '정상' }
            ],
            pricePerKg: 4500, trend: 'up'
        },
        {
            id: 'squid', name: '오징어', icon: '🦑', unit: '만톤', annualTarget: 12, currentProduction: 8.5,
            vessels: [
                { name: '제22오룡호', tonnage: 1800, location: { lat: 37.5, lng: 131.8 }, area: '동해 원해', method: '채낚기', status: '조업중', catch: 45, target: 100, coop: '속초수협' },
                { name: '제15청진호', tonnage: 1500, location: { lat: 38.2, lng: 130.2 }, area: '동해 북부', method: '채낚기', status: '조업중', catch: 52, target: 100, coop: '주문진수협' },
                { name: '제8동해호', tonnage: 2200, location: { lat: -42.5, lng: -62.8 }, area: '포클랜드', method: '채낚기', status: '조업중', catch: 68, target: 100, coop: '원양산업' }
            ],
            byRegion: [
                { region: '속초', production: 2.8, coops: ['속초수협'], status: '경고' },
                { region: '주문진', production: 2.2, coops: ['주문진수협'], status: '경고' },
                { region: '울릉도', production: 1.5, coops: ['울릉수협'], status: '주의' },
                { region: '원양', production: 2.0, coops: ['원양산업'], status: '정상' }
            ],
            pricePerKg: 12000, trend: 'up'
        },
        {
            id: 'anchovy', name: '멸치', icon: '🐠', unit: '만톤', annualTarget: 22, currentProduction: 20.8,
            vessels: [
                { name: '제12남해호', tonnage: 450, location: { lat: 34.5, lng: 128.2 }, area: '남해 근해', method: '권현망', status: '조업중', catch: 88, target: 100, coop: '거제수협' },
                { name: '제35거제호', tonnage: 380, location: { lat: 34.8, lng: 127.8 }, area: '여수 근해', method: '권현망', status: '조업중', catch: 95, target: 100, coop: '여수수협' }
            ],
            byRegion: [
                { region: '거제', production: 8.5, coops: ['거제수협'], status: '우수' },
                { region: '여수', production: 6.2, coops: ['여수수협'], status: '정상' },
                { region: '통영', production: 4.5, coops: ['통영수협'], status: '정상' },
                { region: '남해', production: 1.6, coops: ['남해수협'], status: '정상' }
            ],
            pricePerKg: 8500, trend: 'stable'
        },
        {
            id: 'seaweed', name: '김/해조류', icon: '🌿', unit: '만톤', annualTarget: 58, currentProduction: 62,
            vessels: [],
            byRegion: [
                { region: '완도', production: 22, coops: ['완도수협'], status: '우수' },
                { region: '해남', production: 18, coops: ['해남수협'], status: '우수' },
                { region: '신안', production: 15, coops: ['신안수협'], status: '정상' },
                { region: '부산', production: 7, coops: ['기장수협'], status: '정상' }
            ],
            pricePerKg: 15000, trend: 'stable'
        }
    ];

    // 축산업 데이터
    const livestockData = [
        {
            id: 'pork', name: '돼지고기', icon: '🐷', unit: '만톤', annualTarget: 98, currentProduction: 92,
            byRegion: [
                { region: '경기도', production: 22, facilities: 1850, heads: 2800000, status: '정상' },
                { region: '충청남도', production: 18, facilities: 1420, heads: 2200000, status: '정상' },
                { region: '경상북도', production: 16, facilities: 1280, heads: 1950000, status: '정상' },
                { region: '전라남도', production: 14, facilities: 1120, heads: 1700000, status: '주의' },
                { region: '강원도', production: 12, facilities: 980, heads: 1450000, status: '정상' },
                { region: '경상남도', production: 10, facilities: 820, heads: 1200000, status: '정상' }
            ],
            pricePerKg: 5800, trend: 'stable'
        },
        {
            id: 'beef', name: '소고기(한우)', icon: '🐄', unit: '만톤', annualTarget: 28, currentProduction: 26,
            byRegion: [
                { region: '경상북도', production: 6.5, facilities: 4200, heads: 520000, status: '정상' },
                { region: '전라남도', production: 5.2, facilities: 3800, heads: 420000, status: '정상' },
                { region: '강원도', production: 4.8, facilities: 3200, heads: 380000, status: '우수' },
                { region: '충청북도', production: 4.2, facilities: 2800, heads: 340000, status: '정상' },
                { region: '경상남도', production: 3.5, facilities: 2400, heads: 280000, status: '정상' },
                { region: '전라북도', production: 1.8, facilities: 1200, heads: 145000, status: '주의' }
            ],
            pricePerKg: 42000, trend: 'up'
        },
        {
            id: 'chicken', name: '닭고기', icon: '🐔', unit: '만톤', annualTarget: 72, currentProduction: 75,
            byRegion: [
                { region: '경기도', production: 18, facilities: 850, heads: 28000000, status: '우수' },
                { region: '충청남도', production: 15, facilities: 720, heads: 24000000, status: '우수' },
                { region: '경상북도', production: 14, facilities: 680, heads: 22000000, status: '정상' },
                { region: '전라북도', production: 12, facilities: 580, heads: 19000000, status: '정상' },
                { region: '경상남도', production: 10, facilities: 480, heads: 16000000, status: '정상' },
                { region: '전라남도', production: 6, facilities: 290, heads: 9500000, status: '정상' }
            ],
            pricePerKg: 4200, trend: 'down'
        },
        {
            id: 'egg', name: '계란', icon: '🥚', unit: '억개', annualTarget: 145, currentProduction: 142,
            byRegion: [
                { region: '경기도', production: 38, facilities: 420, heads: 32000000, status: '정상' },
                { region: '충청남도', production: 28, facilities: 320, heads: 24000000, status: '정상' },
                { region: '경상북도', production: 25, facilities: 280, heads: 21000000, status: '정상' },
                { region: '전라북도', production: 22, facilities: 250, heads: 18500000, status: '주의' },
                { region: '경상남도', production: 18, facilities: 200, heads: 15000000, status: '정상' },
                { region: '강원도', production: 11, facilities: 125, heads: 9200000, status: '정상' }
            ],
            pricePerKg: 220, trend: 'stable'
        },
        {
            id: 'milk', name: '우유', icon: '🥛', unit: '만톤', annualTarget: 210, currentProduction: 198,
            byRegion: [
                { region: '경기도', production: 52, facilities: 1850, heads: 185000, status: '정상' },
                { region: '충청남도', production: 38, facilities: 1420, heads: 138000, status: '정상' },
                { region: '강원도', production: 35, facilities: 1280, heads: 125000, status: '정상' },
                { region: '경상북도', production: 32, facilities: 1150, heads: 115000, status: '주의' },
                { region: '전라북도', production: 25, facilities: 920, heads: 90000, status: '정상' },
                { region: '제주도', production: 16, facilities: 580, heads: 58000, status: '우수' }
            ],
            pricePerKg: 1200, trend: 'stable'
        }
    ];

    const getCurrentData = () => {
        switch(activeTab) {
            case 'agriculture': return agricultureData;
            case 'fishery': return fisheryData;
            case 'livestock': return livestockData;
            default: return agricultureData;
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case '우수': return 'text-green-400 bg-green-500/20';
            case '정상': return 'text-cyan-400 bg-cyan-500/20';
            case '주의': return 'text-yellow-400 bg-yellow-500/20';
            case '경고': return 'text-red-400 bg-red-500/20';
            default: return 'text-gray-400 bg-gray-500/20';
        }
    };

    const getProgressColor = (current, target) => {
        const ratio = current / target;
        if (ratio >= 1.05) return 'bg-green-500';
        if (ratio >= 0.95) return 'bg-cyan-500';
        if (ratio >= 0.85) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const handleAlert = (item, type) => {
        setShowAlert({ item, type, timestamp: new Date().toLocaleTimeString() });
        setTimeout(() => setShowAlert(null), 5000);
    };

    const COLORS = ['#22d3ee', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    return (
        <div className="space-y-6">
            {/* 알림 배너 */}
            {showAlert && (
                <div className={'fixed top-20 right-6 z-50 p-4 rounded-xl shadow-2xl border animate-pulse ' + (showAlert.type === 'shortage' ? 'bg-red-500/20 border-red-500' : 'bg-green-500/20 border-green-500')}>
                    <div className="flex items-center">
                        <i className={'fas mr-3 text-xl ' + (showAlert.type === 'shortage' ? 'fa-exclamation-triangle text-red-400' : 'fa-check-circle text-green-400')}></i>
                        <div>
                            <div className="font-bold">{showAlert.type === 'shortage' ? '생산량 부족 경고' : '초과 생산 알림'}</div>
                            <div className="text-sm text-gray-300">{showAlert.item.name}: 대응 방안 실행 가능</div>
                        </div>
                        <button onClick={() => setShowAlert(null)} className="ml-4 px-3 py-1 bg-white/20 rounded-lg text-sm">확인</button>
                    </div>
                </div>
            )}

            {/* 헤더 */}
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold">
                            <i className="fas fa-tractor text-green-400 mr-2"></i>
                            식량 생산 현황
                        </h3>
                        <p className="text-gray-400 mt-1">농업, 수산업, 축산업 실시간 생산 모니터링</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-green-400 text-sm">실시간 업데이트 중</span>
                    </div>
                </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex space-x-2 bg-gray-800 rounded-xl p-2">
                {[
                    { id: 'agriculture', name: '농업', icon: '🌾', count: agricultureData.length },
                    { id: 'fishery', name: '수산업', icon: '🐟', count: fisheryData.length },
                    { id: 'livestock', name: '축산업', icon: '🐄', count: livestockData.length }
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={'flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 ' + (activeTab === tab.id ? 'bg-green-500 text-white' : 'text-gray-400 hover:bg-gray-700')}>
                        <span className="text-xl">{tab.icon}</span>
                        <span className="font-medium">{tab.name}</span>
                        <span className="px-2 py-0.5 bg-black/20 rounded-full text-xs">{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* 요약 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(() => {
                    const data = getCurrentData();
                    const totalTarget = data.reduce((sum, item) => sum + item.annualTarget, 0);
                    const totalProduction = data.reduce((sum, item) => sum + item.currentProduction, 0);
                    const achieveRate = ((totalProduction / totalTarget) * 100).toFixed(1);
                    const warningCount = data.filter(item => item.currentProduction / item.annualTarget < 0.9).length;
                    return [
                        { label: '품목 수', value: data.length, icon: '📦', color: 'cyan' },
                        { label: '목표 달성률', value: achieveRate + '%', icon: '📊', color: achieveRate >= 95 ? 'green' : achieveRate >= 85 ? 'yellow' : 'red' },
                        { label: '총 생산량', value: totalProduction.toFixed(0) + (activeTab === 'livestock' && data[0]?.unit === '억개' ? '억' : '만t'), icon: '🏭', color: 'purple' },
                        { label: '주의 품목', value: warningCount, icon: '⚠️', color: warningCount > 0 ? 'red' : 'green' }
                    ];
                })().map((stat, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className={'text-2xl font-bold text-' + stat.color + '-400'}>{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* 품목별 상세 현황 */}
            <div className="space-y-4">
                {getCurrentData().map((item, idx) => {
                    const achieveRate = (item.currentProduction / item.annualTarget * 100);
                    const isShortage = achieveRate < 90;
                    const isExcess = achieveRate > 105;
                    return (
                        <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden">
                            {/* 품목 헤더 */}
                            <div className="p-4 border-b border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-4xl">{item.icon}</span>
                                        <div>
                                            <h4 className="text-xl font-bold">{item.name}</h4>
                                            <div className="text-sm text-gray-400">
                                                연간 목표: {item.annualTarget}{item.unit} | 현재: {item.currentProduction}{item.unit}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {/* 달성률 */}
                                        <div className="text-right">
                                            <div className={'text-2xl font-bold ' + (achieveRate >= 95 ? 'text-green-400' : achieveRate >= 85 ? 'text-yellow-400' : 'text-red-400')}>
                                                {achieveRate.toFixed(1)}%
                                            </div>
                                            <div className="text-xs text-gray-400">달성률</div>
                                        </div>
                                        {/* 가격 동향 */}
                                        <div className="text-right">
                                            <div className="text-lg font-bold">{item.pricePerKg?.toLocaleString()}원/kg</div>
                                            <div className={'text-xs ' + (item.trend === 'up' ? 'text-red-400' : item.trend === 'down' ? 'text-green-400' : 'text-gray-400')}>
                                                {item.trend === 'up' ? '↑ 상승' : item.trend === 'down' ? '↓ 하락' : '→ 안정'}
                                            </div>
                                        </div>
                                        {/* 경고 버튼 */}
                                        {(isShortage || isExcess) && (
                                            <button onClick={() => handleAlert(item, isShortage ? 'shortage' : 'excess')}
                                                className={'px-4 py-2 rounded-lg font-medium ' + (isShortage ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30')}>
                                                <i className={'fas mr-2 ' + (isShortage ? 'fa-exclamation-triangle' : 'fa-check-circle')}></i>
                                                {isShortage ? '부족 대응' : '초과 대응'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {/* 진행률 바 */}
                                <div className="mt-4">
                                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                        <div className={'h-full transition-all duration-500 ' + getProgressColor(item.currentProduction, item.annualTarget)}
                                            style={{ width: Math.min(achieveRate, 100) + '%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* 지역별/선박별 상세 */}
                            <div className="p-4">
                                {/* 수산업 - 선박 정보 */}
                                {activeTab === 'fishery' && item.vessels && item.vessels.length > 0 && (
                                    <div className="mb-4">
                                        <h5 className="font-medium mb-3 text-cyan-400">
                                            <i className="fas fa-ship mr-2"></i>조업 선박 현황 ({item.vessels.length}척)
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {item.vessels.map((vessel, vIdx) => (
                                                <div key={vIdx} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium">{vessel.name}</span>
                                                        <span className={'px-2 py-0.5 rounded-full text-xs ' + (vessel.status === '조업중' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400')}>
                                                            {vessel.status}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs space-y-1 text-gray-400">
                                                        <div className="flex justify-between">
                                                            <span>선박톤수</span>
                                                            <span className="text-white">{vessel.tonnage.toLocaleString()}톤</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>조업 해역</span>
                                                            <span className="text-cyan-400">{vessel.area}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>위치</span>
                                                            <span className="text-yellow-400 font-mono text-xs">
                                                                {vessel.location.lat.toFixed(1)}°{vessel.location.lat >= 0 ? 'N' : 'S'}, {Math.abs(vessel.location.lng).toFixed(1)}°{vessel.location.lng >= 0 ? 'E' : 'W'}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>어법</span>
                                                            <span className="text-white">{vessel.method}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>소속</span>
                                                            <span className="text-purple-400">{vessel.coop}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span>조업 달성률</span>
                                                            <span className={vessel.catch >= 80 ? 'text-green-400' : vessel.catch >= 60 ? 'text-yellow-400' : 'text-red-400'}>
                                                                {vessel.catch}%
                                                            </span>
                                                        </div>
                                                        <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                                                            <div className={'h-full ' + (vessel.catch >= 80 ? 'bg-green-500' : vessel.catch >= 60 ? 'bg-yellow-500' : 'bg-red-500')}
                                                                style={{ width: vessel.catch + '%' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 지역별 생산 현황 */}
                                <div>
                                    <h5 className="font-medium mb-3 text-green-400">
                                        <i className="fas fa-map-marker-alt mr-2"></i>지역별 생산 현황
                                    </h5>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                        {item.byRegion.map((region, rIdx) => (
                                            <div key={rIdx} className="bg-gray-700/50 rounded-lg p-3 text-center">
                                                <div className="font-medium mb-1">{region.region}</div>
                                                <div className="text-xl font-bold text-cyan-400">{region.production}{activeTab === 'livestock' && item.unit === '억개' ? '억' : ''}</div>
                                                <div className="text-xs text-gray-400 mb-2">{item.unit}</div>
                                                <span className={'px-2 py-0.5 rounded-full text-xs ' + getStatusColor(region.status)}>
                                                    {region.status}
                                                </span>
                                                {region.facilities && (
                                                    <div className="text-xs text-gray-500 mt-2">
                                                        시설: {region.facilities.toLocaleString()}개
                                                    </div>
                                                )}
                                                {region.heads && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        두수: {(region.heads / 10000).toFixed(0)}만
                                                    </div>
                                                )}
                                                {region.coops && (
                                                    <div className="text-xs text-purple-400 mt-1">
                                                        {region.coops.join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* OpenHash 검증 */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <i className="fas fa-link text-cyan-400 text-xl mr-3"></i>
                        <div>
                            <div className="font-bold text-cyan-400">OpenHash 실시간 검증</div>
                            <div className="text-sm text-gray-400">모든 생산 데이터가 블록체인에 기록됩니다</div>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        마지막 검증: {Math.floor(animationTick / 10) % 10}초 전
                    </div>
                </div>
            </div>
        </div>
    );
};
