const Overview = () => {
    const stats = [
        { title: '오늘 입찰 공고', value: '2,890건', subtitle: '전일 대비 +5%', icon: '📢', color: 'blue' },
        { title: 'AI 자동 심사', value: '82.3%', subtitle: '인간 검토 17.7%', icon: '🤖', color: 'purple' },
        { title: '계약 체결', value: '1,567건', subtitle: '평균 2.1일', icon: '📝', color: 'green' },
        { title: '투명성 점수', value: '98.5점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">조달청 AI 자동화 시스템</h2>
                <p className="text-lg text-indigo-100 mb-6">
                    국가데이터처와 연동하여 공공조달의 모든 과정을 투명하게 관리하고, 
                    오픈해시 기술로 담합과 부정을 원천 차단합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-indigo-100">OpenHash + AI 입찰 분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 계약 속도</div>
                        <div className="text-indigo-100">평균 2.1일 (기존 대비 85% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 담합 탐지</div>
                        <div className="text-indigo-100">AI 정확도 94.2%</div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 업무 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (<StatCard key={index} {...stat} />))}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 기능</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📢</div>
                        <h4 className="font-semibold text-gray-900 mb-2">자동 입찰 공고</h4>
                        <p className="text-sm text-gray-600">AI가 사업 내용을 분석하여 적정 예가를 산출하고 입찰 공고를 자동 생성합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-semibold text-gray-900 mb-2">담합 탐지</h4>
                        <p className="text-sm text-gray-600">과거 입찰 패턴을 학습하여 담합 의심 입찰을 실시간 탐지합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">공정성 평가</h4>
                        <p className="text-sm text-gray-600">입찰 가격의 적정성을 AI가 자동 평가하여 덤핑/고가 입찰을 방지합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">계약 관리</h4>
                        <p className="text-sm text-gray-600">계약 이행, 대금 지급, 성과 평가까지 전 과정을 자동화합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
