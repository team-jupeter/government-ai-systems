function LoginSystem({ onLogin }) {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [countryCode, setCountryCode] = React.useState('+82');
    const [biometricStep, setBiometricStep] = React.useState(0);
    const [showBiometric, setShowBiometric] = React.useState(false);

    const countryCodes = [
        { code: '+82', name: '대한민국 (KR)', flag: '🇰🇷' },
        { code: '+1', name: '미국 (US)', flag: '🇺🇸' },
        { code: '+81', name: '일본 (JP)', flag: '🇯🇵' },
        { code: '+86', name: '중국 (CN)', flag: '🇨🇳' },
        { code: '+44', name: '영국 (UK)', flag: '🇬🇧' },
        { code: '+33', name: '프랑스 (FR)', flag: '🇫🇷' },
        { code: '+49', name: '독일 (DE)', flag: '🇩🇪' }
    ];

    const handleBiometricScan = () => {
        setShowBiometric(true);
        setBiometricStep(1);
        
        setTimeout(() => setBiometricStep(2), 500);
        setTimeout(() => setBiometricStep(3), 1000);
        setTimeout(() => setBiometricStep(4), 1500);
        setTimeout(() => {
            const userData = {
                phone: countryCode + phoneNumber,
                name: '홍길동',
                userId: 'user_' + Date.now(),
                loginTime: new Date().toISOString()
            };
            onLogin(userData);
        }, 2000);
    };

    return React.createElement('div', { 
        className: 'min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4'
    },
        React.createElement('div', { className: 'max-w-md w-full' },
            // 정부 로고 및 타이틀
            React.createElement('div', { className: 'bg-white border-4 border-blue-600 p-8 mb-6 text-center' },
                React.createElement('div', { className: 'text-blue-600 text-6xl mb-4' },
                    React.createElement('i', { className: 'fas fa-landmark' })
                ),
                React.createElement('h1', { className: 'text-2xl font-bold text-gray-900 mb-2' },
                    '오픈해시 거래소'
                ),
                React.createElement('p', { className: 'text-sm text-gray-600' },
                    '대한민국 공식 전자정부 서비스'
                )
            ),

            // 로그인 폼
            React.createElement('div', { className: 'bg-white border-2 border-gray-300 p-8' },
                React.createElement('h2', { className: 'text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-200' },
                    '로그인'
                ),

                // 국가번호 선택
                React.createElement('div', { className: 'mb-4' },
                    React.createElement('label', { className: 'block text-sm font-bold text-gray-900 mb-2' },
                        '국가'
                    ),
                    React.createElement('select', {
                        value: countryCode,
                        onChange: (e) => setCountryCode(e.target.value),
                        className: 'w-full px-4 py-3 border-2 border-gray-300 text-base focus:border-blue-600 focus:outline-none'
                    },
                        countryCodes.map(country =>
                            React.createElement('option', { key: country.code, value: country.code },
                                `${country.flag} ${country.name} ${country.code}`
                            )
                        )
                    )
                ),

                // 전화번호 입력
                React.createElement('div', { className: 'mb-6' },
                    React.createElement('label', { className: 'block text-sm font-bold text-gray-900 mb-2' },
                        '전화번호'
                    ),
                    React.createElement('div', { className: 'flex gap-2' },
                        React.createElement('div', { className: 'w-24 px-4 py-3 border-2 border-gray-300 bg-gray-50 text-base font-semibold text-center' },
                            countryCode
                        ),
                        React.createElement('input', {
                            type: 'tel',
                            value: phoneNumber,
                            onChange: (e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, '')),
                            placeholder: '01012345678',
                            className: 'flex-1 px-4 py-3 border-2 border-gray-300 text-base focus:border-blue-600 focus:outline-none',
                            maxLength: 11
                        })
                    ),
                    React.createElement('p', { className: 'text-xs text-gray-600 mt-2' },
                        '휴대폰 또는 일반 전화번호를 입력하세요'
                    )
                ),

                // 생체인식 로그인 버튼
                React.createElement('button', {
                    onClick: handleBiometricScan,
                    disabled: phoneNumber.length < 8,
                    className: `w-full py-4 text-base font-bold transition-all ${
                        phoneNumber.length < 8 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`
                },
                    React.createElement('i', { className: 'fas fa-fingerprint mr-2' }),
                    '생체인식 로그인'
                ),

                React.createElement('div', { className: 'mt-4 p-3 bg-blue-50 border border-blue-200 text-xs text-gray-700' },
                    React.createElement('div', { className: 'font-semibold mb-1' }, '🔒 보안 안내'),
                    React.createElement('ul', { className: 'space-y-1 ml-4' },
                        React.createElement('li', {}, '• 생체인식: 지문, 안면, 홍채 인식'),
                        React.createElement('li', {}, '• 종단간 암호화 통신'),
                        React.createElement('li', {}, '• 오픈해시 4계층 인증')
                    )
                )
            )
        ),

        // 생체인식 스캔 모달
        showBiometric && React.createElement('div', {
            className: 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'
        },
            React.createElement('div', { className: 'bg-white border-4 border-blue-600 p-8 max-w-md w-full mx-4 text-center' },
                React.createElement('div', { className: 'mb-6' },
                    React.createElement('div', { className: 'relative w-32 h-32 mx-auto mb-4' },
                        // 지문 아이콘
                        React.createElement('div', { 
                            className: `absolute inset-0 flex items-center justify-center text-blue-600 transition-all duration-500 ${
                                biometricStep >= 2 ? 'scale-110' : 'scale-100'
                            }`
                        },
                            React.createElement('i', { className: 'fas fa-fingerprint text-8xl' })
                        ),
                        // 스캔 라인 애니메이션
                        biometricStep === 1 && React.createElement('div', {
                            className: 'absolute inset-0 border-t-4 border-blue-600 animate-pulse',
                            style: { animation: 'scan 1.5s ease-in-out infinite' }
                        }),
                        // 완료 체크
                        biometricStep >= 3 && React.createElement('div', {
                            className: 'absolute inset-0 flex items-center justify-center bg-green-600 rounded-full text-white text-6xl animate-ping'
                        },
                            React.createElement('i', { className: 'fas fa-check' })
                        )
                    ),
                    React.createElement('h3', { className: 'text-xl font-bold text-gray-900 mb-2' },
                        biometricStep === 1 ? '생체 정보 스캔 중...' :
                        biometricStep === 2 ? '인증 처리 중...' :
                        biometricStep === 3 ? '인증 완료!' :
                        '로그인 중...'
                    ),
                    React.createElement('p', { className: 'text-sm text-gray-600' },
                        biometricStep === 1 ? '지문을 스캔하고 있습니다' :
                        biometricStep === 2 ? '오픈해시 4계층 검증' :
                        biometricStep >= 3 ? '환영합니다!' : ''
                    )
                ),
                React.createElement('div', { className: 'space-y-2 text-left text-sm' },
                    ['지문 스캔', '암호화 처리', '4계층 검증', '로그인 완료'].map((step, idx) =>
                        React.createElement('div', {
                            key: idx,
                            className: `flex items-center gap-2 p-2 border-2 ${
                                biometricStep > idx ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-gray-50'
                            }`
                        },
                            biometricStep > idx && React.createElement('span', { className: 'text-green-600 font-bold' }, '✓'),
                            React.createElement('span', { className: biometricStep > idx ? 'font-semibold' : '' }, step)
                        )
                    )
                )
            )
        )
    );
}
