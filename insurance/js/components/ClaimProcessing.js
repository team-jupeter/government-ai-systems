const ClaimProcessing = () => {
    const [selectedTab, setSelectedTab] = React.useState('process');

    const processSteps = [
        { id: 1, name: 'PDV 자동 제출', time: '0.003ms', desc: '병원/수리점 방문 시 자동 기록, 본인확인 자동인증' },
        { id: 2, name: 'AI 자동 심사', time: '0.010ms', desc: '약관 적합성, 금액 정당성, 사기 패턴 분석 (98.7%)' },
        { id: 3, name: '보험금 산정', time: '0.001ms', desc: '실손 80-90%, 정액 전액, 공제액 차감, 세금 자동처리' },
        { id: 4, name: '즉시 지급', time: '0.001ms', desc: '재무제표 디지털화폐 입금, 알림, 오픈해시 기록' }
    ];

    const claimTypes = [
        {
            id: 'health',
            name: '건강보험 청구',
            icon: '🏥',
            color: 'green',
            trigger: '병원 진료 시 자동',
            documents: '0장',
            time: '0.015ms',
            payment: '즉시 지급',
            features: [
                'PDV 병원 기록 자동 수집',
                '진단명/처방전 AI 인식',
                '약국 영수증 연동',
                '입원/수술 실시간 제출'
            ],
            example: {
                patient: '김환자',
                case: '맹장 수술',
                total: 3500000,
                covered: 3150000,
                deductible: 350000,
                paid: 2800000,
                time: '0.015ms'
            }
        },
        {
            id: 'auto',
            name: '자동차보험 청구',
            icon: '🚗',
            color: 'blue',
            trigger: '사고 발생 시 자동',
            documents: '블랙박스 자동',
            time: '0.015ms',
            payment: '수리비 선지급',
            features: [
                '블랙박스 PDV 자동 업로드',
                'GPS 사고 위치 자동 기록',
                'AI 과실 비율 자동 산정',
                '수리비 보험사 직접 정산'
            ],
            example: {
                driver: '이운전',
                case: '추돌 사고',
                repairCost: 2800000,
                liability: '70%',
                covered: 1960000,
                deductible: 200000,
                paid: 1760000,
                time: '0.015ms'
            }
        },
        {
            id: 'life',
            name: '생명보험 청구',
            icon: '❤️',
            color: 'purple',
            trigger: '진단 시 자동',
            documents: '진단서 1장',
            time: '0.020ms',
            payment: '24시간 내',
            features: [
                'PDV 병원 진단 연동',
                '중대 질병 진단서 AI 인식',
                '사망 진단서 전자 제출',
                '보험금 선지급 가능'
            ],
            example: {
                insured: '박진단',
                case: '위암 진단',
                benefit: 30000000,
                deductible: 0,
                paid: 30000000,
                time: '0.020ms'
            }
        },
        {
            id: 'property',
            name: '손해보험 청구',
            icon: '🏠',
            color: 'orange',
            trigger: '사고 감지 시 자동',
            documents: '피해 사진 자동',
            time: '0.018ms',
            payment: '즉시',
            features: [
                'IoT 화재 센서 자동 알림',
                '피해 사진 AI 분석',
                '피해액 자동 산정',
                '수리업체 직접 정산'
            ],
            example: {
                owner: '최화재',
                case: '주택 화재',
                damage: 15000000,
                covered: 15000000,
                deductible: 1000000,
                paid: 14000000,
                time: '0.018ms'
            }
        }
    ];

    const realCases = [
        {
            name: '김건강',
            age: 35,
            type: '급성 맹장염 수술',
            timeline: [
                { time: '14:30', event: '응급실 내원', icon: '🏥' },
                { time: '14:30:00.003', event: 'PDV 자동 제출', icon: '📊', highlight: true },
                { time: '15:20', event: '수술 시작', icon: '⚕️' },
                { time: '16:50', event: '수술 완료', icon: '✅' },
                { time: '16:50:00.015', event: 'AI 심사 완료', icon: '🤖', highlight: true },
                { time: '16:50:00.016', event: '보험금 입금 (280만원)', icon: '💰', highlight: true }
            ],
            total: 3500000,
            paid: 2800000,
            own: 700000,
            documents: 0
        },
        {
            name: '이안전',
            age: 42,
            type: '후방 추돌 사고',
            timeline: [
                { time: '09:15', event: '사고 발생', icon: '🚗' },
                { time: '09:15:00.001', event: '블랙박스 PDV 자동 업로드', icon: '📹', highlight: true },
                { time: '09:15:00.010', event: 'AI 과실 비율 산정 (상대 100%)', icon: '⚖️', highlight: true },
                { time: '09:20', event: '렌터카 연락', icon: '🚙' },
                { time: '09:20:00.005', event: '렌터카 비용 선지급', icon: '💳', highlight: true },
                { time: '10:30', event: '수리 견적 제출', icon: '🔧' },
                { time: '10:30:00.015', event: '수리비 176만원 승인', icon: '✅', highlight: true }
            ],
            repairCost: 2800000,
            paid: 1760000,
            own: 200000,
            documents: 0
        },
        {
            name: '박생명',
            age: 55,
            type: '위암 진단',
            timeline: [
                { time: '10:00', event: '위내시경 검사', icon: '🔬' },
                { time: '14:00', event: '조직 검사 결과 (위암)', icon: '📋' },
                { time: '14:00:00.005', event: 'PDV 진단 기록 자동 제출', icon: '📊', highlight: true },
                { time: '14:00:00.020', event: 'AI 심사 완료', icon: '🤖', highlight: true },
                { time: '14:30', event: '진단서 발급', icon: '📄' },
                { time: '14:30:00.001', event: '진단서 AI 자동 인식', icon: '🔍', highlight: true },
                { time: '14:30:00.015', event: '진단비 3천만원 지급', icon: '💰', highlight: true }
            ],
            benefit: 30000000,
            paid: 30000000,
            own: 0,
            documents: 1
        }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-file-medical mr-2"></i>
                    청구 처리 (서류 0장)
                </h2>
                <p className="text-blue-100">
                    PDV가 자동으로 청구를 제출하고 AI가 0.015ms에 심사하여 즉시 지급. 제출 서류 0장!
                </p>
            </div>

            {/* 탭 선택 */}
            <div className="flex gap-2 border-b">
                {[
                    { id: 'process', name: '청구 프로세스' },
                    { id: 'types', name: '청구 유형' },
                    { id: 'cases', name: '실제 사례' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-6 py-3 font-medium transition-all ${
                            selectedTab === tab.id
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* 프로세스 탭 */}
            {selectedTab === 'process' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">자동 청구 프로세스 (0.015ms)</h3>
                        <div className="space-y-4">
                            {processSteps.map(step => (
                                <div key={step.id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-xl flex-shrink-0">
                                        {step.id}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-bold text-gray-900">{step.name}</span>
                                            <span className="text-blue-600 font-bold">{step.time}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">{step.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">전통 vs PDV 청구 비교</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="pb-3 text-left">단계</th>
                                        <th className="pb-3 text-left">전통 보험</th>
                                        <th className="pb-3 text-left">오픈해시 PDV</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="py-3 font-medium">서류 준비</td>
                                        <td className="py-3 text-gray-600">5-10장 (진단서, 영수증 등)</td>
                                        <td className="py-3 text-green-600 font-bold">0장 (PDV 자동)</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 font-medium">제출 방식</td>
                                        <td className="py-3 text-gray-600">우편/팩스/앱 업로드</td>
                                        <td className="py-3 text-green-600 font-bold">자동 제출</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 font-medium">심사 기간</td>
                                        <td className="py-3 text-gray-600">7-14일</td>
                                        <td className="py-3 text-green-600 font-bold">0.015ms</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-medium">지급 기간</td>
                                        <td className="py-3 text-gray-600">3-5일</td>
                                        <td className="py-3 text-green-600 font-bold">즉시</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 청구 유형 탭 */}
            {selectedTab === 'types' && (
                <div className="grid md:grid-cols-2 gap-6">
                    {claimTypes.map(type => (
                        <div key={type.id} className={`bg-white rounded-lg shadow-md p-6 border-t-4 border-${type.color}-500`}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">{type.icon}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{type.name}</h3>
                                    <div className="text-sm text-gray-600">{type.trigger}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="text-center p-2 bg-gray-50 rounded">
                                    <div className={`font-bold text-${type.color}-600`}>{type.documents}</div>
                                    <div className="text-xs text-gray-600">서류</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                    <div className={`font-bold text-${type.color}-600`}>{type.time}</div>
                                    <div className="text-xs text-gray-600">처리</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                    <div className={`font-bold text-${type.color}-600`}>{type.payment}</div>
                                    <div className="text-xs text-gray-600">지급</div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                {type.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                        <i className={`fas fa-check text-${type.color}-500`}></i>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className={`p-3 bg-${type.color}-50 rounded-lg border border-${type.color}-200`}>
                                <div className="text-xs text-gray-600 mb-1">예시</div>
                                <div className="font-bold text-gray-900">{type.example.patient || type.example.driver || type.example.insured || type.example.owner}</div>
                                <div className="text-sm text-gray-700">{type.example.case}</div>
                                <div className={`text-lg font-bold text-${type.color}-600 mt-2`}>
                                    {type.example.paid?.toLocaleString()}원 지급
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 실제 사례 탭 */}
            {selectedTab === 'cases' && (
                <div className="space-y-6">
                    {realCases.map((case_, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{case_.name} ({case_.age}세)</h3>
                                    <div className="text-gray-600">{case_.type}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600">제출 서류</div>
                                    <div className="text-3xl font-bold text-green-600">{case_.documents}장</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="font-bold text-gray-900 mb-3">처리 타임라인:</div>
                                <div className="space-y-3">
                                    {case_.timeline.map((event, eidx) => (
                                        <div key={eidx} className={`flex items-center gap-4 ${event.highlight ? 'bg-blue-50 rounded-lg p-3' : 'pl-3'}`}>
                                            <span className="text-2xl">{event.icon}</span>
                                            <div className="flex-1">
                                                <div className={`font-medium ${event.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                                                    {event.time}
                                                </div>
                                                <div className="text-sm text-gray-600">{event.event}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">총 진료비/손해액</div>
                                    <div className="font-bold text-lg text-gray-900">
                                        {(case_.total || case_.repairCost || case_.benefit).toLocaleString()}원
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">보험금</div>
                                    <div className="font-bold text-2xl text-green-600">
                                        {case_.paid.toLocaleString()}원
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">본인 부담</div>
                                    <div className="font-bold text-lg text-gray-900">
                                        {case_.own.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 고객 만족도 */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                    <i className="fas fa-star text-yellow-500 mr-2"></i>
                    고객 만족도
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">98.7%</div>
                        <div className="text-sm text-gray-600">"서류 없이 즉시 지급"</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">99.2%</div>
                        <div className="text-sm text-gray-600">"병원 나오자마자 입금"</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">97.5%</div>
                        <div className="text-sm text-gray-600">"다른 보험 못 쓰겠어요"</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
