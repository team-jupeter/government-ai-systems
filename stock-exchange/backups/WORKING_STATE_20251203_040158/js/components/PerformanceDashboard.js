function PerformanceDashboard() {

    const performanceData = [
        { name: '한국거래소', tps: 66667, latency: 0.015 },
        { name: 'NASDAQ', tps: 200, latency: 5 },
        { name: 'NYSE', tps: 125, latency: 8 },
        { name: '도쿄거래소', tps: 83, latency: 12 }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">핵심 성과 지표 (KPI)</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        <i className="fas fa-tachometer-alt text-blue-600 mr-2"></i>
                        TPS (초당 거래 처리 수)
                    </h3>
                    <div className="space-y-3">
                        {performanceData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-sm font-bold text-blue-600">{item.tps.toLocaleString()} TPS</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.min((item.tps / 66667) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        <i className="fas fa-clock text-green-600 mr-2"></i>
                        체결 지연시간
                    </h3>
                    <div className="space-y-3">
                        {performanceData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-sm font-bold text-green-600">{item.latency} ms</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.min((15 / item.latency) * 6.67, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <i className="fas fa-microchip text-2xl text-blue-600"></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">FPGA 가동률</div>
                            <div className="text-2xl font-bold text-blue-600">99.97%</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">평균 응답시간: 0.015ms</div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <i className="fas fa-brain text-2xl text-green-600"></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">AI 탐지 정확도</div>
                            <div className="text-2xl font-bold text-green-600">96.8%</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">오늘 처리: 247건</div>
                </div>

                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <i className="fas fa-plug text-2xl text-purple-600"></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">전력 소비</div>
                            <div className="text-2xl font-bold text-purple-600">-88.6%</div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">GPU 대비 절감</div>
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
                                <div className="text-green-600 font-semibold">체결 시스템</div>
                                <div className="text-green-800">✓ 정상</div>
                            </div>
                            <div>
                                <div className="text-green-600 font-semibold">시장감시</div>
                                <div className="text-green-800">✓ 정상</div>
                            </div>
                            <div>
                                <div className="text-green-600 font-semibold">결제 시스템</div>
                                <div className="text-green-800">✓ 정상</div>
                            </div>
                            <div>
                                <div className="text-green-600 font-semibold">데이터 배포</div>
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
