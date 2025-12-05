const NDRIntegration = () => {
    const dataFlowSteps = [
        {
            step: 1,
            title: '데이터 요청',
            description: '국세청 담당자가 업무 수행을 위해 NDR에 데이터 인출 요청',
            icon: '📝',
            color: 'blue'
        },
        {
            step: 2,
            title: 'PDV 인증',
            description: '개인정보금고를 통한 본인 확인 및 접근 권한 검증',
            icon: '🔐',
            color: 'purple'
        },
        {
            step: 3,
            title: 'NDR 데이터 인출',
            description: '암호화된 데이터를 NDR에서 국세청 시스템으로 전송',
            icon: '📥',
            color: 'green'
        },
        {
            step: 4,
            title: 'AI 처리/분석',
            description: 'DeepSeek R1 AI가 데이터를 분석하고 자동 처리',
            icon: '🤖',
            color: 'orange'
        },
        {
            step: 5,
            title: '인간 검토/승인',
            description: '중요 의사결정은 담당자 또는 관리자가 최종 승인',
            icon: '✅',
            color: 'blue'
        },
        {
            step: 6,
            title: '결과 저장',
            description: '처리 결과를 NDR에 저장하고 오픈해시에 기록',
            icon: '💾',
            color: 'green'
        }
    ];
    
    const ndrCategories = [
        {
            category: '법인세 데이터',
            records: '2,450,000건',
            size: '145GB',
            lastUpdate: '2025-12-03 09:30',
            accessToday: 856
        },
        {
            category: '소득세 데이터',
            records: '18,900,000건',
            size: '890GB',
            lastUpdate: '2025-12-03 10:15',
            accessToday: 1243
        },
        {
            category: '부가가치세 데이터',
            records: '5,680,000건',
            size: '320GB',
            lastUpdate: '2025-12-03 08:45',
            accessToday: 654
        },
        {
            category: '체납자 정보',
            records: '450,000건',
            size: '28GB',
            lastUpdate: '2025-12-03 10:00',
            accessToday: 234
        }
    ];
    
    return (
        <div className="space-y-6">
            {/* 페이지 헤더 */}
            <div className="bg-gradient-to-r from-violet-700 to-purple-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국가데이터처 연동</h2>
                <p className="text-lg text-violet-100">
                    모든 세무 데이터는 국가데이터처(NDR)에 중앙 집중식으로 관리되며, 
                    국세청은 업무 수행에 필요한 데이터만 인출하여 처리합니다.
                </p>
            </div>
            
            {/* 데이터 흐름도 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">데이터 처리 흐름</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataFlowSteps.map((step) => (
                        <div key={step.step} className="relative">
                            <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow h-full">
                                <div className="flex items-start space-x-4">
                                    <div className={`text-4xl flex-shrink-0`}>
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-${step.color}-100 text-${step.color}-700 text-xs font-bold`}>
                                                {step.step}
                                            </span>
                                            <h4 className="font-semibold text-gray-900">{step.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                            {step.step < 6 && (
                                <div className="hidden lg:block absolute top-1/2 -right-2 transform translate-x-1/2 -translate-y-1/2 text-gray-400 text-2xl z-10">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* NDR 데이터 현황 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">NDR 데이터 카테고리</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ndrCategories.map((cat, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">{cat.category}</h4>
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">총 레코드</span>
                                    <span className="font-semibold text-blue-600">{cat.records}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">데이터 크기</span>
                                    <span className="font-semibold text-violet-600">{cat.size}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">최종 업데이트</span>
                                    <span className="font-semibold text-gray-700">{cat.lastUpdate}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-gray-200">
                                    <span className="text-gray-600">오늘 접근 횟수</span>
                                    <span className="font-semibold text-orange-600">{cat.accessToday}회</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 보안 및 프라이버시 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">보안 및 개인정보 보호</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
                        <div className="text-3xl mb-3">🔐</div>
                        <h4 className="font-semibold text-gray-900 mb-2">양자내성 암호화</h4>
                        <p className="text-sm text-gray-700">
                            CRYSTALS-Dilithium 알고리즘으로 50년 내구 보안성 확보
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
                        <div className="text-3xl mb-3">👤</div>
                        <h4 className="font-semibold text-gray-900 mb-2">PDV 연동</h4>
                        <p className="text-sm text-gray-700">
                            개인정보금고를 통한 본인 인증 및 동의 기반 데이터 접근
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg p-5 border border-violet-200">
                        <div className="text-3xl mb-3">📝</div>
                        <h4 className="font-semibold text-gray-900 mb-2">완전한 감사 추적</h4>
                        <p className="text-sm text-gray-700">
                            모든 접근 기록이 오픈해시에 영구 저장되어 위변조 불가능
                        </p>
                    </div>
                </div>
            </div>
            
            {/* API 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 API 호출" 
                    value="2,987회"
                    subtitle="평균 응답 2.3초"
                    icon="🔄" 
                    color="blue" 
                />
                <StatCard 
                    title="데이터 전송량" 
                    value="145GB"
                    subtitle="압축률 73%"
                    icon="📊" 
                    color="green" 
                />
                <StatCard 
                    title="오류율" 
                    value="0.02%"
                    subtitle="6건/2,987회"
                    icon="⚠️" 
                    color="orange" 
                />
                <StatCard 
                    title="가동률" 
                    value="99.98%"
                    subtitle="연간 SLA 달성"
                    icon="✅" 
                    color="purple" 
                />
            </div>
        </div>
    );
};

window.NDRIntegration = NDRIntegration;
