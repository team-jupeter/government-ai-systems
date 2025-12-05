const ActivityLogs = () => {
    const logs = [
        { 
            id: 1, 
            type: '법안 의결', 
            title: '헌법재판소법 개정안 - 헌법재판관 임기 연장 및 권한대행 임명권 제한', 
            date: '2025-04-09 10:00', 
            status: '가결',
            detail: '헌법재판관 정년 후 후임자 임명 전까지 직무 수행 가능, 대통령 권한대행 임명권 제한'
        },
        { 
            id: 2, 
            type: '법안 심사', 
            title: '대법원조직법 개정안 - 대법관 수 확대 (30명/100명)', 
            date: '2025-05-14 10:00', 
            status: '소위 회부',
            detail: '김용민 의원안 30명, 장경태 의원안 100명으로 대법관 수 확대'
        },
        { 
            id: 3, 
            type: '법안 의결', 
            title: '12·29여객기참사 피해구제 및 지원 특별법안', 
            date: '2025-04-09 15:00', 
            status: '가결',
            detail: '제주항공 여객기 참사 피해자 신속 구제 및 지원 시책 규정'
        },
        { 
            id: 4, 
            type: '청문회', 
            title: '조희대 대법원장 등 사법부 대선개입 의혹 진상규명 청문회', 
            date: '2025-05-14 14:00', 
            status: '진행',
            detail: '대법원장 및 대법관 11인 불출석, 서석호 증인 등 출석'
        },
        { 
            id: 5, 
            type: '체계자구심사', 
            title: '코로나19 예방접종 피해보상 특별법안 등 32건', 
            date: '2025-03-26 10:00', 
            status: '의결',
            detail: '복지위·과방위·농해수위·국토위 법안 체계자구 심사 완료'
        },
        { 
            id: 6, 
            type: '법안 의결', 
            title: '합성생물학 육성법안', 
            date: '2025-03-26 11:30', 
            status: '가결',
            detail: '합성생물학 연구개발 기반 조성 및 과학기술 혁신 촉진'
        },
        { 
            id: 7, 
            type: '체계자구심사', 
            title: '공직선거법 개정안 - 허위사실공표죄 구성요건 수정', 
            date: '2025-05-14 11:00', 
            status: '의결',
            detail: '허위사실공표 대상에서 "행위" 삭제'
        },
        { 
            id: 8, 
            type: '법안 심사', 
            title: '헌법재판소법 개정안 - 재판소원제도 도입', 
            date: '2025-05-14 10:30', 
            status: '소위 회부',
            detail: '법원의 재판을 헌법소원 대상에 포함'
        },
        { 
            id: 9, 
            type: '청문회 의결', 
            title: '최상목 기획재정부장관 탄핵소추사건 조사 청문회', 
            date: '2025-04-16 10:00', 
            status: '실시 예정',
            detail: '증인 및 참고인 출석 요구 의결'
        },
        { 
            id: 10, 
            type: '법안 의결', 
            title: '형사소송법 개정안 - 대통령 당선자 공판절차 정지', 
            date: '2025-05-07 15:00', 
            status: '가결',
            detail: '피고인이 대통령으로 당선된 경우 공판절차 정지 규정'
        },
        { 
            id: 11, 
            type: '체계자구심사', 
            title: '대도시권 광역교통 관리에 관한 특별법 개정안', 
            date: '2025-03-26 14:00', 
            status: '의결',
            detail: '대도시권 범위에 인구 50만 이상 도청 소재지 포함'
        },
        { 
            id: 12, 
            type: '현안 질의', 
            title: '한덕수 권한대행 헌법재판관 후보자 지명 적정성 질의', 
            date: '2025-04-09 16:00', 
            status: '완료',
            detail: '이완규 법제처장, 김정원 헌법재판소사무처장 등 출석'
        }
    ];

    const [filter, setFilter] = React.useState('all');
    const filteredLogs = filter === 'all' 
        ? logs 
        : logs.filter(log => log.type === filter);

    const getStatusColor = (status) => {
        switch(status) {
            case '가결': return 'bg-green-100 text-green-800';
            case '의결': return 'bg-blue-100 text-blue-800';
            case '진행': return 'bg-yellow-100 text-yellow-800';
            case '진행중': return 'bg-yellow-100 text-yellow-800';
            case '소위 회부': return 'bg-purple-100 text-purple-800';
            case '실시 예정': return 'bg-orange-100 text-orange-800';
            case '완료': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case '법안 의결': return '⚖️';
            case '법안 심사': return '📋';
            case '체계자구심사': return '✓';
            case '청문회': return '🎤';
            case '청문회 의결': return '📢';
            case '현안 질의': return '❓';
            default: return '📄';
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 법제사법위원회 최근 활동</h2>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        전체
                    </button>
                    <button 
                        onClick={() => setFilter('법안 의결')}
                        className={`px-4 py-2 rounded text-sm font-medium ${filter === '법안 의결' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        법안 의결
                    </button>
                    <button 
                        onClick={() => setFilter('체계자구심사')}
                        className={`px-4 py-2 rounded text-sm font-medium ${filter === '체계자구심사' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        체계자구심사
                    </button>
                    <button 
                        onClick={() => setFilter('청문회')}
                        className={`px-4 py-2 rounded text-sm font-medium ${filter === '청문회' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        청문회
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                {filteredLogs.map(log => (
                    <div key={log.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{getTypeIcon(log.type)}</span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                        {log.type}
                                    </span>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                                        {log.status}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{log.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{log.detail}</p>
                                <p className="text-xs text-gray-500">{log.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
                <h3 className="font-bold text-blue-900 mb-2">🤖 AI 자동화 활동 분석</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 법안 체계·자구 자동 검토: 월평균 150건</li>
                    <li>• 위헌 요소 AI 탐지: 12건 사전 차단</li>
                    <li>• OpenHash 기반 의사록 자동 생성 및 검증</li>
                    <li>• 법령 충돌 분석: 실시간 자동 경고 시스템 가동</li>
                </ul>
            </div>
        </div>
    );
};
