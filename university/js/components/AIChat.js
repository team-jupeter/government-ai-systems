const AIChat = ({ studentId }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentProfessor, setCurrentProfessor] = React.useState(null);
    const chatEndRef = React.useRef(null);

    const professors = [
        { id: 'prof-algorithm', name: '알고리즘 AI 교수', icon: '🧮', subject: '알고리즘 이론' },
        { id: 'prof-datastructure', name: '자료구조 AI 교수', icon: '🗂️', subject: '자료구조' },
        { id: 'prof-ml', name: '머신러닝 AI 교수', icon: '🤖', subject: '머신러닝' },
        { id: 'prof-dl', name: '딥러닝 AI 교수', icon: '🧠', subject: '딥러닝' },
        { id: 'prof-statistics', name: '확률통계 AI 교수', icon: '📊', subject: '확률과 통계' }
    ];

    React.useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const selectProfessor = (prof) => {
        setCurrentProfessor(prof);
        setMessages([{
            id: 1,
            type: 'ai',
            content: `안녕하세요! 저는 ${prof.name}입니다. ${prof.icon}\n\n무엇이든 질문해 주세요. 강의 내용, 과제, 시험 준비 등 어떤 주제든 도와드리겠습니다.`,
            timestamp: new Date().toISOString()
        }]);
    };

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading || !currentProfessor) return;

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            content: inputText,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch(`/api/university/professor/${currentProfessor.id}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: studentId, message: query })
            });
            const data = await response.json();
            
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: data.response || '죄송합니다. 잠시 후 다시 시도해 주세요.',
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
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

    const quickQuestions = [
        '이번 주 나오는 문제 유형은?',
        '과제 힌트를 주세요',
        '추천 참고자료가 있나요?'
    ];

    return (
        <>
            {/* AI 채팅 패널 - 사이드바(280px) 오른쪽에 위치 */}
            {isOpen && (
                <div 
                    className="fixed bottom-0 bg-gray-50 rounded-t-2xl shadow-2xl border border-gray-200 border-b-0 z-50 flex flex-col"
                    style={{ left: '296px', width: '400px', height: '500px' }}
                >
                    {/* 헤더 */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                        <div className="flex items-center space-x-3">
                            {currentProfessor ? (
                                <>
                                    <span className="text-2xl">{currentProfessor.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-sm">{currentProfessor.name}</h3>
                                        <p className="text-xs text-gray-400">{currentProfessor.subject}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl">🎓</span>
                                    <h3 className="font-semibold">AI 교수 선택</h3>
                                </>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            {currentProfessor && (
                                <button 
                                    onClick={() => { setCurrentProfessor(null); setMessages([]); }}
                                    className="text-gray-400 hover:text-gray-900 p-1"
                                    title="교수 변경"
                                >
                                    <i className="fas fa-exchange-alt"></i>
                                </button>
                            )}
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-900 p-1"
                            >
                                <i className="fas fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>

                    {/* 내용 영역 */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {!currentProfessor ? (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-400 mb-4">대화할 AI 교수를 선택하세요:</p>
                                {professors.map(prof => (
                                    <button
                                        key={prof.id}
                                        onClick={() => selectProfessor(prof)}
                                        className="w-full flex items-center space-x-3 p-3 bg-gray-100 hover:bg-gray-600 rounded-lg transition-colors"
                                    >
                                        <span className="text-2xl">{prof.icon}</span>
                                        <div className="text-left">
                                            <p className="font-medium text-sm">{prof.name}</p>
                                            <p className="text-xs text-gray-400">{prof.subject}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map(message => (
                                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {message.type === 'ai' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                                                {currentProfessor.icon}
                                            </div>
                                        )}
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.type === 'user' ? 'bg-yellow-600' : 'bg-gray-100'}`}>
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-sm mr-2">
                                            {currentProfessor.icon}
                                        </div>
                                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef}></div>
                            </div>
                        )}
                    </div>

                    {/* 빠른 질문 */}
                    {currentProfessor && messages.length <= 2 && (
                        <div className="px-4 py-2 border-t border-gray-200 flex-shrink-0">
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setInputText(q); }}
                                        className="text-xs bg-gray-100 hover:bg-gray-600 px-3 py-1 rounded-full"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 입력 영역 */}
                    {currentProfessor && (
                        <div className="p-4 border-t border-gray-200 flex-shrink-0">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="질문을 입력하세요..."
                                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!inputText.trim() || isLoading}
                                    className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full flex items-center justify-center disabled:opacity-50"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 토글 버튼 - 사이드바 오른쪽에 위치 */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 z-50"
                    style={{ left: '296px' }}
                >
                    <i className="fas fa-robot text-lg"></i>
                    <span className="font-medium">AI 교수와 대화</span>
                </button>
            )}
        </>
    );
};
