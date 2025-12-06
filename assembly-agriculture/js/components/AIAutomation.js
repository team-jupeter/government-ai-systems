const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-green-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">🌾</span>
                        <div>
                            <div className="font-bold">농산물 안전성 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 농약 잔류, 중금속 검출</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">🐟</span>
                        <div>
                            <div className="font-bold">수산물 원산지 AI 검증</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 불법 유통 자동 탐지</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">💰</span>
                        <div>
                            <div className="font-bold">보조금 적정성 AI 평가</div>
                            <div className="text-xs text-gray-600 mt-1">농가 규모, 작물별 자동 산정</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
                        <span className="text-lg">🌡️</span>
                        <div>
                            <div className="font-bold">스마트팜 AI 최적화</div>
                            <div className="text-xs text-gray-600 mt-1">온도·습도·영양 자동 조절</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-blue-900">📈 성과 지표</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b">
                            <td className="py-3 font-medium">처리 시간 단축</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">80%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">95.7%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">70%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">75.4%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
