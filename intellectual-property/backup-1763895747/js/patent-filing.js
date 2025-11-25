// 로딩 메시지 배열
const LOADING_MESSAGES = [
    { icon: '🤔', text: 'AI가 발명 내용을 분석하고 있습니다...' },
    { icon: '📚', text: '특허법 및 심사기준을 참조하고 있습니다...' },
    { icon: '🔍', text: '유사 특허 및 선행기술을 검색 중입니다...' },
    { icon: '⚖️', text: '진보성과 신규성을 평가하고 있습니다...' },
    { icon: '✍️', text: '청구항 초안을 구상하고 있습니다...' },
    { icon: '🌐', text: '국제 특허 동향을 분석하고 있습니다...' },
    { icon: '💡', text: '발명의 핵심 아이디어를 정리하고 있습니다...' },
    { icon: '📋', text: '명세서 구조를 설계하고 있습니다...' }
];

// PDV 금고 상세 모달
function PDVModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-2xl z-10' },
                React.createElement('div', { className: 'flex justify-between items-center' },
                    React.createElement('h3', { className: 'text-3xl font-bold' }, '✅ PDV 금고 통합'),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-white hover:text-gray-200 text-3xl font-bold'
                    }, '×')
                )
            ),
            
            React.createElement('div', { className: 'p-8 space-y-6' },
                React.createElement('div', { className: 'bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-3' }, '🔐 프라이빗 데이터 금고란?'),
                    React.createElement('p', { className: 'text-gray-700 leading-relaxed' },
                        '출원인의 모든 개인정보와 활동 이력을 확장 재무제표 형식으로 본인 단말기에만 저장하고, ',
                        '무결성 검증을 위한 SHA-256 해시값만 오픈해시 네트워크에 기록하여 개인정보 주권을 보장하는 시스템입니다.'
                    )
                ),
                
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-2xl font-bold text-gray-800 mb-4' }, '📋 특허 출원 시 자동화 기능'),
                    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4' },
                        [
                            { icon: '👤', title: '출원인 정보 자동 인출', desc: '이름, 주민등록번호, 주소, 연락처를 PDV에서 자동으로 가져와 수동 입력 불필요' },
                            { icon: '📜', title: '과거 출원 이력 조회', desc: '본인의 과거 특허·상표 출원 내역을 자동으로 불러와 중복 출원 방지' },
                            { icon: '🏢', title: '대리인 정보 자동 연계', desc: '거래 이력이 있는 특허법인·변리사 정보를 PDV에서 자동 제안' },
                            { icon: '💳', title: '수수료 결제 정보', desc: '출원료·심사료 자동 계산 및 결제 정보 연동 (교차 검증)' }
                        ].map(item =>
                            React.createElement('div', {
                                key: item.title,
                                className: 'bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow'
                            },
                                React.createElement('div', { className: 'text-4xl mb-3' }, item.icon),
                                React.createElement('h5', { className: 'font-bold text-gray-800 mb-2' }, item.title),
                                React.createElement('p', { className: 'text-sm text-gray-600' }, item.desc)
                            )
                        )
                    )
                ),
                
                React.createElement('div', { className: 'bg-blue-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-blue-800 mb-3' }, '🔒 해시 전용 저장'),
                    React.createElement('div', { className: 'space-y-2 text-gray-700' },
                        React.createElement('p', {}, '✓ 원본 데이터: 출원인 단말기에만 AES-256-GCM 암호화 저장'),
                        React.createElement('p', {}, '✓ 클라우드: 32바이트 SHA-256 해시만 기록'),
                        React.createElement('p', {}, '✓ 제3자 접근 불가: 지식재산처도 원본 데이터를 볼 수 없음'),
                        React.createElement('p', {}, '✓ 법적 증명력: 해시 일치로 원본 무결성 증명')
                    )
                )
            )
        )
    );
}

