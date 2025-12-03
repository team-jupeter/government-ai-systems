const Navigation = ({ currentPage, onNavigate, isOpen, onClose }) => {
    const menuItems = [
        { 
            section: '홈',
            items: [
                { id: 'dashboard', icon: 'fa-home', label: '대시보드' }
            ]
        },
        {
            section: '📚 학습',
            items: [
                { id: 'courses', icon: 'fa-book-open', label: '강좌 탐색' },
                { id: 'my-learning', icon: 'fa-graduation-cap', label: '내 강좌' },
                { id: 'exam', icon: 'fa-clipboard-check', label: '시험 센터' },
                { id: 'grades', icon: 'fa-chart-line', label: '성적/분석' }
            ]
        },
        {
            section: '🎓 졸업',
            items: [
                { id: 'thesis', icon: 'fa-file-alt', label: '논문 작성' },
                { id: 'graduation', icon: 'fa-award', label: '졸업 현황' }
            ]
        },
        {
            section: '💼 진로',
            items: [
                { id: 'career', icon: 'fa-compass', label: '직업 추천' },
                { id: 'jobs', icon: 'fa-briefcase', label: '취업 정보' },
                { id: 'aptitude', icon: 'fa-clipboard-list', label: '적성 보고서' }
            ]
        },
        {
            section: '👥 커뮤니티',
            items: [
                { id: 'community', icon: 'fa-users', label: '학습 커뮤니티' },
                { id: 'study-group', icon: 'fa-user-friends', label: '스터디 그룹' }
            ]
        },
        {
            section: '🔐 개인 금고',
            items: [
                { id: 'pdv', icon: 'fa-vault', label: '내 정보 금고' },
                { id: 'credentials', icon: 'fa-certificate', label: '인증서 발급' }
            ]
        }
    ];
    
    return (
        <>
            {/* 모바일 오버레이 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            
            {/* 사이드바 - 항상 fixed, 280px 너비 */}
            <nav 
                className="fixed top-16 left-0 bg-gray-800 border-r border-gray-700 z-30 overflow-y-auto"
                style={{ width: '280px', height: 'calc(100vh - 64px)' }}
            >
                <div className="p-4">
                    {menuItems.map((section, sectionIdx) => (
                        <div key={sectionIdx} className="mb-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                                {section.section}
                            </h3>
                            <ul className="space-y-1">
                                {section.items.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => {
                                                onNavigate(item.id);
                                                if (onClose) onClose();
                                            }}
                                            className={`
                                                menu-item w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left
                                                ${currentPage === item.id 
                                                    ? 'active text-yellow-400' 
                                                    : 'text-gray-300 hover:text-white'}
                                            `}
                                        >
                                            <i className={`fas ${item.icon} w-5 text-center`}></i>
                                            <span className="text-sm">{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                {/* 하단 정보 */}
                <div className="p-4 border-t border-gray-700">
                    <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                            <i className="fas fa-shield-alt text-yellow-400"></i>
                            <span className="text-sm font-medium">OpenHash 인증</span>
                        </div>
                        <p className="text-xs text-gray-500">
                            모든 학습 기록은 오픈해시 체인에 안전하게 기록됩니다.
                        </p>
                    </div>
                </div>
            </nav>
        </>
    );
};
