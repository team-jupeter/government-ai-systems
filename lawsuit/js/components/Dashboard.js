const Dashboard = ({ subMenu }) => {
    const [cases, setCases] = React.useState([
        {
            id: '2025가합12345',
            type: '민사',
            title: '손해배상(기) 청구',
            court: '서울중앙지방법원',
            role: '원고',
            status: 'progress',
            statusText: '변론준비',
            nextDate: '2025-12-15',
            nextEvent: '변론준비기일',
            aiProgress: 78,
            amount: 50000000,
        },
        {
            id: '2025나56789',
            type: '민사',
            title: '임대차보증금 반환',
            court: '서울고등법원',
            role: '피고',
            status: 'pending',
            statusText: '답변서 제출 대기',
            nextDate: '2025-12-20',
            nextEvent: '답변서 제출기한',
            aiProgress: 45,
            amount: 120000000,
        },
    ]);
    
    const notifications = [
        { id: 1, type: 'delivery', title: '소장 부본 송달 완료', date: '2025-11-26', caseId: '2025가합12345' },
        { id: 2, type: 'schedule', title: '변론준비기일 지정', date: '2025-11-25', caseId: '2025가합12345' },
        { id: 3, type: 'document', title: '준비서면 접수 확인', date: '2025-11-24', caseId: '2025나56789' },
    ];
    
    const schedules = [
        { date: '2025-12-15', time: '14:00', event: '변론준비기일', court: '서울중앙지방법원 501호', caseId: '2025가합12345' },
        { date: '2025-12-20', time: '10:00', event: '답변서 제출기한', court: '-', caseId: '2025나56789' },
        { date: '2026-01-10', time: '11:00', event: '변론기일', court: '서울고등법원 301호', caseId: '2025나56789' },
    ];
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'progress': return 'status-progress';
            case 'pending': return 'status-pending';
            case 'complete': return 'status-complete';
            case 'rejected': return 'status-rejected';
            default: return 'bg-gray-100 text-gray-600';
        }
    };
    
    // 사건 현황 개요
    const Overview = () => (
        <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border card-hover">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">진행중 사건</p>
                            <p className="text-3xl font-bold text-blue-600">2</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-folder-open text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border card-hover">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">다가오는 기일</p>
                            <p className="text-3xl font-bold text-orange-600">3</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-calendar-alt text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border card-hover">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">AI 작성 서류</p>
                            <p className="text-3xl font-bold text-green-600">12</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-file-alt text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border card-hover">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">절감 비용</p>
                            <p className="text-3xl font-bold text-purple-600">₩4.5M</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-piggy-bank text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 최근 사건 */}
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold text-lg"><i className="fas fa-briefcase mr-2 text-blue-600"></i>나의 사건</h3>
                    <button className="text-blue-600 text-sm hover:underline">전체 보기 →</button>
                </div>
                <div className="divide-y">
                    {cases.map(c => (
                        <div key={c.id} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(c.status)}`}>
                                            {c.statusText}
                                        </span>
                                        <span className="text-sm text-gray-500">{c.id}</span>
                                        <span className="px-2 py-0.5 bg-gray-200 rounded text-xs">{c.type}</span>
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{c.role}</span>
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-1">{c.title}</h4>
                                    <p className="text-sm text-gray-500">
                                        <i className="fas fa-university mr-1"></i>{c.court}
                                        <span className="mx-2">|</span>
                                        <i className="fas fa-won-sign mr-1"></i>{c.amount.toLocaleString()}원
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">다음 일정</p>
                                    <p className="font-medium text-orange-600">{c.nextDate}</p>
                                    <p className="text-xs text-gray-400">{c.nextEvent}</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                    <span>AI 진행률</span>
                                    <span>{c.aiProgress}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                                        style={{ width: `${c.aiProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 알림 및 일정 */}
            <div className="grid grid-cols-2 gap-6">
                {/* 최근 알림 */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-4 border-b">
                        <h3 className="font-bold"><i className="fas fa-bell mr-2 text-yellow-500"></i>최근 알림</h3>
                    </div>
                    <div className="divide-y">
                        {notifications.map(n => (
                            <div key={n.id} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        n.type === 'delivery' ? 'bg-green-100' : 
                                        n.type === 'schedule' ? 'bg-blue-100' : 'bg-gray-100'
                                    }`}>
                                        <i className={`fas ${
                                            n.type === 'delivery' ? 'fa-envelope-open text-green-600' :
                                            n.type === 'schedule' ? 'fa-calendar text-blue-600' : 'fa-file text-gray-600'
                                        } text-sm`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{n.title}</p>
                                        <p className="text-xs text-gray-500">{n.caseId} · {n.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* 다가오는 일정 */}
                <div className="bg-white rounded-xl shadow-sm border">
                    <div className="p-4 border-b">
                        <h3 className="font-bold"><i className="fas fa-calendar-alt mr-2 text-blue-500"></i>다가오는 일정</h3>
                    </div>
                    <div className="divide-y">
                        {schedules.map((s, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-blue-600">{s.date.split('-')[2]}</p>
                                        <p className="text-xs text-gray-500">{s.date.split('-')[1]}월</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{s.event}</p>
                                        <p className="text-xs text-gray-500">{s.time} · {s.court}</p>
                                        <p className="text-xs text-gray-400">{s.caseId}</p>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-300"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
    // 서브메뉴에 따른 컴포넌트 렌더링
    const renderContent = () => {
        switch(subMenu) {
            case 'overview':
            default:
                return <Overview />;
            case 'cases':
                return <Overview />;
            case 'schedule':
                return (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-bold text-lg mb-4"><i className="fas fa-calendar-alt mr-2"></i>기일 관리</h3>
                        <p className="text-gray-500">캘린더 뷰가 여기에 표시됩니다.</p>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-bold text-lg mb-4"><i className="fas fa-bell mr-2"></i>송달/통지 센터</h3>
                        <p className="text-gray-500">모든 알림이 여기에 표시됩니다.</p>
                    </div>
                );
        }
    };
    
    return (
        <div className="flex-1 p-6">
            {renderContent()}
        </div>
    );
};