// 5계층 오픈해시 상세 모달
function OpenHashModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 rounded-t-2xl z-10' },
                React.createElement('div', { className: 'flex justify-between items-center' },
                    React.createElement('h3', { className: 'text-3xl font-bold' }, '🌐 5계층 오픈해시'),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-white hover:text-gray-200 text-3xl font-bold'
                    }, '×')
                )
            ),
            
            React.createElement('div', { className: 'p-8 space-y-6' },
                React.createElement('div', { className: 'bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-indigo-800 mb-3' }, '⚡ 블록체인 대비 98.5% 에너지 절감'),
                    React.createElement('p', { className: 'text-gray-700 leading-relaxed' },
                        'SHA-256 해시 체인 구조를 사용하되, Proof-of-Work나 Proof-of-Stake 없이 기존 통신 인프라를 활용하여 에너지를 획기적으로 절감합니다.'
                    )
                ),
                
                React.createElement('div', { className: 'bg-red-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-red-800 mb-3' }, '🛡️ 출원서 위변조 영구 방지'),
                    React.createElement('div', { className: 'space-y-2 text-gray-700 text-sm' },
                        React.createElement('p', {}, '1️⃣ 출원 즉시: 명세서·청구항·도면의 SHA-256 해시 생성 (32바이트)'),
                        React.createElement('p', {}, '2️⃣ ECDSA P-256 서명: 지식재산처 개인키로 디지털 서명'),
                        React.createElement('p', {}, '3️⃣ 5계층 전파: 280,000개 노드에 0.18초 내 등록'),
                        React.createElement('p', {}, '4️⃣ 원본 암호화: AES-256-GCM으로 HSM에 보관')
                    )
                ),
                
                React.createElement('div', { className: 'bg-yellow-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-yellow-800 mb-3' }, '⏱️ 원자 시계 기반 선출원주의'),
                    React.createElement('p', { className: 'text-gray-700 mb-3' },
                        '한국표준과학연구원(KRISS)의 원자 시계와 동기화하여 나노초 단위 정밀도로 출원 시각을 기록하며, ',
                        '선출원주의 원칙에 따른 우선권 판단의 결정적 근거가 됩니다.'
                    )
                )
            )
        )
    );
}

// 다국가 평가 상세 모달  
function MultiCountryModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-purple-600 to-pink-700 text-white p-6 rounded-t-2xl z-10' },
                React.createElement('div', { className: 'flex justify-between items-center' },
                    React.createElement('h3', { className: 'text-3xl font-bold' }, '🌍 다국가 특허 평가'),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-white hover:text-gray-200 text-3xl font-bold'
                    }, '×')
                )
            ),
            
            React.createElement('div', { className: 'p-8 space-y-6' },
                React.createElement('div', { className: 'bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-purple-800 mb-3' }, '🎯 AI 기반 5개국 특허 취득 가능성 분석'),
                    React.createElement('p', { className: 'text-gray-700 leading-relaxed' },
                        'DeepSeek R1 모델이 한국, 중국, 일본, 미국, 유럽 5개국의 특허법과 심사기준을 학습하여 각국에서의 특허 등록 가능성을 정량적으로 평가합니다.'
                    )
                ),
                
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-2xl font-bold text-gray-800 mb-4' }, '⚖️ 국가별 특허법'),
                    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4' },
                        [
                            { flag: '🇰🇷', country: '한국', law: '특허법 제29조 (신규성·진보성)', detail: 'PCT 4위, 평균 11개월' },
                            { flag: '🇨🇳', country: '중국', law: '专利法 第22条', detail: '세계 최다 출원국' },
                            { flag: '🇯🇵', country: '일본', law: '特許法 第29条', detail: '높은 심사 품질' },
                            { flag: '🇺🇸', country: '미국', law: '35 USC §101-103', detail: 'Alice 판결 엄격' },
                            { flag: '🇪🇺', country: '유럽', law: 'EPC Article 52-56', detail: '38개국 단일 절차' }
                        ].map(item =>
                            React.createElement('div', {
                                key: item.country,
                                className: 'bg-white border-2 border-gray-200 rounded-lg p-4'
                            },
                                React.createElement('h5', { className: 'text-xl font-bold mb-2' }, `${item.flag} ${item.country}`),
                                React.createElement('p', { className: 'text-sm text-gray-700 mb-1' }, item.law),
                                React.createElement('p', { className: 'text-xs text-gray-500' }, item.detail)
                            )
                        )
                    )
                ),
                
                React.createElement('div', { className: 'bg-green-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-3' }, '🤖 AI 평가 방법론'),
                    React.createElement('div', { className: 'space-y-2 text-sm text-gray-700' },
                        React.createElement('p', {}, '• 학습 데이터: 195,000건 심판 결정례 학습'),
                        React.createElement('p', {}, '• 법령 매칭: 청구항을 각국 특허법과 매칭'),
                        React.createElement('p', {}, '• 거절 사유 예측: 각국 심사기준 적용'),
                        React.createElement('p', {}, '• 등록 확률 산출: 과거 사례 + AI 판단 종합')
                    )
                )
            )
        )
    );
}

