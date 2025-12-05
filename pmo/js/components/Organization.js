const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '국무총리비서실',
            location: '서울특별시 종로구',
            staff: 97
        },
        departments: [
            { 
                id: 'political', 
                name: '정무실', 
                staff: 25, 
                mainTasks: ['대국회 활동 보좌', '당정협조', '국정자문', '정무기획'],
                head: '정무실장'
            },
            { 
                id: 'civil', 
                name: '민정실', 
                staff: 22, 
                mainTasks: ['민원 처리', '민정조정', '시민사회 협력', '시민단체 지원'],
                head: '민정실장'
            },
            { 
                id: 'pr', 
                name: '공보실', 
                staff: 28, 
                mainTasks: ['국정홍보', '소통전략', '디지털 소통', '언론대응'],
                head: '공보실장'
            },
            { 
                id: 'protocol', 
                name: '의전비서관', 
                staff: 22, 
                mainTasks: ['의전', '경호', '귀빈 영접', '공관 관리'],
                head: '의전비서관'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">국무총리비서실 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="비서실장" 
                        value="차관급" 
                        subtitle="정무직"
                        icon="👔" 
                        color="blue" 
                    />
                    <StatCard 
                        title="주요 조직" 
                        value="4개" 
                        subtitle="실·비서관"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="97명" 
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
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
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
                                                <span className="text-blue-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">문서 분석</span>
                                                <span className="font-semibold text-purple-600">94%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">업무 자동화</span>
                                                <span className="font-semibold text-blue-600">91%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    국무총리비서실은 국가데이터처에서 국정 운영 관련 데이터를 실시간으로 조회하고, 
                    모든 업무 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">국정 현황, 민원, 여론</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">보좌 기록, 민원 처리, 홍보</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">연계 기관</div>
                        <div className="text-xs text-gray-600">국회, 시민단체, 언론</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
