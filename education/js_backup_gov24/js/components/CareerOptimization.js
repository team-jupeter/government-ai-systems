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

    const simulation = {
        current: '고등학교 2학년',
        interest: '데이터 분석',
        personality: '분석적, 논리적',
        paths: [
            {
                title: '경로 A: 데이터 과학자',
                steps: [
                    '대학: 통계학과',
                    '대학원: 데이터 사이언스 석사',
                    '직장: IT 기업 데이터 분석가',
                    '5년 후: 시니어 데이터 과학자',
                    '10년 후: AI 연구소 팀장'
                ],
                probability: '87%',
                salary: '연봉 7,500만원 → 1억 2천만원'
            },
            {
                title: '경로 B: 비즈니스 분석가',
                steps: [
                    '대학: 경영학과',
                    '자격증: 데이터 분석 전문가',
                    '직장: 컨설팅 회사 애널리스트',
                    '5년 후: 프로젝트 매니저',
                    '10년 후: 컨설팅 파트너'
                ],
                probability: '82%',
                salary: '연봉 6,000만원 → 1억 5천만원'
            }
        ]
    };

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
                        커리어 시뮬레이션 예시
                    </h3>
                    
                    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                        <h4 className="font-bold text-gray-900 mb-4">📊 입력 정보</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <span className="text-sm text-gray-600">현재 상태:</span>
                                <div className="font-semibold text-gray-900">{simulation.current}</div>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">관심 분야:</span>
                                <div className="font-semibold text-gray-900">{simulation.interest}</div>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">성격 유형:</span>
                                <div className="font-semibold text-gray-900">{simulation.personality}</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {simulation.paths.map((path, i) => (
                            <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                                <h4 className="font-bold text-gray-900 mb-4 text-lg">{path.title}</h4>
                                <div className="space-y-3 mb-4">
                                    {path.steps.map((step, j) => (
                                        <div key={j} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                {j + 1}
                                            </div>
                                            <div className="text-sm text-gray-700">{step}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                        <div className="text-xs text-gray-600 mb-1">성공 확률</div>
                                        <div className="text-lg font-bold text-blue-600">{path.probability}</div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                        <div className="text-xs text-gray-600 mb-1">예상 연봉</div>
                                        <div className="text-sm font-semibold text-green-700">{path.salary}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
