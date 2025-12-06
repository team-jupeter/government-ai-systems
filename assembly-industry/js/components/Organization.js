const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-sky-50 border-l-4 border-sky-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 정보는 
                    <a href="https://industry.na.go.kr" target="_blank" className="text-sky-600 hover:underline ml-1">산업통상자원중소벤처기업위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (21개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-sky-900">위원 노드 (18개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 중소기업 지원 심사 동기화</li>
                                <li>• 산업 정책 의결 기록</li>
                                <li>• 무역 계약 검토 저장</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (3개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 산업통상자원부 정책 DB</li>
                                <li>• 중소벤처기업부 지원금</li>
                                <li>• 특허청 등록 추적</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 중소기업 지원금 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-sky-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">지원금 신청</div>
                                <div className="text-xs text-gray-600">중소기업 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.16초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 적격성 평가</div>
                                <div className="text-xs text-gray-600">기업 규모, 기술력, 재무 상태 자동 분석</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">1.8초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">🏢</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 최종 심사</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 73.6% → 지원금 배정</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">21개 노드 동시 저장 → 투명성 확보</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.4초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-6 rounded-lg">
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
