const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-orange-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-orange-50 rounded">
                        <span className="text-lg">🔬</span>
                        <div>
                            <div className="font-bold">특허 기술 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 청구항 분석, 선행기술 검색</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">심결 적법성 AI 검증</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 특허심판원 심결 검토</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded">
                        <span className="text-lg">💡</span>
                        <div>
                            <div className="font-bold">침해 판단 AI</div>
                            <div className="text-xs text-gray-600 mt-1">청구항 대비, 균등론 적용 분석</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">⚖️</span>
                        <div>
                            <div className="font-bold">판결문 AI 작성 지원</div>
                            <div className="text-xs text-gray-600 mt-1">기술 설명, 법리 인용 자동화</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">92%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-orange-600 font-bold text-lg">99.1%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-amber-600 font-bold text-lg">87%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">84.7%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
