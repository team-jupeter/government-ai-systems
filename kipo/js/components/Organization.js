const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '지식재산처',
            location: '대전광역시 서구',
            staff: 1800
        },
        departments: [
            { 
                id: 'policy', 
                name: '지식재산정책국', 
                staff: 145, 
                mainTasks: ['IP 정책 총괄', 'IP 창출·활용', 'IP 거래', 'R&D 지원'],
                head: '지식재산정책국장'
            },
            { 
                id: 'patent', 
                name: '특허심사기획국', 
                staff: 520, 
                mainTasks: ['특허심사 기획', '전기전자 심사', 'IT 심사', '화학생명 심사'],
                head: '특허심사기획국장'
            },
            { 
                id: 'trademark', 
                name: '상표디자인심사국', 
                staff: 280, 
                mainTasks: ['상표 심사', '디자인 심사', '심사품질 관리', '국제출원'],
                head: '상표디자인심사국장'
            },
            { 
                id: 'trial', 
                name: '특허심판원', 
                staff: 185, 
                mainTasks: ['심판 청구', '무효 심판', '거절결정 불복', '권리범위 확인'],
                head: '특허심판원장'
            },
            { 
                id: 'dispute', 
                name: '지식재산분쟁대응국', 
                staff: 128, 
                mainTasks: ['국제 분쟁 대응', 'IP 소송 지원', '침해 단속', '보호 정책'],
                head: '지식재산분쟁대응국장'
            },
            { 
                id: 'intl', 
                name: '국제협력국', 
                staff: 95, 
                mainTasks: ['국제 협력', 'PCT 출원', '해외 IP 보호', '다자협력'],
                head: '국제협력국장'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">지식재산처 조직 구조</h2>
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
                        value="10개 국" 
                        subtitle="+ 차장"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="1,800명" 
                        subtitle="본청 + 소속기관"
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
                                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
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
                                                <span className="text-violet-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">선행기술 조사</span>
                                                <span className="font-semibold text-purple-600">99%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">심사 지원</span>
                                                <span className="font-semibold text-blue-600">97%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-6 border border-violet-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    지식재산처는 국가데이터처에서 전국 특허·상표 데이터를 실시간으로 조회하고, 
                    모든 심사·심판 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-violet-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">특허 700만건, 상표 300만건</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-violet-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">출원, 심사, 등록, 심판</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-violet-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">연계 기관</div>
                        <div className="text-xs text-gray-600">USPTO, EPO, JPO 등</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
