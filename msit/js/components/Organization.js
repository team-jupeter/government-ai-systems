const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 95,
            description: '정책기획, 예산, 법무, 국제협력 총괄',
            aiAutomation: 98,
            functions: [
                '부 정책 기획·조정',
                '예산·결산 관리',
                '법무·규제개혁',
                '국제협력'
            ]
        },
        {
            name: '연구개발정책실',
            head: '실장(고위공무원)',
            staff: 88,
            description: 'R&D 정책, 기초연구, 원천기술 개발',
            aiAutomation: 99,
            functions: [
                'R&D 정책 수립',
                '기초연구 진흥',
                '원천기술 개발',
                '연구자 지원'
            ]
        },
        {
            name: '정보통신정책실',
            head: '실장(고위공무원)',
            staff: 125,
            description: 'ICT 산업, 디지털 전환, 정보보호',
            aiAutomation: 98,
            functions: [
                'ICT 산업 육성',
                '디지털 전환',
                '정보보호·사이버안보',
                '데이터 경제'
            ]
        },
        {
            name: '과학기술혁신본부',
            head: '본부장(차관급)',
            staff: 118,
            description: 'R&D 투자·심의·평가, 과학기술정책 총괄',
            aiAutomation: 99,
            functions: [
                'R&D 예산 심의',
                '성과평가',
                '과학기술정책 조정',
                '국가과학기술자문회의'
            ]
        },
        {
            name: '미래인재정책국',
            head: '국장(고위공무원)',
            staff: 72,
            description: '과학기술인력 양성, 이공계 지원',
            aiAutomation: 97,
            functions: [
                '과학기술인력 양성',
                '이공계 지원',
                '여성과학기술인',
                '박사후연구원'
            ]
        },
        {
            name: '방송진흥정책국',
            head: '국장(고위공무원)',
            staff: 65,
            description: '방송 진흥, 콘텐츠 육성',
            aiAutomation: 96,
            functions: [
                '방송 진흥 정책',
                '방송콘텐츠 육성',
                '미디어 다양성',
                '공영방송'
            ]
        },
        {
            name: '통신정책국',
            head: '국장(고위공무원)',
            staff: 78,
            description: '5G/6G, 네트워크, 통신 정책',
            aiAutomation: 99,
            functions: [
                '5G/6G 정책',
                '네트워크 인프라',
                '통신서비스',
                '망 중립성'
            ]
        },
        {
            name: '전파정책국',
            head: '국장(고위공무원)',
            staff: 82,
            description: '전파 자원 관리, 주파수 정책',
            aiAutomation: 100,
            functions: [
                '주파수 할당',
                '전파 관리',
                '불법 전파 단속',
                '위성통신'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-purple-100 text-sm">
                    과학기술정보통신부는 부총리·2차관·본부장 산하 3실 19국 70과로 구성되어 있습니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">전체 인력</p>
                            <p className="text-2xl font-bold text-purple-600">1,850명</p>
                            <p className="text-xs text-gray-500">본부+소속기관</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-indigo-600">98.1%</p>
                            <p className="text-xs text-gray-500">평균 자동화 비율</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">조직</p>
                            <p className="text-2xl font-bold text-violet-600">3실 19국</p>
                            <p className="text-xs text-gray-500">+ 본부·소속기관</p>
                        </div>
                        <span className="text-3xl">🏢</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <div className="font-semibold text-gray-900">과학기술부총리 겸 장관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">국무총리 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">과학기술정책 총괄·조정, 부총리로서 국무위원 중 차석</div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <div className="font-semibold text-gray-900">제1차관 (정무직 또는 고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">기획조정실, 연구개발정책실, 미래인재정책국 등 과학기술·R&D 총괄</div>
                    </div>
                    
                    <div className="p-4 bg-violet-50 rounded-lg border-l-4 border-violet-500">
                        <div className="font-semibold text-gray-900">제2차관 (고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">정보통신정책실, 방송진흥정책국, 통신정책국, 전파정책국 등 ICT·방송 총괄</div>
                    </div>
                    
                    <div className="p-4 bg-fuchsia-50 rounded-lg border-l-4 border-fuchsia-500">
                        <div className="font-semibold text-gray-900">과학기술혁신본부장 (차관급)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">R&D 예산 심의·배분·평가, 과학기술정책 조정</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold">{dept.name}</h4>
                                        <p className="text-sm text-purple-100 mt-1">{dept.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{dept.staff}명</div>
                                        <div className="text-xs text-purple-200">{dept.head}</div>
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
                                                    <span className="text-purple-500 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-purple-600">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">소속기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">우정사업본부</h4>
                        <p className="text-sm text-gray-600">우편·우편환·우편대체 사업</p>
                        <p className="text-xs text-gray-500 mt-1">본부장(차관급), 인력 약 38,000명</p>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">국립중앙과학관</h4>
                        <p className="text-sm text-gray-600">과학문화 확산, 전시·교육</p>
                        <p className="text-xs text-gray-500 mt-1">관장(고위공무원), 대전 위치</p>
                    </div>
                    
                    <div className="p-4 bg-violet-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">국립과천과학관</h4>
                        <p className="text-sm text-gray-600">과학문화 확산, 천문·우주</p>
                        <p className="text-xs text-gray-500 mt-1">관장(고위공무원), 과천 위치</p>
                    </div>
                    
                    <div className="p-4 bg-fuchsia-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">국립전파연구원</h4>
                        <p className="text-sm text-gray-600">전파 연구·표준·측정</p>
                        <p className="text-xs text-gray-500 mt-1">원장(고위공무원), 나주 위치</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 출연연구기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">한국과학기술연구원(KIST)</h4>
                        <p className="text-xs text-gray-600 mt-1">종합연구기관</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">한국전자통신연구원(ETRI)</h4>
                        <p className="text-xs text-gray-600 mt-1">ICT 연구</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">한국원자력연구원(KAERI)</h4>
                        <p className="text-xs text-gray-600 mt-1">원자력 연구</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">한국항공우주연구원(KARI)</h4>
                        <p className="text-xs text-gray-600 mt-1">항공우주 연구</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">한국천문연구원(KASI)</h4>
                        <p className="text-xs text-gray-600 mt-1">천문우주 연구</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">한국생명공학연구원(KRIBB)</h4>
                        <p className="text-xs text-gray-600 mt-1">생명공학 연구</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">과학기술부총리의 역할</h4>
                        <p className="text-sm text-purple-800">
                            과학기술부총리는 대한민국 과학기술정책을 총괄·조정하며, 국무위원 중 차석으로서 
                            국무총리를 보좌합니다. R&D 예산 31조원을 관리하고 과학기술 관련 부처(산업부, 
                            교육부, 보건복지부 등)의 정책을 조정합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
