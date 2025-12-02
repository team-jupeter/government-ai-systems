function Tab10Comparison() {
    const comparisonData = [
        {
            metric: 'TPS (초당 트랜잭션)',
            bitcoin: '7',
            ethereum: '15',
            solana: '65,000',
            pdv: '25,907+',
            winner: 'pdv'
        },
        {
            metric: '에너지 (kWh/트랜잭션)',
            bitcoin: '707',
            ethereum: '62.56',
            solana: '0.00051',
            pdv: '0.000008',
            winner: 'pdv'
        },
        {
            metric: '트랜잭션 확인 시간',
            bitcoin: '60분',
            ethereum: '6분',
            solana: '0.4초',
            pdv: '0.05초',
            winner: 'pdv'
        },
        {
            metric: '합의 메커니즘',
            bitcoin: 'PoW',
            ethereum: 'PoS',
            solana: 'PoH+PoS',
            pdv: 'LPBFT/PBFT',
            winner: 'pdv'
        },
        {
            metric: '양자 내성',
            bitcoin: '✗',
            ethereum: '✗',
            solana: '✗',
            pdv: '✓ (CRYSTALS)',
            winner: 'pdv'
        },
        {
            metric: '프라이버시',
            bitcoin: '낮음 (공개)',
            ethereum: '낮음 (공개)',
            solana: '낮음 (공개)',
            pdv: '완벽 (해시만)',
            winner: 'pdv'
        },
        {
            metric: '저장 효율',
            bitcoin: '낮음',
            ethereum: '낮음',
            solana: '중간',
            pdv: '높음 (32B)',
            winner: 'pdv'
        },
        {
            metric: '확장성',
            bitcoin: '제한적',
            ethereum: '제한적',
            solana: '샤딩',
            pdv: '선형 확장',
            winner: 'pdv'
        }
    ];

    return (
        <div className="space-y-8">
            {/* 개요 */}
            <div className="bg-blue-50 border-l-4 border-gov-blue p-6">
                <h3 className="text-base font-bold text-gov-blue mb-4">
                    <i className="fas fa-balance-scale mr-2"></i>
                    블록체인 vs 오픈해시 PDV 비교
                </h3>
                <p className="text-gov-text">
                    오픈해시 기반 PDV 시스템과 주요 블록체인(Bitcoin, Ethereum, Solana)의 성능 및 특징을 비교합니다.
                </p>
            </div>

            {/* 비교 테이블 */}
            <div className="bg-white border-2 border-gov-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gov-blue text-white">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold">측정 항목</th>
                                <th className="px-4 py-3 text-center font-bold">Bitcoin</th>
                                <th className="px-4 py-3 text-center font-bold">Ethereum</th>
                                <th className="px-4 py-3 text-center font-bold">Solana</th>
                                <th className="px-4 py-3 text-center font-bold bg-green-600">오픈해시 PDV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3 font-semibold">{row.metric}</td>
                                    <td className={`px-4 py-3 text-center ${row.winner === 'bitcoin' ? 'bg-yellow-50 font-bold' : ''}`}>
                                        {row.bitcoin}
                                    </td>
                                    <td className={`px-4 py-3 text-center ${row.winner === 'ethereum' ? 'bg-yellow-50 font-bold' : ''}`}>
                                        {row.ethereum}
                                    </td>
                                    <td className={`px-4 py-3 text-center ${row.winner === 'solana' ? 'bg-yellow-50 font-bold' : ''}`}>
                                        {row.solana}
                                    </td>
                                    <td className={`px-4 py-3 text-center ${row.winner === 'pdv' ? 'bg-green-50 font-bold text-green-700' : ''}`}>
                                        {row.pdv}
                                        {row.winner === 'pdv' && <i className="fas fa-crown text-yellow-500 ml-2"></i>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 주요 차별점 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
                    <h4 className="text-base font-bold text-red-700 mb-4">
                        <i className="fas fa-times-circle mr-2"></i>
                        블록체인의 한계
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>❌ <span className="font-bold">프라이버시 부족</span>: 모든 거래 공개</li>
                        <li>❌ <span className="font-bold">낮은 TPS</span>: 7~65,000 TPS</li>
                        <li>❌ <span className="font-bold">높은 에너지</span>: 707 kWh/트랜잭션</li>
                        <li>❌ <span className="font-bold">느린 확인</span>: 0.4초~60분</li>
                        <li>❌ <span className="font-bold">양자 취약</span>: 미래 보안 위협</li>
                        <li>❌ <span className="font-bold">제한적 확장</span>: 샤딩 복잡도</li>
                    </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                    <h4 className="text-base font-bold text-green-700 mb-4">
                        <i className="fas fa-check-circle mr-2"></i>
                        오픈해시 PDV의 강점
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>✅ <span className="font-bold">완벽한 프라이버시</span>: 해시만 저장</li>
                        <li>✅ <span className="font-bold">초고속 TPS</span>: 25,907+ TPS</li>
                        <li>✅ <span className="font-bold">극소 에너지</span>: 0.000008 kWh</li>
                        <li>✅ <span className="font-bold">실시간 확인</span>: 0.05초</li>
                        <li>✅ <span className="font-bold">양자 내성</span>: CRYSTALS-Dilithium</li>
                        <li>✅ <span className="font-bold">선형 확장</span>: 노드 수에 비례</li>
                    </ul>
                </div>
            </div>

            {/* 성능 비교 차트 */}
            <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-purple-700 mb-4">
                    <i className="fas fa-chart-bar mr-2"></i>
                    성능 비교 (배수)
                </h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Bitcoin 대비 TPS</span>
                            <span className="font-bold">3,701배</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                            <div className="bg-green-600 h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold" style={{width: '100%'}}>
                                3,701x
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Ethereum 대비 TPS</span>
                            <span className="font-bold">1,727배</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                            <div className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold" style={{width: '95%'}}>
                                1,727x
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>에너지 효율 (Bitcoin 대비)</span>
                            <span className="font-bold">88,375배 효율</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                            <div className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold" style={{width: '100%'}}>
                                88,375x
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 차별화 요소 */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                <h4 className="text-base font-bold text-yellow-700 mb-4">
                    <i className="fas fa-star mr-2"></i>
                    핵심 차별화 요소
                </h4>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-bold text-gov-blue mb-2">1. 개인정보 주권 완전 보장</div>
                        <p className="text-sm text-gray-700">
                            블록체인: 모든 데이터 공개 (프라이버시 침해)<br/>
                            <span className="font-bold text-green-600">PDV: 원본은 단말기만, 해시만 클라우드 (완벽한 보호)</span>
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-bold text-gov-blue mb-2">2. 에너지 효율성</div>
                        <p className="text-sm text-gray-700">
                            블록체인: PoW/PoS 등 에너지 집약적<br/>
                            <span className="font-bold text-green-600">PDV: 98.5% 에너지 절감 (121 TWh → 1.8 TWh)</span>
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-bold text-gov-blue mb-2">3. 확장성</div>
                        <p className="text-sm text-gray-700">
                            블록체인: 샤딩, 레이어2 등 복잡한 구조<br/>
                            <span className="font-bold text-green-600">PDV: 노드 증가에 비례한 선형 확장</span>
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                        <div className="font-bold text-gov-blue mb-2">4. 양자 컴퓨팅 대비</div>
                        <p className="text-sm text-gray-700">
                            블록체인: 양자 컴퓨터에 취약<br/>
                            <span className="font-bold text-green-600">PDV: CRYSTALS-Dilithium 포스트퀀텀 암호화</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
