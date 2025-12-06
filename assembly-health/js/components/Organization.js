const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-pink-50 border-l-4 border-pink-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 정보는 
                    <a href="https://health.na.go.kr" target="_blank" className="text-pink-600 hover:underline ml-1">보건복지위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (21개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-pink-900">위원 노드 (18개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 의료 정책 의결 동기화</li>
                                <li>• 건강보험 심사 기록</li>
                                <li>• 복지 예산 승인 저장</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (3개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 보건복지부 정책 DB</li>
                                <li>• 질병관리청 방역 추적</li>
                                <li>• 식품의약품안전처 승인</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 건강보험 급여 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-pink-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">급여 심사 청구</div>
                                <div className="text-xs text-gray-600">병원 → OpenHash 실시간 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.18초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 적정성 평가</div>
                                <div className="text-xs text-gray-600">과잉 진료, 부적정 청구 자동 탐지</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">1.5초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">🏥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 최종 심사</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 81.7% → 급여 지급</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">21개 노드 동시 저장 → 개인정보 제외 공개</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.5초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-pink-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-pink-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-pink-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
