const TransactionLedger = () => {
    const [transactions, setTransactions] = React.useState([]);
    const [filter, setFilter] = React.useState({ layer: 'all', type: 'all', status: 'all' });
    const [stats, setStats] = React.useState({
        total: 0, verified: 0, pending: 0, rejected: 0
    });

    const taxTypes = ['종합소득세', '법인세', '부가가치세', '원천세', '양도소득세', '상속세', '증여세', '교통세'];
    const regions = ['서울', '경기', '부산', '인천', '대전', '광주', '대구', '울산', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

    const generateTransaction = () => {
        const layer = Math.random() < 0.65 ? 1 : Math.random() < 0.9 ? 2 : Math.random() < 0.98 ? 3 : 4;
        const type = taxTypes[Math.floor(Math.random() * taxTypes.length)];
        const status = Math.random() < 0.95 ? 'verified' : Math.random() < 0.98 ? 'pending' : 'rejected';
        
        return {
            id: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            type: type,
            amount: Math.floor(Math.random() * 500000000) + 50000,
            layer: layer,
            layerName: ['읍면동', '시군구', '광역시도', '국가'][layer - 1],
            region: regions[Math.floor(Math.random() * regions.length)],
            sender: {
                id: `${Math.random() < 0.7 ? 'P' : 'C'}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                type: Math.random() < 0.7 ? '개인' : '법인',
                signature: `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
            },
            receiver: {
                id: `NTS-L${layer}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
                type: '국세청',
                signature: `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
            },
            hashChain: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            previousHash: `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            timestamp: new Date().toISOString(),
            blockHeight: Math.floor(Math.random() * 1000000) + 5000000,
            status: status,
            verificationTime: (Math.random() * 0.05).toFixed(4),
            taxLawRef: `${['소득세법', '법인세법', '부가가치세법'][Math.floor(Math.random() * 3)]} 제${Math.floor(Math.random() * 50) + 1}조`
        };
    };

    React.useEffect(() => {
        // 초기 트랜잭션 생성
        const initial = Array(20).fill(null).map(() => generateTransaction());
        setTransactions(initial);

        // 실시간 트랜잭션 추가
        const interval = setInterval(() => {
            const newTx = generateTransaction();
            setTransactions(prev => [newTx, ...prev.slice(0, 99)]);
            setStats(prev => ({
                total: prev.total + 1,
                verified: prev.verified + (newTx.status === 'verified' ? 1 : 0),
                pending: prev.pending + (newTx.status === 'pending' ? 1 : 0),
                rejected: prev.rejected + (newTx.status === 'rejected' ? 1 : 0)
            }));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    const formatKRW = (num) => {
        if (num >= 100000000) return `₩${(num / 100000000).toFixed(2)}억`;
        if (num >= 10000) return `₩${(num / 10000).toFixed(0)}만`;
        return `₩${num.toLocaleString()}`;
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'verified': return { bg: 'bg-green-500/20', text: 'text-green-400', icon: 'fa-check-circle', label: '검증완료' };
            case 'pending': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: 'fa-clock', label: '검증중' };
            case 'rejected': return { bg: 'bg-red-500/20', text: 'text-red-400', icon: 'fa-times-circle', label: '거부됨' };
            default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', icon: 'fa-question-circle', label: '알수없음' };
        }
    };

    const getLayerColor = (layer) => ['blue', 'green', 'purple', 'cyan'][layer - 1] || 'gray';

    const filteredTransactions = transactions.filter(tx => {
        if (filter.layer !== 'all' && tx.layer !== parseInt(filter.layer)) return false;
        if (filter.type !== 'all' && tx.type !== filter.type) return false;
        if (filter.status !== 'all' && tx.status !== filter.status) return false;
        return true;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 상단 통계 */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="text-gray-400 text-sm">총 거래</div>
                    <div className="text-2xl font-bold text-white">{stats.total.toLocaleString()}</div>
                </div>
                <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                    <div className="text-green-400 text-sm">검증 완료</div>
                    <div className="text-2xl font-bold text-green-400">{stats.verified.toLocaleString()}</div>
                </div>
                <div className="bg-yellow-900/30 rounded-xl p-4 border border-yellow-500/30">
                    <div className="text-yellow-400 text-sm">검증 중</div>
                    <div className="text-2xl font-bold text-yellow-400">{stats.pending.toLocaleString()}</div>
                </div>
                <div className="bg-red-900/30 rounded-xl p-4 border border-red-500/30">
                    <div className="text-red-400 text-sm">거부됨</div>
                    <div className="text-2xl font-bold text-red-400">{stats.rejected.toLocaleString()}</div>
                </div>
            </div>

            {/* 필터 */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-6">
                <div className="flex items-center gap-4">
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">Layer</label>
                        <select 
                            value={filter.layer} 
                            onChange={(e) => setFilter({...filter, layer: e.target.value})}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                            <option value="all">전체</option>
                            <option value="1">Layer 1 (읍면동)</option>
                            <option value="2">Layer 2 (시군구)</option>
                            <option value="3">Layer 3 (광역시도)</option>
                            <option value="4">Layer 4 (국가)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">세목</label>
                        <select 
                            value={filter.type} 
                            onChange={(e) => setFilter({...filter, type: e.target.value})}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                            <option value="all">전체</option>
                            {taxTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">상태</label>
                        <select 
                            value={filter.status} 
                            onChange={(e) => setFilter({...filter, status: e.target.value})}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        >
                            <option value="all">전체</option>
                            <option value="verified">검증완료</option>
                            <option value="pending">검증중</option>
                            <option value="rejected">거부됨</option>
                        </select>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-green-400 text-sm">실시간 연결됨</span>
                    </div>
                </div>
            </div>

            {/* 거래 목록 */}
            <div className="bg-gray-800 rounded-xl border border-gray-700">
                <div className="p-4 border-b border-gray-700">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <i className="fas fa-exchange-alt text-cyan-400"></i>
                        거래 원장 (Hash Chain)
                    </h3>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                    {filteredTransactions.map((tx, idx) => {
                        const statusStyle = getStatusStyle(tx.status);
                        const layerColor = getLayerColor(tx.layer);
                        
                        return (
                            <div 
                                key={tx.id} 
                                className={`p-4 border-b border-gray-700 hover:bg-gray-700/30 transition ${
                                    idx === 0 ? 'bg-cyan-500/5' : ''
                                }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${layerColor}-500/20`}>
                                            <span className={`font-bold text-${layerColor}-400`}>L{tx.layer}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white">{tx.type}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full bg-${layerColor}-500/20 text-${layerColor}-400`}>
                                                    {tx.layerName}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                                                    <i className={`fas ${statusStyle.icon} mr-1`}></i>
                                                    {statusStyle.label}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                <span className="font-mono">{tx.id}</span>
                                                <span className="mx-2">|</span>
                                                <span>{tx.region}</span>
                                                <span className="mx-2">|</span>
                                                <span>Block #{tx.blockHeight.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-white">{formatKRW(tx.amount)}</div>
                                        <div className="text-xs text-gray-400">{new Date(tx.timestamp).toLocaleString('ko-KR')}</div>
                                    </div>
                                </div>
                                
                                {/* 디지털 서명 정보 */}
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div className="bg-gray-700/30 rounded-lg p-2">
                                        <div className="text-gray-400 mb-1">납세자 서명</div>
                                        <div className="flex items-center gap-2">
                                            <span className={`${tx.sender.type === '개인' ? 'text-blue-400' : 'text-purple-400'}`}>
                                                {tx.sender.id}
                                            </span>
                                            <span className="text-gray-500 font-mono truncate">{tx.sender.signature.substring(0, 20)}...</span>
                                            <i className="fas fa-check text-green-400"></i>
                                        </div>
                                    </div>
                                    <div className="bg-gray-700/30 rounded-lg p-2">
                                        <div className="text-gray-400 mb-1">국세청 서명</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-cyan-400">{tx.receiver.id}</span>
                                            <span className="text-gray-500 font-mono truncate">{tx.receiver.signature.substring(0, 20)}...</span>
                                            <i className="fas fa-check text-green-400"></i>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Hash Chain 정보 */}
                                <div className="mt-3 bg-gray-900/50 rounded-lg p-2 text-xs">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-gray-400">Current Hash: </span>
                                            <span className="text-cyan-400 font-mono">{tx.hashChain.substring(0, 32)}...</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">검증시간: </span>
                                            <span className="text-green-400">{tx.verificationTime}ms</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">세법: </span>
                                            <span className="text-yellow-400">{tx.taxLawRef}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
