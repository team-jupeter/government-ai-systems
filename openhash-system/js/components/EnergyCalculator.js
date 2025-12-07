const EnergyCalculator = () => {
    const [nodes, setNodes] = React.useState(100);
    const [tps, setTps] = React.useState(80);
    const [days, setDays] = React.useState(365);
    const [kwh_price, setKwhPrice] = React.useState(120); // KRW per kWh

    // 비트코인 기준값
    const BITCOIN_ENERGY_PER_TX = 1200; // kWh
    const BITCOIN_TPS = 7;
    
    // OpenHash 계산
    const openhash_total_tps = nodes * tps * 0.85; // 네트워크 효율 85%
    const openhash_energy_per_tx = 0.018; // kWh (66,667배 효율적)
    
    // 일일 트랜잭션 수
    const daily_transactions = openhash_total_tps * 86400; // 초당 TPS × 86,400초
    
    // 에너지 소비 (kWh)
    const openhash_daily_energy = daily_transactions * openhash_energy_per_tx;
    const bitcoin_daily_energy = daily_transactions * BITCOIN_ENERGY_PER_TX;
    
    // 총 에너지 (기간)
    const openhash_total_energy = openhash_daily_energy * days;
    const bitcoin_total_energy = bitcoin_daily_energy * days;
    
    // 에너지 절감
    const energy_saved = bitcoin_total_energy - openhash_total_energy;
    const energy_saved_percent = ((energy_saved / bitcoin_total_energy) * 100).toFixed(1);
    
    // 비용 (KRW)
    const openhash_cost = openhash_total_energy * kwh_price;
    const bitcoin_cost = bitcoin_total_energy * kwh_price;
    const cost_saved = bitcoin_cost - openhash_cost;
    
    // CO2 배출량 (kWh당 0.5kg CO2 기준)
    const openhash_co2 = openhash_total_energy * 0.5 / 1000; // 톤
    const bitcoin_co2 = bitcoin_total_energy * 0.5 / 1000; // 톤
    const co2_saved = bitcoin_co2 - openhash_co2;
    
    // 숫자 포맷팅 함수
    const formatNumber = (num) => {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + '조';
        if (num >= 1e8) return (num / 1e8).toFixed(2) + '억';
        if (num >= 1e4) return (num / 1e4).toFixed(2) + '만';
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    
    const formatKRW = (num) => {
        return formatNumber(num) + '원';
    };

    // 비율 계산
    const bitcoin_ratio = 100;
    const openhash_ratio = (openhash_total_energy / bitcoin_total_energy * 100).toFixed(1);

    return (
        <div className="bg-white">
            {/* 헤더 */}
            <div className="border-b-2 border-gray-800 pb-4 mb-6">
                <h4 className="text-xl font-bold text-gray-900">에너지 효율성 계산기</h4>
                <p className="text-sm text-gray-600 mt-2">블록체인 대비 OpenHash의 에너지 절감 효과를 확인하세요</p>
            </div>

            {/* 입력 컨트롤 */}
            <div className="mb-8">
                <h5 className="text-base font-bold text-gray-800 mb-4">입력 조건</h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-gray-50 border border-gray-300">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            노드 수
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100000"
                            value={nodes}
                            onChange={(e) => setNodes(parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-600 text-right"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            노드당 TPS
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="1000"
                            value={tps}
                            onChange={(e) => setTps(parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-600 text-right"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            기간 (일)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="3650"
                            value={days}
                            onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-600 text-right"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            전기요금 (원/kWh)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="1000"
                            value={kwh_price}
                            onChange={(e) => setKwhPrice(parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:border-blue-600 text-right"
                        />
                    </div>
                </div>
            </div>

            {/* 주요 지표 */}
            <div className="mb-8">
                <h5 className="text-base font-bold text-gray-800 mb-4">주요 절감 효과</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-300 p-5 bg-white">
                        <div className="text-sm text-gray-600 mb-3">전기요금 절감</div>
                        <div className="text-2xl font-bold text-blue-700 mb-2">{formatKRW(cost_saved)}</div>
                        <div className="text-xs text-gray-500">절감율 {energy_saved_percent}%</div>
                    </div>
                    <div className="border border-gray-300 p-5 bg-white">
                        <div className="text-sm text-gray-600 mb-3">에너지 절감</div>
                        <div className="text-2xl font-bold text-blue-700 mb-2">{formatNumber(energy_saved)} kWh</div>
                        <div className="text-xs text-gray-500">절감율 {energy_saved_percent}%</div>
                    </div>
                    <div className="border border-gray-300 p-5 bg-white">
                        <div className="text-sm text-gray-600 mb-3">CO₂ 배출 감축</div>
                        <div className="text-2xl font-bold text-blue-700 mb-2">{formatNumber(co2_saved)} 톤</div>
                        <div className="text-xs text-gray-500">감축율 {energy_saved_percent}%</div>
                    </div>
                </div>
            </div>

            {/* 비교 분석 */}
            <div className="mb-8">
                <h5 className="text-base font-bold text-gray-800 mb-4">비교 분석</h5>
                
                {/* 전기요금 비교 */}
                <div className="mb-6 border border-gray-300 p-5 bg-white">
                    <div className="text-sm font-medium text-gray-700 mb-4">1. 전기요금 비교</div>
                    
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Bitcoin</span>
                            <span className="text-sm font-medium text-gray-900">{formatKRW(bitcoin_cost)}</span>
                        </div>
                        <div className="w-full bg-gray-200 h-8">
                            <div 
                                className="bg-red-600 h-8 flex items-center justify-end pr-3"
                                style={{ width: '100%' }}
                            >
                                <span className="text-white text-xs font-medium">100%</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">OpenHash</span>
                            <span className="text-sm font-medium text-gray-900">{formatKRW(openhash_cost)}</span>
                        </div>
                        <div className="w-full bg-gray-200 h-8">
                            <div 
                                className="bg-blue-600 h-8 flex items-center justify-end pr-3"
                                style={{ width: openhash_ratio + '%' }}
                            >
                                <span className="text-white text-xs font-medium">{openhash_ratio}%</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-300">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">절감 금액</span>
                            <span className="text-lg font-bold text-blue-700">{formatKRW(cost_saved)}</span>
                        </div>
                    </div>
                </div>

                {/* 에너지 소비 비교 */}
                <div className="mb-6 border border-gray-300 p-5 bg-white">
                    <div className="text-sm font-medium text-gray-700 mb-4">2. 에너지 소비량 비교</div>
                    
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Bitcoin</span>
                            <span className="text-sm font-medium text-gray-900">{formatNumber(bitcoin_total_energy)} kWh</span>
                        </div>
                        <div className="w-full bg-gray-200 h-8">
                            <div 
                                className="bg-red-600 h-8 flex items-center justify-end pr-3"
                                style={{ width: '100%' }}
                            >
                                <span className="text-white text-xs font-medium">100%</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">OpenHash</span>
                            <span className="text-sm font-medium text-gray-900">{formatNumber(openhash_total_energy)} kWh</span>
                        </div>
                        <div className="w-full bg-gray-200 h-8">
                            <div 
                                className="bg-blue-600 h-8 flex items-center justify-end pr-3"
                                style={{ width: openhash_ratio + '%' }}
                            >
                                <span className="text-white text-xs font-medium">{openhash_ratio}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CO2 배출 비교 */}
                <div className="border border-gray-300 p-5 bg-white">
                    <div className="text-sm font-medium text-gray-700 mb-4">3. CO₂ 배출량 비교</div>
                    
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">Bitcoin</span>
                            <span className="text-sm font-medium text-gray-900">{formatNumber(bitcoin_co2)} 톤</span>
                        </div>
                        <div className="w-full bg-gray-200 h-8">
                            <div 
                                className="bg-red-600 h-8 flex items-center justify-end pr-3"
                                style={{ width: '100%' }}
                            >
                                <span className="text-white text-xs font-medium">100%</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-700">OpenHash</span>
                            <span className="text-sm font-medium text-gray-900">{formatNumber(openhash_co2)} 톤</span>
                        </div>
                        <div className="w-full bg-gray-200 h-8">
                            <div 
                                className="bg-blue-600 h-8 flex items-center justify-end pr-3"
                                style={{ width: openhash_ratio + '%' }}
                            >
                                <span className="text-white text-xs font-medium">{openhash_ratio}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상세 데이터 */}
            <div className="mb-6">
                <h5 className="text-base font-bold text-gray-800 mb-4">상세 데이터</h5>
                <div className="border border-gray-300">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">구분</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Bitcoin</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">OpenHash</th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">절감량</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr className="border-b border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-700">총 TPS</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{BITCOIN_TPS.toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{Math.round(openhash_total_tps).toLocaleString()}</td>
                                <td className="px-4 py-3 text-sm text-right text-blue-700 font-mono">
                                    +{((openhash_total_tps / BITCOIN_TPS - 1) * 100).toFixed(1)}%
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-700">일일 트랜잭션</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatNumber(daily_transactions)}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatNumber(daily_transactions)}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-500">동일</td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-blue-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">전기요금 (원)</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatKRW(bitcoin_cost)}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatKRW(openhash_cost)}</td>
                                <td className="px-4 py-3 text-sm text-right text-blue-700 font-mono font-medium">{formatKRW(cost_saved)}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-700">에너지 소비 (kWh)</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatNumber(bitcoin_total_energy)}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatNumber(openhash_total_energy)}</td>
                                <td className="px-4 py-3 text-sm text-right text-blue-700 font-mono">{formatNumber(energy_saved)}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="px-4 py-3 text-sm text-gray-700">CO₂ 배출 (톤)</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatNumber(bitcoin_co2)}</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-900 font-mono">{formatNumber(openhash_co2)}</td>
                                <td className="px-4 py-3 text-sm text-right text-blue-700 font-mono">{formatNumber(co2_saved)}</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">절감율</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-500">-</td>
                                <td className="px-4 py-3 text-sm text-right text-gray-500">-</td>
                                <td className="px-4 py-3 text-sm text-right font-bold text-blue-700">{energy_saved_percent}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 참고 사항 */}
            <div className="border-t border-gray-300 pt-4">
                <div className="text-xs text-gray-600">
                    <div className="font-medium mb-2">계산 기준</div>
                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                        <li>Bitcoin: 트랜잭션당 1,200 kWh</li>
                        <li>OpenHash: 트랜잭션당 0.018 kWh (66,667배 효율)</li>
                        <li>네트워크 효율: 85%</li>
                        <li>CO₂ 배출 계수: kWh당 0.5kg (한국 평균)</li>
                        <li>전기요금: 사용자 설정값 적용 (기본 120원/kWh)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
