const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        headquarters: {
            name: '고위공직자범죄수사처 본청',
            location: '경기도 과천시 정부과천청사',
            departments: [
                { id: 'director', name: '처장실', staff: 5, mainTasks: ['공수처 총괄', '대외협력', '정책 수립'] },
                { id: 'deputy', name: '차장실', staff: 4, mainTasks: ['처장 보좌', '업무 조정', '인사 관리'] },
                { id: 'planning', name: '수사기획관', staff: 12, mainTasks: ['수사 기획', '사건 배당', '수사 지휘'] },
                { id: 'human-rights', name: '인권수사정책관', staff: 10, mainTasks: ['인권 보호', '수사 적법성 검토', '피의자 권리 보장'] },
                { id: 'investigation-1', name: '수사1부', staff: 35, mainTasks: ['고위공직자 직권남용 수사', '뇌물 수수 사건', '증거 분석'] },
                { id: 'investigation-2', name: '수사2부', staff: 32, mainTasks: ['정치자금법 위반 수사', '선거법 위반', '불법 정치 자금'] },
                { id: 'investigation-3', name: '수사3부', staff: 30, mainTasks: ['판검사 비리 수사', '법조비리', '사법농단'] },
                { id: 'investigation-4', name: '수사4부', staff: 28, mainTasks: ['경찰 간부 비리', '국가정보원 불법 행위', '권력형 비리'] },
                { id: 'digital', name: '디지털포렌식팀', staff: 18, mainTasks: ['디지털 증거 수집', '데이터 복원', '전자 정보 분석'] },
                { id: 'admin', name: '기획조정관', staff: 25, mainTasks: ['예산 편성', '조직 관리', '성과 평가'] }
            ]
        },
        prosecutionTargets: [
            { category: '국회의원', count: 300, description: '현직 국회의원' },
            { category: '법관/검사', count: 5400, description: '판사 및 검사' },
            { category: '고위 공무원', count: 1200, description: '차관급 이상 및 3급 이상' },
            { category: '광역단체장', count: 17, description: '시도지사 및 교육감' },
            { category: '경찰 간부', count: 850, description: '경무관 이상' },
            { category: '기타 고위직', count: 320, description: '공직유관단체 장 등' }
        ]
    };
    
    return (
        <div className="space-y-6">
            {/* 조직 개요 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">고위공직자범죄수사처 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="총 인원" 
                        value="199명" 
                        subtitle="2025년 기준"
                        icon="👥" 
                        color="blue" 
                    />
                    <StatCard 
                        title="수사부서" 
                        value="4개부" 
                        subtitle="디지털포렌식 포함"
                        icon="🔍" 
                        color="red" 
                    />
                    <StatCard 
                        title="검사 인원" 
                        value="25명" 
                        subtitle="부장검사 4명 포함"
                        icon="⚖️" 
                        color="purple" 
                    />
                </div>
            </div>
            
            {/* 본청 조직도 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 부서</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organization.headquarters.departments.map(dept => (
                        <div 
                            key={dept.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedDept(selectedDept === dept.id ? null : dept.id)}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
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
                                                <span className="text-red-500 mr-2">•</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 자동화 현황</h5>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">증거 자동 수집</span>
                                                <span className="font-semibold text-purple-600">89%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">법률 검토 AI 지원</span>
                                                <span className="font-semibold text-blue-600">94%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 수사 대상 범위 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">수사 대상 범위</h3>
                <p className="text-sm text-gray-600 mb-4">
                    고위공직자범죄수사처는 고위공직자 및 그 가족이 범한 직권남용, 수뢰, 정치자금 부정수수 등을 수사합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organization.prosecutionTargets.map((target, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{target.category}</h4>
                                <span className="text-lg font-bold text-red-600">{target.count}명</span>
                            </div>
                            <p className="text-sm text-gray-600">{target.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 국가데이터처 연동 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    공수처는 국가데이터처에서 수사에 필요한 데이터를 실시간으로 조회하고, 
                    모든 수사 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">금융거래, 통신기록, 공직자 재산</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">수사보고서, 증거자료, 기소장</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">보안 수준</div>
                        <div className="text-xs text-gray-600">최고 등급 암호화</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Organization = Organization;
