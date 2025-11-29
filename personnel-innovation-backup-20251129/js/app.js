const { useState, useEffect } = React;

const API_BASE_URL = '/api/personnel';

function PersonnelInnovationApp() {
    const [activeTab, setActiveTab] = useState('consult');
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [statistics, setStatistics] = useState(null);
    const [sessionId] = useState(() => 'session_' + Date.now());
    const [showOpenHashModal, setShowOpenHashModal] = useState(false);
    const [recruitResult, setRecruitResult] = useState(null);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/statistics`);
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('통계 로딩 실패:', error);
        }
    };

    const sendMessage = async () => {
        if (!userInput.trim() || isLoading) return;

        const userMessage = userInput;
        setUserInput('');
        
        setChatMessages(prev => [...prev, {
            role: 'user',
            content: userMessage
        }]);

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/hr/consult`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    session_id: sessionId
                })
            });

            const data = await response.json();

            if (data.success) {
                setChatMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.response,
                    openhash: data.openhash,
                    layer: data.layer
                }]);
            } else {
                setChatMessages(prev => [...prev, {
                    role: 'assistant',
                    content: '죄송합니다. 오류가 발생했습니다: ' + data.error
                }]);
            }
        } catch (error) {
            setChatMessages(prev => [...prev, {
                role: 'assistant',
                content: '서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const checkRecruitment = async () => {
        setIsLoading(true);
        setRecruitResult(null);

        try {
            const response = await fetch(`${API_BASE_URL}/hr/recruit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: '김철수'
                })
            });

            const data = await response.json();
            setRecruitResult(data);
        } catch (error) {
            alert('서버 연결 실패: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return React.createElement('div', { className: 'min-h-screen' }, [
        // 헤더
        React.createElement('header', { className: 'gradient-bg text-white shadow-2xl', key: 'header' }, 
            React.createElement('div', { className: 'container mx-auto px-4 py-8' }, [
                React.createElement('div', { className: 'flex items-center justify-between mb-6', key: 'title-row' }, [
                    React.createElement('div', { className: 'flex items-center gap-4', key: 'title-group' }, [
                        React.createElement('div', { className: 'text-6xl', key: 'icon' }, '👥'),
                        React.createElement('div', { key: 'text' }, [
                            React.createElement('h1', { className: 'text-4xl font-black mb-2', key: 'h1' }, '인사혁신처'),
                            React.createElement('p', { className: 'text-xl opacity-90', key: 'subtitle' }, '국가데이터처 연동 AI 통합 인사관리 시스템')
                        ])
                    ]),
                    React.createElement('button', {
                        onClick: () => setShowOpenHashModal(true),
                        className: 'bg-white text-purple-700 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-lg',
                        key: 'openhash-btn'
                    }, '🔗 오픈해시란?')
                ]),
                
                // 주요 통계
                statistics && React.createElement('div', { className: 'grid md:grid-cols-4 gap-4 mt-6', key: 'stats' },
                    [
                        { label: '관리 공무원', value: (statistics.total_servants / 10000).toFixed(0) + '만명', icon: '👨‍💼', color: 'blue' },
                        { label: '연간 채용', value: (statistics.annual_recruitment / 10000).toFixed(0) + '만명', icon: '📝', color: 'green' },
                        { label: '연간 승진', value: (statistics.annual_promotion / 10000).toFixed(1) + '만명', icon: '⬆️', color: 'yellow' },
                        { label: '교육 과정', value: statistics.education_courses.toLocaleString() + '개', icon: '📚', color: 'purple' }
                    ].map((stat, idx) =>
                        React.createElement('div', {
                            key: idx,
                            className: `bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center`
                        }, [
                            React.createElement('div', { className: 'text-4xl mb-2', key: 'icon' }, stat.icon),
                            React.createElement('div', { className: 'text-3xl font-black mb-1', key: 'value' }, stat.value),
                            React.createElement('div', { className: 'text-sm opacity-90', key: 'label' }, stat.label)
                        ])
                    )
                )
            ])
        ),

        // 메인 컨텐츠
        React.createElement('main', { className: 'container mx-auto px-4 py-8', key: 'main' }, [
            // 탭 메뉴
            React.createElement('div', { className: 'flex gap-4 mb-6 overflow-x-auto', key: 'tabs' },
                [
                    { id: 'consult', label: '💬 AI 인사상담', icon: '💬' },
                    { id: 'recruit', label: '📝 채용 자격확인', icon: '📝' },
                    { id: 'ndr', label: '🌐 국가데이터처', icon: '🌐' },
                    { id: 'agents', label: '🤖 7개 에이전트', icon: '🤖' }
                ].map(tab =>
                    React.createElement('button', {
                        key: tab.id,
                        onClick: () => setActiveTab(tab.id),
                        className: `px-6 py-3 rounded-xl font-bold transition-all ${
                            activeTab === tab.id
                                ? 'bg-purple-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`
                    }, tab.label)
                )
            ),

            // 탭 컨텐츠
            React.createElement('div', { className: 'bg-white rounded-2xl shadow-xl p-6', key: 'content' }, [
                // AI 인사상담 탭
                activeTab === 'consult' && React.createElement('div', { key: 'consult' }, [
                    React.createElement('h2', { className: 'text-3xl font-bold text-gray-800 mb-4', key: 'title' }, '💬 AI 인사 상담원'),
                    React.createElement('p', { className: 'text-gray-600 mb-6', key: 'desc' }, '채용, 배치, 교육, 평가, 보수, 복무, 연금 등 인사 관련 궁금한 점을 물어보세요.'),
                    
                    // 채팅 메시지
                    React.createElement('div', { className: 'bg-gray-50 rounded-xl p-6 mb-4 h-96 overflow-y-auto', key: 'chat' },
                        chatMessages.length === 0
                            ? React.createElement('div', { className: 'text-center text-gray-400 mt-20' }, [
                                React.createElement('div', { className: 'text-6xl mb-4', key: 'icon' }, '💬'),
                                React.createElement('p', { key: 'text' }, '인사 관련 질문을 입력하세요')
                            ])
                            : chatMessages.map((msg, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: `mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`
                                }, [
                                    React.createElement('div', {
                                        className: `inline-block max-w-[80%] p-4 rounded-2xl ${
                                            msg.role === 'user'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-white border-2 border-gray-200'
                                        }`,
                                        key: 'message'
                                    }, msg.content),
                                    msg.openhash && React.createElement('div', {
                                        className: 'text-xs text-gray-500 mt-1',
                                        key: 'hash'
                                    }, `🔗 ${msg.layer} | OpenHash: ${msg.openhash}`)
                                ])
                            )
                    ),
                    
                    // 입력창
                    React.createElement('div', { className: 'flex gap-3', key: 'input' }, [
                        React.createElement('input', {
                            type: 'text',
                            value: userInput,
                            onChange: (e) => setUserInput(e.target.value),
                            onKeyPress: (e) => e.key === 'Enter' && sendMessage(),
                            placeholder: '예: 5급 승진 요건이 어떻게 되나요?',
                            className: 'flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500',
                            disabled: isLoading,
                            key: 'input-field'
                        }),
                        React.createElement('button', {
                            onClick: sendMessage,
                            disabled: isLoading,
                            className: 'bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all disabled:bg-gray-400',
                            key: 'send-btn'
                        }, isLoading ? '⏳' : '전송')
                    ])
                ]),

                // 채용 자격확인 탭
                activeTab === 'recruit' && React.createElement('div', { key: 'recruit' }, [
                    React.createElement('h2', { className: 'text-3xl font-bold text-gray-800 mb-4', key: 'title' }, '📝 채용 자격 확인 (국가데이터처 연동)'),
                    React.createElement('p', { className: 'text-gray-600 mb-6', key: 'desc' }, '병무청, 교육부, 법무부 등과 실시간 연계하여 15초 만에 자격을 확인합니다.'),
                    
                    React.createElement('div', { className: 'bg-gradient-to-r from-blue-50 to-purple-50 border-3 border-blue-300 rounded-2xl p-8 mb-6', key: 'comparison' }, [
                        React.createElement('div', { className: 'text-center mb-6', key: 'title' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-2', key: 'h3' }, '⚡ 국가데이터처 연동 효과'),
                            React.createElement('p', { className: 'text-gray-600', key: 'p' }, '부처 간 데이터 사일로 완전 해소')
                        ]),
                        React.createElement('div', { className: 'grid md:grid-cols-2 gap-6', key: 'comparison-grid' }, [
                            React.createElement('div', { className: 'bg-red-100 border-2 border-red-400 rounded-xl p-6', key: 'before' }, [
                                React.createElement('h4', { className: 'text-xl font-bold text-red-800 mb-3', key: 'title' }, '❌ 기존 방식'),
                                React.createElement('div', { className: 'space-y-2 text-gray-700', key: 'list' }, [
                                    React.createElement('div', { key: '1' }, '• 병무청 공문 발송 → 2주 대기'),
                                    React.createElement('div', { key: '2' }, '• 교육부 공문 발송 → 2주 대기'),
                                    React.createElement('div', { key: '3' }, '• 법무부 공문 발송 → 2주 대기'),
                                    React.createElement('div', { className: 'font-bold text-red-700 mt-3', key: '4' }, '📊 총 소요시간: 6주'),
                                    React.createElement('div', { className: 'font-bold text-red-700', key: '5' }, '💰 연계 비용: 450억원/년')
                                ])
                            ]),
                            React.createElement('div', { className: 'bg-green-100 border-2 border-green-400 rounded-xl p-6', key: 'after' }, [
                                React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-3', key: 'title' }, '✅ 국가데이터처 연동'),
                                React.createElement('div', { className: 'space-y-2 text-gray-700', key: 'list' }, [
                                    React.createElement('div', { key: '1' }, '• 병무청 API 호출 → 0.3초'),
                                    React.createElement('div', { key: '2' }, '• 교육부 API 호출 → 0.4초'),
                                    React.createElement('div', { key: '3' }, '• 법무부 API 호출 → 0.3초'),
                                    React.createElement('div', { className: 'font-bold text-green-700 mt-3', key: '4' }, '⚡ 총 소요시간: 1.2초'),
                                    React.createElement('div', { className: 'font-bold text-green-700', key: '5' }, '🎉 연계 비용: 0원')
                                ])
                            ])
                        ])
                    ]),
                    
                    React.createElement('button', {
                        onClick: checkRecruitment,
                        disabled: isLoading,
                        className: 'w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-4 rounded-xl hover:scale-105 transition-all shadow-lg disabled:opacity-50',
                        key: 'check-btn'
                    }, isLoading ? '확인 중...' : '🔍 채용 자격 확인 시작'),

                    // 결과 표시
                    recruitResult && React.createElement('div', { className: 'mt-6 bg-gray-50 rounded-xl p-6', key: 'result' }, [
                        React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-4', key: 'title' }, 
                            `✅ ${recruitResult.applicant}님 자격 확인 완료`),
                        
                        React.createElement('div', { className: 'space-y-3 mb-6', key: 'checks' },
                            Object.entries(recruitResult.ndr_checks).map(([dept, info]) =>
                                React.createElement('div', {
                                    key: dept,
                                    className: 'flex items-center justify-between bg-white p-4 rounded-lg border-2 border-green-300'
                                }, [
                                    React.createElement('div', { className: 'flex items-center gap-3', key: 'left' }, [
                                        React.createElement('span', { className: 'text-2xl', key: 'icon' }, '✅'),
                                        React.createElement('div', { key: 'text' }, [
                                            React.createElement('div', { className: 'font-bold text-gray-800', key: 'dept' }, dept),
                                            React.createElement('div', { className: 'text-sm text-gray-600', key: 'result' }, info.result)
                                        ])
                                    ]),
                                    React.createElement('div', { className: 'text-blue-600 font-bold', key: 'time' }, info.time)
                                ])
                            )
                        ),
                        
                        React.createElement('div', { className: 'bg-gradient-to-r from-green-100 to-blue-100 border-3 border-green-400 rounded-xl p-6', key: 'summary' }, [
                            React.createElement('div', { className: 'text-center', key: 'content' }, [
                                React.createElement('div', { className: 'text-3xl font-black text-green-700 mb-2', key: 'time' }, 
                                    `⚡ 총 소요시간: ${recruitResult.total_time}`),
                                React.createElement('div', { className: 'text-xl text-gray-700', key: 'comparison' }, recruitResult.comparison),
                                React.createElement('div', { className: 'text-sm text-gray-600 mt-3', key: 'hash' }, 
                                    `🔗 ${recruitResult.layer} | OpenHash: ${recruitResult.openhash}`)
                            ])
                        ])
                    ])
                ]),

                // 국가데이터처 탭
                activeTab === 'ndr' && React.createElement('div', { key: 'ndr' }, [
                    React.createElement('h2', { className: 'text-3xl font-bold text-gray-800 mb-4', key: 'title' }, '🌐 국가데이터처 연동'),
                    React.createElement('p', { className: 'text-gray-600 mb-6', key: 'desc' }, '2025년 10월 1일 출범한 국가데이터처와 실시간 데이터 연계'),
                    
                    React.createElement('div', { className: 'space-y-6', key: 'content' }, [
                        React.createElement('div', { className: 'bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-400 rounded-2xl p-8', key: 'info' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-blue-900 mb-4', key: 'title' }, '📊 국가데이터처란?'),
                            React.createElement('div', { className: 'space-y-3 text-gray-700', key: 'list' }, [
                                React.createElement('div', { key: '1' }, '• 국무총리 직속 차관급 중앙행정기관'),
                                React.createElement('div', { key: '2' }, '• 정부조직법 제27조에 따른 통계 총괄·조정'),
                                React.createElement('div', { key: '3' }, '• 범정부 데이터 거버넌스 확립'),
                                React.createElement('div', { key: '4' }, '• 부처 간 데이터 연계 플랫폼 (503만+ 노드)'),
                                React.createElement('div', { className: 'font-bold text-blue-700 mt-3', key: '5' }, '🔗 Open API: https://api.ndr.go.kr')
                            ])
                        ]),

                        React.createElement('div', { className: 'grid md:grid-cols-3 gap-4', key: 'benefits' },
                            [
                                { icon: '⚡', title: '즉시 연계', value: '15초', desc: '기존 15개월 → 현재 15초' },
                                { icon: '💰', title: '비용 절감', value: '0원', desc: '기존 450억원 → 현재 0원' },
                                { icon: '🔒', title: 'PIPA 준수', value: '2.3초', desc: '법률 자동 검증' }
                            ].map((item, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: 'bg-white border-3 border-gray-300 rounded-xl p-6 text-center stat-card'
                                }, [
                                    React.createElement('div', { className: 'text-5xl mb-3', key: 'icon' }, item.icon),
                                    React.createElement('div', { className: 'text-2xl font-black text-gray-800 mb-2', key: 'value' }, item.value),
                                    React.createElement('div', { className: 'font-bold text-gray-700 mb-1', key: 'title' }, item.title),
                                    React.createElement('div', { className: 'text-sm text-gray-600', key: 'desc' }, item.desc)
                                ])
                            )
                        ),

                        React.createElement('div', { className: 'bg-white border-3 border-gray-300 rounded-xl p-6', key: 'connections' }, [
                            React.createElement('h3', { className: 'text-xl font-bold text-gray-800 mb-4', key: 'title' }, '🔗 인사혁신처 연계 부처'),
                            React.createElement('div', { className: 'grid md:grid-cols-2 gap-3', key: 'list' },
                                [
                                    { dept: '병무청', data: '군복무 이력', icon: '🎖️' },
                                    { dept: '교육부', data: '학력 인증', icon: '🎓' },
                                    { dept: '법무부', data: '결격사유', icon: '⚖️' },
                                    { dept: '행정안전부', data: '지자체 인사', icon: '🏛️' },
                                    { dept: '공무원연금공단', data: '연금 정보', icon: '💼' },
                                    { dept: '국세청', data: '세금 납부', icon: '💰' }
                                ].map((item, idx) =>
                                    React.createElement('div', {
                                        key: idx,
                                        className: 'flex items-center gap-3 bg-gray-50 p-3 rounded-lg'
                                    }, [
                                        React.createElement('span', { className: 'text-2xl', key: 'icon' }, item.icon),
                                        React.createElement('div', { key: 'text' }, [
                                            React.createElement('div', { className: 'font-bold text-gray-800', key: 'dept' }, item.dept),
                                            React.createElement('div', { className: 'text-sm text-gray-600', key: 'data' }, item.data)
                                        ])
                                    ])
                                )
                            )
                        ])
                    ])
                ]),

                // 7개 에이전트 탭
                activeTab === 'agents' && React.createElement('div', { key: 'agents' }, [
                    React.createElement('h2', { className: 'text-3xl font-bold text-gray-800 mb-4', key: 'title' }, '🤖 AI 멀티에이전트 시스템'),
                    React.createElement('p', { className: 'text-gray-600 mb-6', key: 'desc' }, '7개 전문 에이전트가 Apache Kafka로 실시간 협업'),
                    
                    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4', key: 'agents-grid' },
                        [
                            { name: '채용 에이전트', model: 'DeepSeek R1 70B', tasks: ['자격 확인', '필기시험 분석', '면접 평가'], icon: '📝', color: 'blue' },
                            { name: '배치 에이전트', model: 'DeepSeek R1 70B', tasks: ['적성 분석', '부서 매칭', '전보 추천'], icon: '🎯', color: 'green' },
                            { name: '교육 에이전트', model: 'LLaMA 3.1 8B', tasks: ['교육 추천', '이수 관리', '성적 평가'], icon: '📚', color: 'yellow' },
                            { name: '평가 에이전트', model: 'LLaMA 3.1 8B', tasks: ['성과 분석', 'KPI 산정', '피드백 생성'], icon: '⭐', color: 'purple' },
                            { name: '보수 에이전트', model: 'LLaMA 3.1 8B', tasks: ['봉급 계산', '수당 산정', '세금 처리'], icon: '💰', color: 'pink' },
                            { name: '복무 에이전트', model: 'Mistral 22B', tasks: ['출퇴근 관리', '휴가 승인', '징계 검토'], icon: '📅', color: 'indigo' },
                            { name: '연금 에이전트', model: 'Mistral 22B', tasks: ['재직기간 산정', '연금액 계산', '퇴직금 산출'], icon: '🏦', color: 'red' }
                        ].map((agent, idx) =>
                            React.createElement('div', {
                                key: idx,
                                className: `bg-gradient-to-br from-${agent.color}-50 to-${agent.color}-100 border-3 border-${agent.color}-400 rounded-xl p-6 stat-card`
                            }, [
                                React.createElement('div', { className: 'flex items-center gap-3 mb-4', key: 'header' }, [
                                    React.createElement('span', { className: 'text-4xl', key: 'icon' }, agent.icon),
                                    React.createElement('div', { key: 'text' }, [
                                        React.createElement('h3', { className: 'text-xl font-bold text-gray-800', key: 'name' }, agent.name),
                                        React.createElement('p', { className: 'text-sm text-gray-600', key: 'model' }, agent.model)
                                    ])
                                ]),
                                React.createElement('div', { className: 'space-y-2', key: 'tasks' },
                                    agent.tasks.map((task, taskIdx) =>
                                        React.createElement('div', {
                                            key: taskIdx,
                                            className: 'bg-white bg-opacity-50 px-3 py-2 rounded-lg text-sm text-gray-700'
                                        }, `• ${task}`)
                                    )
                                )
                            ])
                        )
                    ),

                    React.createElement('div', { className: 'mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-3 border-purple-400 rounded-2xl p-8', key: 'features' }, [
                        React.createElement('h3', { className: 'text-2xl font-bold text-purple-900 mb-4', key: 'title' }, '✨ AI 시스템 특징'),
                        React.createElement('div', { className: 'grid md:grid-cols-3 gap-4', key: 'list' },
                            [
                                { icon: '🎓', title: 'Fine-tuned', desc: '국가공무원법 152개 조문 학습' },
                                { icon: '⚖️', title: '공정성 보장', desc: '편향 실시간 탐지 (±3%)' },
                                { icon: '🔍', title: 'XAI 설명', desc: 'SHAP 분석으로 근거 제시' }
                            ].map((item, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: 'bg-white rounded-xl p-4 text-center'
                                }, [
                                    React.createElement('div', { className: 'text-4xl mb-2', key: 'icon' }, item.icon),
                                    React.createElement('div', { className: 'font-bold text-gray-800 mb-1', key: 'title' }, item.title),
                                    React.createElement('div', { className: 'text-sm text-gray-600', key: 'desc' }, item.desc)
                                ])
                            )
                        )
                    ])
                ])
            ])
        ]),

        // 오픈해시 모달
        showOpenHashModal && React.createElement(OpenHashModal, {
            onClose: () => setShowOpenHashModal(false),
            key: 'modal'
        })
    ]);
}

// 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(PersonnelInnovationApp));

console.log('✅ 인사혁신처 AI 시스템 로드 완료');
