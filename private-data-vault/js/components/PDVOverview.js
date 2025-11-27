const PDVOverview = ({ onShowModal }) => {
    const features = [
        {
            icon: 'fa-user-shield',
            title: '개인정보 주권',
            desc: '모든 원본 데이터는 오직 사용자 단말기에만 AES-256 암호화 저장',
            color: 'blue'
        },
        {
            icon: 'fa-hashtag',
            title: '해시 전용 저장',
            desc: '클라우드에는 SHA-256 해시값(32바이트)만 기록, 원본 복구 불가',
            color: 'purple'
        },
        {
            icon: 'fa-file-invoice-dollar',
            title: '확장 재무제표',
            desc: '6하 원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)에 따른 통합 기록',
            color: 'green'
        },
        {
            icon: 'fa-check-double',
            title: '교차 검증',
            desc: '거래 당사자 간 자동 검증으로 허위 데이터 즉시 탐지',
            color: 'yellow'
        },
        {
            icon: 'fa-certificate',
            title: '활동 증명',
            desc: '해시 체인 기반 법적 증명서 발급, 위조 불가능',
            color: 'red'
        },
        {
            icon: 'fa-layer-group',
            title: '4계층 분산',
            desc: 'Edge Device → Edge Server → Core Engine → Cloud Archive',
            color: 'cyan'
        }
    ];

    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        green: 'bg-green-500/20 text-green-400 border-green-500/30',
        yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        red: 'bg-red-500/20 text-red-400 border-red-500/30',
        cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };

    const showArchitecture = () => {
        onShowModal('PDV 시스템 아키텍처', React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'bg-gray-700/50 rounded-lg p-4' },
                React.createElement('h4', { className: 'text-blue-400 font-bold mb-3' }, '📱 사용자 단말기 (110)'),
                React.createElement('ul', { className: 'text-gray-300 text-sm space-y-1' },
                    React.createElement('li', null, '• 로컬 저장 모듈 (112): 확장 재무제표 형식 저장'),
                    React.createElement('li', null, '• 보안 저장소 (114): AES-256 암호화 데이터'),
                    React.createElement('li', null, '• 키 관리부 (115): PBKDF2HMAC 기반 Master Key'),
                    React.createElement('li', null, '• 재해 복구부 (116): Shamir 비밀 분산')
                )
            ),
            React.createElement('div', { className: 'bg-gray-700/50 rounded-lg p-4' },
                React.createElement('h4', { className: 'text-purple-400 font-bold mb-3' }, '🔗 해시 처리 모듈 (120)'),
                React.createElement('ul', { className: 'text-gray-300 text-sm space-y-1' },
                    React.createElement('li', null, '• 해시 기록 모듈 (121): SHA-256 해시 생성 및 기록'),
                    React.createElement('li', null, '• 교차 검증 모듈 (122): 당사자 간 해시 비교')
                )
            ),
            React.createElement('div', { className: 'bg-gray-700/50 rounded-lg p-4' },
                React.createElement('h4', { className: 'text-green-400 font-bold mb-3' }, '🌐 오픈해시 시스템 (130)'),
                React.createElement('ul', { className: 'text-gray-300 text-sm space-y-1' },
                    React.createElement('li', null, '• Layer 1 (131): Edge Device - 70%'),
                    React.createElement('li', null, '• Layer 2 (132): Edge Server - 20%'),
                    React.createElement('li', null, '• Layer 3 (133): Core Engine - 9%'),
                    React.createElement('li', null, '• Layer 4 (134): Cloud Archive - 1%')
                )
            ),
            React.createElement('div', { className: 'bg-gray-700/50 rounded-lg p-4' },
                React.createElement('h4', { className: 'text-yellow-400 font-bold mb-3' }, '🔌 외부 연동 모듈 (140)'),
                React.createElement('ul', { className: 'text-gray-300 text-sm space-y-1' },
                    React.createElement('li', null, '• 당국 통보 모듈 (141): 해시 기반 요약 정보 전송'),
                    React.createElement('li', null, '• 활동 증명 모듈 (142): 법적 증명서 발급')
                )
            )
        ));
    };

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-900' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' }, 'PDV 시스템 핵심 기능'),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    '프라이버시와 투명성의 혁신적 조화 - 개인정보는 완벽히 보호하면서 법적 증명력 확보'
                )
            ),
            React.createElement('div', { className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8' },
                features.map((feature, i) =>
                    React.createElement('div', {
                        key: i,
                        className: `gradient-card rounded-xl p-6 border ${colorClasses[feature.color]} card-hover cursor-pointer`
                    },
                        React.createElement('div', { className: `w-12 h-12 rounded-lg ${colorClasses[feature.color]} flex items-center justify-center mb-4` },
                            React.createElement('i', { className: `fas ${feature.icon} text-xl` })
                        ),
                        React.createElement('h3', { className: 'text-lg font-bold mb-2' }, feature.title),
                        React.createElement('p', { className: 'text-gray-400 text-sm' }, feature.desc)
                    )
                )
            ),
            React.createElement('div', { className: 'text-center' },
                React.createElement('button', {
                    onClick: showArchitecture,
                    className: 'px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors'
                },
                    React.createElement('i', { className: 'fas fa-sitemap mr-2' }),
                    '전체 아키텍처 보기'
                )
            )
        )
    );
};
