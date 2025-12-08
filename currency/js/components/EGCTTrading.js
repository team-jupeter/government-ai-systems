/**
 * EGCT Trading UI Component
 * Pure JavaScript (No JSX)
 */
class EGCTTrading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tradingEngine: null,
            currentUser: null,
            balance: 0,
            orderType: 'buy',
            orderAmount: '',
            orderPrice: 1000,
            userUTXOs: [],
            systemStats: null,
            isLoading: true,
            error: null
        };
        
        this.initializeEngine();
    }

    async initializeEngine() {
        try {
            console.log('🚀 Trading Engine 초기화...');
            
            const engine = new TradingEngine();
            await engine.initialize();
            
            const validator = new ValidationModule(engine);
            await validator.validateSystem();
            
            const stats = engine.getSystemStats();
            
            this.setState({
                tradingEngine: engine,
                systemStats: stats,
                isLoading: false
            });
            
            console.log('✅ Trading Engine 준비 완료');
            
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
            this.setState({
                error: error.message,
                isLoading: false
            });
        }
    }

    async connectWallet() {
        const testUser = {
            name: '테스트 사용자',
            publicKey: '0xtest123',
            publicKeyHash: '0xtest123',
            privateKey: 'test_private_key'
        };
        
        const balance = this.state.tradingEngine.getBalance(testUser.publicKeyHash);
        const utxos = this.state.tradingEngine.utxoSet.getUTXOsByAddress(testUser.publicKeyHash);
        
        this.setState({
            currentUser: testUser,
            balance: balance,
            userUTXOs: utxos
        });
    }

    async executeTestTrade() {
        try {
            const { tradingEngine } = this.state;
            
            const response = await fetch('data/holders.json');
            const holders = await response.json();
            
            const aci = holders.holders.find(h => h.name === 'AI City Inc. (ACI)');
            const firstHolder = holders.holders[0];
            
            const sender = {
                name: aci.name,
                publicKeyHash: aci.publicKeyHash,
                publicKey: aci.publicKeyHash,
                privateKey: 'aci_private_key'
            };
            
            const receiver = {
                name: firstHolder.name,
                publicKeyHash: firstHolder.publicKeyHash,
                publicKey: firstHolder.publicKeyHash
            };
            
            console.log('\n💰 테스트 거래 실행 중...');
            const trade = await tradingEngine.executeTrade(sender, receiver, 1000);
            
            const stats = tradingEngine.getSystemStats();
            this.setState({ systemStats: stats });
            
            alert('✅ 테스트 거래 완료!\n거래 ID: ' + trade.transaction.txId.substring(0, 20) + '...');
            
        } catch (error) {
            alert('❌ 거래 실패: ' + error.message);
            console.error(error);
        }
    }

    render() {
        const { isLoading, error, systemStats, balance, currentUser } = this.state;
        
        if (isLoading) {
            return React.createElement('div', { 
                className: 'egct-trading-container',
                style: { padding: '40px', textAlign: 'center' }
            },
                React.createElement('div', { className: 'spinner' }),
                React.createElement('p', null, 'Trading Engine 로딩 중...')
            );
        }
        
        if (error) {
            return React.createElement('div', { 
                className: 'egct-trading-container',
                style: { padding: '40px' }
            },
                React.createElement('div', { className: 'error-box' },
                    React.createElement('h3', null, '❌ 오류 발생'),
                    React.createElement('p', null, error)
                )
            );
        }
        
        return React.createElement('div', { className: 'egct-trading-container' },
            // 헤더
            React.createElement('div', { className: 'trading-header' },
                React.createElement('h2', null, '🪙 EGCT 토큰 거래'),
                React.createElement('div', { className: 'header-stats' },
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('span', { className: 'label' }, '현재가'),
                        React.createElement('span', { className: 'value' }, '₩1,000')
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('span', { className: 'label' }, '24h 변동'),
                        React.createElement('span', { className: 'value positive' }, '+0.0%')
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('span', { className: 'label' }, '총 발행량'),
                        React.createElement('span', { className: 'value' }, '100,000,000 T')
                    )
                )
            ),
            
            // 지갑 연결
            !currentUser && React.createElement('div', { className: 'wallet-connect-section' },
                React.createElement('button', { 
                    className: 'connect-wallet-btn',
                    onClick: () => this.connectWallet()
                }, '🔗 지갑 연결'),
                React.createElement('p', { className: 'wallet-hint' }, 
                    '지갑을 연결하여 EGCT 토큰을 거래하세요'
                )
            ),
            
            // 지갑 정보
            currentUser && React.createElement('div', { className: 'wallet-info-section' },
                React.createElement('div', { className: 'wallet-balance' },
                    React.createElement('h3', null, '내 지갑'),
                    React.createElement('div', { className: 'balance-display' },
                        React.createElement('span', { className: 'balance-amount' }, 
                            balance.toLocaleString() + ' T'
                        ),
                        React.createElement('span', { className: 'balance-label' }, '사용 가능')
                    )
                ),
                React.createElement('div', { className: 'utxo-list' },
                    React.createElement('h4', null, `보유 UTXO (${this.state.userUTXOs.length}개)`),
                    ...this.state.userUTXOs.slice(0, 3).map((utxo, i) =>
                        React.createElement('div', { key: i, className: 'utxo-item' },
                            React.createElement('span', null, 
                                utxo.txId.substring(0, 10) + '...:' + utxo.index
                            ),
                            React.createElement('span', null, 
                                utxo.value.toLocaleString() + ' T'
                            )
                        )
                    )
                )
            ),
            
            // 거래 패널
            React.createElement('div', { className: 'trading-panel' },
                // 호가창
                React.createElement('div', { className: 'order-book' },
                    React.createElement('h3', null, '호가창'),
                    React.createElement('div', { className: 'order-header' },
                        React.createElement('span', null, '가격(KRW)'),
                        React.createElement('span', null, '수량(T)')
                    ),
                    React.createElement('div', { className: 'asks' },
                        React.createElement('div', { className: 'order-row ask' },
                            React.createElement('span', { className: 'price' }, '₩1,050'),
                            React.createElement('span', { className: 'amount' }, '500')
                        ),
                        React.createElement('div', { className: 'order-row ask' },
                            React.createElement('span', { className: 'price' }, '₩1,020'),
                            React.createElement('span', { className: 'amount' }, '1,000')
                        )
                    ),
                    React.createElement('div', { className: 'current-price' },
                        React.createElement('span', { className: 'price' }, '₩1,005'),
                        React.createElement('span', { className: 'label' }, '현재가')
                    ),
                    React.createElement('div', { className: 'bids' },
                        React.createElement('div', { className: 'order-row bid' },
                            React.createElement('span', { className: 'price' }, '₩1,000'),
                            React.createElement('span', { className: 'amount' }, '1,500')
                        ),
                        React.createElement('div', { className: 'order-row bid' },
                            React.createElement('span', { className: 'price' }, '₩995'),
                            React.createElement('span', { className: 'amount' }, '3,000')
                        )
                    )
                ),
                
                // 주문 폼
                React.createElement('div', { className: 'order-form' },
                    React.createElement('h3', null, '주문하기'),
                    React.createElement('div', { className: 'order-type-selector' },
                        React.createElement('button', {
                            className: this.state.orderType === 'buy' ? 'active buy' : 'buy',
                            onClick: () => this.setState({ orderType: 'buy' })
                        }, '매수'),
                        React.createElement('button', {
                            className: this.state.orderType === 'sell' ? 'active sell' : 'sell',
                            onClick: () => this.setState({ orderType: 'sell' })
                        }, '매도')
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', null, '수량 (T)'),
                        React.createElement('input', {
                            type: 'number',
                            value: this.state.orderAmount,
                            onChange: (e) => this.setState({ orderAmount: e.target.value }),
                            placeholder: '수량 입력'
                        })
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', null, '가격 (KRW)'),
                        React.createElement('input', {
                            type: 'number',
                            value: this.state.orderPrice,
                            onChange: (e) => this.setState({ orderPrice: e.target.value }),
                            placeholder: '가격 입력'
                        })
                    ),
                    React.createElement('button', {
                        className: `submit-order-btn ${this.state.orderType}`,
                        disabled: !currentUser || !this.state.orderAmount
                    }, this.state.orderType === 'buy' ? '매수 주문' : '매도 주문')
                ),
                
                // 거래 내역
                React.createElement('div', { className: 'trade-history' },
                    React.createElement('h3', null, '최근 거래'),
                    React.createElement('div', { className: 'history-header' },
                        React.createElement('span', null, '시간'),
                        React.createElement('span', null, '가격'),
                        React.createElement('span', null, '수량')
                    ),
                    React.createElement('div', { className: 'history-row' },
                        React.createElement('span', null, '14:23:15'),
                        React.createElement('span', { className: 'buy' }, '₩1,005'),
                        React.createElement('span', null, '1,000 T')
                    )
                )
            ),
            
            // 시스템 통계
            systemStats && React.createElement('div', { className: 'system-stats' },
                React.createElement('h3', null, '시스템 통계'),
                React.createElement('div', { className: 'stats-grid' },
                    React.createElement('div', { className: 'stat-card' },
                        React.createElement('div', { className: 'stat-value' }, systemStats.utxo.total),
                        React.createElement('div', { className: 'stat-label' }, '총 UTXO')
                    ),
                    React.createElement('div', { className: 'stat-card' },
                        React.createElement('div', { className: 'stat-value' }, systemStats.utxo.unspent),
                        React.createElement('div', { className: 'stat-label' }, '미사용 UTXO')
                    ),
                    React.createElement('div', { className: 'stat-card' },
                        React.createElement('div', { className: 'stat-value' }, systemStats.transactions.total),
                        React.createElement('div', { className: 'stat-label' }, '총 거래')
                    ),
                    React.createElement('div', { className: 'stat-card' },
                        React.createElement('div', { className: 'stat-value' }, 
                            systemStats.totalSupply.toLocaleString()
                        ),
                        React.createElement('div', { className: 'stat-label' }, '총 발행량 (T)')
                    )
                )
            ),
            
            // 테스트 버튼
            React.createElement('div', { className: 'test-section' },
                React.createElement('button', {
                    className: 'test-trade-btn',
                    onClick: () => this.executeTestTrade()
                }, '🧪 테스트 거래 실행'),
                React.createElement('p', { className: 'test-hint' },
                    'ACI → 첫 번째 보유자에게 1,000 T 전송 (테스트용)'
                )
            )
        );
    }
}
