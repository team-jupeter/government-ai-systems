const Tab4DataIntegrity = () => {
    const [selectedDoc, setSelectedDoc] = React.useState(null);
    const [verifying, setVerifying] = React.useState(false);
    const [verificationResult, setVerificationResult] = React.useState(null);

    const documents = [
        { id: 1, name: '제주시 건축허가 문서', hash: 'a3f5c8...', merkleRoot: 'd7e2b9...' },
        { id: 2, name: '서울시 예산안', hash: 'b2d4e1...', merkleRoot: 'd7e2b9...' },
        { id: 3, name: '부산시 조례안', hash: 'c9a1f3...', merkleRoot: 'd7e2b9...' }
    ];

    const verifyDocument = async (doc) => {
        setSelectedDoc(doc);
        setVerifying(true);
        setVerificationResult(null);

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setVerificationResult({
            status: 'success',
            statusCode: 600,
            merkleProofValid: true,
            hashMatch: true,
            timestamp: new Date().toISOString()
        });
        setVerifying(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">계층 간 상호 검증 메커니즘</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    하향식 검증과 상향식 감시를 통해 계층 간 데이터 무결성을 양방향으로 검증합니다.
                    상위 계층은 BLS 서명과 Merkle Proof로 하위 계층을 검증하고,
                    하위 계층은 이상 탐지 시 상위 계층과의 연결을 차단합니다.
                    검증 실패 시 자동으로 악성 노드를 격리하여 시스템 무결성을 보호합니다.
                </p>
            </div>

            {/* 검증 상태 코드 테이블 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-gov-blue text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-code mr-3"></i>
                        검증 상태 코드
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gov-border bg-gray-50">
                                <th className="text-center px-6 py-3 font-bold text-gov-text" style={{width: '100px'}}>코드</th>
                                <th className="text-left px-6 py-3 font-bold text-gov-text">상태명</th>
                                <th className="text-left px-6 py-3 font-bold text-gov-text">설명</th>
                                <th className="text-left px-6 py-3 font-bold text-gov-text">조치 사항</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gov-border hover:bg-gray-50 bg-green-50">
                                <td className="text-center px-6 py-4">
                                    <span className="inline-block px-3 py-1 bg-green-600 text-white rounded font-bold">600</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-green-700">검증 성공</td>
                                <td className="px-6 py-4 text-gov-text-secondary">모든 검증 항목 통과</td>
                                <td className="px-6 py-4 text-gov-text-secondary">정상 처리 계속</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50 bg-red-50">
                                <td className="text-center px-6 py-4">
                                    <span className="inline-block px-3 py-1 bg-red-600 text-white rounded font-bold">610</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-red-700">검증 실패</td>
                                <td className="px-6 py-4 text-gov-text-secondary">해시 불일치 또는 서명 실패</td>
                                <td className="px-6 py-4 text-gov-text-secondary">트랜잭션 거부, 상위 계층 보고</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50 bg-orange-50">
                                <td className="text-center px-6 py-4">
                                    <span className="inline-block px-3 py-1 bg-orange-600 text-white rounded font-bold">620</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-orange-700">노드 격리</td>
                                <td className="px-6 py-4 text-gov-text-secondary">악의적 노드 탐지</td>
                                <td className="px-6 py-4 text-gov-text-secondary">즉시 네트워크 차단, 주변 노드 알림</td>
                            </tr>
                            <tr className="hover:bg-gray-50 bg-blue-50">
                                <td className="text-center px-6 py-4">
                                    <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded font-bold">630</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-blue-700">노드 복구</td>
                                <td className="px-6 py-4 text-gov-text-secondary">격리 후 7일 모니터링 통과</td>
                                <td className="px-6 py-4 text-gov-text-secondary">네트워크 재참여 허용</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 오염 탐지 타임라인 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-red-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-clock mr-3"></i>
                        오염 탐지 및 격리 타임라인
                    </h4>
                </div>
                <div className="p-6">
                    <div className="relative">
                        {/* 타임라인 */}
                        <div className="space-y-6">
                            {/* 0ms */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-20 text-right">
                                    <span className="font-bold text-red-600">0ms</span>
                                </div>
                                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center border-2 border-red-500">
                                    <i className="fas fa-exclamation-triangle text-red-600"></i>
                                </div>
                                <div className="flex-1 bg-red-50 rounded-lg p-4 border border-red-300">
                                    <div className="font-bold text-red-800 mb-1">위변조 시도 발생</div>
                                    <div className="text-sm text-gov-text-secondary">악의적 노드가 데이터 해시 변조 시도</div>
                                </div>
                            </div>

                            {/* 1ms */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-20 text-right">
                                    <span className="font-bold text-orange-600">1ms</span>
                                </div>
                                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-500">
                                    <i className="fas fa-search text-orange-600"></i>
                                </div>
                                <div className="flex-1 bg-orange-50 rounded-lg p-4 border border-orange-300">
                                    <div className="font-bold text-orange-800 mb-1">크로스체크 탐지 (상향식 감시)</div>
                                    <div className="text-sm text-gov-text-secondary">하위 노드가 상위 노드의 이상 행동 감지</div>
                                </div>
                            </div>

                            {/* 3ms */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-20 text-right">
                                    <span className="font-bold text-yellow-600">3ms</span>
                                </div>
                                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-500">
                                    <i className="fas fa-tree text-yellow-600"></i>
                                </div>
                                <div className="flex-1 bg-yellow-50 rounded-lg p-4 border border-yellow-300">
                                    <div className="font-bold text-yellow-800 mb-1">Merkle Proof 검증 실패</div>
                                    <div className="text-sm text-gov-text-secondary">형제 해시로 Root 재계산 시 불일치 확인 (상태 코드: 610)</div>
                                </div>
                            </div>

                            {/* 5ms */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-20 text-right">
                                    <span className="font-bold text-purple-600">5ms</span>
                                </div>
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-500">
                                    <i className="fas fa-ban text-purple-600"></i>
                                </div>
                                <div className="flex-1 bg-purple-50 rounded-lg p-4 border border-purple-300">
                                    <div className="font-bold text-purple-800 mb-1">악성 노드 격리 완료 (상태 코드: 620)</div>
                                    <div className="text-sm text-gov-text-secondary">해당 노드와 모든 연결 차단, 주변 노드에 경고 전파</div>
                                </div>
                            </div>

                            {/* 즉시 */}
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-20 text-right">
                                    <span className="font-bold text-blue-600">즉시</span>
                                </div>
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-500">
                                    <i className="fas fa-sync text-blue-600"></i>
                                </div>
                                <div className="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-300">
                                    <div className="font-bold text-blue-800 mb-1">상위 계층 보고 및 네트워크 재구성</div>
                                    <div className="text-sm text-gov-text-secondary">Layer 3, Layer 4에 사고 보고, 라우팅 테이블 자동 업데이트</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-green-50 border border-green-300 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-800">
                            <i className="fas fa-check-circle text-xl"></i>
                            <span className="text-sm font-bold">
                                전체 프로세스: 0ms → 5ms (5밀리초 이내 격리 완료)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하향식 vs 상향식 상세 비교 */}
            <div className="bg-white rounded-lg shadow-sm border border-gov-border overflow-hidden mb-8">
                <div className="bg-purple-600 text-white px-6 py-4">
                    <h4 className="text-lg font-bold flex items-center">
                        <i className="fas fa-arrows-alt-v mr-3"></i>
                        하향식 검증 vs 상향식 감시 비교
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-gov-border bg-gray-50">
                                <th className="text-left px-6 py-3 font-bold text-gov-text">항목</th>
                                <th className="text-left px-6 py-3 font-bold text-gov-text">하향식 검증</th>
                                <th className="text-left px-6 py-3 font-bold text-gov-text">상향식 감시</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">방향</td>
                                <td className="px-6 py-4 text-gov-text-secondary">상위 → 하위</td>
                                <td className="px-6 py-4 text-gov-text-secondary">하위 → 상위</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">검증 대상</td>
                                <td className="px-6 py-4 text-gov-text-secondary">
                                    • BLS 서명<br/>
                                    • Merkle Proof<br/>
                                    • 타임스탬프 (±5분 범위)
                                </td>
                                <td className="px-6 py-4 text-gov-text-secondary">
                                    • 이상 패턴<br/>
                                    • 응답 지연<br/>
                                    • 서명 실패율
                                </td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">조치</td>
                                <td className="px-6 py-4 text-gov-text-secondary">즉시 격리 (상태 코드: 620)</td>
                                <td className="px-6 py-4 text-gov-text-secondary">연결 차단 및 보고</td>
                            </tr>
                            <tr className="border-b border-gov-border hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">알고리즘</td>
                                <td className="px-6 py-4 text-gov-text-secondary">PBFT 합의 기반</td>
                                <td className="px-6 py-4 text-gov-text-secondary">Isolation Forest (이상 탐지)</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gov-text">특징</td>
                                <td className="px-6 py-4 text-gov-text-secondary">암호학적 무결성 보장</td>
                                <td className="px-6 py-4 text-gov-text-secondary">행동 패턴 분석</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Merkle Tree 구조 설명 */}
            <div className="bg-gov-gray rounded-lg p-6 mb-8 border border-gov-border">
                <h5 className="font-bold text-gov-text mb-4">Merkle Tree 구조</h5>
                <div className="bg-white rounded-lg p-6">
                    <div className="text-center mb-6">
                        <div className="inline-block bg-purple-100 border-2 border-purple-600 rounded-lg px-6 py-3">
                            <div className="text-sm text-purple-700 font-bold mb-1">Merkle Root</div>
                            <div className="font-mono text-xs text-purple-900">d7e2b9a4c1f8...</div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-8 mb-6">
                        <div className="text-center">
                            <div className="w-2 h-8 bg-purple-300 mx-auto mb-2"></div>
                            <div className="bg-blue-100 border border-blue-500 rounded px-4 py-2">
                                <div className="text-xs font-bold text-blue-700">Branch A</div>
                                <div className="font-mono text-xs">a1b2c3...</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="w-2 h-8 bg-purple-300 mx-auto mb-2"></div>
                            <div className="bg-blue-100 border border-blue-500 rounded px-4 py-2">
                                <div className="text-xs font-bold text-blue-700">Branch B</div>
                                <div className="font-mono text-xs">d4e5f6...</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {['Doc1', 'Doc2', 'Doc3', 'Doc4'].map((doc, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-2 h-8 bg-blue-300 mx-auto mb-2"></div>
                                <div className="bg-green-100 border border-green-500 rounded px-3 py-2">
                                    <div className="text-xs font-bold text-green-700">{doc}</div>
                                    <div className="font-mono text-xs">hash...</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-gov-text-secondary mt-4">
                    트랜잭션 패킷은 121바이트(기본) 또는 2,493바이트(포스트퀀텀 서명 포함)로 구성됩니다.
                </p>
            </div>

            {/* 문서 검증 시뮬레이터 */}
            <div className="bg-white rounded-lg p-6 border border-gov-border mb-8">
                <h5 className="font-bold text-gov-text mb-4">문서 무결성 검증 시뮬레이터</h5>
                
                <div className="space-y-3 mb-6">
                    {documents.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-gov-gray rounded border border-gov-border">
                            <div className="flex-1">
                                <div className="font-bold text-gov-text">{doc.name}</div>
                                <div className="text-xs text-gov-text-secondary">
                                    문서 해시: <span className="font-mono">{doc.hash}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => verifyDocument(doc)}
                                disabled={verifying}
                                className="px-4 py-2 bg-gov-blue text-white rounded font-bold hover:bg-gov-blue-light disabled:opacity-50"
                            >
                                검증
                            </button>
                        </div>
                    ))}
                </div>

                {/* 검증 결과 */}
                {verifying && (
                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 text-center">
                        <i className="fas fa-spinner fa-spin text-3xl text-blue-600 mb-3"></i>
                        <div className="font-bold text-blue-800">검증 중...</div>
                        <div className="text-sm text-blue-600 mt-2">Merkle Proof 확인 중</div>
                    </div>
                )}

                {verificationResult && !verifying && (
                    <div className={`border-2 rounded-lg p-6 ${
                        verificationResult.status === 'success' 
                            ? 'bg-green-50 border-green-500' 
                            : 'bg-red-50 border-red-500'
                    }`}>
                        <div className="flex items-center gap-3 mb-4">
                            <i className={`fas fa-check-circle text-4xl ${
                                verificationResult.status === 'success' ? 'text-green-600' : 'text-red-600'
                            }`}></i>
                            <div>
                                <div className="text-xl font-bold text-gov-text">
                                    검증 완료 (상태 코드: {verificationResult.statusCode})
                                </div>
                                <div className="text-sm text-gov-text-secondary">{selectedDoc.name}</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-white rounded">
                                <span className="text-sm font-medium">Merkle Proof 검증:</span>
                                <span className="text-green-700 font-bold">✓ 유효</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded">
                                <span className="text-sm font-medium">해시값 일치:</span>
                                <span className="text-green-700 font-bold">✓ 일치</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white rounded">
                                <span className="text-sm font-medium">검증 시각:</span>
                                <span className="text-gov-text-secondary text-sm font-mono">{verificationResult.timestamp}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 검증 프로세스 */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
                    <h5 className="font-bold text-blue-800 mb-4">📥 데이터 등록</h5>
                    <ol className="space-y-2 text-sm text-gov-text">
                        <li>1. 문서 해시값 생성</li>
                        <li>2. Layer에 트랜잭션 패킷 전송</li>
                        <li>3. Merkle Tree 업데이트</li>
                        <li>4. Merkle Root 상위 계층 전파</li>
                        <li>5. BLS 서명 추가</li>
                    </ol>
                </div>

                <div className="bg-green-50 border border-green-300 rounded-lg p-6">
                    <h5 className="font-bold text-green-800 mb-4">✅ 데이터 검증</h5>
                    <ol className="space-y-2 text-sm text-gov-text">
                        <li>1. 문서 해시값 재계산</li>
                        <li>2. Merkle Path 요청</li>
                        <li>3. Merkle Root까지 경로 검증</li>
                        <li>4. BLS 서명 확인</li>
                        <li>5. 검증 성공(600) 또는 실패(610)</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};
