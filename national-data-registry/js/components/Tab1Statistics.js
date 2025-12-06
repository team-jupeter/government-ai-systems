function Tab1Statistics() {
    const surveys = [
        {
            category: '인구 통계',
            items: ['인구주택총조사', '인구동향조사', '장래인구추계', '생명표']
        },
        {
            category: '경제 통계',
            items: ['경제활동인구조사', '가계동향조사', '소비자물가조사', '광업제조업동향조사']
        },
        {
            category: '사회 통계',
            items: ['사회조사', '생활시간조사', '범죄피해조사', '주거실태조사']
        },
        {
            category: '농어업 통계',
            items: ['농림어업총조사', '어업생산동향조사', '농가경제조사', '양곡소비량조사']
        }
    ];

    const schedule = [
        { name: '소비자물가동향', period: '매월 초', icon: 'fa-calendar-day' },
        { name: '고용동향', period: '매월 중순', icon: 'fa-calendar-week' },
        { name: '산업활동동향', period: '매월 말', icon: 'fa-calendar' },
        { name: '분기 GDP', period: '분기별', icon: 'fa-calendar-alt' },
        { name: '인구주택총조사', period: '5년마다', icon: 'fa-calendar-check' }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="subsection-title">주요 통계 조사</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {surveys.map((survey, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-gov-blue text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <h4 className="font-semibold text-gov-text">{survey.category}</h4>
                            </div>
                            <ul className="space-y-2">
                                {survey.items.map((item, i) => (
                                    <li key={i} className="text-sm text-gray-700 flex items-center">
                                        <i className="fas fa-check text-gov-blue mr-2 text-xs"></i>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="subsection-title">통계 공표 일정</h3>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">통계명</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">공표 주기</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {schedule.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <i className={`fas ${item.icon} text-gov-blue mr-3`}></i>
                                            <span className="font-medium text-gov-text">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{item.period}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-gov-blue p-6 rounded">
                <h4 className="font-semibold text-gov-text mb-2">
                    <i className="fas fa-info-circle text-gov-blue mr-2"></i>
                    통계 작성 프로세스
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-700 mt-4">
                    <div className="text-center">
                        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 shadow">
                            <i className="fas fa-clipboard-list text-gov-blue"></i>
                        </div>
                        <div>기획·설계</div>
                    </div>
                    <i className="fas fa-arrow-right text-gray-400"></i>
                    <div className="text-center">
                        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 shadow">
                            <i className="fas fa-users text-gov-blue"></i>
                        </div>
                        <div>자료 수집</div>
                    </div>
                    <i className="fas fa-arrow-right text-gray-400"></i>
                    <div className="text-center">
                        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 shadow">
                            <i className="fas fa-database text-gov-blue"></i>
                        </div>
                        <div>처리·분석</div>
                    </div>
                    <i className="fas fa-arrow-right text-gray-400"></i>
                    <div className="text-center">
                        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 shadow">
                            <i className="fas fa-chart-bar text-gov-blue"></i>
                        </div>
                        <div>공표·배포</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
