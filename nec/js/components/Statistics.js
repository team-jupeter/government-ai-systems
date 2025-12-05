const Statistics = () => {
    const performanceData = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
            {
                label: '심의 건수',
                data: [38, 42, 39, 45, 43, 48]
            }
        ]
    };
    
    const efficiencyMetrics = [
        { metric: '정책 분석 시간', before: '평균 45일', after: '평균 12일', improvement: '73.3%' },
        { metric: '의견 수렴 기간', before: '평균 60일', after: '평균 15일', improvement: '75%' },
        { metric: '심의안 작성', before: '평균 30일', after: '평균 7일', improvement: '76.7%' },
        { metric: '국민 참여율', before: '2,300명', after: '12,450명', improvement: '+441%' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">통계 및 성과</h2>
                <p className="text-lg text-green-100">
                    AI 자동화와 오픈해시 도입으로 정책 심의 효율이 극적으로 개선되었습니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="월간 심의" 
                    value="48건"
                    subtitle="전월 대비 +11.6%"
                    icon="📈" 
                    color="blue" 
                />
                <StatCard 
                    title="처리 기간 단축" 
                    value="73%"
                    subtitle="45일 → 12일"
                    icon="⚡" 
                    color="green" 
                />
                <StatCard 
                    title="국민 참여" 
                    value="12,450명"
                    subtitle="온라인 의견 수렴"
                    icon="👥" 
                    color="orange" 
                />
                <StatCard 
                    title="합의 성공률" 
                    value="94.7%"
                    subtitle="사회적 합의 도출"
                    icon="⭐" 
                    color="purple" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">월별 정책 심의 추이</h3>
                <div className="h-64 flex items-end justify-around border-b border-l border-gray-300 pb-4 pl-4">
                    {performanceData.datasets[0].data.map((value, idx) => (
                        <div key={idx} className="flex flex-col items-center" style={{width: '12%'}}>
                            <div className="text-xs font-semibold text-gray-700 mb-1">{value}건</div>
                            <div 
                                className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                                style={{height: `${(value/48)*100}%`}}
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
                                <span className="text-lg font-bold text-green-600">{item.improvement.startsWith('+') ? item.improvement : `-${item.improvement}`}</span>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">정책 분야별 심의</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">교육과정</h4>
                        <div className="text-3xl font-bold text-green-600 mb-1">18건</div>
                        <div className="text-sm text-gray-600">전체의 37.5%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">교원 정책</h4>
                        <div className="text-3xl font-bold text-blue-600 mb-1">14건</div>
                        <div className="text-sm text-gray-600">전체의 29.2%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">대학 입학</h4>
                        <div className="text-3xl font-bold text-purple-600 mb-1">11건</div>
                        <div className="text-sm text-gray-600">전체의 22.9%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">기타</h4>
                        <div className="text-3xl font-bold text-gray-600 mb-1">5건</div>
                        <div className="text-sm text-gray-600">전체의 10.4%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Statistics = Statistics;
