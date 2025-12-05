const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 및 소관 기관 정보는 
                    <a href="https://steering.na.go.kr" target="_blank" className="text-blue-600 hover:underline ml-1">국회운영위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (18개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-blue-900">위원 노드 (18개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 실시간 의사록 동기화</li>
                                <li>• 투표 결과 분산 저장</li>
                                <li>• 개인키로 서명/검증</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (6개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 국회사무처 마스터 노드</li>
                                <li>• 대통령실 연동 노드</li>
                                <li>• 국가인권위 감사 노드</li>
                                <li>• NDR 통합 노드</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">입력</div>
                                <div className="text-xs text-gray-600">의안, 예산안, 투표 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.21초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">🔗</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">분산</div>
                                <div className="text-xs text-gray-600">24개 노드 동시 저장 → 합의 알고리즘</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.18초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">✓</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">검증</div>
                                <div className="text-xs text-gray-600">CRYSTALS-Dilithium 서명 검증</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.23초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">출력</div>
                                <div className="text-xs text-gray-600">본회의 전송, NDR 동기화, 공개</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">즉시</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-cyan-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-cyan-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-cyan-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
