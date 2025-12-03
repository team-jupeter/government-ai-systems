const BalanceMechanism = () => {
    const mechanisms = [
        {
            icon: '⚖️',
            title: '개인-사회 균형',
            individual: '학생의 흥미·적성',
            society: '사회의 인력 수요',
            result: '최적 진로 추천'
        },
        {
            icon: '🎯',
            title: '단기-장기 균형',
            individual: '현재 학습 목표',
            society: '미래 경력 설계',
            result: '단계별 로드맵'
        },
        {
            icon: '💡',
            title: '이론-실습 균형',
            individual: '개념 학습',
            society: '실전 프로젝트',
            result: '통합 커리큘럼'
        }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-balance-scale text-blue-600 mr-3"></i>
                        개인-사회 통합 최적화
                    </h2>
                    <p className="text-lg text-gray-600">개인의 꿈과 사회의 필요를 조화</p>
                </div>

                <div className="space-y-8">
                    {mechanisms.map((mech, i) => (
                        <div key={i} className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-5xl">{mech.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900">{mech.title}</h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <div className="text-sm text-gray-600 mb-2">개인 관점</div>
                                    <div className="font-semibold text-gray-900">{mech.individual}</div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="text-3xl text-blue-600">⇄</div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                    <div className="text-sm text-gray-600 mb-2">사회 관점</div>
                                    <div className="font-semibold text-gray-900">{mech.society}</div>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <div className="inline-block bg-purple-50 border border-purple-200 rounded-lg px-6 py-3">
                                    <div className="text-sm text-gray-600 mb-1">통합 결과</div>
                                    <div className="font-bold text-purple-700">{mech.result}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <i className="fas fa-handshake text-3xl text-blue-600 flex-shrink-0"></i>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Win-Win 교육 시스템</h4>
                            <p className="text-gray-700">학생은 자신이 좋아하는 분야에서 성장하고, 사회는 필요한 인재를 확보하는 선순환 구조를 만듭니다. AI가 두 가지 관점을 동시에 고려하여 최적의 교육 경로를 설계합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
