const { useState, useEffect } = React;
const API_BASE_URL = '/api/intellectual-property';

const LOADING_MESSAGES = [
    { icon: '🤔', text: 'AI가 발명 내용을 분석하고 있습니다...' },
    { icon: '📚', text: '특허법 및 심사기준을 참조하고 있습니다...' },
    { icon: '🔍', text: '유사 특허 및 선행기술을 검색 중입니다...' },
    { icon: '⚖️', text: '진보성과 신규성을 평가하고 있습니다...' }
];

function App() {
    const [activeTab, setActiveTab] = useState('overview');
    
    const tabs = [
        { id: 'overview', label: '📊 시스템 개요' },
        { id: 'scenarios', label: '💡 문제 해결' },
        { id: 'consultation', label: '💬 AI 상담' },
        { id: 'layers', label: '🏗️ 5계층 구조' },
        { id: 'verify', label: '🔐 문서 검증' },
        { id: 'patent-filing', label: '🤖 AI 특허 출원' }
    ];
    
    return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
        React.createElement('header', { className: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl' },
            React.createElement('div', { className: 'container mx-auto px-4 py-6' },
                React.createElement('h1', { className: 'text-4xl font-bold' }, '🏛️ 지식재산처 AI 자동화 시스템')
            )
        ),
        
        React.createElement('nav', { className: 'bg-white shadow-md sticky top-0 z-40' },
            React.createElement('div', { className: 'container mx-auto px-4' },
                React.createElement('div', { className: 'flex overflow-x-auto gap-2 py-3' },
                    tabs.map(tab =>
                        React.createElement('button', {
                            key: tab.id,
                            onClick: () => setActiveTab(tab.id),
                            className: `px-6 py-3 rounded-lg font-semibold whitespace-nowrap ${
                                activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`
                        }, tab.label)
                    )
                )
            )
        ),
        
        React.createElement('main', { className: 'container mx-auto px-4 py-8' },
            activeTab === 'overview' && React.createElement(OverviewTab),
            activeTab === 'scenarios' && React.createElement(ScenariosTab),
            activeTab === 'consultation' && React.createElement(ConsultationTab),
            activeTab === 'layers' && React.createElement(LayersTab),
            activeTab === 'verify' && React.createElement(VerifyTab),
            activeTab === 'patent-filing' && React.createElement(PatentFilingTab)
        )
    );
}

function OverviewTab() {
    const [stats, setStats] = useState(null);
    
    useEffect(() => {
        fetch(`${API_BASE_URL}/ecosystem-info`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);
    
    return React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-8 text-white' },
            React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, '🚀 혁신적 특허 심사 자동화'),
            React.createElement('p', { className: 'text-lg' }, '오픈해시 분산 신뢰 시스템과 DeepSeek R1 AI를 결합하여 특허 심사를 획기적으로 개선합니다')
        ),
        stats && React.createElement('div', { className: 'grid md:grid-cols-3 gap-6' },
            React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6 text-center' },
                React.createElement('div', { className: 'text-4xl mb-2' }, '⚡'),
                React.createElement('div', { className: 'text-3xl font-bold text-blue-600 mb-2' }, '14일 → 0.5초'),
                React.createElement('div', { className: 'text-gray-600' }, '선행기술 조사')
            ),
            React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6 text-center' },
                React.createElement('div', { className: 'text-4xl mb-2' }, '💰'),
                React.createElement('div', { className: 'text-3xl font-bold text-green-600 mb-2' }, '1,247억 원'),
                React.createElement('div', { className: 'text-gray-600' }, '연간 절감액')
            ),
            React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6 text-center' },
                React.createElement('div', { className: 'text-4xl mb-2' }, '🌐'),
                React.createElement('div', { className: 'text-3xl font-bold text-purple-600 mb-2' }, 
                    `${stats.total_nodes.toLocaleString()}개`
                ),
                React.createElement('div', { className: 'text-gray-600' }, '오픈해시 노드')
            )
        )
    );
}

