const OpenHashAudit = () => {
    const blockchainStats = {
        totalBlocks: 1245678,
        todayBlocks: 2987,
        avgBlockTime: '0.8초',
        networkNodes: 503,
        energySaving: '98.5%'
    };
    
    const recentBlocks = Array.from({length: 10}, (_, i) => ({
        blockId: `BLK-0x${Math.random().toString(16).substr(2, 16)}`,
        timestamp: new Date(Date.now() - i * 120000).toISOString(),
        transactions: Math.floor(Math.random() * 50) + 10,
        size: `${(Math.random() * 2 + 0.5).toFixed(2)}KB`,
        validator: `Node-${Math.floor(Math.random() * 500) + 1}`,
        verified: true
    }));
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-lime-600 to-green-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">오픈해시 감사 추적</h2>
                <p className="text-lg text-lime-100">
                    모든 업무 처리는 오픈해시 분산원장에 기록되어 위변조가 불가능합니다.
                    기존 블록체인 대비 98.5% 에너지를 절감합니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <StatCard title="총 블록 수" value={blockchainStats.totalBlocks.toLocaleString()} icon="🔗" color="blue" />
                <StatCard title="오늘 생성" value={`${blockchainStats.todayBlocks}개`} icon="📦" color="green" />
                <StatCard title="평균 블록 시간" value={blockchainStats.avgBlockTime} icon="⏱️" color="purple" />
                <StatCard title="네트워크 노드" value={`${blockchainStats.networkNodes}개`} icon="🌐" color="orange" />
                <StatCard title="에너지 절감" value={blockchainStats.energySaving} icon="⚡" color="green" />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">최근 블록 생성 내역</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">블록 ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">생성 시각</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">트랜잭션</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">크기</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">검증자</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentBlocks.map((block, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-600">
                                        {block.blockId.substring(0, 20)}...
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(block.timestamp).toLocaleString('ko-KR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {block.transactions}건
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {block.size}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {block.validator}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <OpenHashBadge blockId={block.blockId} verified={block.verified} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">오픈해시 기술 특징</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">확률적 계층 선택</h4>
                            <p className="text-sm text-gray-600">
                                PoW/PoS 없이 확률적으로 노드를 선택하여 블록을 생성합니다.
                                채굴이 불필요하여 에너지 소비가 극소화됩니다.
                            </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">적응형 5계층 구조</h4>
                            <p className="text-sm text-gray-600">
                                Layer 0~4까지 계층별로 역할이 분리되어 확장성과 효율성을 동시에 달성합니다.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">양자내성 암호</h4>
                            <p className="text-sm text-gray-600">
                                CRYSTALS-Dilithium 알고리즘으로 양자컴퓨터 공격에도 50년 내구 보안성을 확보합니다.
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">초고속 처리</h4>
                            <p className="text-sm text-gray-600">
                                400만 TPS 처리 가능으로 전국 단위 실시간 세무 업무를 지원합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.OpenHashAudit = OpenHashAudit;
