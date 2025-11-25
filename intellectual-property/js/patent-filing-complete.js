
const LOADING_MESSAGES = [
    { icon: '🤔', text: 'AI가 발명 내용을 분석하고 있습니다...', progress: 10 },
    { icon: '📚', text: '특허법 및 심사기준을 참조하고 있습니다...', progress: 20 },
    { icon: '🔍', text: '유사 특허 및 선행기술을 검색 중입니다...', progress: 35 },
    { icon: '⚖️', text: '진보성과 신규성을 평가하고 있습니다...', progress: 50 },
    { icon: '✍️', text: '청구항 초안을 구상하고 있습니다...', progress: 65 },
    { icon: '📋', text: '명세서를 작성하고 있습니다...', progress: 80 },
    { icon: '🌐', text: '국제 특허 동향을 분석하고 있습니다...', progress: 90 },
    { icon: '✅', text: '최종 검토 중입니다...', progress: 95 }
];

const DOCUMENT_GENERATION_STEPS = [
    { key: 'analyzing', text: '발명 내용 분석 중...', icon: '🔍', progress: 10 },
    { key: 'specification', text: '명세서 작성 중...', icon: '📝', progress: 30 },
    { key: 'claims', text: '청구항 작성 중...', icon: '⚖️', progress: 50 },
    { key: 'drawings', text: '도면 설명 작성 중...', icon: '🖼️', progress: 65 },
    { key: 'evaluation', text: '특허성 평가 중...', icon: '🎯', progress: 80 },
    { key: 'market', text: '시장 가치 분석 중...', progress: 90, icon: '💰' },
    { key: 'submitting', text: '출원서 제출 준비 중...', icon: '📤', progress: 95 },
    { key: 'complete', text: '완료!', icon: '✅', progress: 100 }
];

