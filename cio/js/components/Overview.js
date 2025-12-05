const Overview = () => {
    const stats = [
        { title: '진행 중 사건', value: '128건', subtitle: '수사 85건, 기소 43건', icon: '⚖️', color: 'blue' },
        { title: 'AI 분석 완료', value: '94.2%', subtitle: '인간 검토 5.8%', icon: '🤖', color: 'purple' },
        { title: '평균 수사 기간', value: '42일', subtitle: '기존 대비 65% 단축', icon: '⏱️', color: 'green' },
        { title: '투명성 점수', value: '99.1점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">고위공직자범죄수사처 AI 자동화 시스템</h2>
                <p className="text-lg text-red-100 mb-6">
                    국가데이터처와 연동하여 고위공직자 범죄를 신속하게 수사하고, 
                    오픈해시 기술로 모든 수사 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-red-100">OpenHash + AI 증거 분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 수사 속도</div>
                        <div className="text-red-100">평균 42일 (기존 대비 65% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 증거 분석</div>
                        <div className="text-red-100">AI 정확도 96.8%</div>
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
                        <h4 className="font-semibold text-gray-900 mb-2">자동 증거 수집</h4>
                        <p className="text-sm text-gray-600">AI가 국가데이터처에서 관련 증거를 자동으로 수집하고 분석합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">범죄 패턴 분석</h4>
                        <p className="text-sm text-gray-600">과거 판례와 수사 사례를 학습하여 범죄 패턴을 실시간 탐지합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">법률 검토</h4>
                        <p className="text-sm text-gray-600">관련 법률과 판례를 AI가 자동 검토하여 기소 가능성을 평가합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📝</div>
                        <h4 className="font-semibold text-gray-900 mb-2">기소장 자동 작성</h4>
                        <p className="text-sm text-gray-600">증거와 법률 검토를 바탕으로 기소장 초안을 자동 생성합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
