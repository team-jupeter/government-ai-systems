const App = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState({ title: '', content: null });

    const openModal = (title, content) => {
        setModalContent({ title, content });
        setShowModal(true);
    };

    const systemInfo = React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { 
            className: 'rounded-lg p-4', 
            style: { backgroundColor: '#dbeafe', border: '1px solid #93c5fd' }
        },
            React.createElement('h4', { 
                className: 'font-bold mb-2', 
                style: { color: '#1e40af' }
            }, '🔐 오픈해시 기술'),
            React.createElement('p', { 
                className: 'text-sm', 
                style: { color: '#374151' }
            },
                'SHA-256 기반 확률적 계층 선택 알고리즘으로 블록체인 대비 98.5% 에너지 절감과 50,000 TPS 처리 성능을 달성합니다. 기존 통신 인프라를 활용하여 작업증명 없이 데이터 무결성을 보장합니다.'
            )
        ),
        React.createElement('div', { 
            className: 'rounded-lg p-4', 
            style: { backgroundColor: '#e0e7ff', border: '1px solid #c7d2fe' }
        },
            React.createElement('h4', { 
                className: 'font-bold mb-2', 
                style: { color: '#4f46e5' }
            }, '🔒 프라이빗 데이터 금고 (PDV)'),
            React.createElement('p', { 
                className: 'text-sm', 
                style: { color: '#374151' }
            },
                '개인 건강 정보는 AES-256으로 암호화되어 본인 단말기에만 저장됩니다. 클라우드에는 32바이트 해시값만 기록되어 완전한 데이터 주권을 보장합니다.'
            )
        ),
        React.createElement('div', { 
            className: 'rounded-lg p-4', 
            style: { backgroundColor: '#dbeafe', border: '1px solid #93c5fd' }
        },
            React.createElement('h4', { 
                className: 'font-bold mb-2', 
                style: { color: '#0066CC' }
            }, '🤖 AI 의사 시뮬레이션'),
            React.createElement('p', { 
                className: 'text-sm', 
                style: { color: '#374151' }
            },
                'Claude AI가 환자의 증상을 분석하고 PDV에 저장된 과거 의료 기록을 참조하여 초기 진단 방향을 제안합니다. 정확한 진단은 의료진의 직접 진찰이 필요합니다.'
            )
        ),
        React.createElement('div', { 
            className: 'rounded-lg p-4', 
            style: { backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }
        },
            React.createElement('h4', { 
                className: 'font-bold mb-2', 
                style: { color: '#0284c7' }
            }, '🏛️ 권역 의료 네트워크'),
            React.createElement('p', { 
                className: 'text-sm', 
                style: { color: '#374151' }
            },
                '전국 226개 보건소, 43개 대학병원, 국가 의료정보원을 연결하는 3계층 네트워크로 의료 취약지역의 원격 진료 접근성을 향상시킵니다.'
            )
        ),
        React.createElement('div', { className: 'grid grid-cols-2 gap-4 mt-4' },
            React.createElement('div', { 
                className: 'rounded-lg p-3 text-center', 
                style: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
            },
                React.createElement('div', { 
                    className: 'text-2xl font-bold', 
                    style: { color: '#0046FF' }
                }, '98.5%'),
                React.createElement('div', { 
                    className: 'text-xs', 
                    style: { color: '#6b7280' }
                }, '에너지 절감')
            ),
            React.createElement('div', { 
                className: 'rounded-lg p-3 text-center', 
                style: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
            },
                React.createElement('div', { 
                    className: 'text-2xl font-bold', 
                    style: { color: '#0046FF' }
                }, '50,000'),
                React.createElement('div', { 
                    className: 'text-xs', 
                    style: { color: '#6b7280' }
                }, 'TPS 처리성능')
            ),
            React.createElement('div', { 
                className: 'rounded-lg p-3 text-center', 
                style: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
            },
                React.createElement('div', { 
                    className: 'text-2xl font-bold', 
                    style: { color: '#3b82f6' }
                }, '32 bytes'),
                React.createElement('div', { 
                    className: 'text-xs', 
                    style: { color: '#6b7280' }
                }, '클라우드 저장량/건')
            ),
            React.createElement('div', { 
                className: 'rounded-lg p-3 text-center', 
                style: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
            },
                React.createElement('div', { 
                    className: 'text-2xl font-bold', 
                    style: { color: '#3b82f6' }
                }, '₩490'),
                React.createElement('div', { 
                    className: 'text-xs', 
                    style: { color: '#6b7280' }
                }, '월/인 운영비용')
            )
        )
    );

    return React.createElement('div', { 
        className: 'min-h-screen', 
        style: { backgroundColor: '#f8f9fa' }
    },
        React.createElement(Header, { onShowModal: openModal }),
        React.createElement(OpenHashSection, null),
        React.createElement(PDVSection, null),
        React.createElement(AIConsultation, null),
        React.createElement(SimulatorSection, null),
        
        // 푸터
        React.createElement('footer', { 
            className: 'py-12 px-4', 
            style: { backgroundColor: 'white', borderTop: '1px solid #e5e7eb' }
        },
            React.createElement('div', { className: 'max-w-6xl mx-auto' },
                React.createElement('div', { className: 'grid md:grid-cols-3 gap-8 mb-8' },
                    React.createElement('div', null,
                        React.createElement('h4', { 
                            className: 'font-bold mb-4', 
                            style: { color: '#0046FF' }
                        }, '🏥 오픈해시 권역 의료 시스템'),
                        React.createElement('p', { 
                            className: 'text-sm', 
                            style: { color: '#6b7280' }
                        },
                            '블록체인의 보안성과 에너지 효율성을 동시에 달성한 차세대 의료 정보 통합 플랫폼'
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { 
                            className: 'font-bold mb-4', 
                            style: { color: '#212529' }
                        }, '핵심 기술'),
                        React.createElement('ul', { 
                            className: 'text-sm space-y-2', 
                            style: { color: '#6b7280' }
                        },
                            React.createElement('li', null, '• SHA-256 확률적 계층 선택'),
                            React.createElement('li', null, '• 프라이빗 데이터 금고 (PDV)'),
                            React.createElement('li', null, '• Claude AI 의료 상담'),
                            React.createElement('li', null, '• 4계층 분산 저장 구조')
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { 
                            className: 'font-bold mb-4', 
                            style: { color: '#212529' }
                        }, '시스템 정보'),
                        React.createElement('button', {
                            onClick: () => openModal('시스템 상세 정보', systemInfo),
                            className: 'text-sm font-medium',
                            style: { color: '#0046FF' },
                            onMouseOver: (e) => e.target.style.color = '#0039CC',
                            onMouseOut: (e) => e.target.style.color = '#0046FF'
                        }, '📋 상세 정보 보기'),
                        React.createElement('div', { 
                            className: 'mt-4 text-sm', 
                            style: { color: '#9ca3af' }
                        },
                            React.createElement('div', null, '버전: 2.0.0'),
                            React.createElement('div', null, '최종 업데이트: 2025-11-30')
                        )
                    )
                ),
                React.createElement('div', { 
                    className: 'text-center pt-8', 
                    style: { borderTop: '1px solid #e5e7eb' }
                },
                    React.createElement('p', { 
                        className: 'text-sm', 
                        style: { color: '#9ca3af' }
                    },
                        '© 2025 오픈해시 기반 권역 의료 통합 시스템. 본 시스템은 연구 및 시연 목적으로 제작되었습니다.'
                    ),
                    React.createElement('p', { 
                        className: 'text-xs mt-2', 
                        style: { color: '#d1d5db' }
                    },
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
