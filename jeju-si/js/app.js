const { useState, useEffect } = React;

const AGENTS_LIST = [
    { id: "city_civil_agent", name: "시민민원", icon: "📋" },
    { id: "certificate_agent", name: "증명발급", icon: "📄" },
    { id: "welfare_agent", name: "복지지원", icon: "🤝" },
    { id: "tax_agent", name: "세무행정", icon: "💰" },
    { id: "citrus_fishery_agent", name: "감귤수산", icon: "🍊" },
    { id: "tourism_culture_agent", name: "관광문화", icon: "🎭" },
    { id: "call_center_agent", name: "콜센터", icon: "☎️" },
    { id: "pdv_agent", name: "PDV관리", icon: "🔐" },
    { id: "openhash_agent", name: "오픈해시", icon: "⛓️" }
];

const SIMULATION_SCENARIOS = {
    "city_civil_agent": {
        name: "📋 시민민원 처리",
        steps: [
            { title: "민원 접수", duration: 2000, data: { total: 847, urgent: 23, normal: 824 } },
            { title: "AI 분류", duration: 2500, data: { auto: 698, manual: 149, categories: 12 } },
            { title: "담당 부서 배정", duration: 2000, data: { assigned: 847, avg_time: "4분" } },
            { title: "자동 처리", duration: 3000, data: { completed: 698, pending: 149, rate: "82%" } },
            { title: "알림 발송", duration: 1500, data: { sms: 847, app_push: 847, satisfaction: "92%" } }
        ],
        color: "blue"
    },
    "certificate_agent": {
        name: "📄 증명발급",
        steps: [
            { title: "발급 신청", duration: 1500, data: { requests: 1247, types: "주민등록등본, 가족관계증명, 건축물대장" } },
            { title: "본인인증", duration: 2000, data: { verified: 1247, method: "생체인증", time: "0.8초" } },
            { title: "AI 자동 생성", duration: 2500, data: { generated: 1247, format: "PDF", watermark: "적용" } },
            { title: "전자서명", duration: 1500, data: { signed: 1247, algorithm: "ECDSA" } },
            { title: "발급 완료", duration: 1000, data: { issued: 1247, download: "즉시", validity: "3개월" } }
        ],
        color: "green"
    },
    "welfare_agent": {
        name: "🤝 복지지원",
        steps: [
            { title: "복지 신청", duration: 2000, data: { applications: 456, categories: "아동,노인,장애,저소득" } },
            { title: "자격 AI 심사", duration: 3000, data: { eligible: 389, ineligible: 67, auto_rate: "95%" } },
            { title: "지원금 산정", duration: 2500, data: { total_amount: "12억원", avg: "308만원", max: "850만원" } },
            { title: "계좌 이체", duration: 2000, data: { transferred: 389, method: "실시간 이체" } },
            { title: "사후 관리", duration: 1500, data: { monitoring: 389, next_review: "3개월 후" } }
        ],
        color: "purple"
    },
    "tax_agent": {
        name: "💰 세무행정",
        steps: [
            { title: "세금 신고 접수", duration: 2000, data: { filings: 3421, types: "주민세,재산세,자동차세" } },
            { title: "AI 자동 계산", duration: 2500, data: { calculated: 3421, accuracy: "99.8%", time: "0.3초/건" } },
            { title: "감면 대상 검토", duration: 2000, data: { eligible: 287, reduction: "평균 42%" } },
            { title: "고지서 발송", duration: 1500, data: { issued: 3421, methods: "앱,이메일,우편" } },
            { title: "납부 확인", duration: 2000, data: { paid: 2847, unpaid: 574, collection_rate: "83%" } }
        ],
        color: "amber"
    },
    "citrus_fishery_agent": {
        name: "🍊 감귤수산",
        steps: [
            { title: "생산 데이터 수집", duration: 2000, data: { farms: 4567, production: "23만톤", fishing: "8천톤" } },
            { title: "시장 분석", duration: 2500, data: { price_trend: "+8%", demand: "높음", export: "+15%" } },
            { title: "유통 최적화", duration: 2000, data: { routes: 12, cost_saving: "18%", time_cut: "35%" } },
            { title: "보조금 지급", duration: 1500, data: { amount: "45억원", farmers: 4567, avg: "98만원" } },
            { title: "품질 인증", duration: 1500, data: { certified: 3821, grade_A: "67%", organic: "23%" } }
        ],
        color: "orange"
    },
    "tourism_culture_agent": {
        name: "🎭 관광문화",
        steps: [
            { title: "관광지 데이터 수집", duration: 2000, data: { sites: 156, visitors_today: "8.4만명" } },
            { title: "혼잡도 AI 예측", duration: 2500, data: { crowded: 23, moderate: 89, available: 44 } },
            { title: "추천 경로 생성", duration: 2000, data: { routes: 1247, personalized: "100%", avg_time: "4시간" } },
            { title: "다국어 안내", duration: 1500, data: { languages: 12, guides: "AI 음성", qr_codes: 156 } },
            { title: "만족도 조사", duration: 1500, data: { responses: 2341, rating: "4.7/5", return_intent: "89%" } }
        ],
        color: "pink"
    },
    "call_center_agent": {
        name: "☎️ AI 콜센터",
        steps: [
            { title: "전화 수신", duration: 1500, data: { calls: 3247, peak_hour: "10-11시", avg_wait: "12초" } },
            { title: "AI 음성인식", duration: 2000, data: { recognized: 3247, accuracy: "97%", languages: "한,영,중" } },
            { title: "의도 분석", duration: 2000, data: { intents: "민원,증명,복지,세금", routing: "자동" } },
            { title: "자동 응답", duration: 2500, data: { resolved: 2598, transfer: 649, resolution_rate: "80%" } },
            { title: "만족도 평가", duration: 1000, data: { ratings: 3247, score: "4.5/5", feedback: "빠르고 정확" } }
        ],
        color: "cyan"
    },
    "pdv_agent": {
        name: "🔐 PDV 암호화",
        steps: [
            { title: "개인정보 수집", duration: 1500, data: { citizens: "50만", records: "247만건" } },
            { title: "AES-256 암호화", duration: 2500, data: { encrypted: "247만건", time: "3.8ms/건" } },
            { title: "SHA-256 해싱", duration: 2000, data: { hashes: "247만개", collisions: 0 } },
            { title: "분산 저장", duration: 2000, data: { local: "100%", openhash: "100%", breaches: 0 } }
        ],
        color: "red"
    },
    "openhash_agent": {
        name: "⛓️ 오픈해시",
        steps: [
            { title: "거래 수신", duration: 2000, data: { transactions: 6847, size: "1.9MB" } },
            { title: "SHA-256 재해싱", duration: 1500, data: { hashed: 6847, time: "0.2ms/건" } },
            { title: "확률적 계층 선택", duration: 2000, data: { layer2: 1712, layer3: 428, selected: "25%" } },
            { title: "블록 기록", duration: 1500, data: { recorded: 2140, tps: "무제한", energy: "-98.5%" } }
        ],
        color: "cyan"
    }
};

