// 오픈해시 설명 전용 컴포넌트
(function() {
    window.OpenHashExplanationModal = function({ show, onClose }) {
        const [activeTab, setActiveTab] = React.useState('overview');
        const [animateFlow, setAnimateFlow] = React.useState(false);
        
        React.useEffect(() => {
            if (show) {
                setAnimateFlow(true);
            }
        }, [show]);

        if (!show) return null;

        const tabs = [
            { id: 'overview', label: '개요', icon: '📚' },
            { id: 'technology', label: '기술 원리', icon: '⚙️' },
            { id: 'medical', label: '의료 적용', icon: '🏥' },
            { id: 'security', label: '보안 체계', icon: '🔐' },
            { id: 'comparison', label: '블록체인 비교', icon: '📊' },
            { id: 'future', label: '미래 전망', icon: '🚀' }
        ];

        return React.createElement('div', {
            className: 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4',
            onClick: onClose
        }, [
            React.createElement('div', {
                className: 'bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl',
                onClick: (e) => e.stopPropagation(),
                key: 'modal'
            }, [
                // 헤더
                React.createElement('div', {
                    className: 'sticky top-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white p-8 z-10',
                    key: 'header'
                }, [
                    React.createElement('div', { className: 'flex justify-between items-start mb-6', key: 'title-row' }, [
                        React.createElement('div', { key: 'title-section' }, [
                            React.createElement('h2', { className: 'text-4xl font-bold mb-3', key: 'title' }, '🔐 오픈해시(OpenHash) 기술'),
                            React.createElement('p', { className: 'text-lg opacity-90', key: 'subtitle' }, '차세대 의료 데이터 보안 인프라의 핵심'),
                            React.createElement('p', { className: 'text-sm opacity-75 mt-2', key: 'tagline' }, '블록체인의 보안성 + 98.5% 에너지 효율')
                        ]),
                        React.createElement('button', {
                            onClick: onClose,
                            className: 'text-white hover:bg-white hover:bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center transition text-2xl',
                            key: 'close'
                        }, '×')
                    ]),
                    // 탭 네비게이션
                    React.createElement('div', { className: 'flex gap-2 overflow-x-auto', key: 'tabs' },
                        tabs.map(tab =>
                            React.createElement('button', {
                                key: tab.id,
                                onClick: () => setActiveTab(tab.id),
                                className: 'flex items-center gap-2 px-4 py-2 rounded-xl transition whitespace-nowrap ' + 
                                    (activeTab === tab.id 
                                        ? 'bg-white text-purple-700 font-bold shadow-lg' 
                                        : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white')
                            }, [
                                React.createElement('span', { key: 'icon' }, tab.icon),
                                React.createElement('span', { key: 'label' }, tab.label)
                            ])
                        )
                    )
                ]),

                // 컨텐츠
                React.createElement('div', {
                    className: 'p-8 overflow-y-auto',
                    style: { maxHeight: 'calc(95vh - 220px)' },
                    key: 'content'
                }, [
                    // 개요 탭
                    activeTab === 'overview' && React.createElement('div', { className: 'space-y-6', key: 'overview' }, [
                        React.createElement('div', { className: 'grid md:grid-cols-3 gap-6', key: 'stats' },
                            [
                                { icon: '⚡', value: '98.5%', label: '에너지 절감', color: 'green' },
                                { icon: '🔒', value: '100%', label: '데이터 무결성', color: 'blue' },
                                { icon: '⏱️', value: '<1초', label: '트랜잭션 확정', color: 'purple' }
                            ].map((stat, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: `bg-${stat.color}-50 border-2 border-${stat.color}-200 rounded-xl p-6 text-center`
                                }, [
                                    React.createElement('div', { className: 'text-5xl mb-3', key: 'icon' }, stat.icon),
                                    React.createElement('div', { className: `text-3xl font-bold text-${stat.color}-700 mb-2`, key: 'value' }, stat.value),
                                    React.createElement('div', { className: 'text-sm text-gray-600', key: 'label' }, stat.label)
                                ])
                            )
                        ),
                        
                        React.createElement('div', { className: 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-2xl p-8', key: 'intro' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-purple-800 mb-4', key: 'h3' }, '💡 오픈해시란?'),
                            React.createElement('p', { className: 'text-gray-700 leading-relaxed text-lg mb-4', key: 'p1' }, 
                                '오픈해시는 블록체인의 핵심 장점인 "변조 불가능성"과 "분산 검증"을 유지하면서, 에너지 소비를 98.5% 감소시킨 혁신적인 분산 원장 기술입니다.'
                            ),
                            React.createElement('p', { className: 'text-gray-700 leading-relaxed text-lg', key: 'p2' }, 
                                '복잡한 작업증명(PoW) 채굴 대신, 암호화 해시 체인과 타임스탬프만으로 데이터 무결성을 보장하여 의료, 금융, 공공 행정 등 모든 분야에 적용 가능합니다.'
                            )
                        ]),

                        // 핵심 개념 카드
                        React.createElement('div', { className: 'grid md:grid-cols-2 gap-4', key: 'concepts' },
                            [
                                { 
                                    icon: '🔗', 
                                    title: '해시 체인', 
                                    desc: '각 기록이 이전 기록의 해시를 포함하여 체인으로 연결. 하나라도 변조되면 전체 체인의 해시가 변경되어 즉시 감지'
                                },
                                { 
                                    icon: '🌐', 
                                    title: '분산 검증', 
                                    desc: '여러 독립 노드가 동시에 해시를 검증. 단일 실패점이 없어 높은 신뢰성과 가용성 보장'
                                },
                                { 
                                    icon: '⚡', 
                                    title: '즉시 확정', 
                                    desc: '채굴 대기 시간 없이 기록과 동시에 확정. 응급 의료 상황에서도 지연 없이 작동'
                                },
                                { 
                                    icon: '♻️', 
                                    title: '친환경', 
                                    desc: '막대한 전력을 소비하는 채굴 불필요. 일반 서버만으로 운영 가능한 지속 가능한 기술'
                                }
                            ].map((concept, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: 'bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition'
                                }, [
                                    React.createElement('div', { className: 'text-4xl mb-3', key: 'icon' }, concept.icon),
                                    React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-2', key: 'title' }, concept.title),
                                    React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, concept.desc)
                                ])
                            )
                        )
                    ]),

                    // 기술 원리 탭
                    activeTab === 'technology' && React.createElement('div', { className: 'space-y-6', key: 'technology' }, [
                        React.createElement('div', { className: 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 rounded-2xl p-8', key: 'how' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-orange-800 mb-6 flex items-center gap-3', key: 'title' }, [
                                React.createElement('span', { key: 'icon' }, '⚙️'),
                                React.createElement('span', { key: 'text' }, '작동 원리')
                            ]),
                            
                            React.createElement('div', { className: 'space-y-4', key: 'steps' },
                                [
                                    { 
                                        num: '1', 
                                        title: '데이터 직렬화', 
                                        desc: 'AI 의사의 진단, 검사 결과, 대화 기록 등 모든 의료 데이터를 표준 JSON 형식으로 직렬화',
                                        color: 'bg-orange-500'
                                    },
                                    { 
                                        num: '2', 
                                        title: 'SHA-256 해싱', 
                                        desc: '직렬화된 데이터에 SHA-256 알고리즘을 적용하여 64자리 16진수 해시 생성. 단 1비트만 변경되어도 완전히 다른 해시 생성',
                                        color: 'bg-orange-600'
                                    },
                                    { 
                                        num: '3', 
                                        title: '체인 연결', 
                                        desc: '현재 기록의 해시에 이전 기록의 해시를 포함시켜 시간순 체인 형성. 블록체인과 동일한 구조',
                                        color: 'bg-orange-700'
                                    },
                                    { 
                                        num: '4', 
                                        title: '타임스탬프 추가', 
                                        desc: 'UTC 기준 타임스탬프를 해시와 함께 기록하여 시간 순서 보장',
                                        color: 'bg-orange-800'
                                    },
                                    { 
                                        num: '5', 
                                        title: '분산 저장', 
                                        desc: '생성된 해시를 국가 오픈해시 네트워크의 여러 노드(병원, 보건소, 정부 서버)에 동시 전송',
                                        color: 'bg-orange-900'
                                    },
                                    { 
                                        num: '6', 
                                        title: '독립 검증', 
                                        desc: '각 노드가 독립적으로 해시를 검증하고 저장. 합의 알고리즘 없이도 다수결로 무결성 확인',
                                        color: 'bg-orange-950'
                                    }
                                ].map((step, idx) =>
                                    React.createElement('div', {
                                        key: idx,
                                        className: 'flex items-start gap-4 bg-white rounded-xl p-5 shadow'
                                    }, [
                                        React.createElement('div', {
                                            className: `${step.color} text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl`,
                                            key: 'num'
                                        }, step.num),
                                        React.createElement('div', { key: 'content' }, [
                                            React.createElement('h4', { className: 'font-bold text-gray-800 mb-2', key: 'title' }, step.title),
                                            React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, step.desc)
                                        ])
                                    ])
                                )
                            )
                        ]),

                        // 해시 시뮬레이션
                        React.createElement('div', { className: 'bg-gray-900 text-green-400 rounded-2xl p-6 font-mono', key: 'simulation' }, [
                            React.createElement('div', { className: 'text-sm mb-4', key: 'title' }, '💻 실시간 해시 시뮬레이션'),
                            React.createElement('div', { className: 'space-y-2 text-xs', key: 'code' }, [
                                React.createElement('div', { key: '1' }, '> 입력 데이터: {"patient":"김철수", "diagnosis":"요추 추간판 탈출증"}'),
                                React.createElement('div', { key: '2' }, '> SHA-256 해싱...'),
                                React.createElement('div', { key: '3', className: 'text-yellow-400' }, '> 해시: 3a5f8c9d2e1b4a6f7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'),
                                React.createElement('div', { key: '4' }, '> 이전 해시: 1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b'),
                                React.createElement('div', { key: '5', className: 'text-blue-400' }, '> 체인 해시: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0'),
                                React.createElement('div', { key: '6', className: 'text-green-400' }, '✓ 네트워크 노드 5개에 전송 완료')
                            ])
                        ])
                    ]),

                    // 의료 적용 탭
                    activeTab === 'medical' && React.createElement('div', { className: 'space-y-6', key: 'medical' }, [
                        React.createElement('div', { className: 'bg-white border-2 border-blue-200 rounded-2xl p-8', key: 'workflow' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-blue-800 mb-6 text-center', key: 'title' }, '🏥 의료 데이터 흐름도'),
                            
                            // 플로우 다이어그램
                            React.createElement('div', { className: 'relative py-8', key: 'flow' }, [
                                // 환자
                                React.createElement('div', { className: 'flex flex-col items-center mb-8', key: 'patient' }, [
                                    React.createElement('div', { className: 'w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-3xl mb-2', key: 'icon' }, '👤'),
                                    React.createElement('div', { className: 'font-bold text-gray-800', key: 'label' }, '환자')
                                ]),
                                
                                React.createElement('div', { className: 'flex justify-center mb-4', key: 'arrow1' }, [
                                    React.createElement('div', { className: 'text-4xl text-blue-500 animate-bounce', key: 'icon' }, '⬇️')
                                ]),
                                
                                // AI 의사
                                React.createElement('div', { className: 'flex flex-col items-center mb-8', key: 'ai' }, [
                                    React.createElement('div', { className: 'w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-3xl mb-2', key: 'icon' }, '🤖'),
                                    React.createElement('div', { className: 'font-bold text-gray-800', key: 'label' }, 'AI 의사 진료')
                                ]),
                                
                                React.createElement('div', { className: 'flex justify-center mb-4', key: 'arrow2' }, [
                                    React.createElement('div', { className: 'text-4xl text-purple-500 animate-bounce', key: 'icon', style: { animationDelay: '0.2s' } }, '⬇️')
                                ]),
                                
                                // PDV + 오픈해시
                                React.createElement('div', { className: 'grid md:grid-cols-2 gap-8 mb-8', key: 'storage' }, [
                                    React.createElement('div', { className: 'flex flex-col items-center', key: 'pdv' }, [
                                        React.createElement('div', { className: 'w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-3xl mb-2', key: 'icon' }, '🔒'),
                                        React.createElement('div', { className: 'font-bold text-gray-800 text-center', key: 'label' }, '개인정보금고(PDV)'),
                                        React.createElement('div', { className: 'text-xs text-gray-600 text-center mt-1', key: 'desc' }, '실제 데이터 암호화 저장')
                                    ]),
                                    React.createElement('div', { className: 'flex flex-col items-center', key: 'openhash' }, [
                                        React.createElement('div', { className: 'w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-3xl mb-2', key: 'icon' }, '🔐'),
                                        React.createElement('div', { className: 'font-bold text-gray-800 text-center', key: 'label' }, '오픈해시 네트워크'),
                                        React.createElement('div', { className: 'text-xs text-gray-600 text-center mt-1', key: 'desc' }, '해시만 분산 저장')
                                    ])
                                ]),
                                
                                React.createElement('div', { className: 'flex justify-center mb-4', key: 'arrow3' }, [
                                    React.createElement('div', { className: 'text-4xl text-green-500 animate-bounce', key: 'icon', style: { animationDelay: '0.4s' } }, '⬇️')
                                ]),
                                
                                // 검증
                                React.createElement('div', { className: 'flex flex-col items-center', key: 'verify' }, [
                                    React.createElement('div', { className: 'w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-3xl mb-2', key: 'icon' }, '✓'),
                                    React.createElement('div', { className: 'font-bold text-gray-800', key: 'label' }, '데이터 무결성 검증')
                                ])
                            ])
                        ]),

                        // 실제 사용 사례
                        React.createElement('div', { className: 'grid md:grid-cols-2 gap-6', key: 'usecases' },
                            [
                                {
                                    icon: '🩺',
                                    title: 'AI 진단 기록',
                                    items: ['진단명과 근거', '검사 결과', '처방 내역', '의사 소견']
                                },
                                {
                                    icon: '🔬',
                                    title: '검사 데이터',
                                    items: ['X-Ray/CT 판독', '혈액 검사 수치', 'MRI 소견', '병리 검사 결과']
                                },
                                {
                                    icon: '💊',
                                    title: '처방 이력',
                                    items: ['약물명과 용량', '투약 기간', '부작용 기록', '처방 변경 이력']
                                },
                                {
                                    icon: '📋',
                                    title: '진료 기록',
                                    items: ['환자 면담 내용', 'AI와 대화 로그', '생체 인증 기록', '진료비 정보']
                                }
                            ].map((usecase, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6'
                                }, [
                                    React.createElement('div', { className: 'text-4xl mb-3', key: 'icon' }, usecase.icon),
                                    React.createElement('h4', { className: 'text-lg font-bold text-gray-800 mb-3', key: 'title' }, usecase.title),
                                    React.createElement('ul', { className: 'space-y-2', key: 'items' },
                                        usecase.items.map((item, iidx) =>
                                            React.createElement('li', {
                                                key: iidx,
                                                className: 'text-sm text-gray-700 flex items-center gap-2'
                                            }, [
                                                React.createElement('span', { key: 'bullet', className: 'text-blue-500' }, '•'),
                                                React.createElement('span', { key: 'text' }, item)
                                            ])
                                        )
                                    )
                                ])
                            )
                        )
                    ]),

                    // 보안 체계 탭
                    activeTab === 'security' && React.createElement('div', { className: 'space-y-6', key: 'security' }, [
                        React.createElement('div', { className: 'bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8', key: 'layers' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-red-800 mb-6', key: 'title' }, '🛡️ 다층 보안 체계'),
                            
                            React.createElement('div', { className: 'space-y-4', key: 'layers-content' },
                                [
                                    {
                                        layer: '1단계',
                                        name: '생체 인증',
                                        desc: '지문, 홍채, 얼굴 인식으로 본인 확인',
                                        tech: 'PDV 접근 권한 획득',
                                        color: 'bg-red-100 border-red-300'
                                    },
                                    {
                                        layer: '2단계',
                                        name: 'PDV 암호화',
                                        desc: '실제 의료 데이터는 AES-256으로 암호화하여 PDV에 저장',
                                        tech: '환자만 복호화 키 소유',
                                        color: 'bg-orange-100 border-orange-300'
                                    },
                                    {
                                        layer: '3단계',
                                        name: '오픈해시 체인',
                                        desc: '데이터의 해시만 네트워크에 공개. 원본은 비공개',
                                        tech: '변조 시도 즉시 감지',
                                        color: 'bg-yellow-100 border-yellow-300'
                                    },
                                    {
                                        layer: '4단계',
                                        name: '분산 검증',
                                        desc: '5개 이상의 독립 노드가 동시에 해시 검증',
                                        tech: '단일 노드 해킹으로 조작 불가',
                                        color: 'bg-green-100 border-green-300'
                                    },
                                    {
                                        layer: '5단계',
                                        name: '접근 로그',
                                        desc: '모든 접근 시도가 오픈해시로 기록',
                                        tech: '누가 언제 어떤 데이터를 조회했는지 추적',
                                        color: 'bg-blue-100 border-blue-300'
                                    }
                                ].map((layer, idx) =>
                                    React.createElement('div', {
                                        key: idx,
                                        className: `${layer.color} border-2 rounded-xl p-5`
                                    }, [
                                        React.createElement('div', { className: 'flex items-center gap-3 mb-2', key: 'header' }, [
                                            React.createElement('span', { className: 'font-bold text-lg', key: 'layer' }, layer.layer),
                                            React.createElement('span', { className: 'font-bold text-gray-800', key: 'name' }, layer.name)
                                        ]),
                                        React.createElement('p', { className: 'text-sm text-gray-700 mb-2', key: 'desc' }, layer.desc),
                                        React.createElement('p', { className: 'text-xs text-gray-600 italic', key: 'tech' }, `→ ${layer.tech}`)
                                    ])
                                )
                            )
                        ]),

                        // 공격 시나리오와 방어
                        React.createElement('div', { className: 'bg-white border-2 border-gray-200 rounded-2xl p-8', key: 'attacks' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-6', key: 'title' }, '⚔️ 보안 위협과 방어'),
                            
                            React.createElement('div', { className: 'space-y-4', key: 'scenarios' },
                                [
                                    {
                                        attack: '해커가 PDV 서버를 해킹하여 의료 기록 변조 시도',
                                        defense: '데이터 변조 시 해시값이 변경되어 오픈해시 네트워크의 모든 노드가 불일치 감지. 자동으로 원본 데이터 복구'
                                    },
                                    {
                                        attack: '내부자(병원 직원)가 권한을 남용하여 환자 정보 무단 조회',
                                        defense: '모든 접근이 오픈해시로 기록되어 추적 가능. 환자에게 실시간 알림 전송'
                                    },
                                    {
                                        attack: '랜섬웨어 공격으로 병원 서버의 의료 기록 암호화',
                                        defense: '실제 데이터는 분산 저장. 해시로 무결성 검증하여 다른 노드에서 복구'
                                    },
                                    {
                                        attack: '가짜 AI 진단 결과를 주입하여 오진 유도',
                                        defense: 'AI 진단 과정 자체가 오픈해시로 기록. 입력 데이터와 출력 결과의 해시 검증'
                                    }
                                ].map((scenario, idx) =>
                                    React.createElement('div', {
                                        key: idx,
                                        className: 'border-l-4 border-red-500 pl-4'
                                    }, [
                                        React.createElement('div', { className: 'font-bold text-red-700 mb-2 flex items-start gap-2', key: 'attack' }, [
                                            React.createElement('span', { key: 'icon' }, '⚠️'),
                                            React.createElement('span', { key: 'text' }, `위협: ${scenario.attack}`)
                                        ]),
                                        React.createElement('div', { className: 'text-sm text-green-700 flex items-start gap-2', key: 'defense' }, [
                                            React.createElement('span', { key: 'icon' }, '🛡️'),
                                            React.createElement('span', { key: 'text' }, `방어: ${scenario.defense}`)
                                        ])
                                    ])
                                )
                            )
                        ])
                    ]),

                    // 블록체인 비교 탭
                    activeTab === 'comparison' && React.createElement('div', { className: 'space-y-6', key: 'comparison' }, [
                        React.createElement('div', { className: 'grid md:grid-cols-2 gap-6', key: 'compare' }, [
                            // 블록체인
                            React.createElement('div', { className: 'bg-red-50 border-2 border-red-200 rounded-2xl p-8', key: 'blockchain' }, [
                                React.createElement('div', { className: 'text-center mb-6', key: 'header' }, [
                                    React.createElement('div', { className: 'text-5xl mb-3', key: 'icon' }, '⛓️'),
                                    React.createElement('h3', { className: 'text-2xl font-bold text-red-800', key: 'title' }, '기존 블록체인')
                                ]),
                                React.createElement('div', { className: 'space-y-3', key: 'cons' },
                                    [
                                        '❌ 막대한 에너지 소비 (비트코인: 연간 150TWh)',
                                        '❌ 느린 트랜잭션 (10분~1시간)',
                                        '❌ 높은 수수료 (Gas Fee)',
                                        '❌ 확장성 제한 (TPS 7~15)',
                                        '❌ 복잡한 합의 알고리즘',
                                        '❌ 환경 오염 문제'
                                    ].map((item, idx) =>
                                        React.createElement('div', {
                                            key: idx,
                                            className: 'text-sm text-gray-700 bg-white rounded p-3'
                                        }, item)
                                    )
                                )
                            ]),
                            
                            // 오픈해시
                            React.createElement('div', { className: 'bg-green-50 border-2 border-green-200 rounded-2xl p-8', key: 'openhash' }, [
                                React.createElement('div', { className: 'text-center mb-6', key: 'header' }, [
                                    React.createElement('div', { className: 'text-5xl mb-3', key: 'icon' }, '🔐'),
                                    React.createElement('h3', { className: 'text-2xl font-bold text-green-800', key: 'title' }, '오픈해시')
                                ]),
                                React.createElement('div', { className: 'space-y-3', key: 'pros' },
                                    [
                                        '✅ 98.5% 에너지 절감 (일반 서버 수준)',
                                        '✅ 즉시 확정 (<1초)',
                                        '✅ 수수료 없음',
                                        '✅ 무제한 확장 (TPS 10,000+)',
                                        '✅ 단순한 해시 체인',
                                        '✅ 친환경 지속 가능'
                                    ].map((item, idx) =>
                                        React.createElement('div', {
                                            key: idx,
                                            className: 'text-sm text-gray-700 bg-white rounded p-3 font-medium'
                                        }, item)
                                    )
                                )
                            ])
                        ]),

                        // 성능 비교 차트
                        React.createElement('div', { className: 'bg-white border-2 border-gray-200 rounded-2xl p-8', key: 'chart' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-6 text-center', key: 'title' }, '📊 성능 비교'),
                            
                            React.createElement('div', { className: 'space-y-6', key: 'metrics' },
                                [
                                    { label: '에너지 소비', blockchain: '100%', openhash: '1.5%', better: 'openhash' },
                                    { label: '트랜잭션 속도', blockchain: '10분', openhash: '<1초', better: 'openhash' },
                                    { label: '비용', blockchain: '$10~50', openhash: '$0', better: 'openhash' },
                                    { label: '확장성 (TPS)', blockchain: '7', openhash: '10,000+', better: 'openhash' },
                                    { label: '보안성', blockchain: '99.9%', openhash: '99.9%', better: 'equal' }
                                ].map((metric, idx) =>
                                    React.createElement('div', { key: idx }, [
                                        React.createElement('div', { className: 'font-bold text-gray-700 mb-2', key: 'label' }, metric.label),
                                        React.createElement('div', { className: 'grid grid-cols-2 gap-4', key: 'values' }, [
                                            React.createElement('div', {
                                                key: 'blockchain',
                                                className: 'bg-red-100 border-2 border-red-300 rounded-lg p-3 text-center'
                                            }, [
                                                React.createElement('div', { className: 'text-xs text-gray-600 mb-1', key: 'label' }, '블록체인'),
                                                React.createElement('div', { className: 'font-bold text-red-700', key: 'value' }, metric.blockchain)
                                            ]),
                                            React.createElement('div', {
                                                key: 'openhash',
                                                className: `${metric.better === 'openhash' ? 'bg-green-100 border-green-300' : 'bg-blue-100 border-blue-300'} border-2 rounded-lg p-3 text-center`
                                            }, [
                                                React.createElement('div', { className: 'text-xs text-gray-600 mb-1', key: 'label' }, '오픈해시'),
                                                React.createElement('div', { className: `font-bold ${metric.better === 'openhash' ? 'text-green-700' : 'text-blue-700'}`, key: 'value' }, metric.openhash)
                                            ])
                                        ])
                                    ])
                                )
                            )
                        ])
                    ]),

                    // 미래 전망 탭
                    activeTab === 'future' && React.createElement('div', { className: 'space-y-6', key: 'future' }, [
                        React.createElement('div', { className: 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8', key: 'vision' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-purple-800 mb-4', key: 'title' }, '🚀 오픈해시의 미래'),
                            React.createElement('p', { className: 'text-lg text-gray-700 leading-relaxed mb-6', key: 'intro' }, 
                                '오픈해시 기술은 의료를 시작으로 금융, 부동산, 공공 행정, 교육 등 모든 분야로 확산될 것입니다. 블록체인이 해결하지 못한 에너지와 속도 문제를 극복한 오픈해시는 차세대 디지털 인프라의 표준이 될 것입니다.'
                            ),
                            
                            React.createElement('div', { className: 'grid md:grid-cols-3 gap-4', key: 'timeline' },
                                [
                                    { year: '2025', title: '의료 도입', desc: '전국 병원 오픈해시 기반 PDV 시스템 구축' },
                                    { year: '2026', title: '금융 확장', desc: '은행 거래, 보험 청구 오픈해시 전환' },
                                    { year: '2027', title: '공공 행정', desc: '정부 민원, 부동산 등기 오픈해시 적용' },
                                    { year: '2028', title: '교육 인증', desc: '학력, 자격증 오픈해시 기반 검증' },
                                    { year: '2029', title: '글로벌 표준', desc: '국제 표준 채택, 국가 간 데이터 교환' },
                                    { year: '2030', title: '완전 전환', desc: '블록체인 대체, 오픈해시 시대 도래' }
                                ].map((phase, idx) =>
                                    React.createElement('div', {
                                        key: idx,
                                        className: 'bg-white border-2 border-purple-300 rounded-xl p-5 text-center'
                                    }, [
                                        React.createElement('div', { className: 'text-2xl font-bold text-purple-700 mb-2', key: 'year' }, phase.year),
                                        React.createElement('div', { className: 'font-bold text-gray-800 mb-2', key: 'title' }, phase.title),
                                        React.createElement('div', { className: 'text-xs text-gray-600', key: 'desc' }, phase.desc)
                                    ])
                                )
                            )
                        ]),

                        // 기대 효과
                        React.createElement('div', { className: 'grid md:grid-cols-2 gap-6', key: 'impact' },
                            [
                                {
                                    icon: '🌍',
                                    title: '환경 보호',
                                    desc: '전 세계 블록체인을 오픈해시로 대체 시 연간 140TWh 에너지 절감. 이산화탄소 배출 70% 감소'
                                },
                                {
                                    icon: '💰',
                                    title: '비용 절감',
                                    desc: '채굴 장비, 전기료, 수수료 불필요. 의료 기관 연간 IT 비용 60% 절감'
                                },
                                {
                                    icon: '⚡',
                                    title: '속도 혁신',
                                    desc: '응급 상황에서도 즉시 의료 기록 조회. 생명을 구하는 골든 타임 확보'
                                },
                                {
                                    icon: '🔒',
                                    title: '프라이버시 강화',
                                    desc: '환자가 자신의 데이터를 완전히 통제. 의료 정보 유출 사고 근절'
                                }
                            ].map((impact, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: 'bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition'
                                }, [
                                    React.createElement('div', { className: 'text-5xl mb-4 text-center', key: 'icon' }, impact.icon),
                                    React.createElement('h4', { className: 'text-xl font-bold text-gray-800 mb-3 text-center', key: 'title' }, impact.title),
                                    React.createElement('p', { className: 'text-sm text-gray-600 text-center', key: 'desc' }, impact.desc)
                                ])
                            )
                        )
                    ])
                ])
            ])
        ]);
    };
    
    console.log('✅ OpenHash Modal loaded');
})();
