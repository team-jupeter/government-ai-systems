const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'absolute inset-0 bg-black/80 backdrop-blur-sm'
        }),
        React.createElement('div', {
            className: 'relative bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-teal-500/30',
            onClick: e => e.stopPropagation()
        },
            React.createElement('div', {
                className: 'flex justify-between items-center p-6 border-b border-gray-700'
            },
                React.createElement('h2', {
                    className: 'text-2xl font-bold text-teal-400'
                }, title),
                React.createElement('button', {
                    onClick: onClose,
                    className: 'text-gray-400 hover:text-white text-3xl leading-none'
                }, '×')
            ),
            React.createElement('div', {
                className: 'p-6 overflow-y-auto max-h-[calc(90vh-140px)]'
            }, children),
            React.createElement('div', {
                className: 'p-4 border-t border-gray-700 flex justify-end'
            },
                React.createElement('button', {
                    onClick: onClose,
                    className: 'px-6 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg font-semibold transition-colors'
                }, '닫기')
            )
        )
    );
};
