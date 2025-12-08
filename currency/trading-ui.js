// UI 렌더링 모듈
class TradingUI {
    showLoginScreen() {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('tradingScreen').classList.add('hidden');
    }
    
    showTradingScreen() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('tradingScreen').classList.remove('hidden');
    }
    
    renderWallet(balance, krwBalance) {
        document.getElementById('walletBalance').innerHTML = `
            <div style="font-size: 32px; font-weight: 700; color: #004C9E; margin: 10px 0;">
                ${balance.toLocaleString()} T
            </div>
            <div style="font-size: 18px; font-weight: 600; color: #28a745; margin: 10px 0;">
                ₩${krwBalance.toLocaleString()}
            </div>
        `;
    }
    
    renderUTXOs(utxos) {
        const container = document.querySelector('.top-grid .panel:nth-child(2)');
        const count = utxos.length;
        
        container.innerHTML = `
            <h3>보유 UTXO (${count}개)</h3>
            ${count === 0 ? 
                '<div style="text-align:center;color:#999;padding:40px;">보유 UTXO가 없습니다</div>' :
                `<div style="max-height: 200px; overflow-y: auto;">
                    ${utxos.map((utxo, i) => `
                        <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 6px; padding: 12px; margin-bottom: 8px; font-size: 12px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                <span style="font-weight: 700; color: #004C9E;">UTXO #${i + 1}</span>
                                <span style="color: #28a745; font-weight: 600;">${utxo.amount.toLocaleString()} T</span>
                            </div>
                            <div style="color: #666; margin-bottom: 4px;">
                                <strong>From:</strong> ${utxo.from}
                            </div>
                            <div style="color: #666; margin-bottom: 4px;">
                                <strong>Price:</strong> ₩${utxo.price.toLocaleString()}
                            </div>
                            <div style="color: #888; font-size: 11px;">
                                ${new Date(utxo.timestamp).toLocaleString('ko-KR')}
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        `;
    }
    
    renderOrderBook(orderBook) {
        const totalAmount = orderBook.reduce((sum, o) => sum + o.amount, 0);
        
        document.getElementById('orderBook').innerHTML = orderBook.map(o => 
            `<div class="order-item" style="display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center; padding: 10px 0; border-bottom: 1px solid #eee;">
                <span style="color: #555; font-weight: 500;">${o.seller}</span>
                <span style="color: #dc3545; font-weight: 600;">₩${o.price.toLocaleString()}</span>
                <span style="font-weight: 500;">${o.amount.toLocaleString()} T</span>
            </div>`
        ).join('');
        
        document.querySelector('.current-price').innerHTML = `
            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 15px; border-radius: 8px; margin-top: 15px;">
                <div style="font-size: 12px; color: #666; margin-bottom: 8px; font-weight: 600;">📊 총 매도량</div>
                <div style="font-size: 28px; font-weight: 700; color: #004C9E;">${totalAmount.toLocaleString()} T</div>
                <div style="font-size: 12px; color: #888; margin-top: 5px;">${orderBook.length}건의 매도 주문</div>
            </div>
        `;
    }
    
    renderRecentTrades(trades) {
        document.getElementById('recentTrades').innerHTML = 
            trades.length === 0 ? 
            '<div style="text-align:center;color:#999;padding:20px;">거래 내역 없음</div>' :
            trades.slice(0, 10).map(t => 
                `<div class="trade-item" style="display: flex; justify-content: space-between;">
                    <span>${new Date(t.timestamp).toLocaleTimeString('ko-KR')}</span>
                    <span style="color: #004C9E; font-weight: 600;">₩${t.price.toLocaleString()}</span>
                    <span>${t.amount.toLocaleString()} T</span>
                </div>`
            ).join('');
    }
    
    setOrderType(type) {
        const inputPrice = document.getElementById('inputPrice');
        const btnBuy = document.getElementById('btnBuy');
        const btnSell = document.getElementById('btnSell');
        const btnSubmit = document.querySelector('.bottom-grid .panel:nth-child(2) button[onclick*="executeOrder"]');
        
        if (type === 'buy') {
            btnBuy.className = 'btn btn-primary';
            btnSell.className = 'btn btn-secondary';
            inputPrice.disabled = true;
            btnSubmit.textContent = '매수 주문';
            btnSubmit.className = 'btn btn-primary';
            btnSubmit.style.width = '100%';
        } else {
            btnBuy.className = 'btn btn-secondary';
            btnSell.className = 'btn btn-primary';
            inputPrice.disabled = false;
            btnSubmit.textContent = '매도 주문';
            btnSubmit.className = 'btn btn-danger';
            btnSubmit.style.width = '100%';
        }
    }
    
    showBuyModal(utxos, totalAmount, totalValue) {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = '✅ 매수 거래 체결';
        
        modalBody.innerHTML = `
            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 5px solid #004C9E;">
                <div style="font-size: 14px; color: #555; margin-bottom: 10px; font-weight: 600;">💰 거래 요약</div>
                <div style="font-size: 36px; font-weight: 700; color: #004C9E; letter-spacing: -1px;">${totalAmount.toLocaleString()} T</div>
                <div style="font-size: 16px; color: #555; margin-top: 8px;">총 결제액: ₩${totalValue.toLocaleString()}</div>
            </div>
            
            <div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 16px;">📋 UTXO 거래 내역</div>
            ${utxos.map((utxo, i) => `
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 18px; margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 2px solid #dee2e6;">
                        <span style="font-weight: 700; color: #004C9E; font-size: 15px;">UTXO #${i + 1}</span>
                        <span style="color: #666; font-size: 13px;">${new Date(utxo.timestamp).toLocaleString('ko-KR')}</span>
                    </div>
                    <div style="font-size: 14px; line-height: 1.8;">
                        <div style="margin-bottom: 6px;"><strong>TxID:</strong> <span style="color: #666; font-family: monospace; font-size: 12px;">${utxo.txid}</span></div>
                        <div style="margin-bottom: 6px;"><strong>From:</strong> ${utxo.from}</div>
                        <div style="margin-bottom: 6px;"><strong>To:</strong> ${utxo.to}</div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #dee2e6;">
                            <div><strong>Amount:</strong> ${utxo.amount.toLocaleString()} T</div>
                            <div><strong>Price:</strong> ₩${utxo.price.toLocaleString()}</div>
                        </div>
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #dee2e6; font-size: 15px;">
                            <strong>Value:</strong> <span style="color: #004C9E; font-weight: 700;">₩${utxo.value.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
            
            <div style="background: #e8f5e9; padding: 14px; border-radius: 8px; margin-top: 20px; font-size: 14px; color: #2e7d32; line-height: 1.6;">
                ✓ ${utxos.length}개의 UTXO가 생성되었습니다<br>
                ✓ 거래가 블록체인에 기록되었습니다
            </div>
        `;
        
        document.getElementById('modal').classList.add('show');
    }
    
    showSellModal(utxo) {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = '📤 매도 주문 등록';
        
        modalBody.innerHTML = `
            <div style="background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); padding: 24px; border-radius: 8px; margin-bottom: 24px; border-left: 5px solid #dc3545;">
                <div style="font-size: 14px; color: #555; margin-bottom: 10px; font-weight: 600;">📤 매도 주문</div>
                <div style="font-size: 36px; font-weight: 700; color: #dc3545; letter-spacing: -1px;">${utxo.amount.toLocaleString()} T</div>
                <div style="font-size: 16px; color: #555; margin-top: 8px;">호가: ₩${utxo.price.toLocaleString()}</div>
            </div>
            
            <div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 16px;">📋 UTXO 거래 내역</div>
            <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 18px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 2px solid #dee2e6;">
                    <span style="font-weight: 700; color: #dc3545; font-size: 15px;">매도 UTXO</span>
                    <span style="color: #666; font-size: 13px;">${new Date(utxo.timestamp).toLocaleString('ko-KR')}</span>
                </div>
                <div style="font-size: 14px; line-height: 1.8;">
                    <div style="margin-bottom: 6px;"><strong>TxID:</strong> <span style="color: #666; font-family: monospace; font-size: 12px;">${utxo.txid}</span></div>
                    <div style="margin-bottom: 6px;"><strong>From:</strong> ${utxo.from}</div>
                    <div style="margin-bottom: 6px;"><strong>To:</strong> ${utxo.to}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #dee2e6;">
                        <div><strong>Amount:</strong> ${utxo.amount.toLocaleString()} T</div>
                        <div><strong>Price:</strong> ₩${utxo.price.toLocaleString()}</div>
                    </div>
                    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #dee2e6; font-size: 15px;">
                        <strong>Expected:</strong> <span style="color: #dc3545; font-weight: 700;">₩${utxo.value.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div style="background: #fff3e0; padding: 14px; border-radius: 8px; margin-top: 20px; font-size: 14px; color: #e65100; line-height: 1.6;">
                ✓ 매도 주문이 호가창에 등록되었습니다<br>
                ✓ 매수자가 나타나면 자동으로 체결됩니다
            </div>
        `;
        
        document.getElementById('modal').classList.add('show');
    }
    
    closeModal() {
        document.getElementById('modal').classList.remove('show');
    }
}
