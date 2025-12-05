const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '국민권익위원회',
            location: '세종특별자치시',
            staff: 650
        },
        departments: [
            { 
                id: 'civil', 
                name: '고충처리국', 
                staff: 145, 
                mainTasks: ['고충민원 접수', '민원 조사', '제도개선 권고', '국민신문고 운영'],
                head: '고충처리국장'
            },
            { 
                id: 'corruption', 
                name: '부패방지국', 
                staff: 165, 
                mainTasks: ['부패신고 접수', '공익신고 보호', '부패행위 조사', '청렴도 측정'],
                head: '부패방지국장'
            },
            { 
                id: 'tribunal', 
                name: '중앙행정심판위원회', 
                staff: 128, 
                mainTasks: ['행정심판 청구', '재결 처리', '판례 연구', '소송 대응'],
                head: '중앙행정심판위원회 위원장'
            },
            { 
                id: 'policy', 
                name: '권익개선정책국', 
                staff: 98, 
                mainTasks: ['민원 분석', '제도개선', '정책 연구', '법령 정비'],
                head: '권익개선정책국장'
            },
            { 
                id: 'integrity', 
                name: '청렴정책국', 
                staff: 85, 
                mainTasks: ['청렴정책 수립', '청탁금지법 운영', '공직윤리', '청렴교육'],
                head: '청렴정책국장'
            },
            { 
                id: 'planning', 
                name: '기획조정실', 
                staff: 29, 
                mainTasks: ['정책 기획', '예산 관리', '성과 평가', '국제협력'],
                head: '기획조정실장'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">국민권익위원회 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="위원장" 
                        value="장관급" 
                        subtitle="국무총리 소속"
                        icon="👔" 
                        color="blue" 
                    />
                    <StatCard 
                        title="주요 조직" 
                        value="5개 국" 
                        subtitle="+ 3명 부위원장"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="650명" 
                        subtitle="본부 + 지방사무소"
                        icon="👥" 
                        color="teal" 
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
                                                <span className="text-gray-600">민원 분석</span>
                                                <span className="font-semibold text-teal-600">97%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">처리 지원</span>
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
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    국민권익위원회는 국가데이터처에서 전국 민원·부패 데이터를 실시간으로 조회하고, 
                    모든 처리 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-teal-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">민원 500만건, 신고 10만건</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-teal-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">민원, 부패신고, 행정심판</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-teal-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">연계 기관</div>
                        <div className="text-xs text-gray-600">전국 행정기관, 공공기관</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
