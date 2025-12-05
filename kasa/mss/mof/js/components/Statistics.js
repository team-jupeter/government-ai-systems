const Statistics = () => {
    const [activeChart, setActiveChart] = React.useState('fishery');

    const stats = {
        fishery: {
            title: '수산 통계',
            data: [
                { label: '어획량', value: '230만톤', change: '+3.2%', trend: 'up' },
                { label: '양식 생산량', value: '105만톤', change: '+5.8%', trend: 'up' },
                { label: '수산물 수출', value: '28.5억불', change: '+7.2%', trend: 'up' },
                { label: '수산물 수입', value: '45.2억불', change: '-2.1%', trend: 'down' }
            ]
        },
        port: {
            title: '항만 통계',
            data: [
                { label: '컨테이너 물동량', value: '2,850만TEU', change: '+4.5%', trend: 'up' },
                { label: '벌크 화물', value: '8.2억톤', change: '+2.3%', trend: 'up' },
                { label: '선박 입항', value: '18.5만척', change: '+1.8%', trend: 'up' },
                { label: '항만 매출', value: '12.8조원', change: '+6.5%', trend: 'up' }
            ]
        },
        marine: {
            title: '해양 통계',
            data: [
                { label: '해양보호구역', value: '35개소', change: '+3개', trend: 'up' },
                { label: '해양레저 관광객', value: '4,250만명', change: '+8.5%', trend: 'up' },
                { label: '해양쓰레기 수거', value: '3.2만톤', change: '+12.3%', trend: 'up' },
                { label: '해양환경 투자', value: '2.8조원', change: '+15.2%', trend: 'up' }
            ]
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">통계 분석</h2>
                <p className="text-gray-600 mt-2">해양수산부 주요 지표 및 분석</p>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
                {Object.entries(stats).map(([key, value]) => (
                    <button key={key} onClick={() => setActiveChart(key)}
                        className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                            activeChart === key ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        {value.title}
                    </button>
                ))}
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{stats[activeChart].title} 주요 지표</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {stats[activeChart].data.map((stat, idx) => (
                        <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <div className="text-sm text-gray-600">{stat.label}</div>
                            <div className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</div>
                            <div className={`text-sm font-medium mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.trend === 'up' ? '▲' : '▼'} {stat.change}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border-2 border-teal-200">
                <h3 className="text-xl font-bold text-teal-900 mb-4">🤖 AI 분석 인사이트</h3>
                <div className="space-y-3 text-sm">
                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-gray-900 mb-2">📊 수산 부문</div>
                        <p className="text-gray-700">
                            2024년 상반기 수산물 생산량이 전년 대비 3.2% 증가했으며, 특히 양식 부문에서 5.8%의 높은 성장세를 보이고 있습니다.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-gray-900 mb-2">🚢 항만 부문</div>
                        <p className="text-gray-700">
                            컨테이너 물동량이 4.5% 증가하여 글로벌 물류 허브로서의 위상을 강화하고 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Statistics)();
