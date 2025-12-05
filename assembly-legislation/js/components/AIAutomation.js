const AIAutomation = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 현황</h2>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg mb-6 border-l-4 border-indigo-600">
                <h3 className="font-bold text-lg mb-2 text-indigo-900">💡 법제사법위원회 AI 자동화 개요</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                    DeepSeek R1 및 Claude 4 기반 법률 전문 AI가 체계·자구 심사, 위헌 요소 탐지, 
                    법령 충돌 분석을 자동으로 수행합니다. 연간 1,847건의 법안을 처리하며, 
                    위원들은 AI가 1차 검토한 결과를 토대로 최종 의사결정에만 집중할 수 있습니다.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                    <div className="text-3xl mb-3">⚖️</div>
                    <h3 className="font-bold text-lg mb-3 text-blue-900">체계·자구 자동 검토</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span>법률 용어 일관성 검사</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span>조문 번호 자동 정렬</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span>문법 및 맞춤법 검증</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span>법제처 작성 기준 적합성</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-2">▸</span>
                            <span>조문 간 논리적 모순 탐지</span>
                        </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded">
                        <p className="text-xs text-gray-600">월평균 처리</p>
                        <p className="text-2xl font-bold text-blue-600">154건</p>
                    </div>
                </div>

                <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
                    <div className="text-3xl mb-3">🚨</div>
                    <h3 className="font-bold text-lg mb-3 text-red-900">위헌 요소 AI 탐지</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">▸</span>
                            <span>헌법 조항 충돌 검사</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">▸</span>
                            <span>헌재 판례 DB 자동 매칭</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">▸</span>
                            <span>기본권 침해 가능성 분석</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">▸</span>
                            <span>과잉금지 원칙 위반 검토</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">▸</span>
                            <span>평등권 침해 여부 평가</span>
                        </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded">
                        <p className="text-xs text-gray-600">연간 차단</p>
                        <p className="text-2xl font-bold text-red-600">12건</p>
                    </div>
                </div>

                <div className="border-2 border-purple-200 rounded-lg p-5 bg-purple-50">
                    <div className="text-3xl mb-3">🔗</div>
                    <h3 className="font-bold text-lg mb-3 text-purple-900">법령 충돌 자동 분석</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>기존 법령 1만+ 건 실시간 비교</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>상위법-하위법 체계 검증</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>특별법-일반법 관계 분석</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>신법-구법 충돌 경고</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-purple-600 mr-2">▸</span>
                            <span>법령 간 용어 불일치 탐지</span>
                        </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded">
                        <p className="text-xs text-gray-600">검토 법령 수</p>
                        <p className="text-2xl font-bold text-purple-600">10,847개</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-5 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">📚</div>
                        <h3 className="font-bold text-lg text-green-900">판례 DB 기반 법리 검토</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>대법원 판례 78만 건 자동 검색</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>헌법재판소 결정례 3.2만 건 분석</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>유사 사건 선례 자동 제시</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>법리 해석의 일관성 유지</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-600 mr-2">▸</span>
                            <span>최신 판례 변경 사항 실시간 반영</span>
                        </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border-l-4 border-green-600">
                        <p className="text-xs text-gray-600 mb-1">검색 속도</p>
                        <p className="text-xl font-bold text-green-600">평균 1.3초</p>
                    </div>
                </div>

                <div className="border rounded-lg p-5 bg-gradient-to-br from-orange-50 to-yellow-50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">🎤</div>
                        <h3 className="font-bold text-lg text-orange-900">의사록 자동 생성</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">▸</span>
                            <span>음성 → 텍스트 실시간 변환 (99.2% 정확도)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">▸</span>
                            <span>화자 자동 구분 (위원 18명)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">▸</span>
                            <span>법률 용어 자동 보정</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">▸</span>
                            <span>회의 요약 및 핵심 쟁점 추출</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-600 mr-2">▸</span>
                            <span>OpenHash 체인에 즉시 기록</span>
                        </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border-l-4 border-orange-600">
                        <p className="text-xs text-gray-600 mb-1">시간 절감</p>
                        <p className="text-xl font-bold text-orange-600">82% (2일 → 4시간)</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 mb-6">
                <h3 className="font-bold text-xl mb-4 text-gray-800">📊 AI 자동화 성과 지표</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">처리 시간 단축</p>
                        <p className="text-3xl font-bold text-blue-600">73%</p>
                        <p className="text-xs text-gray-500 mt-1">평균 23일 → 6일</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">AI 검토 정확도</p>
                        <p className="text-3xl font-bold text-green-600">96.8%</p>
                        <p className="text-xs text-gray-500 mt-1">오류 탐지 성공률</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">비용 절감</p>
                        <p className="text-3xl font-bold text-purple-600">64%</p>
                        <p className="text-xs text-gray-500 mt-1">인력 및 시간 절감</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">위원 만족도</p>
                        <p className="text-3xl font-bold text-orange-600">92점</p>
                        <p className="text-xs text-gray-500 mt-1">100점 만점</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded">
                    <h3 className="font-bold text-lg mb-3 text-indigo-900">🔧 사용 AI 모델</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">▸</span>
                            <span><strong>DeepSeek R1:</strong> 법률 문서 분석 및 체계·자구 검토</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">▸</span>
                            <span><strong>Claude 4 Sonnet:</strong> 위헌 요소 탐지 및 법리 분석</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">▸</span>
                            <span><strong>Whisper v3:</strong> 음성 → 텍스트 변환</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">▸</span>
                            <span><strong>Legal-BERT:</strong> 법률 용어 임베딩 및 유사도 분석</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded">
                    <h3 className="font-bold text-lg mb-3 text-yellow-900">⚠️ 인간 감독 원칙</h3>
                    <p className="text-sm text-yellow-800 leading-relaxed mb-3">
                        AI는 1차 검토만 수행하며, 최종 의사결정은 <strong>반드시 위원이 직접</strong> 수행합니다.
                        위헌 요소 탐지 시 AI는 "검토 필요" 경고만 하며, 위헌 여부 판단은 위원의 권한입니다.
                    </p>
                    <div className="bg-white p-3 rounded">
                        <p className="text-xs text-gray-600">AI 권고 수용률</p>
                        <p className="text-lg font-bold text-yellow-600">78.4% (위원 재량 21.6%)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
