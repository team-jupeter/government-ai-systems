const { useState } = React;

const Organization = () => {
    const [expandedDept, setExpandedDept] = useState(null);
    
    const organization = [
        {
            department: '원장',
            staff: 10,
            head: '부총리급 (감사위원회의 의장)',
            tasks: ['감사원 대표', '감사위원회의 주재', '소속 공무원 지휘·감독'],
            automation: { rate: 58, processed: 23 }
        },
        {
            department: '감사위원 (7명)',
            staff: 35,
            head: '차관급 (합의제)',
            tasks: ['감사 의결', '징계·변상 판정', '심사청구 결정'],
            automation: { rate: 52, processed: 18 }
        },
        {
            department: '사무총장',
            staff: 15,
            head: '차관급',
            tasks: ['사무처 총괄', '감사 실무 지휘', '인사·예산 관리'],
            automation: { rate: 70, processed: 42 }
        },
        {
            department: '공직감찰본부',
            staff: 85,
            head: '본부장 (고위감사공무원)',
            tasks: ['공무원 직무감찰', '비위 조사', '징계 요구'],
            automation: { rate: 75, processed: 67 }
        },
        {
            department: '국민감사본부',
            staff: 68,
            head: '본부장 (고위감사공무원)',
            tasks: ['국민감사청구 처리', '공익신고 접수', '민원 감사'],
            automation: { rate: 88, processed: 123 }
        },
        {
            department: '재정경제감사국',
            staff: 95,
            head: '국장',
            tasks: ['기재부·금융위 감사', '공공기관 회계검사', '재정 집행 점검'],
            automation: { rate: 82, processed: 89 }
        },
        {
            department: '사회문화감사국',
            staff: 78,
            head: '국장',
            tasks: ['교육·복지부처 감사', '문화·체육 기관 검사', '사회 인프라 점검'],
            automation: { rate: 79, processed: 72 }
        },
        {
            department: '산업금융감사국',
            staff: 82,
            head: '국장',
            tasks: ['산업부·중기부 감사', '공기업 경영 진단', '에너지·통신 점검'],
            automation: { rate: 81, processed: 78 }
        },
        {
            department: '국토환경감사국',
            staff: 74,
            head: '국장',
            tasks: ['국토부·환경부 감사', 'SOC 사업 점검', '환경정책 평가'],
            automation: { rate: 77, processed: 65 }
        },
        {
            department: '기획조정실',
            staff: 55,
            head: '실장',
            tasks: ['감사 기획', '제도 개선', '국제 협력'],
            automation: { rate: 85, processed: 56 }
        }
    ];
    
    const totalStaff = organization.reduce((sum, dept) => sum + dept.staff, 0);
    
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-800 to-orange-800 text-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4">조직 구조</h2>
                <p className="text-lg text-red-100">
                    감사원은 원장(부총리급)과 7명의 감사위원(차관급) 합의제로 운영되며,
                    총 {totalStaff}명의 감사공무원이 국가 재정과 공직 기강을 지킵니다.
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
                                    <div className="text-2xl">🔍</div>
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
