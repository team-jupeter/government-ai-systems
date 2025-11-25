const { useState, useEffect } = React;
const API_BASE = '/api/eup-myeon-dong';

// AI 에이전트 상세 정보
const AGENT_DETAILS = {
    "civil_service_agent": {
        title: "📄 민원처리 Agent",
        subtitle: "AI 기반 주민등록 및 전입/전출 신고 자동 처리",
        llm_info: "DeepSeek R1, Qwen 3 기반 Fine-tuning 모델",
        performance: "처리 속도 100배 향상, 정확도 99.8%",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                DeepSeek R1과 Qwen 3 등 최신 오픈소스 LLM을 읍면동 민원 데이터로 Fine-tuning하여, 
                실제 공무원과 동일한 수준의 민원 처리가 가능합니다. 기존 공무원 대비 100배 이상 빠른 속도로 
                주민등록, 전입/전출 신고 등을 처리하며, 24시간 무중단 서비스를 제공합니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">⚡ 처리 프로세스</h3>
            <ul class="space-y-2 text-gray-300 mb-4">
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 mt-1">1.</span>
                    <span><strong>신원 확인:</strong> PDV에서 주민등록번호, 생년월일 등 본인 인증</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 mt-1">2.</span>
                    <span><strong>서류 검증:</strong> AI가 제출 서류의 적합성 자동 판단</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 mt-1">3.</span>
                    <span><strong>타 기관 조회:</strong> 행안부, 국토부 등 연계 시스템 자동 조회</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 mt-1">4.</span>
                    <span><strong>자동 발급:</strong> 주민등록등본/초본 즉시 생성 및 PDF 발급</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 mt-1">5.</span>
                    <span><strong>오픈해시 기록:</strong> 처리 이력을 4계층 분산 네트워크에 기록</span>
                </li>
            </ul>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">📊 성능 지표</h3>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
                    <div class="text-2xl font-bold text-green-400">30초</div>
                    <div class="text-sm text-gray-400">평균 처리 시간</div>
                </div>
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
                    <div class="text-2xl font-bold text-green-400">99.8%</div>
                    <div class="text-sm text-gray-400">처리 정확도</div>
                </div>
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
                    <div class="text-2xl font-bold text-green-400">100배</div>
                    <div class="text-sm text-gray-400">속도 향상</div>
                </div>
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
                    <div class="text-2xl font-bold text-green-400">24/7</div>
                    <div class="text-sm text-gray-400">무중단 운영</div>
                </div>
            </div>
        `,
        tech_stack: ["DeepSeek R1", "Qwen 3", "GPT-4 기반 평가", "OpenHash 분산 기록", "AES-256 암호화"]
    },
    "certificate_agent": {
        title: "📋 증명발급 Agent",
        subtitle: "각종 증명서 자동 발급 및 디지털 진위 확인",
        llm_info: "Claude Sonnet 4, LLaMA 3 Fine-tuning",
        performance: "발급 시간 10초, 위조 탐지율 100%",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                인감증명서, 가족관계증명서, 토지/건축물대장, 납세증명서 등 모든 공적 증명서를 
                10초 내에 자동 발급합니다. PDF에 디지털 서명과 QR 코드를 삽입하여 위조를 원천 차단하며,
                오픈해시 체인에 발급 이력을 영구 기록합니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">📋 발급 가능 증명서</h3>
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20">
                    <div class="font-bold text-white">인감증명서</div>
                    <div class="text-xs text-gray-400 mt-1">실시간 인감 조회 및 발급</div>
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20">
                    <div class="font-bold text-white">가족관계증명서</div>
                    <div class="text-xs text-gray-400 mt-1">대법원 연계 자동 발급</div>
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20">
                    <div class="font-bold text-white">토지/건축물대장</div>
                    <div class="text-xs text-gray-400 mt-1">국토부 연계 즉시 발급</div>
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20">
                    <div class="font-bold text-white">납세증명서</div>
                    <div class="text-xs text-gray-400 mt-1">국세청/지자체 통합 발급</div>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">🔐 위조 방지 기술</h3>
            <ul class="space-y-2 text-gray-300">
                <li class="flex items-center gap-2">
                    <span class="text-green-400">✓</span>
                    <span>SHA-256 기반 디지털 서명</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-green-400">✓</span>
                    <span>QR 코드 진위 확인 시스템</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-green-400">✓</span>
                    <span>오픈해시 4계층 분산 기록</span>
                </li>
                <li class="flex items-center gap-2">
                    <span class="text-green-400">✓</span>
                    <span>타임스탬프 기반 발급 시점 증명</span>
                </li>
            </ul>
        `,
        tech_stack: ["Claude Sonnet 4", "LLaMA 3", "PDF 디지털 서명", "QR 인증", "OpenHash"]
    },
    "welfare_agent": {
        title: "🏠 복지상담 Agent",
        subtitle: "AI 기반 복지 자격 자동 판단 및 신청 지원",
        llm_info: "GPT-4o, Gemini Pro 기반 복지 전문 모델",
        performance: "복지 사각지대 94% 해소",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                주민의 PDV에 저장된 소득, 재산, 가구 정보를 자동 분석하여 수급 자격이 있는 복지 제도를 
                AI가 찾아내고 자동으로 신청까지 지원합니다. 복지 사각지대에 있는 94%의 잠재 수급자를 
                발굴하여 혜택을 받을 수 있도록 합니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">🏥 지원 가능 복지 제도</h3>
            <div class="space-y-3 mb-4">
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">기초생활보장</div>
                        <div class="text-xs text-green-400 px-2 py-1 bg-green-500/20 rounded">자동 신청</div>
                    </div>
                    <div class="text-sm text-gray-400">생계·의료·주거·교육급여 자동 판단 및 신청</div>
                </div>
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">기초연금</div>
                        <div class="text-xs text-green-400 px-2 py-1 bg-green-500/20 rounded">자동 신청</div>
                    </div>
                    <div class="text-sm text-gray-400">만 65세 이상 소득하위 70% 자동 신청</div>
                </div>
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">장애인 복지</div>
                        <div class="text-xs text-green-400 px-2 py-1 bg-green-500/20 rounded">자동 신청</div>
                    </div>
                    <div class="text-sm text-gray-400">장애인연금, 활동지원, 보조기기 지원</div>
                </div>
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">아동수당·양육수당</div>
                        <div class="text-xs text-green-400 px-2 py-1 bg-green-500/20 rounded">자동 신청</div>
                    </div>
                    <div class="text-sm text-gray-400">0~7세 아동 가구 자동 신청 및 지급</div>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">📈 주요 성과</h3>
            <div class="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/30">
                <div class="text-3xl font-bold text-green-400 mb-2">94%</div>
                <div class="text-gray-300">복지 사각지대 해소율</div>
                <div class="text-sm text-gray-400 mt-2">자격이 있지만 신청하지 않아 혜택을 받지 못하던 주민의 94%를 발굴하여 지원</div>
            </div>
        `,
        tech_stack: ["GPT-4o", "Gemini Pro", "소득·재산 분석 AI", "자격요건 매칭", "자동 신청 시스템"]
    },
    "tax_agent": {
        title: "💰 세무처리 Agent",
        subtitle: "확장 재무제표 기반 지방세 자동 부과/징수",
        llm_info: "세무 전문 Fine-tuning 모델",
        performance: "처리 시간 80% 단축, 과세 오류 0%",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                모든 개인과 법인의 PDV에 자동 생성되는 확장 재무제표를 실시간 분석하여 
                재산세, 자동차세, 주민세, 지방소득세 등을 정확하게 계산하고 부과합니다. 
                납세자 재무제표에서 세금을 차변 처리하고, 읍면동 재무제표에 대변으로 기록하여 
                모든 거래가 투명하게 추적됩니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">💳 확장 재무제표 기반 과세</h3>
            <p class="text-gray-300 mb-4">
                본 시스템은 한국의 모든 개인, 법인, 정부 기관에 확장 재무제표를 자동 생성하여 
                실시간으로 갱신합니다. 이를 통해 세금 거래가 복식부기로 정확하게 기록됩니다.
            </p>
            
            <div class="grid md:grid-cols-2 gap-4 mb-4">
                <div class="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-lg p-4 border border-red-500/30">
                    <div class="text-lg font-bold text-red-400 mb-2">납세자 재무제표</div>
                    <div class="text-sm text-gray-300 space-y-1">
                        <div class="flex justify-between">
                            <span>자산:</span>
                            <span class="text-white">10,000,000원</span>
                        </div>
                        <div class="flex justify-between text-red-400 font-bold">
                            <span>재산세 납부 (차변):</span>
                            <span>-250,000원</span>
                        </div>
                        <div class="flex justify-between">
                            <span>잔액:</span>
                            <span class="text-white">9,750,000원</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/30">
                    <div class="text-lg font-bold text-green-400 mb-2">정부 재무제표</div>
                    <div class="text-sm text-gray-300 space-y-1">
                        <div class="flex justify-between">
                            <span>자산:</span>
                            <span class="text-white">500,000,000원</span>
                        </div>
                        <div class="flex justify-between text-green-400 font-bold">
                            <span>재산세 수납 (대변):</span>
                            <span>+250,000원</span>
                        </div>
                        <div class="flex justify-between">
                            <span>잔액:</span>
                            <span class="text-white">500,250,000원</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">📋 처리 가능 세목</h3>
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300">
                    <span class="text-cyan-400">•</span> 재산세 (토지, 건물)
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300">
                    <span class="text-cyan-400">•</span> 자동차세
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300">
                    <span class="text-cyan-400">•</span> 주민세 (개인분, 사업소분)
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300">
                    <span class="text-cyan-400">•</span> 지방소득세
                </div>
            </div>
        `,
        tech_stack: ["세무 전문 AI", "확장 재무제표", "복식부기 자동화", "실시간 과세표준 계산", "OpenHash"]
    },
    "complaint_agent": {
        title: "📞 민원상담 Agent",
        subtitle: "24시간 AI 기반 민원 접수 및 실시간 처리",
        llm_info: "Claude Sonnet 4 기반 대화형 AI",
        performance: "응답 시간 1초, 해결율 87%",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                도로 파손, 가로등 고장, 쓰레기 불법 투기, 소음 문제 등 주민 불편사항을 
                24시간 365일 접수하고 즉시 처리합니다. Claude Sonnet 4 기반 대화형 AI가 
                자연어로 민원을 이해하고, 자동으로 담당 부서에 배정하며, 처리 현황을 실시간 추적합니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">📋 민원 유형별 처리</h3>
            <div class="space-y-3 mb-4">
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white flex items-center gap-2">
                            <span>🚧</span> 도로/시설 불편
                        </div>
                        <div class="text-xs text-green-400">평균 2시간 처리</div>
                    </div>
                    <div class="text-sm text-gray-400">도로 파손, 가로등 고장, 신호등 문제 등</div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white flex items-center gap-2">
                            <span>🌳</span> 환경/소음 신고
                        </div>
                        <div class="text-xs text-green-400">평균 4시간 처리</div>
                    </div>
                    <div class="text-sm text-gray-400">쓰레기 불법 투기, 소음, 악취 등</div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white flex items-center gap-2">
                            <span>🚨</span> 안전 신고
                        </div>
                        <div class="text-xs text-red-400">즉시 처리</div>
                    </div>
                    <div class="text-sm text-gray-400">위험 시설물, 재난 우려, 범죄 의심 등</div>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">⚡ 처리 프로세스</h3>
            <ol class="space-y-2 text-gray-300">
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 font-bold">1.</span>
                    <span>AI가 민원 내용을 자연어로 이해하고 유형 자동 분류</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 font-bold">2.</span>
                    <span>담당 부서(건설과, 환경과 등)에 자동 배정</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 font-bold">3.</span>
                    <span>현장 확인 및 조치 진행 (사진, GPS 자동 기록)</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 font-bold">4.</span>
                    <span>처리 완료 시 신고자에게 자동 알림</span>
                </li>
                <li class="flex items-start gap-2">
                    <span class="text-cyan-400 font-bold">5.</span>
                    <span>만족도 조사 및 피드백 수집</span>
                </li>
            </ol>
        `,
        tech_stack: ["Claude Sonnet 4", "자연어 처리", "유형 분류 AI", "GPS 위치 추적", "실시간 알림"]
    },
    "verification_agent": {
        title: "🔍 교차검증 Agent",
        subtitle: "거래 당사자 간 데이터 일치 여부 자동 검증",
        llm_info: "해시 비교 알고리즘 + 이상 탐지 AI",
        performance: "불일치 탐지율 100%, 1초 내 검증",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                거래 또는 활동에 참여하는 모든 당사자가 각자의 PDV에 동일한 거래를 기록하면, 
                해시값을 비교하여 데이터 일치 여부를 자동으로 검증합니다. 불일치가 발견되면 
                즉시 양측에 경고를 발송하고, 필요 시 관련 당국(국세청, 금융감독원 등)에 자동 통보합니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">🔐 교차검증 프로세스</h3>
            <div class="space-y-4 mb-4">
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="font-bold text-white mb-2 flex items-center gap-2">
                        <span class="text-green-400">✓</span> 1단계: 거래 발생
                    </div>
                    <div class="text-sm text-gray-300">
                        개인 A와 법인 B 간 1,000,000원 거래 발생
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="font-bold text-white mb-2 flex items-center gap-2">
                        <span class="text-green-400">✓</span> 2단계: 각자 PDV에 기록
                    </div>
                    <div class="text-sm text-gray-300">
                        • 개인 A: "법인 B에게 1,000,000원 지급"<br/>
                        • 법인 B: "개인 A로부터 1,000,000원 수령"
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="font-bold text-white mb-2 flex items-center gap-2">
                        <span class="text-green-400">✓</span> 3단계: 해시값 생성 및 비교
                    </div>
                    <div class="text-sm text-gray-300">
                        SHA-256 해시 생성 → 오픈해시 계층에 기록 → 자동 비교
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="font-bold text-white mb-2 flex items-center gap-2">
                        <span class="text-yellow-400">⚠</span> 4단계: 불일치 탐지 시
                    </div>
                    <div class="text-sm text-gray-300">
                        즉시 양측에 경고 발송 + 관련 당국 자동 통보
                    </div>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">⚠️ 실제 탐지 사례</h3>
            <div class="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-4 border border-red-500/30">
                <div class="font-bold text-red-400 mb-2">사례: 허위 거래 적발</div>
                <div class="text-sm text-gray-300">
                    • 개인 A 기록: 1,000,000원 지급<br/>
                    • 법인 B 기록: 500,000원 수령 (허위)<br/>
                    • 해시 불일치 즉시 탐지 → 양측 경고 + 국세청 통보<br/>
                    • 결과: 세금 탈루 시도 사전 차단
                </div>
            </div>
        `,
        tech_stack: ["SHA-256 해시", "자동 비교 알고리즘", "이상 탐지 AI", "실시간 경고 시스템", "당국 연계"]
    },
    "pdv_agent": {
        title: "🔐 PDV관리 Agent",
        subtitle: "프라이빗 데이터 금고 암호화 저장 및 접근 제어",
        llm_info: "AES-256 암호화 + 블록체인 키 관리",
        performance: "해킹 시도 0건, 개인정보 유출 0건",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                모든 주민의 개인정보와 활동 이력을 AES-256으로 암호화하여 본인의 단말기에만 저장합니다. 
                원본 데이터는 클라우드나 정부 서버에 저장되지 않으며, 오직 해시값만 오픈해시 계층에 
                기록되어 무결성을 검증합니다. 개인정보 주권을 완전히 보장합니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">🔐 보안 아키텍처</h3>
            <div class="space-y-4 mb-4">
                <div class="bg-black/30 rounded-lg p-4 border border-green-500/30">
                    <div class="font-bold text-green-400 mb-2">📱 로컬 저장 (단말기)</div>
                    <div class="text-sm text-gray-300">
                        • 원본 데이터: 스마트폰/PC에 AES-256 암호화 저장<br/>
                        • 복호화 키: 생체 인증(지문, 얼굴) + 비밀번호<br/>
                        • 백업: 개인 클라우드 (Google Drive, iCloud) 암호화 저장
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/30">
                    <div class="font-bold text-cyan-400 mb-2">⛓️ 오픈해시 계층</div>
                    <div class="text-sm text-gray-300">
                        • SHA-256 해시값만 기록 (원본 데이터 없음)<br/>
                        • 4계층 분산 기록으로 무결성 검증<br/>
                        • 타임스탬프로 시간 순서 보장
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-red-500/30">
                    <div class="font-bold text-red-400 mb-2">🚫 접근 불가</div>
                    <div class="text-sm text-gray-300">
                        • 정부, 기업, 제3자 접근 원천 차단<br/>
                        • 소유자 동의 없이 복호화 불가능<br/>
                        • 해킹 시도 시 자동 알림 및 차단
                    </div>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">📋 저장되는 데이터</h3>
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300 text-sm">
                    • 주민등록 정보
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300 text-sm">
                    • 금융 거래 내역
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300 text-sm">
                    • 의료 기록
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300 text-sm">
                    • 세금 납부 이력
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300 text-sm">
                    • 복지 수급 내역
                </div>
                <div class="bg-black/30 rounded-lg p-3 border border-cyan-500/20 text-gray-300 text-sm">
                    • 일상 활동 로그
                </div>
            </div>
        `,
        tech_stack: ["AES-256 암호화", "생체 인증", "Zero-Knowledge Proof", "OpenHash 해시 체인", "GDPR 준수"]
    },
    "openhash_agent": {
        title: "⛓️ 오픈해시 Agent",
        subtitle: "4계층 분산 해시 체인 기록 및 무결성 검증",
        llm_info: "확률적 계층 선택 알고리즘",
        performance: "에너지 98.5% 절감, TPS 선형 증가",
        description: `
            <h3 class="text-xl font-bold text-cyan-400 mb-4">🎯 핵심 기능</h3>
            <p class="text-gray-300 mb-4">
                블록체인의 작업증명(PoW)이나 지분증명(PoS) 없이, SHA-256 재해싱 기반 확률적 계층 선택을 
                통해 데이터 무결성을 분산 검증합니다. 기존 통신 인프라(226개 시군구, 3,551개 읍면동, 
                17개 시도, 1개 중앙)를 활용하여 에너지를 98.5% 절감하면서도 노드 수에 비례하여 TPS가 증가합니다.
            </p>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">⛓️ 4계층 분산 구조</h3>
            <div class="space-y-3 mb-4">
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">계층 1: 시군구</div>
                        <div class="text-cyan-400 text-sm">226개 노드</div>
                    </div>
                    <div class="text-sm text-gray-400">
                        서울시 강남구, 제주시 등 226개 시군구 서버
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">계층 2: 읍면동</div>
                        <div class="text-cyan-400 text-sm">3,551개 노드</div>
                    </div>
                    <div class="text-sm text-gray-400">
                        전국 3,551개 읍면동 행정복지센터 서버
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">계층 3: 광역</div>
                        <div class="text-cyan-400 text-sm">17개 노드</div>
                    </div>
                    <div class="text-sm text-gray-400">
                        서울시, 제주도 등 17개 시도 서버
                    </div>
                </div>
                
                <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-bold text-white">계층 4: 중앙</div>
                        <div class="text-cyan-400 text-sm">1개 노드</div>
                    </div>
                    <div class="text-sm text-gray-400">
                        행정안전부 중앙 서버
                    </div>
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">📊 확률적 계층 선택</h3>
            <p class="text-gray-300 mb-4 text-sm">
                SHA-256 해시를 재해싱하여 각 계층에 25% 확률로 기록됩니다. 
                평균적으로 4개 계층 중 1개 이상에 기록되어 무결성이 보장됩니다.
            </p>
            <div class="bg-black/30 rounded-lg p-4 border border-cyan-500/20 mb-4">
                <code class="text-cyan-400 text-xs">
                    rehash = SHA256(hash + layer_id)<br/>
                    if int(rehash[:2], 16) < 64: # 25% 확률<br/>
                    &nbsp;&nbsp;record_to_layer(hash)
                </code>
            </div>
            
            <h3 class="text-xl font-bold text-cyan-400 mb-3 mt-6">🔋 vs 블록체인 비교</h3>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-lg p-4 border border-red-500/30">
                    <div class="font-bold text-red-400 mb-2">❌ 블록체인</div>
                    <ul class="text-sm text-gray-300 space-y-1">
                        <li>• PoW/PoS 에너지 소모</li>
                        <li>• TPS 제한 (10-50)</li>
                        <li>• 노드 증가 시 느려짐</li>
                    </ul>
                </div>
                <div class="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/30">
                    <div class="font-bold text-green-400 mb-2">✓ 오픈해시</div>
                    <ul class="text-sm text-gray-300 space-y-1">
                        <li>• 98.5% 에너지 절감</li>
                        <li>• TPS 무제한 확장</li>
                        <li>• 노드 증가 시 빨라짐</li>
                    </ul>
                </div>
            </div>
        `,
        tech_stack: ["SHA-256 해싱", "확률적 선택", "4계층 분산", "기존 인프라 활용", "선형 확장"]
    }
};

function Modal({ agent, onClose }) {
    if (!agent) return null;
    
    const detail = AGENT_DETAILS[agent.id];
    
    return React.createElement('div', { 
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', { className: 'absolute inset-0 bg-black/80 backdrop-blur-sm' }),
        React.createElement('div', { 
            className: 'relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-cyan-500/30',
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 px-8 py-6 border-b border-cyan-500/30 backdrop-blur-sm' },
                React.createElement('div', { className: 'flex items-center justify-between' },
                    React.createElement('div', {},
                        React.createElement('h2', { className: 'text-3xl font-bold text-cyan-400 neon-text mb-2' }, detail.title),
                        React.createElement('p', { className: 'text-gray-300 text-lg' }, detail.subtitle),
                        React.createElement('div', { className: 'mt-3 flex gap-3' },
                            React.createElement('span', { className: 'px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold border border-green-500/30 flex items-center gap-1' },
                                '● Online'
                            ),
                            React.createElement('span', { className: 'px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-bold border border-cyan-500/30' },
                                detail.llm_info
                            )
                        )
                    ),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-gray-400 hover:text-white text-4xl font-bold transition-colors'
                    }, '×')
                )
            ),
            
            React.createElement('div', { className: 'overflow-y-auto max-h-[calc(90vh-180px)] px-8 py-6' },
                React.createElement('div', { 
                    className: 'prose prose-invert max-w-none',
                    dangerouslySetInnerHTML: { __html: detail.description }
                }),
                
                React.createElement('div', { className: 'mt-8 bg-black/30 rounded-xl p-6 border border-cyan-500/20' },
                    React.createElement('h3', { className: 'text-xl font-bold text-cyan-400 mb-4' }, '🛠️ 기술 스택'),
                    React.createElement('div', { className: 'flex flex-wrap gap-2' },
                        detail.tech_stack.map((tech, idx) =>
                            React.createElement('span', {
                                key: idx,
                                className: 'px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg text-sm font-semibold border border-cyan-500/30'
                            }, tech)
                        )
                    )
                )
            ),
            
            React.createElement('div', { className: 'sticky bottom-0 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 px-8 py-4 border-t border-cyan-500/30 backdrop-blur-sm flex justify-between items-center' },
                React.createElement('div', { className: 'text-gray-300 text-sm' },
                    React.createElement('span', { className: 'font-bold text-green-400' }, '⚡ 성능: '),
                    detail.performance
                ),
                React.createElement('button', {
                    onClick: onClose,
                    className: 'px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all'
                }, '닫기')
            )
        )
    );
}

function App() {
    const [systemInfo, setSystemInfo] = useState(null);
    const [services, setServices] = useState([]);
    const [agents, setAgents] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [simulating, setSimulating] = useState(false);
    const [simulationData, setSimulationData] = useState(null);
    const [simulationStep, setSimulationStep] = useState(0);
    const [selectedAgent, setSelectedAgent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    // URL 파라미터 읽기 (딥링크)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const agentId = params.get('agent');
        if (agentId && agents && agents.length > 0) {
            const agent = agents.find(a => a.id === agentId);
            if (agent) {
                setSelectedAgent(agent);
                setActiveTab('agents'); // AI 탭으로 자동 전환
            }
        }
    }, [agents]);

    // Deep link: Read URL parameter and auto-open agent modal
    useEffect(() => {
        if (!agents || agents.length === 0) return;
        
        const params = new URLSearchParams(window.location.search);
        const agentId = params.get('agent');
        
        if (agentId) {
            const agent = agents.find(a => a.id === agentId);
            if (agent) {
                setSelectedAgent(agent);
                setActiveTab('agents');
            }
        }
    }, [agents]);

    const fetchData = async () => {
        try {
            const [infoRes, servicesRes, agentsRes] = await Promise.all([
                fetch(`${API_BASE}/info`),
                fetch(`${API_BASE}/services`),
                fetch(`${API_BASE}/agents`)
            ]);
            setSystemInfo(await infoRes.json());
            setServices((await servicesRes.json()).services);
            setAgents((await agentsRes.json()).agents);
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    };
