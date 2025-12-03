const DraftDocuments = () => {
    const [drafts, setDrafts] = React.useState([
        {
            id: 'D2025-001',
            type: '소장',
            caseType: '손해배상(기)',
            title: '손해배상 청구의 소',
            savedAt: '2025-11-26 14:32',
            progress: 75,
            plaintiff: '홍길동',
            defendant: '(주)ABC',
            claimAmount: 50000000,
            status: 'editing'
        },
        {
            id: 'D2025-002',
            type: '준비서면',
            caseType: '2025가합12345',
            title: '준비서면(1)',
            savedAt: '2025-11-25 09:15',
            progress: 45,
            status: 'editing'
        },
        {
            id: 'D2025-003',
            type: '답변서',
            caseType: '2025가합67890',
            title: '답변서',
            savedAt: '2025-11-24 16:48',
            progress: 90,
            status: 'ready'
        }
    ]);
    const [selectedDraft, setSelectedDraft] = React.useState(null);

    const getTypeIcon = (type) => {
        const icons = {
            '소장': 'fa-file-signature',
            '답변서': 'fa-reply',
            '준비서면': 'fa-file-contract',
            '증거신청서': 'fa-search',
            '항소장': 'fa-level-up-alt'
        };
        return icons[type] || 'fa-file-alt';
    };

    const getStatusBadge = (status) => {
        if (status === 'ready') {
            return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">제출 가능</span>;
        }
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">작성 중</span>;
    };

    const deleteDraft = (id) => {
        if (confirm('임시저장된 서류를 삭제하시겠습니까?')) {
            setDrafts(drafts.filter(d => d.id !== id));
        }
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold">
                            <i className="fas fa-edit mr-2 text-blue-600"></i>작성중 서류
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">임시저장된 서류를 확인하고 계속 작성할 수 있습니다.</p>
                    </div>
                    <div className="text-sm text-gray-500">
                        총 <strong className="text-blue-600">{drafts.length}건</strong>
                    </div>
                </div>

                {drafts.length === 0 ? (
                    <div className="text-center py-12">
                        <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500">작성중인 서류가 없습니다.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {drafts.map(draft => (
                            <div 
                                key={draft.id} 
                                className={`border rounded-lg p-5 transition cursor-pointer hover:shadow-md ${
                                    selectedDraft?.id === draft.id ? 'border-blue-500 bg-blue-50' : ''
                                }`}
                                onClick={() => setSelectedDraft(draft)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <i className={`fas ${getTypeIcon(draft.type)} text-blue-600 text-xl`}></i>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold">{draft.title}</span>
                                                {getStatusBadge(draft.status)}
                                            </div>
                                            <div className="text-sm text-gray-500 space-x-3">
                                                <span><i className="fas fa-tag mr-1"></i>{draft.type}</span>
                                                <span><i className="fas fa-folder mr-1"></i>{draft.caseType}</span>
                                                <span><i className="fas fa-clock mr-1"></i>{draft.savedAt}</span>
                                            </div>
                                            {draft.claimAmount && (
                                                <div className="text-sm text-blue-600 mt-1">
                                                    청구금액: ₩{draft.claimAmount.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-2">작성률</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${
                                                        draft.progress >= 90 ? 'bg-green-500' : 
                                                        draft.progress >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                                                    }`}
                                                    style={{ width: `${draft.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="font-bold text-sm">{draft.progress}%</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedDraft?.id === draft.id && (
                                    <div className="mt-4 pt-4 border-t flex justify-end gap-3">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); deleteDraft(draft.id); }}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                                        >
                                            <i className="fas fa-trash mr-2"></i>삭제
                                        </button>
                                        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                            <i className="fas fa-copy mr-2"></i>복사
                                        </button>
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                                            <i className="fas fa-edit mr-2"></i>계속 작성
                                        </button>
                                        {draft.status === 'ready' && (
                                            <button className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                                <i className="fas fa-paper-plane mr-2"></i>제출하기
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">
                        <i className="fas fa-info-circle mr-2"></i>임시저장 안내
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 작성 중인 서류는 자동으로 임시저장됩니다.</li>
                        <li>• 임시저장된 서류는 30일간 보관됩니다.</li>
                        <li>• 제출 전까지 언제든지 수정할 수 있습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
