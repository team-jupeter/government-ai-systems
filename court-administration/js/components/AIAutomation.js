const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-teal-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-teal-50 rounded">
                        <span className="text-lg">💰</span>
                        <div>
                            <div className="font-bold">예산 AI 편성</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 과거 집행 분석, 최적 배분</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-cyan-50 rounded">
                        <span className="text-lg">👥</span>
                        <div>
                            <div className="font-bold">인사 AI 배치</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 경력, 전문성 기반 최적 배치</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">통계 AI 생성</div>
                            <div className="text-xs text-gray-600 mt-1">사법통계 자동 집계, 시각화</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded">
                        <span className="text-lg">🏗️</span>
                        <div>
                            <div className="font-bold">시설 AI 관리</div>
                            <div className="text-xs text-gray-600 mt-1">보수 우선순위, 예산 최적화</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">94%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-teal-600 font-bold text-lg">98.9%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-cyan-600 font-bold text-lg">91%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">88.3%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
