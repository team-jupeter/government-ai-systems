const AITeachers = () => {
    const teachers = [
        {
            subject: '수학',
            icon: '📐',
            specialty: '개념 이해 중심',
            features: ['단계별 문제 풀이', '시각화 설명', '오답 패턴 분석']
        },
        {
            subject: '영어',
            icon: '📚',
            specialty: '회화·문법 통합',
            features: ['AI 음성 대화', '문법 자동 교정', '어휘력 강화']
        },
        {
            subject: '과학',
            icon: '🔬',
            specialty: '실험·탐구 중심',
            features: ['가상 실험실', '원리 애니메이션', '탐구 과제 제시']
        },
        {
            subject: '사회',
            icon: '🌍',
            specialty: '시사·토론 연계',
            features: ['뉴스 분석', '토론 시뮬레이션', '논리적 사고']
        }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-chalkboard-teacher text-blue-600 mr-3"></i>
                        과목별 AI 교사
                    </h2>
                    <p className="text-lg text-gray-600">학생 수준에 맞춘 1:1 맞춤 지도</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teachers.map((teacher, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200">
                            <div className="text-5xl mb-4 text-center">{teacher.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{teacher.subject}</h3>
                            <p className="text-sm text-blue-600 mb-4 text-center font-medium">{teacher.specialty}</p>
                            <div className="space-y-2">
                                {teacher.features.map((feature, j) => (
                                    <div key={j} className="text-xs text-gray-700 bg-gray-50 rounded-lg p-2">
                                        • {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-user-graduate text-blue-600 mr-2"></i>
                        AI 교사의 특징
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-3">⏰</div>
                            <div className="font-semibold text-gray-900 mb-2">24/7 학습 지원</div>
                            <p className="text-sm text-gray-600">언제든 질문하고 배울 수 있음</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-3">🎯</div>
                            <div className="font-semibold text-gray-900 mb-2">완벽한 맞춤 학습</div>
                            <p className="text-sm text-gray-600">학생 수준에 정확히 맞춤</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-3">📊</div>
                            <div className="font-semibold text-gray-900 mb-2">실시간 진도 관리</div>
                            <p className="text-sm text-gray-600">학습 데이터 자동 분석</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
