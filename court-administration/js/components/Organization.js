const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-teal-50 border-l-4 border-teal-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 법원 사법행정 총괄 기관 
                    <a href="https://www.scourt.go.kr" target="_blank" className="text-teal-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (10개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-teal-900">4실 노드</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 기획조정실 (예산, 시설)</li>
                                <li>• 사법지원실 (재판제도)</li>
                                <li>• 사법정보화실 (IT)</li>
                                <li>• 행정관리실 (계약, 재무)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-cyan-900">2국 + 4심의관 노드</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 사법등기국 (등기, 공탁)</li>
                                <li>• 재판사무국 (사건 접수)</li>
                                <li>• 인사총괄/운영심의관</li>
                                <li>• 공보관, 안전관리관</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 행정 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-teal-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">각급 법원 행정 데이터 수집</div>
                                <div className="text-xs text-gray-600">예산, 인사, 시설, 통계 → OpenHash</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.12초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-cyan-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 분석 및 최적화</div>
                                <div className="text-xs text-gray-600">예산 편성, 인사 배치, 통계 생성</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">2.4초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded">
                            <span className="text-2xl">👨‍💼</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">처장 승인</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 88.3% → 결재</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">10개 노드 저장 → 각급 법원 배포</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.4초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-teal-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-teal-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-teal-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
