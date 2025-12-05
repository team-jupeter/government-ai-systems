const { useState } = React;
const { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

const NDRIntegration = () => {
    const [selectedFlow, setSelectedFlow] = useState('daily');
    
    const dataFlowStats = {
        daily: [
            { time: '00:00', input: 45, output: 38 },
            { time: '04:00', input: 32, output: 28 },
            { time: '08:00', input: 78, output: 65 },
            { time: '12:00', input: 92, output: 81 },
            { time: '16:00', input: 67, output: 59 },
            { time: '20:00', input: 51, output: 44 }
        ],
        weekly: [
            { day: '월', input: 456, output: 398 },
            { day: '화', input: 523, output: 467 },
            { day: '수', input: 489, output: 432 },
            { day: '목', input: 512, output: 456 },
            { day: '금', input: 478, output: 421 },
            { day: '토', input: 234, output: 198 },
            { day: '일', input: 189, output: 167 }
        ]
    };
    
    const dataTypeDistribution = [
        { name: '해외정보', value: 35, color: '#3b82f6' },
        { name: '대북정보', value: 28, color: '#8b5cf6' },
        { name: '방첩정보', value: 18, color: '#10b981' },
        { name: '사이버정보', value: 12, color: '#f59e0b' },
        { name: '테러정보', value: 7, color: '#ef4444' }
    ];
    
    const processingStages = [
        {
            stage: '1단계',
            name: '데이터 인출',
            icon: '📥',
            description: '국가데이터처에서 필요한 정보 조회',
            metrics: { total: 892, encrypted: 892, speed: '0.3초' },
            status: 'success'
        },
        {
            stage: '2단계',
            name: 'AI 분석',
            icon: '🤖',
            description: 'DeepSeek R1 모델로 정보 분석',
            metrics: { processed: 892, aiAccuracy: '96.8%', time: '1.2초' },
            status: 'success'
        },
        {
            stage: '3단계',
            name: '요원 검토',
            icon: '👤',
            description: '중요 정보는 전문 요원이 검토',
            metrics: { reviewed: 281, approved: 268, rejected: 13 },
            status: 'success'
        },
        {
            stage: '4단계',
            name: '결과 저장',
            icon: '📤',
            description: '분석 결과를 국가데이터처에 저장',
            metrics: { stored: 868, failed: 0, integrity: '100%' },
            status: 'success'
        }
    ];
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">국가데이터처 연동 현황</h2>
                <p className="text-blue-100 text-sm">
                    실시간으로 데이터를 인출·분석·저장하는 전 과정을 투명하게 추적합니다
                </p>
            </div>
            
            {/* 실시간 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 인출" 
                    value="892건" 
                    subtitle="평균 1.8MB/건"
                    icon="📥" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 분석" 
                    value="892건" 
                    subtitle="정확도 96.8%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="요원 검토" 
                    value="281건" 
                    subtitle="31.5%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="결과 저장" 
                    value="868건" 
                    subtitle="무결성 100%"
                    icon="📤" 
                    color="orange" 
                />
            </div>
            
            {/* 데이터 흐름 그래프 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">데이터 흐름 추이</h3>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setSelectedFlow('daily')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedFlow === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            일간
                        </button>
                        <button 
                            onClick={() => setSelectedFlow('weekly')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedFlow === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            주간
                        </button>
                    </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataFlowStats[selectedFlow]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={selectedFlow === 'daily' ? 'time' : 'day'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="input" name="데이터 인출" fill="#3b82f6" />
                        <Bar dataKey="output" name="결과 저장" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {/* 데이터 유형 분포 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">정보 유형별 분포</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={dataTypeDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {dataTypeDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">처리 성능 지표</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">평균 응답 시간</span>
                                <span className="font-semibold text-gray-900">0.3초</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">AI 분석 정확도</span>
                                <span className="font-semibold text-gray-900">96.8%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '96.8%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">데이터 무결성</span>
                                <span className="font-semibold text-gray-900">100%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '100%'}}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">요원 검토 승인율</span>
                                <span className="font-semibold text-gray-900">95.4%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-orange-600 h-2 rounded-full" style={{width: '95.4%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 처리 단계 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">데이터 처리 흐름</h3>
                <div className="space-y-4">
                    {processingStages.map((stage, index) => (
                        <div key={index}>
                            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                                        {stage.icon}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <span className="text-xs font-semibold text-blue-600 mr-2">{stage.stage}</span>
                                            <span className="font-bold text-gray-900">{stage.name}</span>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                            ✓ 정상
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        {Object.entries(stage.metrics).map(([key, value]) => (
                                            <div key={key} className="flex items-center space-x-2">
                                                <span className="text-gray-500">{key}:</span>
                                                <span className="font-semibold text-gray-900">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {index < processingStages.length - 1 && (
                                <div className="flex justify-center py-2">
                                    <span className="text-2xl text-gray-400">⬇️</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 보안 및 암호화 */}
            <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">보안 및 암호화</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">🔐</span>
                            <h4 className="font-semibold text-gray-900">전송 암호화</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            모든 데이터는 AES-256 + RSA-4096 이중 암호화
                        </p>
                        <div className="text-xs text-gray-500">
                            양자내성 암호 적용 (50년 안전성 보장)
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">👤</span>
                            <h4 className="font-semibold text-gray-900">접근 통제</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            생체인증 + OTP + IP 화이트리스트
                        </p>
                        <div className="text-xs text-gray-500">
                            요원별 권한 등급에 따른 차등 접근
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">📋</span>
                            <h4 className="font-semibold text-gray-900">감사 로그</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            모든 접근 기록 실시간 저장 (삭제 불가)
                        </p>
                        <div className="text-xs text-gray-500">
                            오픈해시 분산원장에 영구 보관
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">🛡️</span>
                            <h4 className="font-semibold text-gray-900">무결성 검증</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            실시간 해시 비교로 위변조 즉시 탐지
                        </p>
                        <div className="text-xs text-gray-500">
                            99.9999% 신뢰도 (Six Sigma 수준)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.NDRIntegration = NDRIntegration;
