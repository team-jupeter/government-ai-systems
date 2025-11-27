const App = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState({ title: '', content: null });

    const handleShowModal = (title, content) => {
        setModalContent({ title, content });
        setShowModal(true);
    };

    return React.createElement('div', { className: 'min-h-screen bg-gray-900' },
        React.createElement(Header, { onShowModal: handleShowModal }),
        React.createElement(FPGASection, { onShowModal: handleShowModal }),
        React.createElement(AIVerification, { onShowModal: handleShowModal }),
        React.createElement(FinancialStatement, { onShowModal: handleShowModal }),
        React.createElement(TaxAutomation, { onShowModal: handleShowModal }),
        React.createElement(CrossChain, { onShowModal: handleShowModal }),
        React.createElement(IntegratedFinance, { onShowModal: handleShowModal }),
        React.createElement(AIConsultation, { onShowModal: handleShowModal }),
        React.createElement('footer', { className: 'bg-gray-800 py-12 px-4 border-t border-gray-700' },
            React.createElement('div', { className: 'max-w-6xl mx-auto' },
                React.createElement('div', { className: 'grid md:grid-cols-3 gap-8 mb-8' },
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-yellow-400 mb-4' },
                            React.createElement('i', { className: 'fas fa-coins mr-2' }),
                            '통합 디지털 화폐 시스템'
                        ),
                        React.createElement('p', { className: 'text-gray-400 text-sm' },
                            'FPGA 하드웨어 가속과 AI 앙상블 검증을 결합한 차세대 금융 인프라. 0.015ms 초고속 처리로 완전 자율 금융 서비스 실현.'
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-green-400 mb-4' },
                            React.createElement('i', { className: 'fas fa-cogs mr-2' }),
                            '핵심 기술'
                        ),
                        React.createElement('ul', { className: 'text-gray-400 text-sm space-y-1' },
                            React.createElement('li', null, '• BN254 타원곡선 영지식 증명'),
                            React.createElement('li', null, '• BERT+CNN+LSTM AI 앙상블'),
                            React.createElement('li', null, '• 실시간 재무제표 자동 생성'),
                            React.createElement('li', null, '• Lock-and-Mint 크로스체인')
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-purple-400 mb-4' },
                            React.createElement('i', { className: 'fas fa-chart-line mr-2' }),
                            '성능 지표'
                        ),
                        React.createElement('ul', { className: 'text-gray-400 text-sm space-y-1' },
                            React.createElement('li', null, '• 처리 속도: 0.015ms'),
                            React.createElement('li', null, '• AI 정확도: 99.4%'),
                            React.createElement('li', null, '• 전력 절감: 88.6%'),
                            React.createElement('li', null, '• 처리량: 100,000 TPS')
                        )
                    )
                ),
                React.createElement('div', { className: 'border-t border-gray-700 pt-8 text-center' },
                    React.createElement('p', { className: 'text-gray-500 text-sm' },
                        '© 2025 FPGA 및 AI 기반 초고속·저전력 통합 디지털 화폐 시스템'
                    ),
                    React.createElement('p', { className: 'text-gray-600 text-xs mt-2' },
                        'OpenHash Platform | Port 5001'
                    )
                )
            )
        ),
        React.createElement(Modal, {
            isOpen: showModal,
            onClose: () => setShowModal(false),
            title: modalContent.title
        }, modalContent.content)
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
