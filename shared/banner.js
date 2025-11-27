// 오픈해시 설명서 배너 자동 삽입
(function() {
    const banner = document.createElement('a');
    banner.href = 'http://100.30.14.224/openhash.html';
    banner.target = '_blank';
    banner.rel = 'noopener noreferrer';
    banner.className = 'openhash-banner';
    banner.innerHTML = '📘 오픈해시 기술 설명서 보기 ↗';
    banner.style.cssText = `
        display: block;
        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
        color: white;
        text-align: center;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        position: sticky;
        top: 0;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    banner.onmouseover = function() { this.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)'; };
    banner.onmouseout = function() { this.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'; };
    document.body.insertBefore(banner, document.body.firstChild);
})();
