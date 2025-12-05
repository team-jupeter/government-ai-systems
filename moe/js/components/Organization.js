const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 125,
            description: '정책기획, 예산, 법무, 감사 총괄',
            aiAutomation: 98,
            functions: [
                '정책 기획·조정',
                '교육예산 편성·관리',
                '법무·규제개혁',
                '국제협력'
            ]
        },
        {
            name: '인재정책실',
            head: '실장(고위공무원)',
            staff: 115,
            description: '고등교육, 대학정책, 학술연구, 인재양성',
            aiAutomation: 99,
            functions: [
                '대학 정책 수립',
                '입학제도 관리',
                '학술연구 진흥',
                '장학금 지원'
            ]
        },
        {
            name: '책임교육정책실',
            head: '실장(고위공무원)',
            staff: 132,
            description: '초중등교육, 교육과정, 학교혁신',
            aiAutomation: 98,
            functions: [
                '교육과정 개발',
                '학교혁신 지원',
                '교원정책',
                '학생복지·안전'
            ]
        },
        {
            name: '영유아정책국',
            head: '국장(고위공무원)',
            staff: 88,
            description: '유보통합, 유치원·어린이집 정책',
            aiAutomation: 97,
            functions: [
                '유보통합 추진',
                '유치원 정책',
                '어린이집 관리',
                '영유아 교육과정'
            ]
        },
        {
            name: '지방교육지원국',
            head: '국장(고위공무원)',
            staff: 95,
            description: '지방교육자치, 교육청 지원',
            aiAutomation: 96,
            functions: [
                '지방교육자치',
                '교육재정 배분',
                '시도교육청 지원',
                '교육지원청 관리'
            ]
        },
        {
            name: '평생직업교육국',
            head: '국장(고위공무원)',
            staff: 78,
            description: '평생교육, 직업교육, 성인학습',
            aiAutomation: 97,
            functions: [
                '평생학습 정책',
                '직업교육 진흥',
                '성인문해교육',
                '학점은행제'
            ]
        },
        {
            name: '교육복지돌봄지원국',
            head: '국장(고위공무원)',
            staff: 82,
            description: '교육복지, 돌봄교실, 급식',
            aiAutomation: 98,
            functions: [
                '교육복지 정책',
                '돌봄교실 운영',
                '학교급식',
                '교육비 지원'
            ]
        },
        {
            name: '디지털교육기획관',
            head: '기획관(고위공무원)',
            staff: 65,
            description: '디지털 전환, 에듀테크, 정보화',
            aiAutomation: 99,
            functions: [
                '디지털 교육 전환',
                '에듀테크 활성화',
                '교육정보화',
                'AI 교육'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-teal-100 text-sm">
                    교육부는 부총리·차관 산하 3실 11국 63과로 구성되어 있습니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">전체 인력</p>
                            <p className="text-2xl font-bold text-teal-600">1,680명</p>
                            <p className="text-xs text-gray-500">본부+소속기관</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-cyan-600">97.8%</p>
                            <p className="text-xs text-gray-500">평균 자동화 비율</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">조직</p>
                            <p className="text-2xl font-bold text-emerald-600">3실 11국</p>
                            <p className="text-xs text-gray-500">+ 17개 교육청</p>
                        </div>
                        <span className="text-3xl">🏢</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                        <div className="font-semibold text-gray-900">부총리 겸 교육부장관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">국무총리 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">교육정책 총괄·조정, 사회부총리로서 국무위원 중 차석</div>
                    </div>
                    
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <div className="font-semibold text-gray-900">차관 (고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">3실 11국 업무 총괄, 장관 보좌</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold">{dept.name}</h4>
                                        <p className="text-sm text-teal-100 mt-1">{dept.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{dept.staff}명</div>
                                        <div className="text-xs text-teal-200">{dept.head}</div>
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
                                                    <span className="text-teal-500 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-teal-600">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">시도교육청 (17개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-teal-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">서울특별시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">부산광역시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">대구광역시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-sky-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">인천광역시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">광주광역시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">대전광역시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">울산광역시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-sky-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">세종특별자치시교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">경기도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">강원특별자치도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">충청북도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-sky-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">충청남도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">전북특별자치도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">전라남도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">경상북도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-sky-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">경상남도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 text-sm">제주특별자치도교육청</h4>
                        <p className="text-xs text-gray-600 mt-1">교육감 직선제</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-teal-900 mb-1">부총리의 역할</h4>
                        <p className="text-sm text-teal-800">
                            교육부총리(사회부총리)는 대한민국 교육·사회정책을 총괄·조정하며, 
                            국무위원 중 차석으로서 국무총리를 보좌합니다. 교육예산 97조원을 관리하고 
                            655만 학생의 교육을 책임집니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
