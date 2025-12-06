const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 전국 6개 고등법원 통합 관리 시스템 
                    <a href="https://www.scourt.go.kr" target="_blank" className="text-blue-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (13개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-blue-900">고등법원 노드 (6개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 서울고등법원</li>
                                <li>• 수원고등법원</li>
                                <li>• 대전고등법원</li>
                                <li>• 대구고등법원</li>
                                <li>• 부산고등법원</li>
                                <li>• 광주고등법원</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-cyan-900">원외재판부 노드 (7개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 춘천, 청주, 창원</li>
                                <li>• 전주, 제주, 인천, 울산</li>
                                <li>• 지역 접근성 향상</li>
                                <li>• 항소심 분산 처리</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 항소심 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">항소 접수</div>
                                <div className="text-xs text-gray-600">지방법원 1심 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.14초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-cyan-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 쟁점 분석</div>
                                <div className="text-xs text-gray-600">1심 판결 검토, 항소 이유 추출, 유사 판례 검색</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">3.1초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded">
                            <span className="text-2xl">⚖️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">판사 3인 합의부 심리</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 81.3% → 항소심 판결</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">13개 노드 동시 저장 → 국민 열람</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.6초</span>
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
