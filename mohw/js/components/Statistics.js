const Statistics = () => {
    const performanceData = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
            {
                label: 'R예산편성D과제평가 건수',
                data: [98, 105, 112, 118, 123, 127]
            }
        ]
    };
    
    const efficiencyMetrics = [
        { metric: '조정 소요 시간', before: '평균 18일', after: '평균 5일', improvement: '72.2%' },
        { metric: '부처 협의 시간', before: '평균 12일', after: '평균 3일', improvement: '75%' },
        { metric: '문서 작성 시간', before: '평균 8일', after: '평균 1일', improvement: '87.5%' },
        { metric: '의사결정 정확도', before: '84.2%', after: '97.2%', improvement: '+13%p' }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-700 to-teal-700 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">통계 및 성과</h2>
                <p className="text-lg text-cyan-100">
                    AI 자동화와 오픈해시 도입으로 정책 조정 효율이 극적으로 개선되었습니다.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="월간 조정" 
                    value="127건"
                    subtitle="전월 대비 +3.3%"
                    icon="📈" 
                    color="blue" 
                />
                <StatCard 
                    title="처리 시간 단축" 
                    value="72%"
                    subtitle="18일 → 5일"
                    icon="⚡" 
                    color="green" 
                />
                <StatCard 
                    title="차관회의" 
                    value="8회"
                    subtitle="이번 달"
                    icon="🏛️" 
                    color="orange" 
                />
                <StatCard 
                    title="만족도" 
                    value="96.8점"
                    subtitle="각 부처 평가"
                    icon="⭐" 
                    color="purple" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">월별 R예산편성D과제평가 추이</h3>
                <div className="h-64 flex items-end justify-around border-b border-l border-gray-300 pb-4 pl-4">
                    {performanceData.datasets[0].data.map((value, idx) => (
                        <div key={idx} className="flex flex-col items-center" style={{width: '12%'}}>
                            <div className="text-xs font-semibold text-gray-700 mb-1">{value}건</div>
                            <div 
                                className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t"
                                style={{height: `${(value/127)*100}%`}}
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
                                <span className="text-lg font-bold text-cyan-600">{item.improvement.startsWith('+') ? item.improvement : `-${item.improvement}`}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-500 mb-1">AI 도입 전</div>
                                    <div className="font-semibold text-cyan-600">{item.before}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">AI 도입 후</div>
                                    <div className="font-semibold text-cyan-600">{item.after}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">부문별 조정 현황</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">경제정책</h4>
                        <div className="text-3xl font-bold text-cyan-600 mb-1">48건</div>
                        <div className="text-sm text-gray-600">전체의 37.8%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">사회정책</h4>
                        <div className="text-3xl font-bold text-cyan-600 mb-1">39건</div>
                        <div className="text-sm text-gray-600">전체의 30.7%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">규제개혁</h4>
                        <div className="text-3xl font-bold text-cyan-600 mb-1">28건</div>
                        <div className="text-sm text-gray-600">전체의 22%</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">기타</h4>
                        <div className="text-3xl font-bold text-gray-600 mb-1">12건</div>
                        <div className="text-sm text-gray-600">전체의 9.5%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Statistics = Statistics;
