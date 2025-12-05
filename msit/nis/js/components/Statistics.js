const { useState } = React;
const { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

const Statistics = () => {
    const [timePeriod, setTimePeriod] = useState('month');
    
    const performanceData = {
        month: [
            { date: '11/01', collection: 456, analysis: 389, action: 67 },
            { date: '11/08', collection: 523, analysis: 445, action: 78 },
            { date: '11/15', collection: 489, analysis: 421, action: 68 },
            { date: '11/22', collection: 512, analysis: 456, action: 56 },
            { date: '11/29', collection: 478, analysis: 398, action: 80 }
        ],
        year: [
            { month: '1월', collection: 5234, analysis: 4456, action: 778 },
            { month: '2월', collection: 5678, analysis: 4890, action: 788 },
            { month: '3월', collection: 6123, analysis: 5234, action: 889 },
            { month: '4월', collection: 5890, analysis: 5012, action: 878 },
            { month: '5월', collection: 6234, analysis: 5345, action: 889 },
            { month: '6월', collection: 6456, analysis: 5567, action: 889 },
            { month: '7월', collection: 6789, analysis: 5890, action: 899 },
            { month: '8월', collection: 6234, analysis: 5456, action: 778 },
            { month: '9월', collection: 6567, analysis: 5678, action: 889 },
            { month: '10월', collection: 6890, analysis: 5901, action: 989 },
            { month: '11월', collection: 6123, analysis: 5234, action: 889 },
            { month: '12월', collection: 5678, analysis: 4890, action: 788 }
        ]
    };
    
    const departmentPerformance = [
        { name: '해외정보국', value: 2456, color: '#3b82f6' },
        { name: '대북정보국', value: 1890, color: '#8b5cf6' },
        { name: '방첩국', value: 1234, color: '#10b981' },
        { name: '사이버안보국', value: 890, color: '#f59e0b' },
        { name: '테러정보센터', value: 456, color: '#ef4444' },
        { name: '범죄정보센터', value: 234, color: '#6366f1' }
    ];
    
    const efficiencyTrend = [
        { month: '7월', before: 72, after: 168 },
        { month: '8월', before: 68, after: 156 },
        { month: '9월', before: 65, after: 145 },
        { month: '10월', before: 62, after: 138 },
        { month: '11월', before: 58, after: 125 },
        { month: '12월', before: 54, after: 118 }
    ];
    
    const threatLevelDistribution = [
        { level: '긴급', count: 23, color: '#ef4444' },
        { level: '높음', count: 156, color: '#f59e0b' },
        { level: '중간', count: 489, color: '#fbbf24' },
        { level: '낮음', count: 1234, color: '#10b981' }
    ];
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">통계 및 성과 분석</h2>
                <p className="text-indigo-100 text-sm">
                    정보활동의 모든 지표를 실시간으로 모니터링하고 분석합니다
                </p>
            </div>
            
            {/* 핵심 지표 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="월간 정보 수집" 
                    value="6,123건" 
                    subtitle="전월 대비 +8.2%"
                    icon="📡" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 분석 완료" 
                    value="5,234건" 
                    subtitle="정확도 96.8%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="조치 완료" 
                    value="889건" 
                    subtitle="평균 2.3일"
                    icon="✓" 
                    color="green" 
                />
                <StatCard 
                    title="위협 차단" 
                    value="156건" 
                    subtitle="조기 탐지율 92%"
                    icon="🛡️" 
                    color="red" 
                />
            </div>
            
            {/* 업무 처리 추이 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">업무 처리 추이</h3>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setTimePeriod('month')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${timePeriod === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            월간
                        </button>
                        <button 
                            onClick={() => setTimePeriod('year')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${timePeriod === 'year' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            연간
                        </button>
                    </div>
                </div>
                
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={performanceData[timePeriod]}>
                        <defs>
                            <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorAnalysis" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorAction" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={timePeriod === 'month' ? 'date' : 'month'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="collection" name="정보 수집" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCollection)" />
                        <Area type="monotone" dataKey="analysis" name="AI 분석" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAnalysis)" />
                        <Area type="monotone" dataKey="action" name="조치 완료" stroke="#10b981" fillOpacity={1} fill="url(#colorAction)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            {/* 부서별 성과 및 위협 수준 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">부서별 정보 수집</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={departmentPerformance}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {departmentPerformance.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">위협 수준 분포</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={threatLevelDistribution} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="level" type="category" />
                            <Tooltip />
                            <Bar dataKey="count" name="건수">
                                {threatLevelDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* 효율성 개선 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">처리 시간 단축 추이 (시간)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={efficiencyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="before" name="AI 도입 전" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="after" name="AI 도입 후" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">78%</div>
                        <div className="text-sm text-gray-600">시간 단축률</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-1">54시간</div>
                        <div className="text-sm text-gray-600">현재 평균 처리 시간</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-1">2.5배</div>
                        <div className="text-sm text-gray-600">생산성 향상</div>
                    </div>
                </div>
            </div>
            
            {/* 월별 성과 요약 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">이번 달 성과 요약</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="text-blue-600 mr-2">📊</span>
                            주요 성과
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                APT 공격 조기 탐지 및 차단 (23건)
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                해외 정보망 신규 확보 (12개국)
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                산업기밀 유출 시도 차단 (8건)
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                테러 위협 사전 탐지 (5건)
                            </li>
                        </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="text-purple-600 mr-2">🎯</span>
                            개선 목표
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">▸</span>
                                AI 분석 정확도 97% 달성 (현재 96.8%)
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">▸</span>
                                처리 시간 50시간 이하로 단축
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">▸</span>
                                위협 조기 탐지율 95% 달성
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-600 mr-2">▸</span>
                                국제 협력 네트워크 확대 (150개국)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* KPI 대시보드 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">핵심 성과 지표 (KPI)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-indigo-200">
                        <div className="text-sm text-gray-600 mb-1">정보 수집 목표 달성률</div>
                        <div className="text-3xl font-bold text-indigo-600 mb-1">103%</div>
                        <div className="text-xs text-green-600">목표 초과 달성 ↑</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-indigo-200">
                        <div className="text-sm text-gray-600 mb-1">AI 정확도</div>
                        <div className="text-3xl font-bold text-purple-600 mb-1">96.8%</div>
                        <div className="text-xs text-green-600">전월 대비 +0.5%p ↑</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-indigo-200">
                        <div className="text-sm text-gray-600 mb-1">위협 차단 성공률</div>
                        <div className="text-3xl font-bold text-green-600 mb-1">98.7%</div>
                        <div className="text-xs text-green-600">전월 대비 +1.2%p ↑</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-indigo-200">
                        <div className="text-sm text-gray-600 mb-1">국제 협력 만족도</div>
                        <div className="text-3xl font-bold text-blue-600 mb-1">9.2/10</div>
                        <div className="text-xs text-green-600">전월 대비 +0.3 ↑</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Statistics = Statistics;
