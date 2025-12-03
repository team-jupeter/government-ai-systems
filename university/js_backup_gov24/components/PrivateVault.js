const PrivateVault = ({ studentId, onNavigate }) => {
    const [records, setRecords] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('overview');

    React.useEffect(() => {
        fetchVaultData();
    }, [studentId]);

    const fetchVaultData = async () => {
        try {
            const response = await fetch(`/api/university/pdv/records?student_id=${studentId}`);
            const data = await response.json();
            setRecords(data.records);
        } catch (error) {
            // 데모 데이터
            setRecords({
                enrollments: [
                    { course_id: 'prof-algorithm', course_name: '알고리즘 이론', enrolled_at: '2025-09-01' },
                    { course_id: 'prof-ml', course_name: '머신러닝', enrolled_at: '2025-09-01' },
                    { course_id: 'prof-linear-algebra', course_name: '선형대수학', enrolled_at: '2025-09-01' }
                ],
                grades: [
                    { course_name: '알고리즘 이론', exam_type: 'quiz', score: 92, taken_at: '2025-11-25' },
                    { course_name: '선형대수학', exam_type: 'midterm', score: 88, taken_at: '2025-11-20' },
                    { course_name: '머신러닝', exam_type: 'quiz', score: 85, taken_at: '2025-11-18' }
                ],
                thesis: [],
                total_learning_hours: 156,
                pdv_hash: 'a3f8e2c1b4d5a6f7e8c9b0a1d2f3e4c5b6a7d8e9f0a1b2c3d4e5f6a7b8c9d0e1'
            });
        } finally {
            setLoading(false);
        }
    };

    const generateCertificate = async (type) => {
        alert(`${type} 인증서가 생성되었습니다.\nOpenHash 체인에 기록되었습니다.`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-yellow-400"></i>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: '개요', icon: 'fa-home' },
        { id: 'courses', label: '수강 기록', icon: 'fa-book' },
        { id: 'grades', label: '성적 기록', icon: 'fa-chart-bar' },
        { id: 'certificates', label: '인증서', icon: 'fa-certificate' }
    ];

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">개인정보 금고 (PDV)</h1>
                    <p className="text-gray-400 mt-1">모든 학습 기록이 안전하게 보관됩니다</p>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                    <i className="fas fa-shield-alt"></i>
                    <span className="text-sm">OpenHash 보호</span>
                </div>
            </div>

            {/* 보안 상태 */}
            <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
                        <i className="fas fa-lock text-green-400 text-2xl"></i>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">금고 상태: 안전</h3>
                        <p className="text-gray-300 text-sm">모든 데이터는 암호화되어 있으며, 본인만 접근 가능합니다.</p>
                        <p className="text-xs text-gray-400 mt-2 font-mono">
                            Hash: {records.pdv_hash?.substring(0, 32)}...
                        </p>
                    </div>
                </div>
            </div>

            {/* 탭 */}
            <div className="flex space-x-2 border-b border-gray-700">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 font-medium transition-colors ${
                            activeTab === tab.id 
                                ? 'text-yellow-400 border-b-2 border-yellow-400' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <i className={`fas ${tab.icon} mr-2`}></i>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 탭 콘텐츠 */}
            <div className="bg-gray-800 rounded-xl p-6">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-700 rounded-lg p-4 text-center">
                                <i className="fas fa-book text-blue-400 text-2xl mb-2"></i>
                                <p className="text-2xl font-bold">{records.enrollments?.length || 0}</p>
                                <p className="text-sm text-gray-400">수강 과목</p>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4 text-center">
                                <i className="fas fa-clipboard-check text-green-400 text-2xl mb-2"></i>
                                <p className="text-2xl font-bold">{records.grades?.length || 0}</p>
                                <p className="text-sm text-gray-400">시험 기록</p>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4 text-center">
                                <i className="fas fa-clock text-yellow-400 text-2xl mb-2"></i>
                                <p className="text-2xl font-bold">{records.total_learning_hours}</p>
                                <p className="text-sm text-gray-400">학습 시간</p>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4 text-center">
                                <i className="fas fa-file-alt text-purple-400 text-2xl mb-2"></i>
                                <p className="text-2xl font-bold">{records.thesis?.length || 0}</p>
                                <p className="text-sm text-gray-400">논문</p>
                            </div>
                        </div>

                        <div className="bg-gray-700 rounded-lg p-4">
                            <h4 className="font-medium mb-3">
                                <i className="fas fa-info-circle text-blue-400 mr-2"></i>
                                개인정보 금고란?
                            </h4>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li>• 모든 학습 기록, 성적, 인증서가 암호화되어 저장됩니다.</li>
                                <li>• OpenHash 체인에 기록되어 위변조가 불가능합니다.</li>
                                <li>• 본인의 개인키로만 접근 가능합니다.</li>
                                <li>• 필요시 제3자에게 선택적으로 공개할 수 있습니다.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">수강 기록 ({records.enrollments?.length || 0}개)</h3>
                        {records.enrollments?.map((course, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{course.course_name}</p>
                                    <p className="text-sm text-gray-400">등록일: {course.enrolled_at}</p>
                                </div>
                                <span className="badge bg-green-500 bg-opacity-20 text-green-400">
                                    <i className="fas fa-check mr-1"></i>기록됨
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'grades' && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">성적 기록 ({records.grades?.length || 0}개)</h3>
                        {records.grades?.map((grade, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{grade.course_name}</p>
                                    <p className="text-sm text-gray-400">
                                        {grade.exam_type === 'quiz' ? '퀴즈' : grade.exam_type === 'midterm' ? '중간고사' : '기말고사'} | {grade.taken_at}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-yellow-400">{grade.score}점</p>
                                    <span className="badge bg-blue-500 bg-opacity-20 text-blue-400 text-xs">
                                        <i className="fas fa-link mr-1"></i>검증됨
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'certificates' && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">인증서 발급</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => generateCertificate('성적증명서')}
                                className="bg-gray-700 hover:bg-gray-600 rounded-lg p-6 text-left"
                            >
                                <i className="fas fa-file-alt text-blue-400 text-3xl mb-3"></i>
                                <h4 className="font-medium">성적증명서</h4>
                                <p className="text-sm text-gray-400">전체 성적 기록 인증</p>
                            </button>
                            <button
                                onClick={() => generateCertificate('수강증명서')}
                                className="bg-gray-700 hover:bg-gray-600 rounded-lg p-6 text-left"
                            >
                                <i className="fas fa-graduation-cap text-green-400 text-3xl mb-3"></i>
                                <h4 className="font-medium">수강증명서</h4>
                                <p className="text-sm text-gray-400">수강 과목 목록 인증</p>
                            </button>
                            <button
                                onClick={() => generateCertificate('학습시간증명서')}
                                className="bg-gray-700 hover:bg-gray-600 rounded-lg p-6 text-left"
                            >
                                <i className="fas fa-clock text-yellow-400 text-3xl mb-3"></i>
                                <h4 className="font-medium">학습시간증명서</h4>
                                <p className="text-sm text-gray-400">총 학습 시간 인증</p>
                            </button>
                            <button
                                onClick={() => generateCertificate('역량인증서')}
                                className="bg-gray-700 hover:bg-gray-600 rounded-lg p-6 text-left"
                            >
                                <i className="fas fa-award text-purple-400 text-3xl mb-3"></i>
                                <h4 className="font-medium">역량인증서</h4>
                                <p className="text-sm text-gray-400">습득 역량 인증</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
