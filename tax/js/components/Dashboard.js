const Dashboard = () => {
    const [selectedLayer, setSelectedLayer] = React.useState('all');
    const [selectedRegion, setSelectedRegion] = React.useState(null);
    const [stats, setStats] = React.useState({
        totalRevenue: 336500000000000,
        todayCollection: 124730000000,
        pendingReturns: 2847293,
        activeTransactions: 15234
    });
    const [realtimeTransactions, setRealtimeTransactions] = React.useState([]);

    const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line } = window.Recharts || {};
    const chartsAvailable = AreaChart && ResponsiveContainer;

    // Layer 구조 데이터
    const layerData = {
        all: { name: '전국', color: '#06B6D4' },
        layer4: { 
            name: 'Layer 4: 국가', 
            color: '#8B5CF6',
            regions: [
                { id: 'NTS', name: '국세청 본청', tps: 1500, revenue: 336500000000000 }
            ]
        },
        layer3: { 
            name: 'Layer 3: 광역시도', 
            color: '#10B981',
            regions: [
                { id: 'SEOUL', name: '서울특별시', tps: 89.5, revenue: 98500000000000, population: 9700000, businesses: 890000 },
                { id: 'GYEONGGI', name: '경기도', tps: 78.3, revenue: 72300000000000, population: 13500000, businesses: 1120000 },
                { id: 'BUSAN', name: '부산광역시', tps: 45.2, revenue: 28700000000000, population: 3400000, businesses: 280000 },
                { id: 'INCHEON', name: '인천광역시', tps: 38.7, revenue: 24500000000000, population: 2900000, businesses: 245000 },
                { id: 'DAEGU', name: '대구광역시', tps: 32.1, revenue: 19800000000000, population: 2400000, businesses: 198000 },
                { id: 'DAEJEON', name: '대전광역시', tps: 28.4, revenue: 15600000000000, population: 1500000, businesses: 142000 },
                { id: 'GWANGJU', name: '광주광역시', tps: 25.8, revenue: 13200000000000, population: 1450000, businesses: 128000 },
                { id: 'ULSAN', name: '울산광역시', tps: 22.3, revenue: 18900000000000, population: 1100000, businesses: 95000 },
                { id: 'SEJONG', name: '세종특별자치시', tps: 8.5, revenue: 4200000000000, population: 380000, businesses: 32000 },
                { id: 'JEJU', name: '제주특별자치도', tps: 12.4, revenue: 5800000000000, population: 680000, businesses: 78000 },
                { id: 'GANGWON', name: '강원특별자치도', tps: 15.2, revenue: 7200000000000, population: 1540000, businesses: 125000 },
                { id: 'CHUNGBUK', name: '충청북도', tps: 18.6, revenue: 9800000000000, population: 1600000, businesses: 138000 },
                { id: 'CHUNGNAM', name: '충청남도', tps: 21.3, revenue: 12400000000000, population: 2120000, businesses: 175000 },
                { id: 'JEONBUK', name: '전북특별자치도', tps: 16.8, revenue: 8500000000000, population: 1800000, businesses: 145000 },
                { id: 'JEONNAM', name: '전라남도', tps: 14.5, revenue: 7800000000000, population: 1850000, businesses: 152000 },
                { id: 'GYEONGBUK', name: '경상북도', tps: 19.7, revenue: 11200000000000, population: 2650000, businesses: 215000 },
                { id: 'GYEONGNAM', name: '경상남도', tps: 24.8, revenue: 14800000000000, population: 3350000, businesses: 278000 }
            ]
        },
        layer2: { 
            name: 'Layer 2: 시군구', 
            color: '#F59E0B',
            regions: [
                { id: 'GANGNAM', name: '서울 강남구', tps: 28.5, revenue: 18500000000000, population: 520000, businesses: 125000 },
                { id: 'SEOCHO', name: '서울 서초구', tps: 22.3, revenue: 14200000000000, population: 430000, businesses: 98000 },
                { id: 'SONGPA', name: '서울 송파구', tps: 19.8, revenue: 11800000000000, population: 670000, businesses: 85000 },
                { id: 'JUNGGU', name: '서울 중구', tps: 24.1, revenue: 15600000000000, population: 130000, businesses: 112000 },
                { id: 'YEONGDEUNGPO', name: '서울 영등포구', tps: 18.7, revenue: 10500000000000, population: 390000, businesses: 78000 },
                { id: 'BUNDANG', name: '성남 분당구', tps: 21.2, revenue: 12800000000000, population: 490000, businesses: 95000 },
                { id: 'YONGIN', name: '용인시', tps: 16.8, revenue: 9200000000000, population: 1080000, businesses: 72000 },
                { id: 'SUWON', name: '수원시', tps: 18.5, revenue: 10800000000000, population: 1190000, businesses: 88000 },
                { id: 'HAEUNDAE', name: '부산 해운대구', tps: 12.4, revenue: 6800000000000, population: 410000, businesses: 52000 },
                { id: 'NAMGU_BUSAN', name: '부산 남구', tps: 8.7, revenue: 4200000000000, population: 280000, businesses: 35000 },
                { id: 'YEONSU', name: '인천 연수구', tps: 9.8, revenue: 5100000000000, population: 360000, businesses: 42000 },
                { id: 'JEJUSI', name: '제주시', tps: 8.2, revenue: 4100000000000, population: 490000, businesses: 58000 }
            ]
        },
        layer1: { 
            name: 'Layer 1: 읍면동', 
            color: '#EF4444',
            regions: [
                { id: 'YEOKSAM', name: '강남구 역삼동', tps: 4.2, revenue: 2800000000000, population: 28000, businesses: 15200 },
                { id: 'SAMSUNG', name: '강남구 삼성동', tps: 5.8, revenue: 4200000000000, population: 18000, businesses: 18500 },
                { id: 'DAECHI', name: '강남구 대치동', tps: 3.5, revenue: 2100000000000, population: 42000, businesses: 8200 },
                { id: 'APGUJEONG', name: '강남구 압구정동', tps: 4.8, revenue: 3500000000000, population: 22000, businesses: 12800 },
                { id: 'CHEONGDAM', name: '강남구 청담동', tps: 6.2, revenue: 4800000000000, population: 15000, businesses: 9500 },
                { id: 'BANPO', name: '서초구 반포동', tps: 3.8, revenue: 2400000000000, population: 35000, businesses: 6800 },
                { id: 'SEOCHO', name: '서초구 서초동', tps: 4.5, revenue: 3100000000000, population: 28000, businesses: 11200 },
                { id: 'JAMSIL', name: '송파구 잠실동', tps: 3.2, revenue: 1950000000000, population: 45000, businesses: 7500 },
                { id: 'GWANGHWAMUN', name: '종로구 광화문', tps: 5.5, revenue: 3800000000000, population: 5000, businesses: 14200 },
                { id: 'YONGDAM', name: '제주시 용담동', tps: 1.2, revenue: 420000000000, population: 18500, businesses: 3200 },
                { id: 'SAMDO', name: '제주시 삼도동', tps: 0.9, revenue: 320000000000, population: 12000, businesses: 2100 },
                { id: 'YEONDON', name: '제주시 연동', tps: 1.8, revenue: 680000000000, population: 32000, businesses: 5800 }
            ]
        }
    };

    // 월별 데이터 생성 함수
    const generateMonthlyData = (region) => {
        const baseRevenue = region ? region.revenue / 12 : 28000000000000;
        const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        return months.map((month, idx) => ({
            month,
            revenue: Math.floor(baseRevenue * (0.8 + Math.random() * 0.4)),
            incomeTax: Math.floor(baseRevenue * 0.35 * (0.8 + Math.random() * 0.4)),
            corporateTax: Math.floor(baseRevenue * 0.25 * (0.8 + Math.random() * 0.4)),
            vat: Math.floor(baseRevenue * 0.25 * (0.8 + Math.random() * 0.4)),
            otherTax: Math.floor(baseRevenue * 0.15 * (0.8 + Math.random() * 0.4))
        }));
    };

    // 세목별 비율 데이터
    const generateTaxTypeData = (region) => {
        const base = region ? region.revenue : stats.totalRevenue;
        return [
            { name: '소득세', value: Math.floor(base * 0.34), color: '#06B6D4' },
            { name: '법인세', value: Math.floor(base * 0.24), color: '#8B5CF6' },
            { name: '부가세', value: Math.floor(base * 0.23), color: '#10B981' },
            { name: '상속증여', value: Math.floor(base * 0.05), color: '#F59E0B' },
            { name: '기타', value: Math.floor(base * 0.14), color: '#6B7280' }
        ];
    };

    // 경제 지표 데이터
    const generateEconomicData = (region) => {
        if (!region) return null;
        return {
            gdpGrowth: (1.5 + Math.random() * 3).toFixed(1),
            employmentRate: (60 + Math.random() * 10).toFixed(1),
            businessGrowth: (2 + Math.random() * 5).toFixed(1),
            avgIncome: Math.floor(3000 + Math.random() * 4000) * 10000
        };
    };

    const [monthlyData, setMonthlyData] = React.useState(generateMonthlyData(null));
    const [taxTypeData, setTaxTypeData] = React.useState(generateTaxTypeData(null));
    const [economicData, setEconomicData] = React.useState(null);

    // 실시간 거래 시뮬레이션
    React.useEffect(() => {
        const interval = setInterval(() => {
            const regions = ['서울', '경기', '부산', '인천', '대전', '광주', '대구', '울산', '제주'];
            const taxTypes = ['종합소득세', '법인세', '부가가치세', '원천세', '양도소득세'];
            const newTx = {
                id: `TX-${Date.now().toString(36)}`,
                type: taxTypes[Math.floor(Math.random() * taxTypes.length)],
                amount: Math.floor(Math.random() * 50000000) + 100000,
                region: regions[Math.floor(Math.random() * regions.length)],
                layer: Math.random() < 0.65 ? 1 : Math.random() < 0.9 ? 2 : Math.random() < 0.99 ? 3 : 4,
                timestamp: new Date().toISOString()
            };
            setRealtimeTransactions(prev => [newTx, ...prev.slice(0, 14)]);
            
            setStats(prev => ({
                ...prev,
                todayCollection: prev.todayCollection + newTx.amount,
                activeTransactions: prev.activeTransactions + 1
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 지역 선택 핸들러
    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setMonthlyData(generateMonthlyData(region));
        setTaxTypeData(generateTaxTypeData(region));
        setEconomicData(generateEconomicData(region));
    };

    // Layer 변경 핸들러
    const handleLayerChange = (layer) => {
        setSelectedLayer(layer);
        setSelectedRegion(null);
        setMonthlyData(generateMonthlyData(null));
        setTaxTypeData(generateTaxTypeData(null));
        setEconomicData(null);
    };

    const formatKRW = (num) => {
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(1) + '조';
        if (num >= 100000000) return (num / 100000000).toFixed(1) + '억';
        if (num >= 10000) return (num / 10000).toFixed(0) + '만';
        return num.toLocaleString();
    };

    const currentLayerData = layerData[selectedLayer];
    const regions = currentLayerData?.regions || [];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 상단 통계 카드 */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-coins text-2xl text-cyan-400"></i>
                        </div>
                        <span className="text-xs text-gray-400">2024 누적</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">₩{formatKRW(stats.totalRevenue)}</div>
                    <div className="text-sm text-gray-400">총 국세 징수</div>
                    <div className="text-xs text-green-400 mt-2"><i className="fas fa-arrow-up mr-1"></i>8.2% YoY</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-chart-line text-2xl text-green-400"></i>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-green-400">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>LIVE
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-1">₩{formatKRW(stats.todayCollection)}</div>
                    <div className="text-sm text-gray-400">오늘 징수액</div>
                    <div className="text-xs text-green-400 mt-2"><i className="fas fa-arrow-up mr-1"></i>12.4% vs 전일</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-file-alt text-2xl text-yellow-400"></i>
                        </div>
                        <span className="text-xs text-gray-400">처리대기</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.pendingReturns.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">미처리 신고</div>
                    <div className="text-xs text-cyan-400 mt-2">AI 자동처리 87.3%</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 card-hover">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <i className="fas fa-exchange-alt text-2xl text-purple-400"></i>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-green-400">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>LIVE
                        </span>
                    </div>
                    <div className="text-2xl font-bold text-purple-400 mb-1">{stats.activeTransactions.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">활성 거래</div>
                    <div className="text-xs text-cyan-400 mt-2">374.76 TPS</div>
                </div>
            </div>

            {/* Layer 선택 + 지역 드롭다운 */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <i className="fas fa-layer-group text-cyan-400"></i>
                        계층별 세수 현황
                    </h3>
                    <div className="flex items-center gap-3">
                        {/* Layer 선택 드롭다운 */}
                        <select 
                            value={selectedLayer}
                            onChange={(e) => handleLayerChange(e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                        >
                            <option value="all">전국 전체</option>
                            <option value="layer4">Layer 4: 국가</option>
                            <option value="layer3">Layer 3: 광역시도 (17개)</option>
                            <option value="layer2">Layer 2: 시군구 (226개 중 12개)</option>
                            <option value="layer1">Layer 1: 읍면동 (3,496개 중 12개)</option>
                        </select>

                        {/* 지역 선택 드롭다운 */}
                        {selectedLayer !== 'all' && regions.length > 0 && (
                            <select
                                value={selectedRegion?.id || ''}
                                onChange={(e) => {
                                    const region = regions.find(r => r.id === e.target.value);
                                    handleRegionSelect(region || null);
                                }}
                                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                            >
                                <option value="">지역 선택...</option>
                                {regions.map(r => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                {/* 지역 카드 그리드 */}
                {selectedLayer !== 'all' && (
                    <div className={`grid gap-3 mb-4 ${
                        selectedLayer === 'layer3' ? 'grid-cols-6' : 
                        selectedLayer === 'layer2' ? 'grid-cols-6' : 'grid-cols-6'
                    }`}>
                        {regions.slice(0, 12).map(region => (
                            <button
                                key={region.id}
                                onClick={() => handleRegionSelect(region)}
                                className={`p-3 rounded-xl text-left transition border ${
                                    selectedRegion?.id === region.id
                                        ? 'bg-cyan-500/20 border-cyan-500'
                                        : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                                }`}
                            >
                                <div className="font-medium text-white text-sm truncate">{region.name}</div>
                                <div className="text-xs text-cyan-400 mt-1">{region.tps} TPS</div>
                                <div className="text-xs text-gray-400">₩{formatKRW(region.revenue)}</div>
                            </button>
                        ))}
                    </div>
                )}

                {/* 선택된 지역 정보 */}
                {selectedRegion && (
                    <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/30 mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                                    <i className={`fas ${
                                        selectedLayer === 'layer4' ? 'fa-flag' :
                                        selectedLayer === 'layer3' ? 'fa-city' :
                                        selectedLayer === 'layer2' ? 'fa-building' : 'fa-map-marker-alt'
                                    } text-2xl text-cyan-400`}></i>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">{selectedRegion.name}</h4>
                                    <div className="text-sm text-gray-400">{currentLayerData?.name}</div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-cyan-400">{selectedRegion.tps}</div>
                                    <div className="text-xs text-gray-400">TPS</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-400">₩{formatKRW(selectedRegion.revenue)}</div>
                                    <div className="text-xs text-gray-400">연간 세수</div>
                                </div>
                                {selectedRegion.population && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-400">{(selectedRegion.population / 10000).toFixed(0)}만</div>
                                        <div className="text-xs text-gray-400">인구</div>
                                    </div>
                                )}
                                {selectedRegion.businesses && (
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-400">{(selectedRegion.businesses / 1000).toFixed(0)}천</div>
                                        <div className="text-xs text-gray-400">사업체</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* 월별 징수 추이 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-area text-cyan-400"></i>
                        {selectedRegion ? `${selectedRegion.name} 월별 세수 추이` : '전국 월별 국세 징수 추이'}
                    </h3>
                    {chartsAvailable ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={monthlyData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="month" stroke="#9CA3AF" tick={{fontSize: 12}} />
                                <YAxis stroke="#9CA3AF" tick={{fontSize: 12}} tickFormatter={(v) => formatKRW(v)} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                                    formatter={(value) => ['₩' + formatKRW(value), '세수']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#06B6D4" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 세목별 비율 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-pie text-purple-400"></i>
                        {selectedRegion ? `${selectedRegion.name} 세목별 비율` : '전국 세목별 비율'}
                    </h3>
                    {chartsAvailable ? (
                        <div className="flex items-center">
                            <ResponsiveContainer width="50%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={taxTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        dataKey="value"
                                    >
                                        {taxTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                                        formatter={(value) => ['₩' + formatKRW(value)]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex-1 space-y-2">
                                {taxTypeData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-gray-300 text-sm">{item.name}</span>
                                        </div>
                                        <span className="text-white font-medium">₩{formatKRW(item.value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-400">차트 로딩 중...</div>
                    )}
                </div>
            </div>

            {/* 경제 지표 (지역 선택 시) */}
            {selectedRegion && economicData && (
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-bar text-green-400"></i>
                        {selectedRegion.name} 경제 지표
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-4 text-center border border-cyan-500/20">
                            <div className="text-3xl font-bold text-cyan-400">{economicData.gdpGrowth}%</div>
                            <div className="text-sm text-gray-400">지역내총생산 성장률</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 rounded-xl p-4 text-center border border-green-500/20">
                            <div className="text-3xl font-bold text-green-400">{economicData.employmentRate}%</div>
                            <div className="text-sm text-gray-400">고용률</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-4 text-center border border-purple-500/20">
                            <div className="text-3xl font-bold text-purple-400">{economicData.businessGrowth}%</div>
                            <div className="text-sm text-gray-400">사업체 증가율</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-4 text-center border border-yellow-500/20">
                            <div className="text-3xl font-bold text-yellow-400">₩{formatKRW(economicData.avgIncome)}</div>
                            <div className="text-sm text-gray-400">평균 연소득</div>
                        </div>
                    </div>
                    
                    {/* 세목별 상세 바 차트 */}
                    {chartsAvailable && (
                        <div className="mt-6">
                            <h4 className="text-md font-bold mb-3 text-gray-300">월별 세목별 징수 현황</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="month" stroke="#9CA3AF" tick={{fontSize: 10}} />
                                    <YAxis stroke="#9CA3AF" tick={{fontSize: 10}} tickFormatter={(v) => formatKRW(v)} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                                        formatter={(value) => ['₩' + formatKRW(value)]}
                                    />
                                    <Legend />
                                    <Bar dataKey="incomeTax" name="소득세" fill="#06B6D4" stackId="a" />
                                    <Bar dataKey="corporateTax" name="법인세" fill="#8B5CF6" stackId="a" />
                                    <Bar dataKey="vat" name="부가세" fill="#10B981" stackId="a" />
                                    <Bar dataKey="otherTax" name="기타" fill="#F59E0B" stackId="a" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            )}

            {/* 하단: Layer 계층 + 실시간 거래 */}
            <div className="grid grid-cols-3 gap-6">
                {/* Layer 계층 현황 */}
                <div className="col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <i className="fas fa-sitemap text-purple-400"></i>
                        4계층 네트워크 현황
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { layer: 1, name: '읍면동', nodes: 3496, tps: 63.34, color: 'blue', prob: '65%' },
                            { layer: 2, name: '시군구', nodes: 226, tps: 292.12, color: 'green', prob: '25%' },
                            { layer: 3, name: '광역시도', nodes: 17, tps: 374.76, color: 'purple', prob: '9%' },
                            { layer: 4, name: '국가', nodes: 1, tps: 1500, color: 'cyan', prob: '1%' }
                        ].map((l, idx) => (
                            <div key={idx} className={`bg-${l.color}-500/10 rounded-xl p-4 border border-${l.color}-500/30`}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-2xl font-bold text-${l.color}-400`}>L{l.layer}</span>
                                    <span className={`text-xs bg-${l.color}-500/20 text-${l.color}-400 px-2 py-1 rounded-full`}>{l.prob}</span>
                                </div>
                                <div className="text-white font-medium">{l.name}</div>
                                <div className="text-sm text-gray-400 mt-2">{l.nodes.toLocaleString()} 노드</div>
                                <div className={`text-lg font-bold text-${l.color}-400 mt-1`}>{l.tps} TPS</div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Layer 흐름도 */}
                    <div className="mt-6 flex items-center justify-center gap-4 p-4 bg-gray-700/30 rounded-xl">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
                                <span className="text-blue-400 font-bold">L1</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">읍면동</div>
                        </div>
                        <i className="fas fa-arrow-right text-gray-500 animate-pulse"></i>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
                                <span className="text-green-400 font-bold">L2</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">시군구</div>
                        </div>
                        <i className="fas fa-arrow-right text-gray-500 animate-pulse"></i>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
                                <span className="text-purple-400 font-bold">L3</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">광역시도</div>
                        </div>
                        <i className="fas fa-arrow-right text-gray-500 animate-pulse"></i>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto">
                                <span className="text-cyan-400 font-bold">L4</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">국가</div>
                        </div>
                    </div>
                </div>

                {/* 실시간 거래 스트림 */}
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        실시간 거래
                    </h3>
                    <div className="space-y-2 max-h-[350px] overflow-y-auto">
                        {realtimeTransactions.map((tx, idx) => (
                            <div key={tx.id} className={`p-3 rounded-lg ${idx === 0 ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-gray-700/50'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-0.5 rounded bg-${['blue', 'green', 'purple', 'cyan'][tx.layer - 1]}-500/20 text-${['blue', 'green', 'purple', 'cyan'][tx.layer - 1]}-400`}>
                                            L{tx.layer}
                                        </span>
                                        <span className="text-white text-sm">{tx.type}</span>
                                    </div>
                                    <span className="text-green-400 font-medium">₩{formatKRW(tx.amount)}</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-gray-400">{tx.region}</span>
                                    <span className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleTimeString('ko-KR')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
