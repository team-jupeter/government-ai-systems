const Statistics = () => {
    const [activeChart, setActiveChart] = React.useState('enlistment');

    const stats = {
        enlistment: {
            title: '입영 통계',
            data: [
                { label: '연간 입영 인원', value: '28만명', change: '-2.5%', trend: 'down' },
                { label: '현역 입영', value: '18.5만명', change: '-3.2%', trend: 'down' },
                { label: '사회복무요원', value: '8.2만명', change: '-1.8%', trend: 'down' },
                { label: '산업기능요원', value: '1.3만명', change: '+2.5%', trend: 'up' }
            ]
        },
        examination: {
            title: '병역판정 통계',
            data: [
                { label: '병역판정검사 대상', value: '32만명', change: '-2.8%', trend: 'down' },
                { label: '1급 판정', value: '12.5만명', change: '-1.5%', trend: 'down' },
                { label: '2-3급 판정', value: '16.8만명', change: '-3.2%', trend: 'down' },
                { label: '4급 이하', value: '2.7만명', change: '+1.2%', trend: 'up' }
            ]
        },
        service: {
            title: '복무 통계',
            data: [
                { label: '사회복무요원 복무 중', value: '25.8만명', change: '+1.5%', trend: 'up' },
                { label: '산업기능요원 복무 중', value: '3.8만명', change: '+2.8%', trend: 'up' },
                { label: '복무완료', value: '485만명', change: '+5.2%', trend: 'up' },
                { label: '병역면제', value: '2.1%', change: '-0.3%p', trend: 'down' }
            ]
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">통계 분석</h2>
                <p className="text-sm text-gray-600 mt-1">병무청 주요 지표 및 분석</p>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
                {Object.entries(stats).map(([key, value]) => (
                    <button key={key} onClick={() => setActiveChart(key)}
                        className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                            activeChart === key ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={activeChart === key ? {backgroundColor: '#65671f'} : {}}>
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
                                        <span className={stat.trend === 'up' ? 'font-medium' : 'text-green-600 font-medium'}
                                            style={stat.trend === 'up' ? {color: '#65671f'} : {}}>
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
                        <span className="font-semibold text-gray-900">인구 감소:</span>
                        <span className="ml-2">저출산으로 병역자원 지속 감소 추세</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">복무 형태:</span>
                        <span className="ml-2">사회복무·산업기능요원 비중 증가</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">처리 효율:</span>
                        <span className="ml-2">AI 자동화로 민원 처리 시간 88% 단축</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Statistics)();
