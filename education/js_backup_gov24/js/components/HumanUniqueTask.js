const HumanUniqueTask = () => {
    const tasks = [
        { 
            icon: '🎨', 
            title: '창의성', 
            desc: '예술·디자인·기획',
            examples: ['디자인 씽킹', '콘텐츠 창작', '혁신 아이디어']
        },
        { 
            icon: '💭', 
            title: '비판적 사고', 
            desc: '분석·평가·의사결정',
            examples: ['복잡한 문제 해결', '전략 수립', '윤리적 판단']
        },
        { 
            icon: '🤝', 
            title: '공감 능력', 
            desc: '소통·협력·리더십',
            examples: ['팀워크', '갈등 조정', '커뮤니케이션']
        },
        { 
            icon: '🔬', 
            title: '탐구 정신', 
            desc: '연구·실험·발견',
            examples: ['과학 연구', '기술 개발', '새로운 시도']
        }
    ];

    return (
        <div className="section-gray py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-brain text-blue-600 mr-3"></i>
                        인간 고유 역량 강화
                    </h2>
                    <p className="text-lg text-gray-600">AI가 대체할 수 없는 능력에 집중</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tasks.map((task, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 card-hover shadow-md border border-gray-200">
                            <div className="text-5xl mb-4 text-center">{task.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{task.title}</h3>
                            <p className="text-gray-600 mb-4 text-center text-sm">{task.desc}</p>
                            <div className="space-y-2">
                                {task.examples.map((ex, j) => (
                                    <div key={j} className="text-xs text-gray-700 bg-gray-50 rounded-lg p-2">
                                        • {ex}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-xl p-8 shadow-md border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        <i className="fas fa-balance-scale text-blue-600 mr-2"></i>
                        AI와 인간의 협업
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h4 className="font-bold text-gray-900 mb-4 text-lg">🤖 AI가 담당</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• 반복적 데이터 처리</li>
                                <li>• 패턴 인식 및 예측</li>
                                <li>• 대량 정보 분석</li>
                                <li>• 자동화 가능한 작업</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h4 className="font-bold text-gray-900 mb-4 text-lg">👨‍🎓 인간이 담당</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• 창의적 문제 해결</li>
                                <li>• 윤리적 의사결정</li>
                                <li>• 인간관계 구축</li>
                                <li>• 혁신적 아이디어 창출</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
