const OnboardingTour = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(true);

    const tourSteps = [
        {
            title: 'AI 통합대학에 오신 것을 환영합니다! 🎓',
            content: '기존 대학 시스템을 완전히 혁신한 AI 기반 평생 학습 플랫폼입니다.',
            icon: '👋',
            highlight: '15개 과목, 84만 수강생이 함께하고 있습니다'
        },
        {
            title: '평생 학습 기록 보관 🔐',
            content: '유치원부터 현재까지 모든 학습 기록이 개인정보 금고(PDV)에 안전하게 저장됩니다.',
            icon: '📚',
            highlight: 'OpenHash 체인 기반 위변조 불가능',
            features: ['10년+ 학습 이력 추적', '성적 변화 원인 분석', 'AI 기반 성장 패턴 분석']
        },
        {
            title: 'AI 교수와 1:1 학습 🤖',
            content: '각 과목별 전담 AI 교수가 24시간 질문에 답변하고, 맞춤형 학습을 지원합니다.',
            icon: '🎯',
            highlight: '무제한 질문, 즉각적인 피드백',
            features: ['개념 설명', '문제 풀이', '코드 리뷰', '학습 방향 조언']
        },
        {
            title: 'AI 진로 분석 💼',
            content: '과거 학습 이력을 기반으로 최적의 진로를 추천하고, 필요한 역량을 안내합니다.',
            icon: '📊',
            highlight: '12년 데이터 기반 정밀 매칭',
            features: ['적성 분석', '직업 추천', '역량 gap 분석', '커리어 로드맵']
        },
        {
            title: '시작할 준비가 되셨나요? 🚀',
            content: '대시보드에서 "내 학습 여정"을 클릭하여 지금까지의 학습 기록을 확인해 보세요!',
            icon: '✨',
            highlight: '지금 바로 시작하세요'
        }
    ];

    const handleNext = () => {
        if (currentStep < tourSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete(false);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = (dontShowAgain = false) => {
        if (dontShowAgain) {
            localStorage.setItem('ai-university-tour-hidden', 'true');
        }
        setIsVisible(false);
        if (onComplete) onComplete();
    };

    const handleSkip = () => {
        handleComplete(false);
    };

    const handleDontShowAgain = () => {
        handleComplete(true);
    };

    if (!isVisible) return null;

    const step = tourSteps[currentStep];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-50 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200">
                {/* 진행 표시 */}
                <div className="h-1 bg-gray-100">
                    <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                    ></div>
                </div>

                {/* 내용 */}
                <div className="p-8">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                            {step.icon}
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
                        <p className="text-gray-400">{step.content}</p>
                    </div>

                    {/* 하이라이트 */}
                    <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-xl p-4 text-center mb-4">
                        <p className="text-yellow-400 font-semibold">{step.highlight}</p>
                    </div>

                    {/* 기능 목록 */}
                    {step.features && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {step.features.map((feature, i) => (
                                <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                                    <i className="fas fa-check text-green-400"></i>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 단계 표시 */}
                    <div className="flex justify-center space-x-2 mb-6">
                        {tourSteps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentStep(i)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    i === currentStep ? 'w-6 bg-yellow-500' : 'bg-gray-600 hover:bg-gray-500'
                                }`}
                            ></button>
                        ))}
                    </div>

                    {/* 버튼 */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSkip}
                            className="text-gray-500 hover:text-gray-400 text-sm"
                        >
                            건너뛰기
                        </button>
                        <div className="flex space-x-3">
                            {currentStep > 0 && (
                                <button
                                    onClick={handlePrev}
                                    className="bg-gray-100 hover:bg-gray-600 px-5 py-2 rounded-lg"
                                >
                                    <i className="fas fa-chevron-left mr-2"></i>이전
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-5 py-2 rounded-lg font-medium"
                            >
                                {currentStep === tourSteps.length - 1 ? '시작하기' : '다음'}
                                {currentStep < tourSteps.length - 1 && <i className="fas fa-chevron-right ml-2"></i>}
                            </button>
                        </div>
                    </div>

                    {/* 다시 보지 않기 */}
                    <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                        <button
                            onClick={handleDontShowAgain}
                            className="text-gray-500 hover:text-gray-400 text-sm flex items-center justify-center mx-auto space-x-2"
                        >
                            <i className="fas fa-eye-slash"></i>
                            <span>다시 보지 않기</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
