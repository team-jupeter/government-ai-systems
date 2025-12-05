const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 통계 대시보드</h2>
        <div className="grid md:grid-cols-4 gap-4">
            <StatCard title="연간 법안" value="1,234건" icon="📋" />
            <StatCard title="금융감독" value="487건" icon="💰" />
            <StatCard title="공정거래" value="234건" icon="⚖️" />
            <StatCard title="자동화율" value="81%" icon="🤖" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-4">월별 처리 현황</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[52,58,61,67,71,74,79,83,87,92,89,95].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-blue-500 hover:bg-blue-600 transition-colors" 
                         style={{height: `${h}%`}} title={`${i+1}월: ${h}건`}></div>
                ))}
            </div>
        </div>
    </div>
);
