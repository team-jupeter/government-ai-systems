const AIAutomation = () => {
    const aiStats = {
        automationRate: 95.3,
        avgConfidence: 97.2,
        humanApprovalRate: 4.7,
        errorRate: 0.03
    };
    
    const aiTasks = [
        { task: '정책 충돌 분석', automation: 97, confidence: 99, processed: 456 },
        { task: '부처간 조정안 작성', automation: 94, confidence: 96, processed: 234 },
        { task: '차관회의 자료 준비', automation: 96, confidence: 98, processed: 123 },
        { task: '규제 영향 평가', automation: 92, confidence: 95, processed: 345 },
        { task: '정부업무 성과 분석', automation: 89, confidence: 93, processed: 567 }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-600 to-pink-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">AI 자동화 현황</h2>
                <p className="text-lg text-red-100">
                    DeepSeek R1 모델이 안전 심사 업무를 자동으로 지원하며, 
                    중요 결정은 실무자가 최종 검토합니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="자동 처리율" 
                    value={`${aiStats.automationRate}%`}
                    subtitle="실무자 검토 4.7%"
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
                    title="실무자 개입률" 
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
                                    <div className="text-2xl font-bold text-red-600">{item.automation}%</div>
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
                                            className="bg-red-600 h-2 rounded-full transition-all"
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
                        <h4 className="font-semibold text-gray-900 mb-3">DeepSeek R1 - 안전 심사</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 부처간 정책 충돌 자동 탐지</li>
                            <li>• 조정안 시뮬레이션</li>
                            <li>• 이해관계자 분석</li>
                            <li>• 과거 사례 학습</li>
                        </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">DeepSeek R1 - 업무 평가</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 정부업무 성과 자동 분석</li>
                            <li>• 규제 영향 평가</li>
                            <li>• 차관회의 자료 준비</li>
                            <li>• 국무회의 안건 검토</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIAutomation = AIAutomation;
