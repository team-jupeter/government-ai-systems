const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 통계 대시보드</h2>
        <div className="grid md:grid-cols-4 gap-4">
            <StatCard title="총 회의" value="156회" icon="🏛️" />
            <StatCard title="처리 안건" value="2,847건" icon="📋" />
            <StatCard title="의결률" value="87.3%" icon="✓" />
            <StatCard title="자동화율" value="73%" icon="🤖" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-4">월별 처리 현황</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[45,52,48,61,58,67,72,69,75,81,78,84].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-blue-500 hover:bg-blue-600 transition-colors" 
                         style={{height: `${h}%`}} title={`${i+1}월: ${h}건`}></div>
                ))}
            </div>
        </div>
    </div>
);
