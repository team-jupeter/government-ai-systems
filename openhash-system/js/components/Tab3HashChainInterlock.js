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
                <h4 className="text-2xl font-bold text-gov-text mb-3">Merkle Tree 기반 해시 체인 연동</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    Merkle Tree를 통해 대량의 트랜잭션을 효율적으로 집약하고,
                    하향식 검증과 상향식 감시를 통해 계층 간 데이터 무결성을 양방향으로 검증합니다.
                    BLS 서명과 Merkle Proof를 활용하여 개별 데이터의 진위를 확인하며,
                    패킷 크기를 최소화하여 대역폭을 90% 절감합니다.
                </p>
            </div>

            {/* Merkle Tree 구조 상세 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-tree mr-3"></i>
                        Merkle Tree 구조 및 집약 메커니즘
                    </h4>
                </div>
                <div className="p-6">
                    {/* 시각적 Merkle Tree */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="text-center mb-6">
                            <div className="inline-block bg-purple-100 border-2 border-purple-600 rounded-lg px-6 py-3">
                                <div className="text-sm text-purple-700 font-bold mb-1">Merkle Root</div>
                                <div className="font-mono text-xs text-purple-900">d7e2b9a4c1f8...</div>
                                <div className="text-xs text-purple-600 mt-1">32 bytes</div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-12 mb-6">
                            <div className="text-center">
                                <div className="w-2 h-12 bg-purple-300 mx-auto mb-2"></div>
                                <div className="bg-blue-100 border-2 border-blue-500 rounded-lg px-4 py-2">
                                    <div className="text-xs font-bold text-blue-700">Branch A</div>
                                    <div className="font-mono text-xs">a1b2c3...</div>
                                    <div className="text-xs text-blue-600">32 bytes</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="w-2 h-12 bg-purple-300 mx-auto mb-2"></div>
                                <div className="bg-blue-100 border-2 border-blue-500 rounded-lg px-4 py-2">
                                    <div className="text-xs font-bold text-blue-700">Branch B</div>
                                    <div className="font-mono text-xs">d4e5f6...</div>
                                    <div className="text-xs text-blue-600">32 bytes</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {['Leaf 1', 'Leaf 2', 'Leaf 3', 'Leaf 4'].map((leaf, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="w-2 h-12 bg-blue-300 mx-auto mb-2"></div>
                                    <div className="bg-green-100 border-2 border-green-500 rounded-lg px-3 py-2">
                                        <div className="text-xs font-bold text-green-700">{leaf}</div>
                                        <div className="font-mono text-xs">hash...</div>
                                        <div className="text-xs text-green-600">32 bytes</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                        <h6 className="font-bold text-blue-900 mb-2">📊 Merkle Proof 검증 원리</h6>
                        <p className="text-sm text-gov-text-secondary mb-2">
                            특정 문서의 무결성을 검증하기 위해 형제 해시(Sibling Hash)만 전송하여 Merkle Root를 재계산합니다.
                        </p>
                        <div className="text-xs text-gov-text-secondary space-y-1">
                            <p>• Leaf 1 검증: Branch B + Leaf 2의 해시만 필요 → 64 bytes</p>
                            <p>• 전체 데이터 전송 불필요 → 대역폭 90% 이상 절감</p>
                            <p>• log₂(N) 복잡도: 1,000,000개 문서도 20개 해시면 검증 가능</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 패킷 크기 비교 테이블 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-orange-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-box mr-3"></i>
                        트랜잭션 패킷 구조 및 크기
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gov-border bg-gray-50">
                                <th className="text-left px-6 py-3 font-bold text-gov-text">구성 요소</th>
                                <th className="text-right px-6 py-3 font-bold text-gov-text">크기</th>
                                <th className="text-left px-6 py-3 font-bold text-gov-text">설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gov-text">문서 해시</td>
                                <td className="text-right px-6 py-3 font-mono">32 B</td>
                                <td className="px-6 py-3 text-gov-text-secondary">SHA-256 해시값</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gov-text">타임스탬프</td>
                                <td className="text-right px-6 py-3 font-mono">8 B</td>
                                <td className="px-6 py-3 text-gov-text-secondary">Unix timestamp (밀리초)</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gov-text">Merkle Path</td>
                                <td className="text-right px-6 py-3 font-mono">32B × log₂N</td>
                                <td className="px-6 py-3 text-gov-text-secondary">형제 해시 경로 (평균 5-7개)</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gov-text">BLS 서명</td>
                                <td className="text-right px-6 py-3 font-mono">48 B</td>
                                <td className="px-6 py-3 text-gov-text-secondary">집약 가능한 짧은 서명</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gov-text">메타데이터</td>
                                <td className="text-right px-6 py-3 font-mono">1 B</td>
                                <td className="px-6 py-3 text-gov-text-secondary">버전, 플래그 등</td>
                            </tr>
                            <tr className="border-b border-gov-border bg-green-50">
                                <td className="px-6 py-3 font-bold text-gov-text">기본 패킷 합계</td>
                                <td className="text-right px-6 py-3 font-mono font-bold text-green-700">121 B</td>
                                <td className="px-6 py-3 text-gov-text-secondary font-bold">표준 트랜잭션</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-3 font-medium text-gov-text">CRYSTALS-Dilithium</td>
                                <td className="text-right px-6 py-3 font-mono">2,420 B</td>
                                <td className="px-6 py-3 text-gov-text-secondary">포스트퀀텀 서명 (선택)</td>
                            </tr>
                            <tr className="bg-blue-50">
                                <td className="px-6 py-3 font-bold text-gov-text">PQ 패킷 합계</td>
                                <td className="text-right px-6 py-3 font-mono font-bold text-blue-700">2,493 B</td>
                                <td className="px-6 py-3 text-gov-text-secondary font-bold">양자 내성 옵션</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gov-border">
                    <p className="text-sm text-gov-text-secondary">
                        <strong>참고:</strong> 대부분의 트랜잭션은 121B 기본 패킷 사용. 포스트퀀텀 서명은 고보안 요구 시에만 선택적 적용
                    </p>
                </div>
            </div>

            {/* 대역폭 절감 메커니즘 */}
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                    <i className="fas fa-chart-line text-amber-600 text-3xl mt-1"></i>
                    <div>
                        <h5 className="text-lg font-bold text-amber-900 mb-3">대역폭 90% 절감 메커니즘</h5>
                        <div className="space-y-3">
                            <div className="bg-white rounded p-4 border border-amber-300">
                                <div className="font-bold text-gov-text mb-2">전통 블록체인 방식</div>
                                <div className="text-sm text-gov-text-secondary">
                                    • 전체 블록 데이터 전송: 수백 KB ~ 수 MB<br/>
                                    • 10,000개 트랜잭션 × 250 bytes = 2.5 MB<br/>
                                    • 모든 노드가 전체 블록 다운로드
                                </div>
                            </div>
                            <div className="bg-white rounded p-4 border border-amber-300">
                                <div className="font-bold text-green-700 mb-2">오픈해시 방식</div>
                                <div className="text-sm text-gov-text-secondary">
                                    • Merkle Root만 전송: 32 bytes<br/>
                                    • 개별 검증 시 Merkle Path만 전송: 121 bytes<br/>
                                    • <strong>절감율: 99.995%</strong> (2.5 MB → 121 B)
                                </div>
                            </div>
                            <div className="bg-green-100 rounded p-4 border border-green-400">
                                <div className="text-sm font-bold text-green-800">
                                    ✓ 결과: 10,000개 트랜잭션을 32 바이트로 요약하여 전송
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 양방향 검증 구조 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border-2 border-blue-500 rounded-lg p-6 bg-blue-50">
                    <h5 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-arrow-down"></i>
                        하향식 검증 모듈
                    </h5>
                    <div className="space-y-3 text-sm text-gov-text">
                        <div className="bg-white rounded p-3 border border-blue-300">
                            <div className="font-bold mb-1">Layer 4 (국가) → Layer 3 (광역시도)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • Merkle Root 전달<br/>
                                • BLS 서명으로 무결성 검증<br/>
                                • Merkle Path로 개별 데이터 검증
                            </div>
                        </div>
                        <div className="bg-white rounded p-3 border border-blue-300">
                            <div className="font-bold mb-1">Layer 3 (광역시도) → Layer 2 (시군구)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • 집약된 Merkle Root 하위 전달<br/>
                                • 지역별 데이터 무결성 검증<br/>
                                • Representative 노드가 검증 주도
                            </div>
                        </div>
                        <div className="bg-white rounded p-3 border border-blue-300">
                            <div className="font-bold mb-1">Layer 2 (시군구) → Layer 1 (읍면동)</div>
                            <div className="text-xs text-gov-text-secondary">
                                • 최하위 계층까지 검증 체인 전파<br/>
                                • 트랜잭션 패킷 단위 검증<br/>
                                • 121 바이트 경량 패킷
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-2 border-orange-500 rounded-lg p-6 bg-orange-50">
                    <h5 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-arrow-up"></i>
                        상향식 감시 모듈
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
                                • 검증 실패 시 즉시 차단
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
                                <div className="font-bold text-gov-text">검증 완료</div>
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
                    <div className="font-bold text-gov-text">BLS 서명</div>
                    <div className="text-xs text-gov-text-secondary mt-1">집약 가능한 짧은 서명 (48B)</div>
                </div>
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
                    <i className="fas fa-tree text-3xl text-green-600 mb-2"></i>
                    <div className="font-bold text-gov-text">Merkle Proof</div>
                    <div className="text-xs text-gov-text-secondary mt-1">효율적 데이터 검증 (121B)</div>
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
