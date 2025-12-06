const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 국회입법조사처는 입법 지원 기관으로 
                    <a href="https://www.nars.go.kr" target="_blank" className="text-orange-600 hover:underline ml-1">공식 홈페이지</a>에서 상세 정보를 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (7개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-orange-900">부서 노드 (7개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 정치행정조사실 (정치·행정)</li>
                                <li>• 경제산업조사실 (경제·산업)</li>
                                <li>• 사회문화조사실 (복지·교육)</li>
                                <li>• 과학환경조사실 (과학·환경)</li>
                                <li>• 외교안보조사실 (외교·국방)</li>
                                <li>• 입법조사정책분석실 (정책 분석)</li>
                                <li>• 국제입법조사팀 (해외 사례)</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">주요 기능</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 입법 조사 3,847건/년</li>
                                <li>• 정책 영향 평가</li>
                                <li>• 해외 입법 사례 분석</li>
                                <li>• 의원 연구 지원</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 입법 조사 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-orange-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">조사 요청</div>
                                <div className="text-xs text-gray-600">의원 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.17초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-red-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 자료 수집</div>
                                <div className="text-xs text-gray-600">국내외 자료 자동 검색, 정리, 요약</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">3.4초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded">
                            <span className="text-2xl">📝</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">전문가 분석</div>
                                <div className="text-xs text-gray-600">AI 권고 수용률 79.8% → 최종 보고서</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">OpenHash 공개</div>
                                <div className="text-xs text-gray-600">7개 노드 동시 저장 → 의원 제공</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.6초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
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
