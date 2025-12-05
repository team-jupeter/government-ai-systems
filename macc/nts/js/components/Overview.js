const Overview = () => {
    const stats = [
        { title: '오늘 처리 건수', value: '1,234건', subtitle: '전일 대비 +12%', icon: '📊', color: 'blue' },
        { title: 'AI 자동 처리율', value: '72.3%', subtitle: '인간 승인 27.7%', icon: '🤖', color: 'purple' },
        { title: 'NDR 데이터 인출', value: '856건', subtitle: '평균 2.4MB/건', icon: '📥', color: 'green' },
        { title: '오픈해시 검증', value: '100%', subtitle: '위변조 0건', icon: '🔐', color: 'orange' }
    ];
    
    return (
        <div className="space-y-6">
            {/* 시스템 소개 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국세청 AI 자동화 시스템</h2>
                <p className="text-lg text-blue-100 mb-6">
                    국가데이터처와 연동하여 모든 세무 업무를 투명하게 처리하고, 
                    오픈해시 기술로 위변조 불가능한 감사 추적을 제공합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-blue-100">OpenHash + DeepSeek R1 AI</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 속도</div>
                        <div className="text-blue-100">평균 2.3초/건 (기존 대비 90% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 보안 수준</div>
                        <div className="text-blue-100">양자내성 암호 (50년 내구)</div>
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
                            모든 세무 데이터는 국가데이터처(NDR)에 중앙 집중식으로 저장되며, 
                            국세청은 필요한 데이터를 인출하여 처리 후 결과를 다시 저장합니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. AI 자동화 처리</h4>
                        <p className="text-sm text-gray-600">
                            DeepSeek R1 모델이 세무신고서 검토, 탈세 의심 거래 탐지, 체납 예측 등을 
                            자동으로 수행하며, 중요 의사결정은 인간 승인을 거칩니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. 오픈해시 무결성 보장</h4>
                        <p className="text-sm text-gray-600">
                            모든 업무 처리 과정은 오픈해시 분산원장에 기록되어 위변조가 불가능하며, 
                            에너지 소비는 기존 블록체인 대비 98.5% 절감됩니다.
                        </p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. 실시간 감사 추적</h4>
                        <p className="text-sm text-gray-600">
                            누가, 언제, 어떤 데이터에 접근했는지 모든 로그가 실시간으로 기록되며, 
                            개인정보는 암호화되어 본인만 접근 가능합니다.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 주요 기능 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">📋</div>
                        <h4 className="font-semibold text-gray-900 mb-2">실시간 업무 로그</h4>
                        <p className="text-sm text-gray-600">
                            부서별, 직원별 모든 업무 활동을 실시간으로 추적하고 
                            국가데이터처 연동 내역을 투명하게 공개합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🔗</div>
                        <h4 className="font-semibold text-gray-900 mb-2">NDR 데이터 흐름</h4>
                        <p className="text-sm text-gray-600">
                            세무신고서, 납세자 정보, 거래내역 등 모든 데이터의 
                            인출-처리-저장 과정을 시각화합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🤖</div>
                        <h4 className="font-semibold text-gray-900 mb-2">AI 의사결정 지원</h4>
                        <p className="text-sm text-gray-600">
                            탈세 의심 거래 자동 탐지, 세무조사 대상 선정, 
                            체납 가능성 예측 등 AI가 업무를 보조합니다.
                        </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">통계 및 성과 분석</h4>
                        <p className="text-sm text-gray-600">
                            업무 처리량, 자동화율, 처리 시간 등 
                            다양한 지표를 실시간으로 모니터링합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
