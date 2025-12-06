const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-amber-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">예산안 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 재정 건전성, 중복 사업 자동 탐지</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">🔍</span>
                        <div>
                            <div className="font-bold">결산 AI 검토</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 집행 적정성, 목적 외 사용 검출</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">⚖️</span>
                        <div>
                            <div className="font-bold">재정 영향 AI 평가</div>
                            <div className="text-xs text-gray-600 mt-1">재정 적자, 국가부채 시뮬레이션</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">💡</span>
                        <div>
                            <div className="font-bold">사업 효율성 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">비용 대비 효과, 우선순위 자동 산정</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">88%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">97.8%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">81%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">78.9%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
