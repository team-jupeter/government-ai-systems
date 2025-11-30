const FutureIndustry = () => {
    const industries = [
        { name: 'AI·데이터', icon: '🤖', growth: '+245%', jobs: '85만', color: 'blue' },
        { name: '바이오헬스', icon: '🧬', growth: '+187%', jobs: '62만', color: 'green' },
        { name: '반도체', icon: '💎', growth: '+156%', jobs: '48만', color: 'purple' },
        { name: '친환경에너지', icon: '🌱', growth: '+198%', jobs: '71만', color: 'emerald' },
        { name: '우주항공', icon: '🚀', growth: '+134%', jobs: '35만', color: 'indigo' },
        { name: '로보틱스', icon: '🦾', growth: '+167%', jobs: '43만', color: 'cyan' }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-rocket text-blue-600 mr-3"></i>
                        미래 유망 산업 분석
                    </h2>
                    <p className="text-lg text-gray-600">2030년 주요 산업 성장률 및 일자리 예측</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {industries.map((ind, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 card-hover shadow-md">
                            <div className="text-5xl mb-4 text-center">{ind.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{ind.name}</h3>
                            <div className="space-y-2">
                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                    <div className="text-xs text-gray-600 mb-1">성장률</div>
                                    <div className="text-lg font-bold text-blue-600">{ind.growth}</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                    <div className="text-xs text-gray-600 mb-1">예상 일자리</div>
                                    <div className="text-lg font-bold text-green-600">{ind.jobs}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <i className="fas fa-chart-line text-3xl text-blue-600 flex-shrink-0"></i>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">AI 기반 산업 전망</h4>
                            <p className="text-gray-700">정부 산업정책, 글로벌 시장 동향, 기술 발전 속도를 AI가 분석하여 학생들에게 미래 유망 직업을 추천합니다. 매월 업데이트되는 최신 데이터로 정확한 진로 지도를 제공합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
