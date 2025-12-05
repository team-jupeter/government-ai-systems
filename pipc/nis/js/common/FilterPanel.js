const { useState } = React;

const FilterPanel = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        dateRange: 'today',
        department: 'all',
        level: 'all'
    });
    
    const handleChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (onFilterChange) onFilterChange(newFilters);
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        기간
                    </label>
                    <select 
                        value={filters.dateRange}
                        onChange={(e) => handleChange('dateRange', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="today">오늘</option>
                        <option value="week">최근 7일</option>
                        <option value="month">최근 30일</option>
                        <option value="year">올해</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        부서
                    </label>
                    <select 
                        value={filters.department}
                        onChange={(e) => handleChange('department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="all">전체</option>
                        <option value="overseas">해외정보국</option>
                        <option value="north-korea">대북정보국</option>
                        <option value="counter">방첩국</option>
                        <option value="cyber">사이버안보국</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        보안등급
                    </label>
                    <select 
                        value={filters.level}
                        onChange={(e) => handleChange('level', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="all">전체</option>
                        <option value="public">공개</option>
                        <option value="restricted">대외비</option>
                        <option value="confidential">비밀</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

window.FilterPanel = FilterPanel;
