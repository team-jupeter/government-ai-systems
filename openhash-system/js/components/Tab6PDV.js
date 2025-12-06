const Tab6PDV = () => {
    const [selectedShare, setSelectedShare] = React.useState(null);
    const [recoveryAttempt, setRecoveryAttempt] = React.useState(false);

    const shares = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        node: `Representative ${i + 1}`,
        location: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원'][i],
        selected: false
    }));

    const [shareStates, setShareStates] = React.useState(shares);

    const toggleShare = (id) => {
        setShareStates(prev => prev.map(s => 
            s.id === id ? { ...s, selected: !s.selected } : s
        ));
    };

    const attemptRecovery = () => {
        const selectedCount = shareStates.filter(s => s.selected).length;
        setRecoveryAttempt(true);
        setTimeout(() => setRecoveryAttempt(false), 3000);
    };

    const selectedCount = shareStates.filter(s => s.selected).length;

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">Representative 노드 & Shamir 비밀 분산</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    Layer 3에 배치된 Representative 노드는 전체 네트워크의 최종 검증을 담당합니다.
                    Layer 2 노드 중 상위 10% 처리량과 지리적 분산을 고려하여 선정되며,
                    Shamir 비밀 분산을 통해 마스터 키를 10조각으로 분할하여 보관합니다.
                    7개 이상의 조각이 모여야만 키를 복원할 수 있어, 정보 이론적으로 안전한 키 관리를 제공합니다.
                </p>
            </div>

            {/* Representative 노드 선정 기준 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-crown mr-3"></i>
                        Representative 노드 선정 기준
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text" style={{width: '200px'}}>배치 위치</th>
                                <td className="px-6 py-4 text-gov-text-secondary">Layer 3 (광역시도 계층)</td>
                            </tr>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">선정 기준</th>
                                <td className="px-6 py-4 text-gov-text-secondary">
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Layer 2 노드 중 상위 10% 처리량</li>
                                        <li>지리적 분산 고려 (각 지역별 균형)</li>
                                        <li>네트워크 안정성 (99.9% 가동률)</li>
                                        <li>응답 시간 (평균 50ms 이하)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">노드 수</th>
                                <td className="px-6 py-4 text-gov-text-secondary">10개 (일 실시예, 시스템 규모에 따라 가변 가능)</td>
                            </tr>
                            <tr className="border-b border-gov-border">
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">임기</th>
                                <td className="px-6 py-4 text-gov-text-secondary">1주일 자동 재선정</td>
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
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">합의 방식</th>
                                <td className="px-6 py-4 text-gov-text-secondary">PBFT 변형, 7-of-10 임계값</td>
                            </tr>
                            <tr>
                                <th className="text-left px-6 py-4 bg-gray-50 font-bold text-gov-text">역할</th>
                                <td className="px-6 py-4 text-gov-text-secondary">최종 검증, Merkle Root 집약, BLS 서명 생성</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Shamir 비밀 분산 원리 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-blue-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-key mr-3"></i>
                        Shamir 비밀 분산 (n=10, k=7)
                    </h4>
                </div>
                <div className="p-6">
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
                        <h5 className="text-lg font-bold text-blue-900 mb-4">🔐 기본 원리</h5>
                        <div className="space-y-3 text-sm text-gov-text-secondary">
                            <p><strong className="text-blue-900">1. 마스터 키를 10조각으로 분할</strong></p>
                            <p><strong className="text-blue-900">2. 7조각 이상 수집 시 복원 가능</strong></p>
                            <p><strong className="text-blue-900">3. 6조각 이하로는 정보 이론적으로 복원 불가능</strong></p>
                            <p className="text-xs italic">→ k-1개(6개)의 조각으로는 원본에 대한 어떠한 정보도 얻을 수 없음</p>
                        </div>
                    </div>

                    {/* 수학적 기반 */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h5 className="text-lg font-bold text-gov-text mb-4">📐 수학적 기반</h5>
                        <div className="space-y-4">
                            <div className="bg-white rounded p-4 border border-gray-300">
                                <div className="font-bold text-gov-text mb-2">k-1차 다항식 생성</div>
                                <div className="text-center my-4">
                                    <div className="inline-block bg-blue-100 px-6 py-3 rounded font-mono text-sm">
                                        f(x) = S + a₁x + a₂x² + a₃x³ + a₄x⁴ + a₅x⁵ + a₆x⁶
                                    </div>
                                </div>
                                <div className="text-sm text-gov-text-secondary">
                                    • S: 마스터 키 (비밀값)<br/>
                                    • a₁, a₂, ..., a₆: 랜덤 계수<br/>
                                    • k-1 = 6차 다항식
                                </div>
                            </div>

                            <div className="bg-white rounded p-4 border border-gray-300">
                                <div className="font-bold text-gov-text mb-2">Share 생성</div>
                                <div className="text-sm text-gov-text-secondary space-y-1">
                                    <p>f(x₁) = Share 1 → Representative 노드 1</p>
                                    <p>f(x₂) = Share 2 → Representative 노드 2</p>
                                    <p>...</p>
                                    <p>f(x₁₀) = Share 10 → Representative 노드 10</p>
                                </div>
                            </div>

                            <div className="bg-white rounded p-4 border border-green-300">
                                <div className="font-bold text-green-700 mb-2">Lagrange 보간법으로 복원</div>
                                <div className="text-sm text-gov-text-secondary">
                                    • 7개 Share 수집<br/>
                                    • Lagrange 보간 공식 적용<br/>
                                    • f(x) 다항식 복원<br/>
                                    • f(0) = S (마스터 키 복원)
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 보안 특성 */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                            <h6 className="font-bold text-green-800 mb-3">✅ 보안 장점</h6>
                            <ul className="text-sm space-y-2 text-gov-text-secondary">
                                <li className="flex gap-2">
                                    <i className="fas fa-check text-green-600 mt-1"></i>
                                    <span>단일 실패 지점 없음</span>
                                </li>
                                <li className="flex gap-2">
                                    <i className="fas fa-check text-green-600 mt-1"></i>
                                    <span>k-1개로는 정보 이론적 안전</span>
                                </li>
                                <li className="flex gap-2">
                                    <i className="fas fa-check text-green-600 mt-1"></i>
                                    <span>Byzantine 노드 3개까지 허용</span>
                                </li>
                                <li className="flex gap-2">
                                    <i className="fas fa-check text-green-600 mt-1"></i>
                                    <span>지리적 분산으로 물리적 공격 방어</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                            <h6 className="font-bold text-amber-800 mb-3">⚠️ 공격 시나리오</h6>
                            <ul className="text-sm space-y-2 text-gov-text-secondary">
                                <li className="flex gap-2">
                                    <i className="fas fa-times text-red-600 mt-1"></i>
                                    <span>6개 노드 공격: 복원 불가능</span>
                                </li>
                                <li className="flex gap-2">
                                    <i className="fas fa-times text-red-600 mt-1"></i>
                                    <span>3개 Byzantine 노드: 합의 가능</span>
                                </li>
                                <li className="flex gap-2">
                                    <i className="fas fa-exclamation text-amber-600 mt-1"></i>
                                    <span>7개 노드 공격: 복원 가능 (극단적)</span>
                                </li>
                                <li className="flex gap-2">
                                    <i className="fas fa-check text-green-600 mt-1"></i>
                                    <span>실제로는 지리적 분산으로 극히 어려움</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Layer 3에서 7-of-10 PBFT */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-indigo-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-handshake mr-3"></i>
                        Layer 3 합의: 7-of-10 PBFT
                    </h4>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-300">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <div>
                                <div className="font-bold text-blue-800 mb-1">Layer 2에서 Merkle Root 수신</div>
                                <div className="text-sm text-gov-text-secondary">각 광역시도의 집약된 Merkle Root가 Representative 노드로 전송</div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-300">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <div>
                                <div className="font-bold text-green-800 mb-1">10개 Representative 노드 검증</div>
                                <div className="text-sm text-gov-text-secondary">각 노드가 BLS 서명 및 Merkle Proof 검증 수행</div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-300">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                            <div>
                                <div className="font-bold text-purple-800 mb-1">7개 이상 동의 시 합의 완료</div>
                                <div className="text-sm text-gov-text-secondary">2f + 1 = 7개 노드의 Prepare 메시지 확인 (Byzantine 허용: f=3)</div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-300">
                            <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                            <div>
                                <div className="font-bold text-orange-800 mb-1">BLS 서명 집약</div>
                                <div className="text-sm text-gov-text-secondary">10개 노드의 개별 서명을 하나의 48바이트 집약 서명으로 통합</div>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-300">
                            <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                            <div>
                                <div className="font-bold text-red-800 mb-1">Layer 4로 최종 전송</div>
                                <div className="text-sm text-gov-text-secondary">검증 완료된 Merkle Root와 집약 서명을 국가 계층으로 전송</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-green-50 border border-green-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-800">
                            <i className="fas fa-shield-alt text-xl"></i>
                            <span className="text-sm font-bold">
                                Byzantine 허용: f = 3 (10개 노드 중 3개까지 악의적 행동 가능)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 키 분산 시뮬레이터 */}
            <div className="bg-gov-gray rounded-lg p-6 border border-gov-border mb-8">
                <h5 className="font-bold text-gov-text mb-4">Shamir 비밀 분산 시뮬레이터</h5>
                <p className="text-sm text-gov-text-secondary mb-4">
                    7개 이상의 Share를 선택하여 마스터 키 복원을 시도하세요.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {shareStates.map(share => (
                        <button
                            key={share.id}
                            onClick={() => toggleShare(share.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                                share.selected 
                                    ? 'bg-blue-100 border-blue-500' 
                                    : 'bg-white border-gray-300 hover:border-blue-300'
                            }`}
                        >
                            <div className="text-center">
                                <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                                    share.selected ? 'bg-blue-600' : 'bg-gray-300'
                                }`}>
                                    <i className={`fas fa-key text-sm ${share.selected ? 'text-white' : 'text-gray-600'}`}></i>
                                </div>
                                <div className="text-xs font-bold text-gov-text">Share {share.id}</div>
                                <div className="text-xs text-gov-text-secondary">{share.location}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                        <span className="text-gov-text-secondary">선택된 Share: </span>
                        <span className={`font-bold text-lg ${
                            selectedCount >= 7 ? 'text-green-600' : 'text-red-600'
                        }`}>{selectedCount} / 10</span>
                    </div>
                    <button
                        onClick={attemptRecovery}
                        disabled={recoveryAttempt}
                        className="px-6 py-2 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50"
                    >
                        복원 시도
                    </button>
                </div>

                {recoveryAttempt && (
                    <div className={`rounded-lg p-4 border-2 ${
                        selectedCount >= 7 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-red-50 border-red-500'
                    }`}>
                        {selectedCount >= 7 ? (
                            <div className="flex items-center gap-3">
                                <i className="fas fa-check-circle text-3xl text-green-600"></i>
                                <div>
                                    <div className="font-bold text-green-800">✓ 마스터 키 복원 성공!</div>
                                    <div className="text-sm text-green-600 mt-1">
                                        {selectedCount}개 Share로 Lagrange 보간법 적용 완료
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <i className="fas fa-times-circle text-3xl text-red-600"></i>
                                <div>
                                    <div className="font-bold text-red-800">✗ 복원 실패</div>
                                    <div className="text-sm text-red-600 mt-1">
                                        최소 7개 Share 필요 (현재 {selectedCount}개)
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 핵심 특징 */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 text-center">
                    <i className="fas fa-crown text-3xl text-purple-600 mb-2"></i>
                    <div className="font-bold text-gov-text">Representative 노드</div>
                    <div className="text-xs text-gov-text-secondary mt-1">Layer 3 최종 검증</div>
                </div>
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-center">
                    <i className="fas fa-key text-3xl text-blue-600 mb-2"></i>
                    <div className="font-bold text-gov-text">Shamir 비밀 분산</div>
                    <div className="text-xs text-gov-text-secondary mt-1">n=10, k=7 안전한 키 관리</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                    <i className="fas fa-shield-alt text-3xl text-green-600 mb-2"></i>
                    <div className="font-bold text-gov-text">Byzantine 내성</div>
                    <div className="text-xs text-gov-text-secondary mt-1">f=3, 7-of-10 합의</div>
                </div>
            </div>
        </div>
    );
};
