const RecordViewer = () => {
    const [selectedCase, setSelectedCase] = React.useState(null);
    const [records, setRecords] = React.useState(null);
    const [selectedRecord, setSelectedRecord] = React.useState(null);

    const cases = [
        { caseNumber: '2025가합12345', caseName: '손해배상(기)', court: '서울중앙지방법원', status: '진행중' },
        { caseNumber: '2025나56789', caseName: '임대차보증금', court: '제주지방법원', status: '확정' }
    ];

    const loadRecords = (caseNumber) => {
        setSelectedCase(caseNumber);
        setTimeout(() => {
            setRecords([
                { id: 1, category: '소송서류', name: '소장', pages: 12, submitter: '원고', date: '2025-10-15', size: '2.3MB' },
                { id: 2, category: '소송서류', name: '답변서', pages: 8, submitter: '피고', date: '2025-10-28', size: '1.8MB' },
                { id: 3, category: '소송서류', name: '준비서면(원고)', pages: 15, submitter: '원고', date: '2025-11-05', size: '3.1MB' },
                { id: 4, category: '소송서류', name: '준비서면(피고)', pages: 10, submitter: '피고', date: '2025-11-12', size: '2.5MB' },
                { id: 5, category: '증거', name: '갑 제1호증 (계약서)', pages: 5, submitter: '원고', date: '2025-10-15', size: '1.2MB' },
                { id: 6, category: '증거', name: '갑 제2호증 (입금내역)', pages: 3, submitter: '원고', date: '2025-10-15', size: '0.8MB' },
                { id: 7, category: '증거', name: '을 제1호증 (이메일)', pages: 20, submitter: '피고', date: '2025-10-28', size: '4.5MB' },
                { id: 8, category: '법원문서', name: '변론기일통지서', pages: 1, submitter: '법원', date: '2025-11-01', size: '0.3MB' },
                { id: 9, category: '법원문서', name: '조정권고결정', pages: 2, submitter: '법원', date: '2025-11-15', size: '0.5MB' }
            ]);
        }, 500);
    };

    const categories = records ? [...new Set(records.map(r => r.category))] : [];

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-6">
                        <i className="fas fa-book-open mr-2 text-blue-600"></i>기록열람
                    </h2>

                    <div className="mb-6">
                        <h3 className="font-medium mb-3">사건 선택</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {cases.map(c => (
                                <button
                                    key={c.caseNumber}
                                    onClick={() => loadRecords(c.caseNumber)}
                                    className={`p-4 border-2 rounded-lg text-left transition ${
                                        selectedCase === c.caseNumber 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-blue-600">{c.caseNumber}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs ${
                                            c.status === '진행중' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {c.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">{c.caseName}</div>
                                    <div className="text-xs text-gray-500 mt-1">{c.court}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {records && (
                        <div className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                                <span className="font-medium">
                                    <i className="fas fa-folder-open mr-2"></i>
                                    {selectedCase} 사건기록
                                </span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 bg-white border rounded text-sm hover:bg-gray-50">
                                        <i className="fas fa-download mr-1"></i>전체 다운로드
                                    </button>
                                    <button className="px-3 py-1.5 bg-white border rounded text-sm hover:bg-gray-50">
                                        <i className="fas fa-print mr-1"></i>출력
                                    </button>
                                </div>
                            </div>

                            {categories.map(category => (
                                <div key={category}>
                                    <div className="px-4 py-2 bg-gray-100 font-medium text-sm text-gray-700">
                                        {category}
                                    </div>
                                    <div className="divide-y">
                                        {records.filter(r => r.category === category).map(record => (
                                            <div 
                                                key={record.id}
                                                onClick={() => setSelectedRecord(record)}
                                                className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                                                    selectedRecord?.id === record.id ? 'bg-blue-50' : ''
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <i className="fas fa-file-pdf text-red-500"></i>
                                                    <div>
                                                        <div className="font-medium">{record.name}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {record.submitter} · {record.date} · {record.pages}페이지
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-gray-500">{record.size}</span>
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="text-gray-500 hover:text-gray-700">
                                                        <i className="fas fa-download"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!records && (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                            <p className="text-gray-500">사건을 선택하면 기록을 열람할 수 있습니다.</p>
                        </div>
                    )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-bold text-blue-800 mb-3">
                        <i className="fas fa-info-circle mr-2"></i>기록열람 안내
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                        <li>• 전자소송에 동의한 당사자 및 대리인은 언제든지 온라인으로 기록을 열람할 수 있습니다.</li>
                        <li>• 기록 열람 및 출력은 무료입니다.</li>
                        <li>• 보안을 위해 기록 다운로드 시 워터마크가 포함됩니다.</li>
                        <li>• USB를 이용한 기록 수령은 법원 방문 시 가능합니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
