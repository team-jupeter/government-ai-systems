// app.js - 메인 애플리케이션
const { useState, useEffect } = React;

// 모달 컨텐츠 데이터
const modalContents = {
    // ===== 핵심 기술 모달 =====
    fpga: {
        title: 'FPGA 하드웨어 가속',
        icon: '⚡',
        iconBg: 'bg-gradient-to-r from-yellow-500 to-orange-600',
        content: [
            { type: 'heading', text: '하드웨어 사양' },
            { type: 'spec', label: '칩셋', value: 'Xilinx Versal ACAP VCK190' },
            { type: 'spec', label: '동작 주파수', value: '412.3MHz' },
            { type: 'spec', label: '논리셀', value: '899,840개 (899K)' },
            { type: 'spec', label: 'DSP 슬라이스', value: '1,757개' },
            { type: 'spec', label: 'BRAM 블록', value: '1,685개' },
            { type: 'spec', label: '전력 소비', value: '15.7W (초저전력)' },
            { type: 'divider' },
            { type: 'heading', text: '핵심 연산 모듈' },
            { type: 'paragraph', text: 'BN254 타원곡선 페어링 연산을 통해 디지털 화폐의 발행, 전송, 소각을 수행합니다.' },
            { type: 'list', items: [
                'BN254 연산부: 타원곡선 암호 연산',
                '병렬 곱셈기: 대규모 병렬 처리',
                '모듈러 연산부: 고속 나머지 연산',
                '메모리 컨트롤러: 최적화된 데이터 접근'
            ]},
            { type: 'divider' },
            { type: 'heading', text: '성능 우위' },
            { type: 'paragraph', text: 'GPU 대비 88.6% 전력 절감을 달성하면서도 0.015ms의 초고속 처리 성능을 제공합니다. 이는 기존 시스템 대비 3,333배 이상의 성능 향상입니다.' }
        ]
    },
    ai: {
        title: 'AI 검증 엔진',
        icon: '🧠',
        iconBg: 'bg-gradient-to-r from-purple-500 to-pink-600',
        content: [
            { type: 'heading', text: 'AI 모델 구성' },
            { type: 'spec', label: 'BERT 언어 모델', value: '768차원 임베딩' },
            { type: 'spec', label: 'CNN 특성 추출기', value: '패턴 인식' },
            { type: 'spec', label: 'LSTM 시계열 분석기', value: '거래 흐름 분석' },
            { type: 'spec', label: '앙상블 네트워크', value: '다중 모델 조합' },
            { type: 'divider' },
            { type: 'heading', text: '검증 성능 (1,000건 실증실험)' },
            { type: 'spec', label: '전체 정확도', value: '99.4% (994건/1,000건)' },
            { type: 'spec', label: '정밀도', value: '98.0%' },
            { type: 'spec', label: '재현율', value: '99.0%' },
            { type: 'spec', label: 'F1-Score', value: '98.5%' },
            { type: 'divider' },
            { type: 'heading', text: '처리 속도' },
            { type: 'spec', label: '평균 AI 추론', value: '0.015ms' },
            { type: 'spec', label: 'BERT 임베딩', value: '0.008ms' },
            { type: 'spec', label: 'CNN 패턴 분석', value: '0.004ms' },
            { type: 'spec', label: 'LSTM 시계열', value: '0.003ms' },
            { type: 'divider' },
            { type: 'heading', text: '보안 기능' },
            { type: 'paragraph', text: '적대적 공격에 대해 96.8%의 방어 성공률을 달성합니다. 의심도 계산 엔진과 Isolation Forest 알고리즘을 통해 이상 거래를 실시간 탐지합니다.' }
        ]
    },
    openhash: {
        title: 'OpenHash 분산원장',
        icon: '🔗',
        iconBg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
        content: [
            { type: 'heading', text: '기술 개요' },
            { type: 'paragraph', text: 'SHA-512 해시 체인 구조를 사용하는 분산 데이터 기록 기술로, 블록체인과 달리 PoW/PoS 합의를 사용하지 않아 에너지를 98.5% 절약합니다.' },
            { type: 'divider' },
            { type: 'heading', text: '핵심 성능' },
            { type: 'spec', label: '처리속도', value: '481 TPS (424만 TPS 확장)' },
            { type: 'spec', label: '에너지 절감', value: '98.5% (vs 블록체인)' },
            { type: 'spec', label: '연간 전력', value: '12.4 MWh (기존 850 MWh)' },
            { type: 'divider' },
            { type: 'heading', text: '주요 기능' },
            { type: 'list', items: [
                '위변조 불가능: Merkle Tree 기반 무결성 보장',
                '재무제표 자동 연동: AI 계정 분류로 실시간 생성',
                '크로스체인 상호운용: Lock-and-Mint 방식 60초 내 이동',
                '양자 내성 암호: CRYSTALS-Dilithium 적용'
            ]},
            { type: 'divider' },
            { type: 'heading', text: '데이터 신뢰도 체인' },
            { type: 'paragraph', text: '각 데이터의 출처, 변형 이력, AI 판단 근거를 시간순으로 기록한 불변 체인으로, 감사 추적과 무결성 검증이 가능합니다.' }
        ]
    },
    // ===== 경제적 효과 모달 =====
    personal: {
        title: '개인 연간 혜택',
        icon: '👤',
        iconBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        content: [
            { type: 'heading', text: '연간 492만원 혜택 상세 내역' },
            { type: 'spec', label: '세무 비용 절감', value: '연 100만원' },
            { type: 'paragraph', text: '세무사 없이 자동 세무 신고/납부로 개인 세무 비용 완전 제거' },
            { type: 'spec', label: '금융 수수료 절감', value: '연 72만원' },
            { type: 'paragraph', text: '송금, 환전, 카드 수수료 등 각종 금융 수수료 대폭 절감' },
            { type: 'spec', label: '보험료 최적화', value: '연 180만원' },
            { type: 'paragraph', text: 'AI 기반 맞춤형 보험 설계로 불필요한 보장 제거, 최적 보험료 산정' },
            { type: 'spec', label: '투자 수익 증가', value: '연 140만원' },
            { type: 'paragraph', text: '실시간 재무 분석 기반 포트폴리오 최적화로 평균 수익률 향상' },
            { type: 'divider' },
            { type: 'heading', text: '추가 혜택' },
            { type: 'list', items: [
                '실시간 재무제표 자동 생성으로 재무 현황 즉시 파악',
                '개인정보 자기결정권 보장 (PIPA Article 37-2)',
                '데이터 이동권 및 삭제권 기술적 보장',
                '분식회계 원천 차단으로 투자 안전성 향상'
            ]}
        ]
    },
    finance: {
        title: '금융기관 운영비 절감',
        icon: '🏦',
        iconBg: 'bg-gradient-to-r from-emerald-500 to-green-500',
        content: [
            { type: 'heading', text: '65% 운영비 절감 분석' },
            { type: 'spec', label: '지점당 연간 절감액', value: '12.75억원' },
            { type: 'divider' },
            { type: 'heading', text: '절감 항목별 상세' },
            { type: 'spec', label: '인건비 절감', value: '40%' },
            { type: 'paragraph', text: '완전 자율 금융 서비스로 창구 업무 자동화, 인력 재배치' },
            { type: 'spec', label: '시스템 운영비', value: '30%' },
            { type: 'paragraph', text: '통합 플랫폼으로 중복 시스템 제거, 유지보수 비용 감소' },
            { type: 'spec', label: '보안 비용', value: '25%' },
            { type: 'paragraph', text: 'FPGA 기반 하드웨어 보안으로 소프트웨어 보안 솔루션 비용 절감' },
            { type: 'spec', label: '규제 준수 비용', value: '50%' },
            { type: 'paragraph', text: 'AI 자동 규제 검증으로 컴플라이언스 인력 및 외부 자문 비용 감소' },
            { type: 'divider' },
            { type: 'heading', text: '추가 효과' },
            { type: 'list', items: [
                '24시간 무중단 자율 금융 서비스 제공',
                '사기 탐지 정확도 99.4%로 손실 방지',
                '크로스체인 연동으로 글로벌 서비스 확장 용이'
            ]}
        ]
    },
    underground: {
        title: '지하경제 축소',
        icon: '📉',
        iconBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
        content: [
            { type: 'heading', text: '87.9% 지하경제 축소 효과' },
            { type: 'paragraph', text: '모든 거래가 디지털 화폐로 기록되어 현금 기반 탈세 및 불법 거래가 원천 차단됩니다.' },
            { type: 'divider' },
            { type: 'heading', text: '축소 메커니즘' },
            { type: 'spec', label: '현금 거래 대체율', value: '95% 이상' },
            { type: 'paragraph', text: '디지털 화폐의 편의성으로 현금 사용 자연 감소' },
            { type: 'spec', label: '거래 추적률', value: '100%' },
            { type: 'paragraph', text: '모든 거래 기록이 불변 원장에 기록, AI 패턴 분석으로 이상 거래 탐지' },
            { type: 'spec', label: '탈세 적발률', value: '99.7%' },
            { type: 'paragraph', text: '실시간 재무제표 연동으로 소득 은닉 불가능' },
            { type: 'divider' },
            { type: 'heading', text: '사회적 효과' },
            { type: 'list', items: [
                '공정한 세금 부담으로 성실 납세자 보호',
                '불법 자금 세탁 원천 차단',
                '투명한 경제 활동으로 사회 신뢰 향상',
                '범죄 수익 환수율 대폭 증가'
            ]}
        ]
    },
    tax: {
        title: '연간 추가 세수',
        icon: '💰',
        iconBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
        content: [
            { type: 'heading', text: '연간 40조원 추가 세수 분석' },
            { type: 'divider' },
            { type: 'heading', text: '세수 증가 원천별 상세' },
            { type: 'spec', label: '지하경제 양성화', value: '25조원' },
            { type: 'paragraph', text: '현재 GDP 대비 8% 수준의 지하경제 87.9% 양성화' },
            { type: 'spec', label: '탈세 방지', value: '10조원' },
            { type: 'paragraph', text: '실시간 재무제표로 소득 은닉 및 비용 부풀리기 원천 차단' },
            { type: 'spec', label: '부가세 누락 방지', value: '5조원' },
            { type: 'paragraph', text: '모든 거래 자동 기록으로 부가가치세 완전 포착' },
            { type: 'divider' },
            { type: 'heading', text: '재정 활용 효과' },
            { type: 'list', items: [
                '복지 예산 확대: 기초연금, 아동수당 인상 가능',
                '국가 채무 감축: GDP 대비 국가부채 비율 개선',
                '미래 투자 확대: R&D, 교육, 인프라 투자 여력 증가',
                '세율 인하 여지: 세수 기반 확대로 세율 인하 가능'
            ]},
            { type: 'divider' },
            { type: 'heading', text: '국가 경쟁력 강화' },
            { type: 'paragraph', text: '투명한 조세 시스템은 외국인 투자 유치와 국가 신용등급 향상에 기여합니다.' }
        ]
    }
};

