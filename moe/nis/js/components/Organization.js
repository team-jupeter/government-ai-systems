const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: [
            { position: '국가정보원장', name: '장관급 정무직', description: '국가정보원 총괄' },
            { position: '제1차장', name: '차관급 정무직', description: '해외·대북 정보 수집' },
            { position: '제2차장', name: '차관급 정무직', description: '방첩 업무' },
            { position: '제3차장', name: '차관급 정무직', description: '사이버·산업보안' }
        ],
        departments: [
            {
                id: 'overseas',
                name: '해외정보국',
                icon: '🌍',
                classification: 'restricted',
                mainTasks: [
                    '전세계 주요국 정보 수집',
                    '외국 정보기관 협력',
                    '해외 안보 위협 분석',
                    '국제 테러 정보 수집'
                ],
                aiTasks: [
                    'AI 다국어 정보 자동 번역 (98개 언어)',
                    '정보 신뢰도 자동 평가',
                    '지정학적 리스크 예측 모델',
                    '글로벌 이슈 실시간 모니터링'
                ]
            },
            {
                id: 'north-korea',
                name: '대북정보국',
                icon: '🎯',
                classification: 'confidential',
                mainTasks: [
                    '북한 군사 동향 파악',
                    '북한 정치 상황 분석',
                    '대북 정보망 운영',
                    '북핵·미사일 정보 수집'
                ],
                aiTasks: [
                    'AI 북한 매체 자동 분석',
                    '위성사진 이상징후 탐지',
                    '북한 경제 지표 추정 모델',
                    '군사시설 변화 자동 추적'
                ]
            },
            {
                id: 'counter-intelligence',
                name: '방첩국',
                icon: '🔍',
                classification: 'confidential',
                mainTasks: [
                    '외국 정보기관 활동 탐지',
                    '산업기밀 유출 방지',
                    '간첩 색출 및 조사',
                    '국가 기밀 보호'
                ],
                aiTasks: [
                    'AI 이상행동 패턴 분석',
                    '네트워크 관계도 자동 생성',
                    '산업스파이 위험도 평가',
                    '기밀정보 접근 이상징후 탐지'
                ]
            },
            {
                id: 'cyber-security',
                name: '사이버안보국',
                icon: '🛡️',
                classification: 'restricted',
                mainTasks: [
                    '국가 주요 인프라 보호',
                    '사이버 공격 탐지·대응',
                    '해킹 위협 정보 수집',
                    '사이버 보안 기술 개발'
                ],
                aiTasks: [
                    'AI 실시간 사이버 위협 탐지',
                    '제로데이 취약점 예측',
                    'APT 공격 패턴 학습',
                    '자동 대응 시나리오 생성'
                ]
            },
            {
                id: 'terror',
                name: '국제테러정보통합센터',
                icon: '⚠️',
                classification: 'confidential',
                mainTasks: [
                    '테러 위협 정보 수집',
                    '테러 단체 동향 분석',
                    '대테러 작전 지원',
                    '국내외 협력 네트워크 운영'
                ],
                aiTasks: [
                    'AI SNS 테러 선전물 탐지',
                    '테러 위험 인물 행동 예측',
                    '테러 자금 흐름 추적',
                    '위험 지역 실시간 모니터링'
                ]
            },
            {
                id: 'crime',
                name: '국제범죄정보센터',
                icon: '🚨',
                classification: 'restricted',
                mainTasks: [
                    '마약 밀거래 정보 수집',
                    '무기 밀매 추적',
                    '국제범죄 조직 감시',
                    '인터폴 협력'
                ],
                aiTasks: [
                    'AI 범죄 네트워크 시각화',
                    '마약 거래 패턴 분석',
                    '자금세탁 의심거래 탐지',
                    '범죄조직 연관관계 분석'
                ]
            }
        ]
    };
    
    const classificationColors = {
        public: 'bg-green-100 text-green-800',
        restricted: 'bg-yellow-100 text-yellow-800',
        confidential: 'bg-red-100 text-red-800'
    };
    
    const classificationNames = {
        public: '공개',
        restricted: '대외비',
        confidential: '비밀'
    };
    
    return (
        <div className="space-y-6">
            {/* 조직 개요 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">국가정보원 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="공개 조직" 
                        value="6개국" 
                        subtitle="기타 조직 비공개"
                        icon="🏢" 
                        color="blue" 
                    />
                    <StatCard 
                        title="국제 협력" 
                        value="120개국" 
                        subtitle="정보기관 네트워크"
                        icon="🌍" 
                        color="green" 
                    />
                    <StatCard 
                        title="AI 자동화" 
                        value="85%" 
                        subtitle="정보 분석 업무"
                        icon="🤖" 
                        color="purple" 
                    />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                    <p className="mb-2">
                        <span className="font-semibold">⚠️ 보안 안내:</span> 
                        국가정보원법 제8조에 따라 조직의 세부 구조, 정원, 소재지는 기밀사항입니다.
                    </p>
                    <p>
                        본 페이지는 공개 가능한 정보만을 표시하며, AI 자동화 시스템의 적용 범위를 설명합니다.
                    </p>
                </div>
            </div>
            
            {/* 리더십 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">지휘부 (공개 직위)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {organization.leadership.map((leader, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900">{leader.position}</h4>
                            <p className="text-sm text-gray-600 mt-1">{leader.name}</p>
                            <p className="text-sm text-gray-500 mt-2">{leader.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 주요 부서 */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 부서 및 AI 자동화</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organization.departments.map((dept) => (
                        <div 
                            key={dept.id}
                            className="bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedDept(selectedDept === dept.id ? null : dept.id)}
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">{dept.icon}</span>
                                        <h4 className="font-bold text-gray-900">{dept.name}</h4>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${classificationColors[dept.classification]}`}>
                                        {classificationNames[dept.classification]}
                                    </span>
                                </div>
                                
                                <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-semibold">주요 업무:</span>
                                </div>
                                <ul className="text-sm text-gray-600 space-y-1 mb-3">
                                    {dept.mainTasks.slice(0, 2).map((task, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                                
                                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    {selectedDept === dept.id ? '접기 ▲' : '자세히 보기 ▼'}
                                </button>
                            </div>
                            
                            <div className={`expandable-card ${selectedDept === dept.id ? 'expanded' : 'collapsed'} bg-gray-50 border-t border-gray-200`}>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2">📋 전체 업무</h5>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            {dept.mainTasks.map((task, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="text-blue-600 mr-2">•</span>
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2">🤖 AI 자동화 적용</h5>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            {dept.aiTasks.map((task, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="text-purple-600 mr-2">▸</span>
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
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
            
            {/* NDR 연동 흐름 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">국가데이터처 연동 구조</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-2xl">📥</span>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900">1. 데이터 인출 (Input)</div>
                            <div className="text-gray-600">국가데이터처에서 필요한 정보 조회 (암호화 상태)</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <span className="text-2xl">⬇️</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <span className="text-2xl">🤖</span>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900">2. AI 분석 (Processing)</div>
                            <div className="text-gray-600">DeepSeek R1 모델로 정보 분석 및 위협 평가</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <span className="text-2xl">⬇️</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <span className="text-2xl">📤</span>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900">3. 결과 저장 (Output)</div>
                            <div className="text-gray-600">분석 결과를 국가데이터처에 다시 저장</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <span className="text-2xl">⬇️</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                        <span className="text-2xl">🔐</span>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900">4. 오픈해시 검증 (Verification)</div>
                            <div className="text-gray-600">모든 과정을 분산원장에 기록하여 무결성 보장</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
