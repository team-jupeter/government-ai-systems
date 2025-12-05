const { useState } = React;

const LogCard = ({ log }) => {
    const [expanded, setExpanded] = useState(false);
    
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
    };
    
    const getOperationColor = (type) => {
        const colors = {
            'RETRIEVE': 'text-blue-600 bg-blue-50',
            'STORE': 'text-green-600 bg-green-50',
            'UPDATE': 'text-orange-600 bg-orange-50',
            'DELETE': 'text-red-600 bg-red-50'
        };
        return colors[type] || 'text-gray-600 bg-gray-50';
    };
    
    return (
        <div className="log-card bg-white rounded-lg shadow-md border border-gray-200 mb-3">
            {/* 카드 헤더 - 클릭 가능 */}
            <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm font-semibold text-gray-900">
                                [{formatTime(log.timestamp)}]
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                                {log.employee.name} ({log.employee.department})
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getOperationColor(log.ndrOperation.operationType)}`}>
                                {log.ndrOperation.operationType}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            작업: {log.task.type} - {log.task.targetEntity}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>📊 {log.ndrOperation.recordCount}건</span>
                            <span>💾 {log.ndrOperation.dataSize}</span>
                            <OpenHashBadge 
                                blockId={log.openHash.blockId}
                                verified={log.openHash.verified}
                            />
                            {log.automation.aiAssisted && (
                                <span className="text-purple-600 font-medium">
                                    🤖 AI 자동처리 ({Math.round(log.automation.aiConfidence * 100)}%)
                                </span>
                            )}
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        {expanded ? '▲' : '▼'}
                    </button>
                </div>
            </div>
            
            {/* 확장 영역 */}
            <div className={`expandable-card border-t border-gray-100 ${expanded ? 'expanded' : 'collapsed'}`}>
                {expanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* NDR 작업 상세 */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                국가데이터처 작업
                            </h4>
                            <div className="text-sm space-y-1">
                                <p><span className="font-medium">데이터 경로:</span> {log.ndrOperation.dataPath}</p>
                                <p><span className="font-medium">데이터 범주:</span> {log.ndrOperation.dataCategory}</p>
                                <p><span className="font-medium">인출 필드:</span> {log.ndrOperation.retrievedFields?.join(', ')}</p>
                            </div>
                        </div>
                        
                        {/* 오픈해시 정보 */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                오픈해시 검증
                            </h4>
                            <div className="text-sm space-y-1">
                                <p><span className="font-medium">블록 ID:</span> {log.openHash.blockId}</p>
                                <p><span className="font-medium">계층:</span> {log.openHash.layer}</p>
                                <p><span className="font-medium">트랜잭션:</span> {log.openHash.transactionHash}</p>
                                <p><span className="font-medium">검증 시각:</span> {formatTime(log.openHash.timestamp)}</p>
                            </div>
                        </div>
                        
                        {/* AI 자동화 정보 */}
                        {log.automation.aiAssisted && (
                            <div className="md:col-span-2">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    AI 자동화 정보
                                </h4>
                                <div className="text-sm space-y-1">
                                    <p><span className="font-medium">AI 모델:</span> {log.automation.aiModel}</p>
                                    <p><span className="font-medium">신뢰도:</span> {Math.round(log.automation.aiConfidence * 100)}%</p>
                                    {log.automation.humanApprovalRequired && (
                                        <>
                                            <p><span className="font-medium">승인자:</span> {log.automation.approver.name} ({log.automation.approver.position})</p>
                                            <p><span className="font-medium">승인 시각:</span> {formatTime(log.automation.approver.approvedAt)}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {/* 결과 데이터 */}
                        {log.resultData && (
                            <div className="md:col-span-2 bg-blue-50 p-3 rounded">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    처리 결과
                                </h4>
                                <p className="text-sm"><span className="font-medium">결론:</span> {log.resultData.conclusion}</p>
                                <p className="text-sm"><span className="font-medium">저장 경로:</span> {log.resultData.dataPath}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

window.LogCard = LogCard;
