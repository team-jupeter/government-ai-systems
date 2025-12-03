const GlobalComparison = () => {
    const [caseType, setCaseType] = React.useState('');
    const [comparison, setComparison] = React.useState(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    const caseTypes = [
        { id: 'product', name: '제조물책임', icon: '🏭', desc: '제품 결함으로 인한 피해' },
        { id: 'medical', name: '의료과실', icon: '🏥', desc: '의료사고 손해배상' },
        { id: 'labor', name: '부당해고', icon: '👷', desc: '근로관계 분쟁' },
        { id: 'rental', name: '임대차분쟁', icon: '🏠', desc: '보증금, 임대료 분쟁' },
        { id: 'ip', name: '지식재산권', icon: '💡', desc: '특허, 저작권 침해' },
        { id: 'defamation', name: '명예훼손', icon: '📢', desc: '언론, 인터넷 명예훼손' }
    ];

    const analyzeComparison = () => {
        if (!caseType) {
            alert('사건 유형을 선택해주세요.');
            return;
        }
        
        setIsAnalyzing(true);
        setTimeout(() => {
            setComparison({
                caseType: caseType,
                avgDamages: {
                    korea: { amount: 35000000, currency: '₩', rank: 8 },
                    usa: { amount: 2500000, currency: '$', rank: 1 },
                    uk: { amount: 850000, currency: '£', rank: 2 },
                    germany: { amount: 420000, currency: '€', rank: 3 },
                    canada: { amount: 680000, currency: 'C$', rank: 4 },
                    australia: { amount: 520000, currency: 'A$', rank: 5 },
                    france: { amount: 380000, currency: '€', rank: 6 },
                    japan: { amount: 28000000, currency: '¥', rank: 7 }
                },
                winRates: {
                    usa: 52.8,
                    uk: 51.2,
                    canada: 49.8,
                    germany: 48.3,
                    australia: 47.5,
                    france: 46.7,
                    korea: 45.2,
                    japan: 38.5
                },
                avgDuration: {
                    germany: 12,
                    japan: 14,
                    france: 16,
                    uk: 18,
                    australia: 20,
                    korea: 22,
                    canada: 24,
                    usa: 30
                },
                legislation: [
                    { country: 'korea', flag: '🇰🇷', name: '제조물책임법', punitive: false, cap: '실손해 한정', year: 2000 },
                    { country: 'usa', flag: '🇺🇸', name: 'Product Liability Law', punitive: true, cap: '무제한 (주별 상이)', year: 1963 },
                    { country: 'japan', flag: '🇯🇵', name: '製造物責任法', punitive: false, cap: '실손해 한정', year: 1994 },
                    { country: 'germany', flag: '🇩🇪', name: 'Produkthaftungsgesetz', punitive: false, cap: '€85M', year: 1989 },
                    { country: 'uk', flag: '🇬🇧', name: 'Consumer Protection Act', punitive: false, cap: '£500K (일부)', year: 1987 },
                    { country: 'france', flag: '🇫🇷', name: 'Code Civil Art. 1245', punitive: false, cap: '실손해', year: 1998 }
                ],
                deviation: {
                    zScore: -2.8,
                    isSignificant: true,
                    percentile: 12,
                    recommendation: '배상액 산정 기준 현실화 및 징벌적 손해배상 제도 도입 검토 필요'
                }
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    const getCountryFlag = (country) => {
        const flags = {
            korea: '🇰🇷', usa: '🇺🇸', japan: '🇯🇵', germany: '🇩🇪',
            uk: '🇬🇧', france: '🇫🇷', canada: '🇨🇦', australia: '🇦🇺'
        };
        return flags[country] || '🌍';
    };

    const getCountryName = (country) => {
        const names = {
            korea: '한국', usa: '미국', japan: '일본', germany: '독일',
            uk: '영국', france: '프랑스', canada: '캐나다', australia: '호주'
        };
        return names[country] || country;
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-2">
                        <i className="fas fa-globe mr-2 text-blue-600"></i>글로벌 판례 비교 분석
                    </h2>
                    <p className="text-gray-500 mb-6">
                        동일 유형 사건에 대한 OECD 8개국의 판결 결과를 비교하여 법제 격차를 분석합니다.
                    </p>

                    <div className="grid grid-cols-6 gap-4 mb-6">
                        {caseTypes.map(ct => (
                            <button
                                key={ct.id}
                                onClick={() => setCaseType(ct.id)}
                                className={`p-4 rounded-lg border-2 text-center transition ${
                                    caseType === ct.id 
                                        ? 'border-blue-500 bg-blue-50' 
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                <span className="text-2xl">{ct.icon}</span>
                                <p className="text-sm font-medium mt-2">{ct.name}</p>
                            </button>
                        ))}
                    </div>

                    {caseType && (
                        <button 
                            onClick={analyzeComparison}
                            disabled={isAnalyzing}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            {isAnalyzing ? (
                                <><i className="fas fa-spinner fa-spin mr-2"></i>글로벌 데이터 분석 중...</>
                            ) : (
                                <><i className="fas fa-chart-bar mr-2"></i>글로벌 비교 분석 시작</>
                            )}
                        </button>
                    )}
                </div>

                {comparison && (
                    <>
                        {comparison.deviation.isSignificant && (
                            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">⚠️</div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-red-800 text-lg mb-2">법제 격차 감지</h3>
                                        <p className="text-red-700 mb-2">
                                            한국의 평균 배상액이 OECD 평균 대비 
                                            <strong> Z-score {comparison.deviation.zScore}</strong>으로 
                                            통계적으로 유의미한 이탈이 감지되었습니다. 
                                            (하위 {comparison.deviation.percentile}%)
                                        </p>
                                        <p className="text-red-600 text-sm">
                                            <i className="fas fa-lightbulb mr-1"></i>
                                            권고사항: {comparison.deviation.recommendation}
                                        </p>
                                        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">
                                            <i className="fas fa-gavel mr-2"></i>입법 제안 절차 시작
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-bold mb-4">
                                <i className="fas fa-money-bill-wave mr-2 text-green-600"></i>평균 배상액 비교
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                {Object.entries(comparison.avgDamages)
                                    .sort((a, b) => a[1].rank - b[1].rank)
                                    .map(([country, data]) => (
                                        <div 
                                            key={country} 
                                            className={`p-4 rounded-lg ${
                                                country === 'korea' 
                                                    ? 'bg-blue-50 border-2 border-blue-300' 
                                                    : 'bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-2xl">{getCountryFlag(country)}</span>
                                                <span className="font-medium">{getCountryName(country)}</span>
                                            </div>
                                            <div className="font-bold text-lg">
                                                {data.currency}{data.amount.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-gray-500">순위: {data.rank}위</div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h3 className="font-bold mb-4">
                                    <i className="fas fa-chart-line mr-2 text-blue-600"></i>원고 승소율 비교
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(comparison.winRates)
                                        .sort((a, b) => b[1] - a[1])
                                        .map(([country, rate]) => (
                                            <div key={country} className="flex items-center gap-3">
                                                <div className="w-6 text-center">{getCountryFlag(country)}</div>
                                                <div className="w-12 text-sm">{getCountryName(country)}</div>
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${
                                                                country === 'korea' ? 'bg-blue-600' : 'bg-gray-400'
                                                            }`}
                                                            style={{ width: `${rate}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className={`w-12 text-right font-bold text-sm ${
                                                    country === 'korea' ? 'text-blue-600' : ''
                                                }`}>
                                                    {rate}%
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h3 className="font-bold mb-4">
                                    <i className="fas fa-clock mr-2 text-orange-600"></i>평균 소송 기간 (개월)
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(comparison.avgDuration)
                                        .sort((a, b) => a[1] - b[1])
                                        .map(([country, months]) => (
                                            <div key={country} className="flex items-center gap-3">
                                                <div className="w-6 text-center">{getCountryFlag(country)}</div>
                                                <div className="w-12 text-sm">{getCountryName(country)}</div>
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${
                                                                country === 'korea' ? 'bg-blue-600' : 'bg-orange-400'
                                                            }`}
                                                            style={{ width: `${(months / 36) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className={`w-16 text-right font-bold text-sm ${
                                                    country === 'korea' ? 'text-blue-600' : ''
                                                }`}>
                                                    {months}개월
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="font-bold mb-4">
                                <i className="fas fa-balance-scale mr-2 text-purple-600"></i>관련 법률 비교
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b bg-gray-50">
                                            <th className="text-left py-3 px-4">국가</th>
                                            <th className="text-left py-3 px-4">법률명</th>
                                            <th className="text-center py-3 px-4">징벌적 배상</th>
                                            <th className="text-left py-3 px-4">배상 한도</th>
                                            <th className="text-center py-3 px-4">제정연도</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparison.legislation.map((law, i) => (
                                            <tr key={i} className={`border-b ${law.country === 'korea' ? 'bg-blue-50' : ''}`}>
                                                <td className="py-3 px-4">
                                                    <span className="mr-2">{law.flag}</span>
                                                    {getCountryName(law.country)}
                                                </td>
                                                <td className="py-3 px-4 font-medium">{law.name}</td>
                                                <td className="py-3 px-4 text-center">
                                                    {law.punitive ? (
                                                        <span className="text-green-600 font-bold">✓</span>
                                                    ) : (
                                                        <span className="text-red-600">✗</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">{law.cap}</td>
                                                <td className="py-3 px-4 text-center">{law.year}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => setComparison(null)}
                                className="px-6 py-3 border rounded-lg hover:bg-gray-50"
                            >
                                <i className="fas fa-redo mr-2"></i>다른 유형 분석
                            </button>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                                <i className="fas fa-download mr-2"></i>보고서 다운로드
                            </button>
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                                <i className="fas fa-landmark mr-2"></i>법제 환류 시스템으로 이동
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
