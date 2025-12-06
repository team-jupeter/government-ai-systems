const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-red-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded">
                        <span className="text-lg">🚁</span>
                        <div>
                            <div className="font-bold">무기체계 AI 평가</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 전력 증강 효과 분석</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">💰</span>
                        <div>
                            <div className="font-bold">국방 예산 AI 검토</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 비용 효율성 자동 계산</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">👮</span>
                        <div>
                            <div className="font-bold">병력 운영 AI 최적화</div>
                            <div className="text-xs text-gray-600 mt-1">복무 기간, 인력 배치 자동 시뮬레이션</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">🔒</span>
                        <div>
                            <div className="font-bold">군사기밀 AI 보호</div>
                            <div className="text-xs text-gray-600 mt-1">이상 접근 실시간 탐지</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">81%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">96.1%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">68%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">72.1%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
