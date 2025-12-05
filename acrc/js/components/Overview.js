const Overview = () => {
    const stats = [
        { title: '민원 처리', value: '5,678건', subtitle: '전월 대비 +12%', icon: '📝', color: 'blue' },
        { title: 'AI 분석 완료', value: '95.8%', subtitle: '위원회 심의 4.2%', icon: '🤖', color: 'teal' },
        { title: '제도 개선', value: '1,234건', subtitle: '이번 달', icon: '✅', color: 'green' },
        { title: '투명성 점수', value: '99.8점', subtitle: '오픈해시 기록', icon: '⭐', color: 'cyan' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국민권익위원회 AI 자동화 시스템</h2>
                <p className="text-lg text-teal-100 mb-6">
                    국가데이터처와 연동하여 고충민원·부패신고·행정심판을 처리하고, 
                    오픈해시 기술로 모든 처리 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-teal-100">OpenHash + AI 민원분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-teal-100">민원 처리 90% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-teal-100">AI 부패 탐지 98.2%</div>
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
                        <div className="text-2xl mb-2">📝</div>
                        <h4 className="font-semibold text-gray-900 mb-2">고충민원 처리</h4>
                        <p className="text-sm text-gray-600">AI가 민원을 자동 분류하고 유사 사례를 검색하여 신속한 처리를 지원합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">부패방지</h4>
                        <p className="text-sm text-gray-600">AI가 부패행위를 자동 탐지하고 공익신고를 분석하여 조사를 지원합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">행정심판</h4>
                        <p className="text-sm text-gray-600">AI가 행정처분을 분석하고 유사 판례를 자동 검색합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">청렴도 측정</h4>
                        <p className="text-sm text-gray-600">AI가 공공기관 청렴도를 자동 분석하고 부패 위험을 평가합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
