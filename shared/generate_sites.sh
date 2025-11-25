#!/bin/bash

# 시스템 정보 배열
declare -A SYSTEMS
SYSTEMS=(
    ["currency"]="💰|디지털 화폐 시스템|민간 경쟁형 디지털 화폐 생태계|디지털 화폐 상담,환율 최적화,거래 분석,정책 자문,시장 동향"
    ["tax"]="🧾|지능형 국세 시스템|AI 기반 세금 신고·납부·환급 자동화|세금 계산,공제 탐색,신고 도우미,환급 조회,세무조사 상담"
    ["education"]="📚|스마트 교육 플랫폼|AI 맞춤형 학습 및 교육 행정 자동화|학습 설계,성적 분석,진로 상담,교육과정 추천,학사 안내"
    ["healthcare"]="🏥|의료 데이터 시스템|의료 데이터 무결성 및 AI 진단 지원|진료 기록 관리,처방 검증,건강검진 분석,보험 청구,의료 상담"
    ["judicial"]="⚖️|AI 사법 지원 시스템|법률 문서 분석 및 판례 검색 자동화|판례 검색,법률 문서 분석,소송 절차 안내,법률 자문,조정 지원"
    ["legislation"]="📜|입법 지원 시스템|법률안 분석 및 입법 과정 지원|법률안 분석,규제 영향 평가,비교법 연구,입법 동향,의견 수렴"
    ["lawsuit"]="📋|소송 관리 시스템|소송 진행 및 문서 관리 자동화|소송 현황,기일 관리,문서 작성,증거 정리,판결문 분석"
    ["patents"]="💡|특허 관리 시스템|특허 출원·심사·등록 자동화|특허 검색,선행기술 조사,출원 지원,심사 현황,권리 분석"
    ["intellectual-property"]="🔬|지식재산 플랫폼|상표·디자인·저작권 통합 관리|상표 검색,디자인 등록,저작권 관리,침해 분석,라이선스 상담"
    ["traffic"]="🚗|자율주행 교통 시스템|AI 교통 관리 및 자율주행 지원|교통 분석,신호 최적화,사고 예방,경로 안내,자율주행 지원"
    ["meal"]="🍽️|스마트 급식 시스템|학교·공공기관 급식 관리 자동화|메뉴 계획,영양 분석,식재료 관리,알레르기 체크,만족도 조사"
    ["food-drug-safety"]="🛡️|식약처 안전 시스템|식품·의약품 안전 관리 자동화|안전성 검사,허가 현황,리콜 정보,부작용 신고,규제 안내"
    ["local-admin"]="🏛️|지방행정 시스템|지방자치단체 행정 업무 자동화|민원 처리,예산 관리,정책 분석,주민 소통,행정 안내"
    ["eup-myeon-dong"]="🏘️|읍면동 행정 시스템|기초 행정단위 업무 자동화|주민등록,전입신고,증명 발급,복지 연계,민원 상담"
    ["personnel-innovation"]="👔|인사혁신 시스템|공무원 인사·교육 관리 자동화|채용 관리,성과 평가,교육 추천,경력 개발,복무 관리"
    ["market"]="📈|시장 분석 시스템|금융 시장 분석 및 예측 지원|시장 동향,투자 분석,리스크 평가,정책 영향,경제 지표"
    ["k12"]="🎒|K-12 교육 시스템|초중고 교육 과정 통합 관리|학습 관리,성적 분석,출결 관리,학부모 소통,진학 상담"
    ["university"]="🎓|대학 교육 시스템|고등교육 행정 및 연구 지원|수강 관리,학점 분석,연구 지원,취업 연계,장학 안내"
    ["jeju-si"]="🏝️|제주시 행정 시스템|제주시 특화 행정 서비스|관광 안내,환경 관리,문화 행사,교통 정보,민원 서비스"
    ["jeju-admin"]="🌴|제주도 행정 시스템|제주특별자치도 통합 행정|도정 안내,정책 홍보,예산 공개,주민 참여,행정 혁신"
    ["jeju-hospital"]="🏨|제주 의료 시스템|제주 지역 의료 서비스 통합|진료 예약,의료진 안내,응급 서비스,건강 정보,원격 진료"
    ["jeju-integrated"]="🗺️|제주 통합 플랫폼|제주 행정·관광·생활 통합 서비스|통합 민원,관광 플랫폼,생활 정보,재난 안전,스마트시티"
)

BASE_DIR="/var/www/government-ai-systems"

for system in "${!SYSTEMS[@]}"; do
    IFS='|' read -r icon name desc agents <<< "${SYSTEMS[$system]}"
    
    echo "Generating: $system ($name)"
    
    # 에이전트 태그 생성
    agent_tags=""
    IFS=',' read -ra AGENT_LIST <<< "$agents"
    for agent in "${AGENT_LIST[@]}"; do
        agent_tags+="<span class=\"agent-tag\">🤖 $agent</span>"
    done
    
    # index.html 생성
    cat > "$BASE_DIR/$system/index.html" << HTMLEOF
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$name - OpenHash Platform</title>
    <link rel="stylesheet" href="/shared/common.css">
