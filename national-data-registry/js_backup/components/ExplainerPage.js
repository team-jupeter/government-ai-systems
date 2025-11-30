const ExplainerPage = () => {
    const [showExplainer, setShowExplainer] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState(0);
    const [animationStep, setAnimationStep] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    // 데이터 흐름 애니메이션
    const runDataFlowAnimation = () => {
        setIsAnimating(true);
        setAnimationStep(0);
        let step = 0;
        const interval = setInterval(() => {
            if (step <= 5) { setAnimationStep(step); step++; }
            else { setIsAnimating(false); clearInterval(interval); }
        }, 1200);
    };

    // 검색 시뮬레이션
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResult, setSearchResult] = React.useState(null);
    const [isSearching, setIsSearching] = React.useState(false);

    const sampleData = [
        { hash: 'a1b2c3d4', type: '운전면허증', location: '도로교통공단', layer: 1, time: '0.003초' },
        { hash: 'e5f6g7h8', type: '졸업증명서', location: '서울대학교', layer: 1, time: '0.002초' },
        { hash: 'i9j0k1l2', type: '판결문', location: '서울중앙지방법원', layer: 2, time: '0.004초' },
        { hash: 'm3n4o5p6', type: '세금신고서', location: '국세청', layer: 4, time: '0.005초' },
        { hash: 'q7r8s9t0', type: '출생증명서', location: '구청', layer: 2, time: '0.003초' }
    ];

    const simulateSearch = () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        setSearchResult(null);
        setTimeout(() => {
            const result = sampleData.find(d => d.hash.includes(searchQuery.toLowerCase())) || sampleData[Math.floor(Math.random() * sampleData.length)];
            setSearchResult(result);
            setIsSearching(false);
        }, 800);
    };

    if (!showExplainer) {
        return (
            <div className="fixed bottom-8 right-8 z-50">
                <button onClick={() => setShowExplainer(true)}
                    className="px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 font-bold text-lg flex items-center gap-3 animate-pulse">
                    <i className="fas fa-play-circle text-2xl"></i>
                    <span>국가데이터처의 역할과 기능</span>
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
            <div className="min-h-screen py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* 헤더 */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">
                            <i className="fas fa-database mr-3 text-cyan-400"></i>
                            국가데이터처의 역할과 기능
                        </h1>
                        <button onClick={() => setShowExplainer(false)} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    {/* 섹션 탭 */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        {['핵심 개념', '5계층 구조', '데이터 흐름', '검색 체험', '효과'].map((tab, i) => (
                            <button key={i} onClick={() => setActiveSection(i)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${activeSection === i ? 'bg-cyan-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* 섹션 1: 핵심 개념 */}
                    {activeSection === 0 && (
                        <div className="space-y-8">
                            {/* 한 줄 설명 */}
                            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl p-8 border border-cyan-500/30 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h2 className="text-2xl font-bold mb-4">국가데이터처 = 정부 데이터의 구글</h2>
                                <p className="text-xl text-gray-300">모든 정부 기관이 만든 데이터가 <span className="text-cyan-400 font-bold">어디에</span> 있는지 <span className="text-yellow-400 font-bold">즉시</span> 찾아주는 검색 엔진</p>
                            </div>

                            {/* 비유 설명 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                    <div className="text-4xl mb-4 text-center">📚➡️🔍➡️📄</div>
                                    <h3 className="font-bold text-lg mb-3 text-center">도서관의 검색 시스템처럼</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                                            <span className="text-2xl">📚</span>
                                            <span>도서관에는 수백만 권의 책이 있습니다</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                                            <span className="text-2xl">🔍</span>
                                            <span>검색 시스템이 책의 <b>위치</b>를 알려줍니다</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                                            <span className="text-2xl">📄</span>
                                            <span>책 자체는 서가에 그대로 있습니다</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-800 rounded-xl p-6 border border-cyan-500/30">
                                    <div className="text-4xl mb-4 text-center">🏛️➡️🔍➡️📋</div>
                                    <h3 className="font-bold text-lg mb-3 text-center text-cyan-400">국가데이터처도 마찬가지</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-3 p-3 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
                                            <span className="text-2xl">🏛️</span>
                                            <span>정부에는 수억 건의 데이터가 있습니다</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
                                            <span className="text-2xl">🔍</span>
                                            <span>국가데이터처가 데이터의 <b className="text-cyan-400">위치</b>를 알려줍니다</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
                                            <span className="text-2xl">📋</span>
                                            <span>데이터 자체는 각 기관에 그대로 있습니다</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 핵심 원리 */}
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="font-bold text-xl mb-6 text-center">🔐 핵심 원리: 해시(Hash)란?</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-gray-900 rounded-xl p-4 text-center">
                                        <div className="text-5xl mb-3">📄</div>
                                        <div className="text-sm text-gray-400 mb-2">원본 데이터</div>
                                        <div className="bg-gray-800 p-2 rounded text-xs font-mono">홍길동, 1990년생, 서울시...</div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">⚙️</div>
                                            <div className="text-sm text-cyan-400">SHA-256<br/>암호화</div>
                                            <div className="text-4xl mt-2">→</div>
                                        </div>
                                    </div>
                                    <div className="bg-cyan-900/30 rounded-xl p-4 text-center border border-cyan-500/30">
                                        <div className="text-5xl mb-3">🔑</div>
                                        <div className="text-sm text-cyan-400 mb-2">해시값 (지문)</div>
                                        <div className="bg-gray-800 p-2 rounded text-xs font-mono text-yellow-400">a1b2c3d4e5f6...</div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">💡</span>
                                        <div>
                                            <div className="font-bold text-yellow-400">해시값은 데이터의 "지문"입니다</div>
                                            <div className="text-sm text-gray-400 mt-1">원본 데이터를 알 수 없지만, 같은 데이터는 항상 같은 해시값을 만듭니다. 국가데이터처는 이 "지문"만 보관합니다.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 섹션 2: 5계층 구조 */}
                    {activeSection === 1 && (
                        <div className="space-y-8">
                            {/* 피라미드 시각화 */}
                            <div className="bg-gray-800 rounded-xl p-8">
                                <h3 className="font-bold text-xl mb-6 text-center">🏗️ 대한민국 정부 오픈해시 5계층 구조</h3>
                                <div className="relative max-w-2xl mx-auto">
                                    {/* Layer 5 */}
                                    <div className="flex justify-center mb-2">
                                        <div className="w-32 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-t-xl p-3 text-center transform hover:scale-105 transition-all cursor-pointer">
                                            <div className="text-2xl">🔍</div>
                                            <div className="text-xs font-bold">Layer 5</div>
                                            <div className="text-xs">국가데이터처</div>
                                            <div className="text-xs text-yellow-200">3개 노드</div>
                                        </div>
                                    </div>
                                    {/* Layer 4 */}
                                    <div className="flex justify-center mb-2">
                                        <div className="w-48 bg-gradient-to-r from-green-600 to-green-500 p-3 text-center transform hover:scale-105 transition-all cursor-pointer">
                                            <div className="text-2xl">🏛️</div>
                                            <div className="text-xs font-bold">Layer 4</div>
                                            <div className="text-xs">입법·행정·사법부</div>
                                            <div className="text-xs text-green-200">54개 노드</div>
                                        </div>
                                    </div>
                                    {/* Layer 3 */}
                                    <div className="flex justify-center mb-2">
                                        <div className="w-64 bg-gradient-to-r from-purple-600 to-purple-500 p-3 text-center transform hover:scale-105 transition-all cursor-pointer">
                                            <div className="text-2xl">🌐</div>
                                            <div className="text-xs font-bold">Layer 3</div>
                                            <div className="text-xs">17개 광역시도</div>
                                            <div className="text-xs text-purple-200">96개 노드</div>
                                        </div>
                                    </div>
                                    {/* Layer 2 */}
                                    <div className="flex justify-center mb-2">
                                        <div className="w-80 bg-gradient-to-r from-blue-600 to-blue-500 p-3 text-center transform hover:scale-105 transition-all cursor-pointer">
                                            <div className="text-2xl">🏢</div>
                                            <div className="text-xs font-bold">Layer 2</div>
                                            <div className="text-xs">226개 시군구</div>
                                            <div className="text-xs text-blue-200">828개 노드</div>
                                        </div>
                                    </div>
                                    {/* Layer 1 */}
                                    <div className="flex justify-center">
                                        <div className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-b-xl p-4 text-center transform hover:scale-105 transition-all cursor-pointer">
                                            <div className="text-3xl">📱</div>
                                            <div className="text-sm font-bold">Layer 1</div>
                                            <div className="text-sm">읍면동 + 현장 (주민센터, 학교, 병원, 개인)</div>
                                            <div className="text-sm text-cyan-200">5,200만+ 노드</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 각 계층 상세 */}
                            <div className="grid md:grid-cols-5 gap-3">
                                {[
                                    { num: 1, name: '읍면동', icon: '📱', color: 'cyan', examples: ['주민센터', '학교', '병원', '스마트폰'] },
                                    { num: 2, name: '시군구', icon: '🏢', color: 'blue', examples: ['구청', '경찰서', '지방법원'] },
                                    { num: 3, name: '광역시도', icon: '🌐', color: 'purple', examples: ['서울시청', '경기도청', 'KT/SKT'] },
                                    { num: 4, name: '3부', icon: '🏛️', color: 'green', examples: ['국회', '대법원', '행안부'] },
                                    { num: 5, name: '데이터처', icon: '🔍', color: 'yellow', examples: ['대전 본청', '서울 분소'] }
                                ].map((layer, i) => (
                                    <div key={i} className={`bg-${layer.color}-900/30 rounded-xl p-4 border border-${layer.color}-500/30`}>
                                        <div className="text-center mb-3">
                                            <div className="text-3xl">{layer.icon}</div>
                                            <div className={`text-${layer.color}-400 font-bold`}>Layer {layer.num}</div>
                                            <div className="text-sm">{layer.name}</div>
                                        </div>
                                        <div className="space-y-1">
                                            {layer.examples.map((ex, j) => (
                                                <div key={j} className="text-xs bg-gray-900/50 rounded px-2 py-1 text-center">{ex}</div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 섹션 3: 데이터 흐름 */}
                    {activeSection === 2 && (
                        <div className="space-y-8">
                            <div className="text-center mb-6">
                                <button onClick={runDataFlowAnimation} disabled={isAnimating}
                                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 rounded-xl font-bold text-lg">
                                    {isAnimating ? <span><i className="fas fa-spinner fa-spin mr-2"></i>애니메이션 진행 중...</span> : <span><i className="fas fa-play mr-2"></i>데이터 흐름 애니메이션 시작</span>}
                                </button>
                            </div>

                            {/* 애니메이션 시각화 */}
                            <div className="bg-gray-800 rounded-xl p-8">
                                <h3 className="font-bold text-xl mb-6 text-center">📋 운전면허증 발급 과정</h3>
                                <div className="space-y-4">
                                    {[
                                        { step: 0, icon: '📱', from: '도로교통공단', action: '운전면허증 데이터 생성', detail: '해시값: a1b2c3d4...', layer: 1 },
                                        { step: 1, icon: '🏢', from: '관할 시군구', action: 'Merkle Tree로 집약', detail: '여러 해시를 하나로 묶음', layer: 2 },
                                        { step: 2, icon: '🌐', from: '광역시도', action: '2차 검증 수행', detail: 'BLS 서명 검증', layer: 3 },
                                        { step: 3, icon: '🏛️', from: '경찰청', action: 'PBFT 합의', detail: '54개 노드 중 36개 동의', layer: 4 },
                                        { step: 4, icon: '🔍', from: '국가데이터처', action: '해시 인덱스 등록', detail: '검색 가능 상태', layer: 5 },
                                        { step: 5, icon: '✅', from: '완료', action: '언제든 검색 가능', detail: '0.003초 내 위치 확인', layer: 'done' }
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${animationStep >= item.step ? 'bg-cyan-900/30 border border-cyan-500/50' : 'bg-gray-900/50 opacity-50'}`}>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${animationStep >= item.step ? 'bg-cyan-600 scale-110' : 'bg-gray-700'}`}>
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded text-xs ${item.layer === 'done' ? 'bg-green-600' : 'bg-blue-600'}`}>
                                                        {item.layer === 'done' ? '완료' : `Layer ${item.layer}`}
                                                    </span>
                                                    <span className="font-bold">{item.from}</span>
                                                </div>
                                                <div className="text-sm text-gray-400">{item.action}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-cyan-400">{item.detail}</div>
                                            </div>
                                            {animationStep === item.step && isAnimating && (
                                                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 시간 비교 */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                                    <h4 className="font-bold text-red-400 mb-4 text-center">❌ 기존 방식</h4>
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-red-400">14일</div>
                                        <div className="text-gray-400 mt-2">부처 간 공문 교환</div>
                                        <div className="mt-4 space-y-2 text-sm text-left">
                                            <div className="flex items-center gap-2"><span>📝</span> 공문 작성 (1일)</div>
                                            <div className="flex items-center gap-2"><span>📮</span> 발송 및 접수 (2일)</div>
                                            <div className="flex items-center gap-2"><span>🔍</span> 데이터 검색 (3일)</div>
                                            <div className="flex items-center gap-2"><span>✅</span> 승인 및 회신 (8일)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
                                    <h4 className="font-bold text-green-400 mb-4 text-center">✅ 오픈해시 방식</h4>
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-green-400">2.3초</div>
                                        <div className="text-gray-400 mt-2">자동 검증 및 연계</div>
                                        <div className="mt-4 space-y-2 text-sm text-left">
                                            <div className="flex items-center gap-2"><span>⚡</span> 요청 접수 (0.1초)</div>
                                            <div className="flex items-center gap-2"><span>🔐</span> 법적 근거 검증 (0.8초)</div>
                                            <div className="flex items-center gap-2"><span>🛡️</span> 개인정보 보호 (0.6초)</div>
                                            <div className="flex items-center gap-2"><span>📤</span> 데이터 전송 (0.8초)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 섹션 4: 검색 체험 */}
                    {activeSection === 3 && (
                        <div className="space-y-8">
                            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl p-8 border border-cyan-500/30">
                                <h3 className="font-bold text-xl mb-6 text-center">🔍 국가데이터처 검색 체험</h3>
                                <div className="max-w-xl mx-auto">
                                    <div className="flex gap-2 mb-4">
                                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && simulateSearch()}
                                            placeholder="해시값 입력 (예: a1b2, e5f6, m3n4)"
                                            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" />
                                        <button onClick={simulateSearch} disabled={isSearching}
                                            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 rounded-lg font-bold">
                                            {isSearching ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-search"></i>}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="text-sm text-gray-400">예시:</span>
                                        {['a1b2', 'e5f6', 'i9j0', 'm3n4', 'q7r8'].map((ex, i) => (
                                            <button key={i} onClick={() => { setSearchQuery(ex); }}
                                                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm">{ex}</button>
                                        ))}
                                    </div>

                                    {searchResult && (
                                        <div className="bg-gray-900 rounded-xl p-6 border border-green-500/50 animate-fadeIn">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-check"></i>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-green-400">검색 완료!</div>
                                                    <div className="text-sm text-gray-400">응답 시간: {searchResult.time}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-800 p-3 rounded-lg">
                                                    <div className="text-xs text-gray-500">데이터 유형</div>
                                                    <div className="font-bold text-cyan-400">{searchResult.type}</div>
                                                </div>
                                                <div className="bg-gray-800 p-3 rounded-lg">
                                                    <div className="text-xs text-gray-500">저장 위치</div>
                                                    <div className="font-bold text-yellow-400">{searchResult.location}</div>
                                                </div>
                                                <div className="bg-gray-800 p-3 rounded-lg">
                                                    <div className="text-xs text-gray-500">계층</div>
                                                    <div className="font-bold">Layer {searchResult.layer}</div>
                                                </div>
                                                <div className="bg-gray-800 p-3 rounded-lg">
                                                    <div className="text-xs text-gray-500">해시값</div>
                                                    <div className="font-mono text-sm">{searchResult.hash}...</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* API 예시 */}
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h4 className="font-bold mb-4"><i className="fas fa-code mr-2 text-cyan-400"></i>실제 API 호출 예시</h4>
                                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                    <div className="text-gray-500"># 검색 요청</div>
                                    <div className="text-green-400">GET https://api.ndr.go.kr/search?hash=a1b2c3d4e5f6</div>
                                    <div className="text-gray-500 mt-4"># 응답 (JSON)</div>
                                    <div className="text-yellow-400">{'{'}</div>
                                    <div className="text-yellow-400 ml-4">"success": true,</div>
                                    <div className="text-yellow-400 ml-4">"type": "운전면허증",</div>
                                    <div className="text-yellow-400 ml-4">"location": "도로교통공단",</div>
                                    <div className="text-yellow-400 ml-4">"layer": 1,</div>
                                    <div className="text-yellow-400 ml-4">"verified": true,</div>
                                    <div className="text-yellow-400 ml-4">"response_time_ms": 3</div>
                                    <div className="text-yellow-400">{'}'}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 섹션 5: 효과 */}
                    {activeSection === 4 && (
                        <div className="space-y-8">
                            {/* 핵심 효과 */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-b from-cyan-900/50 to-gray-800 rounded-xl p-6 text-center">
                                    <div className="text-5xl mb-4">⚡</div>
                                    <div className="text-3xl font-bold text-cyan-400">99.998%</div>
                                    <div className="text-gray-400">시간 단축</div>
                                    <div className="mt-4 text-sm">
                                        <span className="text-red-400 line-through">14일</span>
                                        <span className="mx-2">→</span>
                                        <span className="text-green-400 font-bold">2.3초</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-b from-green-900/50 to-gray-800 rounded-xl p-6 text-center">
                                    <div className="text-5xl mb-4">💰</div>
                                    <div className="text-3xl font-bold text-green-400">450억원</div>
                                    <div className="text-gray-400">연간 비용 절감</div>
                                    <div className="mt-4 text-sm">부처 간 연계 자동화</div>
                                </div>
                                <div className="bg-gradient-to-b from-yellow-900/50 to-gray-800 rounded-xl p-6 text-center">
                                    <div className="text-5xl mb-4">🔋</div>
                                    <div className="text-3xl font-bold text-yellow-400">98.5%</div>
                                    <div className="text-gray-400">에너지 절감</div>
                                    <div className="mt-4 text-sm">블록체인 대비</div>
                                </div>
                            </div>

                            {/* 국민 체감 효과 */}
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="font-bold text-xl mb-6 text-center">👨‍👩‍👧‍👦 국민이 체감하는 변화</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { icon: '🏠', title: '주택청약', before: '서류 7종 직접 준비', after: '원클릭 자동 연계', time: '3일 → 10분' },
                                        { icon: '🏥', title: '의료비 환급', before: '진료기록 팩스 제출', after: '실시간 자동 처리', time: '2주 → 즉시' },
                                        { icon: '👶', title: '출생신고', before: '주민센터 직접 방문', after: '병원에서 자동 신고', time: '1일 → 0분' },
                                        { icon: '💼', title: '취업지원금', before: '소득증명 별도 발급', after: '국세청 자동 연계', time: '5일 → 2.3초' }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-900 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl">{item.icon}</span>
                                                <span className="font-bold text-lg">{item.title}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div className="bg-red-900/20 p-3 rounded-lg">
                                                    <div className="text-red-400 text-xs mb-1">기존</div>
                                                    <div>{item.before}</div>
                                                </div>
                                                <div className="bg-green-900/20 p-3 rounded-lg">
                                                    <div className="text-green-400 text-xs mb-1">오픈해시</div>
                                                    <div>{item.after}</div>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center text-cyan-400 font-bold">{item.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 개인정보 보호 */}
                            <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
                                <h3 className="font-bold text-xl mb-4 text-center">🔐 개인정보는 안전합니다</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-gray-900 rounded-xl p-4 text-center">
                                        <div className="text-4xl mb-3">📱</div>
                                        <div className="font-bold text-purple-400">원본은 내 손안에</div>
                                        <div className="text-sm text-gray-400 mt-2">개인 데이터는 오직 본인 스마트폰에만 저장</div>
                                    </div>
                                    <div className="bg-gray-900 rounded-xl p-4 text-center">
                                        <div className="text-4xl mb-3">🔑</div>
                                        <div className="font-bold text-purple-400">해시만 전송</div>
                                        <div className="text-sm text-gray-400 mt-2">네트워크에는 32바이트 "지문"만 공유</div>
                                    </div>
                                    <div className="bg-gray-900 rounded-xl p-4 text-center">
                                        <div className="text-4xl mb-3">🗑️</div>
                                        <div className="font-bold text-purple-400">삭제권 보장</div>
                                        <div className="text-sm text-gray-400 mt-2">원할 때 언제든 삭제 요청 가능</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 하단 네비게이션 */}
                    <div className="mt-8 flex justify-between">
                        <button onClick={() => setActiveSection(Math.max(0, activeSection - 1))} disabled={activeSection === 0}
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-lg">
                            <i className="fas fa-arrow-left mr-2"></i>이전
                        </button>
                        <div className="flex gap-2">
                            {[0,1,2,3,4].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full ${activeSection === i ? 'bg-cyan-500' : 'bg-gray-600'}`}></div>
                            ))}
                        </div>
                        <button onClick={() => setActiveSection(Math.min(4, activeSection + 1))} disabled={activeSection === 4}
                            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 rounded-lg">
                            다음<i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
