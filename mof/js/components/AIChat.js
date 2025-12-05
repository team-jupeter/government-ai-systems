const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 해양수산부 AI 상담 서비스입니다. 수산물, 항만, 해양, 선박 안전 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const quickQuestions = [
        '수산물 원산지는 어떻게 확인하나요?',
        '어업 허가 신청 방법이 궁금합니다',
        '항만 이용료는 어떻게 계산되나요?',
        '선박 검사는 언제 받아야 하나요?',
        '해양보호구역에서 할 수 있는 활동은?',
        '양식업 허가는 어떻게 받나요?'
    ];

    const responses = {
        '수산물': '수산물 원산지는 수산물 이력추적제를 통해 QR코드로 확인 가능합니다. 전 유통 과정이 OpenHash 블록체인에 기록되어 있습니다.',
        '어업': '어업 허가는 지방해양수산청 또는 온라인(www.mof.go.kr)에서 신청 가능합니다. 필요서류: 신청서, 선박등록증, 어업경력증명서',
        '항만': '항만 이용료는 선박톤수와 체류시간에 따라 차등 부과됩니다. 주요 항만: 부산항, 인천항, 울산항, 광양항',
        '선박': '선박 정기검사는 5년마다 실시합니다(여객선은 1년). 중간검사는 정기검사 2.5년 후에 받으셔야 합니다.',
        '해양': '해양보호구역에서는 생태계 보전을 위한 활동이 제한됩니다. 구체적인 내용은 각 보호구역별로 다르니 확인이 필요합니다.',
        '양식': '양식업 허가는 시·군·구청 또는 지방해양수산청에 신청하시면 됩니다. 처리기간은 30일 이내입니다.'
    };

    const getResponse = (userInput) => {
        const input = userInput.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (input.includes(keyword.toLowerCase())) return response;
        }
        return '죄송합니다. 해당 문의에 대한 정보를 찾지 못했습니다. 해양수산부 대표전화 110번으로 문의해주세요.';
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
                <h2 className="text-3xl font-bold text-gray-900">AI 상담 서비스</h2>
                <p className="text-gray-600 mt-2">DeepSeek R1 기반 24시간 자동 상담</p>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">💬 자주 묻는 질문</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {quickQuestions.map((q, idx) => (
                        <button key={idx} onClick={() => setInput(q)}
                            className="text-left px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-sm transition-colors">
                            {q}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-900'
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

                <div className="border-t-2 border-gray-200 p-4">
                    <div className="flex space-x-2">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="궁금하신 내용을 입력하세요..."
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500" />
                        <button onClick={handleSend}
                            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors">
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">📞 추가 문의</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 대표전화: 110 (정부민원안내콜센터)</p>
                    <p>• 홈페이지: www.mof.go.kr</p>
                    <p>• 운영시간: 24시간 AI 자동 상담</p>
                </div>
            </div>
        </div>
    );
};

(() => AIChat)();
