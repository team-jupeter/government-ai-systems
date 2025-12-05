const Organization = () => {
    const departments = [
        {
            name: '기획조정관',
            head: '고위공무원',
            staff: 85,
            description: '보훈정책 기획·조정, 예산·인사',
            aiAutomation: 97,
            functions: [
                '보훈정책 종합기획',
                '예산·결산 관리',
                '인사·조직 운영',
                '대외협력·홍보'
            ]
        },
        {
            name: '보훈예우국',
            head: '국장(고위공무원)',
            staff: 128,
            description: '국가유공자 보상·예우',
            aiAutomation: 99,
            functions: [
                '보상금·수당 지급',
                '보훈급여 심사',
                '국가유공자 등록',
                '예우 제도 운영'
            ]
        },
        {
            name: '보훈의료복지국',
            head: '국장(고위공무원)',
            staff: 142,
            description: '보훈의료·복지 지원',
            aiAutomation: 98,
            functions: [
                '보훈병원 운영',
                '위탁병원 관리',
                '의료비 지원',
                '복지서비스 제공'
            ]
        },
        {
            name: '제대군인정책국',
            head: '국장(고위공무원)',
            staff: 118,
            description: '제대군인 지원',
            aiAutomation: 98,
            functions: [
                '취업지원',
                '직업훈련·교육',
                '창업지원',
                '심리상담·복지'
            ]
        },
        {
            name: '보훈문화국',
            head: '국장(고위공무원)',
            staff: 95,
            description: '보훈선양·교육',
            aiAutomation: 96,
            functions: [
                '국립묘지 관리',
                '보훈문화 확산',
                '나라사랑 교육',
                '기념사업 추진'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-purple-100 text-sm">
                    국가보훈부는 장관·차관 산하 5개국 및 지방보훈청·보훈병원·국립묘지로 구성됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-purple-800">850명</p>
                            <p className="text-xs text-gray-500">공무원</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">소속기관</p>
                            <p className="text-2xl font-bold text-indigo-800">28개</p>
                            <p className="text-xs text-gray-500">지방청·병원·묘지</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-purple-700">97.8%</p>
                            <p className="text-xs text-gray-500">평균 자동화</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-800">
                        <div className="font-semibold text-gray-900">국가보훈부장관 (국무위원)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            국가유공자 예우·제대군인 지원·보훈선양 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <div className="font-semibold text-gray-900">차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            장관 보좌, 소속기관 총괄, 보훈정책 집행
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-4">
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
                                                    <span className="text-purple-700 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-purple-800">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-purple-700 to-indigo-700 h-3 rounded-full transition-all duration-500"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">지방보훈청 (5개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-800">
                        <h4 className="font-semibold text-gray-900">서울보훈청</h4>
                        <p className="text-sm text-gray-600 mt-1">관할: 서울·경기·인천</p>
                        <p className="text-xs text-gray-500 mt-1">지청 3개</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <h4 className="font-semibold text-gray-900">부산보훈청</h4>
                        <p className="text-sm text-gray-600 mt-1">관할: 부산·울산·경남</p>
                        <p className="text-xs text-gray-500 mt-1">지청 2개</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <h4 className="font-semibold text-gray-900">대구보훈청</h4>
                        <p className="text-sm text-gray-600 mt-1">관할: 대구·경북</p>
                        <p className="text-xs text-gray-500 mt-1">지청 2개</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <h4 className="font-semibold text-gray-900">광주보훈청</h4>
                        <p className="text-sm text-gray-600 mt-1">관할: 광주·전남·전북·제주</p>
                        <p className="text-xs text-gray-500 mt-1">지청 3개</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                        <h4 className="font-semibold text-gray-900">대전보훈청</h4>
                        <p className="text-sm text-gray-600 mt-1">관할: 대전·충남·충북·강원</p>
                        <p className="text-xs text-gray-500 mt-1">지청 4개</p>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                    ※ 지방보훈청 5개, 지방보훈지청 14개 운영 중
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">보훈병원 (5개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-800">
                        <h4 className="font-semibold text-gray-900">서울보훈병원</h4>
                        <p className="text-sm text-gray-600 mt-1">서울 강동구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">500병상</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <h4 className="font-semibold text-gray-900">부산보훈병원</h4>
                        <p className="text-sm text-gray-600 mt-1">부산 남구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">400병상</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <h4 className="font-semibold text-gray-900">대구보훈병원</h4>
                        <p className="text-sm text-gray-600 mt-1">대구 남구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">350병상</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <h4 className="font-semibold text-gray-900">광주보훈병원</h4>
                        <p className="text-sm text-gray-600 mt-1">광주 광산구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">300병상</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                        <h4 className="font-semibold text-gray-900">중앙보훈병원</h4>
                        <p className="text-sm text-gray-600 mt-1">서울 강동구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">600병상</p>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                    ※ 총 2,150병상, 연간 진료 약 150만건
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">국립묘지 (9개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-800">
                        <h4 className="font-semibold text-gray-900">국립서울현충원</h4>
                        <p className="text-sm text-gray-600 mt-1">서울 동작구 (141만㎡)</p>
                        <p className="text-xs text-gray-500 mt-1">안장: 약 16만위</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <h4 className="font-semibold text-gray-900">국립대전현충원</h4>
                        <p className="text-sm text-gray-600 mt-1">대전 유성구 (330만㎡)</p>
                        <p className="text-xs text-gray-500 mt-1">안장: 약 7만위</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <h4 className="font-semibold text-gray-900">국립호국원 6개소</h4>
                        <p className="text-sm text-gray-600 mt-1">임실·영천·이천·산청·제주·괴산</p>
                        <p className="text-xs text-gray-500 mt-1">안장: 약 3만위</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <h4 className="font-semibold text-gray-900">국립민주묘지 1개소</h4>
                        <p className="text-sm text-gray-600 mt-1">5·18민주묘지(광주)</p>
                        <p className="text-xs text-gray-500 mt-1">안장: 약 800위</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">산하기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-800">
                        <h4 className="font-semibold text-gray-900">한국보훈복지의료공단</h4>
                        <p className="text-sm text-gray-600 mt-1">보훈병원 운영·의료지원</p>
                        <p className="text-xs text-gray-500 mt-1">준정부기관</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-800">
                        <h4 className="font-semibold text-gray-900">독립기념관</h4>
                        <p className="text-sm text-gray-600 mt-1">독립운동 역사 전시·교육</p>
                        <p className="text-xs text-gray-500 mt-1">충남 천안 소재</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-700">
                        <h4 className="font-semibold text-gray-900">국립보훈원</h4>
                        <p className="text-sm text-gray-600 mt-1">양로·양육·교육훈련</p>
                        <p className="text-xs text-gray-500 mt-1">경기 고양 소재</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-700">
                        <h4 className="font-semibold text-gray-900">제대군인지원센터</h4>
                        <p className="text-sm text-gray-600 mt-1">제대군인 취업·상담</p>
                        <p className="text-xs text-gray-500 mt-1">전국 5개소</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-800 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-purple-900 mb-1">국가보훈부의 역할</h4>
                        <p className="text-sm text-purple-800">
                            국가보훈부는 국가를 위해 희생하고 공헌한 분들과 그 유족에게 
                            합당한 예우와 지원을 제공하며, 제대군인의 성공적인 사회복귀를 돕고, 
                            보훈문화를 확산하여 국민통합에 기여합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
