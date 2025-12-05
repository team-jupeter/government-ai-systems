const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 재외동포청 AI 상담 서비스입니다. 영사민원, 지원사업, 교육 프로그램 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const quickQuestions = [
        '재외국민등록은 어떻게 하나요?',
        '한국어 교육 프로그램이 있나요?',
        '창업지원금 신청 방법은?',
        'F-4 비자는 무엇인가요?',
        '차세대 동포 장학금 안내',
        '재외동포 네트워크 참여 방법'
    ];

    const responses = {
        '재외국민': '재외국민등록은 재외공관 또는 재외동포365민원포털(g4k.go.kr)에서 온라인으로 신청 가능합니다. 여권, 거주증명서 등이 필요합니다.',
        '한국어': '한국어 교육 프로그램은 전 세계 한글학교와 온라인 플랫폼을 통해 제공됩니다. 재외동포청 누리집(oka.go.kr)에서 신청하세요.',
        '창업': '재외동포 창업지원금은 사업계획서를 제출하여 심사를 거쳐 최대 5,000만원까지 지원받을 수 있습니다.',
        'F-4': 'F-4 비자는 재외동포 체류자격으로, 외국국적동포가 한국에서 장기 체류할 수 있는 비자입니다. 법무부 출입국관리사무소에서 신청 가능합니다.',
        '장학금': '차세대 동포 장학금은 만 18-30세 재외동포 대상으로 학업우수자에게 지원됩니다. 연 2회 신청 기간이 있습니다.',
        '네트워크': '세계한인네트워크는 재외동포청 누리집에서 가입 신청하실 수 있으며, 전 세계 동포들과 교류할 수 있습니다.'
    };

    const getResponse = (userInput) => {
        const input = userInput.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (input.includes(keyword.toLowerCase())) return response;
        }
        return '죄송합니다. 해당 문의에 대한 정보를 찾지 못했습니다. 재외동포청 대표전화 1577-0606번으로 문의해주세요.';
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
                            className="text-left px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm transition-colors">
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
                                msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-900'
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
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500" />
                        <button onClick={handleSend}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">📞 추가 문의</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 대표전화: 1577-0606</p>
                    <p>• 홈페이지: www.oka.go.kr</p>
                    <p>• 민원포털: g4k.go.kr (재외동포365)</p>
                    <p>• 운영시간: 24시간 AI 자동 상담</p>
                </div>
            </div>
        </div>
    );
};

(() => AIChat)();
