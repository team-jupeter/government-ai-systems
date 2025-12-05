const LogCard = ({ timestamp, department, action, user, status, details }) => {
    const statusColors = {
        success: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        warning: 'bg-orange-100 text-orange-800',
        error: 'bg-red-100 text-red-800',
        classified: 'bg-gray-100 text-gray-800'
    };
    
    const statusIcons = {
        success: '✓',
        pending: '⏳',
        warning: '⚠️',
        error: '✗',
        classified: '🔒'
    };
    
    return (
        <div className="log-card bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs text-gray-500">{timestamp}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {department}
                        </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{action}</h4>
                    {user && (
                        <p className="text-sm text-gray-600 mt-1">담당: {user}</p>
                    )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                    {statusIcons[status]} {status}
                </span>
            </div>
            {details && (
                <div className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">
                    {details}
                </div>
            )}
        </div>
    );
};

window.LogCard = LogCard;
