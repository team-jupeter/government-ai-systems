const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { type: 'ai', content: '안녕하세요! 국회운영위원회 OpenHash 시스템 어시스턴트입니다. 데이터 무결성 검증, AI 자동화, NDR 연동 등에 대해 문의하실 수 있습니다.' }
    ]);
    const [input, setInput] = React.useState('');
    
    const quickQuestions = [
        'OpenHash란 무엇인가요?',
        'AI 자동화 프로세스는?',
        'NDR 연동 방식은?',
        '블록체인과 어떻게 다른가요?'
    ];
    
    const handleSend = () => {
        if (!input.trim()) return;
        
        setMessages(prev => [...prev, { type: 'user', content: input }]);
        
        // 간단한 키워드 기반 응답
        let response = '';
        if (input.includes('OpenHash') || input.includes('오픈해시')) {
            response = 'OpenHash는 양자내성 암호(CRYSTALS-Dilithium)를 사용하는 차세대 블록체인 기술입니다. 기존 블록체인 대비 99.7% 에너지 절감, 487.3 TPS 처리 성능을 제공합니다.';
        } else if (input.includes('AI') || input.includes('자동화')) {
            response = 'DeepSeek R1, Claude 4, Whisper v3 등을 활용하여 의안 분류(96.3%), 의사록 생성(98.7%), 일정 최적화를 자동화합니다. 처리 시간 73% 단축, 비용 64% 절감 효과가 있습니다.';
        } else if (input.includes('NDR') || input.includes('데이터')) {
            response = 'NDR(국가데이터저장소)와 실시간 연동하여 법안, 예산안, 투표 결과를 0.6초 내 24개 노드에 분산 저장합니다. 모든 데이터는 CRYSTALS-Dilithium 서명으로 검증됩니다.';
        } else if (input.includes('블록체인') || input.includes('차이')) {
            response = 'OpenHash는 기존 블록체인 대비: ① 양자내성 암호 사용, ② 99.7% 에너지 절감, ③ 487.3 TPS (비트코인 7 TPS 대비 70배), ④ 0.23초 검증 속도를 제공합니다.';
        } else {
            response = '질문을 이해하지 못했습니다. 위의 빠른 질문 버튼을 사용하시거나, OpenHash, AI 자동화, NDR 연동에 대해 구체적으로 문의해주세요.';
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
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
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
                                    ? 'bg-blue-600 text-white' 
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
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={handleSend}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        전송
                    </button>
                </div>
            </div>
            
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3">
                <p className="text-xs text-gray-700">
                    <strong>⚠️ 유의사항:</strong> AI 응답은 참고용이며, 공식 문서는 국회운영위원회 홈페이지를 확인하세요.
                </p>
            </div>
        </div>
    );
};
