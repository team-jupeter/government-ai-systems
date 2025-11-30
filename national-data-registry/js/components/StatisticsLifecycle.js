const StatisticsLifecycle = () => {
    const stages = [
        { icon: '📝', title: '수집', desc: '503만+ 정부·민간 데이터 소스', color: 'blue' },
        { icon: '🔍', title: '검증', desc: 'OpenHash 무결성 확인', color: 'cyan' },
        { icon: '🤖', title: 'AI 분석', desc: '멀티에이전트 자동 분석', color: 'purple' },
        { icon: '📊', title: '통계생성', desc: '실시간 통계 산출', color: 'green' },
        { icon: '🌐', title: '공개', desc: '오픈API로 제공', color: 'amber' }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-chart-line text-blue-600 mr-3"></i>
                        통계 생명주기 관리
                    </h2>
                    <p className="text-lg text-gray-600">데이터 수집부터 공개까지 완전 자동화</p>
                </div>

                <div className="relative">
                    {/* 연결선 */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
                    
                    <div className="grid md:grid-cols-5 gap-6 relative">
                        {stages.map((stage, i) => (
                            <div key={i} className="relative">
                                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 card-hover shadow-md text-center">
                                    <div className="text-5xl mb-4">{stage.icon}</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                                    <p className="text-sm text-gray-600">{stage.desc}</p>
                                </div>
                                {i < stages.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 text-2xl text-gray-400">→</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                            <i className="fas fa-clock text-blue-600 mr-2"></i>
                            실시간 업데이트
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                            <li>• 데이터 변경 시 즉시 통계 반영</li>
                            <li>• 평균 갱신 시간: 15분 이내</li>
                            <li>• 24/7 무중단 운영</li>
                        </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                            <i className="fas fa-shield-alt text-green-600 mr-2"></i>
                            품질 보장
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                            <li>• AI 기반 이상치 자동 탐지</li>
                            <li>• OpenHash로 데이터 무결성 검증</li>
                            <li>• 정확도 99.7% 이상 유지</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
