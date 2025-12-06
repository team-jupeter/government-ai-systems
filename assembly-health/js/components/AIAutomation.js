const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-pink-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-pink-50 rounded">
                        <span className="text-lg">🏥</span>
                        <div>
                            <div className="font-bold">AI 의료 진단 지원</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 영상 판독, 질병 예측</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">💊</span>
                        <div>
                            <div className="font-bold">건강보험 AI 심사</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 과잉 진료 탐지, 적정성 평가</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">👶</span>
                        <div>
                            <div className="font-bold">복지 수급 AI 평가</div>
                            <div className="text-xs text-gray-600 mt-1">자격 심사, 중복 수급 차단</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">🦠</span>
                        <div>
                            <div className="font-bold">감염병 AI 예측</div>
                            <div className="text-xs text-gray-600 mt-1">확산 경로, 위험 지역 실시간 분석</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">84%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">97.2%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">76%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">81.7%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
