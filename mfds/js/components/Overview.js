const Overview = () => {
    const stats = [
        { title: '식·의약품 심사', value: '3,245건', subtitle: '전월 대비 +9%', icon: '💊', color: 'blue' },
        { title: 'AI 분석 완료', value: '95.7%', subtitle: '전문가 검토 4.3%', icon: '🤖', color: 'purple' },
        { title: '위해 차단', value: '1,567건', subtitle: '이번 달', icon: '🛡️', color: 'green' },
        { title: '투명성 점수', value: '99.5점', subtitle: '오픈해시 기록', icon: '⭐', color: 'orange' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-700 to-pink-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">식품의약품안전처 AI 자동화 시스템</h2>
                <p className="text-lg text-red-100 mb-6">
                    국가데이터처와 연동하여 식품·의약품·의료기기·화장품의 안전을 책임지고, 
                    오픈해시 기술로 모든 심사와 검사 과정을 투명하게 기록합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">💡 핵심 기술</div>
                        <div className="text-red-100">OpenHash + AI 위해평가</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">⚡ 처리 효율</div>
                        <div className="text-red-100">심사 시간 88% 단축</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="font-semibold mb-1">🛡️ 정확도</div>
                        <div className="text-red-100">AI 위해 검출 98.3%</div>
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
                        <div className="text-2xl mb-2">🍱</div>
                        <h4 className="font-semibold text-gray-900 mb-2">식품 안전 관리</h4>
                        <p className="text-sm text-gray-600">AI가 식품첨가물, 영양성분, 유해물질을 자동 분석하여 안전성을 검증합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">💊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">의약품 심사·허가</h4>
                        <p className="text-sm text-gray-600">임상시험 자료를 AI가 분석하여 의약품 허가 심사를 지원합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">🏥</div>
                        <h4 className="font-semibold text-gray-900 mb-2">의료기기 인증</h4>
                        <p className="text-sm text-gray-600">AI가 의료기기의 안전성·유효성을 평가하고 등급을 분류합니다.</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-2xl mb-2">💄</div>
                        <h4 className="font-semibold text-gray-900 mb-2">화장품 심사</h4>
                        <p className="text-sm text-gray-600">화장품 성분을 AI가 분석하여 유해물질 포함 여부를 판단합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Overview = Overview;
