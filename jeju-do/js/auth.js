// 인증 관리 시스템

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.initEventListeners();
    }

    initEventListeners() {
        // 페이지 로드 시 로그인 상태 확인
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI();
        }
    }

    attachLoginFormListener() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            console.log('로그인 폼 찾음, 이벤트 리스너 연결');
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                console.log('로그인 폼 제출됨');
                this.handleLogin();
            };
        } else {
            console.error('로그인 폼을 찾을 수 없음');
        }
    }

    async handleLogin() {
        console.log('handleLogin 호출됨');
        const phoneInput = document.getElementById('login-phone');
        
        if (!phoneInput) {
            alert('전화번호 입력 필드를 찾을 수 없습니다.');
            return;
        }
        
        const phoneNumber = phoneInput.value.trim();
        console.log('입력된 전화번호:', phoneNumber);
        
        if (!phoneNumber) {
            alert('전화번호를 입력해주세요.');
            return;
        }
        
        // PDV 존재 여부 확인
        const pdv = await this.findPDVByPhone(phoneNumber);
        console.log('PDV 검색 결과:', pdv);
        
        if (pdv) {
            // 기존 PDV 로그인
            this.currentUser = pdv;
            localStorage.setItem('currentUser', JSON.stringify(pdv));
            this.updateAuthUI();
            closeLoginModal();
            
            alert(`환영합니다, ${this.getUserDisplayName()}님!`);
            
            // My Page로 이동
            if (typeof showMyPage === 'function') {
                showMyPage();
            }
        } else {
            // PDV 없음 - 생성 모달 표시
            console.log('PDV 없음, 생성 모달 표시');
            closeLoginModal();
            
            if (typeof showPDVCreateModal === 'function') {
                showPDVCreateModal(phoneNumber);
            } else {
                alert('PDV 생성 기능을 초기화할 수 없습니다.');
            }
        }
    }

    async findPDVByPhone(phoneNumber) {
        // PDV Manager에서 검색
        if (window.pdvManager) {
            const allPDVs = await window.pdvManager.getAllPDVs();
            console.log("전체 PDV 수:", allPDVs.length);
            
            // 배열인지 확인
            if (!Array.isArray(allPDVs)) {
                console.error("getAllPDVs가 배열을 반환하지 않음:", typeof allPDVs);
                return null;
            }
            
            const found = allPDVs.find(pdv => pdv.phoneNumber === phoneNumber);
            console.log("PDV 검색 결과:", found ? "찾음" : "없음");
            return found;
        }
        console.warn("pdvManager가 초기화되지 않았습니다");
        return null;
    }

    async createPDV(pdvData) {
        console.log('PDV 생성 시작:', pdvData);
        
        if (!window.pdvManager) {
            alert('PDV Manager가 초기화되지 않았습니다.');
            return;
        }
        
        // PDV 생성
        const pdvId = window.pdvManager.generatePDVId();
        const newPDV = {
            pdvId: pdvId,
            phoneNumber: pdvData.phoneNumber,
            type: pdvData.type,
            createdAt: new Date().toISOString(),
            documents: [],
            activities: []
        };
        
        // 타입별 데이터 추가
        if (pdvData.type === 'citizen') {
            newPDV.personData = pdvData.personData;
        } else if (pdvData.type === 'organization') {
            newPDV.orgData = pdvData.orgData;
        }
        
        console.log('생성된 PDV:', newPDV);
        
        // 저장
        await window.pdvManager.savePDV(newPDV);
        
        // 자동 로그인
        this.currentUser = newPDV;
        localStorage.setItem('currentUser', JSON.stringify(newPDV));
        this.updateAuthUI();
        
        // My Page로 이동
        if (typeof showMyPage === 'function') {
            showMyPage();
        }
    }

    getUserDisplayName() {
        if (!this.currentUser) return '';
        
        if (this.currentUser.type === 'citizen') {
            return this.currentUser.personData?.name || '도민';
        } else {
            return this.currentUser.orgData?.name || '단체';
        }
    }

    async getCurrentUser() {
        return this.currentUser;
    }

    updateAuthUI() {
        const loggedIn = document.getElementById('auth-logged-in');
        const loggedOut = document.getElementById('auth-logged-out');
        const mypageTab = document.getElementById('mypage-tab');
            if (mypageTab) mypageTab.style.display = "none";
        const userDisplayName = document.getElementById('user-display-name');
        
        if (this.currentUser) {
            if (loggedOut) loggedOut.style.display = 'none';
            if (loggedIn) {
                loggedIn.style.display = 'flex';
                const displayName = this.getUserDisplayName();
                const mypageBtn = loggedIn.querySelector('.mypage-btn');
                if (mypageBtn) {
                    mypageBtn.textContent = `My Page`;
                }
                
                // 헤더에 사용자 이름 표시
                if (userDisplayName) {
                    userDisplayName.textContent = displayName;
                    userDisplayName.style.display = 'inline-block';
                }
            }
            if (mypageTab) mypageTab.style.display = 'inline-block';
        } else {
            if (loggedOut) loggedOut.style.display = 'flex';
            if (loggedIn) loggedIn.style.display = 'none';
            if (mypageTab) mypageTab.style.display = 'none';
            if (userDisplayName) {
                userDisplayName.style.display = 'none';
            }
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem("currentUser");
        localStorage.removeItem("activeTab");  // 추가!
        this.updateAuthUI();
        
        // 메인 탭으로 이동
        if (typeof switchTab === "function") {
            switchTab("dochung");
        }
        
        alert("로그아웃되었습니다.");
    }
    }
}

// 전역 함수들
function openLoginModal() {
    console.log('로그인 모달 열기');
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'flex';
        // 모달이 열린 후 이벤트 리스너 연결
        setTimeout(() => {
            if (window.authManager) {
                window.authManager.attachLoginFormListener();
            }
        }, 100);
    } else {
        console.error('로그인 모달을 찾을 수 없음');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

