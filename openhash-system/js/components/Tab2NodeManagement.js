const Tab2NodeManagement = () => {
    const [nodes, setNodes] = React.useState([
        { id: 1, name: '서울 강남구 노드', layer: 2, status: 'active', joinTime: '2024-11-15' },
        { id: 2, name: '제주시 노드', layer: 2, status: 'active', joinTime: '2024-10-20' },
        { id: 3, name: '부산 해운대구 노드', layer: 2, status: 'active', joinTime: '2024-09-05' }
    ]);
    const [selectedAction, setSelectedAction] = React.useState(null);

    const handleJoinNode = () => {
        const newNode = {
            id: nodes.length + 1,
            name: `신규 노드 ${nodes.length + 1}`,
            layer: Math.floor(Math.random() * 3) + 1,
            status: 'joining',
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
                <h4 className="text-2xl font-bold text-gov-text mb-3">동적 노드 진입/탈퇴 관리</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    노드 관리 모듈은 네트워크의 동적 확장과 축소를 관리합니다. 
                    새로운 행정구역이 추가되거나 기존 노드가 제거될 때 전체 시스템의 무결성을 유지하면서 
                    자동으로 재구성됩니다. 국가/기업/개인 단위로 자유롭게 진입/퇴출이 가능하며, 
                    기존 네트워크의 합의 없이도 즉시 참여할 수 있습니다.
                </p>
            </div>

            {/* AWS 실측 노드 구성 테이블 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-green-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-server mr-3"></i>
                        AWS 실측 동적 노드 관리 테스트
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gov-border bg-gray-50">
                                <th className="text-left px-6 py-3 font-bold text-gov-text">시점</th>
                                <th className="text-center px-6 py-3 font-bold text-gov-text">Layer 1</th>
                                <th className="text-center px-6 py-3 font-bold text-gov-text">Layer 2</th>
                                <th className="text-center px-6 py-3 font-bold text-gov-text">Representative</th>
                                <th className="text-center px-6 py-3 font-bold text-gov-text">총 노드</th>
                                <th className="text-right px-6 py-3 font-bold text-gov-text">TPS</th>
                                <th className="text-center px-6 py-3 font-bold text-gov-text">변화율</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">초기 (T0)</td>
                                <td className="text-center px-6 py-4">3,400</td>
                                <td className="text-center px-6 py-4">143</td>
                                <td className="text-center px-6 py-4">8</td>
                                <td className="text-center px-6 py-4 font-bold">3,551</td>
                                <td className="text-right px-6 py-4">278,398</td>
                                <td className="text-center px-6 py-4">-</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50 bg-green-50">
                                <td className="px-6 py-4 font-bold text-gov-text">베트남 진입 (T1)</td>
                                <td className="text-center px-6 py-4">+800</td>
                                <td className="text-center px-6 py-4">+32</td>
                                <td className="text-center px-6 py-4">+2</td>
                                <td className="text-center px-6 py-4 font-bold">4,385</td>
                                <td className="text-right px-6 py-4 font-bold text-green-700">343,784</td>
                                <td className="text-center px-6 py-4 font-bold text-green-700">+23.5%</td>
                            </tr>
                            <tr className="hover:bg-gray-50 bg-red-50">
                                <td className="px-6 py-4 font-bold text-gov-text">싱가포르 퇴출 (T2)</td>
                                <td className="text-center px-6 py-4">-400</td>
                                <td className="text-center px-6 py-4">-18</td>
                                <td className="text-center px-6 py-4">-1</td>
                                <td className="text-center px-6 py-4 font-bold">3,966</td>
                                <td className="text-right px-6 py-4 font-bold text-red-700">310,934</td>
                                <td className="text-center px-6 py-4 font-bold text-red-700">-9.6%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gov-border">
                    <p className="text-sm text-gov-text-secondary">
                        <strong>주요 특징:</strong> 노드 수 변화 시 TPS 선형 증감, 무중단 재구성, 데이터 손실 0%
                    </p>
                </div>
            </div>

            {/* 무중단 재구성 타임라인 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-blue-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-clock mr-3"></i>
                        무중단 재구성 타임라인
                    </h4>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* 베트남 진입 */}
                        <div className="border-2 border-green-500 rounded-lg p-5 bg-green-50">
                            <h5 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-plus-circle"></i>
                                베트남 진입 (834개 노드 추가)
                            </h5>
                            <div className="space-y-3">
                                <div className="bg-white rounded p-3 border border-green-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">TPS 증가</span>
                                        <span className="text-green-700 font-bold">+23.5%</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">278,398 → 343,784 TPS</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-green-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">재구성 시간</span>
                                        <span className="text-green-700 font-bold">23.6ms</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">네트워크 토폴로지 자동 조정</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-green-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">PBFT 임계값</span>
                                        <span className="text-green-700 font-bold">5-of-8 → 7-of-10</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">Representative 노드 자동 조정</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-green-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">다운타임</span>
                                        <span className="text-green-700 font-bold">0초</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">무중단 서비스 유지</div>
                                </div>
                            </div>
                        </div>

                        {/* 싱가포르 퇴출 */}
                        <div className="border-2 border-red-500 rounded-lg p-5 bg-red-50">
                            <h5 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-minus-circle"></i>
                                싱가포르 퇴출 (419개 노드 제거)
                            </h5>
                            <div className="space-y-3">
                                <div className="bg-white rounded p-3 border border-red-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">TPS 감소</span>
                                        <span className="text-red-700 font-bold">-9.6%</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">343,784 → 310,934 TPS</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-red-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">재구성 시간</span>
                                        <span className="text-red-700 font-bold">8.98ms</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">라우팅 테이블 자동 업데이트</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-red-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">데이터 손실</span>
                                        <span className="text-red-700 font-bold">0%</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">상위 계층 자동 백업</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-red-300">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-gov-text">다운타임</span>
                                        <span className="text-red-700 font-bold">0초</span>
                                    </div>
                                    <div className="text-xs text-gov-text-secondary">무중단 서비스 유지</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Representative 노드 재선정 프로세스 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-crown mr-3"></i>
                        Representative 노드 자동 재선정
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text" style={{width: '200px'}}>선정 기준</th>
                                <td className="px-6 py-4 text-gov-text-secondary">Layer 2 노드 중 상위 10% 처리량 + 지리적 분산 고려</td>
                            </tr>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">임기</th>
                                <td className="px-6 py-4 text-gov-text-secondary">1주일 자동 재선정 (처리량, 응답 시간, 신뢰도 평가)</td>
                            </tr>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">재선정 조건</th>
                                <td className="px-6 py-4 text-gov-text-secondary">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>처리량 저하 (평균 대비 20% 이하)</li>
                                        <li>응답 시간 지연 (100ms 초과)</li>
                                        <li>신뢰도 점수 하락 (임계값 미달)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">노드 수 변화</th>
                                <td className="px-6 py-4 text-gov-text-secondary">
                                    베트남 진입 시: 8개 → 10개 (5-of-8 → 7-of-10 임계값 자동 조정)
                                </td>
                            </tr>
                            <tr>
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">배치 위치</th>
                                <td className="px-6 py-4 text-gov-text-secondary">Layer 3 (광역시도 계층), PBFT 변형 합의 수행</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 노드 진입/탈퇴 프로세스 */}
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
                            <span className="text-gov-text"><strong>신원 검증:</strong> BLS 서명으로 노드 인증</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <span className="text-gov-text"><strong>계층 배정:</strong> 행정 구역에 따라 Layer 결정</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                            <span className="text-gov-text"><strong>동기화:</strong> Merkle Tree 동기화</span>
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
                            <span className="text-gov-text"><strong>검증:</strong> Merkle Root 재계산</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                            <span className="text-gov-text"><strong>제거 완료:</strong> 네트워크에서 안전하게 제거</span>
                        </li>
                    </ol>
                </div>
            </div>

            {/* 실시간 시뮬레이터 */}
            <div className="bg-gov-gray rounded-lg p-6 border border-gov-border mb-8">
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
            <div className="grid md:grid-cols-3 gap-4">
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
