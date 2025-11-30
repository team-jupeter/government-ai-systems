const Dashboard = () => {
    const stats = [
        { icon: 'fas fa-book', label: '수강 과목', value: '12', color: 'blue' },
        { icon: 'fas fa-clock', label: '학습 시간', value: '156h', color: 'green' },
        { icon: 'fas fa-trophy', label: '평균 학점', value: '4.2', color: 'yellow' },
        { icon: 'fas fa-certificate', label: '취득 학점', value: '89', color: 'purple' }
    ];

    const recentCourses = [
        { name: 'AI 기초', progress: 75, professor: '김교수', nextClass: '월 14:00' },
        { name: '데이터 과학', progress: 60, professor: '이교수', nextClass: '화 10:00' },
        { name: '머신러닝', progress: 45, professor: '박교수', nextClass: '수 16:00' }
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h2>
                <p className="text-gray-600">오늘도 즐거운 학습 되세요! 😊</p>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 card-hover">
                        <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                            <i className={`${stat.icon} text-2xl text-${stat.color}-600`}></i>
                        </div>
                        <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* 최근 강의 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <i className="fas fa-book-reader text-blue-600 mr-2"></i>
                    진행 중인 강의
                </h3>
                <div className="space-y-4">
                    {recentCourses.map((course, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-gray-900">{course.name}</h4>
                                    <p className="text-sm text-gray-600">{course.professor} | 다음 수업: {course.nextClass}</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {course.progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{width: `${course.progress}%`}}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
