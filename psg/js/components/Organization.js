const { useState } = React;

const Organization = () => {
    const [expandedDept, setExpandedDept] = useState(null);
    
    const organization = [
        {
            department: '처장',
            staff: 10,
            head: '차관급 정무직',
            tasks: [
                '경호 업무 총괄',
                '경호 정책 수립',
                '군·경 경호부대 지휘'
            ],
            automation: { rate: 55, processed: 18 }
        },
        {
            department: '차장',
            staff: 8,
            head: '1급 경호공무원',
            tasks: [
                '처장 보좌',
                '경호 실무 총괄',
                '비상 대응 지휘'
            ],
            automation: { rate: 60, processed: 22 }
        },
        {
            department: '기획관리실',
            staff: 45,
            head: '실장',
            tasks: [
                '조직·예산 관리',
                '대외 업무 총괄',
                '미래 위협 분석'
            ],
            automation: { rate: 78, processed: 45 }
        },
        {
            department: '경호본부',
            staff: 180,
            head: '본부장',
            tasks: [
                '대통령 행사 수행 경호',
                '선발 경호 활동',
                '국빈 경호'
            ],
            automation: { rate: 62, processed: 89 }
        },
        {
            department: '경비안전본부',
            staff: 220,
            head: '본부장',
            tasks: [
                '대통령실 경비',
                '주변 지역 안전 확보',
                '군·경 경호부대 지휘'
            ],
            automation: { rate: 85, processed: 156 }
        },
        {
            department: '경호지원단',
            staff: 95,
            head: '단장',
            tasks: [
                '경호 차량 운행',
                '통신망 운용',
                'IT 장비 개발'
            ],
            automation: { rate: 88, processed: 112 }
        },
        {
            department: '감사관실',
            staff: 15,
            head: '감사관',
            tasks: [
                '내부 감사',
                '비위 조사',
                '청렴도 관리'
            ],
            automation: { rate: 70, processed: 28 }
        },
        {
            department: '경호안전교육원',
            staff: 42,
            head: '원장',
            tasks: [
                '신임 경호공무원 교육',
                '전문 훈련 실시',
                '학술 연구'
            ],
            automation: { rate: 65, processed: 35 }
        }
    ];
    
    const totalStaff = organization.reduce((sum, dept) => sum + dept.staff, 0);
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-800 to-slate-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">조직 구조</h2>
                <p className="text-lg text-gray-100">
                    대통령경호처는 처장(차관급) 아래 8개 주요 부서로 구성되며,
                    총 {totalStaff}명의 경호공무원이 대통령의 안전을 24시간 지킵니다.
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
                                    <div className="text-2xl">🛡️</div>
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
                                    
                                    <div className="bg-gray-50 rounded-lg p-4">
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
