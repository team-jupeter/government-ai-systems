// FloatingExplainer 컴포넌트 - AI 전자출원 및 개인정보 금고 상세 설명
const FloatingExplainer = ({ isOpen, onToggle }) => {
    const [activeModal, setActiveModal] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [isMinimized, setIsMinimized] = React.useState(false);

    const openModal = (modalType) => {
        setActiveModal(modalType);
        setActiveTab('overview');
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    // AI 전자출원 탭 메뉴
    const aiPatentTabs = [
        { id: 'overview', label: '개요', icon: '📖' },
        { id: 'process', label: '출원 절차', icon: '📋' },
        { id: 'ai-features', label: 'AI 기능', icon: '🤖' },
        { id: 'cost', label: '비용 혁신', icon: '💰' },
        { id: 'business', label: '사업화 지원', icon: '🚀' },
        { id: 'openhash', label: '오픈해시', icon: '⛓️' }
    ];

    // 개인정보 금고 탭 메뉴
    const vaultTabs = [
        { id: 'overview', label: '개요', icon: '📖' },
        { id: 'security', label: '보안 체계', icon: '🔐' },
        { id: 'auth', label: '본인 확인', icon: '👤' },
        { id: 'integration', label: 'AI 연동', icon: '🔗' }
    ];

    return (
        React.createElement(React.Fragment, null,
            // 플로팅 버튼 - 좌측 하단
            React.createElement('div', { 
                className: `fixed z-[1000] transition-all duration-300 ${isMinimized ? 'bottom-4 left-4' : 'bottom-6 left-6'}`
            },
                isMinimized ? (
                    React.createElement('button', {
                        onClick: () => setIsMinimized(false),
                        className: 'w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-110 transition flex items-center justify-center',
                        title: '도움말 열기'
                    }, React.createElement('i', { className: 'fas fa-question' }))
                ) : (
                    React.createElement('div', { className: 'flex flex-col gap-2' },
                        React.createElement('button', {
                            onClick: () => setIsMinimized(true),
                            className: 'self-end w-6 h-6 bg-gray-400 hover:bg-gray-500 text-white rounded-full text-xs flex items-center justify-center mb-1',
                            title: '최소화'
                        }, React.createElement('i', { className: 'fas fa-minus' })),
                        React.createElement('button', {
                            onClick: () => openModal('data-vault'),
                            className: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:from-emerald-700 hover:to-teal-700 transition flex items-center gap-2 text-sm'
                        },
                            React.createElement('span', null, '🔐'),
                            React.createElement('span', { className: 'font-medium' }, '개인정보 금고')
                        ),
                        React.createElement('button', {
                            onClick: () => openModal('ai-patent'),
                            className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2 text-sm'
                        },
                            React.createElement('span', null, '💡'),
                            React.createElement('span', { className: 'font-medium' }, 'AI 전자출원이란?')
                        )
                    )
                )
            ),

            // ========================================
            // AI 전자출원 모달 - 대폭 강화
            // ========================================
            activeModal === 'ai-patent' && React.createElement('div', { className: 'fixed inset-0 z-[9999] flex items-center justify-center p-4' },
                React.createElement('div', { className: 'absolute inset-0 bg-black/60', onClick: closeModal }),
                React.createElement('div', { className: 'relative bg-white rounded-2xl shadow-2xl w-[1000px] max-h-[90vh] overflow-hidden flex flex-col' },
                    // 헤더
                    React.createElement('div', { className: 'bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 text-white p-6' },
                        React.createElement('div', { className: 'flex items-center justify-between' },
                            React.createElement('div', { className: 'flex items-center gap-4' },
                                React.createElement('div', { className: 'w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl' }, '🤖'),
                                React.createElement('div', null,
                                    React.createElement('h2', { className: 'text-2xl font-bold' }, 'AI 전자출원 시스템'),
                                    React.createElement('p', { className: 'text-blue-200' }, '특허청 + 지식재산처 업무를 100% 대체하는 AI 플랫폼'),
                                    React.createElement('div', { className: 'flex gap-3 mt-2' },
                                        React.createElement('span', { className: 'px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded text-xs font-bold' }, '비용 90% 절감'),
                                        React.createElement('span', { className: 'px-2 py-0.5 bg-green-400 text-green-900 rounded text-xs font-bold' }, '처리시간 95% 단축'),
                                        React.createElement('span', { className: 'px-2 py-0.5 bg-blue-300 text-blue-900 rounded text-xs font-bold' }, '24시간 무인 운영')
                                    )
                                )
                            ),
                            React.createElement('button', {
                                onClick: closeModal,
                                className: 'w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center'
                            }, React.createElement('i', { className: 'fas fa-times text-lg' }))
                        )
                    ),

                    // 탭 네비게이션
                    React.createElement('div', { className: 'flex border-b border-gray-200 bg-gray-50 px-4' },
                        aiPatentTabs.map(tab => 
                            React.createElement('button', {
                                key: tab.id,
                                onClick: () => setActiveTab(tab.id),
                                className: `px-4 py-3 text-sm font-medium transition border-b-2 ${
                                    activeTab === tab.id 
                                        ? 'text-blue-600 border-blue-600 bg-white' 
                                        : 'text-gray-500 border-transparent hover:text-gray-700'
                                }`
                            }, 
                                React.createElement('span', { className: 'mr-1' }, tab.icon),
                                tab.label
                            )
                        )
                    ),

                    // 콘텐츠 영역
                    React.createElement('div', { className: 'flex-1 overflow-y-auto p-6' },
                        
                        // 개요 탭
                        activeTab === 'overview' && React.createElement('div', { className: 'space-y-6' },
                            // 핵심 메시지
                            React.createElement('div', { className: 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6' },
                                React.createElement('h3', { className: 'text-xl font-bold text-gray-800 mb-3' }, '🎯 AI가 특허 출원의 모든 것을 대신합니다'),
                                React.createElement('p', { className: 'text-gray-700 leading-relaxed' },
                                    'AI 전자출원 시스템은 발명자와의 자연어 대화를 통해 발명의 핵심을 파악하고, ',
                                    React.createElement('strong', null, '특허 명세서 작성, 청구항 생성, 도면 제작, 선행기술 조사, 등록 가능성 예측, 시장 가치 산정, 사업화 지원'),
                                    '까지 지식재산권 출원의 전 과정을 AI가 주도적으로 수행합니다. ',
                                    '기존 특허청과 지식재산처의 역할을 100% 대체하며, 추가로 사업화 컨설팅까지 제공합니다.'
                                )
                            ),

                            // 기존 vs AI 비교
                            React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                                React.createElement('div', { className: 'bg-red-50 border border-red-200 rounded-xl p-5' },
                                    React.createElement('h4', { className: 'font-bold text-red-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', null, '❌'),
                                        '기존 방식의 문제점'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-red-700' },
                                        ['변리사 수수료 200~500만원', '출원까지 2~4주 소요', '복잡한 법률 용어와 양식', '선행기술 조사 별도 비용', '사업화 지원 부재', '24시간 상담 불가'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-red-500' }, '•'),
                                                item
                                            )
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'bg-green-50 border border-green-200 rounded-xl p-5' },
                                    React.createElement('h4', { className: 'font-bold text-green-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', null, '✅'),
                                        'AI 전자출원의 혁신'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-green-700' },
                                        ['출원 비용 90% 절감 (20~50만원)', '당일 출원 가능 (최소 30분)', '자연어 대화로 간편 작성', 'AI 선행기술 조사 무료 포함', '사업화/투자 연계 지원', '24시간 365일 AI 상담'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-green-500' }, '✓'),
                                                item
                                            )
                                        )
                                    )
                                )
                            ),

                            // 주요 기능 카드
                            React.createElement('div', null,
                                React.createElement('h4', { className: 'font-bold text-gray-800 mb-3' }, '🔧 AI가 수행하는 업무'),
                                React.createElement('div', { className: 'grid grid-cols-4 gap-3' },
                                    [
                                        { icon: '📝', title: '명세서 작성', desc: '대화만으로 완벽한 특허 명세서 자동 생성' },
                                        { icon: '📊', title: '청구항 생성', desc: '권리범위 최적화된 독립항/종속항 작성' },
                                        { icon: '🎨', title: '도면 제작', desc: 'Mermaid 기반 특허청 규격 도면 자동 생성' },
                                        { icon: '🔍', title: '선행기술 조사', desc: '5,200만 건 글로벌 DB 0.3초 검색' },
                                        { icon: '📈', title: '등록 예측', desc: '94.7% 정확도 등록 가능성 분석' },
                                        { icon: '💎', title: '가치 산정', desc: '특허 시장가치 및 라이선스 수익 예측' },
                                        { icon: '🏢', title: '사업화 지원', desc: '기보 연계, 투자 유치, 컨소시엄 구성' },
                                        { icon: '⚖️', title: '제도 개선', desc: '심사 결과 괴리 시 자동 입법 제안' }
                                    ].map((item, idx) =>
                                        React.createElement('div', { key: idx, className: 'bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition' },
                                            React.createElement('div', { className: 'text-2xl mb-1' }, item.icon),
                                            React.createElement('div', { className: 'font-medium text-gray-800 text-xs' }, item.title),
                                            React.createElement('div', { className: 'text-xs text-gray-500 mt-1' }, item.desc)
                                        )
                                    )
                                )
                            ),

                            // 통계
                            React.createElement('div', { className: 'bg-gray-900 text-white rounded-xl p-5' },
                                React.createElement('h4', { className: 'font-bold text-yellow-400 mb-4 text-center' }, '📊 시스템 성능 지표'),
                                React.createElement('div', { className: 'grid grid-cols-5 gap-4 text-center' },
                                    [
                                        { value: '52,847,293', label: '검색 가능 특허 DB', unit: '건' },
                                        { value: '94.7', label: '등록 예측 정확도', unit: '%' },
                                        { value: '0.3', label: '선행기술 검색 속도', unit: '초' },
                                        { value: '90', label: '비용 절감률', unit: '%' },
                                        { value: '98.5', label: '오픈해시 에너지 절감', unit: '%' }
                                    ].map((stat, idx) =>
                                        React.createElement('div', { key: idx },
                                            React.createElement('div', { className: 'text-2xl font-bold text-yellow-400' }, stat.value),
                                            React.createElement('div', { className: 'text-xs text-gray-400' }, stat.label),
                                            React.createElement('div', { className: 'text-xs text-gray-500' }, stat.unit)
                                        )
                                    )
                                )
                            )
                        ),

                        // 출원 절차 탭
                        activeTab === 'process' && React.createElement('div', { className: 'space-y-6' },
                            React.createElement('div', { className: 'bg-blue-50 border border-blue-200 rounded-xl p-4' },
                                React.createElement('h4', { className: 'font-bold text-blue-800 mb-2' }, '💬 대화형 출원 - 발명자는 말하기만 하면 됩니다'),
                                React.createElement('p', { className: 'text-sm text-blue-700' },
                                    '복잡한 양식 작성이나 법률 용어를 몰라도 됩니다. AI와 자연스러운 대화를 나누면 AI가 모든 문서를 자동으로 작성합니다.'
                                )
                            ),

                            React.createElement('div', { className: 'space-y-3' },
                                [
                                    { step: 1, title: '발명 상담', duration: '10~30분', desc: 'AI와 자연어 대화로 발명 내용 설명. AI가 질문을 통해 핵심 기술 파악', ai: '발명의 기술적 특징, 해결 과제, 효과 자동 정리' },
                                    { step: 2, title: '선행기술 조사', duration: '자동 (0.3초)', desc: '5개국 5,200만 건 특허 DB에서 유사 기술 자동 검색', ai: '유사도 분석, 차별점 도출, 회피 설계 제안' },
                                    { step: 3, title: '등록 가능성 분석', duration: '자동', desc: 'AI가 신규성, 진보성, 산업상 이용가능성 평가', ai: '94.7% 정확도 예측, 거절 사유 사전 분석, 보완점 제안' },
                                    { step: 4, title: '명세서/청구항 작성', duration: '자동 (2~5분)', desc: 'AI가 특허 명세서 전문과 최적 청구항 자동 생성', ai: '기술분야, 배경기술, 발명의 내용, 실시예 완성' },
                                    { step: 5, title: '도면 생성', duration: '자동 (1분)', desc: '특허청 규격에 맞는 도면을 Mermaid 코드로 생성', ai: '시스템 구성도, 흐름도, 상세 구성도 + 도면 부호 설명' },
                                    { step: 6, title: '오픈해시 등록', duration: '자동 (0.3초)', desc: '발명 시점을 오픈해시에 기록하여 우선권 증명', ai: '타임스탬프 생성, 무결성 보장, 글로벌 우선권 확보' },
                                    { step: 7, title: '검토 및 수정', duration: '발명자 확인', desc: '생성된 문서를 발명자가 검토, AI와 대화로 수정', ai: '실시간 수정 반영, 법적 요건 자동 검토' },
                                    { step: 8, title: '출원 제출', duration: '자동', desc: '개인정보 금고 연동으로 출원인 정보 자동 입력, 수수료 납부 후 제출', ai: '감면 자동 적용, 전자출원 완료' }
                                ].map((item, idx) =>
                                    React.createElement('div', { key: idx, className: 'flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition' },
                                        React.createElement('div', { className: 'w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0' }, item.step),
                                        React.createElement('div', { className: 'flex-1' },
                                            React.createElement('div', { className: 'flex items-center justify-between mb-1' },
                                                React.createElement('h5', { className: 'font-bold text-gray-800' }, item.title),
                                                React.createElement('span', { className: 'text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded' }, item.duration)
                                            ),
                                            React.createElement('p', { className: 'text-sm text-gray-600 mb-1' }, item.desc),
                                            React.createElement('p', { className: 'text-xs text-green-600' }, '🤖 AI: ' + item.ai)
                                        )
                                    )
                                )
                            )
                        ),

                        // AI 기능 탭
                        activeTab === 'ai-features' && React.createElement('div', { className: 'space-y-6' },
                            React.createElement('div', { className: 'bg-purple-50 border border-purple-200 rounded-xl p-4' },
                                React.createElement('h4', { className: 'font-bold text-purple-800 mb-2' }, '🧠 Claude AI 기반 지능형 출원 시스템'),
                                React.createElement('p', { className: 'text-sm text-purple-700' },
                                    'Anthropic의 Claude AI를 기반으로 자연어 이해, 기술 문서 작성, 법률 검토를 수행합니다. DeepSeek R1, LLaMA, Mistral 등 오픈소스 모델과 함께 특허 전문 AI로 fine-tuning되었습니다.'
                                )
                            ),

                            React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                                // 명세서 작성 AI
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-4' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '📝'),
                                        '명세서 자동 작성'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['발명의 명칭 (국문/영문) 자동 생성', '기술분야 자동 분류 (IPC 코드 부여)', '배경기술 및 선행기술 문헌 정리', '해결하고자 하는 과제 도출', '과제 해결 수단 (기술적 특징) 기술', '발명의 효과 정량적/정성적 분석', '실시예 및 구현 방법 상세 기술', '산업상 이용가능성 검토'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-green-500' }, '✓'),
                                                item
                                            )
                                        )
                                    )
                                ),

                                // 청구항 생성 AI
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-4' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '📊'),
                                        '청구항 자동 생성'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['독립항 (물건/방법/장치) 최적 구성', '종속항 계층 구조 자동 설계', '권리범위 최대화 전략 적용', '선행기술 회피 설계 반영', '청구항 스타일 선택 (넓은/표준/좁은)', '다중 카테고리 청구 (시스템+방법)', '분할출원 가능성 분석', '해외출원 대응 청구항 구조'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-green-500' }, '✓'),
                                                item
                                            )
                                        )
                                    )
                                ),

                                // 도면 생성 AI
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-4' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '🎨'),
                                        '도면 자동 생성'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['Mermaid 코드 기반 도면 생성', '특허청 도면 작성 지침 준수', '시스템 전체 구성도 (블록도)', '데이터/신호 흐름도 (플로우차트)', '모듈별 상세 구성도', '도면의 간단한 설명 자동 작성', '도면 부호 목록 자동 생성', 'PNG/SVG 변환 및 출력'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-green-500' }, '✓'),
                                                item
                                            )
                                        )
                                    )
                                ),

                                // 선행기술 조사 AI
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-4' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '🔍'),
                                        '선행기술 조사 AI'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['5개국 DB 동시 검색 (KR/US/EP/CN/JP)', '52,847,293건 특허 데이터베이스', '의미론적 유사도 분석 (Semantic Search)', '키워드 + AI 하이브리드 검색', '유사도 점수 및 위험도 평가', '핵심 선행문헌 자동 선별', '차별점 및 회피 방안 제시', '인용/피인용 관계 분석'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-green-500' }, '✓'),
                                                item
                                            )
                                        )
                                    )
                                )
                            ),

                            // 등록 예측 AI
                            React.createElement('div', { className: 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-5' },
                                React.createElement('h5', { className: 'font-bold text-gray-800 mb-3' }, '📈 등록 가능성 예측 AI (94.7% 정확도)'),
                                React.createElement('div', { className: 'grid grid-cols-5 gap-3' },
                                    [
                                        { label: '신규성', desc: '선행기술 대비 새로운 기술적 특징' },
                                        { label: '진보성', desc: '통상의 기술자가 쉽게 도출 불가' },
                                        { label: '산업상 이용가능성', desc: '실제 산업에서 사용 가능' },
                                        { label: '청구항 명확성', desc: '권리범위가 명확하게 기재' },
                                        { label: '명세서 충실도', desc: '실시 가능할 정도로 상세' }
                                    ].map((item, idx) =>
                                        React.createElement('div', { key: idx, className: 'bg-white rounded-lg p-3 text-center' },
                                            React.createElement('div', { className: 'font-medium text-gray-800 text-sm' }, item.label),
                                            React.createElement('div', { className: 'text-xs text-gray-500 mt-1' }, item.desc)
                                        )
                                    )
                                )
                            )
                        ),

                        // 비용 혁신 탭
                        activeTab === 'cost' && React.createElement('div', { className: 'space-y-6' },
                            React.createElement('div', { className: 'bg-yellow-50 border border-yellow-300 rounded-xl p-5' },
                                React.createElement('h4', { className: 'font-bold text-yellow-800 text-xl mb-2' }, '💰 출원 비용 90% 절감'),
                                React.createElement('p', { className: 'text-yellow-700' },
                                    'AI가 변리사 업무를 대체하여 출원 비용을 기존의 1/10 수준으로 낮춥니다. 개인과 스타트업도 부담 없이 지식재산권을 확보할 수 있습니다.'
                                )
                            ),

                            // 비용 비교 테이블
                            React.createElement('div', { className: 'bg-white border border-gray-200 rounded-xl overflow-hidden' },
                                React.createElement('table', { className: 'w-full text-sm' },
                                    React.createElement('thead', { className: 'bg-gray-100' },
                                        React.createElement('tr', null,
                                            React.createElement('th', { className: 'px-4 py-3 text-left' }, '구분'),
                                            React.createElement('th', { className: 'px-4 py-3 text-right text-red-600' }, '기존 방식'),
                                            React.createElement('th', { className: 'px-4 py-3 text-right text-green-600' }, 'AI 전자출원'),
                                            React.createElement('th', { className: 'px-4 py-3 text-right text-blue-600' }, '절감액')
                                        )
                                    ),
                                    React.createElement('tbody', { className: 'divide-y divide-gray-100' },
                                        [
                                            { item: '변리사 상담료', old: '50~100만원', new: '무료 (AI)', save: '50~100만원' },
                                            { item: '명세서 작성료', old: '150~300만원', new: '무료 (AI)', save: '150~300만원' },
                                            { item: '선행기술 조사', old: '30~50만원', new: '무료 (AI)', save: '30~50만원' },
                                            { item: '도면 작성료', old: '20~50만원', new: '무료 (AI)', save: '20~50만원' },
                                            { item: '출원료 (관납료)', old: '46,000원', new: '46,000원', save: '-' },
                                            { item: '심사청구료', old: '143,000원+', new: '143,000원+', save: '-' },
                                            { item: '감면 적용', old: '서류 제출 필요', new: '자동 적용 (70%)', save: '서류 비용' }
                                        ].map((row, idx) =>
                                            React.createElement('tr', { key: idx, className: 'hover:bg-gray-50' },
                                                React.createElement('td', { className: 'px-4 py-3 font-medium' }, row.item),
                                                React.createElement('td', { className: 'px-4 py-3 text-right text-red-600' }, row.old),
                                                React.createElement('td', { className: 'px-4 py-3 text-right text-green-600 font-medium' }, row.new),
                                                React.createElement('td', { className: 'px-4 py-3 text-right text-blue-600' }, row.save)
                                            )
                                        )
                                    ),
                                    React.createElement('tfoot', { className: 'bg-gray-50 font-bold' },
                                        React.createElement('tr', null,
                                            React.createElement('td', { className: 'px-4 py-3' }, '총 비용 (예상)'),
                                            React.createElement('td', { className: 'px-4 py-3 text-right text-red-600' }, '250~500만원'),
                                            React.createElement('td', { className: 'px-4 py-3 text-right text-green-600' }, '20~60만원'),
                                            React.createElement('td', { className: 'px-4 py-3 text-right text-blue-600' }, '약 90% 절감')
                                        )
                                    )
                                )
                            ),

                            // 감면 자동 적용
                            React.createElement('div', { className: 'bg-green-50 border border-green-200 rounded-xl p-5' },
                                React.createElement('h5', { className: 'font-bold text-green-800 mb-3' }, '🎫 개인정보 금고 연동 - 수수료 감면 자동 적용'),
                                React.createElement('p', { className: 'text-sm text-green-700 mb-3' },
                                    '개인정보 금고에서 출원인 신원이 자동 검증되어 별도 증빙서류 없이 감면이 적용됩니다.'
                                ),
                                React.createElement('div', { className: 'grid grid-cols-4 gap-3' },
                                    [
                                        { type: '개인', rate: '70%', note: '주민등록 확인' },
                                        { type: '중소기업', rate: '70%', note: '사업자등록 확인' },
                                        { type: '대학/연구소', rate: '85%', note: '기관 확인' },
                                        { type: '공공기관', rate: '100%', note: '면제' }
                                    ].map((item, idx) =>
                                        React.createElement('div', { key: idx, className: 'bg-white rounded-lg p-3 text-center' },
                                            React.createElement('div', { className: 'font-medium text-gray-800' }, item.type),
                                            React.createElement('div', { className: 'text-2xl font-bold text-green-600' }, item.rate),
                                            React.createElement('div', { className: 'text-xs text-gray-500' }, item.note)
                                        )
                                    )
                                )
                            )
                        ),

                        // 사업화 지원 탭
                        activeTab === 'business' && React.createElement('div', { className: 'space-y-6' },
                            React.createElement('div', { className: 'bg-purple-50 border border-purple-200 rounded-xl p-5' },
                                React.createElement('h4', { className: 'font-bold text-purple-800 text-lg mb-2' }, '🚀 출원을 넘어 사업화까지'),
                                React.createElement('p', { className: 'text-purple-700' },
                                    'AI 전자출원 시스템은 단순 출원 대행을 넘어, 특허의 시장 가치 산정, 기술보증기금 연계, 투자 유치 매칭, 컨소시엄 구성까지 사업화 전 과정을 지원합니다.'
                                )
                            ),

                            React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                                // 시장 가치 산정
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-5' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '💎'),
                                        '특허 가치 산정'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['국내/글로벌 시장 규모 분석', '기술 수명 및 성장률 예측', '라이선스 수익 예상 산출', '경쟁 기술 대비 우위 분석', 'M&A/투자 시 기업가치 반영'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-purple-500' }, '•'),
                                                item
                                            )
                                        )
                                    )
                                ),

                                // 기보 연계
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-5' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '🏦'),
                                        '기술보증기금 연계'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['기술신용보증 자격 자동 평가', 'IP담보보증 신청 연계', 'R&D 보증 프로그램 안내', '벤처기업 특별보증 연결', '예상 보증한도 사전 분석'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-purple-500' }, '•'),
                                                item
                                            )
                                        )
                                    )
                                ),

                                // 투자 유치
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-5' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '💰'),
                                        '투자 유치 매칭'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['VC/CVC 투자자 매칭', 'TIPS, 정부 R&D 과제 연계', '적정 기업가치(밸류) 산정', '투자 제안서 자동 생성', 'IR 자료 작성 지원'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-purple-500' }, '•'),
                                                item
                                            )
                                        )
                                    )
                                ),

                                // 컨소시엄 구성
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-5' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3 flex items-center gap-2' },
                                        React.createElement('span', { className: 'text-xl' }, '🤝'),
                                        '컨소시엄/파트너십'
                                    ),
                                    React.createElement('ul', { className: 'space-y-2 text-sm text-gray-600' },
                                        ['대기업 오픈이노베이션 연결', '공공기관/연구소 협력 매칭', '글로벌 파트너십 탐색', '기술 라이선스 중개', '공동 R&D 프로젝트 구성'].map((item, idx) =>
                                            React.createElement('li', { key: idx, className: 'flex items-start gap-2' },
                                                React.createElement('span', { className: 'text-purple-500' }, '•'),
                                                item
                                            )
                                        )
                                    )
                                )
                            )
                        ),

                        // 오픈해시 탭
                        activeTab === 'openhash' && React.createElement('div', { className: 'space-y-6' },
                            React.createElement('div', { className: 'bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-xl p-6 text-white' },
                                React.createElement('div', { className: 'flex items-center gap-4 mb-4' },
                                    React.createElement('span', { className: 'text-5xl' }, '⛓️'),
                                    React.createElement('div', null,
                                        React.createElement('h4', { className: 'text-2xl font-bold text-yellow-400' }, '오픈해시 기술'),
                                        React.createElement('p', { className: 'text-gray-300' }, '블록체인 대비 98.5% 에너지 절감, 1000배 빠른 처리 속도')
                                    )
                                ),
                                React.createElement('div', { className: 'grid grid-cols-4 gap-4 mt-4' },
                                    [
                                        { value: '98.5%', label: '에너지 절감' },
                                        { value: '1000x', label: '처리 속도' },
                                        { value: '0.3초', label: '합의 시간' },
                                        { value: '∞', label: '영구 보존' }
                                    ].map((stat, idx) =>
                                        React.createElement('div', { key: idx, className: 'bg-white/10 rounded-lg p-3 text-center' },
                                            React.createElement('div', { className: 'text-2xl font-bold text-yellow-400' }, stat.value),
                                            React.createElement('div', { className: 'text-xs text-gray-300' }, stat.label)
                                        )
                                    )
                                )
                            ),

                            React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-5' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3' }, '🎯 선출원주의 대응'),
                                    React.createElement('p', { className: 'text-sm text-gray-600' },
                                        '특허법은 먼저 출원한 자에게 권리를 부여합니다. 오픈해시는 출원 전에 발명 시점을 기술적으로 증명하여, 분쟁 시 유력한 증거가 되고 해외 출원 시 우선권 주장의 근거가 됩니다.'
                                    )
                                ),
                                React.createElement('div', { className: 'border border-gray-200 rounded-xl p-5' },
                                    React.createElement('h5', { className: 'font-bold text-gray-800 mb-3' }, '🌐 글로벌 우선권 확보'),
                                    React.createElement('p', { className: 'text-sm text-gray-600' },
                                        '오픈해시 타임스탬프는 국제적으로 검증 가능하여 파리조약 우선권 기간(12개월) 내 해외 출원 시 우선권 주장의 기술적 증거로 활용됩니다.'
                                    )
                                )
                            ),

                            React.createElement('a', {
                                href: 'http://100.30.14.224/openhash.html',
                                target: '_blank',
                                className: 'block text-center bg-gray-900 hover:bg-gray-800 text-yellow-400 py-3 rounded-xl font-bold transition'
                            }, '오픈해시 기술 상세 문서 보기 →')
                        )
                    )
                )
            ),

            // ========================================
            // 개인정보 금고 모달
            // ========================================
            activeModal === 'data-vault' && React.createElement('div', { className: 'fixed inset-0 z-[9999] flex items-center justify-center p-4' },
                React.createElement('div', { className: 'absolute inset-0 bg-black/60', onClick: closeModal }),
                React.createElement('div', { className: 'relative bg-white rounded-2xl shadow-2xl w-[900px] max-h-[85vh] overflow-hidden flex flex-col' },
                    // 헤더
                    React.createElement('div', { className: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5' },
                        React.createElement('div', { className: 'flex items-center justify-between' },
                            React.createElement('div', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-4xl' }, '🔐'),
                                React.createElement('div', null,
                                    React.createElement('h2', { className: 'text-xl font-bold' }, '개인 정보 금고'),
                                    React.createElement('p', { className: 'text-emerald-200 text-sm' }, 'AI 전자정부(K-Governance) 개인 데이터 주권 시스템')
                                )
                            ),
                            React.createElement('button', {
                                onClick: closeModal,
                                className: 'w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center'
                            }, React.createElement('i', { className: 'fas fa-times' }))
                        )
                    ),

                    // 탭
                    React.createElement('div', { className: 'flex border-b border-gray-200 bg-gray-50 px-4' },
                        vaultTabs.map(tab =>
                            React.createElement('button', {
                                key: tab.id,
                                onClick: () => setActiveTab(tab.id),
                                className: `px-4 py-3 text-sm font-medium transition border-b-2 ${
                                    activeTab === tab.id
                                        ? 'text-emerald-600 border-emerald-600 bg-white'
                                        : 'text-gray-500 border-transparent hover:text-gray-700'
                                }`
                            }, React.createElement('span', { className: 'mr-1' }, tab.icon), tab.label)
                        )
                    ),

                    // 콘텐츠
                    React.createElement('div', { className: 'flex-1 overflow-y-auto p-5' },
                        activeTab === 'overview' && React.createElement('div', { className: 'space-y-5' },
                            React.createElement('div', { className: 'bg-emerald-50 border border-emerald-200 rounded-xl p-5' },
                                React.createElement('h4', { className: 'font-bold text-emerald-800 text-lg mb-2' }, '👤 내 정보는 내가 완전히 통제합니다'),
                                React.createElement('p', { className: 'text-emerald-700' },
                                    '개인 정보 금고는 시민이 자신의 모든 정보를 안전하게 저장하고 완전히 통제할 수 있는 개인 주권적(Self-Sovereign) 데이터 관리 시스템입니다. 시스템 운영자도 개인 데이터 내용을 알 수 없습니다.'
                                )
                            ),
                            React.createElement('div', { className: 'grid grid-cols-4 gap-3' },
                                [
                                    { icon: '👤', title: '개인 데이터 주권', desc: '오직 본인만 접근 가능' },
                                    { icon: '🔒', title: '완전 비공개', desc: '운영자도 내용 열람 불가' },
                                    { icon: '📋', title: '완전 투명성', desc: '모든 접근 기록 추적 가능' },
                                    { icon: '🔗', title: 'AI 서비스 연동', desc: '전자정부 서비스 연동' }
                                ].map((item, idx) =>
                                    React.createElement('div', { key: idx, className: 'p-4 bg-white border border-gray-200 rounded-xl text-center' },
                                        React.createElement('div', { className: 'text-2xl mb-2' }, item.icon),
                                        React.createElement('div', { className: 'font-medium text-gray-800 text-sm' }, item.title),
                                        React.createElement('div', { className: 'text-xs text-gray-500' }, item.desc)
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'bg-gray-900 text-white rounded-xl p-5' },
                                React.createElement('h5', { className: 'font-bold text-emerald-400 mb-3' }, '3층 데이터베이스 구조'),
                                React.createElement('div', { className: 'grid grid-cols-3 gap-3' },
                                    [
                                        { layer: '1층', name: '개인정보 저장소', tech: 'PostgreSQL 암호화 DB' },
                                        { layer: '2층', name: '대용량 파일 저장', tech: 'IPFS 분산 저장' },
                                        { layer: '3층', name: '무결성 보장 체인', tech: '오픈해시 기반' }
                                    ].map((item, idx) =>
                                        React.createElement('div', { key: idx, className: 'bg-white/10 rounded-lg p-3 text-center' },
                                            React.createElement('div', { className: 'text-emerald-400 font-bold' }, item.layer),
                                            React.createElement('div', { className: 'text-sm' }, item.name),
                                            React.createElement('div', { className: 'text-xs text-gray-400' }, item.tech)
                                        )
                                    )
                                )
                            )
                        ),

                        activeTab === 'security' && React.createElement('div', { className: 'space-y-5' },
                            React.createElement('h4', { className: 'font-bold text-gray-800' }, '🔐 3단계 암호화 보안'),
                            React.createElement('div', { className: 'space-y-3' },
                                [
                                    { step: 1, title: '랜덤 암호화 열쇠 생성', tech: 'AES-256', desc: '무작위 256비트 암호키 생성' },
                                    { step: 2, title: '개인정보 1차 암호화', tech: 'AES-256-GCM', desc: '데이터를 완전히 암호화' },
                                    { step: 3, title: '암호키 2차 암호화', tech: 'RSA-4096', desc: '암호키 자체를 다시 암호화' }
                                ].map((item, idx) =>
                                    React.createElement('div', { key: idx, className: 'flex items-center gap-4 p-4 bg-gray-50 rounded-lg' },
                                        React.createElement('div', { className: 'w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold' }, item.step),
                                        React.createElement('div', { className: 'flex-1' },
                                            React.createElement('div', { className: 'font-medium' }, item.title),
                                            React.createElement('div', { className: 'text-sm text-gray-500' }, item.desc)
                                        ),
                                        React.createElement('span', { className: 'px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-mono' }, item.tech)
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                                React.createElement('div', { className: 'bg-blue-50 border border-blue-200 rounded-lg p-4' },
                                    React.createElement('h5', { className: 'font-bold text-blue-800 mb-2' }, '🔮 동형암호 기술'),
                                    React.createElement('p', { className: 'text-sm text-blue-700' }, '개인정보를 해독하지 않고도 AI가 분석 가능. 예: 주민번호를 보지 않고 "19세 이상인가?" 확인')
                                ),
                                React.createElement('div', { className: 'bg-purple-50 border border-purple-200 rounded-lg p-4' },
                                    React.createElement('h5', { className: 'font-bold text-purple-800 mb-2' }, '🎭 영지식 증명'),
                                    React.createElement('p', { className: 'text-sm text-purple-700' }, '비밀을 공개하지 않고 조건만 증명. 주민번호는 비밀로 하되 성인임만 수학적으로 증명')
                                )
                            )
                        ),

                        activeTab === 'auth' && React.createElement('div', { className: 'space-y-5' },
                            React.createElement('h4', { className: 'font-bold text-gray-800' }, '👤 본인 확인 3단계 인증'),
                            React.createElement('div', { className: 'space-y-3' },
                                [
                                    { step: 1, title: '생체정보 + PIN', items: ['얼굴 인식 (99.7%)', '지문 인식 (99.8%)', '음성 인식 (99.5%)', '개인 비밀번호'] },
                                    { step: 2, title: '개인화 질문 + 동적 OTP', items: ['AI 생성 맞춤 질문', '실제 활동 기반 질문', '30초마다 변경되는 인증번호'] },
                                    { step: 3, title: '오픈해시 분산 검증', items: ['여러 검증 서버 동시 확인', '과반수 승인 필요', '모든 과정 체인 기록'] }
                                ].map((item, idx) =>
                                    React.createElement('div', { key: idx, className: 'p-4 border border-gray-200 rounded-lg' },
                                        React.createElement('div', { className: 'flex items-center gap-3 mb-2' },
                                            React.createElement('span', { className: 'w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm' }, item.step),
                                            React.createElement('h5', { className: 'font-bold text-gray-800' }, item.title)
                                        ),
                                        React.createElement('div', { className: 'flex flex-wrap gap-2 pl-11' },
                                            item.items.map((i, iIdx) =>
                                                React.createElement('span', { key: iIdx, className: 'px-2 py-1 bg-gray-100 rounded text-xs' }, i)
                                            )
                                        )
                                    )
                                )
                            )
                        ),

                        activeTab === 'integration' && React.createElement('div', { className: 'space-y-5' },
                            React.createElement('h4', { className: 'font-bold text-gray-800' }, '🔗 AI 전자출원 연동 장점'),
                            React.createElement('div', { className: 'bg-emerald-50 border border-emerald-200 rounded-xl p-5' },
                                React.createElement('p', { className: 'text-emerald-700' },
                                    '개인정보 금고와 AI 전자출원 시스템이 연동되면, 출원인 정보가 자동으로 입력되고 신원이 검증되어 수수료 감면이 자동 적용됩니다.'
                                )
                            ),
                            React.createElement('div', { className: 'grid grid-cols-3 gap-3' },
                                [
                                    { icon: '✅', title: '정보 자동 입력', desc: '출원인 정보를 안전하게 불러와 자동 입력' },
                                    { icon: '🎫', title: '증빙 불필요', desc: '신원 자동 검증으로 증빙서류 제출 불필요' },
                                    { icon: '💰', title: '감면 자동 적용', desc: '개인 70%, 중소기업 70%, 대학 85%' },
                                    { icon: '🔒', title: '보안 마스킹', desc: '주민번호 등 민감정보 자동 마스킹' },
                                    { icon: '⚡', title: '90% 시간 단축', desc: '정보 입력 시간 대폭 절감' },
                                    { icon: '📋', title: '투명한 기록', desc: '누가 언제 접근했는지 확인 가능' }
                                ].map((item, idx) =>
                                    React.createElement('div', { key: idx, className: 'p-3 bg-white border border-gray-200 rounded-lg' },
                                        React.createElement('div', { className: 'flex items-center gap-2 mb-1' },
                                            React.createElement('span', null, item.icon),
                                            React.createElement('span', { className: 'font-medium text-gray-800 text-sm' }, item.title)
                                        ),
                                        React.createElement('p', { className: 'text-xs text-gray-500' }, item.desc)
                                    )
                                )
                            ),
                            React.createElement('a', {
                                href: 'http://100.30.14.224/private-data-vault/',
                                target: '_blank',
                                className: 'block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition'
                            }, React.createElement('i', { className: 'fas fa-external-link-alt mr-2' }), '개인 정보 금고 상세 안내 페이지 →')
                        )
                    )
                )
            )
        )
    );
};
