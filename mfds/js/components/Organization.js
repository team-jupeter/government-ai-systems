const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        leadership: {
            name: '식품의약품안전처',
            location: '충청북도 청주시 오송읍',
            staff: 850
        },
        departments: [
            { 
                id: 'consumer', 
                name: '소비자위해예방국', 
                staff: 95, 
                mainTasks: ['위해예방 정책', '위해정보 수집', '통합식품데이터', '시험검사'],
                head: '소비자위해예방국장'
            },
            { 
                id: 'food', 
                name: '식품안전정책국', 
                staff: 110, 
                mainTasks: ['식품정책 총괄', '건강기능식품', '식품첨가물', '영양정책'],
                head: '식품안전정책국장'
            },
            { 
                id: 'agriculture', 
                name: '농축수산물안전정책국', 
                staff: 88, 
                mainTasks: ['농산물 안전', '축산물 안전', '수산물 안전', '잔류물질'],
                head: '농축수산물안전정책국장'
            },
            { 
                id: 'import', 
                name: '수입식품정책국', 
                staff: 92, 
                mainTasks: ['수입식품 안전', '검역', '통관', '해외 제조소'],
                head: '수입식품정책국장'
            },
            { 
                id: 'drug', 
                name: '의약품안전국', 
                staff: 125, 
                mainTasks: ['의약품 허가', '품질관리', '임상시험', '마약류 관리'],
                head: '의약품안전국장'
            },
            { 
                id: 'bio', 
                name: '바이오생약국', 
                staff: 95, 
                mainTasks: ['바이오의약품', '생물학적제제', '한약', '혈액제제'],
                head: '바이오생약국장'
            },
            { 
                id: 'device', 
                name: '의료기기안전국', 
                staff: 108, 
                mainTasks: ['의료기기 허가', '품질관리', '사후관리', '화장품'],
                head: '의료기기안전국장'
            }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">식품의약품안전처 조직 구조</h2>
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
                        value="7개 국" 
                        subtitle="+ 차장"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="전체 인력" 
                        value="850명" 
                        subtitle="본부 + 평가원 + 지방청"
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
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
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
                                                <span className="text-red-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">위해 분석</span>
                                                <span className="font-semibold text-purple-600">98%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">업무 자동화</span>
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
            
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    식품의약품안전처는 국가데이터처에서 전국 식·의약품 안전 데이터를 실시간으로 조회하고, 
                    모든 심사·검사 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-red-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">식품, 의약품, 의료기기 DB</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">허가, 검사, 위해정보</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">연계 기관</div>
                        <div className="text-xs text-gray-600">병원, 약국, 식품업체</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
