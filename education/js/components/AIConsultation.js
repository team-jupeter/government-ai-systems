const AIConsultation = () => {
    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-comments text-blue-600 mr-3"></i>
                        AI 교육 상담 서비스
                    </h2>
                    <p className="text-lg text-gray-600">24/7 맞춤형 학습 상담 및 진로 지도</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200 mb-12">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                    <i className="fas fa-robot text-white text-xl"></i>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">AI 교육 상담원</div>
                                    <div className="text-sm text-green-600">● 상담 가능</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                    안녕하세요! AI 교육 상담원입니다. 학습 계획, 진로 고민, 과목 선택 등 무엇이든 상담해드립니다.
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4 text-gray-700 ml-12">
                                    제가 수학을 좋아하는데, 어떤 진로가 있을까요?
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                    수학에 흥미가 있으시군요! 데이터 과학자, 금융 애널리스트, 암호학 연구원, AI 엔지니어 등 다양한 진로가 있습니다. 성격 테스트와 적성 검사를 해보시겠어요?
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="학습이나 진로 관련 질문을 입력하세요..." 
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                            />
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                전송
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center card-hover">
                        <div className="text-3xl mb-3">📚</div>
                        <div className="font-semibold text-gray-900 mb-2">학습 설계</div>
                        <p className="text-sm text-gray-600">맞춤형 커리큘럼 제공</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center card-hover">
                        <div className="text-3xl mb-3">🎯</div>
                        <div className="font-semibold text-gray-900 mb-2">진로 상담</div>
                        <p className="text-sm text-gray-600">직업 적성 분석</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center card-hover">
                        <div className="text-3xl mb-3">💡</div>
                        <div className="font-semibold text-gray-900 mb-2">학습 전략</div>
                        <p className="text-sm text-gray-600">효율적 공부법 제안</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center card-hover">
                        <div className="text-3xl mb-3">📊</div>
                        <div className="font-semibold text-gray-900 mb-2">성적 분석</div>
                        <p className="text-sm text-gray-600">강약점 진단</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
