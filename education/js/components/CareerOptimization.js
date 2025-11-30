const CareerOptimization = () => {
    const features = [
        {
            icon: '🎯',
            title: '진로 매칭 AI',
            desc: '개인 특성과 직업 적합도 분석',
            accuracy: '94.2%'
        },
        {
            icon: '📈',
            title: '성장 경로 예측',
            desc: '5년·10년 후 커리어 시뮬레이션',
            accuracy: '88.7%'
        },
        {
            icon: '💼',
            title: '실시간 채용 정보',
            desc: '맞춤형 일자리 추천',
            accuracy: '실시간'
        },
        {
            icon: '🎓',
            title: '필요 역량 분석',
            desc: '목표 직업을 위한 학습 로드맵',
            accuracy: '맞춤형'
        }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-route text-blue-600 mr-3"></i>
                        AI 경력 최적화 시스템
                    </h2>
                    <p className="text-lg text-gray-600">개인의 꿈과 사회의 수요를 연결</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 card-hover shadow-md text-center">
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{feature.desc}</p>
                            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                                <span className="text-sm font-semibold text-blue-700">{feature.accuracy}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-map-marked-alt text-blue-600 mr-2"></i>
                        커리어 경로 예시
                    </h3>
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="text-center mb-6">
                            <div className="text-4xl mb-3">👨‍💻</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">데이터 과학자 경로</h4>
                            <p className="text-gray-600">고등학생 → 대학 → 취업 → 경력 발전</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900">통계학과 진학</div>
                                    <div className="text-sm text-gray-600">수학·통계 집중 학습</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900">데이터 사이언스 석사</div>
                                    <div className="text-sm text-gray-600">AI·머신러닝 전문화</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900">IT 기업 데이터 분석가</div>
                                    <div className="text-sm text-gray-600">실무 경험 3-5년</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900">시니어 데이터 과학자</div>
                                    <div className="text-sm text-gray-600">연봉 1억+ 도달</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
