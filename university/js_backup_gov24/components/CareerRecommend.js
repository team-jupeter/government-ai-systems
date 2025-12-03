const CareerRecommend = ({ studentId, onNavigate }) => {
    const [recommendations, setRecommendations] = React.useState([]);
    const [aptitude, setAptitude] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [showChat, setShowChat] = React.useState(false);
    const [chatMessages, setChatMessages] = React.useState([]);
    const [inputText, setInputText] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    const RechartsLib = window.Recharts || {};
    const { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } = RechartsLib;
    const chartsAvailable = RadarChart && ResponsiveContainer;

    React.useEffect(() => {
        fetchCareerData();
    }, [studentId]);

    React.useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    const fetchCareerData = async () => {
        try {
            const response = await fetch(`/api/university/career/recommend?student_id=${studentId}`);
            const data = await response.json();
            setRecommendations(data.recommendations || []);
        } catch (error) {
            setRecommendations([
                { id: 'data-scientist', title: '데이터 사이언티스트', field: 'AI/Data', avg_salary: 75000000, demand: '매우 높음', match_rate: 92, growth_rate: 35, missing_skills: [] },
                { id: 'ai-researcher', title: 'AI 연구원', field: 'AI/Research', avg_salary: 85000000, demand: '높음', match_rate: 85, growth_rate: 40, missing_skills: ['자연어처리'] },
                { id: 'software-engineer', title: '소프트웨어 엔지니어', field: 'IT', avg_salary: 65000000, demand: '매우 높음', match_rate: 78, growth_rate: 25, missing_skills: ['운영체제', '네트워크'] },
                { id: 'quant-analyst', title: '퀀트 애널리스트', field: 'Finance', avg_salary: 95000000, demand: '높음', match_rate: 65, growth_rate: 20, missing_skills: ['금융공학', '시계열분석'] }
            ]);
        }

        setAptitude({
            profile: [
                { subject: '논리적 사고', score: 92 },
                { subject: '창의성', score: 78 },
                { subject: '분석력', score: 88 },
                { subject: '커뮤니케이션', score: 72 },
                { subject: '문제해결', score: 90 },
                { subject: '협업', score: 75 }
            ],
            strengths: ['논리적 사고', '문제 해결 능력', '데이터 분석'],
            learning_style: '실습형 학습자'
        });

        setLoading(false);
    };

    const startChat = () => {
        setShowChat(true);
        if (chatMessages.length === 0) {
            setChatMessages([{
                id: 1,
                type: 'ai',
                content: '안녕하세요! AI 진로/취업 상담사입니다. 🎯\n\n진로 고민, 직업 선택, 취업 준비, 이력서/자소서 작성, 면접 준비 등 무엇이든 물어보세요!\n\n예를 들어:\n• "데이터 사이언티스트가 되려면 어떤 준비가 필요한가요?"\n• "AI 분야 취업 전망이 어떤가요?"\n• "이력서 작성 팁을 알려주세요"',
                timestamp: new Date().toISOString()
            }]);
        }
    };

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
            const response = await fetch('/api/university/career/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: studentId, message: query })
            });
            const data = await response.json();
            
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: data.response || '죄송합니다. 잠시 후 다시 시도해 주세요.',
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            setChatMessages(prev => [...prev, {
                id: prev.length + 1,
                type: 'ai',
                content: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-yellow-400"></i>
            </div>
        );
    }

    if (showChat) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">AI 진로 상담</h1>
                        <p className="text-gray-400 mt-1">진로와 취업에 대해 무엇이든 물어보세요</p>
                    </div>
                    <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white">
                        <i className="fas fa-arrow-left mr-2"></i>돌아가기
                    </button>
                </div>

                <div className="bg-gray-800 rounded-xl overflow-hidden">
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map(message => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.type === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                                        🎯
                                    </div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.type === 'user' ? 'bg-yellow-600' : 'bg-gray-700'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-sm mr-2">🎯</div>
                                <div className="bg-gray-700 rounded-2xl px-4 py-3">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef}></div>
                    </div>
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="진로/취업에 대해 질문하세요..."
                                className="flex-1 bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <button onClick={sendMessage} disabled={!inputText.trim() || isLoading} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 rounded-lg disabled:opacity-50">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">AI 직업 추천</h1>
                    <p className="text-gray-400 mt-1">학습 이력과 적성을 분석하여 최적의 진로를 추천합니다</p>
                </div>
                <button onClick={startChat} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-medium">
                    <i className="fas fa-comments mr-2"></i>AI 상담 시작
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4"><i className="fas fa-brain text-purple-400 mr-2"></i>적성 분석</h3>
                    <div className="h-64">
                        {chartsAvailable ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={aptitude.profile}>
                                    <PolarGrid stroke="#374151" />
                                    <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#374151" />
                                    <Radar dataKey="score" stroke="#d4af37" fill="#d4af37" fillOpacity={0.3} />
                                </RadarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {aptitude.profile.map((item, i) => (
                                    <div key={i} className="bg-gray-700 p-3 rounded">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{item.subject}</span>
                                            <span className="text-yellow-400">{item.score}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill bg-yellow-500" style={{ width: `${item.score}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4"><i className="fas fa-star text-yellow-400 mr-2"></i>강점 분석</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-400 mb-2">주요 강점</p>
                            <div className="flex flex-wrap gap-2">
                                {aptitude.strengths.map((strength, i) => (
                                    <span key={i} className="badge bg-green-500 bg-opacity-20 text-green-400 px-3 py-1">{strength}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-2">학습 스타일</p>
                            <span className="badge bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1">{aptitude.learning_style}</span>
                        </div>
                        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                            <p className="text-sm"><i className="fas fa-info-circle text-yellow-400 mr-2"></i>더 자세한 분석이 필요하면 <button onClick={startChat} className="text-yellow-400 hover:underline">AI 상담</button>을 이용하세요!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4"><i className="fas fa-briefcase text-yellow-400 mr-2"></i>추천 직업 ({recommendations.length}개)</h2>
                <div className="space-y-4">
                    {recommendations.map((career, index) => (
                        <div key={career.id} className="bg-gray-800 rounded-xl p-6 card-hover">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start space-x-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${index === 0 ? 'bg-yellow-500 bg-opacity-20' : index === 1 ? 'bg-gray-600' : 'bg-gray-700'}`}>
                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💼'}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{career.title}</h3>
                                        <p className="text-gray-400 text-sm">{career.field}</p>
                                        <div className="flex items-center space-x-4 mt-2 text-sm">
                                            <span className="text-green-400"><i className="fas fa-won-sign mr-1"></i>{(career.avg_salary / 10000).toLocaleString()}만원</span>
                                            <span className="text-blue-400"><i className="fas fa-chart-line mr-1"></i>성장률 {career.growth_rate}%</span>
                                            <span className={career.demand === '매우 높음' ? 'text-red-400' : 'text-yellow-400'}><i className="fas fa-fire mr-1"></i>수요 {career.demand}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-400">{career.match_rate}%</div>
                                        <div className="text-xs text-gray-500">적합도</div>
                                    </div>
                                    <button onClick={() => { setInputText(`${career.title}가 되려면 어떤 준비가 필요한가요?`); startChat(); }} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-medium">상담하기</button>
                                </div>
                            </div>
                            {career.missing_skills.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <p className="text-sm text-gray-400 mb-2"><i className="fas fa-exclamation-triangle text-yellow-400 mr-1"></i>보완 필요 역량:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {career.missing_skills.map((skill, i) => (
                                            <span key={i} className="badge bg-red-500 bg-opacity-20 text-red-400 px-2 py-1 text-sm">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
