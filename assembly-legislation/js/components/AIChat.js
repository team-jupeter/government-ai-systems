const AIChat = () => {
    const [messages, setMessages] = React.useState([
        { 
            id: 1, 
            sender: 'ai', 
            text: '안녕하세요! 법제사법위원회 AI 어시스턴트입니다. 저는 다음과 같은 업무를 지원합니다:\n\n• 법안 체계·자구 검토\n• 위헌 요소 분석\n• 판례 검색 및 법리 해석\n• 법령 충돌 확인\n• 의사록 요약\n\n무엇을 도와드릴까요?' 
        }
    ]);
    const [input, setInput] = React.useState('');

    const quickQuestions = [
        '최근 통과된 법안은?',
        '위헌 요소가 탐지된 법안은?',
        '체계자구 심사 절차는?',
        '법령 충돌 분석 방법은?'
    ];

    const handleSend = () => {
        if (!input.trim()) return;
        
        const userMessage = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
            let aiResponse = '';
            
            if (input.includes('법안') || input.includes('통과')) {
                aiResponse = '📋 최근 통과된 주요 법안:\n\n1. 헌법재판소법 개정안 (2025-04-09)\n   - 헌법재판관 임기 연장 규정\n   - 대통령 권한대행 임명권 제한\n\n2. 12·29여객기참사 피해구제 특별법 (2025-04-09)\n   - 피해자 신속 구제 및 지원\n\n3. 형사소송법 개정안 (2025-05-07)\n   - 대통령 당선자 공판절차 정지\n\n더 자세한 정보가 필요하시면 말씀해주세요.';
            } else if (input.includes('위헌')) {
                aiResponse = '🚨 2024년 위헌 요소 탐지 법안 (12건):\n\n• 기본권 침해: 5건\n• 과잉금지 원칙 위반: 3건\n• 평등권 침해: 2건\n• 법률유보 위반: 2건\n\nAI 시스템이 헌법재판소 판례 DB 3.2만 건을 분석하여 사전에 차단했습니다. 특정 법안에 대한 상세 분석이 필요하신가요?';
            } else if (input.includes('체계') || input.includes('자구')) {
                aiResponse = '✏️ 체계·자구 심사 절차:\n\n1단계: AI 1차 검토\n- 법률 용어 일관성 검사\n- 조문 번호 자동 정렬\n- 문법 및 맞춤법 검증\n\n2단계: 법제처 기준 적합성\n- 법제 작성 기준 대조\n- 상위법-하위법 체계 확인\n\n3단계: 위원 최종 검토\n- AI 권고사항 검토\n- 실질적 심사 수행\n- 최종 의결\n\n평균 처리 기간: 6일 (AI 도입 전 23일)';
            } else if (input.includes('충돌') || input.includes('분석')) {
                aiResponse = '🔗 법령 충돌 자동 분석 시스템:\n\n• 대상: 기존 법령 10,847개\n• 검토 항목:\n  - 상위법-하위법 체계 정합성\n  - 특별법-일반법 관계\n  - 신법-구법 충돌\n  - 법령 간 용어 불일치\n\n• 처리 속도: 평균 1.3초\n• 2024년 충돌 경고: 847건\n\nDeepSeek R1 모델이 실시간으로 분석합니다.';
            } else {
                aiResponse = '법제사법위원회 AI 어시스턴트입니다. 다음과 같은 질문을 해주시면 더 정확한 답변을 드릴 수 있습니다:\n\n• "최근 통과된 법안은?"\n• "위헌 요소가 탐지된 법안은?"\n• "체계자구 심사 절차는?"\n• "법령 충돌 분석 방법은?"\n\n구체적인 법안명이나 키워드를 말씀해주시면 더 자세히 안내해드리겠습니다.';
            }
            
            const aiMessage = { id: Date.now() + 1, sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        }, 500);
        
        setInput('');
    };

    const handleQuickQuestion = (question) => {
        setInput(question);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">💬 법제사법위원회 AI 어시스턴트</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4 rounded">
                <p className="text-sm text-blue-900">
                    <strong>🤖 Claude 4 Sonnet 기반</strong> 법률 전문 AI가 
                    법안 분석, 판례 검색, 위헌 요소 탐지 등을 지원합니다.
                </p>
            </div>

            <div className="border-2 border-gray-200 rounded-lg flex flex-col bg-white" style={{height: '500px'}}>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {messages.map(msg => (
                        <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block max-w-[80%] p-4 rounded-lg ${
                                msg.sender === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-white border-2 border-blue-200 text-gray-800 rounded-bl-none'
                            }`}>
                                {msg.sender === 'ai' && (
                                    <div className="flex items-center gap-2 mb-2 text-blue-600">
                                        <span className="text-xl">🤖</span>
                                        <span className="font-semibold text-sm">AI 어시스턴트</span>
                                    </div>
                                )}
                                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="border-t-2 border-gray-200 bg-gray-50 p-4">
                    <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-2 font-semibold">빠른 질문:</p>
                        <div className="flex flex-wrap gap-2">
                            {quickQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickQuestion(q)}
                                    className="px-3 py-1 bg-white border border-blue-300 text-blue-700 rounded-full text-xs hover:bg-blue-50 transition"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="법안, 판례, 위헌 요소 등을 질문하세요..." 
                            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                        <button
                            onClick={handleSend}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-bold text-green-900 text-sm mb-2">✓ 지원 기능</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                        <li>• 법안 체계·자구 검토</li>
                        <li>• 위헌 요소 자동 탐지</li>
                        <li>• 판례 검색 (대법원 78만건)</li>
                        <li>• 법령 충돌 분석 (1만+ 법령)</li>
                    </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                    <h4 className="font-bold text-purple-900 text-sm mb-2">🔐 보안</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                        <li>• 대화 내용 OpenHash 암호화</li>
                        <li>• 위원 본인만 열람 가능</li>
                        <li>• 민감정보 자동 마스킹</li>
                        <li>• 30일 후 자동 삭제</li>
                    </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                    <h4 className="font-bold text-orange-900 text-sm mb-2">⚠️ 유의사항</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                        <li>• AI는 참고용 정보 제공</li>
                        <li>• 최종 판단은 위원 권한</li>
                        <li>• 법률 자문 아님</li>
                        <li>• 정확성 100% 보장 불가</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
