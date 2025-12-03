const DocumentIssuance = () => {
    const [selectedType, setSelectedType] = React.useState('');
    const [caseNumber, setCaseNumber] = React.useState('');
    const [issuedDocuments, setIssuedDocuments] = React.useState([
        {
            id: 'I2025-001',
            type: '제출증명원',
            caseNumber: '2025가합12345',
            issuedAt: '2025-11-26 10:30',
            validUntil: '2025-12-26',
            status: 'valid'
        },
        {
            id: 'I2025-002',
            type: '송달증명원',
            caseNumber: '2025가합12345',
            issuedAt: '2025-11-20 14:15',
            validUntil: '2025-12-20',
            status: 'valid'
        }
    ]);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const documentTypes = [
        { id: 'submit', name: '제출증명원', desc: '서류 제출 사실 증명', icon: 'fa-file-upload', fee: 0 },
        { id: 'service', name: '송달증명원', desc: '서류 송달 사실 증명', icon: 'fa-paper-plane', fee: 0 },
        { id: 'final', name: '확정증명원', desc: '판결 확정 사실 증명', icon: 'fa-gavel', fee: 0 },
        { id: 'pending', name: '소송계속증명원', desc: '소송 진행 중 증명', icon: 'fa-hourglass-half', fee: 1000 },
        { id: 'execution', name: '집행문', desc: '강제집행을 위한 문서', icon: 'fa-stamp', fee: 2000 },
        { id: 'copy', name: '판결문 사본', desc: '판결문 등본/초본', icon: 'fa-copy', fee: 1000 }
    ];

    const requestIssuance = () => {
        if (!selectedType || !caseNumber) {
            alert('문서 종류와 사건번호를 입력해주세요.');
            return;
        }
        
        setIsProcessing(true);
        setTimeout(() => {
            const newDoc = {
                id: `I2025-${String(issuedDocuments.length + 1).padStart(3, '0')}`,
                type: documentTypes.find(d => d.id === selectedType)?.name,
                caseNumber: caseNumber,
                issuedAt: new Date().toLocaleString('ko-KR'),
                validUntil: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('ko-KR'),
                status: 'valid'
            };
            setIssuedDocuments([newDoc, ...issuedDocuments]);
            setIsProcessing(false);
            setSelectedType('');
            setCaseNumber('');
            alert('문서가 발급되었습니다.');
        }, 2000);
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-6">
                        <i className="fas fa-file-certificate mr-2 text-blue-600"></i>문서발급
                    </h2>

                    <div className="mb-6">
                        <h3 className="font-medium mb-3">발급 문서 종류</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {documentTypes.map(doc => (
                                <button
                                    key={doc.id}
                                    onClick={() => setSelectedType(doc.id)}
                                    className={`p-4 border-2 rounded-lg text-left transition ${
                                        selectedType === doc.id 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <i className={`fas ${doc.icon} text-blue-600`}></i>
                                        <span className="font-bold">{doc.name}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{doc.desc}</p>
                                    <div className="mt-2 text-sm">
                                        {doc.fee === 0 ? (
                                            <span className="text-green-600">무료</span>
                                        ) : (
                                            <span className="text-gray-600">₩{doc.fee.toLocaleString()}</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedType && (
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="font-medium mb-4">발급 신청</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">사건번호</label>
                                    <input
                                        type="text"
                                        value={caseNumber}
                                        onChange={e => setCaseNumber(e.target.value)}
                                        placeholder="2025가합12345"
                                        className="w-full border rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">문서 종류</label>
                                    <input
                                        type="text"
                                        value={documentTypes.find(d => d.id === selectedType)?.name}
                                        disabled
                                        className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={requestIssuance}
                                disabled={isProcessing}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <><i className="fas fa-spinner fa-spin mr-2"></i>발급 처리 중...</>
                                ) : (
                                    <><i className="fas fa-file-download mr-2"></i>발급 신청</>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="font-bold mb-4">
                        <i className="fas fa-history mr-2 text-blue-600"></i>발급 내역
                    </h3>
                    
                    {issuedDocuments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            발급 내역이 없습니다.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {issuedDocuments.map(doc => (
                                <div key={doc.id} className="border rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <i className="fas fa-file-alt text-green-600"></i>
                                        </div>
                                        <div>
                                            <div className="font-medium">{doc.type}</div>
                                            <div className="text-sm text-gray-500">
                                                {doc.caseNumber} · {doc.issuedAt}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right text-sm">
                                            <div className="text-gray-500">유효기간</div>
                                            <div>{doc.validUntil}</div>
                                        </div>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                                            <i className="fas fa-download mr-1"></i>다운로드
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-bold text-yellow-800 mb-3">
                        <i className="fas fa-exclamation-triangle mr-2"></i>주의사항
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 제출증명, 송달증명, 확정증명만 전자 발급 가능합니다.</li>
                        <li>• 소송계속증명원, 집행문 등은 법원 방문 또는 우편 신청이 필요합니다.</li>
                        <li>• 발급된 문서는 30일간 다운로드 가능합니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
