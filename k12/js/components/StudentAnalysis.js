const StudentAnalysis = () => {
    const analysisTypes = [
        {
            icon: '🎯',
            title: '학습 속도 분석',
            desc: '과목별 이해 속도 측정',
            result: '수학: 빠름 / 영어: 보통'
        },
        {
            icon: '💪',
            title: '강점 영역',
            desc: '잘하는 분야 파악',
            result: '논리·추론·공간지각'
        },
        {
            icon: '📈',
            title: '성장 잠재력',
            desc: '향상 가능성 예측',
            result: '과학: 높음 / 역사: 중간'
        },
        {
            icon: '🧠',
            title: '학습 스타일',
            desc: '선호하는 학습 방식',
            result: '시각적·실습형'
        }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-user-chart text-blue-600 mr-3"></i>
                        학생 역량 분석
                    </h2>
                    <p className="text-lg text-gray-600">AI가 분석하는 개인별 학습 프로필</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {analysisTypes.map((type, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 card-hover shadow-md">
                            <div className="text-5xl mb-4 text-center">{type.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{type.title}</h3>
                            <p className="text-sm text-gray-600 mb-3 text-center">{type.desc}</p>
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                <p className="text-xs text-gray-700 text-center">{type.result}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-chart-pie text-blue-600 mr-2"></i>
                        종합 분석 리포트 예시
                    </h3>
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-900">수학적 사고력</span>
                                    <span className="text-sm font-bold text-blue-600">85%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-blue-600 h-3 rounded-full" style={{width: '85%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-900">언어 능력</span>
                                    <span className="text-sm font-bold text-green-600">72%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-green-600 h-3 rounded-full" style={{width: '72%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-900">창의성</span>
                                    <span className="text-sm font-bold text-purple-600">91%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-purple-600 h-3 rounded-full" style={{width: '91%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-900">협업 능력</span>
                                    <span className="text-sm font-bold text-cyan-600">68%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="bg-cyan-600 h-3 rounded-full" style={{width: '68%'}}></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-gray-700">
                                <strong className="text-blue-700">AI 분석 결과:</strong> 논리적 사고와 창의성이 뛰어나며, 수학·과학 계열 진로에 적합합니다. 팀 프로젝트 경험을 늘리면 협업 능력도 향상될 것입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
