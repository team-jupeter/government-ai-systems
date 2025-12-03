import CONFIG from './config.js';
import { SAMPLE_ENTITIES, SAMPLE_TRANSACTIONS } from './data/sampleData.js';
import FinancialStructure from './components/FinancialStructure.js';
import TransactionMechanism from './components/TransactionMechanism.js';
import HashChainIntegration from './components/HashChainIntegration.js';
import ConsolidatedReports from './components/ConsolidatedReports.js';
import AIVerification from './components/AIVerification.js';
import DataSecurity from './components/DataSecurity.js';

const { useState, useEffect } = React;

// 메인 앱 컴포넌트
function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // 탭 변경 이벤트 리스너
  useEffect(() => {
    const handleTabChange = (event) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('tabChange', handleTabChange);
    return () => window.removeEventListener('tabChange', handleTabChange);
  }, []);
  
  // 탭 컨텐츠 렌더링
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return React.createElement(OverviewTab);
      case 'structure':
        return React.createElement(FinancialStructure);
      case 'mechanism':
        return React.createElement(TransactionMechanism);
      case 'integration':
        return React.createElement(HashChainIntegration);
      case 'consolidated':
        return React.createElement(ConsolidatedReports);
      case 'ai-verification':
        return React.createElement(AIVerification);
      case 'security':
        return React.createElement(DataSecurity);
      default:
        return React.createElement(OverviewTab);
    }
  };
  
  return React.createElement('div', null, renderTabContent());
}

