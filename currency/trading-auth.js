// 인증 관련 모듈
class TradingAuth {
    constructor() {
        this.holders = [];
        this.userIdCounter = 1;
    }
    
    async loadHolders() {
        try {
            const response = await fetch('data/holders.json');
            const data = await response.json();
            this.holders = data.holders || [];
            console.log('✅ holders.json 로드:', this.holders.length, '명');
        } catch (e) {
            console.error('❌ holders.json 로드 실패:', e);
            this.holders = [];
        }
    }
    
    checkLogin() {
        const user = localStorage.getItem('egct_user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
    
    login(publicKey, phone, city) {
        if (!publicKey) {
            throw new Error('Public Key를 입력하세요');
        }
        
        let holder = this.holders.find(h => h.publicKey === publicKey);
        
        if (!holder && phone && city) {
            holder = this.holders.find(h => h.phone_prefix === phone && h.city === city);
        }
        
        if (!holder && publicKey.length >= 10) {
            holder = this.holders.find(h => h.publicKey && h.publicKey.startsWith(publicKey.substring(0, 10)));
        }
        
        if (!holder) {
            throw new Error('인증 실패: 유효한 Public Key가 아닙니다');
        }
        
        const userId = holder.id || 'USER_' + String(this.userIdCounter++).padStart(2, '0');
        
        const user = {
            id: holder.id,
            name: holder.id,
            displayName: userId,
            publicKey: holder.publicKey,
            email: holder.email
        };
        
        localStorage.setItem('egct_user', JSON.stringify(user));
        localStorage.setItem('egct_balance', holder.balance || 0);
        localStorage.setItem('egct_krw', 10000000);
        
        return user;
    }
    
    logout() {
        localStorage.clear();
    }
}
