const { useState } = React;

const Organization = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    
    const organization = {
        headquarters: {
            name: '관세청 본청',
            location: '세종특별자치시',
            departments: [
                { id: 'tax-service', name: '납세자보호담당관실', staff: 45, mainTasks: ['납세자 권익 보호', '고충 민원 처리', '이의신청 지원'] },
                { id: 'planning', name: '기획조정관', staff: 120, mainTasks: ['정책 기획', '예산 편성', '성과 관리'] },
                { id: 'audit', name: '감사관', staff: 85, mainTasks: ['내부 감사', '부패 방지', '청렴도 관리'] },
                { id: 'investigation', name: '통관국', staff: 450, mainTasks: ['통관심사', '탈세 단속', '고액체납자 관리'] },
                { id: 'collection', name: '조사국', staff: 380, mainTasks: ['세금 징수', '체납 처분', '납부 독려'] },
                { id: 'corporate-tax', name: '관세국', staff: 290, mainTasks: ['법인세 신고 관리', '법인세 정책', '기업 세무상담'] },
                { id: 'income-tax', name: '소득세국', staff: 320, mainTasks: ['소득세 신고 관리', '연말정산', '종합소득세'] },
                { id: 'vat', name: '부가가치세국', staff: 270, mainTasks: ['부가세 신고 관리', '영세율 관리', '세금계산서'] }
            ]
        },
        regional: [
            { name: '서울지방관세청', location: '서울 중구', staff: 2800, districts: 30 },
            { name: '중부지방관세청', location: '대전 서구', staff: 1950, districts: 22 },
            { name: '부산지방관세청', location: '부산 동구', staff: 1680, districts: 19 },
            { name: '대구지방관세청', location: '대구 북구', staff: 1420, districts: 16 },
            { name: '광주지방관세청', location: '광주 서구', staff: 1280, districts: 15 },
            { name: '인천지방관세청', location: '인천 남동구', staff: 1150, districts: 13 },
            { name: '대전지방관세청', location: '대전 서구', staff: 980, districts: 12 }
        ]
    };
    
    return (
        <div className="space-y-6">
            {/* 조직 개요 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">관세청 조직 구조</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard 
                        title="총 인원" 
                        value="14,215명" 
                        subtitle="2025년 기준"
                        icon="👥" 
                        color="blue" 
                    />
                    <StatCard 
                        title="지방관세청" 
                        value="7개청" 
                        subtitle="127개 세무서"
                        icon="🏢" 
                        color="green" 
                    />
                    <StatCard 
                        title="본청 부서" 
                        value="8개국" 
                        subtitle="35개 과"
                        icon="📁" 
                        color="purple" 
                    />
                </div>
            </div>
            
            {/* 본청 조직도 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">본청 주요 부서</h3>
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
                                                    {Math.round(Math.random() * 200 + 100)}건
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
            
            {/* 지방관세청 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">지방관세청</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organization.regional.map((region, idx) => (
                        <div 
                            key={idx}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{region.name}</h4>
                                    <p className="text-sm text-gray-500">📍 {region.location}</p>
                                </div>
                                <span className="text-2xl">🏛️</span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">총 인원</span>
                                    <span className="font-semibold">{region.staff.toLocaleString()}명</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">관할 세무서</span>
                                    <span className="font-semibold">{region.districts}개</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">오늘 처리</span>
                                    <span className="font-semibold text-blue-600">
                                        {Math.round(region.staff / 2)}건
                                    </span>
                                </div>
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
                        <span className="font-semibold">1단계:</span> 각 부서는 업무 수행을 위해 국가데이터처(NDR)에서 필요한 데이터를 인출합니다.
                    </p>
                    <p>
                        <span className="font-semibold">2단계:</span> AI가 데이터를 분석하여 자동으로 처리하거나, 인간 담당자가 검토합니다.
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
