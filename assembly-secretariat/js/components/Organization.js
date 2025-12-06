const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 국회사무처는 입법 지원 기관으로 
                    <a href="https://www.assembly.go.kr" target="_blank" className="text-emerald-600 hover:underline ml-1">공식 홈페이지</a>에서 상세 정보를 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (8개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-emerald-900">부서 노드 (8개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 의사국 (본회의 운영)</li>
                                <li>• 법제실 (법안 검토)</li>
                                <li>• 예산정책국 (예산 분석)</li>
                                <li>• 의정연수국 (의원 교육)</li>
                                <li>• 시설안전국 (시설 관리)</li>
                                <li>• 정보화담당관 (IT 지원)</li>
                                <li>• 홍보기획관 (대국민 소통)</li>
                                <li>• 인사국 (직원 관리)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">주요 기능</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 본회의·위원회 운영</li>
                                <li>• 의사록 47.3M건 관리</li>
                                <li>• 300명 의원 지원</li>
                                <li>• 국회의사당 시설 관리</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 의사록 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">회의록 생성</div>
                                <div className="text-xs text-gray-600">본회의·위원회 → OpenHash 실시간 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.14초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 속기 변환</div>
                                <div className="text-xs text-gray-600">음성 → 텍스트 자동 변환, 화자 구분</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">3.2초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">📄</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">문서 검토·승인</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 82.7% → 공식 의사록 확정</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">8개 노드 동시 저장 → 국민 열람</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.5초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg">
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
