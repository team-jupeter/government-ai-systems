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
            error: null,
            krwBalance: 10000000,
            orderBook: [],
            recentTrades: [],
            showP2PModal: false,
            p2pTransactions: []
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



    componentDidMount() {
        // 페이지 로드 시 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('egct_logged_in');
        const publicKey = localStorage.getItem('egct_public_key');
        const holderName = localStorage.getItem('egct_holder_name');
        const balance = parseInt(localStorage.getItem('egct_balance') || '0');
        
        // KRW 잔고 초기화
        if (!localStorage.getItem('egct_krw_balance')) {
            localStorage.setItem('egct_krw_balance', '10000000');
        }
        const krwBalance = parseInt(localStorage.getItem('egct_krw_balance') || '10000000');
        
        if (isLoggedIn === 'true' && publicKey) {
            // 로그인 상태 복원
            this.setState({
                currentUser: {
                    name: holderName || '익명',
                    publicKey: publicKey,
                    publicKeyHash: publicKey
                },
                balance: balance,
                krwBalance: krwBalance
            });
            console.log('✓ 로그인 상태 복원:', holderName, 'EGCT:', balance, 'KRW:', krwBalance);
        }
        
        // Order Book 로드
        this.loadOrderBook();
    }

    async connectWallet() {
        // 로그인 모달 열기
        if (typeof window.openLoginModal === 'function') {
            window.openLoginModal();
        } else {
            window.location.href = 'temp-login.html';
        }
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
            console.error('❌ 테스트 거래 실패:', error);
            alert('테스트 거래 실패: ' + error.message);
        }
    }

    logout() {
        if (confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('egct_logged_in');
            localStorage.removeItem('egct_public_key');
            localStorage.removeItem('egct_holder_name');
            localStorage.removeItem('egct_balance');
            
            this.setState({
                currentUser: null,
                balance: 0,
                userUTXOs: []
            });
            
            console.log('✓ 로그아웃 완료');
        }
    }

    loadOrderBook() {
        const orderBookData = localStorage.getItem('egct_order_book');
        const recentTradesData = localStorage.getItem('egct_recent_trades');
        
        if (orderBookData) {
            this.setState({ orderBook: JSON.parse(orderBookData) });
        } else {
            // 초기 더미 매도 주문 생성 (시뮬레이션용)
            const dummyOrders = [
                { seller: '김혜영', sellerKey: '0xdummy1', amount: 500, price: 1050, timestamp: '2025-12-08T06:00:00Z' },
                { seller: '전도환', sellerKey: '0xdummy2', amount: 1000, price: 1020, timestamp: '2025-12-08T06:05:00Z' },
                { seller: '안병모', sellerKey: '0xdummy3', amount: 1500, price: 1000, timestamp: '2025-12-08T06:10:00Z' },
                { seller: '이규선', sellerKey: '0xdummy4', amount: 3000, price: 1000, timestamp: '2025-12-08T06:15:00Z' },
                { seller: '박차장', sellerKey: '0xdummy5', amount: 2000, price: 995, timestamp: '2025-12-08T06:20:00Z' }
            ];
            this.setState({ orderBook: dummyOrders });
            localStorage.setItem('egct_order_book', JSON.stringify(dummyOrders));
            console.log('✓ 초기 매도 주문 생성:', dummyOrders.length + '건, 총 ' + 
                dummyOrders.reduce((sum, o) => sum + o.amount, 0).toLocaleString() + ' T');
        }
        
        if (recentTradesData) {
            this.setState({ recentTrades: JSON.parse(recentTradesData) });
        }
    }

    saveOrderBook() {
        localStorage.setItem('egct_order_book', JSON.stringify(this.state.orderBook));
        localStorage.setItem('egct_recent_trades', JSON.stringify(this.state.recentTrades));
    }

    placeSellOrder() {
        const { currentUser, balance, orderAmount, orderPrice } = this.state;
        
        if (!currentUser) {
            alert('로그인이 필요합니다.');
            return;
        }
        
        const amount = parseInt(orderAmount);
        const price = parseInt(orderPrice);
        
        if (!amount || amount <= 0) {
            alert('판매 수량을 입력하세요.');
            return;
        }
        
        if (balance < amount) {
            alert('EGCT 잔고가 부족합니다. (보유: ' + balance.toLocaleString() + ' T)');
            return;
        }
        
        const order = {
            seller: currentUser.name,
            sellerKey: currentUser.publicKey,
            amount: amount,
            price: price,
            timestamp: new Date().toISOString()
        };
        
        const newOrderBook = [...this.state.orderBook, order];
        const newBalance = balance - amount;
        
        localStorage.setItem('egct_balance', newBalance.toString());
        
        this.setState({
            orderBook: newOrderBook,
            balance: newBalance,
            orderAmount: '',
            orderPrice: 1000
        }, () => {
            this.saveOrderBook();
            alert('매도 주문 등록 완료!\n수량: ' + amount.toLocaleString() + ' T\n가격: ₩' + price.toLocaleString());
        });
    }

    executeBuyOrder() {
        const { currentUser, krwBalance, balance, orderAmount, orderBook } = this.state;
        
        if (!currentUser) {
            alert('로그인이 필요합니다.');
            return;
        }
        
        const buyAmount = parseInt(orderAmount);
        
        if (!buyAmount || buyAmount <= 0) {
            alert('구매 수량을 입력하세요.');
            return;
        }
        
        if (orderBook.length === 0) {
            alert('매도 주문이 없습니다.');
            return;
        }
        
        // 최저가 우선 정렬 (가격 오름차순, 시간 오름차순)
        const sortedOrders = [...orderBook].sort((a, b) => {
            if (a.price !== b.price) return a.price - b.price;
            return new Date(a.timestamp) - new Date(b.timestamp);
        });
        
        // 매수 가능한 총량 확인
        const totalAvailable = sortedOrders.reduce((sum, o) => sum + o.amount, 0);
        
        if (totalAvailable < buyAmount) {
            alert('매도 주문이 부족합니다.\n요청: ' + buyAmount.toLocaleString() + ' T\n가능: ' + totalAvailable.toLocaleString() + ' T');
            return;
        }
        
        // 총 비용 계산
        let remainingBuy = buyAmount;
        let totalCost = 0;
        
        for (const order of sortedOrders) {
            if (remainingBuy <= 0) break;
            
            const tradeAmount = Math.min(order.amount, remainingBuy);
            totalCost += tradeAmount * order.price;
            remainingBuy -= tradeAmount;
        }
        
        if (krwBalance < totalCost) {
            alert('현금 잔고가 부족합니다.\n필요: ₩' + totalCost.toLocaleString() + '\n보유: ₩' + krwBalance.toLocaleString());
            return;
        }
        
        // FIFO 매칭 및 P2P 거래 기록 생성
        remainingBuy = buyAmount;
        const updatedOrderBook = [];
        const p2pTransactions = [];
        
        for (const order of sortedOrders) {
            if (remainingBuy <= 0) {
                updatedOrderBook.push(order);
                continue;
            }
            
            if (order.amount <= remainingBuy) {
                // 전체 체결
                const txAmount = order.amount;
                const txCost = txAmount * order.price;
                
                p2pTransactions.push({
                    txId: 'TX' + Date.now() + Math.random().toString(36).substr(2, 9),
                    seller: order.seller,
                    buyer: currentUser.name,
                    amount: txAmount,
                    price: order.price,
                    totalCost: txCost,
                    timestamp: new Date().toISOString(),
                    type: 'full'
                });
                
                remainingBuy -= txAmount;
                // 주문 제거 (체결 완료)
            } else {
                // 부분 체결
                const txAmount = remainingBuy;
                const txCost = txAmount * order.price;
                
                p2pTransactions.push({
                    txId: 'TX' + Date.now() + Math.random().toString(36).substr(2, 9),
                    seller: order.seller,
                    buyer: currentUser.name,
                    amount: txAmount,
                    price: order.price,
                    totalCost: txCost,
                    timestamp: new Date().toISOString(),
                    type: 'partial',
                    remaining: order.amount - txAmount
                });
                
                // 잔량 업데이트
                updatedOrderBook.push({
                    ...order,
                    amount: order.amount - txAmount
                });
                
                remainingBuy = 0;
            }
        }
        
        // 잔고 업데이트
        const newKrwBalance = krwBalance - totalCost;
        const newEgctBalance = balance + buyAmount;
        
        localStorage.setItem('egct_krw_balance', newKrwBalance.toString());
        localStorage.setItem('egct_balance', newEgctBalance.toString());
        
        // 최근 거래 추가
        const newRecentTrades = [...p2pTransactions, ...this.state.recentTrades].slice(0, 10);
        
        this.setState({
            orderBook: updatedOrderBook,
            recentTrades: newRecentTrades,
            balance: newEgctBalance,
            krwBalance: newKrwBalance,
            orderAmount: '',
            showP2PModal: true,
            p2pTransactions: p2pTransactions
        }, () => {
            this.saveOrderBook();
        });
    }

    selectPrice(price) {
        this.setState({ orderPrice: price });
    }

    closeP2PModal() {
        this.setState({
            showP2PModal: false,
            p2pTransactions: []
        });
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
                    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                        React.createElement('h3', { style: { margin: 0 } }, '내 지갑'),
                        React.createElement('button', {
                            onClick: () => this.logout(),
                            style: {
                                padding: '8px 16px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600'
                            }
                        }, '🚪 로그아웃')
                    ),
                    React.createElement('div', { className: 'balance-display' },
                        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
                            React.createElement('div', null,
                                React.createElement('span', { style: { fontSize: '12px', color: '#666', marginRight: '10px' } }, 'EGCT'),
                                React.createElement('span', { className: 'balance-amount', style: { fontSize: '24px', fontWeight: '700' } }, 
                                    balance.toLocaleString() + ' T'
                                )
                            ),
                            React.createElement('div', null,
                                React.createElement('span', { style: { fontSize: '12px', color: '#666', marginRight: '10px' } }, 'KRW'),
                                React.createElement('span', { style: { fontSize: '20px', color: '#28a745', fontWeight: '700' } }, 
                                    '₩' + this.state.krwBalance.toLocaleString()
                                )
                            )
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
                        React.createElement('span', null, '수량(T)'),
                        React.createElement('span', null, '매도자')
                    ),
                    // 매도 주문 동적 렌더링
                    React.createElement('div', { className: 'asks' },
                        this.state.orderBook.length === 0 ? 
                            React.createElement('div', { style: { padding: '10px', textAlign: 'center', color: '#999' } }, '매도 주문 없음') :
                            [
                                ...this.state.orderBook
                                    .sort((a, b) => b.price - a.price)
                                    .map((order, i) =>
                                        React.createElement('div', { 
                                            key: i, 
                                            className: 'order-row ask',
                                            style: { cursor: 'pointer' },
                                            onClick: () => this.selectPrice(order.price)
                                        },
                                            React.createElement('span', { className: 'price' }, '₩' + order.price.toLocaleString()),
                                            React.createElement('span', { className: 'amount' }, order.amount.toLocaleString()),
                                            React.createElement('span', { className: 'seller', style: { fontSize: '12px', color: '#666' } }, 
                                                order.seller.substring(0, 2) + '**'
                                            )
                                        )
                                    ),
                                React.createElement('div', { 
                                    key: 'total',
                                    style: { padding: '10px', background: '#f0f0f0', fontWeight: 'bold', marginTop: '5px', borderTop: '2px solid #ddd' } 
                                },
                                    '💰 매도량 합계: ' + this.state.orderBook.reduce((sum, o) => sum + o.amount, 0).toLocaleString() + ' T'
                                )
                            ]
                    ),
                    React.createElement('div', { className: 'current-price' },
                        React.createElement('span', { className: 'price' }, '₩1,000'),
                        React.createElement('span', { className: 'label' }, '기준가')
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
                        disabled: !currentUser || !this.state.orderAmount,
                        onClick: () => this.state.orderType === 'buy' ? this.executeBuyOrder() : this.placeSellOrder()
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
            ,
            
            // P2P 거래 내역 Modal
            this.state.showP2PModal && React.createElement('div', {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000
                },
                onClick: () => this.closeP2PModal()
            },
                React.createElement('div', {
                    style: {
                        background: 'white',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                    },
                    onClick: (e) => e.stopPropagation()
                },
                    React.createElement('h2', { 
                        style: { marginBottom: '20px', color: '#004C9E', textAlign: 'center' } 
                    }, '🔗 P2P 거래 완료'),
                    
                    // 거래 요약
                    React.createElement('div', { 
                        style: { 
                            background: '#e7f3ff', 
                            padding: '20px', 
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            borderLeft: '4px solid #004C9E'
                        } 
                    },
                        React.createElement('h3', { style: { marginBottom: '10px', fontSize: '18px' } }, '📊 거래 요약'),
                        React.createElement('p', { style: { margin: '5px 0', fontSize: '14px' } }, 
                            '총 구매량: ' + this.state.p2pTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString() + ' T'
                        ),
                        React.createElement('p', { style: { margin: '5px 0', fontSize: '14px' } }, 
                            '총 금액: ₩' + this.state.p2pTransactions.reduce((sum, tx) => sum + tx.totalCost, 0).toLocaleString()
                        ),
                        React.createElement('p', { style: { margin: '5px 0', fontSize: '14px' } }, 
                            '거래 건수: ' + this.state.p2pTransactions.length + '건'
                        )
                    ),
                    
                    // 매수자 장부
                    React.createElement('div', { 
                        style: { 
                            background: '#d4edda', 
                            padding: '20px', 
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            border: '2px solid #28a745'
                        } 
                    },
                        React.createElement('h3', { style: { marginBottom: '10px', color: '#155724', fontSize: '18px' } }, 
                            '💰 ' + this.state.currentUser.name + ' (매수자)'
                        ),
                        React.createElement('div', { style: { fontSize: '14px' } },
                            React.createElement('p', { style: { margin: '8px 0' } }, 
                                '🪙 EGCT: +' + this.state.p2pTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString() + ' T → 현재 ' + 
                                this.state.balance.toLocaleString() + ' T'
                            ),
                            React.createElement('p', { style: { margin: '8px 0' } }, 
                                '💵 KRW: -₩' + this.state.p2pTransactions.reduce((sum, tx) => sum + tx.totalCost, 0).toLocaleString() + ' → 현재 ₩' + 
                                this.state.krwBalance.toLocaleString()
                            )
                        )
                    ),
                    
                    // 매도자 거래 내역
                    React.createElement('h3', { style: { margin: '20px 0 10px 0', fontSize: '18px' } }, '📝 매도자 거래 내역'),
                    ...this.state.p2pTransactions.map((tx, i) =>
                        React.createElement('div', {
                            key: i,
                            style: {
                                background: '#fff3cd',
                                padding: '15px',
                                borderRadius: '8px',
                                marginBottom: '10px',
                                border: '1px solid #ffc107'
                            }
                        },
                            React.createElement('div', { style: { fontWeight: 'bold', marginBottom: '8px', color: '#856404', fontSize: '16px' } },
                                '🏪 ' + tx.seller + ' (매도자)'
                            ),
                            React.createElement('div', { style: { fontSize: '13px' } },
                                React.createElement('p', { style: { margin: '5px 0' } }, 
                                    '거래량: ' + tx.amount.toLocaleString() + ' T @ ₩' + tx.price.toLocaleString()
                                ),
                                React.createElement('p', { style: { margin: '5px 0' } }, 
                                    '거래 금액: ₩' + tx.totalCost.toLocaleString()
                                ),
                                React.createElement('p', { style: { margin: '5px 0' } }, 
                                    '🪙 EGCT: -' + tx.amount.toLocaleString() + ' T'
                                ),
                                React.createElement('p', { style: { margin: '5px 0' } }, 
                                    '💵 KRW: +₩' + tx.totalCost.toLocaleString()
                                ),
                                tx.type === 'partial' && React.createElement('p', { 
                                    style: { margin: '5px 0', color: '#dc3545', fontWeight: 'bold' } 
                                }, 
                                    '잔량: ' + tx.remaining.toLocaleString() + ' T'
                                ),
                                React.createElement('p', { style: { margin: '5px 0', fontSize: '11px', color: '#666' } }, 
                                    'TX ID: ' + tx.txId
                                )
                            )
                        )
                    ),
                    
                    React.createElement('div', {
                        style: { textAlign: 'center', marginTop: '30px' }
                    },
                        React.createElement('button', {
                            onClick: () => this.closeP2PModal(),
                            style: {
                                padding: '12px 40px',
                                background: '#004C9E',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '600'
                            }
                        }, '✅ 확인')
                    )
                )
            ))
        );
    }

}