const Overview = () => {
    const stats = [
        { title: '오늘 정보 수집', value: '365건', subtitle: '전일 대비 +8%', icon: '📡', color: 'blue' },
        { title: 'AI 자동 분석율', value: '68.5%', subtitle: '인간 검토 31.5%', icon: '🤖', color: 'purple' },
        { title: 'NDR 데이터 조회', value: '892건', subtitle: '평균 1.8MB/건', icon: '📥', color: 'green' },
        { title: '오픈해시 검증', value: '100%', subtitle: '위변조 0건', icon: '🔐', color: 'red' }
    ];
    
    return (
        <div className="space-y-6">
            {/* 시스템 소개 */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국가정보원 AI 자동화 시스템</h2>
                <p className="text-lg text-gray-300 mb-6">
                    국가데이터처와 연동하여 해외정보, 대북정보, 방첩, 사이버 안보 등 
                    모든 정보활동을 AI로 자동화하고, 오픈해시 기술로 무결성을 보장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-gray-300">OpenHash + DeepSeek R1 AI</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 분석 속도</div>
                        <div className="text-gray-300">평균 1.5초/건 (기존 대비 95% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 보안 수준</div>
                        <div className="text-gray-300">최고기밀 양자내성 암호</div>
                    </div>
                </div>
            </div>
            
            {/* 실시간 통계 */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 업무 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>
            
            {/* 시스템 아키텍처 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">시스템 아키텍처</h3>
                <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">1. 국가데이터처 연동</h4>
                        <p className="text-sm text-gray-600">
                            모든 정보 데이터는 국가데이터처(NDR)에 암호화되어 저장되며, 
                            국가정보원은 필요한 정보를 조회하여 분석 후 결과를 다시 저장합니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. AI 정보 분석</h4>
                        <p className="text-sm text-gray-600">
                            DeepSeek R1 모델이 정보 수집, 위협 분석, 패턴 인식, 이상징후 탐지 등을 
                            자동으로 수행하며, 중요 판단은 전문 요원의 검토를 거칩니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. 오픈해시 무결성 보장</h4>
                        <p className="text-sm text-gray-600">
                            모든 정보활동은 오픈해시 분산원장에 기록되어 위변조가 불가능하며, 
                            에너지 소비는 기존 블록체인 대비 98.5% 절감됩니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. 실시간 감사 추적</h4>
                        <p className="text-sm text-gray-600">
                            누가, 언제, 어떤 정보에 접근했는지 모든 로그가 실시간으로 기록되며, 
                            기밀정보는 다중 암호화되어 허가된 요원만 접근 가능합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 주요 기능 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🌍</div>
                        <h4 className="font-semibold text-gray-900 mb-2">해외정보 수집</h4>
                        <p className="text-sm text-gray-600">
                            전세계 정보기관과의 협력 네트워크를 통해 
                            국가 안보에 필요한 해외정보를 실시간으로 수집합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🎯</div>
                        <h4 className="font-semibold text-gray-900 mb-2">대북정보 분석</h4>
                        <p className="text-sm text-gray-600">
                            북한의 군사·정치·경제 동향을 AI가 실시간으로 분석하여 
                            국가 안보 위협을 조기에 탐지합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-semibold text-gray-900 mb-2">방첩 활동</h4>
                        <p className="text-sm text-gray-600">
                            외국 정보기관의 대한민국 침투 시도를 탐지하고 
                            산업기밀 유출을 방지합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">사이버 안보</h4>
                        <p className="text-sm text-gray-600">
                            국가 주요 인프라에 대한 사이버 공격을 탐지하고 
                            대응 전략을 실시간으로 수립합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 국가정보원 역할 */}
            <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">국가정보원의 역할</h3>
                <div className="space-y-3">
                    <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">•</span>
                        <div>
                            <span className="font-semibold text-gray-900">국외 정보 수집:</span>
                            <span className="text-gray-700"> 국가 안보와 관련된 해외 정보를 수집·분석·배포</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">•</span>
                        <div>
                            <span className="font-semibold text-gray-900">대북정보 활동:</span>
                            <span className="text-gray-700"> 북한의 동향 파악 및 안보 위협 평가</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">•</span>
                        <div>
                            <span className="font-semibold text-gray-900">방첩 업무:</span>
                            <span className="text-gray-700"> 국가 기밀 보호 및 외국 정보기관 활동 차단</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">•</span>
                        <div>
                            <span className="font-semibold text-gray-900">대테러 활동:</span>
                            <span className="text-gray-700"> 테러 위협 정보 수집 및 대응 조치</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">•</span>
                        <div>
                            <span className="font-semibold text-gray-900">사이버 안보:</span>
                            <span className="text-gray-700"> 국가 주요 인프라 사이버 공격 대응</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-red-600 font-bold mr-3">•</span>
                        <div>
                            <span className="font-semibold text-gray-900">국제범죄 대응:</span>
                            <span className="text-gray-700"> 마약, 무기밀매, 국제범죄 정보 수집</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