// 모달 콘텐츠 렌더러
const renderModalContent = (content) => {
    return content.map((item, idx) => {
        switch (item.type) {
            case 'heading':
                return React.createElement('h3', {
                    key: idx,
                    className: 'text-lg font-bold text-white mt-6 mb-3 first:mt-0'
                }, item.text);
            case 'paragraph':
                return React.createElement('p', {
                    key: idx,
                    className: 'text-gray-300 mb-3 leading-relaxed'
                }, item.text);
            case 'spec':
                return React.createElement('div', {
                    key: idx,
                    className: 'flex justify-between items-center py-2 border-b border-slate-700/50'
                },
                    React.createElement('span', { className: 'text-gray-400' }, item.label),
                    React.createElement('span', { className: 'text-white font-semibold' }, item.value)
                );
            case 'list':
                return React.createElement('ul', {
                    key: idx,
                    className: 'space-y-2 mt-2'
                },
                    item.items.map((li, liIdx) =>
                        React.createElement('li', {
                            key: liIdx,
                            className: 'flex items-start gap-2 text-gray-300'
                        },
                            React.createElement('span', {
                                className: 'text-emerald-400 mt-1'
                            }, '✓'),
                            li
                        )
                    )
                );
            case 'divider':
                return React.createElement('hr', {
                    key: idx,
                    className: 'border-slate-700 my-4'
                });
            default:
                return null;
        }
    });
};

