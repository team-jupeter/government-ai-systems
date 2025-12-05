const Overview = () => {
    const stats = [
        { title: '특허 심사', value: '4,567건', subtitle: '전월 대비 +15%', icon: '📋', color: 'blue' },
        { title: 'AI 분석 완료', value: '97.2%', subtitle: '심사관 검토 2.8%', icon: '🤖', color: 'purple' },
        { title: '등록 완료', value: '3,890건', subtitle: '이번 달', icon: '✅', color: 'green' },
        { title: '투명성 점수', value: '99.9점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-700 to-purple-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">지식재산처 AI 자동화 시스템</h2>
                <p className="text-lg text-violet-100 mb-6">
                    국가데이터처와 연동하여 특허·실용신안·디자인·상표의 심사를 지원하고, 
                    오픈해시 기술로 모든 심사·심판 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-violet-100">OpenHash + AI 선행기술조사</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-violet-100">심사 기간 90% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-violet-100">AI 신규성 판단 99.1%</div>
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
                        <h4 className="font-semibold text-gray-900 mb-2">특허 심사</h4>
                        <p className="text-sm text-gray-600">AI가 선행기술을 조사하고 신규성·진보성을 자동 평가하여 심사를 지원합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🎨</div>
                        <h4 className="font-semibold text-gray-900 mb-2">디자인 심사</h4>
                        <p className="text-sm text-gray-600">AI 이미지 인식으로 유사 디자인을 자동 검색하고 권리범위를 분석합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">®️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">상표 심사</h4>
                        <p className="text-sm text-gray-600">AI가 상표 유사도를 판단하고 식별력을 자동 평가합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">심판 지원</h4>
                        <p className="text-sm text-gray-600">AI가 심판 청구를 분석하고 유사 판례를 자동으로 검색합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
