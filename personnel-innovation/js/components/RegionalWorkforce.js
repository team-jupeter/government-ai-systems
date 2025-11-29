const RegionalWorkforce = () => {
    const [regions, setRegions] = React.useState([]);
    const [selectedRegion, setSelectedRegion] = React.useState(null);

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = RechartsLib;

    React.useEffect(() => {
        const regionData = [
            { code: '11', name: '서울특별시', workforce: 5200000, active: 4160000, companies: 420000, efficiency: 94.2 },
            { code: '41', name: '경기도', workforce: 6800000, active: 5440000, companies: 580000, efficiency: 92.8 },
            { code: '26', name: '부산광역시', workforce: 1650000, active: 1320000, companies: 145000, efficiency: 91.5 },
            { code: '28', name: '인천광역시', workforce: 1520000, active: 1216000, companies: 125000, efficiency: 90.8 },
            { code: '27', name: '대구광역시', workforce: 1180000, active: 944000, companies: 98000, efficiency: 89.7 },
            { code: '30', name: '대전광역시', workforce: 780000, active: 624000, companies: 68000, efficiency: 93.1 },
            { code: '29', name: '광주광역시', workforce: 720000, active: 576000, companies: 62000, efficiency: 88.9 },
            { code: '31', name: '울산광역시', workforce: 580000, active: 464000, companies: 48000, efficiency: 90.2 },
            { code: '36', name: '세종특별자치시', workforce: 185000, active: 148000, companies: 15000, efficiency: 95.5 },
            { code: '47', name: '경상북도', workforce: 1350000, active: 1080000, companies: 115000, efficiency: 88.5 },
            { code: '48', name: '경상남도', workforce: 1680000, active: 1344000, companies: 142000, efficiency: 89.8 },
            { code: '44', name: '충청남도', workforce: 1100000, active: 880000, companies: 95000, efficiency: 91.2 },
            { code: '43', name: '충청북도', workforce: 820000, active: 656000, companies: 72000, efficiency: 90.5 },
            { code: '45', name: '전라북도', workforce: 920000, active: 736000, companies: 78000, efficiency: 87.8 },
            { code: '46', name: '전라남도', workforce: 950000, active: 760000, companies: 82000, efficiency: 86.5 },
            { code: '42', name: '강원도', workforce: 780000, active: 624000, companies: 65000, efficiency: 88.2 },
            { code: '50', name: '제주특별자치도', workforce: 365000, active: 292000, companies: 32000, efficiency: 89.5 }
        ];
        setRegions(regionData);
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    const topRegions = [...regions].sort((a, b) => b.workforce - a.workforce).slice(0, 8);

    return (
        <div className="space-y-6">
            {/* 상단 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <p className="text-blue-200 text-sm">총 17개 시도</p>
                    <p className="text-3xl font-bold text-white mt-1">30M</p>
                    <p className="text-blue-200 text-xs mt-1">전국 노동인구</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <p className="text-green-200 text-sm">수도권 집중도</p>
                    <p className="text-3xl font-bold text-white mt-1">52.3%</p>
                    <p className="text-green-200 text-xs mt-1">서울+경기+인천</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <p className="text-purple-200 text-sm">평균 효율성</p>
                    <p className="text-3xl font-bold text-white mt-1">90.5%</p>
                    <p className="text-purple-200 text-xs mt-1">전국 평균</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <p className="text-yellow-200 text-sm">총 기업/기관</p>
                    <p className="text-3xl font-bold text-white mt-1">2.85M</p>
                    <p className="text-yellow-200 text-xs mt-1">등록 법인</p>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 지역별 노동인구 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">주요 지역별 노동인구</h3>
                    {BarChart ? (
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={topRegions} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} width={90} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    formatter={(value) => [formatNumber(value) + '명', '노동인구']}
                                />
                                <Bar dataKey="workforce" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-80 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                    )}
                </div>

                {/* 지역 목록 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">전체 지역 현황</h3>
                    <div className="max-h-80 overflow-y-auto space-y-2">
                        {regions.map((region) => (
                            <div
                                key={region.code}
                                onClick={() => setSelectedRegion(region)}
                                className={`p-3 rounded-lg cursor-pointer transition-all ${
                                    selectedRegion?.code === region.code
                                        ? 'bg-blue-600/30 border border-blue-500'
                                        : 'bg-slate-700/50 hover:bg-slate-700'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-white">{region.name}</p>
                                        <p className="text-xs text-slate-400">
                                            {formatNumber(region.workforce)}명 | {formatNumber(region.companies)} 기업
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${
                                            region.efficiency >= 92 ? 'text-green-400' :
                                            region.efficiency >= 88 ? 'text-blue-400' : 'text-yellow-400'
                                        }`}>
                                            {region.efficiency}%
                                        </p>
                                        <p className="text-xs text-slate-400">효율성</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* L3 계층 설명 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400 font-bold">L3</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">광역 계층 (Level 3)</h3>
                </div>
                <p className="text-slate-300 text-sm">
                    17개 광역시/도 단위의 노동인구 관리 계층입니다. 
                    각 지역의 산업 특성, 인구 구조, 경제 지표를 종합하여 인력 수급 정책을 수립합니다.
                </p>
            </div>
        </div>
    );
};
