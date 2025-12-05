const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 병무청 AI 상담 서비스입니다. 병역판정검사, 입영, 사회복무, 산업기능요원 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const quickQuestions = [
        '병역판정검사는 언제 받나요?',
        '입영일자를 연기할 수 있나요?',
        '사회복무요원은 무엇인가요?',
        '국외여행 허가는 어떻게 받나요?',
        '산업기능요원 지원 방법은?',
        '병역 상담 전화번호는?'
    ];

    const responses = {
        '병역판정': '병역판정검사는 만 19세가 되는 해에 받습니다. 병무청 홈페이지(www.mma.go.kr)에서 온라인으로 예약 가능합니다.',
        '입영': '입영일자 연기는 질병, 가족 부양, 학업 등의 사유로 가능합니다. 병무청 홈페이지에서 연기 신청하세요.',
        '사회복무': '사회복무요원은 공공기관 등에서 사회서비스 업무를 수행하는 병역입니다. 복무기간은 21개월입니다.',
        '국외여행': '국외여행 허가는 병무청 홈페이지에서 온라인으로 신청 가능합니다. 출국 3일 전까지 신청하세요.',
        '산업기능': '산업기능요원은 지정업체에서 복무하는 병역입니다. 학사 이상 학위 소지자가 지원 가능합니다.',
        '전화': '병무청 상담센터는 1588-9090번입니다. 평일 09:00-18:00 운영됩니다.'
    };

    const getResponse = (userInput) => {
        const input = userInput.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (input.includes(keyword.toLowerCase())) return response;
        }
        return '죄송합니다. 해당 문의에 대한 정보를 찾지 못했습니다. 병무청 상담센터 1588-9090번으로 문의해주세요.';
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
                            className="text-left px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
                            style={{backgroundColor: '#f7fee7', color: '#65671f'}}>
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
                                msg.role === 'user' ? 'text-white' : 'bg-gray-100 text-gray-900'
                            }`}
                            style={msg.role === 'user' ? {backgroundColor: '#65671f'} : {}}>
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
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
                            style={{borderColor: '#65671f'}} />
                        <button onClick={handleSend}
                            className="px-6 py-2 text-white font-medium rounded-lg transition-colors hover:opacity-90"
                            style={{backgroundColor: '#65671f'}}>
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="border rounded-lg p-4" style={{backgroundColor: '#f7fee7', borderColor: '#65671f'}}>
                <h3 className="font-semibold mb-2" style={{color: '#65671f'}}>📞 추가 문의</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 병무청 상담센터: 1588-9090</p>
                    <p>• 홈페이지: www.mma.go.kr</p>
                    <p>• 병무민원포털: 온라인 민원 신청</p>
                    <p>• 운영시간: 평일 09:00-18:00</p>
                </div>
            </div>
        </div>
    );
};

(() => AIChat)();