function PatentFilingTabComplete() {
    const [modal, setModal] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
    const [stage, setStage] = useState('chat'); // chat, generating, result
    const [generationStep, setGenerationStep] = useState(0);
    const [patentDocument, setPatentDocument] = useState('');
    const [evaluation, setEvaluation] = useState(null);
    
    useEffect(() => {
        if (loading && stage === 'chat') {
            const timer = setInterval(() => {
                setLoadingMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [loading, stage]);
    
    useEffect(() => {
        if (stage === 'generating') {
            if (generationStep < DOCUMENT_GENERATION_STEPS.length - 1) {
                const timer = setTimeout(() => {
                    setGenerationStep(prev => prev + 1);
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [stage, generationStep]);
    
    const handleSend = async () => {
        if (!message.trim() || loading) return;
        setLoading(true);
        
        try {
            const res = await fetch(`${API_URL}/ai-patent-filing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, conversation, step: 'chat' })
            });
            const data = await res.json();
            setConversation(data.conversation);
            setMessage('');
        } catch (err) {
            console.error('AI 특허 출원 오류:', err);
            alert('오류가 발생했습니다: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleGenerateDocument = async () => {
        setStage('generating');
        setGenerationStep(0);
        
        try {
            // 문서 생성
            const docRes = await fetch(`${API_URL}/generate-patent-document`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversation })
            });
            const docData = await docRes.json();
            setPatentDocument(docData.document);
            
            // 특허성 평가
            const evalRes = await fetch(`${API_URL}/patent-evaluation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: docData.document })
            });
            const evalData = await evalRes.json();
            setEvaluation(evalData.evaluation);
            
            // 모든 단계 완료 대기
            await new Promise(resolve => {
                const checkComplete = setInterval(() => {
                    if (generationStep >= DOCUMENT_GENERATION_STEPS.length - 1) {
                        clearInterval(checkComplete);
                        resolve();
                    }
                }, 500);
            });
            
            setStage('result');
        } catch (err) {
            console.error('문서 생성 오류:', err);
            alert('문서 생성 중 오류가 발생했습니다.');
            setStage('chat');
        }
    };
    
    const handleStartNew = () => {
        setConversation([]);
        setMessage('');
        setStage('chat');
        setPatentDocument('');
        setEvaluation(null);
        setGenerationStep(0);
    };
    
    return React.createElement('div', { className: 'max-w-6xl mx-auto space-y-6' },
        // 헤더
        React.createElement('div', { className: 'bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-8 text-white' },
            React.createElement('h2', { className: 'text-4xl font-bold mb-4' }, '🤖 AI 특허 출원 시스템'),
            React.createElement('p', { className: 'text-lg mb-4' }, 'AI가 발명 내용을 파악하여 명세서, 청구항, 도면을 자동 작성하고 특허청에 제출합니다'),
            React.createElement('div', { className: 'flex gap-3 flex-wrap' },
                React.createElement('button', {
                    onClick: () => setModal('pdv'),
                    className: 'bg-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition hover:scale-105'
                }, '✅ PDV 금고 통합'),
                React.createElement('button', {
                    onClick: () => setModal('hash'),
                    className: 'bg-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition hover:scale-105'
                }, '🌐 5계층 오픈해시'),
                React.createElement('button', {
                    onClick: () => setModal('country'),
                    className: 'bg-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition hover:scale-105'
                }, '🌍 다국가 평가')
            )
        ),
        
        // 대화 단계
        stage === 'chat' && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, '💬 발명 내용 상담'),
            
            // 대화 히스토리
            conversation.length > 0 && React.createElement('div', { className: 'mb-6 space-y-4 max-h-96 overflow-y-auto' },
                conversation.map((msg, idx) =>
                    React.createElement('div', {
                        key: idx,
                        className: `p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-100 mr-8'}`
                    },
                        React.createElement('p', { className: 'text-sm font-semibold mb-2 text-gray-600' },
                            msg.role === 'user' ? '👤 출원인' : '🤖 AI Agent'
                        ),
                        React.createElement('p', { className: 'text-gray-800 whitespace-pre-wrap' }, msg.content)
                    )
                )
            ),
            
            // 로딩 중 메시지
            loading && React.createElement('div', { className: 'mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6' },
                React.createElement('div', { className: 'flex items-center gap-4 mb-4' },
                    React.createElement('div', { className: 'animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent' }),
                    React.createElement('div', { className: 'flex-1' },
                        React.createElement('div', { className: 'text-3xl mb-2 animate-bounce' }, 
                            LOADING_MESSAGES[loadingMsgIndex].icon
                        ),
                        React.createElement('p', { className: 'text-lg font-semibold text-gray-800' },
                            LOADING_MESSAGES[loadingMsgIndex].text
                        )
                    )
                ),
                React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-3' },
                    React.createElement('div', {
                        className: 'bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500',
                        style: { width: `${LOADING_MESSAGES[loadingMsgIndex].progress}%` }
                    })
                ),
                React.createElement('p', { className: 'text-sm text-gray-600 mt-2 text-right' },
                    `${LOADING_MESSAGES[loadingMsgIndex].progress}% 완료`
                )
            ),
            
            // 입력창
            React.createElement('div', { className: 'space-y-4' },
                React.createElement('textarea', {
                    value: message,
                    onChange: (e) => setMessage(e.target.value),
                    onKeyDown: (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    },
                    placeholder: '발명의 내용을 설명해주세요...\n예: 인공지능을 이용한 자동 특허 심사 시스템을 발명했습니다.',
                    className: 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none h-32 resize-none',
                    disabled: loading
                }),
                React.createElement('button', {
                    onClick: handleSend,
                    disabled: loading || !message.trim(),
                    className: `w-full py-4 rounded-lg font-bold text-white transition-all ${
                        loading || !message.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                    }`
                }, loading ? '처리 중...' : '전송')
            ),
            
            // 문서 생성 버튼
            conversation.length > 2 && React.createElement('button', {
                onClick: handleGenerateDocument,
                disabled: loading,
                className: 'w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg transition-all hover:scale-105'
            }, '📄 특허 출원서 생성 및 제출')
        ),
        
        // 문서 생성 중
        stage === 'generating' && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h3', { className: 'text-2xl font-bold text-center mb-8' }, '⚙️ AI가 특허 출원을 처리하고 있습니다'),
            React.createElement('div', { className: 'space-y-4 mb-8' },
                DOCUMENT_GENERATION_STEPS.map((step, idx) =>
                    React.createElement('div', {
                        key: step.key,
                        className: `flex items-center p-4 rounded-lg transition-all duration-500 ${
                            idx <= generationStep
                                ? 'bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-500 scale-105'
                                : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                        }`
                    },
                        React.createElement('span', { className: 'text-3xl mr-4' }, step.icon),
                        React.createElement('span', { className: 'font-semibold text-gray-800 flex-1' }, step.text),
                        idx <= generationStep && React.createElement('span', { className: 'text-green-600 text-2xl animate-bounce' }, '✓')
                    )
                )
            ),
            React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-4' },
                React.createElement('div', {
                    className: 'bg-gradient-to-r from-purple-500 to-indigo-600 h-4 rounded-full transition-all duration-500',
                    style: { width: `${DOCUMENT_GENERATION_STEPS[generationStep].progress}%` }
                })
            ),
            React.createElement('p', { className: 'text-center text-lg font-bold text-purple-600 mt-4' },
                `${DOCUMENT_GENERATION_STEPS[generationStep].progress}% 완료`
            )
        ),
        
        // 결과 표시
        stage === 'result' && evaluation && React.createElement(PatentResultDisplay, {
            patentDocument,
            evaluation,
            onStartNew: handleStartNew
        }),
        
        // 모달들
        modal === 'pdv' && React.createElement(PDVModal, { onClose: () => setModal(null) }),
        modal === 'hash' && React.createElement(HashModal, { onClose: () => setModal(null) }),
        modal === 'country' && React.createElement(CountryModal, { onClose: () => setModal(null) })
    );
}

function PatentResultDisplay({ patentDocument, evaluation, onStartNew }) {
    const [activeTab, setActiveTab] = useState('document');
    
    return React.createElement('div', { className: 'space-y-6' },
        // 성공 메시지
        React.createElement('div', { className: 'bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 text-white text-center' },
            React.createElement('div', { className: 'text-6xl mb-4' }, '🎉'),
            React.createElement('h2', { className: 'text-3xl font-bold mb-2' }, '특허 출원 완료!'),
            React.createElement('p', { className: 'text-lg' }, '명세서, 청구항, 도면이 자동 작성되어 지식재산처에 제출되었습니다')
        ),
        
        // 탭 메뉴
        React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-2 flex gap-2' },
            ['document', 'evaluation', 'market', 'submission'].map(tab =>
                React.createElement('button', {
                    key: tab,
                    onClick: () => setActiveTab(tab),
                    className: `flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`
                },
                    tab === 'document' ? '📄 출원서' :
                    tab === 'evaluation' ? '🎯 특허성 평가' :
                    tab === 'market' ? '💰 시장 가치' :
                    '📤 제출 현황'
                )
            )
        ),
        
        // 출원서
        activeTab === 'document' && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, '📄 특허 출원서'),
            React.createElement('div', { 
                className: 'bg-gray-50 p-6 rounded-lg border-2 border-gray-300 whitespace-pre-wrap font-mono text-sm max-h-[500px] overflow-y-auto' 
            }, patentDocument),
            React.createElement('div', { className: 'mt-6 flex gap-4' },
                React.createElement('button', {
                    onClick: () => {
                        const blob = new Blob([patentDocument], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `특허출원서_${new Date().toISOString().split('T')[0]}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                    },
                    className: 'flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700'
                }, '💾 출원서 다운로드'),
                React.createElement('button', {
                    onClick: () => {
                        navigator.clipboard.writeText(patentDocument);
                        alert('클립보드에 복사되었습니다!');
                    },
                    className: 'flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700'
                }, '📋 클립보드 복사')
            )
        ),
        
        // 특허성 평가
        activeTab === 'evaluation' && React.createElement('div', { className: 'space-y-6' },
            React.createElement('div', { className: 'bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-8 text-white text-center' },
                React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, '🎯 종합 특허성 평가'),
                React.createElement('div', { className: 'text-7xl font-black mb-2' }, `${evaluation.overall_score}점`),
                React.createElement('p', { className: 'text-xl opacity-90' }, '100점 만점 기준')
            ),
            
            React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-4' },
                [
                    { label: '신규성', score: evaluation.novelty_score, icon: '🆕' },
                    { label: '진보성', score: evaluation.inventive_step_score, icon: '📈' },
                    { label: '산업성', score: evaluation.industrial_applicability_score, icon: '🏭' },
                    { label: '명확성', score: evaluation.clarity_score, icon: '💎' }
                ].map(item =>
                    React.createElement('div', { key: item.label, className: 'bg-white rounded-xl shadow-lg p-6 text-center' },
                        React.createElement('div', { className: 'text-4xl mb-2' }, item.icon),
                        React.createElement('div', { className: 'text-3xl font-bold text-purple-600 mb-1' }, `${item.score}점`),
                        React.createElement('div', { className: 'text-sm text-gray-600' }, item.label)
                    )
                )
            ),
            
            React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
                React.createElement('h3', { className: 'text-2xl font-bold mb-6' }, '🌍 국가별 특허 취득 가능성'),
                React.createElement('div', { className: 'space-y-4' },
                    Object.entries(evaluation.patent_probability).map(([country, prob]) =>
                        React.createElement('div', { key: country },
                            React.createElement('div', { className: 'flex justify-between mb-2' },
                                React.createElement('span', { className: 'font-semibold' },
                                    country === 'korea' ? '🇰🇷 한국' :
                                    country === 'china' ? '🇨🇳 중국' :
                                    country === 'japan' ? '🇯🇵 일본' :
                                    country === 'usa' ? '🇺🇸 미국' : '🇪🇺 유럽'
                                ),
                                React.createElement('span', { className: 'font-bold text-purple-600' }, `${prob}%`)
                            ),
                            React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-3' },
                                React.createElement('div', {
                                    className: 'bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-1000',
                                    style: { width: `${prob}%` }
                                })
                            )
                        )
                    )
                )
            ),
            
            React.createElement('div', { className: 'grid md:grid-cols-2 gap-6' },
                React.createElement('div', { className: 'bg-green-50 border-2 border-green-500 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-4' }, '✅ 강점'),
                    React.createElement('ul', { className: 'space-y-2' },
                        evaluation.strengths.map((s, idx) =>
                            React.createElement('li', { key: idx, className: 'flex items-start' },
                                React.createElement('span', { className: 'text-green-600 mr-2' }, '•'),
                                React.createElement('span', {}, s)
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'bg-orange-50 border-2 border-orange-500 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-orange-800 mb-4' }, '⚠️ 보완점'),
                    React.createElement('ul', { className: 'space-y-2' },
                        evaluation.weaknesses.map((w, idx) =>
                            React.createElement('li', { key: idx, className: 'flex items-start' },
                                React.createElement('span', { className: 'text-orange-600 mr-2' }, '•'),
                                React.createElement('span', {}, w)
                            )
                        )
                    )
                )
            )
        ),
        
        // 시장 가치
        activeTab === 'market' && React.createElement('div', { className: 'space-y-6' },
            React.createElement('div', { className: 'grid md:grid-cols-3 gap-6' },
                React.createElement('div', { className: 'bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl p-8 text-white text-center' },
                    React.createElement('div', { className: 'text-5xl mb-3' }, '🌐'),
                    React.createElement('div', { className: 'text-sm opacity-90 mb-2' }, '글로벌 시장 규모'),
                    React.createElement('div', { className: 'text-4xl font-black' }, 
                        `${evaluation.market_analysis.global_market_size_trillion_krw}조 원`
                    )
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl p-8 text-white text-center' },
                    React.createElement('div', { className: 'text-5xl mb-3' }, '💎'),
                    React.createElement('div', { className: 'text-sm opacity-90 mb-2' }, '기술 자체 가치'),
                    React.createElement('div', { className: 'text-4xl font-black' }, 
                        `${evaluation.market_analysis.tech_value_billion_krw}억 원`
                    )
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-xl p-8 text-white text-center' },
                    React.createElement('div', { className: 'text-5xl mb-3' }, '💰'),
                    React.createElement('div', { className: 'text-sm opacity-90 mb-2' }, '연간 라이선스 수익'),
                    React.createElement('div', { className: 'text-4xl font-black' }, 
                        `${evaluation.market_analysis.annual_license_revenue_billion_krw}억 원`
                    )
                )
            ),
            React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
                React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, '📊 평가 요약'),
                React.createElement('p', { className: 'text-gray-700 whitespace-pre-wrap leading-relaxed' }, evaluation.evaluation_summary)
            )
        ),
        
        // 제출 현황
        activeTab === 'submission' && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h3', { className: 'text-2xl font-bold mb-6' }, '📤 제출 현황'),
            React.createElement('div', { className: 'space-y-4' },
                [
                    { status: 'complete', text: '명세서 작성 완료', icon: '✅', time: '2분 전' },
                    { status: 'complete', text: '청구항 작성 완료', icon: '✅', time: '2분 전' },
                    { status: 'complete', text: '도면 설명 작성 완료', icon: '✅', time: '1분 전' },
                    { status: 'complete', text: '지식재산처 제출 완료', icon: '✅', time: '방금 전' },
                    { status: 'complete', text: '출원번호 발급: 10-2025-0012345', icon: '📝', time: '방금 전' },
                    { status: 'pending', text: '심사 비용 납부 대기 중', icon: '💳', time: '납부 필요' }
                ].map((item, idx) =>
                    React.createElement('div', { 
                        key: idx,
                        className: `flex items-center p-4 rounded-lg ${
                            item.status === 'complete' ? 'bg-green-50 border-2 border-green-500' : 'bg-yellow-50 border-2 border-yellow-500'
                        }`
                    },
                        React.createElement('span', { className: 'text-3xl mr-4' }, item.icon),
                        React.createElement('div', { className: 'flex-1' },
                            React.createElement('p', { className: 'font-bold text-gray-800' }, item.text),
                            React.createElement('p', { className: 'text-sm text-gray-600' }, item.time)
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg' },
                React.createElement('p', { className: 'font-bold text-blue-800 mb-2' }, '💡 다음 단계'),
                React.createElement('p', { className: 'text-gray-700' }, '출원료 133,000원을 납부하시면 심사가 시작됩니다. 평균 심사 기간은 11개월입니다.')
            )
        ),
        
        React.createElement('button', {
            onClick: onStartNew,
            className: 'w-full py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all hover:shadow-lg'
        }, '🆕 새로운 특허 출원하기')
    );
}
