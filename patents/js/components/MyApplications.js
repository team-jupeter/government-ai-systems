// MyApplications 컴포넌트 - 내 출원 목록/상태 관리
const MyApplications = () => {
    const [filter, setFilter] = useState('all'); // all, pending, progress, complete, rejected
    const [sortBy, setSortBy] = useState('date'); // date, status, type
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);

    const applications = [
        {
            id: 'KR10-2025-0001234',
            title: '오픈해시 기반 데이터 무결성 검증 시스템',
            type: 'patent',
            typeName: '특허',
            typeIcon: '💡',
            status: 'progress',
            statusName: '심사중',
            filingDate: '2025-11-15',
            examiner: '기술심사1팀',
            claims: 12,
            aiPrediction: 87,
            actualResult: null,
            openHashTimestamp: 'OH_7X9K2M4N8P1Q3R5T',
            fees: { filing: 46000, examination: 187000, total: 233000, paid: true },
            timeline: [
                { date: '2025-11-15', event: '출원', status: 'complete' },
                { date: '2025-11-16', event: '방식심사', status: 'complete' },
                { date: '2025-11-20', event: '출원공개', status: 'complete' },
                { date: '2025-11-25', event: '심사청구', status: 'complete' },
                { date: '진행중', event: '실체심사', status: 'progress' },
                { date: '-', event: '등록결정', status: 'pending' }
            ]
        },
        {
            id: 'KR10-2025-0001122',
            title: 'AI 에이전트 기반 문서 자동 분류 방법',
            type: 'patent',
            typeName: '특허',
            typeIcon: '💡',
            status: 'complete',
            statusName: '등록완료',
            filingDate: '2025-10-20',
            registrationDate: '2025-11-25',
            examiner: '기술심사2팀',
            claims: 15,
            aiPrediction: 92,
            actualResult: 'granted',
            openHashTimestamp: 'OH_A2B4C6D8E1F3G5H7',
            fees: { filing: 46000, examination: 203000, registration: 120000, total: 369000, paid: true },
            timeline: [
                { date: '2025-10-20', event: '출원', status: 'complete' },
                { date: '2025-10-21', event: '방식심사', status: 'complete' },
                { date: '2025-10-25', event: '출원공개', status: 'complete' },
                { date: '2025-10-28', event: '심사청구', status: 'complete' },
                { date: '2025-11-20', event: '실체심사', status: 'complete' },
                { date: '2025-11-25', event: '등록결정', status: 'complete' }
            ]
        },
        {
            id: 'KR40-2025-0000567',
            title: '스마트 IoT 디바이스 외관',
            type: 'design',
            typeName: '디자인',
            typeIcon: '🎨',
            status: 'pending',
            statusName: '심사대기',
            filingDate: '2025-11-22',
            examiner: null,
            claims: 1,
            aiPrediction: 78,
            actualResult: null,
            openHashTimestamp: 'OH_J9K1L3M5N7P2Q4R6',
            fees: { filing: 45000, examination: 70000, total: 115000, paid: true },
            timeline: [
                { date: '2025-11-22', event: '출원', status: 'complete' },
                { date: '2025-11-23', event: '방식심사', status: 'complete' },
                { date: '-', event: '실체심사', status: 'pending' },
                { date: '-', event: '등록결정', status: 'pending' }
            ]
        },
        {
            id: 'KR10-2025-0000890',
            title: '블록체인 기반 전자투표 시스템',
            type: 'patent',
            typeName: '특허',
            typeIcon: '💡',
            status: 'rejected',
            statusName: '거절결정',
            filingDate: '2025-09-10',
            rejectionDate: '2025-11-15',
            examiner: '기술심사3팀',
            claims: 8,
            aiPrediction: 65,
            actualResult: 'rejected',
            rejectionReasons: ['진보성 결여 (제29조 제2항)', '명세서 기재불비 (제42조 제3항)'],
            openHashTimestamp: 'OH_M1N3P5Q7R9S2T4U6',
            fees: { filing: 46000, examination: 143000, total: 189000, paid: true },
            timeline: [
                { date: '2025-09-10', event: '출원', status: 'complete' },
                { date: '2025-09-11', event: '방식심사', status: 'complete' },
                { date: '2025-09-15', event: '출원공개', status: 'complete' },
                { date: '2025-09-20', event: '심사청구', status: 'complete' },
                { date: '2025-10-30', event: '의견제출통지', status: 'complete' },
                { date: '2025-11-15', event: '거절결정', status: 'rejected' }
            ]
        },
        {
            id: 'KR41-2025-0000345',
            title: 'OpenHash 로고 상표',
            type: 'trademark',
            typeName: '상표',
            typeIcon: '™️',
            status: 'complete',
            statusName: '등록완료',
            filingDate: '2025-08-15',
            registrationDate: '2025-10-20',
            examiner: '상표심사팀',
            claims: 1,
            aiPrediction: 95,
            actualResult: 'granted',
            openHashTimestamp: null,
            fees: { filing: 62000, registration: 211000, total: 273000, paid: true },
            timeline: [
                { date: '2025-08-15', event: '출원', status: 'complete' },
                { date: '2025-08-16', event: '방식심사', status: 'complete' },
                { date: '2025-09-20', event: '실체심사', status: 'complete' },
                { date: '2025-10-20', event: '등록결정', status: 'complete' }
            ]
        }
    ];

    const statusFilters = [
        { id: 'all', label: '전체', count: applications.length },
        { id: 'pending', label: '심사대기', count: applications.filter(a => a.status === 'pending').length },
        { id: 'progress', label: '심사중', count: applications.filter(a => a.status === 'progress').length },
        { id: 'complete', label: '등록완료', count: applications.filter(a => a.status === 'complete').length },
        { id: 'rejected', label: '거절', count: applications.filter(a => a.status === 'rejected').length }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            pending: { class: 'bg-yellow-100 text-yellow-700', icon: '⏳' },
            progress: { class: 'bg-blue-100 text-blue-700', icon: '🔄' },
            complete: { class: 'bg-green-100 text-green-700', icon: '✅' },
            rejected: { class: 'bg-red-100 text-red-700', icon: '❌' }
        };
        return badges[status] || badges.pending;
    };

    const filteredApplications = applications.filter(app => {
        if (filter !== 'all' && app.status !== filter) return false;
        if (searchQuery && !app.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !app.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const getPredictionAccuracy = (prediction, actual) => {
        if (!actual) return null;
        if (actual === 'granted' && prediction >= 70) return { accurate: true, diff: 0 };
        if (actual === 'rejected' && prediction < 70) return { accurate: true, diff: 0 };
        return { accurate: false, diff: actual === 'granted' ? prediction - 100 : prediction };
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        내 출원 목록
                    </h2>
                    <p className="text-gray-500">출원 현황 및 진행 상태를 확인합니다</p>
                </div>
                <button className="btn-kipo text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <i className="fas fa-plus"></i>
                    새 출원
                </button>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-5 gap-4">
                {statusFilters.map(sf => (
                    <button
                        key={sf.id}
                        onClick={() => setFilter(sf.id)}
                        className={`p-4 rounded-xl transition ${
                            filter === sf.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <div className="text-2xl font-bold">{sf.count}</div>
                        <div className={`text-sm ${filter === sf.id ? 'text-blue-200' : 'text-gray-500'}`}>{sf.label}</div>
                    </button>
                ))}
            </div>

            {/* 검색 및 정렬 */}
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 pl-10 w-64"
                            placeholder="출원번호 또는 명칭 검색"
                        />
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">정렬:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="date">출원일순</option>
                        <option value="status">상태순</option>
                        <option value="type">유형순</option>
                    </select>
                </div>
            </div>

            {/* 출원 목록 */}
            <div className="grid grid-cols-3 gap-6">
                {/* 좌측: 목록 */}
                <div className="col-span-2 space-y-3">
                    {filteredApplications.map((app, idx) => {
                        const badge = getStatusBadge(app.status);
                        const accuracy = getPredictionAccuracy(app.aiPrediction, app.actualResult);
                        
                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedApp(app)}
                                className={`bg-white rounded-xl p-5 shadow-sm cursor-pointer transition hover:shadow-md ${
                                    selectedApp?.id === app.id ? 'ring-2 ring-blue-500' : ''
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xl">{app.typeIcon}</span>
                                            <span className="font-mono text-sm text-gray-500">{app.id}</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge.class}`}>
                                                {badge.icon} {app.statusName}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-gray-800 mb-2">{app.title}</h4>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span><i className="fas fa-calendar mr-1"></i>출원: {app.filingDate}</span>
                                            <span><i className="fas fa-list-ol mr-1"></i>청구항: {app.claims}개</span>
                                            {app.openHashTimestamp && (
                                                <span className="text-yellow-600">
                                                    <i className="fas fa-link mr-1"></i>오픈해시
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 mb-1">AI 예측</div>
                                        <div className={`text-2xl font-bold ${
                                            app.aiPrediction >= 80 ? 'text-green-600' :
                                            app.aiPrediction >= 60 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                            {app.aiPrediction}%
                                        </div>
                                        {accuracy && (
                                            <div className={`text-xs ${accuracy.accurate ? 'text-green-600' : 'text-red-600'}`}>
                                                {accuracy.accurate ? '✓ 예측 정확' : '✗ 예측 오차'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 우측: 상세 정보 */}
                <div className="col-span-1">
                    {selectedApp ? (
                        <div className="bg-white rounded-xl p-5 shadow-sm sticky top-[160px] space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-gray-800">출원 상세</h4>
                                <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-500">출원번호</span>
                                    <div className="font-mono font-medium">{selectedApp.id}</div>
                                </div>
                                <div>
                                    <span className="text-gray-500">발명의 명칭</span>
                                    <div className="font-medium">{selectedApp.title}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="text-gray-500">유형</span>
                                        <div>{selectedApp.typeIcon} {selectedApp.typeName}</div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">청구항</span>
                                        <div>{selectedApp.claims}개</div>
                                    </div>
                                </div>
                                {selectedApp.examiner && (
                                    <div>
                                        <span className="text-gray-500">심사관</span>
                                        <div>{selectedApp.examiner}</div>
                                    </div>
                                )}
                            </div>

                            {/* 타임라인 */}
                            <div>
                                <h5 className="font-medium text-gray-700 mb-2">진행 상태</h5>
                                <div className="space-y-2">
                                    {selectedApp.timeline.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${
                                                item.status === 'complete' ? 'bg-green-500' :
                                                item.status === 'progress' ? 'bg-blue-500 animate-pulse' :
                                                item.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'
                                            }`}></div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{item.event}</div>
                                                <div className="text-xs text-gray-500">{item.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 거절 사유 */}
                            {selectedApp.rejectionReasons && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <h5 className="font-medium text-red-800 mb-2">거절 사유</h5>
                                    <ul className="space-y-1">
                                        {selectedApp.rejectionReasons.map((reason, idx) => (
                                            <li key={idx} className="text-sm text-red-700">• {reason}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 오픈해시 */}
                            {selectedApp.openHashTimestamp && (
                                <div className="bg-gray-900 text-white rounded-lg p-3">
                                    <div className="text-xs text-yellow-400 mb-1">⛓️ 오픈해시 타임스탬프</div>
                                    <div className="font-mono text-sm">{selectedApp.openHashTimestamp}</div>
                                </div>
                            )}

                            {/* 수수료 */}
                            <div className="bg-gray-50 rounded-lg p-3">
                                <h5 className="font-medium text-gray-700 mb-2">납부 수수료</h5>
                                <div className="flex justify-between text-sm">
                                    <span>총액</span>
                                    <span className="font-medium">{selectedApp.fees.total.toLocaleString()}원</span>
                                </div>
                                <div className={`text-xs mt-1 ${selectedApp.fees.paid ? 'text-green-600' : 'text-red-600'}`}>
                                    {selectedApp.fees.paid ? '✓ 납부 완료' : '미납'}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl p-8 text-center">
                            <i className="fas fa-mouse-pointer text-4xl text-gray-400 mb-3"></i>
                            <p className="text-gray-500 text-sm">출원을 선택하여<br/>상세 정보를 확인하세요</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
