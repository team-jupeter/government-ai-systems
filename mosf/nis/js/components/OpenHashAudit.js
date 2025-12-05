const { useState } = React;
const { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

const OpenHashAudit = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('24h');
    
    const blockchainStats = {
        '24h': [
            { time: '00:00', blocks: 452, transactions: 1234 },
            { time: '04:00', blocks: 389, transactions: 1089 },
            { time: '08:00', blocks: 567, transactions: 1567 },
            { time: '12:00', blocks: 623, transactions: 1789 },
            { time: '16:00', blocks: 512, transactions: 1456 },
            { time: '20:00', blocks: 478, transactions: 1345 }
        ],
        '7d': [
            { day: '월', blocks: 4523, transactions: 12456 },
            { day: '화', blocks: 4789, transactions: 13234 },
            { day: '수', blocks: 4456, transactions: 12789 },
            { day: '목', blocks: 4890, transactions: 13456 },
            { day: '금', blocks: 4567, transactions: 12890 },
            { day: '토', blocks: 3234, transactions: 8923 },
            { day: '일', blocks: 2890, transactions: 7834 }
        ]
    };
    
    const securityEvents = [
        {
            timestamp: '2025-12-03 12:45:00',
            event: '정상 블록 생성',
            hash: '0x7f9c2a...4b8d',
            status: 'success',
            details: '365개 거래 포함, 검증 완료'
        },
        {
            timestamp: '2025-12-03 12:44:55',
            event: '합의 알고리즘 실행',
            hash: '0x8a3d1f...9c2e',
            status: 'success',
            details: '노드 간 합의 도달 (0.2초)'
        },
        {
            timestamp: '2025-12-03 12:44:50',
            event: '무결성 검증',
            hash: '0x5b7e4a...6f1c',
            status: 'success',
            details: '이전 블록과 해시 체인 확인'
        },
        {
            timestamp: '2025-12-03 12:44:45',
            event: '위변조 시도 탐지',
            hash: '0x9f2c8d...3a5b',
            status: 'blocked',
            details: '비정상 트랜잭션 자동 차단'
        },
        {
            timestamp: '2025-12-03 12:44:40',
            event: '정상 블록 생성',
            hash: '0x4e8a7c...2d9f',
            status: 'success',
            details: '412개 거래 포함, 검증 완료'
        }
    ];
    
    const comparisonData = [
        { tech: 'Bitcoin', tps: 7, energy: 100, cost: 100 },
        { tech: 'Ethereum', tps: 30, energy: 95, cost: 90 },
        { tech: 'Ripple', tps: 1500, energy: 50, cost: 40 },
        { tech: 'OpenHash', tps: 15000, energy: 1.5, cost: 2 }
    ];
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-green-900 to-green-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">오픈해시 감사 추적</h2>
                <p className="text-green-100 text-sm">
                    모든 정보활동은 위변조 불가능한 분산원장에 실시간으로 기록됩니다
                </p>
            </div>
            
            {/* 실시간 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="총 블록 수" 
                    value="2,847,392" 
                    subtitle="누적"
                    icon="⛓️" 
                    color="blue" 
                />
                <StatCard 
                    title="오늘 거래" 
                    value="12,456건" 
                    subtitle="평균 8.7건/분"
                    icon="📊" 
                    color="purple" 
                />
                <StatCard 
                    title="위변조 시도" 
                    value="0건" 
                    subtitle="전부 차단됨"
                    icon="🛡️" 
                    color="green" 
                />
                <StatCard 
                    title="에너지 절감" 
                    value="98.5%" 
                    subtitle="vs 기존 블록체인"
                    icon="⚡" 
                    color="orange" 
                />
            </div>
            
            {/* 블록 생성 추이 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">블록 생성 추이</h3>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setSelectedPeriod('24h')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === '24h' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            24시간
                        </button>
                        <button 
                            onClick={() => setSelectedPeriod('7d')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === '7d' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            7일
                        </button>
                    </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={blockchainStats[selectedPeriod]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={selectedPeriod === '24h' ? 'time' : 'day'} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="blocks" name="생성된 블록" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="transactions" name="거래 수" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            {/* 기술 비교 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">오픈해시 vs 기존 블록체인</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tech" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tps" name="TPS (처리속도)" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">처리 속도 (TPS)</div>
                        <div className="text-2xl font-bold text-blue-600">15,000</div>
                        <div className="text-xs text-gray-500 mt-1">Bitcoin 대비 2,142배</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">에너지 소비</div>
                        <div className="text-2xl font-bold text-green-600">98.5% ↓</div>
                        <div className="text-xs text-gray-500 mt-1">기존 블록체인 대비</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">운영 비용</div>
                        <div className="text-2xl font-bold text-purple-600">98% ↓</div>
                        <div className="text-xs text-gray-500 mt-1">기존 블록체인 대비</div>
                    </div>
                </div>
            </div>
            
            {/* 보안 이벤트 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 보안 이벤트</h3>
                <div className="space-y-3">
                    {securityEvents.map((event, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex-shrink-0">
                                {event.status === 'success' ? (
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold">✓</span>
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                        <span className="text-red-600 font-bold">⚠</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-gray-900">{event.event}</span>
                                    <span className="text-xs text-gray-500">{event.timestamp}</span>
                                </div>
                                <div className="text-sm text-gray-600 mb-1">{event.details}</div>
                                <div className="text-xs font-mono text-gray-400">해시: {event.hash}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 오픈해시 기술 설명 */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">오픈해시 핵심 기술</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">⚡</span>
                            <h4 className="font-semibold text-gray-900">고속 합의 알고리즘</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            PoW나 PoS 없이 노드 간 직접 합의로 
                            초당 15,000건 이상의 거래 처리 가능
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">🌱</span>
                            <h4 className="font-semibold text-gray-900">친환경 설계</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            채굴 과정이 없어 에너지 소비가 
                            기존 블록체인 대비 98.5% 절감
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">🔐</span>
                            <h4 className="font-semibold text-gray-900">양자내성 암호</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            SHA-3 + Lattice 기반 암호로 
                            양자컴퓨터 공격에도 안전 (50년 내구)
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">🛡️</span>
                            <h4 className="font-semibold text-gray-900">위변조 불가능</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                            모든 노드에 분산 저장되어 
                            단일 지점 공격으로는 조작 불가능
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 검증 상태 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">실시간 검증 상태</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                        <div className="text-sm text-gray-600">무결성 검증 성공률</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-4xl font-bold text-blue-600 mb-2">0.2초</div>
                        <div className="text-sm text-gray-600">평균 블록 생성 시간</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-4xl font-bold text-purple-600 mb-2">0건</div>
                        <div className="text-sm text-gray-600">위변조 성공 시도</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.OpenHashAudit = OpenHashAudit;
