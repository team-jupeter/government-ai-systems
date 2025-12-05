const Overview = () => {
    const stats = [
        { title: '금융기관 감독', value: '3,456건', subtitle: '전월 대비 +10%', icon: '🏦', color: 'blue' },
        { title: 'AI 분석 완료', value: '96.5%', subtitle: '위원회 심의 3.5%', icon: '🤖', color: 'indigo' },
        { title: '제재 조치', value: '892건', subtitle: '이번 달', icon: '⚖️', color: 'purple' },
        { title: '투명성 점수', value: '99.9점', subtitle: '오픈해시 기록', icon: '⭐', color: 'blue' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">금융위원회 AI 자동화 시스템</h2>
                <p className="text-lg text-blue-100 mb-6">
                    국가데이터처와 연동하여 금융기관 감독·금융소비자 보호·자본시장 관리를 수행하고, 
                    오픈해시 기술로 모든 감독·심의 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-blue-100">OpenHash + AI 리스크분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-blue-100">감독 업무 88% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-blue-100">AI 위험 탐지 99.3%</div>
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
                        <div className="text-2xl mb-2">🏦</div>
                        <h4 className="font-semibold text-gray-900 mb-2">금융기관 감독</h4>
                        <p className="text-sm text-gray-600">AI가 은행·증권·보험사의 건전성을 자동 평가하고 리스크를 분석합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">금융소비자 보호</h4>
                        <p className="text-sm text-gray-600">AI가 불완전판매를 자동 탐지하고 소비자 피해를 예방합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">자본시장 감시</h4>
                        <p className="text-sm text-gray-600">AI가 불공정거래를 자동 탐지하고 시장 이상징후를 예측합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">💰</div>
                        <h4 className="font-semibold text-gray-900 mb-2">금융정책 수립</h4>
                        <p className="text-sm text-gray-600">AI가 금융시장 데이터를 분석하여 정책 수립을 지원합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
