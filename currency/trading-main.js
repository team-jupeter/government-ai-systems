// 메인 컨트롤러
class TradingSystem {
    constructor() {
        this.auth = new TradingAuth();
        this.ui = new TradingUI();
        this.order = new TradingOrder();
        
        this.state = {
            currentUser: null,
            balance: 0,
            krwBalance: 0,
            orderType: 'buy',
            userUTXOs: []
        };
        
        this.init();
    }
    
    async init() {
        await this.auth.loadHolders();
        await this.order.loadInitialOrders();
        
        const user = this.auth.checkLogin();
        
        if (user) {
            this.state.currentUser = user;
            this.state.balance = parseInt(localStorage.getItem('egct_balance')) || 0;
            this.state.krwBalance = parseInt(localStorage.getItem('egct_krw')) || 0;
            this.state.userUTXOs = JSON.parse(localStorage.getItem('egct_utxos') || '[]');
            this.ui.showTradingScreen();
            this.render();
        } else {
            this.ui.showLoginScreen();
        }
    }
    
    login() {
        const publicKey = document.getElementById('loginPublicKey').value.trim();
        const phone = document.getElementById('loginPhone').value.trim();
        const city = document.getElementById('loginCity').value.trim();
        
        try {
            const user = this.auth.login(publicKey, phone, city);
            this.state.currentUser = user;
            this.state.balance = parseInt(localStorage.getItem('egct_balance')) || 0;
            this.state.krwBalance = parseInt(localStorage.getItem('egct_krw')) || 0;
            this.state.userUTXOs = JSON.parse(localStorage.getItem('egct_utxos') || '[]');
            alert(`✅ 로그인 성공!\n${user.name}님 환영합니다\n거래 시 표시명: ${user.displayName}`);
            this.ui.showTradingScreen();
            this.render();
        } catch (e) {
            alert(e.message);
        }
    }
    
    logout() {
        if (confirm('로그아웃 하시겠습니까?')) {
            this.auth.logout();
            this.state.currentUser = null;
            this.state.balance = 0;
            this.state.krwBalance = 0;
            this.state.userUTXOs = [];
            this.ui.showLoginScreen();
        }
    }
    
    render() {
        this.ui.renderWallet(this.state.balance, this.state.krwBalance);
        this.ui.renderOrderBook(this.order.orderBook);
        this.ui.renderRecentTrades(this.order.recentTrades);
        this.ui.renderUTXOs(this.state.userUTXOs);
    }
    
    setOrderType(type) {
        this.state.orderType = type;
        this.ui.setOrderType(type);
    }
    
    executeOrder() {
        if (this.state.orderType === 'buy') {
            this.executeBuy();
        } else {
            this.executeSell();
        }
    }
    
    executeBuy() {
        const amount = parseInt(document.getElementById('inputAmount').value);
        
        try {
            const result = this.order.executeBuy(
                amount, 
                this.state.balance, 
                this.state.krwBalance,
                this.state.currentUser?.displayName || this.state.currentUser?.name
            );
            
            this.state.balance = result.newBalance;
            this.state.krwBalance = result.newKrw;
            this.state.userUTXOs = [...this.state.userUTXOs, ...result.utxos];
            
            localStorage.setItem('egct_balance', this.state.balance);
            localStorage.setItem('egct_krw', this.state.krwBalance);
            localStorage.setItem('egct_utxos', JSON.stringify(this.state.userUTXOs));
            
            this.render();
            this.ui.showBuyModal(result.utxos, result.filledAmount, result.totalCost);
            document.getElementById('inputAmount').value = '';
        } catch (e) {
            alert(e.message);
        }
    }
    
    executeSell() {
        const amount = parseInt(document.getElementById('inputAmount').value);
        const price = parseInt(document.getElementById('inputPrice').value);
        
        try {
            const result = this.order.executeSell(
                amount, 
                price, 
                this.state.balance,
                this.state.currentUser?.displayName || this.state.currentUser?.name
            );
            
            this.state.balance = result.newBalance;
            
            localStorage.setItem('egct_balance', this.state.balance);
            
            this.render();
            this.ui.showSellModal(result.utxo);
            document.getElementById('inputAmount').value = '';
        } catch (e) {
            alert(e.message);
        }
    }
    
    closeModal() {
        this.ui.closeModal();
    }
}

const trading = new TradingSystem();
