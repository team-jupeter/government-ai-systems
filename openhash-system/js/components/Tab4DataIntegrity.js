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
            merkleProofValid: true,
            hashMatch: true,
            timestamp: new Date().toISOString()
        });
        setVerifying(false);
    };

    return (
        <div>
            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">데이터 진실성 검증 메커니즘</h4>
                <p className="text-gov-text-secondary leading-relaxed mb-4">
                    Merkle Tree 동기화 모듈(330)을 통해 대량의 트랜잭션을 효율적으로 집약하고,
                    Merkle Root(410)와 Merkle Path(440)를 사용하여 개별 문서의 무결성을 검증합니다.
                </p>
            </div>

            {/* Merkle Tree 구조 설명 */}
            <div className="bg-gov-gray rounded-lg p-6 mb-8 border border-gov-border">
                <h5 className="font-bold text-gov-text mb-4">Merkle Tree 구조 (도면 330)</h5>
                <div className="bg-white rounded-lg p-6">
                    <div className="text-center mb-6">
                        <div className="inline-block bg-purple-100 border-2 border-purple-600 rounded-lg px-6 py-3">
                            <div className="text-sm text-purple-700 font-bold mb-1">Merkle Root (410)</div>
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
                    트랜잭션 패킷(430)은 121바이트(기본) 또는 137바이트(포스트퀀텀 서명 포함)로 구성됩니다.
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
                                <div className="text-xl font-bold text-gov-text">검증 완료 (600)</div>
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
                        <li>1. 문서 해시값(400) 생성</li>
                        <li>2. Layer에 트랜잭션 패킷(430) 전송</li>
                        <li>3. Merkle Tree 업데이트</li>
                        <li>4. Merkle Root(410) 상위 계층 전파</li>
                        <li>5. BLS 서명(420) 추가</li>
                    </ol>
                </div>

                <div className="bg-green-50 border border-green-300 rounded-lg p-6">
                    <h5 className="font-bold text-green-800 mb-4">✅ 데이터 검증</h5>
                    <ol className="space-y-2 text-sm text-gov-text">
                        <li>1. 문서 해시값 재계산</li>
                        <li>2. Merkle Path(440) 요청</li>
                        <li>3. Merkle Root까지 경로 검증</li>
                        <li>4. BLS 서명 확인</li>
                        <li>5. 검증 성공(600) 또는 실패(610)</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};
