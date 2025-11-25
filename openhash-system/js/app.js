const { useState } = React;

function App() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-4 text-center bg-gradient-to-b from-transparent to-black/20">
                <div className="max-w-5xl mx-auto">
                    <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full">
                        <span className="text-cyan-400 text-sm font-semibold">⛓️ Powered by OpenHash Technology</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        오픈해시 (OpenHash)
                    </h1>
                    
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        블록체인을 대체하는 차세대 분산 신뢰 기술
                        <br />
                        <span className="text-cyan-400 font-semibold">확률적 계층 선택</span> 기반의 혁신적인 데이터 무결성 검증 시스템
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-2xl px-8 py-6 backdrop-blur-lg">
                            <div className="text-4xl font-bold text-green-400 mb-2">98.5%</div>
                            <div className="text-gray-300 text-sm">에너지 절감</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl px-8 py-6 backdrop-blur-lg">
                            <div className="text-4xl font-bold text-blue-400 mb-2">1000x</div>
                            <div className="text-gray-300 text-sm">처리 속도</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl px-8 py-6 backdrop-blur-lg">
                            <div className="text-4xl font-bold text-purple-400 mb-2">선형 증가</div>
                            <div className="text-gray-300 text-sm">확장성</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button 
                            onClick={() => document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
                        >
                            🎲 시뮬레이터 체험하기
                        </button>
                        <button 
                            onClick={() => document.getElementById('chat').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-white/10 border-2 border-cyan-500/50 rounded-xl font-bold text-white hover:bg-white/20 transition-all"
                        >
                            🤖 AI 상담
                        </button>
                    </div>
                </div>

                {/* 기술 배너 */}
                <div className="mt-16 py-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-t border-b border-cyan-500/20">
                    <p className="text-cyan-400 text-sm">
                        🔗 <strong className="text-green-400">SHA-256 재해싱</strong> 기반 확률적 계층 선택 알고리즘 | 
                        기존 통신 인프라 활용 | 
                        작업증명/지분증명 불필요
                    </p>
                </div>
            </section>

            {/* 블록체인 vs 오픈해시 비교 */}
            <ComparisonSection />

            {/* 확률적 계층 선택 시뮬레이터 */}
            <div id="simulator">
                <SimulatorSection />
            </div>

            {/* 에너지 효율성 계산기 */}
            <EnergyCalculator />

            {/* AI 상담 */}
            <div id="chat">
                <ChatSection />
            </div>

            {/* Footer */}
            <footer className="bg-black bg-opacity-50 border-t border-cyan-500 border-opacity-30 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-5xl mb-4">⛓️</div>
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                        OpenHash
                    </h3>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                        확률적 계층 선택 기반 분산 신뢰 기술로 블록체인의 한계를 극복하고,
                        에너지 효율적이며 확장 가능한 데이터 무결성 검증을 실현합니다.
                    </p>
                    <div className="flex justify-center gap-8 text-sm text-gray-400 mb-6">
                        <div>⚡ 98.5% 에너지 절감</div>
                        <div>🚀 노드 비례 선형 확장</div>
                        <div>🔒 SHA-256 기반 무결성</div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © 2025 OpenHash Foundation. Powered by Claude AI.
                    </p>
                </div>
            </footer>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    React.createElement(App)
);
