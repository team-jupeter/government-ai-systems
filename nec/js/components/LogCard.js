const LogCard = ({ log }) => {
    const operationColors = {
        'RETRIEVE': 'text-blue-600 bg-blue-50',
        'STORE': 'text-green-600 bg-green-50'
    };
    
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{log.employee.name}</span>
                        <span className="text-xs text-gray-500">|</span>
                        <span className="text-sm text-gray-600">{log.employee.department}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {log.employee.position}
                        </span>
                    </div>
                    <p className="text-sm text-gray-700">{log.task.description}</p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-500">{formatTime(log.timestamp)}</div>
                    {log.automation.aiAssisted && (
                        <div className="text-xs text-purple-600 mt-1">
                            🤖 AI {log.automation.confidence}%
                        </div>
                    )}
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 mb-1">작업 유형</div>
                    <div className="font-medium text-gray-900">{log.task.type}</div>
                </div>
                
                <div className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 mb-1">국가데이터처</div>
                    <div className="flex items-center gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${operationColors[log.ndrOperation.operationType]}`}>
                            {log.ndrOperation.operationType === 'RETRIEVE' ? '조회' : '저장'}
                        </span>
                        <span className="text-xs text-gray-600">{log.ndrOperation.recordCount}건</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{log.ndrOperation.dataCategory}</div>
                </div>
                
                <div className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 mb-1">오픈해시</div>
                    <div className="flex items-center gap-1">
                        {log.openhash.verified && (
                            <span className="text-green-600">✓</span>
                        )}
                        <span className="text-xs font-mono text-gray-600">{log.openhash.hash}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.LogCard = LogCard;
