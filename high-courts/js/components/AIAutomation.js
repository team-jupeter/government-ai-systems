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
                            <div className="font-bold">항소 이유 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 1심 판결 검토, 쟁점 자동 추출</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">유사 판례 AI 검색</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 항소심 판례 자동 추천</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">📝</span>
                        <div>
                            <div className="font-bold">쟁점 정리 AI</div>
                            <div className="text-xs text-gray-600 mt-1">항소 쟁점 자동 분류, 관련 법리 정리</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded">
                        <span className="text-lg">⚖️</span>
                        <div>
                            <div className="font-bold">판결문 AI 작성 지원</div>
                            <div className="text-xs text-gray-600 mt-1">1심 판단 검토, 항소심 판결 초안</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">91%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">98.7%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-cyan-600 font-bold text-lg">85%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">81.3%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
