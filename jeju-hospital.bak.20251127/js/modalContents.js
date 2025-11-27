// 오픈해시 기술 모달 컨텐츠
window.OPENHASH_CONTENT = {
    title: "오픈해시 기술",
    subtitle: "의료 데이터의 무결성을 보장하는 혁신적 기술",
    tabs: [
        {
            id: "overview",
            label: "개요",
            icon: "🔒",
            content: {
                title: "오픈해시란?",
                description: "블록체인의 98.5% 에너지를 절감하면서도 데이터 무결성을 보장하는 혁신적 기술",
                features: [
                    {
                        icon: "⚡",
                        title: "98.5% 에너지 절감",
                        description: "블록체인 대비 극도로 낮은 에너지 소비"
                    },
                    {
                        icon: "🔐",
                        title: "SHA-256 암호화",
                        description: "군사급 암호화로 데이터 보안 보장"
                    },
                    {
                        icon: "📊",
                        title: "25,907 TPS",
                        description: "초당 25,907건의 거래 처리 (블록체인 대비 1,727배)"
                    },
                    {
                        icon: "✅",
                        title: "100% 무결성",
                        description: "모든 의료 데이터가 위변조되지 않았음을 보장"
                    }
                ]
            }
        },
        {
            id: "medical",
            label: "의료 적용",
            icon: "🏥",
            content: {
                title: "의료 분야에서의 오픈해시",
                description: "환자 데이터의 무결성이 생명을 좌우합니다",
                sections: [
                    {
                        icon: "🔬",
                        title: "진단 데이터 보호",
                        points: [
                            "X-Ray, CT, MRI 등 모든 영상 데이터의 해시값 저장",
                            "혈액검사, 소변검사 결과의 위변조 방지",
                            "AI 진단 결과의 무결성 보장"
                        ]
                    },
                    {
                        icon: "💊",
                        title: "처방 기록 보호",
                        points: [
                            "약물 처방 내역의 정확한 기록",
                            "투약량 변경 이력 추적",
                            "부작용 보고의 신뢰성 확보"
                        ]
                    },
                    {
                        icon: "📋",
                        title: "진료 기록 보호",
                        points: [
                            "의사-환자 간 진료 내용 무결성",
                            "치료 계획 변경 이력 보존",
                            "법적 분쟁 시 증거 자료 제공"
                        ]
                    }
                ]
            }
        },
        {
            id: "pdv",
            label: "개인정보금고",
            icon: "🔐",
            content: {
                title: "개인정보금고 (PDV) 시스템",
                description: "환자 본인만 접근 가능한 완전한 개인정보 주권",
                features: [
                    {
                        icon: "🏦",
                        title: "분산 저장",
                        description: "원본 데이터는 환자 단말기에만 저장",
                        details: "AES-256 암호화로 보호"
                    },
                    {
                        icon: "🔑",
                        title: "본인만 접근",
                        description: "환자 본인의 승인 없이는 누구도 접근 불가",
                        details: "의료진도 환자 동의 필요"
                    },
                    {
                        icon: "📱",
                        title: "언제 어디서나",
                        description: "스마트폰으로 본인의 모든 의료 기록 조회",
                        details: "병원 방문 없이 기록 확인"
                    },
                    {
                        icon: "🔗",
                        title: "병원 간 연동",
                        description: "A병원 기록을 B병원에서도 활용",
                        details: "중복 검사 방지"
                    }
                ]
            }
        },
        {
            id: "security",
            label: "보안",
            icon: "🛡️",
            content: {
                title: "다층 보안 시스템",
                description: "의료 데이터에 특화된 보안 아키텍처",
                layers: [
                    {
                        level: "1층",
                        name: "암호화",
                        description: "AES-256 + RSA-2048 이중 암호화",
                        color: "from-red-500 to-pink-500"
                    },
                    {
                        level: "2층",
                        name: "해시 체인",
                        description: "SHA-256 해시 체인으로 위변조 탐지",
                        color: "from-orange-500 to-yellow-500"
                    },
                    {
                        level: "3층",
                        name: "분산 검증",
                        description: "4계층 분산 시스템으로 무결성 검증",
                        color: "from-green-500 to-teal-500"
                    },
                    {
                        level: "4층",
                        name: "접근 제어",
                        description: "Zero Trust 모델 기반 접근 권한 관리",
                        color: "from-blue-500 to-purple-500"
                    }
                ]
            }
        },
        {
            id: "benefits",
            label: "장점",
            icon: "⭐",
            content: {
                title: "오픈해시의 의료 혁신",
                description: "기존 시스템 대비 압도적 우위",
                comparison: [
                    {
                        aspect: "데이터 무결성",
                        traditional: "❌ 중앙서버 해킹 시 전체 손실",
                        openhash: "✅ 분산 저장으로 해킹 불가능"
                    },
                    {
                        aspect: "환자 주권",
                        traditional: "❌ 병원이 데이터 소유",
                        openhash: "✅ 환자 본인이 완전 통제"
                    },
                    {
                        aspect: "처리 속도",
                        traditional: "❌ 블록체인: 7-15 TPS",
                        openhash: "✅ 오픈해시: 25,907 TPS"
                    },
                    {
                        aspect: "에너지 효율",
                        traditional: "❌ 블록체인: 막대한 전력 소비",
                        openhash: "✅ 오픈해시: 98.5% 절감"
                    },
                    {
                        aspect: "비용",
                        traditional: "❌ 높은 인프라 및 운영 비용",
                        openhash: "✅ 기존 통신망 활용으로 저비용"
                    }
                ]
            }
        },
        {
            id: "workflow",
            label: "작동 원리",
            icon: "⚙️",
            content: {
                title: "오픈해시 작동 과정",
                description: "환자 진료 시 오픈해시가 작동하는 방식",
                steps: [
                    {
                        step: 1,
                        title: "진료 기록 생성",
                        description: "의사가 진료 내용을 입력",
                        technical: "원본 데이터 → AES-256 암호화 → 환자 PDV 저장"
                    },
                    {
                        step: 2,
                        title: "해시값 생성",
                        description: "진료 기록의 해시값 계산",
                        technical: "SHA-256(진료기록) → 64자리 해시값"
                    },
                    {
                        step: 3,
                        title: "분산 저장",
                        description: "해시값을 4계층에 분산 저장",
                        technical: "확률적 계층 선택: 70%-20%-9%-1%"
                    },
                    {
                        step: 4,
                        title: "무결성 검증",
                        description: "기록 조회 시 해시 일치 여부 확인",
                        technical: "저장된 해시 vs 현재 해시 비교"
                    },
                    {
                        step: 5,
                        title: "위변조 탐지",
                        description: "불일치 시 즉시 경고",
                        technical: "Hash Mismatch → Alert → 관련 당국 통보"
                    }
                ]
            }
        },
        {
            id: "proof",
            label: "실증 결과",
            icon: "📊",
            content: {
                title: "AWS 실증 실험 결과",
                description: "2025년 11월 실제 테스트 데이터",
                metrics: [
                    {
                        name: "처리 속도",
                        value: "25,907 TPS",
                        comparison: "블록체인 대비 1,727배",
                        icon: "⚡"
                    },
                    {
                        name: "에너지 효율",
                        value: "98.5% 절감",
                        comparison: "블록체인 대비",
                        icon: "🌱"
                    },
                    {
                        name: "계층 선택 정확도",
                        value: "98.9%",
                        comparison: "설계 목표 대비 오차 1.1%",
                        icon: "🎯"
                    },
                    {
                        name: "데이터 무결성",
                        value: "100%",
                        comparison: "위변조 즉시 탐지",
                        icon: "🔒"
                    }
                ],
                testCase: {
                    title: "허위 데이터 탐지 테스트",
                    scenario: "법인 B가 거래 금액을 허위로 기록한 경우",
                    result: "해시 불일치 즉시 탐지 및 양측에 경고 발송",
                    time: "0.01초 이내"
                }
            }
        }
    ]
};