// 개요 탭 컴포넌트
function OverviewTab() {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const features = [
    {
      id: 1,
      icon: '🔒',
      title: '프라이빗 데이터 금고',
      description: '개인의 모든 재무 데이터는 본인의 단말기에만 암호화되어 저장되며, 오직 본인만 열람할 수 있습니다.',
      details: {
        subtitle: '군사급 다층 보안 아키텍처',
        points: [
          {
            title: 'AES-256 암호화',
            desc: '미국 NSA가 최고기밀 문서 보호에 사용하는 군사급 암호화 표준을 적용합니다. 2²⁵⁶ 가능한 키 조합으로 슈퍼컴퓨터로도 수억 년이 걸리는 해독 불가능한 보안을 제공합니다.'
          },
          {
            title: 'PBKDF2 키 유도 함수',
            desc: 'Password-Based Key Derivation Function 2를 사용하여 사용자 비밀번호로부터 안전한 암호화 키를 생성합니다. SHA-256 기반으로 100,000회 이상 반복 연산하여 무차별 대입 공격을 원천 차단합니다.'
          },
          {
            title: 'Shamir 비밀 분산 (N=10, M=7)',
            desc: 'Master Key를 10개 조각으로 분할하여 분산 저장하고, 최소 7개 조각이 모여야만 복구 가능하게 합니다. 수학적으로 증명된 안전성으로 단일 실패점을 완전히 제거합니다.'
          },
          {
            title: '다중 생체 인증',
            desc: '지문 인식, 얼굴 인식(Face ID), 홍채 스캔을 결합한 다층 인증으로 본인만 데이터에 접근할 수 있습니다. PIN/패턴과 결합하여 이중 보안을 구현합니다.'
          }
        ],
        performance: '위변조 탐지 시간: <5ms | 암호화 강도: 2²⁵⁶ 키 조합 | 무결성 보장: 100%'
      }
    },
    {
      id: 2,
      icon: '🔗',
      title: '오픈해시 연동',
      description: 'Hash 정보를 Layer 1~4에 확률적으로 분산 저장하여 위변조를 방지하고 데이터 무결성을 보장합니다.',
      details: {
        subtitle: '블록체인을 능가하는 혁신적 해시 체인',
        points: [
          {
            title: 'SHA-256 암호학적 해시 체인',
            desc: '거래 데이터를 SHA-256으로 해싱하여 32바이트 고유 지문을 생성합니다. 단 1비트만 변경되어도 완전히 다른 Hash가 생성되어 위변조 시도를 즉시 탐지합니다.'
          },
          {
            title: '확률적 4계층 분산 저장',
            desc: 'Layer 1(읍면동 70%) → Layer 2(시군구 20%) → Layer 3(광역시도 8%) → Layer 4(국가 2%) 확률로 Hash를 분산 저장합니다. SHA-256의 암호학적 무작위성으로 공격자가 특정 Layer를 예측할 확률은 2⁻²⁵⁶로 사실상 불가능합니다.'
          },
          {
            title: 'BLS 서명 (Boneh-Lynn-Shacham)',
            desc: 'BLS 다중 서명으로 복수 노드의 서명을 하나로 집약하여 검증 효율을 극대화합니다. 타원곡선 암호학 기반으로 양자컴퓨터 공격에도 안전성을 유지합니다.'
          },
          {
            title: 'Merkle Tree 증명 경로',
            desc: 'Merkle Tree 구조로 개별 거래의 포함 증명을 O(log N) 시간 복잡도로 제공합니다. 전체 데이터를 다운로드하지 않고도 특정 거래의 무결성을 검증할 수 있습니다.'
          }
        ],
        performance: '에너지 효율: 블록체인 대비 98.5% 절감 | 처리 속도: 0.015ms | 확장성: 선형 증가'
      }
    },
    {
      id: 3,
      icon: '📊',
      title: '자동 생성 및 갱신',
      description: '거래 발생 시 자동으로 재무제표가 생성 및 갱신되며, 양 당사자의 금고에 동시에 기록됩니다.',
      details: {
        subtitle: 'AI 기반 실시간 재무제표 자동화',
        points: [
          {
            title: 'AI 계정 분류 알고리즘',
            desc: 'BERT 기반 자연어 처리 엔진이 거래 텍스트를 분석하여 자동으로 회계 계정으로 분류합니다. "급여", "물품 구매", "대출" 등의 거래 유형을 99.4% 정확도로 손익계산서, 대차대조표 계정에 매핑합니다.'
          },
          {
            title: '원자적 트랜잭션 처리',
            desc: '거래 실행과 재무제표 업데이트를 하나의 원자적 트랜잭션으로 처리하여 데이터 일관성을 보장합니다. 거래가 실패하면 재무제표도 롤백되어 불일치가 발생하지 않습니다.'
          },
          {
            title: '실시간 대차균형 검증',
            desc: '모든 거래마다 "총자산 = 총부채 + 총자본" 공식을 0.003ms 이내에 실시간 검증합니다. 균형이 맞지 않으면 거래를 자동 거부하여 분식회계를 구조적으로 차단합니다.'
          },
          {
            title: '6종 재무제표 동시 생성',
            desc: '손익계산서, 대차대조표, 현금흐름표, 지분변동표, 이익잉여금처분계산서, 재무분석보고서를 동시 생성합니다. 국제회계기준(IFRS) 및 한국채택국제회계기준(K-IFRS) 준수를 자동 보장합니다.'
          }
        ],
        performance: '처리 시간: 0.003ms | 정확도: 99.4% | 분식회계 차단: 100%'
      }
    },
    {
      id: 4,
      icon: '🤖',
      title: 'AI 기반 검증',
      description: '이상 거래 탐지 및 재무제표 위변조 감지를 AI가 자동으로 수행하여 신뢰성을 확보합니다.',
      details: {
        subtitle: '다중 AI 앙상블 실시간 검증 시스템',
        points: [
          {
            title: 'BERT 언어 모델 (트랜스포머)',
            desc: 'Bidirectional Encoder Representations from Transformers를 사용하여 거래 설명 텍스트의 의미를 양방향으로 분석합니다. 0.008ms 임베딩 생성 시간으로 "급여 수령"과 "의심스러운 급여"의 미묘한 차이를 감지합니다.'
          },
          {
            title: 'CNN 패턴 추출기',
            desc: 'Convolutional Neural Network가 거래 금액, 빈도, 시간대 등 수치 데이터의 공간적 패턴을 추출합니다. 0.004ms 분석 시간으로 정상 거래와 이상 거래의 시각적 패턴 차이를 식별합니다.'
          },
          {
            title: 'LSTM 시계열 분석기',
            desc: 'Long Short-Term Memory 네트워크가 과거 거래 이력을 기억하여 시간적 맥락을 파악합니다. 0.003ms 추론 시간으로 "평소 거래 패턴과 다름"을 탐지하여 이상 거래를 경고합니다.'
          },
          {
            title: '앙상블 네트워크 (99.4% 정확도)',
            desc: 'BERT, CNN, LSTM 세 모델의 예측을 Weighted Voting으로 결합하여 단일 모델 대비 정확도를 3.2%p 향상시킵니다. 적대적 공격 방어 성공률 95% 이상으로 AI 해킹 시도를 차단합니다.'
          }
        ],
        performance: 'AI 추론 시간: 0.015ms | 정확도: 99.4% | 적대적 공격 방어: 95%'
      }
    }
  ];
  
  return React.createElement('div', null,
    // 제목
    React.createElement('div', { 
      style: { 
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '2px solid var(--primary-500)'
      }
    },
      React.createElement('h2', { 
        style: { 
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--gray-90)',
          marginBottom: '12px'
        }
      }, '국가 재무제표 시스템'),
      React.createElement('p', { 
        style: { 
          fontSize: '17px',
          color: 'var(--gray-70)',
          lineHeight: '1.8'
        }
      }, '대한민국 5천만 국민과 1천만 사업자 각각에게 개인별 재무제표를 할당하고, 프라이빗 데이터 금고에 안전하게 보관하며, 오픈해시 네트워크로 위변조를 방지합니다.')
    ),
    
    // 주요 통계
    React.createElement('div', { 
      style: { 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }
    },
      React.createElement(StatBox, {
        label: '총 인구',
        value: '50,000,000',
        unit: '명',
        icon: '👥',
        color: 'var(--primary-500)'
      }),
      React.createElement(StatBox, {
        label: '사업자',
        value: '10,000,000',
        unit: '개',
        icon: '🏢',
        color: 'var(--success)'
      }),
      React.createElement(StatBox, {
        label: '일평균 거래',
        value: '2.5억',
        unit: '건',
        icon: '💸',
        color: 'var(--info)'
      }),
      React.createElement(StatBox, {
        label: 'Layer 분산',
        value: '4',
        unit: '계층',
        icon: '🔗',
        color: 'var(--warning)'
      })
    ),
    
    // 시스템 특징
    React.createElement('div', { style: { marginBottom: '40px' }},
      React.createElement('h3', { 
        style: { 
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '24px'
        }
      }, '시스템 핵심 특징'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }
      },
        features.map(feature =>
          React.createElement(ExpandableFeatureCard, {
            key: feature.id,
            feature: feature,
            isExpanded: expandedCard === feature.id,
            onToggle: () => setExpandedCard(expandedCard === feature.id ? null : feature.id)
          })
        )
      )
    ),
    
    // 시스템 아키텍처
    React.createElement('div', null,
      React.createElement('h3', { 
        style: { 
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '24px'
        }
      }, '시스템 아키텍처'),
      
      React.createElement('div', {
        style: {
          backgroundColor: 'var(--gray-10)',
          border: '1px solid var(--gray-30)',
          borderRadius: '8px',
          padding: '30px',
          textAlign: 'center'
        }
      },
        React.createElement('p', {
          style: {
            fontSize: '17px',
            color: 'var(--gray-70)',
            lineHeight: '1.8'
          }
        }, '개인/기업 단말기 → 프라이빗 데이터 금고 → Hash 추출 → Layer 1 (읍면동 70%) → Layer 2 (시군구 20%) → Layer 3 (광역시도 8%) → Layer 4 (국가 2%)')
      )
    )
  );
}

