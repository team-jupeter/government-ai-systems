const FloatingAssistant = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [chatMessage, setChatMessage] = React.useState('');
    const [chatHistory, setChatHistory] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const features = [
        { icon: 'fa-robot', title: 'AI 의료 상담', desc: 'Claude AI 기반 24시간 의사/간호사 상담' },
        { icon: 'fa-watch', title: '실시간 생체감지', desc: '스마트워치로 심박, 혈압, 혈당 등 모니터링' },
        { icon: 'fa-shield-alt', title: '개인정보금고 (PDV)', desc: 'AES-256 암호화로 의료정보 안전 보관' },
        { icon: 'fa-link', title: 'OpenHash 무결성', desc: '블록체인 기반 데이터 위변조 방지' },
        { icon: 'fa-hospital', title: '스마트 병원 추천', desc: 'AI가 증상 분석 후 최적 병원 매칭' },
        { icon: 'fa-ambulance', title: '긴급 출동 시스템', desc: '위급 상황 시 119 자동 호출 및 GPS 전송' }
    ];

    const handleSendMessage = async () => {
        if (!chatMessage.trim() || isLoading) return;

        const userMessage = chatMessage.trim();
        setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
        setChatMessage('');
        setIsLoading(true);

        // AI 응답 시뮬레이션
        setTimeout(() => {
            let response = '';
            const lowerMsg = userMessage.toLowerCase();
            
            if (lowerMsg.includes('예약') || lowerMsg.includes('진료')) {
                response = '진료 예약은 좌측 메뉴의 "진료 예약"에서 가능합니다. 제주대학교병원, 제주의료원 등 6개 의료시설의 41개 진료과 예약 현황을 실시간으로 확인할 수 있습니다.';
            } else if (lowerMsg.includes('병원') || lowerMsg.includes('추천')) {
                response = '증상에 맞는 병원 추천은 "AI 의사 상담"을 이용해주세요. 증상을 말씀하시면 AI가 적합한 진료과와 병원을 추천해 드립니다.';
            } else if (lowerMsg.includes('응급') || lowerMsg.includes('긴급')) {
                response = '응급 상황 시 대시보드의 "긴급 출동" 버튼을 누르시면 10초 카운트다운 후 119가 자동 호출됩니다. GPS 위치와 생체 데이터가 함께 전송됩니다.';
            } else if (lowerMsg.includes('개인정보') || lowerMsg.includes('pdv') || lowerMsg.includes('금고')) {
                response = '개인정보금고(PDV)는 AES-256 암호화로 보호됩니다. 병력, 가족력, 건강검진 결과, 복용약 등 모든 의료정보를 안전하게 보관하고 OpenHash로 무결성을 검증합니다.';
            } else if (lowerMsg.includes('스마트워치') || lowerMsg.includes('생체')) {
                response = '생체감지 스마트워치는 심박수, 혈압, 체온, 산소포화도, 혈당, 스트레스 등을 실시간 모니터링합니다. 이상 징후 감지 시 자동으로 의료진에게 알림이 전송됩니다.';
            } else if (lowerMsg.includes('openhash') || lowerMsg.includes('블록체인')) {
                response = 'OpenHash는 기존 블록체인 대비 에너지 효율이 높은 분산 해시 체인 기술입니다. 모든 의료 데이터의 무결성을 검증하여 위변조를 방지합니다.';
            } else if (lowerMsg.includes('안녕') || lowerMsg.includes('반가')) {
                response = '안녕하세요! 제주 통합 의료 AI 시스템입니다. 진료 예약, 병원 정보, 건강 상담 등 무엇이든 물어보세요!';
            } else {
                response = '제주 통합 의료 AI 시스템에 대해 궁금하신 점을 말씀해 주세요. 진료 예약, 병원 추천, 건강 상담, 시스템 기능 등에 대해 안내해 드립니다.';
            }

            setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // 최소화 상태
    if (isMinimized) {
        return (
            <button
                onClick={() => setIsMinimized(false)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-50 animate-pulse"
            >
                <i className="fas fa-robot text-white text-xl"></i>
            </button>
        );
    }

    // 닫힌 상태 (플로팅 버튼만)
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-50 group"
            >
                <i className="fas fa-comment-medical text-white text-2xl"></i>
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">?</span>
                <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    시스템 안내 & AI 상담
                </div>
            </button>
        );
    }

    // 열린 상태 (패널)
    return (
        <div className="fixed bottom-6 right-6 w-96 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden" style={{maxHeight: '80vh'}}>
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <i className="fas fa-robot text-white text-lg"></i>
                    </div>
                    <div>
                        <p className="font-bold text-white">제주 의료 AI 안내</p>
                        <p className="text-xs text-white/70">무엇이든 물어보세요</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => setIsMinimized(true)}
                        className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                        title="최소화"
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                        title="닫기"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className="overflow-y-auto" style={{maxHeight: 'calc(80vh - 180px)'}}>
                {/* 시스템 특징 소개 */}
                <div className="p-4 border-b border-gray-700">
                    <p className="text-sm font-medium text-gray-300 mb-3">
                        <i className="fas fa-info-circle text-cyan-400 mr-2"></i>시스템 주요 기능
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {features.map((feat, i) => (
                            <div key={i} className="p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all cursor-pointer group">
                                <div className="flex items-center space-x-2 mb-1">
                                    <i className={`fas ${feat.icon} text-cyan-400 text-sm group-hover:scale-110 transition-transform`}></i>
                                    <span className="text-xs font-medium">{feat.title}</span>
                                </div>
                                <p className="text-xs text-gray-400 leading-tight">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI 상담 영역 */}
                <div className="p-4">
                    <p className="text-sm font-medium text-gray-300 mb-3">
                        <i className="fas fa-comments text-green-400 mr-2"></i>AI 상담
                    </p>
                    
                    {/* 채팅 히스토리 */}
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {chatHistory.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="fas fa-comment-dots text-3xl text-gray-600 mb-2"></i>
                                <p className="text-sm text-gray-500">궁금한 점을 물어보세요!</p>
                                <div className="mt-3 flex flex-wrap justify-center gap-2">
                                    {['예약 방법', '병원 추천', '긴급 출동'].map((q, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setChatMessage(q)}
                                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-xs"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            chatHistory.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl ${
                                        msg.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-sm' 
                                        : 'bg-gray-700 text-gray-200 rounded-bl-sm'
                                    }`}>
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 p-3 rounded-xl rounded-bl-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 입력 영역 */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="무엇이든 물어보세요..."
                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!chatMessage.trim() || isLoading}
                        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-xl flex items-center justify-center transition-all"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
