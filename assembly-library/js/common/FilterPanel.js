const FilterPanel = () => (
    <div className="flex gap-2">
        <select className="px-3 py-1 border rounded text-sm">
            <option>전체</option>
            <option>회의</option>
            <option>심사</option>
            <option>의결</option>
        </select>
        <input type="date" className="px-3 py-1 border rounded text-sm" />
    </div>
);
