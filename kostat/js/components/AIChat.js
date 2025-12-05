const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: '안녕하세요! 통계청 AI 상담 서비스입니다. 인구통계, 경제통계, 물가지수 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');

    const quickQuestions = [
        '인구수는?',
        '물가지수는?',
        '실업률은?',
        '통계조사 신청은?',
        '통계 자료는?',
        '통계청 전화번호?'
    ];

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, 
            { role: 'user', content: input },
            { role: 'assistant', content: '관련 통계를 찾고 있습니다. 잠시만 기다려주세요.' }
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
                        className="text-left px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm hover:bg-blue-100"
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
                                msg.role === 'user' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-900'
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
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-900"
                        />
                        <button
                            onClick={handleSend}
                            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950"
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📊 추가 문의</h3>
                <div className="text-sm text-gray-700 space-y-1">
                    <p>• 대표전화: 042-481-2114</p>
                    <p>• 민원상담: 02-2012-9114</p>
                    <p>• 홈페이지: www.kostat.go.kr</p>
                </div>
            </div>
        </div>
    );
};
