// React 컴포넌트들
(function() {
    // 알림 배너
    window.NotificationBanner = function({ message, show }) {
        if (!show) return null;
        return React.createElement('div', {
            className: 'fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl animate-bounce z-50'
        }, message);
    };

    // 진행 상황 모달
    window.ProgressModal = function({ show, messages, currentIndex }) {
        if (!show) return null;
        const currentMessage = messages[currentIndex] || messages[messages.length - 1];
        const progress = ((currentIndex + 1) / messages.length) * 100;

        return React.createElement('div', {
            className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
        }, [
            React.createElement('div', {
                className: 'bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl',
                key: 'content'
            }, [
                React.createElement('div', { className: 'text-center mb-6', key: 'header' }, [
                    React.createElement('div', { className: 'text-4xl mb-4 animate-pulse', key: 'icon' }, '🤖'),
                    React.createElement('h3', { className: 'text-xl font-bold text-gray-800', key: 'title' }, 'AI 의사가 분석 중입니다')
                ]),
                React.createElement('div', { className: 'mb-6', key: 'progress' }, [
                    React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-3 mb-3', key: 'bar-bg' }, [
                        React.createElement('div', {
                            className: 'bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500',
                            style: { width: `${progress}%` },
                            key: 'bar'
                        })
                    ]),
                    React.createElement('div', { className: 'text-sm text-gray-600 text-center', key: 'pct' }, `${Math.round(progress)}% 완료`)
                ]),
                React.createElement('div', {
                    className: 'bg-blue-50 border-2 border-blue-200 rounded-xl p-4 min-h-[80px] flex items-center justify-center',
                    key: 'msg'
                }, [
                    React.createElement('p', { className: 'text-center text-gray-700 text-sm', key: 'text' }, currentMessage?.text || '처리 중...')
                ])
            ])
        ]);
    };

    // PDV 저장 애니메이션
    window.PDVSavingAnimation = function({ show, pdvId }) {
        if (!show) return null;
        return React.createElement('div', {
            className: 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6 mb-4'
        }, [
            React.createElement('div', { className: 'flex items-center justify-between mb-4', key: 'header' }, [
                React.createElement('div', { className: 'text-3xl animate-bounce', key: 'doc' }, '📄'),
                React.createElement('div', { className: 'flex-1 mx-4', key: 'arrow' }, [
                    React.createElement('div', { className: 'h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded animate-pulse', key: 'line' }),
                    React.createElement('div', { className: 'text-center text-xs text-gray-600 mt-1', key: 'text' }, '저장 중...')
                ]),
                React.createElement('div', { className: 'text-3xl animate-bounce', key: 'vault', style: { animationDelay: '0.2s' } }, '🔒')
            ]),
            React.createElement('div', { className: 'text-center', key: 'info' }, [
                React.createElement('div', { className: 'text-sm font-bold text-green-800 mb-2', key: 'title' }, '개인정보금고(PDV)에 저장 중'),
                React.createElement('div', { className: 'text-xs text-gray-600 font-mono bg-white px-3 py-2 rounded', key: 'id' }, `PDV ID: ${pdvId}`)
            ])
        ]);
    };

    // 오픈해시 네트워크 애니메이션
    window.OpenHashNetworkAnimation = function({ show, hash, previousHash }) {
        if (!show) return null;
        return React.createElement('div', {
            className: 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6'
        }, [
            React.createElement('div', { className: 'text-center mb-4', key: 'title' }, [
                React.createElement('h4', { className: 'text-lg font-bold text-purple-800 mb-2', key: 'h4' }, '🌐 오픈해시 네트워크 전송'),
                React.createElement('p', { className: 'text-xs text-gray-600', key: 'p' }, '블록체인 방식으로 데이터 무결성 보장')
            ]),
            React.createElement('div', { className: 'grid grid-cols-5 gap-2 mb-4', key: 'nodes' },
                [0, 1, 2, 3, 4].map(i =>
                    React.createElement('div', { key: i, className: 'text-center' }, [
                        React.createElement('div', {
                            className: 'w-12 h-12 bg-purple-200 rounded-full mx-auto flex items-center justify-center animate-pulse',
                            style: { animationDelay: `${i * 0.2}s` },
                            key: 'node'
                        }, '🖥️'),
                        React.createElement('div', { className: 'text-xs text-gray-500 mt-1', key: 'label' }, `Node ${i + 1}`)
                    ])
                )
            ),
            React.createElement('div', { className: 'bg-white rounded-lg p-4 space-y-3', key: 'hashes' }, [
                React.createElement('div', { key: 'current' }, [
                    React.createElement('div', { className: 'text-xs font-semibold text-purple-700 mb-1', key: 'label' }, '🔐 현재 진료 기록 Hash'),
                    React.createElement('div', { className: 'text-xs font-mono bg-purple-50 px-3 py-2 rounded break-all text-gray-700', key: 'value' }, hash?.substring(0, 48) + '...')
                ]),
                React.createElement('div', { className: 'flex items-center justify-center', key: 'chain' }, [
                    React.createElement('div', { className: 'text-2xl animate-bounce', key: 'icon' }, '⛓️')
                ]),
                React.createElement('div', { key: 'previous' }, [
                    React.createElement('div', { className: 'text-xs font-semibold text-gray-600 mb-1', key: 'label' }, '🔗 이전 기록 Hash'),
                    React.createElement('div', { className: 'text-xs font-mono bg-gray-50 px-3 py-2 rounded break-all text-gray-600', key: 'value' }, previousHash?.substring(0, 48) + '...')
                ])
            ]),
            React.createElement('div', { className: 'mt-4 text-center', key: 'status' }, [
                React.createElement('div', { className: 'inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold', key: 'badge' }, [
                    React.createElement('span', { key: 'check' }, '✓'),
                    React.createElement('span', { key: 'text' }, '네트워크에 안전하게 기록됨')
                ])
            ])
        ]);
    };

    // 오픈해시 설명 모달
    window.OpenHashExplanationModal = function({ show, onClose }) {
        if (!show) return null;
        return React.createElement('div', {
            className: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4',
            onClick: onClose
        }, [
            React.createElement('div', {
                className: 'bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto',
                onClick: (e) => e.stopPropagation(),
                key: 'modal'
            }, [
                React.createElement('div', {
                    className: 'sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl',
                    key: 'header'
                }, [
                    React.createElement('div', { className: 'flex justify-between items-start', key: 'flex' }, [
                        React.createElement('div', { key: 'title-section' }, [
                            React.createElement('h2', { className: 'text-3xl font-bold mb-2', key: 'title' }, '🔐 오픈해시(OpenHash) 기술'),
                            React.createElement('p', { className: 'text-sm opacity-90', key: 'subtitle' }, '의료 AI 시스템의 핵심 보안 기술')
                        ]),
                        React.createElement('button', {
                            onClick: onClose,
                            className: 'text-white hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition',
                            key: 'close'
                        }, '✕')
                    ])
                ]),
                React.createElement('div', { className: 'p-8 space-y-6', key: 'body' }, [
                    React.createElement('div', { className: 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 rounded-xl p-6', key: 'intro' }, [
                        React.createElement('h3', { className: 'text-xl font-bold text-purple-800 mb-3', key: 'h3' }, '💡 오픈해시란?'),
                        React.createElement('p', { className: 'text-gray-700 leading-relaxed', key: 'p' }, '오픈해시는 블록체인의 보안성을 유지하면서도 에너지 효율성을 98.5% 개선한 차세대 분산 원장 기술입니다. 복잡한 채굴 과정 없이 암호화 해시 체인만으로 데이터 무결성을 보장합니다.')
                    ]),
                    React.createElement('div', { className: 'bg-white border-2 border-gray-200 rounded-xl p-6', key: 'importance' }, [
                        React.createElement('h3', { className: 'text-xl font-bold text-gray-800 mb-4', key: 'h3' }, '🏥 의료 AI 시스템에서의 중요성'),
                        React.createElement('p', { className: 'text-sm text-gray-700 leading-relaxed', key: 'p' }, 'AI 의사의 진단, 검사 결과, 처방이 모두 변조 불가능한 해시 체인으로 연결되어 환자 데이터의 무결성과 신뢰성을 보장합니다. 개인정보금고(PDV)와 결합하여 환자만 자신의 의료 기록에 접근할 수 있으며, 병원 간 안전한 정보 공유가 가능합니다.')
                    ])
                ])
            ])
        ]);
    };

    // AI 의사 채팅
    window.AIDoctorChat = function({ sessionId, messages, onSendMessage, onPerformTest, onFinalize, isProcessing }) {
        const [inputMessage, setInputMessage] = React.useState('');
        
        const handleSend = () => {
            if (inputMessage.trim() && !isProcessing) {
                onSendMessage(inputMessage);
                setInputMessage('');
            }
        };
        
        React.useEffect(() => {
            const chatContainer = document.getElementById('chat-messages');
            if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
        }, [messages]);
        
        return React.createElement('div', { className: 'flex flex-col h-full' }, [
            React.createElement('div', {
                id: 'chat-messages',
                className: 'flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50',
                key: 'messages'
            }, messages.map((msg, idx) => 
                React.createElement('div', {
                    key: idx,
                    className: 'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')
                }, [
                    React.createElement('div', {
                        className: 'max-w-[70%] rounded-xl p-4 ' + (msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-800'),
                        key: 'bubble'
                    }, [
                        React.createElement('div', { className: 'text-sm whitespace-pre-wrap', key: 'content' }, msg.content),
                        msg.tests_requested && msg.tests_requested.length > 0 && React.createElement('div', {
                            className: 'mt-3 pt-3 border-t border-gray-300',
                            key: 'tests'
                        }, [
                            React.createElement('div', { className: 'text-xs font-semibold mb-2', key: 'label' }, '🔬 권장 검사:'),
                            React.createElement('div', { className: 'flex flex-wrap gap-2', key: 'buttons' },
                                msg.tests_requested.map((testId, tidx) =>
                                    React.createElement('button', {
                                        key: tidx,
                                        onClick: () => onPerformTest(testId),
                                        className: 'text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition',
                                        disabled: isProcessing
                                    }, testId)
                                )
                            )
                        ]),
                        msg.test_result && React.createElement('div', {
                            className: 'mt-3 pt-3 border-t border-green-300 bg-green-50 -m-4 mt-3 p-3 rounded-b-xl',
                            key: 'result'
                        }, [
                            React.createElement('div', { className: 'text-xs font-semibold text-green-800 mb-2', key: 'label' }, '✅ 검사 완료: ' + msg.test_result.equipment_name),
                            React.createElement('pre', { className: 'text-xs text-gray-700 overflow-auto', key: 'data' }, JSON.stringify(msg.test_result.result, null, 2))
                        ])
                    ])
                ])
            )),
            React.createElement('div', { className: 'border-t-2 border-gray-200 p-4 bg-white', key: 'input-area' }, [
                React.createElement('div', { className: 'flex gap-2', key: 'input-row' }, [
                    React.createElement('textarea', {
                        value: inputMessage,
                        onChange: (e) => setInputMessage(e.target.value),
                        placeholder: '증상이나 질문을 입력하세요...',
                        className: 'flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none',
                        rows: 2,
                        disabled: isProcessing,
                        key: 'textarea'
                    }),
                    React.createElement('button', {
                        onClick: handleSend,
                        disabled: !inputMessage.trim() || isProcessing,
                        className: 'px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50',
                        key: 'send-btn'
                    }, isProcessing ? '⏳' : '전송')
                ]),
                React.createElement('button', {
                    onClick: onFinalize,
                    disabled: isProcessing || messages.length < 3,
                    className: 'mt-3 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 font-bold',
                    key: 'finalize-btn'
                }, '진료 완료 및 보고서 생성')
            ])
        ]);
    };
    
    console.log('✅ Components loaded (All Components)');
})();
