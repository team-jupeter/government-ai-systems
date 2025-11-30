const ThesisAssistant = ({ studentId, onNavigate }) => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [thesis, setThesis] = React.useState({ title: '', field: '' });
    const [chatMessages, setChatMessages] = React.useState([]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    const steps = [
        { id: 1, name: '주제 선정', icon: 'fa-lightbulb', description: 'AI가 연구 주제를 제안합니다' },
        { id: 2, name: '문헌 조사', icon: 'fa-search', description: '관련 논문을 자동 검색합니다' },
        { id: 3, name: '개요 작성', icon: 'fa-sitemap', description: '논문 구조를 설계합니다' },
        { id: 4, name: '본문 작성', icon: 'fa-edit', description: 'AI 대화형 집필 보조' },
        { id: 5, name: '검토/수정', icon: 'fa-check-double', description: '표절 검사, 문법 교정' },
        { id: 6, name: '제출/심사', icon: 'fa-paper-plane', description: 'AI 자동 심사 (24시간)' }
    ];

    React.useEffect(() => {
        if (chatMessages.length === 0) {
            setChatMessages([{
                id: 1,
                type: 'ai',
                content: '안녕하세요! AI 논문 작성 보조 시스템입니다. 🎓\n\n졸업 논문 작성을 도와드리겠습니다. 어떤 분야의 논문이든 도움을 드릴 수 있습니다.\n\n편하게 말씀해 주세요:\n• 관심 있는 연구 분야나 주제\n• 이미 정해진 논문 주제\n• 논문 작성 관련 궁금한 점',
                timestamp: new Date().toISOString()
            }]);
        }
    }, []);

    React.useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage = {
            id: chatMessages.length + 1,
            type: 'user',
            content: inputText,
            timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, userMessage]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/university/thesis/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student_id: studentId,
                    message: query,
                    current_step: currentStep,
                    thesis_info: thesis
                })
            });
            
            const data = await response.json();
            
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: data.response || '죄송합니다. 잠시 후 다시 시도해 주세요.',
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            console.error('Thesis chat error:', error);
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleStepChange = (newStep) => {
        setCurrentStep(newStep);
        const stepMessages = {
            1: '주제 선정 단계입니다. 관심 있는 연구 분야나 해결하고 싶은 문제를 말씀해 주세요.',
            2: '문헌 조사 단계입니다. 선정된 주제와 관련된 기존 연구를 검토해 보겠습니다.',
            3: '개요 작성 단계입니다. 논문의 전체 구조를 설계해 보겠습니다.',
            4: '본문 작성 단계입니다. 어떤 섹션부터 작성을 시작할까요?',
            5: '검토/수정 단계입니다. 표절 검사, 문법 교정, 논리 흐름 점검을 도와드리겠습니다.',
            6: '제출/심사 단계입니다. 최종 논문을 제출하고 AI 자동 심사를 받을 준비가 되셨나요?'
        };
        setChatMessages(prev => [...prev, {
            id: prev.length + 1,
            type: 'ai',
            content: stepMessages[newStep],
            timestamp: new Date().toISOString()
        }]);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">AI 논문 작성 보조</h1>
                <p className="text-gray-400 mt-1">AI와 함께 단계별로 졸업 논문을 작성하세요</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between overflow-x-auto pb-2">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <button
                                onClick={() => handleStepChange(step.id)}
                                className={`flex flex-col items-center min-w-[100px] ${
                                    currentStep === step.id ? 'text-yellow-400' : 
                                    currentStep > step.id ? 'text-green-400' : 'text-gray-500'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    currentStep === step.id ? 'bg-yellow-500 bg-opacity-20 border-2 border-yellow-500' :
                                    currentStep > step.id ? 'bg-green-500 bg-opacity-20' : 'bg-gray-100'
                                }`}>
                                    {currentStep > step.id ? <i className="fas fa-check"></i> : <i className={`fas ${step.icon}`}></i>}
                                </div>
                                <span className="text-xs font-medium">{step.name}</span>
                            </button>
                            {index < steps.length - 1 && (
                                <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-100'}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                    <i className={`fas ${steps[currentStep - 1].icon} text-blue-400 text-xl`}></i>
                    <div>
                        <h3 className="font-semibold">현재 단계: {steps[currentStep - 1].name}</h3>
                        <p className="text-sm text-gray-400">{steps[currentStep - 1].description}</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map(message => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {message.type === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-sm mr-2 flex-shrink-0">🎓</div>
                            )}
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-yellow-600' : 'bg-gray-100'}`}>
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-sm mr-2">🎓</div>
                            <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef}></div>
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
                            rows={2}
                            className="flex-1 bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputText.trim() || isLoading}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 rounded-lg disabled:opacity-50 self-end"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => handleStepChange(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="bg-gray-100 hover:bg-gray-600 px-6 py-3 rounded-lg disabled:opacity-50"
                >
                    <i className="fas fa-chevron-left mr-2"></i>이전 단계
                </button>
                <button
                    onClick={() => handleStepChange(Math.min(6, currentStep + 1))}
                    disabled={currentStep === 6}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg disabled:opacity-50"
                >
                    다음 단계<i className="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
    );
};
