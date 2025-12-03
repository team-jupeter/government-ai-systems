const CareerRecommend = () => {
    const example = {
        student: {
            name: '김○○ (중학교 2학년)',
            strengths: ['논리적 사고', '수학', '컴퓨터'],
            interests: ['게임', '코딩', 'AI'],
            personality: '분석적·내향적'
        },
        recommendations: [
            {
                job: 'AI 엔지니어',
                match: '92%',
                reason: '수학·코딩 능력 우수, AI 관심 높음',
                salary: '7,000만원',
                growth: '+245%'
            },
            {
                job: '게임 개발자',
                match: '87%',
                reason: '게임 관심, 프로그래밍 재능',
                salary: '6,500만원',
                growth: '+178%'
            },
            {
                job: '데이터 과학자',
                match: '84%',
                reason: '수학적 사고, 분석 능력',
                salary: '7,500만원',
                growth: '+234%'
            }
        ]
    };

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-compass text-blue-600 mr-3"></i>
                        AI 진로 추천 시스템
                    </h2>
                    <p className="text-lg text-gray-600">적성·흥미·미래 전망을 종합 분석</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200 mb-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">학생 프로필</h3>
                    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-gray-600 mb-2">학생 정보</div>
                                <div className="font-semibold text-gray-900 mb-4">{example.student.name}</div>
                                <div className="text-sm text-gray-600 mb-2">강점 영역</div>
                                <div className="flex flex-wrap gap-2">
                                    {example.student.strengths.map((s, i) => (
                                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-2">관심 분야</div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {example.student.interests.map((i, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            {i}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">성격 유형</div>
                                <div className="font-semibold text-gray-900">{example.student.personality}</div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">추천 직업 (TOP 3)</h3>
                    <div className="space-y-4">
                        {example.recommendations.map((rec, i) => (
                            <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-xl font-bold text-gray-900">{rec.job}</h4>
                                            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                                                매칭도 {rec.match}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{rec.reason}</p>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="text-xs text-gray-600 mb-1">예상 연봉</div>
                                        <div className="font-bold text-green-700">{rec.salary}</div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                        <div className="text-xs text-gray-600 mb-1">산업 성장률</div>
                                        <div className="font-bold text-purple-700">{rec.growth}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-road text-blue-600 mr-2"></i>
                        진로 로드맵
                    </h3>
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">1</div>
                            <div className="font-semibold text-gray-900">현재</div>
                            <div className="text-sm text-gray-600">중2</div>
                        </div>
                        <div className="text-3xl text-blue-600">→</div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">2</div>
                            <div className="font-semibold text-gray-900">고등학교</div>
                            <div className="text-sm text-gray-600">정보·수학 특화</div>
                        </div>
                        <div className="text-3xl text-blue-600">→</div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">3</div>
                            <div className="font-semibold text-gray-900">대학</div>
                            <div className="text-sm text-gray-600">컴퓨터공학</div>
                        </div>
                        <div className="text-3xl text-blue-600">→</div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">4</div>
                            <div className="font-semibold text-gray-900">취업</div>
                            <div className="text-sm text-gray-600">AI 엔지니어</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
