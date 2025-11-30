const BalanceMechanism = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [activeStage, setActiveStage] = React.useState(0);
    
    const stages = [
        { num: 1, code: '110', name: '인간 고유 업무 식별', icon: '🧠', color: 'red',
          desc: 'AI가 대체 불가능한 업무 식별', detail: '32.2% 대체 불가, 48.9% 협업 필요',
          formula: 'H(t) = {tasks | P(AI_replace) < 0.3}' },
        { num: 2, code: '120', name: '사회 효용 최대화 역할 분담', icon: '⚖️', color: 'orange',
          desc: '사회 전체 총생산 최대화 계산', detail: 'GDP 기여도 기반 최적 인력 배치',
          formula: 'max Σ(productivity_i × demand_i)' },
        { num: 3, code: '130', name: '개인 의사 수집 및 반영', icon: '💬', color: 'yellow',
          desc: '개인 수용 여부 및 대안 제안', detail: '96.7% 응답률, 87.2% 만족도',
          formula: 'P_i = preference_survey(student_i)' },
        { num: 4, code: '140', name: '개인-사회 통합 효용 최적화', icon: '🎯', color: 'green',
          desc: '파레토 최적 균형점 도출', detail: '통합 효용 0.801 달성',
          formula: 'B* = argmax(0.55×U_i + 0.45×U_s)' },
        { num: 5, code: '150', name: '맞춤형 교육 제공', icon: '📚', color: 'blue',
          desc: '개인별 커리큘럼 자동 생성', detail: '100,000명 동시 개별화',
          formula: 'Curriculum_i = f(aptitude, career, balance)' },
        { num: 6, code: '160', name: '주기적 동적 갱신', icon: '🔄', color: 'purple',
          desc: 'AI 발전 및 산업 변화 반영', detail: '분기별 프로세스 재실행',
          formula: 'Update(t) = Δ(industry) + Δ(AI_capability)' },
        { num: 7, code: '170', name: '실시간 진로 수정', icon: '⚡', color: 'pink',
          desc: '개인 요청 시 즉시 처리', detail: '평균 2.3분 내 완료',
          formula: 'Modify(request) → new_path in O(1)' }
    ];
    
    return (
        <section className="py-12 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                {/* 메인 버튼 */}
                <div className="text-center mb-8">
                    <button onClick={() => setShowModal(true)}
                        className="px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                        <i className="fas fa-balance-scale mr-3"></i>
                        사회적 총효용과 개인 행복의 균형점 메커니즘
                        <i className="fas fa-arrow-right ml-3"></i>
                    </button>
                </div>
                
                {/* 7단계 미리보기 */}
                <div className="grid grid-cols-7 gap-2">
                    {stages.map((stage, i) => (
                        <div key={i} className={`bg-gray-800 rounded-xl p-3 text-center border-2 border-${stage.color}-500/30 hover:border-${stage.color}-500 transition-all cursor-pointer`}
                            onClick={() => { setShowModal(true); setActiveStage(i); }}>
                            <div className="text-2xl mb-1">{stage.icon}</div>
                            <div className="text-xs font-bold">{stage.num}단계</div>
                        </div>
                    ))}
                </div>
                
                {/* 모달 */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-700 flex justify-between items-center">
                                <h2 className="text-2xl font-bold">
                                    <i className="fas fa-balance-scale mr-3 text-purple-400"></i>
                                    7단계 개인-사회 통합 최적화 메커니즘
                                </h2>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-800 rounded-lg">
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                            
                            <div className="p-6">
                                {/* 핵심 개념 */}
                                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 mb-8 border border-purple-500/30">
                                    <h3 className="text-xl font-bold mb-4 text-center">🎯 핵심 사상</h3>
                                    <p className="text-center text-lg">
                                        <span className="text-blue-400 font-bold">개인의 행복</span>과 
                                        <span className="text-green-400 font-bold ml-2">사회 전체의 효용</span>이 
                                        만나는 <span className="text-yellow-400 font-bold">최적 균형점</span>을 찾아 진로 추천
                                    </p>
                                    <div className="mt-4 bg-gray-900 rounded-lg p-4 font-mono text-center">
                                        <span className="text-yellow-400">Balance</span> = argmax(<span className="text-blue-400">α×U_individual</span> + <span className="text-green-400">β×U_social</span>)
                                        <div className="text-sm text-gray-400 mt-2">현재 α=0.55, β=0.45 (개인 우선 가중)</div>
                                    </div>
                                </div>
                                
                                {/* 단계 선택 탭 */}
                                <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
                                    {stages.map((stage, i) => (
                                        <button key={i} onClick={() => setActiveStage(i)}
                                            className={`px-4 py-2 rounded-lg whitespace-nowrap flex items-center gap-2 transition-all ${activeStage === i ? `bg-${stage.color}-600` : 'bg-gray-800 hover:bg-gray-700'}`}>
                                            <span>{stage.icon}</span>
                                            <span className="text-sm">{stage.num}단계</span>
                                        </button>
                                    ))}
                                </div>
                                
                                {/* 선택된 단계 상세 */}
                                <div className={`bg-gray-800 rounded-xl p-6 border-2 border-${stages[activeStage].color}-500/50`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-16 h-16 rounded-full bg-${stages[activeStage].color}-600/30 flex items-center justify-center text-3xl`}>
                                            {stages[activeStage].icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 bg-${stages[activeStage].color}-600/30 text-${stages[activeStage].color}-400 rounded text-sm`}>
                                                    {stages[activeStage].num}단계
                                                </span>
                                                <span className="text-gray-400 text-sm">코드: {stages[activeStage].code}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mt-1">{stages[activeStage].name}</h3>
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-gray-900 rounded-lg p-4">
                                            <div className="text-sm text-gray-400 mb-1">설명</div>
                                            <div className="font-medium">{stages[activeStage].desc}</div>
                                        </div>
                                        <div className="bg-gray-900 rounded-lg p-4">
                                            <div className="text-sm text-gray-400 mb-1">성과</div>
                                            <div className={`font-medium text-${stages[activeStage].color}-400`}>{stages[activeStage].detail}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 bg-gray-900 rounded-lg p-4">
                                        <div className="text-sm text-gray-400 mb-1">수식</div>
                                        <div className="font-mono text-cyan-400">{stages[activeStage].formula}</div>
                                    </div>
                                </div>
                                
                                {/* 최종 결과 */}
                                <div className="mt-8 grid md:grid-cols-4 gap-4">
                                    <div className="bg-blue-900/30 rounded-xl p-4 text-center border border-blue-500/30">
                                        <div className="text-3xl font-bold text-blue-400">0.845</div>
                                        <div className="text-sm text-gray-400">개인 효용 평균</div>
                                    </div>
                                    <div className="bg-green-900/30 rounded-xl p-4 text-center border border-green-500/30">
                                        <div className="text-3xl font-bold text-green-400">0.735</div>
                                        <div className="text-sm text-gray-400">사회 효용 평균</div>
                                    </div>
                                    <div className="bg-yellow-900/30 rounded-xl p-4 text-center border border-yellow-500/30">
                                        <div className="text-3xl font-bold text-yellow-400">0.801</div>
                                        <div className="text-sm text-gray-400">통합 균형점</div>
                                    </div>
                                    <div className="bg-purple-900/30 rounded-xl p-4 text-center border border-purple-500/30">
                                        <div className="text-3xl font-bold text-purple-400">87.2%</div>
                                        <div className="text-sm text-gray-400">만족도</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
