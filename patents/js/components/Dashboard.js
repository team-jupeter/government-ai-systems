// Dashboard 컴포넌트 - 메인 대시보드
const Dashboard = ({ onNavigate }) => {
    const [stats, setStats] = useState({
        totalApplications: 2847,
        pendingReview: 156,
        approved: 2584,
        rejected: 107,
        aiAccuracy: 94.7,
        avgProcessTime: 3.2
    });

    // 최근 활동 데이터
    const recentActivities = [
        { id: 1, type: 'patent', title: 'AI 기반 문서 자동 분류 시스템', status: 'progress', date: '2025-11-27', probability: 87 },
        { id: 2, type: 'trademark', title: 'OpenHash 로고 상표', status: 'complete', date: '2025-11-26', probability: 95 },
        { id: 3, type: 'design', title: '스마트 IoT 디바이스 외관', status: 'pending', date: '2025-11-25', probability: 78 },
        { id: 4, type: 'utility', title: '에너지 절감형 냉각 장치', status: 'progress', date: '2025-11-24', probability: 82 }
    ];

    // IP 유형별 통계
    const ipTypeStats = [
        { type: 'patent', name: '특허', icon: '💡', count: 1245, growth: 12.5 },
        { type: 'utility', name: '실용신안', icon: '🔧', count: 456, growth: 8.3 },
        { type: 'design', name: '디자인', icon: '🎨', count: 678, growth: 15.2 },
        { type: 'trademark', name: '상표', icon: '™️', count: 468, growth: 6.7 }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            pending: { class: 'status-pending', label: '심사대기', icon: '⏳' },
            progress: { class: 'status-progress', label: '심사중', icon: '🔄' },
            complete: { class: 'status-complete', label: '등록완료', icon: '✅' },
            rejected: { class: 'status-rejected', label: '거절', icon: '❌' }
        };
        return badges[status] || badges.pending;
    };

    return (
        <div className="space-y-6 pt-[140px]">
            {/* 페이지 타이틀 */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">대시보드</h2>
                    <p className="text-gray-500">AI 전자출원 시스템 현황</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onNavigate('application', 'patent')}
                        className="btn-kipo text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <i className="fas fa-plus"></i>
                        새 출원
                    </button>
                </div>
            </div>

            {/* 주요 통계 카드 */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm card-hover border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">총 출원</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.totalApplications.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-file-alt text-blue-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2"><i className="fas fa-arrow-up"></i> 12.5% 증가</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm card-hover border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">심사 대기</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.pendingReview}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-clock text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">평균 {stats.avgProcessTime}일 소요</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm card-hover border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">등록 완료</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.approved.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-check-circle text-green-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-xs text-green-600 mt-2">등록률 {((stats.approved / stats.totalApplications) * 100).toFixed(1)}%</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm card-hover border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">AI 예측 정확도</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.aiAccuracy}%</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-brain text-purple-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">Claude AI 기반</p>
                </div>
            </div>

            {/* 오픈해시 우선권 배너 */}
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl">⛓️</div>
                        <div>
                            <h3 className="text-xl font-bold text-yellow-400">오픈해시 우선권 증명</h3>
                            <p className="text-gray-300">선출원주의 시대, 출원 시각을 기술적으로 증명합니다</p>
                            <p className="text-sm text-gray-400 mt-1">글로벌 지식재산권 우선권 주장에 이상적인 타임스탬프 기술</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-yellow-400">98.5%</div>
                        <div className="text-sm text-gray-300">에너지 절감</div>
                        <button 
                            onClick={() => onNavigate('openhash-timestamp')}
                            className="mt-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold transition"
                        >
                            우선권 등록하기 →
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* IP 유형별 현황 */}
                <div className="col-span-1 bg-white rounded-xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-chart-pie text-blue-600"></i>
                        유형별 출원 현황
                    </h3>
                    <div className="space-y-3">
                        {ipTypeStats.map(item => (
                            <div 
                                key={item.type}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                                onClick={() => onNavigate('application', item.type)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <div className="font-medium text-gray-800">{item.name}</div>
                                        <div className="text-xs text-gray-500">{item.count}건</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-green-600 text-sm">+{item.growth}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => onNavigate('application', 'patent')}
                        className="w-full mt-4 btn-kipo text-white py-2 rounded-lg text-sm"
                    >
                        새 출원 시작하기
                    </button>
                </div>

                {/* 최근 활동 */}
                <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <i className="fas fa-history text-blue-600"></i>
                        최근 출원 활동
                    </h3>
                    <div className="space-y-3">
                        {recentActivities.map(activity => {
                            const badge = getStatusBadge(activity.status);
                            return (
                                <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl">
                                            {activity.type === 'patent' && '💡'}
                                            {activity.type === 'utility' && '🔧'}
                                            {activity.type === 'design' && '🎨'}
                                            {activity.type === 'trademark' && '™️'}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">{activity.title}</div>
                                            <div className="text-xs text-gray-500">{activity.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-sm text-gray-600">등록 예측</div>
                                            <div className={`font-bold ${activity.probability >= 80 ? 'text-green-600' : activity.probability >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {activity.probability}%
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                                            {badge.icon} {badge.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button 
                        onClick={() => onNavigate('management', 'my-applications')}
                        className="w-full mt-4 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                    >
                        전체 출원 목록 보기 →
                    </button>
                </div>
            </div>

            {/* 빠른 서비스 */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-bolt text-yellow-500"></i>
                    빠른 서비스
                </h3>
                <div className="grid grid-cols-6 gap-4">
                    {[
                        { icon: '🔍', label: '선행기술 조사', menu: 'research', sub: 'prior-art' },
                        { icon: '📊', label: '등록 예측', menu: 'research', sub: 'probability' },
                        { icon: '🌐', label: '국제 사례', menu: 'research', sub: 'global-cases' },
                        { icon: '📈', label: '시장 분석', menu: 'business', sub: 'market-analysis' },
                        { icon: '🏢', label: '사업화 지원', menu: 'business', sub: 'business-support' },
                        { icon: '⛓️', label: '우선권 증명', menu: 'openhash-timestamp', sub: null }
                    ].map((service, idx) => (
                        <button 
                            key={idx}
                            onClick={() => onNavigate(service.menu, service.sub)}
                            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent transition card-hover"
                        >
                            <span className="text-3xl">{service.icon}</span>
                            <span className="text-sm text-gray-700">{service.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 시스템 안내 */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <i className="fas fa-robot"></i>
                        AI 변리사 서비스
                    </h4>
                    <p className="text-sm text-blue-700">
                        Claude AI가 출원서 작성, 청구항 생성, 선행기술 조사를 대신 수행합니다. 
                        최종 결정은 항상 사람이 합니다.
                    </p>
                    <button 
                        onClick={() => onNavigate('ai-consultation')}
                        className="mt-3 text-blue-600 text-sm font-medium hover:underline"
                    >
                        AI 상담 시작하기 →
                    </button>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                    <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                        <i className="fas fa-gavel"></i>
                        제도 개선 피드백
                    </h4>
                    <p className="text-sm text-purple-700">
                        AI 예측과 실제 결과가 현저히 다르다면, 관련 심사 프로세스 개선을 위한 
                        입법 제안을 자동 생성합니다.
                    </p>
                    <button 
                        onClick={() => onNavigate('legislation')}
                        className="mt-3 text-purple-600 text-sm font-medium hover:underline"
                    >
                        제도개선 제안 보기 →
                    </button>
                </div>
            </div>
        </div>
    );
};
