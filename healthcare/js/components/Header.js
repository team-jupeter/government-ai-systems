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
            style: { background: 'linear-gradient(135deg, #0046FF 0%, #1E40AF 50%, #0066CC 100%)' }, className: ' py-16 px-4 relative overflow-hidden'
        },
            React.createElement('div', {
                className: 'absolute inset-0 opacity-10'
            },
                React.createElement('div', {
                    className: 'absolute top-10 left-10 text-8xl',
                    style: { opacity: 0.3, color: 'white' }
                }, '🏥'),
                React.createElement('div', {
                    className: 'absolute bottom-10 right-10 text-6xl',
                    style: { opacity: 0.3, color: 'white' }
                }, '🔗')
            ),
            React.createElement('div', {
                className: 'max-w-6xl mx-auto text-center relative z-10'
            },
                React.createElement('div', {
                    className: 'text-7xl mb-4 float'
                }, '🏥'),
                React.createElement('div', {
                    className: 'inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4',
                    style: { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }
                }, '🔐 OpenHash Technology'),
                React.createElement('h1', {
                    className: 'text-4xl md:text-5xl font-bold mb-4',
                    style: { color: 'white' }
                }, '오픈해시 기반 권역 의료 통합 시스템'),
                React.createElement('p', {
                    className: 'text-xl mb-6 max-w-3xl mx-auto',
                    style: { color: 'rgba(255,255,255,0.95)' }
                }, '프라이빗 데이터 금고(PDV) | AI 의사 시뮬레이션 | 블록체인 대비 98.5% 에너지 절감'),
                React.createElement('div', {
                    className: 'flex justify-center gap-3 flex-wrap mb-8'
                },
                    React.createElement('span', {
                        className: 'px-4 py-2 rounded-full text-sm font-medium',
                        style: { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }
                    }, '🔒 개인 건강정보 주권'),
                    React.createElement('span', {
                        className: 'px-4 py-2 rounded-full text-sm font-medium',
                        style: { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }
                    }, '🤖 Claude AI 연동'),
                    React.createElement('span', {
                        className: 'px-4 py-2 rounded-full text-sm font-medium',
                        style: { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' }
                    }, '📊 권역 의료 네트워크')
                ),
                React.createElement('button', {
                    onClick: () => onShowModal('시스템 소개', null),
                    className: 'px-8 py-3 rounded-lg font-bold transition-all',
                    style: { 
                        backgroundColor: 'white', 
                        color: '#0046FF',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    },
                    onMouseOver: (e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
                    },
                    onMouseOut: (e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }
                }, '📖 시스템 상세보기')
            )
        ),

        // 통계 카드
        React.createElement('div', {
            className: 'max-w-6xl mx-auto px-4 -mt-8 relative z-20'
        },
            React.createElement('div', {
                className: 'grid md:grid-cols-4 gap-4'
            },
                ...stats.map((stat, idx) =>
                    React.createElement('div', {
                        key: idx,
                        className: 'rounded-xl p-6 text-center card-hover shadow-lg',
                        style: { backgroundColor: 'white', border: '1px solid #e5e7eb' }
                    },
                        React.createElement('div', {
                            className: 'text-4xl mb-2'
                        }, stat.icon),
                        React.createElement('div', {
                            className: 'text-2xl font-bold mb-1',
                            style: { color: '#0046FF' }
                        }, stat.value),
                        React.createElement('div', {
                            className: 'text-sm',
                            style: { color: '#6b7280' }
                        }, stat.label)
                    )
                )
            )
        ),

        // 네비게이션
        React.createElement('div', {
            className: 'py-4 px-4 sticky top-0 z-50 shadow-sm',
            style: { backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }
        },
            React.createElement('div', {
                className: 'max-w-6xl mx-auto flex justify-between items-center'
            },
                React.createElement('a', {
                    href: '/',
                    className: 'font-medium',
                    style: { color: '#0046FF' },
                    onMouseOver: (e) => e.target.style.color = '#0039CC',
                    onMouseOut: (e) => e.target.style.color = '#0046FF'
                }, '← 포털로 돌아가기'),
                React.createElement('div', {
                    className: 'flex gap-4'
                },
                    ['오픈해시', 'PDV 금고', 'AI 상담', '시뮬레이터'].map((item, idx) =>
                        React.createElement('button', {
                            key: idx,
                            onClick: () => {
                                const targets = ['openhash', 'pdv', 'ai', 'simulator'];
                                document.getElementById(targets[idx])?.scrollIntoView({ behavior: 'smooth' });
                            },
                            className: 'text-sm font-medium',
                            style: { color: '#374151' },
                            onMouseOver: (e) => e.target.style.color = '#0046FF',
                            onMouseOut: (e) => e.target.style.color = '#374151'
                        }, item)
                    )
                )
            )
        )
    );
};
