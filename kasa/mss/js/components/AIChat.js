const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 중소벤처기업부 AI 상담 서비스입니다. 창업, 융자, 벤처인증, 판로개척 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const quickQuestions = [
        '창업지원금은 어떻게 신청하나요?',
        '중소기업 융자 조건이 궁금합니다',
        '벤처기업 인증은 어떻게 받나요?',
        '수출 판로개척 지원이 있나요?',
        '소상공인 지원사업은 뭐가 있나요?',
        '기술창업 교육 프로그램은?'
    ];

    const responses = {
        '창업': '창업지원금은 K-스타트업 누리집(www.k-startup.go.kr)에서 신청 가능합니다. 예비창업패키지, 초기창업패키지 등 단계별 지원이 있으며, 최대 1억원까지 지원됩니다.',
        '융자': '중소기업 정책자금 융자는 중소벤처기업진흥공단(www.kosmes.or.kr)에서 신청하실 수 있습니다. 시설자금, 운영자금 등 다양한 상품이 있으며, 금리는 연 2~3% 수준입니다.',
        '벤처': '벤처기업 확인은 벤처기업확인시스템(www.smes.go.kr)에서 신청 가능합니다. 벤처투자, 연구개발비, 매출액 기준 중 하나를 충족하면 인증받을 수 있습니다.',
        '판로': '수출 판로개척은 중소기업진흥공단의 글로벌 마케팅 지원사업을 이용하세요. 해외 전시회 참가, 바이어 연결, 수출 컨설팅 등을 지원합니다.',
        '소상공인': '소상공인 지원사업은 소상공인시장진흥공단(www.semas.or.kr)에서 확인하실 수 있습니다. 경영개선, 시설개선, 교육훈련 등 다양한 지원이 있습니다.',
        '교육': '기술창업 교육은 창업진흥원(www.kised.or.kr)에서 운영하는 창업아카데미를 이용하세요. 온·오프라인 교육, 멘토링, 네트워킹 기회를 제공합니다.'
    };

    const getResponse = (userInput) => {
        const input = userInput.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (input.includes(keyword.toLowerCase())) return response;
        }
        return '죄송합니다. 해당 문의에 대한 정보를 찾지 못했습니다. 중소벤처기업부 대표전화 1357번으로 문의해주세요.';
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
                            className="text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors">
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

                <div className="border-t-2 border-gray-200 p-4">
                    <div className="flex space-x-2">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="궁금하신 내용을 입력하세요..."
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                        <button onClick={handleSend}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">📞 추가 문의</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 대표전화: 1357 (중소벤처기업 통합콜센터)</p>
                    <p>• 홈페이지: www.mss.go.kr</p>
                    <p>• 운영시간: 24시간 AI 자동 상담</p>
                </div>
            </div>
        </div>
    );
};

(() => AIChat)();