function SimulationPage({ agentId, onClose }) {
    const scenario = SIMULATION_SCENARIOS[agentId];
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [stepData, setStepData] = useState({});

    useEffect(() => {
        if (currentStep >= scenario.steps.length) {
            setCompleted(true);
            return;
        }

        const step = scenario.steps[currentStep];
        setProgress(0);
        setStepData({});

        const progressInterval = setInterval(() => {
            setProgress(prev => prev >= 100 ? 100 : prev + 2);
        }, step.duration / 50);

        setTimeout(() => setStepData(step.data), step.duration * 0.3);
        const stepTimeout = setTimeout(() => setCurrentStep(prev => prev + 1), step.duration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(stepTimeout);
        };
    }, [currentStep]);

    const colors = {
        blue: "from-blue-500 to-cyan-500",
        green: "from-green-500 to-emerald-500",
        purple: "from-purple-500 to-pink-500",
        amber: "from-amber-500 to-orange-500",
        orange: "from-orange-500 to-red-500",
        pink: "from-pink-500 to-rose-500",
        cyan: "from-cyan-500 to-blue-500",
        red: "from-red-500 to-pink-500"
    };

    return React.createElement('div', { className: 'fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-y-auto' },
        React.createElement('div', { className: 'sticky top-0 bg-slate-900/95 backdrop-blur border-b border-cyan-500/30 z-10' },
            React.createElement('div', { className: 'container mx-auto px-8 py-6 flex justify-between' },
                React.createElement('div', { className: 'flex gap-4' },
                    React.createElement('div', { className: `w-16 h-16 rounded-xl bg-gradient-to-br ${colors[scenario.color]} flex items-center justify-center text-3xl shadow-lg` }, scenario.name.split(' ')[0]),
                    React.createElement('div', {},
                        React.createElement('h1', { className: 'text-3xl font-bold text-white' }, scenario.name),
                        React.createElement('p', { className: 'text-gray-400' }, `${currentStep + 1}/${scenario.steps.length}`)
                    )
                ),
                React.createElement('button', { onClick: onClose, className: 'px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold' }, '✕')
            )
        ),

        React.createElement('div', { className: 'container mx-auto px-8 py-8' },
            React.createElement('div', { className: 'bg-slate-800 rounded-2xl p-8 mb-8 border border-cyan-500/30' },
                React.createElement('div', { className: 'flex justify-between mb-4' },
                    React.createElement('h2', { className: 'text-2xl font-bold text-cyan-400' }, '전체 진행률'),
                    React.createElement('span', { className: 'text-3xl font-bold text-white' }, `${Math.round((currentStep / scenario.steps.length) * 100)}%`)
                ),
                React.createElement('div', { className: 'grid grid-cols-5 gap-4' },
                    scenario.steps.map((step, idx) =>
                        React.createElement('div', {
                            key: idx,
                            className: `text-center p-4 rounded-xl ${idx < currentStep ? `bg-gradient-to-r ${colors[scenario.color]} text-white` : idx === currentStep ? 'bg-cyan-500/20 border-2 border-cyan-500 text-cyan-400' : 'bg-slate-900 text-gray-500'}`
                        },
                            React.createElement('div', { className: 'text-2xl mb-2' }, idx < currentStep ? '✓' : idx === currentStep ? '⚙️' : '○'),
                            React.createElement('div', { className: 'text-sm font-semibold' }, step.title)
                        )
                    )
                )
            ),

            !completed && currentStep < scenario.steps.length && React.createElement('div', { className: 'bg-slate-800 rounded-2xl p-8 border border-cyan-500/30' },
                React.createElement('div', { className: 'mb-8' },
                    React.createElement('h2', { className: 'text-4xl font-bold text-white mb-4' }, scenario.steps[currentStep].title),
                    React.createElement('div', { className: 'relative h-6 bg-slate-900 rounded-full overflow-hidden' },
                        React.createElement('div', { className: `absolute h-full bg-gradient-to-r ${colors[scenario.color]} transition-all`, style: { width: `${progress}%` } }),
                        React.createElement('div', { className: 'absolute inset-0 flex items-center justify-center text-white font-bold text-sm' }, `${Math.round(progress)}%`)
                    )
                ),

                Object.keys(stepData).length > 0 && React.createElement('div', { className: 'grid md:grid-cols-3 gap-6' },
                    Object.entries(stepData).map(([key, value], idx) =>
                        React.createElement('div', { key: idx, className: 'bg-slate-900 rounded-xl p-6 border border-cyan-500/20 hover:scale-105 transition-all' },
                            React.createElement('div', { className: 'text-gray-400 text-sm mb-2' }, key.toUpperCase()),
                            React.createElement('div', { className: 'text-2xl font-bold text-white' }, typeof value === 'object' ? JSON.stringify(value) : value)
                        )
                    )
                ),

                React.createElement('div', { className: 'mt-8 text-center' },
                    React.createElement('div', { className: 'inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/20 rounded-full border border-cyan-500/50' },
                        React.createElement('div', { className: 'w-3 h-3 bg-cyan-400 rounded-full animate-pulse' }),
                        React.createElement('span', { className: 'text-cyan-400 font-semibold' }, 'AI 처리 중...')
                    )
                )
            ),

            completed && React.createElement('div', { className: 'bg-slate-800 rounded-2xl p-12 text-center border border-green-500/30' },
                React.createElement('div', { className: 'text-8xl mb-6' }, '✅'),
                React.createElement('h2', { className: 'text-5xl font-bold text-green-400 mb-4' }, '완료!'),
                React.createElement('p', { className: 'text-2xl text-gray-300 mb-8' }, `${scenario.name} 시뮬레이션 성공`),
                React.createElement('div', { className: 'grid md:grid-cols-3 gap-6 mb-8' },
                    React.createElement('div', { className: 'bg-slate-900 rounded-xl p-6' },
                        React.createElement('div', { className: 'text-4xl font-bold text-cyan-400 mb-2' }, scenario.steps.length),
                        React.createElement('div', { className: 'text-gray-400' }, '완료 단계')
                    ),
                    React.createElement('div', { className: 'bg-slate-900 rounded-xl p-6' },
                        React.createElement('div', { className: 'text-4xl font-bold text-green-400 mb-2' }, '100%'),
                        React.createElement('div', { className: 'text-gray-400' }, '성공률')
                    ),
                    React.createElement('div', { className: 'bg-slate-900 rounded-xl p-6' },
                        React.createElement('div', { className: 'text-4xl font-bold text-purple-400 mb-2' }, `${(scenario.steps.reduce((a, s) => a + s.duration, 0) / 1000).toFixed(1)}초`),
                        React.createElement('div', { className: 'text-gray-400' }, '처리 시간')
                    )
                ),
                React.createElement('button', { onClick: onClose, className: `px-12 py-4 bg-gradient-to-r ${colors[scenario.color]} text-white rounded-xl font-bold text-lg hover:shadow-lg` }, '확인')
            )
        )
    );
}

