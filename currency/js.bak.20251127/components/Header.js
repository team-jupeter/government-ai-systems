// Header.js - 헤더 컴포넌트 (오픈해시 링크 포함)
const Header = () => {
    return React.createElement('header', {
        className: 'glass-card border-b border-slate-700/50'
    },
        React.createElement('div', {
            className: 'max-w-7xl mx-auto px-6 py-4'
        },
            React.createElement('div', {
                className: 'flex items-center justify-between'
            },
                // 좌측: 로고 및 제목
                React.createElement('div', {
                    className: 'flex items-center gap-4'
                },
                    React.createElement('a', {
                        href: '/',
                        className: 'flex items-center gap-3 hover:opacity-80 transition-opacity'
                    },
                        React.createElement('div', {
                            className: 'w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'
                        },
                            React.createElement('span', { className: 'text-2xl' }, '💰')
                        ),
                        React.createElement('div', {},
                            React.createElement('h1', {
                                className: 'text-xl font-bold text-white'
                            }, '통합 디지털 화폐 시스템'),
                            React.createElement('p', {
                                className: 'text-xs text-blue-300'
                            }, 'FPGA & AI 기반 자율 금융 서비스')
                        )
                    )
                ),
                // 우측: 네비게이션 및 오픈해시 링크
                React.createElement('nav', {
                    className: 'flex items-center gap-6'
                },
                    React.createElement('a', {
                        href: '/',
                        className: 'text-gray-300 hover:text-white transition-colors text-sm'
                    }, '🏠 포털'),
                    React.createElement('a', {
                        href: '/openhash/',
                        className: 'flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white font-medium hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg hover:shadow-emerald-500/30'
                    },
                        React.createElement('svg', {
                            className: 'w-5 h-5',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        },
                            React.createElement('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: 2,
                                d: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                            })
                        ),
                        React.createElement('span', {}, '오픈해시'),
                        React.createElement('svg', {
                            className: 'w-4 h-4',
                            fill: 'none',
                            stroke: 'currentColor',
                            viewBox: '0 0 24 24'
                        },
                            React.createElement('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: 2,
                                d: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                            })
                        )
                    )
                )
            )
        )
    );
};
