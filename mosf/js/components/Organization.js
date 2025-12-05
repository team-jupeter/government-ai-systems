const Organization = () => {
    const departments = [
        {
            name: '경제정책국',
            head: '국장(고위공무원)',
            staff: 95,
            description: '거시경제정책, 경제전망, 물가·고용 정책 총괄',
            aiAutomation: 99,
            functions: [
                '거시경제 정책 수립',
                '경제전망 및 분석',
                '물가·고용 정책',
                '경제정책 조정'
            ]
        },
        {
            name: '재정정책국',
            head: '국장(고위공무원)',
            staff: 88,
            description: '중장기 재정전략, 국가재정운용계획, 재정준칙',
            aiAutomation: 98,
            functions: [
                '중장기 재정전략',
                '국가재정운용계획',
                '재정건전성 관리',
                '재정준칙 운영'
            ]
        },
        {
            name: '예산실',
            head: '예산실장(차관보)',
            staff: 285,
            description: '예산편성, 기금운용, 재정성과 평가, 지방재정',
            aiAutomation: 98,
            functions: [
                '예산안 편성',
                '기금운용계획 수립',
                '재정성과 평가',
                '지방재정 조정'
            ]
        },
        {
            name: '세제실',
            head: '세제실장(차관보)',
            staff: 125,
            description: '세제개편, 조세정책, 국제조세, 관세정책',
            aiAutomation: 97,
            functions: [
                '세제 개편안 수립',
                '조세정책 총괄',
                '국제조세 협력',
                '관세정책 수립'
            ]
        },
        {
            name: '국고국',
            head: '국장(고위공무원)',
            staff: 72,
            description: '국고 관리, 국채 발행·관리, 정부회계',
            aiAutomation: 99,
            functions: [
                '국고자금 운용',
                '국채 발행·상환',
                '정부회계 관리',
                '재정자금 집행'
            ]
        },
        {
            name: '공공정책국',
            head: '국장(고위공무원)',
            staff: 85,
            description: '공공기관 지정·관리, 경영평가, 혁신',
            aiAutomation: 96,
            functions: [
                '공공기관 지정·관리',
                '경영평가',
                '공공기관 혁신',
                '공공기관 채용'
            ]
        },
        {
            name: '국제금융국',
            head: '국장(고위공무원)',
            staff: 78,
            description: '국제금융협력, IMF·세계은행, G20, 외환정책',
            aiAutomation: 98,
            functions: [
                'IMF·세계은행 협력',
                'G20·APEC 대응',
                '외환정책 수립',
                '국제금융센터'
            ]
        },
        {
            name: '대외경제국',
            head: '국장(고위공무원)',
            staff: 92,
            description: 'FTA, ODA, 경제협력, 해외투자',
            aiAutomation: 97,
            functions: [
                'FTA 협상·이행',
                'ODA 정책 수립',
                '대외경제협력',
                '해외투자 지원'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-blue-100 text-sm">
                    기획재정부는 경제부총리·2차관 산하 예산실·세제실·11개 국으로 구성되어 있습니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">전체 인력</p>
                            <p className="text-2xl font-bold text-blue-600">1,420명</p>
                            <p className="text-xs text-gray-500">본부+산하기관</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-indigo-600">97.8%</p>
                            <p className="text-xs text-gray-500">평균 자동화 비율</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">조직</p>
                            <p className="text-2xl font-bold text-purple-600">2실 11국</p>
                            <p className="text-xs text-gray-500">+ 4개 외청</p>
                        </div>
                        <span className="text-3xl">🏢</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="font-semibold text-gray-900">경제부총리 겸 장관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">국무총리 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">경제정책 총괄·조정, 부총리로서 국무위원 중 차석</div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <div className="font-semibold text-gray-900">제1차관 (정무직 또는 고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">경제정책국, 경제구조개혁국, 국제금융국 등 경제정책 총괄</div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <div className="font-semibold text-gray-900">제2차관 (고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">예산실, 재정정책국, 세제실 등 재정·예산 총괄</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
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
                                                    <span className="text-blue-500 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-blue-600">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">산하 외청</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">국세청</h4>
                        <p className="text-sm text-gray-600">국세 부과·징수, 세무조사</p>
                        <p className="text-xs text-gray-500 mt-1">청장(차관급), 인력 약 20,000명</p>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">관세청</h4>
                        <p className="text-sm text-gray-600">관세 부과·징수, 밀수 단속</p>
                        <p className="text-xs text-gray-500 mt-1">청장(차관급), 인력 약 5,000명</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">통계청</h4>
                        <p className="text-sm text-gray-600">국가통계 작성·관리·보급</p>
                        <p className="text-xs text-gray-500 mt-1">청장(차관급), 인력 약 3,500명</p>
                    </div>
                    
                    <div className="p-4 bg-cyan-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">조달청</h4>
                        <p className="text-sm text-gray-600">정부 물품·공사 조달</p>
                        <p className="text-xs text-gray-500 mt-1">청장(차관급), 인력 약 1,500명</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">경제부총리의 역할</h4>
                        <p className="text-sm text-blue-800">
                            경제부총리는 대한민국 경제정책을 총괄·조정하며, 국무위원 중 차석으로서 
                            국무총리를 보좌합니다. 경제 관련 부처(산업부, 금융위, 공정위 등)의 
                            정책을 조정하고 국가경제의 큰 방향을 설정합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
