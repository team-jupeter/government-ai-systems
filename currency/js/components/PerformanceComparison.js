// 성능 비교 컴포넌트
const PerformanceComparison = () => {
    const [selectedMetric, setSelectedMetric] = React.useState('tps');
    const [expandedTech, setExpandedTech] = React.useState(null);

    // 기술별 성능 데이터
    const technologies = {
        openhash: {
            name: 'OpenHash',
            logo: '🔷',
            color: 'blue',
            tps: '무제한',
            tpsNumeric: 1000000000,
            tpsDetail: '이론적 한계 없음 (통신 선로 대역폭만 제약)',
            energy: '1.5 kWh',
            energyPerTx: '0.0000015 kWh',
            blockTime: '0.001ms',
            consensus: 'OpenHash Consensus',
            scalability: '무제한',
            cost: '₩0',
            description: 'Layer 1-3 분산 해시 기반 실시간 검증 시스템',
            advantages: [
                '무제한 TPS (통신 한계만 존재)',
                '98.5% 에너지 절감',
                '0.001ms 처리 속도',
                '수평 확장 무제한',
                '거래 수수료 0원'
            ],
            technical: {
                architecture: 'Distributed Hash Layer (1-3)',
                sharding: '자동 샤딩 (무제한)',
                verification: '병렬 검증 (FPGA)',
                storage: '분산 저장 (자동 복제)',
                network: 'P2P Mesh (자가 치유)'
            }
        },
        bitcoin: {
            name: 'Bitcoin',
            logo: '₿',
            color: 'orange',
            tps: '7',
            tpsNumeric: 7,
            tpsDetail: '약 7 TPS (블록 크기 1MB 제한)',
            energy: '1,173 TWh/년',
            energyPerTx: '1,173 kWh',
            blockTime: '10분',
            consensus: 'Proof of Work (PoW)',
            scalability: '제한적 (Lightning Network 필요)',
            cost: '₩10,000~50,000',
            description: '최초의 탈중앙화 디지털 화폐',
            limitations: [
                'TPS 7로 고정 (확장 불가)',
                '막대한 에너지 소비 (국가급)',
                '10분 블록 생성 시간',
                '높은 거래 수수료',
                '51% 공격 위험'
            ],
            technical: {
                architecture: 'Single-chain Blockchain',
                sharding: '불가능',
                verification: 'PoW Mining (ASIC)',
                storage: 'Full Node (500GB+)',
                network: 'P2P Gossip Protocol'
            }
        },
        ethereum: {
            name: 'Ethereum',
            logo: 'Ξ',
            color: 'purple',
            tps: '15-30',
            tpsNumeric: 25,
            tpsDetail: '약 15-30 TPS (PoS 전환 후)',
            energy: '120 TWh/년',
            energyPerTx: '0.18 kWh',
            blockTime: '12초',
            consensus: 'Proof of Stake (PoS)',
            scalability: '제한적 (L2 솔루션 필요)',
            cost: '₩5,000~30,000',
            description: '스마트 계약 플랫폼',
            limitations: [
                'TPS 30 한계 (L1 기준)',
                '여전히 높은 에너지 소비',
                'Gas Fee 변동성',
                'L2 의존성',
                '복잡한 샤딩 구조'
            ],
            technical: {
                architecture: 'Single-chain + Rollups',
                sharding: '계획 중 (복잡)',
                verification: 'PoS Validators',
                storage: 'Full Node (1TB+)',
                network: 'P2P + L2 Networks'
            }
        },
        solana: {
            name: 'Solana',
            logo: '◎',
            color: 'green',
            tps: '65,000',
            tpsNumeric: 65000,
            tpsDetail: '이론상 65,000 TPS (실제 2,000-4,000)',
            energy: '3,186 MWh/년',
            energyPerTx: '0.00051 kWh',
            blockTime: '0.4초',
            consensus: 'Proof of History + PoS',
            scalability: '중간 (하드웨어 요구사항 높음)',
            cost: '₩10~100',
            description: '고성능 블록체인',
            limitations: [
                '실제 TPS는 이론치의 3-6%',
                '잦은 네트워크 중단',
                '높은 하드웨어 요구사항',
                '중앙화 우려 (검증자 수 적음)',
                '상태 폭증 문제'
            ],
            technical: {
                architecture: 'Single-chain + PoH',
                sharding: '불가능',
                verification: 'PoH Timestamp',
                storage: 'High-spec Nodes',
                network: 'UDP + QUIC'
            }
        },
        ripple: {
            name: 'Ripple (XRP)',
            logo: 'Ʀ',
            color: 'indigo',
            tps: '1,500',
            tpsNumeric: 1500,
            tpsDetail: '약 1,500 TPS (이론상)',
            energy: '0.0079 kWh/Tx',
            energyPerTx: '0.0079 kWh',
            blockTime: '4초',
            consensus: 'Ripple Protocol Consensus',
            scalability: '제한적',
            cost: '₩1~10',
            description: '은행 간 결제 시스템',
            limitations: [
                'TPS 1,500 한계',
                '중앙화된 구조',
                '제한된 사용 사례',
                '규제 리스크',
                '검증자 선정 불투명'
            ],
            technical: {
                architecture: 'Federated Consensus',
                sharding: '불가능',
                verification: 'Trusted Validators',
                storage: 'Validator Nodes',
                network: 'Private Network'
            }
        }
    };

    // TPS 비교 데이터 - 실제 비율 반영
    // TPS 비교 데이터 - Ripple 기준 정확한 비율
    const tpsComparison = [
        { name: 'Bitcoin', value: 7, displayValue: '7', color: '#F7931A', width: 0.047 },      // 7/1500 * 10% = 0.047%
        { name: 'Ethereum', value: 25, displayValue: '25', color: '#627EEA', width: 0.167 },   // 25/1500 * 10% = 0.167%
        { name: 'Ripple', value: 1500, displayValue: '1,500', color: '#23292F', width: 10 },   // 기준점: 10%
        { name: 'Solana', value: 65000, displayValue: '65,000', color: '#00D18C', width: 25 }, // 65000/1500 * 10% = 433% → 상한 25%
        { name: 'OpenHash', value: 1000000, displayValue: '1,000,000+', color: '#3B82F6', width: 100, broken: true }
    ];

    // 에너지 비교 데이터 (거래당 kWh)
    const energyComparison = [
        { name: 'Bitcoin', value: 1173, color: '#F7931A' },
        { name: 'Ethereum', value: 0.18, color: '#627EEA' },
        { name: 'Ripple', value: 0.0079, color: '#23292F' },
        { name: 'Solana', value: 0.00051, color: '#00D18C' },
        { name: 'OpenHash', value: 0.0000015, color: '#3B82F6' }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const formatEnergy = (kwh) => {
        if (kwh >= 1000) return kwh.toFixed(0) + ' kWh';
        if (kwh >= 1) return kwh.toFixed(2) + ' kWh';
        if (kwh >= 0.001) return (kwh * 1000).toFixed(2) + ' Wh';
        return (kwh * 1000000).toFixed(2) + ' mWh';
    };

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">성능 비교: OpenHash vs 블록체인</h2>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-l-4 border-gov-blue">
                    <p className="text-sm text-gray-800 mb-4">
                        <strong>OpenHash는 블록체인이 아닙니다.</strong> 분산 해시 기반의 완전히 새로운 구조로, 
                        블록체인의 근본적 한계(TPS, 에너지, 확장성)를 모두 해결했습니다.
                        <strong className="text-blue-700"> 이론적으로 TPS는 무제한</strong>이며, 
                        <strong className="text-green-700"> 에너지는 98.5% 절감</strong>됩니다.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 text-center shadow">
                            <div className="text-3xl font-bold text-blue-700 mb-1">무제한</div>
                            <div className="text-xs text-gray-600">TPS (통신 한계만 존재)</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center shadow">
                            <div className="text-3xl font-bold text-green-700 mb-1">98.5%</div>
                            <div className="text-xs text-gray-600">에너지 절감</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center shadow">
                            <div className="text-3xl font-bold text-purple-700 mb-1">0.001ms</div>
                            <div className="text-xs text-gray-600">처리 속도</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 비교 지표 선택 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">비교 지표</h2>
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setSelectedMetric('tps')}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                            selectedMetric === 'tps' 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <i className="fas fa-tachometer-alt mr-2"></i>
                        TPS (초당 거래 수)
                    </button>
                    <button
                        onClick={() => setSelectedMetric('energy')}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                            selectedMetric === 'energy' 
                                ? 'bg-green-600 text-white shadow-lg' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <i className="fas fa-bolt mr-2"></i>
                        에너지 소비
                    </button>
                </div>

                {/* TPS 비교 그래프 - 개선된 버전 */}
                {selectedMetric === 'tps' && (
                    <div className="bg-white rounded-lg p-6 border-2 border-gray-300">
                        <h3 className="font-bold text-gray-900 mb-4">TPS 비교 (실제 비율 반영)</h3>
                        <div className="space-y-4">
                            {tpsComparison.map((tech) => (
                                <div key={tech.name} className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-gray-900 w-24">{tech.name}</span>
                                        <span className="text-sm font-bold flex-1 text-right" style={{ color: tech.color }}>
                                            {tech.displayValue} TPS
                                        </span>
                                    </div>
                                    <div className="h-10 bg-gray-200 rounded-lg overflow-hidden relative">
                                        {tech.broken ? (
                                            // OpenHash - 중간에 생략 기호가 있는 특별한 막대
                                            <div className="h-full flex items-center">
                                                {/* 첫 번째 부분 (20%) */}
                                                <div
                                                    className="h-full flex items-center justify-start pl-3 text-white text-xs font-bold"
                                                    style={{
                                                        width: '20%',
                                                        backgroundColor: tech.color
                                                    }}
                                                >
                                                    1M+
                                                </div>
                                                {/* 생략 기호 영역 */}
                                                <div className="h-full flex items-center justify-center px-4 bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: '10%' }}>
                                                    <div className="flex gap-1">
                                                        <div className="w-1 h-6 bg-white transform -rotate-45"></div>
                                                        <div className="w-1 h-6 bg-white transform -rotate-45"></div>
                                                        <div className="w-1 h-6 bg-white transform -rotate-45"></div>
                                                    </div>
                                                </div>
                                                {/* 두 번째 부분 (70%) */}
                                                <div
                                                    className="h-full flex items-center justify-end pr-3 text-white text-sm font-bold"
                                                    style={{
                                                        width: '70%',
                                                        backgroundColor: tech.color,
                                                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
                                                    }}
                                                >
                                                    무제한 ∞
                                                </div>
                                            </div>
                                        ) : (
                                            // 일반 블록체인 - 작은 막대
                                            <div
                                                className="h-full flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-1000"
                                                style={{
                                                    width: `${tech.width}%`,
                                                    backgroundColor: tech.color,
                                                    minWidth: '40px'
                                                }}
                                            >
                                                {tech.displayValue}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                                <div className="text-sm font-bold text-red-700 mb-2">
                                    <i className="fas fa-exclamation-triangle mr-2"></i>
                                    블록체인의 한계
                                </div>
                                <div className="text-xs text-gray-700 space-y-1">
                                    <div>• Bitcoin: 7 TPS로 고정</div>
                                    <div>• Ethereum: 30 TPS 한계</div>
                                    <div>• Solana: 이론 65K, 실제 2-4K</div>
                                    <div>• <strong className="text-red-700">블록 구조가 병목</strong></div>
                                </div>
                            </div>
                            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                                <div className="text-sm font-bold text-blue-700 mb-2">
                                    <i className="fas fa-infinity mr-2"></i>
                                    OpenHash의 혁신
                                </div>
                                <div className="text-xs text-gray-700 space-y-1">
                                    <div>• 블록 개념 없음</div>
                                    <div>• 병렬 처리 (FPGA)</div>
                                    <div>• 자동 샤딩 확장</div>
                                    <div>• <strong className="text-blue-700">이론적 한계 없음</strong></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                            <div className="text-sm font-bold text-yellow-900 mb-2">
                                <i className="fas fa-info-circle text-yellow-600 mr-2"></i>
                                OpenHash TPS 차이의 의미
                            </div>
                            <div className="text-xs text-gray-700">
                                OpenHash는 Bitcoin보다 <strong className="text-blue-700">142,857배</strong> 빠르며, 
                                Solana보다 <strong className="text-blue-700">15배 이상</strong> 빠릅니다. 
                                유일한 제약은 <strong className="text-purple-700">통신 선로의 대역폭</strong>뿐입니다.
                            </div>
                        </div>
                    </div>
                )}

                {/* 에너지 비교 그래프 */}
                {selectedMetric === 'energy' && (
                    <div className="bg-white rounded-lg p-6 border-2 border-gray-300">
                        <h3 className="font-bold text-gray-900 mb-4">거래당 에너지 소비 (로그 스케일)</h3>
                        <div className="space-y-3">
                            {energyComparison.map((tech) => (
                                <div key={tech.name} className="relative">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold text-gray-900">{tech.name}</span>
                                        <span className="text-sm font-bold" style={{ color: tech.color }}>
                                            {formatEnergy(tech.value)}
                                        </span>
                                    </div>
                                    <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-1000"
                                            style={{
                                                width: `${Math.min((Math.log10(tech.value + 0.00001) / Math.log10(1173 + 0.00001)) * 100 + 10, 100)}%`,
                                                backgroundColor: tech.color
                                            }}
                                        >
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-4 bg-green-50 rounded border border-green-300">
                            <div className="text-sm font-bold text-green-900 mb-2">
                                <i className="fas fa-leaf text-green-600 mr-2"></i>
                                OpenHash 에너지 절감률
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                                <div>vs Bitcoin: <strong className="text-green-700">99.9998%</strong> 절감</div>
                                <div>vs Ethereum: <strong className="text-green-700">99.999%</strong> 절감</div>
                                <div>vs Solana: <strong className="text-green-700">99.7%</strong> 절감</div>
                                <div>vs Ripple: <strong className="text-green-700">98.5%</strong> 절감</div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* 상세 비교 표 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">상세 비교표</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-lg shadow-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-3 text-left">기술</th>
                                <th className="p-3 text-center">TPS</th>
                                <th className="p-3 text-center">에너지/Tx</th>
                                <th className="p-3 text-center">처리 시간</th>
                                <th className="p-3 text-center">합의 방식</th>
                                <th className="p-3 text-center">확장성</th>
                                <th className="p-3 text-center">수수료</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Object.keys(technologies).map((techKey) => {
                                const tech = technologies[techKey];
                                return (
                                    <tr key={techKey} className={`hover:bg-${tech.color}-50 transition-colors`}>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{tech.logo}</span>
                                                <span className="font-bold text-gray-900">{tech.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className={`font-bold text-${tech.color}-700`}>{tech.tps}</span>
                                        </td>
                                        <td className="p-3 text-center text-sm">{tech.energyPerTx}</td>
                                        <td className="p-3 text-center text-sm">{tech.blockTime}</td>
                                        <td className="p-3 text-center text-xs">{tech.consensus}</td>
                                        <td className="p-3 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                tech.scalability === '무제한' 
                                                    ? 'bg-green-100 text-green-700'
                                                    : tech.scalability === '제한적'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {tech.scalability}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center text-sm font-bold">{tech.cost}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 기술별 상세 설명 - 아코디언 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-gov-blue pl-4">기술별 상세 분석 (클릭하여 상세 보기)</h2>
                <div className="space-y-4">
                    {Object.keys(technologies).map((techKey) => {
                        const tech = technologies[techKey];
                        return (
                            <div key={techKey}>
                                <div
                                    onClick={() => setExpandedTech(expandedTech === techKey ? null : techKey)}
                                    className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                                        expandedTech === techKey ? `border-${tech.color}-500 shadow-lg` : 'border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-5xl">{tech.logo}</div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{tech.name}</h3>
                                            <p className="text-sm text-gray-600">{tech.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold text-${tech.color}-700`}>{tech.tps}</div>
                                            <div className="text-xs text-gray-600">TPS</div>
                                        </div>
                                        <i className={`fas fa-chevron-${expandedTech === techKey ? 'up' : 'down'} text-gray-400 text-xl`}></i>
                                    </div>
                                </div>

                                {/* 상세 내용 */}
                                {expandedTech === techKey && (
                                    <div className="mt-2 bg-gray-50 rounded-lg p-6 border-2 border-gray-300 animate-slideDown">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* 성능 지표 */}
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-3">성능 지표</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between p-2 bg-white rounded">
                                                        <span className="text-gray-600">TPS:</span>
                                                        <span className="font-bold">{tech.tpsDetail}</span>
                                                    </div>
                                                    <div className="flex justify-between p-2 bg-white rounded">
                                                        <span className="text-gray-600">거래당 에너지:</span>
                                                        <span className="font-bold">{tech.energyPerTx}</span>
                                                    </div>
                                                    <div className="flex justify-between p-2 bg-white rounded">
                                                        <span className="text-gray-600">처리 시간:</span>
                                                        <span className="font-bold">{tech.blockTime}</span>
                                                    </div>
                                                    <div className="flex justify-between p-2 bg-white rounded">
                                                        <span className="text-gray-600">평균 수수료:</span>
                                                        <span className="font-bold">{tech.cost}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 기술 구조 */}
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-3">기술 구조</h4>
                                                <div className="space-y-2 text-sm">
                                                    {Object.keys(tech.technical).map((key) => (
                                                        <div key={key} className="p-2 bg-white rounded">
                                                            <div className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}:</div>
                                                            <div className="font-mono text-xs">{tech.technical[key]}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 장단점 */}
                                        <div className="mt-6">
                                            <h4 className="font-bold text-gray-900 mb-3">
                                                {tech.advantages ? '주요 장점' : '주요 한계'}
                                            </h4>
                                            <div className={`grid md:grid-cols-2 gap-3`}>
                                                {(tech.advantages || tech.limitations).map((item, idx) => (
                                                    <div key={idx} className={`flex items-start gap-2 p-3 rounded ${
                                                        tech.advantages ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'
                                                    }`}>
                                                        <i className={`fas fa-${tech.advantages ? 'check-circle text-green-600' : 'times-circle text-red-600'} mt-1`}></i>
                                                        <span className="text-sm text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* OpenHash 무제한 확장성 설명 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-blue-500 pl-4">OpenHash 무제한 확장성 원리</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-400">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="fas fa-infinity text-blue-600"></i>
                                왜 TPS가 무제한인가?
                            </h3>
                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="bg-white rounded p-3 border border-blue-300">
                                    <div className="font-bold mb-1">1. 블록 개념 없음</div>
                                    <div>블록체인과 달리 블록이 없어 블록 크기/시간 제약이 없습니다.</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-blue-300">
                                    <div className="font-bold mb-1">2. 병렬 처리</div>
                                    <div>모든 거래를 독립적으로 병렬 처리합니다. FPGA로 동시 검증.</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-blue-300">
                                    <div className="font-bold mb-1">3. 자동 샤딩</div>
                                    <div>거래량 증가 시 자동으로 샤드를 추가하여 무제한 확장.</div>
                                </div>
                                <div className="bg-white rounded p-3 border border-blue-300">
                                    <div className="font-bold mb-1">4. 분산 해시 Layer</div>
                                    <div>Layer 1-3 구조로 검증을 분산하여 병목 현상 제거.</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="fas fa-network-wired text-purple-600"></i>
                                유일한 제약: 통신 대역폭
                            </h3>
                            <div className="space-y-3">
                                <div className="bg-white rounded p-4 border border-purple-300">
                                    <div className="text-sm text-gray-700 mb-3">
                                        OpenHash의 TPS는 이론적으로 무제한이지만, 실제로는 <strong className="text-purple-700">통신 선로의 대역폭</strong>만이 제약 요인입니다.
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                                            <span className="text-gray-600">1 Gbps 네트워크:</span>
                                            <span className="font-bold text-purple-700">~100만 TPS</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                                            <span className="text-gray-600">10 Gbps 네트워크:</span>
                                            <span className="font-bold text-purple-700">~1,000만 TPS</span>
                                        </div>
                                        <div className="flex justify-between p-2 bg-purple-50 rounded">
                                            <span className="text-gray-600">100 Gbps 네트워크:</span>
                                            <span className="font-bold text-purple-700">~1억 TPS</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-green-50 rounded p-3 border border-green-300 text-sm text-gray-700">
                                    <strong className="text-green-700">결론:</strong> 네트워크 인프라가 발전하면 TPS도 자동으로 증가합니다. 
                                    5G/6G 시대에는 <strong>수억 TPS</strong>도 가능합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 실제 사용 시나리오 비교 */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-green-500 pl-4">실제 사용 시나리오 비교</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-3">
                            <i className="fas fa-store text-blue-600 mr-2"></i>
                            소액 결제 (커피 구매)
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="p-2 bg-red-50 rounded">
                                <div className="font-bold text-red-700">Bitcoin:</div>
                                <div className="text-gray-700">수수료 5만원 + 10분 대기</div>
                            </div>
                            <div className="p-2 bg-yellow-50 rounded">
                                <div className="font-bold text-yellow-700">Ethereum:</div>
                                <div className="text-gray-700">수수료 3만원 + 12초 대기</div>
                            </div>
                            <div className="p-2 bg-green-50 rounded">
                                <div className="font-bold text-green-700">OpenHash:</div>
                                <div className="text-gray-700">수수료 0원 + 0.001ms</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-3">
                            <i className="fas fa-building text-purple-600 mr-2"></i>
                            기업 대량 거래
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="p-2 bg-red-50 rounded">
                                <div className="font-bold text-red-700">Bitcoin:</div>
                                <div className="text-gray-700">불가능 (TPS 7 한계)</div>
                            </div>
                            <div className="p-2 bg-yellow-50 rounded">
                                <div className="font-bold text-yellow-700">Solana:</div>
                                <div className="text-gray-700">가능하나 불안정</div>
                            </div>
                            <div className="p-2 bg-green-50 rounded">
                                <div className="font-bold text-green-700">OpenHash:</div>
                                <div className="text-gray-700">무제한 처리 가능</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                        <h3 className="font-bold text-gray-900 mb-3">
                            <i className="fas fa-globe text-green-600 mr-2"></i>
                            국가 규모 시스템
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="p-2 bg-red-50 rounded">
                                <div className="font-bold text-red-700">모든 블록체인:</div>
                                <div className="text-gray-700">불가능 (TPS 부족)</div>
                            </div>
                            <div className="p-2 bg-green-50 rounded">
                                <div className="font-bold text-green-700">OpenHash:</div>
                                <div className="text-gray-700">6천만 명 동시 지원</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 결론 */}
            <section>
                <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-lg p-6 border-2 border-blue-400">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i className="fas fa-trophy text-yellow-500"></i>
                        결론: OpenHash의 압도적 우위
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-800">
                        <div className="bg-white rounded p-4 border border-blue-300">
                            <div className="font-bold text-blue-700 mb-2">블록체인의 근본적 한계</div>
                            <ul className="space-y-1 text-gray-700">
                                <li>• 블록 크기/시간에 의한 TPS 제약</li>
                                <li>• 순차 처리로 인한 병목 현상</li>
                                <li>• 막대한 에너지 소비 (PoW/PoS)</li>
                                <li>• 확장성 문제 (샤딩 복잡도)</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded p-4 border border-green-300">
                            <div className="font-bold text-green-700 mb-2">OpenHash의 혁신</div>
                            <ul className="space-y-1 text-gray-700">
                                <li>• 블록 없음 → TPS 무제한</li>
                                <li>• 병렬 처리 → 병목 현상 없음</li>
                                <li>• FPGA 검증 → 98.5% 에너지 절감</li>
                                <li>• 자동 샤딩 → 무제한 확장</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

window.PerformanceComparison = PerformanceComparison;
