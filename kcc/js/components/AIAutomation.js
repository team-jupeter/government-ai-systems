const AIAutomation = () => {
    const aiStats = {
        automationRate: 89.5,
        avgConfidence: 96.8,
        humanApprovalRate: 10.5,
        errorRate: 0.08
    };
    
    const aiTasks = [
        { task: '방송 심의 자동 분석', automation: 91, confidence: 97, processed: 1247 },
        { task: '유해콘텐츠 탐지', automation: 96, confidence: 99, processed: 834 },
        { task: '통신민원 자동 분류', automation: 88, confidence: 95, processed: 1892 },
        { task: '광고규정 위반 검토', automation: 85, confidence: 94, processed: 456 },
        { task: '시장조사 데이터 분석', automation: 93, confidence: 98, processed: 678 }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">AI 자동화 현황</h2>
                <p className="text-lg text-purple-100">
                    DeepSeek R1 모델이 방송·통신 규제 업무를 자동으로 처리하며, 
                    중요 의사결정은 인간 전문가가 최종 승인합니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="자동 처리율" 
                    value={`${aiStats.automationRate}%`}
                    subtitle="인간 승인 10.5%"
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
                    title="인간 개입률" 
                    value={`${aiStats.humanApprovalRate}%`}
                    subtitle="중요 의사결정"
                    icon="✋" 
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI 모델 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-3">DeepSeek R1</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• 방송통신 전문 학습 데이터 380만 건</li>
                            <li>• 실시간 추론 속도 0.6초</li>
                            <li>• 다국어 지원 (한글 최적화)</li>
                            <li>• 지속적 학습 및 업데이트</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
                        <h4 className="font-semibold text-gray-900 mb-3">인간-AI 협업</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>• 신뢰도 95% 이상: 자동 처리</li>
                            <li>• 신뢰도 80-95%: 인간 검토</li>
                            <li>• 신뢰도 80% 미만: 인간 처리</li>
                            <li>• 중요 결정: 항상 인간 최종 승인</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIAutomation = AIAutomation;
