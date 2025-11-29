const IngredientSupply = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [animationProgress, setAnimationProgress] = React.useState(0);

    // Recharts 라이브러리
    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar } = RechartsLib;
    const chartsAvailable = BarChart && ResponsiveContainer;

    // 애니메이션 효과
    React.useEffect(() => {
        const interval = setInterval(() => {
            setAnimationProgress(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // 연간 식재료 소비량 데이터 (5천만 국민 기준)
    const annualConsumption = [
        {
            id: 'rice',
            name: '쌀',
            icon: '🍚',
            annualTotal: 5460000, // 톤
            unit: '톤',
            perCapita: 109.2, // kg/인/년
            color: '#feca57',
            domesticRate: 100,
            importRate: 0,
            producers: ['농협중앙회', '지역농협', '영농법인'],
            facilities: 4521,
            monthlyData: [420, 435, 450, 460, 470, 480, 475, 470, 460, 445, 430, 425]
        },
        {
            id: 'kimchi',
            name: '배추/김치',
            icon: '🥬',
            annualTotal: 3900000,
            unit: '톤',
            perCapita: 78,
            color: '#1dd1a1',
            domesticRate: 85,
            importRate: 15,
            producers: ['농협', '지역농가', '김치공장'],
            facilities: 2340,
            monthlyData: [280, 290, 310, 340, 360, 350, 320, 310, 350, 380, 370, 340]
        },
        {
            id: 'pork',
            name: '돼지고기',
            icon: '🥓',
            annualTotal: 2080000,
            unit: '톤',
            perCapita: 41.6,
            color: '#ff6b6b',
            domesticRate: 72,
            importRate: 28,
            producers: ['축협', '대형 양돈장', '브랜드돼지'],
            facilities: 6120,
            monthlyData: [165, 170, 175, 180, 175, 170, 168, 172, 178, 182, 175, 170]
        },
        {
            id: 'chicken',
            name: '닭고기',
            icon: '🍗',
            annualTotal: 1560000,
            unit: '톤',
            perCapita: 31.2,
            color: '#48dbfb',
            domesticRate: 88,
            importRate: 12,
            producers: ['하림', '마니커', '체리부로'],
            facilities: 3200,
            monthlyData: [125, 128, 132, 135, 138, 140, 138, 135, 130, 128, 126, 125]
        },
        {
            id: 'beef',
            name: '소고기',
            icon: '🥩',
            annualTotal: 1040000,
            unit: '톤',
            perCapita: 20.8,
            color: '#5f27cd',
            domesticRate: 45,
            importRate: 55,
            producers: ['축협', '한우농가', '수입업체'],
            facilities: 4850,
            monthlyData: [82, 85, 88, 90, 92, 95, 93, 90, 88, 86, 84, 82]
        },
        {
            id: 'fish',
            name: '생선류',
            icon: '🐟',
            annualTotal: 1300000,
            unit: '톤',
            perCapita: 26,
            color: '#54a0ff',
            domesticRate: 65,
            importRate: 35,
            producers: ['수협', '원양어업', '양식장'],
            facilities: 2100,
            monthlyData: [100, 105, 110, 115, 112, 108, 105, 110, 115, 112, 108, 105]
        },
        {
            id: 'vegetables',
            name: '채소류',
            icon: '🥗',
            annualTotal: 4680000,
            unit: '톤',
            perCapita: 93.6,
            color: '#26de81',
            domesticRate: 92,
            importRate: 8,
            producers: ['농협', '친환경농가', '스마트팜'],
            facilities: 12500,
            monthlyData: [360, 380, 400, 420, 440, 430, 410, 400, 390, 380, 370, 360]
        },
        {
            id: 'egg',
            name: '계란',
            icon: '🥚',
            annualTotal: 780000,
            unit: '톤 (약 130억개)',
            perCapita: 260, // 개/인/년
            color: '#fed330',
            domesticRate: 99,
            importRate: 1,
            producers: ['계란유통협회', '대형농장'],
            facilities: 1850,
            monthlyData: [62, 64, 66, 68, 70, 68, 66, 64, 65, 66, 64, 62]
        },
        {
            id: 'milk',
            name: '우유/유제품',
            icon: '🥛',
            annualTotal: 1950000,
            unit: '톤',
            perCapita: 39,
            color: '#f8f9fa',
            domesticRate: 78,
            importRate: 22,
            producers: ['서울우유', '남양', '매일'],
            facilities: 520,
            monthlyData: [158, 162, 165, 168, 170, 165, 160, 162, 165, 168, 165, 160]
        },
        {
            id: 'fruit',
            name: '과일류',
            icon: '🍎',
            annualTotal: 3120000,
            unit: '톤',
            perCapita: 62.4,
            color: '#eb3b5a',
            domesticRate: 70,
            importRate: 30,
            producers: ['농협', '과수농가', '수입업체'],
            facilities: 8900,
            monthlyData: [240, 250, 260, 280, 300, 290, 270, 260, 270, 280, 260, 250]
        }
    ];

    const categories = [
        { id: 'all', name: '전체', icon: '📊' },
        { id: 'grain', name: '곡류', icon: '🌾', items: ['rice'] },
        { id: 'meat', name: '육류', icon: '🥩', items: ['pork', 'chicken', 'beef'] },
        { id: 'seafood', name: '수산물', icon: '🐟', items: ['fish'] },
        { id: 'vegetable', name: '채소/과일', icon: '🥬', items: ['kimchi', 'vegetables', 'fruit'] },
        { id: 'dairy', name: '유제품', icon: '🥛', items: ['egg', 'milk'] }
    ];

    const filteredItems = selectedCategory === 'all' 
        ? annualConsumption 
        : annualConsumption.filter(item => 
            categories.find(c => c.id === selectedCategory)?.items?.includes(item.id)
        );

    // 월별 총 생산량 차트 데이터
    const monthlyProductionData = [
        { month: '1월', 생산량: 2450, 소비량: 2380, 재고: 70 },
        { month: '2월', 생산량: 2520, 소비량: 2450, 재고: 140 },
        { month: '3월', 생산량: 2680, 소비량: 2600, 재고: 220 },
        { month: '4월', 생산량: 2780, 소비량: 2720, 재고: 280 },
        { month: '5월', 생산량: 2850, 소비량: 2800, 재고: 330 },
        { month: '6월', 생산량: 2780, 소비량: 2750, 재고: 360 },
        { month: '7월', 생산량: 2650, 소비량: 2680, 재고: 330 },
        { month: '8월', 생산량: 2580, 소비량: 2620, 재고: 290 },
        { month: '9월', 생산량: 2700, 소비량: 2680, 재고: 310 },
        { month: '10월', 생산량: 2750, 소비량: 2720, 재고: 340 },
        { month: '11월', 생산량: 2650, 소비량: 2680, 재고: 310 },
        { month: '12월', 생산량: 2550, 소비량: 2600, 재고: 260 }
    ];

    // 수입 현황 데이터
    const importData = [
        { country: '미국', amount: 850, items: '소고기, 과일', flag: '🇺🇸' },
        { country: '호주', amount: 620, items: '소고기, 밀', flag: '🇦🇺' },
        { country: '중국', amount: 580, items: '채소, 김치', flag: '🇨🇳' },
        { country: '칠레', amount: 320, items: '과일, 수산물', flag: '🇨🇱' },
        { country: '노르웨이', amount: 280, items: '연어, 고등어', flag: '🇳🇴' },
        { country: '기타', amount: 450, items: '기타 식재료', flag: '🌍' }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold">
                            <i className="fas fa-seedling text-green-400 mr-2"></i>
                            식재료 공급 및 생산 계획
                        </h3>
                        <p className="text-gray-400 mt-1">5천만 국민의 연간 식재료 소비량 및 생산 현황</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold text-green-400">26,870,000</div>
                        <div className="text-gray-400">연간 총 소비량 (톤)</div>
                    </div>
                </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl transition-all ${
                            selectedCategory === cat.id 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* 월별 생산/소비 추이 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-chart-area text-cyan-400 mr-2"></i>
                    월별 식재료 생산/소비 추이 (만 톤)
                </h4>
                {chartsAvailable ? (
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyProductionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="생산량" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                <Area type="monotone" dataKey="소비량" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                                <Line type="monotone" dataKey="재고" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-72 flex items-center justify-center bg-gray-700/50 rounded-lg">
                        <p className="text-gray-400">차트 로딩 중...</p>
                    </div>
                )}
                <div className="flex justify-center space-x-6 mt-4 text-sm">
                    <span className="flex items-center"><span className="w-4 h-1 bg-green-500 rounded mr-2"></span>생산량</span>
                    <span className="flex items-center"><span className="w-4 h-1 bg-yellow-500 rounded mr-2"></span>소비량</span>
                    <span className="flex items-center"><span className="w-4 h-4 bg-cyan-500 rounded-full mr-2"></span>재고</span>
                </div>
            </div>

            {/* 품목별 상세 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item, idx) => (
                    <div key={item.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all">
                        {/* 품목 헤더 */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <span className="text-4xl mr-3">{item.icon}</span>
                                <div>
                                    <h4 className="text-xl font-bold">{item.name}</h4>
                                    <p className="text-sm text-gray-400">1인당 {item.perCapita}kg/년</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold" style={{ color: item.color }}>
                                    {(item.annualTotal / 10000).toFixed(0)}만
                                </div>
                                <div className="text-xs text-gray-400">{item.unit}/년</div>
                            </div>
                        </div>

                        {/* 국내/수입 비율 */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-green-400">국내산 {item.domesticRate}%</span>
                                <span className="text-blue-400">수입산 {item.importRate}%</span>
                            </div>
                            <div className="h-3 bg-gray-700 rounded-full overflow-hidden flex">
                                <div 
                                    className="bg-green-500 transition-all duration-1000"
                                    style={{ width: `${item.domesticRate}%` }}
                                ></div>
                                <div 
                                    className="bg-blue-500 transition-all duration-1000"
                                    style={{ width: `${item.importRate}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* 월별 미니 차트 */}
                        <div className="mb-4">
                            <div className="text-xs text-gray-400 mb-2">월별 생산량 추이</div>
                            <div className="flex items-end h-12 space-x-1">
                                {item.monthlyData.map((val, i) => (
                                    <div 
                                        key={i}
                                        className="flex-1 rounded-t transition-all hover:opacity-80"
                                        style={{ 
                                            height: `${(val / Math.max(...item.monthlyData)) * 100}%`,
                                            backgroundColor: item.color
                                        }}
                                        title={`${i + 1}월: ${val.toLocaleString()}만 톤`}
                                    ></div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>1월</span>
                                <span>12월</span>
                            </div>
                        </div>

                        {/* 생산자/시설 정보 */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <div className="text-gray-400 text-xs mb-1">주요 생산자</div>
                                <div className="text-xs">{item.producers.join(', ')}</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <div className="text-gray-400 text-xs mb-1">생산 시설</div>
                                <div className="font-bold">{item.facilities.toLocaleString()}개소</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 수입 현황 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-ship text-blue-400 mr-2"></i>
                    국가별 식재료 수입 현황 (연간)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {importData.map((country, idx) => (
                        <div key={idx} className="bg-gray-700/50 rounded-xl p-4 text-center hover:bg-gray-700 transition-all">
                            <div className="text-3xl mb-2">{country.flag}</div>
                            <div className="font-bold">{country.country}</div>
                            <div className="text-xl font-bold text-blue-400">{country.amount}만t</div>
                            <div className="text-xs text-gray-400 mt-1">{country.items}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 생산 시설 현황 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-industry text-purple-400 mr-2"></i>
                    생산 시설 현황
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-4 text-center">
                        <div className="text-4xl mb-2">🌾</div>
                        <div className="text-2xl font-bold text-green-400">4,521</div>
                        <div className="text-sm text-gray-400">곡물 생산시설</div>
                        <div className="text-xs text-gray-500 mt-1">도정공장, 저장창고</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 border border-red-500/30 rounded-xl p-4 text-center">
                        <div className="text-4xl mb-2">🏭</div>
                        <div className="text-2xl font-bold text-red-400">14,170</div>
                        <div className="text-sm text-gray-400">축산 시설</div>
                        <div className="text-xs text-gray-500 mt-1">양돈장, 양계장, 한우농가</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4 text-center">
                        <div className="text-4xl mb-2">🚢</div>
                        <div className="text-2xl font-bold text-blue-400">2,100</div>
                        <div className="text-sm text-gray-400">수산 시설</div>
                        <div className="text-xs text-gray-500 mt-1">양식장, 수산가공</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                        <div className="text-4xl mb-2">🥬</div>
                        <div className="text-2xl font-bold text-yellow-400">23,740</div>
                        <div className="text-sm text-gray-400">농산 시설</div>
                        <div className="text-xs text-gray-500 mt-1">스마트팜, 비닐하우스</div>
                    </div>
                </div>
            </div>

            {/* 실시간 생산 모니터링 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-broadcast-tower text-cyan-400 mr-2 animate-pulse"></i>
                    실시간 생산 현황 (OpenHash 검증)
                </h4>
                <div className="space-y-4">
                    {[
                        { name: '쌀', target: 14960, current: Math.floor(14960 * (0.85 + animationProgress * 0.001)), unit: '톤/일' },
                        { name: '돼지고기', target: 5700, current: Math.floor(5700 * (0.82 + animationProgress * 0.0015)), unit: '톤/일' },
                        { name: '채소류', target: 12820, current: Math.floor(12820 * (0.88 + animationProgress * 0.001)), unit: '톤/일' },
                        { name: '계란', target: 3560, current: Math.floor(3560 * (0.90 + animationProgress * 0.0008)), unit: '만개/일' }
                    ].map((item, idx) => {
                        const progress = (item.current / item.target) * 100;
                        return (
                            <div key={idx}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-sm">
                                        <span className="text-cyan-400 font-bold">{item.current.toLocaleString()}</span>
                                        <span className="text-gray-500"> / {item.target.toLocaleString()} {item.unit}</span>
                                    </span>
                                </div>
                                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-300 ${
                                            progress >= 90 ? 'bg-green-500' : progress >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                </div>
                                <div className="text-right text-xs text-gray-500 mt-1">
                                    달성률: {progress.toFixed(1)}%
                                    {progress >= 90 && <span className="text-green-400 ml-2">✓ 정상</span>}
                                    {progress < 90 && progress >= 70 && <span className="text-yellow-400 ml-2">⚠ 주의</span>}
                                    {progress < 70 && <span className="text-red-400 ml-2">⚠ 부족</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center">
                    <i className="fas fa-link text-cyan-400 mr-3"></i>
                    <span className="text-sm text-gray-400">
                        모든 생산 데이터는 <span className="text-cyan-400 font-medium">OpenHash</span>에 실시간 기록되어 위변조가 불가능합니다.
                    </span>
                </div>
            </div>

            {/* 연간 생산 계획 요약 */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
                <h4 className="font-bold mb-4">
                    <i className="fas fa-calendar-alt text-purple-400 mr-2"></i>
                    2025년 식재료 생산 계획 요약
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">26,870,000t</div>
                        <div className="text-gray-400">연간 총 생산 목표</div>
                        <div className="text-xs text-green-400 mt-1">↑ 전년 대비 2.3% 증가</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-pink-400 mb-2">44,531개소</div>
                        <div className="text-gray-400">총 생산 시설</div>
                        <div className="text-xs text-green-400 mt-1">↑ 스마트팜 15% 확대</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-cyan-400 mb-2">82.5%</div>
                        <div className="text-gray-400">식량 자급률 목표</div>
                        <div className="text-xs text-green-400 mt-1">↑ 전년 대비 1.5%p 상승</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
