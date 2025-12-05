const OpenHashAudit = () => {
    const [selectedBlock, setSelectedBlock] = React.useState(null);

    const blockchainStats = [
        { label: '총 블록 수', value: '2,845,920' },
        { label: '오늘 생성', value: '12,580' },
        { label: '검증 성공률', value: '100%' },
        { label: '평균 처리시간', value: '0.08초' }
    ];

    const recentBlocks = [
        { id: 'BLK2845920', timestamp: '14:23:45', type: '수산물 유통', transactions: 2850, hash: 'a7f9c3e8...', status: 'verified' },
        { id: 'BLK2845919', timestamp: '14:23:32', type: '항만 물류', transactions: 185, hash: 'f3b8e1d7...', status: 'verified' },
        { id: 'BLK2845918', timestamp: '14:23:18', type: '해양환경', transactions: 1240, hash: '8c2d9f4e...', status: 'verified' },
        { id: 'BLK2845917', timestamp: '14:23:05', type: '선박 안전', transactions: 325, hash: '5e9a2f8d...', status: 'verified' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">OpenHash 블록체인 감사</h2>
                <p className="text-gray-600 mt-2">투명하고 안전한 데이터 관리</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {blockchainStats.map((stat, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600">{stat.label}</div>
                        <div className="text-2xl font-bold text-teal-600 mt-2">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔗 최근 생성 블록</h3>
                <div className="space-y-3">
                    {recentBlocks.map((block, idx) => (
                        <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedBlock(selectedBlock === idx ? null : idx)}>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="font-bold text-gray-900">{block.id}</span>
                                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">{block.type}</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">✓ 검증완료</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {block.timestamp} | {block.transactions.toLocaleString()}개 트랜잭션
                                    </div>
                                </div>
                            </div>
                            {selectedBlock === idx && (
                                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">해시:</span>
                                        <span className="font-mono text-gray-900">{block.hash}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4">🛡️ 위변조 방지 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600">위변조 시도</div>
                        <div className="text-3xl font-bold text-red-600 mt-2">0건</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600">블록 무결성</div>
                        <div className="text-3xl font-bold text-green-600 mt-2">100%</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600">감사 로그</div>
                        <div className="text-3xl font-bold text-blue-600 mt-2">2.8M</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => OpenHashAudit)();
