const AIConsultation = () => {
    const features = [
        { icon: '🤖', title: 'AI 에이전트 상담', desc: '24/7 자동 응대', color: 'blue' },
        { icon: '📊', title: '데이터 분석 지원', desc: '실시간 통계 제공', color: 'cyan' },
        { icon: '🔍', title: '맞춤형 추천', desc: '개인화된 정보 제공', color: 'purple' },
        { icon: '🌐', title: '다국어 지원', desc: '10개 언어 실시간 번역', color: 'green' }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-robot text-blue-600 mr-3"></i>
                        AI 상담 서비스
                    </h2>
                    <p className="text-lg text-gray-600">언제 어디서나 받는 지능형 데이터 상담</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover shadow-sm">
                            <div className="text-5xl mb-4">{f.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                            <p className="text-sm text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">지금 바로 AI 상담 받기</h3>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                    <i className="fas fa-robot text-white text-xl"></i>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">AI 데이터 상담원</div>
                                    <div className="text-sm text-green-600">● 상담 가능</div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                안녕하세요! 국가데이터처 AI 상담원입니다. 데이터 연계, API 사용, 통계 조회 등 무엇이든 물어보세요.
                            </div>
                            <div className="mt-4 flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="질문을 입력하세요..." 
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                                />
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    전송
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
