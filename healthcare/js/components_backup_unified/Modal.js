const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return React.createElement('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4',
        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        onClick: onClose
    },
        React.createElement('div', {
            className: 'rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto',
            style: { backgroundColor: 'white' },
            onClick: (e) => e.stopPropagation()
        },
            React.createElement('div', {
                className: 'p-6 border-b',
                style: { borderColor: '#e5e7eb' }
            },
                React.createElement('div', {
                    className: 'flex justify-between items-center'
                },
                    React.createElement('h3', {
                        className: 'text-xl font-bold',
                        style: { color: '#0046FF' }
                    }, title),
                    React.createElement('button', {
                        onClick: onClose,
                        className: 'text-2xl font-bold',
                        style: { color: '#9ca3af' },
                        onMouseOver: (e) => e.target.style.color = '#6b7280',
                        onMouseOut: (e) => e.target.style.color = '#9ca3af'
                    }, '×')
                )
            ),
            React.createElement('div', {
                className: 'p-6'
            }, children)
        )
    );
};
