const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-teal-500">
                <div className="text-3xl font-bold text-teal-600">18.4M</div>
                <div className="text-sm text-gray-600 mt-2">행정 데이터 건수</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">10</div>
                <div className="text-sm text-gray-600 mt-2">OpenHash 노드</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-cyan-500">
                <div className="text-3xl font-bold text-cyan-600">98.9%</div>
                <div className="text-sm text-gray-600 mt-2">AI 정확도</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-emerald-500">
                <div className="text-3xl font-bold text-emerald-600">94%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[1487,1536,1587,1640,1695,1752,1811,1873,1937,2003,2071,2142].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-teal-500 hover:bg-teal-600 transition-colors" 
                         style={{height: `${(h/2142)*100}%`}} title={`${i+1}월: ${h}k건`}></div>
                ))}
            </div>
        </div>
    </div>
);
