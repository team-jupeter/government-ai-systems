const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-purple-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">📜</span>
                        <div>
                            <div className="font-bold">체계·자구 자동 검토</div>
                            <div className="text-xs text-gray-600 mt-1">Legal-BERT | 월평균 154건 처리</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded">
                        <span className="text-lg">⚠️</span>
                        <div>
                            <div className="font-bold">위헌 요소 AI 탐지</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 + 헌재 판례 3.2만건 | 연간 12건 차단</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">🔍</span>
                        <div>
                            <div className="font-bold">법령 충돌 자동 분석</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 10,847개 법령 실시간 비교</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">🎤</span>
                        <div>
                            <div className="font-bold">의사록 자동 생성</div>
                            <div className="text-xs text-gray-600 mt-1">Whisper v3 | 정확도 99.2%, 시간 절감 82%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-green-900">📈 성과 지표</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b">
                            <td className="py-3 font-medium">처리 시간 단축</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">73%</span><br/><span className="text-xs text-gray-500">23일→6일</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">96.8%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">64%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">월 처리량</td>
                            <td className="text-right"><span className="text-orange-600 font-bold text-lg">154건</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">78.4%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-4">🧠 사용 AI 모델</h3>
            <div className="grid md:grid-cols-4 gap-3 text-sm">
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-purple-900">DeepSeek R1</div>
                    <div className="text-xs text-gray-600 mt-1">법률 문서 분석</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-blue-900">Claude 4</div>
                    <div className="text-xs text-gray-600 mt-1">위헌 요소 탐지</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-green-900">Whisper v3</div>
                    <div className="text-xs text-gray-600 mt-1">음성→텍스트</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-orange-900">Legal-BERT</div>
                    <div className="text-xs text-gray-600 mt-1">법률 용어 분석</div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
                <h4 className="font-bold text-sm mb-2">체계자구 수정 유형</h4>
                <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span>용어 통일</span><span className="font-bold">1,247건</span></div>
                    <div className="flex justify-between"><span>조문 번호</span><span className="font-bold">892건</span></div>
                    <div className="flex justify-between"><span>문법 교정</span><span className="font-bold">634건</span></div>
                    <div className="flex justify-between"><span>논리적 모순</span><span className="font-bold">468건</span></div>
                </div>
            </div>
            <div className="border rounded-lg p-4">
                <h4 className="font-bold text-sm mb-2">위헌 요소 유형</h4>
                <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span>기본권 침해</span><span className="font-bold text-red-600">5건</span></div>
                    <div className="flex justify-between"><span>과잉금지 위반</span><span className="font-bold text-red-600">3건</span></div>
                    <div className="flex justify-between"><span>평등권 침해</span><span className="font-bold text-red-600">2건</span></div>
                    <div className="flex justify-between"><span>법률유보 위반</span><span className="font-bold text-red-600">2건</span></div>
                </div>
            </div>
            <div className="border rounded-lg p-4">
                <h4 className="font-bold text-sm mb-2">판례 DB 활용</h4>
                <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span>대법원 판례</span><span className="font-bold">78만건</span></div>
                    <div className="flex justify-between"><span>헌재 결정례</span><span className="font-bold">3.2만건</span></div>
                    <div className="flex justify-between"><span>검색 속도</span><span className="font-bold text-green-600">평균 1.3초</span></div>
                </div>
            </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
            <p className="text-sm text-gray-700">
                <strong>⚠️ 인간 감독 원칙:</strong> AI는 1차 검토만 수행하며, 최종 의사결정은 위원의 권한입니다. AI 권고 수용률 78.4%
            </p>
        </div>
    </div>
);