function ScenariosTab() {
    const [scenarios, setScenarios] = useState([]);
    
    useEffect(() => {
        fetch(`${API_BASE_URL}/scenarios`)
            .then(res => res.json())
            .then(data => setScenarios(data.scenarios || []))
            .catch(err => console.error(err));
    }, []);
    
    return React.createElement('div', { className: 'space-y-6' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '💡 문제 해결 시나리오'),
        scenarios.map((s, i) =>
            React.createElement('div', { key: i, className: 'bg-white rounded-xl shadow-lg p-6' },
                React.createElement('h3', { className: 'text-xl font-bold mb-4' }, `${s.icon} ${s.title}`),
                React.createElement('div', { className: 'bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3' },
                    React.createElement('p', { className: 'font-semibold text-red-800 mb-2' }, '❌ 기존 문제'),
                    React.createElement('p', { className: 'text-gray-700' }, s.problem)
                ),
                React.createElement('div', { className: 'bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg' },
                    React.createElement('p', { className: 'font-semibold text-green-800 mb-2' }, '✅ AI 해결'),
                    React.createElement('p', { className: 'text-gray-700' }, s.solution)
                )
            )
        )
    );
}

function ConsultationTab() {
    const [agents, setAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState('applicant_consultant');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetch(`${API_BASE_URL}/agents`)
            .then(res => res.json())
            .then(data => setAgents(data.agents))
            .catch(err => console.error(err));
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setLoading(true);
        
        try {
            const res = await fetch(`${API_BASE_URL}/consultation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, agent_type: selectedAgent })
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (err) {
            setResponse('오류: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return React.createElement('div', { className: 'max-w-4xl mx-auto' },
        React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h2', { className: 'text-3xl font-bold mb-6' }, '💬 AI Agent 상담'),
            React.createElement('select', {
                value: selectedAgent,
                onChange: (e) => setSelectedAgent(e.target.value),
                className: 'w-full px-4 py-3 border-2 rounded-lg mb-4'
            }, agents.map(a => React.createElement('option', { key: a.id, value: a.id }, a.name))),
            React.createElement('form', { onSubmit: handleSubmit },
                React.createElement('textarea', {
                    value: message,
                    onChange: (e) => setMessage(e.target.value),
                    placeholder: '질문을 입력하세요...',
                    className: 'w-full px-4 py-3 border-2 rounded-lg h-32 mb-4'
                }),
                React.createElement('button', {
                    type: 'submit',
                    disabled: loading,
                    className: `w-full py-4 rounded-lg font-bold text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`
                }, loading ? '처리 중...' : '상담 요청')
            ),
            response && React.createElement('div', { className: 'mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg' },
                React.createElement('p', { className: 'font-semibold text-blue-800 mb-2' }, '🤖 AI 응답'),
                React.createElement('p', { className: 'whitespace-pre-wrap' }, response)
            )
        )
    );
}

function LayersTab() {
    return React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '🏗️ 5계층 오픈해시 구조'),
        React.createElement('p', {}, '5계층 구조 정보')
    );
}

function VerifyTab() {
    return React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '🔐 문서 검증'),
        React.createElement('p', {}, '문서 검증 기능')
    );
}

function PatentFilingTab() {
    const [showPDV, setShowPDV] = useState(false);
    const [showHash, setShowHash] = useState(false);
    const [showCountry, setShowCountry] = useState(false);
    
    return React.createElement('div', { className: 'max-w-6xl mx-auto' },
        React.createElement('div', { className: 'bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-8 text-white mb-6' },
            React.createElement('h2', { className: 'text-4xl font-bold mb-4' }, '🤖 AI 특허 출원 시스템'),
            React.createElement('p', { className: 'mb-4 text-lg' }, 'AI가 발명 내용을 파악하여 명세서를 자동 작성합니다'),
            React.createElement('div', { className: 'flex gap-3 flex-wrap' },
                React.createElement('button', {
                    onClick: () => setShowPDV(true),
                    className: 'bg-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition'
                }, '✅ PDV 금고 통합'),
                React.createElement('button', {
                    onClick: () => setShowHash(true),
                    className: 'bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition'
                }, '🌐 5계층 오픈해시'),
                React.createElement('button', {
                    onClick: () => setShowCountry(true),
                    className: 'bg-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition'
                }, '🌍 다국가 평가')
            )
        ),
        React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-8' },
            React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, '💬 발명 내용 입력'),
            React.createElement('textarea', {
                placeholder: '발명의 내용을 설명해주세요...',
                className: 'w-full px-4 py-3 border-2 rounded-lg h-32 mb-4'
            }),
            React.createElement('button', {
                className: 'w-full py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700'
            }, '전송')
        ),
        showPDV && React.createElement(PDVModal, { onClose: () => setShowPDV(false) }),
        showHash && React.createElement(OpenHashModal, { onClose: () => setShowHash(false) }),
        showCountry && React.createElement(MultiCountryModal, { onClose: () => setShowCountry(false) })
    );
}

function PDVModal({ onClose }) {
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-green-600 text-white p-6 rounded-t-2xl flex justify-between items-center' },
                React.createElement('h3', { className: 'text-3xl font-bold' }, '✅ PDV 금고 통합'),
                React.createElement('button', {
                    onClick: onClose,
                    className: 'text-white text-3xl font-bold hover:text-gray-200'
                }, '×')
            ),
            React.createElement('div', { className: 'p-8 space-y-6' },
                React.createElement('div', { className: 'bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-3' }, '🔐 프라이빗 데이터 금고란?'),
                    React.createElement('p', { className: 'text-gray-700' },
                        '출원인의 모든 개인정보와 활동 이력을 확장 재무제표 형식으로 본인 단말기에만 저장하고, ',
                        '무결성 검증을 위한 SHA-256 해시값만 오픈해시 네트워크에 기록하여 개인정보 주권을 보장하는 시스템입니다.'
                    )
                ),
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-2xl font-bold mb-4' }, '📋 특허 출원 시 자동화 기능'),
                    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4' },
                        [
                            { icon: '👤', title: '출원인 정보 자동 인출', desc: '이름, 주민번호, 주소를 PDV에서 자동으로 가져와 수동 입력 불필요' },
                            { icon: '📜', title: '과거 출원 이력 조회', desc: '본인의 과거 특허·상표 출원 내역을 자동으로 불러와 중복 출원 방지' },
                            { icon: '🏢', title: '대리인 정보 자동 연계', desc: '거래 이력이 있는 특허법인·변리사 정보를 PDV에서 자동 제안' },
                            { icon: '💳', title: '수수료 결제 정보', desc: '출원료·심사료 자동 계산 및 결제 정보 연동 (교차 검증)' }
                        ].map(item =>
                            React.createElement('div', { key: item.title, className: 'bg-white border-2 rounded-xl p-5' },
                                React.createElement('div', { className: 'text-4xl mb-3' }, item.icon),
                                React.createElement('h5', { className: 'font-bold mb-2' }, item.title),
                                React.createElement('p', { className: 'text-sm text-gray-600' }, item.desc)
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'bg-blue-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-blue-800 mb-3' }, '🔒 해시 전용 저장'),
                    React.createElement('p', { className: 'text-gray-700' }, '✓ 원본 데이터: 출원인 단말기에만 AES-256-GCM 암호화 저장'),
                    React.createElement('p', { className: 'text-gray-700' }, '✓ 클라우드: 32바이트 SHA-256 해시만 기록'),
                    React.createElement('p', { className: 'text-gray-700' }, '✓ 제3자 접근 불가: 지식재산처도 원본 데이터를 볼 수 없음')
                )
            )
        )
    );
}

function OpenHashModal({ onClose }) {
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-indigo-600 text-white p-6 rounded-t-2xl flex justify-between items-center' },
                React.createElement('h3', { className: 'text-3xl font-bold' }, '🌐 5계층 오픈해시'),
                React.createElement('button', {
                    onClick: onClose,
                    className: 'text-white text-3xl font-bold hover:text-gray-200'
                }, '×')
            ),
            React.createElement('div', { className: 'p-8 space-y-6' },
                React.createElement('div', { className: 'bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-indigo-800 mb-3' }, '⚡ 블록체인 대비 98.5% 에너지 절감'),
                    React.createElement('p', { className: 'text-gray-700' },
                        'SHA-256 해시 체인 구조를 사용하되, Proof-of-Work나 Proof-of-Stake 없이 기존 통신 인프라를 활용하여 에너지를 획기적으로 절감합니다.'
                    )
                ),
                React.createElement('div', { className: 'bg-red-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-red-800 mb-3' }, '🛡️ 출원서 위변조 영구 방지'),
                    React.createElement('p', { className: 'text-gray-700 mb-2' }, '1️⃣ 출원 즉시: 명세서·청구항·도면의 SHA-256 해시 생성'),
                    React.createElement('p', { className: 'text-gray-700 mb-2' }, '2️⃣ ECDSA P-256 서명: 지식재산처 개인키로 디지털 서명'),
                    React.createElement('p', { className: 'text-gray-700 mb-2' }, '3️⃣ 5계층 전파: 280,000개 노드에 0.18초 내 등록'),
                    React.createElement('p', { className: 'text-gray-700' }, '4️⃣ 원본 암호화: AES-256-GCM으로 HSM에 보관')
                ),
                React.createElement('div', { className: 'bg-yellow-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-yellow-800 mb-3' }, '⏱️ 원자 시계 기반 선출원주의'),
                    React.createElement('p', { className: 'text-gray-700' },
                        '한국표준과학연구원(KRISS)의 원자 시계와 동기화하여 나노초 단위 정밀도로 출원 시각을 기록하며, ',
                        '선출원주의 원칙에 따른 우선권 판단의 결정적 근거가 됩니다.'
                    )
                )
            )
        )
    );
}

function MultiCountryModal({ onClose }) {
    return React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-purple-600 text-white p-6 rounded-t-2xl flex justify-between items-center' },
                React.createElement('h3', { className: 'text-3xl font-bold' }, '🌍 다국가 특허 평가'),
                React.createElement('button', {
                    onClick: onClose,
                    className: 'text-white text-3xl font-bold hover:text-gray-200'
                }, '×')
            ),
            React.createElement('div', { className: 'p-8 space-y-6' },
                React.createElement('div', { className: 'bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg' },
                    React.createElement('h4', { className: 'text-xl font-bold text-purple-800 mb-3' }, '🎯 AI 기반 5개국 특허 취득 가능성 분석'),
                    React.createElement('p', { className: 'text-gray-700' },
                        'DeepSeek R1 모델이 한국, 중국, 일본, 미국, 유럽 5개국의 특허법과 심사기준을 학습하여 각국에서의 특허 등록 가능성을 정량적으로 평가합니다.'
                    )
                ),
                React.createElement('div', {},
                    React.createElement('h4', { className: 'text-2xl font-bold mb-4' }, '⚖️ 국가별 특허법'),
                    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4' },
                        [
                            { flag: '🇰🇷', country: '한국', law: '특허법 제29조 (신규성·진보성)', detail: 'PCT 4위, 평균 11개월' },
                            { flag: '🇨🇳', country: '중국', law: '专利法 第22条', detail: '세계 최다 출원국' },
                            { flag: '🇯🇵', country: '일본', law: '特許法 第29条', detail: '높은 심사 품질' },
                            { flag: '🇺🇸', country: '미국', law: '35 USC §101-103', detail: 'Alice 판결 엄격' },
                            { flag: '🇪🇺', country: '유럽', law: 'EPC Article 52-56', detail: '38개국 단일 절차' }
                        ].map(item =>
                            React.createElement('div', { key: item.country, className: 'bg-white border-2 rounded-lg p-4' },
                                React.createElement('h5', { className: 'text-xl font-bold mb-2' }, `${item.flag} ${item.country}`),
                                React.createElement('p', { className: 'text-sm text-gray-700 mb-1' }, item.law),
                                React.createElement('p', { className: 'text-xs text-gray-500' }, item.detail)
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'bg-green-50 rounded-xl p-6' },
                    React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-3' }, '🤖 AI 평가 방법론'),
                    React.createElement('p', { className: 'text-gray-700 mb-2' }, '• 학습 데이터: 195,000건 심판 결정례 학습'),
                    React.createElement('p', { className: 'text-gray-700 mb-2' }, '• 법령 매칭: 청구항을 각국 특허법과 매칭'),
                    React.createElement('p', { className: 'text-gray-700 mb-2' }, '• 거절 사유 예측: 각국 심사기준 적용'),
                    React.createElement('p', { className: 'text-gray-700' }, '• 등록 확률 산출: 과거 사례 + AI 판단 종합')
                )
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
