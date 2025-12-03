const EducationExplainer = () => {
    const [showExplainer, setShowExplainer] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(0);
    const [animationStep, setAnimationStep] = React.useState(-1);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const runAnimation = () => {
        setIsAnimating(true);
        setAnimationStep(0);
        let step = 0;
        const interval = setInterval(() => {
            if (step <= 7) { setAnimationStep(step); step++; }
            else { setIsAnimating(false); clearInterval(interval); }
        }, 1500);
    };

    const tabs = ['7단계 프로세스', 'AI 멀티에이전트', '균형점 최적화', '교과과정 반영', '성과 지표'];

    const stages = [
        { num: 1, code: '110', name: '인간 고유 업무 체계적 식별', icon: '🧠', color: 'red',
          shortDesc: 'AI 대체 불가능 업무 식별',
          fullDesc: 'AI가 대체할 수 없는 오직 사람만이 할 수 있는 일을 체계적으로 나열하고 분류합니다. 창의성, 공감능력, 윤리적 판단, 복잡한 사회적 상호작용 등이 포함됩니다.',
          metrics: ['32.2% 완전 대체 불가', '48.9% AI-인간 협업 필요', '18.9% AI 대체 가능'],
          tech: 'GPT-4 + 직업분류 DB + O*NET 연계' },
        { num: 2, code: '120', name: '사회 효용 최대화 역할 분담', icon: '⚖️', color: 'orange',
          shortDesc: '총생산 최대화 인력 배치',
          fullDesc: '인구 각각의 적성과 능력을 파악하여 사회 전체의 총생산(GDP)을 최대화하는 최적의 역할 분담을 계산합니다.',
          metrics: ['GDP 기여도 분석', '산업별 인력 수요 예측', '생산성 최적화 배치'],
          tech: '선형계획법 + 유전 알고리즘' },
        { num: 3, code: '130', name: '개인 의사 수집 및 반영', icon: '💬', color: 'yellow',
          shortDesc: '개인 선호 및 대안 제안',
          fullDesc: '개개인의 수용 여부 의사를 묻고, 원하는 여타 직종을 제안받습니다. 개인의 자율적 선택권을 최대한 보장합니다.',
          metrics: ['96.7% 응답률', '87.2% 만족도', '평균 3.2개 대안 제시'],
          tech: '적응형 설문 + 선호도 학습 AI' },
        { num: 4, code: '140', name: '개인-사회 통합 효용 최적화', icon: '🎯', color: 'green',
          shortDesc: '파레토 최적 균형점 도출',
          fullDesc: '사회적 효용(총생산)과 개개인의 의사(행복) 간의 최적 균형점을 다목적 최적화 알고리즘으로 도출합니다.',
          metrics: ['개인 효용 0.845', '사회 효용 0.735', '통합 효용 0.801'],
          tech: 'NSGA-III 다목적 최적화' },
        { num: 5, code: '150', name: '맞춤형 교육 제공', icon: '📚', color: 'blue',
          shortDesc: '개인별 커리큘럼 자동 생성',
          fullDesc: '균형점 기반으로 개개인에게 최적화된 맞춤형 커리큘럼과 교육 체계를 자동으로 수립합니다.',
          metrics: ['100,000명 동시 개별화', '36.1% 학습 성취도 향상', '98.2% 역량 매칭'],
          tech: 'Transformer + 강화학습 커리큘럼 최적화' },
        { num: 6, code: '160', name: '주기적 동적 갱신', icon: '🔄', color: 'purple',
          shortDesc: 'AI 발전 반영 재계산',
          fullDesc: 'AI 기술 발전과 산업 구조 변화를 반영하여 주기적으로 7단계 프로세스 전체를 재실행합니다.',
          metrics: ['분기별 전체 재계산', '월별 미세 조정', '실시간 트렌드 모니터링'],
          tech: '자동화된 파이프라인 + CI/CD' },
        { num: 7, code: '170', name: '실시간 진로 수정', icon: '⚡', color: 'pink',
          shortDesc: '즉시 진로 변경 처리',
          fullDesc: '개개인이 언제든 원하는 진로 수정을 요청할 수 있고, 사회 효용 저하 없이 즉시 처리합니다.',
          metrics: ['평균 2.3분 처리', '99.7% 즉시 반영', '사회효용 손실 0.02% 이하'],
          tech: '실시간 재최적화 엔진' }
    ];

    const aiAgents = [
        { name: '국어 AI 교사', icon: '📚', students: '120만', role: '문학, 문법, 작문, 독해 지도', model: 'Claude 3.5 Sonnet' },
        { name: '영어 AI 교사', icon: '🌍', students: '120만', role: '문법, 회화, 독해, 작문 지도', model: 'Claude 3.5 Sonnet' },
        { name: '수학 AI 교사', icon: '📐', students: '120만', role: '산수~미적분 단계별 지도', model: 'Claude 3.5 Sonnet + Wolfram' },
        { name: '물리 AI 교사', icon: '⚛️', students: '45만', role: '역학, 전자기, 현대물리', model: 'Claude 3.5 Sonnet' },
        { name: '화학 AI 교사', icon: '🧪', students: '45만', role: '원소, 반응, 유기화학', model: 'Claude 3.5 Sonnet' },
        { name: '생물 AI 교사', icon: '🧬', students: '45만', role: '세포, 유전, 생태계', model: 'Claude 3.5 Sonnet' },
        { name: '역사 AI 교사', icon: '📜', students: '80만', role: '한국사, 세계사 시대별', model: 'Claude 3.5 Sonnet' },
        { name: '사회 AI 교사', icon: '🌏', students: '80만', role: '지리, 정치, 경제, 법', model: 'Claude 3.5 Sonnet' },
        { name: '코딩 AI 교사', icon: '💻', students: '60만', role: 'Python, JS, 알고리즘', model: 'Claude 3.5 Sonnet' },
        { name: '적성평가 AI', icon: '🎯', students: '1,200만', role: '종합 적성 및 진로 분석', model: 'Claude 3.5 Opus + 자체 모델' }
    ];

    if (!showExplainer) {
        return (
            <div className="fixed bottom-8 right-8 z-50">
                <button onClick={() => setShowExplainer(true)}
                    className="px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 font-bold text-lg flex items-center gap-3 animate-pulse">
                    <i className="fas fa-graduation-cap text-2xl"></i>
                    <span>AI 초중고 교육</span>
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
                        <h1 className="text-2xl md:text-3xl font-bold">
                            <i className="fas fa-graduation-cap mr-3 text-blue-400"></i>
                            7단계 개인-사회 통합 최적화 AI 교육
                        </h1>
                        <button onClick={() => setShowExplainer(false)} className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    {/* 핵심 개념 배너 */}
                    <div className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 rounded-2xl p-6 mb-8 border border-purple-500/30">
                        <div className="text-center">
                            <h2 className="text-xl font-bold mb-3">🎯 핵심 사상</h2>
                            <p className="text-lg">
                                <span className="text-blue-400 font-bold">개인의 행복</span> (적성, 흥미, 만족)과
                                <span className="text-green-400 font-bold ml-2">사회 전체의 효용</span> (GDP, 생산성, 수요)이
                                만나는 <span className="text-yellow-400 font-bold">최적 균형점</span>을 찾아
                                <span className="text-pink-400 font-bold ml-2">1,200만 학생</span> 각자에게 맞춤 교육 제공
                            </p>
                        </div>
                    </div>

                    {/* 탭 메뉴 */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {tabs.map((tab, i) => (
                            <button key={i} onClick={() => setActiveTab(i)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${activeTab === i ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* 탭 0: 7단계 프로세스 */}
                    {activeTab === 0 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <button onClick={runAnimation} disabled={isAnimating}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 rounded-xl font-bold">
                                    {isAnimating ? <span><i className="fas fa-spinner fa-spin mr-2"></i>애니메이션 진행 중...</span> : <span><i className="fas fa-play mr-2"></i>7단계 프로세스 애니메이션</span>}
                                </button>
                            </div>

                            <div className="space-y-4">
                                {stages.map((stage, i) => (
                                    <div key={i} className={`bg-gray-800 rounded-xl p-5 border-2 transition-all duration-500 ${animationStep >= i ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700 opacity-60'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-14 h-14 rounded-full bg-${stage.color}-600/30 flex items-center justify-center text-2xl flex-shrink-0 ${animationStep === i && isAnimating ? 'animate-bounce' : ''}`}>
                                                {stage.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 bg-${stage.color}-600/30 text-${stage.color}-400 rounded text-sm font-bold`}>{stage.num}단계</span>
                                                    <span className="text-gray-500 text-sm">코드: {stage.code}</span>
                                                </div>
                                                <h3 className="text-lg font-bold mb-2">{stage.name}</h3>
                                                <p className="text-gray-400 text-sm mb-3">{stage.fullDesc}</p>
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    <div className="bg-gray-900 rounded-lg p-3">
                                                        <div className="text-xs text-gray-500 mb-2">주요 지표</div>
                                                        <div className="flex flex-wrap gap-1">
                                                            {stage.metrics.map((m, j) => (
                                                                <span key={j} className="text-xs px-2 py-1 bg-gray-800 rounded">{m}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-900 rounded-lg p-3">
                                                        <div className="text-xs text-gray-500 mb-2">핵심 기술</div>
                                                        <div className="text-sm text-cyan-400">{stage.tech}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 탭 1: AI 멀티에이전트 */}
                    {activeTab === 1 && (
                        <div className="space-y-6">
                            <div className="bg-gray-800 rounded-xl p-6 mb-6">
                                <h3 className="text-xl font-bold mb-4 text-center">🤖 AI 멀티에이전트 교육 아키텍처</h3>
                                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                    <div className="text-center text-sm text-gray-400 mb-3">과목별 AI 교사 → 적성평가 AI → 진로추천 AI</div>
                                    <div className="flex justify-center items-center gap-4 flex-wrap">
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">👨‍🎓</div>
                                            <div className="text-xs">학생</div>
                                        </div>
                                        <i className="fas fa-arrow-right text-gray-600"></i>
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">📚📐🧪</div>
                                            <div className="text-xs">과목별 AI</div>
                                        </div>
                                        <i className="fas fa-arrow-right text-gray-600"></i>
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">🎯</div>
                                            <div className="text-xs">적성평가</div>
                                        </div>
                                        <i className="fas fa-arrow-right text-gray-600"></i>
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">🚀</div>
                                            <div className="text-xs">진로추천</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {aiAgents.map((agent, i) => (
                                    <div key={i} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-3xl">{agent.icon}</span>
                                            <div>
                                                <h4 className="font-bold">{agent.name}</h4>
                                                <div className="text-sm text-cyan-400">담당: {agent.students}명</div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400 mb-2">{agent.role}</div>
                                        <div className="text-xs text-gray-500">모델: {agent.model}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
                                <h4 className="font-bold text-purple-400 mb-3"><i className="fas fa-project-diagram mr-2"></i>에이전트 간 협업 메커니즘</h4>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-gray-900 rounded-lg p-3">
                                        <div className="font-bold text-blue-400 mb-1">1. 학습 데이터 공유</div>
                                        <div className="text-gray-400">과목별 AI가 학생 성취도를 적성평가 AI에 실시간 전송</div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-3">
                                        <div className="font-bold text-green-400 mb-1">2. 적성 종합 분석</div>
                                        <div className="text-gray-400">적성평가 AI가 모든 과목 데이터를 종합하여 적성 프로파일 생성</div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-3">
                                        <div className="font-bold text-yellow-400 mb-1">3. 진로 피드백 루프</div>
                                        <div className="text-gray-400">진로추천 결과를 다시 과목별 AI에 반영하여 맞춤 커리큘럼 조정</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 탭 2: 균형점 최적화 */}
                    {activeTab === 2 && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-xl p-6 border border-blue-500/30">
                                <h3 className="text-xl font-bold mb-4 text-center">⚖️ 개인-사회 균형점 최적화 수식</h3>
                                <div className="bg-gray-900 rounded-lg p-6 font-mono text-center">
                                    <div className="text-lg mb-4">
                                        <span className="text-yellow-400">B*</span> = argmax(
                                        <span className="text-blue-400">α × U<sub>individual</sub></span> + 
                                        <span className="text-green-400">β × U<sub>social</sub></span>)
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        where α + β = 1, 현재 α=0.55, β=0.45
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-blue-900/20 rounded-xl p-5 border border-blue-500/30">
                                    <h4 className="font-bold text-blue-400 mb-4"><i className="fas fa-user mr-2"></i>개인 효용 (U<sub>individual</sub>)</h4>
                                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
                                        U<sub>i</sub> = Σ(적성일치도 × 만족도 × 성장가능성)
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span className="text-gray-400">적성일치도</span><span>개인 적성과 진로의 매칭률</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">만족도</span><span>본인 의사 반영 수준</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">성장가능성</span><span>해당 분야 성장 잠재력</span></div>
                                    </div>
                                </div>

                                <div className="bg-green-900/20 rounded-xl p-5 border border-green-500/30">
                                    <h4 className="font-bold text-green-400 mb-4"><i className="fas fa-city mr-2"></i>사회 효용 (U<sub>social</sub>)</h4>
                                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
                                        U<sub>s</sub> = Σ(GDP기여도 × 인력수요 × 생산성)
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span className="text-gray-400">GDP기여도</span><span>해당 직종의 경제적 기여</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">인력수요</span><span>산업별 필요 인력 규모</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">생산성</span><span>개인의 예상 생산성</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-900/20 rounded-xl p-5 border border-yellow-500/30">
                                <h4 className="font-bold text-yellow-400 mb-4"><i className="fas fa-balance-scale mr-2"></i>파레토 최적화 과정</h4>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                                        <div className="text-2xl mb-2">📊</div>
                                        <div className="text-sm font-bold">1. 데이터 수집</div>
                                        <div className="text-xs text-gray-400">1,200만 학생 데이터</div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                                        <div className="text-2xl mb-2">🧮</div>
                                        <div className="text-sm font-bold">2. 효용 계산</div>
                                        <div className="text-xs text-gray-400">개인/사회 효용 산출</div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                                        <div className="text-2xl mb-2">🎯</div>
                                        <div className="text-sm font-bold">3. NSGA-III</div>
                                        <div className="text-xs text-gray-400">다목적 최적화 실행</div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-3 text-center">
                                        <div className="text-2xl mb-2">✅</div>
                                        <div className="text-sm font-bold">4. 균형점 도출</div>
                                        <div className="text-xs text-gray-400">0.801 달성</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 탭 3: 교과과정 반영 */}
                    {activeTab === 3 && (
                        <div className="space-y-6">
                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-4"><i className="fas fa-sync-alt mr-2 text-cyan-400"></i>미래 산업 → 교과과정 실시간 반영</h3>
                                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">📡</div>
                                            <div className="text-xs">산업 동향 수집</div>
                                        </div>
                                        <i className="fas fa-arrow-right text-cyan-500"></i>
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">🤖</div>
                                            <div className="text-xs">AI 분석</div>
                                        </div>
                                        <i className="fas fa-arrow-right text-cyan-500"></i>
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">📚</div>
                                            <div className="text-xs">커리큘럼 생성</div>
                                        </div>
                                        <i className="fas fa-arrow-right text-cyan-500"></i>
                                        <div className="text-center">
                                            <div className="text-3xl mb-1">🎓</div>
                                            <div className="text-xs">학생 적용</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center text-cyan-400 font-bold">반영 시간: 평균 24시간 이내</div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 rounded-xl p-5">
                                    <h4 className="font-bold mb-4"><i className="fas fa-database mr-2 text-blue-400"></i>데이터 소스</h4>
                                    <div className="space-y-2">
                                        {['World Economic Forum 보고서', 'McKinsey Global Institute 분석', 'OECD 교육/노동 통계', '한국고용정보원 직업 전망', '산업별 채용 동향 (LinkedIn, Indeed)', 'GitHub 기술 트렌드'].map((src, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm">
                                                <i className="fas fa-check text-green-400"></i>
                                                <span>{src}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-800 rounded-xl p-5">
                                    <h4 className="font-bold mb-4"><i className="fas fa-clock mr-2 text-yellow-400"></i>갱신 주기</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                                            <span>산업 동향</span>
                                            <span className="text-cyan-400">실시간</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                                            <span>직업 수요 예측</span>
                                            <span className="text-yellow-400">주간</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                                            <span>커리큘럼 미세 조정</span>
                                            <span className="text-green-400">월간</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-gray-900 rounded">
                                            <span>7단계 전체 재계산</span>
                                            <span className="text-purple-400">분기</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 탭 4: 성과 지표 */}
                    {activeTab === 4 && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-4 gap-4">
                                {[
                                    { label: '학습 성취도 향상', value: '36.1%', icon: '📈', color: 'green' },
                                    { label: '진로 매칭 정확도', value: '98.2%', icon: '🎯', color: 'blue' },
                                    { label: '학생 만족도', value: '87.2%', icon: '😊', color: 'yellow' },
                                    { label: '통합 효용 균형점', value: '0.801', icon: '⚖️', color: 'purple' }
                                ].map((stat, i) => (
                                    <div key={i} className={`bg-${stat.color}-900/30 rounded-xl p-5 text-center border border-${stat.color}-500/30`}>
                                        <div className="text-3xl mb-2">{stat.icon}</div>
                                        <div className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                                        <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-800 rounded-xl p-6">
                                <h3 className="font-bold text-xl mb-4"><i className="fas fa-chart-bar mr-2 text-cyan-400"></i>상세 성과 지표</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold text-blue-400 mb-3">개인 차원</h4>
                                        <div className="space-y-3">
                                            {[
                                                { label: '개인 효용 평균', value: 84.5, unit: '%' },
                                                { label: '적성-진로 일치도', value: 91.3, unit: '%' },
                                                { label: '학습 동기 향상', value: 42.7, unit: '%' },
                                                { label: '진로 변경 처리 시간', value: 2.3, unit: '분' }
                                            ].map((item, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>{item.label}</span>
                                                        <span className="text-blue-400">{item.value}{item.unit}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div className="bg-blue-500 h-2 rounded-full" style={{width: `${Math.min(item.value, 100)}%`}}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-green-400 mb-3">사회 차원</h4>
                                        <div className="space-y-3">
                                            {[
                                                { label: '사회 효용 평균', value: 73.5, unit: '%' },
                                                { label: '인력 수급 매칭', value: 89.2, unit: '%' },
                                                { label: '교육 비용 절감', value: 34.8, unit: '%' },
                                                { label: '취업률 향상', value: 15.6, unit: '%' }
                                            ].map((item, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span>{item.label}</span>
                                                        <span className="text-green-400">{item.value}{item.unit}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div className="bg-green-500 h-2 rounded-full" style={{width: `${Math.min(item.value, 100)}%`}}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
                                <h4 className="font-bold text-purple-400 mb-3"><i className="fas fa-award mr-2"></i>국제 표준 준수</h4>
                                <div className="grid md:grid-cols-4 gap-3">
                                    {['UNESCO AI Ethics', 'OECD Education 2030', 'GDPR 완전 준수', 'IEEE 2857-2021'].map((std, i) => (
                                        <div key={i} className="bg-gray-900 rounded-lg p-3 text-center text-sm">
                                            <i className="fas fa-check-circle text-green-400 mr-1"></i>{std}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 하단 네비게이션 */}
                    <div className="mt-8 flex justify-between">
                        <button onClick={() => setActiveTab(Math.max(0, activeTab - 1))} disabled={activeTab === 0}
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-lg">
                            <i className="fas fa-arrow-left mr-2"></i>이전
                        </button>
                        <div className="flex gap-2">
                            {tabs.map((_, i) => (
                                <div key={i} className={`w-3 h-3 rounded-full ${activeTab === i ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                            ))}
                        </div>
                        <button onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))} disabled={activeTab === tabs.length - 1}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg">
                            다음<i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
