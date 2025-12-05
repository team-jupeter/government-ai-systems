const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-blue-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">📋</span>
                        <div>
                            <div className="font-bold">의안 자동 분류</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 + LLaMA 3.1 | 정확도 96.3%</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">✍️</span>
                        <div>
                            <div className="font-bold">의사록 자동 생성</div>
                            <div className="text-xs text-gray-600 mt-1">Whisper v3 음성→텍스트 | 정확도 98.7%</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">일정 최적화</div>
                            <div className="text-xs text-gray-600 mt-1">유전 알고리즘 | 충돌 감소 87%</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
                        <span className="text-lg">🔍</span>
                        <div>
                            <div className="font-bold">법안 유사도 분석</div>
                            <div className="text-xs text-gray-600 mt-1">Legal-BERT | 중복 검출 94%</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">73%</span></td>
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
                            <td className="text-right"><span className="text-orange-600 font-bold text-lg">847건</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">위원 만족도</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">92점</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4">🧠 사용 AI 모델</h3>
            <div className="grid md:grid-cols-4 gap-3 text-sm">
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-blue-900">DeepSeek R1</div>
                    <div className="text-xs text-gray-600 mt-1">의안 분석</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-green-900">Claude 4</div>
                    <div className="text-xs text-gray-600 mt-1">요약 생성</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-purple-900">Whisper v3</div>
                    <div className="text-xs text-gray-600 mt-1">음성 변환</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                    <div className="font-bold text-orange-900">Legal-BERT</div>
                    <div className="text-xs text-gray-600 mt-1">법률 분석</div>
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
