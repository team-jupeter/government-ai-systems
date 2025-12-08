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
            el.innerHTML = '<div style="font-size:28px;font-weight:700;color:#003566;">' + balance.toLocaleString() + ' T</div>' +
                '<div style="font-size:18px;font-weight:600;color:#2e7d32;margin-top:8px;">₩' + krwBalance.toLocaleString() + '</div>';
        }
    }
    
    renderUTXOs(utxos) {
        var container = document.getElementById('utxoContainer');
        if (!container) {
            var cards = document.querySelectorAll('.grid-2 .card');
            if (cards.length >= 2) container = cards[1].querySelector('.card-body');
        }
        if (!container) return;
        
        var count = utxos.length;
        var headerEl = container.parentElement.querySelector('.card-header h3');
        if (headerEl) headerEl.innerHTML = '<i class="fas fa-cubes"></i> 보유 UTXO (' + count + '개)';
        
        if (count === 0) {
            container.innerHTML = '<div style="text-align:center;color:#aaa;padding:40px;font-size:14px;">보유 UTXO가 없습니다</div>';
        } else {
            var html = '<div style="max-height:200px;overflow-y:auto;">';
            for (var i = 0; i < utxos.length; i++) {
                var utxo = utxos[i];
                html += '<div style="background:#f8f9fa;border:1px solid #e5e5e5;border-radius:8px;padding:14px;margin-bottom:10px;">';
                html += '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">';
                html += '<span style="font-size:14px;font-weight:600;color:#003566;">UTXO #' + (i + 1) + '</span>';
                html += '<span style="font-size:14px;color:#2e7d32;font-weight:600;">' + utxo.amount.toLocaleString() + ' T</span></div>';
                html += '<div style="font-size:13px;color:#666;line-height:1.6;">';
                html += '<div><strong>From:</strong> ' + utxo.from + '</div>';
                html += '<div><strong>Price:</strong> ₩' + utxo.price.toLocaleString() + '</div></div></div>';
            }
            container.innerHTML = html + '</div>';
        }
    }
    
    renderOrderBook(orderBook) {
        var el = document.getElementById('orderBook');
        if (!el) return;
        
        var totalAmount = 0;
        for (var i = 0; i < orderBook.length; i++) totalAmount += orderBook[i].amount;
        
        var html = '';
        for (var i = 0; i < orderBook.length; i++) {
            var o = orderBook[i];
            html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center;padding:10px 0;border-bottom:1px solid #eee;font-size:14px;">';
            html += '<span style="color:#555;">' + o.seller + '</span>';
            html += '<span style="color:#c62828;font-weight:600;">₩' + o.price.toLocaleString() + '</span>';
            html += '<span style="font-weight:500;">' + o.amount.toLocaleString() + ' T</span></div>';
        }
        el.innerHTML = html;
        
        var priceEl = document.querySelector('.current-price');
        if (priceEl) {
            priceEl.innerHTML = '<div style="font-size:13px;color:#666;margin-bottom:6px;">총 매도량</div>' +
                '<div style="font-size:24px;font-weight:700;color:#003566;">' + totalAmount.toLocaleString() + ' T</div>' +
                '<div style="font-size:12px;color:#888;margin-top:4px;">' + orderBook.length + '건의 매도 주문</div>';
        }
    }
    
    renderRecentTrades(trades) {
        var el = document.getElementById('recentTrades');
        if (!el) return;
        
        if (trades.length === 0) {
            el.innerHTML = '<div style="text-align:center;color:#aaa;padding:24px;font-size:14px;">거래 내역 없음</div>';
        } else {
            var html = '';
            var len = Math.min(trades.length, 10);
            for (var i = 0; i < len; i++) {
                var t = trades[i];
                html += '<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;font-size:14px;">';
                html += '<span style="color:#666;">' + new Date(t.timestamp).toLocaleTimeString('ko-KR') + '</span>';
                html += '<span style="color:#003566;font-weight:600;">₩' + t.price.toLocaleString() + '</span>';
                html += '<span>' + t.amount.toLocaleString() + ' T</span></div>';
            }
            el.innerHTML = html;
        }
    }
    
    setOrderType(type) {
        var inputPrice = document.getElementById('inputPrice');
        var btnBuy = document.getElementById('btnBuy');
        var btnSell = document.getElementById('btnSell');
        var btnSubmit = null;
        var cards = document.querySelectorAll('.grid-3 .card');
        if (cards.length >= 2) btnSubmit = cards[1].querySelector('button[onclick*="executeOrder"]');
        
        if (type === 'buy') {
            if (btnBuy) { btnBuy.className = 'btn btn-primary'; btnBuy.style.flex = '1'; }
            if (btnSell) { btnSell.className = 'btn btn-secondary'; btnSell.style.flex = '1'; }
            if (inputPrice) inputPrice.disabled = true;
            if (btnSubmit) { btnSubmit.textContent = '매수 주문'; btnSubmit.className = 'btn btn-primary'; btnSubmit.style.width = '100%'; btnSubmit.style.padding = '12px'; }
        } else {
            if (btnBuy) { btnBuy.className = 'btn btn-secondary'; btnBuy.style.flex = '1'; }
            if (btnSell) { btnSell.className = 'btn btn-primary'; btnSell.style.flex = '1'; }
            if (inputPrice) inputPrice.disabled = false;
            if (btnSubmit) { btnSubmit.textContent = '매도 주문'; btnSubmit.className = 'btn btn-danger'; btnSubmit.style.width = '100%'; btnSubmit.style.padding = '12px'; }
        }
    }
    
    showBuyModal(utxos, totalAmount, totalValue) {
        var modalTitle = document.getElementById('modalTitle');
        var modalBody = document.getElementById('modalBody');
        
        if (modalTitle) modalTitle.textContent = '매수 거래 체결';
        
        if (modalBody) {
            var html = '<p>' + totalAmount.toLocaleString() + ' T를 ₩' + totalValue.toLocaleString() + '에 매수했습니다.</p>';
            html += '<div class="modal-info">';
            html += '<div class="modal-info-row"><span class="label">수량</span><span class="value">' + totalAmount.toLocaleString() + ' T</span></div>';
            html += '<div class="modal-info-row"><span class="label">평균 단가</span><span class="value">₩' + Math.round(totalValue / totalAmount).toLocaleString() + '</span></div>';
            html += '<div class="modal-info-row"><span class="label">UTXO 생성</span><span class="value">' + utxos.length + '개</span></div>';
            html += '<div class="modal-info-row total"><span class="label">결제 금액</span><span class="value">₩' + totalValue.toLocaleString() + '</span></div>';
            html += '</div>';
            modalBody.innerHTML = html;
        }
        
        var modal = document.getElementById('modal');
        if (modal) modal.classList.add('show');
    }
    
    showSellModal(utxo) {
        var modalTitle = document.getElementById('modalTitle');
        var modalBody = document.getElementById('modalBody');
        
        if (modalTitle) modalTitle.textContent = '매도 주문 등록';
        
        if (modalBody) {
            var html = '<p>' + utxo.amount.toLocaleString() + ' T 매도 주문이 호가창에 등록되었습니다.</p>';
            html += '<div class="modal-info">';
            html += '<div class="modal-info-row"><span class="label">수량</span><span class="value">' + utxo.amount.toLocaleString() + ' T</span></div>';
            html += '<div class="modal-info-row"><span class="label">희망 단가</span><span class="value">₩' + utxo.price.toLocaleString() + '</span></div>';
            html += '<div class="modal-info-row total"><span class="label">예상 수익</span><span class="value">₩' + utxo.value.toLocaleString() + '</span></div>';
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
