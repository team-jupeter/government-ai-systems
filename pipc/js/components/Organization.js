const Organization = () => {
    const departments = [
        {
            name: '기획조정관',
            head: '고위공무원',
            staff: 85,
            description: '위원회 운영, 예산, 인사, 국제협력, 개인정보 포털',
            aiAutomation: 92,
            functions: [
                '위원회 회의 운영',
                '예산·인사·총무',
                '국제협력',
                '개인정보 포털 운영'
            ]
        },
        {
            name: '개인정보정책국',
            head: '국장(고위공무원)',
            staff: 95,
            description: '개인정보 보호 법령·정책 수립, 기본계획, 자율규제',
            aiAutomation: 94,
            functions: [
                '개인정보 보호법 제·개정',
                '기본계획 수립',
                '표준 개인정보 보호지침',
                '자율규제 및 인증'
            ]
        },
        {
            name: '개인정보보호기반국',
            head: '국장(고위공무원)',
            staff: 88,
            description: '기술 기준, 영향평가, 교육, AI·바이오정보 정책',
            aiAutomation: 96,
            functions: [
                '안전성 확보조치 기준',
                '개인정보 영향평가',
                '교육 및 홍보',
                'AI 프라이버시'
            ]
        },
        {
            name: '개인정보침해조사국',
            head: '국장(고위공무원)',
            staff: 128,
            description: '침해 신고 조사, 과징금 부과, 시정명령, 고발',
            aiAutomation: 98,
            functions: [
                '침해 신고 접수·조사',
                '과징금 부과',
                '시정명령',
                '검찰 고발'
            ]
        },
        {
            name: '개인정보분쟁조정국',
            head: '국장(고위공무원)',
            staff: 72,
            description: '분쟁조정위원회 운영, 피해구제, 집단분쟁조정',
            aiAutomation: 93,
            functions: [
                '분쟁조정위원회 운영',
                '개인정보 분쟁조정',
                '집단분쟁조정',
                '권리구제'
            ]
        },
        {
            name: '개인정보보호심의관',
            head: '고위공무원',
            staff: 45,
            description: '위원회 심의·의결 안건 검토, 법령 해석',
            aiAutomation: 91,
            functions: [
                '심의안건 검토',
                '법령 해석',
                '유권해석',
                '규칙 제·개정'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-indigo-100 text-sm">
                    개인정보보호위원회는 위원장·부위원장 산하 6개 국으로 구성되어 있습니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard 
                    title="전체 인력" 
                    value="513명" 
                    subtitle="공무원 + 전문직"
                    icon="👥" 
                    color="indigo" 
                />
                <StatCard 
                    title="AI 자동화율" 
                    value="95.2%" 
                    subtitle="평균 자동화 비율"
                    icon="🤖" 
                    color="blue" 
                />
                <StatCard 
                    title="부서 수" 
                    value="6개 국" 
                    subtitle="1관 5국 체제"
                    icon="🏢" 
                    color="purple" 
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">위원회 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <div className="font-semibold text-gray-900">위원장 (장관급 정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">국무총리 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">위원회 대표, 회의 주재, 소관 사무 총괄</div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="font-semibold text-gray-900">부위원장 (차관급 정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">국무총리 제청, 대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">위원장 보좌, 사무처 지휘·감독</div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <div className="font-semibold text-gray-900">비상임위원 7명</div>
                        <div className="text-sm text-gray-600 mt-1">위원장 제청 2명, 여당 추천 2명, 야당 추천 3명</div>
                        <div className="text-sm text-gray-700 mt-2">위원회 심의·의결 참여 (임기 3년, 연임 가능)</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold">{dept.name}</h4>
                                        <p className="text-sm text-indigo-100 mt-1">{dept.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{dept.staff}명</div>
                                        <div className="text-xs text-indigo-200">{dept.head}</div>
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
                                                    <span className="text-indigo-500 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-indigo-600">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-indigo-500 to-blue-600 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">개인정보 분쟁조정위원회</h3>
                <div className="space-y-3">
                    <p className="text-gray-700">
                        개인정보 분쟁조정위원회는 개인정보와 관련된 분쟁을 신속·공정하게 해결하기 위한 기구입니다.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">위원 구성</div>
                            <div className="text-xl font-bold text-indigo-600">30명 이내</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">평균 조정 기간</div>
                            <div className="text-xl font-bold text-blue-600">60일 이내</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">연간 조정 건수</div>
                            <div className="text-xl font-bold text-purple-600">약 3,000건</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-indigo-900 mb-1">독립성 보장</h4>
                        <p className="text-sm text-indigo-800">
                            개인정보보호위원회는 국무총리 소속의 합의제 행정기관으로서 
                            개인정보 보호에 관한 사무를 독립적으로 수행합니다.
                            위원장과 위원은 법률이 정한 사유가 아니면 해촉되지 않습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
