const NDRIntegration = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🔗 국가데이터저장소 연동</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg mb-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-lg mb-2 text-blue-900">💡 법제사법위원회 데이터 흐름</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                    모든 법안 심사 데이터, 체계·자구 심사 결과, 탄핵 소추 기록이 국가데이터저장소(NDR)에 실시간 저장되며,
                    OpenHash 기술로 위변조를 원천 차단합니다. 소관 6개 기관의 데이터와 실시간 연동되어
                    법률 체계의 정합성을 자동으로 검증합니다.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                    <h3 className="font-bold text-lg mb-3 text-blue-700">📥 수신 데이터</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span><strong>법무부:</strong> 법안 관련 범죄통계, 검찰 의견</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span><strong>법제처:</strong> 기존 법령 DB, 법제 선례</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span><strong>감사원:</strong> 감사 결과, 적법성 검토</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span><strong>헌법재판소:</strong> 판례 DB, 위헌 결정례</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span><strong>법원:</strong> 판례, 사법행정 통계</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span><strong>공수처:</strong> 고위직 범죄 수사 현황</span>
                        </li>
                    </ul>
                </div>

                <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                    <h3 className="font-bold text-lg mb-3 text-purple-700">⚙️ 처리 데이터</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>체계·자구 심사 결과</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>법안 수정 내역 (before/after)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>위헌 요소 탐지 기록</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>법령 충돌 분석 결과</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>위원회 의사록 (음성→텍스트)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>탄핵 소추 절차 기록</span>
                        </li>
                    </ul>
                </div>

                <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                    <h3 className="font-bold text-lg mb-3 text-green-700">📤 송신 데이터</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>최종 통과 법안 (→ 본회의)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>체계·자구 심사 의견</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>법안 반려 사유</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>탄핵 소추안 본회의 송부</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>소관 기관 감독 결과</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>법제 개선 권고안</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-5 bg-gradient-to-br from-orange-50 to-yellow-50">
                    <h3 className="font-bold text-lg mb-3 text-orange-700">✓ OpenHash 검증</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">●</span>
                            <span><strong>실시간 무결성 검증:</strong> 모든 법안 수정 이력 체인 기록</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">●</span>
                            <span><strong>분산 저장:</strong> 위원 18명 개별 노드에 복제 저장</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">●</span>
                            <span><strong>위변조 방지:</strong> 양자내성 암호로 서명 및 봉인</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">●</span>
                            <span><strong>투명한 이력:</strong> 국민 누구나 체계·자구 심사 과정 열람</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">●</span>
                            <span><strong>자동 감사:</strong> 비정상 수정 시 즉시 경고</span>
                        </li>
                    </ul>
                </div>

                <div className="border rounded-lg p-5 bg-gradient-to-br from-indigo-50 to-purple-50">
                    <h3 className="font-bold text-lg mb-3 text-indigo-700">🤖 AI 자동화</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">●</span>
                            <span><strong>법안 자동 분류:</strong> 소관 기관별 자동 매칭</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">●</span>
                            <span><strong>체계·자구 1차 검토:</strong> AI가 오류 자동 탐지</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">●</span>
                            <span><strong>위헌 요소 스캔:</strong> 판례 DB 기반 실시간 분석</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">●</span>
                            <span><strong>법령 충돌 경고:</strong> 기존 1만+ 법령과 자동 비교</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">●</span>
                            <span><strong>의사록 자동 생성:</strong> 음성 → 텍스트 변환 (DeepSeek R1)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
                <h3 className="font-bold text-lg mb-3">📊 실시간 연동 현황</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-gray-600">연동 상태</p>
                        <p className="font-bold text-green-600 text-lg">● 정상 작동</p>
                    </div>
                    <div>
                        <p className="text-gray-600">마지막 동기화</p>
                        <p className="font-bold text-gray-800">2025-12-06 09:47:15</p>
                    </div>
                    <div>
                        <p className="text-gray-600">오늘 처리 법안</p>
                        <p className="font-bold text-blue-600 text-lg">47건</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-bold text-yellow-900 mb-2">⚠️ 데이터 보안</h3>
                <p className="text-sm text-yellow-800">
                    모든 데이터는 CRYSTALS-Dilithium (양자내성 암호) 및 AES-256으로 이중 암호화되며,
                    접근 권한은 위원 본인 인증 후에만 부여됩니다. 법안 심사 과정은 OpenHash 체인에 영구 기록되어
                    사후 감사가 가능합니다.
                </p>
            </div>
        </div>
    );
};
