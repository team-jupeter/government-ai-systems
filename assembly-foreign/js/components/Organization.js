const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 정보는 
                    <a href="https://foreign.na.go.kr" target="_blank" className="text-green-600 hover:underline ml-1">외교통일위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (18개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">위원 노드 (16개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 조약 비준 동의 기록</li>
                                <li>• 대북 정책 의결 동기화</li>
                                <li>• 외교 문서 열람 이력</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-blue-900">기관 노드 (2개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 외교부 조약 DB</li>
                                <li>• 통일부 대북 지원 추적</li>
                                <li>• NDR 통합 노드</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 조약 비준 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">조약 체결 보고</div>
                                <div className="text-xs text-gray-600">외교부 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.18초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 조약 분석</div>
                                <div className="text-xs text-gray-600">국익 영향, 법적 충돌, 이행 가능성 평가</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">1.9초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">🗳️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 비준 동의</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 68.4% → 최종 의사결정</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">18개 노드 동시 저장 → 국민 열람</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.5초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-green-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-green-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-green-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
