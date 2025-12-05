const Organization = () => {
    const departments = [
        {
            name: '원자력안전정책국',
            head: '국장(고위공무원)',
            staff: 65,
            description: '원자력 안전정책 수립, 법령 제·개정, 국제협력',
            aiAutomation: 94,
            functions: [
                '원자력 안전정책 수립',
                '안전규제 법령 제·개정',
                '국제협력 및 조약',
                '원자력안전 기본계획'
            ]
        },
        {
            name: '원자로안전심사국',
            head: '국장(고위공무원)',
            staff: 88,
            description: '원자로 설계·건설·운전 안전심사, SMR 규제',
            aiAutomation: 97,
            functions: [
                '원전 설계 안전심사',
                '건설·운전 허가심사',
                'SMR 등 신형원자로 규제',
                '계속운전 심사'
            ]
        },
        {
            name: '방사선방재국',
            head: '국장(고위공무원)',
            staff: 72,
            description: '방사선 안전관리, 방사성폐기물, 방사능 방재',
            aiAutomation: 98,
            functions: [
                '방사선이용기관 관리',
                '방사성폐기물 안전관리',
                '생활주변방사선 관리',
                '방사능방재 훈련'
            ]
        },
        {
            name: '핵안보국',
            head: '국장(고위공무원)',
            staff: 58,
            description: '핵물질 방호, 핵비확산, 핵안보 국제협력',
            aiAutomation: 96,
            functions: [
                '핵물질 방호체계',
                '핵비확산 이행',
                'IAEA 안전조치',
                '핵안보 정상회의'
            ]
        },
        {
            name: '규제기준국',
            head: '국장(고위공무원)',
            staff: 55,
            description: '안전규제 기준 수립, 검사제도 운영',
            aiAutomation: 95,
            functions: [
                '안전규제 기준 제·개정',
                '검사제도 운영',
                '국제기준 국내 적용',
                '규제기술 개발'
            ]
        },
        {
            name: '원전지역사무소',
            head: '4개 사무소장',
            staff: 82,
            description: '고리·월성·한빛·새울 원전 현장 안전규제',
            aiAutomation: 99,
            functions: [
                '원전 현장 안전감시',
                '일상점검 및 검사',
                '방사선 환경감시',
                '비상대응 현장지휘'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-green-100 text-sm">
                    원자력안전위원회는 위원장·부위원장 산하 5개 국과 4개 지역사무소로 구성되어 있습니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">전체 인력</p>
                            <p className="text-2xl font-bold text-green-600">420명</p>
                            <p className="text-xs text-gray-500">공무원 + 전문직</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-emerald-600">96.5%</p>
                            <p className="text-xs text-gray-500">평균 자동화 비율</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">조직</p>
                            <p className="text-2xl font-bold text-teal-600">5개 국</p>
                            <p className="text-xs text-gray-500">+ 4개 지역사무소</p>
                        </div>
                        <span className="text-3xl">🏢</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">위원회 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="font-semibold text-gray-900">위원장 (차관급 정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">국무총리 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">위원회 대표, 회의 주재, 소관 사무 총괄</div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                        <div className="font-semibold text-gray-900">부위원장 (상임위원)</div>
                        <div className="text-sm text-gray-600 mt-1">위원장 제청, 대통령 위촉</div>
                        <div className="text-sm text-gray-700 mt-2">사무처장 겸임, 사무처 지휘·감독</div>
                    </div>
                    
                    <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                        <div className="font-semibold text-gray-900">위원 5~7명</div>
                        <div className="text-sm text-gray-600 mt-1">위원장 제청 또는 국회 추천, 대통령 위촉</div>
                        <div className="text-sm text-gray-700 mt-2">원자력·환경·보건의료·과학기술·공공안전·법률·인문사회 전문가 (임기 3년)</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold">{dept.name}</h4>
                                        <p className="text-sm text-green-100 mt-1">{dept.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{dept.staff}명</div>
                                        <div className="text-xs text-green-200">{dept.head}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">주요 기능</h5>
                                        <ul className="space-y-1">
                                            {dept.functions.map((func, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                    <span className="text-green-500 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-green-600">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                                                style={{width: `${dept.aiAutomation}%`}}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            DeepSeek R1 기반 AI가 업무를 자동 처리합니다
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">원전 지역사무소</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">고리원전지역사무소</h4>
                        <p className="text-sm text-gray-600">위치: 부산광역시 기장군</p>
                        <p className="text-sm text-gray-600">관할: 고리 1~4호기, 신고리 1~4호기</p>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">월성원전지역사무소</h4>
                        <p className="text-sm text-gray-600">위치: 경상북도 경주시</p>
                        <p className="text-sm text-gray-600">관할: 월성 1~4호기, 신월성 1~2호기</p>
                    </div>
                    
                    <div className="p-4 bg-teal-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">한빛원전지역사무소</h4>
                        <p className="text-sm text-gray-600">위치: 전라남도 영광군</p>
                        <p className="text-sm text-gray-600">관할: 한빛 1~6호기</p>
                    </div>
                    
                    <div className="p-4 bg-lime-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">새울원전지역사무소</h4>
                        <p className="text-sm text-gray-600">위치: 울산광역시</p>
                        <p className="text-sm text-gray-600">관할: 새울 1~2호기 (건설 중)</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">독립성 보장</h4>
                        <p className="text-sm text-green-800">
                            원자력안전위원회는 원자력 진흥 기관과 완전히 분리된 독립적인 규제기관입니다. 
                            원자력이용자의 허가·취소 등에 관한 사항은 국무총리의 행정감독권이 적용되지 않아 
                            규제 독립성이 법적으로 보장됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
