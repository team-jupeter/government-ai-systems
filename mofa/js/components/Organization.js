const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 125,
            description: '정책기획, 예산, 인사, 조직 총괄',
            aiAutomation: 98,
            functions: [
                '외교정책 기획·조정',
                '예산·인사 관리',
                '법무·감사',
                '국회·언론 대응'
            ]
        },
        {
            name: '한반도평화교섭본부',
            head: '본부장(차관급)',
            staff: 95,
            description: '한반도 평화프로세스, 북핵 문제 대응',
            aiAutomation: 99,
            functions: [
                '남북관계',
                '북핵 협상',
                '한반도 평화체제',
                '6자회담'
            ]
        },
        {
            name: '국제법률국',
            head: '국장(고위공무원)',
            staff: 68,
            description: '조약, 국제법, 법률자문',
            aiAutomation: 98,
            functions: [
                '조약 체결·비준',
                '국제법 자문',
                '법률검토',
                '조약집 편찬'
            ]
        },
        {
            name: '다자외교조정관',
            head: '조정관(고위공무원)',
            staff: 58,
            description: '다자외교 전략, UN 등 국제기구 협력',
            aiAutomation: 99,
            functions: [
                '다자외교 전략',
                'UN 협력',
                '국제회의 조정',
                'G20·APEC 대응'
            ]
        },
        {
            name: '국제기구국',
            head: '국장(고위공무원)',
            staff: 72,
            description: 'UN, 국제기구 정책, 국제개발협력',
            aiAutomation: 97,
            functions: [
                'UN 정책',
                '국제기구 가입·분담금',
                'ODA(공적개발원조)',
                '국제개발협력'
            ]
        },
        {
            name: '아주국',
            head: '국장(고위공무원)',
            staff: 88,
            description: '동북아·동남아·남아시아 외교',
            aiAutomation: 98,
            functions: [
                '한·중·일 관계',
                '아세안 협력',
                '인도·호주 관계',
                '역내 경제협력'
            ]
        },
        {
            name: '미주국',
            head: '국장(고위공무원)',
            staff: 75,
            description: '미국, 중남미 외교',
            aiAutomation: 98,
            functions: [
                '한·미 동맹',
                '북미 관계',
                '중남미 협력',
                '역내 정세 분석'
            ]
        },
        {
            name: '구주국',
            head: '국장(고위공무원)',
            staff: 65,
            description: '유럽, 러시아, 중앙아시아 외교',
            aiAutomation: 97,
            functions: [
                '한·EU 관계',
                '러시아 협력',
                '중앙아시아 신북방정책',
                '역내 협력'
            ]
        },
        {
            name: '아프리카중동국',
            head: '국장(고위공무원)',
            staff: 62,
            description: '아프리카, 중동 외교',
            aiAutomation: 96,
            functions: [
                '중동 정세 대응',
                '아프리카 협력',
                '에너지·자원 외교',
                '개발협력'
            ]
        },
        {
            name: '재외동포영사국',
            head: '국장(고위공무원)',
            staff: 158,
            description: '재외국민 보호, 영사업무, 재외동포 정책',
            aiAutomation: 97,
            functions: [
                '재외국민 보호',
                '여권 발급',
                '영사 조력',
                '재외동포 지원'
            ]
        },
        {
            name: '문화외교국',
            head: '국장(고위공무원)',
            staff: 55,
            description: '문화·공공외교, 대외홍보',
            aiAutomation: 96,
            functions: [
                '문화외교',
                '공공외교',
                '한류 지원',
                '대외 홍보'
            ]
        },
        {
            name: '경제외교조정관',
            head: '조정관(고위공무원)',
            staff: 52,
            description: '경제외교 전략, 국제경제협력',
            aiAutomation: 98,
            functions: [
                '경제외교 전략',
                '국제경제기구 협력',
                'G20 경제 의제',
                '통상 지원'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-blue-100 text-sm">
                    외교부는 장관·2차관 산하 3실 11국 체계로 전 세계 외교를 총괄합니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-blue-600">1,073명</p>
                            <p className="text-xs text-gray-500">외무공무원</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">재외공관</p>
                            <p className="text-2xl font-bold text-indigo-600">184개</p>
                            <p className="text-xs text-gray-500">전 세계</p>
                        </div>
                        <span className="text-3xl">🌍</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-purple-600">97.8%</p>
                            <p className="text-xs text-gray-500">평균 자동화</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="font-semibold text-gray-900">외교부장관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명 (국무총리 제청)</div>
                        <div className="text-sm text-gray-700 mt-2">
                            외교정책 총괄, 경제외교, 국제협력, 조약, 재외국민 보호 총책임
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                            <div className="font-semibold text-gray-900">제1차관 (고위공무원)</div>
                            <div className="text-sm text-gray-600 mt-1">장관 보좌, 정무 총괄</div>
                            <div className="text-sm text-gray-700 mt-2">
                                양자외교, 다자외교, 경제외교, 문화외교 담당
                            </div>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                            <div className="font-semibold text-gray-900">제2차관 (고위공무원)</div>
                            <div className="text-sm text-gray-600 mt-1">장관 보좌, 영사·동포 총괄</div>
                            <div className="text-sm text-gray-700 mt-2">
                                재외국민 보호, 영사업무, 재외동포 정책 담당
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <div className="font-semibold text-gray-900">차관보 (고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">차관 보좌, 업무 조정</div>
                        <div className="text-sm text-gray-700 mt-2">
                            특정 현안 총괄, 부처 간 협력, 국회 대응
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4">
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">재외공관 현황 (184개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <div className="text-3xl font-bold text-blue-600">111개</div>
                        <div className="text-sm text-gray-600 mt-1">대사관</div>
                        <div className="text-xs text-gray-500">주재국 외교</div>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg text-center">
                        <div className="text-3xl font-bold text-indigo-600">47개</div>
                        <div className="text-sm text-gray-600 mt-1">총영사관</div>
                        <div className="text-xs text-gray-500">영사 업무</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                        <div className="text-3xl font-bold text-purple-600">20개</div>
                        <div className="text-sm text-gray-600 mt-1">대표부</div>
                        <div className="text-xs text-gray-500">국제기구</div>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg text-center">
                        <div className="text-3xl font-bold text-cyan-600">6개</div>
                        <div className="text-sm text-gray-600 mt-1">분관</div>
                        <div className="text-xs text-gray-500">특별 지역</div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">소속기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-gray-900">국립외교원</h4>
                        <p className="text-sm text-gray-600 mt-1">원장: 차관급</p>
                        <p className="text-xs text-gray-500 mt-1">외교관 교육·훈련, 외교안보 연구</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-semibold text-gray-900">재외동포청</h4>
                        <p className="text-sm text-gray-600 mt-1">외청 (2023년 신설)</p>
                        <p className="text-xs text-gray-500 mt-1">재외동포 정책 총괄</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">글로벌 외교 네트워크</h4>
                        <p className="text-sm text-blue-800">
                            외교부는 193개 수교국과 184개 재외공관을 통해 전 세계를 연결합니다. 
                            DeepSeek R1 AI가 실시간으로 국제정세를 분석하고, 742만 재외국민의 
                            안전을 24시간 모니터링합니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
