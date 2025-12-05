const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { type: 'ai', content: '안녕하세요! 법제사법위원회 OpenHash 시스템 어시스턴트입니다. 체계·자구 검토, 위헌 요소 탐지, 법령 충돌 분석 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    
    const quickQuestions = [
        '체계·자구 심사란?',
        'AI가 어떻게 위헌 요소를 찾나요?',
        '법령 충돌은 어떻게 분석하나요?',
        'OpenHash 검증 과정은?'
    ];
    
    const handleSend = () => {
        if (!input.trim()) return;
        
        setMessages(prev => [...prev, { type: 'user', content: input }]);
        
        let response = '';
        if (input.includes('체계') || input.includes('자구')) {
            response = '체계·자구 심사는 모든 상임위 통과 법안의 형식을 검토합니다. AI(Legal-BERT)가 ①용어 일관성 ②조문 번호 정렬 ③문법 검증 ④법제처 기준 적합성 ⑤논리적 모순을 자동으로 검출합니다. 월평균 154건을 처리하며, 최종 의사결정은 위원이 합니다.';
        } else if (input.includes('위헌') || input.includes('탐지')) {
            response = 'Claude 4 모델이 헌법재판소 결정례 3.2만건을 실시간으로 검색하여 ①헌법 조항 충돌 ②기본권 침해 가능성 ③과잉금지 원칙 위반을 분석합니다. 2024년 기준 12건의 위헌 소지 법안을 사전에 차단했습니다.';
        } else if (input.includes('법령') || input.includes('충돌')) {
            response = 'DeepSeek R1 모델이 현행 10,847개 법령을 실시간으로 비교하여 ①상위법-하위법 체계 검증 ②신법-구법 충돌 경고 ③법령 간 모순 탐지를 수행합니다. 평균 검색 시간은 1.3초입니다.';
        } else if (input.includes('OpenHash') || input.includes('검증')) {
            response = '모든 법안 처리 과정은 OpenHash 블록체인에 기록됩니다. CRYSTALS-Dilithium 양자내성 암호로 서명하고, 24개 노드에 분산 저장됩니다. 0.23초 내 무결성 검증이 완료되어 "법사위에서 법안이 사라진다"는 비판을 원천 차단합니다.';
        } else {
            response = '질문을 이해하지 못했습니다. 위의 빠른 질문 버튼을 사용하시거나, 체계·자구, 위헌 요소, 법령 충돌, OpenHash에 대해 구체적으로 문의해주세요.';
        }
        
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'ai', content: response }]);
        }, 500);
        
        setInput('');
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">💬 AI 어시스턴트</h2>
            
            <div className="mb-4 flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                    <button 
                        key={i}
                        onClick={() => setInput(q)}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                        {q}
                    </button>
                ))}
            </div>
            
            <div className="border rounded-lg h-96 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs px-4 py-2 rounded-lg ${
                                msg.type === 'user' 
                                    ? 'bg-purple-600 text-white' 
                                    : 'bg-white border text-gray-800'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t p-4 flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="메시지를 입력하세요..." 
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button 
                        onClick={handleSend}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        전송
                    </button>
                </div>
            </div>
            
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3">
                <p className="text-xs text-gray-700">
                    <strong>⚠️ 유의사항:</strong> AI 응답은 참고용이며, 공식 정보는 법제사법위원회 홈페이지를 확인하세요.
                </p>
            </div>
        </div>
    );
};
