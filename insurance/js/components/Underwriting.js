const Underwriting = () => {
    const [selectedTab, setSelectedTab] = React.useState('process');
    const [simulationStep, setSimulationStep] = React.useState(0);

    const steps = [
        { id: 1, name: 'PDV 데이터 수집', time: '0.005ms', icon: '📊', desc: '재무제표, 건강, 운전, 생활 패턴' },
        { id: 2, name: 'AI 리스크 분석', time: '0.008ms', icon: '🤖', desc: '사망/질병/사고/재무 확률 계산' },
        { id: 3, name: '보험료 산정', time: '0.001ms', icon: '💰', desc: '기본료 + PDV 할인 - 위험 할증' },
        { id: 4, name: '즉시 승인', time: '0.001ms', icon: '✅', desc: '승인/조건부/거절 + 증권발행' }
    ];

    const evaluationFactors = [
        {
            category: '재무 안정성',
            weight: 25,
            maxPoints: 250,
            items: [
                { name: '순자산', points: 20, good: '5억 이상', bad: '부채 초과' },
                { name: '소득 안정성', points: 15, good: '정규직', bad: '불안정' },
                { name: '부채비율', points: 10, good: '30% 이하', bad: '70% 이상' },
                { name: '신용등급', points: 15, good: '1-3등급', bad: '7등급 이하' }
            ]
        },
        {
            category: '건강 상태',
            weight: 30,
            maxPoints: 300,
            items: [
                { name: '만성질환', points: 25, good: '없음', bad: '3개 이상' },
                { name: 'BMI', points: 20, good: '18.5-24.9', bad: '30 이상' },
                { name: '운동습관', points: 15, good: '주 4회 이상', bad: '전무' },
                { name: '흡연여부', points: 20, good: '비흡연', bad: '흡연' }
            ]
        },
        {
            category: '직업 위험도',
            weight: 20,
            maxPoints: 200,
            items: [
                { name: '직업군', points: 20, good: '사무/전문직', bad: '광업/건설' },
                { name: '산재이력', points: 15, good: '없음', bad: '2회 이상' },
                { name: '위험작업', points: 15, good: '없음', bad: '고위험' },
                { name: '근무안정성', points: 10, good: '10년 이상', bad: '1년 미만' }
            ]
        },
        {
            category: '생활 패턴',
            weight: 15,
            maxPoints: 150,
            items: [
                { name: '위험활동', points: 15, good: '없음', bad: '고위험 취미' },
                { name: '거주지역', points: 10, good: '안전지역', bad: '재해 다발' },
                { name: '운전습관', points: 12, good: '안전운전', bad: '사고 다발' },
                { name: '음주습관', points: 8, good: '절주', bad: '과음' }
            ]
        },
        {
            category: '가족력',
            weight: 10,
            maxPoints: 100,
            items: [
                { name: '암 가족력', points: 10, good: '없음', bad: '직계 2명+' },
                { name: '심혈관질환', points: 8, good: '없음', bad: '직계 있음' },
                { name: '유전질환', points: 7, good: '없음', bad: '있음' },
                { name: '장수 가족', points: 5, good: '80세 이상', bad: '60세 미만' }
            ]
        }
    ];

    const realCases = [
        {
            name: '박건강',
            age: 35,
            job: 'IT 사무직',
            score: 920,
            grade: 'A+',
            result: '즉시 승인',
            basePrice: 150000,
            finalPrice: 78000,
            discountRate: 48,
            scores: {
                financial: 85,
                health: 95,
                job: 90,
                lifestyle: 88,
                family: 82
            }
        },
        {
            name: '김조건',
            age: 48,
            job: '건설 현장직',
            score: 650,
            grade: 'C',
            result: '조건부 승인',
            basePrice: 180000,
            finalPrice: 180000,
            discountRate: 0,
            scores: {
                financial: 65,
                health: 55,
                job: 45,
                lifestyle: 60,
                family: 70
            },
            conditions: ['심전도 검사', '혈액검사', '간기능 검사']
        },
        {
            name: '이우수',
            age: 28,
            job: '공무원',
            score: 880,
            grade: 'A',
            result: '즉시 승인',
            basePrice: 120000,
            finalPrice: 64800,
            discountRate: 46,
            scores: {
                financial: 88,
                health: 92,
                job: 95,
                lifestyle: 85,
                family: 80
            }
        }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-user-check mr-2"></i>
                    AI 언더라이팅
                </h2>
                <p className="text-indigo-100">
                    DeepSeek R1 기반 AI 앙상블 모델이 0.015ms 만에 자동 심사하여 즉시 승인 또는 거절 결정
                </p>
            </div>

            {/* 탭 선택 */}
            <div className="flex gap-2 border-b">
                {[
                    { id: 'process', name: '언더라이팅 프로세스' },
                    { id: 'factors', name: '평가 요인' },
                    { id: 'cases', name: '실제 사례' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`px-6 py-3 font-medium transition-all ${
                            selectedTab === tab.id
                                ? 'border-b-2 border-indigo-600 text-indigo-600'
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
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                            4단계 자동 언더라이팅 (총 0.015ms)
                        </h3>
                        <div className="space-y-4">
                            {steps.map((step, idx) => (
                                <div key={step.id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-gray-900">STEP {step.id}: {step.name}</span>
                                            <span className="text-indigo-600 font-bold">{step.time}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">{step.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">총 처리 시간</span>
                                <span className="text-2xl font-bold text-indigo-600">0.015ms</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">
                                전통 보험사 평균 3일 대비 <span className="font-bold text-indigo-600">28,800,000배</span> 빠름
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">
                            <i className="fas fa-brain text-purple-600 mr-2"></i>
                            AI 앙상블 모델
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="font-medium text-gray-900 mb-2">5개 독립 AI 동시 분석</div>
                                <div className="space-y-1 text-gray-700">
                                    <div>• 패턴 인식 AI: 과거 사례 학습</div>
                                    <div>• 통계 분석 AI: 확률 계산</div>
                                    <div>• 네트워크 AI: 관계 분석</div>
                                    <div>• 행동 분석 AI: PDV 패턴</div>
                                    <div>• 시계열 AI: 변화 추적</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-medium text-gray-900 mb-2">최종 판단 방식</div>
                                <div className="space-y-1 text-gray-700">
                                    <div>• 5개 AI의 투표로 결정</div>
                                    <div>• 3개 이상 동의 시 확정</div>
                                    <div>• 단일 모델 대비 +15%p 정확도</div>
                                    <div>• 정확도: 99.2%</div>
                                    <div>• 편향 제거 및 투명성 보장</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 평가 요인 탭 */}
            {selectedTab === 'factors' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                            5개 카테고리 평가 (1000점 만점)
                        </h3>
                        <div className="space-y-6">
                            {evaluationFactors.map((factor, idx) => (
                                <div key={idx} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <span className="font-bold text-lg text-gray-900">{factor.category}</span>
                                            <span className="text-sm text-gray-600 ml-2">({factor.weight}%)</span>
                                        </div>
                                        <span className="text-indigo-600 font-bold">{factor.maxPoints}점</span>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {factor.items.map((item, iidx) => (
                                            <div key={iidx} className="bg-gray-50 rounded p-3">
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-medium text-gray-900">{item.name}</span>
                                                    <span className="text-indigo-600 font-bold">+{item.points}</span>
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    <span className="text-green-600">✓ {item.good}</span>
                                                    {' / '}
                                                    <span className="text-red-600">✗ {item.bad}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">등급 체계</h3>
                        <div className="space-y-3">
                            {[
                                { grade: 'A+', range: '900-1000', result: '즉시 승인 + 최대 할인', color: 'green' },
                                { grade: 'A', range: '800-899', result: '즉시 승인 + 높은 할인', color: 'blue' },
                                { grade: 'B', range: '700-799', result: '즉시 승인 + 일반 할인', color: 'purple' },
                                { grade: 'C', range: '600-699', result: '조건부 승인 + 추가 검진', color: 'yellow' },
                                { grade: 'D', range: '600 미만', result: '거절 + 개선 후 재신청', color: 'red' }
                            ].map((tier, idx) => (
                                <div key={idx} className={`flex justify-between items-center p-4 rounded-lg bg-${tier.color}-50 border border-${tier.color}-200`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`text-2xl font-bold text-${tier.color}-600`}>{tier.grade}</div>
                                        <div>
                                            <div className="font-medium text-gray-900">{tier.range}점</div>
                                            <div className="text-sm text-gray-600">{tier.result}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 실제 사례 탭 */}
            {selectedTab === 'cases' && (
                <div className="space-y-6">
                    {realCases.map((case_, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{case_.name} ({case_.age}세)</h3>
                                    <div className="text-gray-600">{case_.job}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-indigo-600 mb-1">{case_.score}점</div>
                                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-bold">
                                        {case_.grade}등급
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-5 gap-3 mb-4">
                                {Object.entries(case_.scores).map(([key, value]) => (
                                    <div key={key} className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-2xl font-bold text-indigo-600">{value}</div>
                                        <div className="text-xs text-gray-600 mt-1">{key}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 p-4 bg-indigo-50 rounded-lg">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">심사 결과</div>
                                    <div className="font-bold text-lg text-gray-900">{case_.result}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">기본 보험료</div>
                                    <div className="font-bold text-lg text-gray-400 line-through">
                                        월 {case_.basePrice.toLocaleString()}원
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">최종 보험료</div>
                                    <div className="font-bold text-2xl text-green-600">
                                        월 {case_.finalPrice.toLocaleString()}원
                                        <span className="text-sm ml-2">({case_.discountRate}% 할인)</span>
                                    </div>
                                </div>
                            </div>

                            {case_.conditions && (
                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="font-bold text-gray-900 mb-2">
                                        <i className="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                                        추가 조건
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {case_.conditions.map((cond, cidx) => (
                                            <span key={cidx} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                                {cond}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
