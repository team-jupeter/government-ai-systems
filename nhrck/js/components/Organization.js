const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        headquarters: {
            name: '국가인권위원회 본부',
            location: '서울특별시 중구 삼일대로 340',
            departments: [
                { id: 'chairman', name: '위원장실', staff: 8, mainTasks: ['위원회 총괄', '정책 수립', '대외협력'] },
                { id: 'secretary', name: '사무총장실', staff: 6, mainTasks: ['사무처 총괄', '행정 지원', '예산 관리'] },
                { id: 'planning', name: '기획조정관', staff: 45, mainTasks: ['기획 총괄', '예산 편성', '성과 관리'] },
                { id: 'investigation', name: '침해구제국', staff: 120, mainTasks: ['인권침해 조사', '진정 접수', '피해자 구제'] },
                { id: 'discrimination', name: '차별시정국', staff: 95, mainTasks: ['차별행위 조사', '시정 권고', '법률 검토'] },
                { id: 'policy', name: '정책교육국', staff: 78, mainTasks: ['인권정책 연구', '교육 프로그램', '홍보 활동'] },
                { id: 'disability', name: '장애인차별조사과', staff: 52, mainTasks: ['장애인 차별 조사', '시정 명령', '사후 관리'] },
                { id: 'consultation', name: '인권상담조정센터', staff: 68, mainTasks: ['인권상담', '진정 접수', '조정 업무'] }
            ]
        },
        regionalOffices: [
            { name: '부산인권사무소', location: '부산광역시', staff: 35, cases: 450 },
            { name: '광주인권사무소', location: '광주광역시', staff: 32, cases: 420 }
        ]
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">국가인권위원회 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="총 인원" 
                        value="539명" 
                        subtitle="2025년 기준"
                        icon="👥" 
                        color="blue" 
                    />
                    <StatCard 
                        title="본부 부서" 
                        value="8개국" 
                        subtitle="지역 사무소 2곳"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="인권위원" 
                        value="11명" 
                        subtitle="상임위원 4명 포함"
                        icon="⚖️" 
                        color="purple" 
                    />
                </div>
            </div>
            
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
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                    {dept.staff}명
                                </span>
                            </div>
                            
                            {selectedDept !== dept.id && (
                                <p className="text-sm text-gray-600">
                                    {dept.mainTasks[0]} 외 {dept.mainTasks.length - 1}개 업무
                                </p>
                            )}
                            
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
                                                <span className="text-gray-600">사례 자동 분석</span>
                                                <span className="font-semibold text-purple-600">92%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">법률 검토 지원</span>
                                                <span className="font-semibold text-blue-600">95%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">지역 사무소</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {organization.regionalOffices.map((office, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{office.name}</h4>
                                <span className="text-lg font-bold text-blue-600">{office.staff}명</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{office.location}</p>
                            <p className="text-sm text-gray-500">연간 처리: {office.cases}건</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 국가데이터처 연동</h3>
                <p className="text-sm text-gray-700 mb-4">
                    국가인권위원회는 국가데이터처에서 조사에 필요한 데이터를 실시간으로 조회하고, 
                    모든 진정 처리 기록을 오픈해시로 저장합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">조회 가능 데이터</div>
                        <div className="text-xs text-gray-600">차별 사례, 판례, 국제인권조약</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">저장 데이터</div>
                        <div className="text-xs text-gray-600">진정서, 조사보고서, 결정문</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <div className="text-sm font-medium text-gray-900 mb-1">보안 수준</div>
                        <div className="text-xs text-gray-600">개인정보 암호화</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
window.Organization = Organization;
