const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        headquarters: {
            name: '방송미디어통신위원회 본부',
            location: '경기도 과천시 관문로 47',
            departments: [
                { id: 'broadcasting-policy', name: '방송정책국', staff: 48, mainTasks: ['지상파방송정책', '방송채널정책', '유료방송정책', '편성평가정책'] },
                { id: 'media-policy', name: '미디어정책국', staff: 42, mainTasks: ['뉴미디어정책', '디지털방송정책', 'OTT 정책', '방송진흥기획'] },
                { id: 'communication', name: '통신정책국', staff: 38, mainTasks: ['통신이용자보호', '인터넷 윤리', '건전한 인터넷 환경 조성'] },
                { id: 'market-survey', name: '시장조사국', staff: 35, mainTasks: ['방송통신시장조사', '경쟁정책', '시청자 권익증진'] },
                { id: 'planning', name: '기획조정실', staff: 32, mainTasks: ['정책 기획', '예산 편성', '성과 관리', '국제협력'] },
                { id: 'advertising', name: '방송광고정책과', staff: 28, mainTasks: ['방송광고 정책', '광고 규제', '공익광고'] }
            ]
        },
        affiliated: [
            { name: '방송통신심의위원회', location: '서울 양천구', role: '방송·통신 내용 심의', type: '독립기관' },
            { name: '방송콘텐츠진흥재단', location: '서울 영등포구', role: '방송콘텐츠 진흥', type: '재단법인' },
            { name: '한국방송기술산업협회', location: '서울 양천구', role: '방송기술 발전', type: '사단법인' },
            { name: '한국방송기술인연합회', location: '서울 양천구', role: '방송기술인 지원', type: '사단법인' }
        ]
    };
    
    return (
        <div className="space-y-6">
            {/* 조직 개요 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">방송미디어통신위원회 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="총 인원" 
                        value="267명" 
                        subtitle="2025년 기준"
                        icon="👥" 
                        color="blue" 
                    />
                    <StatCard 
                        title="본부 부서" 
                        value="6개국" 
                        subtitle="18개 과"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="위원 구성" 
                        value="5명" 
                        subtitle="위원장+부위원장+3"
                        icon="👔" 
                        color="purple" 
                    />
                </div>
                
                {/* 합의제 위원회 구조 */}
                <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                    <h4 className="font-semibold text-gray-900 mb-3">합의제 위원회 구조</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white rounded p-3">
                            <div className="font-semibold text-indigo-700 mb-1">위원장 (장관급)</div>
                            <div className="text-gray-600">대통령 지명</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="font-semibold text-purple-700 mb-1">부위원장 (차관급)</div>
                            <div className="text-gray-600">대통령 지명</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="font-semibold text-blue-700 mb-1">위원 3명</div>
                            <div className="text-gray-600">국회 추천</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 본부 주요 부서 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">본부 주요 부서</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organization.headquarters.departments.map(dept => (
                        <div 
                            key={dept.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedDept(selectedDept === dept.id ? null : dept.id)}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {dept.staff}명
                                </span>
                            </div>
                            
                            {/* 축소된 상태 */}
                            {selectedDept !== dept.id && (
                                <p className="text-sm text-gray-600">
                                    {dept.mainTasks[0]} 외 {dept.mainTasks.length - 1}개 업무
                                </p>
                            )}
                            
                            {/* 확장된 상태 */}
                            {selectedDept === dept.id && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <h5 className="text-sm font-medium text-gray-900 mb-2">주요 업무</h5>
                                    <ul className="space-y-1">
                                        {dept.mainTasks.map((task, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                <span className="text-blue-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">자동 처리율</span>
                                                <span className="font-semibold text-purple-600">
                                                    {Math.round(Math.random() * 30 + 60)}%
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">오늘 처리 건수</span>
                                                <span className="font-semibold text-blue-600">
                                                    {Math.round(Math.random() * 150 + 80)}건
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 소속 및 산하 기관 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">소속 및 유관 기관</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {organization.affiliated.map((org, idx) => (
                        <div 
                            key={idx}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{org.name}</h4>
                                    <p className="text-sm text-gray-500">📍 {org.location}</p>
                                </div>
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                                    {org.type}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">주요 역할:</span> {org.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 업무 흐름 안내 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                    💡 국가데이터처 기반 업무 흐름
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                    <p>
                        <span className="font-semibold">1단계:</span> 각 부서는 업무 수행을 위해 국가데이터처(NDR)에서 방송·통신 관련 데이터를 인출합니다.
                    </p>
                    <p>
                        <span className="font-semibold">2단계:</span> AI가 심의 기준, 규제 요건, 민원 내용을 분석하여 자동 처리하거나 담당자가 검토합니다.
                    </p>
                    <p>
                        <span className="font-semibold">3단계:</span> 처리 결과를 다시 국가데이터처에 저장하고, 모든 과정은 오픈해시에 기록됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
