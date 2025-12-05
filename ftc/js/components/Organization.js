const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '공정거래위원회',
            location: '세종특별자치시',
            staff: 850
        },
        departments: [
            { 
                id: 'competition', 
                name: '경쟁정책국', 
                staff: 185, 
                mainTasks: ['시장구조 개선', '독과점 조사', '담합 조사', '경쟁제한 심사'],
                head: '경쟁정책국장'
            },
            { 
                id: 'consumer', 
                name: '소비자정책국', 
                staff: 145, 
                mainTasks: ['소비자 보호', '표시광고 심사', '약관 규제', '피해 구제'],
                head: '소비자정책국장'
            },
            { 
                id: 'enterprise', 
                name: '기업거래정책국', 
                staff: 168, 
                mainTasks: ['하도급 거래', '가맹사업', '대리점 거래', '불공정거래 조사'],
                head: '기업거래정책국장'
            },
            { 
                id: 'market', 
                name: '시장감시국', 
                staff: 152, 
                mainTasks: ['카르텔 조사', '입찰담합', '시장감시', '위법행위 적발'],
                head: '시장감시국장'
            },
            { 
                id: 'conglomerate', 
                name: '기업집단정책국', 
                staff: 128, 
                mainTasks: ['대기업집단 지정', '경제력 집중 억제', '순환출자 규제', '내부거래 감시'],
                head: '기업집단정책국장'
            },
            { 
                id: 'trial', 
                name: '심판관리관', 
                staff: 72, 
                mainTasks: ['심결 보좌', '소송 대응', '법리 연구', '판례 분석'],
                head: '심판관리관'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">공정거래위원회 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="위원장" 
                        value="차관급" 
                        subtitle="국무총리 소속"
                        icon="👔" 
                        color="blue" 
                    />
                    <StatCard 
                        title="주요 조직" 
                        value="6개 국" 
                        subtitle="+ 부위원장"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="850명" 
                        subtitle="본부 + 지방사무소"
                        icon="👥" 
                        color="orange" 
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
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
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
                                                <span className="text-orange-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">시장 분석</span>
                                                <span className="font-semibold text-orange-600">98%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">조사 지원</span>
                                                <span className="font-semibold text-blue-600">95%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    공정거래위원회는 국가데이터처에서 전국 기업 거래 데이터를 실시간으로 조회하고, 
                    모든 조사·심의 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-orange-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">기업 500만개, 거래 10억건</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-orange-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">조사, 심의, 시정, 과징금</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-orange-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">연계 기관</div>
                        <div className="text-xs text-gray-600">국세청, 금융위, 관세청</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
