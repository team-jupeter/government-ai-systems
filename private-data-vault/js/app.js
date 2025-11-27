const App = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState({ title: '', content: null });

    const handleShowModal = (title, content) => {
        setModalContent({ title, content });
        setShowModal(true);
    };

    return React.createElement('div', { className: 'min-h-screen bg-gray-900' },
        // Header
        React.createElement(Header, { onShowModal: handleShowModal }),
        
        // PDV 개요
        React.createElement(PDVOverview, { onShowModal: handleShowModal }),
        
        // 확장 재무제표
        React.createElement(ExtendedFinancialStatement, { onShowModal: handleShowModal }),
        
        // 교차 검증
        React.createElement(CrossVerification, { onShowModal: handleShowModal }),
        
        // 활동 증명
        React.createElement(ActivityProof, { onShowModal: handleShowModal }),
        
        // 계층 시뮬레이터
        React.createElement(LayerSimulator, { onShowModal: handleShowModal }),
        
        // 저장 공간 계산기
        React.createElement(StorageCalculator, { onShowModal: handleShowModal }),
        
        // AI 상담
        React.createElement(AIConsultation, { onShowModal: handleShowModal }),
        
        // Footer
        React.createElement('footer', { className: 'bg-gray-800 py-12 px-4 border-t border-gray-700' },
            React.createElement('div', { className: 'max-w-6xl mx-auto' },
                React.createElement('div', { className: 'grid md:grid-cols-3 gap-8 mb-8' },
                    // 시스템 정보
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-blue-400 mb-4' },
                            React.createElement('i', { className: 'fas fa-shield-alt mr-2' }),
                            '프라이빗 데이터 금고'
                        ),
                        React.createElement('p', { className: 'text-gray-400 text-sm' },
                            '오픈해시 기반 개인정보 보호 시스템. 원본 데이터는 단말기에만, 해시값만 클라우드에 저장하여 완전한 개인정보 주권을 실현합니다.'
                        )
                    ),
                    // 핵심 기술
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-green-400 mb-4' },
                            React.createElement('i', { className: 'fas fa-cogs mr-2' }),
                            '핵심 기술'
                        ),
                        React.createElement('ul', { className: 'text-gray-400 text-sm space-y-1' },
                            React.createElement('li', null, '• AES-256 암호화 (로컬 저장)'),
                            React.createElement('li', null, '• SHA-256 해시 체인'),
                            React.createElement('li', null, '• BLS 서명 & Merkle Proof'),
                            React.createElement('li', null, '• 확률적 4계층 분산')
                        )
                    ),
                    // 성능 지표
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-yellow-400 mb-4' },
                            React.createElement('i', { className: 'fas fa-chart-line mr-2' }),
                            'AWS 실증 결과'
                        ),
                        React.createElement('ul', { className: 'text-gray-400 text-sm space-y-1' },
                            React.createElement('li', null, '• 처리 속도: 25,907 rec/sec'),
                            React.createElement('li', null, '• 블록체인 대비 3,701배'),
                            React.createElement('li', null, '• 에너지 절감: 98.5%'),
                            React.createElement('li', null, '• 계층 정확도: 98.9%')
                        )
                    )
                ),
                // 저작권
                React.createElement('div', { className: 'border-t border-gray-700 pt-8 text-center' },
                    React.createElement('p', { className: 'text-gray-500 text-sm' },
                        '© 2025 오픈해시 기반 프라이빗 데이터 금고 시스템. 연구 및 시연 목적.'
                    ),
                    React.createElement('p', { className: 'text-gray-600 text-xs mt-2' },
                        'OpenHash PDV System v1.0 | Port 5025'
                    )
                )
            )
        ),
        
        // Modal
        React.createElement(Modal, {
            isOpen: showModal,
            onClose: () => setShowModal(false),
            title: modalContent.title
        }, modalContent.content)
    );
};

// 렌더링
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
