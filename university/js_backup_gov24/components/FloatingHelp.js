const FloatingHelp = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('ai');
    const [chatMessages, setChatMessages] = React.useState([]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    React.useEffect(() => {
        if (chatMessages.length === 0) {
            setChatMessages([{
                id: 1,
                type: 'ai',
                content: '안녕하세요! AI 통합대학 상담 도우미입니다. 🎓\n\n수강 신청, 시험, 성적, 논문, 취업 등 무엇이든 물어보세요!',
                timestamp: new Date().toISOString()
            }]);
        }
    }, []);

    React.useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage = {
            id: chatMessages.length + 1,
            type: 'user',
            content: inputText,
            timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, userMessage]);
        const query = inputText;
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/university/help/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query })
            });
            const data = await response.json();
            
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: data.response || '죄송합니다. 잠시 후 다시 시도해 주세요.',
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            // 오프라인/에러 시 로컬 응답
            const localResponse = getLocalResponse(query);
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: localResponse,
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const getLocalResponse = (query) => {
        const q = query.toLowerCase();
        
        if (q.includes('수강') || q.includes('신청') || q.includes('등록')) {
            return `📚 **수강 신청 안내**

1. 좌측 메뉴에서 "강좌 탐색"을 클릭하세요
2. 원하는 과목을 검색하거나 분야별로 찾아보세요
3. "수강 신청" 버튼을 클릭하면 즉시 등록됩니다

AI 통합대학은 수강 인원 제한이 없습니다! 원하는 모든 과목을 자유롭게 수강하세요. 😊`;
        }
        
        if (q.includes('시험') || q.includes('퀴즈') || q.includes('평가')) {
            return `📝 **시험 안내**

- **퀴즈**: 각 주차별로 실시, 30분 소요
- **중간고사**: 7주차, 90분 소요
- **기말고사**: 14주차, 90분 소요

시험은 "시험 센터"에서 응시할 수 있으며, 모든 결과는 전국 백분위와 함께 제공됩니다.

성적은 개인정보 금고(PDV)에 자동 저장됩니다.`;
        }
        
        if (q.includes('논문') || q.includes('졸업')) {
            return `🎓 **논문/졸업 안내**

AI 통합대학은 논문 심사로 졸업합니다:

1. **주제 선정**: AI가 연구 주제 제안
2. **문헌 조사**: 관련 논문 자동 검색
3. **개요 작성**: 논문 구조 설계
4. **본문 작성**: AI 대화형 집필 보조
5. **검토/수정**: 표절 검사, 문법 교정
6. **제출/심사**: AI 자동 심사 (24시간)

"논문 작성" 메뉴에서 시작하세요!`;
        }
        
        if (q.includes('취업') || q.includes('진로') || q.includes('직업')) {
            return `💼 **진로/취업 안내**

AI가 학습 이력을 분석하여 최적의 직업을 추천합니다:

- **직업 추천**: 적성 기반 매칭
- **채용 정보**: 실시간 공고 검색
- **지원서 작성**: AI 보조 작성

"직업 추천" 메뉴에서 확인하세요!`;
        }
        
        if (q.includes('성적') || q.includes('점수') || q.includes('학점')) {
            return `📊 **성적 안내**

- 모든 시험 결과는 전국 순위와 백분위로 제공됩니다
- 성적 추이와 역량 분석 그래프를 확인할 수 있습니다
- 모든 기록은 OpenHash 체인에 저장되어 위변조 불가능합니다

"성적/분석" 메뉴에서 상세 내용을 확인하세요!`;
        }
        
        if (q.includes('ai 교수') || q.includes('교수님') || q.includes('질문')) {
            return `🤖 **AI 교수 안내**

각 과목마다 전담 AI 교수가 배정되어 있습니다:

- 24시간 질문 가능
- 개념 설명, 문제 풀이, 코드 작성 지원
- 학생 수준에 맞춘 맞춤형 설명

"내 강좌"에서 수강 중인 과목의 AI 교수와 대화하세요!`;
        }
        
        if (q.includes('커뮤니티') || q.includes('스터디') || q.includes('동료')) {
            return `👥 **학습 커뮤니티 안내**

기존 학과 대신, 적성과 학습 성향이 비슷한 동료들과 함께합니다:

- AI가 적합한 커뮤니티 추천
- 스터디 그룹 자동 매칭
- 공동 프로젝트 진행

"학습 커뮤니티" 메뉴에서 가입하세요!`;
        }
        
        if (q.includes('pdv') || q.includes('금고') || q.includes('개인정보')) {
            return `🔐 **개인정보 금고(PDV) 안내**

모든 학습 기록이 안전하게 보관됩니다:

- OpenHash 체인 기반 위변조 방지
- 본인 개인키로만 접근 가능
- 성적증명서, 수강증명서 즉시 발급

"내 정보 금고" 메뉴에서 확인하세요!`;
        }
        
        return `AI 통합대학에 오신 것을 환영합니다! 🎓

다음과 같은 내용을 도와드릴 수 있습니다:

- 수강 신청 방법
- 시험 및 평가
- 논문 작성 및 졸업
- 진로 및 취업
- 성적 및 학점
- AI 교수 이용법
- 학습 커뮤니티
- 개인정보 금고(PDV)

궁금한 내용을 구체적으로 물어봐 주세요! 😊`;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const quickQuestions = [
        '수강 신청 방법',
        '시험은 어떻게?',
        '논문 작성 절차',
        'AI 교수 이용법'
    ];

    const guides = [
        {
            icon: 'fa-graduation-cap',
            title: '강좌 수강 방법',
            content: '1. 강좌 탐색에서 원하는 과목 선택\n2. 수강 신청 버튼 클릭\n3. 내 강좌에서 학습 시작'
        },
        {
            icon: 'fa-clipboard-check',
            title: '시험 응시',
            content: '시험 센터에서 퀴즈, 중간/기말고사 응시\n전국 백분위 성적 제공'
        },
        {
            icon: 'fa-file-alt',
            title: '논문 작성',
            content: '6단계 AI 보조 논문 작성\n1.주제선정 2.문헌조사 3.개요작성\n4.본문작성 5.검토수정 6.제출심사'
        },
        {
            icon: 'fa-shield-alt',
            title: '개인정보 금고',
            content: '모든 학습 기록 OpenHash 저장\n위변조 불가능, 인증서 발급 가능'
        },
        {
            icon: 'fa-users',
            title: '학습 커뮤니티',
            content: 'AI가 적성/성향 분석하여\n비슷한 학습자 커뮤니티 추천'
        }
    ];

    const shortcuts = [
        { keys: 'Ctrl + D', desc: '대시보드 이동' },
        { keys: 'Ctrl + L', desc: '내 강좌 이동' },
        { keys: 'Ctrl + E', desc: '시험 센터 이동' },
        { keys: 'Ctrl + /', desc: '검색 열기' }
    ];

    return (
        <>
            {/* 플로팅 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="floating-btn flex items-center justify-center text-gray-900"
                title="도움말 센터"
            >
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-question'} text-xl`}></i>
            </button>

            {/* 도움말 패널 */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden z-50">
                    {/* 헤더 */}
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4">
                        <h3 className="font-bold text-gray-900">도움말 센터</h3>
                        <p className="text-sm text-gray-800">AI 통합대학 이용 가이드</p>
                    </div>

                    {/* 탭 */}
                    <div className="flex border-b border-gray-700">
                        <button
                            onClick={() => setActiveTab('ai')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'ai' 
                                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-gray-700' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <i className="fas fa-robot mr-2"></i>AI 상담
                        </button>
                        <button
                            onClick={() => setActiveTab('guide')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'guide' 
                                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-gray-700' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <i className="fas fa-book mr-2"></i>가이드
                        </button>
                        <button
                            onClick={() => setActiveTab('shortcuts')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'shortcuts' 
                                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-gray-700' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <i className="fas fa-keyboard mr-2"></i>단축키
                        </button>
                        <button
                            onClick={() => setActiveTab('contact')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${
                                activeTab === 'contact' 
                                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-gray-700' 
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <i className="fas fa-headset mr-2"></i>문의
                        </button>
                    </div>

                    {/* 탭 콘텐츠 */}
                    <div className="h-80 overflow-hidden flex flex-col">
                        {activeTab === 'ai' && (
                            <div className="flex flex-col h-full">
                                {/* 채팅 메시지 영역 */}
                                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                                    {chatMessages.map(message => (
                                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {message.type === 'ai' && (
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                                                    🎓
                                                </div>
                                            )}
                                            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                                                message.type === 'user' 
                                                    ? 'bg-yellow-600 text-white' 
                                                    : 'bg-gray-700 text-gray-100'
                                            }`}>
                                                <p className="whitespace-pre-wrap">{message.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-xs mr-2">
                                                🎓
                                            </div>
                                            <div className="bg-gray-700 rounded-2xl px-4 py-3">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef}></div>
                                </div>

                                {/* 빠른 질문 */}
                                {chatMessages.length <= 2 && (
                                    <div className="px-3 py-2 border-t border-gray-700">
                                        <p className="text-xs text-gray-500 mb-2">자주 묻는 질문</p>
                                        <div className="flex flex-wrap gap-1">
                                            {quickQuestions.map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setInputText(q);
                                                        setTimeout(() => sendMessage(), 100);
                                                    }}
                                                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-full text-gray-300"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 입력 영역 */}
                                <div className="p-3 border-t border-gray-700">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="궁금한 점을 물어보세요..."
                                            className="flex-1 bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!inputText.trim() || isLoading}
                                            className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full flex items-center justify-center disabled:opacity-50"
                                        >
                                            <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'guide' && (
                            <div className="p-3 space-y-2 overflow-y-auto">
                                {guides.map((guide, index) => (
                                    <details key={index} className="bg-gray-700 rounded-lg">
                                        <summary className="p-3 cursor-pointer flex items-center space-x-3 hover:bg-gray-600 rounded-lg">
                                            <i className={`fas ${guide.icon} text-yellow-400`}></i>
                                            <span className="text-sm font-medium">{guide.title}</span>
                                        </summary>
                                        <div className="px-3 pb-3 text-sm text-gray-400 whitespace-pre-line">
                                            {guide.content}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        )}

                        {activeTab === 'shortcuts' && (
                            <div className="p-4 space-y-3 overflow-y-auto">
                                {shortcuts.map((shortcut, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                                        <kbd className="bg-gray-600 px-2 py-1 rounded text-xs font-mono">{shortcut.keys}</kbd>
                                        <span className="text-sm text-gray-400">{shortcut.desc}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="p-4 space-y-4 overflow-y-auto">
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <i className="fas fa-robot text-yellow-400"></i>
                                        <span className="font-medium">AI 상담</span>
                                    </div>
                                    <p className="text-sm text-gray-400">24시간 즉시 응답</p>
                                    <button 
                                        onClick={() => setActiveTab('ai')}
                                        className="mt-2 text-sm text-yellow-400 hover:text-yellow-300"
                                    >
                                        AI 상담 시작 →
                                    </button>
                                </div>
                                
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <i className="fas fa-envelope text-blue-400"></i>
                                        <span className="font-medium">이메일</span>
                                    </div>
                                    <p className="text-sm text-gray-400">support@ai-university.kr</p>
                                </div>
                                
                                <div className="bg-gray-700 rounded-lg p-4">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <i className="fas fa-phone text-green-400"></i>
                                        <span className="font-medium">전화</span>
                                    </div>
                                    <p className="text-sm text-gray-400">1588-0000</p>
                                    <p className="text-xs text-gray-500">평일 09:00-18:00</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 푸터 */}
                    <div className="p-3 border-t border-gray-700 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <i className="fas fa-shield-alt text-green-400"></i>
                            <span>OpenHash 인증 시스템</span>
                        </div>
                        <span className="text-xs text-gray-600">v1.0.0</span>
                    </div>
                </div>
            )}
        </>
    );
};
