const Statistics = () => {
    const [activeChart, setActiveChart] = React.useState('launch');

    const stats = {
        launch: {
            title: '발사체 통계',
            data: [
                { label: '누리호 발사 성공', value: '4회', change: '100%', trend: 'up' },
                { label: '발사체 개발 예산', value: '2.1조원', change: '+8.5%', trend: 'up' },
                { label: '참여 기업', value: '300개', change: '+45개', trend: 'up' },
                { label: '기술 자립도', value: '95%', change: '+25%p', trend: 'up' }
            ]
        },
        satellite: {
            title: '위성 통계',
            data: [
                { label: '운용 위성', value: '35기', change: '+5기', trend: 'up' },
                { label: '위성 데이터', value: '1.8PB', change: '+320TB', trend: 'up' },
                { label: 'KPS 개발 진척', value: '68%', change: '+12%p', trend: 'up' },
                { label: '관제 성공률', value: '99.9%', change: '+0.3%p', trend: 'up' }
            ]
        },
        exploration: {
            title: '우주탐사 통계',
            data: [
                { label: '다누리 운영일', value: '780일', change: '지속', trend: 'up' },
                { label: '달 표면 사진', value: '18,500장', change: '+1,200장', trend: 'up' },
                { label: '달 착륙 준비율', value: '32%', change: '+8%p', trend: 'up' },
                { label: '국제 협력', value: '28개국', change: '+6개국', trend: 'up' }
            ]
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">통계 분석</h2>
                <p className="text-sm text-gray-600 mt-1">우주항공청 주요 지표 및 분석</p>
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
                        <span className="font-semibold text-gray-900">발사체 부문:</span>
                        <span className="ml-2">누리호 4차 연속 발사 성공으로 독자 우주수송 능력 확보</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">위성 부문:</span>
                        <span className="ml-2">한국형 위성항법(KPS) 개발 순항, 2035년 완성 목표</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900">우주탐사:</span>
                        <span className="ml-2">다누리 성공적 운영, 2032년 달 착륙선 발사 준비 중</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Statistics)();
