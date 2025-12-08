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
        var el = document.getElementById('walletBalance');
        if (el) {
            el.innerHTML = 
                '<div style="font-size:var(--font-xxl);font-weight:700;color:var(--primary);">' + balance.toLocaleString() + ' T</div>' +
                '<div style="font-size:var(--font-lg);font-weight:600;color:var(--success);margin-top:var(--space-sm);">₩' + krwBalance.toLocaleString() + '</div>';
        }
    }
    
    renderUTXOs(utxos) {
        var container = document.getElementById('utxoContainer');
        if (!container) {
            var cards = document.querySelectorAll('.grid-2 .card');
            if (cards.length >= 2) {
                container = cards[1].querySelector('.card-body');
            }
        }
        if (!container) return;
        
        var count = utxos.length;
        var headerEl = container.parentElement.querySelector('.card-header h3');
        if (headerEl) {
            headerEl.innerHTML = '<i class="fas fa-cubes"></i> 보유 UTXO (' + count + '개)';
        }
        
        if (count === 0) {
            container.innerHTML = '<div style="text-align:center;color:var(--gray-400);padding:var(--space-xl);">보유 UTXO가 없습니다</div>';
        } else {
            var html = '<div style="max-height:200px;overflow-y:auto;">';
            for (var i = 0; i < utxos.length; i++) {
                var utxo = utxos[i];
                html += '<div style="background:var(--gray-100);border:1px solid var(--gray-200);border-radius:var(--radius-sm);padding:var(--space-md);margin-bottom:var(--space-sm);font-size:var(--font-sm);">';
                html += '<div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs);">';
                html += '<span style="font-weight:600;color:var(--primary);">UTXO #' + (i + 1) + '</span>';
                html += '<span style="color:var(--success);font-weight:600;">' + utxo.amount.toLocaleString() + ' T</span>';
                html += '</div>';
                html += '<div style="color:var(--gray-600);"><strong>From:</strong> ' + utxo.from + '</div>';
                html += '<div style="color:var(--gray-600);"><strong>Price:</strong> ₩' + utxo.price.toLocaleString() + '</div>';
                html += '<div style="color:var(--gray-500);font-size:var(--font-xs);">' + new Date(utxo.timestamp).toLocaleString('ko-KR') + '</div>';
                html += '</div>';
            }
            html += '</div>';
            container.innerHTML = html;
        }
    }
    
    renderOrderBook(orderBook) {
        var el = document.getElementById('orderBook');
        if (!el) return;
        
        var totalAmount = 0;
        for (var i = 0; i < orderBook.length; i++) {
            totalAmount += orderBook[i].amount;
        }
        
        var html = '';
        for (var i = 0; i < orderBook.length; i++) {
            var o = orderBook[i];
            html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center;padding:var(--space-sm) 0;border-bottom:1px solid var(--gray-200);">';
            html += '<span style="color:var(--gray-600);font-weight:500;">' + o.seller + '</span>';
            html += '<span style="color:var(--danger);font-weight:600;">₩' + o.price.toLocaleString() + '</span>';
            html += '<span style="font-weight:500;">' + o.amount.toLocaleString() + ' T</span>';
            html += '</div>';
        }
        el.innerHTML = html;
        
        var priceEl = document.querySelector('.current-price');
        if (priceEl) {
            priceEl.innerHTML = 
                '<div style="font-size:var(--font-sm);color:var(--gray-500);margin-bottom:var(--space-xs);">총 매도량</div>' +
                '<div style="font-size:var(--font-xl);font-weight:700;color:var(--primary);">' + totalAmount.toLocaleString() + ' T</div>' +
                '<div style="font-size:var(--font-xs);color:var(--gray-500);margin-top:var(--space-xs);">' + orderBook.length + '건의 매도 주문</div>';
        }
    }
    
    renderRecentTrades(trades) {
        var el = document.getElementById('recentTrades');
        if (!el) return;
        
        if (trades.length === 0) {
            el.innerHTML = '<div style="text-align:center;color:var(--gray-400);padding:var(--space-lg);">거래 내역 없음</div>';
        } else {
            var html = '';
            var len = Math.min(trades.length, 10);
            for (var i = 0; i < len; i++) {
                var t = trades[i];
                html += '<div style="display:flex;justify-content:space-between;padding:var(--space-sm) 0;border-bottom:1px solid var(--gray-200);font-size:var(--font-sm);">';
                html += '<span>' + new Date(t.timestamp).toLocaleTimeString('ko-KR') + '</span>';
                html += '<span style="color:var(--primary);font-weight:600;">₩' + t.price.toLocaleString() + '</span>';
                html += '<span>' + t.amount.toLocaleString() + ' T</span>';
                html += '</div>';
            }
            el.innerHTML = html;
        }
    }
    
    setOrderType(type) {
        var inputPrice = document.getElementById('inputPrice');
        var btnBuy = document.getElementById('btnBuy');
        var btnSell = document.getElementById('btnSell');
        var btnSubmit = document.getElementById('btnSubmitOrder');
        
        if (!btnSubmit) {
            var cards = document.querySelectorAll('.grid-3 .card');
            if (cards.length >= 2) {
                btnSubmit = cards[1].querySelector('button[onclick*="executeOrder"]');
            }
        }
        
        if (type === 'buy') {
            if (btnBuy) { btnBuy.className = 'btn btn-primary'; btnBuy.style.flex = '1'; }
            if (btnSell) { btnSell.className = 'btn btn-secondary'; btnSell.style.flex = '1'; }
            if (inputPrice) inputPrice.disabled = true;
            if (btnSubmit) {
                btnSubmit.textContent = '매수 주문';
                btnSubmit.className = 'btn btn-primary';
                btnSubmit.style.width = '100%';
                btnSubmit.style.padding = '12px';
            }
        } else {
            if (btnBuy) { btnBuy.className = 'btn btn-secondary'; btnBuy.style.flex = '1'; }
            if (btnSell) { btnSell.className = 'btn btn-primary'; btnSell.style.flex = '1'; }
            if (inputPrice) inputPrice.disabled = false;
            if (btnSubmit) {
                btnSubmit.textContent = '매도 주문';
                btnSubmit.className = 'btn btn-danger';
                btnSubmit.style.width = '100%';
                btnSubmit.style.padding = '12px';
            }
        }
    }
    
    showBuyModal(utxos, totalAmount, totalValue) {
        var modalTitle = document.getElementById('modalTitle');
        var modalBody = document.getElementById('modalBody');
        
        if (modalTitle) modalTitle.textContent = '✅ 매수 거래 체결';
        
        if (modalBody) {
            var html = '<div style="background:linear-gradient(135deg,#e3f2fd 0%,#bbdefb 100%);padding:var(--space-lg);border-radius:var(--radius-md);margin-bottom:var(--space-lg);border-left:4px solid var(--primary);">';
            html += '<div style="font-size:var(--font-sm);color:var(--gray-600);margin-bottom:var(--space-sm);">💰 거래 요약</div>';
            html += '<div style="font-size:var(--font-xxl);font-weight:700;color:var(--primary);">' + totalAmount.toLocaleString() + ' T</div>';
            html += '<div style="font-size:var(--font-base);color:var(--gray-600);margin-top:var(--space-sm);">총 결제액: ₩' + totalValue.toLocaleString() + '</div>';
            html += '</div>';
            
            html += '<div style="font-size:var(--font-md);font-weight:600;color:var(--gray-700);margin-bottom:var(--space-md);">📋 UTXO 거래 내역</div>';
            
            for (var i = 0; i < utxos.length; i++) {
                var utxo = utxos[i];
                html += '<div style="background:var(--gray-100);border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:var(--space-md);margin-bottom:var(--space-sm);">';
                html += '<div style="display:flex;justify-content:space-between;margin-bottom:var(--space-sm);padding-bottom:var(--space-sm);border-bottom:1px solid var(--gray-200);">';
                html += '<span style="font-weight:600;color:var(--primary);">UTXO #' + (i + 1) + '</span>';
                html += '<span style="color:var(--gray-500);font-size:var(--font-sm);">' + new Date(utxo.timestamp).toLocaleString('ko-KR') + '</span>';
                html += '</div>';
                html += '<div style="font-size:var(--font-sm);line-height:1.6;">';
                html += '<div><strong>TxID:</strong> <span style="color:var(--gray-500);font-family:monospace;font-size:var(--font-xs);">' + utxo.txid + '</span></div>';
                html += '<div><strong>From:</strong> ' + utxo.from + '</div>';
                html += '<div><strong>To:</strong> ' + utxo.to + '</div>';
                html += '<div style="margin-top:var(--space-sm);"><strong>Amount:</strong> ' + utxo.amount.toLocaleString() + ' T | <strong>Price:</strong> ₩' + utxo.price.toLocaleString() + '</div>';
                html += '<div style="margin-top:var(--space-sm);"><strong>Value:</strong> <span style="color:var(--primary);font-weight:600;">₩' + utxo.value.toLocaleString() + '</span></div>';
                html += '</div></div>';
            }
            
            html += '<div style="background:#e8f5e9;padding:var(--space-md);border-radius:var(--radius-sm);margin-top:var(--space-md);font-size:var(--font-sm);color:var(--success);">';
            html += '✓ ' + utxos.length + '개의 UTXO가 생성되었습니다<br>✓ 거래가 블록체인에 기록되었습니다';
            html += '</div>';
            
            modalBody.innerHTML = html;
        }
        
        var modal = document.getElementById('modal');
        if (modal) modal.classList.add('show');
    }
    
    showSellModal(utxo) {
        var modalTitle = document.getElementById('modalTitle');
        var modalBody = document.getElementById('modalBody');
        
        if (modalTitle) modalTitle.textContent = '📤 매도 주문 등록';
        
        if (modalBody) {
            var html = '<div style="background:linear-gradient(135deg,#ffebee 0%,#ffcdd2 100%);padding:var(--space-lg);border-radius:var(--radius-md);margin-bottom:var(--space-lg);border-left:4px solid var(--danger);">';
            html += '<div style="font-size:var(--font-sm);color:var(--gray-600);margin-bottom:var(--space-sm);">📤 매도 주문</div>';
            html += '<div style="font-size:var(--font-xxl);font-weight:700;color:var(--danger);">' + utxo.amount.toLocaleString() + ' T</div>';
            html += '<div style="font-size:var(--font-base);color:var(--gray-600);margin-top:var(--space-sm);">호가: ₩' + utxo.price.toLocaleString() + '</div>';
            html += '</div>';
            
            html += '<div style="background:var(--gray-100);border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:var(--space-md);">';
            html += '<div style="display:flex;justify-content:space-between;margin-bottom:var(--space-sm);padding-bottom:var(--space-sm);border-bottom:1px solid var(--gray-200);">';
            html += '<span style="font-weight:600;color:var(--danger);">매도 UTXO</span>';
            html += '<span style="color:var(--gray-500);font-size:var(--font-sm);">' + new Date(utxo.timestamp).toLocaleString('ko-KR') + '</span>';
            html += '</div>';
            html += '<div style="font-size:var(--font-sm);line-height:1.6;">';
            html += '<div><strong>TxID:</strong> <span style="color:var(--gray-500);font-family:monospace;font-size:var(--font-xs);">' + utxo.txid + '</span></div>';
            html += '<div><strong>From:</strong> ' + utxo.from + '</div>';
            html += '<div><strong>To:</strong> ' + utxo.to + '</div>';
            html += '<div style="margin-top:var(--space-sm);"><strong>Amount:</strong> ' + utxo.amount.toLocaleString() + ' T | <strong>Price:</strong> ₩' + utxo.price.toLocaleString() + '</div>';
            html += '<div style="margin-top:var(--space-sm);"><strong>Expected:</strong> <span style="color:var(--danger);font-weight:600;">₩' + utxo.value.toLocaleString() + '</span></div>';
            html += '</div></div>';
            
            html += '<div style="background:#fff3e0;padding:var(--space-md);border-radius:var(--radius-sm);margin-top:var(--space-md);font-size:var(--font-sm);color:#e65100;">';
            html += '✓ 매도 주문이 호가창에 등록되었습니다<br>✓ 매수자가 나타나면 자동으로 체결됩니다';
            html += '</div>';
            
            modalBody.innerHTML = html;
        }
        
        var modal = document.getElementById('modal');
        if (modal) modal.classList.add('show');
    }
    
    closeModal() {
        var modal = document.getElementById('modal');
        if (modal) modal.classList.remove('show');
    }
}
