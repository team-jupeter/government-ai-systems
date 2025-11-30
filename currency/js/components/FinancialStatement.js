const FinancialStatement = () => {
    const benefits = [
        { icon: '📊', title: '실시간 재무제표', desc: '자동 생성 및 감사', color: 'blue' },
        { icon: '🔗', title: 'OpenHash 검증', desc: '무결성 100% 보장', color: 'green' },
        { icon: '🤖', title: 'AI 분석', desc: '이상 항목 자동 탐지', color: 'purple' },
        { icon: '📱', title: '원클릭 신고', desc: '금융당국 즉시 제출', color: 'cyan' }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-file-invoice-dollar text-blue-600 mr-3"></i>
                        자동 재무제표 생성
                    </h2>
                    <p className="text-lg text-gray-600">AI가 실시간으로 작성하고 OpenHash로 검증</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {benefits.map((b, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover shadow-sm">
                            <div className="text-5xl mb-4">{b.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                            <p className="text-sm text-gray-600">{b.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">재무제표 자동화 프로세스</h3>
                    <div className="grid md:grid-cols-5 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                            <div className="text-3xl mb-2">💰</div>
                            <div className="text-sm font-semibold text-gray-900">거래 발생</div>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-arrow-right text-2xl text-blue-600"></i>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                            <div className="text-3xl mb-2">🔗</div>
                            <div className="text-sm font-semibold text-gray-900">OpenHash 기록</div>
                        </div>
                        <div className="flex items-center justify-center">
                            <i className="fas fa-arrow-right text-2xl text-blue-600"></i>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-sm font-semibold text-gray-900">재무제표 생성</div>
                        </div>
                    </div>
                    <p className="text-center text-gray-700 mt-6">
                        평균 처리 시간: <span className="font-bold text-blue-600">0.8초</span> | 
                        정확도: <span className="font-bold text-green-600">99.9%</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
