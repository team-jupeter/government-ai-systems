const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 우주항공청 AI 상담 서비스입니다. 발사체, 위성, 우주탐사, 항공 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const quickQuestions = [
        '누리호 발사 일정은 언제인가요?',
        '다누리 달 탐사선은 어떻게 되나요?',
        '한국형위성항법(KPS)란 무엇인가요?',
        '우주항공청 견학 신청 방법은?',
        '우주산업 지원 사업은 무엇이 있나요?',
        '미래항공모빌리티(AAM)란?'
    ];

    const responses = {
        '누리호': '누리호는 한국형발사체로 2024년 11월 4차 발사에 성공했습니다. 다음 발사 일정은 우주항공청 누리집(www.kasa.go.kr)에서 확인하실 수 있습니다.',
        '다누리': '다누리는 2022년 8월 발사된 한국 최초 달 궤도선으로, 현재 정상 운영 중입니다. 달 표면 고해상도 영상과 과학 데이터를 지구로 전송하고 있습니다.',
        'KPS': '한국형위성항법(KPS)은 독자적인 위성항법 시스템으로, 2035년 완성을 목표로 개발 중입니다. GPS와 유사하게 위치·항법·시각 정보를 제공합니다.',
        '견학': '우주항공청 견학은 누리집(www.kasa.go.kr)에서 사전 신청이 필요합니다. 나로우주센터, 항우연 등 다양한 시설 견학이 가능합니다.',
        '지원': '우주산업 지원사업으로 R&D 지원, 창업 지원, 국제협력 등이 있습니다. 자세한 내용은 우주항공청 누리집의 지원사업 메뉴를 참고하세요.',
        'AAM': '미래항공모빌리티(AAM)는 도심항공교통으로, 전기수직이착륙기(eVTOL) 등을 활용한 새로운 교통 수단입니다. 우주항공청이 안전 인증 및 산업 육성을 담당합니다.'
    };

    const getResponse = (userInput) => {
        const input = userInput.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (input.includes(keyword.toLowerCase())) return response;
        }
        return '죄송합니다. 해당 문의에 대한 정보를 찾지 못했습니다. 우주항공청 대표전화 055-851-4000번으로 문의해주세요.';
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: getResponse(input) }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 상담 서비스</h2>
                <p className="text-sm text-gray-600 mt-1">DeepSeek R1 기반 24시간 자동 상담</p>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">💬 자주 묻는 질문</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {quickQuestions.map((q, idx) => (
                        <button key={idx} onClick={() => setInput(q)}
                            className="text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors">
                            {q}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                            }`}>
                                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t p-4">
                    <div className="flex space-x-2">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="궁금하신 내용을 입력하세요..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                        <button onClick={handleSend}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📞 추가 문의</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 대표전화: 055-851-4000</p>
                    <p>• 홈페이지: www.kasa.go.kr</p>
                    <p>• 운영시간: 24시간 AI 자동 상담</p>
                </div>
            </div>
        </div>
    );
};

(() => AIChat)();
