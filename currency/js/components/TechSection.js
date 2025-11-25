// TechSection.js - 핵심 기술 아키텍처 섹션
const TechSection = ({ onOpenModal }) => {
    const techItems = [
        {
            id: 'fpga',
            icon: '⚡',
            title: 'FPGA 하드웨어 가속',
            summary: ['Xilinx Versal ACAP VCK190', '412.3MHz 동작 주파수', '899K 논리셀', '15.7W 저전력 설계'],
            gradient: 'from-yellow-500 to-orange-600',
            glow: 'hover:shadow-yellow-500/40'
        },
        {
            id: 'ai',
            icon: '🧠',
            title: 'AI 검증 엔진',
            summary: ['BERT 768차원 임베딩', 'CNN+LSTM 앙상블', '99.4% 검증 정확도', '96.8% 적대적 공격 방어'],
            gradient: 'from-purple-500 to-pink-600',
            glow: 'hover:shadow-purple-500/40'
        },
        {
            id: 'openhash',
            icon: '🔗',
            title: 'OpenHash 분산원장',
            summary: ['481 TPS 처리속도', '위변조 불가능', '재무제표 자동 연동', '크로스체인 상호운용'],
            gradient: 'from-emerald-500 to-teal-600',
            glow: 'hover:shadow-emerald-500/40'
        }
    ];

    return React.createElement('section', {
        className: 'py-16 px-6'
    },
        React.createElement('div', {
            className: 'max-w-7xl mx-auto'
        },
            // 섹션 제목
            React.createElement('div', {
                className: 'text-center mb-12'
            },
                React.createElement('h2', {
                    className: 'text-3xl font-bold text-white mb-4'
                }, '🏗️ 핵심 기술 아키텍처'),
                React.createElement('p', {
                    className: 'text-gray-400'
                }, '클릭하여 상세 기술 사양을 확인하세요')
            ),
            // 기술 버튼 그리드
            React.createElement('div', {
                className: 'grid md:grid-cols-3 gap-8'
            },
                techItems.map(item =>
                    React.createElement('button', {
                        key: item.id,
                        onClick: () => onOpenModal(item.id),
                        className: `tech-button glass-card rounded-2xl p-8 text-left group ${item.glow} hover:shadow-2xl`
                    },
                        // 아이콘
                        React.createElement('div', {
                            className: `w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`
                        },
                            React.createElement('span', { className: 'text-3xl' }, item.icon)
                        ),
                        // 제목
                        React.createElement('h3', {
                            className: 'text-xl font-bold text-white mb-4'
                        }, item.title),
                        // 요약 리스트
                        React.createElement('ul', {
                            className: 'space-y-2'
                        },
                            item.summary.map((text, idx) =>
                                React.createElement('li', {
                                    key: idx,
                                    className: 'text-gray-400 text-sm flex items-center gap-2'
                                },
                                    React.createElement('span', {
                                        className: `w-1.5 h-1.5 bg-gradient-to-r ${item.gradient} rounded-full`
                                    }),
                                    text
                                )
                            )
                        ),
                        // 더보기 표시
                        React.createElement('div', {
                            className: 'mt-6 flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:text-blue-300'
                        },
                            React.createElement('span', {}, '상세 보기'),
                            React.createElement('span', {
                                className: 'group-hover:translate-x-1 transition-transform'
                            }, '→')
                        )
                    )
                )
            )
        )
    );
};
