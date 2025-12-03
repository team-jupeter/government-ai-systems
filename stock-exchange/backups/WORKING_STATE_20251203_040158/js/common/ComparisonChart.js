function ComparisonChart({ title, data, dataKey, nameKey, unit = '' }) {
    const [isRechartsLoaded, setIsRechartsLoaded] = React.useState(false);

    React.useEffect(() => {
        // Recharts가 로드될 때까지 대기
        const checkRecharts = setInterval(() => {
            if (window.Recharts) {
                setIsRechartsLoaded(true);
                clearInterval(checkRecharts);
            }
        }, 100);

        return () => clearInterval(checkRecharts);
    }, []);

    if (!isRechartsLoaded) {
        return (
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-400">
                        <i className="fas fa-spinner fa-spin text-4xl mb-2"></i>
                        <div className="text-sm">차트 로딩 중...</div>
                    </div>
                </div>
            </div>
        );
    }

    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = window.Recharts;

    return (
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                        dataKey={nameKey} 
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                    />
                    <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value) => `${value}${unit}`}
                    />
                    <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="rect"
                    />
                    <Bar 
                        dataKey={dataKey} 
                        fill="#003D82" 
                        radius={[8, 8, 0, 0]}
                        animationDuration={1000}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

window.ComparisonChart = ComparisonChart;
