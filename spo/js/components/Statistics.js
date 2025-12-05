const Statistics = () => {
    const [activeChart, setActiveChart] = React.useState('case');

    const stats = {
        case: {
            title: '사건 처리 통계',
            data: [
                { label: '형사 사건 접수', value: '280만건', change: '+5.2%', trend: 'up' },
                { label: '기소', value: '125만건', change: '+3.8%', trend: 'up' },
                { label: '불기소', value: '98만건', change: '+2.5%', trend: 'up' },
                { label: '공판 유지', value: '112만건', change: '+4.1%', trend: 'up' }
            ]
        },
        performance: {
            title: '업무 성과 통계',
            data: [
                { label: '평균 처리 시간', value: '2.4일', change: '-92%', trend: 'down' },
                { label: '기소율', value: '56.1%', change: '+2.3%p', trend: 'up' },
                { label: '유죄율', value: '94.8%', change: '+1.2%p', trend: 'up' },
                { label: '상소율', value: '18.5%', change: '-3.5%p', trend: 'down' }
            ]
        },
        crime: {
            title: '범죄 유형 통계',
            data: [
                { label: '재산범죄', value: '85만건', change: '-5.2%', trend: 'down' },
                { label: '폭력범죄', value: '42만건', change: '-3.8%', trend: 'down' },
                { label: '마약범죄', value: '28만건', change: '+12.5%', trend: 'up' },
                { label: '디지털범죄', value: '38만건', change: '+18.2%', trend: 'up' }
            ]
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">통계 분석</h2>
                <p className="text-sm text-gray-600 mt-1">대검찰청 주요 지표 및 분석</p>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
                {Object.entries(stats).map(([key, value]) => (
                    <button key={key} onClick={() => setActiveChart(key)}
                        className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                            activeChart === key ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                                    <td className="px-6 py-4 text-sm text-center">
                                        <span className={stat.trend === 'up' ? 'text-blue-600 font-medium' : 'text-green-600 font-medium'}>
                                            {stat.trend === 'up' ? '▲' : '▼'} {stat.change}
                                        </span>
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
                        <span className="font-semibold text-gray-900">처리 효율:</span>
                        <span className="ml-2">AI 자동화로 평균 처리 시간 92% 단축</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">범죄 추세:</span>
                        <span className="ml-2">전통 범죄 감소, 디지털·마약 범죄 증가 추세</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">기소 품질:</span>
                        <span className="ml-2">AI 증거 분석으로 유죄율 94.8% 달성</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Statistics)();
