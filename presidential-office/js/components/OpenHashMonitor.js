const OpenHashMonitor = () => {
    const [hashChain, setHashChain] = React.useState([]);
    const [verifyData, setVerifyData] = React.useState('');
    const [verifyHash, setVerifyHash] = React.useState('');
    const [verifyResult, setVerifyResult] = React.useState(null);

    const fetchHashChain = () => {
        fetch('/api/presidential-office/hash-chain?limit=5')
            .then(res => res.json())
            .then(data => data.success && setHashChain(data.chain))
            .catch(() => {});
    };

    React.useEffect(() => {
        fetchHashChain();
        const interval = setInterval(fetchHashChain, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleVerify = async () => {
        try {
            const payload = JSON.parse(verifyData);
            const res = await fetch('/api/presidential-office/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: payload, hash: verifyHash })
            });
            setVerifyResult(await res.json());
        } catch (error) {
            setVerifyResult({ success: false, error: 'JSON 파싱 오류' });
        }
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-2">
                    <i className="fas fa-link mr-3 text-purple-500"></i>
                    OpenHash 무결성 모니터
                </h2>
                <p className="text-gray-400 text-center mb-8">SHA3-256 기반 데이터 무결성 검증 시스템</p>

                <div className="grid grid-cols-2 gap-6">
                    {/* 해시 체인 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-yellow-400">
                                <i className="fas fa-cubes mr-2"></i>최근 해시 체인
                            </h3>
                            <button
                                onClick={fetchHashChain}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                <i className="fas fa-sync-alt mr-1"></i>새로고침
                            </button>
                        </div>

                        {hashChain.length > 0 ? (
                            <div className="space-y-3">
                                {hashChain.slice().reverse().map((entry, idx) => (
                                    <div key={idx} className="bg-gray-700/50 rounded-lg p-3 border-l-4 border-purple-500">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-400">
                                                {new Date(entry.timestamp).toLocaleString('ko-KR')}
                                            </span>
                                            <span className="text-green-400 text-xs">
                                                <i className="fas fa-check mr-1"></i>검증됨
                                            </span>
                                        </div>
                                        <div className="text-xs font-mono">
                                            <p className="text-purple-400 truncate">Hash: {entry.hash}</p>
                                            <p className="text-gray-500 truncate">Prev: {entry.prev_hash?.substring(0, 32)}...</p>
                                        </div>
                                        {entry.data && (
                                            <div className="mt-2 text-xs text-gray-400">
                                                {entry.data.agent_id && <span className="bg-gray-600 px-2 py-1 rounded mr-2">{entry.data.agent_id}</span>}
                                                {entry.data.type && <span className="bg-gray-600 px-2 py-1 rounded">{entry.data.type}</span>}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <i className="fas fa-database text-3xl mb-3"></i>
                                <p>해시 체인 데이터가 없습니다</p>
                            </div>
                        )}
                    </div>

                    {/* 무결성 검증 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h3 className="font-bold mb-4 text-yellow-400">
                            <i className="fas fa-shield-check mr-2"></i>데이터 무결성 검증
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">검증할 데이터 (JSON)</label>
                                <textarea
                                    value={verifyData}
                                    onChange={e => setVerifyData(e.target.value)}
                                    placeholder='{"key": "value"}'
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white font-mono text-sm"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">예상 해시값</label>
                                <input
                                    value={verifyHash}
                                    onChange={e => setVerifyHash(e.target.value)}
                                    placeholder="SHA3-256 해시값 입력..."
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white font-mono text-sm"
                                />
                            </div>

                            <button
                                onClick={handleVerify}
                                disabled={!verifyData || !verifyHash}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
                            >
                                <i className="fas fa-fingerprint mr-2"></i>무결성 검증
                            </button>

                            {verifyResult && (
                                <div className={`p-4 rounded-lg ${verifyResult.verified ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
                                    {verifyResult.verified ? (
                                        <>
                                            <p className="text-green-400 font-bold mb-2">
                                                <i className="fas fa-check-circle mr-2"></i>무결성 검증 성공
                                            </p>
                                            <p className="text-sm text-gray-300">데이터가 변조되지 않았습니다.</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-red-400 font-bold mb-2">
                                                <i className="fas fa-times-circle mr-2"></i>무결성 검증 실패
                                            </p>
                                            <p className="text-sm text-gray-300">해시값이 일치하지 않습니다.</p>
                                            {verifyResult.computed_hash && (
                                                <p className="text-xs text-gray-500 mt-2 font-mono">
                                                    계산된 해시: {verifyResult.computed_hash}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-300 mb-2">OpenHash 보안 특성</h4>
                            <ul className="text-xs text-gray-500 space-y-1">
                                <li><i className="fas fa-check text-green-500 mr-2"></i>SHA3-256 암호화 해시</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>체인 연결 무결성</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>타임스탬프 기록</li>
                                <li><i className="fas fa-check text-green-500 mr-2"></i>변조 탐지 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
