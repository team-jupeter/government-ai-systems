const Statistics = () => {
    const performanceData = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
            {
                label: '처리 건수',
                data: [2890, 3120, 2950, 3340, 3180, 3450]
            }
        ]
    };
    
    const efficiencyMetrics = [
        { metric: '진정 처리 기간', before: '평균 100일', after: '평균 28일', improvement: '72%' },
        { metric: '사례 분석 시간', before: '평균 12일', after: '평균 1.5일', improvement: '87.5%' },
        { metric: '권고안 작성', before: '평균 20일', after: '평균 5일', improvement: '75%' },
        { metric: '법률 검토', before: '평균 8일', after: '평균 0.5일', improvement: '93.8%' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">통계 및 성과</h2>
                <p className="text-lg text-blue-100">
                    AI 자동화와 오픈해시 도입으로 진정 처리 효율이 극적으로 개선되었습니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="월간 처리량" 
                    value="3,450건"
                    subtitle="전월 대비 +8.5%"
                    icon="📈" 
                    color="blue" 
                />
                <StatCard 
                    title="처리 기간 단축" 
                    value="72%"
                    subtitle="100일 → 28일"
                    icon="⚡" 
                    color="green" 
                />
                <StatCard 
                    title="권고 수용률" 
                    value="87.3%"
                    subtitle="전년 대비 +5.2%p"
                    icon="⚖️" 
                    color="orange" 
                />
                <StatCard 
                    title="만족도" 
                    value="92.8점"
                    subtitle="진정인 만족도"
                    icon="⭐" 
                    color="purple" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">월별 진정 처리량 추이</h3>
                <div className="h-64 flex items-end justify-around border-b border-l border-gray-300 pb-4 pl-4">
                    {performanceData.datasets[0].data.map((value, idx) => (
                        <div key={idx} className="flex flex-col items-center" style={{width: '12%'}}>
                            <div className="text-xs font-semibold text-gray-700 mb-1">{value}건</div>
                            <div 
                                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                                style={{height: `${(value/3450)*100}%`}}
                            ></div>
                            <div className="text-xs text-gray-600 mt-2">{performanceData.labels[idx]}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI 도입 전후 비교</h3>
                <div className="space-y-4">
                    {efficiencyMetrics.map((item, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{item.metric}</h4>
                                <span className="text-lg font-bold text-green-600">-{item.improvement}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-500 mb-1">AI 도입 전</div>
                                    <div className="font-semibold text-red-600">{item.before}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">AI 도입 후</div>
                                    <div className="font-semibold text-blue-600">{item.after}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">진정 유형별 통계</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">인권침해</h4>
                        <div className="text-3xl font-bold text-blue-600 mb-1">1,856건</div>
                        <div className="text-sm text-gray-600">전체의 53.8%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">차별행위</h4>
                        <div className="text-3xl font-bold text-purple-600 mb-1">1,245건</div>
                        <div className="text-sm text-gray-600">전체의 36.1%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">장애인차별</h4>
                        <div className="text-3xl font-bold text-orange-600 mb-1">289건</div>
                        <div className="text-sm text-gray-600">전체의 8.4%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">기타</h4>
                        <div className="text-3xl font-bold text-gray-600 mb-1">60건</div>
                        <div className="text-sm text-gray-600">전체의 1.7%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Statistics = Statistics;
