const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-fuchsia-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-fuchsia-50 rounded">
                        <span className="text-lg">🎬</span>
                        <div>
                            <div className="font-bold">문화 콘텐츠 AI 심사</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 예술성, 대중성 자동 평가</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">©️</span>
                        <div>
                            <div className="font-bold">저작권 침해 AI 탐지</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 4,892건 자동 검출</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">⚽</span>
                        <div>
                            <div className="font-bold">체육 예산 효율성 분석</div>
                            <div className="text-xs text-gray-600 mt-1">올림픽·월드컵 투자 대비 성과</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">✈️</span>
                        <div>
                            <div className="font-bold">관광 정책 AI 예측</div>
                            <div className="text-xs text-gray-600 mt-1">방문객 증가율, 경제 효과 시뮬레이션</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">77%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">94.3%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">65%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">67.8%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
