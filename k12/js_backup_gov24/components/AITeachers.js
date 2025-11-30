const AITeachers = () => {
    const [selectedSubject, setSelectedSubject] = React.useState('math');
    const [query, setQuery] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [studentLevel, setStudentLevel] = React.useState('중학교');
    
    const subjects = [
        { id: 'korean', name: '국어', icon: '📚', color: 'red', students: '120만' },
        { id: 'english', name: '영어', icon: '🌍', color: 'blue', students: '120만' },
        { id: 'math', name: '수학', icon: '📐', color: 'purple', students: '120만' },
        { id: 'physics', name: '물리', icon: '⚛️', color: 'cyan', students: '45만' },
        { id: 'chemistry', name: '화학', icon: '🧪', color: 'green', students: '45만' },
        { id: 'biology', name: '생물', icon: '🧬', color: 'pink', students: '45만' },
        { id: 'history', name: '역사', icon: '📜', color: 'yellow', students: '80만' },
        { id: 'social', name: '사회', icon: '🌏', color: 'orange', students: '80만' },
        { id: 'coding', name: '코딩', icon: '💻', color: 'indigo', students: '60만' },
        { id: 'science', name: '과학(통합)', icon: '🔬', color: 'teal', students: '90만' }
    ];
    
    const currentTeacher = subjects.find(s => s.id === selectedSubject);
    
    const sendMessage = async () => {
        if (!query.trim()) return;
        
        const userMsg = { role: 'user', content: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setLoading(true);
        
        try {
            const res = await fetch('/api/k12/ai-teacher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject: selectedSubject, query: query, level: studentLevel })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response, teacher: data.teacher, icon: data.icon }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: '죄송합니다. 잠시 후 다시 시도해주세요.', teacher: currentTeacher.name, icon: currentTeacher.icon }]);
        }
        setLoading(false);
    };
    
    const exampleQuestions = {
        math: ['이차방정식 풀이 방법 알려주세요', '피타고라스 정리 설명해주세요', '분수 나눗셈 어떻게 하나요?'],
        english: ['현재완료 시제 설명해주세요', '관계대명사 which와 that 차이점', '영어 에세이 쓰는 방법'],
        physics: ['뉴턴의 운동법칙 설명해주세요', 'F=ma 공식 활용법', '자유낙하 문제 풀이'],
        chemistry: ['주기율표 읽는 방법', '산과 염기 반응', '몰 농도 계산법'],
        korean: ['비유법의 종류와 예시', '문장 성분 분석하는 법', '논설문 쓰는 방법'],
        coding: ['파이썬 반복문 설명해주세요', 'if문 사용법 알려주세요', '리스트와 배열의 차이']
    };
    
    return (
        <section className="py-12 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2"><i className="fas fa-chalkboard-teacher mr-3 text-blue-400"></i>과목별 AI 교사</h2>
                    <p className="text-gray-400">전국 1,200만 초중고 학생을 개별 지도하는 AI 교사</p>
                </div>
                
                {/* 과목 선택 */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
                    {subjects.map(subj => (
                        <button key={subj.id} onClick={() => { setSelectedSubject(subj.id); setMessages([]); }}
                            className={`p-3 rounded-xl text-center transition-all ${selectedSubject === subj.id ? 'bg-blue-600 scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}>
                            <div className="text-2xl mb-1">{subj.icon}</div>
                            <div className="text-xs font-bold">{subj.name}</div>
                        </button>
                    ))}
                </div>
                
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* AI 교사 정보 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="text-center mb-4">
                            <div className="text-6xl mb-3">{currentTeacher?.icon}</div>
                            <h3 className="text-xl font-bold">{currentTeacher?.name} AI 교사</h3>
                            <p className="text-sm text-gray-400 mt-1">담당 학생: {currentTeacher?.students}명</p>
                        </div>
                        
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">학생 수준</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['초등학교', '중학교', '고등학교'].map(level => (
                                    <button key={level} onClick={() => setStudentLevel(level)}
                                        className={`py-2 rounded text-sm ${studentLevel === level ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <div className="text-sm text-gray-400 mb-2">예시 질문</div>
                            <div className="space-y-2">
                                {(exampleQuestions[selectedSubject] || exampleQuestions.math).map((q, i) => (
                                    <button key={i} onClick={() => setQuery(q)}
                                        className="w-full text-left text-sm p-2 bg-gray-900 hover:bg-gray-700 rounded transition-all">
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* 채팅 영역 */}
                    <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 flex flex-col" style={{height: '500px'}}>
                        <div className="p-4 border-b border-gray-700">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{currentTeacher?.icon}</span>
                                <div>
                                    <div className="font-bold">{currentTeacher?.name} AI 교사</div>
                                    <div className="text-xs text-green-400">● 온라인</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <div className="text-5xl mb-4">{currentTeacher?.icon}</div>
                                    <p>안녕하세요! {currentTeacher?.name} AI 교사입니다.</p>
                                    <p className="text-sm mt-1">무엇이든 질문해주세요!</p>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.role === 'assistant' && <span className="text-2xl mr-2">{msg.icon}</span>}
                                        <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {loading && (
                                <div className="flex justify-start">
                                    <span className="text-2xl mr-2">{currentTeacher?.icon}</span>
                                    <div className="bg-gray-700 p-3 rounded-xl">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>답변 작성 중...
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex gap-2">
                                <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                                    placeholder={`${currentTeacher?.name} 선생님께 질문하세요...`}
                                    className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 focus:border-blue-500 outline-none" />
                                <button onClick={sendMessage} disabled={loading || !query.trim()}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 rounded-lg">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