// 히어로 섹션
const HeroSection = () => {
    return React.createElement('section', {
        className: 'py-20 px-6 text-center'
    },
        React.createElement('div', { className: 'max-w-4xl mx-auto' },
            React.createElement('div', {
                className: 'inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm mb-6'
            },
                React.createElement('span', {}, '🚀'),
                'FPGA & AI 기반 차세대 금융 인프라'
            ),
            React.createElement('h1', {
                className: 'text-4xl md:text-6xl font-bold text-white mb-6'
            },
                '통합 디지털 화폐 및',
                React.createElement('br'),
                React.createElement('span', {
                    className: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
                }, '자율 금융 서비스 시스템')
            ),
            React.createElement('p', {
                className: 'text-xl text-gray-400 mb-8 max-w-2xl mx-auto'
            }, '0.015ms 초고속 처리 · 99.4% AI 검증 정확도 · 88.6% 전력 절감'),
            React.createElement('div', {
                className: 'flex flex-wrap justify-center gap-4'
            },
                React.createElement('div', {
                    className: 'px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-700'
                },
                    React.createElement('div', { className: 'text-2xl font-bold text-emerald-400' }, '3,333배'),
                    React.createElement('div', { className: 'text-sm text-gray-400' }, '성능 향상')
                ),
                React.createElement('div', {
                    className: 'px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-700'
                },
                    React.createElement('div', { className: 'text-2xl font-bold text-blue-400' }, '98.5%'),
                    React.createElement('div', { className: 'text-sm text-gray-400' }, '에너지 절감')
                ),
                React.createElement('div', {
                    className: 'px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-700'
                },
                    React.createElement('div', { className: 'text-2xl font-bold text-purple-400' }, '424만'),
                    React.createElement('div', { className: 'text-sm text-gray-400' }, 'TPS 처리')
                )
            )
        )
    );
};

