const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-purple-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">🔍</span>
                        <div>
                            <div className="font-bold">판례 AI 검색</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 8.4M 판례 의미 기반 검색</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">양형 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 과거 판례 기반 양형 예측</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">📝</span>
                        <div>
                            <div className="font-bold">쟁점 AI 정리</div>
                            <div className="text-xs text-gray-600 mt-1">사건 쟁점 자동 추출, 관련 법리 정리</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-fuchsia-50 rounded">
                        <span className="text-lg">⚖️</span>
                        <div>
                            <div className="font-bold">판결문 AI 작성 지원</div>
                            <div className="text-xs text-gray-600 mt-1">선례 인용, 법리 정리 자동화</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">93%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">99.2%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">88%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">76.4%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
