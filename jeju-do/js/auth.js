// 인증 관리 시스템

class AuthManager {
    constructor() {
        this.storageKey = 'jeju_current_user';
    }

    // 현재 로그인한 사용자 가져오기
    getCurrentUser() {
        const userStr = localStorage.getItem(this.storageKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    // 로그인
    login(phoneOrId, userType, department = null) {
        let pdv = null;
        
        // 전화번호 형식인지 확인 (010으로 시작하거나 하이픈 포함)
        const isPhone = /^(010|064|02|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063)/.test(phoneOrId.replace(/-/g, ''));
        
        if (userType === 'citizen') {
            if (isPhone) {
                pdv = window.pdvManager.loadPDV(phoneOrId, null);
            } else {
                pdv = window.pdvManager.loadPDV(null, phoneOrId);
            }
        } else {
            if (isPhone) {
                pdv = window.organizationManager.loadOrgPDV(phoneOrId, null, department);
            } else {
                pdv = window.organizationManager.loadOrgPDV(null, phoneOrId, department);
            }
        }

        if (!pdv) {
            return { success: false, message: 'PDV를 찾을 수 없습니다. 먼저 PDV를 생성해주세요.' };
        }

        const user = {
            pdvId: pdv.pdvId,
            name: pdv.personData?.name || pdv.orgData?.name,
            type: userType,
            department: department || null,
            phoneNumber: pdv.phoneNumber,
            uniqueId: pdv.uniqueId,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(this.storageKey, JSON.stringify(user));
        
        return { success: true, user: user };
    }

    // 로그아웃
    logout() {
        localStorage.removeItem(this.storageKey);
        return true;
    }

    // 로그인 여부 확인
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

// 전역 인스턴스 생성
window.authManager = new AuthManager();

// UI 업데이트
function updateAuthUI() {
    const user = window.authManager.getCurrentUser();
    const loggedOut = document.getElementById('auth-logged-out');
    const loggedIn = document.getElementById('auth-logged-in');
    const userName = document.getElementById('auth-user-name');
    const mypageTab = document.getElementById('mypage-tab');
    
    if (user) {
        loggedOut.style.display = 'none';
        loggedIn.style.display = 'flex';
        userName.textContent = user.name;
        if (mypageTab) mypageTab.style.display = 'block';
    } else {
        loggedOut.style.display = 'flex';
        loggedIn.style.display = 'none';
        if (mypageTab) mypageTab.style.display = 'none';
    }
}

// 로그인 모달 열기
function showLoginModal() {
    document.getElementById('login-modal').classList.add('show');
}

// 로그인 모달 닫기
function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('show');
    document.getElementById('login-form').reset();
    document.getElementById('org-dept-field').style.display = 'none';
}

// 로그인 처리
function handleLogin(e) {
    e.preventDefault();
    
    const phone = document.getElementById('login-phone').value.trim();
    const id = document.getElementById('login-id').value.trim();
    const type = document.getElementById('login-type').value;
    const dept = document.getElementById('login-dept').value.trim();
    
    if (!phone && !id) {
        alert('휴대폰 번호 또는 고유 아이디를 입력해주세요.');
        return;
    }
    
    const identifier = phone || id;
    const department = type === 'organization' ? dept : null;
    
    const result = window.authManager.login(identifier, type, department);
    
    if (result.success) {
        closeLoginModal();
        updateAuthUI();
        alert(`환영합니다, ${result.user.name}님!`);
        
        // My Page로 이동
        const mypageTab = document.querySelector('[data-tab="mypage"]');
        if (mypageTab) {
            mypageTab.click();
        }
    } else {
        alert(result.message);
    }
}

// 로그아웃
function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        window.authManager.logout();
        updateAuthUI();
        
        // 홈으로 이동
        const homeTab = document.querySelector('[data-tab="overview"]');
        if (homeTab) {
            homeTab.click();
        }
        
        alert('로그아웃되었습니다.');
    }
}

// 사용자 유형 변경 시 부서 필드 표시/숨김
function toggleDeptField() {
    const type = document.getElementById('login-type').value;
    const deptField = document.getElementById('org-dept-field');
    
    if (type === 'organization') {
        deptField.style.display = 'block';
    } else {
        deptField.style.display = 'none';
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    
    // 로그인 폼 이벤트
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 사용자 유형 변경 이벤트
    const loginType = document.getElementById('login-type');
    if (loginType) {
        loginType.addEventListener('change', toggleDeptField);
    }
    
    // 모달 외부 클릭 시 닫기
    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLoginModal();
            }
        });
    }
});

// 전역 함수 노출
window.showLoginModal = showLoginModal;
window.closeLoginModal = closeLoginModal;
window.logout = logout;
window.updateAuthUI = updateAuthUI;
