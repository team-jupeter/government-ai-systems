/**
 * Transaction Manager
 * UTXO 기반 거래 생성 및 검증
 */
class Transaction {
    constructor() {
        this.txId = null;
        this.inputs = [];
        this.outputs = [];
        this.timestamp = Date.now();
        this.fee = 0;
        this.totalInput = 0;
        this.totalOutput = 0;
    }

    /**
     * 거래 생성
     */
    static create(sender, receiver, amount, utxoSet) {
        const tx = new Transaction();
        
        // 1. 발신자의 UTXO 선택
        const senderUTXOs = utxoSet.getUTXOsByAddress(sender.publicKeyHash);
        const { selectedUTXOs, total } = this.selectUTXOs(senderUTXOs, amount);
        
        if (total < amount) {
            throw new Error(`잔액 부족: ${total} T < ${amount} T`);
        }
        
        // 2. 입력 생성
        tx.inputs = selectedUTXOs.map(utxo => ({
            prevTxId: utxo.txId,
            prevIndex: utxo.index,
            scriptSig: this.createScriptSig(utxo, sender.privateKey),
            publicKey: sender.publicKey,
            value: utxo.value
        }));
        
        tx.totalInput = total;
        
        // 3. 출력 생성
        // 3-1. 수신자에게 전송
        tx.outputs.push({
            value: amount,
            scriptPubKey: receiver.publicKeyHash,
            owner: receiver.name
        });
        
        // 3-2. 거스름돈 (Change Output)
        const change = total - amount;
        if (change > 0) {
            tx.outputs.push({
                value: change,
                scriptPubKey: sender.publicKeyHash,
                owner: sender.name
            });
        }
        
        tx.totalOutput = amount + change;
        
        // 4. Transaction ID 생성
        tx.txId = this.generateTxId(tx);
        
        return tx;
    }

    /**
     * UTXO 선택 알고리즘 (탐욕 알고리즘)
     */
    static selectUTXOs(utxos, targetAmount) {
        // 큰 금액부터 선택
        const sorted = [...utxos].sort((a, b) => b.value - a.value);
        const selected = [];
        let total = 0;
        
        for (const utxo of sorted) {
            selected.push(utxo);
            total += utxo.value;
            
            if (total >= targetAmount) {
                break;
            }
        }
        
        return { selectedUTXOs: selected, total };
    }

    /**
     * Transaction ID 생성
     */
    static generateTxId(tx) {
        const data = JSON.stringify({
            inputs: tx.inputs,
            outputs: tx.outputs,
            timestamp: tx.timestamp
        });
        
        return '0x' + this.sha256(data);
    }

    /**
     * ScriptSig 생성 (서명)
     */
    static createScriptSig(utxo, privateKey) {
        const data = `${utxo.txId}:${utxo.index}:${utxo.value}`;
        return this.sign(data, privateKey);
    }

    /**
     * 거래 검증
     */
    static validate(tx, utxoSet) {
        // 1. 입력 검증
        for (const input of tx.inputs) {
            const utxo = utxoSet.getUTXO(input.prevTxId, input.prevIndex);
            
            // UTXO 존재 여부
            if (!utxo) {
                return { 
                    valid: false, 
                    error: `UTXO not found: ${input.prevTxId}:${input.prevIndex}` 
                };
            }
            
            // 이미 사용됐는지
            if (utxo.isSpent) {
                return { 
                    valid: false, 
                    error: `UTXO already spent: ${input.prevTxId}:${input.prevIndex}` 
                };
            }
            
            // 서명 검증
            if (!this.verifySignature(input, utxo)) {
                return { 
                    valid: false, 
                    error: 'Invalid signature' 
                };
            }
        }
        
        // 2. 입출력 합계 일치
        if (tx.totalInput !== tx.totalOutput) {
            return { 
                valid: false, 
                error: `Input/Output mismatch: ${tx.totalInput} ≠ ${tx.totalOutput}` 
            };
        }
        
        // 3. 이중 지불 방지
        const inputKeys = tx.inputs.map(i => `${i.prevTxId}:${i.prevIndex}`);
        const uniqueKeys = new Set(inputKeys);
        if (inputKeys.length !== uniqueKeys.size) {
            return { 
                valid: false, 
                error: 'Double spending detected' 
            };
        }
        
        return { valid: true };
    }

    /**
     * 서명 검증
     */
    static verifySignature(input, utxo) {
        const data = `${utxo.txId}:${utxo.index}:${utxo.value}`;
        return this.verify(data, input.scriptSig, input.publicKey);
    }

    /**
     * SHA256 해시 (간단한 구현)
     */
    static sha256(message) {
        // 실제로는 crypto-js 또는 Web Crypto API 사용
        let hash = 0;
        for (let i = 0; i < message.length; i++) {
            const char = message.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0');
    }

    /**
     * 서명 생성 (간단한 구현)
     */
    static sign(data, privateKey) {
        return this.sha256(data + privateKey);
    }

    /**
     * 서명 검증 (간단한 구현)
     */
    static verify(data, signature, publicKey) {
        const expectedSig = this.sha256(data + this.derivePrivateKey(publicKey));
        return signature === expectedSig;
    }

    /**
     * Private Key 유도 (임시)
     */
    static derivePrivateKey(publicKey) {
        return publicKey;
    }

    /**
     * JSON 직렬화
     */
    toJSON() {
        return {
            txId: this.txId,
            inputs: this.inputs,
            outputs: this.outputs,
            timestamp: this.timestamp,
            fee: this.fee,
            totalInput: this.totalInput,
            totalOutput: this.totalOutput
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Transaction;
}
