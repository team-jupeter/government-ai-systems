const OrganizationPerformance = () => {
    const [organizations, setOrganizations] = React.useState([]);
    const [selectedSector, setSelectedSector] = React.useState('all');
    const [sortBy, setSortBy] = React.useState('revenue_growth');

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } = RechartsLib;

    React.useEffect(() => {
        const orgs = [
            { name: '삼성전자', sector: '제조업', employees: 125000, revenue_growth: 8.5, productivity: 94.2, satisfaction: 78.5, ai_adoption: 82.3 },
            { name: '현대자동차', sector: '제조업', employees: 75000, revenue_growth: 6.2, productivity: 91.8, satisfaction: 75.2, ai_adoption: 68.5 },
            { name: 'SK하이닉스', sector: '제조업', employees: 32000, revenue_growth: 12.3, productivity: 96.5, satisfaction: 82.1, ai_adoption: 88.7 },
            { name: '네이버', sector: 'IT', employees: 6500, revenue_growth: 15.8, productivity: 98.2, satisfaction: 85.3, ai_adoption: 95.2 },
            { name: '카카오', sector: 'IT', employees: 5800, revenue_growth: 11.2, productivity: 95.7, satisfaction: 83.8, ai_adoption: 92.1 },
            { name: 'LG에너지솔루션', sector: '제조업', employees: 28000, revenue_growth: 25.6, productivity: 92.3, satisfaction: 76.8, ai_adoption: 75.4 },
            { name: 'KB금융', sector: '금융', employees: 28000, revenue_growth: 7.2, productivity: 88.9, satisfaction: 72.5, ai_adoption: 78.9 },
            { name: '신한금융', sector: '금융', employees: 24000, revenue_growth: 6.8, productivity: 87.5, satisfaction: 74.1, ai_adoption: 76.2 },
            { name: '쿠팡', sector: '유통', employees: 68000, revenue_growth: 18.5, productivity: 89.2, satisfaction: 68.5, ai_adoption: 85.6 },
            { name: '포스코', sector: '제조업', employees: 18500, revenue_growth: 4.8, productivity: 89.5, satisfaction: 71.2, ai_adoption: 62.3 }
        ];
        setOrganizations(orgs);
    }, []);

    const sectors = ['all', '제조업', 'IT', '금융', '유통'];

    const filteredOrgs = selectedSector === 'all' 
        ? organizations 
        : organizations.filter(org => org.sector === selectedSector);

    const sortedOrgs = [...filteredOrgs].sort((a, b) => b[sortBy] - a[sortBy]);

    const sectorStats = [
        { sector: '제조업', avgProductivity: 92.8, avgSatisfaction: 76.8, companies: 285000 },
        { sector: 'IT/SW', avgProductivity: 96.2, avgSatisfaction: 84.2, companies: 125000 },
        { sector: '금융', avgProductivity: 88.2, avgSatisfaction: 73.2, companies: 42000 },
        { sector: '유통', avgProductivity: 85.5, avgSatisfaction: 70.5, companies: 380000 },
        { sector: '서비스', avgProductivity: 82.3, avgSatisfaction: 72.8, companies: 920000 }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    return (
        <div className="space-y-6">
            {/* 상단 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <p className="text-blue-200 text-sm">총 기업/기관 수</p>
                    <p className="text-3xl font-bold text-white mt-1">2.85M</p>
                    <p className="text-blue-200 text-xs mt-1">등록 법인 기준</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <p className="text-green-200 text-sm">평균 생산성</p>
                    <p className="text-3xl font-bold text-white mt-1">89.2%</p>
                    <p className="text-green-200 text-xs mt-1">+3.5% 전년비</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <p className="text-purple-200 text-sm">평균 AI 도입률</p>
                    <p className="text-3xl font-bold text-white mt-1">68.5%</p>
                    <p className="text-purple-200 text-xs mt-1">+15.2% 전년비</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <p className="text-yellow-200 text-sm">직원 만족도</p>
                    <p className="text-3xl font-bold text-white mt-1">75.8점</p>
                    <p className="text-yellow-200 text-xs mt-1">100점 만점</p>
                </div>
            </div>

            {/* 필터 및 정렬 */}
            <div className="bg-slate-800 rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">업종:</span>
                        <div className="flex gap-1">
                            {sectors.map(sector => (
                                <button
                                    key={sector}
                                    onClick={() => setSelectedSector(sector)}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                        selectedSector === sector
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                                >
                                    {sector === 'all' ? '전체' : sector}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">정렬:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-slate-700 text-white px-3 py-1.5 rounded-lg text-sm border-none"
                        >
                            <option value="revenue_growth">매출 성장률</option>
                            <option value="productivity">생산성</option>
                            <option value="satisfaction">만족도</option>
                            <option value="ai_adoption">AI 도입률</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 업종별 생산성 비교 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">업종별 평균 생산성</h3>
                    {BarChart ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={sectorStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="sector" stroke="#94a3b8" fontSize={11} />
                                <YAxis stroke="#94a3b8" fontSize={11} domain={[70, 100]} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value, name) => [value + '%', name === 'avgProductivity' ? '생산성' : '만족도']}
                                />
                                <Bar dataKey="avgProductivity" fill="#3b82f6" radius={[4, 4, 0, 0]} name="avgProductivity" />
                                <Bar dataKey="avgSatisfaction" fill="#22c55e" radius={[4, 4, 0, 0]} name="avgSatisfaction" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 기업 성과 순위 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">주요 기업 성과 순위</h3>
                    <div className="space-y-3">
                        {sortedOrgs.slice(0, 6).map((org, index) => (
                            <div key={org.name} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                    index === 0 ? 'bg-yellow-500 text-black' :
                                    index === 1 ? 'bg-slate-400 text-black' :
                                    index === 2 ? 'bg-amber-700 text-white' :
                                    'bg-slate-600 text-white'
                                }`}>
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-medium">{org.name}</p>
                                    <p className="text-xs text-slate-400">{org.sector} | {formatNumber(org.employees)}명</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-blue-400">
                                        {sortBy === 'revenue_growth' && '+' + org.revenue_growth + '%'}
                                        {sortBy === 'productivity' && org.productivity + '%'}
                                        {sortBy === 'satisfaction' && org.satisfaction + '점'}
                                        {sortBy === 'ai_adoption' && org.ai_adoption + '%'}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {sortBy === 'revenue_growth' && '매출성장률'}
                                        {sortBy === 'productivity' && '생산성'}
                                        {sortBy === 'satisfaction' && '만족도'}
                                        {sortBy === 'ai_adoption' && 'AI도입률'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 성과-개인평가 연동 설명 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-link text-2xl text-blue-400"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">기관 성과 ↔ 개인 평가 연동</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            개인의 업무 성과는 <span className="text-blue-400 font-medium">출퇴근 로그</span>와 
                            <span className="text-green-400 font-medium"> 소속 기관의 경영 성과</span>를 종합하여 측정됩니다.
                            기업/기관을 가능한 최소 크기의 경제활동 단위로 분할하여, 개인의 기여도를 정확하게 산정합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
