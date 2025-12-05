const { useState } = React;

const Organization = () => {
    const [expandedDept, setExpandedDept] = useState(null);
    
    const organization = [
        {
            department: '실장',
            staff: 8,
            head: '장관급 (NSC 상임위원장 겸임)',
            tasks: [
                'NSC 상임위원회 주재',
                '국가 안보 전략 총괄',
                '대통령 안보 보좌'
            ],
            automation: { rate: 62, processed: 28 }
        },
        {
            department: '제1차장 (NSC 사무처장 겸임)',
            staff: 32,
            head: '차관급',
            tasks: [
                '외교·안보 분야 현안 관리',
                'NSC 사무처 운영',
                '안보전략비서관실 총괄'
            ],
            automation: { rate: 68, processed: 45 }
        },
        {
            department: '제2차장',
            staff: 35,
            head: '차관급',
            tasks: [
                '국방 안보 역량 구축',
                '국가위기관리센터 가동',
                '국방정책 현안 관리'
            ],
            automation: { rate: 75, processed: 52 }
        },
        {
            department: '제3차장 (신설)',
            staff: 28,
            head: '차관급',
            tasks: [
                '경제안보·첨단기술 보호',
                '사이버 안보',
                '신흥 안보 업무'
            ],
            automation: { rate: 88, processed: 67 }
        },
        {
            department: '안보전략비서관실',
            staff: 25,
            head: 'NSC 사무차장 겸임',
            tasks: [
                'NSC 의제 준비',
                '안보 전략 기획',
                '정보 융합 분석'
            ],
            automation: { rate: 70, processed: 42 }
        },
        {
            department: '국방비서관실',
            staff: 30,
            head: '고위공무원',
            tasks: [
                '국방 정책 조율',
                '방위산업 관리',
                '군사 대비 태세 점검'
            ],
            automation: { rate: 65, processed: 38 }
        },
        {
            department: '외교정책비서관실',
            staff: 28,
            head: '고위공무원',
            tasks: [
                '외교 전략 수립',
                '재외동포 보호',
                '국제 협력 조율'
            ],
            automation: { rate: 72, processed: 46 }
        },
        {
            department: '통일정책비서관실',
            staff: 22,
            head: '고위공무원',
            tasks: [
                '남북 관계 관리',
                '대북 정책 조율',
                '통일 준비'
            ],
            automation: { rate: 58, processed: 32 }
        },
        {
            department: '경제안보비서관실',
            staff: 26,
            head: '고위공무원',
            tasks: [
                '첨단기술 유출 방지',
                '공급망 안보',
                '핵심광물 확보'
            ],
            automation: { rate: 82, processed: 58 }
        },
        {
            department: '사이버안보비서관실',
            staff: 35,
            head: '고위공무원',
            tasks: [
                '사이버 공격 탐지',
                '국가 인프라 보호',
                '양자내성 암호 적용'
            ],
            automation: { rate: 94, processed: 123 }
        },
        {
            department: '국가위기관리센터',
            staff: 45,
            head: '센터장',
            tasks: [
                '24시간 상황 모니터링',
                '위기 대응 시나리오 운영',
                '긴급 상황 대응'
            ],
            automation: { rate: 90, processed: 89 }
        }
    ];
    
    const totalStaff = organization.reduce((sum, dept) => sum + dept.staff, 0);
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-900 to-rose-900 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">조직 구조</h2>
                <p className="text-lg text-red-100">
                    국가안보실은 실장(장관급) 아래 3명의 차장(차관급)과 11개 부서로 구성되며,
                    총 {totalStaff}명의 인원이 국가 안보를 24시간 지킵니다.
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
                                    
                                    <div className="bg-red-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-3">AI 자동화 현황</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">자동 처리율</div>
                                                <div className="text-2xl font-bold text-red-600">{dept.automation.rate}%</div>
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
