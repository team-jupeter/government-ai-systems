const Tab4Scalability = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [nodes, setNodes] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [networkHealth, setNetworkHealth] = React.useState(100);

    React.useEffect(() => {
        initNetwork();
    }, []);

    const initNetwork = () => {
        const initialNodes = [
            ...Array.from({ length: 4 }, (_, i) => ({ 
                id: `L1-${i}`, layer: 1, x: 70 + Math.random() * 20, y: 20 + (i * 15),
                active: true, joining: false, leaving: false
            })),
            ...Array.from({ length: 2 }, (_, i) => ({ 
                id: `L2-${i}`, layer: 2, x: 70 + Math.random() * 20, y: 30 + (i * 30),
                active: true, joining: false, leaving: false
            })),
            { id: 'L3-0', layer: 3, x: 75, y: 50, active: true, joining: false, leaving: false }
        ];
        setNodes(initialNodes);
        setEvents([]);
        setNetworkHealth(100);
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const addEvent = (message, type = 'info') => {
        setEvents(prev => [...prev.slice(-9), { 
            time: new Date().toLocaleTimeString(), message, type 
        }]);
    };

    const addNode = async () => {
        const rand = Math.random();
        let selectedLayer;
        if (rand < 0.7) selectedLayer = 1;
        else if (rand < 0.9) selectedLayer = 2;
        else selectedLayer = 3;

        const newNode = {
            id: `L${selectedLayer}-${Date.now()}`,
            layer: selectedLayer,
            x: 70 + Math.random() * 20,
            y: 20 + Math.random() * 60,
            active: false,
            joining: true,
            leaving: false
        };

        setNodes(prev => [...prev, newNode]);
        addEvent(`➕ 새로운 노드 ${newNode.id}가 Layer ${selectedLayer}에 참여 요청`, 'success');
        
        await sleep(1000);
        
        setNodes(prev => prev.map(n => 
            n.id === newNode.id ? { ...n, active: true, joining: false } : n
        ));
        addEvent(`✅ ${newNode.id} 참여 완료! Hash Chain 동기화됨`, 'success');
        
        updateNetworkHealth();
    };

    const removeNode = async () => {
        const activeNodes = nodes.filter(n => n.active && !n.leaving);
        if (activeNodes.length <= 3) {
            addEvent('⚠️ 최소 노드 수 유지 필요', 'warning');
            return;
        }

        const nodeToRemove = activeNodes[Math.floor(Math.random() * activeNodes.length)];
        
        addEvent(`➖ ${nodeToRemove.id}가 네트워크 퇴장 요청`, 'info');
        setNodes(prev => prev.map(n => 
            n.id === nodeToRemove.id ? { ...n, leaving: true } : n
        ));
        
        await sleep(1000);
        
        setNodes(prev => prev.filter(n => n.id !== nodeToRemove.id));
        addEvent(`✅ ${nodeToRemove.id} 퇴장 완료! Hash Chain 재조정됨`, 'info');
        
        updateNetworkHealth();
    };

    const updateNetworkHealth = () => {
        setNodes(prev => {
            const activeCount = prev.filter(n => n.active).length;
            const health = Math.min(100, 60 + (activeCount * 5));
            setNetworkHealth(health);
            return prev;
        });
    };

    const runAutoSimulation = async () => {
        setIsRunning(true);
        addEvent('🚀 자동 확장성 테스트 시작', 'success');

        for (let i = 0; i < 10; i++) {
            if (!isRunning) break;
            
            const action = Math.random();
            if (action < 0.6) {
                await addNode();
            } else {
                await removeNode();
            }
            
            await sleep(2000);
        }

        addEvent('✨ 자동 테스트 완료! 네트워크는 정상 작동 중입니다', 'success');
        setIsRunning(false);
    };

    const stopSimulation = () => {
        setIsRunning(false);
        addEvent('⏸️ 자동 테스트 중지', 'warning');
    };

    const layerColors = {
        1: { border: '#3b82f6', bg: '#3b82f620', icon: '🔵' },
        2: { border: '#a855f7', bg: '#a855f720', icon: '🟣' },
        3: { border: '#f59e0b', bg: '#f59e0b20', icon: '🟡' }
    };

    return (
        <div className="bg-black/40 rounded-3xl border border-green-500/30 p-8 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-6 text-green-400">🔄 무한 확장성 메커니즘</h3>

            <div className="flex justify-center gap-4 mb-8">
                <button onClick={addNode} disabled={isRunning}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white disabled:opacity-50">
                    ➕ 노드 추가
                </button>
                <button onClick={removeNode} disabled={isRunning}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-bold text-white disabled:opacity-50">
                    ➖ 노드 제거
                </button>
                {!isRunning ? (
                    <button onClick={runAutoSimulation}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white">
                        🤖 자동 시뮬레이션
                    </button>
                ) : (
                    <button onClick={stopSimulation}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl font-bold text-white">
                        ⏸️ 중지
                    </button>
                )}
                <button onClick={initNetwork} disabled={isRunning}
                    className="px-6 py-3 bg-white/10 border-2 border-green-500/50 rounded-xl font-bold text-white disabled:opacity-50">
                    🔄 초기화
                </button>
                <button onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white">
                    📚 설명
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-500 rounded-3xl p-8 max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-green-400">🔄 Tab 4: 무한 확장성 메커니즘</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-3xl">×</button>
                        </div>

                        <div className="space-y-6 text-gray-300">
                            <section>
                                <h3 className="text-2xl font-bold text-white mb-4">🎯 시뮬레이션 개요</h3>
                                <p className="leading-relaxed mb-4">
                                    오픈해시 네트워크의 <span className="text-green-400 font-bold">무한 확장성(Infinite Scalability)</span>을 
                                    실시간으로 시연합니다. 노드가 자유롭게 참여하고 퇴장하더라도 
                                    <span className="text-cyan-400 font-bold"> 네트워크는 중단 없이</span> 계속 작동하며, 
                                    참여 노드 수가 증가할수록 <span className="text-yellow-400 font-bold">처리 성능이 선형 증가</span>하는 
                                    혁신적 특성을 보여줍니다.
                                </p>
                            </section>

                            <section className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-4">➕ 노드 참여 프로세스</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">🚪 참여 단계</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm">
                                            <li><strong>참여 요청:</strong> 새로운 노드가 네트워크에 참여 의사를 표명</li>
                                            <li><strong>신원 확인:</strong> 공개키/개인키 쌍 생성 및 디지털 서명 검증</li>
                                            <li><strong>계층 배정:</strong> 확률적 알고리즘으로 Layer 1(70%), Layer 2(20%), Layer 3(10%) 자동 배정</li>
                                            <li><strong>Hash Chain 동기화:</strong> 기존 노드들로부터 최신 Hash Chain 정보 수신</li>
                                            <li><strong>활성화:</strong> 모든 준비 완료 후 트랜잭션 처리 시작</li>
                                        </ol>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-green-400 mb-3">⚡ 즉시 참여의 장점</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">무허가 참여</div>
                                                <div>중앙 기관의 승인 불필요, 누구나 즉시 노드 운영 가능</div>
                                            </div>
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">빠른 동기화</div>
                                                <div>전체 블록 다운로드 불필요, 최신 Hash만 수신 (수 초)</div>
                                            </div>
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">낮은 진입장벽</div>
                                                <div>고성능 하드웨어 불필요, 일반 PC로도 참여 가능</div>
                                            </div>
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">경제성</div>
                                                <div>막대한 초기 투자 불필요, 전기료도 최소화</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">➖ 노드 퇴장 프로세스</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">🚪 정상 퇴장</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm">
                                            <li><strong>퇴장 선언:</strong> 노드가 다른 노드들에게 퇴장 의사 전달</li>
                                            <li><strong>트랜잭션 완료:</strong> 처리 중인 모든 트랜잭션 마무리</li>
                                            <li><strong>Hash 이전:</strong> 보유한 Hash Chain을 인접 노드에 백업 전송</li>
                                            <li><strong>연결 해제:</strong> 네트워크에서 안전하게 연결 종료</li>
                                            <li><strong>자동 재조정:</strong> 나머지 노드들이 부하 재분배</li>
                                        </ol>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-orange-400 mb-3">⚠️ 비정상 종료 대응</h4>
                                        <div className="space-y-2 text-sm">
                                            <p className="mb-2">
                                                노드가 예고 없이 종료되거나 네트워크 장애가 발생해도 시스템은 자동으로 복구됩니다:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 ml-4">
                                                <li><strong>자동 감지:</strong> 주기적 Heartbeat로 노드 상태 모니터링</li>
                                                <li><strong>즉시 우회:</strong> 응답 없는 노드는 자동으로 트래픽 우회</li>
                                                <li><strong>중복 저장:</strong> 모든 Hash는 여러 노드에 복제되어 있어 데이터 손실 없음</li>
                                                <li><strong>자가 치유:</strong> 네트워크가 스스로 최적 상태로 재구성</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">📈 선형 확장성 원리</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">🔢 수학적 모델</h4>
                                        <div className="space-y-3">
                                            <div className="font-mono bg-black/70 p-3 rounded text-sm">
                                                <div className="text-cyan-400">총 처리 능력 (TPS) = 기본 TPS + (노드 수 × 노드당 TPS)</div>
                                                <div className="text-white mt-2">예: 100 TPS + (1000 노드 × 50 TPS) = 50,100 TPS</div>
                                            </div>
                                            <p className="text-sm">
                                                블록체인과 달리 오픈해시는 <span className="text-green-400 font-bold">병렬 처리</span>가 가능하므로, 
                                                노드가 추가될수록 처리 능력이 <span className="text-yellow-400 font-bold">선형적으로 증가</span>합니다.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-cyan-400 mb-3">🎯 병렬 처리의 비밀</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                            <div className="bg-cyan-500/20 rounded p-3">
                                                <div className="font-bold mb-1">독립 실행</div>
                                                <div>각 트랜잭션이 독립적으로 처리되어 상호 대기 불필요</div>
                                            </div>
                                            <div className="bg-cyan-500/20 rounded p-3">
                                                <div className="font-bold mb-1">분산 저장</div>
                                                <div>데이터가 여러 Layer에 분산되어 병목 현상 제거</div>
                                            </div>
                                            <div className="bg-cyan-500/20 rounded p-3">
                                                <div className="font-bold mb-1">비동기 통신</div>
                                                <div>노드 간 통신이 비동기로 처리되어 대기 시간 최소화</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">🌐 네트워크 건강도 관리</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">💚 건강도 지표</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 font-bold text-green-400">80-100%</div>
                                                <div>최적 상태 - 충분한 노드로 빠른 처리</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 font-bold text-yellow-400">50-79%</div>
                                                <div>정상 상태 - 네트워크 기능 정상 작동</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 font-bold text-red-400">0-49%</div>
                                                <div>경고 상태 - 노드 추가 권장</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-purple-400 mb-3">⚖️ 자동 부하 분산</h4>
                                        <p className="text-sm mb-3">
                                            오픈해시는 <span className="text-cyan-400 font-bold">확률적 계층 선택</span>을 통해 
                                            트래픽을 자동으로 균등 분배합니다:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li>Layer 1 (70%): 일반 트랜잭션 대량 처리</li>
                                            <li>Layer 2 (20%): 중간 보안 트랜잭션 처리</li>
                                            <li>Layer 3 (10%): 고보안 트랜잭션 집중 검증</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-400 mb-4">❌ 블록체인의 확장성 한계</h3>
                                
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-2">🐌 블록체인 트릴레마</h4>
                                        <p className="text-sm mb-3">
                                            블록체인은 <span className="text-red-400 font-bold">탈중앙화, 보안, 확장성</span> 중 
                                            최대 2가지만 동시에 달성 가능합니다 (불가능의 삼각형):
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li><strong>비트코인:</strong> 탈중앙화 + 보안 → 확장성 희생 (7 TPS)</li>
                                            <li><strong>이더리움:</strong> 탈중앙화 + 보안 → 확장성 제한 (15 TPS)</li>
                                            <li><strong>중앙화 체인:</strong> 보안 + 확장성 → 탈중앙화 포기</li>
                                        </ul>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-red-400 mb-2">⛓️ 순차 처리의 한계</h4>
                                        <p className="text-sm">
                                            블록체인은 모든 노드가 동일한 블록을 순차적으로 검증해야 하므로, 
                                            <span className="text-yellow-400 font-bold"> 노드를 추가해도 속도가 증가하지 않습니다</span>. 
                                            오히려 합의 과정이 복잡해져 <span className="text-red-400 font-bold">속도가 감소</span>할 수 있습니다.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-4">✅ 오픈해시의 혁신</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-cyan-400 font-bold mb-3">🎯 3가지 동시 달성</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>✅ <strong>완전 탈중앙화:</strong> 중앙 기관 불필요</li>
                                            <li>✅ <strong>강력한 보안:</strong> Hash Chain 융합으로 위변조 방지</li>
                                            <li>✅ <strong>무한 확장:</strong> 노드 추가 시 TPS 선형 증가</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-green-400 font-bold mb-3">⚡ 성능 비교</h4>
                                        <div className="space-y-2 text-sm">
                                            <div>비트코인: <span className="text-red-400">~7 TPS</span></div>
                                            <div>이더리움: <span className="text-red-400">~15 TPS</span></div>
                                            <div>오픈해시 (100 노드): <span className="text-green-400">~5,100 TPS</span></div>
                                            <div>오픈해시 (10,000 노드): <span className="text-cyan-400">~500,100 TPS</span></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-yellow-400 mb-4">🔬 실전 시나리오</h3>
                                
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-cyan-400 font-bold mb-2">시나리오 1: 급격한 트래픽 증가</h4>
                                        <p className="text-sm mb-2">
                                            대규모 이벤트로 트랜잭션이 10배 증가했습니다.
                                        </p>
                                        <div className="bg-green-500/20 rounded p-3 text-sm">
                                            <strong>오픈해시 대응:</strong> 새로운 노드들이 자동으로 참여하여 
                                            부하를 분산. 5분 내 정상 처리 속도 복구.
                                        </div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-purple-400 font-bold mb-2">시나리오 2: 대규모 노드 장애</h4>
                                        <p className="text-sm mb-2">
                                            데이터센터 화재로 전체 노드의 30%가 동시 다운되었습니다.
                                        </p>
                                        <div className="bg-green-500/20 rounded p-3 text-sm">
                                            <strong>오픈해시 대응:</strong> 나머지 70% 노드가 즉시 부하 재분배. 
                                            Hash Chain은 다른 노드에 복제되어 있어 데이터 손실 없음.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-black/40 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-white mb-3">📊 시뮬레이션 관찰 포인트</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>노드 추가 시 작은 원에서 큰 원으로 확대되는 애니메이션 관찰</li>
                                    <li>노드 제거 시 큰 원에서 작은 원으로 축소되는 애니메이션 관찰</li>
                                    <li>네트워크 건강도가 노드 수에 따라 실시간으로 변하는 것 확인</li>
                                    <li>이벤트 로그에서 참여/퇴장 프로세스가 기록되는 것 확인</li>
                                    <li>자동 시뮬레이션으로 노드가 무작위로 들어오고 나가도 네트워크는 계속 작동</li>
                                </ul>
                            </section>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setShowModal(false)}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 h-[500px] relative overflow-hidden">
                    <h4 className="text-lg font-bold text-white mb-4">🌐 동적 네트워크 토폴로지</h4>
                    
                    <div className="relative w-full h-[420px]">
                        {nodes.map(node => {
                            const color = layerColors[node.layer];
                            return (
                                <div key={node.id}
                                    className={`absolute transition-all duration-500 ${
                                        node.joining ? 'scale-0 opacity-0' : 
                                        node.leaving ? 'scale-0 opacity-0' : 
                                        'scale-100 opacity-100'
                                    }`}
                                    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
                                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border-4 shadow-2xl ${
                                            node.joining ? 'animate-ping' :
                                            node.leaving ? 'animate-pulse' :
                                            node.active ? 'animate-pulse' : ''
                                        }`}
                                        style={{ 
                                            borderColor: color.border,
                                            backgroundColor: color.bg,
                                            boxShadow: `0 0 30px ${color.border}50`
                                        }}>
                                        <div className="text-3xl">{color.icon}</div>
                                        <div className="text-xs font-bold text-white mt-1">{node.id}</div>
                                    </div>
                                    
                                    {node.joining && (
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-green-400 font-bold whitespace-nowrap">
                                            참여 중...
                                        </div>
                                    )}
                                    {node.leaving && (
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-red-400 font-bold whitespace-nowrap">
                                            퇴장 중...
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {nodes.filter(n => n.active).map((node, i) => 
                                nodes.filter((n, j) => n.active && j > i && Math.abs(n.layer - node.layer) <= 1).map(targetNode => (
                                    <line key={`${node.id}-${targetNode.id}`}
                                        x1={`${node.x}%`} y1={`${node.y}%`}
                                        x2={`${targetNode.x}%`} y2={`${targetNode.y}%`}
                                        stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" opacity="0.3"
                                    />
                                ))
                            )}
                        </svg>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 h-[500px]">
                    <h4 className="text-lg font-bold text-white mb-4">📋 네트워크 이벤트</h4>
                    
                    <div className="space-y-2 max-h-[420px] overflow-y-auto">
                        {events.map((event, i) => (
                            <div key={i}
                                className={`p-3 rounded-lg text-sm border ${
                                    event.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-300' :
                                    event.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-300' :
                                    'bg-blue-500/10 border-blue-500/50 text-blue-300'
                                }`}>
                                <div className="font-mono text-xs text-gray-400">{event.time}</div>
                                <div className="mt-1">{event.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">
                        {nodes.filter(n => n.layer === 1 && n.active).length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Layer 1 노드</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400">
                        {nodes.filter(n => n.layer === 2 && n.active).length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Layer 2 노드</div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-amber-400">
                        {nodes.filter(n => n.layer === 3 && n.active).length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Layer 3 노드</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400">
                        {nodes.filter(n => n.active).length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">총 활성 노드</div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-cyan-400">{networkHealth}%</div>
                    <div className="text-sm text-gray-400 mt-1">네트워크 건강도</div>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">💚 네트워크 상태</h4>
                <div className="bg-gray-700 rounded-full h-8 overflow-hidden">
                    <div className={`h-full transition-all duration-500 flex items-center justify-center text-white font-bold text-sm ${
                            networkHealth >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                            networkHealth >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                            'bg-gradient-to-r from-red-500 to-pink-600'
                        }`}
                        style={{ width: `${networkHealth}%` }}>
                        {networkHealth}% 정상
                    </div>
                </div>
                <p className="text-sm text-gray-400 mt-3 text-center">
                    {networkHealth >= 80 ? '✅ 네트워크가 최적 상태입니다' :
                     networkHealth >= 50 ? '⚠️ 네트워크가 정상 작동 중입니다' :
                     '🚨 더 많은 노드가 필요합니다'}
                </p>
            </div>
        </div>
    );
};
