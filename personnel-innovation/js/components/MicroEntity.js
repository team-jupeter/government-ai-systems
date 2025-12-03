const MicroEntity = () => {
    const [entities, setEntities] = React.useState([]);

    React.useEffect(() => {
        const entityData = [
            { type: '1인 법인', count: 2850000, avgSize: 1, growth: 12.5, aiRate: 85 },
            { type: '소기업 (5인 이하)', count: 3200000, avgSize: 3.2, growth: 5.8, aiRate: 62 },
            { type: '소기업 (6-10인)', count: 850000, avgSize: 7.5, growth: 3.2, aiRate: 58 },
            { type: '중소기업 (11-50인)', count: 420000, avgSize: 28, growth: 2.1, aiRate: 72 },
            { type: '중견기업 (51-300인)', count: 35000, avgSize: 125, growth: 1.5, aiRate: 78 },
            { type: '대기업 (300인 이상)', count: 4500, avgSize: 2800, growth: 0.8, aiRate: 88 }
        ];
        setEntities(entityData);
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    return (
        <div className="space-y-6">
            {/* 상단 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <p className="text-purple-200 text-sm">총 경제활동 단위</p>
                    <p className="text-3xl font-bold text-white mt-1">7.36M</p>
                    <p className="text-purple-200 text-xs mt-1">등록 사업체</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <p className="text-blue-200 text-sm">1인 법인 비율</p>
                    <p className="text-3xl font-bold text-white mt-1">38.7%</p>
                    <p className="text-blue-200 text-xs mt-1">전체 대비</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <p className="text-green-200 text-sm">평균 사업체 규모</p>
                    <p className="text-3xl font-bold text-white mt-1">4.1명</p>
                    <p className="text-green-200 text-xs mt-1">전국 평균</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <p className="text-yellow-200 text-sm">AI 도입률</p>
                    <p className="text-3xl font-bold text-white mt-1">68.5%</p>
                    <p className="text-yellow-200 text-xs mt-1">업무 자동화</p>
                </div>
            </div>

            {/* AI 시대 안내 */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-atom text-3xl text-indigo-400"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">최소 경제활동 단위로의 분할</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            AI 시대에 사무직 업무의 <span className="text-red-400 font-medium">90%가 AI로 대체</span>됩니다.
                            기존의 대규모 조직은 <span className="text-indigo-400 font-medium">최소 단위(1인 법인)</span>로 분할되며,
                            각 개인은 독립적인 경제 주체로서 AI의 지원을 받아 활동합니다.
                            이 시스템은 모든 경제활동 단위의 성과를 정확하게 측정합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 사업체 규모별 현황 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">경제활동 단위 규모별 현황</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-slate-700">
                                <th className="pb-3 text-slate-400 text-sm font-medium">유형</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium text-right">사업체 수</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium text-right">평균 규모</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium text-right">성장률</th>
                                <th className="pb-3 text-slate-400 text-sm font-medium text-right">AI 도입률</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entities.map((entity, index) => (
                                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            {entity.type === '1인 법인' && <i className="fas fa-user text-purple-400"></i>}
                                            {entity.type.includes('소기업') && <i className="fas fa-users text-blue-400"></i>}
                                            {entity.type.includes('중소기업') && <i className="fas fa-building text-green-400"></i>}
                                            {entity.type.includes('중견기업') && <i className="fas fa-city text-yellow-400"></i>}
                                            {entity.type.includes('대기업') && <i className="fas fa-landmark text-red-400"></i>}
                                            <span className="text-white">{entity.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right text-white font-medium">{formatNumber(entity.count)}</td>
                                    <td className="py-4 text-right text-slate-300">{entity.avgSize}명</td>
                                    <td className="py-4 text-right">
                                        <span className={entity.growth >= 5 ? 'text-green-400' : 'text-slate-400'}>
                                            +{entity.growth}%
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-16 bg-slate-700 rounded-full h-2">
                                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: entity.aiRate + '%' }}></div>
                                            </div>
                                            <span className="text-purple-400 text-sm">{entity.aiRate}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* L1 계층 설명 */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-400 font-bold">L1</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">최소 단위 계층 (Level 1)</h3>
                </div>
                <p className="text-slate-300 text-sm">
                    개별 경제활동 단위(사업체/1인 법인) 수준의 성과 측정 계층입니다.
                    가능한 최소 크기로 분할하여 각 개인의 기여도를 정확하게 산정하고, 
                    OpenHash 기반으로 모든 데이터의 무결성을 보장합니다.
                </p>
            </div>
        </div>
    );
};
