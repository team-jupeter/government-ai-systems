const Overview = () => {
    const stats = [
        { title: '정책조정', value: '127건', subtitle: '전월 대비 +15%', icon: '⚖️', color: 'blue' },
        { title: 'AI 분석 완료', value: '95.3%', subtitle: '실무자 검토 4.7%', icon: '🤖', color: 'purple' },
        { title: '차관회의', value: '8회', subtitle: '이번 달', icon: '🏛️', color: 'green' },
        { title: '투명성 점수', value: '99.6점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국무조정실 AI 자동화 시스템</h2>
                <p className="text-lg text-indigo-100 mb-6">
                    국가데이터처와 연동하여 각 부처 간 정책을 조정하고, 
                    오픈해시 기술로 모든 조정 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-indigo-100">OpenHash + AI 정책분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 조정 효율</div>
                        <div className="text-indigo-100">부처간 협의 시간 72% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-indigo-100">AI 정책 분석 정확도 97.2%</div>
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
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">정책 조정</h4>
                        <p className="text-sm text-gray-600">AI가 각 부처의 정책 충돌을 자동으로 탐지하고 조정안을 제시합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🏛️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">차관회의 운영</h4>
                        <p className="text-sm text-gray-600">국무회의 안건을 사전 검토하고 차관회의를 자동으로 준비합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">정부업무평가</h4>
                        <p className="text-sm text-gray-600">각 부처의 업무 성과를 AI가 평가하고 개선 방안을 제시합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📉</div>
                        <h4 className="font-semibold text-gray-900 mb-2">규제개혁</h4>
                        <p className="text-sm text-gray-600">불필요한 규제를 자동으로 발견하고 개선 방안을 마련합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
