// PatentFilingTab 함수에서 handleSendMessage 부분만 교체

// 추가: 로딩 메시지 배열 (컴포넌트 외부에 정의)
const LOADING_MESSAGES = [
    { icon: '🤔', text: 'AI가 발명 내용을 분석하고 있습니다...' },
    { icon: '📚', text: '특허법 및 심사기준을 참조하고 있습니다...' },
    { icon: '🔍', text: '유사 특허 및 선행기술을 검색 중입니다...' },
    { icon: '⚖️', text: '진보성과 신규성을 평가하고 있습니다...' },
    { icon: '✍️', text: '청구항 초안을 구상하고 있습니다...' },
    { icon: '🌐', text: '국제 특허 동향을 분석하고 있습니다...' }
];

// PatentFilingTab 컴포넌트에 추가
const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

// useEffect 추가 (기존 useEffect 뒤에)
useEffect(() => {
    if (loading && currentStep === 'chat') {
        const timer = setInterval(() => {
            setLoadingMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
        }, 4000); // 4초마다 메시지 변경
        return () => clearInterval(timer);
    }
}, [loading, currentStep]);

// 대화 히스토리 표시 부분에 로딩 메시지 추가
// conversation.length > 0 && ... 다음에 추가:

loading && currentStep === 'chat' && React.createElement('div', {
    className: 'mb-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl'
},
    React.createElement('div', { className: 'flex items-center space-x-4' },
        React.createElement('div', { className: 'animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent' }),
        React.createElement('div', { className: 'flex-1' },
            React.createElement('div', { className: 'text-3xl mb-2' }, LOADING_MESSAGES[loadingMessageIndex].icon),
            React.createElement('p', { className: 'text-lg font-semibold text-gray-800' },
                LOADING_MESSAGES[loadingMessageIndex].text
            ),
            React.createElement('p', { className: 'text-sm text-gray-600 mt-2' },
                '잠시만 기다려주세요. AI가 작업 중입니다...'
            )
        )
    )
),
