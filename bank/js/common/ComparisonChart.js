const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } = Recharts;

const ComparisonChart = ({ data, type = 'bar', title, dataKey1, dataKey2, color1 = '#0052A3', color2 = '#00A651' }) => {
    const ChartComponent = type === 'bar' ? BarChart : LineChart;
    const DataComponent = type === 'bar' ? Bar : Line;

    return (
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
            {title && <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>}
            <ResponsiveContainer width="100%" height={300}>
                <ChartComponent data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '2px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                    />
                    <Legend />
                    <DataComponent 
                        dataKey={dataKey1} 
                        fill={color1} 
                        stroke={color1}
                        strokeWidth={type === 'line' ? 3 : 0}
                        name="AI 자율 은행"
                    />
                    {dataKey2 && (
                        <DataComponent 
                            dataKey={dataKey2} 
                            fill={color2}
                            stroke={color2}
                            strokeWidth={type === 'line' ? 3 : 0}
                            name="전통 은행"
                        />
                    )}
                </ChartComponent>
            </ResponsiveContainer>
        </div>
    );
};
