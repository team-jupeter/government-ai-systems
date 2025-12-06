const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 정보는 
                    <a href="https://intelligence.na.go.kr" target="_blank" className="text-indigo-600 hover:underline ml-1">정보위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (14개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-indigo-900">위원 노드 (12개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 정보 활동 감독 기록</li>
                                <li>• 기밀비 심사 동기화</li>
                                <li>• 보안 법안 의결 저장</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (2개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 국가정보원 암호화 노드</li>
                                <li>• 국방정보본부 보안 노드</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 정보 활동 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">정보 활동 보고</div>
                                <div className="text-xs text-gray-600">국정원 → OpenHash 암호화 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.19초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 적법성 검토</div>
                                <div className="text-xs text-gray-600">권한 위반, 불법 감청 자동 탐지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">2.3초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">🛡️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 비공개 심사</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 84.3% → 승인/불승인</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 저장</div>
                                <div className="text-xs text-gray-600">14개 노드 동시 저장 → 기밀 유지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.6초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-indigo-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-indigo-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-indigo-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
