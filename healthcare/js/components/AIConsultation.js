const AIConsultation = () => {
    const [symptoms, setSymptoms] = React.useState('');
    const [age, setAge] = React.useState(35);
    const [gender, setGender] = React.useState('남성');
    const [medicalHistory, setMedicalHistory] = React.useState([]);
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [loadingStep, setLoadingStep] = React.useState(0);
    const [loadingMessage, setLoadingMessage] = React.useState('');

    const historyOptions = ['고혈압', '당뇨병', '심장질환', '천식', '알레르기', '갑상선질환'];
    
    const samplePDVRecords = [
        { date: '2025-09-15', diagnosis: '급성 상기도 감염', hospital: '서울내과의원' },
        { date: '2025-06-20', diagnosis: '건강검진 - 정상', hospital: '삼성서울병원' },
        { date: '2024-11-10', diagnosis: '위염', hospital: '연세세브란스병원' }
    ];

    const loadingMessages = [
        { icon: '🔐', text: 'PDV 과거 기록 참조 중...' },
        { icon: '🔍', text: '증상 패턴 분석 중...' },
        { icon: '🧠', text: 'Claude AI 진단 모델 연결 중...' },
        { icon: '📊', text: '기저질환 연관성 분석 중...' },
        { icon: '🏥', text: '권역 의료기관 데이터 조회 중...' },
        { icon: '⚕️', text: '초기 진단 방향 도출 중...' },
        { icon: '📋', text: '응급도 평가 중...' },
        { icon: '✅', text: '최종 결과 생성 중...' }
    ];

    const toggleHistory = (item) => {
        setMedicalHistory(prev => 
            prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
        );
    };

    const runConsultation = async () => {
        if (!symptoms.trim()) {
            setError('증상을 입력해주세요.');
            return;
        }
        
        setLoading(true);
        setError(null);
        setResult(null);
        setLoadingStep(0);
        setLoadingMessage(loadingMessages[0].icon + ' ' + loadingMessages[0].text);

        const messageInterval = setInterval(() => {
            setLoadingStep(prev => {
                const next = prev + 1;
                if (next < loadingMessages.length) {
                    setLoadingMessage(loadingMessages[next].icon + ' ' + loadingMessages[next].text);
                    return next;
                }
                return prev;
            });
        }, 2000);

        try {
            const response = await fetch('/api-healthcare/ai-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    symptoms,
                    age,
                    gender,
                    medical_history: medicalHistory,
                    pdv_records: samplePDVRecords
                })
            });
            
            if (!response.ok) throw new Error('API 오류');
            
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error('Consultation error:', err);
            setError('상담 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            clearInterval(messageInterval);
            setLoading(false);
        }
    };

    const getUrgencyBg = (level) => {
        const bgs = ['bg-blue-50/30 border-blue-300/30', 'bg-sky-50 border-blue-500/30', 'bg-blue-50/30 border-yellow-500/30', 'bg-orange-900/30 border-orange-500/30', 'bg-blue-50 border-blue-300/30'];
        return bgs[Math.min(level - 1, 4)] || 'bg-white/30 border-gray-500/30';
    };

    const getUrgencyText = (level) => {
        const texts = ['text-blue-600', 'text-blue-400', 'text-blue-600', 'text-orange-400', 'text-blue-600'];
        return texts[Math.min(level - 1, 4)] || 'text-gray-600';
    };

    return React.createElement('div', { id: 'ai', className: 'py-16 px-4 bg-gray-50' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, '🤖 AI 의사 상담 시뮬레이션'),
                React.createElement('p', { className: 'text-gray-600 max-w-2xl mx-auto' },
                    'Claude AI가 증상을 분석하고 PDV에 저장된 과거 기록을 참조하여 초기 진단 방향을 제안합니다.'
                ),
                React.createElement('div', { className: 'mt-4 inline-block px-4 py-2 bg-blue-50 border border-blue-300/30 rounded-lg text-sm text-blue-600' },
                    '⚠️ 본 시뮬레이션은 참고용이며, 정확한 진단은 의료진의 직접 진찰이 필요합니다.'
                )
            ),

            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                React.createElement('div', { className: 'bg-white rounded-xl p-6' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-blue-600' }, '📝 환자 정보 입력'),
                    
                    React.createElement('div', { className: 'grid grid-cols-2 gap-4 mb-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '나이'),
                            React.createElement('input', {
                                type: 'number', value: age,
                                onChange: e => setAge(parseInt(e.target.value) || 0),
                                className: 'w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-300 focus:outline-none'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '성별'),
                            React.createElement('select', {
                                value: gender, onChange: e => setGender(e.target.value),
                                className: 'w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-300 focus:outline-none'
                            },
                                React.createElement('option', { value: '남성' }, '남성'),
                                React.createElement('option', { value: '여성' }, '여성')
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'mb-4' },
                        React.createElement('label', { className: 'block text-sm text-gray-600 mb-2' }, '기저질환 (해당 항목 선택)'),
                        React.createElement('div', { className: 'flex flex-wrap gap-2' },
                            historyOptions.map(item =>
                                React.createElement('button', {
                                    key: item, onClick: () => toggleHistory(item),
                                    className: `px-3 py-1 rounded-full text-sm transition-all ${medicalHistory.includes(item) ? 'bg-blue-50 text-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'}`
                                }, item)
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'mb-4' },
                        React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '현재 증상 (자세히 설명)'),
                        React.createElement('textarea', {
                            value: symptoms, onChange: e => setSymptoms(e.target.value),
                            placeholder: '예: 3일 전부터 두통이 있고, 어지러움이 있습니다.',
                            rows: 4,
                            className: 'w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:border-blue-300 focus:outline-none resize-none'
                        })
                    ),
                    
                    React.createElement('div', { className: 'mb-6' },
                        React.createElement('label', { className: 'block text-sm text-gray-600 mb-2' }, '📋 PDV 저장 과거 기록 (자동 참조)'),
                        React.createElement('div', { className: 'bg-gray-50 rounded-lg p-3 space-y-2' },
                            samplePDVRecords.map((record, i) =>
                                React.createElement('div', { key: i, className: 'flex justify-between text-sm' },
                                    React.createElement('span', { className: 'text-blue-600' }, record.date),
                                    React.createElement('span', { className: 'text-gray-700' }, record.diagnosis),
                                    React.createElement('span', { className: 'text-gray-600' }, record.hospital)
                                )
                            )
                        )
                    ),
                    
                    error && React.createElement('div', { className: 'mb-4 p-3 bg-blue-50/50 border border-blue-300/50 rounded-lg text-blue-600 text-sm' }, error),
                    
                    React.createElement('button', {
                        onClick: runConsultation, disabled: loading,
                        className: `w-full py-3 rounded-lg font-bold text-lg transition-all ${loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-50'}`
                    }, loading ? '🔄 AI 분석 중...' : '🤖 AI 상담 시작')
                ),

                React.createElement('div', { className: 'bg-white rounded-xl p-6' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-blue-600' }, '📊 AI 분석 결과'),
                    
                    !result && !loading && React.createElement('div', { className: 'text-center py-16 text-gray-600' },
                        React.createElement('div', { className: 'text-6xl mb-4' }, '🩺'),
                        React.createElement('p', null, '환자 정보를 입력하고 AI 상담을 시작하세요.')
                    ),
                    
                    loading && React.createElement('div', { className: 'text-center py-8' },
                        React.createElement('div', { className: 'text-6xl mb-4 animate-pulse' }, '🤖'),
                        React.createElement('p', { className: 'text-xl text-blue-600 font-semibold mb-4' }, 'Claude AI가 증상을 분석하고 있습니다...'),
                        React.createElement('div', { className: 'bg-gray-50 rounded-lg p-4 max-w-sm mx-auto' },
                            React.createElement('p', { className: 'text-lg text-gray-900 mb-3' }, loadingMessage),
                            React.createElement('div', { className: 'w-full bg-gray-100 rounded-full h-2 mb-2' },
                                React.createElement('div', { 
                                    className: 'bg-blue-600 h-2 rounded-full transition-all duration-500',
                                    style: { width: ((loadingStep + 1) / loadingMessages.length * 100) + '%' }
                                })
                            ),
                            React.createElement('p', { className: 'text-xs text-gray-600' }, 
                                '단계 ' + (loadingStep + 1) + ' / ' + loadingMessages.length
                            )
                        )
                    ),
                    
                    result && React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', { className: 'rounded-lg p-4 border ' + getUrgencyBg(result.urgency_level) },
                            React.createElement('div', { className: 'flex justify-between items-center' },
                                React.createElement('span', { className: 'text-sm text-gray-600' }, '응급도'),
                                React.createElement('span', { className: 'text-xl font-bold ' + getUrgencyText(result.urgency_level) },
                                    'Level ' + result.urgency_level + '/5'
                                )
                            ),
                            React.createElement('p', { className: 'text-sm mt-2 text-gray-700' }, result.urgency_description)
                        ),
                        
                        React.createElement('div', { className: 'bg-gray-50 rounded-lg p-4' },
                            React.createElement('h4', { className: 'text-sm font-bold text-blue-600 mb-2' }, '📝 증상 요약'),
                            React.createElement('p', { className: 'text-gray-700 text-sm' }, result.symptom_summary)
                        ),
                        
                        React.createElement('div', { className: 'bg-gray-50 rounded-lg p-4' },
                            React.createElement('h4', { className: 'text-sm font-bold text-blue-600 mb-2' }, '🔍 초기 평가'),
                            React.createElement('div', { className: 'space-y-2' },
                                (result.initial_assessment || []).map((item, i) =>
                                    React.createElement('div', { key: i, className: 'flex justify-between items-center' },
                                        React.createElement('span', { className: 'text-gray-700 text-sm' }, item.condition),
                                        React.createElement('span', { className: 'text-blue-600 font-mono text-sm' }, 
                                            Math.round(item.probability * 100) + '%'
                                        )
                                    )
                                )
                            )
                        ),
                        
                        React.createElement('div', { className: 'bg-gray-50 rounded-lg p-4' },
                            React.createElement('h4', { className: 'text-sm font-bold text-blue-600 mb-2' }, '✅ 권장 조치'),
                            React.createElement('ul', { className: 'space-y-1' },
                                (result.recommended_actions || []).map((action, i) =>
                                    React.createElement('li', { key: i, className: 'text-gray-700 text-sm flex items-start gap-2' },
                                        React.createElement('span', { className: 'text-blue-600' }, '•'),
                                        action
                                    )
                                )
                            )
                        ),
                        
                        React.createElement('div', { className: 'bg-blue-50 border border-blue-500/30 rounded-lg p-4' },
                            React.createElement('h4', { className: 'text-sm font-bold text-blue-600 mb-2' }, '🏥 권장 의료기관'),
                            React.createElement('div', { className: 'text-lg font-bold text-gray-900' }, result.facility_recommendation),
                            React.createElement('div', { className: 'text-sm text-gray-600' }, result.facility_type)
                        ),
                        
                        React.createElement('div', { className: 'text-xs text-gray-600 text-center mt-4 p-3 bg-gray-50 rounded-lg' },
                            result.disclaimer
                        )
                    )
                )
            )
        )
    );
};
