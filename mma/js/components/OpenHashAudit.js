const OpenHashAudit = () => {
    const recentBlocks = [
        { id: 'BLK7285450', timestamp: '14:23:45', type: '병역판정', transactions: 2500, hash: 'a7f9c3e8...', status: 'verified' },
        { id: 'BLK7285449', timestamp: '14:23:32', type: '입영통지', transactions: 1200, hash: 'f3b8e1d7...', status: 'verified' },
        { id: 'BLK7285448', timestamp: '14:23:18', type: '사회복무', transactions: 15000, hash: '8c2d9f4e...', status: 'verified' },
        { id: 'BLK7285447', timestamp: '14:23:05', type: '산업기능', transactions: 850, hash: '5e9a2f8d...', status: 'verified' }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">OpenHash 블록체인 감사</h2>
                <p className="text-sm text-gray-600 mt-1">투명하고 안전한 병적 기록 관리</p>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">항목</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">수치</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">총 블록 수</td>
                            <td className="px-6 py-4 text-sm text-center text-gray-900">7,285,450</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">오늘 생성 블록</td>
                            <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>19,550</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">검증 성공률</td>
                            <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>100%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">평균 처리시간</td>
                            <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>0.05초</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">최근 생성 블록</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">블록 ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">유형</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">트랜잭션</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">시각</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">상태</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {recentBlocks.map((block, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{block.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{block.type}</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-900">{block.transactions.toLocaleString()}개</td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-600">{block.timestamp}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2 py-1 rounded text-xs font-medium" style={{backgroundColor: '#f7fee7', color: '#65671f'}}>검증완료</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">위변조 방지 현황</h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">항목</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">수치</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">평가</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">위변조 시도</td>
                                <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>0건</td>
                                <td className="px-6 py-4 text-sm text-gray-700">완벽한 보안</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">블록 무결성</td>
                                <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>100%</td>
                                <td className="px-6 py-4 text-sm text-gray-700">완벽</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">감사 로그</td>
                                <td className="px-6 py-4 text-sm text-center font-semibold" style={{color: '#65671f'}}>7.2M건</td>
                                <td className="px-6 py-4 text-sm text-gray-700">정상</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

(() => OpenHashAudit)();
