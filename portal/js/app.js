let currentLang = 'ko';
let currentSystem = null;
let currentAgent = null;
let onlineCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    renderSystems(SYSTEMS);
    setLanguage('ko');
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') filterSystems();
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.lang-selector')) {
            document.getElementById('langDropdown').classList.remove('active');
        }
    });
});

function toggleLangDropdown() {
    document.getElementById('langDropdown').classList.toggle('active');
}

function setLanguage(lang) {
    currentLang = lang;
    const t = TRANSLATIONS[lang];
    document.getElementById('currentFlag').textContent = t.flag;
    document.getElementById('currentLang').textContent = t.langName;
    document.getElementById('langDropdown').classList.remove('active');
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.textContent.includes(t.langName)) opt.classList.add('selected');
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
    onlineCount = 0;
    document.getElementById('online-count').textContent = '-';
    renderSystems(SYSTEMS);
}

function renderSystems(list) {
    const grid = document.getElementById('systemsGrid');
    const t = TRANSLATIONS[currentLang];
    grid.innerHTML = list.map(sys => `
        <div class="system-card">
            <span class="status-badge status-checking" id="status-${sys.port}">...</span>
            <div class="card-header">
                <div class="card-icon">${sys.icon}</div>
                <div class="card-title">
                    <h3>${sys.name[currentLang] || sys.name.en}</h3>
                    <p>⛓️ OpenHash | ${t.port}: ${sys.port}</p>
                </div>
            </div>
            <p class="card-description">${sys.desc[currentLang] || sys.desc.en}</p>
            <div class="card-actions">
                <a href="/${sys.id}/" target="_blank" rel="noopener" class="card-btn card-btn-primary">${t.openSite} →</a>
                <button class="card-btn card-btn-secondary" onclick="openSystem('${sys.id}')">🤖 ${t.aiConsult}</button>
            </div>
            <div class="card-stats">
                <div class="card-stat"><div class="card-stat-value">5+</div><div class="card-stat-label">${t.agents}</div></div>
                <div class="card-stat"><div class="card-stat-value">24/7</div><div class="card-stat-label">Service</div></div>
                <div class="card-stat"><div class="card-stat-value">⛓️</div><div class="card-stat-label">OpenHash</div></div>
            </div>
        </div>
    `).join('');
    list.forEach(checkStatus);
}

async function checkStatus(sys) {
    const badge = document.getElementById('status-' + sys.port);
    if (!badge) return;
    try {
        const res = await fetch('/api/' + sys.id + '/info', { method: 'GET' });
        if (res.ok) {
            badge.textContent = '● Online';
            badge.className = 'status-badge status-online';
            onlineCount++;
            document.getElementById('online-count').textContent = onlineCount;
        } else {
            badge.textContent = '● Offline';
            badge.className = 'status-badge status-offline';
        }
    } catch(e) {
        badge.textContent = '● Offline';
        badge.className = 'status-badge status-offline';
    }
}

function filterSystems() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const filtered = SYSTEMS.filter(s => {
        const name = (s.name[currentLang] || s.name.en).toLowerCase();
        const desc = (s.desc[currentLang] || s.desc.en).toLowerCase();
        return name.includes(q) || desc.includes(q) || s.id.includes(q);
    });
    onlineCount = 0;
    renderSystems(filtered);
}

function filterCategory(cat, btn) {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    onlineCount = 0;
    renderSystems(cat === 'all' ? SYSTEMS : SYSTEMS.filter(s => s.category === cat));
}

async function openSystem(id) {
    currentSystem = SYSTEMS.find(s => s.id === id);
    if (!currentSystem) return;
    const t = TRANSLATIONS[currentLang];
    document.getElementById('modalTitle').textContent = currentSystem.icon + ' ' + (currentSystem.name[currentLang] || currentSystem.name.en);
    document.getElementById('modalDescription').textContent = currentSystem.desc[currentLang] || currentSystem.desc.en;
    document.getElementById('modalSiteLink').href = '/' + currentSystem.id + '/';
    try {
        const res = await fetch('/api/' + id + '/agents');
        const data = await res.json();
        document.getElementById('agentList').innerHTML = (data.agents || []).map((a, i) => 
            `<div class="agent-item${i===0?' selected':''}" onclick="selectAgent('${a.id}', this)">${a.name}</div>`
        ).join('');
        if (data.agents && data.agents.length > 0) currentAgent = data.agents[0].id;
    } catch(e) {
        document.getElementById('agentList').innerHTML = '<div class="agent-item selected" onclick="selectAgent(\'default\', this)">📋 기본 상담 Agent</div>';
        currentAgent = 'default';
    }
    document.getElementById('chatMessages').innerHTML = `<div class="chat-message assistant">${t.chatWelcome}</div>`;
    document.getElementById('systemModal').classList.add('active');
}

function closeModal() {
    document.getElementById('systemModal').classList.remove('active');
    currentSystem = null;
    currentAgent = null;
}

function selectAgent(id, el) {
    currentAgent = id;
    document.querySelectorAll('.agent-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg || !currentSystem) return;
    const chat = document.getElementById('chatMessages');
    chat.innerHTML += `<div class="chat-message user">${msg}</div>`;
    input.value = '';
    chat.innerHTML += '<div class="chat-message assistant" id="typing">...</div>';
    chat.scrollTop = chat.scrollHeight;
    try {
        const res = await fetch('/api/' + currentSystem.id + '/consultation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, agent_type: currentAgent || 'default' })
        });
        const data = await res.json();
        document.getElementById('typing').remove();
        chat.innerHTML += `<div class="chat-message assistant">${data.response || 'No response'}</div>`;
    } catch(e) {
        document.getElementById('typing').remove();
        chat.innerHTML += '<div class="chat-message assistant">서비스에 연결할 수 없습니다.</div>';
    }
    chat.scrollTop = chat.scrollHeight;
}