// AI 특허 출원 탭
function PatentFilingTab() {
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState('chat');
    const [processingStep, setProcessingStep] = useState('');
    const [patentDocument, setPatentDocument] = useState('');
    const [evaluation, setEvaluation] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [showPDVModal, setShowPDVModal] = useState(false);
    const [showOpenHashModal, setShowOpenHashModal] = useState(false);
    const [showMultiCountryModal, setShowMultiCountryModal] = useState(false);
    
    const processingSteps = [
        { key: 'analyzing', text: '발명 내용을 분석하고 있습니다...', icon: '🔍' },
        { key: 'specification', text: '명세서를 작성 중입니다...', icon: '📝' },
        { key: 'claims', text: '청구항을 작성 중입니다...', icon: '⚖️' },
        { key: 'drawings', text: '도면 설명을 작성 중입니다...', icon: '🖼️' },
        { key: 'application', text: '출원서 양식을 작성 중입니다...', icon: '📋' },
        { key: 'evaluation', text: '특허성을 평가 중입니다...', icon: '🎯' },
        { key: 'market', text: '시장 가치를 분석 중입니다...', icon: '💰' },
        { key: 'submitting', text: '출원서를 제출 중입니다...', icon: '📤' },
        { key: 'payment', text: '심사 비용을 납부합니다...', icon: '💳' }
    ];
    
    useEffect(() => {
        if (loading && currentStep === 'chat') {
            const timer = setInterval(() => {
                setLoadingMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [loading, currentStep]);
    
    useEffect(() => {
        if (loading && processingStep) {
            const currentIndex = processingSteps.findIndex(s => s.key === processingStep);
            if (currentIndex < processingSteps.length - 1) {
                const timer = setTimeout(() => {
                    setProcessingStep(processingSteps[currentIndex + 1].key);
                    setAnimationStep(currentIndex + 1);
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [loading, processingStep, animationStep]);
    
    const handleSendMessage = async () => {
        if (!message.trim() || loading) return;
        
        setLoading(true);
        setLoadingMessageIndex(0);
        
        try {
            const res = await fetch(`${API_BASE_URL}/ai-patent-filing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, conversation, step: currentStep })
            });
            
            const data = await res.json();
            setConversation(data.conversation);
            setMessage('');
        } catch (err) {
            console.error('AI 특허 출원 오류:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleGenerateDocument = async () => {
        setLoading(true);
        setCurrentStep('generating');
        setProcessingStep('analyzing');
        setAnimationStep(0);
        
        try {
            const docRes = await fetch(`${API_BASE_URL}/generate-patent-document`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ conversation })
            });
            const docData = await docRes.json();
            setPatentDocument(docData.document);
            
            const evalRes = await fetch(`${API_BASE_URL}/patent-evaluation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: docData.document })
            });
            const evalData = await evalRes.json();
            setEvaluation(evalData.evaluation);
            
            setCurrentStep('result');
        } catch (err) {
            console.error('문서 생성 오류:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleStartNew = () => {
        setConversation([]);
        setMessage('');
        setCurrentStep('chat');
        setPatentDocument('');
        setEvaluation(null);
        setProcessingStep('');
        setAnimationStep(0);
    };
    
    return React.createElement('div', { className: 'max-w-6xl mx-auto fade-in' },
        // 헤더
        React.createElement('div', { className: 'bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-8 mb-6 text-white' },
            React.createElement('h2', { className: 'text-4xl font-bold mb-3' }, '🤖 AI 특허 출원 시스템'),
            React.createElement('p', { className: 'text-purple-100 text-lg mb-4' },
                '대화형 AI가 발명 내용을 파악하여 명세서, 청구항, 도면을 자동 작성하고 특허성과 시장 가치를 평가합니다'
            ),
            React.createElement('div', { className: 'flex gap-3 flex-wrap' },
                React.createElement('button', {
                    onClick: () => setShowPDVModal(true),
                    className: 'bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105'
                }, '✅ PDV 금고 통합'),
                React.createElement('button', {
                    onClick: () => setShowOpenHashModal(true),
                    className: 'bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105'
                }, '🌐 5계층 오픈해시'),
                React.createElement('button', {
                    onClick: () => setShowMultiCountryModal(true),
                    className: 'bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105'
                }, '🌍 다국가 평가')
            )
        ),
        
        // 대화 단계
        currentStep === 'chat' && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-4' }, '💬 발명 내용 상담'),
            
            conversation.length > 0 && React.createElement('div', { className: 'mb-6 space-y-4 max-h-96 overflow-y-auto' },
                conversation.map((msg, idx) =>
                    React.createElement('div', {
                        key: idx,
                        className: `p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-100 mr-8'}`
                    },
                        React.createElement('p', { className: 'text-sm font-semibold mb-2' },
                            msg.role === 'user' ? '👤 출원인' : '🤖 AI Agent'
                        ),
                        React.createElement('p', { className: 'text-gray-800 whitespace-pre-wrap' }, msg.content)
                    )
                )
            ),
            
            loading && currentStep === 'chat' && React.createElement('div', {
                className: 'mb-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl animate-pulse'
            },
                React.createElement('div', { className: 'flex items-center space-x-4' },
                    React.createElement('div', { className: 'animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent' }),
                    React.createElement('div', { className: 'flex-1' },
                        React.createElement('div', { className: 'text-3xl mb-2 animate-bounce' }, LOADING_MESSAGES[loadingMessageIndex].icon),
                        React.createElement('p', { className: 'text-lg font-semibold text-gray-800' }, LOADING_MESSAGES[loadingMessageIndex].text),
                        React.createElement('p', { className: 'text-sm text-gray-600 mt-2' }, '잠시만 기다려주세요. AI가 정교하게 분석 중입니다...')
                    )
                )
            ),
            
            React.createElement('div', { className: 'flex gap-2' },
                React.createElement('textarea', {
                    value: message,
                    onChange: (e) => setMessage(e.target.value),
                    placeholder: '발명의 내용을 설명해주세요...\n예: 인공지능을 이용한 자동 특허 심사 시스템을 발명했습니다.',
                    className: 'flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none',
                    rows: 3,
                    disabled: loading
                }),
                React.createElement('button', {
                    onClick: handleSendMessage,
                    disabled: loading || !message.trim(),
                    className: `px-6 py-3 rounded-lg font-bold text-white transition-all ${
                        loading || !message.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                    }`
                }, loading ? '⏳' : '전송')
            ),
            
            conversation.length > 2 && React.createElement('button', {
                onClick: handleGenerateDocument,
                disabled: loading,
                className: 'w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg transition-all'
            }, '📄 특허 출원서 생성 및 평가')
        ),
        
        currentStep === 'generating' && loading && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-6 text-center' }, '⚙️ AI가 특허 출원을 처리하고 있습니다'),
            React.createElement('div', { className: 'space-y-3' },
                processingSteps.map((step, idx) =>
                    React.createElement('div', {
                        key: step.key,
                        className: `flex items-center p-4 rounded-lg transition-all duration-500 ${
                            idx <= animationStep
                                ? 'bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-500 scale-105'
                                : 'bg-gray-100 border-2 border-gray-300 opacity-50'
                        }`
                    },
                        React.createElement('span', { className: 'text-3xl mr-4' }, step.icon),
                        React.createElement('span', { className: 'font-semibold text-gray-800 flex-1' }, step.text),
                        idx <= animationStep && React.createElement('span', { className: 'text-green-600 text-2xl animate-bounce' }, '✓')
                    )
                )
            )
        ),
        
        currentStep === 'result' && evaluation && React.createElement(PatentResultDisplay, {
            patentDocument,
            evaluation,
            onStartNew: handleStartNew
        }),
        
        // 모달들
        React.createElement(PDVModal, { isOpen: showPDVModal, onClose: () => setShowPDVModal(false) }),
        React.createElement(OpenHashModal, { isOpen: showOpenHashModal, onClose: () => setShowOpenHashModal(false) }),
        React.createElement(MultiCountryModal, { isOpen: showMultiCountryModal, onClose: () => setShowMultiCountryModal(false) })
    );
}

// 특허 평가 결과 표시
function PatentResultDisplay({ patentDocument, evaluation, onStartNew }) {
    const [activeSection, setActiveSection] = useState('document');
    
    return React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-2 flex gap-2' },
            ['document', 'evaluation', 'market'].map(section =>
                React.createElement('button', {
                    key: section,
                    onClick: () => setActiveSection(section),
                    className: `flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                        activeSection === section ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`
                },
                    section === 'document' ? '📄 출원서' : section === 'evaluation' ? '🎯 특허성 평가' : '💰 시장 가치'
                )
            )
        ),
        
        activeSection === 'document' && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-4' }, '📄 특허 출원서'),
            React.createElement('div', { className: 'bg-gray-50 p-6 rounded-lg border-2 border-gray-300 whitespace-pre-wrap font-mono text-sm max-h-96 overflow-y-auto' },
                patentDocument
            ),
            React.createElement('div', { className: 'mt-6 flex gap-4' },
                React.createElement('button', {
                    onClick: () => {
                        const blob = new Blob([patentDocument], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = '특허출원서.txt';
                        a.click();
                    },
                    className: 'flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700'
                }, '💾 출원서 다운로드')
            )
        ),
        
        activeSection === 'evaluation' && React.createElement('div', { className: 'space-y-6' },
            React.createElement('div', { className: 'bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-8 text-white' },
                React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, '🎯 종합 특허성 평가'),
                React.createElement('div', { className: 'text-6xl font-black mb-2' }, `${evaluation.overall_score}점`)
            ),
            
            React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-4' },
                [
                    { label: '신규성', score: evaluation.novelty_score, icon: '🆕' },
                    { label: '진보성', score: evaluation.inventive_step_score, icon: '📈' },
                    { label: '산업성', score: evaluation.industrial_applicability_score, icon: '🏭' },
                    { label: '명확성', score: evaluation.clarity_score, icon: '💎' }
                ].map(item =>
                    React.createElement('div', { key: item.label, className: 'bg-white rounded-xl shadow-lg p-6 text-center' },
                        React.createElement('div', { className: 'text-3xl mb-2' }, item.icon),
                        React.createElement('div', { className: 'text-2xl font-bold text-purple-600 mb-1' }, `${item.score}점`),
                        React.createElement('div', { className: 'text-sm text-gray-600' }, item.label)
                    )
                )
            ),
            
            React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
                React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-6' }, '🌍 국가별 특허 취득 가능성'),
                React.createElement('div', { className: 'space-y-4' },
                    Object.entries(evaluation.patent_probability).map(([country, probability]) =>
                        React.createElement('div', { key: country },
                            React.createElement('div', { className: 'flex justify-between mb-2' },
                                React.createElement('span', { className: 'font-semibold text-gray-700' },
                                    country === 'korea' ? '🇰🇷 한국' : country === 'china' ? '🇨🇳 중국' :
                                    country === 'japan' ? '🇯🇵 일본' : country === 'usa' ? '🇺🇸 미국' : '🇪🇺 유럽'
                                ),
                                React.createElement('span', { className: 'font-bold text-purple-600' }, `${probability}%`)
                            ),
                            React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-3' },
                                React.createElement('div', {
                                    className: 'bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all',
                                    style: { width: `${probability}%` }
                                })
                            )
                        )
                    )
                )
            )
        ),
        
        activeSection === 'market' && React.createElement('div', { className: 'space-y-6' },
            React.createElement('div', { className: 'grid md:grid-cols-3 gap-6' },
                React.createElement('div', { className: 'bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl p-8 text-white' },
                    React.createElement('div', { className: 'text-4xl mb-3' }, '🌐'),
                    React.createElement('div', { className: 'text-sm opacity-90 mb-2' }, '글로벌 시장 규모'),
                    React.createElement('div', { className: 'text-4xl font-black' }, 
                        `${evaluation.market_analysis.global_market_size_trillion_krw}조 원`
                    )
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-xl p-8 text-white' },
                    React.createElement('div', { className: 'text-4xl mb-3' }, '💎'),
                    React.createElement('div', { className: 'text-sm opacity-90 mb-2' }, '기술 자체 가치'),
                    React.createElement('div', { className: 'text-4xl font-black' }, 
                        `${evaluation.market_analysis.tech_value_billion_krw}억 원`
                    )
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-xl p-8 text-white' },
                    React.createElement('div', { className: 'text-4xl mb-3' }, '💰'),
                    React.createElement('div', { className: 'text-sm opacity-90 mb-2' }, '연간 라이선스 수익'),
                    React.createElement('div', { className: 'text-4xl font-black' }, 
                        `${evaluation.market_analysis.annual_license_revenue_billion_krw}억 원`
                    )
                )
            )
        ),
        
        React.createElement('button', {
            onClick: onStartNew,
            className: 'w-full py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-all'
        }, '🆕 새로운 특허 출원하기')
    );
}
