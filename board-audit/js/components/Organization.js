const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 국가 회계검사·직무감찰 독립기관 
                    <a href="https://www.bai.go.kr" target="_blank" className="text-emerald-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (15개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-emerald-900">감사위원회의 (7개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 감사원장 (부총리급)</li>
                                <li>• 감사위원 6명 (차관급)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">사무처 노드 (8개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 회계검사 5국</li>
                                <li>• 직무감찰 2국</li>
                                <li>• 지역센터 (대전 등)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 감사 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">감사 대상 수집</div>
                                <div className="text-xs text-gray-600">국가기관·지방자치단체·공기업 회계 → OpenHash</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.09초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 이상 탐지</div>
                                <div className="text-xs text-gray-600">회계 부정, 공무원 비위 자동 감지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">1.8초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-teal-50 p-3 rounded">
                            <span className="text-2xl">👨‍💼</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">감사위원회의 의결</div>
                                <div className="text-xs text-gray-600">7인 감사위원 합의제 심의</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-emerald-100 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">15개 노드 저장 → 대통령·국회 보고</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.2초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-emerald-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-emerald-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-emerald-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