// AI 진단 프로세스 모달 컨텐츠
window.AI_DIAGNOSIS_CONTENT = {
    title: "AI 진단 프로세스",
    subtitle: "인간 의료진과 AI의 완벽한 협업",
    sections: [
        {
            icon: "🔍",
            title: "1단계: 증상 분석",
            description: "환자의 증상과 기존 병력을 AI가 분석합니다",
            details: [
                "자연어 처리로 환자 진술 분석",
                "과거 병력과의 연관성 파악",
                "유사 사례 데이터베이스 검색",
                "초기 진단 가설 수립"
            ]
        },
        {
            icon: "🏥",
            title: "2단계: 검사 장비 제어",
            description: "필요한 검사를 자동으로 실행합니다",
            details: [
                "X-Ray, CT, MRI 등 장비 자동 제어",
                "최적의 촬영 각도 및 파라미터 설정",
                "혈액/소변 검사 의뢰",
                "실시간 검사 결과 수신"
            ]
        },
        {
            icon: "🤖",
            title: "3단계: AI 분석",
            description: "Claude AI가 모든 데이터를 종합 분석합니다",
            details: [
                "의료 영상 패턴 인식",
                "검사 수치의 이상 징후 탐지",
                "5만 페이지 의학 문헌 검색",
                "최신 치료 가이드라인 적용"
            ]
        },
        {
            icon: "👨‍⚕️",
            title: "4단계: 의료진 검토",
            description: "AI 결과를 인간 의사가 최종 확인합니다",
            details: [
                "AI 진단의 타당성 검토",
                "환자 개별 상황 고려",
                "치료 계획 수립 및 수정",
                "최종 승인 및 처방"
            ]
        },
        {
            icon: "💊",
            title: "5단계: 치료 실행",
            description: "승인된 치료 계획을 실행합니다",
            details: [
                "약물 처방 및 투여",
                "수술/시술 일정 수립",
                "간호사 배정 및 케어 플랜",
                "추적 검사 일정 등록"
            ]
        },
        {
            icon: "📊",
            title: "6단계: 지속 모니터링",
            description: "치료 중 환자 상태를 실시간 추적합니다",
            details: [
                "생체 신호 24시간 모니터링",
                "약물 부작용 감시",
                "치료 효과 평가",
                "필요시 치료 계획 조정"
            ]
        }
    ],
    collaboration: {
        title: "AI와 의료진의 역할 분담",
        aiRole: [
            "방대한 의료 데이터 검색 (0.01초)",
            "패턴 인식 및 이상 징후 탐지",
            "24시간 환자 상태 모니터링",
            "반복적 업무 자동화"
        ],
        humanRole: [
            "환자와의 공감적 소통",
            "윤리적 판단 및 최종 결정",
            "복잡한 수술 및 시술 수행",
            "AI 결과의 검증 및 승인"
        ]
    }
};

