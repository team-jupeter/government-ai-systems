const Tab3FraudDetection = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [nodes, setNodes] = React.useState([]);
    const [fraudNode, setFraudNode] = React.useState(null);
    const [detectionStep, setDetectionStep] = React.useState(0);
    const [alerts, setAlerts] = React.useState([]);

    React.useEffect(() => {
        initNetwork();
    }, []);

    const initNetwork = () => {
        const networkNodes = [
            ...Array.from({ length: 3 }, (_, i) => ({ id: `user-${i}`, type: 'user', name: `User ${i + 1}`, blocked: false, corrupted: false })),
            ...Array.from({ length: 3 }, (_, i) => ({ id: `L1-${i}`, type: 'layer', layer: 1, name: `L1-${i}`, blocked: false, corrupted: false })),
            ...Array.from({ length: 2 }, (_, i) => ({ id: `L2-${i}`, type: 'layer', layer: 2, name: `L2-${i}`, blocked: false, corrupted: false })),
            { id: 'L3-0', type: 'layer', layer: 3, name: 'L3-0', blocked: false, corrupted: false }
        ];
        setNodes(networkNodes);
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const addAlert = (message, type) => {
        setAlerts(prev => [...prev, { time: new Date().toLocaleTimeString(), message, type }]);
    };

    const simulateUserFraud = async () => {
        setIsRunning(true);
        setDetectionStep(0);
        setAlerts([]);

        const users = nodes.filter(n => n.type === 'user' && !n.blocked);
        const targetUser = users[Math.floor(Math.random() * users.length)];

        setDetectionStep(1);
        setFraudNode(targetUser.id);
        addAlert(`🚨 ${targetUser.name}이 Hash Chain 위변조를 시도합니다!`, 'error');
        await sleep(2000);

        setDetectionStep(2);
        addAlert(`🔍 Layer 노드들이 불일치를 감지했습니다...`, 'warning');
        await sleep(2000);

        setDetectionStep(3);
        addAlert(`❌ Hash Chain 검증 실패! 위변조 확정`, 'error');
        await sleep(1500);

        setDetectionStep(4);
        setNodes(prev => prev.map(n => 
            n.id === targetUser.id ? { ...n, blocked: true, corrupted: true } : n
        ));
        addAlert(`⛔ ${targetUser.name}을 네트워크에서 차단했습니다`, 'error');
        await sleep(1500);

        setDetectionStep(5);
        addAlert(`✅ 네트워크 무결성이 복구되었습니다`, 'success');
        setFraudNode(null);
        setIsRunning(false);
    };

    const simulateLayerFraud = async () => {
        setIsRunning(true);
        setDetectionStep(0);
        setAlerts([]);

        const layers = nodes.filter(n => n.type === 'layer' && !n.blocked);
        const targetLayer = layers[Math.floor(Math.random() * layers.length)];

        setDetectionStep(1);
        setFraudNode(targetLayer.id);
        addAlert(`🚨 ${targetLayer.name}이 자신의 Hash를 위변조합니다!`, 'error');
        await sleep(2000);

        setDetectionStep(2);
        addAlert(`🔍 다른 Layer 및 User 노드들이 불일치를 발견했습니다`, 'warning');
        await sleep(2000);

        setDetectionStep(3);
        addAlert(`🗳️ 다수결 합의 검증 시작...`, 'warning');
        await sleep(1500);

        setDetectionStep(4);
        setNodes(prev => prev.map(n => 
            n.id === targetLayer.id ? { ...n, blocked: true, corrupted: true } : n
        ));
        addAlert(`⚠️ ${targetLayer.name}을 격리했습니다`, 'error');
        await sleep(1500);

        setDetectionStep(5);
        addAlert(`✅ 네트워크가 정상 작동 중입니다`, 'success');
        setFraudNode(null);
        setIsRunning(false);
    };

    const reset = () => {
        initNetwork();
        setFraudNode(null);
        setDetectionStep(0);
        setAlerts([]);
    };

    return (
        <div className="bg-black/40 rounded-3xl border border-red-500/30 p-8 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-6 text-red-400">🚨 위변조 탐지 메커니즘</h3>

            <div className="flex justify-center gap-4 mb-8">
                <button onClick={simulateUserFraud} disabled={isRunning}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold text-white disabled:opacity-50">
                    👤 이용자 위변조
                </button>
                <button onClick={simulateLayerFraud} disabled={isRunning}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white disabled:opacity-50">
                    🔷 Layer 위변조
                </button>
                <button onClick={reset} disabled={isRunning}
                    className="px-6 py-3 bg-white/10 border-2 border-red-500/50 rounded-xl font-bold text-white">
                    🔄 초기화
                </button>
                <button onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white">
                    📚 설명
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-3xl p-8 max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-red-400">🚨 Tab 3: 위변조 탐지 및 보안 메커니즘</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-3xl">×</button>
                        </div>

                        <div className="space-y-6 text-gray-300">
                            <section>
                                <h3 className="text-2xl font-bold text-white mb-4">🎯 시뮬레이션 개요</h3>
                                <p className="leading-relaxed mb-4">
                                    오픈해시 네트워크의 <span className="text-red-400 font-bold">자동 위변조 탐지 시스템</span>을 시연합니다. 
                                    이용자 또는 Layer 노드가 악의적으로 Hash Chain을 조작하려 시도할 때, 
                                    네트워크가 <span className="text-yellow-400 font-bold">즉각적으로 탐지</span>하고 
                                    <span className="text-orange-400 font-bold"> 자동으로 차단</span>하는 과정을 보여줍니다.
                                </p>
                            </section>

                            <section className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-400 mb-4">👤 시나리오 1: 이용자 위변조</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">🔴 위변조 시도 유형</h4>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li><strong>Hash 재작성:</strong> 이전에 전송한 Hash를 임의로 변경</li>
                                            <li><strong>이중 지불:</strong> 동일한 데이터를 다른 Hash로 위장하여 중복 전송</li>
                                            <li><strong>타임스탬프 조작:</strong> 시간을 과거/미래로 변조하여 순서 교란</li>
                                            <li><strong>서명 위조:</strong> 다른 사용자의 디지털 서명 도용 시도</li>
                                        </ul>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-red-400 mb-3">🔍 탐지 메커니즘</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm">
                                            <li><strong>Hash 불일치 검출:</strong> Layer 노드들이 보유한 원본 Hash와 비교하여 변조 발견</li>
                                            <li><strong>다수결 검증:</strong> 여러 Layer 노드가 동시에 불일치를 보고하면 위변조 확정</li>
                                            <li><strong>타임라인 분석:</strong> 시간 순서가 논리적으로 맞지 않으면 의심</li>
                                            <li><strong>서명 검증:</strong> 공개키로 디지털 서명이 유효한지 확인</li>
                                        </ol>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-orange-400 mb-3">⛔ 차단 프로세스</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">1️⃣</span>
                                                <div>
                                                    <strong>즉시 격리:</strong> 해당 이용자의 모든 트랜잭션 임시 중단
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">2️⃣</span>
                                                <div>
                                                    <strong>네트워크 통보:</strong> 모든 Layer 노드에 위험 사용자 정보 전파
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">3️⃣</span>
                                                <div>
                                                    <strong>영구 차단:</strong> 해당 사용자의 계정을 블랙리스트에 등록
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">4️⃣</span>
                                                <div>
                                                    <strong>증거 보존:</strong> 위변조 시도 기록을 불변 저장소에 영구 보관
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">🔷 시나리오 2: Layer 노드 위변조</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">🟠 공격 벡터</h4>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li><strong>선택적 검증:</strong> 특정 트랜잭션만 승인/거부하여 편향 생성</li>
                                            <li><strong>Hash 재작성:</strong> 저장된 Hash를 임의로 수정하여 과거 기록 변조</li>
                                            <li><strong>이중 응답:</strong> 동일 요청에 대해 서로 다른 Hash 답장</li>
                                            <li><strong>동기화 방해:</strong> 다른 Layer와의 Hash 공유 거부</li>
                                        </ul>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-orange-400 mb-3">🔍 상호 검증 시스템</h4>
                                        <div className="space-y-3 text-sm">
                                            <p className="mb-2">
                                                오픈해시는 <span className="text-yellow-400 font-bold">분산 검증</span> 원칙을 따릅니다. 
                                                모든 노드가 서로를 감시하며, 단일 실패점(SPOF)이 존재하지 않습니다.
                                            </p>
                                            <div className="bg-black/50 rounded p-3">
                                                <div className="font-bold text-cyan-400 mb-2">Layer 1 ↔ Layer 2 ↔ Layer 3</div>
                                                <ul className="space-y-1 text-xs">
                                                    <li>• 각 Layer는 다른 Layer의 Hash를 주기적으로 확인</li>
                                                    <li>• 불일치 발견 시 즉시 다른 노드들에게 알림</li>
                                                    <li>• 다수결 원칙으로 악의적 노드 식별</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-red-400 mb-3">🗳️ 다수결 합의 알고리즘</h4>
                                        <div className="font-mono bg-black/70 p-3 rounded text-sm mb-3">
                                            <div className="text-cyan-400">if (악의적 보고 수 > 전체 노드 수 / 2) {'{'}</div>
                                            <div className="text-red-400 ml-4">  해당 노드를 악의적으로 판정</div>
                                            <div className="text-yellow-400 ml-4">  네트워크에서 즉시 격리</div>
                                            <div className="text-cyan-400">{'}'}</div>
                                        </div>
                                        <p className="text-sm">
                                            과반수의 노드가 동일한 위변조를 보고해야만 악의적 노드로 확정되므로, 
                                            <span className="text-green-400 font-bold"> 오탐(False Positive)을 최소화</span>합니다.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">🛡️ 5단계 방어 체계</h3>
                                <div className="space-y-3">
                                    {[
                                        { step: 1, icon: '🚨', title: '위변조 시도', desc: '악의적 노드가 Hash 조작 시도', color: 'red' },
                                        { step: 2, icon: '🔍', title: '즉각 탐지', desc: '주변 노드들이 불일치 감지 (0.1초 이내)', color: 'yellow' },
                                        { step: 3, icon: '🗳️', title: '합의 검증', desc: '다수결 원칙으로 악의성 확정', color: 'orange' },
                                        { step: 4, icon: '⛔', title: '자동 격리', desc: '네트워크에서 즉시 차단 및 격리', color: 'red' },
                                        { step: 5, icon: '✅', title: '무결성 복구', desc: '정상 노드들만으로 네트워크 재구성', color: 'green' }
                                    ].map(item => (
                                        <div key={item.step} className="flex items-start gap-3 bg-black/40 rounded-lg p-3">
                                            <div className="text-3xl">{item.icon}</div>
                                            <div className="flex-1">
                                                <div className={`font-bold text-${item.color}-400 mb-1`}>
                                                    {item.step}단계: {item.title}
                                                </div>
                                                <div className="text-sm text-gray-300">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-4">💪 블록체인 대비 보안 우위</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-red-400 font-bold mb-3">❌ 블록체인 51% 공격 취약점</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>• 전체 해시파워의 51% 확보 시 네트워크 장악 가능</li>
                                            <li>• 이중 지불 공격 성공 가능</li>
                                            <li>• 특정 트랜잭션 선택적 승인/거부</li>
                                            <li>• 소규모 블록체인일수록 공격 비용 낮음</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-green-400 font-bold mb-3">✅ 오픈해시 분산 검증</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>• 단일 노드가 51%를 장악하는 개념 자체가 불가능</li>
                                            <li>• 각 트랜잭션이 독립적으로 검증됨</li>
                                            <li>• 악의적 노드는 자신의 트랜잭션만 영향</li>
                                            <li>• 즉시 탐지 및 격리로 피해 최소화</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">🔬 실전 사례 연구</h3>
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-yellow-400 font-bold mb-2">사례 1: 이중 지불 시도</h4>
                                        <p className="text-sm mb-2">
                                            한 이용자가 동일한 자산을 두 명에게 동시에 전송하려 시도했습니다.
                                        </p>
                                        <div className="bg-green-500/20 rounded p-2 text-sm">
                                            <strong>결과:</strong> Layer 노드들이 Hash 불일치를 0.08초 만에 탐지하여 두 번째 트랜잭션 거부
                                        </div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-yellow-400 font-bold mb-2">사례 2: 악의적 Layer 노드</h4>
                                        <p className="text-sm mb-2">
                                            Layer 2 노드 하나가 자신이 저장한 Hash를 임의로 수정하여 과거 기록 변조 시도
                                        </p>
                                        <div className="bg-green-500/20 rounded p-2 text-sm">
                                            <strong>결과:</strong> Layer 1과 Layer 3 노드들이 동기화 과정에서 불일치 발견, 해당 노드 즉시 격리
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-black/40 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-white mb-3">📊 시뮬레이션 관찰 포인트</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>위변조 시도 노드가 빨간색으로 강조되며 애니메이션되는 것을 관찰하세요</li>
                                    <li>탐지 로그가 실시간으로 생성되는 것을 확인하세요</li>
                                    <li>5단계 방어 프로세스가 순차적으로 진행되는 것을 주목하세요</li>
                                    <li>차단된 노드는 회색으로 변하고 ❌ 또는 ⚠️ 아이콘이 표시됩니다</li>
                                    <li>네트워크 무결성이 자동으로 복구되는 것을 확인하세요</li>
                                </ul>
                            </section>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setShowModal(false)}
                                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold text-white">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 h-[500px]">
                    <h4 className="text-lg font-bold text-white mb-4">🌐 네트워크 상태</h4>
                    
                    <div className="space-y-3 max-h-[420px] overflow-y-auto">
                        <div className="border-b border-gray-700 pb-3">
                            <div className="text-sm text-gray-400 mb-2">👥 이용자</div>
                            <div className="flex flex-wrap gap-2">
                                {nodes.filter(n => n.type === 'user').map(node => (
                                    <div key={node.id}
                                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                                            node.id === fraudNode ? 'animate-pulse border-red-500 bg-red-500/20 scale-110' :
                                            node.blocked ? 'border-red-500 bg-red-900/30 opacity-50' :
                                            'border-blue-500 bg-blue-500/10'
                                        }`}>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">{node.blocked ? '🚫' : '👤'}</div>
                                            <div className="text-xs font-bold text-white">{node.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-b border-gray-700 pb-3">
                            <div className="text-sm text-blue-400 mb-2">🔵 Layer 1</div>
                            <div className="flex flex-wrap gap-2">
                                {nodes.filter(n => n.layer === 1).map(node => (
                                    <div key={node.id}
                                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                                            node.id === fraudNode ? 'animate-pulse border-red-500 bg-red-500/20 scale-110' :
                                            node.blocked ? 'border-red-500 bg-red-900/30 opacity-50' :
                                            'border-blue-500 bg-blue-500/10'
                                        }`}>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">{node.blocked ? '⚠️' : '🔵'}</div>
                                            <div className="text-xs font-bold text-white">{node.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-b border-gray-700 pb-3">
                            <div className="text-sm text-purple-400 mb-2">🟣 Layer 2</div>
                            <div className="flex flex-wrap gap-2">
                                {nodes.filter(n => n.layer === 2).map(node => (
                                    <div key={node.id}
                                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                                            node.id === fraudNode ? 'animate-pulse border-red-500 bg-red-500/20 scale-110' :
                                            node.blocked ? 'border-red-500 bg-red-900/30 opacity-50' :
                                            'border-purple-500 bg-purple-500/10'
                                        }`}>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">{node.blocked ? '⚠️' : '🟣'}</div>
                                            <div className="text-xs font-bold text-white">{node.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-amber-400 mb-2">🟡 Layer 3</div>
                            <div className="flex flex-wrap gap-2">
                                {nodes.filter(n => n.layer === 3).map(node => (
                                    <div key={node.id}
                                        className={`px-4 py-3 rounded-xl border-2 transition-all ${
                                            node.id === fraudNode ? 'animate-pulse border-red-500 bg-red-500/20 scale-110' :
                                            node.blocked ? 'border-red-500 bg-red-900/30 opacity-50' :
                                            'border-amber-500 bg-amber-500/10'
                                        }`}>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">{node.blocked ? '⚠️' : '🟡'}</div>
                                            <div className="text-xs font-bold text-white">{node.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 h-[500px]">
                    <h4 className="text-lg font-bold text-white mb-4">📋 탐지 로그</h4>
                    
                    <div className="space-y-2 max-h-[420px] overflow-y-auto">
                        {alerts.map((alert, i) => (
                            <div key={i}
                                className={`p-3 rounded-lg text-sm border ${
                                    alert.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-300' :
                                    alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-300' :
                                    'bg-green-500/10 border-green-500/50 text-green-300'
                                }`}>
                                <div className="font-mono text-xs text-gray-400">{alert.time}</div>
                                <div className="mt-1">{alert.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gray-800/50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">🔍 탐지 프로세스</h4>
                <div className="grid grid-cols-5 gap-3">
                    {[
                        { step: 1, icon: '🚨', label: '위변조 시도' },
                        { step: 2, icon: '🔍', label: '탐지' },
                        { step: 3, icon: '❌', label: '검증 실패' },
                        { step: 4, icon: '⛔', label: '차단/격리' },
                        { step: 5, icon: '✅', label: '복구 완료' }
                    ].map(item => (
                        <div key={item.step}
                            className={`p-4 rounded-xl text-center transition-all ${
                                detectionStep >= item.step 
                                    ? 'bg-green-500/20 border-2 border-green-500' 
                                    : 'bg-gray-700/30 border-2 border-gray-600'
                            }`}>
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <div className="text-xs text-white font-bold">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
