const AIAutomation = () => {
    const aiStats = {
        automationRate: 91.7,
        avgConfidence: 95.3,
        humanApprovalRate: 8.3,
        errorRate: 0.06
    };
    
    const aiTasks = [
        { task: '진정 내용 분석', automation: 95, confidence: 98, processed: 678 },
        { task: '유사 사례 검색', automation: 97, confidence: 99, processed: 534 },
        { task: '법률 검토 지원', automation: 92, confidence: 96, processed: 423 },
        { task: '권고안 초안 작성', automation: 85, confidence: 92, processed: 289 },
        { task: '통계 분석', automation: 98, confidence: 99, processed: 891 }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">AI 자동화 현황</h2>
                <p className="text-lg text-purple-100">
                    DeepSeek R1 모델이 진정 처리 업무를 자동으로 지원하며, 
                    중요 판단은 위원이 최종 결정합니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="자동 처리율" 
                    value={`${aiStats.automationRate}%`}
                    subtitle="위원 검토 8.3%"
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
                        <h4 className="font-semibold text-gray-900 mb-3">DeepSeek R1 - 사례 분석</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 진정 내용 자동 분류</li>
                            <li>• 인권침해 유형 판단</li>
                            <li>• 차별행위 패턴 분석</li>
                            <li>• 피해 정도 평가</li>
                        </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">DeepSeek R1 - 법률 검토</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• 관련 법률 자동 검색</li>
                            <li>• 유사 결정례 분석</li>
                            <li>• 국제인권조약 검토</li>
                            <li>• 권고안 작성 지원</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.AIAutomation = AIAutomation;
