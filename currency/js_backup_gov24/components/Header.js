const Header = ({ onShowModal }) => {
    const stats = [
        { icon: '⚡', value: '0.015ms', label: '처리 속도' },
        { icon: '🎯', value: '99.4%', label: 'AI 정확도' },
        { icon: '🌱', value: '88.6%', label: '전력 절감' },
        { icon: '🔗', value: '100K TPS', label: '처리량' }
    ];

    return React.createElement('div', null,
        React.createElement('header', { className: 'gradient-currency text-white py-16 px-4 relative overflow-hidden' },
            React.createElement('div', { className: 'absolute inset-0 opacity-10' },
                React.createElement('div', { className: 'absolute top-10 left-10 w-32 h-32 border border-yellow-500 rounded-full' }),
                React.createElement('div', { className: 'absolute bottom-10 right-20 w-24 h-24 border border-yellow-500 rounded-full' })
            ),
            React.createElement('div', { className: 'max-w-6xl mx-auto text-center relative z-10' },
                React.createElement('div', { className: 'mb-6' },
                    React.createElement('div', { className: 'inline-block p-6 bg-yellow-500/20 rounded-full pulse-gold' },
                        React.createElement('i', { className: 'fas fa-coins text-6xl text-yellow-400' })
                    )
                ),
                React.createElement('div', { className: 'inline-block px-4 py-1 bg-yellow-500/30 rounded-full text-sm mb-4' },
                    '🔗 OpenHash + FPGA + AI 통합 시스템'
                ),
                React.createElement('h1', { className: 'text-4xl md:text-5xl font-bold mb-4' },
                    'FPGA 및 AI 기반 통합 디지털 화폐'
                ),
                React.createElement('p', { className: 'text-lg opacity-90 mb-2' },
                    'Ultra-High Speed Integrated Digital Currency System'
                ),
                React.createElement('p', { className: 'text-md opacity-80 mb-8 max-w-3xl mx-auto' },
                    '0.015ms 초고속 처리 | 99.4% AI 검증 | 실시간 재무제표 | 자동 세무처리 | 크로스체인'
                ),
                React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto' },
                    stats.map((stat, i) =>
                        React.createElement('div', { 
                            key: i, 
                            className: 'bg-white/10 rounded-xl p-4 card-hover cursor-pointer'
                        },
                            React.createElement('div', { className: 'text-2xl mb-1' }, stat.icon),
                            React.createElement('div', { className: 'text-2xl font-bold text-yellow-400' }, stat.value),
                            React.createElement('div', { className: 'text-sm opacity-80' }, stat.label)
                        )
                    )
                )
            )
        ),
        React.createElement('div', { className: 'bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700' },
            React.createElement('div', { className: 'max-w-6xl mx-auto px-4 flex justify-between items-center' },
                React.createElement('a', { href: '/', className: 'text-yellow-400 hover:text-yellow-300 flex items-center gap-2' },
                    React.createElement('i', { className: 'fas fa-arrow-left' }),
                    '포털로 돌아가기'
                ),
                React.createElement('div', { className: 'flex items-center gap-2' },
                    React.createElement('span', { className: 'w-2 h-2 bg-green-500 rounded-full animate-pulse' }),
                    React.createElement('span', { className: 'text-green-400 text-sm' }, 'System Online')
                )
            )
        )
    );
};
