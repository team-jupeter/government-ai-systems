const StorageCalculator = ({ onShowModal }) => {
    const [transactionsPerYear, setTransactionsPerYear] = React.useState(1000);
    const [years, setYears] = React.useState(10);
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const calculate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-private-data-vault/pdv/calculate-storage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transactions_per_year: transactionsPerYear,
                    years: years
                })
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: '계산 실패: ' + error.message });
        }
        setLoading(false);
    };

    React.useEffect(() => {
        calculate();
    }, [transactionsPerYear, years]);

    const presets = [
        { label: '일반인 (1년)', tx: 500, yr: 1 },
        { label: '직장인 (10년)', tx: 1000, yr: 10 },
        { label: '사업자 (10년)', tx: 5000, yr: 10 },
        { label: '평생 기록', tx: 2000, yr: 50 }
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-800' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-database mr-3 text-indigo-400' }),
                    '클라우드 저장 공간 계산기'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    'PDV는 해시값(32 bytes)만 클라우드에 저장 | 평생 10만 건 거래도 단 3.2MB'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                // 입력
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-indigo-400' },
                        React.createElement('i', { className: 'fas fa-calculator mr-2' }),
                        '저장 공간 계산'
                    ),
                    // 프리셋 버튼
                    React.createElement('div', { className: 'grid grid-cols-2 gap-2 mb-6' },
                        presets.map((preset, i) =>
                            React.createElement('button', {
                                key: i,
                                onClick: () => { setTransactionsPerYear(preset.tx); setYears(preset.yr); },
                                className: 'py-2 px-3 bg-gray-800 hover:bg-indigo-600/30 border border-gray-600 hover:border-indigo-500 rounded-lg text-sm transition-colors'
                            }, preset.label)
                        )
                    ),
                    // 슬라이더
                    React.createElement('div', { className: 'space-y-6' },
                        React.createElement('div', null,
                            React.createElement('div', { className: 'flex justify-between mb-2' },
                                React.createElement('label', { className: 'text-sm text-gray-400' }, '연간 거래 건수'),
                                React.createElement('span', { className: 'text-indigo-400 font-bold' }, 
                                    transactionsPerYear.toLocaleString(), '건/년'
                                )
                            ),
                            React.createElement('input', {
                                type: 'range',
                                min: 100,
                                max: 10000,
                                step: 100,
                                value: transactionsPerYear,
                                onChange: e => setTransactionsPerYear(parseInt(e.target.value)),
                                className: 'w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500'
                            }),
                            React.createElement('div', { className: 'flex justify-between text-xs text-gray-500 mt-1' },
                                React.createElement('span', null, '100'),
                                React.createElement('span', null, '10,000')
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('div', { className: 'flex justify-between mb-2' },
                                React.createElement('label', { className: 'text-sm text-gray-400' }, '기록 기간'),
                                React.createElement('span', { className: 'text-indigo-400 font-bold' }, years, '년')
                            ),
                            React.createElement('input', {
                                type: 'range',
                                min: 1,
                                max: 80,
                                value: years,
                                onChange: e => setYears(parseInt(e.target.value)),
                                className: 'w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500'
                            }),
                            React.createElement('div', { className: 'flex justify-between text-xs text-gray-500 mt-1' },
                                React.createElement('span', null, '1년'),
                                React.createElement('span', null, '80년 (평생)')
                            )
                        )
                    ),
                    // 기술 정보
                    React.createElement('div', { className: 'mt-6 p-4 bg-gray-800 rounded-lg' },
                        React.createElement('div', { className: 'text-sm font-bold text-gray-400 mb-2' }, '저장 방식'),
                        React.createElement('div', { className: 'grid grid-cols-2 gap-4 text-xs' },
                            React.createElement('div', { className: 'p-2 bg-blue-900/20 rounded border border-blue-700' },
                                React.createElement('div', { className: 'text-blue-400 font-bold' }, '단말기 (로컬)'),
                                React.createElement('div', { className: 'text-gray-400' }, '원본 데이터'),
                                React.createElement('div', { className: 'text-gray-400' }, 'AES-256 암호화')
                            ),
                            React.createElement('div', { className: 'p-2 bg-green-900/20 rounded border border-green-700' },
                                React.createElement('div', { className: 'text-green-400 font-bold' }, '클라우드'),
                                React.createElement('div', { className: 'text-gray-400' }, 'SHA-256 해시만'),
                                React.createElement('div', { className: 'text-gray-400' }, '32 bytes/건')
                            )
                        )
                    )
                ),
                // 결과
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-green-400' },
                        React.createElement('i', { className: 'fas fa-chart-pie mr-2' }),
                        '계산 결과'
                    ),
                    result && !result.error ? React.createElement('div', { className: 'space-y-6' },
                        // 핵심 수치
                        React.createElement('div', { className: 'text-center p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/30' },
                            React.createElement('div', { className: 'text-gray-400 mb-2' }, '총 거래 건수'),
                            React.createElement('div', { className: 'text-4xl font-bold text-white mb-4' },
                                result.total_transactions?.toLocaleString(), '건'
                            ),
                            React.createElement('div', { className: 'text-gray-400 mb-2' }, '클라우드 저장 공간'),
                            React.createElement('div', { className: 'text-5xl font-bold text-green-400' },
                                result.cloud_storage_display
                            )
                        ),
                        // 비교
                        React.createElement('div', { className: 'space-y-3' },
                            React.createElement('div', { className: 'text-sm font-bold text-gray-400 mb-2' }, '기존 방식 대비 비교'),
                            React.createElement('div', { className: 'p-4 bg-gray-800 rounded-lg' },
                                React.createElement('div', { className: 'flex justify-between items-center mb-2' },
                                    React.createElement('span', { className: 'text-gray-400' }, '기존 DB 방식'),
                                    React.createElement('span', { className: 'text-red-400' }, result.comparison?.traditional_db)
                                ),
                                React.createElement('div', { className: 'h-3 bg-red-900/30 rounded-full overflow-hidden' },
                                    React.createElement('div', { className: 'h-full bg-red-500 w-full' })
                                )
                            ),
                            React.createElement('div', { className: 'p-4 bg-gray-800 rounded-lg' },
                                React.createElement('div', { className: 'flex justify-between items-center mb-2' },
                                    React.createElement('span', { className: 'text-gray-400' }, 'PDV 클라우드'),
                                    React.createElement('span', { className: 'text-green-400' }, result.comparison?.pdv_cloud)
                                ),
                                React.createElement('div', { className: 'h-3 bg-gray-700 rounded-full overflow-hidden' },
                                    React.createElement('div', { 
                                        className: 'h-full bg-green-500',
                                        style: { width: '6.4%' }
                                    })
                                )
                            ),
                            React.createElement('div', { className: 'text-center p-3 bg-green-900/20 rounded-lg border border-green-700' },
                                React.createElement('span', { className: 'text-green-400 font-bold text-lg' },
                                    '💾 ', result.comparison?.savings
                                )
                            )
                        ),
                        // 참고 정보
                        React.createElement('div', { className: 'p-4 bg-blue-900/20 rounded-lg border border-blue-700 text-sm' },
                            React.createElement('div', { className: 'font-bold text-blue-400 mb-2' },
                                React.createElement('i', { className: 'fas fa-info-circle mr-2' }),
                                '참고'
                            ),
                            React.createElement('ul', { className: 'text-gray-400 space-y-1' },
                                React.createElement('li', null, '• 1년 1,000건 → 32 KB'),
                                React.createElement('li', null, '• 10년 10,000건 → 320 KB'),
                                React.createElement('li', null, '• 평생 100,000건 → 3.2 MB')
                            )
                        )
                    ) : React.createElement('div', { className: 'text-center text-gray-500 py-12' },
                        React.createElement('i', { className: 'fas fa-spinner fa-spin text-4xl mb-4' }),
                        React.createElement('p', null, '계산 중...')
                    )
                )
            )
        )
    );
};
