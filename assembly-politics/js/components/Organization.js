const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 및 소관 기관 정보는 
                    <a href="https://policy.na.go.kr" target="_blank" className="text-blue-600 hover:underline ml-1">정무위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (31개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-blue-900">위원 노드 (24개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 금융감독 조치 실시간 동기화</li>
                                <li>• 공정거래 제재 분산 저장</li>
                                <li>• 개인정보 보호 이력 기록</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (7개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 금융위원회 거래 데이터</li>
                                <li>• 공정거래위원회 제재 DB</li>
                                <li>• 개인정보보호위원회 감독</li>
                                <li>• 국민권익위원회 민원 처리</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 감독 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">금융거래 데이터 수신</div>
                                <div className="text-xs text-gray-600">실시간 거래 빅데이터 → AI 이상징후 탐지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">실시간</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 자동 분석</div>
                                <div className="text-xs text-gray-600">담합·카르텔 검출, 개인정보 유출 감지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.8초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">👨‍💼</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 최종 결정</div>
                                <div className="text-xs text-gray-600">과징금, 시정명령 등 제재 조치</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 기록</div>
                                <div className="text-xs text-gray-600">31개 노드 동시 저장 → 투명성 확보</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.5초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-blue-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-blue-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-blue-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
