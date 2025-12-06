const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-violet-50 border-l-4 border-violet-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 정보는 
                    <a href="https://ethics.na.go.kr" target="_blank" className="text-violet-600 hover:underline ml-1">윤리특별위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (15개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-violet-900">위원 노드 (15개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 비위 조사 기록 동기화</li>
                                <li>• 징계 의결 분산 저장</li>
                                <li>• 재산 변동 검증 기록</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">특징</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 타 위원회와 독립적 운영</li>
                                <li>• 최고 수준 보안</li>
                                <li>• 비공개 심사 지원</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 징계 사건 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-violet-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">비위 제보 접수</div>
                                <div className="text-xs text-gray-600">국민·언론 → OpenHash 암호화 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.21초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 사실관계 검증</div>
                                <div className="text-xs text-gray-600">재산 변동, 이해충돌, 품위 유지 자동 분석</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">2.7초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">⚖️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 징계 의결</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 73.4% → 징계 확정</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">15개 노드 동시 저장 → 공개 가능 범위만</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.6초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-violet-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-violet-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-violet-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
