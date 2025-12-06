const Tab5FraudDetection = () => {
    const [consensusStep, setConsensusStep] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);

    const runConsensus = () => {
        setIsRunning(true);
        setConsensusStep(0);
        
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setConsensusStep(step);
            if (step >= 4) {
                clearInterval(interval);
                setTimeout(() => setIsRunning(false), 1000);
            }
        }, 800);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">LPBFT 합의 메커니즘</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    Layer 1과 Layer 2에서 사용되는 경량 Byzantine Fault Tolerance 합의 알고리즘입니다.
                    전통적인 PBFT를 최적화하여 메시지 복잡도를 O(n²)에서 O(n)으로 줄이고,
                    메시지 크기를 50.5% 압축하여 대규모 네트워크에서도 빠른 합의를 달성합니다.
                    AWS 실측 결과 0.09ms 만에 합의가 완료되어 초당 수만 건의 트랜잭션 처리가 가능합니다.
                </p>
            </div>

            {/* LPBFT vs PBFT 비교 테이블 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-indigo-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-balance-scale mr-3"></i>
                        LPBFT vs PBFT 비교
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gov-border bg-gray-50">
                                <th className="text-left px-6 py-3 font-bold text-gov-text">항목</th>
                                <th className="text-center px-6 py-3 font-bold text-gov-text">LPBFT</th>
                                <th className="text-center px-6 py-3 font-bold text-gov-text">PBFT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">적용 계층</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary bg-green-50">Layer 1, Layer 2</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary">Layer 3 (Representative)</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">노드 수</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary bg-green-50">수천 개</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary">10개</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">메시지 복잡도</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary bg-green-50 font-bold text-green-700">O(n)</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary">O(n²)</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">합의 시간</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary bg-green-50 font-bold text-green-700">0.09ms</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary">1.2ms</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">메시지 크기</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary bg-green-50 font-bold text-green-700">52 bytes</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary">105 bytes</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">특징</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary bg-green-50">경량화, 대규모 확장</td>
                                <td className="text-center px-6 py-4 text-gov-text-secondary">높은 신뢰도, 소규모</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gov-border">
                    <p className="text-sm text-gov-text-secondary">
                        <strong>최적화 기법:</strong> BLS 서명 집약, Delta encoding, 불필요한 메타데이터 제거로 메시지 크기 50.5% 절감
                    </p>
                </div>
            </div>

            {/* Byzantine Fault Tolerance 조건 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-red-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-shield-alt mr-3"></i>
                        Byzantine Fault Tolerance 조건
                    </h4>
                </div>
                <div className="p-6">
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-6">
                        <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-red-800 mb-2">n ≥ 3f + 1</div>
                            <div className="text-sm text-red-700">Byzantine 노드 허용 공식</div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                            <div className="bg-white rounded p-4 border border-red-300">
                                <div className="text-lg font-bold text-red-700 mb-1">n</div>
                                <div className="text-xs text-gov-text-secondary">전체 노드 수</div>
                            </div>
                            <div className="bg-white rounded p-4 border border-red-300">
                                <div className="text-lg font-bold text-red-700 mb-1">f</div>
                                <div className="text-xs text-gov-text-secondary">Byzantine 노드 최대 허용 수</div>
                            </div>
                            <div className="bg-white rounded p-4 border border-red-300">
                                <div className="text-lg font-bold text-red-700 mb-1">2f + 1</div>
                                <div className="text-xs text-gov-text-secondary">합의 필요 응답 수</div>
                            </div>
                        </div>
                    </div>

                    {/* 예시 테이블 */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-gov-border bg-gray-50">
                                    <th className="text-center px-4 py-3 font-bold text-gov-text">전체 노드 (n)</th>
                                    <th className="text-center px-4 py-3 font-bold text-gov-text">허용 Byzantine (f)</th>
                                    <th className="text-center px-4 py-3 font-bold text-gov-text">필요 응답 (2f+1)</th>
                                    <th className="text-left px-4 py-3 font-bold text-gov-text">예시</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gov-border hover:bg-gray-50">
                                    <td className="text-center px-4 py-3">4</td>
                                    <td className="text-center px-4 py-3 font-bold text-red-600">1</td>
                                    <td className="text-center px-4 py-3 font-bold text-green-600">3</td>
                                    <td className="px-4 py-3 text-gov-text-secondary text-xs">소규모 네트워크</td>
                                </tr>
                                <tr className="border-b border-gov-border hover:bg-gray-50">
                                    <td className="text-center px-4 py-3">7</td>
                                    <td className="text-center px-4 py-3 font-bold text-red-600">2</td>
                                    <td className="text-center px-4 py-3 font-bold text-green-600">5</td>
                                    <td className="px-4 py-3 text-gov-text-secondary text-xs">중규모 네트워크</td>
                                </tr>
                                <tr className="border-b border-gov-border hover:bg-gray-50 bg-blue-50">
                                    <td className="text-center px-4 py-3 font-bold">10</td>
                                    <td className="text-center px-4 py-3 font-bold text-red-600">3</td>
                                    <td className="text-center px-4 py-3 font-bold text-green-600">7</td>
                                    <td className="px-4 py-3 text-gov-text-secondary text-xs font-bold">Representative 노드</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="text-center px-4 py-3">1,000</td>
                                    <td className="text-center px-4 py-3 font-bold text-red-600">333</td>
                                    <td className="text-center px-4 py-3 font-bold text-green-600">667</td>
                                    <td className="px-4 py-3 text-gov-text-secondary text-xs">대규모 네트워크 (LPBFT)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* LPBFT 4단계 프로세스 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-stream mr-3"></i>
                        LPBFT 4단계 합의 프로세스
                    </h4>
                </div>
                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Step 1 */}
                        <div className="border-2 border-blue-500 rounded-lg p-5 bg-blue-50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                                <h6 className="font-bold text-blue-800">Pre-prepare</h6>
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                <strong>Primary → Replicas</strong><br/>
                                • Primary 노드가 트랜잭션 제안<br/>
                                • 시퀀스 번호 할당<br/>
                                • 모든 Replica에게 전파
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="border-2 border-green-500 rounded-lg p-5 bg-green-50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                                <h6 className="font-bold text-green-800">Prepare</h6>
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                <strong>Replicas 상호 검증</strong><br/>
                                • 각 노드가 2f+1개 응답 수집<br/>
                                • 트랜잭션 유효성 검증<br/>
                                • Prepare 메시지 브로드캐스트
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="border-2 border-orange-500 rounded-lg p-5 bg-orange-50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                                <h6 className="font-bold text-orange-800">Commit</h6>
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                <strong>최종 확정</strong><br/>
                                • 2f+1개 Prepare 확인 시 Commit<br/>
                                • 트랜잭션 실행<br/>
                                • 상태 업데이트
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="border-2 border-purple-500 rounded-lg p-5 bg-purple-50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                                <h6 className="font-bold text-purple-800">Complete</h6>
                            </div>
                            <div className="text-sm text-gov-text-secondary">
                                <strong>결과 반환</strong><br/>
                                • 클라이언트에게 최종 결과 전송<br/>
                                • 합의 완료 로그 기록<br/>
                                • 다음 트랜잭션 대기
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-800">
                            <i className="fas fa-clock text-xl"></i>
                            <span className="text-sm font-bold">
                                AWS 실측: 0.09ms 합의 완료 (11개 노드 기준)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 합의 시뮬레이터 */}
            <div className="bg-gov-gray rounded-lg p-6 border border-gov-border mb-8">
                <h5 className="font-bold text-gov-text mb-4">LPBFT 합의 프로세스 시뮬레이션</h5>
                <button
                    onClick={runConsensus}
                    disabled={isRunning}
                    className="px-6 py-3 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50 mb-6"
                >
                    <i className="fas fa-play mr-2"></i>
                    {isRunning ? '합의 진행 중...' : '합의 시작'}
                </button>

                <div className="space-y-4">
                    {/* Step 1 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        consensusStep >= 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                consensusStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>1</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">Pre-prepare: Primary 노드 트랜잭션 제안</div>
                                {consensusStep >= 1 && (
                                    <div className="text-sm text-gov-text-secondary mt-1">
                                        Primary가 시퀀스 번호 #12345 할당하여 전파
                                    </div>
                                )}
                            </div>
                            {consensusStep >= 1 && <i className="fas fa-check-circle text-2xl text-blue-600"></i>}
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        consensusStep >= 2 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                consensusStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>2</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">Prepare: 7개 노드 응답 수집 (2f+1)</div>
                                {consensusStep >= 2 && (
                                    <div className="text-sm text-gov-text-secondary mt-1">
                                        10개 노드 중 7개 Prepare 메시지 확인 완료
                                    </div>
                                )}
                            </div>
                            {consensusStep >= 2 && <i className="fas fa-check-circle text-2xl text-green-600"></i>}
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        consensusStep >= 3 ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                consensusStep >= 3 ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>3</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">Commit: 트랜잭션 실행 및 상태 업데이트</div>
                                {consensusStep >= 3 && (
                                    <div className="text-sm text-gov-text-secondary mt-1">
                                        Merkle Tree 업데이트 및 BLS 서명 생성
                                    </div>
                                )}
                            </div>
                            {consensusStep >= 3 && <i className="fas fa-check-circle text-2xl text-orange-600"></i>}
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        consensusStep >= 4 ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                consensusStep >= 4 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>4</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">Complete: 합의 완료 및 결과 반환</div>
                                {consensusStep >= 4 && (
                                    <div className="text-sm text-purple-700 font-bold mt-1">
                                        ✓ 0.09ms 만에 합의 완료 (상태 코드: 600)
                                    </div>
                                )}
                            </div>
                            {consensusStep >= 4 && <i className="fas fa-check-circle text-2xl text-purple-600"></i>}
                        </div>
                    </div>
                </div>
            </div>

            {/* 메시지 압축 */}
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <i className="fas fa-compress text-amber-600 text-3xl mt-1"></i>
                    <div>
                        <h5 className="text-lg font-bold text-amber-900 mb-3">메시지 압축 최적화</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded p-4 border border-amber-300">
                                <div className="font-bold text-gov-text mb-2">기존 PBFT 메시지</div>
                                <div className="text-sm text-gov-text-secondary space-y-1">
                                    • 메시지 크기: 105 bytes<br/>
                                    • RSA 서명: 256 bytes<br/>
                                    • 메타데이터: 완전 포함<br/>
                                    • 총 네트워크 부하: 높음
                                </div>
                            </div>
                            <div className="bg-white rounded p-4 border border-green-400">
                                <div className="font-bold text-green-700 mb-2">LPBFT 최적화 메시지</div>
                                <div className="text-sm text-gov-text-secondary space-y-1">
                                    • 메시지 크기: <strong className="text-green-700">52 bytes (50.5% 절감)</strong><br/>
                                    • BLS 서명 집약: 48 bytes<br/>
                                    • Delta encoding 적용<br/>
                                    • 총 네트워크 부하: 낮음
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 특징 */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                    <i className="fas fa-tachometer-alt text-3xl text-blue-600 mb-2"></i>
                    <div className="font-bold text-gov-text">고속 합의</div>
                    <div className="text-xs text-gov-text-secondary mt-1">0.09ms 완료 (AWS 실측)</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                    <i className="fas fa-compress-arrows-alt text-3xl text-green-600 mb-2"></i>
                    <div className="font-bold text-gov-text">메시지 압축</div>
                    <div className="text-xs text-gov-text-secondary mt-1">50.5% 절감 (105B → 52B)</div>
                </div>
                <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 text-center">
                    <i className="fas fa-expand-arrows-alt text-3xl text-purple-600 mb-2"></i>
                    <div className="font-bold text-gov-text">확장성</div>
                    <div className="text-xs text-gov-text-secondary mt-1">O(n) 메시지 복잡도</div>
                </div>
            </div>
        </div>
    );
};
