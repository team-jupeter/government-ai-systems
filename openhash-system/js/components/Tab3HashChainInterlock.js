const Tab3HashChainInterlock = () => {
    const [verificationStep, setVerificationStep] = React.useState(0);

    const runVerification = () => {
        setVerificationStep(0);
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setVerificationStep(step);
            if (step >= 4) clearInterval(interval);
        }, 1000);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">계층간 Hash Chain 상호 연동 메커니즘</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    하향식 검증 모듈(310)과 상향식 감시 모듈(320)을 통해 계층 간 데이터 무결성을 양방향으로 검증합니다.
                    상위 계층은 BLS 서명과 Merkle Proof로 하위 계층을 검증하고, 
                    하위 계층은 이상 탐지 시 상위 계층과의 연결을 차단합니다.
                </p>
            </div>

            {/* 양방향 검증 구조 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
                    <h5 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-arrow-down"></i>
                        하향식 검증 모듈 (310)
                    </h5>
                    <div className="space-y-3 text-sm text-gov-text">
                        <div className="bg-white rounded p-3 border border-blue-300">
                            <div className="font-bold mb-1">Layer 4 (국가) → Layer 3 (광역시도)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • Merkle Root(410) 전달<br/>
                                • BLS 서명(420)으로 무결성 검증<br/>
                                • Merkle Path(440)로 개별 데이터 검증
                            </div>
                        </div>
                        <div className="bg-white rounded p-3 border border-blue-300">
                            <div className="font-bold mb-1">Layer 3 (광역시도) → Layer 2 (시군구)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • 집약된 Merkle Root 하위 전달<br/>
                                • 지역별 데이터 무결성 검증<br/>
                                • Representative 노드(210)가 검증 주도
                            </div>
                        </div>
                        <div className="bg-white rounded p-3 border border-blue-300">
                            <div className="font-bold mb-1">Layer 2 (시군구) → Layer 1 (읍면동)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • 최하위 계층까지 검증 체인 전파<br/>
                                • 트랜잭션 패킷(430) 단위 검증<br/>
                                • 121바이트 또는 137바이트 패킷
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-2 border-orange-500 rounded-lg p-6 bg-orange-50">
                    <h5 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-arrow-up"></i>
                        상향식 감시 모듈 (320)
                    </h5>
                    <div className="space-y-3 text-sm text-gov-text">
                        <div className="bg-white rounded p-3 border border-orange-300">
                            <div className="font-bold mb-1">Layer 1 (읍면동) → Layer 2 (시군구)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • 하위 노드가 상위 노드 검증<br/>
                                • 이상 탐지 시 연결 차단<br/>
                                • Isolation Forest 알고리즘 적용
                            </div>
                        </div>
                        <div className="bg-white rounded p-3 border border-orange-300">
                            <div className="font-bold mb-1">Layer 2 (시군구) → Layer 3 (광역시도)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • 중간 계층 간 상호 감시<br/>
                                • 비정상 패턴 탐지 및 보고<br/>
                                • 다수결 원칙으로 이상 노드 격리
                            </div>
                        </div>
                        <div className="bg-white rounded p-3 border border-orange-300">
                            <div className="font-bold mb-1">Layer 3 (광역시도) → Layer 4 (국가)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • 최종 검증 계층 모니터링<br/>
                                • 전국 단위 이상 징후 보고<br/>
                                • 검증 실패(610) 시 즉시 차단
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 검증 시뮬레이터 */}
            <div className="bg-gov-gray rounded-lg p-6 border border-gov-border mb-8">
                <h5 className="font-bold text-gov-text mb-4">양방향 검증 프로세스 시뮬레이션</h5>
                <button
                    onClick={runVerification}
                    className="px-6 py-3 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light mb-6"
                >
                    <i className="fas fa-play mr-2"></i>
                    검증 시작
                </button>

                <div className="space-y-4">
                    {/* Step 1 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        verificationStep >= 1 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                verificationStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>1</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">Layer 4 → Layer 3 Merkle Root 전달</div>
                                {verificationStep >= 1 && (
                                    <div className="text-sm text-gov-text-secondary mt-1">
                                        국가 계층에서 광역시도 계층으로 Merkle Root 전송 완료
                                    </div>
                                )}
                            </div>
                            {verificationStep >= 1 && <i className="fas fa-check-circle text-2xl text-green-600"></i>}
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        verificationStep >= 2 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                verificationStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>2</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">BLS 서명 검증</div>
                                {verificationStep >= 2 && (
                                    <div className="text-sm text-gov-text-secondary mt-1">
                                        Boneh-Lynn-Shacham 서명으로 데이터 무결성 확인
                                    </div>
                                )}
                            </div>
                            {verificationStep >= 2 && <i className="fas fa-check-circle text-2xl text-green-600"></i>}
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        verificationStep >= 3 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                verificationStep >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>3</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">하위 계층 상향 검증</div>
                                {verificationStep >= 3 && (
                                    <div className="text-sm text-gov-text-secondary mt-1">
                                        Layer 1, 2가 상위 계층 데이터 무결성 확인
                                    </div>
                                )}
                            </div>
                            {verificationStep >= 3 && <i className="fas fa-check-circle text-2xl text-green-600"></i>}
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className={`bg-white rounded-lg p-4 border-2 transition-all ${
                        verificationStep >= 4 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                verificationStep >= 4 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>4</div>
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">검증 완료 (600)</div>
                                {verificationStep >= 4 && (
                                    <div className="text-sm text-green-700 font-bold mt-1">
                                        ✓ 전체 계층 간 Hash Chain 무결성 검증 성공
                                    </div>
                                )}
                            </div>
                            {verificationStep >= 4 && <i className="fas fa-check-circle text-2xl text-green-600"></i>}
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 메커니즘 */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                    <i className="fas fa-shield-alt text-3xl text-blue-600 mb-2"></i>
                    <div className="font-bold text-gov-text">BLS 서명(420)</div>
                    <div className="text-xs text-gov-text-secondary mt-1">집약 가능한 짧은 서명</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                    <i className="fas fa-tree text-3xl text-green-600 mb-2"></i>
                    <div className="font-bold text-gov-text">Merkle Proof(440)</div>
                    <div className="text-xs text-gov-text-secondary mt-1">효율적 데이터 검증</div>
                </div>
                <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 text-center">
                    <i className="fas fa-ban text-3xl text-orange-600 mb-2"></i>
                    <div className="font-bold text-gov-text">자동 차단</div>
                    <div className="text-xs text-gov-text-secondary mt-1">이상 노드 즉시 격리</div>
                </div>
            </div>
        </div>
    );
};
