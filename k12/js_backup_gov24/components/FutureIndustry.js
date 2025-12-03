const FutureIndustry = () => {
    const [industries, setIndustries] = React.useState([
        { year: 2025, industry: "AI/ML 엔지니어링", growth: 45, demand: "매우 높음", skills: ["Python", "딥러닝", "데이터분석"], color: "cyan" },
        { year: 2025, industry: "사이버보안", growth: 40, demand: "매우 높음", skills: ["네트워크", "암호학", "침투테스트"], color: "red" },
        { year: 2026, industry: "바이오테크", growth: 32, demand: "높음", skills: ["분자생물학", "CRISPR", "바이오인포매틱스"], color: "green" },
        { year: 2027, industry: "양자컴퓨팅", growth: 38, demand: "높음", skills: ["양자역학", "선형대수", "Qiskit"], color: "purple" },
        { year: 2028, industry: "우주항공", growth: 28, demand: "중상", skills: ["항공역학", "재료공학", "시뮬레이션"], color: "blue" },
        { year: 2030, industry: "뇌-컴퓨터 인터페이스", growth: 50, demand: "매우 높음", skills: ["신경과학", "신호처리", "AI"], color: "pink" }
    ]);
    
    const [updateTime, setUpdateTime] = React.useState(new Date().toLocaleString('ko-KR'));
    
    return (
        <section className="py-12 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold"><i className="fas fa-chart-line mr-3 text-cyan-400"></i>미래 산업 동향 분석</h2>
                        <p className="text-gray-400 text-sm mt-1">AI가 주기적으로 분석하여 교과과정에 즉시 반영</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500">마지막 업데이트</div>
                        <div className="text-sm text-cyan-400">{updateTime}</div>
                    </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                    {industries.map((ind, i) => (
                        <div key={i} className={`bg-gray-900 rounded-xl p-5 border border-${ind.color}-500/30 card-hover transition-all`}>
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className={`px-2 py-0.5 bg-${ind.color}-600/30 text-${ind.color}-400 rounded text-xs`}>{ind.year}년</span>
                                    <h3 className="font-bold text-lg mt-2">{ind.industry}</h3>
                                </div>
                                <div className={`text-2xl font-bold text-${ind.color}-400`}>+{ind.growth}%</div>
                            </div>
                            
                            <div className="mb-3">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">성장률</span>
                                    <span className={`text-${ind.color}-400`}>{ind.growth}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className={`bg-${ind.color}-500 h-2 rounded-full transition-all`} style={{width: `${ind.growth}%`}}></div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-gray-500">수요:</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${ind.demand === '매우 높음' ? 'bg-red-600/30 text-red-400' : 'bg-yellow-600/30 text-yellow-400'}`}>{ind.demand}</span>
                            </div>
                            
                            <div>
                                <div className="text-xs text-gray-500 mb-2">필요 역량</div>
                                <div className="flex flex-wrap gap-1">
                                    {ind.skills.map((skill, j) => (
                                        <span key={j} className="text-xs px-2 py-1 bg-gray-800 rounded">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
                    <div className="flex items-center gap-3">
                        <i className="fas fa-sync-alt text-blue-400"></i>
                        <div>
                            <div className="font-bold text-blue-400">실시간 교과과정 반영</div>
                            <div className="text-sm text-gray-400">미래 산업 동향이 변경되면 24시간 내 초중고 교과과정에 자동 반영됩니다</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
