const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 대검찰청 AI 상담 서비스입니다. 검찰 업무, 고소·고발, 형사 절차 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const quickQuestions = [
        '고소장은 어떻게 제출하나요?',
        '불기소 결정에 불복할 수 있나요?',
        '형사조정 제도는 무엇인가요?',
        '검찰 수사는 얼마나 걸리나요?',
        '범죄피해자 지원 제도는?',
        '검찰 민원 상담 전화번호는?'
    ];

    const responses = {
        '고소': '고소장은 관할 지방검찰청 민원실에 직접 제출하거나 온라인(www.spo.go.kr)으로 제출 가능합니다. 고소인 신분증, 증거자료가 필요합니다.',
        '불기소': '불기소 결정에 불복할 경우 항고(검찰청), 재정신청(법원), 헌법소원(헌법재판소) 등의 방법이 있습니다.',
        '형사조정': '형사조정은 가해자와 피해자 간 합의를 통해 분쟁을 해결하는 제도입니다. 검사가 형사조정에 회부할 수 있습니다.',
        '수사': '검찰 수사 기간은 사건에 따라 다르나, 일반적으로 2-3개월 소요됩니다. 복잡한 사건은 더 오래 걸릴 수 있습니다.',
        '피해자': '범죄피해자는 의료비 지원, 법률 상담, 심리 치료 등을 지원받을 수 있습니다. 범죄피해자지원센터(1577-1295)로 문의하세요.',
        '전화': '검찰 민원 상담은 1301번으로 연락주시면 24시간 상담 가능합니다.'
    };

    const getResponse = (userInput) => {
        const input = userInput.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (input.includes(keyword.toLowerCase())) return response;
        }
        return '죄송합니다. 해당 문의에 대한 정보를 찾지 못했습니다. 대검찰청 대표전화 02-3480-2000번으로 문의해주세요.';
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
                            className="text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-sm transition-colors">
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
                                msg.role === 'user' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-900'
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
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-900" />
                        <button onClick={handleSend}
                            className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors">
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📞 추가 문의</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 검찰 콜센터: 1301 (24시간)</p>
                    <p>• 대표전화: 02-3480-2000</p>
                    <p>• 홈페이지: www.spo.go.kr</p>
                    <p>• 범죄피해자지원: 1577-1295</p>
                </div>
            </div>
        </div>
    );
};

(() => AIChat)();
