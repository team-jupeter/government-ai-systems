// PatentChatConsultation 컴포넌트 - AI 주도 특허 출원 채팅 시스템
const PatentChatConsultation = ({ ipType, ipTypes }) => {
    const [messages, setMessages] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [consultationPhase, setConsultationPhase] = React.useState('greeting'); 
    // phases: greeting, understanding, technical, claims, prior_art, drawings, review, complete
    const [patentDocument, setPatentDocument] = React.useState({
        title: '',
        titleEn: '',
        summary: '',
        techField: '',
        background: '',
        problemToSolve: '',
        solution: '',
        effects: '',
        detailedDescription: '',
        claims: [],
        priorArt: [],
        drawings: [],
        drawingDescriptions: [],
        referenceNumerals: {}
    });
    const [showDocumentPanel, setShowDocumentPanel] = React.useState(false);
    const [activeDocTab, setActiveDocTab] = React.useState('summary');
    const messagesEndRef = React.useRef(null);
    const typeInfo = ipTypes[ipType] || ipTypes.patent;

    // 초기 인사 메시지
    React.useEffect(() => {
        const initialMessage = {
            id: Date.now(),
            type: 'ai',
            content: `안녕하세요! 저는 AI 특허 출원 도우미입니다. 🤖

오늘 ${typeInfo.name} 출원을 도와드리겠습니다. 

발명에 대해 편하게 이야기해 주세요. 어떤 것을 발명하셨거나, 발명하고 싶으신가요? 

기술적인 용어를 모르셔도 괜찮습니다. 일상적인 말로 설명해 주시면, 제가 질문을 통해 발명의 핵심을 파악하고 출원에 필요한 모든 문서를 작성해 드리겠습니다.

💡 **도움말**: "블록체인으로 문서를 안전하게 저장하는 시스템을 만들었어요" 처럼 간단히 시작하시면 됩니다.`,
            timestamp: new Date()
        };
        setMessages([initialMessage]);
    }, []);

    // 스크롤 자동 이동
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // AI 응답 생성
    const generateAIResponse = async (userMessage) => {
        setIsTyping(true);
        
        // 실제로는 Claude API 호출
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        let response = '';
        let newPhase = consultationPhase;
        let docUpdates = {};

        // 발명 내용 분석 및 단계별 응답
        const lowerMsg = userMessage.toLowerCase();
        
        if (consultationPhase === 'greeting') {
            // 발명 주제 파악
            response = `흥미로운 발명이네요! 조금 더 자세히 알고 싶습니다.

**몇 가지 질문을 드릴게요:**

1. 이 발명이 해결하려는 **문제**가 무엇인가요? 기존에는 어떤 불편함이나 한계가 있었나요?

2. 이 발명의 **핵심 아이디어**는 무엇인가요? 기존 방식과 다른 점이 있다면 무엇인가요?

3. 이 발명을 사용하면 어떤 **효과나 장점**이 있나요?

한 번에 다 대답하지 않으셔도 됩니다. 하나씩 이야기해 주세요. 😊`;
            newPhase = 'understanding';
            
            // 제목 초안 추출 시도
            const titleMatch = userMessage.match(/(.+?)(을|를|이|가|에서|으로|시스템|방법|장치|기술)/);
            if (titleMatch || userMessage.length > 10) {
                docUpdates.title = userMessage.slice(0, 50) + (userMessage.length > 50 ? '...' : '');
            }
        }
        else if (consultationPhase === 'understanding') {
            if (lowerMsg.includes('문제') || lowerMsg.includes('불편') || lowerMsg.includes('기존') || lowerMsg.includes('한계')) {
                response = `네, 이해했습니다. 기존 방식의 문제점을 잘 파악하셨네요.

그렇다면 발명하신 기술이 **구체적으로 어떻게 작동**하는지 설명해 주시겠어요?

예를 들어:
- 어떤 **구성요소**들이 있나요? (서버, 클라이언트, 센서, 모듈 등)
- 각 구성요소는 **어떤 역할**을 하나요?
- 데이터나 신호가 **어떤 순서로** 처리되나요?

기술적인 용어를 정확히 모르셔도 괜찮습니다. 설명해 주시면 제가 특허 용어로 정리해 드릴게요.`;
                newPhase = 'technical';
                docUpdates.problemToSolve = userMessage;
            } else if (lowerMsg.includes('효과') || lowerMsg.includes('장점') || lowerMsg.includes('좋은')) {
                response = `좋은 효과네요! 이 장점들을 명세서에 잘 기재하겠습니다.

이제 기술적인 구현 방법에 대해 여쭤볼게요.

발명하신 시스템/방법이 **어떤 단계로 동작**하나요? 

처음부터 끝까지 순서대로 설명해 주시면 제가 흐름도(도면)도 함께 작성하겠습니다.`;
                newPhase = 'technical';
                docUpdates.effects = userMessage;
            } else {
                response = `알겠습니다. 발명의 개요가 점점 명확해지고 있어요.

제가 이해한 바로는:
${patentDocument.title ? `- **발명의 명칭**: ${patentDocument.title}` : ''}
${patentDocument.problemToSolve ? `- **해결 과제**: ${patentDocument.problemToSolve}` : ''}

맞나요? 수정하거나 추가할 내용이 있으면 말씀해 주세요.

이제 **기술적 구현 방법**에 대해 자세히 알고 싶습니다. 
시스템의 구성요소와 동작 방식을 설명해 주시겠어요?`;
                newPhase = 'technical';
            }
        }
        else if (consultationPhase === 'technical') {
            // 기술적 설명 수집
            if (lowerMsg.includes('서버') || lowerMsg.includes('클라이언트') || lowerMsg.includes('데이터베이스') || 
                lowerMsg.includes('모듈') || lowerMsg.includes('처리') || lowerMsg.includes('전송')) {
                
                response = `훌륭합니다! 기술적 구조가 잘 파악됩니다. 👍

제가 이해한 **시스템 구성**을 정리해 볼게요:

\`\`\`
[시스템 구성 초안]
1. 입력부: 사용자 데이터 수신
2. 처리부: 핵심 알고리즘 수행
3. 저장부: 결과 데이터 저장
4. 출력부: 결과 제공
\`\`\`

이 구성이 맞나요? 빠진 부분이나 수정할 내용이 있으면 말씀해 주세요.

다음으로, **청구항(특허권의 범위)** 작성을 위해 질문드립니다:

이 발명에서 **가장 핵심적인 기술적 특징**은 무엇인가요? 
다른 사람이 따라 할 수 없게 보호받고 싶은 부분이요.`;
                newPhase = 'claims';
                docUpdates.solution = userMessage;
                docUpdates.detailedDescription = userMessage;
            } else {
                response = `조금 더 구체적으로 여쭤볼게요.

발명하신 기술에서:

1. **입력**은 무엇인가요? (사용자가 넣는 데이터, 센서 신호 등)
2. **처리 과정**은 어떻게 되나요? (어떤 계산, 변환, 판단을 하나요?)
3. **출력/결과**는 무엇인가요?

이 흐름을 알면 도면과 청구항을 작성할 수 있습니다.`;
            }
        }
        else if (consultationPhase === 'claims') {
            // 청구항 작성
            response = `핵심 기술 특징을 파악했습니다! 

지금까지 대화를 바탕으로 **청구항 초안**을 작성했습니다:

---
**[청구항 1]** (독립항)
${patentDocument.title || '본 발명'}에 있어서,
입력 데이터를 수신하는 수신부;
상기 입력 데이터를 처리하는 처리부; 및
처리 결과를 저장하는 저장부를 포함하고,
상기 처리부는 ${userMessage.slice(0, 100)}을 수행하는 것을 특징으로 하는 시스템.

**[청구항 2]** (종속항)
제1항에 있어서,
상기 처리부는 오픈해시 기반 타임스탬프를 생성하여 데이터 무결성을 보장하는 것을 특징으로 하는 시스템.
---

이 청구항이 발명의 핵심을 잘 담고 있나요? 
수정하거나 추가할 내용이 있으면 말씀해 주세요.

괜찮으시면, 이제 **선행기술 조사**를 진행하겠습니다. "진행해 주세요"라고 말씀해 주세요.`;
            newPhase = 'prior_art';
            
            // 청구항 저장
            docUpdates.claims = [
                {
                    number: 1,
                    type: 'independent',
                    text: `${patentDocument.title || '본 발명'}에 있어서, 입력 데이터를 수신하는 수신부; 상기 입력 데이터를 처리하는 처리부; 및 처리 결과를 저장하는 저장부를 포함하는 시스템.`
                },
                {
                    number: 2,
                    type: 'dependent',
                    text: '제1항에 있어서, 상기 처리부는 오픈해시 기반 타임스탬프를 생성하여 데이터 무결성을 보장하는 것을 특징으로 하는 시스템.'
                }
            ];
        }
        else if (consultationPhase === 'prior_art') {
            if (lowerMsg.includes('진행') || lowerMsg.includes('네') || lowerMsg.includes('좋') || lowerMsg.includes('확인')) {
                response = `**선행기술 조사**를 진행합니다... 🔍

\`\`\`
[조사 중] 국내 특허 DB (KIPRIS) 검색 중...
[조사 중] 미국 특허 DB (USPTO) 검색 중...
[조사 중] 유럽 특허 DB (EPO) 검색 중...
\`\`\`

**선행기술 조사 결과:**

| 번호 | 문헌번호 | 제목 | 유사도 |
|------|----------|------|--------|
| 1 | KR10-2023-0012345 | 블록체인 기반 데이터 검증 시스템 | 35% |
| 2 | US2022/0234567 | Distributed Data Verification | 28% |
| 3 | CN112345678A | 分布式数据存储方法 | 22% |

✅ **좋은 소식입니다!** 
유사한 선행기술이 있지만, 귀하의 발명과는 **차별점**이 있습니다:
- 선행기술 1: 블록체인 사용 (귀하는 오픈해시 사용 → 에너지 98.5% 절감)
- 선행기술 2: 중앙 서버 의존 (귀하는 분산 처리)

**등록 가능성: 78%** (양호)

이제 **도면 작성**을 진행하겠습니다. 잠시만 기다려 주세요...`;
                newPhase = 'drawings';
                
                docUpdates.priorArt = [
                    { number: 'KR10-2023-0012345', title: '블록체인 기반 데이터 검증 시스템', similarity: 35 },
                    { number: 'US2022/0234567', title: 'Distributed Data Verification', similarity: 28 },
                    { number: 'CN112345678A', title: '分布式数据存储方法', similarity: 22 }
                ];
                
                // 도면 생성 시뮬레이션
                setTimeout(() => generateDrawings(), 2000);
            } else {
                response = `청구항을 수정하시겠습니까? 

수정할 내용을 말씀해 주시거나, 
"진행해 주세요"라고 하시면 선행기술 조사를 시작합니다.`;
            }
        }
        else if (consultationPhase === 'drawings') {
            response = `도면 작성이 완료되었습니다! 📐

우측의 **[문서 보기]** 버튼을 클릭하시면 
작성된 모든 문서(명세서, 청구항, 도면)를 확인하실 수 있습니다.

**작성 완료된 문서:**
✅ 발명의 명칭
✅ 요약서
✅ 명세서 (기술분야, 배경기술, 발명의 내용, 실시예)
✅ 청구범위 (청구항 ${patentDocument.claims?.length || 2}개)
✅ 선행기술문헌
✅ 도면 ${patentDocument.drawings?.length || 3}장 + 도면의 간단한 설명
✅ 도면 부호 설명

**다음 단계:**
1. 문서를 검토하고 수정이 필요하면 말씀해 주세요
2. "제출하기"라고 하시면 최종 검토 후 특허청에 제출합니다

궁금한 점이 있으시면 언제든 물어보세요!`;
            newPhase = 'review';
            setShowDocumentPanel(true);
        }
        else if (consultationPhase === 'review') {
            if (lowerMsg.includes('제출') || lowerMsg.includes('출원')) {
                response = `🎉 **출원 준비가 완료되었습니다!**

**최종 검토 사항:**
- 발명의 명칭: ${patentDocument.title || '(자동 생성됨)'}
- 청구항 수: ${patentDocument.claims?.length || 2}개
- 도면 수: ${patentDocument.drawings?.length || 3}장
- 예상 수수료: 약 189,000원 (개인 감면 적용 시 56,700원)

**출원 절차:**
1. 개인정보 금고에서 출원인 정보 연동
2. 수수료 결제
3. 특허청 전자출원 시스템 제출

"최종 제출"이라고 하시면 출원을 진행합니다.
또는 수정할 내용이 있으면 말씀해 주세요.`;
                newPhase = 'complete';
            } else if (lowerMsg.includes('수정') || lowerMsg.includes('변경') || lowerMsg.includes('고쳐')) {
                response = `어떤 부분을 수정하시겠습니까?

1. **명칭** 수정 → "명칭을 OOO로 바꿔줘"
2. **청구항** 수정 → "청구항에 OOO 추가해줘"
3. **도면** 수정 → "도면에 OOO 추가해줘"
4. **명세서** 수정 → "명세서의 OO 부분을 수정해줘"

원하시는 수정 사항을 말씀해 주세요.`;
            } else {
                response = `네, 알겠습니다. 

해당 내용을 반영하여 문서를 수정하겠습니다. 
수정이 완료되면 알려드릴게요.

다른 수정 사항이 있으시면 계속 말씀해 주세요.
모든 수정이 끝나면 "제출하기"라고 해주세요.`;
            }
        }

        // 문서 업데이트
        if (Object.keys(docUpdates).length > 0) {
            setPatentDocument(prev => ({ ...prev, ...docUpdates }));
        }
        
        setConsultationPhase(newPhase);
        setIsTyping(false);
        
        return {
            id: Date.now(),
            type: 'ai',
            content: response,
            timestamp: new Date()
        };
    };

    // 도면 생성
    const generateDrawings = () => {
        const drawings = [
            {
                id: 1,
                title: '도 1',
                description: '본 발명의 전체 시스템 구성도',
                mermaidCode: `graph TB
    subgraph 클라이언트["클라이언트 단말 (100)"]
        A1["입력부 (110)"]
        A2["표시부 (120)"]
    end
    
    subgraph 서버["처리 서버 (200)"]
        B1["수신 모듈 (210)"]
        B2["처리 모듈 (220)"]
        B3["검증 모듈 (230)"]
    end
    
    subgraph 저장소["데이터 저장소 (300)"]
        C1["원본 DB (310)"]
        C2["해시 DB (320)"]
    end
    
    subgraph 오픈해시["오픈해시 네트워크 (400)"]
        D1["타임스탬프 노드 (410)"]
        D2["검증 노드 (420)"]
    end
    
    A1 -->|"데이터 전송"| B1
    B1 --> B2
    B2 --> B3
    B3 -->|"저장 요청"| C1
    B3 -->|"해시 등록"| D1
    D1 --> D2
    D2 -->|"검증 결과"| B3
    B3 -->|"결과 전송"| A2
    C1 -.->|"해시 동기화"| C2`,
                referenceNumerals: {
                    '100': '클라이언트 단말',
                    '110': '입력부',
                    '120': '표시부',
                    '200': '처리 서버',
                    '210': '수신 모듈',
                    '220': '처리 모듈',
                    '230': '검증 모듈',
                    '300': '데이터 저장소',
                    '310': '원본 데이터베이스',
                    '320': '해시 데이터베이스',
                    '400': '오픈해시 네트워크',
                    '410': '타임스탬프 노드',
                    '420': '검증 노드'
                }
            },
            {
                id: 2,
                title: '도 2',
                description: '본 발명의 데이터 처리 방법 흐름도',
                mermaidCode: `flowchart TD
    S((시작)) --> A["S100: 데이터 수신"]
    A --> B{"S110: 데이터\\n유효성 검사"}
    B -->|유효| C["S120: 해시값 생성"]
    B -->|무효| E1["S111: 오류 반환"]
    E1 --> E((종료))
    C --> D["S130: 오픈해시 타임스탬프 요청"]
    D --> F{"S140: 타임스탬프\\n응답 확인"}
    F -->|성공| G["S150: 데이터 저장"]
    F -->|실패| H["S141: 재시도 (최대 3회)"]
    H --> D
    G --> I["S160: 무결성 검증"]
    I --> J{"S170: 검증 결과"}
    J -->|성공| K["S180: 완료 응답 전송"]
    J -->|실패| L["S171: 복구 절차 수행"]
    L --> I
    K --> E`,
                referenceNumerals: {
                    'S100': '데이터 수신 단계',
                    'S110': '데이터 유효성 검사 단계',
                    'S120': '해시값 생성 단계',
                    'S130': '오픈해시 타임스탬프 요청 단계',
                    'S140': '타임스탬프 응답 확인 단계',
                    'S150': '데이터 저장 단계',
                    'S160': '무결성 검증 단계',
                    'S170': '검증 결과 판단 단계',
                    'S180': '완료 응답 전송 단계'
                }
            },
            {
                id: 3,
                title: '도 3',
                description: '처리 서버의 상세 구성도',
                mermaidCode: `graph LR
    subgraph 처리서버["처리 서버 (200)"]
        subgraph 수신부["수신 모듈 (210)"]
            R1["API 게이트웨이 (211)"]
            R2["인증 처리부 (212)"]
        end
        
        subgraph 처리부["처리 모듈 (220)"]
            P1["데이터 파서 (221)"]
            P2["비즈니스 로직 (222)"]
            P3["해시 생성기 (223)"]
        end
        
        subgraph 검증부["검증 모듈 (230)"]
            V1["무결성 검증기 (231)"]
            V2["타임스탬프 관리자 (232)"]
        end
    end
    
    R1 --> R2
    R2 --> P1
    P1 --> P2
    P2 --> P3
    P3 --> V1
    V1 --> V2`,
                referenceNumerals: {
                    '200': '처리 서버',
                    '210': '수신 모듈',
                    '211': 'API 게이트웨이',
                    '212': '인증 처리부',
                    '220': '처리 모듈',
                    '221': '데이터 파서',
                    '222': '비즈니스 로직',
                    '223': '해시 생성기',
                    '230': '검증 모듈',
                    '231': '무결성 검증기',
                    '232': '타임스탬프 관리자'
                }
            }
        ];

        // 도면 부호 통합
        let allReferenceNumerals = {};
        drawings.forEach(d => {
            allReferenceNumerals = { ...allReferenceNumerals, ...d.referenceNumerals };
        });

        setPatentDocument(prev => ({
            ...prev,
            drawings,
            drawingDescriptions: drawings.map(d => ({
                figure: d.title,
                description: d.description
            })),
            referenceNumerals: allReferenceNumerals
        }));

        // 도면 완료 메시지
        const drawingCompleteMsg = {
            id: Date.now() + 1,
            type: 'ai',
            content: `📐 **도면 작성이 완료되었습니다!**

**작성된 도면:**
- **도 1**: 전체 시스템 구성도
- **도 2**: 데이터 처리 방법 흐름도  
- **도 3**: 처리 서버 상세 구성도

**도면 부호 설명** (총 ${Object.keys(allReferenceNumerals).length}개):
${Object.entries(allReferenceNumerals).slice(0, 5).map(([num, desc]) => `- ${num}: ${desc}`).join('\n')}
... 외 ${Math.max(0, Object.keys(allReferenceNumerals).length - 5)}개

우측 **[문서 보기]** 패널에서 전체 내용을 확인하실 수 있습니다.

모든 출원 문서 작성이 완료되었습니다! 🎉
검토 후 수정할 부분이 있으면 말씀해 주세요.`,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, drawingCompleteMsg]);
    };

    // 메시지 전송
    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const userInput = inputValue;
        setInputValue('');

        const aiResponse = await generateAIResponse(userInput);
        setMessages(prev => [...prev, aiResponse]);
    };

    // 키 입력 처리
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // 빠른 응답 버튼
    const quickResponses = [
        '진행해 주세요',
        '수정이 필요해요',
        '더 자세히 설명할게요',
        '문서 확인할게요'
    ];

    return (
        React.createElement('div', { className: 'pt-[140px] h-[calc(100vh-60px)] flex' },
            // 채팅 영역
            React.createElement('div', { className: `flex-1 flex flex-col ${showDocumentPanel ? 'mr-[450px]' : ''}` },
                // 헤더
                React.createElement('div', { className: 'bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between' },
                    React.createElement('div', { className: 'flex items-center gap-3' },
                        React.createElement('div', { className: 'w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl' }, '🤖'),
                        React.createElement('div', null,
                            React.createElement('h2', { className: 'font-bold text-gray-800' }, 'AI 특허 출원 도우미'),
                            React.createElement('p', { className: 'text-sm text-gray-500' }, 
                                consultationPhase === 'greeting' ? '발명에 대해 이야기해 주세요' :
                                consultationPhase === 'understanding' ? '발명 내용 파악 중...' :
                                consultationPhase === 'technical' ? '기술적 구현 분석 중...' :
                                consultationPhase === 'claims' ? '청구항 작성 중...' :
                                consultationPhase === 'prior_art' ? '선행기술 조사 중...' :
                                consultationPhase === 'drawings' ? '도면 작성 중...' :
                                consultationPhase === 'review' ? '문서 검토 단계' :
                                '출원 준비 완료'
                            )
                        )
                    ),
                    React.createElement('button', {
                        onClick: () => setShowDocumentPanel(!showDocumentPanel),
                        className: `px-4 py-2 rounded-lg font-medium transition ${showDocumentPanel ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                    }, 
                        React.createElement('i', { className: `fas fa-file-alt mr-2` }),
                        '문서 보기'
                    )
                ),

                // 진행 상태 바
                React.createElement('div', { className: 'bg-gray-50 px-6 py-2 border-b border-gray-200' },
                    React.createElement('div', { className: 'flex items-center gap-2' },
                        ['발명 파악', '기술 분석', '청구항', '선행조사', '도면', '검토'].map((step, idx) => {
                            const phases = ['understanding', 'technical', 'claims', 'prior_art', 'drawings', 'review'];
                            const currentIdx = phases.indexOf(consultationPhase);
                            const isComplete = idx < currentIdx || consultationPhase === 'complete';
                            const isCurrent = idx === currentIdx;
                            
                            return React.createElement(React.Fragment, { key: idx },
                                React.createElement('div', {
                                    className: `flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                        isComplete ? 'bg-green-100 text-green-700' :
                                        isCurrent ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-400'
                                    }`
                                },
                                    isComplete && React.createElement('i', { className: 'fas fa-check' }),
                                    step
                                ),
                                idx < 5 && React.createElement('div', { 
                                    className: `w-8 h-0.5 ${isComplete ? 'bg-green-300' : 'bg-gray-200'}`
                                })
                            );
                        })
                    )
                ),

                // 메시지 영역
                React.createElement('div', { className: 'flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50' },
                    messages.map(msg => 
                        React.createElement('div', {
                            key: msg.id,
                            className: `flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`
                        },
                            React.createElement('div', {
                                className: `max-w-[70%] rounded-2xl p-4 ${
                                    msg.type === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-md' 
                                        : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                                }`
                            },
                                React.createElement('div', { 
                                    className: 'whitespace-pre-wrap text-sm',
                                    dangerouslySetInnerHTML: { 
                                        __html: msg.content
                                            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-xs">$1</code>')
                                            .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-green-400 p-3 rounded-lg mt-2 text-xs overflow-x-auto">$1</pre>')
                                    }
                                }),
                                React.createElement('div', { 
                                    className: `text-xs mt-2 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`
                                }, new Date(msg.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }))
                            )
                        )
                    ),
                    isTyping && React.createElement('div', { className: 'flex justify-start' },
                        React.createElement('div', { className: 'bg-white rounded-2xl rounded-bl-md p-4 shadow-sm' },
                            React.createElement('div', { className: 'flex gap-1' },
                                React.createElement('span', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce', style: { animationDelay: '0ms' } }),
                                React.createElement('span', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce', style: { animationDelay: '150ms' } }),
                                React.createElement('span', { className: 'w-2 h-2 bg-gray-400 rounded-full animate-bounce', style: { animationDelay: '300ms' } })
                            )
                        )
                    ),
                    React.createElement('div', { ref: messagesEndRef })
                ),

                // 빠른 응답
                React.createElement('div', { className: 'px-6 py-2 bg-white border-t border-gray-100' },
                    React.createElement('div', { className: 'flex gap-2 flex-wrap' },
                        quickResponses.map((resp, idx) => 
                            React.createElement('button', {
                                key: idx,
                                onClick: () => { setInputValue(resp); },
                                className: 'px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm transition'
                            }, resp)
                        )
                    )
                ),

                // 입력 영역
                React.createElement('div', { className: 'p-4 bg-white border-t border-gray-200' },
                    React.createElement('div', { className: 'flex gap-3' },
                        React.createElement('textarea', {
                            value: inputValue,
                            onChange: (e) => setInputValue(e.target.value),
                            onKeyPress: handleKeyPress,
                            placeholder: '발명에 대해 자유롭게 이야기해 주세요...',
                            rows: 2,
                            className: 'flex-1 border border-gray-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        }),
                        React.createElement('button', {
                            onClick: sendMessage,
                            disabled: !inputValue.trim() || isTyping,
                            className: 'px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition'
                        },
                            React.createElement('i', { className: 'fas fa-paper-plane' })
                        )
                    )
                )
            ),

            // 문서 패널
            showDocumentPanel && React.createElement('div', { 
                className: 'fixed right-0 top-[140px] bottom-0 w-[450px] bg-white border-l border-gray-200 flex flex-col shadow-xl'
            },
                // 문서 패널 헤더
                React.createElement('div', { className: 'p-4 border-b border-gray-200 flex items-center justify-between' },
                    React.createElement('h3', { className: 'font-bold text-gray-800' }, '📄 출원 문서'),
                    React.createElement('button', {
                        onClick: () => setShowDocumentPanel(false),
                        className: 'text-gray-400 hover:text-gray-600'
                    }, React.createElement('i', { className: 'fas fa-times' }))
                ),

                // 문서 탭
                React.createElement('div', { className: 'flex border-b border-gray-200 overflow-x-auto' },
                    [
                        { id: 'summary', label: '요약' },
                        { id: 'spec', label: '명세서' },
                        { id: 'claims', label: '청구항' },
                        { id: 'drawings', label: '도면' },
                        { id: 'prior', label: '선행기술' }
                    ].map(tab => 
                        React.createElement('button', {
                            key: tab.id,
                            onClick: () => setActiveDocTab(tab.id),
                            className: `px-4 py-2 text-sm font-medium whitespace-nowrap ${
                                activeDocTab === tab.id 
                                    ? 'text-blue-600 border-b-2 border-blue-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`
                        }, tab.label)
                    )
                ),

                // 문서 내용
                React.createElement('div', { className: 'flex-1 overflow-y-auto p-4' },
                    activeDocTab === 'summary' && React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', null,
                            React.createElement('label', { className: 'text-sm font-medium text-gray-500' }, '발명의 명칭'),
                            React.createElement('p', { className: 'mt-1 p-3 bg-gray-50 rounded-lg' }, 
                                patentDocument.title || '(대화를 통해 자동 생성됩니다)'
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'text-sm font-medium text-gray-500' }, '요약'),
                            React.createElement('p', { className: 'mt-1 p-3 bg-gray-50 rounded-lg text-sm' }, 
                                patentDocument.summary || patentDocument.solution || '(대화를 통해 자동 생성됩니다)'
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { className: 'text-sm font-medium text-gray-500' }, '해결하고자 하는 과제'),
                            React.createElement('p', { className: 'mt-1 p-3 bg-gray-50 rounded-lg text-sm' }, 
                                patentDocument.problemToSolve || '(대화를 통해 자동 생성됩니다)'
                            )
                        )
                    ),

                    activeDocTab === 'claims' && React.createElement('div', { className: 'space-y-3' },
                        patentDocument.claims?.length > 0 
                            ? patentDocument.claims.map((claim, idx) => 
                                React.createElement('div', { key: idx, className: 'p-3 border border-gray-200 rounded-lg' },
                                    React.createElement('div', { className: 'flex items-center gap-2 mb-2' },
                                        React.createElement('span', { 
                                            className: `px-2 py-0.5 rounded text-xs font-medium ${
                                                claim.type === 'independent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                            }`
                                        }, claim.type === 'independent' ? '독립항' : '종속항'),
                                        React.createElement('span', { className: 'font-medium' }, `청구항 ${claim.number}`)
                                    ),
                                    React.createElement('p', { className: 'text-sm text-gray-700 whitespace-pre-wrap' }, claim.text)
                                )
                            )
                            : React.createElement('p', { className: 'text-gray-500 text-center py-8' }, '대화를 진행하면 청구항이 생성됩니다')
                    ),

                    activeDocTab === 'drawings' && React.createElement('div', { className: 'space-y-4' },
                        patentDocument.drawings?.length > 0 
                            ? React.createElement(React.Fragment, null,
                                patentDocument.drawings.map((drawing, idx) => 
                                    React.createElement('div', { key: idx, className: 'border border-gray-200 rounded-lg overflow-hidden' },
                                        React.createElement('div', { className: 'bg-gray-50 px-3 py-2 border-b border-gray-200' },
                                            React.createElement('span', { className: 'font-medium' }, drawing.title),
                                            React.createElement('span', { className: 'text-sm text-gray-500 ml-2' }, drawing.description)
                                        ),
                                        React.createElement('div', { className: 'p-3 bg-white' },
                                            React.createElement('pre', { className: 'text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto' }, 
                                                drawing.mermaidCode
                                            )
                                        )
                                    )
                                ),
                                // 도면 부호 설명
                                React.createElement('div', { className: 'border border-gray-200 rounded-lg p-3' },
                                    React.createElement('h4', { className: 'font-medium text-gray-800 mb-2' }, '도면 부호의 설명'),
                                    React.createElement('div', { className: 'grid grid-cols-2 gap-1 text-xs' },
                                        Object.entries(patentDocument.referenceNumerals || {}).map(([num, desc], idx) => 
                                            React.createElement('div', { key: idx, className: 'flex gap-2' },
                                                React.createElement('span', { className: 'font-mono text-blue-600' }, num + ':'),
                                                React.createElement('span', { className: 'text-gray-600' }, desc)
                                            )
                                        )
                                    )
                                )
                            )
                            : React.createElement('p', { className: 'text-gray-500 text-center py-8' }, '대화를 진행하면 도면이 생성됩니다')
                    ),

                    activeDocTab === 'prior' && React.createElement('div', { className: 'space-y-3' },
                        patentDocument.priorArt?.length > 0 
                            ? patentDocument.priorArt.map((art, idx) => 
                                React.createElement('div', { key: idx, className: 'p-3 border border-gray-200 rounded-lg' },
                                    React.createElement('div', { className: 'flex justify-between items-start mb-1' },
                                        React.createElement('span', { className: 'font-mono text-sm text-blue-600' }, art.number),
                                        React.createElement('span', { 
                                            className: `px-2 py-0.5 rounded text-xs ${
                                                art.similarity >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                            }`
                                        }, `유사도 ${art.similarity}%`)
                                    ),
                                    React.createElement('p', { className: 'text-sm text-gray-700' }, art.title)
                                )
                            )
                            : React.createElement('p', { className: 'text-gray-500 text-center py-8' }, '선행기술 조사가 진행되면 표시됩니다')
                    ),

                    activeDocTab === 'spec' && React.createElement('div', { className: 'space-y-4' },
                        React.createElement('div', null,
                            React.createElement('h4', { className: 'font-medium text-gray-800 mb-2' }, '기술분야'),
                            React.createElement('p', { className: 'text-sm text-gray-600 p-3 bg-gray-50 rounded-lg' }, 
                                '본 발명은 데이터 처리 기술에 관한 것으로, 더욱 상세하게는 오픈해시 기반의 데이터 무결성 검증 시스템에 관한 것이다.'
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('h4', { className: 'font-medium text-gray-800 mb-2' }, '배경기술'),
                            React.createElement('p', { className: 'text-sm text-gray-600 p-3 bg-gray-50 rounded-lg' }, 
                                patentDocument.problemToSolve || '(대화를 통해 자동 생성됩니다)'
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('h4', { className: 'font-medium text-gray-800 mb-2' }, '발명의 내용'),
                            React.createElement('p', { className: 'text-sm text-gray-600 p-3 bg-gray-50 rounded-lg' }, 
                                patentDocument.solution || '(대화를 통해 자동 생성됩니다)'
                            )
                        )
                    )
                ),

                // 문서 패널 하단 버튼
                React.createElement('div', { className: 'p-4 border-t border-gray-200' },
                    React.createElement('div', { className: 'flex gap-2' },
                        React.createElement('button', { 
                            className: 'flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50'
                        }, 
                            React.createElement('i', { className: 'fas fa-download mr-2' }),
                            '다운로드'
                        ),
                        React.createElement('button', { 
                            className: 'flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700'
                        }, 
                            React.createElement('i', { className: 'fas fa-paper-plane mr-2' }),
                            '출원 제출'
                        )
                    )
                )
            )
        )
    );
};
