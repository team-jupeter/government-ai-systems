const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 단층제 특별자치도 (기초자치단체 없음)
                    <a href="https://www.jeju.go.kr" target="_blank" className="text-orange-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (15개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-orange-900">도청 및 행정시 (3개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 제주특별자치도청 (본청)</li>
                                <li>• 제주시 (행정시)</li>
                                <li>• 서귀포시 (행정시)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">읍면 노드 (12개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 7개 읍 (애월읍, 구좌읍, 조천읍, 한림읍 등)</li>
                                <li>• 5개 면 (한경면, 추자면, 우도면 등)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 행정 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-orange-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">민원 접수</div>
                                <div className="text-xs text-gray-600">43개 읍면동 → OpenHash 블록체인</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.11초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 자동 처리</div>
                                <div className="text-xs text-gray-600">관광·감귤·환경 데이터 분석, 행정 자동화</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">2.4초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">👨‍💼</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">도지사·행정시장 결재</div>
                                <div className="text-xs text-gray-600">중요 사안 인간 검토 (AI 권고 참고율 91.3%)</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">15개 노드 저장 → 투명한 행정</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.3초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
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
