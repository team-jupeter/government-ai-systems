const { useState } = React;

const AIAutomation = () => {
    const [selectedAI, setSelectedAI] = useState(null);
    
    const aiSystems = [
        {
            id: 'language',
            name: '다국어 정보 자동 분석',
            icon: '🌍',
            model: 'DeepSeek R1 Multilingual',
            accuracy: '98.2%',
            languages: 98,
            description: '전세계 98개 언어로 작성된 정보를 실시간으로 번역하고 분석합니다.',
            capabilities: [
                '실시간 기계번역 (98개 언어)',
                '문맥 기반 의미 추출',
                '정보 신뢰도 자동 평가',
                '요약 및 핵심 키워드 추출'
            ],
            performance: {
                speed: '평균 0.8초/문서',
                throughput: '시간당 4,500건',
                accuracy: '98.2%',
                languages: '98개 언어'
            }
        },
        {
            id: 'threat',
            name: '위협 탐지 및 예측',
            icon: '🎯',
            model: 'DeepSeek R1 Threat Intelligence',
            accuracy: '96.5%',
            languages: 1,
            description: '정보를 분석하여 국가 안보 위협을 조기에 탐지하고 예측합니다.',
            capabilities: [
                '이상징후 패턴 인식',
                '위협 수준 자동 평가',
                '공격 시나리오 예측',
                '대응 전략 추천'
            ],
            performance: {
                speed: '평균 1.2초/분석',
                throughput: '시간당 3,000건',
                accuracy: '96.5%',
                falsePositive: '2.3%'
            }
        },
        {
            id: 'network',
            name: '네트워크 관계 분석',
            icon: '🔍',
            model: 'DeepSeek R1 Network Analysis',
            accuracy: '94.8%',
            languages: 1,
            description: '인물·조직 간의 복잡한 관계를 시각화하고 핵심 인물을 식별합니다.',
            capabilities: [
                '관계망 자동 생성',
                '핵심 인물 식별',
                '연결고리 추적',
                '영향력 분석'
            ],
            performance: {
                speed: '평균 2.5초/네트워크',
                throughput: '시간당 1,440건',
                accuracy: '94.8%',
                nodes: '최대 10,000개'
            }
        },
        {
            id: 'cyber',
            name: '사이버 공격 탐지',
            icon: '🛡️',
            model: 'DeepSeek R1 Cyber Defense',
            accuracy: '99.1%',
            languages: 1,
            description: 'APT 공격, 제로데이 취약점 등 사이버 위협을 실시간으로 탐지합니다.',
            capabilities: [
                '실시간 트래픽 분석',
                'APT 공격 패턴 학습',
                '제로데이 취약점 예측',
                '자동 대응 시나리오 생성'
            ],
            performance: {
                speed: '평균 0.1초/패킷',
                throughput: '초당 100만 패킷',
                accuracy: '99.1%',
                falsePositive: '0.3%'
            }
        },
        {
            id: 'image',
            name: '위성·영상 분석',
            icon: '🛰️',
            model: 'DeepSeek R1 Vision',
            accuracy: '97.3%',
            languages: 1,
            description: '위성사진과 영상에서 군사시설, 인원, 장비 변화를 자동 탐지합니다.',
            capabilities: [
                '객체 자동 인식',
                '변화 탐지 (시계열)',
                '군사시설 분류',
                '인원·장비 계수'
            ],
            performance: {
                speed: '평균 3.2초/이미지',
                throughput: '시간당 1,125건',
                accuracy: '97.3%',
                resolution: '최소 30cm'
            }
        },
        {
            id: 'sentiment',
            name: '여론 및 감정 분석',
            icon: '💬',
            model: 'DeepSeek R1 Sentiment',
            accuracy: '95.7%',
            languages: 45,
            description: 'SNS와 매체를 분석하여 여론 동향과 감정 변화를 추적합니다.',
            capabilities: [
                'SNS 실시간 모니터링',
                '감정 분류 (긍정/부정/중립)',
                '이슈 확산 예측',
                '여론 조작 탐지'
            ],
            performance: {
                speed: '평균 0.5초/게시물',
                throughput: '시간당 7,200건',
                accuracy: '95.7%',
                languages: '45개 언어'
            }
        }
    ];
    
    const automationStats = [
        { category: '정보 수집', total: 892, aiProcessed: 612, humanReview: 280, rate: 68.6 },
        { category: '위협 분석', total: 456, aiProcessed: 389, humanReview: 67, rate: 85.3 },
        { category: '네트워크 분석', total: 234, aiProcessed: 198, humanReview: 36, rate: 84.6 },
        { category: '사이버 방어', total: 1234, aiProcessed: 1198, humanReview: 36, rate: 97.1 },
        { category: '영상 분석', total: 156, aiProcessed: 134, humanReview: 22, rate: 85.9 },
        { category: '여론 모니터링', total: 2345, aiProcessed: 2201, humanReview: 144, rate: 93.9 }
    ];
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-900 to-purple-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">AI 자동화 시스템</h2>
                <p className="text-purple-100 text-sm">
                    DeepSeek R1 기반 6개 AI 모델이 정보 수집부터 분석까지 자동화합니다
                </p>
            </div>
            
            {/* 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="AI 처리율" 
                    value="68.5%" 
                    subtitle="오늘 기준"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="처리 속도" 
                    value="1.5초" 
                    subtitle="평균/건"
                    icon="⚡" 
                    color="blue" 
                />
                <StatCard 
                    title="정확도" 
                    value="96.8%" 
                    subtitle="전체 평균"
                    icon="🎯" 
                    color="green" 
                />
                <StatCard 
                    title="시간 절감" 
                    value="95%" 
                    subtitle="vs 수동 처리"
                    icon="⏱️" 
                    color="orange" 
                />
            </div>
            
            {/* 업무별 자동화율 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">업무별 AI 자동화율</h3>
                <div className="space-y-4">
                    {automationStats.map((stat, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-900">{stat.category}</span>
                                <div className="text-right">
                                    <span className="font-bold text-purple-600">{stat.rate}%</span>
                                    <span className="text-gray-500 ml-2">
                                        (AI {stat.aiProcessed} / 전체 {stat.total})
                                    </span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-gradient-to-r from-purple-600 to-purple-500 h-3 rounded-full transition-all"
                                    style={{width: `${stat.rate}%`}}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* AI 시스템 카드 */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI 모델별 상세 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aiSystems.map((ai) => (
                        <div 
                            key={ai.id}
                            className="bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedAI(selectedAI === ai.id ? null : ai.id)}
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">{ai.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{ai.name}</h4>
                                            <p className="text-xs text-gray-500">{ai.model}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-600">정확도</span>
                                        <span className="text-sm font-bold text-purple-600">{ai.accuracy}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{width: ai.accuracy}}
                                        ></div>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-3">{ai.description}</p>
                                
                                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                                    {selectedAI === ai.id ? '접기 ▲' : '자세히 보기 ▼'}
                                </button>
                            </div>
                            
                            <div className={`expandable-card ${selectedAI === ai.id ? 'expanded' : 'collapsed'} bg-gray-50 border-t border-gray-200`}>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2">🔧 주요 기능</h5>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            {ai.capabilities.map((cap, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="text-purple-600 mr-2">▸</span>
                                                    {cap}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2">📊 성능 지표</h5>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            {Object.entries(ai.performance).map(([key, value]) => (
                                                <div key={key} className="bg-white rounded p-2">
                                                    <div className="text-xs text-gray-500">{key}</div>
                                                    <div className="font-semibold text-gray-900">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded p-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">국가데이터처 연동</span>
                                            <OpenHashBadge type="verified" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 인간-AI 협력 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">인간-AI 협력 체계</h3>
                <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">AI 1차 분석</h4>
                            <p className="text-sm text-gray-600">
                                모든 정보는 AI가 먼저 분석하여 위협 수준, 신뢰도, 중요도를 자동 평가합니다.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <span className="text-2xl">⬇️</span>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">우선순위 분류</h4>
                            <p className="text-sm text-gray-600">
                                AI가 중요도에 따라 자동 분류: 긴급(즉시 보고), 중요(요원 검토), 일반(자동 처리)
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <span className="text-2xl">⬇️</span>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                            3
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">전문 요원 검토</h4>
                            <p className="text-sm text-gray-600">
                                중요·긴급 정보는 해당 분야 전문 요원이 AI 분석을 검토하고 최종 판단합니다.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <span className="text-2xl">⬇️</span>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                            4
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">결과 저장 및 학습</h4>
                            <p className="text-sm text-gray-600">
                                요원의 판단은 AI 학습 데이터로 활용되어 정확도가 지속적으로 향상됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* AI 윤리 및 안전장치 */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI 윤리 및 안전장치</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">⚖️</span>
                            <h4 className="font-semibold text-gray-900">인간 최종 승인</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            중요한 의사결정(수사 개시, 작전 실행 등)은 
                            반드시 전문 요원의 최종 승인 필요
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">🔍</span>
                            <h4 className="font-semibold text-gray-900">편향성 모니터링</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            AI 판단의 편향성을 실시간 모니터링하여 
                            특정 집단에 대한 차별 방지
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">📋</span>
                            <h4 className="font-semibold text-gray-900">설명 가능한 AI</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            모든 AI 판단은 근거와 이유를 함께 제시하여 
                            요원이 검증 가능
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">🔒</span>
                            <h4 className="font-semibold text-gray-900">개인정보 보호</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            개인정보는 암호화 처리하여 
                            AI도 본인만 복호화 가능
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AIAutomation = AIAutomation;
