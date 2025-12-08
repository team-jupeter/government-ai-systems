/**
 * EGCT Trading - 최소 버전
 */
class EGCTTrading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: { name: '정재효', publicKey: '0x123' },
            balance: 800,
            krwBalance: 6090000,
            orderType: 'buy',
            orderAmount: '',
            orderPrice: 1000,
            orderBook: [
                { seller: '김혜영', amount: 500, price: 1050, timestamp: new Date().toISOString() },
                { seller: '전도환', amount: 1000, price: 1020, timestamp: new Date().toISOString() },
                { seller: '안병모', amount: 1500, price: 1000, timestamp: new Date().toISOString() },
                { seller: '이규선', amount: 3000, price: 1000, timestamp: new Date().toISOString() },
                { seller: '박차장', amount: 2000, price: 995, timestamp: new Date().toISOString() }
            ],
            recentTrades: [
                { amount: 1000, price: 1005, timestamp: new Date(Date.now() - 60000).toISOString() },
                { amount: 900, price: 1000, timestamp: new Date(Date.now() - 120000).toISOString() },
                { amount: 800, price: 1000, timestamp: new Date(Date.now() - 180000).toISOString() },
                { amount: 700, price: 1010, timestamp: new Date(Date.now() - 240000).toISOString() },
                { amount: 600, price: 1015, timestamp: new Date(Date.now() - 300000).toISOString() }
            ],
            showModal: false,
            transactions: []
        };
        
        console.log('✅ EGCT Trading 초기화 완료');
    }
    
    componentDidMount() {
        // localStorage에서 데이터 복원
        const savedUser = localStorage.getItem('egct_current_user');
        const savedBalance = localStorage.getItem('egct_balance');
        const savedKrw = localStorage.getItem('egct_krw_balance');
        const savedBook = localStorage.getItem('egct_order_book');
        const savedTrades = localStorage.getItem('egct_recent_trades');
        
        if (savedUser) {
            this.setState({
                currentUser: JSON.parse(savedUser),
                balance: parseInt(savedBalance) || 800,
                krwBalance: parseInt(savedKrw) || 6090000
            });
            console.log('✓ 로그인 상태 복원');
        }
        
        if (savedBook) {
            this.setState({ orderBook: JSON.parse(savedBook) });
            console.log('✓ 호가장 복원');
        }
        
        if (savedTrades) {
            this.setState({ recentTrades: JSON.parse(savedTrades) });
            console.log('✓ 거래내역 복원');
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('egct_current_user', JSON.stringify(this.state.currentUser));
        localStorage.setItem('egct_balance', this.state.balance);
        localStorage.setItem('egct_krw_balance', this.state.krwBalance);
        localStorage.setItem('egct_order_book', JSON.stringify(this.state.orderBook));
        localStorage.setItem('egct_recent_trades', JSON.stringify(this.state.recentTrades));
    }
    
    getInitials(name) {
        const chosung = ['g', 'kk', 'n', 'd', 'dd', 'r', 'm', 'b', 'bb', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
        const initials = [];
        for (let char of name) {
            const code = char.charCodeAt(0);
            if (code >= 0xAC00 && code <= 0xD7A3) {
                const idx = Math.floor((code - 0xAC00) / 28 / 21);
                if (chosung[idx]) initials.push(chosung[idx]);
            }
        }
        return initials.join('.') || '???';
    }
    
    executeBuy() {
        const amount = parseInt(this.state.orderAmount);
        if (!amount) {
            alert('수량을 입력하세요');
            return;
        }
        
        const sorted = [...this.state.orderBook].sort((a, b) => a.price - b.price);
        let remaining = amount;
        const txs = [];
        const newBook = [];
        
        for (let order of sorted) {
            if (remaining <= 0) {
                newBook.push(order);
                continue;
            }
            
            const fill = Math.min(remaining, order.amount);
            txs.push({
                seller: order.seller,
                amount: fill,
                price: order.price,
                cost: fill * order.price
            });
            
            remaining -= fill;
            if (fill < order.amount) {
                newBook.push({ ...order, amount: order.amount - fill });
            }
        }
        
        const totalAmount = txs.reduce((s, t) => s + t.amount, 0);
        const totalCost = txs.reduce((s, t) => s + t.cost, 0);
        
        const newBalance = this.state.balance + totalAmount;
        const newKrwBalance = this.state.krwBalance - totalCost;
        const newRecentTrades = [{ amount: totalAmount, price: Math.round(totalCost / totalAmount), timestamp: new Date().toISOString() }, ...this.state.recentTrades].slice(0, 10);
        
        this.setState({
            orderBook: newBook,
            balance: newBalance,
            krwBalance: newKrwBalance,
            recentTrades: newRecentTrades,
            transactions: txs,
            showModal: true,
            orderAmount: ''
        }, () => {
            // setState 완료 후 저장
            this.saveToLocalStorage();
            console.log('✅ 거래 완료:', totalAmount, 'T, 잔고:', newBalance, 'T');
        });
    }
    
    render() {
        const { currentUser, balance, krwBalance, orderType, orderAmount, orderPrice, orderBook, recentTrades, showModal, transactions } = this.state;
        
        console.log('🎨 render - orderType:', orderType);
        
        return React.createElement('div', { style: { padding: '20px', fontFamily: 'sans-serif' } },
            React.createElement('h2', null, '🪙 EGCT 토큰 거래'),
            React.createElement('div', { style: { marginBottom: '10px' } }, 
                `${currentUser.name} | EGCT: ${balance.toLocaleString()} T | KRW: ₩${krwBalance.toLocaleString()}`
            ),
            
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px' } },
                
                // 호가창
                React.createElement('div', { style: { background: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' } },
                    React.createElement('h3', null, '호가창'),
                    orderBook.map((o, i) =>
                        React.createElement('div', { key: i, style: { padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' } },
                            React.createElement('span', { style: { color: 'red' } }, '₩' + o.price.toLocaleString()),
                            React.createElement('span', null, o.amount.toLocaleString() + 'T'),
                            React.createElement('span', null, this.getInitials(o.seller))
                        )
                    )
                ),
                
                // 주문
                React.createElement('div', { style: { background: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' } },
                    React.createElement('h3', null, '주문하기'),
                    
                    React.createElement('div', { style: { display: 'flex', gap: '10px', marginBottom: '15px' } },
                        React.createElement('button', {
                            onClick: () => this.setState({ orderType: 'buy' }),
                            style: {
                                flex: 1,
                                padding: '10px',
                                background: orderType === 'buy' ? '#004C9E' : '#fff',
                                color: orderType === 'buy' ? '#fff' : '#333',
                                border: '1px solid #004C9E',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }
                        }, '매수'),
                        React.createElement('button', {
                            onClick: () => this.setState({ orderType: 'sell' }),
                            style: {
                                flex: 1,
                                padding: '10px',
                                background: orderType === 'sell' ? '#dc3545' : '#fff',
                                color: orderType === 'sell' ? '#fff' : '#333',
                                border: '1px solid #dc3545',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }
                        }, '매도')
                    ),
                    
                    React.createElement('div', { style: { marginBottom: '15px' } },
                        React.createElement('label', { style: { display: 'block', marginBottom: '5px' } }, '수량 (T)'),
                        React.createElement('input', {
                            type: 'number',
                            value: orderAmount,
                            onChange: (e) => this.setState({ orderAmount: e.target.value }),
                            placeholder: '수량 입력',
                            style: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }
                        })
                    ),
                    
                    React.createElement('div', { style: { marginBottom: '15px' } },
                        React.createElement('label', { style: { display: 'block', marginBottom: '5px' } }, '가격 (KRW)'),
                        React.createElement('input', {
                            type: 'number',
                            value: orderPrice,
                            onChange: (e) => this.setState({ orderPrice: e.target.value }),
                            disabled: orderType === 'buy',
                            style: {
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                background: orderType === 'buy' ? '#e9ecef' : '#fff',
                                cursor: orderType === 'buy' ? 'not-allowed' : 'text'
                            }
                        })
                    ),
                    
                    React.createElement('button', {
                        onClick: () => this.executeBuy(),
                        disabled: !orderAmount,
                        style: {
                            width: '100%',
                            padding: '12px',
                            background: '#004C9E',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: orderAmount ? 'pointer' : 'not-allowed',
                            fontWeight: '600'
                        }
                    }, '매수 주문')
                ),
                
                // 최근 거래
                React.createElement('div', { style: { background: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' } },
                    React.createElement('h3', null, '최근 거래'),
                    recentTrades.map((t, i) =>
                        React.createElement('div', { key: i, style: { padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '13px' } },
                            new Date(t.timestamp).toLocaleTimeString('ko-KR') + ' | ₩' + t.price.toLocaleString() + ' | ' + t.amount + 'T'
                        )
                    )
                )
            ),
            
            // Modal
            showModal && React.createElement('div', {
                onClick: () => this.setState({ showModal: false }),
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000
                }
            },
                React.createElement('div', {
                    onClick: (e) => e.stopPropagation(),
                    style: {
                        background: '#fff',
                        padding: '30px',
                        borderRadius: '8px',
                        maxWidth: '500px',
                        width: '90%'
                    }
                },
                    React.createElement('h2', { style: { marginTop: 0, color: '#004C9E' } }, '✅ 거래 완료'),
                    React.createElement('div', { style: { marginBottom: '20px' } },
                        `총 ${transactions.reduce((s, t) => s + t.amount, 0).toLocaleString()} T 매수`
                    ),
                    transactions.map((tx, i) =>
                        React.createElement('div', { key: i, style: { padding: '10px', background: '#f8f9fa', marginBottom: '10px', borderRadius: '4px' } },
                            `${this.getInitials(tx.seller)} → ${tx.amount.toLocaleString()}T @ ₩${tx.price.toLocaleString()}`
                        )
                    ),
                    React.createElement('button', {
                        onClick: () => this.setState({ showModal: false }),
                        style: {
                            marginTop: '20px',
                            padding: '10px 30px',
                            background: '#004C9E',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }
                    }, '확인')
                )
            )
        );
    }
}

window.EGCTTrading = EGCTTrading;
