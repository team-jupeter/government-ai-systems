const Navigation = ({ currentPage, onNavigate }) => {
    const menuItems = [
        { id: 'dashboard', icon: 'fas fa-home', label: '대시보드' },
        { id: 'mylearning', icon: 'fas fa-book-open', label: '내 학습' },
        { id: 'courses', icon: 'fas fa-graduation-cap', label: '강의 목록' },
        { id: 'professor', icon: 'fas fa-chalkboard-teacher', label: 'AI 교수' },
        { id: 'exam', icon: 'fas fa-file-alt', label: '시험센터' },
        { id: 'grade', icon: 'fas fa-chart-line', label: '성적표' },
        { id: 'career', icon: 'fas fa-briefcase', label: '진로추천' },
        { id: 'thesis', icon: 'fas fa-pen-fancy', label: '논문도우미' },
        { id: 'community', icon: 'fas fa-users', label: '커뮤니티' },
        { id: 'vault', icon: 'fas fa-shield-alt', label: '개인금고' }
    ];

    return (
        <nav className="sidebar">
            <div className="p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                currentPage === item.id
                                    ? 'bg-blue-600 text-gray-900 shadow-md'
                                    : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            <i className={`${item.icon} text-lg`}></i>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};
