const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 대법원은 대한민국 최고 사법기관으로 
                    <a href="https://www.scourt.go.kr" target="_blank" className="text-purple-600 hover:underline ml-1">공식 홈페이지</a>에서 상세 정보를 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (15개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-purple-900">대법관 노드 (14개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 대법관 개인 노드 운영</li>
                                <li>• 판결 기록 분산 저장</li>
                                <li>• 평의 내용 암호화</li>
                                <li>• 판례 검색 동기화</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">사무국 노드 (1개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 판결문 8.4M건 관리</li>
                                <li>• 사건 접수 처리</li>
                                <li>• 재판 일정 관리</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 판결 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">상고 접수</div>
                                <div className="text-xs text-gray-600">하급심 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.13초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 판례 분석</div>
                                <div className="text-xs text-gray-600">유사 판례 8.4M건 검색, 쟁점 자동 정리</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">2.8초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-fuchsia-50 p-3 rounded">
                            <span className="text-2xl">⚖️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">대법관 심리</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 76.4% → 판결 선고</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">15개 노드 동시 저장 → 국민 열람</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.5초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-purple-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-purple-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-purple-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