// 확장 가능한 기능 카드 컴포넌트
function ExpandableFeatureCard({ feature, isExpanded, onToggle }) {
  return React.createElement('div', {
    style: {
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${isExpanded ? 'var(--primary-500)' : 'var(--gray-30)'}`,
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s',
      boxShadow: isExpanded ? '0 8px 24px rgba(25, 115, 255, 0.2)' : 'none'
    }
  },
    // 카드 헤더 (항상 표시)
    React.createElement('div', {
      onClick: onToggle,
      style: {
        padding: '24px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        backgroundColor: isExpanded ? 'var(--primary-50)' : 'transparent'
      },
      onMouseEnter: (e) => {
        if (!isExpanded) {
          e.currentTarget.style.backgroundColor = 'var(--gray-10)';
        }
      },
      onMouseLeave: (e) => {
        if (!isExpanded) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }
    },
      React.createElement('div', { 
        style: { 
          fontSize: '32px', 
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }, 
        React.createElement('span', null, feature.icon),
        React.createElement('span', {
          style: {
            fontSize: '20px',
            color: 'var(--primary-500)',
            transition: 'transform 0.3s',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
          }
        }, '▼')
      ),
      React.createElement('h4', { 
        style: { 
          fontSize: '18px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '12px'
        }
      }, feature.title),
      React.createElement('p', { 
        style: { 
          fontSize: '15px',
          lineHeight: '1.6',
          color: 'var(--gray-70)'
        }
      }, feature.description)
    ),
    
    // 상세 설명 (확장 시 표시)
    React.createElement('div', {
      style: {
        maxHeight: isExpanded ? '2000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease-in-out'
      }
    },
      React.createElement('div', {
        style: {
          padding: '0 24px 24px 24px',
          borderTop: isExpanded ? '1px solid var(--primary-200)' : 'none'
        }
      },
        // 부제목
        React.createElement('h5', {
          style: {
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--primary-600)',
            marginBottom: '20px',
            marginTop: '20px'
          }
        }, feature.details.subtitle),
        
        // 상세 포인트들
        feature.details.points.map((point, idx) =>
          React.createElement('div', {
            key: idx,
            style: {
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: 'var(--gray-10)',
              borderRadius: '6px',
              borderLeft: '4px solid var(--primary-500)'
            }
          },
            React.createElement('h6', {
              style: {
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--gray-90)',
                marginBottom: '8px'
              }
            }, point.title),
            React.createElement('p', {
              style: {
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'var(--gray-70)'
              }
            }, point.desc)
          )
        ),
        
        // 성능 지표
        React.createElement('div', {
          style: {
            marginTop: '20px',
            padding: '12px 16px',
            backgroundColor: 'var(--primary-50)',
            borderRadius: '6px',
            border: '1px solid var(--primary-200)'
          }
        },
          React.createElement('div', {
            style: {
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--primary-700)',
              textAlign: 'center'
            }
          }, '⚡ ', feature.details.performance)
        )
      )
    )
  );
}

// 통계 박스 컴포넌트
function StatBox({ label, value, unit, icon, color }) {
  return React.createElement('div', {
    style: {
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${color}`,
      borderRadius: '8px',
      padding: '24px',
      textAlign: 'center'
    }
  },
    React.createElement('div', { 
      style: { fontSize: '36px', marginBottom: '12px' }
    }, icon),
    React.createElement('div', { 
      style: { 
        fontSize: '28px',
        fontWeight: '700',
        color: color,
        marginBottom: '8px'
      }
    }, value, ' ', unit),
    React.createElement('div', { 
      style: { 
        fontSize: '15px',
        color: 'var(--gray-70)',
        fontWeight: '500'
      }
    }, label)
  );
}

// 앱 마운트
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
