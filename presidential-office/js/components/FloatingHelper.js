const FloatingHelper = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [chatHistory, setChatHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const systemFeatures = [
        {
            icon: 'fa-robot',
            title: '30개 AI 에이전트',
            desc: '대통령실 전체 비서관실을 AI가 자동화하여 24시간 국정 운영을 지원합니다.'
        },
        {
            icon: 'fa-network-wired',
            title: '18개 부처 실시간 연동',
            desc: '기획재정부, 외교부, 국방부 등 모든 중앙부처 AI와 자동 협업합니다.'
        },
        {
            icon: 'fa-shield-alt',
            title: 'OpenHash 무결성 검증',
            desc: 'SHA3-256 기반 해시 체인으로 모든 데이터와 의사결정 기록을 보호합니다.'
        },
        {
            icon: 'fa-brain',
            title: 'Claude AI 기반',
            desc: 'Anthropic의 최신 AI 모델을 활용하여 고품질 정책 분석과 상담을 제공합니다.'
        },
        {
            icon: 'fa-database',
            title: '국가데이터처 연계',
            desc: '모든 정부 데이터가 국가데이터처를 통해 수집, 가공, 저장됩니다.'
        }
    ];

    const handleSubmit = async () => {
        if (!query.trim() || loading) return;

        const userMessage = { role: 'user', content: query };
        setChatHistory(prev => [...prev, userMessage]);
        setLoading(true);
        setQuery('');

        try {
            const res = await fetch('/api/presidential-office/ai-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await res.json();

            setChatHistory(prev => [...prev, {
                role: 'assistant',
                content: data.success ? data.response : '죄송합니다. 응답을 처리하는 중 오류가 발생했습니다.'
            }]);
        } catch (error) {
            setChatHistory(prev => [...prev, {
                role: 'assistant',
                content: '서버 연결 오류가 발생했습니다.'
            }]);
        }

        setLoading(false);
    };

    // 최소화 상태 - 작은 버튼만 표시
    if (isMinimized) {
        return (
            <button
                onClick={() => setIsMinimized(false)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 pulse-gold"
            >
                <i className="fas fa-landmark text-xl text-white"></i>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* 확장된 패널 */}
            {isExpanded && (
                <div className="mb-4 w-96 bg-gray-800 border border-yellow-600 rounded-xl shadow-2xl overflow-hidden">
                    {/* 헤더 */}
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 px-4 py-3 flex items-center justify-between">
                        <h3 className="font-bold flex items-center">
                            <i className="fas fa-landmark mr-2"></i>대통령실 AI 시스템
                        </h3>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsMinimized(true)}
                                className="hover:bg-white/20 rounded p-1"
                                title="축소"
                            >
                                <i className="fas fa-minus"></i>
                            </button>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="hover:bg-white/20 rounded p-1"
                                title="닫기"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    {/* 시스템 특징 */}
                    <div className="p-4 max-h-64 overflow-y-auto space-y-3">
                        <h4 className="text-yellow-400 font-semibold text-sm mb-2">
                            <i className="fas fa-star mr-2"></i>시스템 특징
                        </h4>
                        {systemFeatures.map((feature, idx) => (
                            <div key={idx} className="bg-gray-700/50 rounded-lg p-3 flex items-start space-x-3">
                                <div className="w-8 h-8 bg-yellow-600/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className={`fas ${feature.icon} text-yellow-400 text-sm`}></i>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{feature.title}</p>
                                    <p className="text-gray-400 text-xs mt-1">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* AI 상담 영역 */}
                    <div className="border-t border-gray-700">
                        <div className="p-3 bg-gray-900/50">
                            <p className="text-blue-400 text-sm font-semibold mb-2">
                                <i className="fas fa-comments mr-2"></i>무엇이든 물어보세요
                            </p>

                            {/* 채팅 히스토리 */}
                            {chatHistory.length > 0 && (
                                <div className="max-h-32 overflow-y-auto mb-3 space-y-2">
                                    {chatHistory.slice(-4).map((msg, idx) => (
                                        <div key={idx} className={`text-xs p-2 rounded ${msg.role === 'user' ? 'bg-blue-600 ml-8' : 'bg-gray-700 mr-8'}`}>
                                            {msg.content.substring(0, 150)}{msg.content.length > 150 ? '...' : ''}
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="text-xs p-2 rounded bg-gray-700 mr-8">
                                            <i className="fas fa-spinner fa-spin mr-2"></i>응답 생성 중...
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 입력 필드 */}
                            <div className="flex space-x-2">
                                <input
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                    placeholder="질문을 입력하세요..."
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !query.trim()}
                                    className="bg-gradient-to-r from-yellow-600 to-yellow-800 px-4 py-2 rounded-lg hover:from-yellow-700 hover:to-yellow-900 disabled:opacity-50 transition-all"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 메인 Floating 버튼 */}
            {!isExpanded && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform pulse-gold group"
                >
                    <div className="text-center">
                        <i className="fas fa-landmark text-xl text-white"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                        ?
                    </div>
                </button>
            )}
        </div>
    );
};
