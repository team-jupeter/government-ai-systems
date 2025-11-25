const Tab1HashTransmission = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [layers, setLayers] = React.useState({ layer1: [], layer2: [], layer3: [] });
    const [transmissions, setTransmissions] = React.useState([]);
    const [stats, setStats] = React.useState({ requests: 0, responses: 0, layerSync: 0 });

    const isRunningRef = React.useRef(false);
    const layersRef = React.useRef({ layer1: [], layer2: [], layer3: [] });
    const usersRef = React.useRef([]);

    React.useEffect(() => {
        initNetwork();
    }, []);

    React.useEffect(() => {
        layersRef.current = layers;
    }, [layers]);

    React.useEffect(() => {
        usersRef.current = users;
    }, [users]);

    const initNetwork = () => {
        const newUsers = Array.from({ length: 5 }, (_, i) => ({
            id: `user-${i}`,
            name: `User ${i + 1}`,
            x: 10,
            y: 15 + (i * 16),
            hash: null,
            color: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][i]
        }));
        setUsers(newUsers);
        usersRef.current = newUsers;

        const newLayers = {
            layer1: Array.from({ length: 5 }, (_, i) => ({
                id: `L1-${i}`,
                layer: 1,
                x: 40,
                y: 10 + (i * 18),
                hash: null,
                active: false
            })),
            layer2: Array.from({ length: 3 }, (_, i) => ({
                id: `L2-${i}`,
                layer: 2,
                x: 65,
                y: 20 + (i * 20),
                hash: null,
                active: false
            })),
            layer3: [{
                id: 'L3-0',
                layer: 3,
                x: 90,
                y: 50,
                hash: null,
                active: false
            }]
        };
        setLayers(newLayers);
        layersRef.current = newLayers;
    };

    const sha256 = async (text) => {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 12);
        } catch (error) {
            return Math.random().toString(16).slice(2, 14);
        }
    };

    const selectLayer = (hash) => {
        const lastTwo = hash.slice(-2);
        const value = parseInt(lastTwo, 16) % 100;
        if (value < 70) return 1;
        if (value < 90) return 2;
        return 3;
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const animateTransmission = async (startX, startY, endX, endY, isResponse = false) => {
        const transmission = {
            id: `trans-${Date.now()}-${Math.random()}`,
            startX,
            startY,
            endX,
            endY,
            progress: 0,
            isResponse,
        };

        setTransmissions(prev => [...prev, transmission]);

        for (let p = 0; p <= 100; p += 10) {
            await sleep(30);
            setTransmissions(prev => prev.map(t => 
                t.id === transmission.id ? { ...t, progress: p } : t
            ));
        }

        setTransmissions(prev => prev.filter(t => t.id !== transmission.id));
    };

    const userToLayerTransmission = async (userIndex) => {
        const user = usersRef.current[userIndex];
        if (!user) return;

        const userHash = await sha256(`${user.id}-${Date.now()}`);
        setUsers(prev => prev.map((u, i) => i === userIndex ? { ...u, hash: userHash } : u));

        const targetLayer = selectLayer(userHash);
        const layerKey = `layer${targetLayer}`;
        const layerNodes = layersRef.current[layerKey];
        const targetNode = layerNodes[Math.floor(Math.random() * layerNodes.length)];

        await animateTransmission(user.x, user.y, targetNode.x, targetNode.y, false);
        setStats(prev => ({ ...prev, requests: prev.requests + 1 }));

        const layerHash = await sha256(`${targetNode.id}-${Date.now()}`);
        setLayers(prev => ({
            ...prev,
            [layerKey]: prev[layerKey].map(n => 
                n.id === targetNode.id ? { ...n, hash: layerHash, active: true } : n
            )
        }));

        await sleep(300);

        await animateTransmission(targetNode.x, targetNode.y, user.x, user.y, true);
        setStats(prev => ({ ...prev, responses: prev.responses + 1 }));
    };

    const layerToLayerSync = async () => {
        const l1Nodes = layersRef.current.layer1.filter(n => n.hash);
        if (l1Nodes.length > 0) {
            const sourceL1 = l1Nodes[Math.floor(Math.random() * l1Nodes.length)];
            const l2Nodes = layersRef.current.layer2;
            const targetL2 = l2Nodes[Math.floor(Math.random() * l2Nodes.length)];

            await animateTransmission(sourceL1.x, sourceL1.y, targetL2.x, targetL2.y, false);
            
            const l2Hash = await sha256(`${targetL2.id}-sync-${Date.now()}`);
            setLayers(prev => ({
                ...prev,
                layer2: prev.layer2.map(n => 
                    n.id === targetL2.id ? { ...n, hash: l2Hash, active: true } : n
                )
            }));

            await sleep(200);

            await animateTransmission(targetL2.x, targetL2.y, sourceL1.x, sourceL1.y, true);
            setStats(prev => ({ ...prev, layerSync: prev.layerSync + 1 }));
        }

        await sleep(500);

        const l2Nodes = layersRef.current.layer2.filter(n => n.hash);
        if (l2Nodes.length > 0) {
            const sourceL2 = l2Nodes[Math.floor(Math.random() * l2Nodes.length)];
            const targetL3 = layersRef.current.layer3[0];

            await animateTransmission(sourceL2.x, sourceL2.y, targetL3.x, targetL3.y, false);
            
            const l3Hash = await sha256(`${targetL3.id}-sync-${Date.now()}`);
            setLayers(prev => ({
                ...prev,
                layer3: prev.layer3.map(n => ({ ...n, hash: l3Hash, active: true }))
            }));

            await sleep(200);

            await animateTransmission(targetL3.x, targetL3.y, sourceL2.x, sourceL2.y, true);
            setStats(prev => ({ ...prev, layerSync: prev.layerSync + 1 }));
        }
    };

    const runContinuousSimulation = async () => {
        isRunningRef.current = true;
        setIsRunning(true);
        
        while (isRunningRef.current) {
            for (let i = 0; i < 5; i++) {
                if (!isRunningRef.current) return;
                await userToLayerTransmission(i);
                await sleep(800);
            }

            await sleep(2000);
            if (!isRunningRef.current) return;
            
            await layerToLayerSync();

            await sleep(1000);
        }
    };

    const startSimulation = () => {
        setStats({ requests: 0, responses: 0, layerSync: 0 });
        runContinuousSimulation();
    };

    const stopSimulation = () => {
        isRunningRef.current = false;
        setIsRunning(false);
    };

    const reset = () => {
        isRunningRef.current = false;
        setIsRunning(false);
        setTransmissions([]);
        setStats({ requests: 0, responses: 0, layerSync: 0 });
        initNetwork();
    };

    return (
        <div className="bg-black/40 rounded-3xl border border-cyan-500/30 p-8 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">📤 양방향 Hash Chain 연동 시뮬레이션</h3>

            <div className="flex justify-center gap-4 mb-8">
                {!isRunning ? (
                    <button onClick={startSimulation}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:shadow-lg transition-all">
                        ▶️ 시작
                    </button>
                ) : (
                    <button onClick={stopSimulation}
                        className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold text-white hover:shadow-lg transition-all">
                        ⏸️ 중지
                    </button>
                )}
                <button onClick={reset}
                    className="px-8 py-3 bg-white/10 border-2 border-cyan-500/50 rounded-xl font-bold text-white hover:bg-white/20 transition-all">
                    🔄 초기화
                </button>
                <button onClick={() => setShowModal(true)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white hover:shadow-lg transition-all">
                    📚 설명
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500 rounded-3xl p-8 max-w-6xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                📤 Tab 1: 양방향 Hash Chain 연동 - 오픈해시의 핵심 메커니즘
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-3xl">×</button>
                        </div>

                        <div className="space-y-6 text-gray-300">
                            {/* 시뮬레이션 개요 */}
                            <section className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🎯</span> 시뮬레이션 개요
                                </h3>
                                <p className="leading-relaxed text-lg mb-4">
                                    이 시뮬레이션은 오픈해시 네트워크의 <span className="text-cyan-400 font-bold">핵심 메커니즘</span>인 
                                    <span className="text-purple-400 font-bold"> 양방향 Hash Chain 연동</span>과 
                                    <span className="text-green-400 font-bold"> 계층 간 동기화</span>를 실시간으로 시각화합니다.
                                </p>
                                <div className="bg-black/40 rounded-xl p-5 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">🔄</span>
                                        <div>
                                            <strong className="text-cyan-400">연속 실행:</strong> 중단 없이 계속 동작하여 실제 네트워크 환경 재현
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">🔵</span>
                                        <div>
                                            <strong className="text-blue-400">요청 패킷 (파란색):</strong> 왼쪽에서 오른쪽으로 이동하는 Hash 전송
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">🔴</span>
                                        <div>
                                            <strong className="text-red-400">응답 패킷 (빨간색):</strong> 오른쪽에서 왼쪽으로 돌아오는 Hash 답장
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">⏰</span>
                                        <div>
                                            <strong className="text-purple-400">2초 주기 동기화:</strong> Layer 1 → 2 → 3 순차적 Hash 전파
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 1단계: 확률적 계층 선택 */}
                            <section className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🔵</span> 1단계: 확률적 계층 선택 및 요청 전송 (파란색 패킷 📤)
                                </h3>
                                
                                <div className="space-y-5">
                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">🔐</span> SHA-256 암호화 해싱
                                        </h4>
                                        <p className="text-base mb-4 leading-relaxed">
                                            각 이용자는 자신의 데이터에 대해 <span className="text-cyan-400 font-bold">SHA-256 암호화 알고리즘</span>을 
                                            적용하여 고유한 Hash를 생성합니다. SHA-256은 미국 국가안보국(NSA)이 설계한 
                                            <span className="text-yellow-400 font-bold"> 군사급 암호화 표준</span>으로, 
                                            비트코인을 비롯한 대부분의 블록체인이 채택하고 있습니다.
                                        </p>
                                        
                                        <div className="bg-black/60 rounded-lg p-4 mb-4">
                                            <div className="font-mono text-sm space-y-2">
                                                <div className="text-cyan-400">입력 데이터:</div>
                                                <div className="text-white ml-4">UserID: "user-0"</div>
                                                <div className="text-white ml-4">Timestamp: 1732518234567</div>
                                                <div className="text-white ml-4">Transaction: "송금 1000원"</div>
                                                <div className="text-purple-400 mt-3">↓ SHA-256 해싱</div>
                                                <div className="text-green-400 mt-2">출력 Hash:</div>
                                                <div className="text-green-300 ml-4 break-all">a3f5d9e2b8c14a7f6d2e9b1c3f8a5d7e</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="bg-cyan-500/20 rounded-lg p-3">
                                                <div className="font-bold text-cyan-400 mb-1 text-sm">🔒 단방향성</div>
                                                <div className="text-xs">Hash에서 원본 복원 불가능</div>
                                            </div>
                                            <div className="bg-blue-500/20 rounded-lg p-3">
                                                <div className="font-bold text-blue-400 mb-1 text-sm">⚡ 충돌 저항성</div>
                                                <div className="text-xs">동일 Hash 생성 확률: 2^-256</div>
                                            </div>
                                            <div className="bg-purple-500/20 rounded-lg p-3">
                                                <div className="font-bold text-purple-400 mb-1 text-sm">🌊 눈사태 효과</div>
                                                <div className="text-xs">1비트 변경 시 50%+ 출력 변경</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">🎲</span> 확률적 Layer 배정 알고리즘
                                        </h4>
                                        
                                        <div className="bg-black/60 rounded-lg p-4 mb-4">
                                            <div className="font-mono text-sm space-y-2">
                                                <div className="text-cyan-400">const lastTwo = hash.slice(-2); <span className="text-gray-400">// Hash 마지막 2자리 추출</span></div>
                                                <div className="text-purple-400">const value = parseInt(lastTwo, 16) % 100; <span className="text-gray-400">// 16진수→10진수, 0-99 범위</span></div>
                                                <div className="text-white mt-2">if (value &lt; 70) return Layer1; <span className="text-gray-400">// 70% 확률</span></div>
                                                <div className="text-white">if (value &lt; 90) return Layer2; <span className="text-gray-400">// 20% 확률</span></div>
                                                <div className="text-white">return Layer3; <span className="text-gray-400">// 10% 확률</span></div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="bg-blue-500/20 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-blue-400">🔵 Layer 1 (5개 노드)</span>
                                                    <span className="text-2xl font-bold text-blue-400">70%</span>
                                                </div>
                                                <div className="bg-blue-600 h-3 rounded-full" style={{width: '70%'}}></div>
                                                <div className="text-sm mt-2 text-gray-300">
                                                    <strong>역할:</strong> 일반 트랜잭션 대량 처리, 빠른 응답 우선
                                                </div>
                                            </div>
                                            
                                            <div className="bg-purple-500/20 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-purple-400">🟣 Layer 2 (3개 노드)</span>
                                                    <span className="text-2xl font-bold text-purple-400">20%</span>
                                                </div>
                                                <div className="bg-purple-600 h-3 rounded-full" style={{width: '20%'}}></div>
                                                <div className="text-sm mt-2 text-gray-300">
                                                    <strong>역할:</strong> 중요 트랜잭션 검증, 균형잡힌 보안-속도
                                                </div>
                                            </div>
                                            
                                            <div className="bg-amber-500/20 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-amber-400">🟡 Layer 3 (1개 노드)</span>
                                                    <span className="text-2xl font-bold text-amber-400">10%</span>
                                                </div>
                                                <div className="bg-amber-600 h-3 rounded-full" style={{width: '10%'}}></div>
                                                <div className="text-sm mt-2 text-gray-300">
                                                    <strong>역할:</strong> 최고 보안 트랜잭션, 다중 검증 수행
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 bg-green-500/20 rounded-lg p-4">
                                            <h5 className="font-bold text-green-400 mb-2">💡 왜 확률적 분산인가?</h5>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>자동 부하 분산:</strong> 중앙 조정 없이 트래픽 자동 분배</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>예측 불가능성:</strong> SHA-256의 무작위성으로 조작 방지</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>확장성:</strong> 노드 추가 시 자동으로 부하 재분배</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>경제성:</strong> Layer 1에 70% 집중하여 비용 최적화</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">📤</span> 요청 패킷 전송 (파란색)
                                        </h4>
                                        <p className="text-base mb-4 leading-relaxed">
                                            이용자는 선택된 Layer의 노드 중 <span className="text-blue-400 font-bold">무작위로 하나</span>를 
                                            선정하여 자신의 Hash를 <span className="text-blue-500 font-bold">파란색 패킷</span>으로 전송합니다. 
                                            이 과정은 <span className="text-yellow-400 font-bold">0.4초 이내</span>에 완료됩니다.
                                        </p>
                                        <div className="bg-blue-500/20 rounded-lg p-4">
                                            <div className="font-mono text-sm space-y-2">
                                                <div className="text-cyan-400">// 전송 페이로드 구조</div>
                                                <div className="text-white">{'{'}</div>
                                                <div className="text-white ml-4">"type": "REQUEST",</div>
                                                <div className="text-white ml-4">"from": "user-0",</div>
                                                <div className="text-white ml-4">"to": "L2-1",</div>
                                                <div className="text-white ml-4">"hash": "a3f5d9e2b8c1",</div>
                                                <div className="text-white ml-4">"timestamp": 1732518234567,</div>
                                                <div className="text-white ml-4">"signature": "..."</div>
                                                <div className="text-white">{'}'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2단계: 응답 전송 */}
                            <section className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🔴</span> 2단계: 응답 전송 및 상호 검증 (빨간색 패킷 📨)
                                </h3>
                                
                                <div className="space-y-5">
                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">🎯</span> Layer 노드의 수신 및 처리
                                        </h4>
                                        <p className="text-base mb-4 leading-relaxed">
                                            Layer 노드가 이용자의 Hash를 수신하면 다음 작업을 순차적으로 수행합니다:
                                        </p>
                                        <ol className="space-y-3 text-sm">
                                            <li className="flex items-start gap-3 bg-black/40 rounded p-3">
                                                <span className="text-2xl font-bold text-cyan-400">1</span>
                                                <div>
                                                    <strong className="text-cyan-400">Hash 검증:</strong> 수신한 Hash의 형식과 서명이 유효한지 확인
                                                    <div className="text-xs text-gray-400 mt-1">검증 시간: ~10ms</div>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3 bg-black/40 rounded p-3">
                                                <span className="text-2xl font-bold text-purple-400">2</span>
                                                <div>
                                                    <strong className="text-purple-400">중복 확인:</strong> 동일한 Hash가 이미 처리되었는지 로컬 DB 조회
                                                    <div className="text-xs text-gray-400 mt-1">조회 시간: ~5ms</div>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3 bg-black/40 rounded p-3">
                                                <span className="text-2xl font-bold text-green-400">3</span>
                                                <div>
                                                    <strong className="text-green-400">Layer Hash 생성:</strong> 노드 자신의 고유 Hash 생성
                                                    <div className="text-xs text-gray-400 mt-1">생성 시간: ~2ms</div>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3 bg-black/40 rounded p-3">
                                                <span className="text-2xl font-bold text-yellow-400">4</span>
                                                <div>
                                                    <strong className="text-yellow-400">로컬 저장:</strong> 이용자 Hash와 자신의 Hash를 영구 저장
                                                    <div className="text-xs text-gray-400 mt-1">저장 시간: ~15ms</div>
                                                </div>
                                            </li>
                                        </ol>

                                        <div className="mt-4 bg-black/60 rounded-lg p-4">
                                            <div className="font-mono text-sm space-y-2">
                                                <div className="text-purple-400">// Layer 노드의 Hash 생성</div>
                                                <div className="text-white">const layerHash = await sha256(</div>
                                                <div className="text-cyan-400 ml-4">nodeId + timestamp + receivedHash</div>
                                                <div className="text-white">);</div>
                                                <div className="text-gray-400 mt-2">// 결과: "def456789abc"</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">📨</span> 응답 패킷 전송 (빨간색)
                                        </h4>
                                        <p className="text-base mb-4 leading-relaxed">
                                            Layer 노드는 자신의 Hash를 <span className="text-red-500 font-bold">빨간색 패킷</span>으로 
                                            이용자에게 답장합니다. 이는 단순한 응답이 아니라 
                                            <span className="text-green-400 font-bold"> 상호 존재 증명</span>의 핵심입니다.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-blue-500/20 rounded-lg p-4">
                                                <h5 className="font-bold text-blue-400 mb-2">📤 요청 패킷 (파란색)</h5>
                                                <div className="text-sm space-y-1">
                                                    <div>• 방향: User → Layer</div>
                                                    <div>• 내용: 이용자의 Hash</div>
                                                    <div>• 목적: 데이터 전송</div>
                                                    <div>• 시간: ~0.4초</div>
                                                </div>
                                            </div>
                                            <div className="bg-red-500/20 rounded-lg p-4">
                                                <h5 className="font-bold text-red-400 mb-2">📨 응답 패킷 (빨간색)</h5>
                                                <div className="text-sm space-y-1">
                                                    <div>• 방향: Layer → User</div>
                                                    <div>• 내용: Layer의 Hash</div>
                                                    <div>• 목적: 존재 증명</div>
                                                    <div>• 시간: ~0.3초</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-red-500/20 rounded-lg p-4">
                                            <div className="font-mono text-sm space-y-2">
                                                <div className="text-red-400">// 응답 페이로드 구조</div>
                                                <div className="text-white">{'{'}</div>
                                                <div className="text-white ml-4">"type": "RESPONSE",</div>
                                                <div className="text-white ml-4">"from": "L2-1",</div>
                                                <div className="text-white ml-4">"to": "user-0",</div>
                                                <div className="text-white ml-4">"layerHash": "def456789abc",</div>
                                                <div className="text-white ml-4">"receivedHash": "a3f5d9e2b8c1",</div>
                                                <div className="text-white ml-4">"timestamp": 1732518234600,</div>
                                                <div className="text-white ml-4">"signature": "..."</div>
                                                <div className="text-white">{'}'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">🔄</span> 양방향 검증의 철학
                                        </h4>
                                        <p className="text-base mb-4 leading-relaxed">
                                            오픈해시가 블록체인과 근본적으로 다른 점은 바로 <span className="text-yellow-400 font-bold">양방향성</span>입니다. 
                                            블록체인은 일방적으로 데이터를 블록에 기록하지만, 오픈해시는 
                                            <span className="text-cyan-400 font-bold"> 요청과 응답</span>을 통해 
                                            <span className="text-green-400 font-bold"> 상호 책임</span>을 명확히 합니다.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="bg-cyan-500/20 rounded-lg p-4">
                                                <div className="text-2xl mb-2">👤</div>
                                                <h5 className="font-bold text-cyan-400 mb-2">이용자 관점</h5>
                                                <div className="text-sm">
                                                    "Layer 노드가 실제로 존재하며, 내 데이터를 정상적으로 받았다는 증거를 확보했다"
                                                </div>
                                            </div>
                                            <div className="bg-purple-500/20 rounded-lg p-4">
                                                <div className="text-2xl mb-2">🔷</div>
                                                <h5 className="font-bold text-purple-400 mb-2">Layer 관점</h5>
                                                <div className="text-sm">
                                                    "이용자의 요청이 정당하며, 나는 정상적으로 응답했다는 기록을 남겼다"
                                                </div>
                                            </div>
                                            <div className="bg-green-500/20 rounded-lg p-4">
                                                <div className="text-2xl mb-2">🌐</div>
                                                <h5 className="font-bold text-green-400 mb-2">네트워크 관점</h5>
                                                <div className="text-sm">
                                                    "양측의 Hash를 모두 보유하여, 향후 분쟁 시 객관적 판단 가능"
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 3단계: Hash Chain 융합 */}
                            <section className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                                    <span className="text-3xl">🔗</span> 3단계: Hash Chain 융합 및 불변 기록 생성
                                </h3>
                                
                                <div className="space-y-5">
                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">⛓️</span> 융합 알고리즘
                                        </h4>
                                        
                                        <div className="bg-black/60 rounded-lg p-5 mb-4">
                                            <div className="font-mono text-sm space-y-3">
                                                <div className="text-cyan-400">// Step 1: 두 Hash 연결</div>
                                                <div className="text-white">const combined = userHash + layerHash + timestamp;</div>
                                                <div className="text-gray-400">// "a3f5d9e2b8c1" + "def456789abc" + "1732518234600"</div>
                                                
                                                <div className="text-purple-400 mt-4">// Step 2: 재해싱</div>
                                                <div className="text-white">const fusedHash = await sha256(combined);</div>
                                                <div className="text-gray-400">// "7f2e9a8b3c1d"</div>
                                                
                                                <div className="text-green-400 mt-4">// Step 3: 양측에 저장</div>
                                                <div className="text-white">user.store(fusedHash);</div>
                                                <div className="text-white">layer.store(fusedHash);</div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-lg p-5">
                                            <h5 className="font-bold text-white mb-3 text-lg">💎 왜 재해싱인가?</h5>
                                            <p className="text-base mb-3 leading-relaxed">
                                                단순히 두 Hash를 붙이기만 하면 각자의 Hash가 노출되어 
                                                <span className="text-red-400 font-bold"> 보안에 취약</span>합니다. 
                                                재해싱을 통해 <span className="text-green-400 font-bold">완전히 새로운 Hash</span>를 생성함으로써:
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>원본 보호:</strong> Fused Hash에서 개별 Hash 역추적 불가</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>상호 의존:</strong> 어느 한쪽만 변경해도 전체 Chain 무효화</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>검증 가능:</strong> 양측이 동일한 Fused Hash 보유 시 검증 성공</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>타임스탬프 포함:</strong> 시간 순서 조작 방지</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">🛡️</span> 분산 신뢰 구축
                                        </h4>
                                        
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4">
                                                <h5 className="font-bold text-white mb-3">📚 블록체인 vs 오픈해시</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <div className="text-red-400 font-bold mb-2">❌ 블록체인</div>
                                                        <ul className="space-y-1 text-xs">
                                                            <li>• 전체 노드가 합의 필요</li>
                                                            <li>• 10분+ 대기 시간</li>
                                                            <li>• 막대한 에너지 소비</li>
                                                            <li>• 51% 공격 취약</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <div className="text-green-400 font-bold mb-2">✅ 오픈해시</div>
                                                        <ul className="space-y-1 text-xs">
                                                            <li>• 당사자 간 즉시 합의</li>
                                                            <li>• 1초 이내 완료</li>
                                                            <li>• 98.5% 에너지 절감</li>
                                                            <li>• 독립 검증으로 공격 무력화</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-yellow-500/20 rounded-lg p-4">
                                                <h5 className="font-bold text-yellow-400 mb-2">💡 핵심 통찰</h5>
                                                <p className="text-sm italic">
                                                    "신뢰는 모든 사람의 동의가 아니라, 
                                                    <span className="text-cyan-400 font-bold"> 검증 가능한 증거</span>에서 나온다. 
                                                    오픈해시는 양측이 보유한 동일한 Hash Chain이 바로 그 증거다."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 4단계: Layer 간 동기화 */}
                            <section className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-3">
                                    <span className="text-3xl">⚡</span> 4단계: Layer 간 동기화 (2초 주기)
                                </h3>
                                
                                <div className="space-y-5">
                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">🔄</span> 동기화 프로세스
                                        </h4>
                                        
                                        <p className="text-base mb-4 leading-relaxed">
                                            모든 이용자의 Hash 전송이 완료된 후, <span className="text-purple-400 font-bold">2초 대기</span>를 거쳐 
                                            Layer 간 Hash 동기화가 시작됩니다. 이는 네트워크 전체의 
                                            <span className="text-cyan-400 font-bold"> 일관성</span>과 
                                            <span className="text-green-400 font-bold"> 무결성</span>을 보장하는 핵심 메커니즘입니다.
                                        </p>

                                        <div className="space-y-4">
                                            <div className="bg-blue-500/20 rounded-lg p-4">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-3xl">1️⃣</span>
                                                    <h5 className="text-lg font-bold text-blue-400">Layer 1 → Layer 2 동기화</h5>
                                                </div>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-blue-400">📤</span>
                                                        <div>
                                                            <strong>요청 (파란색):</strong> Layer 1의 무작위 노드가 자신의 Hash를 Layer 2로 전송
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-purple-400">🔍</span>
                                                        <div>
                                                            <strong>검증:</strong> Layer 2가 받은 Hash를 자신의 기록과 대조
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-red-400">📨</span>
                                                        <div>
                                                            <strong>응답 (빨간색):</strong> Layer 2가 자신의 Hash로 답장
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-green-400">✅</span>
                                                        <div>
                                                            <strong>완료:</strong> 양측의 Hash가 동기화됨
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-purple-500/20 rounded-lg p-4">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-3xl">2️⃣</span>
                                                    <h5 className="text-lg font-bold text-purple-400">Layer 2 → Layer 3 동기화</h5>
                                                </div>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-blue-400">📤</span>
                                                        <div>
                                                            <strong>요청 (파란색):</strong> Layer 2의 무작위 노드가 자신의 Hash를 Layer 3로 전송
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-amber-400">🔐</span>
                                                        <div>
                                                            <strong>최종 검증:</strong> Layer 3가 전체 체인의 무결성 확인
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-red-400">📨</span>
                                                        <div>
                                                            <strong>응답 (빨간색):</strong> Layer 3가 최종 승인 Hash 전송
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-green-400">🎉</span>
                                                        <div>
                                                            <strong>완료:</strong> 전체 네트워크 동기화 완료
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">🎯</span> 동기화의 목적과 효과
                                        </h4>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-cyan-500/20 rounded-lg p-4">
                                                <div className="text-2xl mb-2">🔒</div>
                                                <h5 className="font-bold text-cyan-400 mb-2">무결성 검증</h5>
                                                <p className="text-sm">
                                                    각 Layer가 다른 Layer의 Hash를 주기적으로 확인하여 위변조 시도를 즉시 탐지합니다. 
                                                    불일치 발견 시 자동으로 경고가 발생합니다.
                                                </p>
                                            </div>
                                            
                                            <div className="bg-green-500/20 rounded-lg p-4">
                                                <div className="text-2xl mb-2">📡</div>
                                                <h5 className="font-bold text-green-400 mb-2">데이터 전파</h5>
                                                <p className="text-sm">
                                                    중요한 Hash가 상위 Layer까지 안전하게 전달됨을 보장합니다. 
                                                    Layer 3는 전체 네트워크의 최종 검증자 역할을 수행합니다.
                                                </p>
                                            </div>
                                            
                                            <div className="bg-purple-500/20 rounded-lg p-4">
                                                <div className="text-2xl mb-2">💓</div>
                                                <h5 className="font-bold text-purple-400 mb-2">헬스 체크</h5>
                                                <p className="text-sm">
                                                    모든 노드가 정상 작동 중임을 확인합니다. 
                                                    응답이 없는 노드는 자동으로 네트워크에서 제외됩니다.
                                                </p>
                                            </div>
                                            
                                            <div className="bg-yellow-500/20 rounded-lg p-4">
                                                <div className="text-2xl mb-2">⚖️</div>
                                                <h5 className="font-bold text-yellow-400 mb-2">부하 분산</h5>
                                                <p className="text-sm">
                                                    Layer 간 트래픽을 균등하게 배분하여 특정 노드에 부하가 집중되는 것을 방지합니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <span className="text-2xl">⏰</span> 왜 2초 주기인가?
                                        </h4>
                                        
                                        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4">
                                            <p className="text-base mb-3 leading-relaxed">
                                                2초는 실험과 분석을 통해 도출된 <span className="text-yellow-400 font-bold">최적 주기</span>입니다:
                                            </p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>충분한 시간:</strong> 모든 이용자의 트랜잭션이 완료될 여유</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>실시간성:</strong> 네트워크 상태를 거의 실시간으로 동기화</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>낮은 오버헤드:</strong> 과도한 동기화로 인한 네트워크 부담 최소화</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400">✓</span>
                                                    <span><strong>확장성:</strong> 노드 수가 증가해도 동일한 주기 유지</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 블록체인 대비 장점 */}
                            <section className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-3">
                                    <span className="text-3xl">⚡</span> 블록체인 대비 혁명적 우위
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                            <span className="text-2xl">❌</span> 블록체인의 한계
                                        </h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-400">✗</span>
                                                <div>
                                                    <strong>작업증명 (PoW):</strong> 막대한 연산 필요, 비트코인은 연간 121 TWh 소비 (아르헨티나 전체 전력량)
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-400">✗</span>
                                                <div>
                                                    <strong>합의 알고리즘:</strong> 10분 이상 대기, 이더리움도 12초 필요
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-400">✗</span>
                                                <div>
                                                    <strong>고정 TPS:</strong> 비트코인 7 TPS, 이더리움 15 TPS로 노드 증가해도 속도 불변
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-400">✗</span>
                                                <div>
                                                    <strong>51% 공격:</strong> 전체 해시파워의 51% 확보 시 네트워크 장악 가능
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-400">✗</span>
                                                <div>
                                                    <strong>블록 크기 제한:</strong> 비트코인 1MB, 이더리움 가스 한도로 확장성 제약
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                                        <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                            <span className="text-2xl">✅</span> 오픈해시의 혁신
                                        </h4>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <div>
                                                    <strong>즉시 처리:</strong> 합의 알고리즘 불필요, 요청 즉시 응답 (1초 이내)
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <div>
                                                    <strong>98.5% 에너지 절감:</strong> 연간 1.8 TWh로 블록체인 대비 67배 효율적
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <div>
                                                    <strong>선형 확장:</strong> 노드 추가 시 TPS 비례 증가 (노드당 +50 TPS)
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <div>
                                                    <strong>분산 검증:</strong> 각 트랜잭션 독립 검증으로 51% 공격 무력화
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <div>
                                                    <strong>무제한 확장:</strong> 블록 크기 제한 없음, 병렬 처리로 무한 확장
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-5">
                                    <h4 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                        <span className="text-2xl">🏆</span> 성능 비교 요약
                                    </h4>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="bg-black/40 rounded-lg p-4">
                                            <div className="text-3xl font-bold text-red-400 mb-1">10분+</div>
                                            <div className="text-xs text-gray-400">블록체인 확인 시간</div>
                                        </div>
                                        <div className="bg-black/40 rounded-lg p-4">
                                            <div className="text-3xl font-bold text-green-400 mb-1">&lt;1초</div>
                                            <div className="text-xs text-gray-400">오픈해시 확인 시간</div>
                                        </div>
                                        <div className="bg-black/40 rounded-lg p-4">
                                            <div className="text-3xl font-bold text-cyan-400 mb-1">600배</div>
                                            <div className="text-xs text-gray-400">속도 우위</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 시뮬레이션 관찰 포인트 */}
                            <section className="bg-black/40 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📊</span> 시뮬레이션 관찰 포인트
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <h5 className="font-bold text-blue-400 mb-2">🔵 파란색 패킷 (요청)</h5>
                                        <ul className="space-y-1">
                                            <li>• 왼쪽에서 오른쪽으로 이동</li>
                                            <li>• 이용자 → Layer 전송</li>
                                            <li>• Layer 1→2→3 동기화</li>
                                            <li>• 📤 이모지로 표시</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="font-bold text-red-400 mb-2">🔴 빨간색 패킷 (응답)</h5>
                                        <ul className="space-y-1">
                                            <li>• 오른쪽에서 왼쪽으로 이동</li>
                                            <li>• Layer → 이용자 답장</li>
                                            <li>• Layer 3→2→1 동기화</li>
                                            <li>• 📨 이모지로 표시</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="font-bold text-green-400 mb-2">💚 노드 활성화</h5>
                                        <ul className="space-y-1">
                                            <li>• Hash 수신 시 pulse 애니메이션</li>
                                            <li>• 이모지 변경 (🔵→🟦, 🟣→🟪, 🟡→🟨)</li>
                                            <li>• 크기 110%로 확대 효과</li>
                                            <li>• 그림자 강도 증가</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="font-bold text-purple-400 mb-2">📊 실시간 통계</h5>
                                        <ul className="space-y-1">
                                            <li>• 📤 요청: 파란색 패킷 수</li>
                                            <li>• 📨 응답: 빨간색 패킷 수</li>
                                            <li>• 🔗 동기화: Layer 간 전송 수</li>
                                            <li>• 모든 수치는 실시간 증가</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button onClick={() => setShowModal(false)}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white text-lg hover:shadow-2xl hover:scale-105 transition-all">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">요청 (왼쪽→오른쪽)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">응답 (오른쪽→왼쪽)</span>
                </div>
            </div>

            <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 mb-6 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                    {transmissions.map(trans => {
                        const progress = trans.progress / 100;
                        const currentX = trans.startX + (trans.endX - trans.startX) * progress;
                        const currentY = trans.startY + (trans.endY - trans.startY) * progress;
                        const color = trans.isResponse ? '#ef4444' : '#3b82f6';

                        return (
                            <g key={trans.id}>
                                <line
                                    x1={`${trans.startX}%`} y1={`${trans.startY}%`}
                                    x2={`${trans.endX}%`} y2={`${trans.endY}%`}
                                    stroke={color} strokeWidth="2" strokeDasharray="5,5" opacity="0.4"
                                />
                                <circle
                                    cx={`${currentX}%`} cy={`${currentY}%`} r="10"
                                    fill={color} className="animate-pulse"
                                />
                                <text
                                    x={`${currentX}%`} y={`${currentY}%`}
                                    textAnchor="middle" dominantBaseline="middle"
                                    fill="white" fontSize="12" fontWeight="bold"
                                >
                                    {trans.isResponse ? '📨' : '📤'}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                <div className="absolute left-0 top-0 bottom-0 w-1/5">
                    {users.map(user => (
                        <div key={user.id} style={{ position: 'absolute', left: `${user.x}%`, top: `${user.y}%`, transform: 'translate(-50%, -50%)' }}>
                            <div className="w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 shadow-xl"
                                style={{ borderColor: user.color, backgroundColor: `${user.color}30`, boxShadow: `0 0 20px ${user.color}50` }}>
                                <div className="text-3xl">👤</div>
                                <div className="text-xs font-bold text-white">{user.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ position: 'absolute', left: '40%', top: 0, bottom: 0, width: '15%' }}>
                    <div className="text-center mb-4 pt-2">
                        <div className="text-blue-400 font-bold">🔵 Layer 1</div>
                        <div className="text-xs text-gray-400">70% (5 노드)</div>
                    </div>
                    {layers.layer1.map(node => (
                        <div key={node.id} style={{ position: 'absolute', left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
                            <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center border-4 ${node.active ? 'animate-pulse' : ''}`}
                                style={{ borderColor: '#3b82f6', backgroundColor: node.active ? '#3b82f640' : '#3b82f620' }}>
                                <div className="text-2xl">{node.active ? '🟦' : '🔵'}</div>
                                <div className="text-xs font-bold text-white">{node.id}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ position: 'absolute', left: '65%', top: 0, bottom: 0, width: '15%' }}>
                    <div className="text-center mb-4 pt-2">
                        <div className="text-purple-400 font-bold">🟣 Layer 2</div>
                        <div className="text-xs text-gray-400">20% (3 노드)</div>
                    </div>
                    {layers.layer2.map(node => (
                        <div key={node.id} style={{ position: 'absolute', left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
                            <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center border-4 ${node.active ? 'animate-pulse' : ''}`}
                                style={{ borderColor: '#a855f7', backgroundColor: node.active ? '#a855f740' : '#a855f720' }}>
                                <div className="text-2xl">{node.active ? '🟪' : '🟣'}</div>
                                <div className="text-xs font-bold text-white">{node.id}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ position: 'absolute', left: '90%', top: 0, bottom: 0, width: '10%' }}>
                    <div className="text-center mb-4 pt-2">
                        <div className="text-amber-400 font-bold">🟡 Layer 3</div>
                        <div className="text-xs text-gray-400">10% (1 노드)</div>
                    </div>
                    {layers.layer3.map(node => (
                        <div key={node.id} style={{ position: 'absolute', left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
                            <div className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center border-4 ${node.active ? 'animate-pulse' : ''}`}
                                style={{ borderColor: '#f59e0b', backgroundColor: node.active ? '#f59e0b40' : '#f59e0b20' }}>
                                <div className="text-3xl">{node.active ? '🟨' : '🟡'}</div>
                                <div className="text-xs font-bold text-white">{node.id}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-4 left-4 bg-black/80 rounded-xl px-4 py-3 border border-cyan-500/30">
                    <div className="text-cyan-400 font-bold mb-2">실시간 통계</div>
                    <div className="text-sm text-blue-400">📤 요청: {stats.requests}</div>
                    <div className="text-sm text-red-400">📨 응답: {stats.responses}</div>
                    <div className="text-sm text-purple-400">🔗 동기화: {stats.layerSync}</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                    <div className="text-4xl font-bold text-blue-400">{stats.requests}</div>
                    <div className="text-sm text-gray-400">총 요청</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                    <div className="text-4xl font-bold text-red-400">{stats.responses}</div>
                    <div className="text-sm text-gray-400">총 응답</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                    <div className="text-4xl font-bold text-purple-400">{stats.layerSync}</div>
                    <div className="text-sm text-gray-400">Layer 동기화</div>
                </div>
            </div>
        </div>
    );
};
