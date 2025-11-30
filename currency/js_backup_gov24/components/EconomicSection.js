// EconomicSection.js - 경제적 효과 섹션
const EconomicSection = ({ onOpenModal }) => {
    const economicItems = [
        {
            id: 'personal',
            value: '492만원',
            label: '개인 연간 혜택',
            icon: '👤',
            gradient: 'from-blue-500 to-cyan-500',
            glow: 'hover:shadow-blue-500/40'
        },
        {
            id: 'finance',
            value: '65%',
            label: '금융기관 운영비 절감',
            icon: '🏦',
            gradient: 'from-emerald-500 to-green-500',
            glow: 'hover:shadow-emerald-500/40'
        },
        {
            id: 'underground',
            value: '87.9%',
            label: '지하경제 축소',
            icon: '📉',
            gradient: 'from-purple-500 to-violet-500',
            glow: 'hover:shadow-purple-500/40'
        },
        {
            id: 'tax',
            value: '40조원',
            label: '연간 추가 세수',
            icon: '💰',
            gradient: 'from-amber-500 to-orange-500',
            glow: 'hover:shadow-amber-500/40'
        }
    ];

    return React.createElement('section', {
        className: 'py-16 px-6 bg-slate-800/30'
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
                }, '📊 경제적 효과'),
                React.createElement('p', {
                    className: 'text-gray-400'
                }, '클릭하여 상세 분석을 확인하세요')
            ),
            // 경제 효과 버튼 그리드
            React.createElement('div', {
                className: 'grid grid-cols-2 lg:grid-cols-4 gap-6'
            },
                economicItems.map(item =>
                    React.createElement('button', {
                        key: item.id,
                        onClick: () => onOpenModal(item.id),
                        className: `economic-button glass-card rounded-2xl p-6 text-center group ${item.glow} hover:shadow-xl`
                    },
                        // 아이콘
                        React.createElement('div', {
                            className: `w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`
                        },
                            React.createElement('span', { className: 'text-2xl' }, item.icon)
                        ),
                        // 수치
                        React.createElement('div', {
                            className: `text-3xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`
                        }, item.value),
                        // 라벨
                        React.createElement('div', {
                            className: 'text-gray-400 text-sm'
                        }, item.label),
                        // 더보기 표시
                        React.createElement('div', {
                            className: 'mt-4 text-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity'
                        }, '상세 보기 →')
                    )
                )
            )
        )
    );
};
