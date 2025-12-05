const Overview = () => {
    const stats = [
        { title: '진정 접수', value: '3,245건', subtitle: '전월 대비 +8.2%', icon: '📋', color: 'blue' },
        { title: 'AI 분석 완료', value: '91.7%', subtitle: '인간 검토 8.3%', icon: '🤖', color: 'purple' },
        { title: '평균 처리 기간', value: '28일', subtitle: '기존 대비 72% 단축', icon: '⏱️', color: 'green' },
        { title: '투명성 점수', value: '98.9점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국가인권위원회 AI 자동화 시스템</h2>
                <p className="text-lg text-blue-100 mb-6">
                    국가데이터처와 연동하여 인권침해 및 차별행위를 신속하게 조사하고, 
                    오픈해시 기술로 모든 처리 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-blue-100">OpenHash + AI 사례 분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 속도</div>
                        <div className="text-blue-100">평균 28일 (기존 대비 72% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 판단 정확도</div>
                        <div className="text-blue-100">AI 정확도 95.3%</div>
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
                        <div className="text-2xl mb-2">📋</div>
                        <h4 className="font-semibold text-gray-900 mb-2">자동 진정 분류</h4>
                        <p className="text-sm text-gray-600">AI가 진정 내용을 분석하여 인권침해 유형을 자동으로 분류합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-semibold text-gray-900 mb-2">유사 사례 검색</h4>
                        <p className="text-sm text-gray-600">과거 판례와 결정례를 학습하여 유사 사례를 실시간 제공합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">법률 검토</h4>
                        <p className="text-sm text-gray-600">관련 법률과 국제인권조약을 AI가 자동 검토하여 권고안을 작성합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">통계 분석</h4>
                        <p className="text-sm text-gray-600">인권침해 유형별 통계를 분석하여 정책 개선 방향을 제시합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
