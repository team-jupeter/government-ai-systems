const ActivityProof = ({ onShowModal }) => {
    const [formData, setFormData] = React.useState({
        subject: '홍길동',
        activity_type: '급여 수령',
        period: '2024-01 ~ 2024-12',
        records_count: 24,
        total_amount: 72000000
    });
    const [certificate, setCertificate] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const issueCertificate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api-private-data-vault/pdv/issue-certificate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setCertificate(data);
        } catch (error) {
            setCertificate({ error: '증명서 발급 실패: ' + error.message });
        }
        setLoading(false);
    };

    const activityTypes = [
        '급여 수령', '프리랜서 수입', '임대 수입', '사업 소득',
        '근무 이력', '자격증 취득', '교육 이수', '봉사 활동'
    ];

    return React.createElement('section', { className: 'py-16 px-4 bg-gray-800' },
        React.createElement('div', { className: 'max-w-6xl mx-auto' },
            React.createElement('div', { className: 'text-center mb-12' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-4' },
                    React.createElement('i', { className: 'fas fa-certificate mr-3 text-red-400' }),
                    '활동 증명서 발급'
                ),
                React.createElement('p', { className: 'text-gray-400 max-w-2xl mx-auto' },
                    '해시 체인 기반 법적 증명력 확보 | BLS 서명 및 Merkle Proof로 위조 불가능'
                )
            ),
            React.createElement('div', { className: 'grid lg:grid-cols-2 gap-8' },
                // 입력 폼
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-red-400' },
                        React.createElement('i', { className: 'fas fa-file-signature mr-2' }),
                        '증명서 요청'
                    ),
                    React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '증명 대상자'),
                            React.createElement('input', {
                                type: 'text',
                                value: formData.subject,
                                onChange: e => setFormData({...formData, subject: e.target.value}),
                                className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:border-red-500 focus:outline-none'
                            })
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '활동 유형'),
                            React.createElement('select', {
                                value: formData.activity_type,
                                onChange: e => setFormData({...formData, activity_type: e.target.value}),
                                className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:border-red-500 focus:outline-none'
                            },
                                activityTypes.map(type =>
                                    React.createElement('option', { key: type, value: type }, type)
                                )
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '증명 기간'),
                            React.createElement('input', {
                                type: 'text',
                                value: formData.period,
                                onChange: e => setFormData({...formData, period: e.target.value}),
                                placeholder: '예: 2024-01 ~ 2024-12',
                                className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:border-red-500 focus:outline-none'
                            })
                        ),
                        React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
                            React.createElement('div', null,
                                React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '기록 건수'),
                                React.createElement('input', {
                                    type: 'number',
                                    value: formData.records_count,
                                    onChange: e => setFormData({...formData, records_count: parseInt(e.target.value) || 0}),
                                    className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:border-red-500 focus:outline-none'
                                })
                            ),
                            React.createElement('div', null,
                                React.createElement('label', { className: 'block text-sm text-gray-400 mb-1' }, '총 금액 (원)'),
                                React.createElement('input', {
                                    type: 'number',
                                    value: formData.total_amount,
                                    onChange: e => setFormData({...formData, total_amount: parseInt(e.target.value) || 0}),
                                    className: 'w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:border-red-500 focus:outline-none'
                                })
                            )
                        )
                    ),
                    React.createElement('button', {
                        onClick: issueCertificate,
                        disabled: loading,
                        className: 'w-full mt-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors'
                    },
                        loading ? '발급 중...' : React.createElement('span', null,
                            React.createElement('i', { className: 'fas fa-stamp mr-2' }),
                            '증명서 발급'
                        )
                    )
                ),
                // 증명서 표시
                React.createElement('div', { className: 'bg-gray-900 rounded-xl p-6 border border-gray-700' },
                    React.createElement('h3', { className: 'text-xl font-bold mb-6 text-green-400' },
                        React.createElement('i', { className: 'fas fa-award mr-2' }),
                        '발급된 증명서'
                    ),
                    certificate ? (
                        certificate.error ?
                            React.createElement('div', { className: 'text-red-400 p-4 bg-red-900/20 rounded-lg' }, certificate.error)
                        :
                            React.createElement('div', { className: 'space-y-4' },
                                // 증명서 카드
                                React.createElement('div', { className: 'bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-green-500/50 relative overflow-hidden' },
                                    // 워터마크
                                    React.createElement('div', { className: 'absolute top-4 right-4 opacity-10' },
                                        React.createElement('i', { className: 'fas fa-shield-alt text-8xl text-green-500' })
                                    ),
                                    React.createElement('div', { className: 'relative z-10' },
                                        React.createElement('div', { className: 'text-center mb-4' },
                                            React.createElement('div', { className: 'text-green-400 font-bold text-lg' }, '오픈해시 활동 증명서'),
                                            React.createElement('div', { className: 'text-xs text-gray-500' }, 
                                                'Certificate ID: ', certificate.certificate?.certificate_id
                                            )
                                        ),
                                        React.createElement('div', { className: 'border-t border-b border-gray-700 py-4 my-4' },
                                            React.createElement('div', { className: 'grid grid-cols-2 gap-4 text-sm' },
                                                React.createElement('div', null,
                                                    React.createElement('span', { className: 'text-gray-500' }, '증명 대상: '),
                                                    React.createElement('span', { className: 'text-white font-medium' }, certificate.certificate?.subject)
                                                ),
                                                React.createElement('div', null,
                                                    React.createElement('span', { className: 'text-gray-500' }, '활동 유형: '),
                                                    React.createElement('span', { className: 'text-white font-medium' }, certificate.certificate?.activity_type)
                                                ),
                                                React.createElement('div', null,
                                                    React.createElement('span', { className: 'text-gray-500' }, '증명 기간: '),
                                                    React.createElement('span', { className: 'text-white font-medium' }, certificate.certificate?.period)
                                                ),
                                                React.createElement('div', null,
                                                    React.createElement('span', { className: 'text-gray-500' }, '기록 건수: '),
                                                    React.createElement('span', { className: 'text-white font-medium' }, certificate.certificate?.records_count, '건')
                                                )
                                            ),
                                            React.createElement('div', { className: 'mt-3 text-center' },
                                                React.createElement('span', { className: 'text-gray-500' }, '총 금액: '),
                                                React.createElement('span', { className: 'text-2xl font-bold text-green-400' },
                                                    certificate.certificate?.total_amount?.toLocaleString(), '원'
                                                )
                                            )
                                        ),
                                        React.createElement('div', { className: 'text-xs text-gray-500 text-center' },
                                            '발급일시: ', certificate.certificate?.issued_at
                                        )
                                    )
                                ),
                                // 해시 체인 정보
                                React.createElement('div', { className: 'bg-gray-800 rounded-lg p-4' },
                                    React.createElement('div', { className: 'text-sm font-bold text-blue-400 mb-3' },
                                        React.createElement('i', { className: 'fas fa-link mr-2' }),
                                        '해시 체인 검증 정보'
                                    ),
                                    React.createElement('div', { className: 'space-y-2 text-xs' },
                                        React.createElement('div', null,
                                            React.createElement('span', { className: 'text-gray-500' }, 'First Record: '),
                                            React.createElement('span', { className: 'hash-display text-gray-400' },
                                                certificate.certificate?.hash_chain?.first_record_hash?.substring(0, 24) + '...'
                                            )
                                        ),
                                        React.createElement('div', null,
                                            React.createElement('span', { className: 'text-gray-500' }, 'Last Record: '),
                                            React.createElement('span', { className: 'hash-display text-gray-400' },
                                                certificate.certificate?.hash_chain?.last_record_hash?.substring(0, 24) + '...'
                                            )
                                        ),
                                        React.createElement('div', null,
                                            React.createElement('span', { className: 'text-gray-500' }, 'Merkle Root: '),
                                            React.createElement('span', { className: 'hash-display text-gray-400' },
                                                certificate.certificate?.hash_chain?.merkle_root?.substring(0, 24) + '...'
                                            )
                                        ),
                                        React.createElement('div', null,
                                            React.createElement('span', { className: 'text-gray-500' }, 'BLS Signature: '),
                                            React.createElement('span', { className: 'hash-display text-gray-400' },
                                                certificate.certificate?.bls_signature?.substring(0, 24) + '...'
                                            )
                                        )
                                    )
                                ),
                                // 검증 배지
                                React.createElement('div', { className: 'flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-700' },
                                    React.createElement('div', { className: 'flex items-center gap-2' },
                                        React.createElement('i', { className: 'fas fa-check-circle text-green-400' }),
                                        React.createElement('span', { className: 'text-green-400 text-sm' }, '법적 유효성 확인')
                                    ),
                                    React.createElement('div', { className: 'flex items-center gap-2' },
                                        React.createElement('i', { className: 'fas fa-lock text-green-400' }),
                                        React.createElement('span', { className: 'text-green-400 text-sm' }, '위조 불가')
                                    )
                                )
                            )
                    ) : React.createElement('div', { className: 'text-center text-gray-500 py-12' },
                        React.createElement('i', { className: 'fas fa-file-alt text-4xl mb-4' }),
                        React.createElement('p', null, '증명서를 발급하면 여기에 표시됩니다')
                    )
                )
            )
        )
    );
};
