const TaxpayerProfile = () => {
    const [searchId, setSearchId] = React.useState('');
    const [profile, setProfile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const demoProfiles = [
        { id: 'P-7A3B2C1D', name: '김*호', type: '개인' },
        { id: 'C-9E8F7G6H', name: '(주)테크솔루션', type: '법인' },
        { id: 'P-5I4J3K2L', name: '박*영', type: '개인' }
    ];

    const formatKRW = (num) => {
        if (!num) return '₩0';
        if (num >= 100000000) return '₩' + (num / 100000000).toFixed(1) + '억';
        if (num >= 10000) return '₩' + (num / 10000).toFixed(0) + '만';
        return '₩' + num.toLocaleString();
    };

    const handleSearch = () => {
        if (!searchId.trim()) return;
        setIsLoading(true);
        setTimeout(() => {
            const baseRevenue = Math.floor(Math.random() * 5000000000) + 100000000;
            const isCompany = searchId.startsWith('C');
            setProfile({
                id: searchId,
                name: isCompany ? '(주)데모기업' : '홍*동',
                type: isCompany ? '법인' : '개인',
                registrationDate: '2020-03-15',
                creditScore: (0.7 + Math.random() * 0.28).toFixed(2),
                creditGrade: Math.random() > 0.5 ? 'A' : 'B',
                taxHistory: { totalPaid: baseRevenue * 0.15, thisYear: baseRevenue * 0.08, pending: Math.floor(Math.random() * 5000000) },
                filingHistory: [
                    { year: 2024, type: '종합소득세', status: '완료', amount: baseRevenue * 0.05 },
                    { year: 2024, type: '부가가치세', status: '완료', amount: baseRevenue * 0.03 },
                    { year: 2023, type: '종합소득세', status: '완료', amount: baseRevenue * 0.045 }
                ],
                financialSummary: { revenue: baseRevenue, netIncome: baseRevenue * 0.2, assets: baseRevenue * 1.5, liabilities: baseRevenue * 0.6 },
                riskScore: (Math.random() * 0.3).toFixed(2),
                layer: Math.random() < 0.7 ? 1 : 2,
                region: ['서울', '경기', '부산', '제주'][Math.floor(Math.random() * 4)],
                openHashVerified: true
            });
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-4"><i className="fas fa-user-tie text-purple-400 mr-2"></i>납세자 조회</h3>
                <div className="flex gap-4">
                    <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)}
                        placeholder="납세자 ID (예: P-7A3B2C1D)" onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <button onClick={handleSearch} disabled={isLoading}
                        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-medium transition disabled:opacity-50">
                        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-search mr-2"></i>조회</>}
                    </button>
                </div>
                <div className="mt-3 flex gap-2">
                    <span className="text-sm text-gray-400">빠른 선택:</span>
                    {demoProfiles.map(p => (
                        <button key={p.id} onClick={() => setSearchId(p.id)}
                            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition">{p.name}</button>
                    ))}
                </div>
            </div>

            {profile && (
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${profile.type === '법인' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
                                <i className={`fas ${profile.type === '법인' ? 'fa-building' : 'fa-user'} text-2xl ${profile.type === '법인' ? 'text-purple-400' : 'text-blue-400'}`}></i>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white">{profile.name}</div>
                                <div className="text-gray-400">{profile.id}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${profile.type === '법인' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>{profile.type}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400"><i className="fas fa-check mr-1"></i>OpenHash 검증</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between"><span className="text-gray-400">등록일</span><span className="text-white">{profile.registrationDate}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">관할 Layer</span><span className="text-cyan-400">Layer {profile.layer}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">지역</span><span className="text-white">{profile.region}</span></div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-700">
                            <div className="text-sm text-gray-400 mb-2">신용등급</div>
                            <div className="flex items-center gap-3">
                                <div className={`text-4xl font-bold ${profile.creditGrade === 'A' ? 'text-green-400' : profile.creditGrade === 'B' ? 'text-yellow-400' : 'text-red-400'}`}>{profile.creditGrade}</div>
                                <div className="flex-1">
                                    <div className="text-sm text-white">{(profile.creditScore * 100).toFixed(0)}점</div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                                        <div className={`h-2 rounded-full ${profile.creditGrade === 'A' ? 'bg-green-500' : 'bg-yellow-500'}`} style={{width: `${profile.creditScore * 100}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <h4 className="text-lg font-bold mb-4"><i className="fas fa-coins text-yellow-400 mr-2"></i>납세 현황</h4>
                        <div className="space-y-4">
                            <div className="bg-gray-700/50 rounded-xl p-4">
                                <div className="text-sm text-gray-400">총 납부 세액</div>
                                <div className="text-2xl font-bold text-white">{formatKRW(profile.taxHistory.totalPaid)}</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-4">
                                <div className="text-sm text-gray-400">올해 납부액</div>
                                <div className="text-2xl font-bold text-green-400">{formatKRW(profile.taxHistory.thisYear)}</div>
                            </div>
                            <div className="bg-gray-700/50 rounded-xl p-4">
                                <div className="text-sm text-gray-400">미납 세액</div>
                                <div className={`text-2xl font-bold ${profile.taxHistory.pending > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    {profile.taxHistory.pending > 0 ? formatKRW(profile.taxHistory.pending) : '없음'}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-sm text-gray-400 mb-2">위험도</div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-700 rounded-full h-3">
                                    <div className={`h-3 rounded-full ${profile.riskScore < 0.1 ? 'bg-green-500' : profile.riskScore < 0.2 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                        style={{width: `${profile.riskScore * 100 * 3}%`}}></div>
                                </div>
                                <span className={`text-sm font-bold ${profile.riskScore < 0.1 ? 'text-green-400' : profile.riskScore < 0.2 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {profile.riskScore < 0.1 ? '낮음' : profile.riskScore < 0.2 ? '보통' : '주의'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <h4 className="text-lg font-bold mb-4"><i className="fas fa-history text-cyan-400 mr-2"></i>신고 이력</h4>
                        <div className="space-y-3">
                            {profile.filingHistory.map((filing, idx) => (
                                <div key={idx} className="bg-gray-700/50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-white">{filing.type}</span>
                                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{filing.status}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400">{filing.year}년</span>
                                        <span className="text-white">{formatKRW(filing.amount)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-700">
                            <h5 className="text-sm font-bold mb-3">재무 요약</h5>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-gray-400">매출액</span><span className="text-white">{formatKRW(profile.financialSummary.revenue)}</span></div>
                                <div className="flex justify-between"><span className="text-gray-400">순이익</span><span className="text-green-400">{formatKRW(profile.financialSummary.netIncome)}</span></div>
                                <div className="flex justify-between"><span className="text-gray-400">자산</span><span className="text-white">{formatKRW(profile.financialSummary.assets)}</span></div>
                                <div className="flex justify-between"><span className="text-gray-400">부채</span><span className="text-red-400">{formatKRW(profile.financialSummary.liabilities)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!profile && (
                <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700 text-center">
                    <i className="fas fa-search text-5xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400">납세자 ID를 입력하여 프로필을 조회하세요</p>
                </div>
            )}
        </div>
    );
};
