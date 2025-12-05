const { useState } = React;

const ActivityLogs = () => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const mockLogs = [
        {
            timestamp: '2025-12-03 14:34:56',
            department: '정책협력실',
            action: '2025 교육과정 개편안 심의 완료',
            user: '담당관 A',
            status: 'success',
            details: 'AI 분석: 학생 중심 교육과정으로 개편. 관련 정책 3건 추가 검토 필요.'
        },
        {
            timestamp: '2025-12-03 14:28:12',
            department: '기획조정실',
            action: '국민 의견 수렴 완료',
            user: 'AI 자동분석',
            status: 'success',
            details: '온라인 설문 응답 12,450건 분석 완료. 주요 의견: 교사 처우 개선, 학급당 학생 수 감축.'
        },
        {
            timestamp: '2025-12-03 14:15:43',
            department: '교육과정실',
            action: '고등학교 교육과정 기준 검토',
            user: 'AI 자동분석',
            status: 'success',
            details: '교과서 3건, 평가기준 2건 검토. 주요 키워드: 융합교육, 디지털 리터러시.'
        },
        {
            timestamp: '2025-12-03 14:05:21',
            department: '정책협력실',
            action: '대학입학제도 개선안 논의',
            user: '위원 B',
            status: 'warning',
            details: 'AI 분석: 이해관계 충돌 가능성 있음. 추가 사회적 협의 필요.'
        },
        {
            timestamp: '2025-12-03 13:52:08',
            department: '기획조정실',
            action: '교원 양성 정책 심의',
            user: '담당관 C',
            status: 'success',
            details: '시도교육청 협의 완료. 교원 수급 계획 수립.'
        },
        {
            timestamp: '2025-12-03 13:38:15',
            department: '정책협력실',
            action: '국가데이터처 교육통계 조회',
            user: '담당관 D',
            status: 'success',
            details: '전국 학생 수, 교원 현황, 학교 시설 데이터 조회 완료.'
        },
        {
            timestamp: '2025-12-03 13:20:47',
            department: '교육과정실',
            action: '초등학교 평가기준 개선안',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 분석: 과정 중심 평가 강화 권장. 관련 사례 12건 검토.'
        },
        {
            timestamp: '2025-12-03 13:05:33',
            department: '기획조정실',
            action: '지역간 교육격차 분석',
            user: 'AI 자동분석',
            status: 'warning',
            details: 'AI 예측: 농어촌 지역 교육 여건 개선 시급. 긴급 정책 권고.'
        },
        {
            timestamp: '2025-12-03 12:45:19',
            department: '정책협력실',
            action: '교육재정 배분 계획 검토',
            user: 'AI 자동분석',
            status: 'success',
            details: 'AI 비교 분석: OECD 평균 대비 교육투자 비율 분석 완료.'
        },
        {
            timestamp: '2025-12-03 12:28:55',
            department: '교육과정실',
            action: '디지털 교과서 도입안 심의',
            user: '위원 E',
            status: 'success',
            details: 'AI 네트워크 분석으로 우수 사례 3건 추가 식별.'
        }
    ];
    
    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-2">실시간 정책 심의 로그</h2>
                <p className="text-green-100 text-sm">
                    모든 정책 심의 및 의견 수렴 활동은 국가데이터처와 연동되어 실시간으로 기록됩니다
                </p>
            </div>
            
            {/* 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    title="오늘 심의" 
                    value="45건" 
                    subtitle="전일 대비 +12%"
                    icon="📊" 
                    color="blue" 
                />
                <StatCard 
                    title="AI 자동처리" 
                    value="35건" 
                    subtitle="77.8%"
                    icon="🤖" 
                    color="purple" 
                />
                <StatCard 
                    title="위원 검토" 
                    value="10건" 
                    subtitle="22.2%"
                    icon="👤" 
                    color="green" 
                />
                <StatCard 
                    title="협의 필요" 
                    value="3건" 
                    subtitle="사회적 합의"
                    icon="⚠️" 
                    color="orange" 
                />
            </div>
            
            {/* 필터 */}
            <FilterPanel onFilterChange={setFilters} />
            
            {/* 로그 목록 */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">심의 로그</h3>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                        전체 보고서 생성
                    </button>
                </div>
                
                <div className="space-y-3">
                    {mockLogs.map((log, index) => (
                        <LogCard key={index} {...log} />
                    ))}
                </div>
            </div>
            
            {/* 안내 */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <div className="flex items-start">
                    <span className="text-2xl mr-3">ℹ️</span>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">투명성 안내</h4>
                        <p className="text-sm text-blue-800">
                            본 로그는 공개 가능한 정보만 표시됩니다. 
                            모든 심의 과정은 오픈해시로 기록되어 투명하게 관리됩니다.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* 오픈해시 검증 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">오픈해시 무결성 검증</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                            <div className="font-semibold text-gray-900">모든 로그 검증 완료</div>
                            <div className="text-sm text-gray-600">분산원장에 안전하게 기록됨</div>
                        </div>
                        <OpenHashBadge type="verified" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">총 블록 수</div>
                            <div className="text-xl font-bold text-gray-900">1,234,567</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">마지막 검증</div>
                            <div className="text-xl font-bold text-gray-900">3초 전</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-gray-600 mb-1">위변조 시도</div>
                            <div className="text-xl font-bold text-red-600">0건</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.ActivityLogs = ActivityLogs;
