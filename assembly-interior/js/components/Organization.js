const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 정보는 
                    <a href="https://safety.na.go.kr" target="_blank" className="text-orange-600 hover:underline ml-1">행정안전위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (21개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-orange-900">위원 노드 (18개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 재난 대응 의결 동기화</li>
                                <li>• 지방자치법 개정 기록</li>
                                <li>• 경찰법 심사 분산 저장</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (3개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 행정안전부 재난 관리</li>
                                <li>• 소방청 화재 대응 DB</li>
                                <li>• 경찰청 치안 활동</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 재난 대응 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-orange-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">재난 발생 보고</div>
                                <div className="text-xs text-gray-600">행안부 → OpenHash 실시간 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.17초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 재난 분석</div>
                                <div className="text-xs text-gray-600">피해 규모, 긴급도, 자원 배분 자동 평가</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">1.7초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">🚨</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 긴급 의결</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 79.3% → 특별재난지역 선포</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">21개 노드 동시 저장 → 국민 실시간 확인</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.4초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-orange-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-orange-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-orange-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
