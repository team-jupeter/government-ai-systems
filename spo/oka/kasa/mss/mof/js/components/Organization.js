const Organization = () => {
    const [selectedDept, setSelectedDept] = React.useState(null);

    const leadership = [
        { position: '장관', name: '강도형', role: '해양수산부 총괄', background: '한국해양과학기술원 원장 출신' },
        { position: '차관', name: '박성훈', role: '해양수산정책 총괄', background: '해양정책실장 출신' }
    ];

    const departments = [
        { name: '기획조정실', head: '실장 (고위공무원)', staff: 185, divisions: ['정책기획관', '예산담당관', '규제개혁법무담당관', '비상안전기획관'], tasks: ['정책 기획 및 총괄 조정', '예산·결산 및 기금 운용', '법령 입안 및 규제 개혁'] },
        { name: '해양정책실', head: '실장 (고위공무원)', staff: 225, divisions: ['해양정책과', '해양개발과', '해양산업정책관', '해양환경정책관'], tasks: ['해양 기본 정책 수립', '해양자원 개발', '해양산업 육성 및 진흥'] },
        { name: '수산정책실', head: '실장 (고위공무원)', staff: 248, divisions: ['수산정책과', '어업자원정책과', '양식산업과', '수산물안전유통과'], tasks: ['수산 정책 총괄', '어업 허가 및 자원 관리', '양식업 육성'] },
        { name: '해운물류국', head: '국장 (고위공무원)', staff: 198, divisions: ['해운정책과', '물류정책과', '항만운영과', '항만투자개발과'], tasks: ['해운 산업 정책', '해상 물류 체계 구축', '항만 운영 및 관리'] },
        { name: '항만국', head: '국장 (고위공무원)', staff: 172, divisions: ['항만계획과', '항만건설과', '신항만기획과'], tasks: ['항만 기본 계획 수립', '항만 건설 사업 시행', '신규 항만 개발'] },
        { name: '해사안전국', head: '국장 (고위공무원)', staff: 165, divisions: ['해사안전정책과', '선박안전기술과', '선원정책과'], tasks: ['해사 안전 정책', '선박 검사 및 안전', '선원 교육 및 자격'] }
    ];

    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">조직 구성</h2>
                <p className="text-gray-600 mt-2">해양수산부 조직도 및 부서 정보</p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">👔 수뇌부</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leadership.map((leader, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border-2 border-teal-200">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {leader.name[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-teal-700 font-semibold">{leader.position}</div>
                                    <div className="text-2xl font-bold text-gray-900">{leader.name}</div>
                                    <div className="text-sm text-gray-600 mt-1">{leader.role}</div>
                                    <div className="text-xs text-gray-500 mt-1">{leader.background}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏢 본부 조직</h3>
                <div className="bg-teal-50 rounded-lg p-4 mb-4 border-2 border-teal-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600">총 인원</div>
                            <div className="text-3xl font-bold text-teal-700">1,193명</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">본부 조직</div>
                            <div className="text-3xl font-bold text-blue-700">6개 실·국</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">지방청</div>
                            <div className="text-3xl font-bold text-cyan-700">9개</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {departments.map((dept, idx) => (
                        <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedDept(selectedDept === idx ? null : idx)}>
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">{dept.name}</h4>
                                    <p className="text-sm text-gray-600">{dept.head}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-teal-600">{dept.staff}명</div>
                                    <div className="text-xs text-gray-500">정원</div>
                                </div>
                            </div>
                            {selectedDept === idx && (
                                <div className="mt-4 pt-4 border-t space-y-3">
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700 mb-2">📋 하부 조직</div>
                                        <div className="flex flex-wrap gap-2">
                                            {dept.divisions.map((div, i) => (
                                                <span key={i} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">{div}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-700 mb-2">💼 주요 업무</div>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            {dept.tasks.map((task, i) => (
                                                <li key={i}>• {task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border-2 border-teal-200">
                <h3 className="text-xl font-bold text-teal-900 mb-4">🤖 AI 기반 조직 관리</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <h4 className="font-bold text-teal-800 mb-2">자동화 기능</h4>
                        <ul className="space-y-1 text-gray-700">
                            <li>• 실시간 인사 배치 최적화</li>
                            <li>• 업무량 기반 자동 인력 조정</li>
                            <li>• AI 교육 추천 시스템</li>
                            <li>• 성과 평가 자동 분석</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-800 mb-2">OpenHash 적용</h4>
                        <ul className="space-y-1 text-gray-700">
                            <li>• 인사 발령 이력 블록체인 기록</li>
                            <li>• 직원 자격증 위변조 방지</li>
                            <li>• 성과 평가 투명성 확보</li>
                            <li>• 조직 개편 이력 영구 보존</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

(() => Organization)();
