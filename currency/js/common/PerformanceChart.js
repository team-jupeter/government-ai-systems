const PerformanceChart = ({ data, title, unit = "ms" }) => {
    return (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-gray-900">{title}</h3>
            <div className="h-80 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">차트 준비 중...</p>
            </div>
        </div>
    );
};
window.PerformanceChart = PerformanceChart;
