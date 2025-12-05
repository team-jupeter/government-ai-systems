const Statistics = () => {
    const performanceData = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
            {
                label: '처리 건수',
                data: [28000, 31000, 29500, 33000, 35500, 37000]
            }
        ]
    };
    
    const efficiencyMetrics = [
        { metric: '업무 처리 속도', before: '평균 45분/건', after: '평균 4.5분/건', improvement: '90%' },
        { metric: '인력 투입', before: '직원 3명', after: '직원 1명 + AI', improvement: '67%' },
        { metric: '오류율', before: '2.3%', after: '0.12%', improvement: '94.8%' },
        { metric: '민원 처리 시간', before: '평균 7일', after: '평균 2시간', improvement: '98.8%' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">통계 및 성과</h2>
                <p className="text-lg text-blue-100">
                    AI 자동화와 오픈해시 도입으로 업무 효율이 극적으로 개선되었습니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="월간 처리량" 
                    value="37,000건"
                    subtitle="전월 대비 +4.2%"
                    icon="📈" 
                    color="blue" 
                />
                <StatCard 
                    title="처리 시간 단축" 
                    value="90%"
                    subtitle="45분 → 4.5분"
                    icon="⚡" 
                    color="green" 
                />
                <StatCard 
                    title="비용 절감" 
                    value="450억원"
                    subtitle="연간 기준"
                    icon="💰" 
                    color="orange" 
                />
                <StatCard 
                    title="만족도" 
                    value="94.5점"
                    subtitle="납세자 만족도"
                    icon="⭐" 
                    color="purple" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">월별 업무 처리량 추이</h3>
                <div className="h-64 flex items-end justify-around space-x-2">
                    {performanceData.datasets[0].data.map((value, idx) => {
                        const maxValue = Math.max(...performanceData.datasets[0].data);
                        const height = (value / maxValue) * 100;
                        return (
                            <div key={idx} className="flex-1 flex flex-col items-center">
                                <div className="text-sm font-semibold text-gray-900 mb-2">
                                    {value.toLocaleString()}
                                </div>
                                <div 
                                    className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-700"
                                    style={{height: `${height}%`}}
                                ></div>
                                <div className="text-xs text-gray-600 mt-2">
                                    {performanceData.labels[idx]}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">효율성 개선 지표</h3>
                <div className="space-y-4">
                    {efficiencyMetrics.map((item, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-gray-900">{item.metric}</h4>
                                <span className="text-2xl font-bold text-green-600">
                                    ↓ {item.improvement}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-red-50 rounded p-3 border border-red-200">
                                    <div className="text-xs text-red-600 font-medium mb-1">도입 전</div>
                                    <div className="font-semibold text-gray-900">{item.before}</div>
                                </div>
                                <div className="bg-green-50 rounded p-3 border border-green-200">
                                    <div className="text-xs text-green-600 font-medium mb-1">도입 후</div>
                                    <div className="font-semibold text-gray-900">{item.after}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">에너지 효율</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">기존 블록체인</span>
                            <span className="text-lg font-bold text-red-600">850 MWh/년</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">오픈해시</span>
                            <span className="text-lg font-bold text-green-600">12.4 MWh/년</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-900">절감율</span>
                                <span className="text-2xl font-bold text-green-600">98.5%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">보안 지표</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">위변조 시도 차단</span>
                            <span className="text-lg font-bold text-green-600">100%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">무단 접근 차단</span>
                            <span className="text-lg font-bold text-green-600">100%</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-gray-900">보안 사고</span>
                                <span className="text-2xl font-bold text-green-600">0건</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Statistics = Statistics;
