const Statistics = () => {
    const stats = [
        { label: '산림 면적', value: '630만ha', change: '+0.5%' },
        { label: '연간 조림', value: '25,000ha', change: '+8.2%' },
        { label: '산불 발생', value: '620건', change: '-18.5%' },
        { label: '휴양림 방문', value: '1,200만명', change: '+15.3%' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">통계 분석</h2>
                <p className="text-sm text-gray-600 mt-1">산림청 주요 지표</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        title={stat.label}
                        value={stat.value}
                        icon="📊"
                        color="green"
                        description={stat.change}
                    />
                ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">주요 지표</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">항목</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">수치</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">변화</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {stats.map((stat, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{stat.label}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{stat.value}</td>
                                    <td className="px-6 py-4 text-sm text-center font-semibold text-green-800">{stat.change}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
