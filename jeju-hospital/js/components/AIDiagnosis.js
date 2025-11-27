const AIDiagnosis = () => {
    const [symptoms, setSymptoms] = React.useState('');
    const [center, setCenter] = React.useState('jeju_main');
    const [vitals, setVitals] = React.useState({temp:'36.5',bp:'120/80',pulse:'72',o2:'98'});
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [statusMsg, setStatusMsg] = React.useState('');
    
    const centers = [
        {id:'jeju_main',name:'제주보건소'},
        {id:'jeju_west',name:'서부보건소(제주)'},
        {id:'jeju_east',name:'동부보건소(제주)'},
        {id:'seogwipo_east',name:'동부보건소(서귀포)'},
        {id:'seogwipo_west',name:'서부보건소(서귀포)'}
    ];
    
    const suggestions = ['두통이 있고 어지러워요','기침과 가래가 나와요','복통과 소화불량','허리와 무릎이 아파요','피부에 발진이 생겼어요'];
    
    const statusMessages = [
        '🔍 증상 정보 분석 중...',
        '💉 바이탈 사인 검토 중...',
        '🧬 5차원 건강 지표 계산 중...',
        '🏥 적합한 진료과 탐색 중...',
        '🤖 AI 진단 소견 생성 중...',
        '✅ 최종 진단 결과 정리 중...'
    ];
    
    const runDiagnosis = async () => {
        if (!symptoms.trim()) return;
        setLoading(true);
        setProgress(0);
        setStatusMsg(statusMessages[0]);
        setResult(null);
        
        let msgIndex = 0;
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const increment = Math.random() * 12 + 5;
                return Math.min(prev + increment, 92);
            });
            msgIndex = Math.min(msgIndex + 1, statusMessages.length - 1);
            setStatusMsg(statusMessages[msgIndex]);
        }, 2500);
        
        try {
            const res = await fetch('/api/jeju-hospital/ai-diagnosis', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    symptoms,
                    health_center: center,
                    vital_signs: vitals
                })
            });
            const data = await res.json();
            
            clearInterval(progressInterval);
            setProgress(100);
            setStatusMsg('✅ 진단 완료!');
            
            setTimeout(() => {
                setResult(data);
                setLoading(false);
                setProgress(0);
            }, 600);
        } catch(e) {
            clearInterval(progressInterval);
            console.error(e);
            setLoading(false);
            setProgress(0);
        }
    };
    
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        <i className="fas fa-robot mr-3 text-purple-400"></i>AI 1차 진단
                    </h2>
                    <p className="text-gray-400">보건소에서 AI가 증상 분석 후 전문의 추천 | Claude API 연동</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* 입력 폼 */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold text-purple-400 mb-4">
                            <i className="fas fa-stethoscope mr-2"></i>증상 입력
                        </h3>
                        
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">방문 보건소</label>
                            <select 
                                value={center} 
                                onChange={e => setCenter(e.target.value)} 
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3"
                            >
                                {centers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">바이탈 사인</label>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-gray-800 p-3 rounded">
                                    <div className="text-xs text-gray-500">체온 (°C)</div>
                                    <input 
                                        value={vitals.temp} 
                                        onChange={e => setVitals({...vitals, temp: e.target.value})} 
                                        className="w-full bg-transparent text-lg text-red-400 font-bold outline-none"
                                    />
                                </div>
                                <div className="bg-gray-800 p-3 rounded">
                                    <div className="text-xs text-gray-500">혈압 (mmHg)</div>
                                    <input 
                                        value={vitals.bp} 
                                        onChange={e => setVitals({...vitals, bp: e.target.value})} 
                                        className="w-full bg-transparent text-lg text-blue-400 font-bold outline-none"
                                    />
                                </div>
                                <div className="bg-gray-800 p-3 rounded">
                                    <div className="text-xs text-gray-500">맥박 (bpm)</div>
                                    <input 
                                        value={vitals.pulse} 
                                        onChange={e => setVitals({...vitals, pulse: e.target.value})} 
                                        className="w-full bg-transparent text-lg text-green-400 font-bold outline-none"
                                    />
                                </div>
                                <div className="bg-gray-800 p-3 rounded">
                                    <div className="text-xs text-gray-500">산소포화도 (%)</div>
                                    <input 
                                        value={vitals.o2} 
                                        onChange={e => setVitals({...vitals, o2: e.target.value})} 
                                        className="w-full bg-transparent text-lg text-cyan-400 font-bold outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="text-sm text-gray-400 block mb-2">증상 설명</label>
                            <textarea 
                                value={symptoms} 
                                onChange={e => setSymptoms(e.target.value)} 
                                placeholder="증상을 자세히 설명하세요..." 
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 h-24 resize-none"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {suggestions.map((s, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setSymptoms(s)} 
                                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <button 
                            onClick={runDiagnosis} 
                            disabled={loading || !symptoms.trim()} 
                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg font-bold text-lg transition-colors"
                        >
                            {loading ? (
                                <span><i className="fas fa-spinner fa-spin mr-2"></i>AI 분석 중...</span>
                            ) : (
                                <span><i className="fas fa-search-plus mr-2"></i>AI 진단 시작</span>
                            )}
                        </button>
                        
                        {/* 진행 표시 */}
                        {loading && (
                            <div className="mt-4 bg-gray-800 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                        <i className="fas fa-robot"></i>
                                    </div>
                                    <span className="text-purple-400 font-medium">{statusMsg}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                                    <div 
                                        className="bg-gradient-to-r from-purple-500 to-cyan-400 h-3 rounded-full transition-all duration-500"
                                        style={{width: `${progress}%`}}
                                    ></div>
                                </div>
                                <div className="text-xs text-gray-400 text-right">{Math.round(progress)}%</div>
                            </div>
                        )}
                    </div>
                    
                    {/* 진단 결과 */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold text-green-400 mb-4">
                            <i className="fas fa-clipboard-check mr-2"></i>AI 진단 결과
                        </h3>
                        
                        {result?.diagnosis ? (
                            <div className="space-y-4">
                                {/* 진단 ID */}
                                <div className="bg-gray-800 p-3 rounded flex justify-between items-center">
                                    <span className="text-gray-400">진단 ID</span>
                                    <span className="font-mono text-cyan-400 text-sm">{result.diagnosis.id}</span>
                                </div>
                                
                                {/* AI Agent 정보 */}
                                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                            <i className="fas fa-robot text-xl"></i>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold">{result.diagnosis.ai_agent?.name}</div>
                                            <div className="text-xs text-gray-400">정확도 {result.diagnosis.ai_agent?.accuracy}%</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-400">{result.diagnosis.ai_agent?.confidence}%</div>
                                            <div className="text-xs text-gray-400">신뢰도</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* AI 분석 소견 */}
                                {result.diagnosis.ai_analysis && (
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400 mb-2">
                                            <i className="fas fa-brain mr-1"></i>AI 분석 소견
                                        </div>
                                        <p className="text-sm leading-relaxed">{result.diagnosis.ai_analysis}</p>
                                    </div>
                                )}
                                
                                {/* 5차원 건강 점수 */}
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-400">5차원 건강 점수</span>
                                        <span className="text-2xl font-bold text-blue-400">{result.diagnosis.total_health_score}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all" 
                                            style={{width: `${result.diagnosis.total_health_score}%`}}
                                        ></div>
                                    </div>
                                    {result.diagnosis.dimension_scores && (
                                        <div className="grid grid-cols-5 gap-1 text-xs">
                                            <div className="text-center"><div className="text-red-400">{result.diagnosis.dimension_scores.physiological}</div><div className="text-gray-500">생리</div></div>
                                            <div className="text-center"><div className="text-purple-400">{result.diagnosis.dimension_scores.genetic}</div><div className="text-gray-500">유전</div></div>
                                            <div className="text-center"><div className="text-green-400">{result.diagnosis.dimension_scores.environmental}</div><div className="text-gray-500">환경</div></div>
                                            <div className="text-center"><div className="text-blue-400">{result.diagnosis.dimension_scores.psychological}</div><div className="text-gray-500">심리</div></div>
                                            <div className="text-center"><div className="text-yellow-400">{result.diagnosis.dimension_scores.age}</div><div className="text-gray-500">연령</div></div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* 예상 질환 */}
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-2">예상 질환</div>
                                    {result.diagnosis.possible_conditions?.map((c, i) => (
                                        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                                            <span className={i === 0 ? 'font-bold text-yellow-400' : 'text-gray-300'}>{c.condition}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 bg-gray-700 rounded-full h-2">
                                                    <div className={`h-2 rounded-full ${i === 0 ? 'bg-yellow-500' : 'bg-gray-500'}`} style={{width: `${c.probability}%`}}></div>
                                                </div>
                                                <span className="text-sm w-12 text-right">{c.probability}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* 긴급도 및 추천 */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`p-3 rounded-lg text-center ${
                                        result.diagnosis.urgency === '긴급' ? 'bg-red-900/50 border border-red-500' :
                                        result.diagnosis.urgency === '우선' ? 'bg-yellow-900/50 border border-yellow-500' :
                                        'bg-green-900/50 border border-green-500'
                                    }`}>
                                        <div className="text-xs text-gray-400 mb-1">긴급도</div>
                                        <div className="font-bold text-lg">{result.diagnosis.urgency}</div>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded-lg text-center">
                                        <div className="text-xs text-gray-400 mb-1">추천 진료과</div>
                                        <div className="font-bold text-blue-400">{result.diagnosis.recommended_departments?.join(', ')}</div>
                                    </div>
                                </div>
                                
                                {/* 조언 */}
                                {result.diagnosis.advice && (
                                    <div className="bg-cyan-900/30 p-3 rounded-lg border border-cyan-500/30">
                                        <div className="text-sm">
                                            <i className="fas fa-lightbulb text-cyan-400 mr-2"></i>
                                            {result.diagnosis.advice}
                                        </div>
                                    </div>
                                )}
                                
                                {/* 오픈해시 기록 */}
                                <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                                    <div className="flex items-center gap-2 text-sm text-blue-400">
                                        <i className="fas fa-link"></i>
                                        <span>오픈해시 기록: {result.openhash?.layer} | 신뢰도 {result.openhash?.trust_score}%</span>
                                    </div>
                                    <div className="font-mono text-xs text-gray-500 mt-1 truncate">{result.openhash?.hash}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <i className="fas fa-notes-medical text-5xl mb-4 opacity-50"></i>
                                <p className="text-lg">증상을 입력하고 AI 진단을 시작하세요</p>
                                <p className="text-sm mt-2">Claude AI가 5차원 건강 분석과 함께<br/>전문의 추천을 제공합니다</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
