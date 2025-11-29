const CareerRecommendation = () => {
    const [careerPaths, setCareerPaths] = React.useState([]);
    const [selectedPath, setSelectedPath] = React.useState(null);

    React.useEffect(() => {
        const paths = [
            {
                id: 1,
                path: '시니어 개발자 → 테크 리드 → CTO',
                probability: 78.5,
                timeEstimate: '3-5년',
                requiredSkills: ['리더십', '아키텍처 설계', '팀 관리', '전략적 사고'],
                salaryGrowth: '+120%',
                aiConfidence: 92.3
            },
            {
                id: 2,
                path: '전문가 트랙 → 기술 고문',
                probability: 65.2,
                timeEstimate: '5-7년',
                requiredSkills: ['심화 기술', '멘토링', '기술 문서화', '컨설팅'],
                salaryGrowth: '+85%',
                aiConfidence: 88.7
            },
            {
                id: 3,
                path: 'PM 전환 → 프로덕트 디렉터',
                probability: 58.8,
                timeEstimate: '4-6년',
                requiredSkills: ['프로젝트 관리', '커뮤니케이션', '비즈니스 분석', '고객 이해'],
                salaryGrowth: '+95%',
                aiConfidence: 85.1
            },
            {
                id: 4,
                path: '창업 → 1인 법인 대표',
                probability: 45.3,
                timeEstimate: '2-4년',
                requiredSkills: ['비즈니스 모델링', '영업', '재무 관리', '네트워킹'],
                salaryGrowth: '+200%~',
                aiConfidence: 72.5
            }
        ];
        setCareerPaths(paths);
    }, []);

    const skillDevelopment = [
        { skill: '클라우드 아키텍처', current: 72, target: 90, priority: '높음' },
        { skill: '팀 리더십', current: 65, target: 85, priority: '높음' },
        { skill: '비즈니스 전략', current: 58, target: 80, priority: '중간' },
        { skill: '프레젠테이션', current: 70, target: 85, priority: '중간' },
        { skill: 'AI/ML 이해', current: 80, target: 90, priority: '낮음' }
    ];

    const recommendedCourses = [
        { title: 'AWS 솔루션 아키텍트', provider: 'AWS', duration: '3개월', match: 95 },
        { title: '테크 리더십 마스터', provider: 'Coursera', duration: '2개월', match: 92 },
        { title: '비즈니스 전략 기초', provider: 'edX', duration: '6주', match: 88 },
        { title: '효과적인 커뮤니케이션', provider: '패스트캠퍼스', duration: '4주', match: 85 }
    ];

    return (
        <div className="space-y-6">
            {/* 상단 안내 */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border border-cyan-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-route text-3xl text-cyan-400"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">AI 기반 경력 개발 추천</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            현재 역량과 적성을 분석하여 최적의 경력 개발 경로를 제안합니다.
                            AI가 시장 트렌드, 급여 전망, 개인 성향을 종합적으로 고려합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 추천 경력 경로 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🎯 추천 경력 경로</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {careerPaths.map((path) => (
                        <div
                            key={path.id}
                            onClick={() => setSelectedPath(path)}
                            className={`p-4 rounded-xl cursor-pointer transition-all ${
                                selectedPath?.id === path.id
                                    ? 'bg-blue-600/30 border-2 border-blue-500'
                                    : 'bg-slate-700/50 border-2 border-transparent hover:border-slate-600'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <p className="font-medium text-white">{path.path}</p>
                                    <p className="text-xs text-slate-400 mt-1">예상 소요: {path.timeEstimate}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-bold ${
                                        path.probability >= 70 ? 'text-green-400' :
                                        path.probability >= 50 ? 'text-blue-400' : 'text-yellow-400'
                                    }`}>
                                        {path.probability}%
                                    </p>
                                    <p className="text-xs text-slate-400">성공 확률</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-green-400">{path.salaryGrowth} 급여 성장</span>
                                <span className="text-xs text-purple-400">AI 신뢰도 {path.aiConfidence}%</span>
                            </div>
                            {path.id === 1 && (
                                <div className="mt-2 flex items-center gap-1">
                                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                                    <span className="text-yellow-400 text-xs">최적 추천</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 스킬 개발 필요 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">📈 스킬 개발 현황</h3>
                    <div className="space-y-4">
                        {skillDevelopment.map((skill) => (
                            <div key={skill.skill}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-300">{skill.skill}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-400">{skill.current} → {skill.target}</span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                                            skill.priority === '높음' ? 'bg-red-500/20 text-red-400' :
                                            skill.priority === '중간' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                            {skill.priority}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2 relative">
                                    <div className="absolute bg-blue-600 h-2 rounded-full" style={{ width: skill.current + '%' }}></div>
                                    <div className="absolute border-r-2 border-green-400 h-4 -top-1" style={{ left: skill.target + '%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 추천 교육 과정 */}
                <div className="bg-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">📚 추천 교육 과정</h3>
                    <div className="space-y-3">
                        {recommendedCourses.map((course, index) => (
                            <div key={index} className="p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-white">{course.title}</p>
                                        <p className="text-xs text-slate-400">{course.provider} | {course.duration}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-blue-400">{course.match}%</p>
                                        <p className="text-xs text-slate-400">적합도</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-all">
                        모든 추천 과정 보기
                    </button>
                </div>
            </div>
        </div>
    );
};
