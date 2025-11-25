const SimulatorSection = () => {
    const [activeTab, setActiveTab] = React.useState(1);

    const tabs = [
        { id: 1, icon: '📤', title: 'Hash 전송', desc: '확률적 계층 선택' },
        { id: 2, icon: '🔗', title: 'Chain 융합', desc: '상호 검증' },
        { id: 3, icon: '🚨', title: '위변조 탐지', desc: '보안 메커니즘' },
        { id: 4, icon: '🔄', title: '무한 확장성', desc: '동적 네트워크' },
        { id: 5, icon: '📊', title: 'TPS 성능', desc: '처리 성능' }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    ⛓️ 오픈해시 메커니즘 시뮬레이터
                </h2>
                <p className="text-gray-400 text-lg">5가지 핵심 시나리오를 인터랙티브하게 체험하세요</p>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-4 rounded-2xl font-bold transition-all ${
                            activeTab === tab.id
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105'
                                : 'bg-white/5 border-2 border-white/10 text-gray-400 hover:bg-white/10 hover:border-cyan-500/30'
                        }`}
                    >
                        <div className="text-3xl mb-1">{tab.icon}</div>
                        <div className="text-sm font-bold">{tab.title}</div>
                        <div className="text-xs opacity-70">{tab.desc}</div>
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            <div className="min-h-[600px]">
                {activeTab === 1 && <Tab1HashTransmission />}
                {activeTab === 2 && <Tab2ChainFusion />}
                {activeTab === 3 && <Tab3FraudDetection />}
                {activeTab === 4 && <Tab4Scalability />}
                {activeTab === 5 && <Tab5Performance />}
            </div>
        </section>
    );
};
