const PDVSystem = () => {
    const [expandedType, setExpandedType] = React.useState(null);

    const dataTypes = [
        {
            id: 'health',
            name: '건강 데이터',
            icon: '🏥',
            color: 'red',
            description: '건강검진, 병원 진료 기록, 운동량, 수면 패턴',
            items: ['혈압/혈당 수치', '병원 방문 이력', '일일 걸음 수', '수면 시간', 'BMI 지수'],
            impact: '건강보험료 최대 48% 할인'
        },
        {
            id: 'driving',
            name: '운전 데이터',
            icon: '🚗',
            color: 'blue',
            description: '주행거리, 안전운전 점수, 사고 이력, 속도 위반',
            items: ['월 주행거리', '급가속/급정거 횟수', '과속 기록', '사고 이력', '주행 시간대'],
            impact: '자동차보험료 최대 50% 할인'
        },
        {
            id: 'work',
            name: '업무 데이터',
            icon: '💼',
            color: 'purple',
            description: '직업, 근무 형태, 산재 이력, 위험도',
            items: ['직업군 분류', '근무 시간', '야간 근무 여부', '산재 발생 이력', '직업 위험도'],
            impact: '생명보험료 조정 (±12%)'
        },
        {
            id: 'lifestyle',
            name: '생활 패턴',
            icon: '🏠',
            color: 'green',
            description: '거주지역, 위험활동, 흡연/음주, 취미',
            items: ['거주 지역 안전도', '흡연 여부', '음주 빈도', '위험 스포츠', '해외 체류'],
            impact: '종합보험료 조정 (±15%)'
        },
        {
            id: 'financial',
            name: '재무 데이터',
            icon: '💰',
            color: 'yellow',
            description: '재무제표 연동, 소득, 부채, 신용등급',
            items: ['월 소득', '순자산', '부채비율', '신용등급', '재무 안정성'],
            impact: '언더라이팅 승인율 +25%'
        },
        {
            id: 'medical',
            name: '의료 기록',
            icon: '💊',
            color: 'pink',
            description: '만성질환, 투약 내역, 수술 이력, 가족력',
            items: ['만성질환 관리', '복용 약물', '수술 이력', '유전질환', '가족 병력'],
            impact: '건강보험 심사 정확도 99.2%'
        }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-2">
                    <i className="fas fa-lock mr-2"></i>
                    개인정보금고 (PDV) 시스템
                </h2>
                <p className="text-purple-100">
                    암호화된 개인정보금고에 저장된 건강, 운전, 생활 데이터를 
                    본인이 선택적으로 공유하여 공정한 보험료를 산정받습니다.
                </p>
            </div>

            {/* 핵심 통계 */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600">6천만</div>
                    <div className="text-sm text-gray-600 mt-1">PDV 계정 수</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600">6가지</div>
                    <div className="text-sm text-gray-600 mt-1">데이터 유형</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-gray-600 mt-1">본인 통제</div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="text-3xl font-bold text-red-600">AES-256</div>
                    <div className="text-sm text-gray-600 mt-1">암호화 수준</div>
                </div>
            </div>

            {/* PDV 3원칙 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-shield-alt text-purple-600 mr-2"></i>
                    PDV 보안 3원칙
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="border-l-4 border-purple-500 pl-4">
                        <div className="font-bold text-lg text-gray-900 mb-2">1. 암호화 저장</div>
                        <p className="text-sm text-gray-600">
                            모든 데이터는 AES-256 암호화로 저장되며, 
                            본인의 생체인증으로만 복호화 가능
                        </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                        <div className="font-bold text-lg text-gray-900 mb-2">2. 익명화 전송</div>
                        <p className="text-sm text-gray-600">
                            보험사에 전송 시 개인 식별 정보는 익명화되고, 
                            통계 데이터만 전달
                        </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                        <div className="font-bold text-lg text-gray-900 mb-2">3. 선택적 공유</div>
                        <p className="text-sm text-gray-600">
                            어떤 데이터를 어느 보험사와 공유할지 
                            본인이 직접 선택하고 언제든 철회 가능
                        </p>
                    </div>
                </div>
            </div>

            {/* 데이터 유형 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-database text-blue-600 mr-2"></i>
                    PDV 데이터 유형 (6가지)
                </h3>
                <div className="space-y-3">
                    {dataTypes.map(type => (
                        <div key={type.id} className="border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{type.icon}</span>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">{type.name}</div>
                                        <div className="text-sm text-gray-600">{type.description}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-sm font-medium text-${type.color}-600 bg-${type.color}-50 px-3 py-1 rounded-full`}>
                                        {type.impact}
                                    </span>
                                    <i className={`fas fa-chevron-${expandedType === type.id ? 'up' : 'down'} text-gray-400`}></i>
                                </div>
                            </button>
                            
                            {expandedType === type.id && (
                                <div className="px-4 pb-4 bg-gray-50 border-t">
                                    <div className="font-medium text-gray-700 mb-2 mt-3">수집되는 정보:</div>
                                    <div className="grid md:grid-cols-2 gap-2">
                                        {type.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                                <i className="fas fa-check text-green-500"></i>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* PDV 작동 흐름 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                    <i className="fas fa-sync-alt text-green-600 mr-2"></i>
                    PDV 작동 흐름
                </h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">1️⃣</span>
                        </div>
                        <div className="font-bold text-gray-900 mb-2">데이터 수집</div>
                        <div className="text-sm text-gray-600">
                            일상생활에서 자동으로 건강, 운전, 생활 데이터 수집
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">2️⃣</span>
                        </div>
                        <div className="font-bold text-gray-900 mb-2">암호화 저장</div>
                        <div className="text-sm text-gray-600">
                            AES-256 암호화로 PDV에 안전하게 저장
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">3️⃣</span>
                        </div>
                        <div className="font-bold text-gray-900 mb-2">선택적 공유</div>
                        <div className="text-sm text-gray-600">
                            보험 가입 시 원하는 데이터만 익명화하여 공유
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl">4️⃣</span>
                        </div>
                        <div className="font-bold text-gray-900 mb-2">보험료 산정</div>
                        <div className="text-sm text-gray-600">
                            AI가 공유된 데이터로 공정한 보험료 산정
                        </div>
                    </div>
                </div>
            </div>

            {/* 개인정보 보호 */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                    <i className="fas fa-user-shield text-purple-600 mr-2"></i>
                    완벽한 개인정보 보호
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-green-600 mt-1"></i>
                        <div>
                            <div className="font-medium text-gray-900">보험사는 원본 데이터를 볼 수 없음</div>
                            <div className="text-gray-600">익명화된 통계 정보만 전달</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-green-600 mt-1"></i>
                        <div>
                            <div className="font-medium text-gray-900">언제든지 공유 중단 가능</div>
                            <div className="text-gray-600">클릭 한 번으로 데이터 공유 철회</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-green-600 mt-1"></i>
                        <div>
                            <div className="font-medium text-gray-900">투명한 데이터 사용 내역</div>
                            <div className="text-gray-600">누가 언제 어떤 데이터를 조회했는지 기록</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-green-600 mt-1"></i>
                        <div>
                            <div className="font-medium text-gray-900">오픈해시로 위변조 방지</div>
                            <div className="text-gray-600">모든 접근 기록을 오픈해시에 저장</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
