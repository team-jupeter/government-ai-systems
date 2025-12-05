const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '금융위원회',
            location: '서울특별시 종로구',
            staff: 480
        },
        departments: [
            { 
                id: 'consumer', 
                name: '금융소비자국', 
                staff: 85, 
                mainTasks: ['소비자정책 수립', '서민금융 지원', '가계부채 관리', '청년금융'],
                head: '금융소비자국장'
            },
            { 
                id: 'policy', 
                name: '금융정책국', 
                staff: 92, 
                mainTasks: ['금융정책 수립', '시장분석', '산업금융', '글로벌금융'],
                head: '금융정책국장'
            },
            { 
                id: 'industry', 
                name: '금융산업국', 
                staff: 78, 
                mainTasks: ['은행 감독', '보험 감독', '중소금융 감독', '인허가'],
                head: '금융산업국장'
            },
            { 
                id: 'digital', 
                name: '디지털금융정책관', 
                staff: 65, 
                mainTasks: ['디지털금융 총괄', '금융데이터 정책', '핀테크 육성', 'AI금융'],
                head: '디지털금융정책관'
            },
            { 
                id: 'restructure', 
                name: '구조개선정책관', 
                staff: 58, 
                mainTasks: ['금융구조개선', '기업구조조정', '부실금융기관 정리', 'M&A 심사'],
                head: '구조개선정책관'
            },
            { 
                id: 'securities', 
                name: '증권선물위원회', 
                staff: 102, 
                mainTasks: ['자본시장 감시', '불공정거래 조사', '기업회계 감리', '공시 심사'],
                head: '증권선물위원회 위원장'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">금융위원회 조직 구조</h2>
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
                        value="3개 국" 
                        subtitle="+ 3개 정책관"
                        icon="🏢" 
                        color="indigo" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="480명" 
                        subtitle="본부 + 증권선물위"
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
                                                <span className="text-gray-600">리스크 분석</span>
                                                <span className="font-semibold text-blue-600">99%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">감독 지원</span>
                                                <span className="font-semibold text-indigo-600">96%</span>
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
                    금융위원회는 국가데이터처에서 전국 금융거래 데이터를 실시간으로 조회하고, 
                    모든 감독·제재 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">금융기관 2,000개, 거래 100억건</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">감독, 제재, 인허가, 검사</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">연계 기관</div>
                        <div className="text-xs text-gray-600">금감원, 한국은행, 예보</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