</head>
<body>
    <header class="header">
        <div class="logo">
            <div class="logo-icon">$icon</div>
            <div class="logo-text">
                <h1>$name</h1>
                <p>OpenHash Government AI</p>
            </div>
        </div>
        <div class="header-actions">
            <a href="/" class="btn btn-outline">🏠 포털로 돌아가기</a>
            <button class="btn btn-primary" onclick="openChat()">💬 AI 상담</button>
        </div>
    </header>

    <section class="hero">
        <div class="hero-badge">⛓️ Powered by OpenHash Technology</div>
        <h2>$name</h2>
        <p class="hero-subtitle">$desc</p>
        
        <div class="stats-banner">
            <div class="stat-box">
                <div class="stat-icon">🤖</div>
                <div class="stat-value">${#AGENT_LIST[@]}</div>
                <div class="stat-label">AI 에이전트</div>
            </div>
            <div class="stat-box">
                <div class="stat-icon">⚡</div>
                <div class="stat-value">4ms</div>
                <div class="stat-label">응답 시간</div>
            </div>
            <div class="stat-box">
                <div class="stat-icon">🔒</div>
                <div class="stat-value">100%</div>
                <div class="stat-label">데이터 무결성</div>
            </div>
            <div class="stat-box">
                <div class="stat-icon">🌐</div>
                <div class="stat-value">24/7</div>
                <div class="stat-label">무중단 서비스</div>
            </div>
        </div>
    </section>

    <main class="main-container">
        <div class="section-title">
            <h3>🤖 AI 에이전트</h3>
            <p>전문 AI 에이전트가 업무를 지원합니다</p>
        </div>
        
        <div class="agent-list" style="justify-content: center; margin-bottom: 40px;">
            $agent_tags
        </div>
        
        <section class="chat-section">
            <div class="chat-header">
                <span style="font-size: 2rem;">💬</span>
                <h3>AI 상담</h3>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="chat-message assistant">
                    안녕하세요! <strong>$name</strong> AI 상담사입니다. 무엇을 도와드릴까요?
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" id="chatInput" placeholder="메시지를 입력하세요..." onkeypress="if(event.key==='Enter')sendMessage()">
                <button class="btn btn-primary" onclick="sendMessage()">전송</button>
            </div>
        </section>
        
        <section class="features-section">
            <div class="section-title">
                <h3>✨ 주요 기능</h3>
                <p>OpenHash 기술 기반의 혁신적인 서비스</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h4>실시간 처리</h4>
                    <p>4ms 이내 응답으로 즉각적인 서비스 제공</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h4>데이터 보안</h4>
                    <p>OpenHash 기반 100% 데이터 무결성 보장</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🤖</div>
                    <h4>AI 자동화</h4>
                    <p>전문 AI 에이전트의 24시간 업무 지원</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h4>투명한 기록</h4>
                    <p>모든 처리 과정의 불변 기록 및 추적</p>
                </div>
            </div>
        </section>
        
        <div class="info-box">
            <h4>ℹ️ OpenHash 기술 정보</h4>
            <p>본 시스템은 OpenHash 분산 신뢰 기술을 기반으로 합니다. 
            블록체인 대비 98.5% 에너지 절감, 1000배 빠른 처리 속도를 제공하며, 
            확률적 계층 선택 알고리즘으로 데이터 무결성을 보장합니다.</p>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-logo">⛓️</div>
        <p><strong>$name</strong></p>
        <p>OpenHash Government AI Platform</p>
        <div class="footer-links">
            <a href="/">🏠 포털</a>
            <a href="/api/$system/info">📡 API</a>
        </div>
        <p style="margin-top: 20px; font-size: 0.85rem;">© 2025 OpenHash Foundation</p>
    </footer>

    <script>
        const systemId = '$system';
        
        async function sendMessage() {
            const input = document.getElementById('chatInput');
            const messages = document.getElementById('chatMessages');
            const text = input.value.trim();
            if (!text) return;
            
            // 사용자 메시지 추가
            messages.innerHTML += '<div class="chat-message user">' + text + '</div>';
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
            
            // 로딩 표시
            const loadingId = 'loading-' + Date.now();
            messages.innerHTML += '<div class="chat-message assistant" id="' + loadingId + '">⏳ 응답 생성 중...</div>';
            messages.scrollTop = messages.scrollHeight;
            
            try {
                const response = await fetch('/api/' + systemId + '/consultation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text, agent_type: 'default' })
                });
                const data = await response.json();
                document.getElementById(loadingId).innerHTML = data.response || '죄송합니다. 응답을 생성할 수 없습니다.';
            } catch (error) {
                document.getElementById(loadingId).innerHTML = '⚠️ 연결 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            }
            messages.scrollTop = messages.scrollHeight;
        }
        
        function openChat() {
            document.getElementById('chatInput').focus();
            document.querySelector('.chat-section').scrollIntoView({ behavior: 'smooth' });
        }
    </script>
</body>
</html>
HTMLEOF
done

echo ""
echo "✅ 모든 시스템 페이지 생성 완료!"
