const DataLinkage = () => {
    const connections = [
        {
            from: '공공데이터',
            to: '민간서비스',
            icon: '🏛️→🏢',
            examples: ['주민등록→금융인증', '건강보험→의료서비스', '부동산등기→거래플랫폼'],
            benefit: '행정효율 40% 향상'
        },
        {
            from: '민간데이터',
            to: '공공정책',
            icon: '🏢→🏛️',
            examples: ['통신데이터→교통정책', '결제데이터→경제분석', '채용데이터→고용정책'],
            benefit: '정책 정확도 35% 향상'
        },
        {
            from: '개인데이터',
            to: '맞춤서비스',
            icon: '👤→📱',
            examples: ['건강기록→헬스케어', '학습이력→교육추천', '금융정보→자산관리'],
            benefit: '개인화 서비스 품질 50% 향상'
        }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-exchange-alt text-blue-600 mr-3"></i>
                        데이터 연계 시나리오
                    </h2>
                    <p className="text-lg text-gray-600">실시간으로 안전하게 연결되는 데이터 생태계</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {connections.map((conn, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-3">{conn.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{conn.from}</h3>
                                <div className="text-sm text-gray-500 mb-1">↓</div>
                                <h3 className="text-xl font-bold text-gray-900">{conn.to}</h3>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                {conn.examples.map((ex, j) => (
                                    <div key={j} className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                                        • {ex}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                                <div className="text-sm font-semibold text-blue-700">{conn.benefit}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl mb-3">🔐</div>
                            <div className="text-2xl font-bold text-blue-600 mb-2">암호화 전송</div>
                            <p className="text-gray-600">양자내성 암호로 데이터 보호</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-3">⚡</div>
                            <div className="text-2xl font-bold text-blue-600 mb-2">실시간 연계</div>
                            <p className="text-gray-600">평균 2.3초 이내 검증 완료</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-3">📊</div>
                            <div className="text-2xl font-bold text-blue-600 mb-2">투명한 추적</div>
                            <p className="text-gray-600">모든 연계 이력 감사 가능</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
