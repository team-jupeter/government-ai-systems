const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '인사혁신처',
            location: '세종특별자치시',
            staff: 320
        },
        departments: [
            { 
                id: 'personnel', 
                name: '인사관리국', 
                staff: 85, 
                mainTasks: ['인사정책', '채용시험', '임용관리', '성과평가'],
                head: '인사관리국장'
            },
            { 
                id: 'ethics', 
                name: '윤리복무국', 
                staff: 68, 
                mainTasks: ['공직윤리', '복무관리', '징계', '재산공개'],
                head: '윤리복무국장'
            },
            { 
                id: 'pension', 
                name: '연금정책국', 
                staff: 72, 
                mainTasks: ['연금제도', '급여관리', '재정추계', '복지정책'],
                head: '연금정책국장'
            },
            { 
                id: 'training', 
                name: '인재개발국', 
                staff: 95, 
                mainTasks: ['교육훈련', '역량개발', 'AI교육', '리더십'],
                head: '인재개발국장'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">인사혁신처 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="처장" 
                        value="차관급" 
                        subtitle="정무직"
                        icon="👔" 
                        color="blue" 
                    />
                    <StatCard 
                        title="주요 조직" 
                        value="4개 국" 
                        subtitle="+ 차장"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="320명" 
                        subtitle="정원"
                        icon="👥" 
                        color="purple" 
                    />
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 부서</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {organization.departments.map(dept => (
                        <div 
                            key={dept.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedDept(selectedDept === dept.id ? null : dept.id)}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                                    <p className="text-sm text-gray-600">{dept.head}</p>
                                </div>
                                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                                    {dept.staff}명
                                </span>
                            </div>
                            
                            {selectedDept !== dept.id && (
                                <p className="text-sm text-gray-600">
                                    {dept.mainTasks[0]} 외 {dept.mainTasks.length - 1}개 업무
                                </p>
                            )}
                            
                            {selectedDept === dept.id && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <h5 className="text-sm font-medium text-gray-900 mb-2">주요 업무</h5>
                                    <ul className="space-y-1">
                                        {dept.mainTasks.map((task, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                <span className="text-teal-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">데이터 분석</span>
                                                <span className="font-semibold text-purple-600">97%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">업무 자동화</span>
                                                <span className="font-semibold text-blue-600">94%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-6 border border-teal-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    인사혁신처는 국가데이터처에서 공무원 인사·연금 데이터를 실시간으로 조회하고, 
                    모든 업무 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-teal-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">인사기록, 성과평가, 연금</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-teal-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">임용, 승진, 징계, 연금지급</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-teal-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">관리 공무원</div>
                        <div className="text-xs text-gray-600">중앙·지방 약 100만명</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
