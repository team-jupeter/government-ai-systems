const Statistics = () => {
    const [activeChart, setActiveChart] = React.useState('startup');

    const stats = {
        startup: {
            title: '창업 통계',
            data: [
                { label: '연간 창업기업', value: '146만개', change: '+8.2%', trend: 'up' },
                { label: '창업지원금', value: '2.8조원', change: '+12.5%', trend: 'up' },
                { label: '창업 성공률', value: '89%', change: '+15%p', trend: 'up' },
                { label: '창업교육 수료', value: '28만명', change: '+6.8%', trend: 'up' }
            ]
        },
        sme: {
            title: '중소기업 통계',
            data: [
                { label: '중소기업 수', value: '765만개', change: '+2.1%', trend: 'up' },
                { label: '정책자금 융자', value: '42.5조원', change: '+5.3%', trend: 'up' },
                { label: '고용 인원', value: '1,850만명', change: '+3.2%', trend: 'up' },
                { label: '수출액', value: '285조원', change: '+4.8%', trend: 'up' }
            ]
        },
        venture: {
            title: '벤처 통계',
            data: [
                { label: '벤처기업 수', value: '4.8만개', change: '+18.5%', trend: 'up' },
                { label: '벤처투자액', value: '8.5조원', change: '+22.3%', trend: 'up' },
                { label: '유니콘 기업', value: '28개', change: '+5개', trend: 'up' },
                { label: '벤처펀드 조성', value: '12.8조원', change: '+15.2%', trend: 'up' }
            ]
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">통계 분석</h2>
                <p className="text-gray-600 mt-2">중소벤처기업부 주요 지표 및 분석</p>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
                {Object.entries(stats).map(([key, value]) => (
                    <button key={key} onClick={() => setActiveChart(key)}
                        className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                            activeChart === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">🤖 AI 분석 인사이트</h3>
                <div className="space-y-3 text-sm">
                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-gray-900 mb-2">📊 창업 부문</div>
                        <p className="text-gray-700">
                            2024년 창업기업이 전년 대비 8.2% 증가하며 창업 활성화 정책 효과가 가시화되고 있습니다.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="font-bold text-gray-900 mb-2">🚀 벤처 부문</div>
                        <p className="text-gray-700">
                            벤처투자액이 22.3% 증가하여 혁신성장 생태계가 확대되고 있으며, 유니콘 기업도 5개 추가되었습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Statistics)();
