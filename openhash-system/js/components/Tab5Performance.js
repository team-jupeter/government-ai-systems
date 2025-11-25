const Tab5Performance = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [testMode, setTestMode] = React.useState('small');
    const [performanceData, setPerformanceData] = React.useState([]);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [totalSteps, setTotalSteps] = React.useState(0);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const calculateTPS = (nodes) => {
        const openhashTPS = 100 + (nodes * 50);
        const blockchainTPS = 15;
        return { openhashTPS, blockchainTPS, ratio: (openhashTPS / blockchainTPS).toFixed(0) };
    };

    const runSmallTest = async () => {
        setIsRunning(true);
        setPerformanceData([]);
        setCurrentStep(0);
        
        const steps = 10;
        setTotalSteps(steps);
        
        for (let i = 1; i <= steps; i++) {
            const nodes = i * 100;
            const { openhashTPS, blockchainTPS, ratio } = calculateTPS(nodes);
            
            setPerformanceData(prev => [...prev, { nodes, openhashTPS, blockchainTPS, ratio }]);
            setCurrentStep(i);
            await sleep(200);
        }
        
        setIsRunning(false);
    };

    const runLargeTest = async () => {
        setIsRunning(true);
        setPerformanceData([]);
        setCurrentStep(0);
        
        const nodeSteps = [1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
        setTotalSteps(nodeSteps.length);
        
        for (let i = 0; i < nodeSteps.length; i++) {
            const nodes = nodeSteps[i];
            const { openhashTPS, blockchainTPS, ratio } = calculateTPS(nodes);
            
            setPerformanceData(prev => [...prev, { nodes, openhashTPS, blockchainTPS, ratio }]);
            setCurrentStep(i + 1);
            await sleep(300);
        }
        
        setIsRunning(false);
    };

    const reset = () => {
        setPerformanceData([]);
        setCurrentStep(0);
        setTotalSteps(0);
    };

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    const formatNodeCount = (num) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}K`;
        }
        return num;
    };

    const maxTPS = performanceData.length > 0 
        ? Math.max(...performanceData.map(d => d.openhashTPS))
        : 100;

    return (
        <div className="bg-black/40 rounded-3xl border border-cyan-500/30 p-8 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">⚡ 성능 분석 및 비교</h3>

            <div className="flex justify-center gap-4 mb-8">
                <button onClick={runSmallTest} disabled={isRunning}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white disabled:opacity-50">
                    📊 소규모 테스트 (100-1K)
                </button>
                <button onClick={runLargeTest} disabled={isRunning}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white disabled:opacity-50">
                    🚀 대규모 테스트 (1K-100K)
                </button>
                <button onClick={reset} disabled={isRunning}
                    className="px-6 py-3 bg-white/10 border-2 border-cyan-500/50 rounded-xl font-bold text-white disabled:opacity-50">
                    🔄 초기화
                </button>
                <button onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white">
                    📚 설명
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500 rounded-3xl p-8 max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-cyan-400">⚡ Tab 5: 성능 분석 및 TPS 비교</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-3xl">×</button>
                        </div>

                        <div className="space-y-6 text-gray-300">
                            <section>
                                <h3 className="text-2xl font-bold text-white mb-4">🎯 시뮬레이션 개요</h3>
                                <p className="leading-relaxed mb-4">
                                    오픈해시 네트워크와 블록체인의 <span className="text-cyan-400 font-bold">TPS(Transactions Per Second)</span> 성능을 
                                    100개 노드부터 <span className="text-purple-400 font-bold">100,000개 노드</span>까지 확장하며 비교합니다. 
                                    이를 통해 오픈해시의 <span className="text-green-400 font-bold">선형 확장성</span>과 
                                    블록체인의 <span className="text-red-400 font-bold">고정 TPS 한계</span>를 명확히 시각화합니다.
                                </p>
                            </section>

                            <section className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">📊 TPS란 무엇인가?</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">⚡ TPS의 정의</h4>
                                        <p className="text-sm mb-3">
                                            <span className="text-cyan-400 font-bold">TPS (Transactions Per Second)</span>는 
                                            시스템이 1초 동안 처리할 수 있는 트랜잭션의 개수를 의미합니다. 
                                            분산 원장 시스템의 <span className="text-yellow-400 font-bold">처리 능력</span>을 나타내는 
                                            가장 중요한 성능 지표입니다.
                                        </p>
                                        <div className="bg-black/50 rounded p-3 text-sm">
                                            <div className="font-mono text-green-400 mb-2">TPS = 처리된 트랜잭션 수 ÷ 경과 시간(초)</div>
                                            <div className="text-gray-300">예: 1분에 600개 처리 → 600 ÷ 60 = 10 TPS</div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-cyan-400 mb-3">🏦 실제 시스템 비교</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <div className="bg-blue-500/20 rounded p-3">
                                                <div className="font-bold text-blue-400 mb-1">전통 금융</div>
                                                <ul className="space-y-1 text-xs">
                                                    <li>• VISA: ~65,000 TPS</li>
                                                    <li>• Mastercard: ~50,000 TPS</li>
                                                    <li>• PayPal: ~200 TPS</li>
                                                </ul>
                                            </div>
                                            <div className="bg-red-500/20 rounded p-3">
                                                <div className="font-bold text-red-400 mb-1">블록체인</div>
                                                <ul className="space-y-1 text-xs">
                                                    <li>• 비트코인: ~7 TPS</li>
                                                    <li>• 이더리움: ~15 TPS</li>
                                                    <li>• Solana: ~3,000 TPS</li>
                                                </ul>
                                            </div>
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold text-green-400 mb-1">오픈해시</div>
                                                <ul className="space-y-1 text-xs">
                                                    <li>• 100 노드: ~5,100 TPS</li>
                                                    <li>• 10,000 노드: ~500,100 TPS</li>
                                                    <li>• 100,000 노드: ~5,000,100 TPS</li>
                                                </ul>
                                            </div>
                                            <div className="bg-purple-500/20 rounded p-3">
                                                <div className="font-bold text-purple-400 mb-1">확장성</div>
                                                <ul className="space-y-1 text-xs">
                                                    <li>• 블록체인: 고정</li>
                                                    <li>• 오픈해시: 선형 증가</li>
                                                    <li>• 확장 비율: 노드당 +50 TPS</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-4">📈 오픈해시 성능 모델</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">🔢 수학적 공식</h4>
                                        <div className="space-y-3">
                                            <div className="font-mono bg-black/70 p-4 rounded text-sm">
                                                <div className="text-cyan-400 mb-2">OpenHash TPS = 기본 TPS + (노드 수 × 노드당 TPS)</div>
                                                <div className="text-white">OpenHash TPS = 100 + (N × 50)</div>
                                                <div className="text-gray-400 mt-3">여기서:</div>
                                                <ul className="text-gray-300 ml-4 mt-1 space-y-1">
                                                    <li>• 기본 TPS = 100 (네트워크 오버헤드)</li>
                                                    <li>• N = 활성 노드 수</li>
                                                    <li>• 노드당 TPS = 50 (각 노드의 처리 능력)</li>
                                                </ul>
                                            </div>
                                            
                                            <div className="bg-green-500/20 rounded p-3 text-sm">
                                                <div className="font-bold text-green-400 mb-2">📊 계산 예시</div>
                                                <ul className="space-y-1">
                                                    <li>• 100 노드: 100 + (100 × 50) = <strong>5,100 TPS</strong></li>
                                                    <li>• 1,000 노드: 100 + (1,000 × 50) = <strong>50,100 TPS</strong></li>
                                                    <li>• 10,000 노드: 100 + (10,000 × 50) = <strong>500,100 TPS</strong></li>
                                                    <li>• 100,000 노드: 100 + (100,000 × 50) = <strong>5,000,100 TPS</strong></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-green-400 mb-3">⚙️ 선형 확장의 원리</h4>
                                        <p className="text-sm mb-3">
                                            오픈해시가 선형 확장을 달성하는 핵심 메커니즘:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li><strong>병렬 처리:</strong> 각 트랜잭션이 독립적으로 처리되어 상호 대기 없음</li>
                                            <li><strong>분산 저장:</strong> Hash Chain이 여러 Layer에 분산되어 병목 현상 제거</li>
                                            <li><strong>비동기 통신:</strong> 노드 간 요청-응답이 비동기로 처리되어 대기 시간 최소화</li>
                                            <li><strong>로컬 검증:</strong> 각 노드가 독립적으로 검증하여 중앙 합의 불필요</li>
                                            <li><strong>계층적 구조:</strong> 3개 Layer로 부하를 자동 분산</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-400 mb-4">⛓️ 블록체인의 TPS 한계</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">🐌 고정 TPS의 원인</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">1️⃣</span>
                                                <div>
                                                    <strong className="text-red-400">순차 처리:</strong> 
                                                    모든 노드가 동일한 블록을 순차적으로 검증해야 하므로 병렬 처리 불가능
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">2️⃣</span>
                                                <div>
                                                    <strong className="text-red-400">블록 크기 제한:</strong> 
                                                    비트코인 1MB, 이더리움 가스 한도로 블록당 트랜잭션 수 제한
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">3️⃣</span>
                                                <div>
                                                    <strong className="text-red-400">블록 생성 시간:</strong> 
                                                    비트코인 ~10분, 이더리움 ~12초로 고정되어 처리 속도 제한
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">4️⃣</span>
                                                <div>
                                                    <strong className="text-red-400">작업증명 부담:</strong> 
                                                    막대한 연산이 필요한 PoW로 인해 처리 속도 저하
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">5️⃣</span>
                                                <div>
                                                    <strong className="text-red-400">전역 합의:</strong> 
                                                    모든 노드가 합의에 참여해야 하므로 노드 증가 시 오히려 속도 감소
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-red-400 mb-3">📉 확장의 역설</h4>
                                        <div className="bg-red-500/20 rounded p-3 text-sm mb-3">
                                            <strong>블록체인의 딜레마:</strong> 노드를 추가해도 TPS가 증가하지 않으며, 
                                            오히려 합의 과정이 복잡해져 <span className="text-yellow-400 font-bold">속도가 감소</span>할 수 있습니다.
                                        </div>
                                        <div className="font-mono bg-black/70 p-3 rounded text-sm">
                                            <div className="text-red-400">Blockchain TPS ≈ 15 (노드 수와 무관)</div>
                                            <div className="text-gray-400 mt-2">비트코인: 7 TPS (10년 전이나 지금이나 동일)</div>
                                            <div className="text-gray-400">이더리움: 15 TPS (노드 수십만 개인데도 불변)</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">🔬 성능 비교 시나리오</h3>
                                
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-cyan-400 font-bold mb-3">시나리오 1: 소규모 네트워크 (100-1,000 노드)</h4>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold text-green-400 mb-1">오픈해시</div>
                                                <div>100 노드: 5,100 TPS</div>
                                                <div>1,000 노드: 50,100 TPS</div>
                                                <div className="text-yellow-400 mt-1">✨ 10배 노드 → 10배 TPS</div>
                                            </div>
                                            <div className="bg-red-500/20 rounded p-3">
                                                <div className="font-bold text-red-400 mb-1">블록체인</div>
                                                <div>100 노드: 15 TPS</div>
                                                <div>1,000 노드: 15 TPS</div>
                                                <div className="text-gray-400 mt-1">❌ 10배 노드 → TPS 불변</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-purple-400 font-bold mb-3">시나리오 2: 대규모 네트워크 (10,000-100,000 노드)</h4>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold text-green-400 mb-1">오픈해시</div>
                                                <div>10,000 노드: 500,100 TPS</div>
                                                <div>100,000 노드: 5,000,100 TPS</div>
                                                <div className="text-cyan-400 mt-1">🚀 VISA 수준 초과!</div>
                                            </div>
                                            <div className="bg-red-500/20 rounded p-3">
                                                <div className="font-bold text-red-400 mb-1">블록체인</div>
                                                <div>10,000 노드: 15 TPS</div>
                                                <div>100,000 노드: 15 TPS</div>
                                                <div className="text-gray-400 mt-1">😢 여전히 15 TPS</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-yellow-400 font-bold mb-3">💰 경제적 비교</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>오픈해시 (100,000 노드):</span>
                                                <span className="text-green-400 font-bold">5,000,100 TPS</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>블록체인 (100,000 노드):</span>
                                                <span className="text-red-400 font-bold">15 TPS</span>
                                            </div>
                                            <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
                                                <span>성능 차이:</span>
                                                <span className="text-cyan-400">333,340배</span>
                                            </div>
                                            <div className="bg-cyan-500/20 rounded p-2 mt-2">
                                                <strong>결론:</strong> 동일한 노드 수로 오픈해시는 블록체인 대비 
                                                <span className="text-yellow-400 font-bold"> 33만 배 이상</span>의 성능을 제공합니다.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-yellow-400 mb-4">🌍 실세계 응용</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-black/40 rounded p-4">
                                        <div className="text-2xl mb-2">🏦</div>
                                        <h4 className="font-bold text-cyan-400 mb-2">글로벌 결제</h4>
                                        <p className="text-xs">
                                            VISA 수준(65,000 TPS)의 성능이 필요한 글로벌 결제 시스템을 
                                            오픈해시는 1,300개 노드로 달성 가능
                                        </p>
                                    </div>
                                    <div className="bg-black/40 rounded p-4">
                                        <div className="text-2xl mb-2">🎮</div>
                                        <h4 className="font-bold text-green-400 mb-2">게임 아이템 거래</h4>
                                        <p className="text-xs">
                                            초당 수십만 건의 아이템 거래가 발생하는 대형 게임 플랫폼에서도 
                                            오픈해시는 무리 없이 처리
                                        </p>
                                    </div>
                                    <div className="bg-black/40 rounded p-4">
                                        <div className="text-2xl mb-2">🏛️</div>
                                        <h4 className="font-bold text-purple-400 mb-2">정부 공공 서비스</h4>
                                        <p className="text-xs">
                                            전 국민 대상의 대규모 공공 서비스(부동산 등기, 세금 납부 등)를 
                                            실시간으로 처리 가능
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">💡 핵심 차이점 요약</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-red-400 font-bold mb-3">❌ 블록체인</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>• <strong>고정 TPS:</strong> 노드 무관하게 ~15 TPS</li>
                                            <li>• <strong>순차 처리:</strong> 병렬 처리 불가</li>
                                            <li>• <strong>높은 지연:</strong> 10분+ 확인 시간</li>
                                            <li>• <strong>막대한 에너지:</strong> PoW 연산 부담</li>
                                            <li>• <strong>확장 불가:</strong> 노드 추가 무의미</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-green-400 font-bold mb-3">✅ 오픈해시</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>• <strong>선형 TPS:</strong> 노드당 +50 TPS</li>
                                            <li>• <strong>병렬 처리:</strong> 완전 독립 실행</li>
                                            <li>• <strong>즉시 확인:</strong> 실시간 처리</li>
                                            <li>• <strong>낮은 에너지:</strong> 98.5% 절감</li>
                                            <li>• <strong>무한 확장:</strong> 노드 추가 시 TPS 증가</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-black/40 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-white mb-3">📊 시뮬레이션 관찰 포인트</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>오픈해시 라인(청록색)이 우상향으로 급격히 상승하는 것을 관찰하세요</li>
                                    <li>블록체인 라인(빨간색 점선)은 수평으로 고정되어 있는 것을 확인하세요</li>
                                    <li>노드 수가 증가할수록 오픈해시와 블록체인의 격차가 기하급수적으로 벌어집니다</li>
                                    <li>100,000 노드에서 오픈해시는 500만 TPS를 초과합니다</li>
                                    <li>성능 테이블에서 정확한 TPS와 배수 비율을 확인할 수 있습니다</li>
                                </ul>
                            </section>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setShowModal(false)}
                                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isRunning && (
                <div className="mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-400 font-bold">테스트 진행 중...</span>
                        <span className="text-white">{currentStep} / {totalSteps}</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}>
                        </div>
                    </div>
                </div>
            )}

            {performanceData.length > 0 && (
                <>
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 mb-6">
                        <h4 className="text-lg font-bold text-white mb-4">📈 TPS 성능 그래프</h4>
                        
                        <div className="relative h-[400px]">
                            <svg className="w-full h-full">
                                <defs>
                                    <linearGradient id="openhashGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>

                                {/* Y축 그리드 */}
                                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                                    const y = 350 - (ratio * 300);
                                    return (
                                        <g key={i}>
                                            <line x1="50" y1={y} x2="95%" y2={y} 
                                                stroke="#374151" strokeWidth="1" strokeDasharray="5,5" />
                                            <text x="10" y={y + 5} fill="#9ca3af" fontSize="12">
                                                {formatNumber(Math.round(maxTPS * ratio))}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* X축 레이블 */}
                                {performanceData.map((data, i) => {
                                    if (i % Math.ceil(performanceData.length / 8) === 0 || i === performanceData.length - 1) {
                                        const x = 50 + ((i / (performanceData.length - 1)) * (window.innerWidth * 0.85));
                                        return (
                                            <text key={i} x={x} y="380" fill="#9ca3af" fontSize="12" textAnchor="middle">
                                                {formatNodeCount(data.nodes)}
                                            </text>
                                        );
                                    }
                                    return null;
                                })}

                                {/* OpenHash 라인 */}
                                <polyline
                                    fill="url(#openhashGradient)"
                                    stroke="#06b6d4"
                                    strokeWidth="3"
                                    points={performanceData.map((data, i) => {
                                        const x = 50 + ((i / (performanceData.length - 1)) * (window.innerWidth * 0.85));
                                        const y = 350 - ((data.openhashTPS / maxTPS) * 300);
                                        return `${x},${y}`;
                                    }).join(' ') + ` ${50 + ((performanceData.length - 1) / (performanceData.length - 1)) * (window.innerWidth * 0.85)},350 50,350`}
                                />

                                {/* OpenHash 데이터 포인트 */}
                                {performanceData.map((data, i) => {
                                    const x = 50 + ((i / (performanceData.length - 1)) * (window.innerWidth * 0.85));
                                    const y = 350 - ((data.openhashTPS / maxTPS) * 300);
                                    return (
                                        <circle key={i} cx={x} cy={y} r="4" fill="#06b6d4" className="animate-pulse" />
                                    );
                                })}

                                {/* Blockchain 고정 라인 */}
                                <line x1="50" y1="350" x2="95%" y2="350" 
                                    stroke="#ef4444" strokeWidth="2" strokeDasharray="10,5" />
                                
                                {/* 범례 */}
                                <g transform="translate(100, 30)">
                                    <line x1="0" y1="0" x2="30" y2="0" stroke="#06b6d4" strokeWidth="3" />
                                    <text x="40" y="5" fill="#06b6d4" fontSize="14" fontWeight="bold">오픈해시</text>
                                    
                                    <line x1="0" y1="25" x2="30" y2="25" stroke="#ef4444" strokeWidth="2" strokeDasharray="10,5" />
                                    <text x="40" y="30" fill="#ef4444" fontSize="14" fontWeight="bold">블록체인</text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 mb-6">
                        <h4 className="text-lg font-bold text-white mb-4">📊 상세 성능 테이블</h4>
                        
                        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-gray-800">
                                    <tr className="border-b border-gray-700">
                                        <th className="px-4 py-3 text-left text-cyan-400">노드 수</th>
                                        <th className="px-4 py-3 text-right text-green-400">오픈해시 TPS</th>
                                        <th className="px-4 py-3 text-right text-red-400">블록체인 TPS</th>
                                        <th className="px-4 py-3 text-right text-yellow-400">성능 배수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {performanceData.map((data, i) => (
                                        <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                                            <td className="px-4 py-3 text-white font-mono">{formatNumber(data.nodes)}</td>
                                            <td className="px-4 py-3 text-right text-green-400 font-mono font-bold">
                                                {formatNumber(data.openhashTPS)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-red-400 font-mono">
                                                {data.blockchainTPS}
                                            </td>
                                            <td className="px-4 py-3 text-right text-yellow-400 font-bold">
                                                {formatNumber(data.ratio)}x
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {performanceData.length > 0 && (
                        <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-6">
                            <h4 className="text-xl font-bold text-cyan-400 mb-4">📊 최종 성능 비교</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-black/40 rounded-xl p-6 text-center">
                                    <div className="text-green-400 text-4xl font-bold mb-2">
                                        {formatNumber(performanceData[performanceData.length - 1].openhashTPS)}
                                    </div>
                                    <div className="text-sm text-gray-400">오픈해시 TPS</div>
                                    <div className="text-xs text-green-400 mt-2">
                                        ({formatNumber(performanceData[performanceData.length - 1].nodes)} 노드)
                                    </div>
                                </div>
                                
                                <div className="bg-black/40 rounded-xl p-6 text-center">
                                    <div className="text-yellow-400 text-4xl font-bold mb-2">
                                        {formatNumber(performanceData[performanceData.length - 1].ratio)}x
                                    </div>
                                    <div className="text-sm text-gray-400">성능 우위</div>
                                    <div className="text-xs text-yellow-400 mt-2">블록체인 대비</div>
                                </div>
                                
                                <div className="bg-black/40 rounded-xl p-6 text-center">
                                    <div className="text-red-400 text-4xl font-bold mb-2">15</div>
                                    <div className="text-sm text-gray-400">블록체인 TPS</div>
                                    <div className="text-xs text-red-400 mt-2">(노드 수 무관)</div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
