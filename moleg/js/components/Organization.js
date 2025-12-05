const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '법제처',
            location: '세종특별자치시',
            staff: 280
        },
        departments: [
            { 
                id: 'policy', 
                name: '법제정책국', 
                staff: 55, 
                mainTasks: ['정부입법 총괄·조정', '법제개선 조정', '법령정비', '미래법제'],
                head: '법제정책국장'
            },
            { 
                id: 'admin', 
                name: '행정법제국', 
                staff: 48, 
                mainTasks: ['행정법령 심사', '행정조직법 심사', '공무원법 심사', '교육문화법 심사'],
                head: '행정법제국장'
            },
            { 
                id: 'economy', 
                name: '경제법제국', 
                staff: 42, 
                mainTasks: ['경제법령 심사', '금융법 심사', '산업법 심사', '통상법 심사'],
                head: '경제법제국장'
            },
            { 
                id: 'social', 
                name: '사회문화법제국', 
                staff: 45, 
                mainTasks: ['사회복지법 심사', '보건의료법 심사', '환경법 심사', '노동법 심사'],
                head: '사회문화법제국장'
            },
            { 
                id: 'interpretation', 
                name: '법령해석국', 
                staff: 50, 
                mainTasks: ['법령해석 총괄', '행정법령 해석', '경제법령 해석', '사회문화법령 해석'],
                head: '법령해석국장'
            },
            { 
                id: 'support', 
                name: '법제지원국', 
                staff: 40, 
                mainTasks: ['자치법제 지원', '알기 쉬운 법령', '법제교육', '국가법령정보센터'],
                head: '법제지원국장'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">법제처 조직 구조</h2>
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
                        value="6개 국" 
                        subtitle="+ 차장"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="280명" 
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
                                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
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
                                                <span className="text-amber-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">법령 분석</span>
                                                <span className="font-semibold text-purple-600">96%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">업무 자동화</span>
                                                <span className="font-semibold text-blue-600">93%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    법제처는 국가데이터처에서 전국 법령 데이터를 실시간으로 조회하고, 
                    모든 법령 심사·해석 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">법령, 판례, 해석례 620만건</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">심사, 해석, 정비 이력</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-amber-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">연계 기관</div>
                        <div className="text-xs text-gray-600">중앙부처, 지자체, 법원</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
