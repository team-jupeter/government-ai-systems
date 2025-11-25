// PatentFilingTab 함수 시작 부분에 추가할 상태
const [showPDVModal, setShowPDVModal] = useState(false);
const [showOpenHashModal, setShowOpenHashModal] = useState(false);
const [showMultiCountryModal, setShowMultiCountryModal] = useState(false);

// 헤더 부분 (기존 헤더를 이것으로 교체)
React.createElement('div', { className: 'bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-xl p-8 mb-6 text-white' },
    React.createElement('h2', { className: 'text-4xl font-bold mb-3' }, '🤖 AI 특허 출원 시스템'),
    React.createElement('p', { className: 'text-purple-100 text-lg mb-4' },
        '대화형 AI가 발명 내용을 파악하여 명세서, 청구항, 도면을 자동 작성하고 특허성과 시장 가치를 평가합니다'
    ),
    React.createElement('div', { className: 'flex gap-3 flex-wrap' },
        React.createElement('button', {
            onClick: () => setShowPDVModal(true),
            className: 'bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105'
        }, '✅ PDV 금고 통합'),
        React.createElement('button', {
            onClick: () => setShowOpenHashModal(true),
            className: 'bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105'
        }, '🌐 5계층 오픈해시'),
        React.createElement('button', {
            onClick: () => setShowMultiCountryModal(true),
            className: 'bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105'
        }, '🌍 다국가 평가')
    )
),

// 모달들 (PatentFilingTab return의 맨 끝에 추가)
React.createElement(PDVModal, { isOpen: showPDVModal, onClose: () => setShowPDVModal(false) }),
React.createElement(OpenHashModal, { isOpen: showOpenHashModal, onClose: () => setShowOpenHashModal(false) }),
React.createElement(MultiCountryModal, { isOpen: showMultiCountryModal, onClose: () => setShowMultiCountryModal(false) })
