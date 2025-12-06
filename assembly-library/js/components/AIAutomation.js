const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-blue-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">🔍</span>
                        <div>
                            <div className="font-bold">AI 자료 검색</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 4.8M건 장서 의미 기반 검색</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">입법 동향 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 해외 입법례 자동 비교, 시사점 도출</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">📖</span>
                        <div>
                            <div className="font-bold">자료 분류 AI</div>
                            <div className="text-xs text-gray-600 mt-1">주제별 자동 분류, 메타데이터 생성</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">💡</span>
                        <div>
                            <div className="font-bold">AI 자료 추천</div>
                            <div className="text-xs text-gray-600 mt-1">의원별 관심 분야 맞춤 추천</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">87%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">97.6%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">79%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">85.3%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
