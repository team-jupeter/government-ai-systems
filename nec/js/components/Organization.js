const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        committee: {
            name: '국가교육위원회',
            location: '서울특별시',
            members: [
                { id: 'chairman', name: '위원장', count: 1, role: '위원회 총괄', background: '교육 전문가' },
                { id: 'standing', name: '상임위원', count: 2, role: '정책 심의', background: '교육학 박사' },
                { id: 'general', name: '일반위원', count: 18, role: '의결 참여', background: '교원, 교수, 공무원 등' }
            ]
        },
        departments: [
            { id: 'planning', name: '기획조정실', staff: 12, mainTasks: ['위원회 운영', '예산 관리', '대외협력'] },
            { id: 'policy', name: '정책협력실', staff: 15, mainTasks: ['교육정책 연구', '국민 의견 수렴', '사회적 협의'] },
            { id: 'curriculum', name: '교육과정실', staff: 8, mainTasks: ['교육과정 기준', '교과서 검토', '평가 기준'] }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">국가교육위원회 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="위원" 
                        value="21명" 
                        subtitle="상임 3명, 일반 18명"
                        icon="⚖️" 
                        color="blue" 
                    />
                    <StatCard 
                        title="사무처" 
                        value="35명" 
                        subtitle="3개 실"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="임기" 
                        value="3년" 
                        subtitle="1회 연임 가능"
                        icon="📅" 
                        color="purple" 
                    />
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">위원 구성</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {organization.committee.members.map(member => (
                        <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                <span className="text-lg font-bold text-green-600">{member.count}명</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">역할: {member.role}</p>
                            <p className="text-sm text-gray-500">배경: {member.background}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">위원 선출 방식</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>• 대통령 지명: 5명 (위원장 포함)</li>
                        <li>• 국회 추천: 9명 (여야 각 4명, 교섭단체 1명)</li>
                        <li>• 교육감협의회 추천: 4명</li>
                        <li>• 대학협의체 추천: 3명</li>
                    </ul>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">사무처 조직</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {organization.departments.map(dept => (
                        <div 
                            key={dept.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedDept(selectedDept === dept.id ? null : dept.id)}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
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
                                                <span className="text-green-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">정책 데이터 분석</span>
                                                <span className="font-semibold text-purple-600">94%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">의견 수렴 자동화</span>
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
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    국가교육위원회는 국가데이터처에서 교육 정책 수립에 필요한 데이터를 실시간으로 조회하고, 
                    모든 심의 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">교육통계, 학생수, 교원현황</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">심의안, 의결문, 정책계획</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">국민 참여</div>
                        <div className="text-xs text-gray-600">온라인 의견, 설문조사</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Organization = Organization;
