const Statistics = () => {
    const [activeChart, setActiveChart] = React.useState('region');

    const stats = {
        region: {
            title: '지역별 통계',
            data: [
                { label: '북미 동포', value: '280만명', change: '+3.2%', trend: 'up' },
                { label: '중국 동포', value: '245만명', change: '+1.8%', trend: 'up' },
                { label: '일본 동포', value: '82만명', change: '+2.1%', trend: 'up' },
                { label: '중앙아시아 동포', value: '51만명', change: '+1.5%', trend: 'up' }
            ]
        },
        service: {
            title: '서비스 통계',
            data: [
                { label: '영사민원 처리', value: '285만건', change: '+8.5%', trend: 'up' },
                { label: '지원금 지급', value: '1.2조원', change: '+12.3%', trend: 'up' },
                { label: '한국어 교육', value: '18.5만명', change: '+15.2%', trend: 'up' },
                { label: '네트워크 매칭', value: '12,500건', change: '+22.8%', trend: 'up' }
            ]
        },
        satisfaction: {
            title: '만족도 통계',
            data: [
                { label: '민원 처리 만족도', value: '94%', change: '+26%p', trend: 'up' },
                { label: '지원사업 만족도', value: '91%', change: '+18%p', trend: 'up' },
                { label: '교육 프로그램 만족도', value: '89%', change: '+15%p', trend: 'up' },
                { label: '전체 만족도', value: '92%', change: '+20%p', trend: 'up' }
            ]
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">통계 분석</h2>
                <p className="text-sm text-gray-600 mt-1">재외동포청 주요 지표 및 분석</p>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
                {Object.entries(stats).map(([key, value]) => (
                    <button key={key} onClick={() => setActiveChart(key)}
                        className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                            activeChart === key ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        {value.title}
                    </button>
                ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{stats[activeChart].title} 주요 지표</h3>
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
                            {stats[activeChart].data.map((stat, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{stat.label}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{stat.value}</td>
                                    <td className="px-6 py-4 text-sm text-center text-green-600 font-medium">
                                        {stat.trend === 'up' ? '▲' : '▼'} {stat.change}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">AI 분석 인사이트</h3>
                <div className="space-y-3 text-sm text-gray-700">
                    <div>
                        <span className="font-semibold text-gray-900">지역별:</span>
                        <span className="ml-2">북미와 중국 동포가 전체의 70% 차지, 지역별 맞춤 서비스 필요</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">서비스:</span>
                        <span className="ml-2">비대면 민원 서비스 확대로 처리량 8.5% 증가</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">만족도:</span>
                        <span className="ml-2">AI 자동화로 전체 만족도 20%p 향상</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Statistics)();
