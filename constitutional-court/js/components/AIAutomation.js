const AIAutomation = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">🤖 AI 자동화 프로세스</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-purple-900">🔄 자동화 업무</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">⚖️</span>
                        <div>
                            <div className="font-bold">위헌심사 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">DeepSeek R1 | 법률 위헌성 검토, 판례 검색</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-fuchsia-50 rounded">
                        <span className="text-lg">📜</span>
                        <div>
                            <div className="font-bold">탄핵심판 AI 지원</div>
                            <div className="text-xs text-gray-600 mt-1">Claude 4 | 증거 정리, 위헌 행위 분석</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-pink-50 rounded">
                        <span className="text-lg">🛡️</span>
                        <div>
                            <div className="font-bold">헌법소원 AI 심사</div>
                            <div className="text-xs text-gray-600 mt-1">기본권 침해 여부 자동 판단</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                        <span className="text-lg">📊</span>
                        <div>
                            <div className="font-bold">권한쟁의 AI 분석</div>
                            <div className="text-xs text-gray-600 mt-1">기관 권한 범위 자동 검토</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="border rounded-lg p-5">
                <h3 className="font-bold mb-4 text-green-900">📈 성과 지표</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b">
                            <td className="py-3 font-medium">심리 시간 단축</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">96%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">AI 정확도</td>
                            <td className="text-right"><span className="text-purple-600 font-bold text-lg">99.4%</span></td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-3 font-medium">비용 절감</td>
                            <td className="text-right"><span className="text-fuchsia-600 font-bold text-lg">93%</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 font-medium">AI 권고 참고율</td>
                            <td className="text-right"><span className="text-green-600 font-bold text-lg">89.7%</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
