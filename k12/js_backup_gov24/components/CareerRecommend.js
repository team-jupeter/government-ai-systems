const CareerRecommend = () => {
    const [selectedCareer, setSelectedCareer] = React.useState(null);
    
    const careers = [
        { id: 1, name: 'AI 연구원', icon: '🤖', demand: 98, salary: '8,500만원', growth: '+45%',
          skills: ['Python', 'TensorFlow', '선형대수', '확률통계'], education: '석사 이상',
          subjects: ['수학', '코딩', '물리'], aiReplace: '5%', humanValue: '창의적 연구' },
        { id: 2, name: '데이터 과학자', icon: '📊', demand: 95, salary: '7,800만원', growth: '+38%',
          skills: ['Python', 'SQL', '머신러닝', '시각화'], education: '학사 이상',
          subjects: ['수학', '코딩', '통계'], aiReplace: '12%', humanValue: '인사이트 도출' },
        { id: 3, name: '바이오 엔지니어', icon: '🧬', demand: 88, salary: '7,200만원', growth: '+32%',
          skills: ['분자생물학', 'CRISPR', '바이오인포매틱스'], education: '석사 이상',
          subjects: ['생물', '화학', '코딩'], aiReplace: '8%', humanValue: '실험 설계' },
        { id: 4, name: '사이버보안 전문가', icon: '🔒', demand: 92, salary: '8,000만원', growth: '+40%',
          skills: ['네트워크', '암호학', '침투테스트'], education: '학사 이상',
          subjects: ['코딩', '수학', '물리'], aiReplace: '15%', humanValue: '위협 분석' },
        { id: 5, name: 'UX 디자이너', icon: '🎨', demand: 85, salary: '6,500만원', growth: '+28%',
          skills: ['Figma', '사용자연구', '프로토타이핑'], education: '학사',
          subjects: ['미술', '심리', '코딩'], aiReplace: '22%', humanValue: '감성 설계' },
        { id: 6, name: '로봇공학자', icon: '🦾', demand: 82, salary: '7,500만원', growth: '+35%',
          skills: ['기계공학', 'ROS', '제어이론'], education: '석사 이상',
          subjects: ['물리', '수학', '코딩'], aiReplace: '10%', humanValue: '창의적 설계' }
    ];
    
    return (
        <section className="py-12 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2"><i className="fas fa-rocket mr-3 text-yellow-400"></i>AI 추천 미래 직업</h2>
                    <p className="text-gray-400">미래 산업 동향 + 개인 적성 + 사회 수요를 종합 분석</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                    {careers.map(career => (
                        <div key={career.id} onClick={() => setSelectedCareer(selectedCareer?.id === career.id ? null : career)}
                            className={`bg-gray-900 rounded-xl p-5 border-2 cursor-pointer transition-all card-hover ${selectedCareer?.id === career.id ? 'border-yellow-500' : 'border-gray-700 hover:border-gray-600'}`}>
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{career.icon}</span>
                                    <div>
                                        <h3 className="font-bold">{career.name}</h3>
                                        <div className="text-sm text-gray-400">{career.education}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-green-400 font-bold">{career.growth}</div>
                                    <div className="text-xs text-gray-500">성장률</div>
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">수요</span>
                                    <span className="text-cyan-400">{career.demand}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-cyan-500 h-2 rounded-full" style={{width: `${career.demand}%`}}></div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">평균 연봉</span>
                                <span className="text-yellow-400 font-bold">{career.salary}</span>
                            </div>
                            
                            {selectedCareer?.id === career.id && (
                                <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">필요 역량</div>
                                        <div className="flex flex-wrap gap-1">
                                            {career.skills.map((skill, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">관련 과목</div>
                                        <div className="flex flex-wrap gap-1">
                                            {career.subjects.map((subj, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded">{subj}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-gray-800 p-2 rounded">
                                            <div className="text-xs text-gray-500">AI 대체율</div>
                                            <div className="text-red-400 font-bold">{career.aiReplace}</div>
                                        </div>
                                        <div className="bg-gray-800 p-2 rounded">
                                            <div className="text-xs text-gray-500">인간 고유 가치</div>
                                            <div className="text-purple-400 font-bold text-sm">{career.humanValue}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
