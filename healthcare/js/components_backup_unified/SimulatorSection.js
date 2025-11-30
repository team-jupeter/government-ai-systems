const SimulatorSection = () => {
    const [activeTab, setActiveTab] = React.useState('record');
    const [recordForm, setRecordForm] = React.useState({
        patient_name: '홍길동',
        visit_date: '2025-11-27',
        hospital: '서울대병원',
        diagnosis: '본태성 고혈압 (I10)',
        treatment: '약물 처방 및 생활습관 교정 권고',
        symptoms: '두통, 어지러움',
        cost: 45000,
        doctor: '김의사'
    });
    const [recordResult, setRecordResult] = React.useState(null);
    const [certResult, setCertResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const createRecord = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-healthcare/pdv/create-record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recordForm)
            });
            const result = await response.json();
            setRecordResult(result);
        } catch (error) {
            const hash = Math.random().toString(16).slice(2, 66);
            const layerValue = Math.floor(Math.random() * 100);
            let layer = layerValue < 70 ? 1 : layerValue < 90 ? 2 : layerValue < 99 ? 3 : 4;
            setRecordResult({
                success: true,
                record: recordForm,
                openhash: {
                    original_hash: hash,
                    layer_value: layerValue,
                    selected_layer: layer,
                    layer_name: ['Edge Device', 'Edge Server', 'Core Engine', 'Cloud Archive'][layer-1],
                    processing_time_ms: (Math.random() * 40 + 10).toFixed(2)
                }
            });
        }
        setLoading(false);
    };

    const generateCertificate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-healthcare/certificate/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patient_name: recordForm.patient_name,
                    record_type: '진료',
                    records: [
                        { summary: '2025-11-27 고혈압 진단' },
                        { summary: '2025-09-15 급성 상기도 감염' },
                        { summary: '2025-06-20 건강검진 정상' }
                    ],
                    purpose: '보험 청구'
                })
            });
            const result = await response.json();
            setCertResult(result);
        } catch (error) {
            setCertResult({
                certificate: {
                    id: 'CERT-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
                    issue_date: new Date().toISOString(),
                    patient_name_masked: '홍**',
                    record_count: 3,
                    purpose: '보험 청구'
                },
                verification: {
                    merkle_root: Math.random().toString(16).slice(2, 66)
                },
                legal_notice: '본 증명서는 오픈해시 기술로 위변조가 불가능합니다.'
            });
        }
        setLoading(false);
    };

    const tabs = [
        { id: 'record', label: '📝 진료기록 생성', icon: '📝' },
        { id: 'certificate', label: '📜 증명서 발급', icon: '📜' }
    ];

    return React.createElement('div', {
        id: 'simulator',
        className: 'py-16 px-4'
    },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, '⚙️ 통합 시뮬레이터'),
                React.createElement('p', { className: 'text-gray-600' }, 
                    'PDV 진료기록 생성부터 활동 증명서 발급까지 전체 프로세스를 체험하세요.'
                )
            ),

            // 탭 네비게이션
            React.createElement('div', { className: 'flex justify-center gap-4 mb-8' },
                tabs.map(tab =>
                    React.createElement('button', {
                        key: tab.id,
                        onClick: () => setActiveTab(tab.id),
                        className: `px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.id ? 'bg-teal-600 text-gray-900' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`
                    }, tab.label)
                )
            ),

            // 진료기록 생성 탭
            activeTab === 'record' && React.createElement('div', { className: 'bg-gray-50 rounded-xl p-6' },
                React.createElement('h3', { className: 'text-xl font-bold mb-6' }, '📝 PDV 진료기록 생성 시뮬레이션'),
                
                React.createElement('div', { className: 'grid md:grid-cols-2 gap-6' },
                    // 입력 폼
                    React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                            React.createElement('div', null,
                                React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '환자명'),
                                React.createElement('input', {
                                    type: 'text',
                                    value: recordForm.patient_name,
                                    onChange: e => setRecordForm({...recordForm, patient_name: e.target.value}),
                                    className: 'w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm'
                                })
                            ),
                            React.createElement('div', null,
                                React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '진료일'),
                                React.createElement('input', {
                                    type: 'date',
                                    value: recordForm.visit_date,
                                    onChange: e => setRecordForm({...recordForm, visit_date: e.target.value}),
                                    className: 'w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm'
                                })
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '의료기관'),
                            React.createElement('input', {
                                type: 'text',
                                value: recordForm.hospital,
                                onChange: e => setRecordForm({...recordForm, hospital: e.target.value}),
                                className: 'w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '진단명'),
                            React.createElement('input', {
                                type: 'text',
                                value: recordForm.diagnosis,
                                onChange: e => setRecordForm({...recordForm, diagnosis: e.target.value}),
                                className: 'w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-600 mb-1' }, '증상'),
                            React.createElement('input', {
                                type: 'text',
                                value: recordForm.symptoms,
                                onChange: e => setRecordForm({...recordForm, symptoms: e.target.value}),
                                className: 'w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm'
                            })
                        ),
                        React.createElement('button', {
                            onClick: createRecord,
                            disabled: loading,
                            className: `w-full py-3 rounded-lg font-bold transition-all ${loading ? 'bg-gray-600' : 'bg-teal-600 hover:bg-blue-600'}`
                        }, loading ? '처리 중...' : '🔐 PDV에 기록 저장')
                    ),
                    
                    // 결과 표시
                    React.createElement('div', { className: 'bg-white rounded-lg p-4' },
                        !recordResult ? 
                            React.createElement('div', { className: 'text-center py-12 text-gray-500' },
                                React.createElement('div', { className: 'text-4xl mb-2' }, '📋'),
                                '진료 정보를 입력하고 저장하세요.'
                            ) :
                            React.createElement('div', { className: 'space-y-4' },
                                React.createElement('div', { className: 'flex items-center gap-2 text-green-400' },
                                    React.createElement('span', null, '✅'),
                                    React.createElement('span', { className: 'font-bold' }, 'PDV 저장 완료')
                                ),
                                React.createElement('div', { className: 'text-sm' },
                                    React.createElement('div', { className: 'text-gray-600 mb-1' }, '원본 해시'),
                                    React.createElement('div', { className: 'font-mono text-blue-600 text-xs break-all' }, 
                                        recordResult.openhash?.original_hash
                                    )
                                ),
                                React.createElement('div', { className: 'grid grid-cols-2 gap-2 text-sm' },
                                    React.createElement('div', { className: 'bg-gray-50 rounded p-2' },
                                        React.createElement('div', { className: 'text-gray-600 text-xs' }, '계층값'),
                                        React.createElement('div', { className: 'font-bold' }, recordResult.openhash?.layer_value)
                                    ),
                                    React.createElement('div', { className: 'bg-teal-900/50 rounded p-2' },
                                        React.createElement('div', { className: 'text-gray-600 text-xs' }, '선택 계층'),
                                        React.createElement('div', { className: 'font-bold text-blue-600' }, 
                                            `Layer ${recordResult.openhash?.selected_layer}`
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'text-xs text-gray-500' },
                                    `처리 시간: ${recordResult.openhash?.processing_time_ms}ms`
                                )
                            )
                    )
                )
            ),

            // 증명서 발급 탭
            activeTab === 'certificate' && React.createElement('div', { className: 'bg-gray-50 rounded-xl p-6' },
                React.createElement('h3', { className: 'text-xl font-bold mb-6' }, '📜 활동 증명서 발급 시뮬레이션'),
                
                React.createElement('div', { className: 'grid md:grid-cols-2 gap-6' },
                    React.createElement('div', null,
                        React.createElement('div', { className: 'bg-white rounded-lg p-4 mb-4' },
                            React.createElement('h4', { className: 'font-bold mb-3' }, '📋 발급 대상 기록'),
                            React.createElement('div', { className: 'space-y-2 text-sm' },
                                React.createElement('div', { className: 'flex justify-between' },
                                    React.createElement('span', { className: 'text-purple-400' }, '2025-11-27'),
                                    React.createElement('span', null, '고혈압 진단')
                                ),
                                React.createElement('div', { className: 'flex justify-between' },
                                    React.createElement('span', { className: 'text-purple-400' }, '2025-09-15'),
                                    React.createElement('span', null, '급성 상기도 감염')
                                ),
                                React.createElement('div', { className: 'flex justify-between' },
                                    React.createElement('span', { className: 'text-purple-400' }, '2025-06-20'),
                                    React.createElement('span', null, '건강검진 정상')
                                )
                            )
                        ),
                        React.createElement('button', {
                            onClick: generateCertificate,
                            disabled: loading,
                            className: `w-full py-3 rounded-lg font-bold transition-all ${loading ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-500'}`
                        }, loading ? '발급 중...' : '📜 증명서 발급')
                    ),
                    
                    React.createElement('div', { className: 'bg-white rounded-lg p-4' },
                        !certResult ?
                            React.createElement('div', { className: 'text-center py-12 text-gray-500' },
                                React.createElement('div', { className: 'text-4xl mb-2' }, '📜'),
                                '증명서 발급 버튼을 클릭하세요.'
                            ) :
                            React.createElement('div', { className: 'space-y-4' },
                                React.createElement('div', { className: 'text-center border-b border-gray-200 pb-4' },
                                    React.createElement('div', { className: 'text-2xl mb-2' }, '🏥'),
                                    React.createElement('div', { className: 'font-bold text-lg' }, '의료 활동 증명서'),
                                    React.createElement('div', { className: 'text-xs text-gray-500' }, certResult.certificate?.id)
                                ),
                                React.createElement('div', { className: 'text-sm space-y-2' },
                                    React.createElement('div', { className: 'flex justify-between' },
                                        React.createElement('span', { className: 'text-gray-600' }, '환자'),
                                        React.createElement('span', null, certResult.certificate?.patient_name_masked)
                                    ),
                                    React.createElement('div', { className: 'flex justify-between' },
                                        React.createElement('span', { className: 'text-gray-600' }, '기록 수'),
                                        React.createElement('span', null, `${certResult.certificate?.record_count}건`)
                                    ),
                                    React.createElement('div', { className: 'flex justify-between' },
                                        React.createElement('span', { className: 'text-gray-600' }, '용도'),
                                        React.createElement('span', null, certResult.certificate?.purpose)
                                    )
                                ),
                                React.createElement('div', { className: 'bg-blue-50 rounded p-2 text-xs' },
                                    React.createElement('div', { className: 'text-gray-600 mb-1' }, 'Merkle Root'),
                                    React.createElement('div', { className: 'font-mono text-blue-600 break-all' }, 
                                        certResult.verification?.merkle_root?.slice(0, 32) + '...'
                                    )
                                ),
                                React.createElement('div', { className: 'text-xs text-center text-gray-500 pt-2 border-t border-gray-200' },
                                    certResult.legal_notice
                                )
                            )
                    )
                )
            )
        )
    );
};