function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedAgent, setSelectedAgent] = useState(null);

    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' },
        selectedAgent && React.createElement(SimulationPage, { agentId: selectedAgent, onClose: () => setSelectedAgent(null) }),
        
        !selectedAgent && React.createElement('div', {},
            React.createElement('a', { href: '/', className: 'fixed top-6 left-6 z-40 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg' }, '🏠 포털'),
            
            React.createElement('div', { className: 'container mx-auto px-4 py-12' },
                React.createElement('header', { className: 'text-center mb-16 pt-8' },
                    React.createElement('div', { className: 'flex items-center justify-center gap-4 mb-6' },
                        React.createElement('div', { className: 'w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg' }, '🏢'),
                        React.createElement('div', { className: 'text-left' },
                            React.createElement('h1', { className: 'text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2' }, '제주시청'),
                            React.createElement('p', { className: 'text-gray-400 text-xl' }, 'AI 실시간 시뮬레이션')
                        )
                    )
                ),

                React.createElement('div', { className: 'mb-12 flex justify-center gap-4' },
                    ['overview', 'agents'].map(tab =>
                        React.createElement('button', {
                            key: tab,
                            onClick: () => setActiveTab(tab),
                            className: `px-8 py-4 rounded-xl font-bold text-lg ${activeTab === tab ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : 'bg-slate-800 text-gray-300'}`
                        }, tab === 'overview' ? '📊 개요' : '🤖 AI 시뮬레이션')
                    )
                ),

                activeTab === 'overview' && React.createElement('div', { className: 'bg-slate-800 rounded-2xl p-8 border border-cyan-500/30' },
                    React.createElement('h2', { className: 'text-3xl font-bold mb-6 text-cyan-400' }, '제주시청 AI 시스템'),
                    React.createElement('p', { className: 'text-gray-300 text-lg mb-8' }, '9개 AI 에이전트가 제주시 행정을 자동화합니다.'),
                    React.createElement('div', { className: 'grid md:grid-cols-4 gap-6' },
                        [['9', 'AI 에이전트', 'purple'], ['50만', '제주시 인구', 'cyan'], ['94.2%', '자동화율', 'green'], ['98.5%', '에너지 절감', 'blue']].map(([val, label, color], idx) =>
                            React.createElement('div', { key: idx, className: `bg-slate-900 rounded-xl p-6 border border-${color}-500/30 text-center` },
                                React.createElement('div', { className: `text-5xl font-bold text-${color}-400 mb-2` }, val),
                                React.createElement('div', { className: 'text-gray-400' }, label)
                            )
                        )
                    )
                ),

                activeTab === 'agents' && React.createElement('div', {},
                    React.createElement('h2', { className: 'text-3xl font-bold mb-4 text-center text-cyan-400' }, '🤖 AI 에이전트 시뮬레이션'),
                    React.createElement('p', { className: 'text-center text-gray-400 mb-8 text-lg' }, '클릭하면 실제 업무 수행 과정을 확인할 수 있습니다'),
                    React.createElement('div', { className: 'grid md:grid-cols-3 gap-6' },
                        AGENTS_LIST.map(agent => {
                            const s = SIMULATION_SCENARIOS[agent.id];
                            const c = { blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/50", green: "from-green-500/20 to-emerald-500/20 border-green-500/50", purple: "from-purple-500/20 to-pink-500/20 border-purple-500/50", amber: "from-amber-500/20 to-orange-500/20 border-amber-500/50", orange: "from-orange-500/20 to-red-500/20 border-orange-500/50", pink: "from-pink-500/20 to-rose-500/20 border-pink-500/50", cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/50", red: "from-red-500/20 to-pink-500/20 border-red-500/50" };
                            
                            return React.createElement('button', {
                                key: agent.id,
                                onClick: () => setSelectedAgent(agent.id),
                                className: `bg-gradient-to-br ${c[s.color]} rounded-2xl p-6 border-2 hover:scale-105 hover:shadow-2xl text-left transition-all`
                            },
                                React.createElement('div', { className: 'text-5xl mb-4' }, agent.icon),
                                React.createElement('div', { className: 'font-bold text-white text-lg mb-2' }, agent.name),
                                React.createElement('div', { className: 'text-sm text-gray-300 mb-4' }, `${s.steps.length}단계`),
                                React.createElement('div', { className: 'text-xs font-semibold text-cyan-400' }, '▶ 시작')
                            );
                        })
                    )
                )
            )
        )
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
