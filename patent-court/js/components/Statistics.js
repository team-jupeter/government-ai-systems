const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">4,738</div>
                <div className="text-sm text-gray-600 mt-2">연간 사건 건수</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">5</div>
                <div className="text-sm text-gray-600 mt-2">OpenHash 노드</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-amber-500">
                <div className="text-3xl font-bold text-amber-600">99.1%</div>
                <div className="text-sm text-gray-600 mt-2">AI 정확도</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-yellow-500">
                <div className="text-3xl font-bold text-yellow-600">92%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[382,395,408,422,437,452,468,484,501,519,537,556].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-orange-500 hover:bg-orange-600 transition-colors" 
                         style={{height: `${(h/556)*100}%`}} title={`${i+1}월: ${h}건`}></div>
                ))}
            </div>
        </div>
    </div>
);
