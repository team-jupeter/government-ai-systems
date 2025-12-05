const Overview = () => {
    const stats = [
        { title: '인사 관리', value: '1,024건', subtitle: '전월 대비 +6%', icon: '👥', color: 'blue' },
        { title: 'AI 분석 완료', value: '96.2%', subtitle: '담당자 검토 3.8%', icon: '🤖', color: 'purple' },
        { title: '공무원 시험', value: '8,456명', subtitle: '이번 채용', icon: '📝', color: 'green' },
        { title: '투명성 점수', value: '99.7점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-700 to-green-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">인사혁신처 AI 자동화 시스템</h2>
                <p className="text-lg text-teal-100 mb-6">
                    국가데이터처와 연동하여 공무원 인사·윤리·복무·연금을 관리하고, 
                    오픈해시 기술로 모든 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-teal-100">OpenHash + AI 인사분석</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-teal-100">인사 처리 시간 82% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-teal-100">AI 평가 정확도 98.1%</div>
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
                        <div className="text-2xl mb-2">👥</div>
                        <h4 className="font-semibold text-gray-900 mb-2">인사 관리</h4>
                        <p className="text-sm text-gray-600">AI가 공무원의 인사기록을 분석하고 승진·보직 추천을 자동으로 제공합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">📝</div>
                        <h4 className="font-semibold text-gray-900 mb-2">채용 시험</h4>
                        <p className="text-sm text-gray-600">국가공무원 시험 관리 및 채점을 AI가 지원하여 공정성을 확보합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">윤리·복무</h4>
                        <p className="text-sm text-gray-600">공직자 윤리와 복무 관리를 AI가 모니터링하여 공직기강을 확립합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">💰</div>
                        <h4 className="font-semibold text-gray-900 mb-2">연금 관리</h4>
                        <p className="text-sm text-gray-600">공무원 연금 산정 및 지급을 AI가 자동으로 계산하고 관리합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
