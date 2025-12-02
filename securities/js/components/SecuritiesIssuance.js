function SecuritiesIssuance() {
    const [expandedCard, setExpandedCard] = React.useState(null);
    const [showConsultation, setShowConsultation] = React.useState(false);
    const [messages, setMessages] = React.useState([
        {
            role: 'assistant',
            content: '안녕하세요! 증권 발행 전문 AI입니다. 개인이든 기업이든 누구나 증권을 발행하여 즉시 거래소에 등록할 수 있습니다. 어떤 종류의 증권 발행을 원하시나요?\n\n• 주식 (지분 증권)\n• 채권 (부채 증권)\n• 선물 (미래 거래 약정)\n• 옵션 (권리 증권)\n• 파생상품 (기초자산 연계)\n\n발행 목적과 자금 규모를 말씀해 주시면 최적의 상품을 설계해 드리겠습니다.'
        }
    ]);
    const [userInput, setUserInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const features = [
        {
            icon: 'fa-users',
            title: '모든 개인과 단체의 증권 발행 가능',
            description: '모두가 상장 기업입니다',
            details: [
                { 
                    subtitle: '개인 증권 발행', 
                    content: '개인도 자신의 신용등급을 기반으로 채권과 주식을 발행할 수 있습니다. 미래 소득을 담보로 자금을 조달하거나, 개인 사업의 지분을 판매할 수 있습니다.' 
                },
                { 
                    subtitle: '기업 증권 발행', 
                    content: '스타트업부터 대기업까지 모든 기업이 증권을 발행할 수 있습니다. PDV 재무제표 기반 신용등급이 자동으로 부여되어 즉시 발행 가능합니다.' 
                },
                { 
                    subtitle: '즉시 거래소 등록', 
                    content: '발행된 모든 증권은 자동으로 거래소에 등록되어 즉시 거래됩니다. 복잡한 상장 심사 절차가 없으며, 신용등급만 있으면 누구나 상장 기업입니다.' 
                }
            ]
        },
        {
            icon: 'fa-robot',
            title: 'AI 증권 발행 대행 서비스',
            description: 'Claude AI가 발행부터 등록까지 모든 과정 대행',
            details: [
                { 
                    subtitle: 'AI 상담 및 설계', 
                    content: 'AI가 발행자와 대화하여 자금 용도, 상환 계획, 리스크 선호도를 파악합니다. 고객의 상황에 최적화된 증권 구조를 설계합니다.' 
                },
                { 
                    subtitle: '자동 서류 작성', 
                    content: '증권신고서, 투자설명서, 계약서 등 필요한 모든 서류를 AI가 자동으로 작성합니다. 법적 요건을 완벽히 충족하는 문서를 생성합니다.' 
                },
                { 
                    subtitle: '거래소 자동 등록', 
                    content: '발행이 완료되면 AI가 자동으로 거래소에 등록 신청을 제출합니다. 신용등급 확인 후 즉시 상장되어 거래가 시작됩니다.' 
                }
            ]
        },
        {
            icon: 'fa-layer-group',
            title: '다양한 증권 상품 설계',
            description: '주식, 채권, 선물, 옵션, 파생상품',
            details: [
                { 
                    subtitle: '주식 (Equity)', 
                    content: '기업의 지분을 나타내는 증권입니다. 발행자는 자금을 조달하고, 투자자는 배당과 시세차익을 기대합니다. AI가 적정 발행가와 발행량을 추천합니다.' 
                },
                { 
                    subtitle: '채권 (Bond)', 
                    content: '확정 이자를 지급하는 부채 증권입니다. 신용등급에 따라 이자율이 자동 결정되며, 만기와 이자 지급 방식을 자유롭게 설계할 수 있습니다.' 
                },
                { 
                    subtitle: '선물 (Futures)', 
                    content: '미래 특정 시점에 자산을 매매하기로 약정하는 계약입니다. 환율, 금리, 상품 가격 변동에 대비한 헤징 용도로 활용됩니다.' 
                },
                { 
                    subtitle: '옵션 (Options)', 
                    content: '특정 가격에 매수 또는 매도할 권리를 부여하는 증권입니다. 콜옵션과 풋옵션을 설계하여 유연한 투자 전략을 구현할 수 있습니다.' 
                },
                { 
                    subtitle: '파생상품 (Derivatives)', 
                    content: '기초자산의 가치에 연동되는 복합 증권입니다. ELS(주가연계증권), DLS(파생결합증권) 등 다양한 구조화 상품을 설계합니다.' 
                }
            ]
        },
        {
            icon: 'fa-chart-line',
            title: '판매량과 가격 최적화 추천',
            description: 'AI 기반 시장 분석 및 가격 결정',
            details: [
                { 
                    subtitle: '적정 발행가 산출', 
                    content: 'PDV 재무제표와 신용등급을 분석하여 적정 발행가를 계산합니다. 주식은 PER·PBR 기준, 채권은 신용등급별 금리를 적용합니다.' 
                },
                { 
                    subtitle: '시장 수요 예측', 
                    content: '과거 유사 증권의 수요와 현재 시장 상황을 분석하여 얼마나 많은 투자자가 관심을 가질지 예측합니다.' 
                },
                { 
                    subtitle: '발행량 최적화', 
                    content: '너무 많이 발행하면 가격이 하락하고, 너무 적게 발행하면 자금 조달이 부족합니다. AI가 최적의 발행량을 추천합니다.' 
                }
            ]
        },
        {
            icon: 'fa-brain',
            title: 'AI 자기개선 시스템',
            description: '추천 결과 모니터링 및 성능 개선',
            details: [
                { 
                    subtitle: '추천 정확도 추적', 
                    content: 'AI가 추천한 발행가와 실제 시장에서 형성된 가격을 비교합니다. 오차율을 계산하여 추천 정확도를 측정합니다.' 
                },
                { 
                    subtitle: '실패 원인 분석', 
                    content: '예측이 빗나간 경우 원인을 분석합니다. 업종 특성을 과소평가했는지, 시장 분위기를 놓쳤는지 등을 파악합니다.' 
                },
                { 
                    subtitle: '모델 자동 재학습', 
                    content: '분석 결과를 바탕으로 AI 모델의 가중치를 조정하고 재학습합니다. 시간이 지날수록 추천 정확도가 향상됩니다.' 
                }
            ]
        },
        {
            icon: 'fa-graduation-cap',
            title: 'DeepSeek R1 / Qwen3 Fine-tuning',
            description: '오픈소스 LLM 기반 AI 학습 과정',
            details: [
                { 
                    subtitle: '1단계: 데이터 수집', 
                    content: '과거 증권 발행 사례 100만 건을 수집합니다. 발행자 정보, 증권 구조, 발행가, 시장 반응 등 모든 데이터를 PDV에서 추출합니다.' 
                },
                { 
                    subtitle: '2단계: 데이터 전처리', 
                    content: '수집한 데이터를 학습용 형식으로 변환합니다. "입력: 발행자 재무제표 + 자금 용도 → 출력: 최적 증권 구조 + 발행가" 형태로 구성합니다.' 
                },
                { 
                    subtitle: '3단계: Base Model 선택', 
                    content: 'DeepSeek R1 또는 Qwen3를 베이스 모델로 사용합니다. 이들은 오픈소스이며 금융 도메인에 강점을 가진 대형 언어 모델입니다.' 
                },
                { 
                    subtitle: '4단계: LoRA Fine-tuning', 
                    content: 'Low-Rank Adaptation 기법으로 효율적으로 fine-tuning합니다. 전체 모델을 재학습하지 않고 일부 가중치만 조정하여 빠르게 학습합니다.' 
                },
                { 
                    subtitle: '5단계: Few-shot Learning', 
                    content: '새로운 유형의 증권이 등장하면 몇 개의 예시만으로 빠르게 학습합니다. 대규모 재학습 없이도 새로운 상품에 대응합니다.' 
                },
                { 
                    subtitle: '6단계: RLHF 강화학습', 
                    content: 'Reinforcement Learning from Human Feedback으로 추가 학습합니다. 전문가가 AI의 추천을 평가하고, 좋은 추천은 강화하고 나쁜 추천은 억제합니다.' 
                },
                { 
                    subtitle: '7단계: A/B 테스트', 
                    content: '신규 모델과 기존 모델을 동시에 운영하여 성능을 비교합니다. 신규 모델이 더 정확하면 전체 시스템에 배포합니다.' 
                },
                { 
                    subtitle: '8단계: 지속적 재학습', 
                    content: '매주 새로운 데이터로 모델을 재학습합니다. 시장 환경 변화에 빠르게 적응하여 항상 최신 상태를 유지합니다.' 
                }
            ]
        }
    ];

    const sendMessage = async () => {
        if (!userInput.trim() || isLoading) return;

        const newMessages = [
            ...messages,
            { role: 'user', content: userInput }
        ];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/securities-api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({ role: m.role, content: m.content }))
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            setMessages([...newMessages, { role: 'assistant', content: data.content }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { 
                role: 'assistant', 
                content: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* 핵심 개념 */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <i className="fas fa-rocket text-green-600"></i>
                    AI 증권 발행 플랫폼
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                        <strong className="text-green-900">모든 개인과 단체는 증권을 발행할 수 있으며, 그 증권은 즉시 거래소에 등록됩니다.</strong> 
                        따라서 모든 개인과 기업은 상장 기업입니다. 복잡한 IPO 절차나 상장 심사가 필요 없습니다.
                    </p>
                    <p>
                        <strong className="text-blue-900">AI가 발행자와 대화하여 증권 발행 및 거래소 등록을 대행합니다.</strong> 
                        주식, 채권, 선물, 옵션, 파생상품 등을 설계하고, 판매량과 가격을 추천합니다. 
                        고객의 요구를 만족할 최적의 금융 상품을 제시합니다.
                    </p>
                    <p>
                        <strong className="text-purple-900">AI는 추천 결과를 지속적으로 모니터링하여 성능을 스스로 개선합니다.</strong> 
                        DeepSeek R1과 Qwen3 같은 오픈소스 LLM을 fine-tuning하여 점점 더 정확한 추천을 제공합니다.
                    </p>
                </div>
            </div>

            {/* AI 상담 시작 버튼 */}
            <div className="bg-white rounded-xl border-2 border-blue-200 p-8 text-center">
                <div className="mb-6">
                    <i className="fas fa-comments text-6xl text-blue-600 mb-4"></i>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI와 증권 발행 상담 시작</h3>
                    <p className="text-gray-600">Claude AI가 최적의 증권 구조를 설계해 드립니다</p>
                </div>
                <button
                    onClick={() => setShowConsultation(!showConsultation)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                >
                    <i className={`fas ${showConsultation ? 'fa-times' : 'fa-robot'} mr-3`}></i>
                    {showConsultation ? 'AI 상담 닫기' : 'AI 상담 시작하기'}
                </button>
            </div>

            {/* AI 상담창 */}
            {showConsultation && (
                <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                        <h3 className="text-xl font-bold mb-1">AI 증권 발행 전문가</h3>
                        <p className="text-sm opacity-90">증권 설계부터 거래소 등록까지 모든 과정을 도와드립니다</p>
                    </div>
                    
                    <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-br from-green-500 to-blue-500' 
                                        : 'bg-gradient-to-br from-blue-500 to-purple-500'
                                }`}>
                                    <i className={`fas ${msg.role === 'user' ? 'fa-user' : 'fa-robot'} text-white`}></i>
                                </div>
                                <div className={`rounded-2xl p-4 max-w-[80%] ${
                                    msg.role === 'user'
                                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-none'
                                        : 'bg-white border-2 border-gray-200 text-gray-800 rounded-tl-none'
                                }`}>
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <i className="fas fa-robot text-white"></i>
                                </div>
                                <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-tl-none p-4">
                                    <i className="fas fa-spinner fa-spin mr-2"></i>답변 생성 중...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-200 p-6 bg-white">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="예: 스타트업 자금 5억원 조달을 위한 증권 발행을 원합니다"
                                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                            >
                                <i className="fas fa-paper-plane mr-2"></i>
                                전송
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 상세 기능 */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">상세 기능</h3>
                <div className="grid grid-cols-1 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                            expanded={expandedCard === index}
                            onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

window.SecuritiesIssuance = SecuritiesIssuance;
