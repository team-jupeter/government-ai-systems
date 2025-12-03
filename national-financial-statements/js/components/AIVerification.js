const { useState } = React;

function AIVerification() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [verificationRunning, setVerificationRunning] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  
  const anomalyCases = [
    {
      id: 1,
      title: '이상 거래 탐지',
      type: 'anomaly',
      description: '평소와 다른 패턴의 거래를 실시간으로 감지',
      icon: '🚨',
      color: 'var(--danger)',
      example: {
        normal: '평균 거래액: 500만원/월',
        abnormal: '금일 거래액: 5,000만원 (10배 증가)',
        algorithm: 'Isolation Forest',
        confidence: 95.8
      }
    },
    {
      id: 2,
      title: '재무제표 위변조 감지',
      type: 'tampering',
      description: 'Hash 불일치 및 데이터 조작 시도를 탐지',
      icon: '🔍',
      color: 'var(--warning)',
      example: {
        normal: 'Hash: a1b2c3d4e5f6...',
        abnormal: 'Hash 불일치 (재계산 결과 다름)',
        algorithm: 'SHA-256 재검증',
        confidence: 100
      }
    },
    {
      id: 3,
      title: '의심스러운 패턴 분석',
      type: 'pattern',
      description: '자금 세탁, 탈세 등 불법 행위 패턴 식별',
      icon: '🎯',
      color: 'var(--info)',
      example: {
        normal: '정상 거래 흐름',
        abnormal: '다수 계좌 순환 거래 (22회)',
        algorithm: 'LSTM 시계열 분석',
        confidence: 87.3
      }
    },
    {
      id: 4,
      title: '교차 검증 불일치',
      type: 'cross-verify',
      description: '거래 당사자 간 기록 불일치 탐지',
      icon: '⚠️',
      color: 'var(--success)',
      example: {
        normal: '양측 거래액 일치',
        abnormal: '송금자: 1,000만원 / 수령자: 500만원',
        algorithm: '교차 검증 알고리즘',
        confidence: 100
      }
    }
  ];
  
  const runVerification = (caseId) => {
    setVerificationRunning(true);
    setVerificationResult(null);
    
    setTimeout(() => {
      const selectedAnomaly = anomalyCases.find(c => c.id === caseId);
      setVerificationResult({
        detected: true,
        case: selectedAnomaly,
        timestamp: new Date().toISOString(),
        actions: [
          '관련 당사자에게 알림 전송',
          '거래 일시 중단',
          '관할 기관 자동 통보',
          '상세 조사 대기'
        ]
      });
      setVerificationRunning(false);
    }, 2000);
  };
  
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
      }, 'AI 기반 검증'),
      React.createElement('p', {
        style: {
          fontSize: '17px',
          color: 'var(--gray-70)',
          lineHeight: '1.8'
        }
      }, 'AI 멀티에이전트 시스템이 이상 거래, 재무제표 위변조, 의심스러운 패턴을 자동으로 탐지하고 검증합니다.')
    ),
    
    // AI 에이전트 소개
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
      }, '🤖 AI 멀티에이전트 시스템'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }
      },
        React.createElement(AgentCard, {
          icon: '🔍',
          name: '이상 탐지 에이전트',
          algorithm: 'Isolation Forest',
          description: '비정상적인 거래 패턴을 실시간으로 탐지하여 99.2% 정확도로 이상 거래를 식별합니다.',
          color: 'var(--danger)'
        }),
        
        React.createElement(AgentCard, {
          icon: '🧠',
          name: '패턴 분석 에이전트',
          algorithm: 'LSTM Neural Network',
          description: '시계열 데이터를 분석하여 자금 세탁, 탈세 등 의심스러운 패턴을 식별합니다.',
          color: 'var(--info)'
        }),
        
        React.createElement(AgentCard, {
          icon: '⚖️',
          name: '법률 준수 검증 에이전트',
          algorithm: 'LLM Fine-tuned',
          description: '개인정보 보호법, 금융법 등 관련 법규 준수 여부를 자동으로 검증합니다.',
          color: 'var(--success)'
        }),
        
        React.createElement(AgentCard, {
          icon: '📊',
          name: '설명 가능성 에이전트',
          algorithm: 'SHAP Analysis',
          description: 'AI 판단의 근거를 SHAP 분석으로 설명하여 투명성과 신뢰성을 확보합니다.',
          color: 'var(--warning)'
        })
      )
    ),
    
    // 검증 시나리오
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
      }, '🎯 검증 시나리오'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }
      },
        anomalyCases.map(anomaly =>
          React.createElement('div', {
            key: anomaly.id,
            style: {
              backgroundColor: 'var(--gray-0)',
              border: `2px solid ${selectedCase === anomaly.id ? anomaly.color : 'var(--gray-30)'}`,
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s'
            },
            onClick: () => setSelectedCase(anomaly.id),
            onMouseEnter: (e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${anomaly.color}30`;
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
                backgroundColor: selectedCase === anomaly.id ? `${anomaly.color}15` : 'var(--gray-10)'
              }
            },
              React.createElement('div', {
                style: {
                  fontSize: '36px',
                  marginBottom: '12px'
                }
              }, anomaly.icon),
              React.createElement('h4', {
                style: {
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--gray-90)',
                  marginBottom: '8px'
                }
              }, anomaly.title),
              React.createElement('p', {
                style: {
                  fontSize: '14px',
                  color: 'var(--gray-70)',
                  lineHeight: '1.6'
                }
              }, anomaly.description)
            ),
            
            // 선택된 경우 상세 정보
            selectedCase === anomaly.id && React.createElement('div', {
              style: {
                padding: '20px',
                borderTop: `1px solid ${anomaly.color}30`
              }
            },
              React.createElement('div', {
                style: {
                  marginBottom: '12px'
                }
              },
                React.createElement('div', {
                  style: {
                    fontSize: '13px',
                    color: 'var(--gray-70)',
                    marginBottom: '4px'
                  }
                }, '정상:'),
                React.createElement('div', {
                  style: {
                    fontSize: '14px',
                    color: 'var(--success)',
                    fontWeight: '500',
                    padding: '8px',
                    backgroundColor: 'var(--gray-10)',
                    borderRadius: '4px'
                  }
                }, anomaly.example.normal)
              ),
              
              React.createElement('div', {
                style: {
                  marginBottom: '12px'
                }
              },
                React.createElement('div', {
                  style: {
                    fontSize: '13px',
                    color: 'var(--gray-70)',
                    marginBottom: '4px'
                  }
                }, '이상:'),
                React.createElement('div', {
                  style: {
                    fontSize: '14px',
                    color: anomaly.color,
                    fontWeight: '600',
                    padding: '8px',
                    backgroundColor: `${anomaly.color}10`,
                    borderRadius: '4px'
                  }
                }, anomaly.example.abnormal)
              ),
              
              React.createElement('div', {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: 'var(--gray-10)',
                  borderRadius: '6px',
                  fontSize: '13px'
                }
              },
                React.createElement('span', {
                  style: { color: 'var(--gray-70)' }
                }, anomaly.example.algorithm),
                React.createElement('span', {
                  style: {
                    fontWeight: '700',
                    color: anomaly.color
                  }
                }, anomaly.example.confidence, '% 신뢰도')
              )
            )
          )
        )
      )
    ),
    
    // 검증 실행 버튼
    selectedCase && React.createElement('div', {
      style: {
        marginBottom: '40px',
        textAlign: 'center'
      }
    },
      React.createElement('button', {
        onClick: () => runVerification(selectedCase),
        disabled: verificationRunning,
        style: {
          padding: '16px 48px',
          backgroundColor: verificationRunning ? 'var(--gray-50)' : 'var(--primary-500)',
          color: 'var(--gray-0)',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: verificationRunning ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.2s'
        }
      }, verificationRunning ? 'AI 검증 실행 중...' : 'AI 검증 시작')
    ),
    
    // 검증 결과
    verificationResult && React.createElement('div', {
      style: {
        padding: '24px',
        backgroundColor: 'var(--danger)',
        color: 'var(--gray-0)',
        borderRadius: '12px',
        animation: 'fadeIn 0.5s ease-in'
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px'
        }
      },
        React.createElement('div', {
          style: { fontSize: '48px' }
        }, '⚠️'),
        React.createElement('div', null,
          React.createElement('h3', {
            style: {
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '6px'
            }
          }, '이상 탐지!'),
          React.createElement('p', {
            style: {
              fontSize: '16px',
              opacity: 0.9
            }
          }, verificationResult.case.title)
        )
      ),
      
      React.createElement('div', {
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px'
        }
      },
        React.createElement('h4', {
          style: {
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px'
          }
        }, '자동 조치 사항:'),
        React.createElement('ul', {
          style: {
            margin: 0,
            paddingLeft: '24px',
            fontSize: '15px',
            lineHeight: '2'
          }
        },
          verificationResult.actions.map((action, idx) =>
            React.createElement('li', { key: idx }, action)
          )
        )
      ),
      
      React.createElement('div', {
        style: {
          fontSize: '14px',
          opacity: 0.8,
          textAlign: 'right'
        }
      }, '탐지 시각: ', new Date(verificationResult.timestamp).toLocaleString('ko-KR'))
    )
  );
}

// AI 에이전트 카드
function AgentCard({ icon, name, algorithm, description, color }) {
  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${color}`,
      borderRadius: '8px',
      transition: 'all 0.2s'
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 4px 12px ${color}30`;
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }
  },
    React.createElement('div', {
      style: {
        fontSize: '36px',
        marginBottom: '12px'
      }
    }, icon),
    
    React.createElement('h4', {
      style: {
        fontSize: '17px',
        fontWeight: '600',
        color: 'var(--gray-90)',
        marginBottom: '8px'
      }
    }, name),
    
    React.createElement('div', {
      style: {
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: `${color}20`,
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '500',
        color: color,
        marginBottom: '12px'
      }
    }, algorithm),
    
    React.createElement('p', {
      style: {
        fontSize: '14px',
        lineHeight: '1.6',
        color: 'var(--gray-70)'
      }
    }, description)
  );
}

export default AIVerification;
