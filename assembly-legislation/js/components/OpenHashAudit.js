const OpenHashAudit = () => {
    const auditRecords = [
        { id: 1, type: '법안 심사', hash: '0x7a3f9c...', timestamp: '2025-12-06 09:45:12', verified: true },
        { id: 2, type: '체계자구 수정', hash: '0x8b2e4d...', timestamp: '2025-12-06 09:23:45', verified: true },
        { id: 3, type: '위원회 의결', hash: '0x1c5a7f...', timestamp: '2025-12-06 08:17:33', verified: true },
        { id: 4, type: '탄핵 소추', hash: '0x9d4b2a...', timestamp: '2025-12-05 16:42:18', verified: true }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">✓ OpenHash 감사 추적</h2>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-green-900 text-xl">🔒 블록체인 무결성: 정상</p>
                        <p className="text-sm text-gray-700 mt-2">전체 1,847건 법안 심사 트랜잭션 검증 완료</p>
                        <p className="text-xs text-gray-600 mt-1">마지막 검증: 2025-12-06 09:47:15 KST</p>
                    </div>
                    <div className="text-5xl">✅</div>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <StatCard title="검증된 법안" value="1,847건" icon="⚖️" />
                <StatCard title="체계자구 수정" value="3,241건" icon="✏️" />
                <StatCard title="위원회 의결" value="856건" icon="📋" />
                <StatCard title="Hash 블록" value="6,944블록" icon="🔗" />
            </div>

            <div className="bg-blue-50 p-5 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-4 text-blue-900">🔍 OpenHash 감사 특징</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-blue-800 mb-2">위변조 불가능</h4>
                        <p className="text-sm text-gray-700">
                            모든 법안 수정은 OpenHash 체인에 기록되며, 단 하나의 글자라도 변경 시 
                            Hash 값이 변경되어 즉시 탐지됩니다. 양자내성 암호(CRYSTALS-Dilithium)로 서명됩니다.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-blue-800 mb-2">투명한 이력 관리</h4>
                        <p className="text-sm text-gray-700">
                            법안의 발의부터 본회의 통과까지 모든 과정이 기록되며, 
                            국민 누구나 체계·자구 심사 과정을 열람할 수 있습니다.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-blue-800 mb-2">분산 저장</h4>
                        <p className="text-sm text-gray-700">
                            법사위 위원 18명 + 소관 기관 6개 = 총 24개 노드에 분산 저장되어
                            단일 장애 지점이 없으며, 데이터 손실이 불가능합니다.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-bold text-blue-800 mb-2">실시간 검증</h4>
                        <p className="text-sm text-gray-700">
                            매 트랜잭션마다 자동 검증이 수행되며, 이상 징후 발견 시
                            위원장 및 간사에게 즉시 알림이 전송됩니다.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-lg p-5 mb-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">📜 최근 감사 기록</h3>
                <div className="space-y-3">
                    {auditRecords.map(record => (
                        <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-3 h-3 rounded-full ${record.verified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{record.type}</p>
                                    <p className="text-xs text-gray-500 font-mono">{record.hash}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">{record.timestamp}</p>
                                    <p className="text-xs text-green-600 font-semibold">검증 완료</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 border-l-4 border-purple-600 p-5 rounded">
                    <h3 className="font-bold text-lg mb-3 text-purple-900">🔐 암호화 기술</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span><strong>CRYSTALS-Dilithium:</strong> 양자내성 전자서명 (NIST 표준)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span><strong>SHA-3 (Keccak):</strong> 해시 함수로 무결성 보장</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span><strong>AES-256:</strong> 데이터 암호화 (군사급 보안)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span><strong>Merkle Tree:</strong> 효율적 검증 구조</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded">
                    <h3 className="font-bold text-lg mb-3 text-orange-900">📊 감사 통계</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex justify-between">
                            <span>총 트랜잭션</span>
                            <strong className="text-orange-600">6,944건</strong>
                        </li>
                        <li className="flex justify-between">
                            <span>검증 성공률</span>
                            <strong className="text-green-600">100%</strong>
                        </li>
                        <li className="flex justify-between">
                            <span>평균 검증 시간</span>
                            <strong className="text-blue-600">0.23초</strong>
                        </li>
                        <li className="flex justify-between">
                            <span>위변조 시도 차단</span>
                            <strong className="text-red-600">0건</strong>
                        </li>
                        <li className="flex justify-between">
                            <span>분산 노드 수</span>
                            <strong className="text-purple-600">24개</strong>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-bold text-yellow-900 mb-2">💡 OpenHash의 법사위 적용 효과</h3>
                <p className="text-sm text-yellow-800">
                    법제사법위원회는 "국회의 상원"으로 불리며 모든 법안의 최종 관문입니다. 
                    OpenHash 기술로 체계·자구 심사 과정이 완전히 투명해져, 
                    "법사위에서 법안이 사라진다"는 비판을 원천 차단하고, 
                    법안 처리의 공정성과 신뢰성을 획기적으로 높였습니다.
                </p>
            </div>
        </div>
    );
};
