const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 165,
            description: '정책기획·조정, 예산·인사',
            aiAutomation: 97,
            functions: [
                '정책기획·조정',
                '예산·결산 관리',
                '인사·조직 운영',
                '국제협력·FTA'
            ]
        },
        {
            name: '농업혁신정책실',
            head: '실장(고위공무원)',
            staff: 188,
            description: '농업혁신·스마트팜',
            aiAutomation: 99,
            functions: [
                '농업혁신 총괄',
                '스마트팜 보급',
                '농업기계화',
                '농업기술 R&D'
            ]
        },
        {
            name: '식량정책국',
            head: '국장(고위공무원)',
            staff: 172,
            description: '쌀·밭작물·식량안보',
            aiAutomation: 99,
            functions: [
                '쌀 수급·정책',
                '밭작물 생산',
                '식량안보',
                '농업직불금'
            ]
        },
        {
            name: '축산정책국',
            head: '국장(고위공무원)',
            staff: 158,
            description: '축산진흥·가축질병',
            aiAutomation: 99,
            functions: [
                '축산농가 육성',
                '가축 방역',
                '축산물 위생',
                '사료 관리'
            ]
        },
        {
            name: '농촌정책국',
            head: '국장(고위공무원)',
            staff: 145,
            description: '농촌개발·귀농귀촌',
            aiAutomation: 98,
            functions: [
                '농촌지역 개발',
                '귀농·귀촌 지원',
                '농촌복지',
                '농촌공간 계획'
            ]
        },
        {
            name: '유통소비정책관',
            head: '정책관(고위공무원)',
            staff: 132,
            description: '농산물 유통·소비',
            aiAutomation: 98,
            functions: [
                '농산물 유통',
                '가격 안정',
                '소비 촉진',
                '수출 진흥'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-green-100 text-sm">
                    농림축산식품부는 장관·차관·차관보 산하 3실 11국·관 및 소속기관으로 구성됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-green-700">1,850명</p>
                            <p className="text-xs text-gray-500">공무원</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">소속기관</p>
                            <p className="text-2xl font-bold text-emerald-700">8개</p>
                            <p className="text-xs text-gray-500">검역·품질관리</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-green-800">98.5%</p>
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
                        <div className="font-semibold text-gray-900">농림축산식품부장관 (국무위원)</div>
                        <div className="text-sm text-gray-600 mt-1">송미령 장관 (2023.12~)</div>
                        <div className="text-sm text-gray-700 mt-2">
                            농업·축산·식량·식품산업·농촌개발 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-700">
                        <div className="font-semibold text-gray-900">차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            농림축산식품부 사무 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                        <div className="font-semibold text-gray-900">차관보 (고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            농업혁신·식품산업 업무 보좌
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
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
                                                    <span className="text-green-700 mr-2">•</span>
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
                                                className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full transition-all duration-500"
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
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <h4 className="font-semibold text-gray-900">농촌진흥청</h4>
                        <p className="text-sm text-gray-600 mt-1">청장: 차관급 (정무직)</p>
                        <p className="text-xs text-gray-500 mt-1">농업기술 연구·보급, 농업인 교육</p>
                        <div className="mt-2 text-xs text-gray-600">
                            • 국립농업과학원<br/>
                            • 국립식량과학원<br/>
                            • 국립원예특작과학원<br/>
                            • 국립축산과학원
                        </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-700">
                        <h4 className="font-semibold text-gray-900">산림청</h4>
                        <p className="text-sm text-gray-600 mt-1">청장: 차관급 (정무직)</p>
                        <p className="text-xs text-gray-500 mt-1">산림자원 관리, 임업 진흥</p>
                        <div className="mt-2 text-xs text-gray-600">
                            • 국립산림과학원<br/>
                            • 산림항공본부<br/>
                            • 지방산림청 (4개)<br/>
                            • 국립자연휴양림관리소
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 소속기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <h4 className="font-semibold text-gray-900">농림축산검역본부</h4>
                        <p className="text-sm text-gray-600 mt-1">본부장: 고위공무원</p>
                        <p className="text-xs text-gray-500 mt-1">동식물 검역·방역</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-700">
                        <h4 className="font-semibold text-gray-900">국립농산물품질관리원</h4>
                        <p className="text-sm text-gray-600 mt-1">원장: 고위공무원</p>
                        <p className="text-xs text-gray-500 mt-1">농산물 품질인증</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                        <h4 className="font-semibold text-gray-900">국립종자원</h4>
                        <p className="text-sm text-gray-600 mt-1">원장: 고위공무원</p>
                        <p className="text-xs text-gray-500 mt-1">종자검정·품종보호</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-600">
                        <h4 className="font-semibold text-gray-900">농식품공무원교육원</h4>
                        <p className="text-sm text-gray-600 mt-1">원장: 고위공무원</p>
                        <p className="text-xs text-gray-500 mt-1">공무원 교육·훈련</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-gray-900">국립한국농수산대학교</h4>
                        <p className="text-sm text-gray-600 mt-1">총장: 고위공무원</p>
                        <p className="text-xs text-gray-500 mt-1">농업후계인력 양성</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                        <h4 className="font-semibold text-gray-900">농림수산식품교육문화정보원</h4>
                        <p className="text-sm text-gray-600 mt-1">원장: 임기제</p>
                        <p className="text-xs text-gray-500 mt-1">농업교육·홍보</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">산하기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-700">
                        <h4 className="font-semibold text-gray-900">한국농수산식품유통공사(aT)</h4>
                        <p className="text-sm text-gray-600 mt-1">농산물 유통·수출지원</p>
                        <p className="text-xs text-gray-500 mt-1">공공기관</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-700">
                        <h4 className="font-semibold text-gray-900">한국농어촌공사</h4>
                        <p className="text-sm text-gray-600 mt-1">농지·수리시설 관리</p>
                        <p className="text-xs text-gray-500 mt-1">공공기관</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                        <h4 className="font-semibold text-gray-900">농협중앙회</h4>
                        <p className="text-sm text-gray-600 mt-1">농업협동조합 중앙회</p>
                        <p className="text-xs text-gray-500 mt-1">특수법인</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-600">
                        <h4 className="font-semibold text-gray-900">한국농촌경제연구원</h4>
                        <p className="text-sm text-gray-600 mt-1">농업정책 연구</p>
                        <p className="text-xs text-gray-500 mt-1">정부출연 연구기관</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-gray-900">축산물품질평가원</h4>
                        <p className="text-sm text-gray-600 mt-1">축산물 등급판정</p>
                        <p className="text-xs text-gray-500 mt-1">위탁집행형 준정부기관</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                        <h4 className="font-semibold text-gray-900">농림식품기술기획평가원</h4>
                        <p className="text-sm text-gray-600 mt-1">R&D 기획·평가</p>
                        <p className="text-xs text-gray-500 mt-1">기타공공기관</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-green-900 mb-1">농림축산식품부의 역할</h4>
                        <p className="text-sm text-green-800">
                            농림축산식품부는 식량안보를 확보하고 농업·축산업의 경쟁력을 강화하며, 
                            농업인 소득 증대와 농촌의 지속가능한 발전을 추구합니다. 
                            또한 안전한 먹거리를 공급하고 식품산업을 육성하여 국민의 삶의 질을 향상시킵니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
