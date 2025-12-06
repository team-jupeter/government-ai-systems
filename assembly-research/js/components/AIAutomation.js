const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-orange-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-orange-50 rounded">
                        <span className="text-lg">🔍</span>
                        <div>
                            <div className="font-bold">AI 자료 수집</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 국내외 자료 자동 검색, 분류</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">정책 영향 AI 평가</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 경제·사회 영향 시뮬레이션</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded">
                        <span className="text-lg">🌍</span>
                        <div>
                            <div className="font-bold">해외 사례 AI 비교</div>
                            <div className="text-xs text-gray-600 mt-1">주요국 입법례 자동 분석, 시사점 도출</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                        <span className="text-lg">📝</span>
                        <div>
                            <div className="font-bold">보고서 AI 작성 지원</div>
                            <div className="text-xs text-gray-600 mt-1">초안 자동 생성, 참고 문헌 정리</div>
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
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">86%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-blue-600 font-bold text-lg">96.9%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">77%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 수용률</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">79.8%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
