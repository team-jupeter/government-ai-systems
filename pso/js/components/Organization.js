const { useState } = React;

const Organization = () => {
    const [expandedDept, setExpandedDept] = useState(null);
    
    const organization = [
        {
            department: '비서실장',
            staff: 15,
            head: '장관급',
            tasks: [
                '대통령 일정 및 국정 총괄',
                '수석비서관 회의 주재',
                '부처 간 정책 조율'
            ],
            automation: { rate: 68, processed: 45 }
        },
        {
            department: '정책실장',
            staff: 12,
            head: '장관급',
            tasks: [
                '국정과제 총괄',
                '정책 기획 및 조정',
                '부처 정책 평가'
            ],
            automation: { rate: 72, processed: 38 }
        },
        {
            department: '정무수석실',
            staff: 25,
            head: '차관급',
            tasks: [
                '여야 정당 협력',
                '국회 관계 조율',
                '지방자치단체 협력'
            ],
            automation: { rate: 65, processed: 42 }
        },
        {
            department: '국민소통수석실',
            staff: 30,
            head: '차관급',
            tasks: [
                '국민청원 처리',
                '언론 홍보',
                'SNS 소통'
            ],
            automation: { rate: 88, processed: 78 }
        },
        {
            department: '민정수석실',
            staff: 28,
            head: '차관급',
            tasks: [
                '고위공직자 감찰',
                '반부패 업무',
                '공직기강 확립'
            ],
            automation: { rate: 58, processed: 32 }
        },
        {
            department: '인사수석실',
            staff: 22,
            head: '차관급',
            tasks: [
                '고위공직자 인사',
                '인사 검증',
                '균형인사 관리'
            ],
            automation: { rate: 75, processed: 45 }
        },
        {
            department: '경제수석실',
            staff: 26,
            head: '차관급',
            tasks: [
                '경제정책 조율',
                '기업 현안 대응',
                '민생경제 점검'
            ],
            automation: { rate: 70, processed: 52 }
        },
        {
            department: '사회수석실',
            staff: 24,
            head: '차관급',
            tasks: [
                '교육·복지 정책',
                '문화·여성 정책',
                '보건·환경 정책'
            ],
            automation: { rate: 73, processed: 48 }
        },
        {
            department: '국정상황실',
            staff: 35,
            head: '실장',
            tasks: [
                '24시간 국정 모니터링',
                '긴급 상황 대응',
                '언론 동향 분석'
            ],
            automation: { rate: 92, processed: 156 }
        }
    ];
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">조직 구조</h2>
                <p className="text-lg text-blue-100">
                    대통령비서실은 비서실장과 정책실장(장관급) 아래 8개 수석실과 국정상황실로 구성되며,
                    총 217명의 인원이 대통령의 국정 수행을 보좌합니다.
                </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">주요 부서 현황</h3>
                <div className="space-y-3">
                    {organization.map((dept, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setExpandedDept(expandedDept === idx ? null : idx)}
                                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-2xl">🏢</div>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900">{dept.department}</div>
                                        <div className="text-sm text-gray-600">{dept.head} | {dept.staff}명</div>
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    {expandedDept === idx ? '▼' : '▶'}
                                </div>
                            </button>
                            
                            {expandedDept === idx && (
                                <div className="px-6 py-4 bg-white border-t">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">주요 업무</h4>
                                        <ul className="space-y-1">
                                            {dept.tasks.map((task, taskIdx) => (
                                                <li key={taskIdx} className="text-sm text-gray-600">• {task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-3">AI 자동화 현황</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">자동 처리율</div>
                                                <div className="text-2xl font-bold text-blue-600">{dept.automation.rate}%</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">오늘 처리</div>
                                                <div className="text-2xl font-bold text-green-600">{dept.automation.processed}건</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

window.Organization = Organization;
