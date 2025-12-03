import CONFIG from '../config.js';

const { useState, useEffect, useRef } = React;

function HashChainIntegration() {
  const [currentHash, setCurrentHash] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [expandedFeature, setExpandedFeature] = useState(null);
  
  const isAnimatingRef = useRef(false);
  const animationTimeoutRef = useRef(null);
  
  const layers = [
    { id: 1, name: 'Layer 1', label: '읍면동', probability: 70, color: '#3b82f6', icon: '🏘️' },
    { id: 2, name: 'Layer 2', label: '시군구', probability: 20, color: '#10b981', icon: '🏙️' },
    { id: 3, name: 'Layer 3', label: '광역시도', probability: 8, color: '#f59e0b', icon: '🌆' },
    { id: 4, name: 'Layer 4', label: '국가', probability: 2, color: '#ef4444', icon: '🏛️' }
  ];
  
  const securityFeatures = [
    {
      id: 1,
      icon: '🔒',
      title: '위변조 차단',
      description: 'SHA-256의 암호학적 무작위성으로 공격자가 특정 Layer 예측 확률은 2⁻²⁵⁶',
      color: 'var(--danger)',
      details: [
        {
          subtitle: 'SHA-256 암호학적 해시 함수',
          content: '단 1비트만 변경되어도 완전히 다른 Hash가 생성되어 위변조를 즉시 탐지합니다. 2²⁵⁶ 가능한 출력값으로 충돌 확률은 사실상 0입니다.'
        },
        {
          subtitle: '확률적 Layer 선택',
          content: 'Hash 값을 범위로 변환하여 Layer를 결정하므로, 공격자가 특정 Layer를 예측할 확률은 2⁻²⁵⁶로 불가능합니다.'
        }
      ]
    },
    {
      id: 2,
      icon: '⚡',
      title: '에너지 효율',
      description: '블록체인 대비 98.5% 에너지 절감 (작업증명/지분증명 불필요)',
      color: 'var(--success)',
      details: [
        {
          subtitle: 'PoW/PoS 불필요',
          content: '작업증명(Proof of Work)이나 지분증명(Proof of Stake) 없이 Hash만 저장하여 에너지 소비를 최소화합니다.'
        },
        {
          subtitle: '친환경 블록체인 대안',
          content: '비트코인은 연간 140TWh 전력 소비, 본 시스템은 2.1TWh로 98.5% 절감을 달성했습니다.'
        }
      ]
    },
    {
      id: 3,
      icon: '📈',
      title: '선형 확장성',
      description: '노드 수 증가에 비례하여 TPS 선형 증가 (블록체인은 불변)',
      color: 'var(--info)',
      details: [
        {
          subtitle: '병렬 처리 아키텍처',
          content: '각 Layer가 독립적으로 병렬 처리하여 노드 추가 시 처리 성능이 선형 증가합니다.'
        },
        {
          subtitle: '블록체인의 한계 극복',
          content: '블록체인은 노드 증가 시에도 TPS가 불변이지만, 본 시스템은 N개 노드 시 N배 성능 향상을 달성합니다.'
        }
      ]
    },
    {
      id: 4,
      icon: '🔍',
      title: '자동 검증',
      description: '상위↔하위 계층 간 상호 검증으로 5ms 내 오염 노드 격리',
      color: 'var(--warning)',
      details: [
        {
          subtitle: '상호 교차 검증',
          content: 'Layer 1↔2, Layer 2↔3, Layer 3↔4 간 Hash를 상호 검증하여 불일치 발생 시 5ms 내 오염 노드를 자동 격리합니다.'
        },
        {
          subtitle: 'Byzantine Fault Tolerance',
          content: '최대 33%의 악의적 노드가 있어도 시스템 무결성을 보장하는 비잔틴 장애 허용 메커니즘을 구현했습니다.'
        }
      ]
    }
  ];
  
  const selectLayerByProbability = () => {
    const random = Math.random() * 100;
    if (random < 70) return 1;
    if (random < 90) return 2;
    if (random < 98) return 3;
    return 4;
  };
  
  const generateRandomHash = () => {
    return Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };
  
  const runSingleAnimation = () => {
    // 중지되었으면 더 이상 실행하지 않음
    if (!isAnimatingRef.current) {
      return;
    }
    
    const hash = generateRandomHash();
    const layer = selectLayerByProbability();
    
    setCurrentHash(hash);
    setSelectedLayer(layer);
    setAnimationPhase('sending');
    
    // Hash 전송 (2초)
    animationTimeoutRef.current = setTimeout(() => {
      if (!isAnimatingRef.current) return;
      setAnimationPhase('returning');
    }, 2000);
    
    // Hash 답장 (2초 후)
    animationTimeoutRef.current = setTimeout(() => {
      if (!isAnimatingRef.current) return;
      setAnimationPhase('idle');
      
      // 0.5초 대기 후 다음 애니메이션 시작
      animationTimeoutRef.current = setTimeout(() => {
        if (isAnimatingRef.current) {
          runSingleAnimation();
        }
      }, 500);
    }, 4000);
  };
  
  const startContinuousAnimation = () => {
    isAnimatingRef.current = true;
    runSingleAnimation();
  };
  
  const stopAnimation = () => {
    isAnimatingRef.current = false;
    
    // 모든 타임아웃 클리어
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setAnimationPhase('idle');
    setCurrentHash(null);
    setSelectedLayer(null);
  };
  
  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      isAnimatingRef.current = false;
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);
  
  return React.createElement('div', null,
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
      }, '오픈해시 Hash Chain 연동'),
      React.createElement('p', {
        style: {
          fontSize: '17px',
          color: 'var(--gray-70)',
          lineHeight: '1.8'
        }
      }, '거래 데이터에서 Hash를 추출하여 Layer 1~4로 확률적으로 전송하고, 각 노드와 Hash Chain을 연동하여 위변조를 차단합니다.')
    ),
    
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        padding: '24px',
        backgroundColor: 'var(--primary-50)',
        borderRadius: '8px',
        border: '2px solid var(--primary-500)'
      }
    },
      React.createElement('h3', {
        style: {
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '16px'
        }
      }, '📊 확률적 Layer 분산'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }
      },
        layers.map(layer =>
          React.createElement('div', {
            key: layer.id,
            style: {
              padding: '16px',
              backgroundColor: 'var(--gray-0)',
              borderRadius: '8px',
              textAlign: 'center',
              border: `2px solid ${layer.color}`,
              transition: 'all 0.3s',
              transform: selectedLayer === layer.id && animationPhase !== 'idle' ? 'scale(1.1)' : 'scale(1)',
              boxShadow: selectedLayer === layer.id && animationPhase !== 'idle' ? `0 8px 24px ${layer.color}50` : 'none'
            }
          },
            React.createElement('div', { style: { fontSize: '32px', marginBottom: '8px' }}, layer.icon),
            React.createElement('div', {
              style: {
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--gray-90)',
                marginBottom: '4px'
              }
            }, layer.name, ' ', layer.label),
            React.createElement('div', {
              style: {
                fontSize: '24px',
                fontWeight: '700',
                color: layer.color
              }
            }, layer.probability, '%')
          )
        )
      )
    ),
    
    React.createElement('div', {
      style: {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px'
      }
    },
      React.createElement('button', {
        onClick: isAnimatingRef.current ? stopAnimation : startContinuousAnimation,
        style: {
          padding: '12px 32px',
          backgroundColor: isAnimatingRef.current ? 'var(--danger)' : 'var(--primary-500)',
          color: 'var(--gray-0)',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.2s'
        }
      }, isAnimatingRef.current ? 'Hash Chain 연동 중지' : 'Hash Chain 연동 시작')
    ),
    
    React.createElement('div', {
      style: {
        marginBottom: '40px',
        padding: '60px 40px',
        backgroundColor: 'var(--gray-10)',
        borderRadius: '12px',
        border: '2px solid var(--gray-30)',
        minHeight: '500px',
        position: 'relative'
      }
    },
      React.createElement(HashChainVisualization, {
        layers: layers,
        selectedLayer: selectedLayer,
        animationPhase: animationPhase,
        currentHash: currentHash
      })
    ),
    
    React.createElement('div', null,
      React.createElement('h3', {
        style: {
          fontSize: '24px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '24px'
        }
      }, '🛡️ 보안 특징'),
      
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }
      },
        securityFeatures.map(feature =>
          React.createElement(ExpandableSecurityFeature, {
            key: feature.id,
            feature: feature,
            isExpanded: expandedFeature === feature.id,
            onToggle: () => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)
          })
        )
      )
    )
  );
}

