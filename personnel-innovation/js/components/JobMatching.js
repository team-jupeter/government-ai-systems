const JobMatching = () => {
    const [matches, setMatches] = React.useState([]);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [analysisStep, setAnalysisStep] = React.useState(0);
    const [analysisComplete, setAnalysisComplete] = React.useState(false);
    const [selectedMatch, setSelectedMatch] = React.useState(null);

    const RechartsLib = window.Recharts || {};
    const { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } = RechartsLib;

    const analysisSteps = [
        { icon: 'fa-vault', text: '개인정보금고(PDV)에서 이력, 경력, 학력, 자격 정보를 읽고 있습니다...', color: 'text-blue-400' },
        { icon: 'fa-chart-line', text: '산업 동향 분석 보고서를 읽고 있습니다...', color: 'text-green-400' },
        { icon: 'fa-search', text: '적합한 직업군과 업무를 찾고 있습니다...', color: 'text-purple-400' },
        { icon: 'fa-calculator', text: '사회 총생산과 개인의 직무 만족 간 내쉬 균형을 계산 중입니다...', color: 'text-yellow-400' },
        { icon: 'fa-check-circle', text: '적합한 직업을 제시합니다.', color: 'text-green-400' }
    ];

    const generateMatches = () => {
        return [
            { 
                rank: 1,
                title: 'AI 솔루션 아키텍트', 
                company: '네이버클라우드', 
                salary: '1.2억 ~ 1.5억원',
                match: 96.8,
                skillMatch: 94.2,
                aptitudeMatch: 98.5,
                growthPotential: '매우 높음',
                nashScore: 94.5,
                reasons: ['기술적성 최상위', '논리력 98점', 'AI/ML 경험 5년+'],
                badge: '최적 추천'
            },
            { 
                rank: 2,
                title: '시니어 백엔드 개발자', 
                company: '카카오', 
                salary: '9,500만 ~ 1.2억원',
                match: 93.2,
                skillMatch: 95.8,
                aptitudeMatch: 89.5,
                growthPotential: '높음',
                nashScore: 91.2,
                reasons: ['개발 경력 7년', '시스템 설계 역량', '협업 능력 우수'],
                badge: null
            },
            { 
                rank: 3,
                title: '테크 리드', 
                company: 'SK텔레콤', 
                salary: '1.0억 ~ 1.3억원',
                match: 91.5,
                skillMatch: 88.2,
                aptitudeMatch: 95.1,
                growthPotential: '높음',
                nashScore: 89.8,
                reasons: ['리더십 적성 높음', '커뮤니케이션 능력', '전략적 사고'],
                badge: null
            },
            { 
                rank: 4,
                title: '프로덕트 매니저', 
                company: '쿠팡', 
                salary: '8,500만 ~ 1.1억원',
                match: 87.3,
                skillMatch: 82.5,
                aptitudeMatch: 92.8,
                growthPotential: '매우 높음',
                nashScore: 86.5,
                reasons: ['비즈니스 이해도', '사용자 중심 사고', '데이터 분석력'],
                badge: '성장 잠재력'
            },
            { 
                rank: 5,
                title: '클라우드 아키텍트', 
                company: 'AWS코리아', 
                salary: '1.3억 ~ 1.6억원',
                match: 85.8,
                skillMatch: 90.2,
                aptitudeMatch: 80.5,
                growthPotential: '높음',
                nashScore: 84.2,
                reasons: ['클라우드 인프라 경험', 'DevOps 역량', '글로벌 환경 적응'],
                badge: '고연봉'
            }
        ];
    };

    const runAnalysis = () => {
        setIsAnalyzing(true);
        setAnalysisStep(0);
        setAnalysisComplete(false);
        setMatches([]);
        setSelectedMatch(null);

        // 각 단계를 2.5초 간격으로 진행
        const stepDuration = 2500;
        
        analysisSteps.forEach((_, index) => {
            setTimeout(() => {
                setAnalysisStep(index + 1);
                
                // 마지막 단계에서 분석 완료 처리
                if (index === analysisSteps.length - 1) {
                    setTimeout(() => {
                        setIsAnalyzing(false);
                        setAnalysisComplete(true);
                        setMatches(generateMatches());
                    }, 1500);
                }
            }, stepDuration * (index + 1));
        });
    };

    const skillMatchData = [
        { skill: '프로그래밍', current: 92, required: 85 },
        { skill: '문제해결', current: 88, required: 90 },
        { skill: '커뮤니케이션', current: 75, required: 80 },
        { skill: '프로젝트관리', current: 70, required: 75 },
        { skill: '데이터분석', current: 85, required: 80 }
    ];

    const radarData = [
        { subject: '창의성', A: 85, B: 80 },
        { subject: '논리력', A: 98, B: 88 },
        { subject: '대인관계', A: 75, B: 82 },
        { subject: '기술적성', A: 95, B: 85 },
        { subject: '언어능력', A: 78, B: 75 },
        { subject: '리더십', A: 72, B: 78 }
    ];

    const formatNumber = (num) => num.toLocaleString();

    const getRankStyle = (rank) => {
        switch(rank) {
            case 1: return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black';
            case 2: return 'bg-gradient-to-r from-slate-400 to-slate-500 text-black';
            case 3: return 'bg-gradient-to-r from-amber-700 to-amber-800 text-white';
            default: return 'bg-slate-600 text-white';
        }
    };

    const getMatchColor = (score) => {
        if (score >= 95) return 'text-green-400';
        if (score >= 90) return 'text-blue-400';
        if (score >= 85) return 'text-yellow-400';
        return 'text-slate-400';
    };

    return (
        <div className="space-y-6">
            {/* 상단 안내 */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-brain text-3xl text-purple-400"></i>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">AI 기반 직업 매칭</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            개인의 <span className="text-purple-400 font-medium">능력(창의성, 논리력, 대인관계, 기술적성, 언어능력)</span>과 
                            <span className="text-blue-400 font-medium"> 적성</span>을 AI가 분석하여 최적의 직업과 업무를 추천합니다. 
                            Nash 균형 기반 Multi-Agent 시스템이 개인 만족도와 국가 경제 성장을 동시에 고려합니다.
                        </p>
                        <button
                            onClick={runAnalysis}
                            disabled={isAnalyzing}
                            className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all ${
                                isAnalyzing
                                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                        >
                            {isAnalyzing ? (
                                <React.Fragment>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    <span>분석 중...</span>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <i className="fas fa-search"></i>
                                    <span>나의 적합 직업 찾기</span>
                                </React.Fragment>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 분석 진행 상태 */}
            {isAnalyzing && (
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">🔍 AI 분석 진행 중</h3>
                    <div className="space-y-4">
                        {analysisSteps.map((step, index) => {
                            const isActive = analysisStep === index + 1;
                            const isCompleted = analysisStep > index + 1;
                            const isPending = analysisStep < index + 1;
                            
                            return (
                                <div 
                                    key={index}
                                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                                        isActive ? 'bg-slate-700 border border-blue-500/50' :
                                        isCompleted ? 'bg-slate-700/50' :
                                        'bg-slate-800/50 opacity-50'
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                        isActive ? 'bg-blue-500/30 animate-pulse' :
                                        isCompleted ? 'bg-green-500/30' :
                                        'bg-slate-700'
                                    }`}>
                                        {isCompleted ? (
                                            <i className="fas fa-check text-green-400 text-xl"></i>
                                        ) : isActive ? (
                                            <i className={`fas ${step.icon} ${step.color} text-xl animate-pulse`}></i>
                                        ) : (
                                            <i className={`fas ${step.icon} text-slate-500 text-xl`}></i>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium ${
                                            isActive ? 'text-white' :
                                            isCompleted ? 'text-slate-400' :
                                            'text-slate-500'
                                        }`}>
                                            {step.text}
                                        </p>
                                        {isActive && (
                                            <div className="mt-2 h-1 bg-slate-600 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-sm">
                                        {isCompleted && <span className="text-green-400">완료</span>}
                                        {isActive && <span className="text-blue-400">진행 중</span>}
                                        {isPending && <span className="text-slate-500">대기</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* 진행률 표시 */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">전체 진행률</span>
                            <span className="text-blue-400">{Math.round((analysisStep / analysisSteps.length) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${(analysisStep / analysisSteps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* 분석 완료 - 결과 표시 */}
            {analysisComplete && matches.length > 0 && (
                <React.Fragment>
                    {/* 완료 배너 */}
                    <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-4 border border-green-500/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                                <i className="fas fa-check-circle text-green-400 text-xl"></i>
                            </div>
                            <div>
                                <p className="text-green-400 font-medium">AI 분석이 완료되었습니다</p>
                                <p className="text-slate-400 text-sm">귀하에게 최적화된 {matches.length}개의 직업을 찾았습니다</p>
                            </div>
                        </div>
                    </div>

                    {/* 통계 카드 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-slate-800 rounded-xl p-5">
                            <p className="text-slate-400 text-sm">분석된 직업군</p>
                            <p className="text-2xl font-bold text-blue-400 mt-1">1,247개</p>
                            <p className="text-xs text-slate-500 mt-1">전체 직업 DB</p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-5">
                            <p className="text-slate-400 text-sm">최고 매칭률</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">{matches[0].match}%</p>
                            <p className="text-xs text-slate-500 mt-1">{matches[0].title}</p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-5">
                            <p className="text-slate-400 text-sm">Nash 균형 점수</p>
                            <p className="text-2xl font-bold text-purple-400 mt-1">{matches[0].nashScore}점</p>
                            <p className="text-xs text-slate-500 mt-1">개인-사회 최적점</p>
                        </div>
                        <div className="bg-slate-800 rounded-xl p-5">
                            <p className="text-slate-400 text-sm">예상 연봉 범위</p>
                            <p className="text-2xl font-bold text-yellow-400 mt-1">1.0~1.5억</p>
                            <p className="text-xs text-slate-500 mt-1">상위 매칭 기준</p>
                        </div>
                    </div>

                    {/* 추천 직업 목록 */}
                    <div className="bg-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">🎯 AI 추천 직업 순위</h3>
                        <div className="space-y-4">
                            {matches.map((match) => (
                                <div
                                    key={match.rank}
                                    onClick={() => setSelectedMatch(match)}
                                    className={`p-5 rounded-xl cursor-pointer transition-all ${
                                        selectedMatch?.rank === match.rank
                                            ? 'bg-blue-600/20 border-2 border-blue-500'
                                            : 'bg-slate-700/50 border-2 border-transparent hover:border-slate-600'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* 순위 */}
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${getRankStyle(match.rank)}`}>
                                            {match.rank}
                                        </div>
                                        
                                        {/* 직업 정보 */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-lg font-bold text-white">{match.title}</h4>
                                                {match.badge && (
                                                    <span className={`px-2 py-0.5 rounded text-xs ${
                                                        match.badge === '최적 추천' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        match.badge === '성장 잠재력' ? 'bg-green-500/20 text-green-400' :
                                                        match.badge === '고연봉' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-slate-500/20 text-slate-400'
                                                    }`}>
                                                        {match.badge === '최적 추천' && <i className="fas fa-crown mr-1"></i>}
                                                        {match.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-slate-400 text-sm mb-2">{match.company} | {match.salary}</p>
                                            
                                            {/* 추천 이유 */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {match.reasons.map((reason, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-slate-600/50 rounded text-xs text-slate-300">
                                                        {reason}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            {/* 점수 바 */}
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-slate-400">능력 매칭</span>
                                                        <span className="text-blue-400">{match.skillMatch}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-slate-600 rounded-full">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: match.skillMatch + '%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-slate-400">적성 매칭</span>
                                                        <span className="text-purple-400">{match.aptitudeMatch}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-slate-600 rounded-full">
                                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: match.aptitudeMatch + '%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-slate-400">Nash 균형</span>
                                                        <span className="text-green-400">{match.nashScore}점</span>
                                                    </div>
                                                    <div className="h-1.5 bg-slate-600 rounded-full">
                                                        <div className="h-full bg-green-500 rounded-full" style={{ width: match.nashScore + '%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* 종합 매칭률 */}
                                        <div className="text-right">
                                            <p className={`text-3xl font-bold ${getMatchColor(match.match)}`}>
                                                {match.match}%
                                            </p>
                                            <p className="text-xs text-slate-400">종합 매칭률</p>
                                            <p className="text-sm text-slate-400 mt-2">
                                                성장 잠재력: <span className="text-white">{match.growthPotential}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 차트 영역 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 능력-적성 레이더 */}
                        <div className="bg-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">능력-적성 분석 결과</h3>
                            {RadarChart ? (
                                <ResponsiveContainer width="100%" height={280}>
                                    <RadarChart data={radarData}>
                                        <PolarGrid stroke="#334155" />
                                        <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                                        <Radar name="나의 능력" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                                        <Radar name="1순위 요구" dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                            )}
                            <div className="flex justify-center gap-6 mt-2">
                                <span className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 bg-purple-500 rounded"></span>
                                    <span className="text-slate-400">나의 능력</span>
                                </span>
                                <span className="flex items-center gap-2 text-sm">
                                    <span className="w-3 h-3 bg-green-500 rounded"></span>
                                    <span className="text-slate-400">1순위 직업 요구</span>
                                </span>
                            </div>
                        </div>

                        {/* 스킬 갭 분석 */}
                        <div className="bg-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">스킬 갭 분석</h3>
                            {BarChart ? (
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={skillMatchData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis type="number" stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                                        <YAxis type="category" dataKey="skill" stroke="#94a3b8" fontSize={11} width={80} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                                        <Bar dataKey="current" fill="#3b82f6" name="현재 수준" radius={[0, 4, 4, 0]} />
                                        <Bar dataKey="required" fill="#22c55e" name="요구 수준" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>
                            )}
                        </div>
                    </div>

                    {/* 다음 단계 안내 */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">📋 다음 단계</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg text-left hover:bg-blue-600/30 transition-all">
                                <i className="fas fa-file-alt text-blue-400 text-xl mb-2"></i>
                                <p className="text-white font-medium">상세 리포트 받기</p>
                                <p className="text-xs text-slate-400">분석 결과 PDF 다운로드</p>
                            </button>
                            <button className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-left hover:bg-green-600/30 transition-all">
                                <i className="fas fa-paper-plane text-green-400 text-xl mb-2"></i>
                                <p className="text-white font-medium">지원서 자동 작성</p>
                                <p className="text-xs text-slate-400">AI가 맞춤 지원서 생성</p>
                            </button>
                            <button className="p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg text-left hover:bg-purple-600/30 transition-all">
                                <i className="fas fa-graduation-cap text-purple-400 text-xl mb-2"></i>
                                <p className="text-white font-medium">스킬 개발 계획</p>
                                <p className="text-xs text-slate-400">부족한 역량 보완 가이드</p>
                            </button>
                        </div>
                    </div>
                </React.Fragment>
            )}

            {/* 초기 상태 - 통계 카드 */}
            {!isAnalyzing && !analysisComplete && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800 rounded-xl p-5">
                        <p className="text-slate-400 text-sm">오늘 매칭 완료</p>
                        <p className="text-2xl font-bold text-green-400 mt-1">185,420</p>
                        <p className="text-xs text-slate-500 mt-1">건</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5">
                        <p className="text-slate-400 text-sm">평균 매칭률</p>
                        <p className="text-2xl font-bold text-blue-400 mt-1">92.4%</p>
                        <p className="text-xs text-slate-500 mt-1">능력-적성 일치도</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5">
                        <p className="text-slate-400 text-sm">취업 성공률</p>
                        <p className="text-2xl font-bold text-purple-400 mt-1">78.5%</p>
                        <p className="text-xs text-slate-500 mt-1">매칭 후 3개월 내</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-5">
                        <p className="text-slate-400 text-sm">만족도</p>
                        <p className="text-2xl font-bold text-yellow-400 mt-1">4.5/5</p>
                        <p className="text-xs text-slate-500 mt-1">취업자 평점</p>
                    </div>
                </div>
            )}
        </div>
    );
};
