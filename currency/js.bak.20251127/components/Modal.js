// Modal.js - 모달 컴포넌트
const Modal = ({ isOpen, onClose, title, icon, iconBg, children }) => {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay',
        style: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        onClick: onClose
    },
        React.createElement('div', {
            className: 'modal-content bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-slate-700',
            onClick: (e) => e.stopPropagation()
        },
            // 헤더
            React.createElement('div', {
                className: `${iconBg} p-6 border-b border-slate-700`
            },
                React.createElement('div', { className: 'flex items-center justify-between' },
                    React.createElement('div', { className: 'flex items-center gap-4' },
                        React.createElement('span', { className: 'text-4xl' }, icon),
                        React.createElement('h2', { className: 'text-2xl font-bold text-white' }, title)
                    ),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-white/70 hover:text-white text-3xl font-light transition-colors'
                    }, '×')
                )
            ),
            // 본문
            React.createElement('div', {
                className: 'p-6 overflow-y-auto max-h-[60vh] text-gray-300'
            }, children)
        )
    );
};
