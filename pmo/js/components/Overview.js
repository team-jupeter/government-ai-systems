const Overview = () => {
    const stats = [
        { title: '총리 보좌', value: '156건', subtitle: '전월 대비 +8%', icon: '📋', color: 'blue' },
        { title: 'AI 분석 완료', value: '93.5%', subtitle: '비서관 검토 6.5%', icon: '🤖', color: 'purple' },
        { title: '민원 처리', value: '1,234건', subtitle: '이번 달', icon: '📞', color: 'green' },
        { title: '투명성 점수', value: '99.4점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-700 to-cyan-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">국무총리비서실 AI 자동화 시스템</h2>
                <p className="text-lg text-blue-100 mb-6">
                    국가데이터처와 연동하여 국무총리의 직무를 보좌하고, 
                    오픈해시 기술로 모든 업무 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-blue-100">OpenHash + AI 문서분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-blue-100">문서 처리 시간 78% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-blue-100">AI 분석 정확도 96.8%</div>
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
                        <div className="text-2xl mb-2">🏛️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">대국회 활동 보좌</h4>
                        <p className="text-sm text-gray-600">AI가 국회 관련 자료를 분석하고 답변 초안을 자동으로 준비합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📞</div>
                        <h4 className="font-semibold text-gray-900 mb-2">민원 업무 처리</h4>
                        <p className="text-sm text-gray-600">국민 민원을 AI가 자동 분류하고 담당 부서로 배정합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📢</div>
                        <h4 className="font-semibold text-gray-900 mb-2">홍보·소통</h4>
                        <p className="text-sm text-gray-600">국정 활동을 AI가 분석하여 효과적인 홍보 전략을 제안합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🤝</div>
                        <h4 className="font-semibold text-gray-900 mb-2">시민사회 협력</h4>
                        <p className="text-sm text-gray-600">시민단체 의견을 수렴하고 정책에 반영하는 과정을 지원합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
