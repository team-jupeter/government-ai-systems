const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 소방청 AI 상담 서비스입니다. 119 신고, 화재 예방, 소방 안전 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');

    const quickQuestions = [
        '119는 언제 신고하나요?',
        '화재 예방 요령은?',
        '소화기 사용법은?',
        '화재 대피 요령은?',
        '구급차 이용 방법은?',
        '소방 민원 전화번호?'
    ];

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, 
            { role: 'user', content: input },
            { role: 'assistant', content: '관련 정보를 찾고 있습니다. 잠시만 기다려주세요.' }
        ]);
        setInput('');
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">AI 상담 서비스</h2>
                <p className="text-sm text-gray-600 mt-1">24시간 자동 상담</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickQuestions.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => setInput(q)}
                        className="text-left px-4 py-2 bg-red-50 text-red-900 rounded-lg text-sm hover:bg-red-100"
                    >
                        {q}
                    </button>
                ))}
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-4 ${
                                msg.role === 'user' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-900'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t p-4">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="질문을 입력하세요..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-red-600"
                        />
                        <button
                            onClick={handleSend}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">🚒 긴급 연락처</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 긴급신고: 119 (24시간)</p>
                    <p>• 민원상담: 1661-1119</p>
                    <p>• 대표전화: 044-205-7114</p>
                </div>
            </div>
        </div>
    );
};
