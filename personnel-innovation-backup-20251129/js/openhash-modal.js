(function() {
    window.OpenHashModal = function({ onClose }) {
        const [activeTab, setActiveTab] = React.useState('intro');

        return React.createElement('div', {
            className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
            onClick: onClose
        },
            React.createElement('div', {
                className: 'bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto',
                onClick: (e) => e.stopPropagation()
            }, [
                // 헤더
                React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-t-3xl', key: 'header' }, [
                    React.createElement('div', { className: 'flex items-center justify-between', key: 'header-content' }, [
                        React.createElement('div', { key: 'title' }, [
                            React.createElement('h2', { className: 'text-4xl font-black mb-2', key: 'h2' }, '🔗 오픈해시 기술'),
                            React.createElement('p', { className: 'text-xl opacity-90', key: 'subtitle' }, '인사혁신처 인사이력 관리의 핵심 기술')
                        ]),
                        React.createElement('button', {
                            onClick: onClose,
                            className: 'text-4xl hover:bg-white hover:bg-opacity-20 w-12 h-12 rounded-full transition-all',
                            key: 'close-btn'
                        }, '×')
                    ])
                ]),

                // 탭 메뉴
                React.createElement('div', { className: 'flex gap-2 p-6 bg-gray-50 overflow-x-auto', key: 'tabs' },
                    [
                        { id: 'intro', label: '📖 오픈해시란?' },
                        { id: 'hr-records', label: '👨‍💼 인사이력 관리' },
                        { id: 'ndr-integration', label: '🌐 국가데이터처 연동' },
                        { id: 'benefits', label: '💎 핵심 효과' }
                    ].map(tab =>
                        React.createElement('button', {
                            key: tab.id,
                            onClick: () => setActiveTab(tab.id),
                            className: `px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`
                        }, tab.label)
                    )
                ),

                // 컨텐츠
                React.createElement('div', { className: 'p-8', key: 'content' }, [
                    // 오픈해시란? 탭
                    activeTab === 'intro' && React.createElement('div', { className: 'space-y-6', key: 'intro' }, [
                        React.createElement('div', { className: 'bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-400 rounded-3xl p-10', key: 'main-intro' }, [
                            React.createElement('h3', { className: 'text-4xl font-black text-blue-900 mb-6', key: 'title' }, '🔗 오픈해시 = 공개 해시 체인'),
                            React.createElement('p', { className: 'text-xl text-gray-800 leading-relaxed mb-6', key: 'desc' }, '인사혁신처의 모든 인사 기록(임용, 배치, 교육, 평가, 승진, 보수, 전보, 퇴직)을 SHA-512 해시로 연결하여 위변조를 원천 차단하는 기술입니다.'),
                            React.createElement('div', { className: 'bg-white rounded-2xl p-6', key: 'analogy' }, [
                                React.createElement('div', { className: 'text-center text-2xl font-bold text-gray-800 mb-4', key: 'analogy-title' }, '🧱 인사기록의 DNA 체인'),
                                React.createElement('div', { className: 'text-gray-700 space-y-3', key: 'analogy-content' }, [
                                    React.createElement('div', { key: '1' }, '• 각 인사 행위는 하나의 블록으로 기록됩니다'),
                                    React.createElement('div', { key: '2' }, '• 모든 블록은 이전 블록의 해시를 포함합니다'),
                                    React.createElement('div', { key: '3' }, '• 한 블록이라도 수정되면 체인 전체가 무효화됩니다'),
                                    React.createElement('div', { className: 'font-bold text-blue-700 mt-3', key: '4' }, '→ 임용부터 퇴직까지 완벽한 이력 추적!')
                                ])
                            ])
                        ]),

                        React.createElement('div', { className: 'grid md:grid-cols-2 gap-6', key: 'comparison' }, [
                            React.createElement('div', { className: 'bg-red-50 border-3 border-red-400 rounded-2xl p-6', key: 'blockchain' }, [
                                React.createElement('h4', { className: 'text-2xl font-bold text-red-800 mb-4 text-center', key: 'title' }, '❌ 기존 블록체인'),
                                React.createElement('div', { className: 'space-y-3 text-gray-700', key: 'list' }, [
                                    React.createElement('div', { key: '1' }, '⚡ 높은 전력 소비 (PoW 합의)'),
                                    React.createElement('div', { key: '2' }, '🐌 느린 처리 속도 (10분~1시간)'),
                                    React.createElement('div', { key: '3' }, '💰 높은 운영 비용'),
                                    React.createElement('div', { key: '4' }, '🌍 환경 오염 문제'),
                                    React.createElement('div', { className: 'bg-red-200 p-3 rounded-lg font-bold text-red-900 mt-4', key: '5' }, '연간 850 MWh 전력 소비')
                                ])
                            ]),
                            React.createElement('div', { className: 'bg-green-50 border-3 border-green-400 rounded-2xl p-6', key: 'openhash' }, [
                                React.createElement('h4', { className: 'text-2xl font-bold text-green-800 mb-4 text-center', key: 'title' }, '✅ 오픈해시'),
                                React.createElement('div', { className: 'space-y-3 text-gray-700', key: 'list' }, [
                                    React.createElement('div', { key: '1' }, '⚡ 낮은 전력 소비 (LPBFT/PBFT)'),
                                    React.createElement('div', { key: '2' }, '🚀 빠른 처리 (0.3~15초)'),
                                    React.createElement('div', { key: '3' }, '💎 낮은 운영 비용'),
                                    React.createElement('div', { key: '4' }, '🌱 친환경 기술'),
                                    React.createElement('div', { className: 'bg-green-200 p-3 rounded-lg font-bold text-green-900 mt-4', key: '5' }, '연간 12.4 MWh (98.5% 절감!)')
                                ])
                            ])
                        ]),

                        React.createElement('div', { className: 'bg-purple-50 border-3 border-purple-400 rounded-2xl p-8', key: 'layers' }, [
                            React.createElement('h3', { className: 'text-3xl font-bold text-purple-900 mb-6 text-center', key: 'title' }, '📊 확률적 계층 선택 알고리즘'),
                            React.createElement('div', { className: 'space-y-4', key: 'content' }, [
                                React.createElement('div', { className: 'bg-red-100 border-2 border-red-400 rounded-xl p-5', key: 'layer3' }, [
                                    React.createElement('div', { className: 'font-bold text-xl text-red-800 mb-2', key: 'title' }, '🔴 Layer 3 (고위공무원)'),
                                    React.createElement('div', { className: 'text-gray-700', key: 'desc' }, '• 1급 이상 임명, 차관급 인사'),
                                    React.createElement('div', { className: 'text-gray-700', key: 'desc2' }, '• 10개 노드 중 7개 BLS 서명 필요'),
                                    React.createElement('div', { className: 'text-gray-700', key: 'desc3' }, '• 양자 내성 암호 (CRYSTALS-Dilithium)')
                                ]),
                                React.createElement('div', { className: 'bg-yellow-100 border-2 border-yellow-400 rounded-xl p-5', key: 'layer2' }, [
                                    React.createElement('div', { className: 'font-bold text-xl text-yellow-800 mb-2', key: 'title' }, '🟡 Layer 2 (중요 인사)'),
                                    React.createElement('div', { className: 'text-gray-700', key: 'desc' }, '• 5급 승진, 중요 부서 배치'),
                                    React.createElement('div', { className: 'text-gray-700', key: 'desc2' }, '• LPBFT 합의 (2f+1 노드)')
                                ]),
                                React.createElement('div', { className: 'bg-blue-100 border-2 border-blue-400 rounded-xl p-5', key: 'layer1' }, [
                                    React.createElement('div', { className: 'font-bold text-xl text-blue-800 mb-2', key: 'title' }, '🔵 Layer 1 (일반 인사)'),
                                    React.createElement('div', { className: 'text-gray-700', key: 'desc' }, '• 6급 이하 배치, 교육, 보수'),
                                    React.createElement('div', { className: 'text-gray-700', key: 'desc2' }, '• 경량 처리, 빠른 응답')
                                ])
                            ])
                        ])
                    ]),

                    // 인사이력 관리 탭
                    activeTab === 'hr-records' && React.createElement('div', { className: 'space-y-6', key: 'hr-records' }, [
                        React.createElement('div', { className: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-4 border-blue-400 rounded-3xl p-10', key: 'intro' }, [
                            React.createElement('h3', { className: 'text-4xl font-black text-blue-900 mb-6', key: 'title' }, '👨‍💼 인사이력 해시 체인'),
                            React.createElement('p', { className: 'text-xl text-gray-800 mb-6', key: 'desc' }, '공무원 한 사람의 전체 경력을 임용부터 퇴직까지 단일 해시 체인으로 연결합니다.')
                        ]),

                        React.createElement('div', { className: 'bg-white border-3 border-gray-300 rounded-2xl p-8', key: 'example' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-6 text-center', key: 'title' }, '📋 실제 인사기록 예시'),
                            React.createElement('div', { className: 'space-y-4', key: 'chain' }, [
                                { step: 1, type: '임용', date: '2015.03.02', content: '행정안전부 9급 임용', hash: 'a3f5e2...', icon: '📝' },
                                { step: 2, type: '배치', date: '2015.03.15', content: '총무과 배치', hash: 'b7c1d9...', icon: '🎯' },
                                { step: 3, type: '교육', date: '2015.06.20', content: '신규 공무원 교육 이수', hash: 'c2e8f3...', icon: '📚' },
                                { step: 4, type: '평가', date: '2015.12.31', content: '성과평가 82점', hash: 'd9a4b1...', icon: '⭐' },
                                { step: 5, type: '승진', date: '2018.03.01', content: '8급 승진', hash: 'e1f7c2...', icon: '⬆️' },
                                { step: 6, type: '전보', date: '2020.01.15', content: '기획재정부 전보', hash: 'f8d3a5...', icon: '🔄' },
                                { step: 7, type: '승진', date: '2022.03.01', content: '7급 승진', hash: 'g4b9e1...', icon: '⬆️' }
                            ].map((record) =>
                                React.createElement('div', {
                                    key: record.step,
                                    className: 'flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-5'
                                }, [
                                    React.createElement('div', { className: 'text-4xl', key: 'icon' }, record.icon),
                                    React.createElement('div', { className: 'flex-1', key: 'content' }, [
                                        React.createElement('div', { className: 'flex items-center gap-3 mb-1', key: 'header' }, [
                                            React.createElement('span', { className: 'bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold', key: 'step' }, `#${record.step}`),
                                            React.createElement('span', { className: 'font-bold text-gray-800', key: 'type' }, record.type),
                                            React.createElement('span', { className: 'text-gray-500 text-sm', key: 'date' }, record.date)
                                        ]),
                                        React.createElement('div', { className: 'text-gray-700', key: 'content-text' }, record.content),
                                        React.createElement('div', { className: 'text-xs text-blue-600 font-mono mt-1', key: 'hash' }, `🔗 Hash: ${record.hash}`)
                                    ]),
                                    record.step < 7 && React.createElement('div', { className: 'text-2xl text-blue-500', key: 'arrow' }, '↓')
                                ])
                            ))
                        ]),

                        React.createElement('div', { className: 'bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-400 rounded-2xl p-8', key: 'truth-convergence' }, [
                            React.createElement('h3', { className: 'text-3xl font-bold text-green-900 mb-6 text-center', key: 'title' }, '✅ 진실 수렴 (Truth Convergence)'),
                            React.createElement('p', { className: 'text-gray-700 text-center mb-6', key: 'desc' }, '국가데이터처 연동으로 학력·경력 위조를 즉시 적발합니다'),
                            React.createElement('div', { className: 'grid md:grid-cols-3 gap-4', key: 'checks' }, [
                                { icon: '🎓', title: '학력 검증', source: '교육부', desc: '학력 위조 즉시 적발' },
                                { icon: '💼', title: '경력 검증', source: '이전 소속 기관', desc: '경력 위조 즉시 적발' },
                                { icon: '📜', title: '자격증 검증', source: '발급 기관', desc: '자격증 위조 즉시 적발' }
                            ].map((check, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: 'bg-white rounded-xl p-6 text-center'
                                }, [
                                    React.createElement('div', { className: 'text-5xl mb-3', key: 'icon' }, check.icon),
                                    React.createElement('div', { className: 'font-bold text-gray-800 mb-2', key: 'title' }, check.title),
                                    React.createElement('div', { className: 'text-sm text-gray-600 mb-2', key: 'source' }, `연동: ${check.source}`),
                                    React.createElement('div', { className: 'text-xs text-green-700 font-bold', key: 'desc' }, check.desc)
                                ])
                            ))
                        ])
                    ]),

                    // 국가데이터처 연동 탭
                    activeTab === 'ndr-integration' && React.createElement('div', { className: 'space-y-6', key: 'ndr' }, [
                        React.createElement('div', { className: 'bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-400 rounded-3xl p-10', key: 'intro' }, [
                            React.createElement('h3', { className: 'text-4xl font-black text-purple-900 mb-6', key: 'title' }, '🌐 국가데이터처 Layer 1 노드'),
                            React.createElement('p', { className: 'text-xl text-gray-800 mb-4', key: 'desc' }, '인사혁신처는 국가데이터처 Layer 1 노드(DID: did:ndr:mpm:001)로 등록되어 있습니다.'),
                            React.createElement('div', { className: 'bg-white rounded-2xl p-6', key: 'info' }, [
                                React.createElement('div', { className: 'font-bold text-gray-800 mb-3', key: 'title' }, '🔗 실시간 연동 부처'),
                                React.createElement('div', { className: 'grid md:grid-cols-2 gap-3', key: 'list' }, [
                                    '병무청 (군복무 이력)',
                                    '교육부 (학력 인증)',
                                    '법무부 (결격사유)',
                                    '행정안전부 (지자체 인사)',
                                    '공무원연금공단 (연금)',
                                    '국세청 (세금 납부)'
                                ].map((item, idx) =>
                                    React.createElement('div', {
                                        key: idx,
                                        className: 'bg-purple-50 px-4 py-2 rounded-lg text-gray-700'
                                    }, `✓ ${item}`)
                                ))
                            ])
                        ]),

                        React.createElement('div', { className: 'bg-white border-3 border-gray-300 rounded-2xl p-8', key: 'api' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-6', key: 'title' }, '⚡ Open API 자동 연계'),
                            React.createElement('div', { className: 'bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto', key: 'code' }, [
                                React.createElement('div', { key: '1' }, 'POST https://api.ndr.go.kr/api/v1/data/request'),
                                React.createElement('div', { className: 'mt-2', key: '2' }, '{'),
                                React.createElement('div', { className: 'ml-4', key: '3' }, '  "requester": "did:ndr:mpm:001",'),
                                React.createElement('div', { className: 'ml-4', key: '4' }, '  "target": "병무청",'),
                                React.createElement('div', { className: 'ml-4', key: '5' }, '  "data_type": "군복무이력",'),
                                React.createElement('div', { className: 'ml-4', key: '6' }, '  "citizen_id": "encrypted_id"'),
                                React.createElement('div', { key: '7' }, '}'),
                                React.createElement('div', { className: 'mt-4 text-yellow-400', key: '8' }, '// 응답 시간: 0.3초'),
                                React.createElement('div', { className: 'text-yellow-400', key: '9' }, '// 법률 검증: PIPA 자동 준수 (Llama 3.1 AI)')
                            ])
                        ]),

                        React.createElement('div', { className: 'grid md:grid-cols-2 gap-6', key: 'comparison' }, [
                            React.createElement('div', { className: 'bg-red-50 border-3 border-red-400 rounded-xl p-6', key: 'before' }, [
                                React.createElement('h4', { className: 'text-xl font-bold text-red-800 mb-4', key: 'title' }, '❌ 국가데이터처 이전'),
                                React.createElement('div', { className: 'space-y-3 text-gray-700', key: 'list' }, [
                                    React.createElement('div', { key: '1' }, '📄 부처별 개별 협약 체결'),
                                    React.createElement('div', { key: '2' }, '⏰ 협약 체결: 15개월 소요'),
                                    React.createElement('div', { key: '3' }, '💰 시스템 구축: 450억원'),
                                    React.createElement('div', { key: '4' }, '🔧 유지보수: 연 50억원'),
                                    React.createElement('div', { className: 'bg-red-200 p-3 rounded-lg font-bold text-red-900 mt-3', key: '5' }, '총 5년 TCO: 2,250억원')
                                ])
                            ]),
                            React.createElement('div', { className: 'bg-green-50 border-3 border-green-400 rounded-xl p-6', key: 'after' }, [
                                React.createElement('h4', { className: 'text-xl font-bold text-green-800 mb-4', key: 'title' }, '✅ 국가데이터처 연동'),
                                React.createElement('div', { className: 'space-y-3 text-gray-700', key: 'list' }, [
                                    React.createElement('div', { key: '1' }, '🚀 Open API 즉시 연결'),
                                    React.createElement('div', { key: '2' }, '⚡ 연계 시간: 15초'),
                                    React.createElement('div', { key: '3' }, '💎 구축 비용: 0원'),
                                    React.createElement('div', { key: '4' }, '🎉 유지보수: 0원'),
                                    React.createElement('div', { className: 'bg-green-200 p-3 rounded-lg font-bold text-green-900 mt-3', key: '5' }, '총 5년 TCO: 0원 (100% 절감!)')
                                ])
                            ])
                        ])
                    ]),

                    // 핵심 효과 탭
                    activeTab === 'benefits' && React.createElement('div', { className: 'space-y-6', key: 'benefits' }, [
                        React.createElement('div', { className: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400 rounded-3xl p-10', key: 'intro' }, [
                            React.createElement('h3', { className: 'text-4xl font-black text-orange-900 mb-6', key: 'title' }, '💎 인사혁신처 핵심 효과'),
                            React.createElement('p', { className: 'text-xl text-gray-800', key: 'desc' }, '오픈해시 + 국가데이터처 + AI 에이전트의 시너지')
                        ]),

                        React.createElement('div', { className: 'grid md:grid-cols-3 gap-6', key: 'stats' }, [
                            { icon: '⚡', title: '처리시간 단축', value: '70%', desc: '채용 6주 → 15초', color: 'blue' },
                            { icon: '🎯', title: '일관성 향상', value: '95%', desc: '법률 자동 적용', color: 'green' },
                            { icon: '💰', title: 'TCO 절감', value: '65.2%', desc: '5년 1,850억원 절감', color: 'purple' }
                        ].map((stat, idx) =>
                            React.createElement('div', {
                                key: idx,
                                className: `bg-${stat.color}-50 border-3 border-${stat.color}-400 rounded-2xl p-8 text-center stat-card`
                            }, [
                                React.createElement('div', { className: 'text-6xl mb-4', key: 'icon' }, stat.icon),
                                React.createElement('div', { className: `text-5xl font-black text-${stat.color}-700 mb-3`, key: 'value' }, stat.value),
                                React.createElement('div', { className: 'text-xl font-bold text-gray-800 mb-2', key: 'title' }, stat.title),
                                React.createElement('div', { className: 'text-gray-600', key: 'desc' }, stat.desc)
                            ])
                        )),

                        React.createElement('div', { className: 'bg-white border-3 border-gray-300 rounded-2xl p-8', key: 'details' }, [
                            React.createElement('h3', { className: 'text-2xl font-bold text-gray-800 mb-6', key: 'title' }, '📊 상세 효과'),
                            React.createElement('div', { className: 'space-y-4', key: 'list' }, [
                                { category: '데이터 연계', items: ['15개월 → 15초 (99.9997% 단축)', '450억원 → 0원 (100% 절감)'] },
                                { category: '인사 업무', items: ['채용: 6주 → 15초', '평가: 2주 → 3.2초', '보수: 3일 → 즉시', '연금: 2주 → 15초'] },
                                { category: '에너지 효율', items: ['전력: 850 MWh → 12.4 MWh (98.5% 절감)', '탄소: 420톤 → 6.1톤 CO2e'] },
                                { category: '공정성', items: ['편향 실시간 탐지 (±3%)', 'Adversarial Debiasing 자동 재학습', '월간 공정성 리포트 공개'] },
                                { category: '보안', items: ['양자 내성 암호 (CRYSTALS-Dilithium)', '계층별 이중 서명 (BLS 다중 서명)', 'XAI 판단 근거 설명 (SHAP)'] }
                            ].map((section, idx) =>
                                React.createElement('div', {
                                    key: idx,
                                    className: 'bg-gray-50 rounded-xl p-6'
                                }, [
                                    React.createElement('h4', { className: 'font-bold text-lg text-gray-800 mb-3', key: 'category' }, `🔹 ${section.category}`),
                                    React.createElement('div', { className: 'space-y-2', key: 'items' },
                                        section.items.map((item, itemIdx) =>
                                            React.createElement('div', {
                                                key: itemIdx,
                                                className: 'text-gray-700 ml-4'
                                            }, `• ${item}`)
                                        )
                                    )
                                ])
                            ))
                        ]),

                        React.createElement('div', { className: 'bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-400 rounded-2xl p-8 text-center', key: 'cta' }, [
                            React.createElement('h3', { className: 'text-3xl font-black text-green-900 mb-4', key: 'title' }, '🚀 110만 공무원 인사 혁신!'),
                            React.createElement('p', { className: 'text-xl text-gray-700 mb-6', key: 'desc' }, '국가데이터처 연동 오픈해시로 대한민국 인사 관리의 미래를 열어갑니다'),
                            React.createElement('button', {
                                onClick: onClose,
                                className: 'bg-gradient-to-r from-green-600 to-blue-600 text-white text-2xl font-bold px-12 py-6 rounded-2xl hover:scale-105 transition-all shadow-2xl',
                                key: 'btn'
                            }, 'AI 인사상담 시작하기 →')
                        ])
                    ])
                ])
            ])
        );
    };

    console.log('✅ OpenHash Modal loaded for 인사혁신처');
})();
