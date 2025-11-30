const CrossChain = () => {
    const chains = [
        { name: '비트코인', icon: '₿', color: 'text-orange-600', status: '연결됨' },
        { name: '이더리움', icon: 'Ξ', color: 'text-blue-600', status: '연결됨' },
        { name: '리플', icon: 'XRP', color: 'text-gray-700', status: '연결됨' },
        { name: '한국 CBDC', icon: '₩', color: 'text-green-600', status: '연결됨' }
    ];

    return (
        <div className="section-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-link text-blue-600 mr-3"></i>
                        크로스체인 통합
                    </h2>
                    <p className="text-lg text-gray-600">주요 블록체인과 실시간 연결</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {chains.map((chain, i) => (
                        <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-6 card-hover shadow-md text-center">
                            <div className={`text-5xl font-bold mb-3 ${chain.color}`}>{chain.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{chain.name}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-green-600 font-medium">{chain.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">크로스체인 거래 흐름</h3>
                    <div className="flex items-center justify-between max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-2">💰</div>
                            <div className="text-sm font-semibold text-gray-900">원화 입금</div>
                        </div>
                        <div className="text-3xl text-blue-600">→</div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-2">🔗</div>
                            <div className="text-sm font-semibold text-gray-900">OpenHash 변환</div>
                        </div>
                        <div className="text-3xl text-blue-600">→</div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-2">⚡</div>
                            <div className="text-sm font-semibold text-gray-900">타체인 전송</div>
                        </div>
                        <div className="text-3xl text-blue-600">→</div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-2">✓</div>
                            <div className="text-sm font-semibold text-gray-900">0.3초 완료</div>
                        </div>
                    </div>
                    <p className="text-center text-gray-700 mt-6">
                        교환 수수료: <span className="font-bold text-blue-600">0.1%</span> | 
                        처리 속도: <span className="font-bold text-green-600">0.3초</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
