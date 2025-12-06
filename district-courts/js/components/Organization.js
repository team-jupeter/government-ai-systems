const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 전국 18개 지방법원 본원 통합 관리 
                    <a href="https://www.scourt.go.kr" target="_blank" className="text-emerald-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (18개 본원)</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-emerald-900">수도권 (5개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 서울중앙지방법원</li>
                                <li>• 서울동부/남부/북부/서부</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">광역시 (6개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 인천, 수원, 대전</li>
                                <li>• 대구, 부산, 광주</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-teal-900">지방 (7개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 춘천, 청주, 전주</li>
                                <li>• 창원, 울산, 제주, 의정부</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 1심 재판 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">사건 접수</div>
                                <div className="text-xs text-gray-600">민사·형사·행정·가사 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.15초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 증거 분석</div>
                                <div className="text-xs text-gray-600">증거 자동 정리, 쟁점 추출, 관련 법리 검색</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">2.9초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-teal-50 p-3 rounded">
                            <span className="text-2xl">⚖️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">판사 재판 (단독/합의부)</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 79.8% → 1심 판결</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-lime-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">18개 노드 동시 저장 → 국민 열람</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.7초</span>
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
