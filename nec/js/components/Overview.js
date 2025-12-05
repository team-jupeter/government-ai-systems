const Overview = () => {
    const stats = [
        { title: '정책 심의', value: '45건', subtitle: '전월 대비 +12%', icon: '📋', color: 'blue' },
        { title: 'AI 분석 완료', value: '93.8%', subtitle: '위원 검토 6.2%', icon: '🤖', color: 'purple' },
        { title: '국민 의견 수렴', value: '12,450건', subtitle: '온라인 참여', icon: '👥', color: 'green' },
        { title: '투명성 점수', value: '99.2점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국가교육위원회 AI 자동화 시스템</h2>
                <p className="text-lg text-green-100 mb-6">
                    국가데이터처와 연동하여 중장기 교육정책을 수립하고, 
                    오픈해시 기술로 모든 정책 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-green-100">OpenHash + AI 정책 분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 의견 수렴</div>
                        <div className="text-green-100">실시간 국민 참여 (평균 12,000명)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 합의 도출</div>
                        <div className="text-green-100">AI 지원 협의 정확도 96.1%</div>
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
                        <div className="text-2xl mb-2">📚</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국가교육발전계획</h4>
                        <p className="text-sm text-gray-600">AI가 교육 데이터를 분석하여 10년 단위 중장기 계획을 수립합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📖</div>
                        <h4 className="font-semibold text-gray-900 mb-2">교육과정 기준</h4>
                        <p className="text-sm text-gray-600">국가교육과정의 기준과 내용을 검토하고 고시합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">👥</div>
                        <h4 className="font-semibold text-gray-900 mb-2">국민 의견 수렴</h4>
                        <p className="text-sm text-gray-600">교육정책에 대한 국민 의견을 온라인으로 실시간 수렴합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🤝</div>
                        <h4 className="font-semibold text-gray-900 mb-2">사회적 협의</h4>
                        <p className="text-sm text-gray-600">다양한 교육 주체들의 합의를 이끌어내는 숙의 과정을 지원합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
