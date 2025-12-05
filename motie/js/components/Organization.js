const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 185,
            description: '정책기획·예산·인사',
            aiAutomation: 97,
            functions: ['정책기획·조정', '예산·결산', '인사·조직', '국제협력']
        },
        {
            name: '산업정책실',
            head: '실장(고위공무원)',
            staff: 195,
            description: '산업혁신·제조업',
            aiAutomation: 99,
            functions: ['제조업 혁신', '신산업 육성', '산업기술 R&D', '스마트공장']
        },
        {
            name: '무역투자실',
            head: '실장(고위공무원)',
            staff: 178,
            description: '무역진흥·투자유치',
            aiAutomation: 99,
            functions: ['수출진흥', '무역금융', '외국인투자', '해외시장개척']
        },
        {
            name: '통상교섭본부',
            head: '본부장(차관급)',
            staff: 165,
            description: 'FTA·통상분쟁',
            aiAutomation: 98,
            functions: ['FTA 협상', '통상분쟁', 'WTO 대응', '통상정책']
        },
        {
            name: '에너지자원실',
            head: '실장(고위공무원)',
            staff: 172,
            description: '전력·에너지·자원',
            aiAutomation: 98,
            functions: ['전력수급', '에너지효율', '신재생에너지', '자원개발']
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-blue-100 text-sm">
                    산업통상자원부는 장관·차관·통상교섭본부장 산하 5개 실·본부로 구성됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-blue-800">1,650명</p>
                            <p className="text-xs text-gray-500">공무원</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">소속기관</p>
                            <p className="text-2xl font-bold text-indigo-800">12개</p>
                            <p className="text-xs text-gray-500">에너지·무역</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-blue-700">98.8%</p>
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
                        <div className="font-semibold text-gray-900">산업통상자원부장관 (국무위원)</div>
                        <div className="text-sm text-gray-600 mt-1">김정관 장관 (2025.7~)</div>
                        <div className="text-sm text-gray-700 mt-2">
                            산업·통상·무역·에너지·자원 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <div className="font-semibold text-gray-900">제1차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">산업·무역·투자 담당</div>
                        <div className="text-sm text-gray-700 mt-2">
                            산업정책·무역투자·에너지자원 사무 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                        <div className="font-semibold text-gray-900">통상교섭본부장 (차관급 정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">통상교섭 전담</div>
                        <div className="text-sm text-gray-700 mt-2">
                            FTA 협상·이행, 통상분쟁, WTO 대응
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-4">
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
                                                    <span className="text-blue-800 mr-2">•</span>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 소속기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-800">
                        <h4 className="font-semibold text-gray-900">국가기술표준원</h4>
                        <p className="text-sm text-gray-600 mt-1">원장: 고위공무원</p>
                        <p className="text-xs text-gray-500 mt-1">표준·인증·계량</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <h4 className="font-semibold text-gray-900">대한무역투자진흥공사</h4>
                        <p className="text-sm text-gray-600 mt-1">사장: 임기제</p>
                        <p className="text-xs text-gray-500 mt-1">무역·투자 진흥</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-700">
                        <h4 className="font-semibold text-gray-900">한국전력공사</h4>
                        <p className="text-sm text-gray-600 mt-1">사장: 임기제</p>
                        <p className="text-xs text-gray-500 mt-1">전력 생산·공급</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <h4 className="font-semibold text-gray-900">한국가스공사</h4>
                        <p className="text-sm text-gray-600 mt-1">사장: 임기제</p>
                        <p className="text-xs text-gray-500 mt-1">가스 도입·공급</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                        <h4 className="font-semibold text-gray-900">한국석유공사</h4>
                        <p className="text-sm text-gray-600 mt-1">사장: 임기제</p>
                        <p className="text-xs text-gray-500 mt-1">석유 비축·개발</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
                        <h4 className="font-semibold text-gray-900">한국산업단지공단</h4>
                        <p className="text-sm text-gray-600 mt-1">이사장: 임기제</p>
                        <p className="text-xs text-gray-500 mt-1">산업단지 조성</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">산업통상자원부의 역할</h4>
                        <p className="text-sm text-blue-800">
                            산업통상자원부는 제조업 혁신과 신산업 육성으로 산업경쟁력을 강화하고, 
                            적극적인 통상외교와 FTA 활용으로 수출 7천억불을 달성하며, 
                            안정적인 에너지 공급으로 국가경제의 지속가능한 성장을 지원합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
