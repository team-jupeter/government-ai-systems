const { useState, useEffect } = React;

const AGENTS_LIST = [
    { id: "special_autonomy_agent", name: "특별자치 입법", icon: "🏛️" },
    { id: "tourism_marketing_agent", name: "관광 마케팅", icon: "🌏" },
    { id: "future_industry_agent", name: "미래산업 지원", icon: "🚀" },
    { id: "jobs_economy_agent", name: "일자리 매칭", icon: "💼" },
    { id: "health_welfare_agent", name: "보건복지 지원", icon: "🏥" },
    { id: "environment_agent", name: "환경 모니터링", icon: "🌿" },
    { id: "agriculture_agent", name: "스마트 농업", icon: "🐄" },
    { id: "marine_fishery_agent", name: "어장 예측", icon: "🐟" },
    { id: "infrastructure_agent", name: "인프라 관리", icon: "🏗️" },
    { id: "pdv_agent", name: "PDV 암호화", icon: "🔐" },
    { id: "openhash_agent", name: "오픈해시 기록", icon: "⛓️" }
];

const SIMULATION_SCENARIOS = {
    "special_autonomy_agent": {
        name: "🏛️ 특별자치 입법",
        steps: [
            { title: "조례안 접수", duration: 2000, data: { received: 3, pending: 12 } },
            { title: "법령 충돌 분석", duration: 3000, data: { conflicts: 1, compatible: 2 } },
            { title: "AI 수정안 생성", duration: 2500, data: { modified: 1, approved: 2 } },
            { title: "의회 제출", duration: 2000, data: { submitted: 3 } }
        ],
        color: "purple"
    },
    "tourism_marketing_agent": {
        name: "🌏 관광 마케팅",
        steps: [
            { title: "시장 분석", duration: 2500, data: { markets: "중국,일본,미국", trend: "+15%" } },
            { title: "타겟 선정", duration: 2000, data: { target: "중국MZ", reach: "500만" } },
            { title: "콘텐츠 생성", duration: 3000, data: { videos: 5, posts: 20 } },
            { title: "SNS 배포", duration: 2500, data: { platforms: 3, status: "완료" } },
            { title: "효과 분석", duration: 2000, data: { views: "120만", roi: "+42%" } }
        ],
        color: "cyan"
    },
    "future_industry_agent": {
        name: "🚀 미래산업",
        steps: [
            { title: "신청 접수", duration: 2000, data: { total: 45 } },
            { title: "AI 심사", duration: 3000, data: { qualified: 28 } },
            { title: "예산 배분", duration: 2500, data: { amount: "19억" } },
            { title: "집행 완료", duration: 2000, data: { done: 28 } }
        ],
        color: "blue"
    },
    "jobs_economy_agent": {
        name: "💼 일자리 매칭",
        steps: [
            { title: "구직자 분석", duration: 2000, data: { seekers: 234 } },
            { title: "기업 매칭", duration: 2500, data: { matched: 156 } },
            { title: "적합도 평가", duration: 2000, data: { perfect: 42 } },
            { title: "일정 생성", duration: 1500, data: { scheduled: 129 } }
        ],
        color: "green"
    },
    "health_welfare_agent": {
        name: "🏥 보건복지",
        steps: [
            { title: "신청 접수", duration: 2000, data: { apps: 1247 } },
            { title: "자격 심사", duration: 2500, data: { approved: 1098 } },
            { title: "급여 산정", duration: 2000, data: { total: "48억" } },
            { title: "지급 완료", duration: 1500, data: { done: 1098 } }
        ],
        color: "red"
    },
    "environment_agent": {
        name: "🌿 환경보전",
        steps: [
            { title: "센서 수집", duration: 2000, data: { sensors: 1200 } },
            { title: "AI 탐지", duration: 2500, data: { normal: 1195 } },
            { title: "대응 조치", duration: 2000, data: { alerts: 5 } },
            { title: "보고서", duration: 1500, data: { status: "안전" } }
        ],
        color: "green"
    },
    "agriculture_agent": {
        name: "🐄 스마트농업",
        steps: [
            { title: "데이터 수집", duration: 2000, data: { farms: 845 } },
            { title: "생육 분석", duration: 2500, data: { optimal: 723 } },
            { title: "권고 생성", duration: 2000, data: { recs: 845 } },
            { title: "자동 제어", duration: 1500, data: { applied: 845 } }
        ],
        color: "amber"
    },
    "marine_fishery_agent": {
        name: "🐟 어장예측",
        steps: [
            { title: "빅데이터 분석", duration: 2500, data: { sources: 12 } },
            { title: "어장 예측", duration: 2000, data: { hotspots: 8 } },
            { title: "출항 권고", duration: 1500, data: { vessels: 234 } },
            { title: "보조금 지급", duration: 2000, data: { amount: "12억" } }
        ],
        color: "blue"
    },
    "infrastructure_agent": {
        name: "🏗️ 인프라",
        steps: [
            { title: "공정 모니터링", duration: 2000, data: { progress: "15%" } },
            { title: "리스크 분석", duration: 2500, data: { risks: 3 } },
            { title: "최적화", duration: 2000, data: { saved: "23억" } },
            { title: "예산 재배분", duration: 1500, data: { adjusted: "4.8조" } }
        ],
        color: "purple"
    },
    "pdv_agent": {
        name: "🔐 PDV",
        steps: [
            { title: "데이터 수집", duration: 1500, data: { records: "342만" } },
            { title: "AES-256 암호화", duration: 2500, data: { encrypted: "342만" } },
            { title: "해시 생성", duration: 2000, data: { hashes: "342만" } },
            { title: "분산 저장", duration: 2000, data: { saved: "100%" } }
        ],
        color: "red"
    },
    "openhash_agent": {
        name: "⛓️ 오픈해시",
        steps: [
            { title: "거래 수신", duration: 2000, data: { txs: 8432 } },
            { title: "SHA-256 해싱", duration: 1500, data: { hashed: 8432 } },
            { title: "계층 선택", duration: 2000, data: { selected: "25%" } },
            { title: "블록 기록", duration: 1500, data: { recorded: 2635 } }
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
        purple: "from-purple-500 to-blue-500",
        cyan: "from-cyan-500 to-blue-500",
        blue: "from-blue-500 to-cyan-500",
        green: "from-green-500 to-emerald-500",
        red: "from-red-500 to-pink-500",
        amber: "from-amber-500 to-orange-500"
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
                React.createElement('div', { className: 'grid grid-cols-4 gap-4' },
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
                        React.createElement('div', { className: 'w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg' }, '🏛️'),
                        React.createElement('div', { className: 'text-left' },
                            React.createElement('h1', { className: 'text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2' }, '제주특별자치도청'),
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
                    React.createElement('h2', { className: 'text-3xl font-bold mb-6 text-cyan-400' }, '제주특별자치도청'),
                    React.createElement('p', { className: 'text-gray-300 text-lg mb-8' }, '11개 AI 에이전트가 제주도 행정을 자동화합니다.'),
                    React.createElement('div', { className: 'grid md:grid-cols-4 gap-6' },
                        [['11', 'AI 에이전트', 'purple'], ['67만', '제주 인구', 'cyan'], ['96.8%', '자동화율', 'green'], ['98.5%', '에너지 절감', 'blue']].map(([val, label, color], idx) =>
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
                    React.createElement('div', { className: 'grid md:grid-cols-3 lg:grid-cols-4 gap-6' },
                        AGENTS_LIST.map(agent => {
                            const s = SIMULATION_SCENARIOS[agent.id];
                            const c = { purple: "from-purple-500/20 to-blue-500/20 border-purple-500/50", cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/50", blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/50", green: "from-green-500/20 to-emerald-500/20 border-green-500/50", red: "from-red-500/20 to-pink-500/20 border-red-500/50", amber: "from-amber-500/20 to-orange-500/20 border-amber-500/50" };
                            
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
