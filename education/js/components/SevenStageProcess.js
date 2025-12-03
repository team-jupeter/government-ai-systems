const SevenStageProcess = () => {
    const stages = [
        { num: 1, name: '자아 발견', icon: '🔍', desc: '본인의 강점·약점 파악', color: 'blue' },
        { num: 2, name: '역량 진단', icon: '📊', desc: 'AI 기반 능력 평가', color: 'cyan' },
        { num: 3, name: '맞춤 학습', icon: '📚', desc: '개인별 최적 커리큘럼', color: 'green' },
        { num: 4, name: '실습 체험', icon: '🛠️', desc: '실전 프로젝트 수행', color: 'yellow' },
        { num: 5, name: '경력 탐색', icon: '🎯', desc: '직업·진로 시뮬레이션', color: 'orange' },
        { num: 6, name: '사회 기여', icon: '🤝', desc: '공동체 프로젝트 참여', color: 'purple' },
        { num: 7, name: '지속 성장', icon: '🚀', desc: '평생 학습 관리', color: 'pink' }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-layer-group text-blue-600 mr-3"></i>
                        7단계 통합 최적화 프로세스
                    </h2>
                    <p className="text-lg text-gray-600">개인의 잠재력과 사회의 필요를 연결</p>
                </div>

                <div className="grid md:grid-cols-7 gap-4">
                    {stages.map((stage, i) => (
                        <div key={i} className="relative">
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 card-hover shadow-md text-center">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                                    {stage.num}
                                </div>
                                <div className="text-3xl mb-2">{stage.icon}</div>
                                <h3 className="font-bold text-sm text-gray-900 mb-1">{stage.name}</h3>
                                <p className="text-xs text-gray-600">{stage.desc}</p>
                            </div>
                            {i < stages.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-2 text-2xl text-blue-600 z-10">→</div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <i className="fas fa-lightbulb text-3xl text-blue-600 flex-shrink-0"></i>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">개인-사회 통합 최적화</h4>
                            <p className="text-gray-700">7단계 프로세스는 개인의 성장을 지원하면서 동시에 사회가 필요로 하는 인재를 양성합니다. AI가 개인의 특성과 사회의 수요를 분석하여 최적의 학습 경로를 제시합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
