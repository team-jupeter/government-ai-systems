const AIDoctorChat = ({ patientId }) => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [loadingStage, setLoadingStage] = React.useState(0);
    const [diagnosisResult, setDiagnosisResult] = React.useState(null);
    const [diagnosisLoading, setDiagnosisLoading] = React.useState(false);
    const [showRecommendation, setShowRecommendation] = React.useState(false);
    const [recommendationState, setRecommendationState] = React.useState(null);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    React.useEffect(() => scrollToBottom(), [messages]);

    // 분석 중 메시지 단계
    const analysisStages = [
        { icon: 'fa-folder-open', text: '개인정보금고(PDV)에서 병력 조회 중...', color: 'cyan' },
        { icon: 'fa-dna', text: '가족력 및 유전적 요인 분석 중...', color: 'purple' },
        { icon: 'fa-heartbeat', text: '현재 증상과 생체신호 분석 중...', color: 'red' },
        { icon: 'fa-brain', text: 'AI가 5차원 건강 분석 수행 중...', color: 'blue' },
        { icon: 'fa-notes-medical', text: '의학 데이터베이스와 비교 분석 중...', color: 'green' }
    ];

    // 사전 진단 분석 단계
    const diagnosisStages = [
        { icon: 'fa-clipboard-list', text: '증상 종합 정리 중...', color: 'blue' },
        { icon: 'fa-search-plus', text: '감별 진단 후보 분석 중...', color: 'cyan' },
        { icon: 'fa-hospital', text: '적합한 진료과 및 전문의 검색 중...', color: 'green' },
        { icon: 'fa-x-ray', text: '필요한 진단 장비 및 검사 확인 중...', color: 'purple' },
        { icon: 'fa-file-medical-alt', text: '사전 진단 보고서 작성 중...', color: 'yellow' }
    ];

    const exampleQuestions = [
        '며칠째 두통이 있어요',
        '목이 아프고 열이 나요',
        '소화가 잘 안되고 속이 더부룩해요',
        '허리가 아파서 움직이기 힘들어요'
    ];

    // 분석 단계 애니메이션
    React.useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setLoadingStage(prev => (prev + 1) % analysisStages.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [loading]);

    // 진단 분석 단계 애니메이션
    const [diagnosisStage, setDiagnosisStage] = React.useState(0);
    React.useEffect(() => {
        if (diagnosisLoading) {
            const interval = setInterval(() => {
                setDiagnosisStage(prev => (prev + 1) % diagnosisStages.length);
            }, 1800);
            return () => clearInterval(interval);
        }
    }, [diagnosisLoading]);

    const sendMessage = async (text) => {
        const message = text || input;
        if (!message.trim() || loading) return;
        
        setMessages(prev => [...prev, { role: 'user', content: message }]);
        setInput('');
        setLoading(true);
        setLoadingStage(0);

        try {
            const res = await fetch('/api/jeju-hospital/ai/doctor/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patient_id: patientId, message })
            });
            const data = await res.json();
            
            if (data.success) {
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: data.response,
                    agent: data.ai_agent,
                    openhash: data.openhash
                }]);
                
                // 상담 후 자동으로 사전 진단 시작
                setLoading(false);
                await autoStartDiagnosis(message);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.', error: true }]);
                setLoading(false);
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: '네트워크 오류가 발생했습니다.', error: true }]);
            setLoading(false);
        }
    };

    // 자동 사전 진단 시작
    const autoStartDiagnosis = async (latestSymptom) => {
        // 이미 진단 결과가 있으면 스킵
        if (diagnosisResult) return;
        
        // 충분한 대화가 있으면 자동 진단
        const userMessages = messages.filter(m => m.role === 'user');
        if (userMessages.length >= 0) {  // 첫 메시지부터 진단 시작
            setDiagnosisLoading(true);
            setDiagnosisStage(0);
            
            const allSymptoms = [...userMessages.map(m => m.content), latestSymptom].join('. ');
            
            try {
                const res = await fetch('/api/jeju-hospital/ai/doctor/pre-diagnosis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        patient_id: patientId, 
                        symptoms: allSymptoms, 
                        vital_signs: { temperature: 36.5, systolic: 120, diastolic: 80, pulse: 72, spo2: 98 } 
                    })
                });
                const data = await res.json();
                if (data.success) {
                    setDiagnosisResult(data);
                }
            } catch (e) {
                console.error(e);
            }
            setDiagnosisLoading(false);
        }
    };

    // 스마트 추천 시작
    const startSmartRecommendation = () => {
        if (!diagnosisResult) return;
        setShowRecommendation(true);
        setRecommendationState({
            step: 0,
            progress: 0,
            steps: [],
            recommendations: null,
            selectedHospital: null,
            bookingResult: null
        });
        runRecommendationProcess();
    };

    // 추천 프로세스 실행
    const runRecommendationProcess = async () => {
        const dept = diagnosisResult?.diagnosis?.recommended_department || '내과';
        const diagnosisId = diagnosisResult?.diagnosis_id;
        let currentData = {};

        const steps = [
            { name: 'PDV 주소 조회', icon: 'fa-shield-alt', color: 'cyan' },
            { name: '위치 분석', icon: 'fa-map-marker-alt', color: 'blue' },
            { name: '전문의 검색', icon: 'fa-user-md', color: 'green' },
            { name: '장비/시설 확인', icon: 'fa-hospital', color: 'purple' },
            { name: '추천 생성', icon: 'fa-magic', color: 'yellow' }
        ];

        // Step 1
        setRecommendationState(prev => ({ ...prev, step: 1, progress: 10, currentStep: steps[0] }));
        await new Promise(r => setTimeout(r, 2000));
        try {
            const res1 = await fetch('/api/jeju-hospital/smart-recommendation/start', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patient_id: patientId, diagnosis_id: diagnosisId, recommended_dept: dept })
            });
            const data1 = await res1.json();
            currentData = { ...currentData, ...data1.data };
            setRecommendationState(prev => ({ ...prev, progress: 20, steps: [...prev.steps, { ...steps[0], message: data1.message, data: data1.data }] }));
        } catch (e) {}

        // Step 2
        await new Promise(r => setTimeout(r, 2500));
        setRecommendationState(prev => ({ ...prev, step: 2, progress: 35, currentStep: steps[1] }));
        try {
            const res2 = await fetch('/api/jeju-hospital/smart-recommendation/analyze-location', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location: currentData.location, recommended_dept: dept })
            });
            const data2 = await res2.json();
            currentData = { ...currentData, ...data2.data };
            setRecommendationState(prev => ({ ...prev, progress: 45, steps: [...prev.steps, { ...steps[1], message: data2.message, data: data2.data }] }));
        } catch (e) {}

        // Step 3
        await new Promise(r => setTimeout(r, 2500));
        setRecommendationState(prev => ({ ...prev, step: 3, progress: 55, currentStep: steps[2] }));
        try {
            const res3 = await fetch('/api/jeju-hospital/smart-recommendation/find-specialists', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recommended_dept: dept, nearby_hospitals: currentData.nearby_hospitals })
            });
            const data3 = await res3.json();
            currentData = { ...currentData, specialists: data3.data.specialists };
            setRecommendationState(prev => ({ ...prev, progress: 65, steps: [...prev.steps, { ...steps[2], message: data3.message, data: data3.data }] }));
        } catch (e) {}

        // Step 4
        await new Promise(r => setTimeout(r, 2000));
        setRecommendationState(prev => ({ ...prev, step: 4, progress: 75, currentStep: steps[3] }));
        try {
            const res4 = await fetch('/api/jeju-hospital/smart-recommendation/check-equipment', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ specialists: currentData.specialists, diagnosis_conditions: diagnosisResult?.diagnosis?.differential_diagnosis })
            });
            const data4 = await res4.json();
            currentData = { ...currentData, equipment_analysis: data4.data.equipment_analysis };
            setRecommendationState(prev => ({ ...prev, progress: 85, steps: [...prev.steps, { ...steps[3], message: data4.message, data: data4.data }] }));
        } catch (e) {}

        // Step 5
        await new Promise(r => setTimeout(r, 2500));
        setRecommendationState(prev => ({ ...prev, step: 5, progress: 95, currentStep: steps[4] }));
        try {
            const res5 = await fetch('/api/jeju-hospital/smart-recommendation/generate', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    specialists: currentData.specialists, equipment_analysis: currentData.equipment_analysis,
                    location: currentData.location, recommended_dept: dept, diagnosis: diagnosisResult?.diagnosis
                })
            });
            const data5 = await res5.json();
            setRecommendationState(prev => ({ 
                ...prev, step: 6, progress: 100,
                steps: [...prev.steps, { ...steps[4], message: data5.message, data: data5.data }],
                recommendations: data5.data.recommendations, location: data5.data.patient_location
            }));
        } catch (e) {}
    };

    // 예약 진행
    const bookAppointment = async (hospital, doctor) => {
        setRecommendationState(prev => ({ ...prev, booking: true }));
        try {
            const res = await fetch('/api/jeju-hospital/smart-recommendation/book', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patient_id: patientId, hospital_id: hospital.hospital_id,
                    department: hospital.department, doctor: doctor, diagnosis_id: diagnosisResult?.diagnosis_id
                })
            });
            const data = await res.json();
            if (data.success) {
                setRecommendationState(prev => ({ ...prev, booking: false, bookingResult: data.data }));
            }
        } catch (e) {}
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold flex items-center"><i className="fas fa-user-md text-blue-400 mr-3"></i>AI 의사 상담</h1>
                    <p className="text-gray-400 mt-1">증상을 말씀해 주시면 AI가 분석하고 적합한 병원을 추천해 드립니다</p>
                </div>
            </div>

            {/* 스마트 추천 모달 */}
            {showRecommendation && (
                <SmartRecommendationPanel 
                    state={recommendationState}
                    onBook={bookAppointment}
                    onClose={() => setShowRecommendation(false)}
                    diagnosis={diagnosisResult?.diagnosis}
                />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 채팅 영역 */}
                <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 flex flex-col" style={{ height: '600px' }}>
                    <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <i className="fas fa-robot text-blue-400"></i>
                        </div>
                        <div>
                            <p className="font-medium">AI 주치의</p>
                            <p className="text-xs text-green-400"><i className="fas fa-circle text-xs mr-1"></i>상담 준비 완료</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-stethoscope text-4xl text-blue-400"></i>
                                </div>
                                <p className="text-lg font-medium mb-2">안녕하세요, AI 주치의입니다</p>
                                <p className="text-gray-400 mb-6">어떤 증상이 있으신가요?</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {exampleQuestions.map((q, i) => (
                                        <button key={i} onClick={() => sendMessage(q)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all hover:scale-105">{q}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] ${m.role === 'user' ? 'bg-blue-600' : m.error ? 'bg-red-900/50' : 'bg-gray-700'} rounded-xl p-4`}>
                                        {m.role === 'assistant' && m.agent && (
                                            <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-gray-600">
                                                <span className="text-lg">{m.agent.icon}</span>
                                                <span className="text-sm text-blue-400">{m.agent.name}</span>
                                            </div>
                                        )}
                                        <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                                        {m.openhash && (
                                            <div className="mt-2 pt-2 border-t border-gray-600 flex items-center text-xs text-gray-400">
                                                <i className="fas fa-link mr-1"></i>OpenHash 기록됨
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        
                        {/* 상담 분석 중 표시 */}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 rounded-xl p-4 max-w-[80%]">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full bg-${analysisStages[loadingStage].color}-500/20 flex items-center justify-center`}>
                                            <i className={`fas ${analysisStages[loadingStage].icon} text-${analysisStages[loadingStage].color}-400 animate-pulse`}></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-200">{analysisStages[loadingStage].text}</p>
                                            <div className="flex space-x-1 mt-2">
                                                {analysisStages.map((_, i) => (
                                                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === loadingStage ? 'bg-blue-400 scale-125' : i < loadingStage ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 사전 진단 분석 중 표시 */}
                        {diagnosisLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-xl p-4 max-w-[90%]">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <i className="fas fa-file-medical text-green-400"></i>
                                        <span className="text-sm font-medium text-green-400">AI 사전 진단 수행 중</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full bg-${diagnosisStages[diagnosisStage].color}-500/20 flex items-center justify-center`}>
                                            <i className={`fas ${diagnosisStages[diagnosisStage].icon} text-${diagnosisStages[diagnosisStage].color}-400 animate-pulse`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">{diagnosisStages[diagnosisStage].text}</p>
                                            <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300" style={{ width: `${((diagnosisStage + 1) / diagnosisStages.length) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-gray-700">
                        <div className="flex space-x-2">
                            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="증상을 입력하세요..." disabled={loading || diagnosisLoading} className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500" />
                            <button onClick={() => sendMessage()} disabled={loading || diagnosisLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-5 py-3 rounded-lg">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 진단 결과 패널 */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 flex flex-col">
                    <h3 className="font-semibold mb-4 flex items-center"><i className="fas fa-clipboard-list text-green-400 mr-2"></i>AI 사전 진단</h3>
                    
                    {diagnosisLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-cog fa-spin text-3xl text-green-400"></i>
                            </div>
                            <p className="text-gray-400 text-center">AI가 증상을 분석하여<br/>사전 진단을 수행하고 있습니다</p>
                        </div>
                    ) : diagnosisResult ? (
                        <div className="space-y-4 flex-1">
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                                <i className="fas fa-check-circle text-green-400 mr-2"></i>
                                <span className="text-green-400 text-sm font-medium">진단 완료</span>
                            </div>
                            
                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <p className="text-xs text-gray-400 mb-1">추천 진료과</p>
                                <p className="text-lg font-bold text-blue-400">{diagnosisResult.diagnosis?.recommended_department}</p>
                            </div>
                            
                            {diagnosisResult.diagnosis?.differential_diagnosis && (
                                <div className="bg-gray-700/50 rounded-lg p-3">
                                    <p className="text-xs text-gray-400 mb-2">예상 진단</p>
                                    {diagnosisResult.diagnosis.differential_diagnosis.slice(0, 3).map((d, i) => (
                                        <div key={i} className="flex justify-between items-center mb-1">
                                            <span className="text-sm">{d.condition}</span>
                                            <div className="flex items-center">
                                                <div className="w-16 h-1.5 bg-gray-600 rounded-full mr-2 overflow-hidden">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.probability}%` }}></div>
                                                </div>
                                                <span className="text-xs text-blue-400 w-8">{d.probability}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <p className="text-xs text-gray-400 mb-1">긴급도</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    diagnosisResult.diagnosis?.urgency === '응급' ? 'bg-red-500/20 text-red-400' : 
                                    diagnosisResult.diagnosis?.urgency === '긴급' ? 'bg-orange-500/20 text-orange-400' : 
                                    diagnosisResult.diagnosis?.urgency === '우선' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-green-500/20 text-green-400'
                                }`}>
                                    {diagnosisResult.diagnosis?.urgency || '일반'}
                                </span>
                            </div>

                            <div className="bg-gray-700/50 rounded-lg p-3">
                                <p className="text-xs text-gray-400 mb-1">AI 소견</p>
                                <p className="text-sm text-gray-300">{diagnosisResult.diagnosis?.ai_analysis?.substring(0, 100)}...</p>
                            </div>
                            
                            {/* 병원 추천 버튼 - 깜박임 효과 */}
                            {!showRecommendation && (
                                <button 
                                    onClick={startSmartRecommendation} 
                                    className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all animate-pulse-btn"
                                    style={{
                                        background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)'
                                    }}
                                >
                                    <i className="fas fa-hospital mr-3"></i>
                                    AI 병원 추천 받기
                                    <i className="fas fa-chevron-right ml-3 animate-bounce-x"></i>
                                </button>
                            )}

                            <style>{`
                                @keyframes pulse-btn {
                                    0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(59, 130, 246, 0.3); }
                                    50% { transform: scale(1.02); box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(59, 130, 246, 0.5); }
                                }
                                .animate-pulse-btn { animation: pulse-btn 1.5s ease-in-out infinite; }
                                @keyframes bounce-x {
                                    0%, 100% { transform: translateX(0); }
                                    50% { transform: translateX(5px); }
                                }
                                .animate-bounce-x { animation: bounce-x 1s ease-in-out infinite; }
                            `}</style>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center py-8 text-gray-500">
                            <i className="fas fa-comment-medical text-5xl mb-4 opacity-30"></i>
                            <p className="text-center text-sm">증상을 말씀해 주시면<br/>AI가 자동으로 분석합니다</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 스마트 추천 패널 컴포넌트
const SmartRecommendationPanel = ({ state, onBook, onClose, diagnosis }) => {
    const [selectedDoctor, setSelectedDoctor] = React.useState(null);
    const [confirmBooking, setConfirmBooking] = React.useState(false);

    if (!state) return null;

    const stepLabels = [
        { name: 'PDV 주소 조회', icon: 'fa-shield-alt', color: 'cyan', desc: '개인정보금고에서 주소 인출' },
        { name: '위치 분석', icon: 'fa-map-marker-alt', color: 'blue', desc: '현재 위치 기준 의료기관 탐색' },
        { name: '전문의 검색', icon: 'fa-user-md', color: 'green', desc: '추천 진료과 전문의 검색' },
        { name: '장비/시설 확인', icon: 'fa-hospital', color: 'purple', desc: '병원별 장비 및 시설 확인' },
        { name: '추천 생성', icon: 'fa-magic', color: 'yellow', desc: 'AI가 최적의 병원 추천' }
    ];

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                    <i className="fas fa-robot text-blue-400 mr-3"></i>AI 스마트 병원 추천
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white"><i className="fas fa-times"></i></button>
            </div>

            {state.bookingResult ? (
                <div className="space-y-4">
                    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center">
                        <i className="fas fa-check-circle text-green-400 text-5xl mb-4"></i>
                        <h4 className="text-xl font-bold text-green-400 mb-2">예약이 완료되었습니다!</h4>
                        <p className="text-gray-400">AI 사전 진단 결과가 담당 의사에게 전달되었습니다</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-xl p-5 space-y-3">
                        <div className="flex justify-between"><span className="text-gray-400">예약번호</span><span className="font-mono text-blue-400">{state.bookingResult.appointment?.id}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">병원</span><span className="font-medium">{state.bookingResult.appointment?.hospital}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">주소</span><span className="text-sm">{state.bookingResult.appointment?.hospital_address}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">전화</span><span>{state.bookingResult.appointment?.hospital_tel}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">진료과</span><span>{state.bookingResult.appointment?.department}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">담당의</span><span>{state.bookingResult.appointment?.doctor}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">일시</span><span className="text-green-400 font-medium">{state.bookingResult.appointment?.date} {state.bookingResult.appointment?.time}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">장소</span><span>{state.bookingResult.appointment?.location} {state.bookingResult.appointment?.room}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-500/20 rounded-lg p-3 text-center"><i className="fas fa-file-medical text-blue-400 mb-1"></i><p className="text-xs text-blue-400">AI 진단 전달됨</p></div>
                        <div className="bg-cyan-500/20 rounded-lg p-3 text-center"><i className="fas fa-shield-alt text-cyan-400 mb-1"></i><p className="text-xs text-cyan-400">PDV 저장됨</p></div>
                    </div>
                </div>
            ) : state.progress < 100 ? (
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">분석 진행률</span>
                            <span className="text-blue-400 font-medium">{state.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full transition-all duration-500" style={{ width: `${state.progress}%` }}></div>
                        </div>
                    </div>

                    {state.currentStep && (
                        <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <i className={`fas ${state.currentStep.icon} text-2xl text-blue-400 animate-pulse`}></i>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{state.currentStep.name}</p>
                                    <p className="text-sm text-gray-400">처리 중...</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {state.steps.map((step, i) => (
                            <div key={i} className="bg-gray-700/30 rounded-lg p-4 border-l-4 border-green-500">
                                <div className="flex items-center space-x-3">
                                    <i className={`fas ${step.icon} text-green-400`}></i>
                                    <span className="font-medium">{step.name}</span>
                                    <i className="fas fa-check-circle text-green-400 text-sm"></i>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 ml-7">{step.message}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                        {stepLabels.map((step, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${state.step > i + 1 ? 'bg-green-500' : state.step === i + 1 ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'}`}>
                                    {state.step > i + 1 ? <i className="fas fa-check text-white"></i> : <i className={`fas ${step.icon} text-sm ${state.step === i + 1 ? 'text-white' : 'text-gray-500'}`}></i>}
                                </div>
                                <span className={`text-xs mt-2 ${state.step >= i + 1 ? 'text-gray-300' : 'text-gray-600'}`}>{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {state.location && (
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                                <i className="fas fa-map-marker-alt text-cyan-400"></i>
                                <div>
                                    <p className="text-sm text-gray-400">환자 거주지 (PDV 조회)</p>
                                    <p className="font-medium">{state.location.address}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <h4 className="font-semibold">AI 추천 병원 ({diagnosis?.recommended_department})</h4>
                        {state.recommendations?.map((rec, i) => (
                            <div key={i} className={`bg-gray-700/50 rounded-xl p-4 border-2 transition-all ${confirmBooking?.hospital_id === rec.hospital_id ? 'border-green-500' : 'border-transparent hover:border-gray-600'}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-yellow-500 text-gray-900' : i === 1 ? 'bg-gray-400 text-gray-900' : 'bg-orange-700 text-white'}`}>{rec.rank}</div>
                                        <div>
                                            <p className="font-semibold">{rec.hospital_name}</p>
                                            <p className="text-sm text-gray-400">{rec.department}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-blue-400">{rec.distance_km}km</p>
                                        <p className="text-xs text-gray-500">차량 {rec.drive_time_min}분</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {rec.recommendation_reasons?.map((reason, j) => (
                                        <span key={j} className="px-2 py-1 bg-gray-600 rounded text-xs">{reason}</span>
                                    ))}
                                </div>
                                <div className="border-t border-gray-600 pt-3 mt-3">
                                    <p className="text-xs text-gray-400 mb-2">전문의 선택</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {rec.doctors?.map((doc, j) => (
                                            <div key={j} onClick={() => { setSelectedDoctor({ hospital: rec, doctor: doc }); setConfirmBooking({ hospital_id: rec.hospital_id }); }}
                                                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${selectedDoctor?.doctor?.name === doc.name && selectedDoctor?.hospital?.hospital_id === rec.hospital_id ? 'bg-green-500/20 border border-green-500' : 'bg-gray-600/50 hover:bg-gray-600'}`}>
                                                <div className="flex items-center space-x-2">
                                                    <i className="fas fa-user-md text-gray-400"></i>
                                                    <span className="text-sm">{doc.name} {doc.position}</span>
                                                    <span className="text-xs text-gray-500">({doc.specialty})</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xs text-yellow-400">★ {doc.rating}</span>
                                                    <span className="text-xs text-green-400">{doc.available_slots}슬롯</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedDoctor && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">선택된 예약</p>
                                    <p className="font-medium">{selectedDoctor.hospital.hospital_name} - {selectedDoctor.doctor.name} {selectedDoctor.doctor.position}</p>
                                </div>
                                <button onClick={() => onBook(selectedDoctor.hospital, selectedDoctor.doctor)} disabled={state.booking}
                                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded-lg font-medium flex items-center">
                                    {state.booking ? <><i className="fas fa-spinner fa-spin mr-2"></i>예약 중...</> : <><i className="fas fa-calendar-check mr-2"></i>예약하기</>}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
