const PersonalVault = () => {
    const [vaultStats, setVaultStats] = React.useState({
        totalVaults: 30000000,
        activeVaults: 28500000,
        dataStored: 892,
        accessToday: 48520000
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            setVaultStats(prev => ({
                ...prev,
                accessToday: prev.accessToday + Math.floor(Math.random() * 1000)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toLocaleString();
    };

    const dataCategories = [
        { name: '업무 수행 기록', icon: 'fa-clipboard-list', count: '45.2B', color: 'text-blue-400' },
        { name: '출퇴근 로그', icon: 'fa-clock', count: '12.8B', color: 'text-green-400' },
        { name: '성과 평가', icon: 'fa-chart-line', count: '890M', color: 'text-purple-400' },
        { name: '경력 정보', icon: 'fa-briefcase', count: '420M', color: 'text-yellow-400' },
        { name: '능력-적성 분석', icon: 'fa-brain', count: '185M', color: 'text-pink-400' },
        { name: '급여/계약', icon: 'fa-file-contract', count: '320M', color: 'text-cyan-400' }
    ];

    const securityFeatures = [
        { title: 'AES-256 암호화', desc: '군사급 암호화로 데이터 보호', icon: 'fa-lock' },
        { title: 'RSA-4096 키 관리', desc: '개인키 기반 접근 제어', icon: 'fa-key' },
        { title: '영지식 증명', desc: '정보 노출 없이 자격 검증', icon: 'fa-user-secret' },
        { title: '동형 암호화', desc: '암호화 상태에서 연산 가능', icon: 'fa-calculator' }
    ];

    return (
        <div className="space-y-6">
            {/* 상단 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5">
                    <p className="text-blue-200 text-sm">총 개인 금고</p>
                    <p className="text-3xl font-bold text-white mt-1">{formatNumber(vaultStats.totalVaults)}</p>
                    <p className="text-blue-200 text-xs mt-1">전국 노동인구</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-5">
                    <p className="text-green-200 text-sm">활성 금고</p>
                    <p className="text-3xl font-bold text-white mt-1">{formatNumber(vaultStats.activeVaults)}</p>
                    <p className="text-green-200 text-xs mt-1">95% 활성률</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5">
                    <p className="text-purple-200 text-sm">총 저장 데이터</p>
                    <p className="text-3xl font-bold text-white mt-1">{vaultStats.dataStored}TB</p>
                    <p className="text-purple-200 text-xs mt-1">암호화 저장</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-200 text-sm">오늘 접근</p>
                            <p className="text-3xl font-bold text-white mt-1">{formatNumber(vaultStats.accessToday)}</p>
                        </div>
                        <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                    </div>
                </div>
            </div>

            {/* PDV 개념 설명 */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-vault text-4xl text-blue-400"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">개인 정보 금고 (Personal Data Vault)</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-3">
                            모든 개인 데이터의 <span className="text-blue-400 font-medium">원본</span>은 오직 본인의 정보 금고에만 저장됩니다.
                            시스템은 <span className="text-green-400 font-medium">익명화된 통계</span>만 처리하며, 
                            개인을 식별할 수 있는 정보는 본인의 동의 없이 절대 접근할 수 없습니다.
                        </p>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">완전한 개인 통제</span>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">익명화 처리</span>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">OpenHash 검증</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 데이터 카테고리 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">저장 데이터 카테고리</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {dataCategories.map((cat, index) => (
                        <div key={index} className="p-4 bg-slate-700/50 rounded-lg text-center hover:bg-slate-700 transition-all">
                            <i className={`fas ${cat.icon} text-2xl ${cat.color} mb-2`}></i>
                            <p className="text-white font-medium text-sm">{cat.name}</p>
                            <p className={`text-lg font-bold ${cat.color} mt-1`}>{cat.count}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 보안 기능 */}
            <div className="bg-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🔐 보안 기술</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {securityFeatures.map((feature, index) => (
                        <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <i className={`fas ${feature.icon} text-green-400`}></i>
                                </div>
                                <p className="font-medium text-white">{feature.title}</p>
                            </div>
                            <p className="text-xs text-slate-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 접근 권한 안내 */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <i className="fas fa-info-circle text-blue-400"></i>
                    <span>
                        개인 정보 금고는 <strong className="text-white">3단계 본인 인증</strong>(생체정보 + 개인화 질문 + 분산 검증)을 
                        통과해야만 접근할 수 있습니다.
                    </span>
                </div>
            </div>
        </div>
    );
};
