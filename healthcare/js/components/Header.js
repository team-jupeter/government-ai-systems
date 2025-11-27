const Header = ({ onShowModal }) => {
    const stats = [
        { icon: '⚡', value: '98.5%', label: '에너지 절감' },
        { icon: '🚀', value: '50,000', label: 'TPS 처리성능' },
        { icon: '🔐', value: '10⁻¹⁷⁵ᴹ', label: '보안수준' },
        { icon: '💰', value: '₩490', label: '월/인 비용' }
    ];

    return React.createElement('div', null,
        // 메인 헤더
        React.createElement('div', {
            className: 'gradient-health py-16 px-4 relative overflow-hidden'
        },
            React.createElement('div', {
                className: 'absolute inset-0 opacity-10'
            },
                React.createElement('div', {
                    className: 'absolute top-10 left-10 text-8xl',
                    style: { opacity: 0.3 }
                }, '🏥'),
                React.createElement('div', {
                    className: 'absolute bottom-10 right-10 text-6xl',
                    style: { opacity: 0.3 }
                }, '🔗')
            ),
            React.createElement('div', {
                className: 'max-w-6xl mx-auto text-center relative z-10'
            },
                React.createElement('div', {
                    className: 'text-7xl mb-4 float'
                }, '🏥'),
                React.createElement('div', {
                    className: 'inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4'
                }, '🔐 OpenHash Technology'),
                React.createElement('h1', {
                    className: 'text-4xl md:text-5xl font-bold mb-4'
                }, '오픈해시 기반 권역 의료 통합 시스템'),
                React.createElement('p', {
                    className: 'text-xl opacity-90 mb-6 max-w-3xl mx-auto'
                }, '프라이빗 데이터 금고(PDV) | AI 의사 시뮬레이션 | 블록체인 대비 98.5% 에너지 절감'),
                React.createElement('div', {
                    className: 'flex justify-center gap-3 flex-wrap mb-8'
                },
                    React.createElement('span', {
                        className: 'bg-white/20 px-4 py-2 rounded-full text-sm'
                    }, '🔒 개인 건강정보 주권'),
                    React.createElement('span', {
                        className: 'bg-white/20 px-4 py-2 rounded-full text-sm'
                    }, '🤖 Claude AI 연동'),
                    React.createElement('span', {
                        className: 'bg-white/20 px-4 py-2 rounded-full text-sm'
                    }, '🏛️ 권역 의료 네트워크')
                ),
                React.createElement('div', {
                    className: 'grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto'
                },
                    stats.map((stat, i) => 
                        React.createElement('div', {
                            key: i,
                            className: 'bg-white/10 rounded-xl p-4 backdrop-blur-sm'
                        },
                            React.createElement('div', {
                                className: 'text-2xl mb-1'
                            }, stat.icon),
                            React.createElement('div', {
                                className: 'text-2xl font-bold'
                            }, stat.value),
                            React.createElement('div', {
                                className: 'text-sm opacity-80'
                            }, stat.label)
                        )
                    )
                )
            )
        ),
        // 네비게이션
        React.createElement('div', {
            className: 'bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700'
        },
            React.createElement('div', {
                className: 'max-w-6xl mx-auto px-4 flex justify-between items-center'
            },
                React.createElement('a', {
                    href: '/',
                    className: 'text-teal-400 hover:text-teal-300 flex items-center gap-2'
                }, '← 포털로 돌아가기'),
                React.createElement('div', {
                    className: 'flex gap-4'
                },
                    ['오픈해시', 'PDV', 'AI상담', '시뮬레이터'].map((item, i) =>
                        React.createElement('button', {
                            key: i,
                            onClick: () => document.getElementById(['openhash', 'pdv', 'ai', 'simulator'][i])?.scrollIntoView({ behavior: 'smooth' }),
                            className: 'text-sm hover:text-teal-400 transition-colors'
                        }, item)
                    )
                )
            )
        )
    );
};
