const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 145,
            description: '법무정책 기획·조정, 예산·인사 총괄',
            aiAutomation: 98,
            functions: [
                '법무정책 기획·조정',
                '예산·인사 관리',
                '정보화·디지털 혁신',
                '법무시설 관리'
            ]
        },
        {
            name: '법무실',
            head: '실장(고위공무원)',
            staff: 128,
            description: '법령 심사, 국가소송, 법무자문',
            aiAutomation: 97,
            functions: [
                '법령안 심사',
                '국가소송 수행',
                '법무자문·해석',
                '통일법무 지원'
            ]
        },
        {
            name: '검찰국',
            head: '국장(고위공무원)',
            staff: 135,
            description: '검찰 조직 관리, 형사사법 정책',
            aiAutomation: 98,
            functions: [
                '검찰 조직·예산',
                '형사사건 지휘·감독',
                '범죄피해자 구조',
                '국제형사사법 협력'
            ]
        },
        {
            name: '범죄예방정책국',
            head: '국장(고위공무원)',
            staff: 152,
            description: '범죄예방, 보호관찰, 소년보호',
            aiAutomation: 96,
            functions: [
                '범죄예방 정책',
                '보호관찰 관리',
                '전자감독 운영',
                '소년보호·교육'
            ]
        },
        {
            name: '인권국',
            head: '국장(고위공무원)',
            staff: 95,
            description: '인권보호, 법률구조, 국선변호',
            aiAutomation: 95,
            functions: [
                '인권침해 조사·구제',
                '국선변호인 운영',
                '법률구조 지원',
                '범죄피해자 보호'
            ]
        },
        {
            name: '교정본부',
            head: '본부장(고위공무원)',
            staff: 185,
            description: '교도소·구치소 운영, 수형자 처우',
            aiAutomation: 97,
            functions: [
                '교정시설 운영',
                '수형자 처우·교화',
                '가석방 심사',
                '교정정책 수립'
            ]
        },
        {
            name: '출입국·외국인정책본부',
            head: '본부장(고위공무원)',
            staff: 168,
            description: '출입국 관리, 비자, 난민, 외국인정책',
            aiAutomation: 99,
            functions: [
                '출입국 심사·관리',
                '비자 발급·심사',
                '난민 심사·보호',
                '외국인 체류·귀화'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-blue-100 text-sm">
                    법무부는 장관·차관 산하 본부 조직과 검찰청·교정시설 등으로 구성됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-blue-800">1,150명</p>
                            <p className="text-xs text-gray-500">공무원</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">교정 인력</p>
                            <p className="text-2xl font-bold text-indigo-800">19,800명</p>
                            <p className="text-xs text-gray-500">교도관</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-blue-700">97.8%</p>
                            <p className="text-xs text-gray-500">평균 자동화</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-800">
                        <div className="font-semibold text-gray-900">법무부장관 (국무위원)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명 (국무총리 제청)</div>
                        <div className="text-sm text-gray-700 mt-2">
                            검찰·행형·인권·출입국관리 총괄, 법무정책 수립·시행
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <div className="font-semibold text-gray-900">차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            장관 보좌, 본부 업무 총괄, 법무행정 집행
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold">{dept.name}</h4>
                                        <p className="text-sm text-blue-100 mt-1">{dept.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{dept.staff}명</div>
                                        <div className="text-xs text-blue-200">{dept.head}</div>
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
                                                    <span className="text-blue-700 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-blue-800">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-blue-700 to-indigo-700 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">외청 (1개)</h3>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-800">
                    <h4 className="font-semibold text-gray-900">검찰청</h4>
                    <p className="text-sm text-gray-600 mt-1">검찰총장: 차관급</p>
                    <p className="text-xs text-gray-500 mt-1">범죄수사, 공소제기·유지, 형 집행 지휘·감독</p>
                    <div className="mt-2 text-xs text-gray-600">
                        • 대검찰청 (서울 서초구)
                        <br />• 고등검찰청 6개 (서울·대전·대구·부산·광주·춘천)
                        <br />• 지방검찰청 18개
                        <br />• 지청 56개
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">소속기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                        <h4 className="font-semibold text-gray-900">교정시설 (54개)</h4>
                        <p className="text-sm text-gray-600 mt-1">교도소 36개, 구치소 12개, 지소 6개</p>
                        <p className="text-xs text-gray-500 mt-1">수용 정원: 5.8만명 / 현재: 4만명</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <h4 className="font-semibold text-gray-900">소년원 (10개)</h4>
                        <p className="text-sm text-gray-600 mt-1">소년원 8개, 분류심사원 2개</p>
                        <p className="text-xs text-gray-500 mt-1">수용 정원: 2,200명</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <h4 className="font-semibold text-gray-900">보호관찰소 (60개)</h4>
                        <p className="text-sm text-gray-600 mt-1">본소 18개, 지소 42개</p>
                        <p className="text-xs text-gray-500 mt-1">보호관찰 대상자: 8.5만명</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                        <h4 className="font-semibold text-gray-900">출입국·외국인청·사무소 (76개)</h4>
                        <p className="text-sm text-gray-600 mt-1">청 1개, 사무소 16개, 출장소 59개</p>
                        <p className="text-xs text-gray-500 mt-1">외국인 체류: 260만명</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">산하기관 (3개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <h4 className="font-semibold text-gray-900 text-sm">대한법률구조공단</h4>
                        <p className="text-xs text-gray-600 mt-1">법률구조·상담</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                        <h4 className="font-semibold text-gray-900 text-sm">한국법무보호복지공단</h4>
                        <p className="text-xs text-gray-600 mt-1">출소자 자립 지원</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <h4 className="font-semibold text-gray-900 text-sm">정부법무공단</h4>
                        <p className="text-xs text-gray-600 mt-1">국가소송 지원</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">법무부의 역할</h4>
                        <p className="text-sm text-blue-800">
                            법무부는 검찰 조직 관리, 교정·보호관찰, 출입국 관리, 인권 보호 등 
                            법무행정 전반을 관장하며, 공정한 법집행과 인권 보호를 통해 
                            법치주의를 확립하고 국민의 안전을 지킵니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
