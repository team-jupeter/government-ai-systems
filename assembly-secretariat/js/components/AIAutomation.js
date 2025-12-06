const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-emerald-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded">
                        <span className="text-lg">🎙️</span>
                        <div>
                            <div className="font-bold">AI 속기 시스템</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 음성 → 텍스트 실시간 변환</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                        <span className="text-lg">📄</span>
                        <div>
                            <div className="font-bold">의사록 AI 편집</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 화자 구분, 발언 정리, 오타 수정</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">🏢</span>
                        <div>
                            <div className="font-bold">시설 AI 관리</div>
                            <div className="text-xs text-gray-600 mt-1">냉난방, 조명, 보안 자동 제어</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">의정 통계 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">출석률, 발언 시간, 법안 발의 자동 집계</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">89%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">98.3%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">82%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">82.7%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
