const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 대전 소재 전국 단일 관할 전문법원 
                    <a href="https://patent.scourt.go.kr" target="_blank" className="text-orange-600 hover:underline ml-1">공식 홈페이지</a>
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (5개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-orange-900">재판부 노드 (4개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 제1부 (심결취소)</li>
                                <li>• 제2부 (심결취소)</li>
                                <li>• 제3부 (침해소송)</li>
                                <li>• 제4부 (침해소송)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-amber-900">행정 노드 (1개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 사무과 (사건 접수)</li>
                                <li>• 기술심리관실</li>
                                <li>• 특허청 연계</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 특허소송 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-orange-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">사건 접수</div>
                                <div className="text-xs text-gray-600">특허심판원 심결 / 침해소송 항소 → OpenHash</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.16초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded">
                            <span className="text-2xl">🔬</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 기술 분석</div>
                                <div className="text-xs text-gray-600">특허 청구항 분석, 선행기술 검색, 침해 여부 판단</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">3.4초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">👨‍⚖️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">판사 3인 합의부 + 기술심리관</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 84.7% → 판결</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">5개 노드 동시 저장 → 특허청·국민 열람</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.8초</span>
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