function HashChainVisualization({ layers, selectedLayer, animationPhase, currentHash }) {
  const vaultRef = useRef(null);
  const layerRefs = useRef({});
  const [lineCoords, setLineCoords] = useState(null);
  
  useEffect(() => {
    if (animationPhase !== 'idle' && selectedLayer && vaultRef.current && layerRefs.current[selectedLayer]) {
      const vaultRect = vaultRef.current.getBoundingClientRect();
      const layerRect = layerRefs.current[selectedLayer].getBoundingClientRect();
      const containerRect = vaultRef.current.parentElement.getBoundingClientRect();
      
      const startX = vaultRect.left + vaultRect.width / 2 - containerRect.left;
      const startY = vaultRect.bottom - containerRect.top;
      const endX = layerRect.left + layerRect.width / 2 - containerRect.left;
      const endY = layerRect.top - containerRect.top;
      
      setLineCoords({ startX, startY, endX, endY });
    } else {
      setLineCoords(null);
    }
  }, [animationPhase, selectedLayer]);
  
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '80px',
      position: 'relative'
    }
  },
    React.createElement('div', {
      ref: vaultRef,
      style: {
        padding: '30px',
        backgroundColor: 'var(--gray-0)',
        border: '3px solid var(--primary-500)',
        borderRadius: '12px',
        minWidth: '400px',
        boxShadow: '0 4px 12px rgba(25, 115, 255, 0.2)',
        position: 'relative',
        zIndex: 10
      }
    },
      React.createElement('h4', {
        style: {
          fontSize: '18px',
          fontWeight: '700',
          color: 'var(--primary-600)',
          marginBottom: '20px',
          textAlign: 'center'
        }
      }, '🔐 프라이빗 데이터 금고'),
      
      React.createElement('div', {
        style: {
          padding: '20px',
          backgroundColor: 'var(--primary-50)',
          border: '2px solid var(--primary-300)',
          borderRadius: '8px'
        }
      },
        React.createElement('h5', {
          style: {
            fontSize: '15px',
            fontWeight: '600',
            color: 'var(--gray-90)',
            marginBottom: '12px',
            textAlign: 'center'
          }
        }, '📝 거래 데이터'),
        
        currentHash && React.createElement('div', {
          style: {
            fontSize: '13px',
            fontFamily: 'monospace',
            color: 'var(--primary-700)',
            wordBreak: 'break-all',
            marginTop: '8px',
            padding: '8px',
            backgroundColor: 'var(--gray-0)',
            borderRadius: '4px'
          }
        }, '🔑 Hash: ', currentHash.substring(0, 32), '...')
      )
    ),
    
    lineCoords && React.createElement('svg', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }
    },
      React.createElement('defs', null,
        React.createElement('marker', {
          id: 'arrowhead-blue',
          markerWidth: '10',
          markerHeight: '10',
          refX: '9',
          refY: '3',
          orient: 'auto'
        },
          React.createElement('polygon', {
            points: '0 0, 10 3, 0 6',
            fill: '#3b82f6'
          })
        ),
        React.createElement('marker', {
          id: 'arrowhead-red',
          markerWidth: '10',
          markerHeight: '10',
          refX: '9',
          refY: '3',
          orient: 'auto'
        },
          React.createElement('polygon', {
            points: '0 0, 10 3, 0 6',
            fill: '#ef4444'
          })
        )
      ),
      
      animationPhase === 'sending' && React.createElement('line', {
        x1: lineCoords.startX,
        y1: lineCoords.startY,
        x2: lineCoords.endX,
        y2: lineCoords.endY,
        stroke: '#3b82f6',
        strokeWidth: '3',
        strokeDasharray: '10,5',
        strokeLinecap: 'round',
        markerEnd: 'url(#arrowhead-blue)',
        style: {
          animation: 'dashSending 2s linear forwards'
        }
      }),
      
      animationPhase === 'returning' && React.createElement('line', {
        x1: lineCoords.endX,
        y1: lineCoords.endY,
        x2: lineCoords.startX,
        y2: lineCoords.startY,
        stroke: '#ef4444',
        strokeWidth: '3',
        strokeDasharray: '10,5',
        strokeLinecap: 'round',
        markerEnd: 'url(#arrowhead-red)',
        style: {
          animation: 'dashReturning 2s linear forwards'
        }
      })
    ),
    
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        width: '100%',
        zIndex: 10
      }
    },
      layers.map(layer =>
        React.createElement('div', {
          key: layer.id,
          ref: el => layerRefs.current[layer.id] = el,
          style: {
            padding: '20px',
            backgroundColor: selectedLayer === layer.id && animationPhase !== 'idle' 
              ? `${layer.color}20` 
              : 'var(--gray-0)',
            border: `3px solid ${selectedLayer === layer.id && animationPhase !== 'idle' 
              ? layer.color 
              : 'var(--gray-30)'}`,
            borderRadius: '12px',
            textAlign: 'center',
            minWidth: '140px',
            transition: 'all 0.3s',
            transform: selectedLayer === layer.id && animationPhase !== 'idle' 
              ? 'scale(1.15)' 
              : 'scale(1)',
            boxShadow: selectedLayer === layer.id && animationPhase !== 'idle' 
              ? `0 8px 24px ${layer.color}50` 
              : 'none'
          }
        },
          React.createElement('div', { 
            style: { 
              fontSize: '32px', 
              marginBottom: '8px',
              animation: selectedLayer === layer.id && animationPhase !== 'idle' 
                ? 'pulse 1s infinite' 
                : 'none'
            }
          }, layer.icon),
          React.createElement('div', {
            style: {
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--gray-90)',
              marginBottom: '4px'
            }
          }, layer.name),
          React.createElement('div', {
            style: {
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--gray-70)'
            }
          }, layer.label),
          React.createElement('div', {
            style: {
              fontSize: '12px',
              color: 'var(--gray-70)',
              marginTop: '4px'
            }
          }, layer.probability, '%'),
          
          selectedLayer === layer.id && animationPhase !== 'idle' && React.createElement('div', {
            style: {
              marginTop: '12px',
              padding: '6px 12px',
              backgroundColor: layer.color,
              color: 'var(--gray-0)',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '700'
            }
          }, animationPhase === 'sending' ? '수신 중...' : '답장 중...')
        )
      )
    )
  );
}

