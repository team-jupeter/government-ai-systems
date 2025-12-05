const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 165,
            description: '국방정책 기획·조정, 예산·법무 총괄',
            aiAutomation: 98,
            functions: [
                '국방정책 기획·조정',
                '국방예산 편성·관리',
                '법무·감사',
                '국방개혁 추진'
            ]
        },
        {
            name: '정책실',
            head: '실장(고위공무원)',
            staff: 142,
            description: '국방정책 수립, 군비통제, 국방외교',
            aiAutomation: 99,
            functions: [
                '국방정책 수립',
                '군비통제·군축',
                '한미동맹 관리',
                '국방외교 협력'
            ]
        },
        {
            name: '국방인력정책실',
            head: '실장(고위공무원)',
            staff: 128,
            description: '병력 획득·관리, 병영문화 개선',
            aiAutomation: 97,
            functions: [
                '병력 획득·관리',
                '병영문화 개선',
                '장병 복지·인권',
                '군 인력 개발'
            ]
        },
        {
            name: '전력자원관리실',
            head: '실장(고위공무원)',
            staff: 158,
            description: '군사력 건설, 방위력 개선, 군수·시설',
            aiAutomation: 98,
            functions: [
                '중장기 전력 기획',
                '방위력 개선사업',
                '군수품 조달·관리',
                '군사시설 건설'
            ]
        },
        {
            name: '정보화기획관',
            head: '기획관(고위공무원)',
            staff: 85,
            description: '국방정보화, 사이버 안보',
            aiAutomation: 99,
            functions: [
                '국방정보화 기획',
                '사이버 안보',
                '정보체계 구축',
                'AI 전력 개발'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-800 to-green-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-green-100 text-sm">
                    국방부는 장관·차관 산하 본부와 합동참모본부·3군 본부로 구성됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-green-700">1,280명</p>
                            <p className="text-xs text-gray-500">공무원·군인</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">현역 병력</p>
                            <p className="text-2xl font-bold text-green-800">50만명</p>
                            <p className="text-xs text-gray-500">육해공군</p>
                        </div>
                        <span className="text-3xl">🪖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-emerald-700">98.2%</p>
                            <p className="text-xs text-gray-500">평균 자동화</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <div className="font-semibold text-gray-900">국방부장관 (국무위원)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명 (국무총리 제청)</div>
                        <div className="text-sm text-gray-700 mt-2">
                            군정·군령 통합 관장, 국방정책 총괄, 합참·3군 본부 지휘
                        </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-800">
                        <div className="font-semibold text-gray-900">차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            장관 보좌, 본부 업무 총괄, 국방정책 집행
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4">
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
                                                    <span className="text-green-600 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-green-700">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-green-600 to-green-700 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">합동참모본부·3군 본부</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <h4 className="font-semibold text-gray-900">합동참모본부</h4>
                        <p className="text-sm text-gray-600 mt-1">합참의장: 대장</p>
                        <p className="text-xs text-gray-500 mt-1">군령권 - 작전계획·지휘통제</p>
                    </div>
                    <div className="p-4 bg-lime-50 rounded-lg border-l-4 border-lime-700">
                        <h4 className="font-semibold text-gray-900">육군본부</h4>
                        <p className="text-sm text-gray-600 mt-1">육군참모총장: 대장</p>
                        <p className="text-xs text-gray-500 mt-1">군정권 - 부대편성·교육훈련</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                        <h4 className="font-semibold text-gray-900">해군본부</h4>
                        <p className="text-sm text-gray-600 mt-1">해군참모총장: 대장</p>
                        <p className="text-xs text-gray-500 mt-1">군정권 - 부대편성·교육훈련</p>
                    </div>
                    <div className="p-4 bg-sky-50 rounded-lg border-l-4 border-sky-700">
                        <h4 className="font-semibold text-gray-900">공군본부</h4>
                        <p className="text-sm text-gray-600 mt-1">공군참모총장: 대장</p>
                        <p className="text-xs text-gray-500 mt-1">군정권 - 부대편성·교육훈련</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">외청 (2개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <h4 className="font-semibold text-gray-900">병무청</h4>
                        <p className="text-sm text-gray-600 mt-1">청장: 차관급</p>
                        <p className="text-xs text-gray-500 mt-1">병역 의무 이행, 징병·소집, 예비군 관리</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-700">
                        <h4 className="font-semibold text-gray-900">방위사업청</h4>
                        <p className="text-sm text-gray-600 mt-1">청장: 차관급</p>
                        <p className="text-xs text-gray-500 mt-1">방위력 개선, 방산·군수품 조달</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">병력 현황</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-700">50만명</div>
                        <div className="text-sm text-gray-600">현역</div>
                    </div>
                    <div className="p-3 bg-lime-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-lime-700">275만명</div>
                        <div className="text-sm text-gray-600">예비군</div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-700">310만명</div>
                        <div className="text-sm text-gray-600">민방위</div>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-teal-700">635만명</div>
                        <div className="text-sm text-gray-600">총 전력</div>
                    </div>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">국방부의 역할</h4>
                        <p className="text-sm text-green-800">
                            국방부는 군정·군령 통합 관장 기관으로, 합동참모본부는 군령권(작전지휘), 
                            3군 본부는 군정권(부대편성·교육훈련)을 행사하며, 
                            국방부는 이를 통합하여 국방정책을 수립·시행합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
