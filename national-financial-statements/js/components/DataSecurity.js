const { useState } = React;

function DataSecurity() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  
  const securityFeatures = [
    {
      id: 1,
      icon: '🔐',
      title: 'AES-256 암호화',
      category: '데이터 암호화',
      description: 'Advanced Encryption Standard 256비트 암호화를 사용하여 프라이빗 데이터 금고의 모든 데이터를 보호합니다.',
      color: 'var(--danger)',
      details: [
        '군사급 암호화 표준 적용',
        '2²⁵⁶ 가능한 키 조합 (거의 해독 불가능)',
        '데이터 저장 시 자동 암호화',
        '복호화는 소유자만 가능'
      ]
    },
    {
      id: 2,
      icon: '🔑',
      title: 'PBKDF2 키 유도',
      category: '키 관리',
      description: 'Password-Based Key Derivation Function 2를 사용하여 사용자 비밀번호로부터 안전한 암호화 키를 생성합니다.',
      color: 'var(--warning)',
      details: [
        'SHA-256 기반 해시 함수 사용',
        '100,000회 이상 반복 연산',
        '무차별 대입 공격 방어',
        'Salt 추가로 Rainbow Table 공격 차단'
      ]
    },
    {
      id: 3,
      icon: '🛡️',
      title: 'Shamir 비밀 분산',
      category: '백업 및 복구',
      description: 'Master Key를 N개 조각으로 분할하여 M개 이상 조각으로만 복구 가능하게 하여 단일 실패점을 제거합니다.',
      color: 'var(--info)',
      details: [
        'N=10, M=7 방식 적용 (기본값)',
        '분산 저장으로 안전성 극대화',
        '일부 조각 분실 시에도 복구 가능',
        '수학적으로 증명된 보안성'
      ]
    },
    {
      id: 4,
      icon: '🚫',
      title: '접근 제어',
      category: '권한 관리',
      description: '소유자만 데이터에 접근 가능하며, 시간/범위 제한적 권한 부여가 가능합니다.',
      color: 'var(--success)',
      details: [
        '기본 원칙: 소유자만 접근 가능',
        '시간 제한 권한 부여 (예: 1시간)',
        '범위 제한 권한 (예: 특정 재무제표만)',
        '권한 부여 이력 자동 기록'
      ]
    },
    {
      id: 5,
      icon: '🔗',
      title: 'Hash Chain 검증',
      category: '무결성 보장',
      description: 'SHA-256 해시 체인으로 데이터 위변조를 차단하고, 오픈해시 네트워크로 검증합니다.',
      color: 'var(--primary-500)',
      details: [
        '모든 데이터의 Hash 생성',
        'Layer 1~4에 확률적 분산',
        '위변조 시 즉시 탐지',
        '사후 검증 가능'
      ]
    },
    {
      id: 6,
      icon: '👤',
      title: '생체 인증',
      category: '사용자 인증',
      description: '지문, 얼굴 인식 등 생체 인증을 통해 본인만 데이터에 접근할 수 있습니다.',
      color: 'var(--secondary-500)',
      details: [
        '지문 인식 (Fingerprint)',
        '얼굴 인식 (Face ID)',
        '홍채 인식 (Iris Scan)',
        'PIN/패턴과 결합 가능'
      ]
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
      }, '데이터 보안'),
      React.createElement('p', {
        style: {
          fontSize: '17px',
          color: 'var(--gray-70)',
          lineHeight: '1.8'
        }
      }, '프라이빗 데이터 금고의 다층 보안 체계로 개인 재무 데이터를 완벽하게 보호합니다.')
    ),
    
    // 보안 계층 다이어그램
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        padding: '30px',
        backgroundColor: 'var(--gray-10)',
        borderRadius: '12px',
        border: '2px solid var(--gray-30)'
      }
    },
      React.createElement('h3', {
        style: {
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '24px',
          textAlign: 'center'
        }
      }, '🔒 다층 보안 아키텍처'),
      
      React.createElement('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '600px',
          margin: '0 auto'
        }
      },
        React.createElement(SecurityLayer, { 
          number: 1, 
          title: '사용자 인증',
          description: '생체 인증 + PIN/패턴',
          color: '#3b82f6'
        }),
        React.createElement('div', { 
          style: { 
            textAlign: 'center', 
            fontSize: '24px', 
            color: 'var(--primary-500)' 
          } 
        }, '↓'),
        
        React.createElement(SecurityLayer, { 
          number: 2, 
          title: '데이터 암호화',
          description: 'AES-256 암호화 저장',
          color: '#10b981'
        }),
        React.createElement('div', { 
          style: { 
            textAlign: 'center', 
            fontSize: '24px', 
            color: 'var(--success)' 
          } 
        }, '↓'),
        
        React.createElement(SecurityLayer, { 
          number: 3, 
          title: 'Hash 생성',
          description: 'SHA-256 해시 추출',
          color: '#f59e0b'
        }),
        React.createElement('div', { 
          style: { 
            textAlign: 'center', 
            fontSize: '24px', 
            color: 'var(--warning)' 
          } 
        }, '↓'),
        
        React.createElement(SecurityLayer, { 
          number: 4, 
          title: 'Hash Chain 연동',
          description: '오픈해시 네트워크 검증',
          color: '#ef4444'
        })
      )
    ),
    
    // 보안 기능 그리드
    React.createElement('div', {
      style: {
        marginBottom: '40px'
      }
    },
      React.createElement('h3', {
        style: {
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '24px'
        }
      }, '🛡️ 주요 보안 기능'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }
      },
        securityFeatures.map(feature =>
          React.createElement('div', {
            key: feature.id,
            style: {
              backgroundColor: 'var(--gray-0)',
              border: `2px solid ${selectedFeature === feature.id ? feature.color : 'var(--gray-30)'}`,
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s'
            },
            onClick: () => setSelectedFeature(selectedFeature === feature.id ? null : feature.id),
            onMouseEnter: (e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${feature.color}30`;
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          },
            // 헤더
            React.createElement('div', {
              style: {
                padding: '20px',
                backgroundColor: selectedFeature === feature.id ? `${feature.color}15` : 'var(--gray-10)'
              }
            },
              React.createElement('div', {
                style: {
                  fontSize: '40px',
                  marginBottom: '12px'
                }
              }, feature.icon),
              
              React.createElement('div', {
                style: {
                  display: 'inline-block',
                  padding: '4px 12px',
                  backgroundColor: `${feature.color}20`,
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: feature.color,
                  marginBottom: '8px'
                }
              }, feature.category),
              
              React.createElement('h4', {
                style: {
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--gray-90)',
                  marginBottom: '8px'
                }
              }, feature.title),
              
              React.createElement('p', {
                style: {
                  fontSize: '14px',
                  color: 'var(--gray-70)',
                  lineHeight: '1.6'
                }
              }, feature.description)
            ),
            
            // 상세 정보 (선택 시 표시)
            selectedFeature === feature.id && React.createElement('div', {
              style: {
                padding: '20px',
                borderTop: `1px solid ${feature.color}30`,
                backgroundColor: 'var(--gray-0)'
              }
            },
              React.createElement('h5', {
                style: {
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'var(--gray-90)',
                  marginBottom: '12px'
                }
              }, '주요 특징:'),
              
              React.createElement('ul', {
                style: {
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: 'var(--gray-70)'
                }
              },
                feature.details.map((detail, idx) =>
                  React.createElement('li', { key: idx }, detail)
                )
              )
            )
          )
        )
      )
    ),
    
    // 보안 통계
    React.createElement('div', {
      style: {
        padding: '30px',
        backgroundColor: 'var(--primary-50)',
        borderRadius: '12px',
        border: '2px solid var(--primary-500)'
      }
    },
      React.createElement('h3', {
        style: {
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '24px',
          textAlign: 'center'
        }
      }, '📊 보안 성능 지표'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }
      },
        React.createElement(SecurityStat, {
          value: '256',
          unit: 'bit',
          label: '암호화 강도',
          icon: '🔐'
        }),
        React.createElement(SecurityStat, {
          value: '2²⁵⁶',
          unit: '',
          label: '가능한 키 조합',
          icon: '🔑'
        }),
        React.createElement(SecurityStat, {
          value: '<5',
          unit: 'ms',
          label: '위변조 탐지 시간',
          icon: '⚡'
        }),
        React.createElement(SecurityStat, {
          value: '100',
          unit: '%',
          label: '무결성 보장',
          icon: '✅'
        })
      )
    )
  );
}

// 보안 계층 컴포넌트
function SecurityLayer({ number, title, description, color }) {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: 'var(--gray-0)',
      border: `3px solid ${color}`,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  },
    React.createElement('div', {
      style: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: color,
        color: 'var(--gray-0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: '700',
        flexShrink: 0
      }
    }, number),
    
    React.createElement('div', null,
      React.createElement('h4', {
        style: {
          fontSize: '17px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '4px'
        }
      }, title),
      React.createElement('p', {
        style: {
          fontSize: '14px',
          color: 'var(--gray-70)'
        }
      }, description)
    )
  );
}

// 보안 통계 컴포넌트
function SecurityStat({ value, unit, label, icon }) {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: 'var(--gray-0)',
      borderRadius: '8px',
      textAlign: 'center'
    }
  },
    React.createElement('div', {
      style: {
        fontSize: '32px',
        marginBottom: '8px'
      }
    }, icon),
    
    React.createElement('div', {
      style: {
        fontSize: '28px',
        fontWeight: '700',
        color: 'var(--primary-600)',
        marginBottom: '4px'
      }
    }, value, ' ', unit),
    
    React.createElement('div', {
      style: {
        fontSize: '14px',
        color: 'var(--gray-70)',
        fontWeight: '500'
      }
    }, label)
  );
}

export default DataSecurity;