function ExpandableSecurityFeature({ feature, isExpanded, onToggle }) {
  return React.createElement('div', {
    style: {
      backgroundColor: 'var(--gray-0)',
      border: `2px solid ${isExpanded ? feature.color : 'var(--gray-30)'}`,
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s',
      boxShadow: isExpanded ? `0 8px 24px ${feature.color}30` : 'none'
    }
  },
    React.createElement('div', {
      onClick: onToggle,
      style: {
        padding: '20px',
        cursor: 'pointer',
        backgroundColor: isExpanded ? `${feature.color}15` : 'transparent',
        transition: 'background-color 0.2s'
      }
    },
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }
      },
        React.createElement('div', {
          style: {
            fontSize: '36px'
          }
        }, feature.icon),
        React.createElement('div', {
          style: {
            fontSize: '20px',
            color: feature.color,
            transition: 'transform 0.3s',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
          }
        }, '▼')
      ),
      
      React.createElement('h4', {
        style: {
          fontSize: '17px',
          fontWeight: '600',
          color: 'var(--gray-90)',
          marginBottom: '8px'
        }
      }, feature.title),
      
      React.createElement('p', {
        style: {
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'var(--gray-70)'
        }
      }, feature.description)
    ),
    
    React.createElement('div', {
      style: {
        maxHeight: isExpanded ? '1000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease-in-out'
      }
    },
      React.createElement('div', {
        style: {
          padding: '0 20px 20px 20px',
          borderTop: isExpanded ? `1px solid ${feature.color}30` : 'none'
        }
      },
        feature.details.map((detail, idx) =>
          React.createElement('div', {
            key: idx,
            style: {
              marginTop: '16px',
              padding: '12px',
              backgroundColor: 'var(--gray-10)',
              borderRadius: '6px',
              borderLeft: `3px solid ${feature.color}`
            }
          },
            React.createElement('h6', {
              style: {
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--gray-90)',
                marginBottom: '8px'
              }
            }, detail.subtitle),
            React.createElement('p', {
              style: {
                fontSize: '13px',
                lineHeight: '1.6',
                color: 'var(--gray-70)'
              }
            }, detail.content)
          )
        )
      )
    )
  );
}

export default HashChainIntegration;
