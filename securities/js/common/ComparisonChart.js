function ComparisonChart({ type, data, title, description }) {
    // Recharts가 로드되지 않았으면 메시지 표시
    if (!window.Recharts) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                {description && <p className="text-gray-600 mb-4">{description}</p>}
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
                    <div className="text-center">
                        <i className="fas fa-chart-line text-4xl text-sec-blue mb-3"></i>
                        <p className="text-gray-600">차트 데이터 준비 중...</p>
                    </div>
                </div>
            </div>
        );
    }

    const renderChart = () => {
        const {
            BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
            XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
        } = window.Recharts;

        const COLORS = ['#003D82', '#00A651', '#D4AF37', '#DC3545', '#6C757D'];

        if (type === 'bar') {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#003D82" />
                    </BarChart>
                </ResponsiveContainer>
            );
        }

        if (type === 'line') {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#003D82" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            );
        }

        if (type === 'pie') {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            );
        }

        return null;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            {description && <p className="text-gray-600 mb-4">{description}</p>}
            {renderChart()}
        </div>
    );
}
