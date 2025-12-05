const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 155,
            description: '행정안전부 정책기획·조정, 예산·인사',
            aiAutomation: 98,
            functions: [
                '정책기획·조정',
                '예산·결산 관리',
                '인사·조직 운영',
                '국회·법무 업무'
            ]
        },
        {
            name: '디지털정부국',
            head: '국장(고위공무원)',
            staff: 142,
            description: '전자정부, 정보화, 공공데이터',
            aiAutomation: 99,
            functions: [
                '전자정부 구축·운영',
                '정보화 정책',
                '공공데이터 개방',
                '행정정보 공동이용'
            ]
        },
        {
            name: '자치분권국',
            head: '국장(고위공무원)',
            staff: 128,
            description: '지방자치제도, 자치분권 정책',
            aiAutomation: 97,
            functions: [
                '지방자치제도 개선',
                '자치분권 추진',
                '지자체 간 협력',
                '주민참여 확대'
            ]
        },
        {
            name: '지방재정경제실',
            head: '실장(고위공무원)',
            staff: 165,
            description: '지방재정, 지방세제, 지역경제',
            aiAutomation: 98,
            functions: [
                '지방재정 관리',
                '지방교부세 배분',
                '지방세제 개선',
                '낙후지역 지원'
            ]
        },
        {
            name: '재난안전관리본부',
            head: '본부장(정무직)',
            staff: 188,
            description: '재난·안전정책 총괄, 비상대비',
            aiAutomation: 99,
            functions: [
                '재난·안전정책 총괄',
                '재난대응·복구',
                '비상대비·민방위',
                '안전관리 종합'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-700 to-orange-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-red-100 text-sm">
                    행정안전부는 장관·차관 산하 본부 조직과 경찰청·소방청 외청으로 구성됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-red-700">1,250명</p>
                            <p className="text-xs text-gray-500">공무원</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">외청 인력</p>
                            <p className="text-2xl font-bold text-orange-700">18만명</p>
                            <p className="text-xs text-gray-500">경찰·소방</p>
                        </div>
                        <span className="text-3xl">👮</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-red-800">98.5%</p>
                            <p className="text-xs text-gray-500">평균 자동화</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-700">
                        <div className="font-semibold text-gray-900">행정안전부장관 (국무위원)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명 (국무총리 제청)</div>
                        <div className="text-sm text-gray-700 mt-2">
                            정부조직·전자정부·지방행정·재난안전 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-700">
                        <div className="font-semibold text-gray-900">차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            장관 보좌, 본부 업무 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                        <div className="font-semibold text-gray-900">재난안전관리본부장 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            재난·안전정책 총괄, 중앙재난안전대책본부 운영
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold">{dept.name}</h4>
                                        <p className="text-sm text-red-100 mt-1">{dept.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{dept.staff}명</div>
                                        <div className="text-xs text-red-200">{dept.head}</div>
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
                                                    <span className="text-red-600 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-red-700">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-red-600 to-orange-600 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">외청 (2개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-700">
                        <h4 className="font-semibold text-gray-900">경찰청</h4>
                        <p className="text-sm text-gray-600 mt-1">청장: 치안총감(차관급)</p>
                        <p className="text-xs text-gray-500 mt-1">치안유지, 범죄수사, 교통단속, 경비</p>
                        <div className="mt-2 text-xs text-gray-600">
                            • 인력: 약 13만명
                            <br />• 지방청 18개
                            <br />• 경찰서 255개
                        </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-700">
                        <h4 className="font-semibold text-gray-900">소방청</h4>
                        <p className="text-sm text-gray-600 mt-1">청장: 소방총감(차관급)</p>
                        <p className="text-xs text-gray-500 mt-1">화재진압, 구조·구급, 재난대응</p>
                        <div className="mt-2 text-xs text-gray-600">
                            • 인력: 약 5만명
                            <br />• 시·도소방본부 17개
                            <br />• 소방서 310개
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">소속기관 (2개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-600">
                        <h4 className="font-semibold text-gray-900">국립과학수사연구원</h4>
                        <p className="text-sm text-gray-600 mt-1">법과학 감정·분석</p>
                        <p className="text-xs text-gray-500 mt-1">DNA·마약·위조감정 등</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                        <h4 className="font-semibold text-gray-900">국가민방위재난안전교육원</h4>
                        <p className="text-sm text-gray-600 mt-1">민방위·재난안전 교육</p>
                        <p className="text-xs text-gray-500 mt-1">충남 천안 소재</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 시스템</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-red-700">정부24</div>
                        <div className="text-xs text-gray-600">민원서비스</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-orange-700">안전신문고</div>
                        <div className="text-xs text-gray-600">안전신고</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-red-600">국민재난안전포털</div>
                        <div className="text-xs text-gray-600">재난정보</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                        <div className="text-xl font-bold text-orange-600">공공데이터포털</div>
                        <div className="text-xs text-gray-600">데이터개방</div>
                    </div>
                </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-red-900 mb-1">행정안전부의 역할</h4>
                        <p className="text-sm text-red-800">
                            행정안전부는 정부조직 관리, 전자정부 구축, 지방자치 지원, 재난안전 총괄을 담당하며, 
                            중앙과 지방을 연결하여 국정을 통합하고 국민의 안전을 지킵니다. 
                            경찰청·소방청 외청을 두어 치안과 소방을 관장합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
