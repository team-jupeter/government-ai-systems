const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', { className: 'absolute inset-0 bg-black/70 backdrop-filter backdrop-blur-sm' }),
        React.createElement('div', {
            className: 'relative bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-yellow-500/30 shadow-2xl',
            onClick: e => e.stopPropagation()
        },
            React.createElement('div', { className: 'sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center' },
                React.createElement('h3', { className: 'text-xl font-bold text-yellow-400' }, title),
                React.createElement('button', {
                    onClick: onClose,
                    className: 'text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700'
                }, '×')
            ),
            React.createElement('div', { className: 'p-6' }, children)
        )
    );
};
