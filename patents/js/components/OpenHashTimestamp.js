// OpenHashTimestamp 컴포넌트 - 오픈해시 우선권 증명
const OpenHashTimestamp = () => {
    const [activeTab, setActiveTab] = useState('register'); // register, verify, history
    const [inventionData, setInventionData] = useState({
        title: '',
        description: '',
        inventors: '',
        files: []
    });
    const [timestampResult, setTimestampResult] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [verifyHash, setVerifyHash] = useState('');
    const [verifyResult, setVerifyResult] = useState(null);

    const timestampHistory = [
        { 
            hash: 'OH_7X9K2M4N8P1Q3R5T',
            title: 'AI 기반 문서 분류 시스템',
            timestamp: '2025-11-27T09:30:00Z',
            status: 'verified',
            blockHeight: 1847293
        },
        {
            hash: 'OH_A2B4C6D8E1F3G5H7',
            title: '블록체인 인증 프로토콜',
            timestamp: '2025-11-25T14:20:00Z',
            status: 'verified',
            blockHeight: 1845102
        },
        {
            hash: 'OH_J9K1L3M5N7P2Q4R6',
            title: '스마트 계약 자동화 방법',
            timestamp: '2025-11-20T11:45:00Z',
            status: 'verified',
            blockHeight: 1840587
        }
    ];

    const generateTimestamp = () => {
        if (!inventionData.title || !inventionData.description) {
            alert('발명의 명칭과 설명을 입력해주세요.');
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            const hash = 'OH_' + Array(16).fill(0).map(() => 
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
            ).join('');

            setTimestampResult({
                success: true,
                hash: hash,
                timestamp: new Date().toISOString(),
                blockHeight: Math.floor(Math.random() * 10000) + 1840000,
                merkleRoot: '0x' + Array(64).fill(0).map(() => 
                    '0123456789abcdef'[Math.floor(Math.random() * 16)]
                ).join(''),
                nodeCount: Math.floor(Math.random() * 50) + 100,
                consensusTime: (Math.random() * 0.5 + 0.1).toFixed(3),
                energySaved: '98.5%',
                certificate: {
                    issuer: 'OpenHash Foundation',
                    issuedAt: new Date().toISOString(),
                    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                    algorithm: 'SHA-3-256 + Probabilistic Layer Selection'
                }
            });

            setIsProcessing(false);
        }, 2500);
    };

    const verifyTimestamp = () => {
        if (!verifyHash.trim()) {
            alert('검증할 해시값을 입력해주세요.');
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            const isValid = verifyHash.startsWith('OH_') && verifyHash.length >= 10;
            
            setVerifyResult({
                valid: isValid,
                hash: verifyHash,
                verifiedAt: new Date().toISOString(),
                details: isValid ? {
                    originalTimestamp: '2025-11-20T14:30:00Z',
                    blockHeight: 1842567,
                    confirmations: Math.floor(Math.random() * 1000) + 5000,
                    integrity: 'INTACT',
                    nodeVerifications: Math.floor(Math.random() * 30) + 50
                } : null
            });

            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">⛓️</span>
                        오픈해시 우선권 증명
                    </h2>
                    <p className="text-gray-500">선출원주의 시대, 발명 시점을 기술적으로 증명합니다</p>
                </div>
                <a 
                    href="http://100.30.14.224/openhash.html"
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                    <i className="fas fa-external-link-alt"></i>
                    오픈해시 기술 상세
                </a>
            </div>

            {/* 오픈해시 소개 배너 */}
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-xl p-6 text-white">
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-2">
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">왜 오픈해시인가?</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            특허법은 선출원주의를 채택하고 있어, 동일한 발명에 대해 먼저 출원한 자에게 권리를 부여합니다.
                            오픈해시는 발명의 존재 시점을 위변조 불가능하게 증명하여 글로벌 우선권 주장의 근거가 됩니다.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <i className="fas fa-check text-green-400"></i>
                                <span className="text-sm">블록체인 대비 98.5% 에너지 절감</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="fas fa-check text-green-400"></i>
                                <span className="text-sm">1000배 빠른 처리 속도</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-3">
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-yellow-400">0.3초</div>
                            <div className="text-xs text-gray-300">합의 시간</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-yellow-400">150+</div>
                            <div className="text-xs text-gray-300">검증 노드</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-yellow-400">∞</div>
                            <div className="text-xs text-gray-300">영구 보존</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 탭 */}
            <div className="flex gap-2">
                {[
                    { id: 'register', label: '타임스탬프 등록', icon: 'fa-plus-circle' },
                    { id: 'verify', label: '검증', icon: 'fa-check-circle' },
                    { id: 'history', label: '등록 이력', icon: 'fa-history' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                            activeTab === tab.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            {activeTab === 'register' && (
                <div className="grid grid-cols-2 gap-6">
                    {/* 입력 영역 */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">발명 정보 등록</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">발명의 명칭 *</label>
                                <input
                                    type="text"
                                    value={inventionData.title}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="발명의 명칭을 입력하세요"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">발명 설명 *</label>
                                <textarea
                                    value={inventionData.description}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={6}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="발명의 핵심 내용을 기재하세요. 이 내용의 해시값이 타임스탬프로 등록됩니다."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">발명자</label>
                                <input
                                    type="text"
                                    value={inventionData.inventors}
                                    onChange={(e) => setInventionData(prev => ({ ...prev, inventors: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="발명자 이름 (쉼표로 구분)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">첨부 파일 (선택)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
                                    <i className="fas fa-cloud-upload-alt text-3xl mb-2"></i>
                                    <p className="text-sm">파일을 드래그하거나 클릭하여 업로드</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, 이미지 파일 지원</p>
                                </div>
                            </div>
                            <button
                                onClick={generateTimestamp}
                                disabled={isProcessing}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50 transition"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-spinner loading-spin"></i>
                                        타임스탬프 생성 중...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-link"></i>
                                        오픈해시 타임스탬프 생성
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* 결과 영역 */}
                    <div className="space-y-4">
                        {timestampResult ? (
                            <>
                                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                            <i className="fas fa-check text-white text-xl"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-green-800">타임스탬프 등록 완료!</h4>
                                            <p className="text-sm text-green-600">우선권 증명이 성공적으로 등록되었습니다</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">해시값</span>
                                            <span className="font-mono text-blue-600 font-bold">{timestampResult.hash}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">등록 시각</span>
                                            <span className="font-mono text-sm">{new Date(timestampResult.timestamp).toLocaleString('ko-KR')}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">블록 높이</span>
                                            <span className="font-mono">{timestampResult.blockHeight.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">합의 시간</span>
                                            <span>{timestampResult.consensusTime}초</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">검증 노드</span>
                                            <span>{timestampResult.nodeCount}개</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-5 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-3">📜 인증서 정보</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">발급 기관</span>
                                            <span>{timestampResult.certificate.issuer}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">유효 기간</span>
                                            <span>{new Date(timestampResult.certificate.validUntil).toLocaleDateString('ko-KR')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">알고리즘</span>
                                            <span className="text-xs">{timestampResult.certificate.algorithm}</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition">
                                        <i className="fas fa-download mr-2"></i>인증서 다운로드
                                    </button>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <i className="fas fa-lightbulb text-yellow-500 mt-1"></i>
                                        <div className="text-sm text-yellow-800">
                                            <strong>활용 안내:</strong> 이 타임스탬프는 특허 출원 시 발명 시점 증명, 
                                            해외 출원 시 우선권 주장, 기술 분쟁 시 증거 자료로 활용할 수 있습니다.
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-gray-50 rounded-xl p-12 text-center h-full flex flex-col items-center justify-center">
                                <div className="text-6xl mb-4">⛓️</div>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">타임스탬프를 등록하세요</h3>
                                <p className="text-gray-500 text-sm">
                                    발명 정보를 입력하고 타임스탬프를 생성하면<br/>
                                    오픈해시 네트워크에 영구적으로 기록됩니다.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'verify' && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">타임스탬프 검증</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">해시값 입력</label>
                                <input
                                    type="text"
                                    value={verifyHash}
                                    onChange={(e) => setVerifyHash(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono"
                                    placeholder="OH_XXXXXXXXXXXXXXXX"
                                />
                            </div>
                            <button
                                onClick={verifyTimestamp}
                                disabled={isProcessing}
                                className="w-full btn-kipo text-white py-3 rounded-lg font-medium disabled:opacity-50"
                            >
                                {isProcessing ? '검증 중...' : '검증하기'}
                            </button>
                        </div>

                        {verifyResult && (
                            <div className={`mt-6 p-4 rounded-lg ${verifyResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <i className={`fas ${verifyResult.valid ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} text-2xl`}></i>
                                    <span className={`font-bold ${verifyResult.valid ? 'text-green-800' : 'text-red-800'}`}>
                                        {verifyResult.valid ? '유효한 타임스탬프입니다' : '유효하지 않은 해시값입니다'}
                                    </span>
                                </div>
                                {verifyResult.valid && verifyResult.details && (
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">등록 시각</span>
                                            <span>{new Date(verifyResult.details.originalTimestamp).toLocaleString('ko-KR')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">블록 높이</span>
                                            <span>{verifyResult.details.blockHeight.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">확인 수</span>
                                            <span>{verifyResult.details.confirmations.toLocaleString()}회</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">무결성</span>
                                            <span className="text-green-600 font-medium">{verifyResult.details.integrity}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="font-bold text-gray-800">등록 이력</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {timestampHistory.map((item, idx) => (
                            <div key={idx} className="p-5 hover:bg-gray-50 transition">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-blue-600 font-bold">{item.hash}</span>
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">검증됨</span>
                                        </div>
                                        <div className="font-medium text-gray-800">{item.title}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(item.timestamp).toLocaleString('ko-KR')} | 블록 #{item.blockHeight}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            <i className="fas fa-eye mr-1"></i>상세
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 text-sm">
                                            <i className="fas fa-download mr-1"></i>인증서
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
