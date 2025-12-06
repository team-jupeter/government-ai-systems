const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-amber-50 border-l-4 border-amber-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 국회예산정책처는 입법 지원 기관으로 
                    <a href="https://www.nabo.go.kr" target="_blank" className="text-amber-600 hover:underline ml-1">공식 홈페이지</a>에서 상세 정보를 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (6개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-amber-900">부서 노드 (6개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 예산분석실 (예산안 분석)</li>
                                <li>• 추계세제분석실 (세입 추계)</li>
                                <li>• 경제분석국 (거시경제 전망)</li>
                                <li>• 사회행정사업평가국 (복지 평가)</li>
                                <li>• 산업자원환경사업평가국 (SOC 평가)</li>
                                <li>• 법안비용추계국 (법안 재정 영향)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">주요 기능</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 677조원 예산안 분석</li>
                                <li>• 중장기 재정 전망</li>
                                <li>• 법안 재정 영향 추계</li>
                                <li>• 사업 타당성 평가</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 예산 분석 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">예산안 제출</div>
                                <div className="text-xs text-gray-600">정부 → OpenHash 677조원 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.15초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-orange-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 예산 분석</div>
                                <div className="text-xs text-gray-600">재정 건전성, 사업 타당성, 중복 예산 자동 검출</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">4.7초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">📊</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">전문가 검토</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 87.4% → 최종 보고서 작성</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">6개 노드 동시 저장 → 위원회 제출</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.5초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">🔐 보안 계층</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-amber-900">전송 계층</div>
                            <div className="text-gray-600 text-xs mt-1">TLS 1.3 암호화</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-amber-900">저장 계층</div>
                            <div className="text-gray-600 text-xs mt-1">AES-256-GCM</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-amber-900">서명 계층</div>
                            <div className="text-gray-600 text-xs mt-1">CRYSTALS-Dilithium</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
