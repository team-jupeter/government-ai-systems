const Overview = () => {
    const stats = [
        { title: '조사 건수', value: '2,345건', subtitle: '전월 대비 +18%', icon: '🔍', color: 'blue' },
        { title: 'AI 분석 완료', value: '96.8%', subtitle: '위원회 심의 3.2%', icon: '🤖', color: 'orange' },
        { title: '시정 조치', value: '1,890건', subtitle: '이번 달', icon: '⚖️', color: 'green' },
        { title: '투명성 점수', value: '99.7점', subtitle: '오픈해시 기록', icon: '⭐', color: 'purple' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-700 to-amber-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">공정거래위원회 AI 자동화 시스템</h2>
                <p className="text-lg text-orange-100 mb-6">
                    국가데이터처와 연동하여 독과점·불공정거래·담합을 조사하고, 
                    오픈해시 기술로 모든 조사·심의 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-orange-100">OpenHash + AI 시장분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-orange-100">조사 기간 85% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-orange-100">AI 담합 탐지 98.5%</div>
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
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-semibold text-gray-900 mb-2">독과점 조사</h4>
                        <p className="text-sm text-gray-600">AI가 시장지배적지위 남용을 자동 탐지하고 가격담합을 분석합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">불공정거래 심사</h4>
                        <p className="text-sm text-gray-600">AI가 불공정거래행위를 자동 식별하고 위법성을 평가합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🏢</div>
                        <h4 className="font-semibold text-gray-900 mb-2">기업결합 심사</h4>
                        <p className="text-sm text-gray-600">AI가 M&A의 경쟁제한 효과를 자동으로 분석합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">소비자 보호</h4>
                        <p className="text-sm text-gray-600">AI가 허위과대광고를 자동 탐지하고 소비자 피해를 예방합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
