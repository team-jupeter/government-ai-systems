const Overview = () => {
    const stats = [
        { title: '오늘 방송 심의', value: '1,247건', subtitle: '전일 대비 +3%', icon: '📺', color: 'blue' },
        { title: 'AI 자동 분석', value: '89.5%', subtitle: '인간 검토 10.5%', icon: '🤖', color: 'purple' },
        { title: '통신 민원 처리', value: '3,892건', subtitle: '평균 1.5일', icon: '📞', color: 'green' },
        { title: '투명성 점수', value: '98.5점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">방송미디어통신위원회 AI 자동화 시스템</h2>
                <p className="text-lg text-indigo-100 mb-6">
                    국가데이터처와 연동하여 방송·미디어·통신의 모든 규제 및 이용자 보호 업무를 투명하게 관리하고, 
                    오픈해시 기술로 공정성과 투명성을 보장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-indigo-100">OpenHash + AI 방송심의 분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 민원 처리 속도</div>
                        <div className="text-indigo-100">평균 1.5일 (기존 대비 70% 단축)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 유해콘텐츠 탐지</div>
                        <div className="text-indigo-100">AI 정확도 96.8%</div>
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
                        <div className="text-2xl mb-2">📺</div>
                        <h4 className="font-semibold text-gray-900 mb-2">방송 심의 자동화</h4>
                        <p className="text-sm text-gray-600">AI가 방송 콘텐츠를 분석하여 유해성, 공정성, 광고 규정 위반 여부를 실시간 검토합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🔍</div>
                        <h4 className="font-semibold text-gray-900 mb-2">통신 이용자 보호</h4>
                        <p className="text-sm text-gray-600">통신 서비스 관련 민원을 AI가 분석하여 신속하게 처리하고 소비자 권익을 보호합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🎬</div>
                        <h4 className="font-semibold text-gray-900 mb-2">미디어 정책 관리</h4>
                        <p className="text-sm text-gray-600">OTT, 디지털방송 등 뉴미디어 서비스의 정책 수립 및 규제를 데이터 기반으로 수행합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">방송통신 시장조사</h4>
                        <p className="text-sm text-gray-600">시장 동향, 이용자 현황, 경쟁 상황을 실시간 모니터링하여 정책 개선에 활용합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Overview = Overview;