// PDV 데이터 흐름 모달 컨텐츠
window.PDV_FLOW_CONTENT = {
    title: "개인정보금고 데이터 흐름",
    subtitle: "환자 데이터가 안전하게 관리되는 과정",
    flow: [
        {
            step: 1,
            icon: "🏥",
            title: "병원 방문",
            description: "환자가 제주대학병원에 내원합니다",
            dataFlow: "환자 신원 확인 → PDV 접근 권한 요청"
        },
        {
            step: 2,
            icon: "🔐",
            title: "권한 승인",
            description: "환자 본인이 스마트폰으로 승인합니다",
            dataFlow: "생체인증 → 임시 키 생성 → 병원에 전달"
        },
        {
            step: 3,
            icon: "📥",
            title: "기록 조회",
            description: "병원이 과거 진료 기록을 조회합니다",
            dataFlow: "임시 키로 PDV 접근 → 암호화된 기록 복호화"
        },
        {
            step: 4,
            icon: "🔬",
            title: "진료 실시",
            description: "의료진이 진찰 및 검사를 실시합니다",
            dataFlow: "새로운 진료 데이터 생성 → AES-256 암호화"
        },
        {
            step: 5,
            icon: "💾",
            title: "PDV 저장",
            description: "새 진료 기록이 PDV에 저장됩니다",
            dataFlow: "암호화된 원본 → 환자 PDV 저장"
        },
        {
            step: 6,
            icon: "🔗",
            title: "오픈해시 기록",
            description: "해시값만 분산 시스템에 기록됩니다",
            dataFlow: "SHA-256 해시 → 4계층 분산 저장"
        },
        {
            step: 7,
            icon: "✅",
            title: "무결성 검증",
            description: "데이터 무결성이 자동 검증됩니다",
            dataFlow: "저장된 해시 vs 원본 해시 비교"
        },
        {
            step: 8,
            icon: "🔒",
            title: "접근 종료",
            description: "진료 완료 후 병원의 접근 권한이 자동 만료됩니다",
            dataFlow: "임시 키 파기 → 접근 로그 기록 → PDV 잠금"
        }
    ],
    security: {
        title: "보안 원칙",
        principles: [
            "원본 데이터는 절대 병원 서버에 저장 안 함",
            "환자 승인 없이는 누구도 접근 불가",
            "모든 접근 기록이 PDV에 로그로 남음",
            "의료진도 필요한 범위만 일시적으로 접근"
        ]
    }
};
