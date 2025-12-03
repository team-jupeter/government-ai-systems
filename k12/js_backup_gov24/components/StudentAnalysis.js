const StudentAnalysis = () => {
    const [studentData, setStudentData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [chartType, setChartType] = React.useState('line');
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);
    
    const generateStudent = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/k12/student-analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            const data = await res.json();
            setStudentData(data);
        } catch (e) {
            // 시뮬레이션 데이터
            const subjects = ["국어", "영어", "수학", "과학", "사회", "코딩"];
            const scores = {};
            subjects.forEach(s => scores[s] = Math.floor(Math.random() * 40) + 60);
            
            const history = [];
            for (let i = 5; i >= 0; i--) {
                const monthScores = {};
                subjects.forEach(s => monthScores[s] = Math.max(50, Math.min(100, scores[s] + Math.floor(Math.random() * 20) - 10 + (5-i)*3)));
                history.push({ month: `${i+1}개월 전`, scores: monthScores });
            }
            history.reverse();
            
            setStudentData({
                student_id: 'STU-' + Math.floor(Math.random() * 90000 + 10000),
                current_scores: scores,
                score_history: history,
                aptitudes: {
                    "논리적 사고": Math.floor(Math.random() * 30) + 70,
                    "창의성": Math.floor(Math.random() * 40) + 60,
                    "언어 능력": Math.floor(Math.random() * 35) + 65,
                    "수리 능력": Math.floor(Math.random() * 40) + 60,
                    "공간 지각": Math.floor(Math.random() * 45) + 55,
                    "대인 관계": Math.floor(Math.random() * 35) + 65
                },
                recommended_careers: [
                    { career: "AI 연구원", match: Math.floor(Math.random() * 23) + 75, reason: "논리적 사고와 수리 능력 우수" },
                    { career: "데이터 과학자", match: Math.floor(Math.random() * 25) + 70, reason: "분석력과 코딩 능력 강점" },
                    { career: "바이오 엔지니어", match: Math.floor(Math.random() * 25) + 65, reason: "과학적 호기심과 창의성" }
                ].sort((a,b) => b.match - a.match),
                individual_utility: (Math.random() * 0.1 + 0.82).toFixed(3),
                social_utility: (Math.random() * 0.08 + 0.70).toFixed(3),
                balance_point: (Math.random() * 0.07 + 0.78).toFixed(3)
            });
        }
        setLoading(false);
    };
    
    // 차트 렌더링
    React.useEffect(() => {
        if (!studentData || !chartRef.current) return;
        
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        
        const ctx = chartRef.current.getContext('2d');
        const subjects = Object.keys(studentData.current_scores);
        const colors = ['#ef4444', '#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'];
        
        if (chartType === 'line') {
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: studentData.score_history.map(h => h.month),
                    datasets: subjects.map((subj, i) => ({
                        label: subj,
                        data: studentData.score_history.map(h => h.scores[subj]),
                        borderColor: colors[i],
                        backgroundColor: colors[i] + '20',
                        tension: 0.3,
                        fill: false
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#fff' } } },
                    scales: {
                        y: { min: 40, max: 100, ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
                        x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
                    }
                }
            });
        } else if (chartType === 'radar') {
            chartInstance.current = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: subjects,
                    datasets: [{
                        label: '현재 성적',
                        data: subjects.map(s => studentData.current_scores[s]),
                        borderColor: '#3b82f6',
                        backgroundColor: '#3b82f620',
                        pointBackgroundColor: '#3b82f6'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#fff' } } },
                    scales: {
                        r: {
                            min: 40, max: 100,
                            ticks: { color: '#9ca3af', backdropColor: 'transparent' },
                            grid: { color: '#374151' },
                            pointLabels: { color: '#fff' }
                        }
                    }
                }
            });
        } else if (chartType === 'bar') {
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: subjects,
                    datasets: [{
                        label: '현재 성적',
                        data: subjects.map(s => studentData.current_scores[s]),
                        backgroundColor: colors,
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { min: 0, max: 100, ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
                        x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
                    }
                }
            });
        }
        
        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, [studentData, chartType]);
    
    return (
        <section className="py-12 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2"><i className="fas fa-chart-bar mr-3 text-green-400"></i>학생 개별 분석</h2>
                    <p className="text-gray-400">AI가 학생 개개인의 성적, 적성, 능력을 종합 분석</p>
                </div>
                
                <div className="text-center mb-6">
                    <button onClick={generateStudent} disabled={loading}
                        className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 rounded-xl font-bold text-lg">
                        {loading ? <span><i className="fas fa-spinner fa-spin mr-2"></i>분석 중...</span> : <span><i className="fas fa-user-graduate mr-2"></i>학생 분석 시뮬레이션</span>}
                    </button>
                </div>
                
                {studentData && (
                    <div className="space-y-6">
                        {/* 학생 ID 및 효용 점수 */}
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <div className="text-sm text-gray-400">학생 ID</div>
                                    <div className="text-2xl font-bold text-cyan-400">{studentData.student_id}</div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">개인 효용</div>
                                        <div className="text-xl font-bold text-blue-400">{studentData.individual_utility}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">사회 효용</div>
                                        <div className="text-xl font-bold text-green-400">{studentData.social_utility}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">균형점</div>
                                        <div className="text-xl font-bold text-yellow-400">{studentData.balance_point}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* 성적 차트 */}
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg"><i className="fas fa-chart-line mr-2 text-blue-400"></i>성적 추이</h3>
                                <div className="flex gap-2">
                                    {[{id:'line', icon:'fa-chart-line', label:'추이'}, {id:'radar', icon:'fa-spider', label:'레이더'}, {id:'bar', icon:'fa-chart-bar', label:'막대'}].map(t => (
                                        <button key={t.id} onClick={() => setChartType(t.id)}
                                            className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${chartType === t.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                            <i className={`fas ${t.icon}`}></i>{t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{height: '300px'}}>
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>
                        
                        {/* 적성 분석 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                                <h3 className="font-bold text-lg mb-4"><i className="fas fa-brain mr-2 text-purple-400"></i>적성 분석</h3>
                                <div className="space-y-3">
                                    {Object.entries(studentData.aptitudes).map(([apt, score], i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{apt}</span>
                                                <span className={score >= 85 ? 'text-green-400' : score >= 70 ? 'text-yellow-400' : 'text-gray-400'}>{score}점</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div className={`h-2 rounded-full ${score >= 85 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-gray-500'}`} style={{width: `${score}%`}}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                                <h3 className="font-bold text-lg mb-4"><i className="fas fa-briefcase mr-2 text-yellow-400"></i>AI 추천 진로</h3>
                                <div className="space-y-3">
                                    {studentData.recommended_careers.map((career, i) => (
                                        <div key={i} className={`p-4 rounded-xl ${i === 0 ? 'bg-yellow-900/30 border border-yellow-500/30' : 'bg-gray-800'}`}>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-2">
                                                    {i === 0 && <span className="text-yellow-400">👑</span>}
                                                    <span className="font-bold">{career.career}</span>
                                                </div>
                                                <span className={`text-lg font-bold ${i === 0 ? 'text-yellow-400' : 'text-gray-400'}`}>{career.match}%</span>
                                            </div>
                                            <div className="text-sm text-gray-400">{career.reason}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
