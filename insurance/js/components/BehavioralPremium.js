const BehavioralPremium = () => {
    const [selectedType, setSelectedType] = React.useState('health');
    const [expandedCase, setExpandedCase] = React.useState(null);

    const insuranceTypes = {
        health: {
            name: '건강보험',
            icon: '🏥',
            color: 'red',
            maxDiscount: 48,
            factors: [
                {
                    name: '운동 습관',
                    weight: 15,
                    description: '일일 걸음 수, 운동 빈도, 운동 강도',
                    tiers: [
                        { level: '우수', criteria: '10,000걸음 이상/일, 주 4회 운동', discount: 15 },
                        { level: '양호', criteria: '7,000-10,000걸음/일, 주 3회 운동', discount: 10 },
                        { level: '보통', criteria: '5,000-7,000걸음/일, 주 2회 운동', discount: 5 },
                        { level: '부족', criteria: '5,000걸음 미만, 운동 부족', discount: 0 }
                    ]
                },
                {
                    name: '수면 패턴',
                    weight: 10,
                    description: '수면 시간, 수면 질, 규칙성',
                    tiers: [
                        { level: '우수', criteria: '7-8시간, 규칙적, 양질의 수면', discount: 10 },
                        { level: '양호', criteria: '6-7시간 또는 8-9시간', discount: 7 },
                        { level: '보통', criteria: '5-6시간 또는 9-10시간', discount: 3 },
                        { level: '부족', criteria: '5시간 미만 또는 10시간 이상', discount: 0 }
                    ]
                },
                {
                    name: '정기 검진',
                    weight: 10,
                    description: '건강검진, 암검진, 치과검진 주기',
                    tiers: [
                        { level: '우수', criteria: '연 1회 종합검진, 정기 암검진', discount: 10 },
                        { level: '양호', criteria: '2년 1회 종합검진', discount: 7 },
                        { level: '보통', criteria: '3년 이상 미검진', discount: 3 },
                        { level: '부족', criteria: '5년 이상 미검진', discount: 0 }
                    ]
                },
                {
                    name: '생활 습관',
                    weight: 8,
                    description: '흡연, 음주, 식습관',
                    tiers: [
                        { level: '우수', criteria: '비흡연, 절주, 건강식', discount: 8 },
                        { level: '양호', criteria: '비흡연, 주 1-2회 음주', discount: 5 },
                        { level: '보통', criteria: '흡연 또는 주 3회 이상 음주', discount: 2 },
                        { level: '부족', criteria: '흡연 + 과음', discount: 0 }
                    ]
                },
                {
                    name: '만성질환 관리',
                    weight: 5,
                    description: '당뇨, 고혈압 등 관리 상태',
                    tiers: [
                        { level: '우수', criteria: '만성질환 없음 또는 완벽 관리', discount: 5 },
                        { level: '양호', criteria: '정기 투약 및 관리 중', discount: 3 },
                        { level: '보통', criteria: '불규칙 관리', discount: 1 },
                        { level: '부족', criteria: '관리 안 함', discount: 0 }
                    ]
                }
            ]
        },
        auto: {
            name: '자동차보험',
            icon: '🚗',
            color: 'blue',
            maxDiscount: 50,
            factors: [
                {
                    name: '주행 거리',
                    weight: 15,
                    description: '월 평균 주행 거리',
                    tiers: [
                        { level: '매우 적음', criteria: '500km 미만/월', discount: 15 },
                        { level: '적음', criteria: '500-1,000km/월', discount: 10 },
                        { level: '보통', criteria: '1,000-1,500km/월', discount: 5 },
                        { level: '많음', criteria: '1,500km 이상/월', discount: 0 }
                    ]
                },
                {
                    name: '안전 운전',
                    weight: 20,
                    description: '급가속, 급정거, 안전거리',
                    tiers: [
                        { level: '우수', criteria: '급가속/급정거 월 5회 미만', discount: 20 },
                        { level: '양호', criteria: '급가속/급정거 월 5-10회', discount: 15 },
                        { level: '보통', criteria: '급가속/급정거 월 10-20회', discount: 8 },
                        { level: '부족', criteria: '급가속/급정거 월 20회 이상', discount: 0 }
                    ]
                },
                {
                    name: '속도 준수',
                    weight: 8,
                    description: '과속 빈도 및 정도',
                    tiers: [
                        { level: '우수', criteria: '과속 없음', discount: 8 },
                        { level: '양호', criteria: '경미한 과속 월 1-2회', discount: 5 },
                        { level: '보통', criteria: '과속 월 3-5회', discount: 2 },
                        { level: '부족', criteria: '과속 월 5회 이상', discount: 0 }
                    ]
                },
                {
                    name: '야간 운전',
                    weight: 5,
                    description: '야간(22시-06시) 운전 비율',
                    tiers: [
                        { level: '적음', criteria: '전체의 10% 미만', discount: 5 },
                        { level: '보통', criteria: '전체의 10-20%', discount: 3 },
                        { level: '많음', criteria: '전체의 20-30%', discount: 1 },
                        { level: '매우 많음', criteria: '전체의 30% 이상', discount: 0 }
                    ]
                },
                {
                    name: '사고 이력',
                    weight: 12,
                    description: '최근 3년간 사고 횟수',
                    tiers: [
                        { level: '무사고', criteria: '0회', discount: 12 },
                        { level: '1회', criteria: '경미한 사고 1회', discount: 6 },
                        { level: '2회', criteria: '사고 2회', discount: 2 },
                        { level: '3회 이상', criteria: '사고 3회 이상', discount: 0 }
                    ]
                }
            ]
        },
        life: {
            name: '생명보험',
            icon: '❤️',
            color: 'purple',
            maxDiscount: 45,
            factors: [
                {
                    name: '건강 점수',
                    weight: 20,
                    description: 'PDV 건강 데이터 종합 점수',
                    tiers: [
                        { level: '매우 건강', criteria: '90점 이상', discount: 20 },
                        { level: '건강', criteria: '80-90점', discount: 15 },
                        { level: '보통', criteria: '70-80점', discount: 8 },
                        { level: '주의', criteria: '70점 미만', discount: 0 }
                    ]
                },
                {
                    name: '직업 위험도',
                    weight: 12,
                    description: '직업군별 위험도 평가',
                    tiers: [
                        { level: '안전', criteria: '사무직, 전문직', discount: 12 },
                        { level: '보통', criteria: '서비스직, 영업직', discount: 8 },
                        { level: '주의', criteria: '운송, 제조', discount: 4 },
                        { level: '위험', criteria: '건설, 광업', discount: 0 }
                    ]
                },
                {
                    name: '재무 안정성',
                    weight: 8,
                    description: '소득, 자산, 부채 상태',
                    tiers: [
                        { level: '우수', criteria: '순자산 5억 이상, 부채비율 30% 이하', discount: 8 },
                        { level: '양호', criteria: '순자산 2억 이상, 부채비율 50% 이하', discount: 5 },
                        { level: '보통', criteria: '순자산 5천만 이상, 부채비율 70% 이하', discount: 2 },
                        { level: '주의', criteria: '그 외', discount: 0 }
                    ]
                },
                {
                    name: '위험 활동',
                    weight: 5,
                    description: '위험 스포츠, 취미 활동',
                    tiers: [
                        { level: '없음', criteria: '위험 활동 없음', discount: 5 },
                        { level: '낮음', criteria: '등산, 수영 등 저위험', discount: 3 },
                        { level: '중간', criteria: '스키, 다이빙 등 중위험', discount: 1 },
                        { level: '높음', criteria: '스카이다이빙 등 고위험', discount: 0 }
                    ]
                }
            ]
        }
    };

    const realCases = [
        {
            id: 1,
            name: '김건강',
            age: 35,
            type: 'health',
            icon: '👨',
            basePrice: 150000,
            finalPrice: 78000,
            discountRate: 48,
            scores: {
                exercise: { score: 15, tier: '우수', detail: '일 12,000걸음, 주 5회 운동' },
                sleep: { score: 10, tier: '우수', detail: '7.5시간 규칙적 수면' },
                checkup: { score: 10, tier: '우수', detail: '연 1회 종합검진' },
                lifestyle: { score: 8, tier: '우수', detail: '비흡연, 절주' },
                chronic: { score: 5, tier: '우수', detail: '만성질환 없음' }
            }
        },
        {
            id: 2,
            name: '이안전',
            age: 42,
            type: 'auto',
            icon: '👨‍💼',
            basePrice: 1200000,
            finalPrice: 600000,
            discountRate: 50,
            scores: {
                distance: { score: 15, tier: '매우 적음', detail: '월 400km' },
                safety: { score: 20, tier: '우수', detail: '급제동 월 3회' },
                speed: { score: 8, tier: '우수', detail: '과속 없음' },
                night: { score: 5, tier: '적음', detail: '야간 5%' },
                accident: { score: 12, tier: '무사고', detail: '3년 무사고' }
            }
        }
    ];

    const currentType = insuranceTypes[selectedType];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-running mr-2"></i>
                    행동 기반 보험료 산정
                </h2>
                <p className="text-orange-100">
                    PDV의 실제 행동 데이터로 공정하게 보험료를 산정합니다. 
                    건강한 생활, 안전한 운전을 하면 최대 60% 할인!
                </p>
            </div>

            {/* 보험 유형 선택 */}
            <div className="flex gap-4">
                {Object.entries(insuranceTypes).map(([key, type]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedType(key)}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                            selectedType === key
                                ? `border-${type.color}-500 bg-${type.color}-50`
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="font-bold text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-600">최대 {type.maxDiscount}% 할인</div>
                    </button>
                ))}
            </div>

            {/* 평가 요인 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className={`fas fa-list-check text-${currentType.color}-600 mr-2`}></i>
                    {currentType.name} 평가 요인
                </h3>
                <div className="space-y-4">
                    {currentType.factors.map((factor, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <div className="font-bold text-gray-900">{factor.name}</div>
                                    <div className="text-sm text-gray-600">{factor.description}</div>
                                </div>
                                <div className={`text-lg font-bold text-${currentType.color}-600`}>
                                    최대 {factor.weight}%
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                                {factor.tiers.map((tier, tidx) => (
                                    <div key={tidx} className="bg-gray-50 rounded p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium text-gray-900">{tier.level}</span>
                                            <span className={`text-${currentType.color}-600 font-bold`}>
                                                -{tier.discount}%
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-600">{tier.criteria}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 실제 사례 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-user-check text-green-600 mr-2"></i>
                    실제 가입 사례
                </h3>
                <div className="space-y-4">
                    {realCases.map(case_ => (
                        <div key={case_.id} className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedCase(expandedCase === case_.id ? null : case_.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl">{case_.icon}</span>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">
                                            {case_.name} ({case_.age}세)
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {insuranceTypes[case_.type].name}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 line-through">
                                            월 {case_.basePrice.toLocaleString()}원
                                        </div>
                                        <div className="text-lg font-bold text-green-600">
                                            월 {case_.finalPrice.toLocaleString()}원
                                        </div>
                                    </div>
                                    <div className={`text-2xl font-bold text-${insuranceTypes[case_.type].color}-600`}>
                                        {case_.discountRate}% 할인
                                    </div>
                                    <i className={`fas fa-chevron-${expandedCase === case_.id ? 'up' : 'down'} text-gray-400`}></i>
                                </div>
                            </button>
                            
                            {expandedCase === case_.id && (
                                <div className="px-4 pb-4 bg-gray-50 border-t">
                                    <div className="font-medium text-gray-700 mb-3 mt-3">상세 평가 내역:</div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {Object.entries(case_.scores).map(([key, score]) => (
                                            <div key={key} className="bg-white rounded p-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-medium text-gray-900">{key}</span>
                                                    <span className="text-green-600 font-bold">-{score.score}%</span>
                                                </div>
                                                <div className="text-xs text-gray-600 mb-1">{score.tier}</div>
                                                <div className="text-xs text-gray-500">{score.detail}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 실시간 조정 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                    <i className="fas fa-sync-alt text-orange-600 mr-2"></i>
                    실시간 보험료 조정
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>PDV 데이터가 업데이트되면 0.015ms 내 보험료 재계산</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>운동량 증가, 안전운전 개선 즉시 할인 적용</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>월말 정산 시 다음 달 보험료 자동 조정</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="fas fa-check text-green-600"></i>
                        <span>건강 개선 노력에 대한 즉각적인 금전적 보상</span>
                    </div>
                </div>
            </div>

            {/* 게이미피케이션 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-trophy text-yellow-500 mr-2"></i>
                    건강 챌린지 & 리워드
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">🏃</div>
                        <div className="font-bold text-gray-900 mb-2">30일 운동 챌린지</div>
                        <div className="text-sm text-gray-600 mb-2">
                            30일간 매일 10,000걸음 달성
                        </div>
                        <div className="text-green-600 font-bold">추가 5% 할인</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">🚗</div>
                        <div className="font-bold text-gray-900 mb-2">안전운전 챌린지</div>
                        <div className="text-sm text-gray-600 mb-2">
                            90일간 무사고 안전운전
                        </div>
                        <div className="text-blue-600 font-bold">추가 10% 할인</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                        <div className="text-3xl mb-2">💪</div>
                        <div className="font-bold text-gray-900 mb-2">금연 챌린지</div>
                        <div className="text-sm text-gray-600 mb-2">
                            6개월 금연 성공
                        </div>
                        <div className="text-purple-600 font-bold">추가 15% 할인</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