// 푸터
const Footer = () => {
    return React.createElement('footer', {
        className: 'py-8 px-6 border-t border-slate-800'
    },
        React.createElement('div', {
            className: 'max-w-7xl mx-auto text-center text-gray-500 text-sm'
        },
            React.createElement('p', {}, '© 2025 통합 디지털 화폐 시스템. OpenHash 기반 분산원장 기술.'),
            React.createElement('p', { className: 'mt-2' },
                'AWS EC2 실증실험 검증 완료 · MLPerf 벤치마크 인증'
            )
        )
    );
};

// 메인 App 컴포넌트
const App = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (id) => {
        setActiveModal(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setActiveModal(null);
    };

    const currentModal = activeModal ? modalContents[activeModal] : null;

    return React.createElement('div', { className: 'min-h-screen' },
        React.createElement(Header),
        React.createElement(HeroSection),
        React.createElement(SimulatorSection),
        React.createElement(TechSection, { onOpenModal: openModal }),
        React.createElement(EconomicSection, { onOpenModal: openModal }),
        React.createElement(Footer),
        currentModal && React.createElement(Modal, {
            isOpen: modalOpen,
            onClose: closeModal,
            title: currentModal.title,
            icon: currentModal.icon,
            iconBg: currentModal.iconBg
        }, renderModalContent(currentModal.content))
    );
};

// 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
