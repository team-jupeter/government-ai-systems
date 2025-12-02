// Feature Modal - 별도 HTML 파일 로드 방식
const featureFiles = {
    energy: '/modals/energy.html',
    speed: '/modals/speed.html',
    integrity: '/modals/integrity.html',
    systems: '/modals/systems.html'
};

async function openFeatureModal(type) {
    const modal = document.getElementById('featureModal');
    const content = document.getElementById('featureModalContent');
    
    content.innerHTML = '<div class="loading-spinner">⏳ 로딩 중...</div>';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    try {
        const response = await fetch(featureFiles[type]);
        if (!response.ok) throw new Error('File not found');
        const html = await response.text();
        content.innerHTML = html;
    } catch (error) {
        console.error('Modal load error:', error);
        content.innerHTML = '<div style="text-align:center;padding:60px;color:#ff6b6b;"><div style="font-size:3rem;margin-bottom:20px;">⚠️</div><h3>콘텐츠를 불러올 수 없습니다</h3></div>';
    }
}

function closeFeatureModal() {
    const modal = document.getElementById('featureModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 이벤트 리스너 - 캡처 단계에서 처리하여 확실하게 동작
document.addEventListener('click', function(e) {
    // 닫기 버튼 클릭 (클래스명 포함 여부 확인)
    if (e.target.classList.contains('feature-modal-close') || 
        e.target.closest('.feature-modal-close')) {
        e.preventDefault();
        e.stopPropagation();
        closeFeatureModal();
        return;
    }
    
    // 모달 배경 클릭 (콘텐츠 영역 외부)
    if (e.target.id === 'featureModal') {
        closeFeatureModal();
    }
}, true);  // true = 캡처 단계에서 처리

// ESC 키
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFeatureModal();
        if (typeof closeModal === 'function') closeModal();
    }
});

// 터치 이벤트 지원 (모바일)
document.addEventListener('touchend', function(e) {
    if (e.target.classList.contains('feature-modal-close') || 
        e.target.closest('.feature-modal-close')) {
        e.preventDefault();
        closeFeatureModal();
    }
}, true);
