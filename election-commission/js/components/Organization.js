const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-sky-50 border-l-4 border-sky-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 선거·국민투표 관리 독립 헌법기관 
                    <a href="https://www.nec.go.kr" target="_blank" className="text-sky-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (3,771개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-sky-900">중앙 및 광역 노드 (18개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 중앙선거관리위원회 (1개)</li>
                                <li>• 시·도선거관리위원회 (17개)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-blue-900">기초 노드 (3,753개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 구·시·군선거관리위원회 (249개)</li>
                                <li>• 읍·면·동선거관리위원회 (3,504개)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 선거 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-sky-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">선거인명부 작성</div>
                                <div className="text-xs text-gray-600">각급 선관위 → OpenHash</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.10초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 부정 감시</div>
                                <div className="text-xs text-gray-600">선거법 위반, 불법 정치자금 자동 감지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">실시간</span>
                        </div>
                        <div className="flex items-center gap-3 bg-cyan-50 p-3 rounded">
                            <span className="text-2xl">🗳️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">투표·개표 관리</div>
                                <div className="text-xs text-gray-600">실시간 개표 검증, 이상 징후 탐지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.2초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">3,771개 노드 저장 → 투명한 선거 결과</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.3초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-sky-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-sky-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-sky-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
