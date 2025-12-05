const Overview = () => {
    const stats = [
        { title: '법령 심사', value: '1,856건', subtitle: '전월 대비 +12%', icon: '⚖️', color: 'blue' },
        { title: 'AI 분석 완료', value: '94.8%', subtitle: '법제관 검토 5.2%', icon: '🤖', color: 'purple' },
        { title: '법령 해석', value: '2,345건', subtitle: '이번 달', icon: '📜', color: 'green' },
        { title: '투명성 점수', value: '99.8점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-700 to-yellow-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">법제처 AI 자동화 시스템</h2>
                <p className="text-lg text-amber-100 mb-6">
                    국가데이터처와 연동하여 정부입법을 총괄·조정하고, 
                    오픈해시 기술로 모든 법령 심사와 해석 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-amber-100">OpenHash + AI 법령분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-amber-100">법령 심사 시간 85% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-amber-100">AI 법리 분석 97.5%</div>
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
                        <h4 className="font-semibold text-gray-900 mb-2">법령 심사</h4>
                        <p className="text-sm text-gray-600">AI가 법령안의 체계·자구·법리를 자동 분석하고 문제점을 사전 검토합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📜</div>
                        <h4 className="font-semibold text-gray-900 mb-2">법령 해석</h4>
                        <p className="text-sm text-gray-600">법령의 의미와 적용범위를 AI가 분석하여 일관된 해석을 제공합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📚</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국가법령정보센터</h4>
                        <p className="text-sm text-gray-600">620만 건 이상의 법령정보를 AI가 통합 관리하고 검색을 지원합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">✏️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">알기 쉬운 법령</h4>
                        <p className="text-sm text-gray-600">AI가 어려운 법령 문장을 분석하여 쉬운 표현으로 개선을 제안합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
