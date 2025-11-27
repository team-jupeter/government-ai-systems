const ElectronicService = () => {
    const [filter, setFilter] = React.useState('all');
    const [documents, setDocuments] = React.useState([
        {
            id: 'S2025-001',
            caseNumber: '2025가합12345',
            title: '준비서면',
            sender: '피고 (주)ABC',
            sentAt: '2025-11-27 09:30',
            confirmedAt: null,
            deadline: '2025-12-04',
            status: 'unread',
            urgent: true
        },
        {
            id: 'S2025-002',
            caseNumber: '2025가합12345',
            title: '변론기일통지서',
            sender: '서울중앙지방법원',
            sentAt: '2025-11-26 14:00',
            confirmedAt: '2025-11-26 15:23',
            deadline: null,
            status: 'read',
            urgent: false
        },
        {
            id: 'S2025-003',
            caseNumber: '2025나56789',
            title: '판결문',
            sender: '제주지방법원',
            sentAt: '2025-11-25 10:00',
            confirmedAt: '2025-11-25 11:45',
            deadline: null,
            status: 'read',
            urgent: false
        },
        {
            id: 'S2025-004',
            caseNumber: '2025가합12345',
            title: '증거신청서',
            sender: '피고 (주)ABC',
            sentAt: '2025-11-24 16:30',
            confirmedAt: '2025-11-24 18:00',
            deadline: null,
            status: 'read',
            urgent: false
        }
    ]);

    const filteredDocs = documents.filter(d => {
        if (filter === 'unread') return d.status === 'unread';
        if (filter === 'read') return d.status === 'read';
        return true;
    });

    const confirmDocument = (id) => {
        setDocuments(documents.map(d => 
            d.id === id ? { ...d, status: 'read', confirmedAt: new Date().toLocaleString('ko-KR') } : d
        ));
    };

    const unreadCount = documents.filter(d => d.status === 'unread').length;

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold">
                                <i className="fas fa-inbox mr-2 text-blue-600"></i>전자송달
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                온라인으로 송달받은 문서를 확인합니다.
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                미확인 문서 <strong>{unreadCount}건</strong>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mb-6">
                        {[
                            { key: 'all', label: '전체' },
                            { key: 'unread', label: '미확인' },
                            { key: 'read', label: '확인완료' }
                        ].map(f => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filter === f.key 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <i className="fas fa-exclamation-triangle text-yellow-500 mt-0.5"></i>
                            <div className="text-sm text-yellow-800">
                                <strong>송달 간주 안내:</strong> 전자문서 등재 사실 통지 후 <strong>7일</strong>이 지나면 
                                송달된 것으로 간주됩니다. 미확인 문서를 반드시 확인해 주세요.
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredDocs.map(doc => (
                            <div 
                                key={doc.id}
                                className={`border rounded-lg p-5 transition ${
                                    doc.status === 'unread' 
                                        ? 'bg-blue-50 border-blue-300' 
                                        : 'bg-white hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            doc.status === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            <i className={`fas ${doc.status === 'unread' ? 'fa-envelope' : 'fa-envelope-open'}`}></i>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                {doc.urgent && (
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">긴급</span>
                                                )}
                                                <span className="font-bold">{doc.title}</span>
                                                {doc.status === 'unread' && (
                                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500 space-x-3">
                                                <span><i className="fas fa-folder mr-1"></i>{doc.caseNumber}</span>
                                                <span><i className="fas fa-user mr-1"></i>{doc.sender}</span>
                                                <span><i className="fas fa-clock mr-1"></i>{doc.sentAt}</span>
                                            </div>
                                            {doc.deadline && (
                                                <div className="text-sm text-red-600 mt-1">
                                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                                    송달간주일: {doc.deadline}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {doc.status === 'read' ? (
                                            <span className="text-sm text-green-600">
                                                <i className="fas fa-check-circle mr-1"></i>
                                                {doc.confirmedAt} 확인
                                            </span>
                                        ) : (
                                            <button 
                                                onClick={() => confirmDocument(doc.id)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                            >
                                                <i className="fas fa-eye mr-2"></i>확인하기
                                            </button>
                                        )}
                                        <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                            <i className="fas fa-download"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredDocs.length === 0 && (
                        <div className="text-center py-12">
                            <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                            <p className="text-gray-500">해당하는 송달문서가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
