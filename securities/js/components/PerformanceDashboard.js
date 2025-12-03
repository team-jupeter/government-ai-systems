function PerformanceDashboard() {

    const channelData = [
        { name: '웹', value: 32 },
        { name: '모바일', value: 54 },
        { name: '전화', value: 9 },
        { name: 'API', value: 5 }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">핵심 성과 지표 (KPI)</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        <i className="fas fa-mobile text-blue-600 mr-2"></i>
                        채널별 거래 비중
                    </h3>
                    <div className="space-y-3">
                        {channelData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-sm font-bold text-blue-600">{item.value}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${item.value}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        <i className="fas fa-chart-line text-green-600 mr-2"></i>
                        상품별 수수료 비중
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">주식</span>
                                <span className="text-sm font-bold text-green-600">58%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">파생상품</span>
                                <span className="text-sm font-bold text-green-600">23%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">채권</span>
                                <span className="text-sm font-bold text-green-600">12%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">기타</span>
                                <span className="text-sm font-bold text-green-600">7%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '7%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <i className="fas fa-robot text-2xl text-blue-600"></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">AI 자동화율</div>
                            <div className="text-2xl font-bold text-blue-600">85%</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">전체 업무 중 자동화 비율</div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <i className="fas fa-clock text-2xl text-green-600"></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">응답 시간</div>
                            <div className="text-2xl font-bold text-green-600">1.8초</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">AI 상담 평균 응답 시간</div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <i className="fas fa-shield-halved text-2xl text-purple-600"></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">규제 준수율</div>
                            <div className="text-2xl font-bold text-purple-600">99.7%</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">컴플라이언스 자동 검사</div>
                </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <i className="fas fa-check-circle text-3xl text-green-600"></i>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-green-900 mb-2">시스템 정상 가동 중</h3>
                        <p className="text-green-700 mb-4">
                            모든 핵심 시스템이 정상 작동하고 있습니다.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <div className="text-green-600 font-semibold">트레이딩</div>
                                <div className="text-green-800">✓ 정상</div>
                            </div>
                            <div>
                                <div className="text-green-600 font-semibold">정산</div>
                                <div className="text-green-800">✓ 정상</div>
                            </div>
                            <div>
                                <div className="text-green-600 font-semibold">리스크 관리</div>
                                <div className="text-green-800">✓ 정상</div>
                            </div>
                            <div>
                                <div className="text-green-600 font-semibold">컴플라이언스</div>
                                <div className="text-green-800">✓ 정상</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.PerformanceDashboard = PerformanceDashboard;
