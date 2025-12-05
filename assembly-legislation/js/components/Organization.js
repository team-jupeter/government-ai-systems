const Organization = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🌐 OpenHash 분산 네트워크 구조</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-sm text-gray-700">
                    <strong>💡 참고:</strong> 위원회 구성원 및 소관 기관 정보는 
                    <a href="https://likms.assembly.go.kr/bill" target="_blank" className="text-blue-600 hover:underline ml-1">법제사법위원회 공식 홈페이지</a>에서 확인하세요.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">📊 OpenHash 노드 구성 (24개)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-purple-900">위원 노드 (18개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 각 위원 개인 노드 운영</li>
                                <li>• 법안 심사 결과 실시간 동기화</li>
                                <li>• 체계·자구 수정 이력 분산 저장</li>
                                <li>• CRYSTALS-Dilithium 서명</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-bold mb-2 text-green-900">기관 노드 (6개)</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 법무부 법령 데이터</li>
                                <li>• 법제처 법령 DB 연동</li>
                                <li>• 헌법재판소 판례 DB</li>
                                <li>• 감사원 감사 이력</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔄 법안 처리 데이터 흐름</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded">
                            <span className="text-2xl">📥</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">법안 접수</div>
                                <div className="text-xs text-gray-600">상임위 통과 법안 → OpenHash 기록</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.19초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded">
                            <span className="text-2xl">🤖</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">AI 1차 검토</div>
                                <div className="text-xs text-gray-600">체계·자구, 위헌 요소, 법령 충돌 자동 검출</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">1.3초</span>
                        </div>
                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded">
                            <span className="text-2xl">👨‍⚖️</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">위원 최종 검토</div>
                                <div className="text-xs text-gray-600">AI 권고 78.4% 수용 → 최종 의사결정</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">인간 권한</span>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded">
                            <span className="text-2xl">📤</span>
                            <div className="flex-1">
                                <div className="font-bold text-sm">본회의 전송</div>
                                <div className="text-xs text-gray-600">24개 노드 동시 저장 → NDR 동기화</div>
                            </div>
                            <span className="text-green-600 font-mono text-xs">0.6초</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">📚 연동 데이터베이스</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-purple-900">법령 DB</div>
                            <div className="text-gray-600 text-xs mt-1">10,847개 법령</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-purple-900">대법원 판례</div>
                            <div className="text-gray-600 text-xs mt-1">78만건</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <div className="font-bold text-purple-900">헌재 결정례</div>
                            <div className="text-gray-600 text-xs mt-1">3.2만건</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
