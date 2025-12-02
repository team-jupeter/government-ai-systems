const FraudDetection = () => {
    const [selectedTab, setSelectedTab] = React.useState('system');
    const [expandedType, setExpandedType] = React.useState(null);

    const fraudTypes = [
        {
            id: 'overcharge',
            name: '과다 청구',
            icon: '💊',
            color: 'red',
            detectionRate: 99.2,
            description: '실제보다 높은 금액 청구 또는 미실시 진료 청구',
            methods: [
                { method: 'PDV 병원 기록 대조', accuracy: '99.5%' },
                { method: 'AI 가격 정상성 분석', accuracy: '98.8%' },
                { method: '시간적 일관성 검증', accuracy: '99.7%' },
                { method: '중복 청구 방지', accuracy: '100%' }
            ],
            case: {
                name: '김사기',
                fraud: '허위 맹장수술 350만원 청구',
                detection: [
                    'PDV 병원 방문 기록 없음',
                    '청구 시간에 직장 근무 중 (GPS)',
                    '해당 병원 수술 기록 없음',
                    '3개월 전 동일 청구 이력'
                ],
                result: '즉시 차단 (0.008ms)',
                action: '계약 해지 + 법적 조치'
            }
        },
        {
            id: 'intentional',
            name: '고의 사고',
            icon: '🚗',
            color: 'blue',
            detectionRate: 97.8,
            description: '보험금 수령 목적의 계획된 사고',
            methods: [
                { method: '블랙박스 AI 분석', accuracy: '96.5%' },
                { method: '사고 패턴 학습', accuracy: '98.2%' },
                { method: 'PDV 운전 습관 분석', accuracy: '95.7%' },
                { method: '관계자 네트워크 분석', accuracy: '99.1%' }
            ],
            case: {
                name: '이고의',
                fraud: '보험사기단 가담 추돌사고 480만원 청구',
                detection: [
                    '블랙박스 분석: 피해자 급정거 유도',
                    '가해자-피해자 2주 전 통화 이력 (PDV)',
                    '피해자 최근 6개월 사고 5회',
                    '수리 견적 시세 대비 200% 과다'
                ],
                result: '사기 확정 (0.012ms)',
                action: '청구 거절 + 경찰 고발'
            }
        },
        {
            id: 'false-diagnosis',
            name: '허위 진단',
            icon: '🩺',
            color: 'purple',
            detectionRate: 98.5,
            description: '실제로 발병하지 않은 질병 진단 청구',
            methods: [
                { method: 'PDV 건강 이력 분석', accuracy: '97.8%' },
                { method: '복수 병원 교차 검증', accuracy: '98.9%' },
                { method: '증상 발현 시기 분석', accuracy: '96.3%' },
                { method: '의료진 신뢰도 평가', accuracy: '99.5%' }
            ],
            case: {
                name: '박허위',
                fraud: '폐암 진단 조작 5천만원 청구',
                detection: [
                    '1개월 전 건강검진 이상 없음',
                    'PDV 활동량 정상 (폐암 증상 없음)',
                    '진단 병원 허위 진단 전과 3회',
                    '흡연 이력 없음 (PDV)'
                ],
                result: '사기 의심',
                action: '재검진 요청 → 타 병원 검진 후 정상 판정'
            }
        },
        {
            id: 'arson',
            name: '고의 방화',
            icon: '🔥',
            color: 'orange',
            detectionRate: 96.7,
            description: '보험금 목적의 계획된 화재',
            methods: [
                { method: 'IoT 센서 데이터 분석', accuracy: '95.2%' },
                { method: 'PDV 재무 상태 분석', accuracy: '97.8%' },
                { method: '발화지점 AI 분석', accuracy: '98.5%' },
                { method: '가입 시기 분석', accuracy: '99.2%' }
            ],
            case: {
                name: '최방화',
                fraud: '고의 방화 1.5억원 청구',
                detection: [
                    'IoT: 화재 10분 전 외출 (평소와 다른 시간)',
                    'PDV 부채 3억 (최근 사업 실패)',
                    '보험금 2주 전 1억→1.5억 증액',
                    '소방서: 복수 발화지점 확인'
                ],
                result: '사기 확정 (0.015ms)',
                action: '청구 거절 + 검찰 송치'
            }
        },
        {
            id: 'identity-theft',
            name: '신원 도용',
            icon: '🎭',
            color: 'pink',
            detectionRate: 99.8,
            description: '타인 명의로 보험 가입 및 청구',
            methods: [
                { method: '전화번호 ID 검증', accuracy: '99.9%' },
                { method: 'PDV 생체 데이터', accuracy: '99.95%' },
                { method: '행동 패턴 분석', accuracy: '98.7%' },
                { method: '위치 정보 교차 검증', accuracy: '99.5%' }
            ],
            case: {
                name: '정도용',
                fraud: '타인 명의 도용 교통사고 청구',
                detection: [
                    '전화번호 본인 인증 실패',
                    '얼굴 인식: 가입자와 불일치',
                    'PDV: 사고 시간 가입자는 해외 체류',
                    '청구자 IP 주소 이상 지역'
                ],
                result: '즉시 차단 (0.005ms)',
                action: '신원 도용죄 고발'
            }
        }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-search mr-2"></i>
                    사기 탐지 (98.7%)
                </h2>
                <p className="text-red-100">
                    AI 앙상블 + PDV 교차 검증으로 98.7% 사기 탐지율 달성. 오탐률 0.3%로 정상 청구 보호
                </p>
            </div>

            {/* 탭 선택 */}
            <div className="flex gap-2 border-b">
                {[
                    { id: 'system', name: '탐지 시스템' },
                    { id: 'types', name: '사기 유형' },
                    { id: 'monitoring', name: '실시간 모니터링' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-6 py-3 font-medium transition-all ${
                            selectedTab === tab.id
                                ? 'border-b-2 border-red-600 text-red-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* 탐지 시스템 탭 */}
            {selectedTab === 'system' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                            <i className="fas fa-brain text-purple-600 mr-2"></i>
                            AI 앙상블 사기 탐지 모델
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="font-bold text-gray-900 mb-3">5개 독립 AI 동시 분석</div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-check text-green-600"></i>
                                        <span><strong>패턴 인식 AI:</strong> 과거 사기 패턴 학습</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-check text-green-600"></i>
                                        <span><strong>통계 분석 AI:</strong> 이상치 탐지</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-check text-green-600"></i>
                                        <span><strong>네트워크 분석 AI:</strong> 관계자 연관성</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-check text-green-600"></i>
                                        <span><strong>행동 분석 AI:</strong> PDV 패턴 비교</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-check text-green-600"></i>
                                        <span><strong>시계열 분석 AI:</strong> 시간적 일관성</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 mb-3">최종 판단 방식</div>
                                <div className="space-y-2 text-sm">
                                    <div>• 5개 AI의 투표로 최종 결정</div>
                                    <div>• 3개 이상 동의 시 사기로 확정</div>
                                    <div>• 단일 모델 대비 +15%p 정확도</div>
                                    <div className="mt-4 p-3 bg-red-50 rounded">
                                        <div className="text-2xl font-bold text-red-600">98.7%</div>
                                        <div className="text-xs text-gray-600">사기 탐지율</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                            <i className="fas fa-shield-alt text-blue-600 mr-2"></i>
                            PDV 데이터 교차 검증
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                {
                                    name: '위치 정보 검증',
                                    desc: 'PDV GPS로 청구 시점 실제 위치 확인',
                                    example: '병원 방문 없이 진료비 청구 / 사고 장소 불일치'
                                },
                                {
                                    name: '건강 이력 검증',
                                    desc: 'PDV 건강 데이터로 질병 발생 가능성 평가',
                                    example: '급성 질병인데 과거 징후 없음 / 만성질환인데 관리 기록 없음'
                                },
                                {
                                    name: '네트워크 검증',
                                    desc: 'PDV 통화/문자 기록으로 관계자 간 연관성 분석',
                                    example: '사고 당사자들 사전 접촉 이력 있으면 고의 사고 의심'
                                },
                                {
                                    name: '재무 상태 검증',
                                    desc: 'PDV 재무제표로 경제적 동기 파악',
                                    example: '심각한 부채 + 갑작스런 사고/질병 = 사기 가능성 높음'
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="border rounded-lg p-4">
                                    <div className="font-bold text-gray-900 mb-2">{item.name}</div>
                                    <div className="text-sm text-gray-700 mb-2">{item.desc}</div>
                                    <div className="text-xs text-gray-500 italic">예: {item.example}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">
                            <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                            보험사기단 적발 사례
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="font-bold text-gray-900 mb-2">2025-11-15 적발</div>
                                <div className="space-y-1 text-gray-700">
                                    <div>• 조직원: 8명</div>
                                    <div>• 청구 건수: 12건</div>
                                    <div>• 청구 금액: 3.4억원</div>
                                    <div>• 탐지 시간: 0.025ms</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 mb-2">탐지 과정</div>
                                <div className="space-y-1 text-gray-700 text-xs">
                                    <div>09:30:00.000 - 김사기 자동차 사고 청구</div>
                                    <div>09:30:00.008 - AI 이상 패턴 감지</div>
                                    <div>09:30:00.012 - PDV 네트워크 분석</div>
                                    <div>09:30:00.015 - 연관 청구 11건 발견</div>
                                    <div>09:30:00.025 - 사기 확정</div>
                                    <div>09:35:00.000 - 경찰 고발</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 사기 유형 탭 */}
            {selectedTab === 'types' && (
                <div className="space-y-4">
                    {fraudTypes.map(type => (
                        <div key={type.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <button
                                onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
                                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{type.icon}</span>
                                    <div className="text-left">
                                        <div className="font-bold text-xl text-gray-900">{type.name}</div>
                                        <div className="text-sm text-gray-600">{type.description}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`text-center px-4 py-2 bg-${type.color}-50 rounded-lg`}>
                                        <div className={`text-2xl font-bold text-${type.color}-600`}>
                                            {type.detectionRate}%
                                        </div>
                                        <div className="text-xs text-gray-600">탐지율</div>
                                    </div>
                                    <i className={`fas fa-chevron-${expandedType === type.id ? 'up' : 'down'} text-gray-400`}></i>
                                </div>
                            </button>

                            {expandedType === type.id && (
                                <div className="px-6 pb-6 bg-gray-50 border-t">
                                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                                        <div>
                                            <div className="font-bold text-gray-900 mb-3">탐지 방법</div>
                                            <div className="space-y-2">
                                                {type.methods.map((method, idx) => (
                                                    <div key={idx} className="flex justify-between items-center p-2 bg-white rounded">
                                                        <span className="text-sm text-gray-700">{method.method}</span>
                                                        <span className={`text-sm font-bold text-${type.color}-600`}>
                                                            {method.accuracy}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 mb-3">적발 사례</div>
                                            <div className="bg-white rounded-lg p-4">
                                                <div className="font-bold text-gray-900 mb-2">{type.case.name}</div>
                                                <div className="text-sm text-red-600 mb-3">{type.case.fraud}</div>
                                                <div className="text-xs text-gray-700 space-y-1 mb-3">
                                                    {type.case.detection.map((d, idx) => (
                                                        <div key={idx}>• {d}</div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center pt-3 border-t">
                                                    <span className="text-xs text-gray-600">{type.case.result}</span>
                                                    <span className="text-xs font-bold text-red-600">{type.case.action}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* 실시간 모니터링 탭 */}
            {selectedTab === 'monitoring' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">오늘의 현황</h3>
                        <div className="grid md:grid-cols-5 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-blue-600">1,247</div>
                                <div className="text-sm text-gray-600">총 청구</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-3xl font-bold text-red-600">23</div>
                                <div className="text-sm text-gray-600">사기 탐지</div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <div className="text-3xl font-bold text-yellow-600">4</div>
                                <div className="text-sm text-gray-600">오탐</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <div className="text-3xl font-bold text-purple-600">0.015ms</div>
                                <div className="text-sm text-gray-600">처리 속도</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-3xl font-bold text-green-600">98.7%</div>
                                <div className="text-sm text-gray-600">정확도</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                            정상 청구 보호 메커니즘
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    name: '다단계 검증',
                                    desc: '5개 AI 중 3개 이상이 사기로 판단해야 최종 확정. 1-2개만 의심 시 정상 청구로 처리'
                                },
                                {
                                    name: '이의 신청',
                                    desc: '사기로 오판된 경우 즉시 이의신청 가능. 인간 심사자가 24시간 내 재검토, 정상 청구 시 즉시 지급'
                                },
                                {
                                    name: '설명 가능 AI',
                                    desc: 'AI가 사기로 판단한 근거 명확히 제시. 블랙박스가 아닌 투명한 판단 과정 공개'
                                },
                                {
                                    name: '보상 제도',
                                    desc: '오탐으로 인한 지연 발생 시 지연 이자 자동 지급. 고객 불편 최소화 및 신뢰 회복'
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="border-l-4 border-green-500 pl-4">
                                    <div className="font-bold text-gray-900 mb-2">{item.name}</div>
                                    <div className="text-sm text-gray-600">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                            <h4 className="font-bold text-gray-900 mb-3">전통 보험 사기 피해</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div>• 연 4.5조원 (한국 전체)</div>
                                <div>• 탐지율: 12% (대부분 미탐지)</div>
                                <div>• 수사 기간: 수개월~수년</div>
                                <div>• 선량한 가입자가 비용 부담</div>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                            <h4 className="font-bold text-gray-900 mb-3">오픈해시 보험</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div>• 98.7% 탐지 (AI+PDV 실시간 분석)</div>
                                <div>• 오탐률: 0.3% (정상 청구 보호)</div>
                                <div>• 분석 시간: 0.015ms</div>
                                <div>• 연 손실: 580억원 (95% 절감)</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
