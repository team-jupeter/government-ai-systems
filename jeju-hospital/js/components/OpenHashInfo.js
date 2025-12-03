const OpenHashInfo = () => {
    const [activeSection, setActiveSection] = React.useState('overview');

    const sections = [
        { id: 'overview', label: '개요', icon: 'fa-info-circle' },
        { id: 'medical', label: '의료 데이터 적용', icon: 'fa-heartbeat' },
        { id: 'security', label: '보안 메커니즘', icon: 'fa-shield-alt' },
        { id: 'verification', label: '검증 프로세스', icon: 'fa-check-double' }
    ];

    const medicalUseCases = [
        {
            title: '진료 기록 무결성',
            icon: 'fa-file-medical',
            color: 'blue',
            description: '환자의 모든 진료 기록이 OpenHash로 기록되어 위변조가 불가능합니다.',
            details: [
                '진단 내용, 처방 이력, 검사 결과 해시화',
                '수정 시 새로운 해시 생성 및 이력 보존',
                '의료 분쟁 시 원본 증명 가능'
            ]
        },
        {
            title: '투약 이력 추적',
            icon: 'fa-pills',
            color: 'green',
            description: '처방부터 투약까지 전 과정이 투명하게 기록됩니다.',
            details: [
                '처방전 발행 → 조제 → 투약 전 과정 기록',
                '약물 오남용 방지 및 추적',
                '부작용 발생 시 원인 추적 가능'
            ]
        },
        {
            title: '생체 데이터 보호',
            icon: 'fa-heartbeat',
            color: 'red',
            description: '스마트워치 등에서 수집되는 생체 데이터의 진실성을 보장합니다.',
            details: [
                '심박수, 혈압, 혈당 등 측정값 해시 기록',
                '데이터 조작 시도 즉시 감지',
                '보험 청구 등에 신뢰할 수 있는 데이터 제공'
            ]
        },
        {
            title: '건강검진 결과',
            icon: 'fa-clipboard-list',
            color: 'purple',
            description: '검진 기관에서 발행한 결과의 원본성을 증명합니다.',
            details: [
                '검진 결과 발행 시점의 해시 생성',
                '타 의료기관 제출 시 위변조 여부 즉시 확인',
                '고용/보험 목적 제출 시 신뢰성 보장'
            ]
        },
        {
            title: '수술 및 시술 기록',
            icon: 'fa-procedures',
            color: 'orange',
            description: '수술 전 동의서부터 수술 후 경과까지 모든 기록을 보호합니다.',
            details: [
                '수술 동의서 서명 시점 기록',
                '수술 중 사용 장비, 약물, 소요 시간 기록',
                '수술 후 경과 기록의 연속성 보장'
            ]
        },
        {
            title: '예방접종 이력',
            icon: 'fa-syringe',
            color: 'teal',
            description: '예방접종 기록의 국제적 신뢰성을 확보합니다.',
            details: [
                '백신 종류, 제조사, 로트번호 기록',
                '접종 일시, 의료기관, 담당자 기록',
                '국제 여행 시 인정받는 접종 증명'
            ]
        }
    ];

    const comparisonData = [
        { feature: '데이터 위변조 방지', traditional: '제한적', openhash: '완벽 보장' },
        { feature: '기록 추적성', traditional: '수동 관리', openhash: '자동 추적' },
        { feature: '분쟁 시 증명력', traditional: '제한적', openhash: '법적 효력' },
        { feature: '에너지 효율', traditional: '-', openhash: '기존 블록체인 대비 99% 절감' },
        { feature: '처리 속도', traditional: '빠름', openhash: '동등 수준' },
        { feature: '데이터 소유권', traditional: '기관 중심', openhash: '환자 중심' }
    ];

    const verificationSteps = [
        { step: 1, title: '데이터 생성', desc: '진료, 검사, 투약 등의 의료 행위 발생', icon: 'fa-file-medical-alt' },
        { step: 2, title: '해시 생성', desc: 'OpenHash 알고리즘으로 고유 해시값 생성', icon: 'fa-hashtag' },
        { step: 3, title: '분산 저장', desc: '해시값을 분산 네트워크에 기록', icon: 'fa-network-wired' },
        { step: 4, title: '검증 요청', desc: '데이터 열람 또는 제출 시 검증 요청', icon: 'fa-search' },
        { step: 5, title: '무결성 확인', desc: '저장된 해시와 현재 데이터 해시 비교', icon: 'fa-check-double' },
        { step: 6, title: '결과 반환', desc: '검증 성공/실패 및 상세 정보 제공', icon: 'fa-clipboard-check' }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl border border-cyan-500/30 p-8">
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                        <i className="fas fa-link text-5xl text-cyan-400"></i>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-400">OpenHash</h1>
                        <p className="text-xl text-white mt-1">의료 데이터 무결성 보장 기술</p>
                        <p className="text-gray-400 mt-2">모든 건강 정보의 진실성(Truth)을 보장하는 혁신적 기록 메커니즘</p>
                        <div className="flex items-center space-x-4 mt-4">
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                <i className="fas fa-check-circle mr-1"></i>시스템 적용 완료
                            </span>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                                <i className="fas fa-shield-alt mr-1"></i>데이터 보호 중
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 섹션 탭 */}
            <div className="flex space-x-2 border-b border-gray-700 pb-2">
                {sections.map(sec => (
                    <button
                        key={sec.id}
                        onClick={() => setActiveSection(sec.id)}
                        className={`px-4 py-2 rounded-t-lg flex items-center space-x-2 ${
                            activeSection === sec.id 
                            ? 'bg-gray-800 text-cyan-400 border-b-2 border-cyan-400' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    >
                        <i className={`fas ${sec.icon}`}></i>
                        <span>{sec.label}</span>
                    </button>
                ))}
            </div>

            {/* 개요 섹션 */}
            {activeSection === 'overview' && (
                <div className="space-y-6">
                    {/* 핵심 메시지 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            <i className="fas fa-exclamation-circle text-yellow-400 mr-3"></i>
                            건강 정보에서 데이터의 진실성이 중요한 이유
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                                <i className="fas fa-user-injured text-red-400 text-2xl mb-2"></i>
                                <h3 className="font-bold text-red-400">환자 안전</h3>
                                <p className="text-sm text-gray-400 mt-1">위변조된 알레르기 정보나 투약 이력은 생명을 위협할 수 있습니다.</p>
                            </div>
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <i className="fas fa-gavel text-yellow-400 text-2xl mb-2"></i>
                                <h3 className="font-bold text-yellow-400">법적 증명</h3>
                                <p className="text-sm text-gray-400 mt-1">의료 분쟁 시 원본 데이터의 무결성 증명이 필수적입니다.</p>
                            </div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <i className="fas fa-handshake text-blue-400 text-2xl mb-2"></i>
                                <h3 className="font-bold text-blue-400">신뢰 구축</h3>
                                <p className="text-sm text-gray-400 mt-1">의료기관 간 데이터 공유 시 상호 신뢰의 기반이 됩니다.</p>
                            </div>
                        </div>
                    </div>

                    {/* OpenHash vs 기존 시스템 비교 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold mb-4">
                            <i className="fas fa-balance-scale text-cyan-400 mr-3"></i>
                            기존 시스템 vs OpenHash
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-3 px-4">기능</th>
                                        <th className="text-center py-3 px-4 text-gray-400">기존 의료정보시스템</th>
                                        <th className="text-center py-3 px-4 text-cyan-400">OpenHash 적용</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.map((row, i) => (
                                        <tr key={i} className="border-b border-gray-700/50">
                                            <td className="py-3 px-4">{row.feature}</td>
                                            <td className="text-center py-3 px-4 text-gray-500">{row.traditional}</td>
                                            <td className="text-center py-3 px-4 text-green-400 font-medium">{row.openhash}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 기술적 특징 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                                <i className="fas fa-leaf text-green-400 text-xl"></i>
                            </div>
                            <h3 className="font-bold">에너지 효율</h3>
                            <p className="text-sm text-gray-400 mt-1">기존 블록체인 대비 99% 에너지 절감</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                                <i className="fas fa-bolt text-blue-400 text-xl"></i>
                            </div>
                            <h3 className="font-bold">고속 처리</h3>
                            <p className="text-sm text-gray-400 mt-1">실시간 의료 데이터 처리 가능</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                                <i className="fas fa-expand-arrows-alt text-purple-400 text-xl"></i>
                            </div>
                            <h3 className="font-bold">확장성</h3>
                            <p className="text-sm text-gray-400 mt-1">무제한 데이터 기록 가능</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
                                <i className="fas fa-user-shield text-orange-400 text-xl"></i>
                            </div>
                            <h3 className="font-bold">환자 주권</h3>
                            <p className="text-sm text-gray-400 mt-1">데이터 소유권을 환자에게 부여</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 의료 데이터 적용 섹션 */}
            {activeSection === 'medical' && (
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold mb-2">
                            <i className="fas fa-hospital text-cyan-400 mr-3"></i>
                            의료 데이터에 OpenHash가 적용되는 영역
                        </h2>
                        <p className="text-gray-400 mb-6">본 시스템에서 OpenHash로 보호되는 모든 의료 정보 영역입니다.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {medicalUseCases.map((useCase, i) => (
                                <div key={i} className={`bg-gray-700/50 rounded-xl border border-${useCase.color}-500/30 p-5 hover:border-${useCase.color}-400 transition-all`}>
                                    <div className={`w-12 h-12 bg-${useCase.color}-500/20 rounded-lg flex items-center justify-center mb-3`}>
                                        <i className={`fas ${useCase.icon} text-${useCase.color}-400 text-xl`}></i>
                                    </div>
                                    <h3 className="font-bold mb-2">{useCase.title}</h3>
                                    <p className="text-sm text-gray-400 mb-3">{useCase.description}</p>
                                    <ul className="space-y-1">
                                        {useCase.details.map((detail, j) => (
                                            <li key={j} className="text-xs text-gray-500 flex items-start">
                                                <i className={`fas fa-check text-${useCase.color}-400 mr-2 mt-0.5`}></i>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 보안 메커니즘 섹션 */}
            {activeSection === 'security' && (
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold mb-4">
                            <i className="fas fa-lock text-cyan-400 mr-3"></i>
                            OpenHash 보안 아키텍처
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                    <h3 className="font-bold flex items-center mb-2">
                                        <i className="fas fa-fingerprint text-cyan-400 mr-2"></i>
                                        해시 기반 무결성
                                    </h3>
                                    <p className="text-sm text-gray-400">모든 데이터는 SHA-256 기반 해시로 변환되어 단 1비트의 변경도 감지됩니다.</p>
                                </div>
                                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                    <h3 className="font-bold flex items-center mb-2">
                                        <i className="fas fa-project-diagram text-green-400 mr-2"></i>
                                        분산 저장
                                    </h3>
                                    <p className="text-sm text-gray-400">해시값은 다수의 노드에 분산 저장되어 단일 장애점이 없습니다.</p>
                                </div>
                                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                    <h3 className="font-bold flex items-center mb-2">
                                        <i className="fas fa-history text-purple-400 mr-2"></i>
                                        시간 증명
                                    </h3>
                                    <p className="text-sm text-gray-400">데이터 생성 시점이 암호학적으로 증명되어 소급 조작이 불가능합니다.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                    <h3 className="font-bold flex items-center mb-2">
                                        <i className="fas fa-link text-orange-400 mr-2"></i>
                                        체인 연결
                                    </h3>
                                    <p className="text-sm text-gray-400">각 해시는 이전 해시와 연결되어 전체 이력의 연속성을 보장합니다.</p>
                                </div>
                                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                    <h3 className="font-bold flex items-center mb-2">
                                        <i className="fas fa-user-lock text-red-400 mr-2"></i>
                                        접근 제어
                                    </h3>
                                    <p className="text-sm text-gray-400">환자 본인의 생체인증 없이는 데이터 접근이 불가능합니다.</p>
                                </div>
                                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                    <h3 className="font-bold flex items-center mb-2">
                                        <i className="fas fa-eye text-blue-400 mr-2"></i>
                                        감사 추적
                                    </h3>
                                    <p className="text-sm text-gray-400">모든 데이터 접근 및 조회 이력이 기록되어 추적 가능합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 검증 프로세스 섹션 */}
            {activeSection === 'verification' && (
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold mb-6">
                            <i className="fas fa-tasks text-cyan-400 mr-3"></i>
                            OpenHash 검증 프로세스
                        </h2>
                        
                        <div className="relative">
                            {/* 연결선 */}
                            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 hidden lg:block"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                                {verificationSteps.map((step, i) => (
                                    <div key={i} className="relative">
                                        <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 hover:border-cyan-500/50 transition-all">
                                            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3 relative z-10">
                                                <i className={`fas ${step.icon} text-cyan-400 text-xl`}></i>
                                                <span className="absolute -top-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">{step.step}</span>
                                            </div>
                                            <h3 className="font-bold text-center text-sm mb-1">{step.title}</h3>
                                            <p className="text-xs text-gray-400 text-center">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 실시간 검증 상태 */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h3 className="font-bold mb-4">
                            <i className="fas fa-chart-bar text-green-400 mr-2"></i>
                            현재 시스템 검증 상태
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                                <p className="text-3xl font-bold text-green-400">12,847</p>
                                <p className="text-xs text-gray-400">오늘 검증된 레코드</p>
                            </div>
                            <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-center">
                                <p className="text-3xl font-bold text-cyan-400">100%</p>
                                <p className="text-xs text-gray-400">무결성 유지율</p>
                            </div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                                <p className="text-3xl font-bold text-blue-400">0.02초</p>
                                <p className="text-xs text-gray-400">평균 검증 시간</p>
                            </div>
                            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                                <p className="text-3xl font-bold text-purple-400">1,245,678</p>
                                <p className="text-xs text-gray-400">누적 검증 건수</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* OpenHash 시스템 링크 */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl border border-cyan-500/30 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-cyan-400">OpenHash 기술 상세 정보</h3>
                        <p className="text-gray-400 mt-1">OpenHash 기술의 원리와 구현에 대한 상세 정보를 확인하세요.</p>
                    </div>
                    <a 
                        href="http://100.30.14.224/openhash-system/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-bold flex items-center space-x-2 transition-all hover:scale-105"
                    >
                        <i className="fas fa-external-link-alt"></i>
                        <span>OpenHash 시스템 바로가기</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
