const FilterPanel = ({ filters, onFilterChange }) => {
    const departments = [
        '전체 부서',
        '서울지방국세청',
        '중부지방국세청',
        '부산지방국세청',
        '조사국',
        '징세국',
        '법인세국',
        '소득세국'
    ];
    
    const operationTypes = [
        '전체 작업',
        '데이터 인출',
        '데이터 저장',
        '데이터 수정',
        '세무조사',
        '징수업무',
        '신고처리'
    ];
    
    const dateRanges = [
        { value: 'today', label: '오늘' },
        { value: 'week', label: '이번 주' },
        { value: 'month', label: '이번 달' },
        { value: 'custom', label: '사용자 지정' }
    ];
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        부서
                    </label>
                    <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters?.department || '전체 부서'}
                        onChange={(e) => onFilterChange('department', e.target.value)}
                    >
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        작업 유형
                    </label>
                    <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters?.operationType || '전체 작업'}
                        onChange={(e) => onFilterChange('operationType', e.target.value)}
                    >
                        {operationTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        기간
                    </label>
                    <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters?.dateRange || 'today'}
                        onChange={(e) => onFilterChange('dateRange', e.target.value)}
                    >
                        {dateRanges.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        직원 검색
                    </label>
                    <input 
                        type="text"
                        placeholder="직원명 또는 ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters?.employee || ''}
                        onChange={(e) => onFilterChange('employee', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

window.FilterPanel = FilterPanel;
