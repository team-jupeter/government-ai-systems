const Tab2NodeManagement = () => {
    const [nodes, setNodes] = React.useState([
        { id: 'N1', name: '서울 강남구', status: 'active', layer: 2, joinTime: '2025-01-15' },
        { id: 'N2', name: '제주시', status: 'active', layer: 2, joinTime: '2025-02-01' },
        { id: 'N3', name: '부산 해운대구', status: 'active', layer: 2, joinTime: '2025-02-10' }
    ]);
    const [selectedAction, setSelectedAction] = React.useState(null);

    const handleJoinNode = () => {
        const newNode = {
            id: `N${nodes.length + 1}`,
            name: `새 노드 ${nodes.length + 1}`,
            status: 'joining',
            layer: 2,
            joinTime: new Date().toISOString().split('T')[0]
        };
        setNodes([...nodes, newNode]);
        setSelectedAction('join');
        
        setTimeout(() => {
            setNodes(prev => prev.map(n => 
                n.id === newNode.id ? { ...n, status: 'active' } : n
            ));
            setSelectedAction(null);
        }, 2000);
    };

    const handleLeaveNode = (nodeId) => {
        setNodes(prev => prev.map(n => 
            n.id === nodeId ? { ...n, status: 'leaving' } : n
        ));
        setSelectedAction('leave');
        
        setTimeout(() => {
            setNodes(prev => prev.filter(n => n.id !== nodeId));
            setSelectedAction(null);
        }, 2000);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">노드 진입/탈퇴 관리 (도면 350)</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    노드 관리 모듈(350)은 네트워크의 동적 확장과 축소를 관리합니다. 
                    새로운 행정구역이 추가되거나 기존 노드가 제거될 때 전체 시스템의 무결성을 유지하면서 
                    자동으로 재구성됩니다.
                </p>
            </div>

            {/* 노드 진입 프로세스 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
                    <h5 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-sign-in-alt"></i>
                        노드 진입 프로세스
                    </h5>
                    <ol className="space-y-3 text-sm">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <span className="text-gov-text"><strong>진입 요청:</strong> 신규 노드가 네트워크 참여 신청</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <span className="text-gov-text"><strong>신원 검증:</strong> BLS 서명(420)으로 노드 인증</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <span className="text-gov-text"><strong>계층 배정:</strong> 행정 구역에 따라 Layer 결정</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                            <span className="text-gov-text"><strong>동기화:</strong> Merkle Tree(330) 동기화</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                            <span className="text-gov-text"><strong>활성화:</strong> 네트워크 참여 완료</span>
                        </li>
                    </ol>
                </div>

                <div className="border-2 border-red-500 rounded-lg p-6 bg-red-50">
                    <h5 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-sign-out-alt"></i>
                        노드 탈퇴 프로세스
                    </h5>
                    <ol className="space-y-3 text-sm">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <span className="text-gov-text"><strong>탈퇴 요청:</strong> 노드가 네트워크 이탈 통보</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <span className="text-gov-text"><strong>데이터 이관:</strong> 보유 데이터를 상위 계층으로 전송</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <span className="text-gov-text"><strong>연결 재구성:</strong> 주변 노드들의 라우팅 업데이트</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                            <span className="text-gov-text"><strong>검증:</strong> Merkle Root(410) 재계산</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                            <span className="text-gov-text"><strong>제거 완료:</strong> 네트워크에서 안전하게 제거</span>
                        </li>
                    </ol>
                </div>
            </div>

            {/* 실시간 시뮬레이터 */}
            <div className="bg-gov-gray rounded-lg p-6 border border-gov-border">
                <h5 className="font-bold text-gov-text mb-4">실시간 노드 관리 시뮬레이터</h5>
                
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={handleJoinNode}
                        disabled={selectedAction !== null}
                        className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 disabled:opacity-50"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        노드 추가
                    </button>
                </div>

                <div className="space-y-3">
                    {nodes.map(node => (
                        <div key={node.id} className={`bg-white rounded-lg p-4 border-2 flex items-center justify-between ${
                            node.status === 'active' ? 'border-green-500' :
                            node.status === 'joining' ? 'border-blue-500 animate-pulse' :
                            'border-red-500 animate-pulse'
                        }`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    node.status === 'active' ? 'bg-green-100' :
                                    node.status === 'joining' ? 'bg-blue-100' :
                                    'bg-red-100'
                                }`}>
                                    <i className={`fas fa-server ${
                                        node.status === 'active' ? 'text-green-600' :
                                        node.status === 'joining' ? 'text-blue-600' :
                                        'text-red-600'
                                    }`}></i>
                                </div>
                                <div>
                                    <div className="font-bold text-gov-text">{node.name}</div>
                                    <div className="text-sm text-gov-text-secondary">
                                        Layer {node.layer} | {node.status === 'active' ? '활성' : node.status === 'joining' ? '진입 중' : '탈퇴 중'}
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">가입일: {node.joinTime}</div>
                                </div>
                            </div>
                            {node.status === 'active' && (
                                <button
                                    onClick={() => handleLeaveNode(node.id)}
                                    disabled={selectedAction !== null}
                                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-bold hover:bg-red-200 disabled:opacity-50"
                                >
                                    제거
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 핵심 특징 */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                    <i className="fas fa-bolt text-3xl text-blue-600 mb-2"></i>
                    <div className="font-bold text-gov-text">동적 확장</div>
                    <div className="text-xs text-gov-text-secondary mt-1">서비스 중단 없이 노드 추가</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                    <i className="fas fa-shield-alt text-3xl text-green-600 mb-2"></i>
                    <div className="font-bold text-gov-text">무결성 유지</div>
                    <div className="text-xs text-gov-text-secondary mt-1">자동 Merkle Tree 재계산</div>
                </div>
                <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 text-center">
                    <i className="fas fa-sync text-3xl text-purple-600 mb-2"></i>
                    <div className="font-bold text-gov-text">자동 재구성</div>
                    <div className="text-xs text-gov-text-secondary mt-1">네트워크 토폴로지 자동 조정</div>
                </div>
            </div>
        </div>
    );
};
