const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 정보는 
                    <a href="https://educ.na.go.kr" target="_blank" className="text-purple-600 hover:underline ml-1">교육위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (19개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-purple-900">위원 노드 (18개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 교육 법안 심사 동기화</li>
                                <li>• 학생 데이터 접근 이력 기록</li>
                                <li>• 교육과정 검정 투명성</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (1개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 교육부 마스터 노드</li>
                                <li>• 9.2M 학생 데이터 관리</li>
                                <li>• 전국 학교 예산 추적</li>
                                <li>• NDR 통합 노드</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 교육 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">학생 데이터 수신</div>
                                <div className="text-xs text-gray-600">나이스(NEIS) → OpenHash 암호화 저장</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.20초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 교육 정책 분석</div>
                                <div className="text-xs text-gray-600">학습 격차, 예산 효율성 자동 평가</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">1.8초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">👨‍🏫</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 최종 의결</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 74.2% → 교육 정책 결정</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">19개 노드 동시 저장 → 학부모 열람 가능</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.5초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
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
