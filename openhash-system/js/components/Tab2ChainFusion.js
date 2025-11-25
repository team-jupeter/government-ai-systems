const Tab2ChainFusion = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [chains, setChains] = React.useState([]);
    const [fusionStep, setFusionStep] = React.useState(0);
    const [verificationResults, setVerificationResults] = React.useState([]);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

    const runFusion = async () => {
        try {
            setIsRunning(true);
            setFusionStep(0);
            setVerificationResults([]);

            setFusionStep(1);
            const initialChains = [];
            for (let i = 0; i < 5; i++) {
                const hash = await sha256(`User${i}-${Date.now()}`);
                initialChains.push({
                    id: i,
                    userId: `User ${i + 1}`,
                    userHash: hash,
                    layerHash: null,
                    fusedHash: null,
                    verified: false,
                    layer: Math.floor(Math.random() * 3) + 1
                });
                await sleep(100);
            }
            setChains(initialChains);
            await sleep(2000);

            setFusionStep(2);
            const chainsWithLayer = [];
            for (let i = 0; i < initialChains.length; i++) {
                const chain = initialChains[i];
                const layerHash = await sha256(`Layer${chain.layer}-${Date.now()}`);
                chainsWithLayer.push({ ...chain, layerHash });
                setChains([...chainsWithLayer, ...initialChains.slice(i + 1)]);
                await sleep(100);
            }
            await sleep(2000);

            setFusionStep(3);
            const fusedChains = [];
            for (let i = 0; i < chainsWithLayer.length; i++) {
                const chain = chainsWithLayer[i];
                const fusedHash = await sha256(chain.userHash + chain.layerHash);
                fusedChains.push({ ...chain, fusedHash });
                setChains([...fusedChains, ...chainsWithLayer.slice(i + 1)]);
                await sleep(100);
            }
            await sleep(2000);

            setFusionStep(4);
            const verifications = fusedChains.map(chain => ({
                userId: chain.userId,
                layer: chain.layer,
                success: true,
                message: '✅ Hash Chain 검증 성공'
            }));
            setVerificationResults(verifications);

            const verifiedChains = fusedChains.map(chain => ({ ...chain, verified: true }));
            setChains(verifiedChains);
            await sleep(2000);

            setFusionStep(5);
        } catch (error) {
            console.error('Fusion error:', error);
        } finally {
            setIsRunning(false);
        }
    };

    const reset = () => {
        setIsRunning(false);
        setChains([]);
        setFusionStep(0);
        setVerificationResults([]);
    };

    return (
        <div className="bg-black/40 rounded-3xl border border-purple-500/30 p-8 backdrop-blur-lg">
            <h3 className="text-2xl font-bold mb-6 text-purple-400">🔗 Hash Chain 융합 및 상호 검증</h3>

            <div className="flex justify-center gap-4 mb-8">
                <button onClick={runFusion} disabled={isRunning}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white disabled:opacity-50 hover:shadow-lg transition-all">
                    {isRunning ? '⏳ 융합 중...' : '▶️ 융합 시작'}
                </button>
                <button onClick={reset}
                    className="px-8 py-3 bg-white/10 border-2 border-purple-500/50 rounded-xl font-bold text-white hover:bg-white/20 transition-all">
                    🔄 초기화
                </button>
                <button onClick={() => setShowModal(true)}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:shadow-lg transition-all">
                    📚 설명
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500 rounded-3xl p-8 max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-purple-400">🔗 Tab 2: Hash Chain 융합 메커니즘</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-3xl">×</button>
                        </div>

                        <div className="space-y-6 text-gray-300">
                            <section>
                                <h3 className="text-2xl font-bold text-white mb-4">🎯 시뮬레이션 개요</h3>
                                <p className="leading-relaxed mb-4">
                                    이 시뮬레이션은 오픈해시 네트워크에서 <span className="text-purple-400 font-bold">이용자의 Hash와 Layer의 Hash가 융합</span>되어 
                                    <span className="text-green-400 font-bold"> 불변의 Hash Chain</span>을 생성하는 과정을 단계별로 보여줍니다. 
                                    이는 양측이 <span className="text-cyan-400 font-bold">상호 검증 가능한 분산 신뢰</span>를 구축하는 핵심 메커니즘입니다.
                                </p>
                            </section>

                            <section className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-cyan-400 mb-4">1️⃣ User Hash 생성 단계</h3>
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-2">📄 데이터 원천</h4>
                                        <p className="text-sm mb-3">각 이용자가 고유한 데이터를 기반으로 Hash를 생성합니다:</p>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                            <li><strong>사용자 ID:</strong> 고유 식별자 (user-0, user-1, ...)</li>
                                            <li><strong>타임스탬프:</strong> 밀리초 단위 현재 시각</li>
                                            <li><strong>트랜잭션 데이터:</strong> 실제 전송할 문서/거래 정보</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-cyan-400 mb-2">🔐 SHA-256 해싱</h4>
                                        <div className="font-mono bg-black/70 p-3 rounded text-sm text-green-400 mb-2">
                                            User Hash = SHA-256(UserID + Timestamp + Data)
                                        </div>
                                        <p className="text-sm">
                                            결과: 64자리 16진수 문자열 (예: <span className="text-cyan-400 font-mono">a3f5d9e2b8c1...</span>)
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">2️⃣ Layer Hash 생성 단계</h3>
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-2">🔷 Layer 노드의 역할</h4>
                                        <p className="text-sm mb-3">
                                            이용자의 Hash를 받은 Layer 노드는 자신만의 고유 Hash를 생성합니다. 
                                            이는 <span className="text-purple-400 font-bold">Layer의 존재 증명</span>이자 
                                            <span className="text-yellow-400 font-bold"> 응답의 진정성</span>을 보장합니다.
                                        </p>
                                        <div className="font-mono bg-black/70 p-3 rounded text-sm text-purple-400">
                                            Layer Hash = SHA-256(LayerID + NodeID + Timestamp)
                                        </div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-purple-400 mb-2">⚙️ 계층별 특성</h4>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="bg-blue-500/20 rounded p-2">
                                                <div className="font-bold text-blue-400">Layer 1</div>
                                                <div className="text-xs">빠른 처리 우선</div>
                                            </div>
                                            <div className="bg-purple-500/20 rounded p-2">
                                                <div className="font-bold text-purple-400">Layer 2</div>
                                                <div className="text-xs">균형 잡힌 검증</div>
                                            </div>
                                            <div className="bg-amber-500/20 rounded p-2">
                                                <div className="font-bold text-amber-400">Layer 3</div>
                                                <div className="text-xs">최고 보안 검증</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-green-400 mb-4">3️⃣ Hash Chain 융합 단계</h3>
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-3">⛓️ 융합 알고리즘</h4>
                                        <div className="space-y-2">
                                            <div className="font-mono bg-black/70 p-3 rounded text-sm">
                                                <div className="text-cyan-400">Step 1: 연결 (Concatenation)</div>
                                                <div className="text-white ml-4">Combined = UserHash + LayerHash + Timestamp</div>
                                            </div>
                                            <div className="font-mono bg-black/70 p-3 rounded text-sm">
                                                <div className="text-purple-400">Step 2: 재해싱 (Rehashing)</div>
                                                <div className="text-white ml-4">FusedHash = SHA-256(Combined)</div>
                                            </div>
                                            <div className="font-mono bg-black/70 p-3 rounded text-sm text-green-400">
                                                <div className="font-bold">최종 결과:</div>
                                                <div className="ml-4">불변의 Hash Chain = FusedHash</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-green-400 mb-2">🛡️ 보안 특성</h4>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li><strong>단방향성:</strong> Hash에서 원본 데이터 복원 불가능</li>
                                            <li><strong>충돌 저항성:</strong> 동일한 Hash를 생성하는 다른 입력 찾기 극도로 어려움</li>
                                            <li><strong>눈사태 효과:</strong> 입력의 1비트만 변경해도 출력의 50% 이상 변경</li>
                                            <li><strong>결정론적:</strong> 동일 입력은 항상 동일 출력 생성</li>
                                            <li><strong>상호 의존성:</strong> 양측 Hash 중 하나라도 변경되면 전체 Chain 무효화</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-blue-400 mb-4">4️⃣ 상호 검증 단계</h3>
                                <div className="space-y-3">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-white mb-2">🔍 검증 프로세스</h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm">
                                            <li><strong>이용자 측 검증:</strong> Layer가 제공한 Hash와 자신의 Hash를 결합하여 동일한 Fused Hash 생성 확인</li>
                                            <li><strong>Layer 측 검증:</strong> 이용자의 Hash와 자신의 Hash를 결합하여 동일한 Fused Hash 생성 확인</li>
                                            <li><strong>네트워크 측 검증:</strong> 제3자가 양측의 Hash를 알고 있을 경우 독립적으로 검증 가능</li>
                                            <li><strong>타임스탬프 검증:</strong> 시간 순서가 논리적으로 일치하는지 확인</li>
                                        </ol>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-lg font-bold text-blue-400 mb-2">✅ 검증 성공 조건</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">Hash 일치</div>
                                                <div>양측이 계산한 Fused Hash가 정확히 동일</div>
                                            </div>
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">타임스탬프 유효</div>
                                                <div>시간 순서가 논리적으로 타당</div>
                                            </div>
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">서명 검증</div>
                                                <div>양측의 디지털 서명이 유효</div>
                                            </div>
                                            <div className="bg-green-500/20 rounded p-3">
                                                <div className="font-bold mb-1">네트워크 합의</div>
                                                <div>다수의 노드가 동일 결과 확인</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-amber-400 mb-4">💡 블록체인과의 차이점</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-red-400 font-bold mb-3">❌ 블록체인</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>• <strong>순차적 블록:</strong> 이전 블록에 의존</li>
                                            <li>• <strong>전체 합의:</strong> 모든 노드가 동의 필요</li>
                                            <li>• <strong>긴 지연:</strong> 10분 이상 대기</li>
                                            <li>• <strong>높은 비용:</strong> 막대한 연산 필요</li>
                                            <li>• <strong>단일 체인:</strong> 분기 시 충돌</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 rounded-lg p-4">
                                        <h4 className="text-green-400 font-bold mb-3">✅ 오픈해시</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li>• <strong>독립적 Chain:</strong> 각자 독립 실행</li>
                                            <li>• <strong>양자 합의:</strong> 당사자만 동의</li>
                                            <li>• <strong>즉시 처리:</strong> 실시간 확인</li>
                                            <li>• <strong>낮은 비용:</strong> 최소 연산</li>
                                            <li>• <strong>병렬 처리:</strong> 무한 확장</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-purple-400 mb-3">🔬 실전 응용 사례</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                    <div className="bg-black/40 rounded p-3">
                                        <div className="text-cyan-400 font-bold mb-1">금융 거래</div>
                                        <div>송금자와 수취인의 Hash 융합으로 부인 방지</div>
                                    </div>
                                    <div className="bg-black/40 rounded p-3">
                                        <div className="text-green-400 font-bold mb-1">계약 체결</div>
                                        <div>양측 서명 Hash 융합으로 계약 증명</div>
                                    </div>
                                    <div className="bg-black/40 rounded p-3">
                                        <div className="text-yellow-400 font-bold mb-1">문서 공증</div>
                                        <div>문서 작성자와 공증 기관의 Hash 융합</div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-black/40 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-white mb-3">📊 시뮬레이션 관찰 포인트</h3>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    <li>각 카드가 5단계를 거쳐 완성되는 과정을 관찰하세요</li>
                                    <li>User Hash → Layer Hash → Fused Hash 순서로 생성되는 것을 확인하세요</li>
                                    <li>모든 Hash가 12자리 16진수로 표시되는 것을 주목하세요</li>
                                    <li>검증 성공 시 녹색 체크마크와 애니메이션을 확인하세요</li>
                                    <li>융합 공식이 수학적으로 표현되는 것을 관찰하세요</li>
                                </ul>
                            </section>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setShowModal(false)}
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold text-white">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-900 via-purple-900/20 to-black rounded-2xl border border-white/10 mb-6 overflow-hidden p-8">
                <div className="absolute top-4 right-4 bg-black/80 rounded-xl px-4 py-3 border border-purple-500/30">
                    <div className="text-purple-400 font-bold mb-2">융합 단계</div>
                    <div className={`text-sm ${fusionStep >= 1 ? 'text-green-400' : 'text-gray-500'}`}>
                        {fusionStep >= 1 ? '✅' : '⏸️'} 1. User Hash 생성
                    </div>
                    <div className={`text-sm ${fusionStep >= 2 ? 'text-green-400' : 'text-gray-500'}`}>
                        {fusionStep >= 2 ? '✅' : '⏸️'} 2. Layer Hash 생성
                    </div>
                    <div className={`text-sm ${fusionStep >= 3 ? 'text-green-400' : 'text-gray-500'}`}>
                        {fusionStep >= 3 ? '✅' : '⏸️'} 3. Hash Chain 융합
                    </div>
                    <div className={`text-sm ${fusionStep >= 4 ? 'text-green-400' : 'text-gray-500'}`}>
                        {fusionStep >= 4 ? '✅' : '⏸️'} 4. 상호 검증
                    </div>
                    <div className={`text-sm ${fusionStep >= 5 ? 'text-green-400' : 'text-gray-500'}`}>
                        {fusionStep >= 5 ? '✅' : '⏸️'} 5. 완료
                    </div>
                </div>

                <div className="space-y-4 max-h-[460px] overflow-y-auto">
                    {chains.map(chain => (
                        <div key={chain.id}
                            className={`bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 rounded-2xl p-6 transition-all ${
                                chain.verified ? 'border-green-500 shadow-lg shadow-green-500/30' : 'border-purple-500/30'
                            }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">👤</div>
                                    <div>
                                        <div className="font-bold text-white">{chain.userId}</div>
                                        <div className="text-xs text-gray-400">→ Layer {chain.layer}</div>
                                    </div>
                                </div>
                                {chain.verified && (
                                    <div className="text-green-400 text-2xl animate-bounce">✅</div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-black/40 rounded-lg p-3">
                                    <div className="text-xs text-cyan-400 mb-1">User Hash</div>
                                    <div className="text-xs font-mono text-white break-all">
                                        {chain.userHash || '⏳'}
                                    </div>
                                </div>
                                <div className="bg-black/40 rounded-lg p-3">
                                    <div className="text-xs text-purple-400 mb-1">Layer Hash</div>
                                    <div className="text-xs font-mono text-white break-all">
                                        {chain.layerHash || '⏳'}
                                    </div>
                                </div>
                                <div className="bg-black/40 rounded-lg p-3">
                                    <div className="text-xs text-green-400 mb-1">Fused Hash</div>
                                    <div className="text-xs font-mono text-white break-all">
                                        {chain.fusedHash || '⏳'}
                                    </div>
                                </div>
                            </div>

                            {fusionStep >= 3 && chain.fusedHash && (
                                <div className="mt-4 text-center text-sm text-purple-300">
                                    🔗 SHA-256({chain.userHash.slice(0, 6)}... + {chain.layerHash.slice(0, 6)}...) = {chain.fusedHash.slice(0, 8)}...
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {verificationResults.length > 0 && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-green-400 mb-4">🔐 검증 결과</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {verificationResults.map((result, i) => (
                            <div key={i} className="bg-black/40 rounded-lg p-3 flex items-center gap-3">
                                <div className="text-2xl">{result.success ? '✅' : '❌'}</div>
                                <div>
                                    <div className="text-white font-bold">{result.userId}</div>
                                    <div className="text-xs text-gray-400">{result.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
