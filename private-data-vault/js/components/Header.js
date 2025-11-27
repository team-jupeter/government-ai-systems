const Header = ({ onShowModal }) => {
    const stats = [
        { icon: '🔐', value: '100%', label: '개인정보 주권' },
        { icon: '⚡', value: '25,907/s', label: '처리 속도' },
        { icon: '🌱', value: '98.5%', label: '에너지 절감' },
        { icon: '📊', value: '32 bytes', label: '클라우드 저장' }
    ];

    return React.createElement('div', null,
        // 히어로 섹션
        React.createElement('header', { className: 'gradient-pdv text-white py-16 px-4 relative overflow-hidden' },
            // 배경 장식
            React.createElement('div', { className: 'absolute inset-0 opacity-10' },
                React.createElement('div', { className: 'absolute top-10 left-10 w-32 h-32 border border-white rounded-full' }),
                React.createElement('div', { className: 'absolute top-20 right-20 w-24 h-24 border border-white rounded-full' }),
                React.createElement('div', { className: 'absolute bottom-10 left-1/4 w-40 h-40 border border-white rounded-full' })
            ),
            React.createElement('div', { className: 'max-w-6xl mx-auto text-center relative z-10' },
                // 방패 아이콘
                React.createElement('div', { className: 'mb-6' },
                    React.createElement('div', { className: 'inline-block p-6 bg-white/10 rounded-full shield-pulse' },
                        React.createElement('i', { className: 'fas fa-shield-alt text-6xl text-blue-300' })
                    )
                ),
                React.createElement('div', { className: 'inline-block px-4 py-1 bg-blue-500/30 rounded-full text-sm mb-4' },
                    '🔗 OpenHash 기반 개인정보 보호 시스템'
                ),
                React.createElement('h1', { className: 'text-4xl md:text-5xl font-bold mb-4' },
                    '프라이빗 데이터 금고'
                ),
                React.createElement('p', { className: 'text-lg md:text-xl opacity-90 mb-2' },
                    'Private Data Vault (PDV) System'
                ),
                React.createElement('p', { className: 'text-md opacity-80 mb-8 max-w-3xl mx-auto' },
                    '원본 데이터는 내 단말기에만, 해시값만 클라우드에 | 완전한 개인정보 주권 실현'
                ),
                // 통계
                React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto' },
                    stats.map((stat, i) =>
                        React.createElement('div', { 
                            key: i, 
                            className: 'bg-white/10 rounded-xl p-4 card-hover cursor-pointer',
                            onClick: () => onShowModal('시스템 성능', React.createElement('div', null,
                                React.createElement('p', { className: 'text-gray-300 mb-4' }, 
                                    'AWS 실증 실험 결과 (2025년 11월 18일, Ubuntu 24.04)'
                                ),
                                React.createElement('ul', { className: 'space-y-2 text-gray-300' },
                                    React.createElement('li', null, '• 처리 속도: 25,907 records/sec'),
                                    React.createElement('li', null, '• 블록체인 대비: 1,727~3,701배 빠름'),
                                    React.createElement('li', null, '• 에너지 효율: 98.5% 절감'),
                                    React.createElement('li', null, '• 계층 선택 정확도: 98.9%'),
                                    React.createElement('li', null, '• 클라우드 저장: 레코드당 32 bytes만')
                                )
                            ))
                        },
                            React.createElement('div', { className: 'text-2xl mb-1' }, stat.icon),
                            React.createElement('div', { className: 'text-2xl font-bold' }, stat.value),
                            React.createElement('div', { className: 'text-sm opacity-80' }, stat.label)
                        )
                    )
                )
            )
        ),
        // 네비게이션 바
        React.createElement('div', { className: 'bg-gray-800 py-3 sticky top-0 z-40 border-b border-gray-700' },
            React.createElement('div', { className: 'max-w-6xl mx-auto px-4 flex justify-between items-center' },
                React.createElement('a', { 
                    href: '/', 
                    className: 'text-blue-400 hover:text-blue-300 flex items-center gap-2' 
                },
                    React.createElement('i', { className: 'fas fa-arrow-left' }),
                    '포털로 돌아가기'
                ),
                React.createElement('div', { className: 'flex items-center gap-4' },
                    React.createElement('span', { className: 'text-gray-400 text-sm hidden md:block' },
                        'OpenHash PDV v1.0'
                    ),
                    React.createElement('div', { className: 'flex items-center gap-2' },
                        React.createElement('span', { className: 'w-2 h-2 bg-green-500 rounded-full animate-pulse' }),
                        React.createElement('span', { className: 'text-green-400 text-sm' }, 'Online')
                    )
                )
            )
        )
    );
};
