const NationalOverview = () => {
    const [data, setData] = React.useState(null);
    const [regions, setRegions] = React.useState([]);

    const RechartsLib = window.Recharts || {};
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } = RechartsLib;
    const chartsAvailable = BarChart && ResponsiveContainer;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [overviewRes, regionsRes] = await Promise.all([
                    fetch('/api/meal/national/overview'),
                    fetch('/api/meal/regions')
                ]);
                setData(await overviewRes.json());
                const regData = await regionsRes.json();
                setRegions(regData.regions || []);
            } catch (err) {
                console.error('Failed to fetch:', err);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const COLORS = ['#22d3ee', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    const topRegions = regions.slice(0, 6).map(r => ({
        name: r.name.replace('특별시', '').replace('광역시', '').replace('특별자치', '').replace('도', ''),
        meals: Math.round(r.daily_meals / 1000000)
    }));

    return (
        <div className="space-y-6">
            {/* 헤더 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-cyan-400 text-sm">등록 인구</div>
                            <div className="text-3xl font-bold">{(data?.population?.registered / 1000000)?.toFixed(1)}M</div>
                        </div>
                        <i className="fas fa-users text-4xl text-cyan-500/30"></i>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-green-400 text-sm">오늘 활성 이용자</div>
                            <div className="text-3xl font-bold">{(data?.population?.active_today / 1000000)?.toFixed(1)}M</div>
                        </div>
                        <i className="fas fa-user-check text-4xl text-green-500/30"></i>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-purple-400 text-sm">배송 정시율</div>
                            <div className="text-3xl font-bold">{data?.quality?.delivery_on_time}%</div>
                        </div>
                        <i className="fas fa-clock text-4xl text-purple-500/30"></i>
                    </div>
                </div>
            </div>

            {/* 차트 영역 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 지역별 급식량 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">
                        <i className="fas fa-chart-bar text-cyan-400 mr-2"></i>
                        지역별 일일 급식량 (백만 식)
                    </h3>
                    {chartsAvailable && topRegions.length > 0 ? (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topRegions}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                                        formatter={(value) => [`${value}M 식`, '급식량']}
                                    />
                                    <Bar dataKey="meals" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center bg-gray-700/50 rounded-lg">
                            <p className="text-gray-400">차트 로딩 중...</p>
                        </div>
                    )}
                </div>

                {/* 차량 상태 */}
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">
                        <i className="fas fa-truck text-green-400 mr-2"></i>
                        배송 차량 현황
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                            <span className="text-green-400"><i className="fas fa-shipping-fast mr-2"></i>배송중</span>
                            <span className="text-xl font-bold">{data?.vehicles?.active?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                            <span className="text-yellow-400"><i className="fas fa-pause-circle mr-2"></i>대기중</span>
                            <span className="text-xl font-bold">{(15000 - (data?.vehicles?.active || 0) - (data?.vehicles?.charging || 0))?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg">
                            <span className="text-blue-400"><i className="fas fa-bolt mr-2"></i>충전중</span>
                            <span className="text-xl font-bold">{data?.vehicles?.charging?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                            <span className="text-red-400"><i className="fas fa-tools mr-2"></i>정비중</span>
                            <span className="text-xl font-bold">{data?.vehicles?.maintenance?.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 지역별 상세 테이블 */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">
                    <i className="fas fa-map-marked-alt text-purple-400 mr-2"></i>
                    17개 광역시도 현황
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-400 border-b border-gray-700">
                                <th className="text-left py-3 px-4">지역</th>
                                <th className="text-right py-3 px-4">인구</th>
                                <th className="text-right py-3 px-4">조리시설</th>
                                <th className="text-right py-3 px-4">일일급식</th>
                                <th className="text-right py-3 px-4">배송률</th>
                                <th className="text-center py-3 px-4">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regions.map((region, idx) => (
                                <tr key={region.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                    <td className="py-3 px-4 font-medium">{region.name}</td>
                                    <td className="py-3 px-4 text-right">{(region.population / 1000000).toFixed(1)}M</td>
                                    <td className="py-3 px-4 text-right">{region.kitchens}</td>
                                    <td className="py-3 px-4 text-right">{(region.daily_meals / 1000000).toFixed(1)}M</td>
                                    <td className="py-3 px-4 text-right text-green-400">{region.delivery_rate}%</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            region.status === '정상' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {region.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
