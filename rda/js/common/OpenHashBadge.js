const OpenHashBadge = ({ blockId, verified = true, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="openhash-badge hover:opacity-90 transition-opacity cursor-pointer"
            title={`오픈해시 블록: ${blockId}`}
        >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {verified ? '검증완료' : '검증중'}
        </button>
    );
};

window.OpenHashBadge = OpenHashBadge;
