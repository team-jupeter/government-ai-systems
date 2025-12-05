const NDRIntegration = () => {
    const dataSources = [
        { name: '수산정보포털', status: 'connected', records: '2,850,000건', lastSync: '2분 전' },
        { name: '항만운영정보시스템', status: 'connected', records: '15,680,000건', lastSync: '1분 전' },
        { name: '해양환경정보시스템', status: 'connected', records: '8,920,000건', lastSync: '3분 전' },
        { name: '어선안전정보시스템', status: 'connected', records: '620,000건', lastSync: '1분 전' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">국가데이터처 연동</h2>
                <p className="text-gray-600 mt-2">실시간 데이터 동기화 및 통합 관리</p>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-lg opacity-90">국가데이터처 연동 상태</div>
                        <div className="text-4xl font-bold mt-2">정상 운영 중</div>
                    </div>
                    <div className="text-6xl">✓</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">오늘 동기화</div>
                    <div className="text-2xl font-bold text-teal-600 mt-2">125,840건</div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">실시간 연동</div>
                    <div className="text-2xl font-bold text-green-600 mt-2">활성</div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">데이터 정확도</div>
                    <div className="text-2xl font-bold text-blue-600 mt-2">99.8%</div>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">응답 시간</div>
                    <div className="text-2xl font-bold text-purple-600 mt-2">0.3초</div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">📊 연동 데이터 소스</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dataSources.map((source, idx) => (
                        <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">{source.name}</h4>
                                    <div className="text-sm text-gray-600 mt-1">
                                        총 {source.records} | 최근: {source.lastSync}
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    ● 연결됨
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-teal-500 h-2 rounded-full" style={{width: '100%'}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">✓ 데이터 품질 관리</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-600">완전성</div>
                        <div className="text-2xl font-bold text-blue-600">99.9%</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-600">정확성</div>
                        <div className="text-2xl font-bold text-green-600">99.8%</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-600">일관성</div>
                        <div className="text-2xl font-bold text-purple-600">99.7%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => NDRIntegration)();
