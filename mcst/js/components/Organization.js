const Organization = () => {
    const departments = [
        {
            name: '기획조정실',
            head: '실장(고위공무원)',
            staff: 125,
            description: '정책기획·조정, 예산·인사',
            aiAutomation: 97,
            functions: [
                '정책기획·조정',
                '예산·결산 관리',
                '인사·조직 운영',
                '국제협력·교류'
            ]
        },
        {
            name: '문화예술정책실',
            head: '실장(고위공무원)',
            staff: 168,
            description: '문화예술 진흥·지원',
            aiAutomation: 99,
            functions: [
                '문화예술 지원',
                '예술인 복지',
                '박물관·도서관 운영',
                '문화시설 확충'
            ]
        },
        {
            name: '문화콘텐츠산업실',
            head: '실장(고위공무원)',
            staff: 152,
            description: '콘텐츠산업·저작권·미디어',
            aiAutomation: 98,
            functions: [
                '콘텐츠산업 육성',
                '저작권 보호',
                '미디어 정책',
                '영화·방송 진흥'
            ]
        },
        {
            name: '관광정책국',
            head: '국장(고위공무원)',
            staff: 138,
            description: '관광산업 진흥',
            aiAutomation: 99,
            functions: [
                '관광산업 육성',
                '관광자원 개발',
                '외래관광객 유치',
                '관광인프라 구축'
            ]
        },
        {
            name: '체육국',
            head: '국장(고위공무원)',
            staff: 145,
            description: '체육 진흥',
            aiAutomation: 98,
            functions: [
                '생활체육 활성화',
                '엘리트체육 육성',
                '체육시설 지원',
                '국제경기 개최'
            ]
        },
        {
            name: '국민소통실',
            head: '실장(고위공무원)',
            staff: 112,
            description: '국정홍보·대변인',
            aiAutomation: 97,
            functions: [
                '국정홍보 총괄',
                '정부대변인',
                '언론 대응',
                '정책소통'
            ]
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-700 to-rose-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">조직 구조</h2>
                <p className="text-pink-100 text-sm">
                    문화체육관광부는 장관·차관(2명)·차관보 산하 6개 실·국 및 소속기관으로 구성됩니다
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">본부 인력</p>
                            <p className="text-2xl font-bold text-pink-700">1,200명</p>
                            <p className="text-xs text-gray-500">공무원</p>
                        </div>
                        <span className="text-3xl">👥</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">소속기관</p>
                            <p className="text-2xl font-bold text-rose-700">42개</p>
                            <p className="text-xs text-gray-500">박물관·도서관 등</p>
                        </div>
                        <span className="text-3xl">🏛️</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">AI 자동화율</p>
                            <p className="text-2xl font-bold text-pink-800">98.2%</p>
                            <p className="text-xs text-gray-500">평균 자동화</p>
                        </div>
                        <span className="text-3xl">🤖</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수뇌부 구성</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-700">
                        <div className="font-semibold text-gray-900">문화체육관광부장관 (국무위원·정부대변인)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            문화·예술·체육·관광·국정홍보 총괄, 정부대변인
                        </div>
                    </div>
                    
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-700">
                        <div className="font-semibold text-gray-900">제1차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            문화예술·미디어콘텐츠·종교 사무 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                        <div className="font-semibold text-gray-900">제2차관 (정무직)</div>
                        <div className="text-sm text-gray-600 mt-1">대통령 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            국정홍보·관광·체육 사무 총괄
                        </div>
                    </div>
                    
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-600">
                        <div className="font-semibold text-gray-900">차관보 (고위공무원)</div>
                        <div className="text-sm text-gray-600 mt-1">장관 임명</div>
                        <div className="text-sm text-gray-700 mt-2">
                            국정홍보 업무 보좌
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 부서별 현황</h3>
                <div className="space-y-4">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-bold">{dept.name}</h4>
                                        <p className="text-sm text-pink-100 mt-1">{dept.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{dept.staff}명</div>
                                        <div className="text-xs text-pink-200">{dept.head}</div>
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
                                                    <span className="text-pink-700 mr-2">•</span>
                                                    <span>{func}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">AI 자동화</h5>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">자동화 비율</span>
                                            <span className="text-lg font-bold text-pink-700">{dept.aiAutomation}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-gradient-to-r from-pink-600 to-rose-600 h-3 rounded-full transition-all duration-500"
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
                <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-700">
                    <h4 className="font-semibold text-gray-900">국가유산청</h4>
                    <p className="text-sm text-gray-600 mt-1">청장: 차관급</p>
                    <p className="text-xs text-gray-500 mt-1">문화재 보존·관리, 궁궐·왕릉 관리</p>
                    <div className="mt-2 text-xs text-gray-600">
                        • 국립문화재연구소<br/>
                        • 국립고궁박물관<br/>
                        • 국립무형유산원
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 소속기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-700">
                        <h4 className="font-semibold text-gray-900">국립중앙박물관</h4>
                        <p className="text-sm text-gray-600 mt-1">용산 소재</p>
                        <p className="text-xs text-gray-500 mt-1">연 300만명 방문</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-700">
                        <h4 className="font-semibold text-gray-900">국립중앙도서관</h4>
                        <p className="text-sm text-gray-600 mt-1">서초구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">장서 1,300만권</p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                        <h4 className="font-semibold text-gray-900">국립국악원</h4>
                        <p className="text-sm text-gray-600 mt-1">서초구 소재</p>
                        <p className="text-xs text-gray-500 mt-1">국악 보존·계승</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-600">
                        <h4 className="font-semibold text-gray-900">한국예술종합학교</h4>
                        <p className="text-sm text-gray-600 mt-1">성북·서초·종로</p>
                        <p className="text-xs text-gray-500 mt-1">예술인 양성</p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                        <h4 className="font-semibold text-gray-900">국립민속박물관</h4>
                        <p className="text-sm text-gray-600 mt-1">경복궁 내</p>
                        <p className="text-xs text-gray-500 mt-1">민속문화 전시</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-500">
                        <h4 className="font-semibold text-gray-900">해외문화홍보원</h4>
                        <p className="text-sm text-gray-600 mt-1">한류 확산</p>
                        <p className="text-xs text-gray-500 mt-1">K-컬처 홍보</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">산하기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-700">
                        <h4 className="font-semibold text-gray-900">한국관광공사</h4>
                        <p className="text-sm text-gray-600 mt-1">관광진흥·마케팅</p>
                        <p className="text-xs text-gray-500 mt-1">공공기관</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-700">
                        <h4 className="font-semibold text-gray-900">한국문화예술위원회</h4>
                        <p className="text-sm text-gray-600 mt-1">문화예술 지원</p>
                        <p className="text-xs text-gray-500 mt-1">예술인 창작지원</p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-600">
                        <h4 className="font-semibold text-gray-900">한국콘텐츠진흥원</h4>
                        <p className="text-sm text-gray-600 mt-1">콘텐츠산업 육성</p>
                        <p className="text-xs text-gray-500 mt-1">게임·영화·방송</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-600">
                        <h4 className="font-semibold text-gray-900">대한체육회</h4>
                        <p className="text-sm text-gray-600 mt-1">체육 진흥</p>
                        <p className="text-xs text-gray-500 mt-1">국제대회 참가</p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                        <h4 className="font-semibold text-gray-900">영화진흥위원회</h4>
                        <p className="text-sm text-gray-600 mt-1">영화산업 진흥</p>
                        <p className="text-xs text-gray-500 mt-1">영화 지원·육성</p>
                    </div>
                    <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-500">
                        <h4 className="font-semibold text-gray-900">국민체육진흥공단</h4>
                        <p className="text-sm text-gray-600 mt-1">체육진흥기금 조성</p>
                        <p className="text-xs text-gray-500 mt-1">체육복권 발행</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-pink-50 border-l-4 border-pink-700 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                        <h4 className="font-semibold text-pink-900 mb-1">문화체육관광부의 역할</h4>
                        <p className="text-sm text-pink-800">
                            문화체육관광부는 국민의 문화향유권을 증진하고, 
                            K-컬처의 글로벌 확산을 통해 국가 브랜드를 제고하며, 
                            생활체육과 관광산업 진흥으로 국민 삶의 질을 향상시킵니다. 
                            또한 정부대변인으로서 국정홍보와 소통을 책임집니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
