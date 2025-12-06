const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 국회도서관은 입법 지원 기관으로 
                    <a href="https://www.nanet.go.kr" target="_blank" className="text-blue-600 hover:underline ml-1">공식 홈페이지</a>에서 상세 정보를 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (5개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-blue-900">부서 노드 (5개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 자료수집과 (장서 4.8M권)</li>
                                <li>• 디지털정보과 (디지털화)</li>
                                <li>• 입법정보서비스과 (의원 지원)</li>
                                <li>• 조사분석과 (입법 동향)</li>
                                <li>• 국제협력과 (해외 자료)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">주요 기능</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 입법 자료 4.8M건 제공</li>
                                <li>• AI 기반 자료 검색</li>
                                <li>• 해외 입법례 분석</li>
                                <li>• 의원 연구 지원</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 자료 검색 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">검색 요청</div>
                                <div className="text-xs text-gray-600">의원·보좌진 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.16초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 자료 추천</div>
                                <div className="text-xs text-gray-600">의도 분석, 관련 자료 4.8M건 검색</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">2.1초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">📚</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">사서 검토</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 85.3% → 최종 제공</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">5개 노드 동시 저장 → 이용 통계</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.4초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-blue-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-blue-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-blue-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
