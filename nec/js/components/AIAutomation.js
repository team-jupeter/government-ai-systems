const AIAutomation = () => {
    const aiStats = {
        automationRate: 93.8,
        avgConfidence: 96.1,
        humanApprovalRate: 6.2,
        errorRate: 0.04
    };
    
    const aiTasks = [
        { task: '정책 데이터 분석', automation: 96, confidence: 98, processed: 1234 },
        { task: '국민 의견 분류', automation: 94, confidence: 97, processed: 8765 },
        { task: '유사 정책 검색', automation: 98, confidence: 99, processed: 456 },
        { task: '교육과정 검토', automation: 89, confidence: 94, processed: 234 },
        { task: '심의안 초안 작성', automation: 87, confidence: 93, processed: 123 }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">AI 자동화 현황</h2>
                <p className="text-lg text-purple-100">
                    DeepSeek R1 모델이 정책 심의 업무를 자동으로 지원하며, 
                    중요 결정은 위원들이 최종 의결합니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="자동 처리율" 
                    value={`${aiStats.automationRate}%`}
                    subtitle="위원 검토 6.2%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="평균 신뢰도" 
                    value={`${aiStats.avgConfidence}%`}
                    subtitle="AI 판단 정확도"
                    icon="🎯" 
                    color="blue" 
                />
                <StatCard 
                    title="위원 개입률" 
                    value={`${aiStats.humanApprovalRate}%`}
                    subtitle="중요 의사결정"
                    icon="⚖️" 
                    color="orange" 
                />
                <StatCard 
                    title="오류율" 
                    value={`${aiStats.errorRate}%`}
                    subtitle="매우 낮은 수준"
                    icon="✅" 
                    color="green" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">업무별 AI 자동화율</h3>
                <div className="space-y-4">
                    {aiTasks.map((item, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{item.task}</h4>
                                    <p className="text-sm text-gray-600">오늘 처리: {item.processed}건</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-purple-600">{item.automation}%</div>
                                    <div className="text-xs text-gray-500">자동화율</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">자동 처리</span>
                                        <span className="font-semibold">{item.automation}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-purple-600 h-2 rounded-full transition-all"
                                            style={{width: `${item.automation}%`}}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">AI 신뢰도</span>
                                        <span className="font-semibold">{item.confidence}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{width: `${item.confidence}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI 모델 상세</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">DeepSeek R1 - 정책 분석</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 교육 통계 데이터 분석</li>
                            <li>• 국민 의견 자동 분류</li>
                            <li>• 정책 효과 시뮬레이션</li>
                            <li>• 해외 사례 비교 분석</li>
                        </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">DeepSeek R1 - 심의 지원</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 유사 정책 자동 검색</li>
                            <li>• 교육과정 기준 검토</li>
                            <li>• 심의안 초안 작성</li>
                            <li>• 의결 영향 분석</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.AIAutomation = AIAutomation;
