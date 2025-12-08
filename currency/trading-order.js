// 주문 처리 모듈
class TradingOrder {
    constructor() {
        this.orderBook = [];
        this.recentTrades = [];
        this.loadInitialOrders();
    }
    
    async loadInitialOrders() {
        try {
            const response = await fetch('trading-initial-data.json');
            const data = await response.json();
            this.orderBook = data.orders || [];
            console.log('✅ 초기 호가창 로드:', this.orderBook.length, '개');
        } catch (e) {
            console.error('초기 호가창 로드 실패, 기본값 사용');
            this.orderBook = [
                { seller: 'USER_09', price: 995, amount: 3000 },
                { seller: 'USER_01', price: 1000, amount: 1500 },
                { seller: 'USER_07', price: 1020, amount: 1000 },
                { seller: 'USER_06', price: 1050, amount: 500 }
            ];
        }
    }
    
    generateTxId() {
        return 'tx_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }
    
    executeBuy(amount, balance, krwBalance, userName) {
        if (!amount) throw new Error('수량을 입력하세요');
        
        const sorted = [...this.orderBook].sort((a, b) => a.price - b.price);
        let remaining = amount;
        const utxos = [];
        const newBook = [];
        
        for (let order of sorted) {
            if (remaining <= 0) {
                newBook.push(order);
                continue;
            }
            const fill = Math.min(remaining, order.amount);
            
            // UTXO 생성 (실제 판매자)
            utxos.push({
                txid: this.generateTxId(),
                from: order.seller,
                to: userName || '사용자',
                amount: fill,
                price: order.price,
                value: fill * order.price,
                timestamp: Date.now()
            });
            
            remaining -= fill;
            if (fill < order.amount) {
                newBook.push({ ...order, amount: order.amount - fill });
            }
        }
        
        const filledAmount = amount - remaining;
        if (filledAmount === 0) throw new Error('매칭 가능한 주문 없음');
        
        const totalCost = utxos.reduce((sum, u) => sum + u.value, 0);
        
        this.orderBook = newBook;
        this.recentTrades = [
            { amount: filledAmount, price: Math.round(totalCost / filledAmount), timestamp: new Date().toISOString() },
            ...this.recentTrades
        ].slice(0, 10);
        
        return {
            utxos: utxos,
            filledAmount: filledAmount,
            totalCost: totalCost,
            newBalance: balance + filledAmount,
            newKrw: krwBalance - totalCost
        };
    }
    
    executeSell(amount, price, balance, userName) {
        if (!amount) throw new Error('수량을 입력하세요');
        if (balance < amount) throw new Error('잔액 부족');
        
        // UTXO 생성
        const utxo = {
            txid: this.generateTxId(),
            from: userName || '사용자',
            to: '호가장 대기',
            amount: amount,
            price: price,
            value: amount * price,
            timestamp: Date.now()
        };
        
        this.orderBook.push({ seller: userName, price: price, amount: amount });
        
        return {
            utxo: utxo,
            newBalance: balance - amount
        };
    }
}
