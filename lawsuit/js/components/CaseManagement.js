const CaseManagement = () => {
    const [cases, setCases] = React.useState([
        {
            id: '2025가합12345',
            type: '민사',
            title: '손해배상(기)',
            court: '서울중앙지방법원',
            status: '변론준비',
            plaintiff: '홍길동',
            defendant: '(주)ABC',
            nextDate: '2025-12-15',
            progress: 45
        },
        {
            id: '2025나56789',
            type: '민사',
            title: '임대차보증금',
            court: '제주지방법원',
            status: '판결선고',
            plaintiff: '홍길동',
            defendant: '김철수',
            nextDate: null,
            progress: 100
        }
    ]);

    const getStatusColor = (status) => {
        const colors = {
            '소장접수': 'bg-blue-100 text-blue-700',
            '변론준비': 'bg-yellow-100 text-yellow-700',
            '변론중': 'bg-orange-100 text-orange-700',
            '판결선고': 'bg-green-100 text-green-700',
            '확정': 'bg-gray-100 text-gray-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-6">
                    <i className="fas fa-folder-open mr-2 text-blue-600"></i>사건 관리
                </h2>

                <div className="space-y-4">
                    {cases.map(c => (
                        <div key={c.id} className="border rounded-lg p-5 hover:shadow-md transition cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-bold text-blue-600">{c.id}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(c.status)}`}>
                                            {c.status}
                                        </span>
                                    </div>
                                    <h3 className="font-medium">{c.title}</h3>
                                    <p className="text-sm text-gray-500">{c.court}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500">진행률</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                                            <div 
                                                className="h-full bg-blue-600 rounded-full"
                                                style={{ width: `${c.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-bold">{c.progress}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="text-gray-500">
                                    <span className="text-green-600">원고: {c.plaintiff}</span>
                                    <span className="mx-2">vs</span>
                                    <span className="text-red-600">피고: {c.defendant}</span>
                                </div>
                                {c.nextDate && (
                                    <div className="text-blue-600">
                                        <i className="fas fa-calendar mr-1"></i>
                                        다음 기일: {c.nextDate}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
