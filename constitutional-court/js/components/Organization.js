const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 헌법재판 전담 최고법원 
                    <a href="https://www.ccourt.go.kr" target="_blank" className="text-purple-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (13개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-purple-900">재판부 노드 (4개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 전원재판부 (재판관 9명)</li>
                                <li>• 지정재판부 1부 (3명)</li>
                                <li>• 지정재판부 2부 (3명)</li>
                                <li>• 지정재판부 3부 (3명)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-fuchsia-900">행정 노드 (9개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 사무처 (총무·심판·헌법연구관)</li>
                                <li>• 재판관회의</li>
                                <li>• 헌법재판연구원</li>
                                <li>• 도서관, 전산정보센터 등</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 심판 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">심판 청구 접수</div>
                                <div className="text-xs text-gray-600">위헌법률·탄핵·정당해산·권한쟁의·헌법소원 → OpenHash</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.11초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-fuchsia-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 사전 분석</div>
                                <div className="text-xs text-gray-600">쟁점 정리, 판례 검색, 위헌성 검토</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">3.2초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-pink-50 p-3 rounded">
                            <span className="text-2xl">⚖️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">재판관 심리</div>
                                <div className="text-xs text-gray-600">9인 전원재판부 or 3인 지정재판부 심리</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">13개 노드 저장 → 결정문 공개</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.3초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-6 rounded-lg">
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
