const App = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState({ title: '', content: null });

    const openModal = (title, content) => {
        setModalContent({ title, content });
        setShowModal(true);
    };

    const systemInfo = React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'bg-teal-900/30 border border-teal-500/30 rounded-lg p-4' },
            React.createElement('h4', { className: 'font-bold text-teal-400 mb-2' }, '🔐 오픈해시 기술'),
            React.createElement('p', { className: 'text-sm text-gray-300' },
                'SHA-256 기반 확률적 계층 선택 알고리즘으로 블록체인 대비 98.5% 에너지 절감과 50,000 TPS 처리 성능을 달성합니다. 기존 통신 인프라를 활용하여 작업증명 없이 데이터 무결성을 보장합니다.'
            )
        ),
        React.createElement('div', { className: 'bg-purple-900/30 border border-purple-500/30 rounded-lg p-4' },
            React.createElement('h4', { className: 'font-bold text-purple-400 mb-2' }, '🔒 프라이빗 데이터 금고 (PDV)'),
            React.createElement('p', { className: 'text-sm text-gray-300' },
                '개인 건강 정보는 AES-256으로 암호화되어 본인 단말기에만 저장됩니다. 클라우드에는 32바이트 해시값만 기록되어 완전한 데이터 주권을 보장합니다.'
            )
        ),
        React.createElement('div', { className: 'bg-red-900/30 border border-red-500/30 rounded-lg p-4' },
            React.createElement('h4', { className: 'font-bold text-red-400 mb-2' }, '🤖 AI 의사 시뮬레이션'),
            React.createElement('p', { className: 'text-sm text-gray-300' },
                'Claude AI가 환자의 증상을 분석하고 PDV에 저장된 과거 의료 기록을 참조하여 초기 진단 방향을 제안합니다. 정확한 진단은 의료진의 직접 진찰이 필요합니다.'
            )
        ),
        React.createElement('div', { className: 'bg-blue-900/30 border border-blue-500/30 rounded-lg p-4' },
            React.createElement('h4', { className: 'font-bold text-blue-400 mb-2' }, '🏛️ 권역 의료 네트워크'),
            React.createElement('p', { className: 'text-sm text-gray-300' },
                '전국 226개 보건소, 43개 대학병원, 국가 의료정보원을 연결하는 3계층 네트워크로 의료 취약지역의 원격 진료 접근성을 향상시킵니다.'
            )
        ),
        React.createElement('div', { className: 'grid grid-cols-2 gap-4 mt-4' },
            React.createElement('div', { className: 'bg-gray-700 rounded-lg p-3 text-center' },
                React.createElement('div', { className: 'text-2xl font-bold text-teal-400' }, '98.5%'),
                React.createElement('div', { className: 'text-xs text-gray-400' }, '에너지 절감')
            ),
            React.createElement('div', { className: 'bg-gray-700 rounded-lg p-3 text-center' },
                React.createElement('div', { className: 'text-2xl font-bold text-teal-400' }, '50,000'),
                React.createElement('div', { className: 'text-xs text-gray-400' }, 'TPS 처리성능')
            ),
            React.createElement('div', { className: 'bg-gray-700 rounded-lg p-3 text-center' },
                React.createElement('div', { className: 'text-2xl font-bold text-purple-400' }, '32 bytes'),
                React.createElement('div', { className: 'text-xs text-gray-400' }, '클라우드 저장량/건')
            ),
            React.createElement('div', { className: 'bg-gray-700 rounded-lg p-3 text-center' },
                React.createElement('div', { className: 'text-2xl font-bold text-purple-400' }, '₩490'),
                React.createElement('div', { className: 'text-xs text-gray-400' }, '월/인 운영비용')
            )
        )
    );

    return React.createElement('div', { className: 'min-h-screen bg-gray-900' },
        React.createElement(Header, { onShowModal: openModal }),
        React.createElement(OpenHashSection, null),
        React.createElement(PDVSection, null),
        React.createElement(AIConsultation, null),
        React.createElement(SimulatorSection, null),
        
        // 푸터
        React.createElement('footer', { className: 'bg-gray-800 py-12 px-4 border-t border-gray-700' },
            React.createElement('div', { className: 'max-w-6xl mx-auto' },
                React.createElement('div', { className: 'grid md:grid-cols-3 gap-8 mb-8' },
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-teal-400 mb-4' }, '🏥 오픈해시 권역 의료 시스템'),
                        React.createElement('p', { className: 'text-sm text-gray-400' },
                            '블록체인의 보안성과 에너지 효율성을 동시에 달성한 차세대 의료 정보 통합 플랫폼'
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-gray-300 mb-4' }, '핵심 기술'),
                        React.createElement('ul', { className: 'text-sm text-gray-400 space-y-2' },
                            React.createElement('li', null, '• SHA-256 확률적 계층 선택'),
                            React.createElement('li', null, '• 프라이빗 데이터 금고 (PDV)'),
                            React.createElement('li', null, '• Claude AI 의료 상담'),
                            React.createElement('li', null, '• 4계층 분산 저장 구조')
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { className: 'font-bold text-gray-300 mb-4' }, '시스템 정보'),
                        React.createElement('button', {
                            onClick: () => openModal('시스템 상세 정보', systemInfo),
                            className: 'text-sm text-teal-400 hover:text-teal-300'
                        }, '📋 상세 정보 보기'),
                        React.createElement('div', { className: 'mt-4 text-sm text-gray-500' },
                            React.createElement('div', null, '버전: 2.0.0'),
                            React.createElement('div', null, '최종 업데이트: 2025-11-27')
                        )
                    )
                ),
                React.createElement('div', { className: 'text-center pt-8 border-t border-gray-700' },
                    React.createElement('p', { className: 'text-sm text-gray-500' },
                        '© 2025 오픈해시 기반 권역 의료 통합 시스템. 본 시스템은 연구 및 시연 목적으로 제작되었습니다.'
                    ),
                    React.createElement('p', { className: 'text-xs text-gray-600 mt-2' },
                        '의료 상담 결과는 참고용이며, 정확한 진단은 의료진의 직접 진찰이 필요합니다.'
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
