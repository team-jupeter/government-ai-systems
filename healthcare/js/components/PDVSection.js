const PDVSection = () => {
    const [showDemo, setShowDemo] = React.useState(false);
    const [verifyResult, setVerifyResult] = React.useState(null);
    const [isVerifying, setIsVerifying] = React.useState(false);

    const sixW = [
        { icon: '👤', label: 'Who (누가)', example: '환자 홍길동' },
        { icon: '📅', label: 'When (언제)', example: '2025-11-27 09:30' },
        { icon: '📍', label: 'Where (어디서)', example: '서울대병원 내과' },
        { icon: '📋', label: 'What (무엇을)', example: '고혈압 진단' },
        { icon: '🔧', label: 'How (어떻게)', example: '혈압측정, 혈액검사' },
        { icon: '❓', label: 'Why (왜)', example: '두통, 어지러움 증상' }
    ];

    const runCrossVerify = async () => {
        setIsVerifying(true);
        setVerifyResult(null);
        
        const sampleRecord = {
            patient_name: '홍길동',
            visit_date: '2025-11-27',
            hospital: '서울대병원',
            diagnosis: '본태성 고혈압',
            cost: 45000
        };

        try {
            const response = await fetch('/api-healthcare/pdv/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patient_record: sampleRecord,
                    hospital_record: sampleRecord
                })
            });
            const result = await response.json();
            setTimeout(() => {
                setVerifyResult(result);
                setIsVerifying(false);
            }, 1500);
        } catch (error) {
            // 오프라인 시뮬레이션
            const hash = Math.random().toString(16).slice(2, 66);
            setTimeout(() => {
                setVerifyResult({
                    patient_hash: hash,
                    hospital_hash: hash,
                    is_match: true,
                    status: '교차 검증 완료 ✓',
                    message: '환자와 병원의 기록이 일치합니다.'
                });
                setIsVerifying(false);
            }, 1500);
        }
    };

    return React.createElement('div', {
        id: 'pdv',
        className: 'py-16 px-4'
    },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, '🔐 프라이빗 데이터 금고 (PDV)'),
                React.createElement('p', { className: 'text-gray-600 max-w-2xl mx-auto' },
                    '개인 건강 정보를 본인 단말기에만 암호화 저장하고, 해시값만 오픈해시 네트워크에 기록하여 완전한 데이터 주권을 보장합니다.'
                )
            ),

            // PDV 핵심 특징
            React.createElement('div', { className: 'grid md:grid-cols-3 gap-6 mb-12' },
                React.createElement('div', { className: 'bg-indigo-50 border border-blue-300/30 rounded-xl p-6 card-hover' },
                    React.createElement('div', { className: 'text-4xl mb-4' }, '🔒'),
                    React.createElement('h3', { className: 'text-xl font-bold text-blue-600 mb-2' }, 'AES-256 암호화'),
                    React.createElement('p', { className: 'text-gray-600 text-sm' },
                        '원본 데이터는 군사급 암호화로 보호되어 본인 단말기에만 저장됩니다.'
                    )
                ),
                React.createElement('div', { className: 'bg-indigo-50 border border-blue-300/30 rounded-xl p-6 card-hover' },
                    React.createElement('div', { className: 'text-4xl mb-4' }, '🔗'),
                    React.createElement('h3', { className: 'text-xl font-bold text-blue-600 mb-2' }, '해시 전용 저장'),
                    React.createElement('p', { className: 'text-gray-600 text-sm' },
                        '클라우드에는 32바이트 해시값만 저장되어 원본 데이터 유출이 불가능합니다.'
                    )
                ),
                React.createElement('div', { className: 'bg-indigo-50 border border-blue-300/30 rounded-xl p-6 card-hover' },
                    React.createElement('div', { className: 'text-4xl mb-4' }, '✅'),
                    React.createElement('h3', { className: 'text-xl font-bold text-blue-600 mb-2' }, '교차 검증'),
                    React.createElement('p', { className: 'text-gray-600 text-sm' },
                        '환자와 병원의 기록을 자동으로 대조하여 허위 기록을 즉시 탐지합니다.'
                    )
                )
            ),

            // 확장 재무제표 (6하 원칙)
            React.createElement('div', { className: 'bg-gray-50 rounded-xl p-6 mb-8' },
                React.createElement('h3', { className: 'text-xl font-bold text-center mb-6' }, '📊 확장 재무제표 형식 (6하 원칙)'),
                React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4' },
                    sixW.map((item, i) =>
                        React.createElement('div', {
                            key: i,
                            className: 'bg-white rounded-lg p-4 text-center'
                        },
                            React.createElement('div', { className: 'text-3xl mb-2' }, item.icon),
                            React.createElement('div', { className: 'text-sm font-bold text-blue-600' }, item.label),
                            React.createElement('div', { className: 'text-xs text-gray-600 mt-1' }, item.example)
                        )
                    )
                )
            ),

            // 데이터 흐름 시각화
            React.createElement('div', { className: 'bg-gray-50 rounded-xl p-6 mb-8' },
                React.createElement('h3', { className: 'text-xl font-bold text-center mb-6' }, '🔄 PDV 데이터 흐름'),
                React.createElement('div', { className: 'flex flex-col md:flex-row items-center justify-center gap-4' },
                    React.createElement('div', { className: 'bg-blue-50/50 rounded-lg p-4 text-center' },
                        React.createElement('div', { className: 'text-3xl mb-2' }, '📱'),
                        React.createElement('div', { className: 'text-sm font-bold' }, '사용자 단말기'),
                        React.createElement('div', { className: 'text-xs text-gray-600' }, '원본 데이터 저장')
                    ),
                    React.createElement('div', { className: 'text-2xl text-blue-600' }, '→'),
                    React.createElement('div', { className: 'bg-blue-50/50 rounded-lg p-4 text-center' },
                        React.createElement('div', { className: 'text-3xl mb-2' }, '🔐'),
                        React.createElement('div', { className: 'text-sm font-bold' }, 'SHA-256 해싱'),
                        React.createElement('div', { className: 'text-xs text-gray-600' }, '32바이트 해시 추출')
                    ),
                    React.createElement('div', { className: 'text-2xl text-blue-600' }, '→'),
                    React.createElement('div', { className: 'bg-blue-900/50 rounded-lg p-4 text-center' },
                        React.createElement('div', { className: 'text-3xl mb-2' }, '🌐'),
                        React.createElement('div', { className: 'text-sm font-bold' }, '오픈해시 네트워크'),
                        React.createElement('div', { className: 'text-xs text-gray-600' }, '4계층 분산 저장')
                    )
                )
            ),

            // 교차 검증 데모
            React.createElement('div', { className: 'bg-gray-50 rounded-xl p-6' },
                React.createElement('div', { className: 'flex justify-between items-center mb-4' },
                    React.createElement('h3', { className: 'text-xl font-bold' }, '🔍 교차 검증 시뮬레이션'),
                    React.createElement('button', {
                        onClick: runCrossVerify,
                        disabled: isVerifying,
                        className: `px-4 py-2 rounded-lg font-semibold transition-all ${isVerifying ? 'bg-gray-100 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-50'}`
                    }, isVerifying ? '검증 중...' : '교차 검증 실행')
                ),
                
                isVerifying && React.createElement('div', { className: 'text-center py-8' },
                    React.createElement('div', { className: 'text-4xl mb-4 animate-pulse' }, '🔍'),
                    React.createElement('p', { className: 'text-blue-600' }, '환자-병원 기록 대조 중...')
                ),
                
                verifyResult && !isVerifying && React.createElement('div', { className: 'space-y-4' },
                    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4' },
                        React.createElement('div', { className: 'bg-white rounded-lg p-4' },
                            React.createElement('div', { className: 'text-sm text-gray-600 mb-1' }, '환자 측 해시'),
                            React.createElement('div', { className: 'font-mono text-blue-600 text-xs break-all' }, verifyResult.patient_hash)
                        ),
                        React.createElement('div', { className: 'bg-white rounded-lg p-4' },
                            React.createElement('div', { className: 'text-sm text-gray-600 mb-1' }, '병원 측 해시'),
                            React.createElement('div', { className: 'font-mono text-blue-600 text-xs break-all' }, verifyResult.hospital_hash)
                        )
                    ),
                    React.createElement('div', {
                        className: `rounded-lg p-4 text-center ${verifyResult.is_match ? 'bg-blue-50/50 border border-blue-300/50' : 'bg-blue-50/50 border border-blue-300/50'}`
                    },
                        React.createElement('div', { className: 'text-2xl mb-2' }, verifyResult.is_match ? '✅' : '⚠️'),
                        React.createElement('div', { className: `text-xl font-bold ${verifyResult.is_match ? 'text-blue-600' : 'text-blue-600'}` }, verifyResult.status),
                        React.createElement('div', { className: 'text-sm text-gray-700 mt-1' }, verifyResult.message)
                    )
                )
            )
        )
    );
};
